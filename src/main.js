import * as THREE from '../vendor/three.module.min.js';
import { getLevel, LEVEL_COUNT, phaseLabel, levelRoman } from './levels.js';
import {
  createDog,
  updateDogVisual,
  triggerPaw,
  triggerBite,
  triggerHurt
} from './character.js';
import { createWorld } from './world.js';
import { Animal } from './animals.js';
import { FX } from './fx.js';
import { AudioEngine } from './audio.js';
import { Input } from './input.js';

const SAVE_KEY = 'tealfang.save.v1';
const TUTORIAL_KEY = 'tealfang.tutorial.v1';
const PAW_COOLDOWN = 0.5;
const BITE_COOLDOWN = 0.82;
const WORLD_RADIUS = 71.5;

const $ = (id) => document.getElementById(id);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));

function dampAngle(current, target, lambda, dt) {
  let delta = target - current;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return current + delta * (1 - Math.exp(-lambda * dt));
}

function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    return {
      level: clamp(Number(raw.level) || 1, 1, LEVEL_COUNT),
      cleared: clamp(Number(raw.cleared) || 0, 0, LEVEL_COUNT),
      best: Math.max(0, Number(raw.best) || 0),
      totalFeasts: Math.max(0, Number(raw.totalFeasts) || 0)
    };
  } catch {
    return { level: 1, cleared: 0, best: 0, totalFeasts: 0 };
  }
}

function saveGame(save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* Storage can be unavailable in private mode. */
  }
}

function formatScore(value) {
  return Math.max(0, Math.round(value)).toLocaleString('en-US');
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function makeVector(x = 0, y = 0, z = 0) {
  return new THREE.Vector3(x, y, z);
}

class Game {
  constructor() {
    this.canvas = $('scene');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(54, 1, 0.1, 320);
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.state = 'boot';
    this.save = loadSave();
    this.audio = new AudioEngine();
    this.world = null;
    this.animals = [];
    this.fx = null;
    this.dog = null;
    this.dogLight = null;
    this.level = null;
    this.menuTime = 0;
    this.elapsed = 0;
    this.feasted = 0;
    this.score = 0;
    this.pendingComplete = 0;
    this.shake = 0;
    this.camYaw = 0;
    this.target = null;
    this.feastTarget = null;
    this.timers = [];
    this.mapReturn = 'menu';
    this.mapBuilt = false;
    this.mapButtons = [];
    this.downedHintShown = false;
    this.stepTimer = 0;
    this.minimapTimer = 0;
    this.lastDamageAt = -10;
    this.tutorialStarted = false;
    this.deathShown = false;
    this.deathCause = 'hunger';
    this.player = {
      pos: makeVector(),
      yaw: 0,
      speed: 0,
      maxLife: 100,
      life: 100,
      stamina: 100,
      exhausted: false,
      sprinting: false,
      pawCooldown: 0,
      biteCooldown: 0,
      invuln: 0,
      combo: 0,
      comboTimer: 0,
      moving: false
    };

    this.ui = {
      hud: $('hud'),
      menu: $('menu'),
      pause: $('pause'),
      levelComplete: $('levelComplete'),
      death: $('death'),
      ending: $('ending'),
      levelMap: $('levelMap'),
      bootError: $('bootError'),
      levelNum: $('levelNum'),
      levelName: $('levelName'),
      phaseIcon: $('phaseIcon'),
      phaseLabel: $('phaseLabel'),
      lifeText: $('lifeText'),
      lifeMax: $('lifeMax'),
      lifeFill: $('lifeFill'),
      staminaFill: $('staminaFill'),
      drainRate: $('drainRate'),
      feastCount: $('feastCount'),
      feastFill: $('feastFill'),
      objectiveHint: $('objectiveHint'),
      bossTag: $('bossTag'),
      scoreText: $('scoreText'),
      lifePanel: document.querySelector('.life-panel'),
      pawCd: $('pawCd'),
      biteCd: $('biteCd'),
      comboBadge: $('comboBadge'),
      comboText: $('comboText'),
      toast: $('toast'),
      banner: $('banner'),
      bannerKicker: $('bannerKicker'),
      bannerTitle: $('bannerTitle'),
      bannerSub: $('bannerSub'),
      targetPanel: $('targetPanel'),
      targetName: $('targetName'),
      targetState: $('targetState'),
      targetFill: $('targetFill'),
      feastPrompt: $('feastPrompt'),
      feastValue: $('feastValue'),
      minimap: $('minimap'),
      dangerVignette: $('dangerVignette'),
      hitFlash: $('hitFlash'),
      lifeFlash: $('lifeFlash'),
      tiltBadge: $('tiltBadge'),
      btnStart: $('btnStart'),
      startLabel: $('startLabel'),
      startSub: $('startSub'),
      btnNew: $('btnNew'),
      btnMap: $('btnMap'),
      btnPause: $('btnPause'),
      btnTilt: $('btnTilt'),
      btnSound: $('btnSound'),
      btnTiltPause: $('btnTiltPause'),
      btnSoundPause: $('btnSoundPause'),
      btnCalibrate: $('btnCalibrate'),
      btnResume: $('btnResume'),
      btnRestart: $('btnRestart'),
      btnPauseMap: $('btnPauseMap'),
      btnQuit: $('btnQuit'),
      btnNext: $('btnNext'),
      btnCompleteMap: $('btnCompleteMap'),
      btnRetry: $('btnRetry'),
      btnDeathMap: $('btnDeathMap'),
      btnDeathMenu: $('btnDeathMenu'),
      btnEndless: $('btnEndless'),
      btnEndingMenu: $('btnEndingMenu'),
      btnMapClose: $('btnMapClose'),
      levelGrid: $('levelGrid'),
      mapProgress: $('mapProgress'),
      pauseSub: $('pauseSub'),
      completeName: $('completeName'),
      completeStars: $('completeStars'),
      completeFeasts: $('completeFeasts'),
      completeTime: $('completeTime'),
      completeScore: $('completeScore'),
      completeLife: $('completeLife'),
      deathTitle: $('deathTitle'),
      deathSub: $('deathSub'),
      deathFeasts: $('deathFeasts'),
      deathTime: $('deathTime'),
      deathScore: $('deathScore'),
      deathLevel: $('deathLevel'),
      endingFeasts: $('endingFeasts'),
      endingBest: $('endingBest'),
      menuLevel: $('menuLevel'),
      menuBest: $('menuBest'),
      menuFeasts: $('menuFeasts')
    };

    this.initRenderer();
    this.initScene();
    this.initInput();
    this.bindUI();
    this.resize();
    this.audio.setMuted(this.audio.muted);
    this.updateSoundUI();
    this.updateTiltUI(false);

    const params = new URLSearchParams(window.location.search);
    const requestedLevel = Number(params.get('level'));
    if (params.get('play') === '1' && requestedLevel) {
      this.startLevel(clamp(requestedLevel, 1, LEVEL_COUNT));
    } else {
      this.showMenu();
    }

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pauseGame();
    });
    window.addEventListener('contextmenu', (event) => event.preventDefault());
    window.addEventListener('pointerdown', () => this.audio.init(), { once: true });

    window.__tealfang = {
      game: this,
      startLevel: (n) => this.startLevel(n),
      menu: () => this.showMenu(),
      setLife: (n) => { this.player.life = n; },
      setScore: (n) => { this.score = n; }
    };

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance'
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.14;
    } catch (error) {
      console.error(error);
      this.ui.bootError.classList.remove('hidden');
    }
  }

  initScene() {
    this.dog = createDog();
    this.dog.root.position.set(0, 0, 0);
    this.scene.add(this.dog.root);

    this.dogLight = new THREE.PointLight(0x59f0e6, 0.4, 6, 2);
    this.dogLight.position.set(0, 1.35, 0.5);
    this.dog.root.add(this.dogLight);

    this.dogFill = new THREE.PointLight(0xa6e9ff, 0.72, 7.5, 2);
    this.dogFill.position.set(0, 2.6, 1.8);
    this.dog.root.add(this.dogFill);

    this.dogRim = new THREE.PointLight(0xffb56a, 0.92, 7.5, 2);
    this.dogRim.position.set(0, 2.5, -2.2);
    this.dog.root.add(this.dogRim);

    this.fx = new FX(this.scene);
    this.camera.position.set(0.4, 2.5, 6.4);
    this.camera.lookAt(0, 1.0, 0);
    this.scene.background = new THREE.Color(0x0a1712);
  }

  initInput() {
    this.input = new Input({
      onPaw: () => this.paw(),
      onBite: () => this.bite(),
      onPause: () => this.togglePause(),
      onTiltChange: (enabled) => this.updateTiltUI(enabled)
    });
    this.input.bind();
    if (this.input.touch) document.body.classList.add('touch');
  }

  bindUI() {
    this.ui.btnStart.addEventListener('click', () => {
      this.audio.init();
      this.audio.click();
      this.startLevel(this.save.level);
    });
    this.ui.btnNew.addEventListener('click', () => {
      this.audio.init();
      this.audio.click();
      this.startLevel(1);
    });
    this.ui.btnMap.addEventListener('click', () => this.openMap('menu'));
    this.ui.btnPause.addEventListener('click', () => this.togglePause());
    this.ui.btnResume.addEventListener('click', () => this.resumeGame());
    this.ui.btnRestart.addEventListener('click', () => this.startLevel(this.level?.number || 1));
    this.ui.btnPauseMap.addEventListener('click', () => this.openMap('pause'));
    this.ui.btnQuit.addEventListener('click', () => this.showMenu());
    this.ui.btnNext.addEventListener('click', () => {
      if (!this.level) return;
      if (this.level.number >= LEVEL_COUNT) this.showEnding();
      else this.startLevel(this.level.number + 1);
    });
    this.ui.btnCompleteMap.addEventListener('click', () => this.openMap('levelComplete'));
    this.ui.btnRetry.addEventListener('click', () => this.startLevel(this.level?.number || 1));
    this.ui.btnDeathMap.addEventListener('click', () => this.openMap('death'));
    this.ui.btnDeathMenu.addEventListener('click', () => this.showMenu());
    this.ui.btnEndless.addEventListener('click', () => this.startLevel(1));
    this.ui.btnEndingMenu.addEventListener('click', () => this.showMenu());
    this.ui.btnMapClose.addEventListener('click', () => this.closeMap());
    this.ui.btnTilt.addEventListener('click', () => this.toggleTilt());
    this.ui.btnTiltPause.addEventListener('click', () => this.toggleTilt());
    this.ui.btnSound.addEventListener('click', () => this.toggleSound());
    this.ui.btnSoundPause.addEventListener('click', () => this.toggleSound());
    this.ui.btnCalibrate.addEventListener('click', () => {
      this.input.calibrateTilt();
      this.toast('Tilt re-centered. Lean left or right to turn.');
    });
    this.ui.levelGrid.addEventListener('click', (event) => {
      const button = event.target.closest('.map-chip');
      if (!button || button.classList.contains('locked')) return;
      const n = Number(button.dataset.level);
      if (!n) return;
      this.audio.init();
      this.audio.click();
      this.startLevel(n);
    });
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.narrow = width <= 720;
    if (!this.renderer) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
  }

  hideScreens() {
    for (const screen of [this.ui.menu, this.ui.pause, this.ui.levelComplete, this.ui.death, this.ui.ending, this.ui.levelMap]) {
      screen.classList.remove('active');
    }
    this.ui.bootError.classList.add('hidden');
  }

  disposeLevel() {
    for (const animal of this.animals) animal.dispose();
    this.animals = [];
    if (this.world) {
      this.world.dispose();
      this.world = null;
    }
    this.fx.clear();
    for (const timer of this.timers) clearTimeout(timer);
    this.timers = [];
    this.target = null;
    this.feastTarget = null;
    this.pendingComplete = 0;
    this.ui.targetPanel.classList.add('hidden');
    this.ui.feastPrompt.classList.add('hidden');
    this.ui.comboBadge.classList.add('hidden');
    this.dog.root.rotation.set(0, 0, 0);
    this.dog.root.position.set(0, 0, 0);
    this.dog.body.rotation.set(0, 0, 0);
    this.dog.body.position.set(0, 0, 0);
    this.dog.shadow.visible = true;
    this.dog.pawTimer = 0;
    this.dog.biteTimer = 0;
    this.dog.hurtTimer = 0;
  }

  showMenu() {
    this.state = 'menu';
    this.disposeLevel();
    this.hideScreens();
    this.ui.hud.classList.remove('active');
    this.ui.menu.classList.add('active');
    this.dog.root.rotation.set(0, 0.48, 0);
    this.dog.root.position.set(0, 0, 0);
    this.dog.shadow.visible = true;
    this.menuTime = 0;
    this.camYaw = 0;
    this.level = null;
    this.world = createWorld(this.scene, getLevel(1));
    this.camera.position.set(0.4, 2.5, 6.4);
    this.camera.lookAt(0, 1.02, 0);
    this.updateDogLights('day');
    this.audio.stopAmbience();
    if (this.audio.available) this.audio.startAmbience('day');
    this.refreshMenu();
    this.updateSoundUI();
    this.updateTiltUI(this.input.tiltEnabled);
  }

  refreshMenu() {
    const level = getLevel(this.save.level);
    this.ui.startLabel.textContent = this.save.level > 1 ? 'CONTINUE THE HUNT' : 'BEGIN THE HUNT';
    this.ui.startSub.textContent = `LEVEL ${levelRoman(level.number)} · ${level.name.toUpperCase()}`;
    this.ui.btnNew.classList.toggle('hidden', this.save.level <= 1);
    this.ui.menuLevel.textContent = levelRoman(this.save.level);
    this.ui.menuBest.textContent = formatScore(this.save.best);
    this.ui.menuFeasts.textContent = formatScore(this.save.totalFeasts);
  }

  startLevel(number) {
    const level = getLevel(clamp(number, 1, LEVEL_COUNT));
    this.audio.init();
    this.disposeLevel();
    this.hideScreens();
    this.level = level;
    this.world = createWorld(this.scene, level);
    this.state = 'playing';
    this.elapsed = 0;
    this.feasted = 0;
    this.score = 0;
    this.pendingComplete = 0;
    this.shake = 0;
    this.camYaw = 0;
    this.stepTimer = 0;
    this.downedHintShown = false;
    this.deathShown = false;
    this.tutorialStarted = false;
    this.lastDamageAt = -10;

    const player = this.player;
    player.pos.set(0, 0, 0);
    player.yaw = 0;
    player.speed = 0;
    player.maxLife = 100;
    player.life = 100;
    player.stamina = 100;
    player.exhausted = false;
    player.sprinting = false;
    player.pawCooldown = 0;
    player.biteCooldown = 0;
    player.invuln = 0;
    player.combo = 0;
    player.comboTimer = 0;
    player.moving = false;

    this.dog.root.rotation.set(0, 0, 0);
    this.dog.root.position.set(0, 0, 0);
    this.dog.body.rotation.set(0, 0, 0);
    this.dog.body.position.set(0, 0, 0);
    this.dog.shadow.visible = true;
    this.dog.pawTimer = 0;
    this.dog.biteTimer = 0;
    this.dog.hurtTimer = 0;
    this.dog.flashTimer = 0;
    this.updateDogLights(level.phase);

    this.spawnAnimals();

    this.save.level = clamp(Math.max(this.save.level, level.number), 1, LEVEL_COUNT);
    saveGame(this.save);

    this.ui.hud.classList.add('active');
    this.ui.levelNum.textContent = `WILD ${levelRoman(level.number)}`;
    this.ui.levelName.textContent = level.name;
    this.ui.phaseLabel.textContent = phaseLabel(level.phase);
    this.ui.phaseIcon.className = `phase-icon ${level.phase}`;
    this.ui.objectiveHint.textContent = level.boss ? 'Alpha prowls this wild' : 'Live prey in the wild';
    this.ui.bossTag.classList.toggle('hidden', !level.boss);
    this.ui.drainRate.textContent = `−${level.drain.toFixed(1)} / SEC`;
    this.ui.comboBadge.classList.add('hidden');
    this.ui.targetPanel.classList.add('hidden');
    this.ui.feastPrompt.classList.add('hidden');
    this.ui.lifeMax.textContent = '/100';
    this.ui.lifeFill.style.width = '100%';
    this.ui.feastFill.style.width = '0%';
    this.ui.feastCount.textContent = `0 / ${level.target}`;
    this.ui.scoreText.textContent = '0';
    this.ui.lifePanel.classList.remove('low');
    this.ui.dangerVignette.style.opacity = '0';
    this.updateSoundUI();
    this.updateTiltUI(this.input.tiltEnabled);

    this.camera.position.set(0, 4.2, -7.4);
    this.camera.lookAt(0, 1.25, 2);
    this.clock.getDelta();

    this.audio.startAmbience(level.phase);
    this.showBanner(`WILD ${levelRoman(level.number)}`, level.name, `${phaseLabel(level.phase)} · FEAST ON ${level.target} PREY`, false);

    if (level.boss) {
      this.timers.push(setTimeout(() => {
        if (this.state === 'playing' && this.level?.number === level.number) {
          this.showBanner('ALPHA STIRS', level.bossName, 'A BEAST CLAIMS THIS WILD', true);
        }
      }, 3800));
    }

    if (level.number === 1 && !localStorage.getItem(TUTORIAL_KEY)) {
      localStorage.setItem(TUTORIAL_KEY, '1');
      this.timers.push(setTimeout(() => this.toast('Push the stick to run. Drag left or right to turn.'), 4200));
      this.timers.push(setTimeout(() => this.toast('PAW to hunt. BITE to finish and feast. Eat or starve.'), 7600));
    }
  }

  updateDogLights(phase) {
    if (!this.dogLight) return;
    const night = phase === 'night';
    const dusk = phase === 'dusk';
    this.dogLight.intensity = night ? 1.05 : dusk ? 0.7 : 0.42;
    this.dogFill.intensity = night ? 1.2 : dusk ? 0.9 : 0.78;
    this.dogRim.intensity = night ? 1.3 : dusk ? 1.18 : 1.08;
  }

  spawnAnimals() {
    const level = this.level;
    const obstacles = this.world?.obstacles || [];
    const findSpot = (minRadius = 14, maxRadius = 52) => {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        if (Math.hypot(x, z) < 11) continue;
        let clear = true;
        for (const ob of obstacles) {
          if (Math.hypot(x - ob.x, z - ob.z) < ob.r + 1.6) {
            clear = false;
            break;
          }
        }
        if (clear) return makeVector(x, 0, z);
      }
      return makeVector(0, 0, -32);
    };

    for (const type of level.preyMix) {
      this.animals.push(new Animal(type, level, this.scene, findSpot()));
    }
    for (const type of level.predators) {
      this.animals.push(new Animal(type, level, this.scene, findSpot(24, 58)));
    }
    if (level.boss) {
      this.animals.push(new Animal(level.bossType, level, this.scene, findSpot(30, 46), { boss: true }));
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (this.state === 'playing') this.updateGame(dt);
    else if (this.state === 'menu') this.updateMenu(dt);
    else this.updateIdle(dt);
    this.updateCamera(dt);
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }

  updateMenu(dt) {
    this.menuTime += dt;
    this.dog.root.position.set(0, 0, 0);
    this.dog.root.rotation.set(0, 0.48 + Math.sin(this.menuTime * 0.34) * 0.12, 0);
    updateDogVisual(this.dog, dt, { moving: false });
    this.world?.update(dt);
    this.fx.update(dt);
  }

  updateIdle(dt) {
    if (this.state === 'paused') return;
    if (this.state !== 'dead') {
      updateDogVisual(this.dog, dt, { moving: false });
    }
    this.world?.update(dt * 0.45);
    this.fx.update(dt);
  }

  updateGame(dt) {
    if (!this.level || !this.world) return;
    const player = this.player;
    const level = this.level;
    this.elapsed += dt;

    player.pawCooldown = Math.max(0, player.pawCooldown - dt);
    player.biteCooldown = Math.max(0, player.biteCooldown - dt);
    player.invuln = Math.max(0, player.invuln - dt);
    if (player.comboTimer > 0) {
      player.comboTimer -= dt;
      if (player.comboTimer <= 0) player.combo = 0;
    }

    const axes = this.input.getAxes();
    const throttle = axes.y;
    const turn = axes.x;
    player.yaw += turn * 2.35 * dt * (0.66 + 0.34 * Math.min(1, Math.abs(throttle)));

    const wantsSprint = this.input.sprint && throttle > 0.12 && player.stamina > 0.5 && !player.exhausted;
    player.sprinting = wantsSprint;
    if (wantsSprint) {
      player.stamina = Math.max(0, player.stamina - 25 * dt);
      if (player.stamina <= 0.5) player.exhausted = true;
    } else {
      player.stamina = Math.min(100, player.stamina + 17 * dt);
      if (player.exhausted && player.stamina > 30) player.exhausted = false;
    }

    const maxSpeed = wantsSprint ? 9.4 : 5.6;
    let targetSpeed = 0;
    if (throttle > 0.12) targetSpeed = throttle * maxSpeed;
    else if (throttle < -0.12) targetSpeed = throttle * 2.3;
    player.speed = damp(player.speed, targetSpeed, 10, dt);
    if (Math.abs(player.speed) < 0.04) player.speed = 0;

    if (player.speed !== 0) {
      player.pos.x += Math.sin(player.yaw) * player.speed * dt;
      player.pos.z += Math.cos(player.yaw) * player.speed * dt;
      this.resolvePlayerCollisions();
    }
    player.moving = Math.abs(player.speed) > 0.22;

    if (player.moving) {
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) {
        this.audio.step(wantsSprint);
        this.stepTimer = wantsSprint ? 0.2 : 0.33;
      }
    }

    this.dog.root.position.set(player.pos.x, 0, player.pos.z);
    this.dog.root.rotation.y = player.yaw;
    updateDogVisual(this.dog, dt, { moving: player.moving, speed: Math.abs(player.speed) });

    player.life = Math.max(0, player.life - level.drain * dt * (wantsSprint ? 1.05 : 1));

    const ctx = {
      playerPos: player.pos,
      playerAlive: player.life > 0,
      worldRadius: WORLD_RADIUS,
      obstacles: this.world.obstacles,
      camera: this.camera,
      damagePlayer: (amount, animal) => this.damagePlayer(amount, animal),
      onWindup: () => this.audio.windup()
    };

    for (const animal of this.animals) animal.update(dt, ctx);
    this.separateAnimals();
    for (let i = this.animals.length - 1; i >= 0; i -= 1) {
      if (this.animals[i].remove) {
        this.animals[i].dispose();
        this.animals.splice(i, 1);
      }
    }

    if (player.life <= 0) {
      this.die(this.lastDamageAt > this.elapsed - 1.2 ? 'predator' : 'hunger');
      return;
    }

    this.updateTargets();

    if (this.pendingComplete > 0) {
      this.pendingComplete -= dt;
      if (this.pendingComplete <= 0) {
        this.completeLevel();
        return;
      }
    }

    this.updateHUD(dt);
    this.world.update(dt);
    this.fx.update(dt);
    this.audio.update(dt, player.life < 28);
  }

  resolvePlayerCollisions() {
    const player = this.player;
    const obstacles = this.world?.obstacles || [];
    for (const ob of obstacles) {
      const dx = player.pos.x - ob.x;
      const dz = player.pos.z - ob.z;
      const d = Math.hypot(dx, dz);
      const min = ob.r + 0.46;
      if (d < min && d > 0.0001) {
        player.pos.x += (dx / d) * (min - d);
        player.pos.z += (dz / d) * (min - d);
      }
    }
    const radius = Math.hypot(player.pos.x, player.pos.z);
    if (radius > WORLD_RADIUS) {
      player.pos.x *= WORLD_RADIUS / radius;
      player.pos.z *= WORLD_RADIUS / radius;
    }
  }

  separateAnimals() {
    for (let i = 0; i < this.animals.length; i += 1) {
      const a = this.animals[i];
      if (a.downed || a.eaten || a.remove) continue;
      for (let j = i + 1; j < this.animals.length; j += 1) {
        const b = this.animals[j];
        if (b.downed || b.eaten || b.remove) continue;
        const dx = b.position.x - a.position.x;
        const dz = b.position.z - a.position.z;
        const d = Math.hypot(dx, dz);
        const min = (a.config.radius + b.config.radius) * 0.8;
        if (d > 0.001 && d < min) {
          const push = (min - d) * 0.5;
          a.position.x -= (dx / d) * push;
          a.position.z -= (dz / d) * push;
          b.position.x += (dx / d) * push;
          b.position.z += (dz / d) * push;
        }
      }
    }
  }

  updateTargets() {
    let nearest = null;
    let nearestDist = 11;
    let feast = null;
    let feastDist = 3.6;
    const px = this.player.pos.x;
    const pz = this.player.pos.z;
    for (const animal of this.animals) {
      animal.setHighlight(false);
      if (animal.eaten || animal.remove) continue;
      const d = Math.hypot(animal.position.x - px, animal.position.z - pz);
      if (animal.downed) {
        if (d < feastDist) {
          feastDist = d;
          feast = animal;
        }
      } else if (d < nearestDist) {
        nearestDist = d;
        nearest = animal;
      }
    }
    this.target = feast || nearest;
    this.feastTarget = feast;
    if (this.target) this.target.setHighlight(true);

    if (this.target) {
      const label = this.target.boss ? this.level.bossName : this.target.config.label;
      this.ui.targetName.textContent = label;
      const isDown = this.target.downed;
      this.ui.targetState.textContent = isDown ? 'DOWNED · BITE' : this.target.boss ? 'ALPHA' : this.target.config.prey ? 'PREY' : 'PREDATOR';
      this.ui.targetState.style.color = isDown ? '#ffc45c' : this.target.config.prey ? '#6ff4ec' : '#ff6b57';
      this.ui.targetFill.style.width = `${Math.max(0, (this.target.hp / this.target.maxHp) * 100)}%`;
      this.ui.targetPanel.classList.remove('hidden');
    } else {
      this.ui.targetPanel.classList.add('hidden');
    }

    if (this.feastTarget) {
      const gain = this.feastTarget.config.life + (this.feastTarget.boss ? 30 : 0);
      this.ui.feastValue.textContent = `+${gain} LIFE`;
      this.ui.feastPrompt.classList.remove('hidden');
    } else {
      this.ui.feastPrompt.classList.add('hidden');
    }
  }

  paw() {
    if (this.state !== 'playing' || this.player.life <= 0 || this.player.pawCooldown > 0) return;
    this.player.pawCooldown = PAW_COOLDOWN;
    triggerPaw(this.dog);
    this.audio.paw();
    const hits = this.attackArc(3.1, 1.12, 18);
    if (hits > 0) {
      this.player.combo = Math.min(6, this.player.combo + 1);
      this.player.comboTimer = 2.6;
      this.shake = Math.max(this.shake, 0.14);
    } else {
      this.fx.spawnDust(this.player.pos.clone().add(makeVector(0, 0.2, 1.2)), 0xb5a077, 5);
    }
  }

  bite() {
    if (this.state !== 'playing' || this.player.life <= 0 || this.player.biteCooldown > 0) return;
    if (this.feastTarget) {
      this.player.biteCooldown = 0.55;
      triggerBite(this.dog);
      this.audio.bite();
      this.feast(this.feastTarget);
      return;
    }
    this.player.biteCooldown = BITE_COOLDOWN;
    triggerBite(this.dog);
    this.audio.bite();
    const hits = this.attackArc(3.0, 0.86, 36);
    if (hits > 0) {
      this.player.combo = Math.min(6, this.player.combo + 1);
      this.player.comboTimer = 2.6;
      this.shake = Math.max(this.shake, 0.2);
    }
  }

  attackArc(range, halfAngle, baseDamage) {
    const player = this.player;
    const forward = makeVector(Math.sin(player.yaw), 0, Math.cos(player.yaw));
    let hits = 0;
    for (const animal of this.animals) {
      if (!animal.alive || animal.downed || animal.eaten || animal.remove) continue;
      const dx = animal.position.x - player.pos.x;
      const dz = animal.position.z - player.pos.z;
      const distance = Math.hypot(dx, dz);
      if (distance > range + animal.config.radius * 0.4) continue;
      const dot = (dx * forward.x + dz * forward.z) / Math.max(0.001, distance);
      if (dot < Math.cos(halfAngle)) continue;
      const comboBoost = 1 + player.combo * 0.08;
      const damage = baseDamage * comboBoost;
      const result = animal.damage(damage, player.pos);
      if (result.damage > 0) {
        hits += 1;
        const hitPos = animal.position.clone();
        hitPos.y = animal.config.height * 0.58;
        this.fx.spawnBurst(hitPos, 0xffc86b, 9, { speed: 2.4, up: 1.3, life: 0.45, size: 0.13, gravity: 3 });
        this.audio.hit();
        if (result.killed) this.onAnimalDowned(animal);
      }
    }
    return hits;
  }

  onAnimalDowned(animal) {
    this.score += animal.boss ? 420 : 25;
    this.fx.spawnRing(animal.position.clone(), animal.boss ? 0xff5d49 : 0xffc45c, animal.boss ? 2.6 : 1.35);
    const textPos = animal.position.clone();
    textPos.y = animal.config.height + 0.35;
    this.fx.spawnText(textPos, 'DOWNED', animal.boss ? '#ff6b57' : '#ffc45c', animal.boss ? 1.3 : 0.85);
    if (animal.boss) {
      this.toast(`${this.level.bossName} is down. BITE to claim the alpha.`);
    } else if (!this.downedHintShown) {
      this.downedHintShown = true;
      this.toast('Prey downed. Get close and BITE to feast.');
    }
  }

  feast(animal) {
    const reward = animal.consume();
    if (!reward) return;
    if (this.target === animal) this.target = null;
    this.feastTarget = null;
    this.ui.feastPrompt.classList.add('hidden');
    const player = this.player;
    player.maxLife = Math.min(170, player.maxLife + 2);
    player.life = Math.min(player.maxLife, player.life + reward.life);
    this.score += reward.score + Math.round(player.combo * 22);
    if (reward.prey) this.feasted += 1;
    if (reward.boss) this.score += 500;
    this.save.totalFeasts += 1;
    saveGame(this.save);

    const pos = animal.position.clone();
    pos.y = animal.config.height * 0.7;
    this.fx.spawnBurst(pos, reward.boss ? 0xffc45c : 0x6ff4ec, 20, { speed: 3.2, up: 1.8, life: 0.7, size: 0.18, gravity: 3.2 });
    this.fx.spawnRing(animal.position.clone(), reward.boss ? 0xff5d49 : 0xffc45c, 1.8);
    const textPos = animal.position.clone();
    textPos.y = animal.config.height + 0.55;
    this.fx.spawnText(textPos, `+${reward.life} LIFE`, '#8ffcf2', 1.05);
    this.audio.feast();
    this.flashLife();
    this.toast(`${reward.label} devoured · +${reward.life} LIFE · +${reward.score} SCORE`);
    if (reward.boss) this.toast(`${this.level.bossName} has fallen. The wild remembers.`);

    if (this.feasted >= this.level.target && this.pendingComplete <= 0) {
      this.pendingComplete = 0.8;
      this.toast('The wild is sated. The trail opens.');
    }
  }

  damagePlayer(amount, animal) {
    const player = this.player;
    if (this.state !== 'playing' || player.invuln > 0 || player.life <= 0) return;
    player.life = Math.max(0, player.life - amount);
    player.invuln = 0.85;
    player.combo = 0;
    player.comboTimer = 0;
    this.lastDamageAt = this.elapsed;
    triggerHurt(this.dog);
    this.shake = Math.max(this.shake, 0.32);
    this.audio.hurt();
    this.flashHit();
    const pos = player.pos.clone();
    pos.y = 0.9;
    this.fx.spawnBurst(pos, 0xff5b44, 12, { speed: 2.6, up: 1.1, life: 0.45, size: 0.14, gravity: 4 });
    if (player.life <= 0) {
      this.die(animal ? 'predator' : 'hunger');
    }
  }

  die(cause = 'hunger') {
    if (this.state !== 'playing') return;
    this.state = 'dead';
    this.deathCause = cause;
    this.player.life = 0;
    this.player.sprinting = false;
    this.audio.stopAmbience();
    this.audio.death();
    this.dog.root.rotation.set(0, this.dog.root.rotation.y, 1.32);
    this.dog.root.position.y = 0.28;
    this.dog.shadow.visible = false;
    this.ui.targetPanel.classList.add('hidden');
    this.ui.feastPrompt.classList.add('hidden');
    this.ui.comboBadge.classList.add('hidden');
    this.save.best = Math.max(this.save.best, Math.round(this.score));
    saveGame(this.save);

    this.ui.deathTitle.textContent = cause === 'predator' ? 'THE WILDS TOOK YOU' : 'THE HUNGER WINS';
    this.ui.deathSub.textContent = cause === 'predator'
      ? 'A predator found your throat before the forest did.'
      : 'You ate too little, and the long dark closed in.';
    this.ui.deathFeasts.textContent = `${this.feasted} / ${this.level.target}`;
    this.ui.deathTime.textContent = formatTime(this.elapsed);
    this.ui.deathScore.textContent = formatScore(this.score);
    this.ui.deathLevel.textContent = levelRoman(this.level.number);

    if (!this.deathShown) {
      this.deathShown = true;
      this.timers.push(setTimeout(() => {
        if (this.state === 'dead') this.ui.death.classList.add('active');
      }, 700));
    }
  }

  completeLevel() {
    if (this.state !== 'playing' || !this.level) return;
    this.state = 'levelComplete';
    this.player.sprinting = false;
    this.audio.stopAmbience();
    this.audio.levelUp();
    const timeBonus = Math.max(0, 900 - Math.floor(this.elapsed) * 5);
    this.score += timeBonus + Math.round(this.player.life * 4);
    const ratio = this.player.life / this.player.maxLife;
    const stars = ratio > 0.62 ? 3 : ratio > 0.3 ? 2 : 1;
    this.save.cleared = Math.max(this.save.cleared, this.level.number);
    this.save.level = clamp(Math.max(this.save.level, this.level.number + 1), 1, LEVEL_COUNT);
    this.save.best = Math.max(this.save.best, Math.round(this.score));
    saveGame(this.save);

    this.ui.completeName.textContent = `${levelRoman(this.level.number)} · ${this.level.name}`;
    this.ui.completeStars.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    this.ui.completeFeasts.textContent = `${this.feasted} / ${this.level.target}`;
    this.ui.completeTime.textContent = formatTime(this.elapsed);
    this.ui.completeScore.textContent = formatScore(this.score);
    this.ui.completeLife.textContent = `${Math.ceil(this.player.life)} / ${this.player.maxLife}`;
    this.ui.btnNext.textContent = this.level.number >= LEVEL_COUNT ? 'SEE THE END' : 'NEXT WILD';
    this.ui.levelComplete.classList.add('active');
  }

  showEnding() {
    this.state = 'ending';
    this.ui.levelComplete.classList.remove('active');
    this.ui.endingFeasts.textContent = formatScore(this.save.totalFeasts);
    this.ui.endingBest.textContent = formatScore(this.save.best);
    this.ui.ending.classList.add('active');
  }

  togglePause() {
    if (this.state === 'playing') this.pauseGame();
    else if (this.state === 'paused') this.resumeGame();
  }

  pauseGame() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.sprint = false;
    this.ui.pauseSub.textContent = this.level
      ? `${levelRoman(this.level.number)} · ${this.level.name} · ${phaseLabel(this.level.phase)}`
      : 'Catch your breath.';
    this.updateTiltUI(this.input.tiltEnabled);
    this.updateSoundUI();
    this.ui.pause.classList.add('active');
  }

  resumeGame() {
    if (this.state !== 'paused') return;
    this.ui.pause.classList.remove('active');
    this.state = 'playing';
    this.clock.getDelta();
  }

  openMap(returnTo = 'menu') {
    if (this.state === 'playing') {
      this.pauseGame();
      returnTo = 'pause';
    }
    this.mapReturn = returnTo;
    this.buildMap();
    this.updateMapChips();
    this.hideScreens();
    this.ui.levelMap.classList.add('active');
    const current = this.ui.levelGrid.querySelector('.current');
    if (current) {
      setTimeout(() => current.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
    }
  }

  closeMap() {
    this.ui.levelMap.classList.remove('active');
    if (this.mapReturn === 'pause') this.ui.pause.classList.add('active');
    else if (this.mapReturn === 'levelComplete') this.ui.levelComplete.classList.add('active');
    else if (this.mapReturn === 'death') this.ui.death.classList.add('active');
    else this.ui.menu.classList.add('active');
  }

  buildMap() {
    if (this.mapBuilt) return;
    const fragment = document.createDocumentFragment();
    for (let n = 1; n <= LEVEL_COUNT; n += 1) {
      const level = getLevel(n);
      const button = document.createElement('button');
      button.className = `map-chip ${level.phase}`;
      button.dataset.level = String(n);
      button.textContent = levelRoman(n);
      button.title = `Wild ${levelRoman(n)} · ${level.name} · ${phaseLabel(level.phase)}`;
      button.setAttribute('aria-label', button.title);
      if (level.boss) button.classList.add('boss');
      fragment.appendChild(button);
      this.mapButtons.push(button);
    }
    this.ui.levelGrid.appendChild(fragment);
    this.mapBuilt = true;
  }

  updateMapChips() {
    for (const button of this.mapButtons) {
      const n = Number(button.dataset.level);
      button.classList.toggle('locked', n > this.save.level);
      button.classList.toggle('completed', n <= this.save.cleared);
      button.classList.toggle('current', n === this.save.level);
    }
    this.ui.mapProgress.textContent = `${levelRoman(this.save.level)} / ${LEVEL_COUNT} UNLOCKED`;
  }

  async toggleTilt() {
    if (this.input.tiltEnabled) {
      this.input.disableTilt();
      this.updateTiltUI(false);
      this.toast('Tilt steering off.');
      return;
    }
    const result = await this.input.enableTilt();
    if (result.ok) {
      this.updateTiltUI(true);
      this.toast('Tilt steering on. Lean left or right to turn.');
    } else {
      this.updateTiltUI(false);
      this.toast(result.reason || 'Tilt is not available on this device.');
    }
  }

  updateTiltUI(enabled) {
    for (const button of [this.ui.btnTilt, this.ui.btnTiltPause]) {
      if (!button) continue;
      button.setAttribute('aria-pressed', String(enabled));
      const label = button.querySelector('b');
      if (label) label.textContent = enabled ? 'ON' : 'OFF';
    }
    this.ui.btnCalibrate.classList.toggle('hidden', !enabled);
    this.ui.tiltBadge.classList.toggle('hidden', !enabled);
  }

  toggleSound() {
    this.audio.init();
    this.audio.toggleMuted();
    this.audio.click();
    this.updateSoundUI();
  }

  updateSoundUI() {
    const on = !this.audio.muted;
    for (const button of [this.ui.btnSound, this.ui.btnSoundPause]) {
      if (!button) continue;
      button.setAttribute('aria-pressed', String(on));
      const label = button.querySelector('b');
      if (label) label.textContent = on ? 'ON' : 'OFF';
    }
  }

  updateHUD(dt) {
    const player = this.player;
    const level = this.level;
    if (!level) return;
    const lifeRatio = clamp(player.life / player.maxLife, 0, 1);
    this.ui.lifeFill.style.width = `${lifeRatio * 100}%`;
    this.ui.lifeText.textContent = String(Math.ceil(player.life));
    this.ui.lifeMax.textContent = `/${player.maxLife}`;
    this.ui.lifePanel.classList.toggle('low', lifeRatio < 0.28);
    this.ui.staminaFill.style.width = `${clamp(player.stamina, 0, 100)}%`;
    this.ui.feastCount.textContent = `${this.feasted} / ${level.target}`;
    this.ui.feastFill.style.width = `${clamp(this.feasted / level.target, 0, 1) * 100}%`;
    this.ui.scoreText.textContent = formatScore(this.score);
    this.ui.pawCd.style.setProperty('--cd', (player.pawCooldown / PAW_COOLDOWN).toFixed(3));
    this.ui.biteCd.style.setProperty('--cd', (player.biteCooldown / BITE_COOLDOWN).toFixed(3));
    this.ui.dangerVignette.style.opacity = lifeRatio < 0.28 ? String(0.35 + (0.28 - lifeRatio) * 2.2) : '0';

    if (player.combo > 1 && this.state === 'playing') {
      this.ui.comboText.textContent = `×${player.combo}`;
      this.ui.comboBadge.classList.remove('hidden');
    } else {
      this.ui.comboBadge.classList.add('hidden');
    }

    this.minimapTimer -= dt;
    if (this.minimapTimer <= 0) {
      this.minimapTimer = 0.075;
      this.drawMinimap();
    }
  }

  drawMinimap() {
    const canvas = this.ui.minimap;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 8;
    const range = 34;
    const scale = radius / range;
    const player = this.player;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = 'rgba(3, 14, 11, 0.88)';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = 'rgba(120, 220, 200, 0.09)';
    ctx.lineWidth = 1.5;
    for (const ring of [10, 20, 30]) {
      ctx.beginPath();
      ctx.arc(center, center, ring * scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120, 220, 200, 0.14)';
    ctx.beginPath();
    ctx.moveTo(center, 8);
    ctx.lineTo(center, size - 8);
    ctx.moveTo(8, center);
    ctx.lineTo(size - 8, center);
    ctx.stroke();

    for (const animal of this.animals) {
      if (animal.eaten || animal.remove) continue;
      const dx = (animal.position.x - player.pos.x) * scale;
      const dy = (animal.position.z - player.pos.z) * scale;
      if (dx * dx + dy * dy > (radius - 8) * (radius - 8)) continue;
      let color = '#b9e6b0';
      let dot = 4.8;
      if (animal.downed) {
        color = '#ffc45c';
        dot = 6.2;
      } else if (!animal.config.prey) {
        color = '#ff6b57';
        dot = 5.8;
      }
      if (animal.boss) {
        color = '#ff3b30';
        dot = 9;
      }
      ctx.beginPath();
      ctx.arc(center + dx, center + dy, dot, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    const fx = Math.sin(player.yaw);
    const fz = Math.cos(player.yaw);
    const rx = Math.cos(player.yaw);
    const rz = -Math.sin(player.yaw);
    const tip = [center + fx * 13, center + fz * 13];
    const left = [center - fx * 6 - rx * 7, center - fz * 6 - rz * 7];
    const right = [center - fx * 6 + rx * 7, center - fz * 6 + rz * 7];
    ctx.beginPath();
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(left[0], left[1]);
    ctx.lineTo(right[0], right[1]);
    ctx.closePath();
    ctx.fillStyle = '#6ff4ec';
    ctx.shadowColor = '#4fe8df';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(230, 255, 250, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  updateCamera(dt) {
    if (this.state === 'menu') {
      const angle = Math.sin(this.menuTime * 0.17) * 0.82 + 0.04;
      const radius = this.narrow ? 5.2 : 5.75;
      const desired = makeVector(Math.sin(angle) * radius, this.narrow ? 2.2 : 2.35, Math.cos(angle) * radius);
      this.camera.position.lerp(desired, 1 - Math.exp(-3.5 * dt));
      const lookX = this.narrow ? 0 : -1.05;
      const lookY = this.narrow ? 0.82 : 1.02;
      this.camera.lookAt(lookX, lookY, 0);
      return;
    }

    const player = this.player;
    this.camYaw = dampAngle(this.camYaw, player.yaw, 5, dt);
    const forwardX = Math.sin(this.camYaw);
    const forwardZ = Math.cos(this.camYaw);
    const distance = 6.9 + (player.sprinting ? 0.7 : 0);
    const height = 3.95;
    const side = this.narrow ? 0.75 : 1.15;
    const rightX = Math.cos(this.camYaw);
    const rightZ = -Math.sin(this.camYaw);
    const desired = makeVector(
      player.pos.x - forwardX * distance + rightX * side,
      height,
      player.pos.z - forwardZ * distance + rightZ * side
    );
    const cameraTarget = makeVector(
      player.pos.x + forwardX * 1.7,
      1.18,
      player.pos.z + forwardZ * 1.7
    );
    this.camera.position.lerp(desired, 1 - Math.exp(-6.5 * dt));
    this.camera.lookAt(cameraTarget);

    this.shake = Math.max(0, this.shake - dt * 1.8);
    if (this.shake > 0.001) {
      this.camera.position.x += (Math.random() - 0.5) * this.shake;
      this.camera.position.y += (Math.random() - 0.5) * this.shake * 0.6;
      this.camera.position.z += (Math.random() - 0.5) * this.shake;
    }
  }

  showBanner(kicker, title, sub, alpha = false) {
    this.ui.banner.classList.remove('show', 'alpha');
    void this.ui.banner.offsetWidth;
    this.ui.bannerKicker.textContent = kicker;
    this.ui.bannerTitle.textContent = title;
    this.ui.bannerSub.textContent = sub;
    if (alpha) this.ui.banner.classList.add('alpha');
    this.ui.banner.classList.add('show');
  }

  toast(text, duration = 2400) {
    clearTimeout(this._toastTimer);
    this.ui.toast.textContent = text;
    this.ui.toast.classList.add('show');
    this._toastTimer = setTimeout(() => this.ui.toast.classList.remove('show'), duration);
  }

  flashHit() {
    this.ui.hitFlash.style.opacity = '1';
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => { this.ui.hitFlash.style.opacity = '0'; }, 100);
  }

  flashLife() {
    this.ui.lifeFlash.style.opacity = '1';
    clearTimeout(this._lifeTimer);
    this._lifeTimer = setTimeout(() => { this.ui.lifeFlash.style.opacity = '0'; }, 130);
  }
}

try {
  new Game();
} catch (error) {
  console.error(error);
  const errorScreen = document.getElementById('bootError');
  if (errorScreen) errorScreen.classList.remove('hidden');
}
