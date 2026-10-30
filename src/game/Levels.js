import { mulberry32, hash2, clamp } from "./util.js";

export const MAX_LEVEL = 500;
export const LEVELS_PER_CHAPTER = 25;
export const SAVE_KEY = "pupwild.save.v2";

export const BIOMES = [
  {
    key: "emerald", name: "Emerald Hollow", note: "Moss, goldlight & hare tracks",
    ground: [0x39512d, 0x466135, 0x52713c], moss: 0x617f43, dirt: 0x604a32,
    grass: 0x678a3c, foliage: [0x2f4c2c, 0x3b6033, 0x4a743b, 0x567f3f],
    bark: [0x4b3b2c, 0x382c22, 0x574636], fog: 0x8ea67d, accent: 0x9bc76b,
    fogMix: 0.4, fogDensity: 0.017, treeMix: { broad: 0.48, pine: 0.3, birch: 0.14, dead: 0.08 },
    flowers: [0xe9dd9c, 0xf3efe2, 0xb8d7e7, 0xf0b0b0], fireflies: 0.4, snow: false, mushrooms: 1,
  },
  {
    key: "mothwood", name: "Mothwood", note: "Blue mist & old pine song",
    ground: [0x25382f, 0x2c4439, 0x344d41], moss: 0x3f5e4a, dirt: 0x3e4034,
    grass: 0x43684f, foliage: [0x193b34, 0x21483e, 0x2b5547, 0x33604f],
    bark: [0x302e28, 0x26251f, 0x3c3930], fog: 0x5f7f76, accent: 0x66cfc4,
    fogMix: 0.55, fogDensity: 0.023, treeMix: { broad: 0.18, pine: 0.64, birch: 0.1, dead: 0.08 },
    flowers: [0x9fd8d0, 0xdbe7df, 0x8ab3d7], fireflies: 1.1, snow: false, mushrooms: 1.8,
  },
  {
    key: "birchfall", name: "Birchfall", note: "Pale trunks & amber leaf-fall",
    ground: [0x53603b, 0x616b40, 0x6e7746], moss: 0x7f854d, dirt: 0x71553a,
    grass: 0x89914e, foliage: [0x7c863e, 0x9a9a46, 0xb0a34c, 0xc1ab54],
    bark: [0xc8c5b2, 0xb2b1a3, 0xd8d4bf], fog: 0xb5ae86, accent: 0xe0b76a,
    fogMix: 0.42, fogDensity: 0.018, treeMix: { broad: 0.2, pine: 0.12, birch: 0.6, dead: 0.08 },
    flowers: [0xe7d38f, 0xf3e7c1, 0xd7a95e], fireflies: 0.45, snow: false, mushrooms: 0.5,
  },
  {
    key: "ashen", name: "Ashen Pines", note: "Rust needles & a smoked sky",
    ground: [0x3f362e, 0x4b3f33, 0x584737], moss: 0x665d3c, dirt: 0x4d382a,
    grass: 0x6c633d, foliage: [0x3e3b2c, 0x514433, 0x624937, 0x72513a],
    bark: [0x3d3430, 0x2f2825, 0x4d403a], fog: 0x8e7768, accent: 0xe08a58,
    fogMix: 0.55, fogDensity: 0.022, treeMix: { broad: 0.18, pine: 0.58, birch: 0.06, dead: 0.18 },
    flowers: [0xe28a5d, 0xd6b06a, 0xc9c1a5], fireflies: 0.7, snow: false, mushrooms: 1.1,
  },
  {
    key: "moonfen", name: "Moonfen", note: "Black water & waking lights",
    ground: [0x263b36, 0x2c463f, 0x355047], moss: 0x3c6253, dirt: 0x38443d,
    grass: 0x426b5a, foliage: [0x1d423e, 0x25514a, 0x2f6255, 0x39725e],
    bark: [0x333d38, 0x29312d, 0x414b44], fog: 0x577a78, accent: 0x7de3d2,
    fogMix: 0.62, fogDensity: 0.026, treeMix: { broad: 0.3, pine: 0.38, birch: 0.14, dead: 0.18 },
    flowers: [0x9ee8db, 0xcfeee4, 0xa8d4eb], fireflies: 1.5, snow: false, mushrooms: 2.2,
  },
  {
    key: "redgrove", name: "Redgrove", note: "Copper canopy & warm shadows",
    ground: [0x4d3a2e, 0x5c4432, 0x6b4d37], moss: 0x6e6738, dirt: 0x5e3d28,
    grass: 0x79723d, foliage: [0x6a3d2a, 0x824a2f, 0x985838, 0xaa673d],
    bark: [0x4b3428, 0x3b291f, 0x5b4031], fog: 0xa8795e, accent: 0xe08b5a,
    fogMix: 0.45, fogDensity: 0.018, treeMix: { broad: 0.56, pine: 0.16, birch: 0.1, dead: 0.18 },
    flowers: [0xe49a61, 0xd9c07a, 0xedc9a5], fireflies: 0.6, snow: false, mushrooms: 0.8,
  },
  {
    key: "frostpine", name: "Frostpine", note: "Quiet snow & silver bark",
    ground: [0x6f7e79, 0x7d8b85, 0x8b9790], moss: 0x9ba98e, dirt: 0x6e6d62,
    grass: 0x9baa8c, foliage: [0x31524a, 0x3a6156, 0x487063, 0x567f6f],
    bark: [0x5b5650, 0x4b4742, 0x6b665e], fog: 0xb3c5c8, accent: 0xa7e1e7,
    fogMix: 0.56, fogDensity: 0.021, treeMix: { broad: 0.14, pine: 0.66, birch: 0.14, dead: 0.06 },
    flowers: [0xcfe7e9, 0xf4f7f2, 0xa9d4dd], fireflies: 0.2, snow: true, mushrooms: 0.5,
  },
];

const CHAPTER_NAMES = [
  "First Light", "The Green Run", "Moth & Moon", "Pale Timber", "Rust & Root",
  "The Quiet Fen", "Copperfall", "Silver Thaw", "The Long Hunger", "Fernwake",
  "Hollow Song", "Amber Deep", "The Night Crossing", "Briar Crown", "Old Pine Teeth",
  "Moonlit Mile", "The Reddening", "Cold Antler", "The Final Thicket", "Five Hundred",
];

const A = ["Moss", "Fern", "Thistle", "Amber", "Dew", "Bramble", "Cinder", "Moon", "Willow", "Fox", "Ash", "Briar", "Elk", "Pine", "Owl", "Hare", "Rook", "Frost", "Hazel", "Sorrel", "Nettle", "Cedar", "Marten", "Clover", "Vixen"];
const B = ["light", "fall", "run", "deep", "glade", "hollow", "reach", "trail", "shade", "song", "den", "crossing", "rise", "hush", "mire", "step", "wake", "bough", "drift", "rest"];

const PHASES = [
  { key: "dawn", label: "Dawn", time: 0.235 },
  { key: "morning", label: "Morning", time: 0.34 },
  { key: "noon", label: "High sun", time: 0.5 },
  { key: "afternoon", label: "Afternoon", time: 0.6 },
  { key: "dusk", label: "Dusk", time: 0.735 },
  { key: "night", label: "Night", time: 0.865 },
  { key: "deepnight", label: "Deep night", time: 0.94 },
];

function phaseFor(level) {
  if (level === 1) return PHASES[1];
  const m = level % 9;
  if (m === 0) return PHASES[5];
  if (m === 1) return PHASES[6];
  if (m === 4) return PHASES[4];
  if (m === 7) return PHASES[0];
  if (m === 2) return PHASES[3];
  return PHASES[1 + ((level * 7) % 2)];
}

const SUBTITLES = {
  dawn: "The rabbits stir before the sun. Fill your belly early.",
  morning: "The woods are awake. Hunt while the light is kind.",
  noon: "High sun, long shadows, hungry things everywhere.",
  afternoon: "The light is turning gold. Do not let your hunger turn first.",
  dusk: "Night is coming. Eat now, or the dark will eat you.",
  night: "The forest is awake in the dark. Trust your ears.",
  deepnight: "Nothing sleeps out here. Keep moving. Keep feeding.",
};

export function levelInfo(level) {
  level = clamp(Math.round(level), 1, MAX_LEVEL);
  const chapter = Math.floor((level - 1) / LEVELS_PER_CHAPTER) + 1;
  const biome = BIOMES[(level - 1) % BIOMES.length];
  const phase = phaseFor(level);
  const seed = (level * 811 + 4021) >>> 0;
  const rng = mulberry32(seed);
  const boss = level % 25 === 0;
  const nameIndex = Math.floor(rng() * A.length * B.length);
  const madeName = A[nameIndex % A.length] + B[Math.floor(nameIndex / A.length) % B.length];
  const name = level === 1 ? "First Light Clearing" : level === MAX_LEVEL ? "The Five Hundredth" : madeName;
  const preyGoal = boss ? 2 + Math.floor(level / 140) : Math.min(6, 3 + Math.floor((level - 1) / 55));
  const beastGoal = boss ? 1 : Math.min(5, 1 + Math.floor((level - 1) / 38));
  const preySpawn = Math.min(preyGoal + 6, preyGoal + 3 + Math.floor(level / 90));
  const beastSpawn = boss ? 3 : Math.min(beastGoal + 4, beastGoal + 2 + Math.floor(level / 150));
  const bossTypes = ["wolf", "boar", "badger", "wolf"];
  return {
    level, chapter,
    chapterLabel: CHAPTER_NAMES[(chapter - 1) % CHAPTER_NAMES.length],
    biome, phase, phaseKey: phase.key, seed, name, boss,
    bossType: bossTypes[(chapter - 1) % bossTypes.length],
    preyGoal, beastGoal, preySpawn, beastSpawn,
    difficulty: Math.min(2.4, 1 + (level - 1) * 0.009),
    subtitle: SUBTITLES[phase.key],
    clock: phase.time,
  };
}

export function chapterInfo(chapter) {
  chapter = clamp(chapter, 1, 20);
  return {
    chapter,
    name: CHAPTER_NAMES[(chapter - 1) % CHAPTER_NAMES.length],
    range: [((chapter - 1) * LEVELS_PER_CHAPTER) + 1, Math.min(MAX_LEVEL, chapter * LEVELS_PER_CHAPTER)],
  };
}

export function defaultSave() {
  return {
    unlocked: 1,
    cleared: [],
    totalFeasts: 0,
    bestLife: 0,
    settings: { tilt: false, sound: true, sensitivity: 1, quality: "auto" },
    seenIntro: false,
  };
}

export function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    if (!raw || typeof raw !== "object") return defaultSave();
    const base = defaultSave();
    return {
      ...base, ...raw,
      unlocked: clamp(Number(raw.unlocked) || 1, 1, MAX_LEVEL),
      cleared: Array.isArray(raw.cleared) ? raw.cleared.filter(n => Number.isInteger(n) && n >= 1 && n <= MAX_LEVEL) : [],
      settings: { ...base.settings, ...(raw.settings || {}) },
    };
  } catch {
    return defaultSave();
  }
}

export function saveGame(save) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch {}
}

export function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch {}
}

export function timeLabel(time) {
  const total = Math.round(((time % 1) + 1) % 1 * 24 * 60);
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function phaseLabel(time) {
  if (time < 0.2 || time >= 0.82) return "Night";
  if (time < 0.28) return "Dawn";
  if (time < 0.46) return "Morning";
  if (time < 0.58) return "High sun";
  if (time < 0.7) return "Afternoon";
  if (time < 0.82) return "Dusk";
  return "Night";
}

export function isNightTime(time) {
  return time < 0.215 || time >= 0.805;
}
