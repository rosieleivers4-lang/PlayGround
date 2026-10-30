import * as THREE from 'three';
import { RULES, CAMERA, PLAYER_START, TOWNS } from './config.js';
import { createVehicle, pickVehicleType } from './vehicles.js';
import { clamp, damp, lerp, makeRng, shortestAngle } from './utils.js';

const MPH = 2.23694;

function disposeObject(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose?.();
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of mats) {
        for (const key of Object.keys(m)) {
          const v = m[key];
          if (v && v.isTexture) v.dispose?.();
        }
        m.dispose?.();
      }
    }
  });
}

export class Game {
  constructor({ scene, camera, renderer, world, rider, carrots, ui, input, audio, sun }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.world = world;
    this.rider = rider;
    this.carrots = carrots;
    this.ui = ui;
    this.input = input;
    this.audio = audio;
    this.sun = sun;
    this.rng = makeRng(77123);
    this.state = 'menu';
    this.time = 0;
    this.totalTime = 0;
    this.graphicsTime = 0;
    this.player = {
      x: 0,
      z: 0,
      yaw: 0,
      speed: 0,
      life: RULES.startLife,
      fuel: RULES.startFuel,
      carrots: 0,
      collected: 0,
      distance: 0,
      topSpeed: 0,
      wanted: 0,
      heat: 0,
      overLimit: 0,
      calm: 0,
      invuln: 0,
      shake: 0,
      gear: 'N',
      offroad: false,
      limit: 30,
      roadRef: 'A52',
      speeding: false,
      limp: false,
    };
    this.cops = [];
    this.traffic = [];
    this.copSpawnCooldown = 0;
    this.copId = 0;
    this.cameraLook = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
    this.promptMode = null;
    this.stationNear = null;
    this.promptLock = 0;
    this.arrTimer = 0;
    this.limpHinted = false;
    this.fuelWarned = false;
    this.speedingToastAt = 0;
    this.respawnAllTrafficDone = false;
    try {
      if (localStorage.getItem('carrotRunnerSound') === '0') this.audio.muted = true;
    } catch {}
    this.best = this._loadBest();
    this.ui.setMenuBest(this.best);
    this.ui.setRefuelHandler(() => this.tryRefuel());
    this._buildTrafficAdjacency();
    this._spawnTraffic(46);
    this.reset(true);
    this._bindUI();
  }

  _bindUI() {
    document.getElementById('btnStart').addEventListener('click', () => this.start());
    document.getElementById('btnHelp').addEventListener('click', () => {
      this.audio.init();
      this.audio.click();
      this.ui.showScreen('help');
    });
    document.getElementById('btnHelpClose').addEventListener('click', () => {
      this.audio.click();
      this.ui.showScreen(this.state === 'menu' ? 'menu' : null);
      if (this.state !== 'menu') this.ui.hideScreens();
    });
    document.querySelectorAll('[data-close="help"]').forEach((b) =>
      b.addEventListener('click', () => {
        this.audio.click();
        if (this.state === 'menu') this.ui.showScreen('menu');
        else this.ui.hideScreens();
      })
    );
    document.getElementById('btnPause').addEventListener('click', () => this.pause());
    document.getElementById('btnResume').addEventListener('click', () => this.resume());
    document.getElementById('btnRestartPause').addEventListener('click', () => this.restart());
    document.getElementById('btnQuit').addEventListener('click', () => this.toMenu());
    document.getElementById('btnRestart').addEventListener('click', () => this.restart());
    document.getElementById('btnMenu').addEventListener('click', () => this.toMenu());
    document.getElementById('tiltToggle').addEventListener('click', () => this._toggleTilt('tiltToggle'));
    document.getElementById('tiltTogglePause').addEventListener('click', () => this._toggleTilt('tiltTogglePause'));
    document.getElementById('soundToggle').addEventListener('click', () => this._toggleSound());
    document.getElementById('soundTogglePause').addEventListener('click', () => this._toggleSound());
    this.ui.setSound(!this.audio.muted);
    this.ui.showTouch(this._isTouchDevice());
    window.addEventListener('resize', () => this.ui.showTouch(this._isTouchDevice()));
  }

  _isTouchDevice() {
    return (
      (navigator.maxTouchPoints || 0) > 0 ||
      'ontouchstart' in window ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }

  async _toggleTilt(sourceBtn) {
    this.audio.init();
    this.audio.click();
    if (this.input.tiltEnabled) {
      this.input.disableTilt();
      this.ui.setTilt(false, 'tilt off');
      this.ui.toast('TILT STEERING OFF', 'small');
      return;
    }
    const result = await this.input.enableTilt();
    if (result.ok) {
      this.ui.setTilt(true, 'tilt on · hold level');
      this.ui.toast('TILT ON — HOLD YOUR DEVICE LEVEL TO CALIBRATE', 'small');
    } else {
      this.ui.setTilt(false, 'tilt unavailable');
      this.ui.toast(result.reason || 'MOTION UNAVAILABLE', 'warn small');
    }
  }

  _toggleSound() {
    this.audio.init();
    this.audio.setMuted(!this.audio.muted);
    this.ui.setSound(!this.audio.muted);
    try {
      localStorage.setItem('carrotRunnerSound', this.audio.muted ? '0' : '1');
    } catch {}
  }

  _loadBest() {
    try {
      const raw = localStorage.getItem('carrotRunnerBest');
      if (raw) {
        const b = JSON.parse(raw);
        if (b && typeof b.carrots === 'number') return b;
      }
    } catch {}
    return { carrots: 0, distance: 0 };
  }

  _saveBest() {
    const p = this.player;
    const current = { carrots: p.collected, distance: p.distance };
    if (
      !this.best ||
      current.carrots > this.best.carrots ||
      (current.carrots === this.best.carrots && current.distance > this.best.distance)
    ) {
      this.best = current;
      try {
        localStorage.setItem('carrotRunnerBest', JSON.stringify(current));
      } catch {}
      this.ui.setMenuBest(this.best);
      return true;
    }
    return false;
  }

  _buildTrafficAdjacency() {
    this.adj = new Map();
    for (const road of this.world.roads) {
      if (road.minor) continue;
      for (const [node, dir] of [
        [road.a, 1],
        [road.b, -1],
      ]) {
        if (!this.adj.has(node)) this.adj.set(node, []);
        this.adj.get(node).push({ road, dir });
      }
    }
  }

  _laneOffset(road, dir) {
    // UK: drive on the left. Left of travel direction = (dz, -dx).
    const dx = road.dx * dir;
    const dz = road.dz * dir;
    return { x: dz * road.lane, z: -dx * road.lane };
  }

  _roadPose(road, t, dir) {
    const off = this._laneOffset(road, dir);
    return {
      x: lerp(road.ax, road.bx, t) + off.x,
      z: lerp(road.az, road.bz, t) + off.z,
      tx: road.dx * dir,
      tz: road.dz * dir,
      yaw: Math.atan2(road.dx * dir, road.dz * dir),
    };
  }

  _spawnTraffic(count) {
    for (let i = 0; i < count; i++) {
      const type = pickVehicleType(Math.random);
      const color = type === 'bus' ? 0x6a3f8f : null;
      const group = createVehicle(type, color);
      this.scene.add(group);
      const car = {
        group,
        road: null,
        dir: 1,
        t: 0,
        speed: 0,
        target: 0,
        factor: 0.7 + this.rng.next() * 0.25,
        hitCooldown: 0,
      };
      this._placeRandomCar(car, true);
      this.traffic.push(car);
    }
  }

  _placeRandomCar(car, initial = false) {
    const roads = this.world.roads.filter((r) => !r.minor);
    for (let tries = 0; tries < 40; tries++) {
      const road = roads[Math.floor(this.rng.next() * roads.length)];
      const dir = this.rng.next() < 0.5 ? 1 : -1;
      const t = 0.04 + this.rng.next() * 0.92;
      const pose = this._roadPose(road, t, dir);
      if (!initial && this._distance(pose.x, pose.z, this.player.x, this.player.z) < 45) continue;
      if (initial && this._distance(pose.x, pose.z, this.player.x, this.player.z) < 70) continue;
      car.road = road;
      car.dir = dir;
      car.t = t;
      car.speed = road.limit / MPH * car.factor;
      car.target = car.speed;
      car.group.position.set(pose.x, 0, pose.z);
      car.group.rotation.y = pose.yaw;
      return;
    }
    // fallback: first road
    const road = roads[0];
    car.road = road;
    car.dir = 1;
    car.t = 0.5;
    const pose = this._roadPose(road, 0.5, 1);
    car.group.position.set(pose.x, 0, pose.z);
    car.group.rotation.y = pose.yaw;
  }

  _nextTrafficRoad(car) {
    const endNode = car.dir === 1 ? car.road.b : car.road.a;
    const options = (this.adj.get(endNode) || []).filter((o) => o.road !== car.road);
    if (!options.length) {
      car.dir *= -1;
      car.t = 1 - car.t;
      return;
    }
    const pick = options[Math.floor(this.rng.next() * options.length)];
    car.road = pick.road;
    car.dir = pick.dir;
    car.t = pick.dir === 1 ? 0 : 1;
  }

  _distance(ax, az, bx, bz) {
    return Math.hypot(ax - bx, az - bz);
  }

  reset(initial = false) {
    this._clearCops();
    this.state = initial ? 'menu' : 'playing';
    this.time = 0;
    this.totalTime = 0;
    this.arrTimer = 0;
    this.copSpawnCooldown = 0;
    this.limpHinted = false;
    this.fuelWarned = false;
    this.promptMode = null;
    this.stationNear = null;
    this.ui.hidePrompt();
    this.ui.setWanted(0);
    this.ui.setBossHeat(0);
    this.ui.el.toasts.innerHTML = '';
    document.body.classList.remove('busted');

    const road = this.world.startRoad;
    let x = -420;
    let z = -60;
    let yaw = 0;
    if (road) {
      const forward = road.a === PLAYER_START.edge[0];
      const t = forward ? PLAYER_START.t : 1 - PLAYER_START.t;
      const dx = road.dx * (forward ? 1 : -1);
      const dz = road.dz * (forward ? 1 : -1);
      yaw = Math.atan2(dx, dz);
      const lx = Math.cos(yaw);
      const lz = -Math.sin(yaw);
      x = lerp(road.ax, road.bx, t) + lx * 3.0 * PLAYER_START.laneSide;
      z = lerp(road.az, road.bz, t) + lz * 3.0 * PLAYER_START.laneSide;
    }
    Object.assign(this.player, {
      x,
      z,
      yaw,
      speed: 0,
      life: RULES.startLife,
      fuel: RULES.startFuel,
      carrots: 0,
      collected: 0,
      distance: 0,
      topSpeed: 0,
      wanted: 0,
      heat: 0,
      overLimit: 0,
      calm: 0,
      invuln: 0,
      shake: 0,
      gear: 'N',
      offroad: false,
      limit: 30,
      roadRef: 'A52',
      speeding: false,
      limp: false,
    });

    this.world.stations.forEach((st) => {
      st.ring.material.opacity = 0.45;
      st.ring.scale.set(1, 1, 1);
    });

    this.rider.root.position.set(x, 0, z);
    this.rider.root.rotation.y = yaw;
    this.rider.update(0, 0, 0, 0, false, false);
    this.carrots.reset();

    // reset traffic to new positions
    for (const car of this.traffic) {
      car.hitCooldown = 0;
      this._placeRandomCar(car, false);
    }

    this._updateCamera(1 / 60, true);
    this.ui.setLife(this.player.life);
    this.ui.setFuel(this.player.fuel);
    this.ui.setCarrots(0);
    this.ui.setSpeed(0, 30, false, 'N', 'A52', false);
    this.ui.showHUD(this.state === 'playing');
    if (this.state === 'playing') {
      this.ui.hideScreens();
    } else {
      this.ui.showScreen('menu');
    }
  }

  start() {
    this.audio.init();
    this.audio.click();
    this.input.clear();
    this.reset(false);
    this.ui.showHUD(true);
    this.ui.hideScreens();
    this.ui.toast('KEEP TO THE SPEED LIMIT — THE TRAFFIC POLICE ARE WATCHING', 'gold');
    this.ui.setTilt(this.input.tiltEnabled, this.input.tiltEnabled ? 'tilt on' : 'tilt off');
    this.promptLock = 1.2;
    this.audio.alert();
  }

  restart() {
    this.audio.click();
    this.input.clear();
    this.reset(false);
    this.ui.showHUD(true);
    this.ui.hideScreens();
    this.ui.toast('FRESH TANK · FRESH START · KEEP IT LEGAL', 'gold');
    this.promptLock = 1.2;
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.clear();
    this.ui.showScreen('pause');
    this.ui.hidePrompt();
    this.audio.update(0, { active: false });
  }

  resume() {
    if (this.state !== 'paused') return;
    this.audio.init();
    this.audio.click();
    this.state = 'playing';
    this.ui.hideScreens();
    this.promptLock = 0.5;
  }

  toMenu() {
    this.audio.click();
    this.state = 'menu';
    this._clearCops();
    this.ui.showHUD(false);
    this.ui.hidePrompt();
    this.ui.showScreen('menu');
    this.ui.setMenuBest(this.best);
    this.input.clear();
    this.audio.update(0, { active: false });
    this.reset(true);
  }

  recoverBike() {
    if (this.state !== 'playing') return;
    const p = this.player;
    const q = this.world.queryRoad(p.x, p.z);
    if (!q.road) return;
    p.x = lerp(q.road.ax, q.road.bx, q.t);
    p.z = lerp(q.road.az, q.road.bz, q.t);
    p.yaw = Math.atan2(q.road.dx, q.road.dz);
    p.speed = 0;
    p.invuln = 2;
    p.shake = 0;
    this.rider.root.position.set(p.x, 0, p.z);
    this.rider.root.rotation.y = p.yaw;
    this.ui.toast('BIKE RECOVERED TO THE ROAD', 'small');
    this.audio.click();
  }

  hotkey(e) {
    const k = e.key.toLowerCase();
    if (k === 'p' || k === 'escape') {
      if (this.state === 'playing') this.pause();
      else if (this.state === 'paused') this.resume();
      else if (this.state === 'help') this.ui.hideScreens();
      return;
    }
    if (k === 'm') {
      this._toggleSound();
      return;
    }
    if (k === 'r' && this.state === 'playing') {
      this.recoverBike();
      return;
    }
    if (k === 'enter') {
      if (this.state === 'menu') this.start();
      else if (this.state === 'over') this.restart();
    }
  }

  _clearCops() {
    for (const cop of this.cops) {
      this.scene.remove(cop.group);
      disposeObject(cop.group);
    }
    this.cops = [];
  }

  _findCopSpawn() {
    const p = this.player;
    const fx = Math.sin(p.yaw);
    const fz = Math.cos(p.yaw);
    let best = null;
    let bestScore = -Infinity;
    const roads = this.world.roads.filter((r) => !r.minor);
    for (let i = 0; i < 90; i++) {
      const road = roads[Math.floor(this.rng.next() * roads.length)];
      const t = 0.03 + this.rng.next() * 0.94;
      const x = lerp(road.ax, road.bx, t);
      const z = lerp(road.az, road.bz, t);
      const d = this._distance(x, z, p.x, p.z);
      if (d < 75 || d > 190) continue;
      const dot = ((x - p.x) / d) * fx + ((z - p.z) / d) * fz;
      const score = (dot < 0 ? 1.8 : 0.3) + (1 - Math.abs(d - 125) / 100);
      if (score > bestScore) {
        bestScore = score;
        best = { x, z, yaw: Math.atan2(p.x - x, p.z - z) };
      }
    }
    if (best) return best;
    const behind = 110;
    return {
      x: p.x - fx * behind,
      z: p.z - fz * behind,
      yaw: p.yaw,
    };
  }

  _spawnCop() {
    const spawn = this._findCopSpawn();
    const group = createVehicle('car', 0xffffff, { police: true });
    group.position.set(spawn.x, 0, spawn.z);
    group.rotation.y = spawn.yaw;
    this.scene.add(group);
    const cop = {
      id: this.copId++,
      group,
      x: spawn.x,
      z: spawn.z,
      yaw: spawn.yaw,
      speed: 6,
      hitCooldown: 0,
      arrestTimer: 0,
      leaving: false,
      leavingTimer: 0,
      stuck: 0,
    };
    this.cops.push(cop);
    this.audio.alert();
    this.ui.toast('TRAFFIC POLICE ALERTED — SLOW DOWN TO LOSE THEM', 'warn');
    return cop;
  }

  _setWanted(level, announce = true) {
    const p = this.player;
    const old = p.wanted;
    level = clamp(level, 0, 3);
    if (level === old) return;
    p.wanted = level;
    this.ui.setWanted(level);
    if (level > old && announce) {
      const messages = {
        1: 'WANTED LEVEL 1 — TRAFFIC POLICE ALERTED',
        2: 'WANTED LEVEL 2 — PURSUIT ESCALATING',
        3: 'WANTED LEVEL 3 — INTERCEPTION TEAM OUT',
      };
      this.ui.toast(messages[level], 'warn');
      this.audio.alert();
    }
    if (level === 0 && old > 0) {
      this.ui.toast('YOU LOST THE TRAFFIC POLICE — WANTED CLEARED', 'gold');
      this.audio.tone(520, 0.14, 'triangle', 0.08);
      this.audio.tone(780, 0.2, 'triangle', 0.07, 0, 0.12);
      for (const cop of this.cops) {
        cop.leaving = true;
        cop.leavingTimer = 0;
      }
    }
  }

  tryRefuel() {
    if (this.state !== 'playing') return;
    const p = this.player;
    const st = this.stationNear;
    if (this.promptMode === 'station' && st) {
      if (p.speed > 3.2) {
        this.ui.toast('STOP THE BIKE TO REFUEL', 'warn small');
        this.audio.deny();
        return;
      }
      if (p.fuel >= 99.5) {
        this.ui.toast('TANK ALREADY FULL', 'small');
        this.audio.deny();
        return;
      }
      if (p.carrots < RULES.refuelMin) {
        this.ui.toast('NEED 3 GOLDEN CARROTS', 'warn small');
        this.audio.deny();
        return;
      }
      p.carrots -= RULES.refuelMin;
      p.fuel = Math.min(RULES.maxFuel, p.fuel + 45);
      this.audio.refuel();
      this.ui.setCarrots(p.carrots);
      this.ui.carrotGain('+45 PETROL');
      this.ui.toast(`${st.name}: 3 CARROTS → 45 LITRES`, 'gold');
      if (p.fuel > 22) this.fuelWarned = false;
      return;
    }
    if (this.promptMode === 'emergency') {
      if (p.carrots >= RULES.emergencyCarrots) {
        p.carrots -= RULES.emergencyCarrots;
        p.fuel = Math.min(RULES.maxFuel, p.fuel + RULES.emergencyFuel);
        this.audio.refuel();
        this.ui.setCarrots(p.carrots);
        this.ui.carrotGain(`+${RULES.emergencyFuel} PETROL`);
        this.ui.toast('EMERGENCY JERRYCAN · 5 CARROTS USED', 'gold');
      } else {
        this.ui.toast('NOT ENOUGH CARROTS FOR THE JERRYCAN — FIND A STATION', 'warn small');
        this.audio.deny();
      }
    }
  }

  _takeDamage(amount, reason, style = '') {
    const p = this.player;
    if (this.state !== 'playing') return;
    p.life = Math.max(0, p.life - amount);
    p.shake = Math.min(1.2, p.shake + amount / 30);
    this.ui.setLife(p.life);
    this.audio.crash();
    if (reason) this.ui.toast(reason, style || 'warn');
    if (p.life <= 0.01) this._arrest();
  }

  _arrest() {
    if (this.state !== 'playing') return;
    this.state = 'arresting';
    this.arrTimer = 0;
    this.player.speed = 0;
    this.audio.arrest();
    this.ui.hidePrompt();
    this.ui.toast('PULLED OVER — LICENCE CHECK FAILED', 'warn');
    document.body.classList.add('busted');
    this.input.clear();
    this._saveBest();
  }

  _finishArrest() {
    this.state = 'over';
    this._saveBest();
    this.ui.showHUD(false);
    this.ui.showOver({
      busted: true,
      carrots: this.player.collected,
      distance: this.player.distance,
      topSpeed: this.player.topSpeed,
      time: this.totalTime,
      wanted: Math.max(1, this.player.wanted),
      best: this.best,
    });
  }

  _updatePlayer(dt) {
    const p = this.player;
    const inp = this.input;
    const roadInfo = this.world.queryRoad(p.x, p.z);
    p.offroad = !roadInfo.onRoad;
    p.limit = roadInfo.limit;
    p.roadRef = roadInfo.road ? roadInfo.road.ref || (roadInfo.town ? roadInfo.town.name : '') : '';
    const town = this.world.nearestTown(p.x, p.z);
    const district = town ? town.name.toUpperCase() : 'RURAL MIDLANDS';

    const throttle = inp.throttle && !inp.brake;
    const braking = inp.brake;
    const steer = inp.steer;

    if (p.fuel <= 0.001) {
      p.limp = true;
      if (!this.limpHinted) {
        this.limpHinted = true;
        this.ui.toast('RUNNING ON FUMES — LIMP TO A PETROL STATION', 'warn');
        this.audio.deny();
      }
    } else {
      p.limp = false;
    }

    const maxSpeed = p.limp ? 9 : p.offroad ? 16 : 45;
    if (throttle && !p.limp && p.fuel > 0.01) {
      p.speed += (p.offroad ? 5.5 : 8.6) * dt;
    }
    if (braking) {
      if (p.speed > 0.1) p.speed -= 20 * dt;
      else p.speed -= 3.2 * dt;
    }
    if (!throttle && !braking) {
      const drag = 0.42 + Math.abs(p.speed) * 0.055 + (p.offroad ? 1.2 : 0);
      if (p.speed > 0) p.speed = Math.max(0, p.speed - drag * dt);
      else if (p.speed < 0) p.speed = Math.min(0, p.speed + drag * dt);
    }
    if (p.offroad && Math.abs(p.speed) > maxSpeed) {
      p.speed = damp(p.speed, Math.sign(p.speed) * maxSpeed, 1.6, dt);
    }
    p.speed = clamp(p.speed, -4, Math.max(maxSpeed, 0) + 0.5);

    // fuel drain
    if (p.fuel > 0) {
      const burn = 0.035 + Math.abs(p.speed) * 0.0115 + (throttle ? 0.11 : 0);
      p.fuel = Math.max(0, p.fuel - burn * dt);
      if (p.fuel < 22 && !this.fuelWarned) {
        this.fuelWarned = true;
        this.ui.toast('LOW PETROL — FIND A CARROT FUEL STATION', 'warn');
        this.audio.deny();
      }
      if (p.fuel > 30) this.fuelWarned = false;
    }

    if (Math.abs(p.speed) > 0.45) {
      const dirSign = p.speed >= 0 ? 1 : -1;
      const turnRate = lerp(1.5, 0.72, clamp(Math.abs(p.speed) / 35, 0, 1));
      p.yaw += steer * turnRate * dt * dirSign * clamp(Math.abs(p.speed) / 4, 0, 1);
    }

    const fwdX = Math.sin(p.yaw);
    const fwdZ = Math.cos(p.yaw);
    const oldX = p.x;
    const oldZ = p.z;
    p.x += fwdX * p.speed * dt;
    p.z += fwdZ * p.speed * dt;

    // world bounds
    const margin = 18;
    if (p.x < -1720 + margin || p.x > 1720 - margin || p.z < -1380 + margin || p.z > 1380 - margin) {
      p.x = clamp(p.x, -1720 + margin, 1720 - margin);
      p.z = clamp(p.z, -1380 + margin, 1380 - margin);
      if (Math.abs(p.speed) > 2) {
        p.shake = Math.min(1, p.shake + 0.25);
        p.speed *= -0.15;
      }
    }

    // collisions with buildings, pumps, shops, landmarks
    const hit = this.world.resolveCollision(p.x, p.z, 0.95);
    if (hit) {
      const impact = Math.abs(p.speed);
      p.x += hit.nx * (hit.depth + 0.05);
      p.z += hit.nz * (hit.depth + 0.05);
      p.speed *= -0.18;
      if (impact > 5.5 && p.invuln <= 0) {
        p.invuln = 1.1;
        const dmg = Math.min(26, 5 + impact * 0.7);
        this._takeDamage(dmg, 'BUILDING COLLISION — WATCH THE ROAD', 'warn');
        this.audio.crash();
      }
    }

    const dtDistance = Math.hypot(p.x - oldX, p.z - oldZ);
    p.distance += dtDistance;
    const mph = Math.abs(p.speed) * MPH;
    p.topSpeed = Math.max(p.topSpeed, mph);
    p.gear = p.speed < -0.2 ? 'R' : p.speed < 0.5 ? 'N' : p.speed < 11 ? '1' : p.speed < 19 ? '2' : p.speed < 27 ? '3' : p.speed < 35 ? '4' : '5';

    // ------- speed limit / wanted -------
    p.speeding = roadInfo.onRoad && mph > p.limit + RULES.speedingGrace;
    if (p.speeding) {
      p.overLimit += dt;
      p.calm = 0;
      const excess = Math.max(0, mph - p.limit);
      p.heat += dt * (11 + excess * 1.25);
      if (p.heat > 100) p.heat = 100;
      if (p.overLimit > RULES.speedingAlarm) {
        const level = p.heat > 80 ? 3 : p.heat > 44 ? 2 : 1;
        if (level > p.wanted) this._setWanted(level);
        if (p.wanted === 0) this._setWanted(1);
      }
      if (this.time - this.speedingToastAt > 11 && p.wanted > 0) {
        this.speedingToastAt = this.time;
        this.ui.toast('YOU ARE OVER THE LIMIT — EASE OFF THE THROTTLE', 'warn small');
      }
    } else {
      p.overLimit = Math.max(0, p.overLimit - dt * 1.8);
      p.calm += dt;
      if (p.wanted > 0) {
        p.heat = Math.max(0, p.heat - dt * (9 + (p.calm > 2 ? 3 : 0)));
        if (p.heat < 26 && p.wanted >= 3) this._setWanted(2);
        if (p.heat < 14 && p.wanted >= 2) this._setWanted(1);
        if (p.heat < 6 && p.wanted === 1) this._setWanted(0);
      } else {
        p.heat = Math.max(0, p.heat - dt * 18);
      }
    }
    this.ui.setBossHeat(p.heat / 100);

    // cops maintain wanted count
    const activeCops = this.cops.filter((c) => !c.leaving);
    if (p.wanted > 0) {
      if (activeCops.length < p.wanted && this.copSpawnCooldown <= 0) {
        this._spawnCop();
        this.copSpawnCooldown = 1.6;
      }
    } else {
      this.copSpawnCooldown = 0;
    }

    // ------- carrots -------
    const got = this.carrots.collect(p.x, p.z, 3.1);
    if (got.count > 0) {
      p.carrots += got.count;
      p.collected += got.count;
      p.life = Math.min(RULES.maxLife, p.life + RULES.carrotLife * got.count);
      this.ui.setCarrots(p.carrots);
      this.ui.setLife(p.life);
      this.ui.carrotGain(`+${RULES.carrotLife * got.count} LIFE`);
      this.audio.pickup();
      if (p.collected === 1) this.ui.toast('GOLDEN CARROT · +4 LIFE · TRADE 3 FOR PETROL', 'gold small');
    }

    // ------- station interaction -------
    this._updateStationPrompt(dt);

    // ------- speed HUD -------
    const roadName = p.offroad ? 'OFF ROAD' : p.roadRef || district;
    this.ui.setSpeed(mph, p.limit, p.speeding, p.gear, roadName, p.offroad);
    this.ui.setDistrict(district, this._nearestStationDistance());

    // ------- engine audio -------
    this.audio.update(dt, {
      speed: Math.abs(p.speed),
      throttle: throttle ? 1 : 0,
      braking,
      wanted: p.wanted,
      active: true,
    });
    if (Math.abs(p.speed) > 4 && Math.random() < dt * 8) this.audio.engineTick(Math.abs(p.speed));

    // ------- rider visuals -------
    this.rider.root.position.set(p.x, 0, p.z);
    this.rider.root.rotation.y = p.yaw;
    this.rider.update(dt, this.time, Math.abs(p.speed), steer, braking, throttle);

    // ------- sun shadow follows player -------
    if (this.sun) {
      this.sun.position.set(p.x + 150, 220, p.z + 110);
      this.sun.target.position.set(p.x, 0, p.z);
      this.sun.target.updateMatrixWorld();
    }
  }

  _nearestStationDistance() {
    let best = Infinity;
    for (const st of this.world.stations) {
      const d = this._distance(this.player.x, this.player.z, st.x, st.z);
      if (d < best) best = d;
    }
    return best;
  }

  _updateStationPrompt(dt) {
    const p = this.player;
    let nearest = null;
    let bestD = Infinity;
    for (const st of this.world.stations) {
      const d = this._distance(p.x, p.z, st.x, st.z);
      if (d < bestD) {
        bestD = d;
        nearest = st;
      }
      st.ring.material.opacity = 0.35 + Math.sin(this.time * 2.5 + st.x) * 0.12;
      const scale = 1 + Math.sin(this.time * 2.5 + st.x) * 0.025;
      st.ring.scale.set(scale, scale, 1);
    }
    this.stationNear = bestD < 17 ? nearest : null;

    if (this.promptLock > 0) {
      this.promptLock -= dt;
      return;
    }

    if (this.stationNear) {
      const st = this.stationNear;
      if (p.speed > 3.2) {
        this.promptMode = 'station';
        this.ui.showPrompt({
          title: st.name,
          text: 'Stop the bike to trade golden carrots for petrol',
          button: 'SLOW DOWN',
          disabled: true,
        });
        return;
      }
      if (p.fuel >= 99.5) {
        this.promptMode = 'station';
        this.ui.showPrompt({
          title: st.name,
          text: 'Tank full — save your golden carrots',
          button: 'TANK FULL',
          disabled: true,
        });
        return;
      }
      if (p.carrots < RULES.refuelMin) {
        this.promptMode = 'station';
        this.ui.showPrompt({
          title: st.name,
          text: `Collect ${RULES.refuelMin - p.carrots} more golden carrot${RULES.refuelMin - p.carrots === 1 ? '' : 's'} to trade`,
          button: `NEED ${RULES.refuelMin} CARROTS`,
          disabled: true,
        });
        return;
      }
      this.promptMode = 'station';
      this.ui.showPrompt({
        title: st.name,
        text: `3 golden carrots → 45 litres · tank ${Math.round(p.fuel)}%`,
        button: 'TRADE 3 🥕',
        disabled: false,
      });
      return;
    }

    if (p.limp && Math.abs(p.speed) < 2) {
      this.promptMode = 'emergency';
      const can = p.carrots >= RULES.emergencyCarrots;
      this.ui.showPrompt({
        title: 'EMERGENCY JERRYCAN',
        text: can
          ? `5 golden carrots → ${RULES.emergencyFuel} litres. Expensive, but it gets you moving.`
          : 'Find a CARROT FUEL station. Collect carrots as you limp along.',
        button: can ? 'TRADE 5 🥕' : 'NO CARROTS',
        disabled: !can,
      });
      return;
    }

    this.promptMode = null;
    this.ui.hidePrompt();
  }

  _updateTraffic(dt) {
    const p = this.player;
    const canCollide = this.state === 'playing' && p.invuln <= 0;
    for (const car of this.traffic) {
      if (!car.road) continue;
      car.hitCooldown = Math.max(0, car.hitCooldown - dt);

      // distance to other traffic ahead on the same road, to keep a gap
      let gapSlow = false;
      for (const other of this.traffic) {
        if (other === car || other.road !== car.road || other.dir !== car.dir) continue;
        const diff = (other.t - car.t) * car.dir * car.road.length;
        if (diff > 0 && diff < 14) {
          gapSlow = true;
          break;
        }
      }

      const currentPose = this._roadPose(car.road, car.t, car.dir);
      const limit = this.world.effectiveLimit(car.road, currentPose.x, currentPose.z);
      const desired = (limit / MPH) * car.factor * (gapSlow ? 0.25 : 1);
      car.target = desired;
      car.speed = damp(car.speed, car.target, 1.2, dt);
      const move = (car.speed * dt) / car.road.length;
      car.t += move * car.dir;
      if (car.t > 1.001 || car.t < -0.001) {
        this._nextTrafficRoad(car);
        if (!car.road) continue;
      }
      const pose = this._roadPose(car.road, clamp(car.t, 0, 1), car.dir);
      car.group.position.set(pose.x, 0, pose.z);
      car.group.rotation.y = pose.yaw;

      if (canCollide && car.hitCooldown <= 0) {
        const d = this._distance(pose.x, pose.z, p.x, p.z);
        if (d < 2.9) {
          car.hitCooldown = 1.4;
          p.invuln = 1.0;
          p.speed *= 0.22;
          const dmg = Math.min(24, 7 + Math.abs(p.speed) * 0.45 + 3);
          this._takeDamage(dmg, 'TRAFFIC COLLISION — KEEP YOUR DISTANCE', 'warn');
          p.shake = Math.min(1, p.shake + 0.5);
          this.audio.noiseBurst(0.32, 0.18, 1200);
          const away = Math.atan2(p.x - pose.x, p.z - pose.z);
          p.x += Math.sin(away) * 1.4;
          p.z += Math.cos(away) * 1.4;
        }
      }
    }
  }

  _updateCops(dt) {
    const p = this.player;
    if (this.state !== 'playing' && this.state !== 'arresting') {
      this._updateCopLights(dt);
      return;
    }
    for (const cop of this.cops) {
      cop.hitCooldown = Math.max(0, cop.hitCooldown - dt);
      cop.leavingTimer += dt;
      if (cop.leaving) {
        // leave the area
        cop.speed = damp(cop.speed, 17, 1.5, dt);
        const to = Math.atan2(cop.x - p.x, cop.z - p.z);
        cop.yaw += shortestAngle(cop.yaw, to) * dt * 1.4;
        cop.x += Math.sin(cop.yaw) * cop.speed * dt;
        cop.z += Math.cos(cop.yaw) * cop.speed * dt;
        cop.group.position.set(cop.x, 0, cop.z);
        cop.group.rotation.y = cop.yaw;
        if (cop.leavingTimer > 5.5) {
          this.scene.remove(cop.group);
          disposeObject(cop.group);
          cop.remove = true;
        }
        continue;
      }

      const dx = p.x - cop.x;
      const dz = p.z - cop.z;
      const dist = Math.hypot(dx, dz) || 1;
      const targetYaw = Math.atan2(dx, dz);
      const turn = clamp(shortestAngle(cop.yaw, targetYaw), -1, 1);
      cop.yaw += turn * 1.9 * dt;

      let targetSpeed = 24 + p.wanted * 4;
      if (dist < 25) targetSpeed = Math.max(10, Math.abs(p.speed) + 5);
      if (dist > 180) targetSpeed = 38;
      if (this.state === 'arresting') targetSpeed = 0;
      cop.speed = damp(cop.speed, targetSpeed, 1.5, dt);
      cop.x += Math.sin(cop.yaw) * cop.speed * dt;
      cop.z += Math.cos(cop.yaw) * cop.speed * dt;
      cop.group.position.set(cop.x, 0, cop.z);
      cop.group.rotation.y = cop.yaw;
      cop.group.userData.lights && this._flashCop(cop, dist);

      // if left far behind, respawn closer behind the player
      if (dist > 320 && this.state === 'playing') {
        cop.stuck += dt;
        if (cop.stuck > 3) {
          cop.stuck = 0;
          const spawn = this._findCopSpawn();
          cop.x = spawn.x;
          cop.z = spawn.z;
          cop.yaw = spawn.yaw;
          cop.speed = 8;
        }
      } else {
        cop.stuck = 0;
      }

      if (this.state === 'arresting') continue;

      // contact damage and carrot theft
      if (dist < 4.4 && cop.hitCooldown <= 0) {
        cop.hitCooldown = 2.4;
        p.invuln = Math.max(p.invuln, 0.9);
        const stolen = Math.min(2, p.carrots);
        p.carrots -= stolen;
        this.ui.setCarrots(p.carrots);
        const dmg = 11 + Math.floor(this.rng.next() * 6);
        p.shake = Math.min(1.2, p.shake + 0.65);
        this.audio.policeHit();
        this._takeDamage(
          dmg,
          stolen > 0
            ? `POLICE HIT · −${dmg} LIFE · ${stolen} CARROT${stolen === 1 ? '' : 'S'} TAKEN`
            : `POLICE HIT · −${dmg} LIFE`,
          'warn'
        );
        p.speed *= 0.5;
        if (p.life > 0) p.heat = Math.min(100, p.heat + 8);
      }

      // stop while wanted = arrested
      if (Math.abs(p.speed) < 1.2 && dist < 14 && p.wanted > 0) {
        cop.arrestTimer += dt;
        if (cop.arrestTimer > 2.6) {
          this._arrest();
        }
      } else {
        cop.arrestTimer = Math.max(0, cop.arrestTimer - dt * 1.8);
      }

      // keep the siren near the player
      this.ui.setBossHeat(clamp(p.heat / 100 + (dist < 40 ? 0.1 : 0), 0, 1));
    }
    this._updateCopLights(dt);
    this.cops = this.cops.filter((c) => !c.remove);
    if (this.player.wanted === 0) {
      for (const cop of this.cops) cop.leaving = true;
    }
  }

  _flashCop(cop, dist) {
    const t = this.time;
    const phase = Math.floor(t * 5) % 2;
    const lights = cop.group.userData.lights;
    if (!lights) return;
    const near = clamp(1 - dist / 260, 0.25, 1);
    lights.red.emissiveIntensity = (phase === 0 ? 4 : 0.4) * near + 0.4;
    lights.blue.emissiveIntensity = (phase === 1 ? 4 : 0.4) * near + 0.4;
  }

  _updateCopLights(dt) {
    for (const cop of this.cops) {
      this._flashCop(cop, this._distance(cop.x, cop.z, this.player.x, this.player.z));
    }
  }

  _updateCamera(dt, snap = false) {
    const p = this.player;
    if (this.state === 'menu') {
      const a = this.time * 0.16 + 2.6;
      const radius = 6.4;
      const x = p.x + Math.sin(a) * radius;
      const z = p.z + Math.cos(a) * radius;
      this.cameraPos.set(x, 2.45 + Math.sin(this.time * 0.4) * 0.12, z);
      if (snap) this.camera.position.copy(this.cameraPos);
      else this.camera.position.lerp(this.cameraPos, 1 - Math.exp(-3.2 * dt));
      this.cameraLook.set(p.x, 1.18, p.z);
      this.camera.lookAt(this.cameraLook);
      this.camera.fov = damp(this.camera.fov, 52, 3, dt);
      this.camera.updateProjectionMatrix();
      return;
    }

    if (this.state === 'arresting' || this.state === 'over') {
      const a = this.time * 0.55 + 1.2;
      const r = 5.6;
      const x = p.x + Math.sin(a) * r;
      const z = p.z + Math.cos(a) * r;
      this.cameraPos.set(x, 2.6, z);
      if (snap) this.camera.position.copy(this.cameraPos);
      else this.camera.position.lerp(this.cameraPos, 1 - Math.exp(-3.5 * dt));
      this.cameraLook.set(p.x, 1.1, p.z);
      this.camera.lookAt(this.cameraLook);
      this.camera.fov = damp(this.camera.fov, 56, 3, dt);
      this.camera.updateProjectionMatrix();
      return;
    }

    const fwdX = Math.sin(p.yaw);
    const fwdZ = Math.cos(p.yaw);
    const speedF = clamp(Math.abs(p.speed) / 36, 0, 1);
    const dist = CAMERA.distance + speedF * 1.5;
    const height = CAMERA.height + speedF * 0.25;
    const desiredX = p.x - fwdX * dist;
    const desiredZ = p.z - fwdZ * dist;
    this.cameraPos.set(desiredX, height, desiredZ);
    if (snap) {
      this.camera.position.copy(this.cameraPos);
      this.cameraLook.set(p.x + fwdX * CAMERA.lookAhead, 1.15, p.z + fwdZ * CAMERA.lookAhead);
    } else {
      const k = 1 - Math.exp(-5.8 * dt);
      this.camera.position.lerp(this.cameraPos, k);
      const lookX = p.x + fwdX * CAMERA.lookAhead;
      const lookZ = p.z + fwdZ * CAMERA.lookAhead;
      this.cameraLook.x = damp(this.cameraLook.x, lookX, 7, dt);
      this.cameraLook.y = damp(this.cameraLook.y, 1.15, 7, dt);
      this.cameraLook.z = damp(this.cameraLook.z, lookZ, 7, dt);
    }

    if (p.shake > 0) {
      const s = p.shake * 0.22;
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s;
      p.shake = Math.max(0, p.shake - dt * 1.9);
    }
    this.camera.lookAt(this.cameraLook);
    const fovTarget = CAMERA.fov + speedF * CAMERA.speedFov;
    this.camera.fov = damp(this.camera.fov, fovTarget, 4, dt);
    this.camera.updateProjectionMatrix();
  }

  update(dt, elapsed) {
    if (dt > 0.05) dt = 0.05;
    this.time += dt;
    this.graphicsTime = elapsed;

    if (this.state !== 'paused') {
      this.carrots.update(dt, this.time);
      this._updateTraffic(dt);
    }

    if (this.state === 'playing') {
      this.totalTime += dt;
      this.player.invuln = Math.max(0, this.player.invuln - dt);
      this.copSpawnCooldown = Math.max(0, this.copSpawnCooldown - dt);
      this._updatePlayer(dt);
      this._updateCops(dt);
      this.ui.drawMinimap(this.world, this.player, this.cops, this.carrots, this.time);
    } else if (this.state === 'arresting') {
      this.arrTimer += dt;
      this._updateCops(dt);
      this.ui.drawMinimap(this.world, this.player, this.cops, this.carrots, this.time);
      this.audio.update(0, { active: false, wanted: this.player.wanted });
      if (this.arrTimer > 1.7) this._finishArrest();
    } else if (this.state === 'menu') {
      this.rider.update(dt, this.time, 0, 0, false, false);
      this.ui.drawMinimap(this.world, this.player, [], this.carrots, this.time);
      this.audio.update(0, { active: false });
    } else if (this.state === 'over') {
      this._updateCops(dt);
      this.audio.update(0, { active: false, wanted: this.player.wanted });
    }

    this._updateCamera(dt);

    // menu orbit keeps the rider breathing even while stationary
    if (this.state === 'menu') {
      this.rider.root.position.set(this.player.x, 0, this.player.z);
      this.rider.root.rotation.y = this.player.yaw + Math.sin(this.time * 0.2) * 0.04;
    }

    if (this.state === 'playing') {
      const p = this.player;
      const speedRatio = clamp(Math.abs(p.speed) / 38, 0, 1);
      document.getElementById('speedFx').style.opacity = (speedRatio * 0.55).toFixed(3);
      this.ui.setLife(p.life);
      this.ui.setFuel(p.fuel);
      this.ui.setCarrots(p.carrots);
      this.ui.setWanted(p.wanted);
    } else if (this.state === 'arresting' || this.state === 'over') {
      document.getElementById('speedFx').style.opacity = '0';
    } else if (this.state === 'menu') {
      document.getElementById('speedFx').style.opacity = '0';
    }
  }

  loop(dt, elapsed) {
    this.update(dt, elapsed);
  }
}
