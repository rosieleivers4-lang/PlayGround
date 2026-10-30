import * as THREE from "three";

export const TAU = Math.PI * 2;

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const inverseLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const dampAngle = (a, b, lambda, dt) => {
  let d = ((b - a + Math.PI) % TAU + TAU) % TAU - Math.PI;
  return a + d * (1 - Math.exp(-lambda * dt));
};
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

export function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash2(x, y, seed = 0) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

export function valueNoise(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function fbm(x, y, seed = 0, octaves = 3) {
  let total = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    total += valueNoise(x * freq, y * freq, seed + i * 13) * amp;
    freq *= 2.03;
    amp *= 0.5;
  }
  return total;
}

export function pick(rng, array) {
  return array[Math.floor(rng() * array.length) % array.length];
}

export function shade(hex, amount) {
  const c = (hex >> 16) & 255, b = (hex >> 8) & 255, a = hex & 255;
  return (clamp(Math.round(c + amount), 0, 255) << 16) | (clamp(Math.round(b + amount), 0, 255) << 8) | clamp(Math.round(a + amount), 0, 255);
}

const textureCache = new Map();
function cachedTexture(key, make) {
  if (!textureCache.has(key)) textureCache.set(key, make());
  return textureCache.get(key);
}

export function glowTexture() {
  return cachedTexture("glow", () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const g = canvas.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.18, "rgba(255,255,255,.9)");
    grad.addColorStop(0.45, "rgba(255,255,255,.28)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

export function softTexture() {
  return cachedTexture("soft", () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const g = canvas.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 2, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,.9)");
    grad.addColorStop(0.35, "rgba(255,255,255,.35)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

export function groundTexture() {
  return cachedTexture("ground", () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const g = canvas.getContext("2d");
    g.fillStyle = "#f4f1e7";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1100; i++) {
      const x = Math.random() * 256, y = Math.random() * 256;
      const r = 1 + Math.random() * 13;
      g.globalAlpha = 0.025 + Math.random() * 0.07;
      g.fillStyle = Math.random() > 0.45 ? "#3d4636" : "#f4efdf";
      g.beginPath();
      g.arc(x, y, r, 0, TAU);
      g.fill();
    }
    for (let i = 0; i < 2400; i++) {
      const x = Math.random() * 256, y = Math.random() * 256;
      g.globalAlpha = 0.05 + Math.random() * 0.16;
      g.fillStyle = Math.random() > 0.5 ? "#29352a" : "#eee6ce";
      g.fillRect(x, y, 1, 1);
    }
    g.globalAlpha = 1;
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(16, 16);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

export function leafTexture() {
  return cachedTexture("leaf", () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const g = canvas.getContext("2d");
    g.translate(32, 32);
    g.fillStyle = "rgba(255,255,255,.95)";
    g.beginPath();
    g.ellipse(0, 0, 9, 22, 0.4, 0, TAU);
    g.fill();
    g.strokeStyle = "rgba(0,0,0,.25)";
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(-9, 15);
    g.lineTo(9, -15);
    g.stroke();
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}
