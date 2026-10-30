import * as THREE from 'three';

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));

export function shortestAngle(a, b) {
  let d = (b - a + Math.PI) % (Math.PI * 2);
  if (d < 0) d += Math.PI * 2;
  return d - Math.PI;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const r = mulberry32(seed);
  return {
    next: r,
    range: (a, b) => a + r() * (b - a),
    int: (a, b) => Math.floor(a + r() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    chance: (p) => r() < p,
  };
}

export function makeCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext('2d') };
}

export function canvasTexture(canvas, { repeat = null, anisotropy = 4 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  tex.needsUpdate = true;
  return tex;
}

export function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function makeLabelTexture(text, opts = {}) {
  const {
    w = 512,
    h = 160,
    bg = 'rgba(8,11,9,0.88)',
    border = '#d9ff3a',
    color = '#f6f4e8',
    sub = null,
    subColor = '#d9ff3a',
    fontSize = 64,
    bold = true,
    radius = 18,
    icon = null,
  } = opts;
  const { canvas, ctx } = makeCanvas(w, h);
  if (bg) {
    ctx.fillStyle = bg;
    roundRect(ctx, 6, 6, w - 12, h - 12, radius);
    ctx.fill();
    if (border) {
      ctx.strokeStyle = border;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.font = `${bold ? '800' : '600'} ${fontSize}px "Barlow Condensed", "Arial Narrow", Arial, sans-serif`;
  if (sub) {
    ctx.fillText(text, w / 2, h * 0.4);
    ctx.fillStyle = subColor;
    ctx.font = `700 ${fontSize * 0.43}px "Barlow Condensed", Arial, sans-serif`;
    ctx.fillText(sub, w / 2, h * 0.7);
  } else {
    ctx.fillText(text, w / 2, h * 0.52);
  }
  if (icon === 'carrot') {
    ctx.font = `${fontSize * 0.8}px serif`;
    ctx.fillText('🥕', w - fontSize * 0.55, h * 0.28);
  }
  return canvasTexture(canvas);
}

export function makeSpeedLimitTexture(limit) {
  const s = 256;
  const { canvas, ctx } = makeCanvas(s, s);
  ctx.clearRect(0, 0, s, s);
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s * 0.44, 0, Math.PI * 2);
  ctx.fillStyle = '#f8f5e8';
  ctx.fill();
  ctx.lineWidth = s * 0.1;
  ctx.strokeStyle = '#d7262e';
  ctx.stroke();
  ctx.fillStyle = '#121512';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 118px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText(String(limit), s / 2, s / 2 + 8);
  return canvasTexture(canvas);
}

export function distancePointSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const l2 = dx * dx + dz * dz;
  if (l2 === 0) return { dist: Math.hypot(px - ax, pz - az), t: 0 };
  let t = ((px - ax) * dx + (pz - az) * dz) / l2;
  t = clamp(t, 0, 1);
  return { dist: Math.hypot(px - (ax + dx * t), pz - (az + dz * t)), t };
}

export function srgb(hex) {
  return new THREE.Color(hex).convertSRGBToLinear();
}
