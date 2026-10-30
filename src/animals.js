import * as THREE from 'three';
import { angleDamp, clamp, damp, lerp, TAU, dist2, makeRng } from './utils.js';
import { createCanine, RIVAL_PALETTE } from './wolf.js';

const TYPE = {
  rabbit: {
    hp: 18, speed: 4.6, radius: 0.34, prey: true, meat: 24, name: 'Rabbit',
    barHeight: 0.95, bodyCenter: 0.34, aggro: 0, flee: 13,
  },
  deer: {
    hp: 46, speed: 6.2, radius: 0.52, prey: true, meat: 38, name: 'Deer',
    barHeight: 1.95, bodyCenter: 0.92, aggro: 0, flee: 15,
  },
  boar: {
    hp: 74, speed: 4.9, radius: 0.66, prey: false, meat: 30, name: 'Boar',
    barHeight: 1.45, bodyCenter: 0.58, aggro: 15, damage: 14, attackRange: 2.3, cooldown: 2.4,
  },
  rival: {
    hp: 96, speed: 5.5, radius: 0.56, prey: false, meat: 26, name: 'Rival Wolf',
    barHeight: 1.55, bodyCenter: 0.78, aggro: 19, damage: 12, attackRange: 2.5, cooldown: 1.9,
  },
  alphaWolf: {
    hp: 150, speed: 5.9, radius: 0.66, prey: false, meat: 34, name: 'Alpha Wolf',
    barHeight: 1.8, bodyCenter: 0.88, aggro: 22, damage: 18, attackRange: 2.7, cooldown: 1.7, scale: 1.24,
  },
  bear: {
    hp: 260, speed: 3.7, radius: 0.9, prey: false, meat: 48, name: 'Old Bear',
    barHeight: 2.35, bodyCenter: 0.95, aggro: 22, damage: 26, attackRange: 3.3, cooldown: 2.7, scale: 1.15,
  },
};

const mat = (params) => new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.01, ...params });

function mesh(parent, geo, material, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1]) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(...pos);
  m.rotation.set(...rot);
  m.scale.set(...scale);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function sphere(r, w = 10, h = 8) { return new THREE.SphereGeometry(r, w, h); }
function capsule(r, len, c = 4, rad = 9) { return new THREE.CapsuleGeometry(r, len, c, rad); }
function cone(r, h, s = 5) { return new THREE.ConeGeometry(r, h, s); }
function box(x, y, z) { return new THREE.BoxGeometry(x, y, z); }
function cyl(r1, r2, h, s = 6) { return new THREE.CylinderGeometry(r1, r2, h, s); }

function buildRabbit(rng) {
  const furCol = rng.pick([0x8a6a45, 0x9b7a52, 0x6f5a42, 0xb08a5c]);
  const fur = mat({ color: furCol, roughness: 0.95 });
  const fur2 = mat({ color: 0xc7ab7e, roughness: 0.95 });
  const belly = mat({ color: 0xe2d4b6, roughness: 0.95 });
  const pink = mat({ color: 0xd98a96, roughness: 0.7 });
  const nose = mat({ color: 0x5a2a2a, roughness: 0.5 });
  const eye = mat({ color: 0x0a0a0a, roughness: 0.2 });
  const v = new THREE.Group();

  mesh(v, sphere(0.3, 12, 9), fur, [0, 0.4, -0.04], [0, 0, 0], [1, 0.9, 1.22]);
  mesh(v, sphere(0.23, 10, 8), fur2, [0, 0.43, 0.2], [0, 0, 0], [1, 0.9, 0.9]);
  mesh(v, sphere(0.16, 10, 8), belly, [0, 0.34, 0.24], [0, 0, 0], [0.85, 0.7, 0.7]);
  const head = new THREE.Group();
  head.position.set(0, 0.58, 0.34);
  v.add(head);
  mesh(head, sphere(0.2, 12, 9), fur, [0, 0, 0], [0, 0, 0], [1, 0.95, 1]);
  mesh(head, sphere(0.12, 10, 7), fur2, [0, -0.04, 0.16], [0, 0, 0], [1.1, 0.85, 0.9]);
  mesh(head, sphere(0.04, 7, 5), nose, [0, -0.02, 0.27], [0, 0, 0], [1.2, 0.8, 0.9]);
  for (const side of [-1, 1]) {
    mesh(head, sphere(0.035, 7, 5), eye, [side * 0.11, 0.045, 0.16], [0, 0, 0], [1, 1, 0.6]);
    mesh(head, sphere(0.008, 5, 4), mat({ color: 0xffffff, roughness: 0.2 }), [side * 0.115, 0.06, 0.183], [0, 0, 0], [1, 1, 1]);
    const ear = new THREE.Group();
    ear.position.set(side * 0.075, 0.15, -0.01);
    ear.rotation.set(-0.16, 0, side * 0.12);
    head.add(ear);
    mesh(ear, capsule(0.055, 0.26, 4, 8), fur, [0, 0.15, 0], [0, 0, 0], [1, 1, 0.7]);
    mesh(ear, capsule(0.028, 0.2, 3, 7), pink, [0, 0.15, 0.025], [0, 0, 0], [1, 1, 0.45]);
    ear.userData.baseZ = side * 0.12;
  }
  mesh(v, sphere(0.11, 8, 6), belly, [0, 0.43, -0.37], [0, 0, 0], [1, 1, 1]);
  const legs = [];
  for (const side of [-1, 1]) {
    for (const z of [0.22, -0.2]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.17, 0.2, z);
      v.add(leg);
      mesh(leg, capsule(0.045, 0.12, 3, 6), fur, [0, -0.07, 0], [0, 0, 0], [1, 1, 1]);
      mesh(leg, sphere(0.055, 7, 5), fur2, [0, -0.14, 0.02], [0, 0, 0], [1, 0.6, 1.3]);
      legs.push(leg);
    }
  }
  return {
    visual: v, bodyCenter: 0.34, flashMats: [fur, fur2, belly],
    animate(dt, elapsed, move, sprint, state) {
      const phase = (state.phase = (state.phase || 0) + dt * (3 + move * 12));
      const hop = Math.max(0, Math.sin(phase)) * 0.18 * move;
      v.position.y = (v.userData.baseY ?? 0) + hop;
      v.rotation.x = -0.08 * move + Math.sin(phase * 2) * 0.04 * move;
      head.rotation.x = 0.05 + Math.sin(elapsed * 1.7) * 0.04 + Math.sin(phase) * 0.06 * move;
      head.rotation.y = Math.sin(elapsed * 0.8) * 0.18 * (1 - move);
      for (let i = 0; i < legs.length; i++) {
        const s = Math.sin(phase + (i % 2 ? Math.PI : 0));
        legs[i].rotation.x = s * 0.5 * move;
        legs[i].rotation.z = (i < 2 ? -1 : 1) * 0.06;
      }
      const ears = head.children.filter((c) => c.isGroup);
      ears.forEach((ear, i) => {
        ear.rotation.z = (ear.userData.baseZ || 0) + Math.sin(elapsed * 2.1 + i) * 0.05 + Math.sin(phase) * 0.03 * move;
        ear.rotation.x = -0.16 + Math.sin(elapsed * 1.4 + i) * 0.03;
      });
    },
  };
}

function buildDeer(rng) {
  const fur = mat({ color: rng.pick([0x8b6b45, 0x96764c, 0x7d5f3e]), roughness: 0.95 });
  const fur2 = mat({ color: 0xa8895b, roughness: 0.95 });
  const belly = mat({ color: 0xd9c9a8, roughness: 0.95 });
  const dark = mat({ color: 0x4a3828, roughness: 0.8 });
  const antler = mat({ color: 0x6b5a42, roughness: 0.85 });
  const nose = mat({ color: 0x1a1410, roughness: 0.4 });
  const eye = mat({ color: 0x080808, roughness: 0.2 });
  const v = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 1.0;
  v.add(body);
  mesh(body, capsule(0.27, 0.62, 6, 10), fur, [0, 0, 0], [Math.PI / 2, 0, 0], [1, 0.95, 1]);
  mesh(body, sphere(0.3, 10, 8), fur2, [0, 0.03, 0.3], [0, 0, 0], [0.95, 0.9, 0.9]);
  mesh(body, sphere(0.28, 10, 8), fur, [0, 0.02, -0.33], [0, 0, 0], [1, 0.9, 0.9]);
  mesh(body, sphere(0.18, 9, 7), belly, [0, -0.17, 0.02], [0, 0, 0], [0.9, 0.65, 1.4]);
  const neck = new THREE.Group();
  neck.position.set(0, 0.18, 0.35);
  neck.rotation.x = 0.42;
  body.add(neck);
  mesh(neck, capsule(0.12, 0.34, 5, 9), fur, [0, 0.22, 0], [0, 0, 0], [1, 1, 0.9]);
  const head = new THREE.Group();
  head.position.set(0, 0.47, 0.02);
  head.rotation.x = -0.35;
  neck.add(head);
  mesh(head, sphere(0.16, 10, 8), fur, [0, 0, 0], [0, 0, 0], [0.95, 1, 1.05]);
  mesh(head, capsule(0.085, 0.14, 4, 8), fur2, [0, -0.045, 0.18], [Math.PI / 2, 0, 0], [1, 0.9, 0.9]);
  mesh(head, sphere(0.045, 7, 5), nose, [0, -0.04, 0.28], [0, 0, 0], [1.2, 0.8, 0.9]);
  for (const side of [-1, 1]) {
    mesh(head, sphere(0.035, 7, 5), eye, [side * 0.11, 0.04, 0.09], [0, 0, 0], [1, 1, 0.6]);
    const ear = new THREE.Group();
    ear.position.set(side * 0.13, 0.08, -0.01);
    ear.rotation.set(0, 0, side * 0.9);
    head.add(ear);
    mesh(ear, cone(0.065, 0.22, 5), fur, [0, 0.1, 0], [0, 0, 0], [1, 1, 0.6]);
    // antlers
    const beam = new THREE.Group();
    beam.position.set(side * 0.07, 0.14, -0.02);
    beam.rotation.set(-0.15, 0, side * 0.5);
    head.add(beam);
    mesh(beam, cyl(0.018, 0.03, 0.38, 5), antler, [0, 0.17, 0], [0, 0, 0], [1, 1, 1]);
    for (let i = 0; i < 3; i++) {
      const tine = new THREE.Group();
      tine.position.set(0, 0.16 + i * 0.1, 0);
      tine.rotation.set(0, 0, side * (0.7 + i * 0.15));
      beam.add(tine);
      mesh(tine, cyl(0.01, 0.018, 0.2 - i * 0.03, 4), antler, [0, 0.09, 0], [0, 0, 0], [1, 1, 1]);
    }
  }
  mesh(body, sphere(0.1, 8, 6), belly, [0, 0.02, -0.53], [0, 0, 0], [1, 1, 1]);
  const legs = [];
  for (const side of [-1, 1]) {
    for (const z of [0.32, -0.3]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.2, -0.16, z);
      body.add(hip);
      mesh(hip, capsule(0.065, 0.34, 4, 7), fur, [0, -0.2, 0], [0, 0, 0], [1, 1, 0.9]);
      const knee = new THREE.Group();
      knee.position.y = -0.4;
      hip.add(knee);
      mesh(knee, capsule(0.045, 0.32, 4, 7), dark, [0, -0.17, 0], [0, 0, 0], [1, 1, 1]);
      mesh(knee, sphere(0.055, 7, 5), dark, [0, -0.35, 0.02], [0, 0, 0], [1, 0.6, 1.3]);
      legs.push({ hip, knee, base: hip.rotation.x });
    }
  }
  return {
    visual: v, bodyCenter: 0.92, flashMats: [fur, fur2, belly],
    animate(dt, elapsed, move, sprint, state) {
      const phase = (state.phase = (state.phase || 0) + dt * (2 + move * (sprint ? 13 : 8)));
      const amp = 0.16 + move * 0.5;
      legs.forEach((leg, i) => {
        const s = Math.sin(phase + (i % 2 ? Math.PI : 0));
        leg.hip.rotation.x = leg.base + s * amp;
        leg.knee.rotation.x = 0.12 + Math.max(0, -Math.cos(phase + (i % 2 ? Math.PI : 0))) * 0.55 * move;
      });
      v.position.y = (v.userData.baseY ?? 0) + Math.abs(Math.sin(phase)) * 0.035 * move;
      body.position.y = 1.0 + Math.sin(phase * 2) * 0.025 * move;
      neck.rotation.x = 0.42 + Math.sin(elapsed * 1.2) * 0.03;
      head.rotation.x = -0.35 + Math.sin(elapsed * 1.5) * 0.04 + (state.headDown ? 0.3 : 0);
      head.rotation.y = Math.sin(elapsed * 0.7) * 0.15 * (1 - move);
    },
  };
}

function buildBoar(rng) {
  const fur = mat({ color: rng.pick([0x3a3026, 0x463a2c, 0x2f2821]), roughness: 0.98 });
  const fur2 = mat({ color: 0x574735, roughness: 0.95 });
  const dark = mat({ color: 0x201a15, roughness: 0.95 });
  const tusk = mat({ color: 0xe8e0c8, roughness: 0.5 });
  const nose = mat({ color: 0x5a3a35, roughness: 0.6 });
  const eye = mat({ color: 0x090706, roughness: 0.2 });
  const v = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 0.66;
  v.add(body);
  mesh(body, sphere(0.46, 12, 9), fur, [0, 0, 0], [0, 0, 0], [1.05, 0.86, 1.28]);
  mesh(body, sphere(0.38, 10, 8), fur2, [0, 0.04, 0.34], [0, 0, 0], [1, 0.9, 0.9]);
  mesh(body, sphere(0.32, 10, 8), fur, [0, 0.02, -0.38], [0, 0, 0], [1, 0.9, 0.9]);
  const head = new THREE.Group();
  head.position.set(0, 0.04, 0.5);
  body.add(head);
  mesh(head, sphere(0.3, 11, 9), fur2, [0, 0, 0], [0, 0, 0], [1.05, 0.95, 1]);
  mesh(head, capsule(0.13, 0.18, 4, 8), fur, [0, -0.05, 0.25], [Math.PI / 2, 0, 0], [1.1, 0.9, 1]);
  mesh(head, sphere(0.1, 8, 6), nose, [0, -0.04, 0.38], [0, 0, 0], [1.2, 0.9, 0.8]);
  for (const side of [-1, 1]) {
    mesh(head, sphere(0.035, 7, 5), eye, [side * 0.16, 0.1, 0.14], [0, 0, 0], [1, 1, 0.7]);
    mesh(head, cone(0.03, 0.18, 5), tusk, [side * 0.13, -0.12, 0.3], [-0.4, 0, side * 0.18], [1, 1, 1]);
    const ear = new THREE.Group();
    ear.position.set(side * 0.23, 0.2, 0.02);
    ear.rotation.set(-0.2, 0, side * 0.7);
    head.add(ear);
    mesh(ear, cone(0.08, 0.18, 5), fur, [0, 0.08, 0], [0, 0, 0], [1, 1, 0.6]);
  }
  for (let i = 0; i < 8; i++) {
    mesh(body, cone(0.05, 0.16, 5), dark, [0, 0.38 - i * 0.01, 0.28 - i * 0.12], [-0.6, 0, 0], [1, 1, 1]);
  }
  const legs = [];
  for (const side of [-1, 1]) {
    for (const z of [0.3, -0.3]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.3, -0.2, z);
      body.add(hip);
      mesh(hip, capsule(0.11, 0.22, 4, 7), fur, [0, -0.13, 0], [0, 0, 0], [1, 1, 0.9]);
      mesh(hip, sphere(0.13, 8, 6), dark, [0, -0.28, 0.02], [0, 0, 0], [1, 0.6, 1.3]);
      legs.push({ hip, base: hip.rotation.x });
    }
  }
  return {
    visual: v, bodyCenter: 0.58, flashMats: [fur, fur2],
    animate(dt, elapsed, move, sprint, state) {
      const phase = (state.phase = (state.phase || 0) + dt * (2.5 + move * (state.charging ? 16 : 10)));
      legs.forEach((leg, i) => {
        leg.hip.rotation.x = leg.base + Math.sin(phase + (i % 2 ? Math.PI : 0)) * (0.18 + move * 0.48);
      });
      v.position.y = (v.userData.baseY ?? 0) + Math.abs(Math.sin(phase)) * 0.03 * move;
      body.position.y = 0.66 + Math.sin(phase * 2) * 0.02 * move;
      body.rotation.x = (state.headDown ? 0.16 : 0) + Math.sin(phase) * 0.02 * move;
      head.rotation.x = state.headDown ? 0.35 : Math.sin(elapsed * 1.4) * 0.05;
      head.rotation.y = Math.sin(elapsed * 0.8) * 0.08 * (1 - move);
    },
  };
}

function buildBear(rng) {
  const fur = mat({ color: rng.pick([0x3b2a1e, 0x443022, 0x32241a]), roughness: 0.98 });
  const fur2 = mat({ color: 0x5a402c, roughness: 0.95 });
  const muzzle = mat({ color: 0x6b5136, roughness: 0.9 });
  const nose = mat({ color: 0x0d0a08, roughness: 0.3 });
  const claw = mat({ color: 0xd8d0bc, roughness: 0.5 });
  const eye = mat({ color: 0x0a0706, roughness: 0.2 });
  const v = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 1.0;
  v.add(body);
  mesh(body, sphere(0.64, 13, 10), fur, [0, 0, 0], [0, 0, 0], [1.08, 0.9, 1.2]);
  mesh(body, sphere(0.5, 11, 9), fur2, [0, 0.06, 0.42], [0, 0, 0], [1, 0.9, 0.9]);
  const head = new THREE.Group();
  head.position.set(0, 0.36, 0.62);
  body.add(head);
  mesh(head, sphere(0.4, 12, 9), fur, [0, 0, 0], [0, 0, 0], [1, 0.95, 1]);
  mesh(head, sphere(0.24, 10, 8), muzzle, [0, -0.09, 0.28], [0, 0, 0], [1.05, 0.8, 0.95]);
  mesh(head, sphere(0.085, 8, 6), nose, [0, -0.04, 0.46], [0, 0, 0], [1.2, 0.85, 0.9]);
  for (const side of [-1, 1]) {
    mesh(head, sphere(0.04, 7, 5), eye, [side * 0.16, 0.1, 0.25], [0, 0, 0], [1, 1, 0.6]);
    mesh(head, sphere(0.12, 8, 6), fur2, [side * 0.3, 0.28, -0.02], [0, 0, 0], [1, 1, 0.7]);
  }
  const legs = [];
  for (const side of [-1, 1]) {
    for (const z of [0.38, -0.36]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.38, -0.25, z);
      body.add(hip);
      mesh(hip, capsule(0.17, 0.28, 4, 8), fur, [0, -0.18, 0], [0, 0, 0], [1, 1, 0.9]);
      const knee = new THREE.Group();
      knee.position.y = -0.36;
      hip.add(knee);
      mesh(knee, capsule(0.12, 0.24, 4, 8), fur, [0, -0.13, 0.01], [0, 0, 0], [1, 1, 1]);
      mesh(knee, sphere(0.15, 8, 6), fur2, [0, -0.28, 0.05], [0, 0, 0], [1, 0.55, 1.25]);
      for (let i = 0; i < 3; i++) {
        mesh(knee, cone(0.025, 0.09, 4), claw, [(i - 1) * 0.07, -0.33, 0.19], [Math.PI / 2.2, 0, 0], [1, 1, 1]);
      }
      legs.push({ hip, knee, base: hip.rotation.x, front: z > 0 });
    }
  }
  mesh(body, sphere(0.12, 8, 6), fur2, [0, 0.05, -0.66], [0, 0, 0], [1, 1, 1]);
  return {
    visual: v, bodyCenter: 0.95, flashMats: [fur, fur2],
    animate(dt, elapsed, move, sprint, state) {
      const phase = (state.phase = (state.phase || 0) + dt * (1.8 + move * 8));
      legs.forEach((leg, i) => {
        leg.hip.rotation.x = leg.base + Math.sin(phase + (i % 2 ? Math.PI : 0)) * (0.14 + move * 0.4);
        leg.knee.rotation.x = 0.1 + Math.max(0, -Math.cos(phase + (i % 2 ? Math.PI : 0))) * 0.3 * move;
      });
      v.position.y = (v.userData.baseY ?? 0) + Math.abs(Math.sin(phase)) * 0.03 * move;
      body.position.y = 1.0 + Math.sin(phase * 2) * 0.025 * move;
      body.rotation.z = Math.sin(phase) * 0.025 * move;
      head.rotation.x = Math.sin(elapsed * 1.2) * 0.04 + (state.headDown ? 0.25 : 0);
      head.rotation.y = Math.sin(elapsed * 0.55) * 0.12 * (1 - move);
      if (state.swipe > 0) {
        const front = legs.find((l) => l.front);
        if (front) {
          front.hip.rotation.x = -1.4 * Math.sin(state.swipe * Math.PI);
          front.hip.rotation.z = -0.5 * Math.sin(state.swipe * Math.PI);
        }
      } else {
        const front = legs.find((l) => l.front);
        if (front) front.hip.rotation.z = 0;
      }
    },
  };
}

function buildCanineAnimal(type, rng) {
  const alpha = type === 'alphaWolf';
  const palette = alpha
    ? { ...RIVAL_PALETTE, fur: 0x24262b, furLight: 0x34363b, eye: 0xff3a1f, eyeGlow: 0x7a1000, mask: 0x3a2020, maskDark: 0x261414 }
    : RIVAL_PALETTE;
  const rig = createCanine({ palette, harness: false, scale: alpha ? 1.18 : 1.0 });
  return {
    visual: rig.root, bodyCenter: 0.78, flashMats: [rig.mats.fur, rig.mats.furLight, rig.mats.mask],
    rig,
    animate(dt, elapsed, move, sprint, state) {
      rig.update(dt, elapsed, {
        speed: move,
        sprint,
        night: state.night || 0,
        lookYaw: state.lookYaw || 0,
      });
    },
  };
}

export class Animal {
  constructor(type, level, position, options = {}) {
    const cfg = TYPE[type] || TYPE.rabbit;
    this.type = type;
    this.cfg = cfg;
    this.level = level;
    this.isPrey = cfg.prey;
    this.name = cfg.name;
    this.radius = cfg.radius * (options.scale || cfg.scale || 1);
    this.maxHp = cfg.hp * level.hpMul * (options.hpMul || 1);
    this.hp = this.maxHp;
    this.damage = (cfg.damage || 0) * level.dmgMul;
    this.speed = cfg.speed * level.speedMul;
    this.meat = cfg.meat;
    this.isAlpha = Boolean(options.alpha);
    this.home = new THREE.Vector2(position.x, position.z);
    this.position = new THREE.Vector3(position.x, 0, position.z);
    this.heading = options.heading ?? Math.random() * TAU;
    this.velocity = new THREE.Vector3();
    this.state = 'wander';
    this.stateTimer = 0;
    this.attackCooldown = 0;
    this.aggro = false;
    this.aggroTimer = 0;
    this.hitFlash = 0;
    this.hitTimer = 0;
    this.dead = false;
    this.edible = false;
    this.consumed = false;
    this.gone = false;
    this.deathTimer = 0;
    this.deathSide = Math.random() < 0.5 ? -1 : 1;
    this.wanderTarget = new THREE.Vector2(position.x + (Math.random() - 0.5) * 12, position.z + (Math.random() - 0.5) * 12);
    this.attackDone = false;
    this.chargeDir = new THREE.Vector2(0, 0);
    this.specialTimer = 0;
    this.rng = options.rng || makeRng(Math.floor(Math.random() * 1e9));
    this.animState = { phase: 0 };

    this.root = new THREE.Group();
    this.root.position.set(position.x, 0, position.z);
    this.fall = new THREE.Group();
    this.root.add(this.fall);

    const built = type === 'rabbit' ? buildRabbit(this.rng)
      : type === 'deer' ? buildDeer(this.rng)
      : type === 'boar' ? buildBoar(this.rng)
      : type === 'bear' ? buildBear(this.rng)
      : buildCanineAnimal(type, this.rng);

    this.visual = built.visual;
    this.flashMats = built.flashMats || [];
    this.rig = built.rig || null;
    this.bodyCenter = built.bodyCenter || 0.6;
    this.fall.position.y = this.bodyCenter;
    this.visual.userData.baseY = -this.bodyCenter;
    this.visual.position.y = -this.bodyCenter;
    this.fall.add(this.visual);
    if (options.scale) this.visual.scale.setScalar(options.scale);
    this.baseScale = this.visual.scale.x;

    // Billboard health bar.
    this.bar = new THREE.Group();
    this.bar.position.y = cfg.barHeight + (options.scale || cfg.scale || 1) * 0.1;
    const bgGeo = new THREE.PlaneGeometry(1.18, 0.12);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x050806, transparent: true, opacity: 0.72, depthWrite: false });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    const fillGeo = new THREE.PlaneGeometry(1.12, 0.075);
    fillGeo.translate(0.56, 0, 0);
    const fillMat = new THREE.MeshBasicMaterial({ color: cfg.prey ? 0x9adf77 : 0xff6b54, transparent: true, depthWrite: false });
    this.barFill = new THREE.Mesh(fillGeo, fillMat);
    this.barFill.position.set(-0.56, 0, 0.002);
    this.bar.add(bg, this.barFill);
    this.bar.visible = false;
    this.bar.renderOrder = 20;
    this.root.add(this.bar);

    // Edible glow ring.
    const ringGeo = new THREE.RingGeometry(0.62, 0.82, 28);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffc35a, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.04;
    this.ring.visible = false;
    this.root.add(this.ring);

    this.disposables = [bgGeo, bgMat, fillGeo, fillMat, ringGeo, ringMat];
    this.animateFn = built.animate;
    this._q = new THREE.Quaternion();
  }

  addTo(scene) {
    scene.add(this.root);
  }

  setFlash(amount) {
    for (const m of this.flashMats) {
      if (!m) continue;
      if (amount > 0) {
        m.emissive.setHex(0x6a0a04);
        m.emissiveIntensity = amount * 0.9;
      } else {
        m.emissive.setHex(0x000000);
        m.emissiveIntensity = 0;
      }
    }
  }

  takeDamage(amount, options = {}) {
    if (this.dead) return { killed: false, damage: 0 };
    const actual = Math.min(this.hp, amount);
    this.hp -= amount;
    this.hitFlash = 0.2;
    this.aggro = true;
    this.aggroTimer = 12;
    this.setFlash(1);
    if (this.hp <= 0) {
      this.die(Boolean(options.instant));
      return { killed: true, damage: actual, instant: Boolean(options.instant) };
    }
    return { killed: false, damage: actual };
  }

  die(instant) {
    if (this.dead) return;
    this.dead = true;
    this.edible = true;
    this.deathTimer = 0;
    this.instantDevoured = Boolean(instant);
    this.bar.visible = false;
    this.ring.visible = true;
    this.ring.material.opacity = 0.5;
    this.setFlash(0);
  }

  consume() {
    if (!this.edible || this.consumed) return false;
    this.consumed = true;
    this.edible = false;
    this.ring.visible = false;
    this.root.visible = false;
    return true;
  }

  update(dt, elapsed, player, game) {
    const world = game.world;
    const camera = game.camera;

    if (this.hitFlash > 0) {
      this.hitFlash = Math.max(0, this.hitFlash - dt);
      if (this.hitFlash === 0) this.setFlash(0);
    }

    if (this.dead) {
      this.deathTimer += dt;
      const t = clamp(this.deathTimer / 0.5, 0, 1);
      this.fall.rotation.z = this.deathSide * (Math.PI / 2) * (1 - Math.pow(1 - t, 3));
      this.fall.position.y = lerp(this.bodyCenter, this.bodyCenter * 0.34, t);
      this.ring.material.opacity = 0.28 + Math.sin(elapsed * 3.2) * 0.14;
      this.ring.scale.setScalar(1 + Math.sin(elapsed * 2.4) * 0.06);
      if (this.deathTimer > 22) this.gone = true;
      return;
    }

    const px = player.position.x;
    const pz = player.position.z;
    const dPlayer = dist2(this.position.x, this.position.z, px, pz);
    const night = player.night || 0;

    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.aggroTimer = Math.max(0, this.aggroTimer - dt);
    if (this.aggroTimer <= 0 && !this.isPrey) this.aggro = false;

    let moveSpeed = 0;
    let sprint = false;
    let headDown = false;
    let charging = false;
    let swipe = 0;
    let lookYaw = 0;

    if (this.isPrey) {
      const fleeRange = this.cfg.flee + night * 2;
      if (dPlayer < fleeRange) {
        this.state = 'flee';
        this.aggro = true;
        this.aggroTimer = 4;
      } else if (this.state === 'flee' && dPlayer > fleeRange + 4) {
        this.state = 'wander';
      }
      if (this.state === 'flee') {
        const away = Math.atan2(this.position.x - px, this.position.z - pz);
        const edge = Math.hypot(this.position.x, this.position.z);
        const steer = edge > 84 ? Math.atan2(-this.position.x, -this.position.z) : away;
        this.heading = angleDamp(this.heading, steer, 8, dt);
        moveSpeed = this.speed * (this.type === 'rabbit' ? 1.0 : 0.96);
        sprint = true;
      } else {
        this.wander(dt, elapsed, 0.36);
        moveSpeed = this.wanderSpeed || 0;
      }
    } else {
      const aggroRange = this.cfg.aggro + night * 5 + (this.aggro ? 8 : 0);
      if (dPlayer < aggroRange) {
        this.aggro = true;
        this.aggroTimer = 10;
      }

      if (!this.aggro) {
        this.wander(dt, elapsed, 0.3);
        moveSpeed = this.wanderSpeed || 0;
      } else {
        const toPlayer = Math.atan2(px - this.position.x, pz - this.position.z);
        if (this.type === 'boar') {
          if (this.state === 'windup') {
            this.specialTimer -= dt;
            headDown = true;
            this.heading = angleDamp(this.heading, toPlayer, 7, dt);
            if (this.specialTimer <= 0) {
              this.state = 'charge';
              this.specialTimer = 0.95;
              this.attackDone = false;
              const len = Math.max(0.01, dPlayer);
              this.chargeDir.set((px - this.position.x) / len, (pz - this.position.z) / len);
            }
          } else if (this.state === 'charge') {
            charging = true;
            headDown = true;
            this.specialTimer -= dt;
            this.heading = Math.atan2(this.chargeDir.x, this.chargeDir.y);
            moveSpeed = this.speed * 2.35;
            if (!this.attackDone && dPlayer < this.radius + 1.6) {
              this.attackDone = true;
              game.hurtPlayer(this.damage, this);
            }
            if (this.specialTimer <= 0) {
              this.state = 'chase';
              this.attackCooldown = this.cfg.cooldown;
            }
          } else if (dPlayer < 10 && this.attackCooldown <= 0) {
            this.state = 'windup';
            this.specialTimer = 0.55;
          } else {
            this.chase(dt, toPlayer, dPlayer, 8.5, 1.0);
            moveSpeed = this.speed;
          }
        } else if (this.type === 'rival' || this.type === 'alphaWolf') {
          if (this.state === 'windup') {
            this.specialTimer -= dt;
            this.heading = angleDamp(this.heading, toPlayer, 10, dt);
            if (this.specialTimer <= 0) {
              this.state = 'lunge';
              this.specialTimer = 0.48;
              this.attackDone = false;
              this.rig?.triggerBite();
            }
          } else if (this.state === 'lunge') {
            this.specialTimer -= dt;
            charging = true;
            moveSpeed = this.speed * 1.85;
            this.heading = angleDamp(this.heading, toPlayer, 12, dt);
            if (!this.attackDone && dPlayer < this.radius + 1.8) {
              this.attackDone = true;
              game.hurtPlayer(this.damage, this);
            }
            if (this.specialTimer <= 0) {
              this.state = 'circle';
              this.specialTimer = 1.1;
              this.attackCooldown = this.cfg.cooldown;
            }
          } else if (this.state === 'circle') {
            this.specialTimer -= dt;
            const around = toPlayer + Math.PI / 2;
            this.heading = angleDamp(this.heading, around, 5, dt);
            moveSpeed = this.speed * 0.62;
            if (this.specialTimer <= 0) this.state = 'chase';
          } else if (dPlayer < 6.5 && this.attackCooldown <= 0) {
            this.state = 'windup';
            this.specialTimer = 0.38;
          } else {
            this.chase(dt, toPlayer, dPlayer, 6.5, 1.0);
            moveSpeed = this.speed * (dPlayer < 10 ? 0.9 : 1);
          }
        } else if (this.type === 'bear') {
          if (this.state === 'windup') {
            this.specialTimer -= dt;
            headDown = true;
            this.heading = angleDamp(this.heading, toPlayer, 5, dt);
            if (this.specialTimer <= 0) {
              this.state = 'swipe';
              this.specialTimer = 0.35;
              this.attackDone = false;
            }
          } else if (this.state === 'swipe') {
            this.specialTimer -= dt;
            swipe = 1 - this.specialTimer / 0.35;
            if (!this.attackDone && dPlayer < this.radius + 2.2) {
              this.attackDone = true;
              game.hurtPlayer(this.damage, this);
            }
            if (this.specialTimer <= 0) {
              this.state = 'chase';
              this.attackCooldown = this.cfg.cooldown;
            }
          } else if (dPlayer < 4 && this.attackCooldown <= 0) {
            this.state = 'windup';
            this.specialTimer = 0.55;
          } else {
            this.chase(dt, toPlayer, dPlayer, 4.0, 1.0);
            moveSpeed = this.speed;
          }
        }
      }
    }

    // Steering / locomotion.
    if (moveSpeed > 0) {
      const vx = Math.sin(this.heading) * moveSpeed;
      const vz = Math.cos(this.heading) * moveSpeed;
      this.position.x += vx * dt;
      this.position.z += vz * dt;
      this.velocity.set(vx, 0, vz);
    } else {
      this.velocity.multiplyScalar(Math.max(0, 1 - dt * 6));
    }

    // Separation from other animals.
    if (game.animals) {
      for (const other of game.animals) {
        if (other === this || other.dead) continue;
        const dx = this.position.x - other.position.x;
        const dz = this.position.z - other.position.z;
        const min = this.radius + other.radius + 0.15;
        const d = Math.hypot(dx, dz);
        if (d > 0.001 && d < min) {
          const push = (min - d) * 0.5;
          this.position.x += (dx / d) * push;
          this.position.z += (dz / d) * push;
        }
      }
    }

    // Keep a little personal space from the player.
    const playerMin = this.radius + (this.isPrey ? 0.5 : 0.25);
    if (dPlayer > 0.001 && dPlayer < playerMin) {
      const push = (playerMin - dPlayer) * 0.7;
      this.position.x += ((this.position.x - px) / dPlayer) * push;
      this.position.z += ((this.position.z - pz) / dPlayer) * push;
    }

    // Trees and the edge of the world.
    for (const c of world.colliders) {
      const dx = this.position.x - c.x;
      const dz = this.position.z - c.z;
      const min = this.radius + c.r;
      const d = Math.hypot(dx, dz);
      if (d > 0.001 && d < min) {
        this.position.x += (dx / d) * (min - d);
        this.position.z += (dz / d) * (min - d);
      }
    }
    const edge = Math.hypot(this.position.x, this.position.z);
    if (edge > 92) {
      this.position.x = (this.position.x / edge) * 92;
      this.position.z = (this.position.z / edge) * 92;
      this.heading = Math.atan2(-this.position.x, -this.position.z);
    }

    // Ground and facing.
    this.position.y = world.heightAt(this.position.x, this.position.z);
    this.root.position.copy(this.position);
    this.root.rotation.y = this.heading;

    const moveAmount = clamp(moveSpeed / Math.max(1, this.speed), 0, 1.3);
    if (this.animateFn) {
      this.animState.night = night;
      this.animState.lookYaw = lookYaw;
      this.animState.headDown = headDown;
      this.animState.charging = charging;
      this.animState.swipe = swipe;
      this.animateFn(dt, elapsed, moveAmount, sprint || charging, this.animState);
    }

    // Health bar billboard.
    const showBar = this.hp < this.maxHp - 0.1 || this.aggro;
    this.bar.visible = showBar;
    if (showBar && camera) {
      this.root.getWorldQuaternion(this._q);
      this.bar.quaternion.copy(this._q).invert().multiply(camera.quaternion);
      const ratio = clamp(this.hp / this.maxHp, 0, 1);
      this.barFill.scale.x = ratio;
      this.barFill.material.color.setHex(this.isPrey ? 0x9adf77 : ratio < 0.35 ? 0xff6b54 : 0xffa24a);
    }
  }

  chase(dt, toPlayer, dPlayer, stopDist, speedMul) {
    if (dPlayer > stopDist) {
      this.heading = angleDamp(this.heading, toPlayer, 5.5, dt);
    } else {
      this.heading = angleDamp(this.heading, toPlayer, 4, dt);
    }
  }

  wander(dt, elapsed, speedMul) {
    this.stateTimer -= dt;
    if (this.stateTimer <= 0) {
      this.stateTimer = 2.5 + Math.random() * 5;
      const ang = Math.random() * TAU;
      const rad = Math.random() * 16;
      this.wanderTarget.set(this.home.x + Math.cos(ang) * rad, this.home.y + Math.sin(ang) * rad);
      this.idle = Math.random() < 0.3;
    }
    const dx = this.wanderTarget.x - this.position.x;
    const dz = this.wanderTarget.y - this.position.z;
    const d = Math.hypot(dx, dz);
    if (this.idle && d < 4) {
      this.wanderSpeed = 0;
      return;
    }
    if (d > 1.2) {
      this.heading = angleDamp(this.heading, Math.atan2(dx, dz), 2.2, dt);
      this.wanderSpeed = this.speed * speedMul;
    } else {
      this.wanderSpeed = 0;
      this.stateTimer = 0;
    }
  }

  dispose() {
    this.root.traverse((obj) => {
      if (obj.isMesh || obj.isPoints) {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
        else obj.material?.dispose?.();
      }
    });
    for (const item of this.disposables) item?.dispose?.();
  }
}
