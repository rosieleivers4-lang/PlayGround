export const TAU = Math.PI * 2;

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const invLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);
export const smoothstep = (a, b, x) => {
  const t = invLerp(a, b, x);
  return t * t * (3 - 2 * t);
};
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (arr, rng = Math.random) => arr[Math.floor(rng() * arr.length) % arr.length];
export const dist2 = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);
export const angleWrap = (a) => {
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
};
export const angleLerp = (a, b, t) => a + angleWrap(b - a) * t;
export const angleDamp = (a, b, lambda, dt) => angleLerp(a, b, 1 - Math.exp(-lambda * dt));

export function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
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
  const fn = mulberry32(seed);
  return {
    next: fn,
    range: (a, b) => a + fn() * (b - a),
    int: (a, b) => Math.floor(a + fn() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(fn() * arr.length) % arr.length],
    chance: (p) => fn() < p,
  };
}

function hash2(x, y, seed) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function valueNoise(x, y, seed = 0) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function fbm(x, y, seed = 0, octaves = 4) {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  let total = 0;
  for (let i = 0; i < octaves; i++) {
    value += valueNoise(x * freq, y * freq, seed + i * 1013) * amp;
    total += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return value / total;
}

export function formatClock(t) {
  const totalMinutes = ((t % 1) + 1) % 1 * 24 * 60;
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = Math.floor(totalMinutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function timePhase(t) {
  const n = ((t % 1) + 1) % 1;
  if (n < 0.21 || n >= 0.88) return { id: 'night', label: 'Night', icon: 'moon' };
  if (n < 0.31) return { id: 'dawn', label: 'Dawn', icon: 'dusk' };
  if (n < 0.68) return { id: 'day', label: 'Day', icon: 'sun' };
  if (n < 0.80) return { id: 'dusk', label: 'Dusk', icon: 'dusk' };
  return { id: 'night', label: 'Night', icon: 'moon' };
}

export function formatDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function pathX(z) {
  return Math.sin(z * 0.033) * 7.5 + Math.sin(z * 0.011 + 1.7) * 4.5;
}

export function nowMs() {
  return (typeof performance !== 'undefined' ? performance.now() : Date.now());
}
