import './style.css';
import * as THREE from 'three';
import { createWorld } from './world.js';
import { createCanine, PLAYER_PALETTE } from './wolf.js';
import { Animal } from './animals.js';
import { Effects } from './effects.js';
import { AudioEngine } from './audio.js';
import { getLevel, loadSave, saveGame, TOTAL_LEVELS } from './levels.js';
import {
  clamp, damp, lerp, angleDamp, angleWrap, formatClock, timePhase,
  formatDuration, makeRng, TAU, dist2,
} from './utils.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const isCoarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
const isMobile = isCoarse || window.innerWidth < 820;

const dom = {
  app: $('#app'),
  stage: $('#stage'),
  hud: $('#hud'),
  title: $('#title-screen'),
  levels: $('#levels-screen'),
  howto: $('#howto-screen'),
  pause: $('#pause-screen'),
  complete: $('#complete-screen'),
  gameover: $('#gameover-screen'),
  screens: $$('.screen'),
  lifeFill: $('#life-fill'),
  lifeGhost: $('#life-ghost'),
  lifeText: $('#life-text'),
  hudLevel: $('#hud-level'),
  hudBiome: $('#hud-biome'),
  hudWeather: $('#hud-weather'),
  hudTime: $('#hud-time'),
  hudClock: $('#hud-clock'),
  hudHunger: $('#hud-hunger'),
  objEat: $('#obj-eat'),
  objKill: $('#obj-kill'),
  objEatCount: $('#obj-eat-count'),
  objKillCount: $('#obj-kill-count'),
  minimap: $('#minimap'),
  btnPaw: $('#btn-paw'),
  btnBite: $('#btn-bite'),
  btnSprint: $('#btn-sprint'),
  joystick: $('#joystick'),
  joystickKnob: $('.joystick-knob'),
  feedPrompt: $('#feed-prompt'),
  feedRingFill: $('#feed-ring-fill'),
  banner: $('#level-banner'),
  bannerKicker: $('#banner-kicker'),
  bannerLevel: $('#banner-level'),
  bannerName: $('#banner-name'),
  bannerMeta: $('#banner-meta'),
  toast: $('#toast'),
  hudTip: $('#hud-tip'),
  hurtFlash: $('#hurt-flash'),
  lowHealth: $('#low-health'),
  bloodDrops: $('#blood-drops'),
  btnSound: $('#btn-sound'),
  titleSound: $('#title-sound'),
  btnPause: $('#btn-pause'),
  btnPlay: $('#btn-play'),
  btnLevels: $('#btn-levels'),
  btnHowto: $('#btn-howto'),
  levelGrid: $('#level-grid'),
  levelProgressBar: $('#level-progress-bar'),
  levelProgressText: $('#level-progress-text'),
  btnJumpCurrent: $('#btn-jump-current'),
  btnResume: $('#btn-resume'),
  btnResumeX: $('#btn-resume-x'),
  btnRestart: $('#btn-restart'),
  btnQuit: $('#btn-quit'),
  btnSettingSound: $('#btn-setting-sound'),
  btnSettingTilt: $('#btn-setting-tilt'),
  btnSettingQuality: $('#btn-setting-quality'),
  switchSound: $('#switch-sound'),
  switchTilt: $('#switch-tilt'),
  qualityValue: $('#quality-value'),
  btnNext: $('#btn-next'),
  btnCompleteDen: $('#btn-complete-den'),
  btnRetry: $('#btn-retry'),
  btnGameoverDen: $('#btn-gameover-den'),
  completeLevel: $('#complete-level'),
  completeEaten: $('#complete-eaten'),
  completeKills: $('#complete-kills'),
  completeTime: $('#complete-time'),
  completeLife: $('#complete-life'),
  completeLifeBar: $('#complete-life-bar'),
  completeFoot: $('#complete-foot'),
  gameoverLevel: $('#gameover-level'),
  gameoverEaten: $('#gameover-eaten'),
  gameoverKills: $('#gameover-kills'),
  gameoverBest: $('#gameover-best'),
  deathQuote: $('#death-quote'),
  statLevel: $('#stat-level'),
  statEaten: $('#stat-eaten'),
  statKills: $('#stat-kills'),
  continueLine: $('#continue-line'),
  rotateHint: $('#rotate-hint'),
  touchHint: $('#touch-hint'),
  bootError: $('#boot-error'),
  bootErrorText: $('#boot-error-text'),
};

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    powerPreference: 'high-performance',
    alpha: false,
    stencil: false,
  });
} catch (error) {
  showBootError('This browser could not start WebGL. Try an up-to-date Chrome, Safari or Firefox.');
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
renderer.outputColorSpace = THREE.SRGBColorSpace;
dom.stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07110b);
const camera = new THREE.PerspectiveCamera(isMobile ? 68 : 62, window.innerWidth / window.innerHeight, 0.1, 420);
camera.position.set(4, 3, 6);

const playerRig = createCanine({ palette: PLAYER_PALETTE, harness: true, scale: 1 });
const playerRoot = playerRig.root;
scene.add(playerRoot);

// A soft cool fill keeps the black dog readable against dark forest floors.
const playerFill = new THREE.PointLight(0x9fd8ff, 1.35, 4.6, 2);
playerFill.position.set(0, 1.9, -1.05);
playerRoot.add(playerFill);

const effects = new Effects(scene);
const cameraLook = new THREE.Vector3(0, 1, 0);

const player = {
  position: new THREE.Vector3(0, 0, 0),
  heading: 0,
  health: 100,
  speed: 0,
};

const gameApi = {
  world: null,
  camera,
  animals: [],
  hurtPlayer: (...args) => hurtPlayer(...args),
};

let save = loadSave();
let audio = new AudioEngine(save.sound);
let state = 'boot';
let level = getLevel(save.current || 1);
let world = null;
let animals = [];
let elapsed = 0;
let menuTime = 0;
let menuAngle = 0.65;
let levelTime = 0;
let timeOfDay = level.startTime;
let pawCooldown = 0;
let biteCooldown = 0;
let feedProgress = 0;
let feedSoundTimer = 0;
let invuln = 0;
let shake = 0;
let starvingWarned = false;
let lastPhaseId = '';
let completeTimer = 0;
let pendingComplete = false;
let levelCompleteTriggered = false;
let cameraYaw = Math.PI;
let cameraPitch = 0.2;
let lastLookInput = -99;
let frameCount = 0;
let saveTimer = 0;
let toastTimer = null;
let tipTimer = null;
let bannerTimer = null;
let rotateTimer = null;
let currentCell = null;
let pendingHits = [];
let pendingDevours = [];
let playerLunge = 0;
let feedTarget = null;
let floatingCount = 0;
let eaten = 0;
let kills = 0;
let ghostHealth = 100;
let minimapTimer = 0;
let worldRng = makeRng(1);
let joystick = { active: false, id: null, originX: 0, originY: 0, x: 0, y: 0 };
let lookTouch = { active: false, id: null, lastX: 0, lastY: 0 };
let tilt = { enabled: false, supported: false, granted: false, zero: null, x: 0, y: 0 };
let keys = Object.create(null);
let input = { x: 0, y: 0, sprint: false };

// ---------------------------------------------------------------------------
// Small UI helpers
// ---------------------------------------------------------------------------
function showBootError(message) {
  if (!dom.bootError) return;
  dom.bootErrorText.textContent = message;
  dom.bootError.classList.remove('hidden');
}

function setUse(button, id) {
  const use = button?.querySelector('use');
  if (use) use.setAttribute('href', `#${id}`);
}

function updateSoundUI() {
  const id = save.sound ? 'i-sound' : 'i-mute';
  setUse(dom.btnSound, id);
  setUse(dom.titleSound, id);
  dom.switchSound?.classList.toggle('on', save.sound);
}

function updateTiltUI() {
  dom.switchTilt?.classList.toggle('on', Boolean(save.tilt));
}

function updateQualityUI() {
  if (dom.qualityValue) dom.qualityValue.textContent = String(save.quality || 'auto').toUpperCase();
}

function hideAllScreens() {
  for (const screen of dom.screens) screen.classList.add('hidden');
}

function showScreen(id) {
  hideAllScreens();
  const screen = document.getElementById(id);
  if (screen) screen.classList.remove('hidden');
}

function showHud(visible) {
  dom.hud.classList.toggle('hidden', !visible);
}

function updateTitleStats() {
  dom.statLevel.textContent = String(save.current || 1);
  dom.statEaten.textContent = String(save.eaten || 0);
  dom.statKills.textContent = String(save.kills || 0);
  const current = getLevel(save.current || 1);
  dom.continueLine.innerHTML = save.unlocked > 1
    ? `Continue at <b>Level ${current.level} · ${current.biome.name}</b>`
    : `Begin at <b>Level 1 · ${current.biome.name}</b>`;
}

function weatherLabel(weather) {
  return ({
    clear: 'Clear',
    mist: 'Mist',
    fog: 'Fog',
    rain: 'Rain',
    snow: 'Snow',
    leaves: 'Falling Leaves',
  })[weather] || 'Clear';
}

function showToast(message, cls = '', duration = 2200) {
  clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.className = `toast ${cls}`.trim();
  dom.toast.classList.remove('hidden');
  toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), duration);
}

function showTip(message, duration = 3400) {
  clearTimeout(tipTimer);
  dom.hudTip.textContent = message;
  dom.hudTip.classList.add('show');
  tipTimer = setTimeout(() => dom.hudTip.classList.remove('show'), duration);
}

function showBanner() {
  clearTimeout(bannerTimer);
  const phase = timePhase(level.startTime);
  dom.bannerKicker.textContent = level.level === 1
    ? 'THE HUNT BEGINS'
    : level.level === 500
      ? 'THE LAST WOOD'
      : level.boss
        ? 'AN OLD TERROR STIRS'
        : level.alpha
          ? 'A RIVAL HAS SCENTED YOU'
          : 'THE WOODS REMEMBER';
  dom.bannerLevel.textContent = `LEVEL ${level.level}`;
  dom.bannerName.textContent = level.name;
  dom.bannerMeta.textContent = `${phase.label.toUpperCase()} · ${weatherLabel(level.weather).toUpperCase()}`;
  dom.banner.classList.remove('hidden');
  bannerTimer = setTimeout(() => dom.banner.classList.add('hidden'), 2800);
}

function updateHudStatic() {
  dom.hudLevel.textContent = `LEVEL ${level.level}`;
  dom.hudBiome.textContent = level.biome.name;
  dom.hudWeather.textContent = weatherLabel(level.weather);
}

function buildLevelGrid() {
  if (!dom.levelGrid) return;
  dom.levelGrid.innerHTML = '';
  const frag = document.createDocumentFragment();
  const current = save.current || 1;
  currentCell = null;
  for (let n = 1; n <= TOTAL_LEVELS; n++) {
    const l = getLevel(n);
    const unlocked = n <= save.unlocked;
    const cleared = n <= save.cleared;
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = `level-cell ${unlocked ? 'unlocked' : 'locked'}${n === current ? ' current' : ''}${cleared ? ' cleared' : ''}`;
    cell.setAttribute('aria-label', unlocked ? `Level ${n}: ${l.name}` : `Level ${n} locked`);
    const phase = timePhase(l.startTime);
    const dotClass = l.boss ? 'boss' : phase.id === 'night' ? 'night' : '';
    cell.innerHTML = `<span class="cell-dot ${dotClass}"></span><b>${n}</b><small>${l.biome.name.split(' ')[0]}</small>`;
    if (!unlocked) {
      cell.disabled = true;
      cell.title = 'Clear earlier woods to unlock';
    } else {
      cell.addEventListener('click', () => {
        audio.click();
        hideAllScreens();
        startGame(n);
      });
    }
    if (n === current) currentCell = cell;
    frag.appendChild(cell);
  }
  dom.levelGrid.appendChild(frag);
  const pct = clamp((save.unlocked / TOTAL_LEVELS) * 100, 1, 100);
  dom.levelProgressBar.style.width = `${pct}%`;
  dom.levelProgressText.textContent = `${save.unlocked} / ${TOTAL_LEVELS} unlocked`;
}

function openLevels() {
  buildLevelGrid();
  showScreen('levels-screen');
  if (currentCell) {
    setTimeout(() => currentCell.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
  }
}

function openHowto() {
  showScreen('howto-screen');
}

function closePanel(id) {
  const screen = document.getElementById(id);
  if (!screen) return;
  if (id === 'levels-screen' || id === 'howto-screen') {
    showScreen('title-screen');
  } else if (id === 'pause-screen') {
    resumeGame();
  }
}

// ---------------------------------------------------------------------------
// World and level lifecycle
// ---------------------------------------------------------------------------
function clearAnimals() {
  for (const animal of animals) {
    scene.remove(animal.root);
    animal.dispose();
  }
  animals = [];
  gameApi.animals = animals;
}

function loadWorld(levelNumber) {
  level = getLevel(levelNumber);
  if (world) {
    world.dispose();
    world = null;
  }
  clearAnimals();
  effects.clear();
  world = createWorld(scene, level, { quality: save.quality, isMobile });
  gameApi.world = world;
  worldRng = makeRng(level.seed ^ 0x9b1a);

  player.position.set(0, world.heightAt(0, 0), 0);
  player.heading = 0;
  playerRoot.position.copy(player.position);
  playerRoot.rotation.y = 0;
  playerRoot.visible = true;
  timeOfDay = level.startTime;
  world.setTime(timeOfDay, player.position);

  cameraYaw = Math.PI;
  cameraPitch = 0.2;
  snapCamera();
  updateHudStatic();
}

function spawnPosition(minR, maxR, rng = worldRng) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const angle = rng.range(0, TAU);
    const radius = rng.range(minR, maxR);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (Math.hypot(x, z) > 89) continue;
    if (world.pond && Math.hypot(x - world.pond.x, z - world.pond.z) < world.pond.r + 2.2) continue;
    let blocked = false;
    for (const c of world.colliders) {
      if (Math.hypot(x - c.x, z - c.z) < c.r + 1.0) { blocked = true; break; }
    }
    if (blocked) continue;
    let crowded = false;
    for (const a of animals) {
      if (Math.hypot(x - a.position.x, z - a.position.z) < 2.4) { crowded = true; break; }
    }
    if (crowded) continue;
    return { x, z };
  }
  const angle = rng.range(0, TAU);
  const radius = rng.range(minR, maxR);
  return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}

function spawnAnimal(type, position, options = {}) {
  const animal = new Animal(type, level, position, {
    rng: options.rng || makeRng(Math.floor(worldRng.next() * 1e9)),
    alpha: Boolean(options.alpha),
    heading: worldRng.range(0, TAU),
  });
  animal.addTo(scene);
  animals.push(animal);
  gameApi.animals = animals;
  return animal;
}

function spawnLevelAnimals() {
  clearAnimals();
  const rng = makeRng(level.seed ^ 0x77aa33);
  const preyCount = Math.min(13, level.eatGoal + 3);
  for (let i = 0; i < preyCount; i++) {
    const type = rng.pick(level.preyPool);
    spawnAnimal(type, spawnPosition(15, 39, rng), { rng: makeRng(Math.floor(rng.next() * 1e9)) });
  }
  const predatorTypes = [];
  if (level.alphaType) predatorTypes.push(level.alphaType);
  while (predatorTypes.length < level.killGoal) {
    predatorTypes.push(rng.pick(level.predatorPool));
  }
  predatorTypes.forEach((type, i) => {
    spawnAnimal(type, spawnPosition(22, 46, rng), {
      alpha: i === 0 && Boolean(level.alphaType),
      rng: makeRng(Math.floor(rng.next() * 1e9)),
    });
  });
}

function spawnPreviewAnimals() {
  clearAnimals();
  const rng = makeRng(level.seed ^ 0x1234);
  spawnAnimal('rabbit', { x: rng.range(-8, 8), z: rng.range(5, 12) }, { rng });
  spawnAnimal('rabbit', { x: rng.range(-11, -4), z: rng.range(-6, 2) }, { rng });
  if (level.level > 3) spawnAnimal('deer', { x: rng.range(5, 12), z: rng.range(-9, -3) }, { rng });
}

function snapCamera() {
  const horiz = Math.cos(cameraPitch) * 6.5;
  camera.position.set(
    player.position.x + Math.sin(cameraYaw) * horiz,
    player.position.y + 2.0 + Math.sin(cameraPitch) * 6.5,
    player.position.z + Math.cos(cameraYaw) * horiz
  );
  cameraLook.set(player.position.x, player.position.y + 1.05, player.position.z);
  camera.lookAt(cameraLook);
}

function startGame(levelNumber) {
  audio.ensure();
  if (!world || level.level !== levelNumber) loadWorld(levelNumber);
  state = 'playing';
  hideAllScreens();
  showHud(true);
  clearAnimals();
  effects.clear();
  pendingHits = [];
  pendingDevours = [];
  pendingComplete = false;
  completeTimer = 0;
  levelCompleteTriggered = false;
  pawCooldown = 0;
  biteCooldown = 0;
  feedProgress = 0;
  feedTarget = null;
  invuln = 0;
  playerLunge = 0;
  levelTime = 0;
  eaten = 0;
  kills = 0;
  ghostHealth = player.health = clamp(save.health || 100, 55, 100);
  starvingWarned = false;
  lastPhaseId = '';
  timeOfDay = level.startTime;
  player.position.set(0, world.heightAt(0, 0), 0);
  player.heading = 0;
  playerRoot.position.copy(player.position);
  playerRoot.rotation.y = 0;
  playerRoot.visible = true;
  playerRig.root.visible = true;
  cameraYaw = Math.PI;
  cameraPitch = 0.2;
  snapCamera();
  spawnLevelAnimals();
  world.setTime(timeOfDay, player.position);
  updateHudStatic();
  updateObjectiveHud();
  updateHud(0.016);
  save.current = levelNumber;
  save.unlocked = Math.max(save.unlocked, levelNumber);
  save.best = Math.max(save.best || 1, levelNumber);
  save.health = player.health;
  saveGame(save);
  showBanner();
  const mobileHint = isCoarse
    ? 'Left side to move · drag right to look · PAW and BITE to hunt'
    : 'WASD to move · J paw · K bite · Shift to sprint';
  showTip(mobileHint, 5200);
  audio.inGame = true;
}

function goTitle() {
  if (state === 'playing' || state === 'paused' || state === 'complete' || state === 'gameover') {
    save.health = clamp(player.health || save.health, 1, 100);
    saveGame(save);
  }
  state = 'title';
  audio.inGame = false;
  showHud(false);
  showScreen('title-screen');
  if (!world || level.level !== save.current) {
    loadWorld(save.current);
    spawnPreviewAnimals();
  } else {
    clearAnimals();
    effects.clear();
    spawnPreviewAnimals();
    player.position.set(0, world.heightAt(0, 0), 0);
    player.heading = 0;
    playerRoot.position.copy(player.position);
    playerRoot.rotation.y = 0;
    cameraYaw = Math.PI;
    cameraPitch = 0.2;
    snapCamera();
  }
  updateTitleStats();
  updateSoundUI();
  updateTiltUI();
  updateQualityUI();
  menuTime = 0;
  menuAngle = 0.65;
}

function restartLevel() {
  save.health = 72;
  startGame(level.level);
}

function pauseGame() {
  if (state !== 'playing') return;
  state = 'paused';
  save.health = clamp(player.health, 1, 100);
  saveGame(save);
  showScreen('pause-screen');
  updateSoundUI();
  updateTiltUI();
  updateQualityUI();
}

function resumeGame() {
  if (state !== 'paused') return;
  state = 'playing';
  hideAllScreens();
  showHud(true);
  lastFrameTime = performance.now();
}

function completeLevel() {
  if (levelCompleteTriggered || state !== 'playing') return;
  levelCompleteTriggered = true;
  state = 'complete';
  save.health = clamp(player.health + 25, 1, 100);
  save.cleared = Math.max(save.cleared, level.level);
  save.unlocked = Math.max(save.unlocked, Math.min(TOTAL_LEVELS, level.level + 1));
  save.best = Math.max(save.best || 1, level.level);
  save.current = Math.min(TOTAL_LEVELS, level.level + 1);
  saveGame(save);
  audio.levelComplete();
  dom.completeLevel.textContent = `LEVEL ${level.level} · ${level.biome.name.toUpperCase()}`;
  dom.completeEaten.textContent = String(eatenCount());
  dom.completeKills.textContent = String(killCount());
  dom.completeTime.textContent = formatDuration(levelTime);
  dom.completeLife.textContent = `${Math.round(save.health)} / 100`;
  dom.completeLifeBar.style.width = `${save.health}%`;
  dom.completeFoot.textContent = level.level === 500
    ? 'The last wood is quiet. You are the thing it fears.'
    : level.level % 25 === 0
      ? 'The old terror falls. Deeper woods wait.'
      : 'The trees close behind you.';
  dom.btnNext.querySelector('span').textContent = level.level >= TOTAL_LEVELS ? 'Return to Den' : 'Next level';
  showScreen('complete-screen');
  showHud(true);
  updateTitleStats();
}

function gameOver(cause = 'starved') {
  if (state !== 'playing') return;
  state = 'gameover';
  save.health = 72;
  save.current = level.level;
  saveGame(save);
  audio.gameOver();
  dom.gameoverLevel.textContent = `LEVEL ${level.level} · ${level.biome.name.toUpperCase()}`;
  dom.gameoverEaten.textContent = String(eatenCount());
  dom.gameoverKills.textContent = String(killCount());
  dom.gameoverBest.textContent = String(save.best || save.unlocked || 1);
  dom.deathQuote.textContent = cause === 'mauled'
    ? '“The woods did not kill you. Something with teeth did.”'
    : '“You stopped feeding. The forest noticed.”';
  showScreen('gameover-screen');
  showHud(true);
}

function eatenCount() {
  return eaten;
}

function killCount() {
  return kills;
}

function persist() {
  save.health = clamp(player.health || save.health, 1, 100);
  if (state === 'playing' || state === 'paused' || state === 'complete' || state === 'gameover') {
    save.current = level.level;
  }
  saveGame(save);
}

// ---------------------------------------------------------------------------
// Input, combat and simulation
// ---------------------------------------------------------------------------
function readInput() {
  let x = input.x;
  let y = input.y;
  if (keys['w'] || keys['arrowup']) y += 1;
  if (keys['s'] || keys['arrowdown']) y -= 1;
  if (keys['a'] || keys['arrowleft']) x -= 1;
  if (keys['d'] || keys['arrowright']) x += 1;
  if (tilt.enabled && !joystick.active) {
    x += tilt.x * 0.9;
    y += tilt.y * 0.9;
  }
  const len = Math.hypot(x, y);
  if (len > 1) {
    x /= len;
    y /= len;
  }
  return {
    x,
    y,
    len: Math.min(1, len),
    sprint: input.sprint || Boolean(keys['shift']),
  };
}

function doAttack(kind) {
  if (state !== 'playing') return;
  if (kind === 'paw') {
    if (pawCooldown > 0) return;
    pawCooldown = 0.48;
    playerRig.triggerPaw();
    audio.paw();
    effects.slash(player.position, player.heading, 0xd8fff0);
    addShake(0.06);
    pendingHits.push({ time: 0.1, kind: 'paw' });
  } else {
    if (biteCooldown > 0) return;
    biteCooldown = 0.9;
    playerRig.triggerBite();
    audio.bite();
    effects.slash(player.position, player.heading, 0xffd27a);
    addShake(0.11);
    playerLunge = 0.18;
    pendingHits.push({ time: 0.17, kind: 'bite' });
  }
  vibrate(12);
}

function resolveHit(kind) {
  const forward = new THREE.Vector3(Math.sin(player.heading), 0, Math.cos(player.heading));
  const isBite = kind === 'bite';
  const damage = isBite
    ? 30 + Math.min(80, level.level * 0.16)
    : 16 + Math.min(42, level.level * 0.084);
  const range = (isBite ? 2.85 : 2.95);
  const arc = isBite ? 0.92 : 1.18;
  let hitAny = false;

  for (const animal of [...animals]) {
    if (animal.dead || animal.consumed) continue;
    const dx = animal.position.x - player.position.x;
    const dz = animal.position.z - player.position.z;
    const d = Math.hypot(dx, dz);
    if (d > range + animal.radius) continue;
    const angle = Math.atan2(dx, dz);
    if (Math.abs(angleWrap(angle - player.heading)) > arc) continue;

    const instant = isBite && animal.isPrey;
    const result = animal.takeDamage(damage, { instant });
    const hitPos = new THREE.Vector3(animal.position.x, animal.position.y + animal.bodyCenter + 0.15, animal.position.z);
    effects.blood(hitPos, forward, isBite ? 1.35 : 0.9);
    effects.sparks(hitPos, isBite ? 0xffd27a : 0xd8fff0);
    effects.decal(animal.position, animal.radius * 1.2);
    audio.hit(isBite);
    addShake(isBite ? 0.2 : 0.1);
    floatText(`-${Math.round(result.damage)}`, hitPos, isBite ? 'crit' : 'damage');
    hitAny = true;
    if (result.killed) handleKill(animal, instant);
  }

  if (hitAny) {
    vibrate(isBite ? [16, 20, 16] : 10);
  } else {
    effects.dust(player.position, level.biome.ground);
  }
}

function handleKill(animal, instant) {
  effects.blood(
    new THREE.Vector3(animal.position.x, animal.position.y + animal.bodyCenter, animal.position.z),
    null,
    animal.isPrey ? 1.2 : 1.6
  );
  effects.decal(animal.position, animal.radius * 1.9);
  if (animal.isPrey) {
    audio.squeak();
    if (!instant) showTip('Devour the kill to feed your life', 2400);
  } else {
    kills++;
    save.kills = (save.kills || 0) + 1;
    save.best = Math.max(save.best || 1, level.level);
    audio.growl();
    addShake(0.22);
    floatText('FELLED', new THREE.Vector3(animal.position.x, animal.position.y + animal.bodyCenter + 0.7, animal.position.z), 'small');
    updateObjectiveHud();
  }
  if (instant && animal.isPrey) {
    pendingDevours.push({ animal, timer: 0.24 });
  }
  checkComplete();
}

function devour(animal) {
  if (!animal || !animal.consume()) return;
  const heal = animal.meat;
  player.health = Math.min(100, player.health + heal);
  save.health = player.health;
  if (animal.isPrey) {
    eaten++;
    save.eaten = (save.eaten || 0) + 1;
    floatText(`+${heal} LIFE`, new THREE.Vector3(player.position.x, player.position.y + 1.65, player.position.z), 'life');
  } else {
    floatText(`+${heal} LIFE`, new THREE.Vector3(player.position.x, player.position.y + 1.65, player.position.z), 'life');
  }
  audio.eat();
  effects.blood(
    new THREE.Vector3(animal.position.x, animal.position.y + 0.35, animal.position.z),
    null,
    1.1
  );
  feedProgress = 0;
  feedTarget = null;
  dom.feedPrompt.classList.add('hidden');
  updateObjectiveHud();
  checkComplete();
}

function checkComplete() {
  if (levelCompleteTriggered || pendingComplete) return;
  if (eaten >= level.eatGoal && kills >= level.killGoal) {
    pendingComplete = true;
    completeTimer = 1.05;
    showToast('The wood is yours. Move deeper.', 'warn', 2100);
  }
}

function updateObjectiveHud() {
  dom.objEatCount.textContent = `${Math.min(eaten, level.eatGoal)} / ${level.eatGoal}`;
  dom.objKillCount.textContent = `${Math.min(kills, level.killGoal)} / ${level.killGoal}`;
  dom.objEat.classList.toggle('done', eaten >= level.eatGoal);
  dom.objKill.classList.toggle('done', kills >= level.killGoal);
}

function addShake(amount) {
  shake = Math.max(shake, amount);
}

function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* haptics are optional */
  }
}

function flashHurt() {
  dom.hurtFlash.classList.add('on');
  setTimeout(() => dom.hurtFlash.classList.remove('on'), 110);
  for (let i = 0; i < 4; i++) {
    const drop = document.createElement('span');
    drop.className = 'blood-drop';
    drop.style.left = `${8 + Math.random() * 84}%`;
    drop.style.top = `${8 + Math.random() * 18}%`;
    drop.style.animationDelay = `${Math.random() * 0.18}s`;
    drop.style.transform = `scale(${0.7 + Math.random() * 1.1})`;
    dom.bloodDrops.appendChild(drop);
    setTimeout(() => drop.remove(), 1500);
  }
}

function hurtPlayer(amount, source) {
  if (state !== 'playing' || invuln > 0 || player.health <= 0) return;
  invuln = 0.78;
  player.health = Math.max(0, player.health - amount);
  save.health = player.health;
  playerRig.triggerHurt();
  addShake(0.45);
  flashHurt();
  audio.hurt();
  vibrate([30, 30, 50]);
  floatText(`-${Math.round(amount)}`, new THREE.Vector3(player.position.x, player.position.y + 1.75, player.position.z), 'damage');
  if (source?.position) {
    const dx = player.position.x - source.position.x;
    const dz = player.position.z - source.position.z;
    const d = Math.hypot(dx, dz) || 1;
    player.position.x += (dx / d) * 1.15;
    player.position.z += (dz / d) * 1.15;
  }
  if (player.health <= 0) gameOver('mauled');
}

function updateFeeding(dt) {
  let nearest = null;
  let nearestD = 2.7;
  for (const animal of animals) {
    if (!animal.dead || !animal.edible || animal.consumed) continue;
    const d = dist2(player.position.x, player.position.z, animal.position.x, animal.position.z);
    if (d < nearestD) {
      nearestD = d;
      nearest = animal;
    }
  }
  feedTarget = nearest;
  if (!nearest) {
    feedProgress = Math.max(0, feedProgress - dt * 2);
    dom.feedPrompt.classList.add('hidden');
    return;
  }
  dom.feedPrompt.classList.remove('hidden');
  const speedFactor = player.speed < 1.2 ? 1 : 0.45;
  feedProgress = Math.min(1, feedProgress + (dt * speedFactor) / 0.9);
  playerRig.triggerFeed();
  dom.feedRingFill.style.strokeDashoffset = String(94.2 * (1 - feedProgress));
  feedSoundTimer -= dt;
  if (feedSoundTimer <= 0) {
    audio.eat();
    feedSoundTimer = 0.42;
  }
  if (feedProgress >= 1) devour(nearest);
}

function updateSpawns(dt) {
  if (pendingComplete || levelCompleteTriggered) return;
  spawnTimer -= dt;
  if (spawnTimer > 0) return;
  spawnTimer = 2.6;
  const preyAlive = animals.filter((a) => a.isPrey && !a.dead && !a.consumed).length;
  if (preyAlive < 4 && eaten < level.eatGoal) {
    const rng = makeRng(Math.floor(worldRng.next() * 1e9));
    const type = rng.pick(level.preyPool);
    spawnAnimal(type, spawnPosition(25, 46, rng), { rng });
    return;
  }
  const predatorsAlive = animals.filter((a) => !a.isPrey && !a.dead && !a.consumed).length;
  if (predatorsAlive < level.killGoal - kills && kills < level.killGoal) {
    const rng = makeRng(Math.floor(worldRng.next() * 1e9));
    const type = rng.pick(level.predatorPool);
    spawnAnimal(type, spawnPosition(28, 48, rng), { rng });
  }
}

let spawnTimer = 0;
let footTimer = 0;

function updateAnimals(dt) {
  for (let i = animals.length - 1; i >= 0; i--) {
    const animal = animals[i];
    animal.update(dt, elapsed, { position: player.position, night: world.nightAmount }, gameApi);
    if (animal.gone || animal.consumed) {
      scene.remove(animal.root);
      animal.dispose();
      animals.splice(i, 1);
      gameApi.animals = animals;
    }
  }
}

function updateCamera(dt) {
  if (state !== 'playing') return;
  if (player.speed > 1.2 && elapsed - lastLookInput > 1.9) {
    const inp = readInput();
    if (inp.y > 0.42 && Math.abs(inp.x) < 0.42) {
      cameraYaw = angleDamp(cameraYaw, player.heading + Math.PI, 1.7, dt);
    }
  }
  const horiz = Math.cos(cameraPitch) * 6.5;
  const desiredX = player.position.x + Math.sin(cameraYaw) * horiz;
  const desiredZ = player.position.z + Math.cos(cameraYaw) * horiz;
  let desiredY = player.position.y + 2.0 + Math.sin(cameraPitch) * 6.5;
  if (world) {
    const groundY = world.heightAt(desiredX, desiredZ);
    desiredY = Math.max(desiredY, groundY + 0.85);
  }
  const blend = 1 - Math.exp(-9 * dt);
  camera.position.x = lerp(camera.position.x, desiredX, blend);
  camera.position.y = lerp(camera.position.y, desiredY, blend);
  camera.position.z = lerp(camera.position.z, desiredZ, blend);

  const fx = Math.sin(player.heading);
  const fz = Math.cos(player.heading);
  const target = new THREE.Vector3(
    player.position.x + fx * 1.55,
    player.position.y + 1.05,
    player.position.z + fz * 1.55
  );
  cameraLook.lerp(target, 1 - Math.exp(-10 * dt));

  const shakeX = (Math.random() - 0.5) * shake;
  const shakeY = (Math.random() - 0.5) * shake * 0.6;
  camera.position.x += shakeX;
  camera.position.y += shakeY;
  camera.lookAt(cameraLook);
  shake = damp(shake, 0, 7, dt);
}

function updateGame(dt) {
  if (state !== 'playing') return;
  levelTime += dt;
  timeOfDay = (level.startTime + levelTime / level.cycleDuration) % 1;
  world.setTime(timeOfDay, player.position);
  world.update(dt, elapsed, player.position);

  invuln = Math.max(0, invuln - dt);
  pawCooldown = Math.max(0, pawCooldown - dt);
  biteCooldown = Math.max(0, biteCooldown - dt);
  playerLunge = Math.max(0, playerLunge - dt);
  spawnTimer = Math.max(0, spawnTimer - dt);
  footTimer = Math.max(0, footTimer - dt);
  feedSoundTimer = Math.max(0, feedSoundTimer - dt);

  for (let i = pendingHits.length - 1; i >= 0; i--) {
    pendingHits[i].time -= dt;
    if (pendingHits[i].time <= 0) {
      resolveHit(pendingHits[i].kind);
      pendingHits.splice(i, 1);
    }
  }
  for (let i = pendingDevours.length - 1; i >= 0; i--) {
    pendingDevours[i].timer -= dt;
    if (pendingDevours[i].timer <= 0) {
      devour(pendingDevours[i].animal);
      pendingDevours.splice(i, 1);
    }
  }
  if (pendingComplete) {
    completeTimer -= dt;
    if (completeTimer <= 0) {
      completeLevel();
      return;
    }
  }

  const inp = readInput();
  const moving = inp.len > 0.055;
  const sprint = inp.sprint && moving;
  const maxSpeed = sprint ? 8.7 : 5.4;
  let speed = moving ? maxSpeed * inp.len : 0;
  if (playerRig.feeding) speed *= 0.42;

  const forwardX = -Math.sin(cameraYaw);
  const forwardZ = -Math.cos(cameraYaw);
  const rightX = Math.cos(cameraYaw);
  const rightZ = -Math.sin(cameraYaw);
  let moveX = forwardX * inp.y + rightX * inp.x;
  let moveZ = forwardZ * inp.y + rightZ * inp.x;
  const moveLen = Math.hypot(moveX, moveZ);
  if (moveLen > 0.001) {
    moveX /= moveLen;
    moveZ /= moveLen;
  }

  if (moving) {
    const targetHeading = Math.atan2(moveX, moveZ);
    player.heading = angleDamp(player.heading, targetHeading, 12, dt);
  }
  player.speed = speed;
  if (speed > 0.01) {
    player.position.x += Math.sin(player.heading) * speed * dt;
    player.position.z += Math.cos(player.heading) * speed * dt;
  }
  if (playerLunge > 0) {
    player.position.x += Math.sin(player.heading) * 4.2 * dt;
    player.position.z += Math.cos(player.heading) * 4.2 * dt;
  }

  // Trees and the edge of the playable wood.
  for (const c of world.colliders) {
    const dx = player.position.x - c.x;
    const dz = player.position.z - c.z;
    const min = 0.48 + c.r;
    const d = Math.hypot(dx, dz);
    if (d > 0.001 && d < min) {
      player.position.x += (dx / d) * (min - d);
      player.position.z += (dz / d) * (min - d);
    }
  }
  for (const animal of animals) {
    if (animal.dead || animal.consumed) continue;
    const dx = player.position.x - animal.position.x;
    const dz = player.position.z - animal.position.z;
    const min = 0.46 + animal.radius;
    const d = Math.hypot(dx, dz);
    if (d > 0.001 && d < min) {
      player.position.x += (dx / d) * (min - d) * 0.55;
      player.position.z += (dz / d) * (min - d) * 0.55;
    }
  }
  const edge = Math.hypot(player.position.x, player.position.z);
  if (edge > 93) {
    player.position.x = (player.position.x / edge) * 93;
    player.position.z = (player.position.z / edge) * 93;
  }

  player.position.y = world.heightAt(player.position.x, player.position.z);
  playerRoot.position.copy(player.position);
  playerRoot.rotation.y = player.heading;

  const moveAmount = clamp(speed / maxSpeed, 0, 1.2);
  playerRig.update(dt, elapsed, {
    speed: moveAmount,
    sprint,
    night: world.nightAmount,
    lookYaw: Math.sin(elapsed * 0.4) * 0.08,
  });

  if (moving && footTimer <= 0) {
    audio.footstep(sprint);
    const side = Math.sin(elapsed * 9) > 0 ? 1 : -1;
    effects.dust(
      new THREE.Vector3(
        player.position.x + Math.sin(player.heading) * 0.5 - Math.cos(player.heading) * side * 0.22,
        player.position.y + 0.08,
        player.position.z + Math.cos(player.heading) * 0.5 + Math.sin(player.heading) * side * 0.22
      ),
      level.biome.ground
    );
    footTimer = sprint ? 0.2 : 0.33;
  }

  updateAnimals(dt);
  updateSpawns(dt);
  updateFeeding(dt);

  // Hunger is the clock you cannot outrun.
  if (levelTime > 2.4) {
    const night = world.nightAmount;
    const drain = 0.22 + level.level * 0.00035 + (sprint ? 0.52 : 0) + night * 0.23;
    player.health = Math.max(0, player.health - drain * dt);
    save.health = player.health;
    if (player.health <= 0) {
      gameOver('starved');
      return;
    }
  }
  if (!starvingWarned && player.health < 30) {
    starvingWarned = true;
    showToast('You are starving. Devour prey to survive.', 'bad', 3000);
    showTip('Stand over a kill to feed. Life drains faster at night.', 4200);
  }

  updateCamera(dt);
  updateHud(dt);

  const phase = timePhase(timeOfDay);
  if (phase.id !== lastPhaseId) {
    if (lastPhaseId && levelTime > 3) {
      showToast(phase.id === 'night' ? 'Night falls. The predators grow bold.' : `${phase.label} breaks over the wood.`, phase.id === 'night' ? 'warn' : '', 2400);
    }
    lastPhaseId = phase.id;
  }

  saveTimer += dt;
  if (saveTimer > 5) {
    saveTimer = 0;
    save.health = clamp(player.health, 1, 100);
    save.current = level.level;
    saveGame(save);
  }

  audio.update(dt, {
    night: world.nightAmount,
    health: player.health,
    inGame: true,
  });
}

const previewPlayer = { position: new THREE.Vector3(0, 0, 1000), night: 0 };

function updateMenu(dt) {
  if (state !== 'title') return;
  menuTime += dt;
  menuAngle += dt * 0.075;
  world.setTime((level.startTime + menuTime * 0.0009) % 1, player.position);
  world.update(dt, elapsed, player.position);
  playerRig.update(dt, elapsed, {
    speed: 0,
    sprint: false,
    night: world.nightAmount,
    lookYaw: Math.sin(menuTime * 0.35) * 0.32,
  });
  playerRoot.position.copy(player.position);
  playerRoot.rotation.y = 0;

  for (let i = animals.length - 1; i >= 0; i--) {
    const animal = animals[i];
    animal.update(dt, elapsed, previewPlayer, gameApi);
    if (animal.gone || animal.consumed) {
      scene.remove(animal.root);
      animal.dispose();
      animals.splice(i, 1);
      gameApi.animals = animals;
    }
  }

  const dist = 6.7;
  const desired = new THREE.Vector3(
    player.position.x + Math.sin(menuAngle) * dist,
    player.position.y + 2.35 + Math.sin(menuTime * 0.45) * 0.12,
    player.position.z + Math.cos(menuAngle) * dist
  );
  camera.position.lerp(desired, 1 - Math.exp(-3.4 * dt));
  const narrow = window.innerWidth < 720;
  const target = new THREE.Vector3(
    player.position.x - (narrow ? 2.8 : 1.0),
    player.position.y + (narrow ? -0.25 : 0.95),
    player.position.z
  );
  cameraLook.lerp(target, 1 - Math.exp(-3.8 * dt));
  camera.lookAt(cameraLook);
  audio.update(dt, { night: world.nightAmount, health: 100, inGame: false });
}

// ---------------------------------------------------------------------------
// HUD, minimap and floating combat text
// ---------------------------------------------------------------------------
const minimapCtx = dom.minimap ? dom.minimap.getContext('2d') : null;

function floatText(text, worldPos, cls = '') {
  if (!worldPos || floatingCount > 18) return;
  const v = worldPos.clone().project(camera);
  if (v.z > 1.1 || v.z < -1) return;
  const x = (v.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
  if (x < -80 || x > window.innerWidth + 80 || y < -60 || y > window.innerHeight + 60) return;
  const el = document.createElement('span');
  el.className = `float-text ${cls}`.trim();
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  dom.app.appendChild(el);
  floatingCount++;
  window.setTimeout(() => {
    el.remove();
    floatingCount = Math.max(0, floatingCount - 1);
  }, 1150);
}

function drawMinimap() {
  const ctx = minimapCtx;
  if (!ctx || !world || !dom.minimap) return;
  const w = dom.minimap.width;
  const h = dom.minimap.height;
  const cx = w / 2;
  const cy = h / 2;
  const range = 72;
  const scale = (w / 2 - 5) / range;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, w / 2 - 1, 0, TAU);
  ctx.clip();
  const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, w / 2);
  grad.addColorStop(0, 'rgba(29,60,39,0.94)');
  grad.addColorStop(0.65, 'rgba(16,37,24,0.92)');
  grad.addColorStop(1, 'rgba(5,14,9,0.96)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.translate(cx, cy);
  // The pond is a landmark worth keeping on the map.
  if (world.pond) {
    const px = (world.pond.x - player.position.x) * scale;
    const py = (world.pond.z - player.position.z) * scale;
    if (Math.hypot(px, py) < w / 2 + world.pond.r * scale) {
      ctx.beginPath();
      ctx.arc(px, py, world.pond.r * scale, 0, TAU);
      ctx.fillStyle = 'rgba(42,92,104,0.72)';
      ctx.fill();
    }
  }

  // Trees are small mossy dots.
  ctx.fillStyle = 'rgba(122,150,100,0.42)';
  for (const c of world.colliders) {
    const x = (c.x - player.position.x) * scale;
    const y = (c.z - player.position.z) * scale;
    if (x * x + y * y > (w / 2 + 8) * (w / 2 + 8)) continue;
    const r = Math.max(0.7, c.r * scale * 0.55);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  }

  // Living things.
  for (const animal of animals) {
    if (animal.consumed) continue;
    const x = (animal.position.x - player.position.x) * scale;
    const y = (animal.position.z - player.position.z) * scale;
    if (x * x + y * y > (w / 2 - 2) * (w / 2 - 2)) continue;
    if (animal.dead) {
      ctx.fillStyle = 'rgba(246,183,77,0.9)';
      ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      continue;
    }
    ctx.fillStyle = animal.isPrey ? '#9adf77' : animal.isAlpha ? '#ffcf5c' : '#ff6b54';
    ctx.beginPath();
    if (animal.isPrey) {
      ctx.arc(x, y, 1.9, 0, TAU);
      ctx.fill();
    } else {
      ctx.moveTo(x, y - 2.7);
      ctx.lineTo(x + 2.2, y + 2.2);
      ctx.lineTo(x - 2.2, y + 2.2);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Player arrow.
  ctx.save();
  ctx.rotate(Math.PI - player.heading);
  ctx.fillStyle = '#f4f0e2';
  ctx.beginPath();
  ctx.moveTo(0, -5.6);
  ctx.lineTo(3.7, 4.5);
  ctx.lineTo(0, 2.6);
  ctx.lineTo(-3.7, 4.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, w / 2 - 1, 0, TAU);
  ctx.strokeStyle = 'rgba(220,236,218,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function updateHud(dt = 0.016) {
  if (!dom.lifeFill) return;
  const hp = clamp(player.health, 0, 100);
  const ratio = hp / 100;
  dom.lifeFill.style.transform = `scaleX(${ratio})`;
  if (hp >= ghostHealth) ghostHealth = hp;
  else ghostHealth = damp(ghostHealth, hp, 2.6, dt);
  dom.lifeGhost.style.transform = `scaleX(${Math.max(ratio, ghostHealth / 100)})`;
  dom.lifeFill.classList.toggle('mid', hp <= 55 && hp > 25);
  dom.lifeFill.classList.toggle('low', hp <= 25);
  dom.lifeText.textContent = String(Math.ceil(hp));

  const phase = timePhase(timeOfDay);
  const use = dom.hudTime?.querySelector('use');
  if (use) use.setAttribute('href', `#i-${phase.icon}`);
  const phaseLabel = dom.hudTime?.querySelector('b');
  if (phaseLabel) phaseLabel.textContent = phase.label;
  if (dom.hudClock) dom.hudClock.textContent = formatClock(timeOfDay);

  const hunger = hp > 68 ? 'Well fed' : hp > 42 ? 'Hungry' : hp > 20 ? 'Starving' : 'Dying';
  dom.hudHunger.textContent = hunger;
  dom.hudHunger.classList.toggle('warn', hp <= 42 && hp > 20);
  dom.hudHunger.classList.toggle('danger', hp <= 20);
  dom.lowHealth.classList.toggle('on', hp <= 25 && state === 'playing');

  dom.btnPaw.style.setProperty('--cd', `${clamp(pawCooldown / 0.48, 0, 1) * 100}%`);
  dom.btnBite.style.setProperty('--cd', `${clamp(biteCooldown / 0.9, 0, 1) * 100}%`);
  dom.btnPaw.classList.toggle('cooling', pawCooldown > 0.02);
  dom.btnBite.classList.toggle('cooling', biteCooldown > 0.02);
  dom.btnSprint.classList.toggle('active', input.sprint || Boolean(keys['shift']));

  minimapTimer -= dt;
  if (minimapTimer <= 0) {
    minimapTimer = 0.1;
    drawMinimap();
  }
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
function toggleSound(force) {
  save.sound = typeof force === 'boolean' ? force : !save.sound;
  audio.setEnabled(save.sound);
  if (save.sound) audio.ensure();
  saveGame(save);
  updateSoundUI();
  if (save.sound) showToast('Sound on', '', 1400);
  else showToast('Sound muted', '', 1400);
}

function cycleQuality() {
  const order = ['auto', 'high', 'low'];
  const idx = order.indexOf(save.quality || 'auto');
  save.quality = order[(idx + 1) % order.length];
  saveGame(save);
  updateQualityUI();
  showToast(`Graphics: ${save.quality.toUpperCase()} · applies to the next wood`, 'warn', 2600);
}

function onOrientation(event) {
  if (!tilt.enabled) return;
  if (event.gamma == null && event.beta == null) return;
  const beta = event.beta || 0;
  const gamma = event.gamma || 0;
  if (!tilt.zero) tilt.zero = { beta, gamma };
  let gx = (gamma - tilt.zero.gamma) / 26;
  let gy = (beta - tilt.zero.beta) / -26;
  gx = Math.abs(gx) < 0.12 ? 0 : clamp((gx - Math.sign(gx) * 0.12) / 0.88, -1, 1);
  gy = Math.abs(gy) < 0.12 ? 0 : clamp((gy - Math.sign(gy) * 0.12) / 0.88, -1, 1);
  tilt.x = gx;
  tilt.y = gy;
}

async function setTiltEnabled(on) {
  if (on) {
    if (typeof window.DeviceOrientationEvent === 'undefined') {
      showToast('Tilt is not supported on this device', 'bad', 2600);
      save.tilt = false;
      saveGame(save);
      updateTiltUI();
      return;
    }
    const request = window.DeviceOrientationEvent.requestPermission;
    if (typeof request === 'function') {
      try {
        const permission = await request.call(window.DeviceOrientationEvent);
        if (permission !== 'granted') {
          showToast('Motion access was denied', 'bad', 2600);
          save.tilt = false;
          saveGame(save);
          updateTiltUI();
          return;
        }
      } catch {
        showToast('Motion access is unavailable', 'bad', 2600);
        save.tilt = false;
        saveGame(save);
        updateTiltUI();
        return;
      }
    }
    tilt.enabled = true;
    tilt.zero = null;
    save.tilt = true;
    showToast('Tilt steer on · lean to turn', 'warn', 2400);
  } else {
    tilt.enabled = false;
    tilt.x = 0;
    tilt.y = 0;
    save.tilt = false;
    showToast('Tilt steer off', '', 1600);
  }
  saveGame(save);
  updateTiltUI();
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------
function resetJoystick() {
  joystick.active = false;
  joystick.id = null;
  input.x = 0;
  input.y = 0;
  dom.joystick.classList.add('hidden');
  dom.joystickKnob.style.transform = '';
}

function beginLook(clientX, clientY, id) {
  lookTouch.active = true;
  lookTouch.id = id;
  lookTouch.lastX = clientX;
  lookTouch.lastY = clientY;
}

function endLook(id) {
  if (!lookTouch.active || (id != null && lookTouch.id !== id)) return;
  lookTouch.active = false;
  lookTouch.id = null;
}

function onPointerDown(event) {
  if (state !== 'playing') return;
  if (event.button != null && event.button !== 0) return;
  const touch = event.pointerType === 'touch' || event.pointerType === 'pen';
  if (!touch) {
    beginLook(event.clientX, event.clientY, event.pointerId);
    return;
  }
  if (event.clientX < window.innerWidth * 0.52 && !joystick.active) {
    joystick.active = true;
    joystick.id = event.pointerId;
    joystick.originX = event.clientX;
    joystick.originY = event.clientY;
    joystick.x = 0;
    joystick.y = 0;
    input.x = 0;
    input.y = 0;
    dom.joystick.style.left = `${event.clientX}px`;
    dom.joystick.style.top = `${event.clientY}px`;
    dom.joystick.classList.remove('hidden');
    dom.joystickKnob.style.transform = '';
    lastLookInput = elapsed;
  } else if (!lookTouch.active) {
    beginLook(event.clientX, event.clientY, event.pointerId);
  }
}

function onPointerMove(event) {
  if (joystick.active && event.pointerId === joystick.id) {
    const dx = event.clientX - joystick.originX;
    const dy = event.clientY - joystick.originY;
    const len = Math.hypot(dx, dy);
    const max = 58;
    const nx = len > 0.001 ? dx / len : 0;
    const ny = len > 0.001 ? dy / len : 0;
    const amount = Math.min(1, len / max);
    input.x = nx * amount;
    input.y = -ny * amount;
    joystick.x = nx * amount;
    joystick.y = -ny * amount;
    dom.joystickKnob.style.transform = `translate(${nx * max * amount}px, ${ny * max * amount}px)`;
    lastLookInput = elapsed;
    return;
  }
  if (lookTouch.active && event.pointerId === lookTouch.id) {
    const dx = event.clientX - lookTouch.lastX;
    const dy = event.clientY - lookTouch.lastY;
    lookTouch.lastX = event.clientX;
    lookTouch.lastY = event.clientY;
    cameraYaw -= dx * 0.0052;
    cameraPitch = clamp(cameraPitch - dy * 0.0032, -0.08, 0.84);
    lastLookInput = elapsed;
  }
}

function onPointerUp(event) {
  if (joystick.active && event.pointerId === joystick.id) resetJoystick();
  if (lookTouch.active && event.pointerId === lookTouch.id) endLook(event.pointerId);
}

function onKeyDown(event) {
  const key = event.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
  keys[key] = true;
  if (state === 'playing') {
    if (key === 'j') doAttack('paw');
    if (key === 'k' || key === ' ') doAttack('bite');
  }
  if (key === 'escape' || key === 'p') {
    if (state === 'playing') pauseGame();
    else if (state === 'paused') resumeGame();
  }
  if (key === 'm') toggleSound();
}

function onKeyUp(event) {
  keys[event.key.toLowerCase()] = false;
}

function bindHoldButton(button, down, up) {
  if (!button) return;
  const start = (event) => {
    event.preventDefault();
    event.stopPropagation();
    button.classList.add('pressed');
    try { button.setPointerCapture?.(event.pointerId); } catch { /* ignore */ }
    down();
  };
  const end = (event) => {
    if (event) event.preventDefault();
    button.classList.remove('pressed');
    up?.();
  };
  button.addEventListener('pointerdown', start);
  for (const name of ['pointerup', 'pointercancel', 'pointerleave', 'lostpointercapture']) {
    button.addEventListener(name, end);
  }
}

function bindClick(id, handler) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (!el) return;
  el.addEventListener('click', (event) => {
    event.preventDefault();
    audio.click();
    handler(event);
  });
}

function bindEvents() {
  bindClick('btn-play', () => {
    audio.ensure();
    startGame(save.current || 1);
  });
  bindClick('btn-levels', openLevels);
  bindClick('btn-howto', openHowto);
  bindClick('btn-jump-current', () => {
    hideAllScreens();
    startGame(save.current || 1);
  });
  bindClick('btn-resume', resumeGame);
  bindClick('btn-resume-x', resumeGame);
  bindClick('btn-restart', () => {
    hideAllScreens();
    restartLevel();
  });
  bindClick('btn-quit', goTitle);
  bindClick('btn-pause', pauseGame);
  bindClick('btn-next', () => {
    hideAllScreens();
    if (level.level >= TOTAL_LEVELS) goTitle();
    else startGame(level.level + 1);
  });
  bindClick('btn-complete-den', goTitle);
  bindClick('btn-retry', () => {
    hideAllScreens();
    restartLevel();
  });
  bindClick('btn-gameover-den', goTitle);

  for (const close of $$('[data-close]')) {
    close.addEventListener('click', (event) => {
      event.preventDefault();
      audio.click();
      closePanel(close.dataset.close);
    });
  }

  bindClick('btn-sound', () => toggleSound());
  bindClick('title-sound', () => toggleSound());
  bindClick('btn-setting-sound', () => toggleSound());
  bindClick('btn-setting-tilt', () => setTiltEnabled(!save.tilt));
  bindClick('btn-setting-quality', cycleQuality);

  bindHoldButton(dom.btnPaw, () => doAttack('paw'));
  bindHoldButton(dom.btnBite, () => doAttack('bite'));
  bindHoldButton(dom.btnSprint, () => {
    input.sprint = true;
    lastLookInput = elapsed;
  }, () => {
    input.sprint = false;
  });

  const canvas = renderer.domElement;
  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('contextmenu', (event) => event.preventDefault());

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', () => {
    keys = Object.create(null);
    input.sprint = false;
    input.x = 0;
    input.y = 0;
    resetJoystick();
    endLook();
  });

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', () => setTimeout(onResize, 120));
  window.addEventListener('deviceorientation', onOrientation, true);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state === 'playing') pauseGame();
  });
  document.addEventListener('gesturestart', (event) => event.preventDefault());
  window.addEventListener('beforeunload', persist);

  if (save.tilt) {
    const needsPermission = typeof window.DeviceOrientationEvent !== 'undefined'
      && typeof window.DeviceOrientationEvent.requestPermission === 'function';
    if (!needsPermission) tilt.enabled = true;
  }
}

// ---------------------------------------------------------------------------
// Resize and main loop
// ---------------------------------------------------------------------------
function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 1.8));
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  dom.touchHint?.classList.toggle('hidden', !isCoarse);
  if (dom.rotateHint) {
    const portrait = height > width * 1.35;
    const show = isCoarse && portrait && state === 'playing';
    dom.rotateHint.classList.toggle('hidden', !show);
    if (show) {
      clearTimeout(rotateTimer);
      rotateTimer = setTimeout(() => dom.rotateHint.classList.add('hidden'), 5200);
    }
  }
}

let lastFrameTime = performance.now();

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(Math.max(0, (now - lastFrameTime) / 1000), 0.05);
  lastFrameTime = now;
  elapsed += dt;
  frameCount++;

  if (state === 'playing') {
    updateGame(dt);
  } else if (state === 'title') {
    updateMenu(dt);
  } else if (state === 'paused' || state === 'complete' || state === 'gameover') {
    if (world) world.update(dt * 0.25, elapsed, player.position);
    playerRig.update(dt * 0.25, elapsed, {
      speed: 0,
      sprint: false,
      night: world ? world.nightAmount : 0,
      lookYaw: 0,
    });
  }

  renderer.render(scene, camera);
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
if (new URLSearchParams(window.location.search).has('debug')) {
  window.__feral = {
    get state() { return state; },
    get level() { return level; },
    get animals() { return animals; },
    get player() { return player; },
    get world() { return world; },
    startGame,
    completeLevel,
    gameOver,
    spawn(type, x, z) { return spawnAnimal(type, { x, z }); },
    teleport(x, z) {
      player.position.set(x, world.heightAt(x, z), z);
      playerRoot.position.copy(player.position);
      snapCamera();
    },
    setHealth(value) { player.health = clamp(value, 0, 100); ghostHealth = player.health; },
    addEaten() { eaten++; save.eaten = (save.eaten || 0) + 1; updateObjectiveHud(); checkComplete(); },
    addKill() { kills++; save.kills = (save.kills || 0) + 1; updateObjectiveHud(); checkComplete(); },
  };
}

function init() {
  try {
    bindEvents();
    goTitle();
    onResize();
    lastFrameTime = performance.now();
    requestAnimationFrame(frame);
  } catch (error) {
    console.error(error);
    showBootError('The forest failed to grow. Reload the page or try another browser.');
  }
}

init();


