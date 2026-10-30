#!/usr/bin/env bash
# Build (only when sources changed) and serve Bone Garden in the foreground.
set -euo pipefail
cd "$(dirname "$0")"

PROJECT_DIR="$PWD"
PORT="${PORT:-3000}"
export PORT
export SERVE_ROOT="$PROJECT_DIR/dist"

WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
mkdir -p "$WEB_DIR"
DEPLOY_FILE="$WEB_DIR/deployment-output.json"
STAMP="$WEB_DIR/bone-garden-build.sha"

echo "[start] project=$PROJECT_DIR port=$PORT web_dir=$WEB_DIR"

if [[ ! -d node_modules/three || ! -x node_modules/.bin/vite ]]; then
  echo '[start] installing dependencies'
  if [[ -f package-lock.json ]]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
fi

HASH="$(sha256sum package.json package-lock.json index.html src/main.js src/style.css scripts/serve.mjs 2>/dev/null | sha256sum | cut -d' ' -f1)"
NEED_BUILD=true
if [[ -f dist/index.html && -f "$STAMP" && "$(cat "$STAMP")" == "$HASH" ]]; then
  NEED_BUILD=false
fi

if [[ "$NEED_BUILD" == true ]]; then
  echo '[start] building static bundle into dist/'
  /usr/bin/time -p npm run build
  /usr/bin/printf '%s' "$HASH" > "$STAMP"
else
  echo '[start] dist/ is up to date'
fi

if [[ ! -f "$PROJECT_DIR/dist/index.html" ]]; then
  echo '[start] build produced no dist/index.html' >&2
  exit 1
fi

/usr/bin/time -p node -e '
const fs = require("node:fs")
const path = require("node:path")
const [project, directory, out] = process.argv.slice(1)
const payload = { project, directory: path.resolve(directory) }
fs.writeFileSync(out, JSON.stringify(payload) + "\n")
console.log(`[start] wrote ${out}: ${JSON.stringify(payload)}`)
' "$PROJECT_DIR" "$PROJECT_DIR/dist" "$DEPLOY_FILE"

# Foreground server; the tmux supervisor owns this process.
exec /usr/bin/time -p node scripts/serve.mjs
