import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, join, extname, sep } from 'node:path'

const root = resolve(process.env.SERVE_ROOT || 'dist')
const port = Number(process.env.PORT || 3000)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.woff2': 'font/woff2'
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff'
  })
  res.end(body)
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost')
    if (url.pathname === '/__health') {
      send(res, 200, JSON.stringify({ ok: true, root, port }), 'application/json; charset=utf-8')
      return
    }

    let pathname = decodeURIComponent(url.pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'
    let file = resolve(join(root, '.' + pathname))

    if (file !== root && !file.startsWith(root + sep)) {
      send(res, 404, 'Not found')
      return
    }

    let info = await stat(file).catch(() => null)
    if (info?.isDirectory()) {
      file = join(file, 'index.html')
      info = await stat(file).catch(() => null)
    }
    if (!info) {
      // SPA fallback for extensionless routes
      if (!extname(pathname)) {
        file = join(root, 'index.html')
        info = await stat(file).catch(() => null)
      }
    }
    if (!info) {
      send(res, 404, 'Not found')
      return
    }

    const body = await readFile(file)
    res.writeHead(200, {
      'Content-Type': mime[extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache'
    })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch (error) {
    send(res, 500, 'Internal error')
    console.error('[serve]', error)
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`[serve] Bone Garden at http://0.0.0.0:${port} from ${root}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(0), 2000).unref()
  })
}
