import { clamp, hashString, makeRng } from './utils.js';

export const TOTAL_LEVELS = 500;

export const BIOMES = [
  {
    id: 'pine', name: 'Pinewood', accent: '#f6b74d', tree: 'pine', weather: 'clear', density: 1,
    ground: 0x506b3d, ground2: 0x354d2e, path: 0x746043, grass: 0x5f7d45, rock: 0x6b6d60,
    foliage: [0x2c5137, 0x376342, 0x477a4a], trunk: 0x4c3525,
    fogDay: 0x9db59a, fogNight: 0x0b1820,
    skyTopDay: 0x5d9ec2, skyHorizonDay: 0xd6e2c8, skyTopNight: 0x071022, skyHorizonNight: 0x132433,
    sunset: 0xe58b52, flower: [0xf2e6b0, 0xe7b9c7, 0xd7e0a0], water: false, fireflies: false,
  },
  {
    id: 'birch', name: 'Birch Grove', accent: '#c8dd77', tree: 'birch', weather: 'clear', density: 1.08,
    ground: 0x748f4d, ground2: 0x506b3b, path: 0x8a7550, grass: 0x88a85a, rock: 0x7b7a6a,
    foliage: [0x9fbf5e, 0xb5ce6a, 0x87a94e], trunk: 0xe7e0cd,
    fogDay: 0xc8d8b6, fogNight: 0x101b1c,
    skyTopDay: 0x7db7cf, skyHorizonDay: 0xe3ebcd, skyTopNight: 0x08121f, skyHorizonNight: 0x162630,
    sunset: 0xf0a768, flower: [0xf6e7a9, 0xe9c7d2, 0xdbe8b4], water: false, fireflies: false,
  },
  {
    id: 'autumn', name: 'Emberwood', accent: '#f08a3e', tree: 'broad', weather: 'leaves', density: 1.05,
    ground: 0x7a6034, ground2: 0x4f4027, path: 0x8b6a42, grass: 0x9b7a3f, rock: 0x746353,
    foliage: [0xd07a2c, 0xb84a2a, 0xe0a03a, 0x9b3e25], trunk: 0x5b3c2a,
    fogDay: 0xd6b184, fogNight: 0x1a1114,
    skyTopDay: 0x89a9bd, skyHorizonDay: 0xf0c38d, skyTopNight: 0x120d1a, skyHorizonNight: 0x2a1b1e,
    sunset: 0xf07a3a, flower: [0xe8a34b, 0xcf6a3d, 0xf2c76b], water: false, fireflies: false,
  },
  {
    id: 'marsh', name: 'Mirefen', accent: '#6fd6c1', tree: 'willow', weather: 'mist', density: 0.94,
    ground: 0x3f5c4a, ground2: 0x2b4338, path: 0x5e5b43, grass: 0x527a4f, rock: 0x5d6259,
    foliage: [0x3f6b4b, 0x527a4f, 0x6b8a52], trunk: 0x4a4034,
    fogDay: 0x7fa9a0, fogNight: 0x0a1a1d,
    skyTopDay: 0x6c9ba5, skyHorizonDay: 0xc4d5c2, skyTopNight: 0x061218, skyHorizonNight: 0x102426,
    sunset: 0xd98a5d, flower: [0xbfd6b0, 0xd9e4c0, 0x9fc7b5], water: true, waterPos: [24, -26], waterRadius: 12, fireflies: true,
  },
  {
    id: 'snow', name: 'Frosthush', accent: '#a9d8ef', tree: 'pineSnow', weather: 'snow', density: 0.82,
    ground: 0xdbe6e8, ground2: 0xb9cbd2, path: 0x9e9a8e, grass: 0x9db8b4, rock: 0x8d979b,
    foliage: [0x5d7f6d, 0x6d8f7b, 0x87a38c], trunk: 0x4a3e35,
    fogDay: 0xc8d9e0, fogNight: 0x0a1420,
    skyTopDay: 0x6f9ec1, skyHorizonDay: 0xe5eef0, skyTopNight: 0x071120, skyHorizonNight: 0x152434,
    sunset: 0xe9a58a, flower: [0xe8f2f2, 0xd3e4ea], water: false, fireflies: false,
  },
  {
    id: 'bamboo', name: 'Jade Hollow', accent: '#b9e36a', tree: 'bamboo', weather: 'clear', density: 1.28,
    ground: 0x5f7f3e, ground2: 0x46612e, path: 0x7d7147, grass: 0x7d9b48, rock: 0x6f7562,
    foliage: [0x6f9b3f, 0x86b24c, 0x9cc75a], trunk: 0x9aaf55,
    fogDay: 0xb7cfa0, fogNight: 0x0c1a14,
    skyTopDay: 0x7cb3a0, skyHorizonDay: 0xd7e2b7, skyTopNight: 0x071510, skyHorizonNight: 0x13251d,
    sunset: 0xe6b46d, flower: [0xdbeaa0, 0xf2e6b0, 0xc4dd9a], water: false, fireflies: true,
  },
  {
    id: 'deadwood', name: 'Ashen Reach', accent: '#b9a7c8', tree: 'dead', weather: 'fog', density: 0.92,
    ground: 0x4b4a44, ground2: 0x34332f, path: 0x5b5549, grass: 0x66685a, rock: 0x6a6762,
    foliage: [0x5c5a50, 0x6d6a5d], trunk: 0x3a3733,
    fogDay: 0x8a8190, fogNight: 0x0d0b12,
    skyTopDay: 0x6f6f83, skyHorizonDay: 0xc1b5b5, skyTopNight: 0x0b0a12, skyHorizonNight: 0x1d1a24,
    sunset: 0xb86a5d, flower: [0xa89bb8, 0xc2b3c9], water: false, fireflies: false,
  },
  {
    id: 'glade', name: 'Lumen Glade', accent: '#6fe3b0', tree: 'broadGlow', weather: 'mist', density: 1.02,
    ground: 0x2d4a35, ground2: 0x1c3226, path: 0x3c4b35, grass: 0x3f6448, rock: 0x4c554a,
    foliage: [0x2f6448, 0x3f7a54, 0x4e8a5d], trunk: 0x2e2c25,
    fogDay: 0x4f8b74, fogNight: 0x07130f,
    skyTopDay: 0x3d7f74, skyHorizonDay: 0x9ec9a8, skyTopNight: 0x04110e, skyHorizonNight: 0x0b211c,
    sunset: 0xd18a63, flower: [0x8ff0c2, 0xc0f2a0, 0x7fd8d0], water: true, waterPos: [-22, 20], waterRadius: 9, fireflies: true,
  },
  {
    id: 'redwood', name: 'Titanwood', accent: '#e0a15e', tree: 'redwood', weather: 'clear', density: 0.72,
    ground: 0x5a4a2f, ground2: 0x3e3323, path: 0x6d5a3d, grass: 0x6b5e36, rock: 0x756454,
    foliage: [0x3f6b3a, 0x4f7a42, 0x628b4b], trunk: 0x6b3526,
    fogDay: 0xb08963, fogNight: 0x120d0b,
    skyTopDay: 0x7fa1ae, skyHorizonDay: 0xdcc09a, skyTopNight: 0x0b1018, skyHorizonNight: 0x211813,
    sunset: 0xef9a5c, flower: [0xd9b36b, 0xc98a55], water: false, fireflies: true,
  },
  {
    id: 'fen', name: 'Moonfen', accent: '#91b9e8', tree: 'willow', weather: 'mist', density: 0.9,
    ground: 0x3b4f4a, ground2: 0x263a37, path: 0x4f5a4a, grass: 0x4d6c5c, rock: 0x5b6568,
    foliage: [0x4a6d5c, 0x5c7f64, 0x6f9271], trunk: 0x3e3a31,
    fogDay: 0x6b85a0, fogNight: 0x060f1b,
    skyTopDay: 0x4b6f92, skyHorizonDay: 0xa9c2cf, skyTopNight: 0x050b18, skyHorizonNight: 0x0d1d2c,
    sunset: 0xc98970, flower: [0xb8d4e8, 0x9fc2d9], water: true, waterPos: [30, 18], waterRadius: 11, fireflies: true,
  },
];

const PREFIX = [
  'Whispering', 'Broken', 'Hollow', 'Golden', 'Crimson', 'Silent', 'Frost', 'Moss',
  'Shadow', 'Sunken', 'Wild', 'Ashen', 'Elder', 'Blood', 'Moon', 'Thorn', 'Amber',
  'Dusk', 'Iron', 'Lost', 'Pale', 'Raven', 'Sable', 'Gilded', 'Hushed', 'Briar',
];
const SUFFIX = [
  'Pines', 'Grove', 'Reach', 'Hollow', 'Fen', 'Thicket', 'Glade', 'Ridge',
  'Wilds', 'Copse', 'Timber', 'Mire', 'Boughs', 'Crossing', 'Hush', 'Verge',
  'Warren', 'Rise', 'Trail', 'Heart', 'Falls', 'Barrens', 'Cradle', 'Run',
];

const TIME_SLOTS = [0.30, 0.38, 0.47, 0.56, 0.64, 0.72, 0.82, 0.22];

export function getBiome(level) {
  const idx = clamp(Math.floor(level), 1, TOTAL_LEVELS);
  return BIOMES[(idx - 1) % BIOMES.length];
}

export function getLevel(level) {
  const n = clamp(Math.floor(level), 1, TOTAL_LEVELS);
  const seed = (hashString(`feral-${n}`) ^ (n * 2654435761)) >>> 0;
  const rng = makeRng(seed);
  const biome = getBiome(n);

  const prefix = PREFIX[(n * 7 + (n >> 3)) % PREFIX.length];
  const suffix = SUFFIX[(n * 11 + (n >> 2) + 3) % SUFFIX.length];
  const name = n === 1 ? 'Whispering Pines' : n === 500 ? 'The Last Wood' : `${prefix} ${suffix}`;

  const baseTime = TIME_SLOTS[(n - 1) % TIME_SLOTS.length];
  const startTime = (baseTime + rng.range(-0.012, 0.012) + 1) % 1;
  const cycleDuration = 150 + (n % 6) * 12;

  let weather = biome.weather;
  if (biome.id !== 'snow' && n % 7 === 0) weather = 'rain';
  else if (biome.id !== 'snow' && n % 11 === 0) weather = 'fog';
  else if (n % 13 === 0 && biome.id !== 'snow') weather = 'leaves';

  const eatGoal = Math.min(10, 3 + Math.floor((n - 1) / 22));
  const killGoal = Math.min(4, 1 + Math.floor((n - 1) / 45));
  const boss = n % 25 === 0;
  const alpha = !boss && n % 5 === 0;

  const preyPool = ['rabbit', 'rabbit', 'rabbit'];
  if (n >= 4) preyPool.push('deer');
  if (n >= 12) preyPool.push('rabbit', 'deer');
  if (n >= 30) preyPool.push('deer');

  const predatorPool = ['boar'];
  if (n >= 5) predatorPool.push('rival');
  if (n >= 9) predatorPool.push('rival', 'boar');
  if (n >= 20) predatorPool.push('rival');
  if (n >= 40) predatorPool.push('bear');

  const hpMul = 1 + Math.min(2.6, (n - 1) * 0.0052);
  const dmgMul = 1 + Math.min(2.2, (n - 1) * 0.0044);
  const speedMul = 1 + Math.min(0.48, (n - 1) * 0.0011);

  return {
    level: n,
    seed,
    biome,
    name,
    startTime,
    cycleDuration,
    weather,
    eatGoal,
    killGoal,
    boss,
    alpha,
    alphaType: boss ? 'bear' : alpha ? 'alphaWolf' : null,
    preyPool,
    predatorPool,
    hpMul,
    dmgMul,
    speedMul,
    nightDrain: 0.5,
  };
}

export function biomeForLevel(level) {
  return getBiome(level);
}

export const SAVE_KEY = 'feral500.save.v1';

const DEFAULT_SAVE = {
  unlocked: 1,
  current: 1,
  cleared: 0,
  eaten: 0,
  kills: 0,
  best: 1,
  health: 100,
  sound: true,
  tilt: false,
  quality: 'auto',
};

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SAVE,
      ...parsed,
      unlocked: clamp(Number(parsed.unlocked) || 1, 1, TOTAL_LEVELS),
      current: clamp(Number(parsed.current) || 1, 1, TOTAL_LEVELS),
      cleared: clamp(Number(parsed.cleared) || 0, 0, TOTAL_LEVELS),
      eaten: Math.max(0, Number(parsed.eaten) || 0),
      kills: Math.max(0, Number(parsed.kills) || 0),
      best: clamp(Number(parsed.best) || 1, 1, TOTAL_LEVELS),
      health: clamp(Number(parsed.health) || 100, 1, 100),
      sound: parsed.sound !== false,
      tilt: Boolean(parsed.tilt),
      quality: ['auto', 'high', 'low'].includes(parsed.quality) ? parsed.quality : 'auto',
    };
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

export function saveGame(save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* storage can be unavailable in private mode */
  }
}

export function resetSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_SAVE };
}
