// Deterministic generation for all 500 wilds.
export const LEVEL_COUNT = 500;

const ADJECTIVES = [
  'Whispering', 'Mossy', 'Silver', 'Hollow', 'Ashen', 'Fern', 'Moonlit',
  'Bramble', 'Amber', 'Dusky', 'Frosted', 'Tangled', 'Sunken', 'Rustling',
  'Cinder', 'Velvet', 'Wild', 'Still', 'Broken', 'Emerald', 'Ivory',
  'Shadowed', 'Honeyed', 'Stony', 'Glimmering', 'Thorned', 'Misted',
  'Ancient', 'Restless', 'Hushed', 'Copper', 'Pale', 'Bitter', 'Sweet',
  'Wandering', 'Hidden', 'Fallen', 'Feral', 'Quiet', 'Howling'
];

const NOUNS = [
  'Thicket', 'Glade', 'Ravine', 'Hollow', 'Pines', 'Creek', 'Ridge',
  'Grove', 'Barrow', 'Meadow', 'Copse', 'Fen', 'Bluff', 'Dell',
  'Warren', 'Boughs', 'Marsh', 'Gully', 'Clearing', 'Timberland',
  'Cairn', 'Heath', 'Spring', 'Bramble', 'Canopy', 'Crossing', 'Reach',
  'Lair', 'Tangle', 'Wood'
];

const BIOMES = ['verdant', 'autumn', 'mist', 'frost', 'ember', 'violet', 'bog'];

const PHASE_CYCLE = [
  'day', 'day', 'dusk', 'night', 'day', 'night',
  'dusk', 'night', 'day', 'dusk'
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(list, seed) {
  const rng = mulberry32(seed);
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const NAME_POOL = seededShuffle(
  ADJECTIVES.flatMap((adj) => NOUNS.map((noun) => `${adj} ${noun}`)),
  0x7ea1fa
);

const PREY_BY_BIOME = {
  verdant: ['rabbit', 'rabbit', 'squirrel', 'fawn'],
  autumn: ['rabbit', 'squirrel', 'squirrel', 'fawn'],
  mist: ['rabbit', 'rabbit', 'fawn'],
  frost: ['rabbit', 'fawn'],
  ember: ['rabbit', 'squirrel', 'fawn'],
  violet: ['rabbit', 'squirrel', 'rabbit'],
  bog: ['rabbit', 'rabbit', 'fawn']
};

export function getLevel(number) {
  const n = Math.max(1, Math.min(LEVEL_COUNT, Math.floor(number)));
  const rng = mulberry32(n * 2654435761 + 97);
  let biome = BIOMES[(n * 3 + Math.floor(rng() * 2)) % BIOMES.length];
  if (n === 1) biome = 'verdant';
  else if (n === 2) biome = 'autumn';
  else if (n === 3) biome = 'mist';

  let phase;
  if (n === 1) phase = 'day';
  else if (n === 2) phase = 'dusk';
  else if (n === 3) phase = 'night';
  else phase = PHASE_CYCLE[(n * 7 + 3) % PHASE_CYCLE.length];

  const target = Math.min(16, 3 + Math.floor((n - 1) / 24));
  const predatorCount = n < 2 ? 0 : Math.min(7, 1 + Math.floor((n - 2) / 28));
  const boss = n % 25 === 0;

  const preyPool = PREY_BY_BIOME[biome] || PREY_BY_BIOME.verdant;
  const preyMix = [];
  for (let i = 0; i < target + 4; i += 1) {
    preyMix.push(preyPool[Math.floor(rng() * preyPool.length)]);
  }

  const predatorPool = [];
  if (n >= 2) predatorPool.push('fox');
  if (n >= 9) predatorPool.push('boar');
  if (n >= 18 && phase !== 'day') predatorPool.push('wolf');
  if (n >= 30) predatorPool.push('boar', 'wolf');
  if (predatorPool.length === 0) predatorPool.push('fox');

  const predators = [];
  for (let i = 0; i < predatorCount; i += 1) {
    predators.push(predatorPool[Math.floor(rng() * predatorPool.length)]);
  }

  const name = NAME_POOL[(n - 1) % NAME_POOL.length];
  const bossType = n % 50 === 0 ? 'stag' : 'boar';
  const bossNames = bossType === 'stag'
    ? ['The Antlered King', 'The Moon-Crowned Stag', 'The Elder Hart']
    : ['Old Iron Tusk', 'The Bramble Tyrant', 'The Root-Tusked Horror', 'The Grey Matriarch'];
  const bossName = bossNames[Math.floor(n / 25 - 1) % bossNames.length];

  return {
    number: n,
    name,
    biome,
    phase,
    target,
    preyMix,
    predators,
    boss,
    bossName,
    bossType,
    drain: 0.92 + Math.min(1.35, (n - 1) * 0.0027),
    preySpeed: 1 + Math.min(0.5, (n - 1) * 0.001),
    predatorSpeed: 1 + Math.min(0.42, (n - 1) * 0.0009),
    preyHealth: 1 + Math.min(1.35, (n - 1) * 0.0027),
    predatorHealth: 1 + Math.min(1.8, (n - 1) * 0.0036),
    seed: (n * 1013904223 + 1664525) >>> 0,
    isFinal: n === LEVEL_COUNT
  };
}

export function phaseLabel(phase) {
  if (phase === 'night') return 'NIGHT';
  if (phase === 'dusk') return 'DUSK';
  return 'DAY';
}

export function levelRoman(n) {
  return String(n).padStart(3, '0');
}
