import { hash1 } from './util.js';

export const CHAPTERS = [
  {
    id: 'pine', name: 'Pinewild', numeral: 'I',
    blurb: 'Cold moss, tall pines, and the first hunger.',
    nouns: ['Pines', 'Needles', 'Firs', 'Thicket', 'Roots'],
    dayTop: 0x4e86ae, dayHorizon: 0xd6d7a9, nightTop: 0x061322, nightHorizon: 0x172838,
    fogDay: 0x91a98d, fogNight: 0x0c1a1b,
    ground: [0x506b3d, 0x687f48, 0x3b5130], leaf: [0x948146, 0x6f8847, 0xb09a56],
    trunk: 0x543b2b, canopy: 0x315b3b, accent: 0x6ee6c2,
    treeMix: ['pine', 'pine', 'pine', 'birch'], weather: ['mist', 'clear', 'mist', 'clear'],
    fogDensity: 0.012, sunColor: 0xffe1a6, nightLight: 0x7cb9d9
  },
  {
    id: 'birch', name: 'Birchvale', numeral: 'II',
    blurb: 'Pale trunks, soft earth, and eyes between the leaves.',
    nouns: ['Birches', 'Boughs', 'Meadow', 'Stand', 'Veil'],
    dayTop: 0x82b1d6, dayHorizon: 0xf2e4be, nightTop: 0x081728, nightHorizon: 0x243140,
    fogDay: 0xb8bca0, fogNight: 0x0e1b22,
    ground: [0x67713f, 0x7f8048, 0x4e5533], leaf: [0xb0a04d, 0x8b9349, 0xd3bd69],
    trunk: 0xc9c7b3, canopy: 0x6d8a43, accent: 0x82e4c0,
    treeMix: ['birch', 'birch', 'birch', 'pine'], weather: ['clear', 'mist', 'clear', 'mist'],
    fogDensity: 0.010, sunColor: 0xffedc5, nightLight: 0x8ab7dd
  },
  {
    id: 'redwood', name: 'Redwood Deep', numeral: 'III',
    blurb: 'The old giants swallow sound. Something is listening.',
    nouns: ['Redwoods', 'Giants', 'Cathedral', 'Grove', 'Canopy'],
    dayTop: 0x47757c, dayHorizon: 0xb6ac83, nightTop: 0x040e15, nightHorizon: 0x152225,
    fogDay: 0x859f8f, fogNight: 0x091515,
    ground: [0x4b3d2e, 0x5f4a31, 0x362d22], leaf: [0x806035, 0x6e7c3a, 0x9a7642],
    trunk: 0x5a2e21, canopy: 0x1e3b2b, accent: 0x73e0b5,
    treeMix: ['redwood', 'redwood', 'redwood', 'pine'], weather: ['mist', 'mist', 'clear', 'rain'],
    fogDensity: 0.015, sunColor: 0xffd18e, nightLight: 0x79a8c9
  },
  {
    id: 'autumn', name: 'Autumn Hollow', numeral: 'IV',
    blurb: 'Amber leaves fall like embers. The hunt turns gold.',
    nouns: ['Hollow', 'Maples', 'Emberwood', 'Thicket', 'Falls'],
    dayTop: 0x7898b0, dayHorizon: 0xf0c084, nightTop: 0x0b1421, nightHorizon: 0x2b2431,
    fogDay: 0xb9a17e, fogNight: 0x171317,
    ground: [0x60452e, 0x7b5530, 0x423222], leaf: [0xc66b2f, 0xd5963e, 0x9d4c2b],
    trunk: 0x56382b, canopy: 0xa45228, accent: 0xf4b95c,
    treeMix: ['autumn', 'autumn', 'autumn', 'birch'], weather: ['clear', 'mist', 'clear', 'clear'],
    fogDensity: 0.011, sunColor: 0xffbd72, nightLight: 0x9c8bbf
  },
  {
    id: 'mossfen', name: 'Mossfen', numeral: 'V',
    blurb: 'Black water, green rot, and rabbits that know the path.',
    nouns: ['Fen', 'Moss', 'Mire', 'Willows', 'Bog'],
    dayTop: 0x5d8382, dayHorizon: 0xaeb78a, nightTop: 0x051311, nightHorizon: 0x182b27,
    fogDay: 0x7f9b83, fogNight: 0x081412,
    ground: [0x394c2d, 0x4c5a31, 0x263524], leaf: [0x64723c, 0x7d8343, 0x4f6331],
    trunk: 0x3f3427, canopy: 0x2c4932, accent: 0x6fe8b8,
    treeMix: ['dead', 'pine', 'birch', 'dead'], weather: ['rain', 'mist', 'rain', 'mist'],
    fogDensity: 0.016, sunColor: 0xd9d7a3, nightLight: 0x6eaeaa
  },
  {
    id: 'bamboo', name: 'Bamboo Mist', numeral: 'VI',
    blurb: 'A green labyrinth clicks in the wind. Everything is close.',
    nouns: ['Bamboo', 'Mist', 'Cane', 'Thicket', 'Rain'],
    dayTop: 0x86b0a3, dayHorizon: 0xe1e5b8, nightTop: 0x071715, nightHorizon: 0x1c332c,
    fogDay: 0xa1b792, fogNight: 0x0a1714,
    ground: [0x4e6337, 0x687443, 0x394a2c], leaf: [0x7f8946, 0x99a453, 0x5e7239],
    trunk: 0x6b743f, canopy: 0x3a683e, accent: 0x8cf0c8,
    treeMix: ['bamboo', 'bamboo', 'bamboo', 'birch'], weather: ['mist', 'rain', 'mist', 'clear'],
    fogDensity: 0.018, sunColor: 0xe3edbd, nightLight: 0x7bc9b4
  },
  {
    id: 'frost', name: 'Frostpine', numeral: 'VII',
    blurb: 'Snow hushes the world. The cold eats as surely as the dark.',
    nouns: ['Frost', 'Snowfall', 'Pines', 'Glacier', 'Stillness'],
    dayTop: 0x8fb9d3, dayHorizon: 0xe8eef1, nightTop: 0x071527, nightHorizon: 0x263d51,
    fogDay: 0xc2d3d6, fogNight: 0x11212b,
    ground: [0x8d9b8d, 0xa9b3a7, 0x6f8079], leaf: [0xd7e1d9, 0xafc2b8, 0x8fa89e],
    trunk: 0x4a3b30, canopy: 0x2e4d44, accent: 0x9be9eb,
    treeMix: ['frost', 'frost', 'frost', 'pine'], weather: ['snow', 'snow', 'mist', 'snow'],
    fogDensity: 0.015, sunColor: 0xeaf7ff, nightLight: 0x9dc8e8
  },
  {
    id: 'ashen', name: 'Ashen Woods', numeral: 'VIII',
    blurb: 'Charred spires, warm ash, and a hunger that will not sleep.',
    nouns: ['Ash', 'Cinders', 'Deadwood', 'Burn', 'Ruin'],
    dayTop: 0x765f58, dayHorizon: 0xc5a181, nightTop: 0x0c0909, nightHorizon: 0x261717,
    fogDay: 0x8e7969, fogNight: 0x130c0b,
    ground: [0x40312a, 0x584238, 0x2e2420], leaf: [0x914f32, 0x6d4231, 0xb26e43],
    trunk: 0x332823, canopy: 0x352d28, accent: 0xffa45e,
    treeMix: ['dead', 'dead', 'ashen', 'dead'], weather: ['embers', 'mist', 'embers', 'clear'],
    fogDensity: 0.014, sunColor: 0xffad6d, nightLight: 0xc47b5f
  },
  {
    id: 'blossom', name: 'Blossom Grove', numeral: 'IX',
    blurb: 'Petals on the wind. Beauty is only another kind of trap.',
    nouns: ['Blossom', 'Petals', 'Orchard', 'Bloom', 'Boughs'],
    dayTop: 0x98b3d5, dayHorizon: 0xf3d8d0, nightTop: 0x0a1324, nightHorizon: 0x2b2031,
    fogDay: 0xc6b5ab, fogNight: 0x17121e,
    ground: [0x52633e, 0x6a724a, 0x3d4d32], leaf: [0xe0a6b1, 0xc7849d, 0xf0c4c5],
    trunk: 0x5a3f36, canopy: 0xc9859c, accent: 0xffc0d5,
    treeMix: ['blossom', 'blossom', 'blossom', 'birch'], weather: ['clear', 'clear', 'mist', 'clear'],
    fogDensity: 0.010, sunColor: 0xffd9d4, nightLight: 0xa99bcf
  },
  {
    id: 'nightroot', name: 'Nightroot', numeral: 'X',
    blurb: 'The last wood grows in the dark. The dark grows back.',
    nouns: ['Nightroot', 'Gloam', 'Understory', 'Blackwood', 'Last Wood'],
    dayTop: 0x2b3650, dayHorizon: 0x6d5b78, nightTop: 0x02040d, nightHorizon: 0x11122a,
    fogDay: 0x534a66, fogNight: 0x05060e,
    ground: [0x2e2a3d, 0x413650, 0x211e2e], leaf: [0x514571, 0x3c3558, 0x6b587f],
    trunk: 0x2a2435, canopy: 0x242040, accent: 0x7b8dff,
    treeMix: ['nightroot', 'nightroot', 'dead', 'nightroot'], weather: ['fireflies', 'mist', 'fireflies', 'rain'],
    fogDensity: 0.017, sunColor: 0xb7a6ff, nightLight: 0x8a84ff
  }
];

const ADJECTIVES = ['Dawnlit', 'Moss', 'Ashen', 'Amber', 'Hollow', 'Silver', 'Rusted', 'Whisper', 'Glimmer', 'Thorn'];
const PHASES = [0.28, 0.4, 0.52, 0.62, 0.7, 0.76, 0.83, 0.9, 0.97, 0.05];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const WEATHER_LABEL = { clear: 'CLEAR', mist: 'MIST', rain: 'RAIN', snow: 'SNOW', embers: 'EMBER WIND', fireflies: 'FIREFLIES' };

export function isNightPhase(phase) {
  const sun = Math.sin((phase - 0.25) * Math.PI * 2);
  return sun < -0.02;
}

export function timeLabel(phase) {
  const sun = Math.sin((phase - 0.25) * Math.PI * 2);
  const rising = phase > 0.25 && phase < 0.5;
  const setting = phase > 0.5 && phase < 0.75;
  if (sun > 0.55) return 'DAY';
  if (sun > 0.1) return rising ? 'MORNING' : setting ? 'GOLDEN HOUR' : 'DAY';
  if (sun > -0.12) return rising ? 'DAWN' : 'DUSK';
  return 'NIGHT';
}

export function levelConfig(level) {
  const clamped = Math.max(1, Math.min(500, Math.floor(level) || 1));
  const n = clamped - 1;
  const chapterIndex = Math.floor(n / 50);
  const local = n % 50;
  const biome = CHAPTERS[chapterIndex];
  const name = `${ADJECTIVES[local % 10]} ${biome.nouns[Math.floor(local / 10)]}`;
  const phase = (PHASES[(local * 7 + chapterIndex * 3 + 10) % 10] + chapterIndex * 0.006) % 1;
  const weather = biome.weather[(local * 3 + chapterIndex) % biome.weather.length];
  const isBoss = clamped % 10 === 0;
  const preyGoal = clamped === 1 ? 2 : Math.min(7, 2 + Math.floor(n / 35));
  const huntGoal = Math.min(7, 1 + Math.floor(n / 65));
  const bossType = ['boar', 'wolf', 'bear'][Math.floor(n / 150)] || 'bear';
  const difficulty = n / 499;
  return {
    level: clamped,
    chapterIndex,
    chapter: biome,
    chapterNumeral: ROMAN[chapterIndex],
    local,
    name,
    phase,
    cycle: 260 + (clamped % 6) * 22,
    weather,
    weatherLabel: WEATHER_LABEL[weather],
    isBoss,
    bossType,
    preyGoal,
    huntGoal,
    difficulty,
    preyPool: clamped < 20 ? ['rabbit', 'rabbit', 'hare']
      : clamped < 120 ? ['rabbit', 'hare', 'rabbit', 'fawn']
        : ['hare', 'rabbit', 'fawn', 'fawn'],
    predatorPool: buildPredatorPool(clamped, weather),
    seed: Math.floor(hash1(clamped * 3.17) * 900000) + clamped * 97,
    goalText: clamped % 10 === 0
      ? `Devour ${preyGoal} creatures, best ${huntGoal} beast${huntGoal > 1 ? 's' : ''} and bring down the Alpha.`
      : `Devour ${preyGoal} rabbit${preyGoal > 1 ? 's' : ''} or creatures, best ${huntGoal} beast${huntGoal > 1 ? 's' : ''}.`
  };
}

function buildPredatorPool(level, weather) {
  const pool = ['fox'];
  if (level >= 4) pool.push('boar');
  if (level >= 14) pool.push('wolf');
  if (level >= 45) pool.push('boar', 'wolf');
  if (level >= 120) pool.push('bear');
  if (level >= 260) pool.push('wolf', 'bear');
  if (weather === 'fireflies' || weather === 'embers') pool.push('shadow');
  if (level >= 350) pool.push('shadow');
  return pool;
}

export function levelLabel(level) {
  const c = levelConfig(level);
  return `${String(c.level).padStart(3, '0')} · ${c.name}`;
}

export function timeOfDayText(phase) {
  return timeLabel(phase).charAt(0) + timeLabel(phase).slice(1).toLowerCase();
}
