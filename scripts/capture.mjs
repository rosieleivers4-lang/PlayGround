import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/* Capture desktop + mobile screenshots of a running Bone Garden preview. */

const url = process.env.CAPTURE_URL
const outDir = process.env.CAPTURE_DIR
const settleMs = Number(process.env.CAPTURE_SETTLE_MS || 1600)

if (!url || !outDir) {
  console.error('[capture] Set CAPTURE_URL and CAPTURE_DIR.')
  process.exit(1)
}

const timed = (label) => {
  const start = performance.now()
  return () => console.log(`[capture] ${label} took ${((performance.now() - start) / 1000).toFixed(2)}s`)
}

const transient = (error, message) => {
  const wrapped = error instanceof Error ? error : new Error(message || String(error))
  wrapped.exitCode = 75
  return wrapped
}

const runtime = join(process.env.HOME, '.local/share/omgithub-playwright')
const platformConfig = process.platform === 'darwin' ? 'metal.json' : 'linux.json'
if (!existsSync(join(runtime, 'node_modules/playwright/package.json')) || !existsSync(join(runtime, platformConfig))) {
  console.error(`[capture] Playwright runtime missing at ${runtime}`)
  process.exit(75)
}

const require = createRequire(join(runtime, 'package.json'))
const { chromium } = require('playwright')
const config = JSON.parse(readFileSync(join(runtime, platformConfig), 'utf8'))
if (process.platform === 'linux') {
  process.env.DISPLAY ||= ':' + readFileSync(join(runtime, 'display'), 'utf8').trim()
}

mkdirSync(outDir, { recursive: true })

const views = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
]

let browser
let defects = []

try {
  const launchDone = timed('browser launch')
  browser = await chromium.launch({ ...config.browser.launchOptions, timeout: 30000 }).catch((error) => {
    throw transient(error, 'browser launch failed')
  })
  launchDone()

  for (const view of views) {
    const viewDone = timed(`${view.name} viewport`)
    const context = await browser
      .newContext({
        viewport: view.viewport,
        isMobile: view.isMobile,
        hasTouch: view.hasTouch,
        deviceScaleFactor: view.deviceScaleFactor
      })
      .catch((error) => {
        throw transient(error, 'new context failed')
      })
    const page = await context.newPage()
    page.setDefaultTimeout(30000)
    page.on('pageerror', (error) => {
      console.error(`[capture] ${view.name} page error: ${error.message}`)
      defects.push(error.message)
    })
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error(`[capture] ${view.name} console: ${msg.text()}`)
    })

    const gotoDone = timed(`${view.name} navigation`)
    let response
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    } catch (error) {
      throw transient(error, 'navigation failed')
    }
    gotoDone()

    if (!response || !response.ok()) {
      const status = response?.status() ?? 0
      const temp = !response || [408, 429, 500, 502, 503, 504].includes(status)
      const error = new Error(`HTTP ${status} loading ${url}`)
      if (temp) throw transient(error)
      throw error
    }

    const readyDone = timed(`${view.name} render ready`)
    await page.waitForSelector('#scene', { state: 'visible', timeout: 20000 }).catch((error) => {
      throw transient(error, 'canvas not visible')
    })
    const ready = await page
      .waitForFunction(() => window.__gameReady === true, null, { timeout: 30000 })
      .then(() => true)
      .catch(() => false)
    if (!ready) {
      defects.push('game renderer never signalled ready')
    }
    readyDone()

    const startDone = timed(`${view.name} start`)
    const start = page.locator('#startButton')
    if (await start.isVisible().catch(() => false)) {
      await start.click({ timeout: 10000 }).catch((error) => {
        throw transient(error, 'could not press start')
      })
      await page
        .waitForFunction(() => window.__gameStarted === true, null, { timeout: 15000 })
        .catch(() => defects.push('game did not start after pressing play'))
    }

    // Stage a real dig (teleport next to a mound, then hold the dig key) so the
    // capture shows actual gameplay instead of an empty field.
    await page.waitForTimeout(600)
    const staged = await page.evaluate(() => window.__game?.teleportToSpot?.() ?? false).catch(() => false)
    if (staged) {
      const before = await page.evaluate(() => ({
        score: window.__game.state.score,
        food: window.__game.state.foodStock
      }))
      await page.keyboard.down(' ')
      const revealed = await page
        .waitForFunction(
          (start) => window.__game.state.score > start.score || window.__game.state.foodStock > start.food,
          before,
          { timeout: 9000 }
        )
        .then(() => true)
        .catch(() => false)
      if (!revealed) defects.push('staged dig never revealed a bone or kibble')
      await page.keyboard.up(' ')
      await page.waitForTimeout(400)
    } else {
      await page.waitForTimeout(settleMs)
    }
    startDone()

    const shotDone = timed(`${view.name} screenshot`)
    const file = join(outDir, `final-${view.name}.png`)
    const buffer = await page.screenshot({ path: file, timeout: 30000 }).catch((error) => {
      if (error.name === 'TimeoutError' || !browser.isConnected()) throw transient(error, 'screenshot failed')
      throw error
    })
    shotDone()
    if (buffer.length < 15000) {
      defects.push(`${view.name} screenshot looks blank (${buffer.length} bytes)`)
    }

    const running = await page.evaluate(() => Boolean(window.__game?.state?.running)).catch(() => false)
    if (!running) defects.push(`${view.name} game state was not running at capture time`)

    console.log(`[capture] wrote ${file} (${buffer.length} bytes, running=${running})`)
    await context.close()
    viewDone()
  }
} catch (error) {
  console.error(`[capture] ${error.stack || error}`)
  process.exitCode = error.exitCode || 1
} finally {
  await browser?.close().catch((error) => {
    console.error(`[capture] browser close: ${error.message}`)
    process.exitCode ||= 75
  })
}

if (!process.exitCode && defects.length) {
  console.error(`[capture] rendering defects: ${defects.join('; ')}`)
  process.exitCode = 1
}

console.log(`[capture] done with exit ${process.exitCode || 0}`)
