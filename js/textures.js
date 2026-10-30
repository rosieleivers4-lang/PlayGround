import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  Deterministic procedural texture foundry.
 *  Every surface in BLACKSITE is generated here at boot: albedo,
 *  roughness and normal maps. No external assets, no network.
 * ------------------------------------------------------------------ */

const rngFactory = (seed = 1) => {
  let s = seed >>> 0
  return () => {
    s += 0x6d2b79f5
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

class Noise {
  constructor(seed = 7) {
    const r = rngFactory(seed)
    this.p = new Uint8Array(512)
    const perm = [...Array(256).keys()]
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(r() * (i + 1))
      ;[perm[i], perm[j]] = [perm[j], perm[i]]
    }
    for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255]
  }
  grad(h, x, y) {
    switch (h & 3) {
      case 0: return x + y
      case 1: return -x + y
      case 2: return x - y
      default: return -x - y
    }
  }
  // periodic value/gradient noise so textures tile seamlessly
  noise(x, y, period = 256) {
    const xi = Math.floor(x) % period
    const yi = Math.floor(y) % period
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = xf * xf * (3 - 2 * xf)
    const v = yf * yf * (3 - 2 * yf)
    const p = this.p
    const wrap = (n) => ((n % period) + period) % period
    const aa = p[(p[wrap(xi) & 255] + wrap(yi)) & 255]
    const ba = p[(p[wrap(xi + 1) & 255] + wrap(yi)) & 255]
    const ab = p[(p[wrap(xi) & 255] + wrap(yi + 1)) & 255]
    const bb = p[(p[wrap(xi + 1) & 255] + wrap(yi + 1)) & 255]
    const x1 = this.grad(aa, xf, yf) * (1 - u) + this.grad(ba, xf - 1, yf) * u
    const x2 = this.grad(ab, xf, yf - 1) * (1 - u) + this.grad(bb, xf - 1, yf - 1) * u
    return (x1 * (1 - v) + x2 * v) * 0.5 + 0.5
  }
  fbm(x, y, oct = 4, period = 256, gain = 0.5) {
    let a = 0.5, f = 1, sum = 0, norm = 0
    for (let i = 0; i < oct; i++) {
      sum += a * this.noise(x * f, y * f, period * f)
      norm += a
      a *= gain
      f *= 2
    }
    return sum / norm
  }
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

function canvas(size) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return c
}

function pixelTexture(c, repeat = 1, srgb = true, aniso = 4) {
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat, repeat)
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.anisotropy = aniso
  t.needsUpdate = true
  return t
}

/* Sobel height -> tangent-space normal map */
function normalFromHeight(heightCanvas, strength = 2.2, size = 512) {
  const src = heightCanvas.getContext('2d').getImageData(0, 0, size, size).data
  const out = canvas(size)
  const ctx = out.getContext('2d')
  const img = ctx.createImageData(size, size)
  const h = (x, y) => src[((((y + size) % size) * size + ((x + size) % size)) * 4)] / 255
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (h(x + 1, y - 1) + 2 * h(x + 1, y) + h(x + 1, y + 1)) - (h(x - 1, y - 1) + 2 * h(x - 1, y) + h(x - 1, y + 1))
      const dy = (h(x - 1, y + 1) + 2 * h(x, y + 1) + h(x + 1, y + 1)) - (h(x - 1, y - 1) + 2 * h(x, y - 1) + h(x + 1, y - 1))
      const nx = -dx * strength
      const ny = -dy * strength
      const nz = 1
      const len = Math.hypot(nx, ny, nz)
      const i = (y * size + x) * 4
      img.data[i] = (nx / len * 0.5 + 0.5) * 255
      img.data[i + 1] = (ny / len * 0.5 + 0.5) * 255
      img.data[i + 2] = (nz / len * 0.5 + 0.5) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return out
}

function heightFromColor(c, size) {
  const src = c.getContext('2d').getImageData(0, 0, size, size).data
  const out = canvas(size)
  const ctx = out.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < src.length; i += 4) {
    const l = (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114)
    img.data[i] = img.data[i + 1] = img.data[i + 2] = l
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return out
}

function grain(img, amount, seed = 3) {
  const r = rngFactory(seed)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (r() - 0.5) * amount
    img.data[i] = clamp(img.data[i] + n, 0, 255)
    img.data[i + 1] = clamp(img.data[i + 1] + n, 0, 255)
    img.data[i + 2] = clamp(img.data[i + 2] + n, 0, 255)
  }
}

/* ---------------------------- surfaces ---------------------------- */

function concreteSurface(size = 512, seed = 11, tone = 1) {
  const n = new Noise(seed)
  const r = rngFactory(seed + 91)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  const height = canvas(size)
  const hctx = height.getContext('2d')
  const himg = hctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x / 16, py = y / 16
      const broad = n.fbm(px * 0.35, py * 0.35, 5, 64)
      const mid = n.fbm(px * 1.6 + 9, py * 1.6 + 4, 4, 128)
      const fine = n.fbm(px * 9, py * 9, 3, 256)
      let v = 116 * tone + (broad - 0.5) * 50 + (mid - 0.5) * 32 + (fine - 0.5) * 16
      // damp patches / efflorescence
      const damp = smooth(0.52, 0.72, n.fbm(px * 0.22 + 30, py * 0.22 + 70, 3, 64))
      v -= damp * 26
      const stain = smooth(0.55, 0.8, n.fbm(px * 0.7 + 90, py * 0.7 + 20, 4, 128))
      v += stain * 10
      const i = (y * size + x) * 4
      img.data[i] = clamp(v * 1.02)
      img.data[i + 1] = clamp(v * 0.985)
      img.data[i + 2] = clamp(v * 0.93)
      img.data[i + 3] = 255
      const h = 128 + (fine - 0.5) * 55 + (mid - 0.5) * 24
      himg.data[i] = himg.data[i + 1] = himg.data[i + 2] = h
      himg.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  hctx.putImageData(himg, 0, 0)
  // cracks
  ctx.lineCap = 'round'
  for (let k = 0; k < 7; k++) {
    let x = r() * size, y = r() * size
    ctx.strokeStyle = `rgba(28,26,24,${0.35 + r() * 0.25})`
    ctx.lineWidth = 0.8 + r() * 1.6
    ctx.beginPath()
    ctx.moveTo(x, y)
    let ang = r() * Math.PI * 2
    const seg = 10 + Math.floor(r() * 16)
    for (let s = 0; s < seg; s++) {
      ang += (r() - 0.5) * 1.4
      x += Math.cos(ang) * (5 + r() * 15)
      y += Math.sin(ang) * (5 + r() * 15)
      ctx.lineTo(x, y)
      if (r() < 0.16) {
        // soot around crack
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = `rgba(25,23,21,0.18)`
        ctx.lineWidth = 5
        ctx.moveTo(x, y)
        ctx.lineTo(x + (r() - 0.5) * 18, y + (r() - 0.5) * 18)
        ctx.stroke()
        ctx.strokeStyle = `rgba(28,26,24,0.45)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    }
    ctx.stroke()
  }
  // pitting / chips
  for (let k = 0; k < 900; k++) {
    const x = r() * size, y = r() * size, rr = 0.4 + r() * 1.8
    ctx.fillStyle = r() < 0.5 ? 'rgba(40,38,34,0.35)' : 'rgba(150,146,136,0.25)'
    ctx.beginPath()
    ctx.arc(x, y, rr, 0, Math.PI * 2)
    ctx.fill()
  }
  return { color: c, normal: normalFromHeight(height, 2.0, size) }
}

function asphaltSurface(size = 512, seed = 21) {
  const n = new Noise(seed)
  const r = rngFactory(seed + 7)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  const height = canvas(size)
  const hctx = height.getContext('2d')
  const himg = hctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x / 16, py = y / 16
      const broad = n.fbm(px * 0.5, py * 0.5, 5, 64)
      const fine = n.fbm(px * 12, py * 12, 3, 256)
      let v = 70 + (broad - 0.5) * 30 + (fine - 0.5) * 26
      const oil = smooth(0.58, 0.78, n.fbm(px * 0.4 + 55, py * 0.4 + 12, 3, 64))
      v -= oil * 20
      const wear = smooth(0.45, 0.66, n.fbm(px * 1.4 + 10, py * 1.4 + 80, 4, 128))
      v += wear * 9
      const i = (y * size + x) * 4
      img.data[i] = clamp(v * 1.0)
      img.data[i + 1] = clamp(v * 0.99)
      img.data[i + 2] = clamp(v * 0.95)
      img.data[i + 3] = 255
      const h = 120 + (fine - 0.5) * 80 + (broad - 0.5) * 20
      himg.data[i] = himg.data[i + 1] = himg.data[i + 2] = h
      himg.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  hctx.putImageData(himg, 0, 0)
  // aggregate stones
  for (let k = 0; k < 4500; k++) {
    const x = r() * size, y = r() * size, rr = 0.3 + r() * 1.5
    const l = r() < 0.5 ? 90 + r() * 60 : 25 + r() * 20
    ctx.fillStyle = `rgba(${l},${l * 0.98},${l * 0.94},${0.25 + r() * 0.3})`
    ctx.beginPath()
    ctx.arc(x, y, rr, 0, Math.PI * 2)
    ctx.fill()
  }
  // cracks + tar seams
  for (let k = 0; k < 5; k++) {
    let x = r() * size, y = r() * size
    ctx.strokeStyle = 'rgba(18,17,15,0.5)'
    ctx.lineWidth = 0.7 + r() * 1.2
    ctx.beginPath()
    ctx.moveTo(x, y)
    let a = r() * 6.28
    for (let s = 0; s < 24; s++) {
      a += (r() - 0.5) * 1.2
      x += Math.cos(a) * (4 + r() * 10)
      y += Math.sin(a) * (4 + r() * 10)
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  for (let k = 0; k < 3; k++) {
    let x = r() * size, y = r() * size
    ctx.strokeStyle = 'rgba(12,12,12,0.4)'
    ctx.lineWidth = 3 + r() * 3
    ctx.beginPath()
    ctx.moveTo(x, y)
    for (let s = 0; s < 9; s++) {
      x += (r() - 0.5) * 40
      y += 20 + r() * 30
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  return { color: c, normal: normalFromHeight(height, 1.7, size) }
}

function metalSurface(size = 512, seed = 31, base = [70, 72, 74], rust = 0.55) {
  const n = new Noise(seed)
  const r = rngFactory(seed + 4)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  const height = canvas(size)
  const hctx = height.getContext('2d')
  const himg = hctx.createImageData(size, size)
  const rn = new Noise(seed + 100)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x / 16, py = y / 16
      const brush = n.fbm(px * 25, py * 0.8, 2, 512)
      const broad = n.fbm(px * 0.8, py * 0.8, 4, 128)
      const fine = r()
      const rustMask = smooth(0.58, 0.8, rn.fbm(px * 0.6 + 12, py * 0.6 + 50, 5, 64)) * rust
      let v = 1 + (broad - 0.5) * 0.22 + (brush - 0.5) * 0.12
      let rr = base[0] * v, gg = base[1] * v, bb = base[2] * v
      const rv = 92 + (fine - 0.5) * 60
      rr = lerp(rr, rv * 1.15, rustMask)
      gg = lerp(gg, rv * 0.62, rustMask)
      bb = lerp(bb, rv * 0.34, rustMask)
      const i = (y * size + x) * 4
      img.data[i] = clamp(rr)
      img.data[i + 1] = clamp(gg)
      img.data[i + 2] = clamp(bb)
      img.data[i + 3] = 255
      const h = 128 + (brush - 0.5) * 22 + (rustMask - 0.3) * 55 + (fine - 0.5) * 12
      himg.data[i] = himg.data[i + 1] = himg.data[i + 2] = h
      himg.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  hctx.putImageData(himg, 0, 0)
  // rust drips
  for (let k = 0; k < 40; k++) {
    const x = r() * size, y = r() * size
    const h = 10 + r() * 90
    const g = ctx.createLinearGradient(x, y, x, y + h)
    g.addColorStop(0, 'rgba(96,48,24,0.5)')
    g.addColorStop(1, 'rgba(96,48,24,0)')
    ctx.fillStyle = g
    ctx.fillRect(x, y, 1 + r() * 3, h)
  }
  return { color: c, normal: normalFromHeight(height, 1.4, size) }
}

function containerSurface(size = 512, seed = 41, paint = [38, 82, 84]) {
  const n = new Noise(seed)
  const r = rngFactory(seed + 1)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  const height = canvas(size)
  const hctx = height.getContext('2d')
  const himg = hctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x / 16, py = y / 16
      const corr = Math.sin((x / size) * Math.PI * 2 * 13) * 0.5 + 0.5
      const corrEdge = Math.pow(corr, 0.35)
      const broad = n.fbm(px * 0.5, py * 0.5, 4, 64)
      const streak = n.fbm(px * 6, py * 0.35, 3, 256)
      const rustMask = smooth(0.52, 0.74, n.fbm(px * 0.8 + 30, py * 0.8 + 9, 4, 128))
      const chips = smooth(0.62, 0.8, n.fbm(px * 5 + 60, py * 5 + 33, 3, 256))
      const shade = 0.72 + corrEdge * 0.28 + (broad - 0.5) * 0.18
      let rr = paint[0] * shade, gg = paint[1] * shade, bb = paint[2] * shade
      const rustCol = 88 + (streak - 0.5) * 50
      rr = lerp(rr, rustCol * 1.18, rustMask * 0.9)
      gg = lerp(gg, rustCol * 0.55, rustMask * 0.9)
      bb = lerp(bb, rustCol * 0.3, rustMask * 0.9)
      rr = lerp(rr, 58, chips * 0.7)
      gg = lerp(gg, 57, chips * 0.7)
      bb = lerp(bb, 55, chips * 0.7)
      const i = (y * size + x) * 4
      img.data[i] = clamp(rr)
      img.data[i + 1] = clamp(gg)
      img.data[i + 2] = clamp(bb)
      img.data[i + 3] = 255
      const h = 90 + corr * 90 + (broad - 0.5) * 20 + (rustMask - 0.4) * 30
      himg.data[i] = himg.data[i + 1] = himg.data[i + 2] = h
      himg.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  hctx.putImageData(himg, 0, 0)
  // painted stencil
  ctx.save()
  ctx.translate(size * 0.5, size * 0.62)
  ctx.rotate(-0.02)
  ctx.font = `700 ${size * 0.075}px "Arial Narrow", Arial, sans-serif`
  ctx.fillStyle = 'rgba(214,209,190,0.5)'
  ctx.textAlign = 'center'
  const code = ['MSKU 409 223-7', 'TGHU 771 092-4', 'CMAU 221 883-0'][Math.floor(r() * 3)]
  ctx.fillText(code, 0, 0)
  ctx.font = `700 ${size * 0.038}px Arial, sans-serif`
  ctx.fillText('MAX GROSS 30 480 KG', 0, size * 0.06)
  ctx.restore()
  // door hardware
  ctx.fillStyle = 'rgba(30,30,28,0.7)'
  for (let i = 0; i < 4; i++) ctx.fillRect(size * 0.09, size * (0.08 + i * 0.24), size * 0.022, size * 0.09)
  return { color: c, normal: normalFromHeight(height, 2.4, size) }
}

function sandbagSurface(size = 512, seed = 51) {
  const n = new Noise(seed)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const weave = Math.sin(x * 0.9) * Math.sin(y * 0.9)
      const fine = n.fbm(x / 8, y / 8, 3, 512)
      const dirt = n.fbm(x / 60, y / 60, 3, 128)
      let v = 112 + weave * 9 + (fine - 0.5) * 26 + (dirt - 0.5) * 28
      const i = (y * size + x) * 4
      img.data[i] = clamp(v * 1.02)
      img.data[i + 1] = clamp(v * 0.94)
      img.data[i + 2] = clamp(v * 0.74)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return { color: c, normal: normalFromHeight(heightFromColor(c, size), 1.2, size) }
}

function woodSurface(size = 512, seed = 61) {
  const n = new Noise(seed)
  const r = rngFactory(seed)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const plank = Math.floor(x / (size / 5))
      const gap = (x % (size / 5)) < 2 || (x % (size / 5)) > size / 5 - 3
      const grain = n.fbm(x / 30 + plank * 7, y / 3, 4, 256)
      const knots = n.fbm(x / 10, y / 10, 2, 128)
      let v = 96 + (grain - 0.5) * 50 + (knots - 0.5) * 22
      if (gap) v *= 0.5
      const i = (y * size + x) * 4
      img.data[i] = clamp(v * 1.22)
      img.data[i + 1] = clamp(v * 0.88)
      img.data[i + 2] = clamp(v * 0.58)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // stenciled crate markings
  ctx.strokeStyle = 'rgba(30,28,24,0.55)'
  ctx.lineWidth = 3
  ctx.strokeRect(20, 20, size - 40, size - 40)
  ctx.font = `700 ${size * 0.09}px "Arial Narrow", Arial, sans-serif`
  ctx.fillStyle = 'rgba(35,32,26,0.55)'
  ctx.textAlign = 'center'
  ctx.fillText('7.62 MM', size / 2, size * 0.46)
  ctx.font = `700 ${size * 0.05}px Arial, sans-serif`
  ctx.fillText('LOT 88-B / 240 RDS', size / 2, size * 0.54)
  ctx.fillText('THIS SIDE UP', size / 2, size * 0.62)
  return { color: c, normal: normalFromHeight(heightFromColor(c, size), 1.0, size) }
}

function fabricSurface(size = 256, seed = 71, base = [62, 65, 58]) {
  const n = new Noise(seed)
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const w = Math.sin(x * 1.7) * Math.sin(y * 1.7) * 0.5 + 0.5
      const f = n.fbm(x / 5, y / 5, 3, 256)
      const v = 0.82 + w * 0.14 + (f - 0.5) * 0.18
      const i = (y * size + x) * 4
      img.data[i] = clamp(base[0] * v)
      img.data[i + 1] = clamp(base[1] * v)
      img.data[i + 2] = clamp(base[2] * v)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return { color: c, normal: normalFromHeight(heightFromColor(c, size), 0.8, size) }
}

function hazardSurface(size = 256) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#c8a11f'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#171614'
  for (let i = -size; i < size * 2; i += size / 4) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + size / 8, 0)
    ctx.lineTo(i + size / 8 + size, size)
    ctx.lineTo(i + size, size)
    ctx.closePath()
    ctx.fill()
  }
  const n = new Noise(33)
  const img = ctx.getImageData(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const dirt = n.fbm(x / 20, y / 20, 3, 128)
      const scratch = n.fbm(x / 2, y / 20, 2, 256) > 0.62 ? -40 : 0
      const f = 0.65 + dirt * 0.45
      img.data[i] = clamp(img.data[i] * f + scratch)
      img.data[i + 1] = clamp(img.data[i + 1] * f + scratch)
      img.data[i + 2] = clamp(img.data[i + 2] * f + scratch)
    }
  }
  ctx.putImageData(img, 0, 0)
  return { color: c, normal: normalFromHeight(heightFromColor(c, size), 0.7, size) }
}

function bulletDecal(size = 128) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const r = rngFactory(9)
  const g = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(5,4,3,0.98)')
  g.addColorStop(0.18, 'rgba(14,12,10,0.95)')
  g.addColorStop(0.35, 'rgba(55,50,44,0.55)')
  g.addColorStop(0.7, 'rgba(80,76,70,0.18)')
  g.addColorStop(1, 'rgba(80,76,70,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(16,14,12,0.55)'
  ctx.lineWidth = 1.2
  for (let i = 0; i < 9; i++) {
    const a = r() * Math.PI * 2
    const len = 8 + r() * 34
    ctx.beginPath()
    ctx.moveTo(size / 2 + Math.cos(a) * 5, size / 2 + Math.sin(a) * 5)
    ctx.lineTo(size / 2 + Math.cos(a) * len, size / 2 + Math.sin(a) * len)
    ctx.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function bloodSplat(size = 256) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const r = rngFactory(17)
  ctx.fillStyle = 'rgba(78,8,10,0.9)'
  for (let i = 0; i < 34; i++) {
    const a = r() * 6.28, d = Math.pow(r(), 1.8) * size * 0.42
    const rr = 2 + r() * (18 - d * 0.08)
    ctx.beginPath()
    ctx.arc(size / 2 + Math.cos(a) * d, size / 2 + Math.sin(a) * d, rr, 0, 6.28)
    ctx.fill()
  }
  const g = ctx.createRadialGradient(size / 2, size / 2, 1, size / 2, size / 2, size * 0.28)
  g.addColorStop(0, 'rgba(96,10,12,0.95)')
  g.addColorStop(1, 'rgba(96,10,12,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function softSprite(size = 128, core = 'rgba(255,244,220,0.95)', edge = 'rgba(255,210,150,0)') {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, core)
  g.addColorStop(0.25, core.replace(/[\d.]+\)$/, '0.55)'))
  g.addColorStop(1, edge)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function chainlinkTexture(size = 512) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(155,158,155,0.85)'
  ctx.lineWidth = 3
  const step = size / 8
  for (let i = -size; i < size * 2; i += step) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + size, size)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(i, size)
    ctx.lineTo(i + size, 0)
    ctx.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function roadMarkings(size = 512) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = 'rgba(206,196,160,0.62)'
  ctx.fillRect(size * 0.47, 0, size * 0.06, size)
  ctx.fillStyle = 'rgba(30,30,30,0.25)'
  for (let i = 0; i < 300; i++) {
    ctx.fillRect(Math.random() * size, Math.random() * size, 2 + Math.random() * 6, 2 + Math.random() * 6)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ------------------------------ API ------------------------------- */

export function createTextureLibrary() {
  const lib = {
    concrete: (() => {
      const s = concreteSurface(512, 11, 1)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    concreteDark: (() => {
      const s = concreteSurface(512, 13, 0.72)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    asphalt: (() => {
      const s = asphaltSurface(512, 21)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    metal: (() => {
      const s = metalSurface(512, 31)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    metalDark: (() => {
      const s = metalSurface(512, 37, [46, 48, 50], 0.35)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    containerTeal: (() => {
      const s = containerSurface(512, 41, [36, 78, 78])
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    containerRust: (() => {
      const s = containerSurface(512, 43, [118, 55, 32])
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    containerOlive: (() => {
      const s = containerSurface(512, 47, [62, 68, 43])
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    sandbag: (() => {
      const s = sandbagSurface(512, 51)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    wood: (() => {
      const s = woodSurface(512, 61)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    fabric: (() => {
      const s = fabricSurface(256, 71)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    hazard: (() => {
      const s = hazardSurface(256)
      return { map: pixelTexture(s.color, 1), normalMap: pixelTexture(s.normal, 1, false) }
    })(),
    bulletDecal: bulletDecal(),
    bloodDecal: bloodSplat(),
    smoke: softSprite(128, 'rgba(220,214,200,0.55)', 'rgba(180,172,158,0)'),
    spark: softSprite(64, 'rgba(255,246,220,1)', 'rgba(255,120,30,0)'),
    chainlink: chainlinkTexture(),
    roadMarkings: roadMarkings()
  }

  // Clone repeating variants without duplicating GPU memory?
  // CanvasTexture clones share the image but need their own repeat.
  const rel = (set, rx, ry = rx) => {
    const out = {}
    for (const k of ['map', 'normalMap']) {
      if (!set[k]) continue
      const t = set[k].clone()
      t.needsUpdate = true
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.repeat.set(rx, ry)
      out[k] = t
    }
    return out
  }
  lib.rel = rel

  lib.dispose = () => {
    for (const [, v] of Object.entries(lib)) {
      if (!v || typeof v !== 'object') continue
      if (v.map) v.map.dispose()
      if (v.normalMap) v.normalMap.dispose()
      if (v.isTexture) v.dispose()
    }
  }
  return lib
}
