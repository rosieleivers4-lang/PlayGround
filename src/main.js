import * as THREE from 'three';
import { createPup } from './pup.js';
import { Forest } from './forest.js';
import { createCreature } from './creature.js';
import { CHAPTERS, levelConfig, levelLabel, timeLabel } from './level.js';
import { AudioKit } from './audio.js';
import { clamp, damp, angleDelta, mulberry32, formatClock } from './util.js';

const $ = (id) => document.getElementById(id);
const TAU = Math.PI * 2;
const SAVE_KEY = 'pupwild.save.v2';
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const defaultSave = () => ({
  unlocked: 1,
  best: 0,
  muted: false,
  tilt: false,
  sway: true,
  quality: isTouch ? 'med' : 'high',
  finished: false
});
function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    return raw && typeof raw === 'object' ? { ...defaultSave(), ...raw } : defaultSave();
  } catch { return defaultSave(); }
}
let save = loadSave();
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch {} };

const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.44;
renderer.shadowMap.enabled = save.quality !== 'low';
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x06100e, 1);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(58, 1, .1, 720);
const clock = new THREE.Clock();
const audio = new AudioKit();
audio.muted = save.muted;

const G = {
  mode: 'boot',
  level: save.unlocked,
  cfg: null,
  forest: null,
  entities: [],
  effects: [],
  slashes: [],
  elapsed: 0,
  runTime: 0,
  eaten: 0,
  huntKills: 0,
  bossDown: false,
  bossSeen: false,
  gateAnnounced: false,
  introT: 0,
  deathT: 0,
  victoryT: 0,
  menuT: 0,
  nextLevel: 1,
  fromMenu: true,
  eatProgress: 0,
  eatTarget: null,
  eatSoundT: 0,
  heartT: 0,
  gateMessageT: 0,
  pendingHit: null,
  lastHud: {},
  sparks: null,
  uiLock: false
};

const player = {
  pos: new THREE.Vector3(),
  yaw: 0,
  speed: 0,
  health: 100,
  stamina: 100,
  alive: true,
  biteCd: 0,
  pawCd: 0,
  invuln: 0,
  sprinting: false,
  eating: false,
  attackLock: 0,
  lastStep: 0
};

const pup = createPup();
pup.root.visible = false;
scene.add(pup.root);

// A soft travelling key + cool rim keeps the black pup readable against dark cover.
const pupKey = new THREE.PointLight(0xffd8b2, 7.5, 5.2, 1.7);
pupKey.position.set(.55, 2.15, 1.1);
pup.root.add(pupKey);
const pupRim = new THREE.PointLight(0x6fd8ff, 4.2, 4.2, 2);
pupRim.position.set(-.9, 1.75, -1.15);
pup.root.add(pupRim);

const input = {
  keys: new Set(),
  jx: 0,
  jy: 0,
  sprint: false,
  eat: false,
  tiltX: 0,
  tiltY: 0,
  tiltActive: false,
  joyPointer: null,
  cameraPointer: null,
  lastDrag: -99,
  lastTouch: -99
};

const cam = {
  yaw: 0,
  pitch: .29,
  dist: 6.4,
  pos: new THREE.Vector3(),
  target: new THREE.Vector3(),
  shake: 0,
  fov: 58,
  menuAngle: .4
};

const MENU_LEVEL = 1;
const clampDPR = () => Math.min(window.devicePixelRatio || 1, save.quality === 'high' ? 2 : save.quality === 'med' ? 1.5 : 1.15);

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setPixelRatio(clampDPR());
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));
resize();

/* ---------- small helpers ---------- */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function nextFrame() { return new Promise(r => requestAnimationFrame(r)); }
function show(el) { el?.classList.remove('screen-hidden'); }
function hide(el) { el?.classList.add('screen-hidden'); }
function toast(html, ms = 3200) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = html;
  $('toastLayer').appendChild(el);
  setTimeout(() => el.remove(), ms);
}
function makeSparkTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(.3, 'rgba(255,255,255,.7)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
G.sparks = makeSparkTexture();

function spawnBurst(pos, color = 0xffdda0, count = 12, speed = 4, life = .6, size = .16) {
  const positions = new Float32Array(count * 3);
  const vel = [];
  for (let i = 0; i < count; i++) {
    positions[i * 3] = pos.x + (Math.random() - .5) * .25;
    positions[i * 3 + 1] = pos.y + (Math.random() - .5) * .25;
    positions[i * 3 + 2] = pos.z + (Math.random() - .5) * .25;
    const a = Math.random() * TAU, up = Math.random() * .9 + .15;
    vel.push(new THREE.Vector3(Math.cos(a) * speed * (.3 + Math.random() * .7), up * speed * .7, Math.sin(a) * speed * (.3 + Math.random() * .7)));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ map: G.sparks, color, size, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  scene.add(pts);
  G.effects.push({ pts, geo, mat, vel, life, maxLife: life, gravity: 7 });
}

function spawnSlash() {
  const geo = new THREE.TorusGeometry(.85, .055, 4, 24, Math.PI * 1.05);
  const mat = new THREE.MeshBasicMaterial({ color: 0x9df7ff, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(player.pos).add(new THREE.Vector3(0, 1.05, 0));
  mesh.rotation.set(-Math.PI / 2, 0, 0);
  mesh.rotation.y = player.yaw;
  scene.add(mesh);
  G.slashes.push({ mesh, geo, mat, life: .24, max: .24, rot: player.yaw });
}

/* ---------- saves / settings ---------- */
function applyQuality(showToast = false) {
  renderer.setPixelRatio(clampDPR());
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = save.quality !== 'low';
  if (G.forest) {
    G.forest.sun.castShadow = save.quality !== 'low';
    G.forest.sun.shadow.mapSize.set(save.quality === 'high' ? 2048 : 1024, save.quality === 'high' ? 2048 : 1024);
    if (G.forest.sun.shadow.map) {
      G.forest.sun.shadow.map.dispose();
      G.forest.sun.shadow.map = null;
    }
  }
  if (showToast && G.mode === 'play') toast('Graphics changed · new woods use the new density', 2600);
}
function setMuted(m) {
  save.muted = m; persist();
  audio.setMuted(m);
  $('toggleSound').classList.toggle('on', !m);
  $('toggleSound').setAttribute('aria-checked', String(!m));
  $('btnSound').textContent = m ? '✕' : '♪';
}
function setSway(on) {
  save.sway = on; persist();
  $('toggleSway').classList.toggle('on', on);
  $('toggleSway').setAttribute('aria-checked', String(on));
}

function initSettingsUI() {
  $('toggleSound').classList.toggle('on', !save.muted);
  $('toggleSound').setAttribute('aria-checked', String(!save.muted));
  $('btnSound').textContent = save.muted ? '✕' : '♪';
  $('toggleSway').classList.toggle('on', save.sway);
  $('toggleSway').setAttribute('aria-checked', String(save.sway));
  $('toggleTilt').classList.toggle('on', save.tilt);
  $('toggleTilt').setAttribute('aria-checked', String(save.tilt));
  for (const b of document.querySelectorAll('#qualitySeg button')) b.classList.toggle('active', b.dataset.q === save.quality);
  $('qualityHint').textContent = save.quality === 'high' ? 'Rich foliage, soft shadows, full trees.' : save.quality === 'med' ? 'Balanced for phones and tablets.' : 'Fastest. Fewer trees, no shadows.';
  $('motionNote').textContent = isIOS
    ? 'Tilt needs motion access. On iPhone or iPad, enabling it will ask for permission.'
    : 'Tilt uses your device accelerometer. Optional — the thumbstick always works.';
}
initSettingsUI();

async function setTilt(on) {
  if (on) {
    if (!('DeviceOrientationEvent' in window)) {
      toast('This device has no motion sensor.', 2600);
      return false;
    }
    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          toast('Motion access was not granted.', 2600);
          return false;
        }
      } catch {
        toast('Motion access could not be requested.', 2600);
        return false;
      }
    }
    input.tiltActive = true;
    input.tiltBase = null;
    window.addEventListener('deviceorientation', onOrient);
    save.tilt = true; persist();
    toast('Tilt steering on · hold your device level', 3000);
  } else {
    input.tiltActive = false;
    input.tiltX = input.tiltY = 0;
    window.removeEventListener('deviceorientation', onOrient);
    save.tilt = false; persist();
    toast('Tilt steering off', 1800);
  }
  $('toggleTilt').classList.toggle('on', on);
  $('toggleTilt').setAttribute('aria-checked', String(on));
  return true;
}

function onOrient(e) {
  if (!input.tiltActive || e.beta == null || e.gamma == null) return;
  if (!input.tiltBase) input.tiltBase = { beta: e.beta, gamma: e.gamma };
  const db = e.beta - input.tiltBase.beta;
  const dg = e.gamma - input.tiltBase.gamma;
  const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
  let x, y;
  if (angle === 0 || angle === 180) { x = dg / 24; y = -db / 26; }
  else { x = -db / 26; y = -dg / 26; }
  input.tiltX = clamp(x, -1, 1);
  input.tiltY = clamp(y, -1, 1);
}

if (save.tilt) {
  // Permission must be requested from a gesture on iOS, but a granted session can resume.
  if (!isIOS) {
    input.tiltActive = true;
    window.addEventListener('deviceorientation', onOrient);
  }
}

/* ---------- world setup ---------- */
function disposeEntities() {
  for (const e of G.entities) {
    if (e.group?.parent) scene.remove(e.group);
    e.creature?.dispose?.();
  }
  G.entities = [];
  G.eatTarget = null;
}
function disposeEffects() {
  for (const fx of G.effects) { scene.remove(fx.pts); fx.geo.dispose(); fx.mat.dispose(); }
  G.effects = [];
  for (const s of G.slashes) { scene.remove(s.mesh); s.geo.dispose(); s.mat.dispose(); }
  G.slashes = [];
}
function clearLevel() {
  disposeEntities();
  disposeEffects();
  if (G.forest) { G.forest.dispose(); G.forest = null; }
  scene.fog = null;
}

function buildMenuWorld() {
  clearLevel();
  const cfg = levelConfig(MENU_LEVEL);
  cfg.phase = .335;
  cfg.weather = 'mist';
  G.cfg = cfg;
  G.forest = new Forest(scene, cfg, save.quality);
  player.pos.set(0, G.forest.heightAt(0, 0), 0);
  player.yaw = .6 + Math.PI / 2;
  pup.reset();
  pup.root.visible = true;
  pup.root.position.copy(player.pos);
  pup.root.rotation.y = player.yaw;
  pup.setVisible(true);
  cam.menuAngle = .6;
  const l = levelConfig(save.unlocked);
  $('continueLabel').textContent = `Wood ${String(l.level).padStart(3, '0')} · ${l.name}`;
  $('menuStat').textContent = `${save.finished ? 'TRAILBLAZER' : save.unlocked > 1 ? 'WANDERER' : 'NEW PUP'} · ${Math.min(save.unlocked - 1, 500)}/500 WOODS`;
}

const SPAWN_NAMES = ['The Old Boar', 'Greyjaw', 'The Hollow Wolf', 'Mother Bear', 'Ashfang', 'The Pale Stag', 'Rootbreaker', 'Nightmaw', 'The Widow of Pines', 'Thornhide'];

function spawnEntity(kind, x, z, opts = {}) {
  const cfg = G.cfg;
  const scale = opts.scale || (opts.boss ? 1.55 : .88 + Math.random() * .24);
  const creature = createCreature(kind, { scale });
  const y = G.forest.heightAt(x, z);
  creature.group.position.set(x, y, z);
  creature.group.rotation.y = Math.random() * TAU;
  scene.add(creature.group);
  const s = creature.stats;
  const hpScale = s.prey ? 1 : 1 + cfg.difficulty * 1.15;
  const hp = Math.round(s.hp * hpScale * (opts.boss ? 3.4 : 1));
  const e = {
    kind, creature, group: creature.group, prey: !!s.prey, boss: !!opts.boss,
    hp, maxHp: hp, stats: s, dead: false, removed: false,
    state: s.prey ? 'wander' : 'idle', timer: Math.random() * 2,
    wander: new THREE.Vector3(x, 0, z), wanderTimer: 0,
    attackCd: .6 + Math.random() * 1.2, windup: 0, speed: 0,
    hitFlash: 0, scale, name: opts.boss ? SPAWN_NAMES[Math.floor(Math.random() * SPAWN_NAMES.length)] : s.label,
    heal: s.prey ? s.heal : (opts.boss ? 50 : 34),
    aggro: false, radius: scale * (s.prey ? .5 : .8)
  };
  creature.group.userData.entity = e;
  G.entities.push(e);
  makeHealthBar(e);
  return e;
}

function makeHealthBar(e) {
  const group = new THREE.Group();
  const h = e.stats.height + .45 / e.scale;
  group.position.y = h;
  const bgMat = new THREE.SpriteMaterial({ color: 0x05100d, transparent: true, opacity: .82, depthTest: true, depthWrite: false });
  const bg = new THREE.Sprite(bgMat);
  bg.scale.set(e.boss ? 1.1 : .72, e.boss ? .085 : .06, 1);
  group.add(bg);
  const fillMat = new THREE.SpriteMaterial({ color: e.boss ? 0xff8a6e : e.prey ? 0x9de7bd : 0xffb06a, transparent: true, opacity: .95, depthTest: true, depthWrite: false });
  const fill = new THREE.Sprite(fillMat);
  fill.center.set(0, .5);
  fill.position.x = e.boss ? -.55 : -.36;
  fill.scale.set(e.boss ? 1.08 : .7, e.boss ? .052 : .034, 1);
  fill.renderOrder = 3;
  group.add(fill);
  e.barWidth = e.boss ? 1.08 : .7;
  e.bar = { group, fill, bg, ratio: 1 };
  e.barGroup = group;
  e.group.add(group);
  group.visible = !e.prey;
}

function populateLevel() {
  disposeEntities();
  const cfg = G.cfg;
  const rng = mulberry32(cfg.seed + 771);
  const spawnPos = (minDist, maxDist) => {
    for (let attempt = 0; attempt < 60; attempt++) {
      const a = rng() * TAU;
      const rad = minDist + Math.pow(rng(), .7) * (maxDist - minDist);
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
      if (Math.hypot(x - player.pos.x, z - player.pos.z) < 9) continue;
      if (G.forest.colliders.some(c => (c.x - x) ** 2 + (c.z - z) ** 2 < (c.r + 1) ** 2)) continue;
      if (G.forest.gatePos.distanceTo(new THREE.Vector3(x, 0, z)) < 5) continue;
      return { x, z };
    }
    return { x: 18, z: 18 };
  };
  const preyCount = cfg.preyGoal + 4;
  for (let i = 0; i < preyCount; i++) {
    const kind = cfg.preyPool[Math.floor(rng() * cfg.preyPool.length)];
    const p = spawnPos(13, 50);
    spawnEntity(kind, p.x, p.z);
  }
  const predCount = cfg.huntGoal + 1 + (cfg.isBoss ? 1 : 0);
  for (let i = 0; i < predCount; i++) {
    const kind = cfg.predatorPool[Math.floor(rng() * cfg.predatorPool.length)];
    const p = spawnPos(18, 48);
    spawnEntity(kind, p.x, p.z);
  }
  if (cfg.isBoss) {
    const kind = cfg.bossType;
    const p = spawnPos(26, 42);
    spawnEntity(kind, p.x, p.z, { boss: true, scale: 1.62 });
    // the boss replaces one ordinary predator visually; keep both for danger
    G.bossSeen = false;
  }
}

async function enterLevel(level, opts = {}) {
  if (G.uiLock) return;
  G.uiLock = true;
  G.level = clamp(level, 1, 500);
  G.cfg = levelConfig(G.level);
  save.unlocked = Math.max(1, save.unlocked);
  persist();
  show($('loading'));
  $('loading').classList.remove('leaving');
  $('bootBar').style.width = '35%';
  $('bootText').textContent = 'Reading the trail…';
  await sleep(90);
  clearLevel();
  if (audio.started) await audio.init();
  G.forest = new Forest(scene, G.cfg, save.quality);
  $('bootBar').style.width = '78%';
  $('bootText').textContent = 'Growing the wood…';
  await nextFrame();
  player.pos.set(0, G.forest.heightAt(0, 0) + .02, 0);
  player.yaw = G.cfg.seed % TAU;
  player.health = 100;
  player.stamina = 100;
  player.alive = true;
  player.biteCd = player.pawCd = player.invuln = 0;
  player.eating = false;
  player.attackLock = 0;
  player.speed = 0;
  G.eaten = 0;
  G.huntKills = 0;
  G.bossDown = false;
  G.bossSeen = false;
  G.gateAnnounced = false;
  G.eatProgress = 0;
  G.eatTarget = null;
  G.deathT = 0;
  G.victoryT = 0;
  G.introT = 0;
  G.runTime = 0;
  G.pendingHit = null;
  pup.reset();
  pup.root.visible = true;
  pup.root.position.copy(player.pos);
  pup.root.rotation.y = player.yaw;
  pup.setVisible(true);
  pup.setEating(false);
  cam.yaw = player.yaw;
  cam.pitch = .29;
  cam.pos.set(player.pos.x - Math.sin(player.yaw) * 6, player.pos.y + 3, player.pos.z - Math.cos(player.yaw) * 6);
  camera.position.copy(cam.pos);
  populateLevel();
  updateHUD(true);
  hide($('hud'));
  show($('levelIntro'));
  $('hud').classList.add('in-intro');
  hide($('menu'));
  hide($('victory')); hide($('gameover')); hide($('ending')); hide($('pause')); hide($('settings')); hide($('how')); hide($('levels'));
  $('introChapter').textContent = `${G.cfg.chapter.name.toUpperCase()} · ${G.cfg.chapterNumeral}`;
  $('introName').textContent = G.cfg.name;
  $('introNumber').textContent = `WOOD ${String(G.level).padStart(3, '0')} OF 500`;
  $('introTime').textContent = `${timeLabel(G.cfg.phase).toUpperCase()} · ${G.cfg.weatherLabel}`;
  $('introGoal').textContent = G.cfg.goalText;
  $('introTips').style.display = G.level <= 2 ? '' : 'none';
  $('loading').classList.add('leaving');
  await sleep(420);
  hide($('loading'));
  $('bootBar').style.width = '100%';
  G.mode = 'intro';
  G.fromMenu = !!opts.fromMenu;
  G.uiLock = false;
  if (audio.started) audio.setNight(G.forest.isNight);
}

function beginPlay() {
  hide($('levelIntro'));
  show($('hud'));
  $('hud').classList.remove('in-intro');
  G.mode = 'play';
  cam.yaw = player.yaw;
  cam.pitch = .29;
  toast(`<b>${G.cfg.name}</b> · hunt begun`, 2600);
  if (G.cfg.isBoss) setTimeout(() => toast('An Alpha stalks this wood. Listen for the growl.', 3300), 900);
  audio.howl();
  audio.setNight(G.forest.isNight);
  input.tiltBase = null;
}

/* ---------- player and combat ---------- */
function currentMove() {
  let x = input.jx, y = input.jy;
  if (input.tiltActive) { x += input.tiltX * .8; y += input.tiltY * .8; }
  if (input.keys.has('KeyA') || input.keys.has('ArrowLeft')) x -= 1;
  if (input.keys.has('KeyD') || input.keys.has('ArrowRight')) x += 1;
  if (input.keys.has('KeyW') || input.keys.has('ArrowUp')) y += 1;
  if (input.keys.has('KeyS') || input.keys.has('ArrowDown')) y -= 1;
  const len = Math.hypot(x, y);
  if (len > 1) { x /= len; y /= len; }
  return { x, y, mag: Math.min(1, len) };
}

function updatePlayer(dt) {
  if (!G.forest || !player.alive) return;
  player.biteCd = Math.max(0, player.biteCd - dt);
  player.pawCd = Math.max(0, player.pawCd - dt);
  player.invuln = Math.max(0, player.invuln - dt);
  player.attackLock = Math.max(0, player.attackLock - dt);

  const canSprint = player.stamina > 4 && !player.eating;
  const wantSprint = (input.sprint || input.keys.has('ShiftLeft') || input.keys.has('ShiftRight')) && canSprint;
  player.sprinting = wantSprint;
  if (wantSprint) player.stamina = Math.max(0, player.stamina - dt * 23);
  else player.stamina = Math.min(100, player.stamina + dt * (player.eating ? 5 : 13));
  if (player.stamina <= 0) player.sprinting = false;

  const mv = currentMove();
  const moving = mv.mag > .06 && !player.eating;
  let speed = 0;
  if (moving) {
    const f = new THREE.Vector3(Math.sin(cam.yaw), 0, Math.cos(cam.yaw));
    const r = new THREE.Vector3(Math.cos(cam.yaw), 0, -Math.sin(cam.yaw));
    const dir = f.multiplyScalar(mv.y).add(r.multiplyScalar(mv.x));
    if (dir.lengthSq() > .0001) dir.normalize();
    const base = isTouch ? 5.9 : 6.1;
    speed = base * (player.sprinting ? 1.43 : 1) * (player.health < 25 ? .9 : 1);
    const targetYaw = Math.atan2(dir.x, dir.z);
    player.yaw += angleDelta(player.yaw, targetYaw) * Math.min(1, dt * 11);
    player.pos.x += dir.x * speed * dt;
    player.pos.z += dir.z * speed * dt;
    player.speed = damp(player.speed, speed, 9, dt);
  } else {
    player.speed = damp(player.speed, 0, 10, dt);
  }

  // keep inside the wood
  const r = Math.hypot(player.pos.x, player.pos.z);
  if (r > 58) {
    player.pos.x *= 58 / r;
    player.pos.z *= 58 / r;
  }
  // tree and stone collision
  for (const c of G.forest.colliders) {
    const dx = player.pos.x - c.x, dz = player.pos.z - c.z;
    const min = c.r + .56;
    const d2 = dx * dx + dz * dz;
    if (d2 < min * min && d2 > .00001) {
      const d = Math.sqrt(d2);
      player.pos.x = c.x + dx / d * min;
      player.pos.z = c.z + dz / d * min;
    }
  }
  player.pos.y = G.forest.heightAt(player.pos.x, player.pos.z) + .02;
  pup.root.position.copy(player.pos);
  pup.root.rotation.y = player.yaw;

  // hunger / vitality drain
  const night = G.forest.isNight ? 1 : 0;
  const drain = .3 + G.cfg.difficulty * .3 + night * .16;
  player.health = Math.max(0, player.health - drain * dt);
  if (player.health <= 0) { playerDie(); return; }

  // footsteps
  if (moving) {
    player.lastStep -= dt;
    if (player.lastStep <= 0) {
      player.lastStep = player.sprinting ? .25 : .36;
      audio.step(player.sprinting);
    }
  }

  // eating resolution
  resolveEating(dt);

  // pending attack instant
  if (G.pendingHit) {
    G.pendingHit.t -= dt;
    if (G.pendingHit.t <= 0) {
      const hit = G.pendingHit;
      G.pendingHit = null;
      applyAttack(hit.type);
    }
  }

  pup.update(dt, {
    speed: player.speed,
    sprint: player.sprinting,
    night: G.forest.isNight ? 1 : 0
  });
  audio.update(dt, G.forest.isNight);
  if (player.health < 30) {
    G.heartT -= dt;
    if (G.heartT <= 0) { G.heartT = 1.4; audio.lowHealth(); }
  }
}

function tryAttack(type) {
  if (G.mode !== 'play' || !player.alive || player.eating) return;
  if (player.attackLock > 0) return;
  if (type === 'bite' && player.biteCd > 0) return;
  if (type === 'paw' && player.pawCd > 0) return;
  // Forgiving close-quarters aim: snap to the nearest quarry the hunter is facing.
  let aim = null, aimScore = Infinity;
  for (const e of G.entities) {
    if (e.dead || e.removed) continue;
    const dx = e.group.position.x - player.pos.x;
    const dz = e.group.position.z - player.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > (type === 'bite' ? 4.5 : 4.1) + e.radius) continue;
    const ang = Math.atan2(dx, dz);
    const align = Math.abs(angleDelta(cam.yaw, ang));
    if (align > 1.72 && d > 2.15) continue;
    const score = d + align * .85 + (e.prey ? .25 : 0);
    if (score < aimScore) { aimScore = score; aim = ang; }
  }
  if (aim !== null) player.yaw = aim;
  if (type === 'bite') {
    player.biteCd = .72;
    player.attackLock = .28;
    pup.attack('bite');
    audio.bite();
    G.pendingHit = { type, t: .16 };
  } else {
    player.pawCd = .5;
    player.attackLock = .18;
    pup.attack('paw');
    audio.paw();
    spawnSlash();
    G.pendingHit = { type, t: .12 };
  }
}

function applyAttack(type) {
  if (!G.forest || !player.alive) return;
  const range = type === 'bite' ? 3.35 : 3.0;
  const arc = type === 'bite' ? 1.02 : 1.48;
  const baseDmg = type === 'bite' ? 43 : 24;
  const dmg = Math.round(baseDmg + G.cfg.difficulty * (type === 'bite' ? 52 : 28));
  let hits = 0;
  let best = null, bestD = Infinity;
  for (const e of G.entities) {
    if (e.dead || e.removed) continue;
    const dx = e.group.position.x - player.pos.x;
    const dz = e.group.position.z - player.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > range + e.radius) continue;
    const ang = Math.atan2(dx, dz);
    if (Math.abs(angleDelta(player.yaw, ang)) > arc) continue;
    hits++;
    if (d < bestD) { bestD = d; best = e; }
    hitEntity(e, dmg, type);
    if (hits >= (type === 'bite' ? 1 : 3)) break;
  }
  if (hits) {
    cam.shake = Math.min(.35, cam.shake + .17);
    if (best) {
      const p = best.group.position.clone(); p.y += best.stats.height * best.scale * .55;
      spawnBurst(p, type === 'bite' ? 0xffd2a0 : 0xaef7ff, type === 'bite' ? 16 : 9, 4.5, .55, .17);
    }
  }
}

function hitEntity(e, dmg, type) {
  if (e.dead) return;
  e.hp -= dmg;
  e.hitFlash = .18;
  e.creature.hurt();
  if (e.prey) {
    e.state = 'flee';
    e.timer = 4;
  } else {
    e.aggro = true;
    e.state = 'chase';
    if (!e.wasHit) { e.wasHit = true; if (e.boss) { showBossBanner(e); } }
  }
  if (e.hp <= 0) killEntity(e, type);
}

function killEntity(e, type = 'bite') {
  if (e.dead) return;
  e.dead = true;
  e.hp = 0;
  e.creature.die();
  e.bar.group.visible = false;
  const p = e.group.position.clone(); p.y += .5;
  spawnBurst(p, 0xff9b78, 18, 5, .75, .17);
  audio.hit();
  if (e.boss) {
    G.bossDown = true;
    $('fightBanner').classList.remove('show');
    toast(`<b>${e.name}</b> falls. The wood exhales.`, 3600);
    audio.howl();
  } else if (e.prey) {
    toast(`${e.stats.label} down · hold <b>EAT</b> to feed`, 2400);
  } else {
    G.huntKills++;
    toast(`<b>${e.stats.label}</b> bested`, 1800);
  }
  if (!e.prey && !e.boss) { /* hunt counts only ordinary beasts */ }
  checkGoals();
}

function checkGoals() {
  if (!G.cfg || !G.forest) return;
  const preyOk = G.eaten >= G.cfg.preyGoal;
  const huntOk = G.huntKills >= G.cfg.huntGoal;
  const bossOk = !G.cfg.isBoss || G.bossDown;
  if (preyOk && huntOk && bossOk && !G.forest.gateActive) {
    G.forest.activateGate();
    audio.gate();
    G.gateAnnounced = true;
    toast('<b>The Moon Gate wakes.</b> Follow the compass.', 4200);
    cam.shake = .25;
  }
}

function playerDie() {
  if (!player.alive) return;
  player.alive = false;
  player.eating = false;
  pup.setEating(false);
  pup.death();
  audio.defeat();
  G.mode = 'dead';
  G.deathT = 0;
  cam.shake = .5;
  $('damage').classList.add('hit');
  setTimeout(() => $('damage').classList.remove('hit'), 450);
  $('lowHealth').classList.remove('show');
}

function damagePlayer(amount, source) {
  if (!player.alive || player.invuln > 0 || G.mode !== 'play') return;
  player.health = Math.max(0, player.health - amount);
  player.invuln = .6;
  cam.shake = Math.min(.6, cam.shake + .3);
  audio.hurt();
  $('damage').classList.add('hit');
  setTimeout(() => $('damage').classList.remove('hit'), 180);
  if (player.health <= 0) playerDie();
}

function nearestCarcass() {
  let best = null, bd = 2.65;
  for (const e of G.entities) {
    if (!e.dead || e.removed) continue;
    const d = Math.hypot(e.group.position.x - player.pos.x, e.group.position.z - player.pos.z);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}

function resolveEating(dt) {
  const target = nearestCarcass();
  G.eatTarget = target;
  const wants = input.eat || input.keys.has('KeyE');
  if (target && wants) {
    if (!player.eating) { player.eating = true; G.eatProgress = 0; }
    G.eatProgress = Math.min(1, G.eatProgress + dt / 1.15);
    pup.setEating(true);
    G.eatSoundT -= dt;
    if (G.eatSoundT <= 0) { G.eatSoundT = .34; audio.eat(); }
    if (G.eatProgress >= 1) consumeCarcass(target);
  } else {
    if (player.eating) { player.eating = false; pup.setEating(false); }
    G.eatProgress = Math.max(0, G.eatProgress - dt * 2.6);
  }
}

function consumeCarcass(e) {
  if (!e || e.removed) return;
  e.removed = true;
  player.eating = false;
  pup.setEating(false);
  scene.remove(e.group);
  e.creature.dispose();
  const heal = e.heal;
  player.health = Math.min(100, player.health + heal);
  G.eaten++;
  audio.heal();
  const p = e.group.position.clone(); p.y += .35;
  spawnBurst(p, 0x8dffc2, 22, 4, .9, .18);
  toast(`<b>+${heal} vitality</b> · ${e.stats.label} devoured`, 2200);
  G.eatProgress = 0;
  G.entities = G.entities.filter(x => x !== e);
  checkGoals();
}

function showBossBanner(e) {
  G.bossSeen = true;
  $('bossName').textContent = e.name;
  $('bossFill').style.transform = 'scaleX(1)';
  $('fightBanner').classList.add('show');
  audio.growl(true);
  setTimeout(() => {
    if (G.mode !== 'play') return;
    $('fightBanner').classList.remove('show');
  }, 5200);
}

/* ---------- entity AI ---------- */
function moveEntity(e, dir, speed, dt) {
  if (dir.lengthSq() < .0001) return;
  dir.normalize();
  const px = e.group.position.x, pz = e.group.position.z;
  e.group.position.x += dir.x * speed * dt;
  e.group.position.z += dir.z * speed * dt;
  const rr = Math.hypot(e.group.position.x, e.group.position.z);
  if (rr > 57) { e.group.position.x *= 57 / rr; e.group.position.z *= 57 / rr; }
  for (const c of G.forest.colliders) {
    if (c.r < .4) continue;
    const dx = e.group.position.x - c.x, dz = e.group.position.z - c.z;
    const min = c.r + e.radius * .6;
    const d2 = dx * dx + dz * dz;
    if (d2 < min * min && d2 > .00001) {
      const d = Math.sqrt(d2);
      e.group.position.x = c.x + dx / d * min;
      e.group.position.z = c.z + dz / d * min;
    }
  }
  e.group.position.y = G.forest.heightAt(e.group.position.x, e.group.position.z);
  const target = Math.atan2(dir.x, dir.z);
  e.group.rotation.y += angleDelta(e.group.rotation.y, target) * Math.min(1, dt * 8);
}

function updateEntities(dt) {
  const night = G.forest.isNight;
  const boss = G.entities.find(e => e.boss && !e.dead);
  if (boss && !G.bossSeen) {
    const d = boss.group.position.distanceTo(player.pos);
    if (d < 25) showBossBanner(boss);
  }
  if (G.bossSeen && boss) {
    const ratio = Math.max(0, boss.hp / boss.maxHp);
    $('bossFill').style.transform = `scaleX(${ratio})`;
  }
  // simple predator separation
  for (let i = 0; i < G.entities.length; i++) {
    const a = G.entities[i];
    if (a.dead || a.prey) continue;
    for (let j = i + 1; j < G.entities.length; j++) {
      const b = G.entities[j];
      if (b.dead || b.prey) continue;
      const dx = b.group.position.x - a.group.position.x;
      const dz = b.group.position.z - a.group.position.z;
      const d2 = dx * dx + dz * dz;
      const min = (a.radius + b.radius) * 1.15;
      if (d2 < min * min && d2 > .001) {
        const d = Math.sqrt(d2), push = (min - d) * .5;
        const nx = dx / d, nz = dz / d;
        a.group.position.x -= nx * push; a.group.position.z -= nz * push;
        b.group.position.x += nx * push; b.group.position.z += nz * push;
      }
    }
  }

  for (const e of G.entities) {
    if (e.removed) continue;
    if (e.dead) {
      e.creature.update(dt, { speed: 0 });
      continue;
    }
    const dx = player.pos.x - e.group.position.x;
    const dz = player.pos.z - e.group.position.z;
    const dist = Math.hypot(dx, dz);
    const dirToPlayer = new THREE.Vector3(dx, 0, dz);
    e.timer -= dt;
    e.attackCd = Math.max(0, e.attackCd - dt);

    if (e.prey) {
      const aware = dist < (player.sprinting ? 18 : 14) || e.state === 'flee';
      if (aware) {
        e.state = 'flee';
        e.timer = 3.5;
        if (dist < 2.8) {
          // panic dash sideways
          const side = Math.sin(e.creature.state.time * 2) > 0 ? 1 : -1;
          const away = dirToPlayer.clone().multiplyScalar(-1);
          away.applyAxisAngle(new THREE.Vector3(0, 1, 0), side * .7);
          moveEntity(e, away, e.stats.speed * 1.06, dt);
        } else {
          moveEntity(e, dirToPlayer.clone().multiplyScalar(-1), e.stats.speed * 1.02, dt);
        }
        e.speed = e.stats.speed;
      } else {
        if (e.timer <= 0) {
          e.timer = 2 + Math.random() * 3;
          const a = Math.random() * TAU;
          e.wander.set(e.group.position.x + Math.cos(a) * 5, 0, e.group.position.z + Math.sin(a) * 5);
        }
        const to = new THREE.Vector3(e.wander.x - e.group.position.x, 0, e.wander.z - e.group.position.z);
        if (to.length() > .7) {
          moveEntity(e, to, e.stats.speed * .28, dt);
          e.speed = e.stats.speed * .3;
        } else e.speed = 0;
      }
      // keep prey inside the wood
      const rr = Math.hypot(e.group.position.x, e.group.position.z);
      if (rr > 54) {
        moveEntity(e, new THREE.Vector3(-e.group.position.x, 0, -e.group.position.z), 2.5, dt);
      }
    } else {
      const aggroRange = 22 + (night ? 6 : 0) + (e.boss ? 4 : 0);
      if (!e.aggro && dist < aggroRange) e.aggro = true;
      if (e.aggro) {
        e.state = 'chase';
        if (e.windup > 0) {
          e.windup -= dt;
          e.speed = 0;
          if (e.windup <= 0) {
            e.attackCd = e.boss ? 1.4 : 1.8 + Math.random() * .4;
            if (dist < (e.boss ? 4.2 : 3.6)) {
              damagePlayer(Math.round(e.stats.damage * (0.8 + G.cfg.difficulty * .85) * (e.boss ? 1.45 : 1)), e);
            }
            audio.growl(e.boss);
            cam.shake = Math.min(.4, cam.shake + .14);
          }
        } else if (dist > (e.boss ? 3.5 : 3.0)) {
          moveEntity(e, dirToPlayer, e.stats.speed * (e.boss ? .92 : 1.05), dt);
          e.speed = e.stats.speed;
        } else {
          e.speed = 0;
          const yawT = Math.atan2(dx, dz);
          e.group.rotation.y += angleDelta(e.group.rotation.y, yawT) * Math.min(1, dt * 10);
          if (e.attackCd <= 0) {
            e.windup = .55;
            e.attackCd = 999;
            audio.growl(e.boss);
          }
        }
      } else {
        if (e.timer <= 0) {
          e.timer = 2.5 + Math.random() * 4;
          const a = Math.random() * TAU;
          e.wander.set(e.group.position.x + Math.cos(a) * 7, 0, e.group.position.z + Math.sin(a) * 7);
        }
        const to = new THREE.Vector3(e.wander.x - e.group.position.x, 0, e.wander.z - e.group.position.z);
        if (to.length() > 1) {
          moveEntity(e, to, e.stats.speed * .22, dt);
          e.speed = e.stats.speed * .22;
        } else e.speed = 0;
      }
    }

    e.creature.update(dt, { speed: e.speed });
    if (e.windup > 0) e.creature.body.rotation.x = -0.12 - (1 - clamp(e.windup / .55, 0, 1)) * .25;
    else e.creature.body.rotation.x = damp(e.creature.body.rotation.x, 0, 8, dt);
    e.creature.setNight(night ? 1 : 0);
    if (e.bar) {
      const visible = !e.dead && (!e.prey || e.hp < e.maxHp || (G.eatTarget === e));
      e.bar.group.visible = visible;
      const ratio = clamp(e.hp / e.maxHp, 0, 1);
      if (Math.abs(ratio - e.bar.ratio) > .001) {
        e.bar.ratio = ratio;
        e.bar.fill.scale.x = (e.boss ? 1.08 : .7) * ratio;
      }
      if (!e.prey) e.bar.fill.material.color.setHex(e.boss ? 0xff8a6e : 0xffb06a);
    }
  }
}

/* ---------- effects ---------- */
function updateEffects(dt) {
  for (let i = G.effects.length - 1; i >= 0; i--) {
    const fx = G.effects[i];
    fx.life -= dt;
    const pos = fx.geo.attributes.position;
    for (let j = 0; j < fx.vel.length; j++) {
      const v = fx.vel[j];
      v.y -= fx.gravity * dt;
      pos.setXYZ(j, pos.getX(j) + v.x * dt, pos.getY(j) + v.y * dt, pos.getZ(j) + v.z * dt);
    }
    pos.needsUpdate = true;
    fx.mat.opacity = clamp(fx.life / fx.maxLife, 0, 1);
    if (fx.life <= 0) {
      scene.remove(fx.pts); fx.geo.dispose(); fx.mat.dispose();
      G.effects.splice(i, 1);
    }
  }
  for (let i = G.slashes.length - 1; i >= 0; i--) {
    const s = G.slashes[i];
    s.life -= dt;
    const k = 1 - s.life / s.max;
    s.mesh.scale.setScalar(.7 + k * 1.5);
    s.mesh.rotation.z = -.4 + k * 2.2;
    s.mat.opacity = Math.max(0, 1 - k) * .85;
    if (s.life <= 0) {
      scene.remove(s.mesh); s.geo.dispose(); s.mat.dispose();
      G.slashes.splice(i, 1);
    }
  }
}

/* ---------- camera ---------- */
function updateCamera(dt) {
  if (!G.forest) return;
  player.pos.y = G.forest.heightAt(player.pos.x, player.pos.z) + .02;
  if (G.mode === 'menu' || G.mode === 'boot') {
    G.menuT += dt;
    const a = G.menuT * .07 + cam.menuAngle;
    const target = new THREE.Vector3(player.pos.x, player.pos.y + 1.05, player.pos.z);
    const desired = new THREE.Vector3(
      target.x + Math.sin(a) * 6.9,
      target.y + 1.0 + Math.sin(G.menuT * .13) * .15,
      target.z + Math.cos(a) * 6.9
    );
    camera.position.lerp(desired, 1 - Math.exp(-1.7 * dt));
    const look = target.clone();
    // push the pup to the right side of the frame so the title breathes
    const right = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
    look.addScaledVector(right, -1.35);
    camera.lookAt(look);
    camera.fov = damp(camera.fov, 45, 2, dt);
    camera.updateProjectionMatrix();
    return;
  }
  if (G.mode === 'intro') {
    G.introT += dt;
    const a = player.yaw + .7 + G.introT * .12;
    const target = new THREE.Vector3(player.pos.x, player.pos.y + 1.0, player.pos.z);
    const desired = new THREE.Vector3(target.x + Math.sin(a) * 7.0, target.y + 1.7, target.z + Math.cos(a) * 7.0);
    camera.position.lerp(desired, 1 - Math.exp(-2.2 * dt));
    const look = target.clone();
    const right = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
    look.addScaledVector(right, -1.7);
    camera.lookAt(look);
    camera.fov = damp(camera.fov, 52, 2, dt);
    camera.updateProjectionMatrix();
    return;
  }

  if (G.mode === 'victory' || G.mode === 'dead' || G.mode === 'paused' || G.mode === 'settings') {
    G.victoryT += dt;
    if (G.mode === 'dead') {
      cam.dist = damp(cam.dist, 8.5, .8, dt);
      cam.pitch = damp(cam.pitch, .45, 1, dt);
    }
  } else {
    cam.dist = damp(cam.dist, player.sprinting ? 7.0 : 6.4, 3, dt);
  }
  if (G.mode !== 'dead' && G.mode !== 'victory') cam.victoryT = 0;

  if (G.mode === 'play' && player.speed > 1.2 && G.elapsed - input.lastDrag > 2.4) {
    cam.yaw += angleDelta(cam.yaw, player.yaw) * Math.min(1, dt * 1.15);
  }

  const target = new THREE.Vector3(player.pos.x, player.pos.y + 1.32, player.pos.z);
  const lookAhead = new THREE.Vector3(Math.sin(cam.yaw), 0, Math.cos(cam.yaw));
  const desired = new THREE.Vector3(
    target.x - lookAhead.x * cam.dist * Math.cos(cam.pitch),
    target.y + cam.dist * Math.sin(cam.pitch) + .25,
    target.z - lookAhead.z * cam.dist * Math.cos(cam.pitch)
  );
  // keep the camera out of trunks and terrain
  const safeY = G.forest.heightAt(desired.x, desired.z) + .55;
  if (desired.y < safeY) desired.y = safeY;
  const origin = target;
  let maxT = 1;
  for (const c of G.forest.colliders) {
    if (!c.cam || c.r < .35) continue;
    const vx = desired.x - origin.x, vz = desired.z - origin.z;
    const wx = c.x - origin.x, wz = c.z - origin.z;
    const vv = vx * vx + vz * vz;
    if (vv < .1) continue;
    const t = (wx * vx + wz * vz) / vv;
    if (t < 0 || t > 1) continue;
    const px = origin.x + vx * t - c.x, pz = origin.z + vz * t - c.z;
    if (px * px + pz * pz < (c.r + .3) ** 2) maxT = Math.min(maxT, Math.max(.18, t - .04));
  }
  if (maxT < 1) {
    desired.lerpVectors(origin, desired, maxT);
    desired.y = Math.max(desired.y, safeY);
  }
  if (save.sway && (G.mode === 'play')) {
    const bob = Math.sin(G.runTime * 9) * .018 * (player.speed / 6);
    desired.y += bob;
  }
  camera.position.lerp(desired, 1 - Math.exp(-10 * dt));
  lookAhead.add(target);
  lookAhead.y = target.y + .18;
  if (cam.shake > 0) {
    const s = cam.shake;
    camera.position.x += (Math.random() - .5) * s;
    camera.position.y += (Math.random() - .5) * s;
    camera.position.z += (Math.random() - .5) * s;
    cam.shake = Math.max(0, cam.shake - dt * 2.2);
  }
  camera.lookAt(lookAhead);
  camera.fov = damp(camera.fov, 57 + (player.sprinting ? 5 : 0) + Math.min(3, player.speed * .2), 3, dt);
  camera.updateProjectionMatrix();
}

/* ---------- HUD ---------- */
let radarLast = -10;
function updateRadar() {
  const cv = $('radar');
  if (!cv || !G.forest) return;
  if (G.elapsed - radarLast < .045) return;
  radarLast = G.elapsed;
  const ctx = cv.getContext('2d');
  const W = cv.width, C = W / 2, R = C - 8, range = 36;
  ctx.clearRect(0, 0, W, W);
  ctx.save();
  ctx.beginPath();
  ctx.arc(C, C, R, 0, TAU);
  ctx.clip();

  const glow = ctx.createRadialGradient(C, C, 0, C, C, R);
  glow.addColorStop(0, 'rgba(35, 104, 83, .2)');
  glow.addColorStop(.72, 'rgba(14, 47, 39, .16)');
  glow.addColorStop(1, 'rgba(4, 18, 14, .04)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, W);

  ctx.strokeStyle = 'rgba(121,240,203,.11)';
  ctx.lineWidth = 1;
  for (const f of [.33, .66]) {
    ctx.beginPath(); ctx.arc(C, C, R * f, 0, TAU); ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(C, 8); ctx.lineTo(C, W - 8);
  ctx.moveTo(8, C); ctx.lineTo(W - 8, C);
  ctx.stroke();

  // sweeping scent beam
  const sweep = (G.elapsed * 1.15) % TAU;
  const sx = Math.cos(sweep), sy = Math.sin(sweep);
  const beam = ctx.createLinearGradient(C, C, C + sx * R, C + sy * R);
  beam.addColorStop(0, 'rgba(121,240,203,.02)');
  beam.addColorStop(1, 'rgba(121,240,203,.22)');
  ctx.strokeStyle = beam;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(C, C); ctx.lineTo(C + sx * R, C + sy * R); ctx.stroke();
  ctx.strokeStyle = 'rgba(121,240,203,.18)';
  ctx.beginPath(); ctx.arc(C, C, R, sweep - .5, sweep); ctx.stroke();

  const radarDot = (x, y, color, size, ring = false) => {
    ctx.beginPath();
    ctx.arc(x, y, size + 3, 0, TAU);
    ctx.fillStyle = color.replace('1)', '.14)');
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, TAU);
    ctx.fillStyle = color;
    ctx.fill();
    if (ring) {
      ctx.beginPath();
      ctx.arc(x, y, size + 3.5, 0, TAU);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  };

  for (const e of G.entities) {
    if (e.removed) continue;
    let dx = e.group.position.x - player.pos.x;
    let dz = e.group.position.z - player.pos.z;
    const d = Math.hypot(dx, dz);
    if (!e.dead && !e.prey && !e.boss && d > range + 8) continue;
    const edge = d > range;
    if (edge) { dx *= (range - 1.5) / d; dz *= (range - 1.5) / d; }
    const x = C + dx / range * R;
    const y = C - dz / range * R;
    if (e.dead) {
      radarDot(x, y, 'rgba(177,191,173,1)', 1.6);
    } else if (e.boss) {
      radarDot(x, y, 'rgba(255,154,224,1)', 4.2, true);
    } else if (e.prey) {
      radarDot(x, y, 'rgba(138,237,184,1)', 2.6);
    } else {
      radarDot(x, y, e.kind === 'shadow' ? 'rgba(186,151,255,1)' : 'rgba(255,132,104,1)', 3, e.aggro);
    }
  }

  if (G.forest.gateActive) {
    const dx = G.forest.gatePos.x - player.pos.x;
    const dz = G.forest.gatePos.z - player.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    const x = C + dx / d * (R - 9);
    const y = C - dz / d * (R - 9);
    const pulse = 3.6 + Math.sin(G.elapsed * 4) * 1.1;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(104,241,255,.95)';
    ctx.shadowColor = '#5fe4e4';
    ctx.shadowBlur = 14;
    ctx.fillRect(-pulse / 2, -pulse / 2, pulse, pulse);
    ctx.restore();
  }

  // the pup at the heart of the scent map
  ctx.save();
  ctx.translate(C, C);
  ctx.rotate(player.yaw);
  ctx.beginPath();
  ctx.arc(0, 0, 7.5, 0, TAU);
  ctx.fillStyle = 'rgba(121,240,203,.12)';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -7);
  ctx.lineTo(5, 6);
  ctx.lineTo(0, 3);
  ctx.lineTo(-5, 6);
  ctx.closePath();
  ctx.fillStyle = '#a9ffe2';
  ctx.fill();
  ctx.restore();
  ctx.restore();
}

function updateHUD(force = false) {
  if (!G.cfg) return;
  const h = G.lastHud;
  const health = Math.round(player.health);
  const healthR = clamp(player.health / 100, 0, 1);
  if (force || h.health !== health) {
    h.health = health;
    $('vitalNum').textContent = Math.max(0, health);
    $('vitalFill').style.transform = `scaleX(${healthR})`;
    $('vitalGhost').style.transform = `scaleX(${healthR})`;
    $('vitals').classList.toggle('low', health < 30);
    $('lowHealth').classList.toggle('show', health < 30 && G.mode === 'play');
  }
  const st = Math.round(player.stamina);
  if (force || h.stam !== st) { h.stam = st; $('staminaFill').style.transform = `scaleX(${st / 100})`; }
  const hunger = health > 70 ? 'FED' : health > 45 ? 'HUNGRY' : health > 20 ? 'STARVING' : 'DYING';
  if (force || h.hunger !== hunger) { h.hunger = hunger; $('hungerLabel').textContent = hunger; }

  const phase = G.forest ? G.forest.phase : G.cfg.phase;
  const clockStr = formatClock(phase);
  if (force || h.clock !== clockStr) { h.clock = clockStr; $('clock').textContent = clockStr; }
  const tl = timeLabel(phase);
  if (force || h.tl !== tl) {
    h.tl = tl;
    $('dayLabel').textContent = `DAY ${String(G.level).padStart(3, '0')} · ${tl}`;
    $('timeIcon').textContent = G.forest?.isNight ? '☾' : tl === 'DAWN' || tl === 'DUSK' ? '◐' : '☀';
    $('weatherLabel').textContent = `${G.cfg.weatherLabel} · ${tl}`;
  }
  if (force || h.level !== G.level) {
    h.level = G.level;
    $('chipChapter').textContent = `${G.cfg.chapterNumeral} · ${G.cfg.chapter.name.toUpperCase()}`;
    $('chipLevel').textContent = `WOOD ${String(G.level).padStart(3, '0')}`;
    $('chipName').textContent = G.cfg.name;
    $('objLevel').textContent = `${String(G.level).padStart(3, '0')} / 500`;
    $('objPrey').querySelector('.obj-text').textContent = 'Devour creatures';
    $('objHunt').querySelector('.obj-text').textContent = G.cfg.isBoss ? 'Best beasts & Alpha' : 'Best the beasts';
  }
  const preyOk = G.eaten >= G.cfg.preyGoal;
  const huntOk = G.huntKills >= G.cfg.huntGoal && (!G.cfg.isBoss || G.bossDown);
  if (force || h.eaten !== G.eaten || h.hunt !== G.huntKills || h.boss !== G.bossDown) {
    h.eaten = G.eaten; h.hunt = G.huntKills; h.boss = G.bossDown;
    $('objPrey').querySelector('b').textContent = `${Math.min(G.eaten, G.cfg.preyGoal)} / ${G.cfg.preyGoal}`;
    $('objHunt').querySelector('b').textContent = `${Math.min(G.huntKills, G.cfg.huntGoal)} / ${G.cfg.huntGoal}${G.cfg.isBoss ? ` + ${G.bossDown ? '✦' : '?'}` : ''}`;
    $('objPrey').classList.toggle('done', preyOk);
    $('objHunt').classList.toggle('done', huntOk);
    const p = ((Math.min(G.eaten, G.cfg.preyGoal) / G.cfg.preyGoal) + (Math.min(G.huntKills, G.cfg.huntGoal) / G.cfg.huntGoal) + (G.cfg.isBoss ? (G.bossDown ? 1 : 0) : 0)) / (G.cfg.isBoss ? 3 : 2);
    $('objFill').style.transform = `scaleX(${clamp(p, 0, 1)})`;
  }
  if (G.forest?.gateActive) {
    const d = G.forest.gateDistance(player.pos);
    $('compassDist').textContent = `${Math.round(d)}m`;
    const angle = Math.atan2(G.forest.gatePos.x - player.pos.x, G.forest.gatePos.z - player.pos.z);
    const rel = angleDelta(cam.yaw, angle);
    $('compassArrow').style.transform = `rotate(${rel - Math.PI / 2}rad)`;
    $('gateCompass').classList.add('show');
  } else {
    $('gateCompass').classList.remove('show');
  }

  const target = G.eatTarget;
  const prompt = $('prompt');
  prompt.classList.toggle('show', !!target && G.mode === 'play');
  if (target) {
    prompt.style.setProperty('--eat', `${G.eatProgress * 100}%`);
    prompt.querySelector('b').textContent = G.eatProgress > 0 ? 'FEEDING' : 'EAT';
  }
  $('btnEat').classList.toggle('ready', !!target);
  $('btnSprint').classList.toggle('disabled', player.stamina < 5);
  const biteRatio = player.biteCd / .72;
  const pawRatio = player.pawCd / .5;
  $('btnBite').classList.toggle('cooldown', biteRatio > .01);
  $('btnPaw').classList.toggle('cooldown', pawRatio > .01);
  $('btnBite').style.setProperty('--cd', `${biteRatio * 100}%`);
  $('btnPaw').style.setProperty('--cd', `${pawRatio * 100}%`);
  if (G.mode === 'play') updateRadar();
}

/* ---------- UI wiring ---------- */
function hideAllMenus() {
  hide($('menu')); hide($('pause')); hide($('settings')); hide($('how')); hide($('levels'));
  hide($('victory')); hide($('gameover')); hide($('ending'));
}
function openMenu() {
  hideAllMenus();
  clearLevel();
  G.mode = 'menu';
  hide($('hud'));
  buildMenuWorld();
  show($('menu'));
  updateMenuStats();
  audio.setNight(false);
}
function updateMenuStats() {
  const l = levelConfig(save.unlocked);
  $('continueLabel').textContent = save.finished ? 'The trail is complete · replay any wood' : `Wood ${String(l.level).padStart(3, '0')} · ${l.name}`;
  $('menuStat').textContent = `${save.finished ? 'TRAILBLAZER' : save.unlocked > 1 ? 'WANDERER' : 'NEW PUP'} · ${Math.min(save.finished ? 500 : save.unlocked - 1, 500)}/500 WOODS`;
  $('btnContinue').querySelector('.btn-kicker').textContent = save.finished ? 'Replay' : save.unlocked > 1 ? 'Continue' : 'Begin';
}

async function startFromMenu(level = save.unlocked) {
  audio.init();
  await enterLevel(level, { fromMenu: true });
}
function startFromMap(level) {
  hide($('levels'));
  audio.init();
  enterLevel(level, { fromMenu: true });
}

$('btnContinue').addEventListener('click', () => { audio.ui(); startFromMenu(save.finished ? 1 : save.unlocked); });
$('btnNew').addEventListener('click', () => {
  audio.ui();
  if (save.unlocked > 1 && !confirm('Start a fresh hunt? Your 500-wood map progress will be lost.')) return;
  save = defaultSave();
  save.quality = defaultSave().quality;
  persist();
  initSettingsUI();
  startFromMenu(1);
});
$('btnLevels').addEventListener('click', () => { audio.ui(); openLevelMap(Math.floor((save.unlocked - 1) / 50)); });
$('btnHow').addEventListener('click', () => { audio.ui(); show($('how')); });
$('btnSettings').addEventListener('click', () => { audio.ui(); show($('settings')); });
$('btnSettingsMenu').addEventListener('click', () => { audio.ui(); show($('settings')); });
$('btnCloseHow').addEventListener('click', () => hide($('how')));
$('btnCloseHow2').addEventListener('click', () => hide($('how')));
$('btnCloseLevels').addEventListener('click', () => hide($('levels')));
$('btnCloseSettings').addEventListener('click', () => hide($('settings')));
$('btnCloseSettings2').addEventListener('click', () => hide($('settings')));
$('btnPause').addEventListener('click', pauseGame);
$('btnResume').addEventListener('click', resumeGame);
$('btnQuit').addEventListener('click', () => { audio.ui(); openMenu(); });
$('btnPauseSettings').addEventListener('click', () => show($('settings')));
$('btnStart').addEventListener('click', () => { audio.init(); beginPlay(); });
$('btnSound').addEventListener('click', () => { audio.init(); setMuted(!save.muted); });
$('toggleSound').addEventListener('click', () => { audio.init(); setMuted(!save.muted); });
$('toggleSway').addEventListener('click', () => setSway(!save.sway));
$('toggleTilt').addEventListener('click', async () => { await setTilt(!save.tilt); });
for (const b of document.querySelectorAll('#qualitySeg button')) {
  b.addEventListener('click', () => {
    save.quality = b.dataset.q; persist(); initSettingsUI(); applyQuality(true); audio.ui();
  });
}

$('btnRetry').addEventListener('click', () => { audio.ui(); enterLevel(G.level, { fromMenu: false }); });
$('btnGameoverMenu').addEventListener('click', () => { audio.ui(); openMenu(); });
$('btnNext').addEventListener('click', () => {
  audio.ui();
  if (G.level >= 500) { hide($('victory')); show($('ending')); G.mode = 'ending'; return; }
  enterLevel(G.level + 1, { fromMenu: false });
});
$('btnVictoryMenu').addEventListener('click', () => { audio.ui(); openMenu(); });
$('btnEndingMenu').addEventListener('click', () => { audio.ui(); save.finished = true; save.unlocked = 1; persist(); openMenu(); });

function pauseGame() {
  if (G.mode !== 'play') return;
  G.mode = 'paused';
  show($('pause'));
  input.sprint = false; input.eat = false;
  $('btnSprint').classList.remove('pressed');
  $('btnEat').classList.remove('pressed');
}
function resumeGame() {
  hide($('pause')); hide($('settings'));
  G.mode = 'play';
  input.tiltBase = null;
}

function openLevelMap(chapter = 0) {
  show($('levels'));
  const strip = $('chapterStrip');
  strip.innerHTML = '';
  CHAPTERS.forEach((c, i) => {
    const b = document.createElement('button');
    b.textContent = `${c.numeral} · ${c.name}`;
    b.dataset.chapter = String(i);
    b.classList.toggle('active', i === chapter);
    b.addEventListener('click', () => { audio.ui(); renderChapter(i); });
    strip.appendChild(b);
  });
  renderChapter(chapter);
}
function renderChapter(chapter) {
  const c = CHAPTERS[chapter];
  $('chapterTitle').textContent = `${c.numeral} · ${c.name}`;
  $('chapterBlurb').textContent = c.blurb;
  for (const b of document.querySelectorAll('#chapterStrip button')) b.classList.toggle('active', b.dataset.chapter === String(chapter));
  const grid = $('levelGrid');
  grid.innerHTML = '';
  for (let i = 1; i <= 50; i++) {
    const level = chapter * 50 + i;
    const cell = document.createElement('button');
    cell.className = 'level-cell';
    cell.textContent = String(level).padStart(3, '0');
    if (level % 10 === 0) cell.classList.add('boss');
    if (level < save.unlocked || save.finished) cell.classList.add('done');
    else if (level === save.unlocked) cell.classList.add('open');
    else cell.classList.add('locked');
    if (level === save.unlocked) cell.classList.add('current');
    if (level <= save.unlocked || save.finished) {
      cell.addEventListener('click', () => { audio.ui(); startFromMap(level); });
    }
    grid.appendChild(cell);
  }
}

function triggerVictory() {
  if (G.mode !== 'play') return;
  G.mode = 'victory';
  G.forest.setGateReached();
  player.speed = 0;
  player.eating = false;
  pup.setEating(false);
  audio.victory();
  audio.howl();
  const prev = save.unlocked;
  save.unlocked = Math.max(save.unlocked, Math.min(500, G.level + 1));
  save.best = Math.max(save.best, G.level);
  if (G.level >= 500) save.finished = true;
  persist();
  $('vEaten').textContent = G.eaten;
  $('vBeasts').textContent = G.huntKills;
  $('vVital').textContent = Math.round(player.health);
  const nextCfg = levelConfig(Math.min(500, G.level + 1));
  $('resultNext').textContent = G.level >= 500 ? 'The trail ends here. Or does it?' : `Next: Wood ${String(nextCfg.level).padStart(3, '0')} · ${nextCfg.name}`;
  $('btnNext').textContent = G.level >= 500 ? 'See the last morning' : 'Enter the next wood';
  setTimeout(() => {
    if (G.mode === 'victory') show($('victory'));
  }, 850);
}
function triggerGameOver() {
  $('dEaten').textContent = G.eaten;
  $('dLevel').textContent = G.level;
  setTimeout(() => {
    if (G.mode === 'dead') show($('gameover'));
  }, 900);
}

/* ---------- input ---------- */
document.addEventListener('keydown', (e) => {
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
  input.keys.add(e.code);
  if (G.mode === 'play') {
    if (e.code === 'KeyJ' || e.code === 'Space') tryAttack('bite');
    if (e.code === 'KeyK') tryAttack('paw');
    if (e.code === 'KeyE') input.eat = true;
    if (e.code === 'Escape') pauseGame();
  } else if (G.mode === 'paused' && e.code === 'Escape') resumeGame();
  if (e.code === 'Escape' && (G.mode === 'menu')) hide($('settings'));
});
document.addEventListener('keyup', (e) => {
  input.keys.delete(e.code);
  if (e.code === 'KeyE') input.eat = false;
});

// camera drag
canvas.addEventListener('pointerdown', (e) => {
  if (G.mode !== 'play' && G.mode !== 'intro') return;
  input.cameraPointer = e.pointerId;
  input.cameraStart = { x: e.clientX, y: e.clientY, yaw: cam.yaw, pitch: cam.pitch };
  input.lastDrag = G.elapsed;
  canvas.setPointerCapture?.(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (input.cameraPointer !== e.pointerId || !input.cameraStart) return;
  const dx = e.clientX - input.cameraStart.x;
  const dy = e.clientY - input.cameraStart.y;
  cam.yaw = input.cameraStart.yaw + dx * .005;
  cam.pitch = clamp(input.cameraStart.pitch + dy * .0035, .06, .78);
  input.lastDrag = G.elapsed;
  input.lastTouch = G.elapsed;
});
function endCamera(e) {
  if (input.cameraPointer !== e.pointerId) return;
  input.cameraPointer = null;
  input.cameraStart = null;
  input.lastDrag = G.elapsed;
}
canvas.addEventListener('pointerup', endCamera);
canvas.addEventListener('pointercancel', endCamera);
canvas.addEventListener('contextmenu', e => e.preventDefault());

// virtual joystick
const joy = $('joystick'), stick = $('stick');
function joyUpdate(e) {
  const rect = joy.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  let dx = e.clientX - cx, dy = e.clientY - cy;
  const max = rect.width * .34;
  const d = Math.hypot(dx, dy);
  if (d > max) { dx = dx / d * max; dy = dy / d * max; }
  stick.style.transform = `translate(${dx}px, ${dy}px)`;
  input.jx = dx / max;
  input.jy = -dy / max;
  input.lastTouch = G.elapsed;
}
joy.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  if (G.mode !== 'play') return;
  input.joyPointer = e.pointerId;
  joy.setPointerCapture?.(e.pointerId);
  joyUpdate(e);
});
joy.addEventListener('pointermove', (e) => {
  if (input.joyPointer !== e.pointerId) return;
  joyUpdate(e);
});
function resetJoy(e) {
  if (input.joyPointer !== e.pointerId) return;
  input.joyPointer = null;
  input.jx = input.jy = 0;
  stick.style.transform = 'translate(0px,0px)';
}
joy.addEventListener('pointerup', resetJoy);
joy.addEventListener('pointercancel', resetJoy);

function bindAction(id, fn, hold = false) {
  const el = $(id);
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture?.(e.pointerId);
    el.classList.add('pressed');
    fn(true);
  });
  const up = (e) => {
    el.classList.remove('pressed');
    if (hold) fn(false);
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', (e) => { if (e.buttons === 0) up(e); });
}
bindAction('btnBite', () => { if (G.mode === 'play') tryAttack('bite'); });
bindAction('btnPaw', () => { if (G.mode === 'play') tryAttack('paw'); });
bindAction('btnSprint', (down) => { input.sprint = down; }, true);
bindAction('btnEat', (down) => { input.eat = down; }, true);

window.addEventListener('blur', () => { input.keys.clear(); input.sprint = false; input.eat = false; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && G.mode === 'play') pauseGame();
});

/* ---------- menu world / boot ---------- */
function boot() {
  const bar = $('bootBar');
  const text = $('bootText');
  const steps = [
    ['Waking the woods…', 26],
    ['Sharpening claws…', 55],
    ['Sniffing the trail…', 76],
    ['The hunt is ready.', 100]
  ];
  let i = 0;
  const tick = () => {
    if (i >= steps.length) {
      setTimeout(() => {
        $('loading').classList.add('leaving');
        show($('menu'));
        G.mode = 'menu';
        setTimeout(() => hide($('loading')), 800);
      }, 420);
      return;
    }
    const [msg, pct] = steps[i++];
    text.textContent = msg;
    bar.style.width = pct + '%';
    setTimeout(tick, i === 1 ? 280 : 300);
  };
  buildMenuWorld();
  G.mode = 'menu';
  tick();
}

/* ---------- main loop ---------- */
let last = performance.now();
function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(.05, Math.max(0, (now - last) / 1000));
  last = now;
  G.elapsed += dt;
  const mode = G.mode;
  if (mode === 'play') {
    G.runTime += dt;
    updatePlayer(dt);
    if (player.alive && G.mode === 'play') {
      updateEntities(dt);
      updateEffects(dt);
      if (G.forest) {
        G.forest.update(dt, G.elapsed, player.pos, camera.position);
        if (G.forest.gateActive && player.alive) {
          const gd = G.forest.gateDistance(player.pos);
          if (gd < 3.6) triggerVictory();
          else if (gd < 5.2 && G.elapsed - (G.gateMessageT || 0) > 4) {
            G.gateMessageT = G.elapsed;
            toast('The gate hums. Step through.', 1800);
          }
        }
        audio.setNight(G.forest.isNight);
      }
    }
    updateCamera(dt);
    updateHUD();
  } else if (mode === 'menu' || mode === 'boot') {
    if (G.forest) G.forest.update(dt, G.elapsed, player.pos, camera.position);
    pup.update(dt, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
    updateCamera(dt);
    updateEffects(dt);
  } else if (mode === 'intro') {
    updateCamera(dt);
    pup.update(dt, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
    if (G.forest) G.forest.update(dt, G.elapsed, player.pos, camera.position);
    updateEntities(dt * .18);
    updateEffects(dt);
    updateHUD();
  } else if (mode === 'paused' || mode === 'settings') {
    updateEffects(dt * .2);
    if (G.forest) G.forest.update(dt * .12, G.elapsed, player.pos, camera.position);
    pup.update(dt * .1, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
  } else if (mode === 'dead') {
    G.deathT += dt;
    pup.update(dt, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
    if (G.forest) G.forest.update(dt * .65, G.elapsed, player.pos, camera.position);
    updateEntities(dt * .25);
    updateEffects(dt * .5);
    updateCamera(dt);
    updateHUD();
    if (G.deathT > 1.1 && !$('gameover').classList.contains('screen-hidden')) { /* already shown */ }
    if (G.deathT > 1.1 && $('gameover').classList.contains('screen-hidden') && !G.deathShown) {
      G.deathShown = true;
      triggerGameOver();
    }
  } else if (mode === 'victory') {
    pup.update(dt, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
    if (G.forest) G.forest.update(dt * .8, G.elapsed, player.pos, camera.position);
    updateEffects(dt * .5);
    updateCamera(dt);
    updateHUD();
  } else if (mode === 'ending') {
    if (G.forest) G.forest.update(dt * .8, G.elapsed, player.pos, camera.position);
    pup.update(dt, { speed: 0, night: G.forest?.isNight ? 1 : 0 });
  }
  if (G.forest) G.forest.update?.length && false;
  renderer.render(scene, camera);
}

// keep the end of the game from leaving the player in a dead loop
G.deathShown = false;
const originalPlayerDie = playerDie;
playerDie = function () {
  originalPlayerDie();
  G.deathShown = false;
};

if (new URLSearchParams(location.search).has('debug')) {
  window.PUPWILD = {
    G, player, pup, cam, save, input,
    enterLevel, beginPlay, tryAttack, damagePlayer, killEntity, consumeCarcass, checkGoals, startFromMenu
  };
}

boot();
requestAnimationFrame(loop);
