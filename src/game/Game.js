import * as THREE from "three";
import { World } from "./World.js";
import { Pup } from "./Pup.js";
import { Creature } from "./Creature.js";
import { Input } from "./Input.js";
import { UI } from "./UI.js";
import { Audio } from "./Audio.js";
import { Effects } from "./Effects.js";
import { levelInfo, loadSave, saveGame, clearSave, defaultSave, MAX_LEVEL, LEVELS_PER_CHAPTER, isNightTime } from "./Levels.js";
import { clamp, lerp, damp, dampAngle, smoothstep, mulberry32 } from "./util.js";

const BOSS_NAMES = {
  wolf: ["The Grey King", "Old Frostjaw", "Hollow Alpha", "The Pale Fang"],
  boar: ["Rootback the Terrible", "Old Iron Tusk", "The Bramble Boar", "Cinder Snout"],
  badger: ["The Grinning Badger", "Brambleclaw", "The Iron Biter", "Mossjaw"],
};

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.save = loadSave();
    this.quality = this.resolveQuality(this.save.settings.quality);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
    });
    this.softwareRenderer = this.detectSoftwareRenderer();
    if (this.softwareRenderer) this.quality = "low";
    this.renderer.setPixelRatio(this.pixelRatioFor(this.quality));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.shadowMap.enabled = !this.softwareRenderer && this.quality !== "low";
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setClearColor(0x0a120e, 1);

    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 420);
    this.scene = null;
    this.world = null;
    this.effects = null;
    this.creatures = [];
    this.pendingRemove = [];
    this.mode = "boot";
    this.panelSource = "menu";
    this.levelDone = false;
    this.levelElapsed = 0;
    this.time = 0;
    this.shake = 0;
    this.fpsSamples = [];
    this.lowFpsTime = 0;
    this.resetArmed = false;

    this.pup = new Pup();
    this.pup.root.scale.setScalar(0.93);

    this.ui = new UI(this);
    this.audio = new Audio();
    this.input = new Input(this);

    this.player = {
      position: new THREE.Vector3(),
      heading: 0,
      speed: 0,
      hp: 100,
      maxLife: 100,
      hunger: 90,
      dead: false,
      pounce: null,
      jump: 0,
      stepT: 0,
      moving: false,
    };
    this.aiProxy = { position: new THREE.Vector3(500, 0, 500), dead: true };
    this.camLook = new THREE.Vector3(0, 1.2, 0);
    this.camWant = new THREE.Vector3();
    this.counts = { prey: 0, beasts: 0 };
    this.target = null;
    this.boss = null;
    this.cooldowns = {
      bite: { remaining: 0, cooldown: 0.46 },
      paw: { remaining: 0, cooldown: 0.72 },
      pounce: { remaining: 0, cooldown: 2.4 },
    };

    this.audio.enabled = this.save.settings.sound !== false;
    this.ui.setSoundIcon();
    this.resize();
    this.bindResize();
    this.bindVisibility();
    this._lastHud = 0;
    this._lastFrame = performance.now();
    this._loop = this._loop.bind(this);
  }

  resolveQuality(q) {
    if (q === "high" || q === "low") return q;
    const mobile = window.matchMedia?.("(pointer: coarse)")?.matches || window.innerWidth < 820;
    return mobile ? "medium" : "high";
  }

  detectSoftwareRenderer() {
    try {
      const gl = this.renderer.getContext();
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      return /swiftshader|llvmpipe|software|basic render/i.test(name);
    } catch {
      return false;
    }
  }

  pixelRatioFor(q) {
    const dpr = window.devicePixelRatio || 1;
    if (q === "low") return 1;
    if (q === "high") return Math.min(dpr, 1.75);
    return Math.min(dpr, 1.35);
  }

  async boot() {
    this.ui.setLoading(0.12, "Waking the woods…");
    await new Promise(r => requestAnimationFrame(r));
    const info = levelInfo(this.save.unlocked);
    this.ui.setLoading(0.35, `Finding trail ${String(info.level).padStart(3, "0")}…`);
    await new Promise(r => setTimeout(r, 40));
    this.loadLevel(info.level, true);
    this.ui.setLoading(0.82, "Waking the rabbits…");
    await new Promise(r => requestAnimationFrame(r));
    this.ui.refreshMenu(this.save, this.info);
    this.ui.showMenu(true);
    this.ui.showHUD(false);
    this.ui.setLoading(1, "The trail is ready.");
    await new Promise(r => setTimeout(r, 420));
    this.ui.hideLoading();
    this.mode = "menu";
    this.clock = performance.now();
    requestAnimationFrame(this._loop);
  }

  loadLevel(level, attract = false) {
    clearTimeout(this._tipDelay);
    if (this.world) {
      this.effects?.clear();
      this.scene?.remove(this.pup.root);
      this.world.dispose();
      this.scene = null;
      this.world = null;
      this.effects = null;
    }
    this.creatures = [];
    this.target = null;
    this.boss = null;
    this.levelDone = false;
    this.levelElapsed = 0;
    this.attract = attract;
    this.info = levelInfo(level);
    this.level = this.info.level;
    this.world = new World(this.info, this.renderer, this.quality);
    this.scene = this.world.scene;
    this.effects = new Effects(this.scene);

    // A soft camera-side key light keeps the black pup readable in the shade.
    this.rimLight = new THREE.DirectionalLight(0xbfe9ff, 0.72);
    this.rimTarget = new THREE.Object3D();
    this.rimLight.target = this.rimTarget;
    this.scene.add(this.rimLight, this.rimTarget);

    const p = this.player;
    p.maxLife = 100 + clamp(this.save.vitality || 0, 0, 100);
    p.hp = p.maxLife;
    p.hunger = 88;
    p.dead = false;
    p.speed = 0;
    p.pounce = null;
    p.jump = 0;
    p.heading = 0;
    p.stepT = 0;
    p.position.set(0, this.world.heightAt(0, 0), 0);
    this.pup.root.position.copy(p.position);
    this.pup.root.rotation.set(0, 0, 0);
    this.pup.rig.rotation.set(0, 0, 0);
    this.pup.rig.position.set(0, 0, 0);
    this.pup.dead = false;
    this.pup.biteT = 0;
    this.pup.eatT = 0;
    this.pup.hurtT = 0;
    this.pup.pawT = 0;
    this.scene.add(this.pup.root);

    this.counts = { prey: 0, beasts: 0 };
    this.cooldowns.bite.remaining = 0;
    this.cooldowns.paw.remaining = 0;
    this.cooldowns.pounce.remaining = 0;
    this.spawnCreatures();

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.62, 0.78, 32),
      new THREE.MeshBasicMaterial({ color: 0xf0b45f, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    ring.renderOrder = 5;
    this.scene.add(ring);
    this.targetRing = ring;

    this.ui.setLevelChrome(this.info);
    this.ui.updateCooldowns(this.cooldowns.bite, this.cooldowns.paw, this.cooldowns.pounce);
    this.ui.el["boss-wrap"].hidden = true;
    this.ui.el["target-tag"].hidden = true;
    this.camLook.set(p.position.x, p.position.y + 1.2, p.position.z);
    if (attract) {
      const portrait = window.innerWidth < window.innerHeight;
      const a = portrait ? 0.48 : 0.62;
      const dist = portrait ? 7.4 : 6.1;
      this.camera.position.set(Math.sin(a) * dist, portrait ? 2.75 : 2.6, Math.cos(a) * dist);
      this.camera.lookAt(p.position.x + (portrait ? 0.25 : -0.7), p.position.y + (portrait ? 1.3 : 1.15), p.position.z - 0.2);
      this.camLook.set(p.position.x + (portrait ? 0.25 : -0.7), p.position.y + (portrait ? 1.3 : 1.15), p.position.z - 0.2);
      this.camera.fov = portrait ? 40 : 43;
    } else {
      const dist = this.playerCameraDistance() + 1.3;
      this.camera.position.set(p.position.x, p.position.y + 2.4, p.position.z - dist);
      this.camLook.set(p.position.x, p.position.y + 1.3, p.position.z + 2.1);
      this.camera.fov = this.playerFov(0);
    }
    this.camera.updateProjectionMatrix();
    this.audio.setNight(isNightTime(this.world.time));
  }

  spawnCreatures() {
    const info = this.info;
    const world = this.world;
    const rng = mulberry32(info.seed + 991);
    const list = [];
    const spawn = (type, minR, maxR, forced) => {
      let x, z;
      if (forced) { x = forced[0]; z = forced[1]; }
      else {
        let tries = 0;
        do {
          const spot = world.openSpot(rng, minR, maxR, 1.4);
          x = spot.x; z = spot.z;
          tries++;
        } while (tries < 20 && (Math.hypot(x, z) < 7 || list.some(c => Math.hypot(c.root.position.x - x, c.root.position.z - z) < 2.6)));
      }
      const c = new Creature(type, info, world, this.scene, x, z, false);
      c.onAttack = (cr) => this.onCreatureAttack(cr);
      c.onDeath = (cr) => this.onCreatureDeath(cr);
      list.push(c);
      return c;
    };

    const firstSpots = info.level === 1 ? [[-2.5, 8.6], [3.4, 10.6], [-7.4, 13.8], [7.8, 9.2], [-1.6, 17.2]] : null;
    for (let i = 0; i < info.preySpawn; i++) {
      const type = i === info.preySpawn - 1 && info.level > 12 && rng() > 0.72 ? "deer" : "rabbit";
      spawn(type, 8, 30, firstSpots ? firstSpots[i % firstSpots.length] : null);
    }
    for (let i = 0; i < info.beastSpawn; i++) {
      let type;
      const roll = rng();
      if (info.level < 8) type = "fox";
      else if (roll < 0.34) type = "fox";
      else if (roll < 0.62) type = "badger";
      else if (roll < 0.85) type = "wolf";
      else type = "boar";
      spawn(type, 13, 34, info.level === 1 && i === 0 ? [5.6, 19.2] : null);
    }
    if (info.boss) {
      const c = new Creature(info.bossType, info, world, this.scene, 0, 19, true);
      const names = BOSS_NAMES[info.bossType] || ["The Hollow Alpha"];
      c.name = names[(info.chapter - 1) % names.length];
      c.onAttack = (cr) => this.onCreatureAttack(cr);
      c.onDeath = (cr) => this.onCreatureDeath(cr);
      list.push(c);
      this.boss = c;
      this.ui.toast(`<strong>${c.name}</strong> has caught your scent`, "warn");
    }
    this.creatures = list;
    world.creatures = list;
  }

  playerCameraDistance() {
    const aspect = window.innerWidth / Math.max(1, window.innerHeight);
    return aspect < 0.85 ? 7.0 : aspect < 1.2 ? 6.2 : 5.7;
  }

  playerFov(speed) {
    const portrait = window.innerWidth < window.innerHeight;
    return (portrait ? 66 : 58) + clamp(speed / 8, 0, 1) * 4;
  }

  startFromMenu() {
    this.audio.init();
    this.ui.showMenu(false);
    this.ui.hideAllPanels();
    this.ui.showHUD(true);
    this.mode = "play";
    this.levelDone = false;
    this.audio.setEnabled(this.audio.enabled);
    this.ui.showLevelBanner(this.info, this.boss);
    const tip = this.info.level === 1
      ? "Push the stick to run <span>·</span> BITE to hunt <span>·</span> Eat or your life drains"
      : "Stay fed <span>·</span> Every meal raises your life <span>·</span> Clear the trail";
    this.showIntroTip(tip, 9000, 4900);
    this.save.seenIntro = true;
    this.persist();
  }

  async startLevel(level, mode = "play") {
    if (this._switching) return;
    this._switching = true;
    this.ui.hideAllPanels();
    this.ui.whiteFlash();
    await new Promise(r => setTimeout(r, 80));
    this.loadLevel(clamp(level, 1, MAX_LEVEL), mode === "menu");
    if (mode === "play") {
      this.ui.showMenu(false);
      this.ui.showHUD(true);
      this.mode = "play";
      this.audio.init();
      this.ui.showLevelBanner(this.info, this.boss);
      this.showIntroTip(this.tipForLevel(), 8000, 4900);
    } else {
      this.ui.showHUD(false);
      this.ui.showMenu(true);
      this.mode = "menu";
      this.ui.refreshMenu(this.save, this.info);
    }
    this._switching = false;
  }

  tipForLevel() {
    if (this.info.boss) return "The alpha will not run <span>·</span> Paw to push it back <span>·</span> Bite when it lunges";
    if (this.info.level <= 3) return "Push the stick to run <span>·</span> BITE to hunt <span>·</span> Eat or your life drains";
    if (this.info.phaseKey === "night" || this.info.phaseKey === "deepnight") return "Night eyes are watching <span>·</span> Keep moving <span>·</span> Follow the golden dots on your map";
    return "Stay fed <span>·</span> Every meal raises your life <span>·</span> Clear the trail";
  }

  showIntroTip(text, duration, delay) {
    clearTimeout(this._tipDelay);
    this.ui.hideTip();
    this._tipDelay = setTimeout(() => {
      if (this.mode === "play" && !this.levelDone && !this.player.dead) this.ui.showTip(text, duration);
    }, delay);
  }

  nextLevel() {
    this.ui.hideAllPanels();
    if (this.level >= MAX_LEVEL) { this.openLevels(); return; }
    this.startLevel(this.level + 1);
  }

  replayLevel() {
    this.ui.hideAllPanels();
    this.startLevel(this.level);
  }

  openLevels() {
    this.panelSource = this.mode === "paused" ? "pause" : this.mode === "play" ? "play" : "menu";
    if (this.mode === "play") this.mode = "paused";
    this.ui.setupLevelSelect(this.save, this.level, Math.floor((this.level - 1) / LEVELS_PER_CHAPTER) + 1, this.level);
    this.ui.openPanel("screen-levels");
    this.audio.click();
  }

  closeLevels() {
    this.ui.closePanel("screen-levels");
    this.restoreFromPanel();
  }

  openSettings() {
    this.panelSource = this.mode === "paused" ? "pause" : this.mode === "play" ? "play" : "menu";
    if (this.mode === "play") this.mode = "paused";
    this.ui.populateSettings(this.save.settings, this.audio.enabled);
    this.ui.openPanel("screen-settings");
    this.audio.click();
  }

  closeSettings() {
    this.ui.closePanel("screen-settings");
    if (this.panelSource === "pause") {
      this.ui.showPause(this.info, this.stats());
      this.mode = "paused";
      return;
    }
    this.restoreFromPanel();
  }

  restoreFromPanel() {
    if (this.panelSource === "play") {
      this.mode = "play";
      this.ui.hideAllPanels();
    } else if (this.panelSource === "pause") {
      this.mode = "paused";
      this.ui.showPause(this.info, this.stats());
    } else {
      this.mode = "menu";
      this.ui.hideAllPanels();
      this.ui.showMenu(true);
    }
  }

  changeChapter(delta) {
    const maxChapter = Math.ceil(MAX_LEVEL / LEVELS_PER_CHAPTER);
    let chapter = clamp(this.ui.chapter + delta, 1, maxChapter);
    const start = (chapter - 1) * LEVELS_PER_CHAPTER + 1;
    const end = Math.min(MAX_LEVEL, chapter * LEVELS_PER_CHAPTER);
    const selected = clamp(this.level, start, end);
    this.ui.setupLevelSelect(this.save, this.level, chapter, selected);
  }

  playSelectedLevel() {
    const n = this.ui.selectedLevel;
    if (n > this.save.unlocked) return;
    this.ui.hideAllPanels();
    this.startLevel(n);
  }

  togglePause(force) {
    if (this.mode === "menu" || this.mode === "complete" || this.mode === "dead" || this.mode === "boot") return;
    if (this.mode === "paused") {
      if (force === false || force === undefined) {
        this.mode = "play";
        this.ui.hideAllPanels();
      }
      return;
    }
    if (this.mode === "play") {
      this.mode = "paused";
      this.ui.showPause(this.info, this.stats());
      this.audio.click();
    }
  }

  stats() {
    return {
      feasts: this.counts.prey,
      beasts: this.counts.beasts,
      life: this.player.hp,
      time: this.formatTime(this.levelElapsed),
    };
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  quitToMenu() {
    this.ui.hideAllPanels();
    this.ui.showHUD(false);
    this.mode = "menu";
    this.startLevel(this.save.unlocked, "menu");
  }

  toggleSound() {
    this.audio.init();
    this.audio.setEnabled(!this.audio.enabled);
    this.save.settings.sound = this.audio.enabled;
    this.persist();
    this.ui.setSoundIcon();
    this.ui.populateSettings(this.save.settings, this.audio.enabled);
    this.ui.toast(this.audio.enabled ? "Sound on" : "Sound off");
  }

  async toggleTilt() {
    if (this._tiltBusy) return;
    if (this.input.tiltEnabled) {
      this.input.disableTilt();
      this.setTiltSetting(false, "Off");
      this.ui.toast("Tilt steering off");
      return;
    }
    this._tiltBusy = true;
    this.ui.setTiltStatus("Requesting motion access…");
    const result = await this.input.requestTilt();
    if (result.ok) {
      this.ui.setTiltStatus("Listening for motion…");
      await new Promise(r => setTimeout(r, 900));
      if (!this.input.tilt.samples) {
        this.input.disableTilt();
        this._tiltBusy = false;
        this.setTiltSetting(false, "No motion sensor found");
        this.ui.toast("This device did not report a motion sensor", "warn");
        return;
      }
      this.setTiltSetting(true, "On · tilt to steer");
      this.ui.toast("Tilt steering on <strong>·</strong> hold level and lean");
    } else {
      this.setTiltSetting(false, result.reason || "Unavailable");
      this.ui.toast(result.reason || "Motion access is not available", "warn");
    }
    this._tiltBusy = false;
  }

  setTiltSetting(on, status) {
    this.save.settings.tilt = on;
    this.persist();
    const toggle = document.getElementById("toggle-tilt");
    if (toggle) { toggle.classList.toggle("on", on); toggle.setAttribute("aria-checked", String(on)); }
    this.ui.setTiltStatus(status);
  }

  setSensitivity(value) {
    this.save.settings.sensitivity = clamp(value, 0.6, 1.6);
    this.persist();
  }

  setQuality(q) {
    this.save.settings.quality = q;
    this.quality = this.softwareRenderer ? "low" : this.resolveQuality(q);
    this.renderer.shadowMap.enabled = !this.softwareRenderer && this.quality !== "low";
    if (this.world?.sunLight) this.world.sunLight.castShadow = this.renderer.shadowMap.enabled;
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.setPixelRatio(this.pixelRatioFor(this.quality));
    this.resize();
    this.persist();
    this.ui.populateSettings(this.save.settings, this.audio.enabled);
    this.ui.toast(this.softwareRenderer ? "Software graphics detected · Lite" : `Graphics: ${q === "auto" ? "Auto" : q === "high" ? "High" : "Lite"}`);
  }

  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
      this.ui.toast("Fullscreen toggled");
    } catch {
      this.ui.toast("Fullscreen is not available on this device", "warn");
    }
  }

  resetProgress() {
    if (!this.resetArmed) {
      this.resetArmed = true;
      this.ui.toast("Tap <strong>Reset progress</strong> again to erase all trails", "warn");
      setTimeout(() => { this.resetArmed = false; }, 4000);
      return;
    }
    this.resetArmed = false;
    clearSave();
    this.save = defaultSave();
    this.save.settings.sound = this.audio.enabled;
    this.persist();
    this.ui.hideAllPanels();
    this.startLevel(1, "menu");
    this.ui.toast("Every trail has been erased");
  }

  canControl() {
    return this.mode === "play" && !this.levelDone && !this.player.dead;
  }

  doAction(action) {
    if (!this.canControl()) return;
    if (action === "bite") this.doBite();
    else if (action === "paw") this.doPaw();
    else if (action === "pounce") this.doPounce();
  }

  acquireTarget(maxDist = 7) {
    const p = this.player.position;
    const fx = Math.sin(this.player.heading), fz = Math.cos(this.player.heading);
    let best = null, bestScore = Infinity;
    for (const c of this.creatures) {
      if (c.dead) continue;
      const dx = c.root.position.x - p.x, dz = c.root.position.z - p.z;
      const d = Math.hypot(dx, dz);
      if (d > maxDist) continue;
      const dot = (dx * fx + dz * fz) / Math.max(0.001, d);
      if (dot < 0.12) continue;
      let score = d - dot * 1.4;
      if (c === this.target) score -= 1.2;
      if (c.spec.prey) score -= 0.5;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best;
  }

  doBite() {
    const cd = this.cooldowns.bite;
    if (cd.remaining > 0) return;
    cd.remaining = cd.cooldown;
    this.pup.bite();
    this.audio.bite();
    this.ui.flashAbility("btn-bite");
    const target = this.acquireTarget(8.2);
    if (!target) return;
    const dx = target.root.position.x - this.player.position.x;
    const dz = target.root.position.z - this.player.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist > 4.4) return;
    const dot = (dx * Math.sin(this.player.heading) + dz * Math.cos(this.player.heading)) / Math.max(0.001, dist);
    if (dot < -0.1) return;
    this.player.heading = dampAngle(this.player.heading, Math.atan2(dx, dz), 20, 0.05);
    const dmg = 23 + clamp((this.player.maxLife - 100) * 0.16, 0, 20) + this.level * 0.035;
    target.hit(dmg, this.player.position, 2.2);
    this.hitFeedback(target, dmg);
    this.shake = Math.max(this.shake, 0.16);
    if (!target.dead) this.ui.hitmark();
  }

  doPaw() {
    const cd = this.cooldowns.paw;
    if (cd.remaining > 0) return;
    cd.remaining = cd.cooldown;
    this.pup.paw();
    this.audio.claw();
    this.ui.flashAbility("btn-paw");
    const fx = Math.sin(this.player.heading), fz = Math.cos(this.player.heading);
    let hits = 0;
    for (const c of this.creatures) {
      if (c.dead) continue;
      const dx = c.root.position.x - this.player.position.x;
      const dz = c.root.position.z - this.player.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 4.2 + c.radius) continue;
      const dot = (dx * fx + dz * fz) / Math.max(0.001, d);
      if (dot < 0.1) continue;
      const dmg = 14 + clamp((this.player.maxLife - 100) * 0.1, 0, 12) + this.level * 0.02;
      c.hit(dmg, this.player.position, 5.2);
      this.hitFeedback(c, dmg, true);
      hits++;
    }
    const ringPos = this.player.position.clone().add(new THREE.Vector3(fx * 1.7, 0.1, fz * 1.7));
    this.effects.swipe(ringPos, this.player.heading);
    if (hits) { this.shake = Math.max(this.shake, 0.2); this.ui.hitmark(); }
  }

  doPounce() {
    const cd = this.cooldowns.pounce;
    if (cd.remaining > 0 || this.player.pounce) return;
    cd.remaining = cd.cooldown;
    this.player.pounce = { t: 0, dur: 0.66, hit: false };
    this.audio.pounce();
    this.ui.flashAbility("btn-pounce");
    this.effects.ring(this.player.position, 0x9fe8d8, 1.2, 0.4);
  }

  hitFeedback(c, dmg, paw = false) {
    const pos = c.root.position.clone();
    pos.y += c.spec.height * c.scaleValue * 0.65;
    this.effects.burst(pos, paw ? 0xa9e8dd : 0xffc178, paw ? 12 : 18, 4.5, 0.2, 0.55);
    this.effects.burst(pos, 0xfff2d1, 6, 2.2, 0.12, 0.32);
    this.ui.floatWorld(pos, this.camera, `-${Math.round(dmg)}`, paw ? "" : "damage");
    this.audio.chomp();
    if (c.dead && !c.spec.prey && c.boss) this.ui.whiteFlash();
  }

  onCreatureAttack(c) {
    if (!this.canControl()) return;
    this.damagePlayer(c.damage, c);
  }

  damagePlayer(amount, source) {
    if (this.player.dead || this.levelDone) return;
    this.player.hp -= amount;
    this.pup.hurt();
    this.audio.hurt();
    this.ui.damageFlash(amount / 18);
    this.shake = Math.max(this.shake, 0.36);
    const pos = this.player.position.clone();
    pos.y += 1.2;
    this.effects.burst(pos, 0xe36358, 14, 3.2, 0.18, 0.5);
    this.ui.floatWorld(pos, this.camera, `-${Math.round(amount)}`, "damage");
    if (this.player.hp <= 0) {
      this.player.hp = 0;
      this.die(source?.name || source?.spec?.name || "the wild");
    }
  }

  onCreatureDeath(c) {
    if (this.levelDone) return;
    const food = c.spec.food + Math.floor(this.level / 25) * 2;
    const hunger = c.spec.hunger;
    if (c.spec.prey) this.counts.prey += 1;
    else this.counts.beasts += 1;
    const gain = c.spec.prey ? 2 : 3;
    this.player.maxLife = Math.min(200, this.player.maxLife + gain);
    this.player.hp = Math.min(this.player.maxLife, this.player.hp + food);
    this.player.hunger = Math.min(100, this.player.hunger + hunger);
    this.save.totalFeasts = (this.save.totalFeasts || 0) + 1;
    this.save.vitality = clamp(Math.round(this.player.maxLife - 100), 0, 100);
    this.save.bestLife = Math.max(this.save.bestLife || 0, Math.round(this.player.hp));
    this.persist();
    this.pup.eat();
    this.audio.chomp();
    setTimeout(() => this.audio.gulp(), 150);
    this.ui.healFlash();
    const pos = c.root.position.clone();
    pos.y += c.spec.height * c.scaleValue + 0.2;
    this.ui.floatWorld(pos, this.camera, `+${food} LIFE`, "");
    const hpos = pos.clone(); hpos.y += 0.35;
    this.ui.floatWorld(hpos, this.camera, `+${hunger} HUNGER`, "gold");
    this.effects.burst(pos, 0x6fe3cf, 24, 4, 0.22, 0.9);
    this.effects.ring(c.root.position, 0x6fe3cf, 1.8, 0.55);
    this.shake = Math.max(this.shake, 0.08);
    if (c.boss) {
      this.ui.toast(`<strong>${c.name}</strong> falls. The forest exhales.`);
      this.ui.whiteFlash();
    }
    c.removeAt = this.time + 2.1;
    this.checkComplete();
  }

  checkComplete() {
    if (this.levelDone) return;
    if (this.counts.prey >= this.info.preyGoal && this.counts.beasts >= this.info.beastGoal) {
      this.completeLevel();
    }
  }

  completeLevel() {
    this.levelDone = true;
    this.mode = "complete";
    this.ui.hideTip();
    this.ui.whiteFlash();
    this.audio.levelComplete();
    if (!this.save.cleared.includes(this.level)) this.save.cleared.push(this.level);
    this.save.cleared.sort((a, b) => a - b);
    this.save.unlocked = Math.max(this.save.unlocked, Math.min(MAX_LEVEL, this.level + 1));
    this.save.vitality = clamp(Math.round(this.player.maxLife - 100), 0, 100);
    this.save.bestLife = Math.max(this.save.bestLife || 0, Math.round(this.player.hp));
    this.persist();
    this.ui.toast(`Trail <strong>${String(this.level).padStart(3, "0")}</strong> cleared`);
    const stats = this.stats();
    setTimeout(() => {
      if (this.mode !== "complete") return;
      this.ui.showComplete(this.info, stats);
      const label = this.ui.el["btn-next"]?.querySelector(".btn-label");
      if (label) label.textContent = this.level >= MAX_LEVEL ? "Back to the map" : "Next trail";
    }, 1050);
  }

  die(reason) {
    if (this.player.dead) return;
    this.player.dead = true;
    this.pup.dead = true;
    this.mode = "dead";
    this.ui.hideTip();
    this.audio.death();
    this.shake = 0.5;
    setTimeout(() => {
      if (this.mode !== "dead") return;
      this.ui.showDead(this.info, this.stats(), `The ${reason} took you before the trail was done. Eat sooner, and eat more.`);
    }, 1300);
  }

  persist() {
    saveGame(this.save);
  }

  updatePlayer(dt) {
    const p = this.player;
    const input = this.input;
    const sens = this.save.settings.sensitivity || 1;
    const sprint = input.sprint;
    this.cooldowns.bite.remaining = Math.max(0, this.cooldowns.bite.remaining - dt);
    this.cooldowns.paw.remaining = Math.max(0, this.cooldowns.paw.remaining - dt);
    this.cooldowns.pounce.remaining = Math.max(0, this.cooldowns.pounce.remaining - dt);

    if (p.dead) return;

    const pouncing = !!p.pounce;
    let turnRate = (2.4 + (sprint ? 0.35 : 0)) * sens;
    if (pouncing) turnRate *= 0.3;
    p.heading += input.steer * turnRate * dt;
    p.heading = ((p.heading + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;

    const maxSpeed = sprint ? 8.7 : 5.5;
    let targetSpeed = input.throttle > 0 ? input.throttle * maxSpeed : input.throttle * 3.0;
    if (pouncing) targetSpeed = 10.5;
    p.speed = damp(p.speed, targetSpeed, pouncing ? 18 : 9, dt);
    const forwardX = Math.sin(p.heading), forwardZ = Math.cos(p.heading);
    const step = p.speed * dt;
    if (Math.abs(p.speed) > 0.08) {
      p.position.x += forwardX * step;
      p.position.z += forwardZ * step;
    }

    let jumpY = 0;
    if (p.pounce) {
      p.pounce.t += dt / p.pounce.dur;
      const t = clamp(p.pounce.t, 0, 1);
      jumpY = Math.sin(t * Math.PI) * 1.15;
      if (!p.pounce.hit && t > 0.32) {
        p.pounce.hit = true;
        const hitPos = p.position.clone();
        let hit = false;
        for (const c of this.creatures) {
          if (c.dead) continue;
          const d = Math.hypot(c.root.position.x - p.position.x, c.root.position.z - p.position.z);
          if (d < 3.3 + c.radius) {
            const dmg = 21 + clamp((p.maxLife - 100) * 0.12, 0, 16) + this.level * 0.03;
            c.hit(dmg, p.position, 6.4);
            this.hitFeedback(c, dmg);
            hit = true;
          }
        }
        this.effects.ring(p.position, 0xbdf5e6, 2.7, 0.5);
        this.audio.claw();
        if (hit) { this.shake = Math.max(this.shake, 0.3); this.ui.hitmark(); }
      }
      if (p.pounce.t >= 1) p.pounce = null;
    }
    p.jump = jumpY;

    // collisions with trees / rocks
    for (const c of this.world.colliders) {
      const dx = p.position.x - c.x, dz = p.position.z - c.z;
      const d = Math.hypot(dx, dz);
      const min = c.r + 0.36;
      if (d < min && d > 0.001) {
        const push = (min - d);
        p.position.x += (dx / d) * push;
        p.position.z += (dz / d) * push;
      }
    }
    // keep inside the clearing ring
    const radius = Math.hypot(p.position.x, p.position.z);
    if (radius > 39.5) {
      p.position.x = (p.position.x / radius) * 39.5;
      p.position.z = (p.position.z / radius) * 39.5;
    }

    p.position.y = this.world.heightAt(p.position.x, p.position.z) + jumpY;
    p.moving = Math.abs(p.speed) > 0.4;
    this.pup.root.position.copy(p.position);
    this.pup.root.rotation.y = p.heading;

    // footprints + steps
    p.stepT += Math.abs(p.speed) * dt;
    if (p.stepT > 1.8 && p.moving) {
      p.stepT = 0;
      this.audio.footstep(sprint);
      if (Math.abs(p.speed) > 3) {
        const bx = p.position.x - forwardX * 0.4, bz = p.position.z - forwardZ * 0.4;
        this.effects.dust({ x: bx, y: this.world.heightAt(bx, bz), z: bz }, 0x9e8d6c, sprint ? 4 : 2);
      }
    }

    // hunger + starvation
    const drain = 0.62 + (sprint && p.moving ? 0.2 : 0) + (p.moving ? 0.15 : 0);
    p.hunger = Math.max(0, p.hunger - drain * dt * (0.9 + this.level * 0.0005));
    if (p.hunger <= 0) {
      p.hp -= dt * 5.4;
      if (p.hp <= 0) {
        p.hp = 0;
        this.die("hunger");
      }
    }
    if (p.hp > p.maxLife) p.hp = p.maxLife;

    this.levelElapsed += dt;
  }

  updateCamera(dt) {
    const p = this.player;
    if (this.rimLight) {
      this.rimLight.position.set(this.camera.position.x, this.camera.position.y + 1.6, this.camera.position.z);
      this.rimTarget.position.set(p.position.x, p.position.y + 0.9, p.position.z);
    }
    if (this.mode === "menu") {
      const t = this.time;
      const portrait = window.innerWidth < window.innerHeight;
      const a = (portrait ? 0.48 : 0.62) + Math.sin(t * 0.07) * 0.1;
      const dist = (portrait ? 7.15 : 6.1) + Math.sin(t * 0.11) * 0.18;
      const want = new THREE.Vector3(p.position.x + Math.sin(a) * dist, p.position.y + (portrait ? 2.5 : 2.6) + Math.sin(t * 0.18) * 0.08, p.position.z + Math.cos(a) * dist);
      const look = new THREE.Vector3(p.position.x + (portrait ? -0.62 : -0.7), p.position.y + (portrait ? 0.46 : 1.15), p.position.z - 0.2);
      this.camera.position.lerp(want, 1 - Math.exp(-dt * 2.4));
      this.camLook.lerp(look, 1 - Math.exp(-dt * 3.4));
      this.camera.lookAt(this.camLook);
      this.camera.fov = damp(this.camera.fov, portrait ? 40 : 43, 2, dt);
      this.camera.updateProjectionMatrix();
      return;
    }

    if (this.mode === "complete") {
      const t = this.time;
      const a = t * 0.35 + 0.8;
      const dist = 4.0;
      const want = new THREE.Vector3(p.position.x + Math.sin(a) * dist, p.position.y + 1.75, p.position.z + Math.cos(a) * dist);
      const look = new THREE.Vector3(p.position.x, p.position.y + 1.15, p.position.z);
      this.camera.position.lerp(want, 1 - Math.exp(-dt * 2.2));
      this.camLook.lerp(look, 1 - Math.exp(-dt * 4));
      this.camera.lookAt(this.camLook);
      this.camera.fov = damp(this.camera.fov, 48, 2, dt);
      this.camera.updateProjectionMatrix();
      return;
    }

    const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
    let dist = this.playerCameraDistance();
    if (this.mode === "dead") dist += 1.4;
    const height = this.mode === "dead" ? 1.8 : 2.75;
    const want = new THREE.Vector3(
      p.position.x - fx * dist,
      p.position.y + height,
      p.position.z - fz * dist
    );
    const groundY = this.world.heightAt(want.x, want.z);
    want.y = Math.max(want.y, groundY + 1.1);
    const look = new THREE.Vector3(
      p.position.x + fx * 2.5,
      p.position.y + (this.mode === "dead" ? 0.55 : 1.34 + p.jump * 0.3),
      p.position.z + fz * 2.5
    );
    const camLambda = this.mode === "dead" ? 2.2 : 4.6;
    this.camera.position.lerp(want, 1 - Math.exp(-dt * camLambda));
    this.camLook.lerp(look, 1 - Math.exp(-dt * (this.mode === "dead" ? 2.6 : 6)));
    const shake = this.shake;
    if (shake > 0.001) {
      this.camera.position.x += (Math.random() - 0.5) * shake * 0.3;
      this.camera.position.y += (Math.random() - 0.5) * shake * 0.22;
      this.camera.position.z += (Math.random() - 0.5) * shake * 0.3;
      this.camLook.x += (Math.random() - 0.5) * shake * 0.18;
      this.camLook.y += (Math.random() - 0.5) * shake * 0.18;
    }
    this.camera.lookAt(this.camLook);
    this.camera.fov = damp(this.camera.fov, this.playerFov(Math.abs(p.speed)), 3, dt);
    this.camera.updateProjectionMatrix();
    this.shake *= Math.exp(-dt * 7);
  }

  update(dt) {
    this.time += dt;
    this.world?.update(dt);
    if (this.mode === "paused" || this.mode === "boot") return;
    const inMenu = this.mode === "menu";
    const playerForAI = inMenu ? this.aiProxy : this.player;

    if (!inMenu && !this.levelDone) {
      this.input.update(dt);
      this.updatePlayer(dt);
    } else if (inMenu) {
      this.input.update(dt);
      this.pup.update(dt, this.time, { speed: 0, turn: 0 });
    }

    const canTarget = this.mode === "play" && !this.player.dead && !this.levelDone;
    if (canTarget) {
      const candidate = this.acquireTarget(8);
      if (candidate !== this.target) {
        if (this.target) this.target.targeted = false;
        this.target = candidate;
        if (this.target) this.target.targeted = true;
      }
    } else if (this.target) {
      this.target.targeted = false;
      this.target = null;
    }

    // creatures
    for (const c of this.creatures) {
      if (c.dead && c.removeAt && this.time > c.removeAt) continue;
      c.update(dt, this.time, playerForAI, this.camera);
    }
    // remove expired corpses
    for (let i = this.creatures.length - 1; i >= 0; i--) {
      const c = this.creatures[i];
      if (c.dead && c.removeAt && this.time > c.removeAt) {
        if (this.target === c) this.target = null;
        if (this.boss === c) this.boss = null;
        c.dispose();
        this.creatures.splice(i, 1);
        this.world.creatures = this.creatures;
      }
    }

    if (!inMenu && !this.levelDone && !this.player.dead) {
      this.pup.update(dt, this.time, {
        speed: this.player.speed,
        turn: this.input.steer,
        jumpY: 0,
        jumping: !!this.player.pounce,
      });
    } else {
      this.pup.update(dt, this.time, { speed: 0, turn: 0, jumping: false });
    }

    if (this.targetRing) {
      if (this.target && !this.target.dead) {
        this.targetRing.visible = true;
        this.targetRing.position.set(this.target.root.position.x, this.target.root.position.y + 0.035, this.target.root.position.z);
        const pulse = 1 + Math.sin(this.time * 5) * 0.06;
        this.targetRing.scale.setScalar(pulse * (this.target.boss ? 1.8 : 1));
        this.targetRing.material.color.setHex(this.target.boss ? 0xe36358 : 0xf0b45f);
      } else {
        this.targetRing.visible = false;
      }
    }

    if (this.target) {
      this.target.updateBar(this.camera);
      this.ui.setTarget(this.target, this.camera);
    } else {
      this.ui.setTarget(null, this.camera);
    }
    if (this.boss && this.boss.dead) this.ui.el["boss-wrap"].hidden = true;

    this.effects.update(dt);

    if (this.mode === "play" && !this.levelDone && !this.player.dead) {
      this.ui.updateCooldowns(this.cooldowns.bite, this.cooldowns.paw, this.cooldowns.pounce);
      if (this.time - this._lastHud > 0.09) {
        this._lastHud = this.time;
        this.ui.updateHud({
          player: this.player,
          level: this.info,
          counts: this.counts,
          boss: this.boss && !this.boss.dead ? this.boss : null,
          time: this.world.time,
          world: this.world,
          creatures: this.creatures,
        });
      }
    } else if (!inMenu && !this.levelDone) {
      if (this.time - this._lastHud > 0.25) {
        this._lastHud = this.time;
        this.ui.updateHud({
          player: this.player,
          level: this.info,
          counts: this.counts,
          boss: this.boss && !this.boss.dead ? this.boss : null,
          time: this.world.time,
          world: this.world,
          creatures: this.creatures,
        });
      }
    }

    if (!inMenu) this.ui.setLevelChrome(this.info);
    this.audio.setNight(isNightTime(this.world.time));
    this.updateCamera(dt);
  }

  _loop(now) {
    const dt = Math.min(0.05, Math.max(0.0001, (now - this.clock) / 1000));
    this.clock = now;
    if (this.mode !== "paused" && this.mode !== "boot") this.update(dt);
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (err) {
      console.error(err);
    }
    requestAnimationFrame(this._loop);
  }

  bindResize() {
    let timer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.resize(), 100);
    });
    window.addEventListener("orientationchange", () => setTimeout(() => this.resize(), 180));
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.pixelRatioFor(this.quality));
  }

  bindVisibility() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.mode === "play") this.togglePause(true);
    });
    window.addEventListener("blur", () => {
      if (this.mode === "play") this.togglePause(true);
    });
  }
}
