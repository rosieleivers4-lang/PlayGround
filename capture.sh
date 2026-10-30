#!/usr/bin/env bash
# Capture desktop + mobile screenshots of the running preview.
# Exit 75 for temporary navigation/browser infrastructure failures, 1 for defects.
set -euo pipefail
cd "$(dirname "$0")"

: "${CAPTURE_URL:?Set CAPTURE_URL to the preview URL}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to the evidence directory}"
mkdir -p "$CAPTURE_DIR"

echo "[capture] url=$CAPTURE_URL dir=$CAPTURE_DIR"
/usr/bin/time -p node scripts/capture.mjs
