import * as THREE from 'three';
import { clamp, TAU } from './utils.js';

export const PLAYER_PALETTE = {
  fur: 0x14171c,
  furLight: 0x232830,
  mask: 0x0f7d9e,
  maskDark: 0x0a536b,
  white: 0xe9e7dd,
  eye: 0xffb733,
  eyeGlow: 0x6b3b00,
  nose: 0x090a0c,
  pink: 0xd94f7a,
  metal: 0xc7d0d6,
  claw: 0xd9d3c2,
  tongue: 0xd96a78,
};

export const RIVAL_PALETTE = {
  fur: 0x4a4a46,
  furLight: 0x5b5a52,
  mask: 0x2f3436,
  maskDark: 0x222627,
  white: 0xcfc9b8,
  eye: 0xff5a35,
  eyeGlow: 0x6b1600,
  nose: 0x0b0b0c,
  pink: 0x8c3d4b,
  metal: 0x9aa0a4,
  claw: 0xd0c9b8,
  tongue: 0xb95362,
};

const PAW_DURATION = 0.42;
const BITE_DURATION = 0.56;
const HURT_DURATION = 0.32;
const FEED_DURATION = 1.0;

function mat(params) {
  return new THREE.MeshStandardMaterial({ roughness: 0.86, metalness: 0.02, ...params });
}

function addMesh(parent, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function createCanine(options = {}) {
  const palette = options.palette || PLAYER_PALETTE;
  const scale = options.scale || 1;
  const harness = options.harness !== false;
  const root = new THREE.Group();
  root.scale.setScalar(scale);

  const mats = {
    fur: mat({ color: palette.fur, roughness: 0.94 }),
    furLight: mat({ color: palette.furLight, roughness: 0.92 }),
    mask: mat({ color: palette.mask, roughness: 0.54, metalness: 0.08 }),
    maskDark: mat({ color: palette.maskDark, roughness: 0.6 }),
    white: mat({ color: palette.white, roughness: 0.82 }),
    eyeWhite: mat({ color: 0xf7efd9, roughness: 0.4 }),
    iris: mat({ color: palette.eye, emissive: palette.eyeGlow, emissiveIntensity: 0.45, roughness: 0.35 }),
    pupil: mat({ color: 0x07080a, roughness: 0.25 }),
    nose: mat({ color: palette.nose, roughness: 0.3, metalness: 0.05 }),
    pink: mat({ color: palette.pink, roughness: 0.6 }),
    metal: mat({ color: palette.metal, roughness: 0.28, metalness: 0.85 }),
    claw: mat({ color: palette.claw, roughness: 0.5 }),
    tongue: mat({ color: palette.tongue, roughness: 0.55 }),
    innerEar: mat({ color: palette.maskDark, roughness: 0.7 }),
  };
  const flashMats = [mats.fur, mats.furLight, mats.mask, mats.maskDark, mats.white, mats.eyeWhite];
  const flashBase = flashMats.map((m) => ({ emissive: m.emissive.getHex(), intensity: m.emissiveIntensity }));

  const body = new THREE.Group();
  body.position.y = 0.83;
  root.add(body);

  const capsule = (r, len, cap = 6, radial = 12) => new THREE.CapsuleGeometry(r, len, cap, radial);
  const sphere = (r, w = 12, h = 9) => new THREE.SphereGeometry(r, w, h);
  const cone = (r, h, seg = 6) => new THREE.ConeGeometry(r, h, seg);
  const box = (x, y, z) => new THREE.BoxGeometry(x, y, z);
  const torus = (r, t, rs = 8, ts = 18) => new THREE.TorusGeometry(r, t, rs, ts);

  // Torso -----------------------------------------------------------------
  addMesh(body, capsule(0.32, 0.78, 8, 14), mats.fur, [0, 0.02, 0], [Math.PI / 2, 0, 0]);
  addMesh(body, sphere(0.35, 14, 11), mats.fur, [0, 0.04, 0.35], [0, 0, 0], [0.98, 1.02, 0.98]);
  addMesh(body, sphere(0.31, 14, 11), mats.fur, [0, 0.02, -0.4], [0, 0, 0], [1.02, 0.96, 1]);
  addMesh(body, sphere(0.2, 12, 9), mats.furLight, [0, -0.09, 0.46], [0, 0, 0], [0.78, 0.75, 0.55]);

  // Fur tufts along the spine.
  for (let i = 0; i < 5; i++) {
    const z = 0.34 - i * 0.18;
    addMesh(body, cone(0.055, 0.16, 5), mats.fur, [0, 0.29 - i * 0.005, z], [-0.5, 0, 0], [1, 1, 1]);
  }

  // Neck ------------------------------------------------------------------
  addMesh(body, capsule(0.17, 0.22, 5, 10), mats.fur, [0, 0.21, 0.5], [1.15, 0, 0], [1, 1, 0.95]);

  // Head ------------------------------------------------------------------
  const head = new THREE.Group();
  head.position.set(0, 0.32, 0.72);
  head.rotation.x = 0.06;
  body.add(head);

  addMesh(head, sphere(0.27, 14, 11), mats.fur, [0, 0.02, 0], [0, 0, 0], [0.94, 1, 1.03]);
  addMesh(head, sphere(0.15, 10, 8), mats.fur, [0, -0.11, 0.04], [0, 0, 0], [1.2, 0.9, 0.9]);

  // The blue mask / muzzle from the reference mask.
  addMesh(head, sphere(0.19, 12, 9), mats.mask, [0, -0.035, 0.2], [0, 0, 0], [1.12, 0.95, 0.92]);
  addMesh(head, capsule(0.12, 0.16, 5, 10), mats.mask, [0, -0.04, 0.28], [Math.PI / 2, 0, 0], [1.06, 1, 1]);
  addMesh(head, sphere(0.105, 10, 8), mats.mask, [0, -0.04, 0.4], [0, 0, 0], [1.05, 0.9, 0.9]);

  // Nose
  addMesh(head, sphere(0.068, 10, 8), mats.nose, [0, 0.035, 0.47], [0, 0, 0], [1.15, 0.82, 0.92]);
  addMesh(head, sphere(0.02, 6, 5), mats.metal, [-0.018, 0.06, 0.505], [0, 0, 0], [1, 0.5, 0.5]);

  // Jaw
  const jaw = new THREE.Group();
  jaw.position.set(0, -0.115, 0.19);
  head.add(jaw);
  addMesh(jaw, capsule(0.09, 0.14, 5, 9), mats.maskDark, [0, -0.01, 0.12], [Math.PI / 2, 0, 0], [1.05, 0.8, 1]);
  addMesh(jaw, sphere(0.065, 8, 6), mats.maskDark, [0, -0.01, 0.23], [0, 0, 0], [1.05, 0.62, 0.9]);
  addMesh(jaw, box(0.07, 0.018, 0.14), mats.tongue, [0, 0.055, 0.13], [0.08, 0, 0], [1, 1, 1]);
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 0.052;
    addMesh(jaw, cone(0.017, 0.055, 4), mats.white, [x, 0.045, 0.27], [0, 0, 0], [1, 1, 1]);
  }

  // Upper teeth
  for (let i = 0; i < 4; i++) {
    const x = (i - 1.5) * 0.045;
    addMesh(head, cone(0.018, 0.065, 4), mats.white, [x, -0.105, 0.36], [Math.PI, 0, 0], [1, 1, 1]);
  }

  // Eyes + white brow markings
  for (const side of [-1, 1]) {
    addMesh(head, sphere(0.062, 10, 8), mats.eyeWhite, [side * 0.145, 0.09, 0.19], [0, 0, 0], [1, 1.08, 0.72]);
    addMesh(head, sphere(0.04, 9, 7), mats.iris, [side * 0.155, 0.09, 0.238], [0, 0, 0], [1, 1, 0.55]);
    addMesh(head, sphere(0.019, 7, 6), mats.pupil, [side * 0.158, 0.09, 0.266], [0, 0, 0], [1, 1.1, 0.5]);
    addMesh(head, sphere(0.008, 6, 5), mats.white, [side * 0.168, 0.105, 0.278], [0, 0, 0], [1, 1, 1]);
    addMesh(head, sphere(0.115, 9, 6), mats.white, [side * 0.145, 0.205, 0.185], [0, 0, side * -0.2], [1.05, 0.28, 0.55]);
    // Cheek tuft
    addMesh(head, cone(0.06, 0.2, 5), mats.fur, [side * 0.235, -0.035, 0.07], [0.1, 0, side * -1.35], [1, 1, 1]);
  }

  // Ears
  const ears = [];
  for (const side of [-1, 1]) {
    const ear = new THREE.Group();
    ear.position.set(side * 0.165, 0.245, -0.02);
    ear.rotation.set(-0.12, 0, side * 0.14);
    head.add(ear);
    addMesh(ear, cone(0.1, 0.42, 6), mats.fur, [0, 0.19, 0], [0, 0, 0], [1, 1, 0.72]);
    addMesh(ear, cone(0.058, 0.3, 5), mats.innerEar, [0, 0.16, 0.028], [0, 0, 0], [1, 1, 0.45]);
    ears.push(ear);
  }

  // Top tuft
  addMesh(head, cone(0.055, 0.16, 5), mats.fur, [0, 0.27, 0.03], [-0.4, 0, 0], [1, 1, 1]);

  // Legs ------------------------------------------------------------------
  const legs = {};
  const makeLeg = (key, x, z, front) => {
    const hip = new THREE.Group();
    hip.position.set(x, -0.1, z);
    hip.rotation.x = front ? -0.04 : 0.06;
    body.add(hip);
    const thighR = front ? 0.115 : 0.14;
    addMesh(hip, capsule(thighR, front ? 0.25 : 0.24, 4, 9), mats.fur, [0, -0.17, 0], [0, 0, 0], [1, 1, 0.92]);
    if (!front) addMesh(hip, sphere(0.16, 10, 8), mats.fur, [0, -0.03, -0.01], [0, 0, 0], [1, 0.85, 1.1]);
    const knee = new THREE.Group();
    knee.position.y = -0.37;
    hip.add(knee);
    addMesh(knee, capsule(0.072, 0.25, 4, 8), mats.fur, [0, -0.15, 0.015], [0, 0, 0], [1, 1, 1]);
    const paw = new THREE.Group();
    paw.position.set(0, -0.31, 0.02);
    knee.add(paw);
    addMesh(paw, capsule(0.085, 0.12, 4, 8), mats.fur, [0, -0.015, 0.05], [Math.PI / 2, 0, 0], [1, 0.9, 0.8]);
    addMesh(paw, sphere(0.085, 8, 6), mats.fur, [0, -0.025, 0.09], [0, 0, 0], [1.05, 0.55, 1.1]);
    for (let i = 0; i < 3; i++) {
      addMesh(paw, cone(0.018, 0.07, 4), mats.claw, [(i - 1) * 0.048, -0.045, 0.17], [Math.PI / 2.2, 0, 0], [1, 1, 1]);
    }
    legs[key] = { hip, knee, paw, baseHip: hip.rotation.x };
  };
  makeLeg('FL', -0.265, 0.42, true);
  makeLeg('FR', 0.265, 0.42, true);
  makeLeg('BL', -0.275, -0.43, false);
  makeLeg('BR', 0.275, -0.43, false);

  // Tail ------------------------------------------------------------------
  const tail = [];
  let tailParent = body;
  for (let i = 0; i < 3; i++) {
    const seg = new THREE.Group();
    seg.position.set(0, i === 0 ? 0.12 : 0, i === 0 ? -0.63 : -0.27);
    seg.rotation.x = i === 0 ? -0.55 : -0.12;
    tailParent.add(seg);
    const r = 0.085 - i * 0.018;
    addMesh(seg, capsule(r, 0.24, 4, 8), i === 2 ? mats.mask : mats.fur, [0, 0, -0.13], [Math.PI / 2, 0, 0], [1, 1, 1]);
    tail.push(seg);
    tailParent = seg;
  }

  // Harness / collar ------------------------------------------------------
  if (harness) {
    addMesh(body, torus(0.205, 0.035, 8, 20), mats.pink, [0, 0.255, 0.49], [1.05, 0, 0], [1.05, 0.95, 1]);
    addMesh(body, torus(0.35, 0.03, 8, 22), mats.furLight, [0, 0.02, 0.28], [0, 0, 0], [1.03, 1.02, 1]);
    addMesh(body, box(0.1, 0.025, 0.92), mats.furLight, [0, 0.315, -0.08], [0, 0, 0], [1, 1, 1]);
    addMesh(body, box(0.075, 0.02, 0.34), mats.furLight, [0, 0.13, 0.61], [0.35, 0, 0], [1, 1, 1]);
    // studs
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU;
      addMesh(body, sphere(0.025, 6, 5), mats.metal, [Math.cos(a) * 0.35, 0.02 + Math.sin(a) * 0.35, 0.28], [0, 0, 0], [1, 1, 1]);
    }
    for (let i = 0; i < 4; i++) {
      addMesh(body, sphere(0.022, 6, 5), mats.metal, [0, 0.335, 0.26 - i * 0.2], [0, 0, 0], [1, 1, 1]);
    }
    addMesh(body, torus(0.075, 0.016, 6, 14), mats.metal, [0, -0.22, 0.58], [0.2, 0, 0], [1, 1, 1]);
    addMesh(body, box(0.045, 0.14, 0.045), mats.metal, [0, -0.12, 0.6], [0, 0, 0], [1, 1, 1]);
    addMesh(body, capsule(0.035, 0.08, 4, 8), mats.metal, [0, -0.26, 0.62], [Math.PI / 2, 0, 0], [1, 1, 1]);
  }

  // Animation -------------------------------------------------------------
  let phase = 0;
  let pawTimer = 0;
  let biteTimer = 0;
  let hurtTimer = 0;
  let feedTimer = 0;
  let flash = 0;
  let lastElapsed = 0;
  const baseBodyY = 0.83;

  const setFlash = (amount) => {
    flash = clamp(amount, 0, 1);
    for (let i = 0; i < flashMats.length; i++) {
      const m = flashMats[i];
      if (flash > 0) {
        m.emissive.setHex(0x6a0a04);
        m.emissiveIntensity = flash * 0.8;
      } else {
        m.emissive.setHex(flashBase[i].emissive);
        m.emissiveIntensity = flashBase[i].intensity;
      }
    }
  };

  const rig = {
    root,
    body,
    head,
    jaw,
    ears,
    legs,
    tail,
    mats,
    get pawActive() { return pawTimer > 0; },
    get biteActive() { return biteTimer > 0; },
    get feeding() { return feedTimer > 0; },
    triggerPaw() {
      if (pawTimer > 0) return false;
      pawTimer = PAW_DURATION;
      return true;
    },
    triggerBite() {
      if (biteTimer > 0) return false;
      biteTimer = BITE_DURATION;
      return true;
    },
    triggerHurt() {
      hurtTimer = HURT_DURATION;
      setFlash(1);
    },
    triggerFeed() {
      if (feedTimer <= 0) feedTimer = FEED_DURATION;
    },
    update(dt, elapsed, state = {}) {
      lastElapsed = elapsed;
      const move = clamp(state.speed || 0, 0, 1);
      const sprint = Boolean(state.sprint);
      const freq = sprint ? 14.5 : 8.8;
      phase += dt * (1.8 + move * freq);
      const amp = (0.1 + move * 0.64) * (sprint ? 1.1 : 1);

      pawTimer = Math.max(0, pawTimer - dt);
      biteTimer = Math.max(0, biteTimer - dt);
      hurtTimer = Math.max(0, hurtTimer - dt);
      feedTimer = Math.max(0, feedTimer - dt);

      // Four-legged trot: diagonal pairs move together.
      const legDefs = [
        ['FL', 0],
        ['BR', 0],
        ['FR', Math.PI],
        ['BL', Math.PI],
      ];
      for (const [key, offset] of legDefs) {
        const leg = legs[key];
        const s = Math.sin(phase + offset);
        const c = Math.cos(phase + offset);
        leg.hip.rotation.x = leg.baseHip + s * amp;
        leg.knee.rotation.x = 0.16 + Math.max(0, -c) * 0.62 * move;
        leg.paw.rotation.x = -leg.hip.rotation.x * 0.55 - leg.knee.rotation.x * 0.35;
      }

      // Attack overrides.
      if (pawTimer > 0) {
        const p = 1 - pawTimer / PAW_DURATION;
        const swing = Math.sin(p * Math.PI);
        legs.FR.hip.rotation.x = -0.3 - swing * 1.65;
        legs.FR.hip.rotation.z = -swing * 0.45;
        legs.FR.knee.rotation.x = 0.2 + swing * 0.8;
        body.rotation.y = -swing * 0.2;
        head.rotation.y = swing * 0.18;
      } else {
        legs.FR.hip.rotation.z = 0;
        body.rotation.y = Math.sin(phase) * 0.025 * move;
      }

      if (biteTimer > 0) {
        const p = 1 - biteTimer / BITE_DURATION;
        const lunge = Math.sin(Math.min(1, p * 1.4) * Math.PI);
        head.rotation.x = 0.06 + lunge * 0.48;
        head.position.z = 0.72 + lunge * 0.16;
        head.position.y = 0.32 - lunge * 0.08;
        jaw.rotation.x = Math.sin(p * Math.PI * 2.2) * 0.55 + 0.08;
        body.rotation.x = lunge * 0.06;
      } else {
        head.rotation.x = 0.06 + Math.sin(phase * 2) * 0.022 * move;
        head.position.z = 0.72;
        head.position.y = 0.32;
        jaw.rotation.x = 0.05 + Math.max(0, Math.sin(elapsed * 1.7)) * 0.02;
        body.rotation.x = -0.02 * move;
      }

      if (feedTimer > 0) {
        const p = 1 - feedTimer / FEED_DURATION;
        head.rotation.x = 0.06 + Math.sin(p * Math.PI) * 0.78;
        head.position.y = 0.32 - Math.sin(p * Math.PI) * 0.12;
        jaw.rotation.x = 0.12 + Math.abs(Math.sin(p * Math.PI * 5)) * 0.45;
      }

      if (hurtTimer > 0) {
        const p = hurtTimer / HURT_DURATION;
        body.rotation.z = Math.sin(elapsed * 46) * 0.12 * p;
        setFlash(p * 0.9);
      } else {
        body.rotation.z = Math.sin(phase) * 0.035 * move;
        if (flash > 0) setFlash(Math.max(0, flash - dt * 6));
      }

      body.position.y = baseBodyY + Math.abs(Math.sin(phase)) * 0.045 * move + Math.sin(elapsed * 1.7) * 0.006;
      body.position.z = Math.sin(phase * 2) * 0.012 * move;

      // Tail sway.
      tail[0].rotation.y = Math.sin(elapsed * 2.3 + phase * 0.25) * 0.22 + Math.sin(elapsed * 5.2) * 0.03;
      tail[1].rotation.y = Math.sin(elapsed * 2.8 + 0.7) * 0.2;
      tail[2].rotation.y = Math.sin(elapsed * 3.4 + 1.4) * 0.22;
      tail[0].rotation.x = -0.55 + Math.sin(elapsed * 1.9) * 0.05 - move * 0.12;
      tail[1].rotation.x = -0.12 + Math.sin(elapsed * 2.1 + 0.5) * 0.06;

      // Ears and idle head movement.
      const earTwitch = Math.sin(elapsed * 0.9) * 0.02 + Math.sin(elapsed * 4.7) * 0.012;
      ears[0].rotation.z = 0.14 + earTwitch;
      ears[1].rotation.z = -0.14 - earTwitch;
      ears[0].rotation.x = -0.12 + Math.sin(elapsed * 0.6) * 0.02;
      ears[1].rotation.x = -0.12 + Math.sin(elapsed * 0.7 + 1) * 0.02;

      if (biteTimer <= 0 && feedTimer <= 0) {
        head.rotation.y = Math.sin(elapsed * 0.53) * 0.07 * (1 - move) + (state.lookYaw || 0) * 0.18;
        head.rotation.z = Math.sin(elapsed * 0.41) * 0.025 * (1 - move);
      }

      // Night eyes.
      mats.iris.emissiveIntensity = 0.35 + (state.night || 0) * 1.5;
    },
    dispose() {
      root.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        }
      });
    },
  };

  return rig;
}
