import * as THREE from 'three';
import { clamp, damp } from './util.js';

const G = {
  spheres: new Map(),
  cones: new Map(),
  cyls: new Map(),
  caps: new Map(),
};
const sphereGeo = (r, seg = 12) => {
  const key = `${r.toFixed(3)}_${seg}`;
  if (!G.spheres.has(key)) G.spheres.set(key, new THREE.SphereGeometry(r, seg, Math.max(6, seg - 4)));
  return G.spheres.get(key);
};
const coneGeo = (r, h, seg = 8) => {
  const key = `${r.toFixed(3)}_${h.toFixed(3)}_${seg}`;
  if (!G.cones.has(key)) G.cones.set(key, new THREE.ConeGeometry(r, h, seg));
  return G.cones.get(key);
};
const cylGeo = (rt, rb, h, seg = 8) => {
  const key = `${rt.toFixed(3)}_${rb.toFixed(3)}_${h.toFixed(3)}_${seg}`;
  if (!G.cyls.has(key)) G.cyls.set(key, new THREE.CylinderGeometry(rt, rb, h, seg));
  return G.cyls.get(key);
};
const capGeo = (r, l, seg = 8) => {
  const key = `${r.toFixed(3)}_${l.toFixed(3)}_${seg}`;
  if (!G.caps.has(key)) G.caps.set(key, new THREE.CapsuleGeometry(r, l, 4, seg));
  return G.caps.get(key);
};

function mat(color, roughness = .82, metalness = .02) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}
function add(parent, geo, material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

const KINDS = {
  rabbit: {
    label: 'Rabbit', bodyR: .19, stretch: 1.55, leg: .22, headR: .155, neck: .17,
    color: 0xb7a48c, belly: 0xded2bd, eye: 0x2a1610, ear: 'long', earLen: .52, tail: 'puff',
    speed: 4.8, hp: 22, prey: true, heal: 20, height: .72
  },
  hare: {
    label: 'Hare', bodyR: .18, stretch: 1.65, leg: .27, headR: .15, neck: .18,
    color: 0x9b8a72, belly: 0xd2c5ad, eye: 0x2b150d, ear: 'long', earLen: .62, tail: 'puff',
    speed: 6.0, hp: 18, prey: true, heal: 17, height: .8
  },
  fawn: {
    label: 'Fawn', bodyR: .28, stretch: 1.6, leg: .55, headR: .19, neck: .34,
    color: 0xa97850, belly: 0xd7b48b, eye: 0x1d1108, ear: 'fawn', earLen: .24, tail: 'small', spots: true,
    speed: 5.6, hp: 42, prey: true, heal: 34, height: 1.25
  },
  fox: {
    label: 'Fox', bodyR: .22, stretch: 1.75, leg: .38, headR: .18, neck: .23,
    color: 0xaa5429, belly: 0xe7d6b8, eye: 0xffb23d, ear: 'point', earLen: .22, tail: 'bushy',
    speed: 5.9, hp: 48, prey: false, damage: 10, height: .9
  },
  boar: {
    label: 'Boar', bodyR: .38, stretch: 1.45, leg: .35, headR: .27, neck: .18,
    color: 0x3b332c, belly: 0x554738, eye: 0xff8e3c, ear: 'round', earLen: .12, tail: 'small', tusks: true, mane: true,
    speed: 5.2, hp: 105, prey: false, damage: 18, height: 1.15
  },
  wolf: {
    label: 'Wolf', bodyR: .26, stretch: 1.85, leg: .5, headR: .23, neck: .28,
    color: 0x6a6d70, belly: 0xaaa79e, eye: 0xffd066, ear: 'point', earLen: .19, tail: 'bushy',
    speed: 6.8, hp: 88, prey: false, damage: 15, height: 1.18
  },
  bear: {
    label: 'Bear', bodyR: .46, stretch: 1.45, leg: .52, headR: .33, neck: .2,
    color: 0x3e2d24, belly: 0x5f4637, eye: 0xffa545, ear: 'round', earLen: .15, tail: 'tiny', claws: true,
    speed: 5.6, hp: 210, prey: false, damage: 26, height: 1.55
  },
  shadow: {
    label: 'Shadow Wolf', bodyR: .28, stretch: 1.9, leg: .52, headR: .24, neck: .3,
    color: 0x10121a, belly: 0x282837, eye: 0x62ffff, ear: 'point', earLen: .21, tail: 'bushy', glow: true,
    speed: 7.1, hp: 120, prey: false, damage: 19, height: 1.22
  }
};

export function creatureStats(kind) { return KINDS[kind] || KINDS.rabbit; }

export function createCreature(kind = 'rabbit', options = {}) {
  const K = KINDS[kind] || KINDS.rabbit;
  const scale = options.scale || 1;
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const fur = mat(K.color, .9);
  const belly = mat(K.belly, .92);
  const dark = mat(0x171311, .75);
  const eye = new THREE.MeshStandardMaterial({ color: K.eye, emissive: K.eye, emissiveIntensity: K.glow ? 1.2 : .35, roughness: .25 });
  const pupil = new THREE.MeshStandardMaterial({ color: 0x020202, roughness: .08 });
  const tooth = mat(0xe8dfc4, .4);
  const pink = mat(0xb56a70, .65);

  const br = K.bodyR;
  const legLen = K.leg;
  const stretch = K.stretch;
  body.position.y = legLen + br * .74;

  const torso = add(body, sphereGeo(br, 14), fur, 0, 0, 0, 0, 0, 0, 1.02, .9, stretch);
  add(body, sphereGeo(br * .88, 12), belly, 0, -br * .24, 0, 0, 0, 0, 1, .55, stretch * .9);
  const shoulder = add(body, sphereGeo(br * .8, 12), fur, 0, br * .1, br * .68, 0, 0, 0, 1, 1, .9);
  if (K.mane) add(body, sphereGeo(br * .5, 10), dark, 0, br * .58, br * .45, 0, 0, 0, .8, .8, 1.2);

  const neckPivot = new THREE.Group();
  neckPivot.position.set(0, br * .45, br * stretch * .78);
  body.add(neckPivot);
  const neck = add(neckPivot, cylGeo(br * .4, br * .55, K.neck, 9), fur, 0, K.neck * .4, 0, .35);
  const head = new THREE.Group();
  head.position.set(0, K.neck * .82, br * .3);
  neckPivot.add(head);
  add(head, sphereGeo(K.headR, 14), fur, 0, 0, 0, 0, 0, 0, 1, .95, 1.05);
  const snout = add(head, sphereGeo(K.headR * .64, 10), K.prey ? belly : fur, 0, -K.headR * .17, K.headR * .75, 0, 0, 0, 1, .85, 1.35);
  add(head, sphereGeo(K.headR * .18, 8), dark, 0, -K.headR * .1, K.headR * 1.38, 0, 0, 0, 1.2, .8, .8);
  if (K.prey) add(head, sphereGeo(K.headR * .1, 6), pink, 0, -K.headR * .37, K.headR * 1.38);

  // eyes
  for (const side of [-1, 1]) {
    add(head, sphereGeo(K.headR * .16, 8), eye, side * K.headR * .36, K.headR * .15, K.headR * .76, 0, 0, 0, 1, 1, .7);
    add(head, sphereGeo(K.headR * .075, 6), pupil, side * K.headR * .36, K.headR * .15, K.headR * .91, 0, 0, 0, .7, 1, .6);
    // ear placement
    const earPivot = new THREE.Group();
    earPivot.position.set(side * K.headR * .52, K.headR * .66, -.03);
    earPivot.rotation.z = side * (K.ear === 'long' ? -.14 : -.25);
    earPivot.rotation.x = K.ear === 'long' ? -.22 : -.08;
    head.add(earPivot);
    if (K.ear === 'long') {
      const outer = add(earPivot, capGeo(K.headR * .22, K.earLen, 7), fur, 0, K.earLen * .35, 0);
      outer.scale.set(.7, 1, .4);
      add(earPivot, capGeo(K.headR * .13, K.earLen * .82, 6), pink, 0, K.earLen * .36, K.headR * .1);
    } else if (K.ear === 'round') {
      add(earPivot, sphereGeo(K.headR * .3, 9), fur, 0, K.earLen * .15, 0, 0, 0, 0, 1, .95, .45);
      add(earPivot, sphereGeo(K.headR * .17, 7), pink, 0, K.earLen * .15, K.headR * .08, 0, 0, 0, 1, .9, .3);
    } else {
      const outer = add(earPivot, coneGeo(K.headR * .3, K.earLen * 1.55, 4), fur, 0, K.earLen * .4, 0, 0, Math.PI / 4, 0);
      outer.scale.set(.9, 1, .45);
      add(earPivot, coneGeo(K.headR * .16, K.earLen * 1.1, 4), pink, 0, K.earLen * .4, K.headR * .08, 0, Math.PI / 4, 0);
    }
  }

  if (K.tusks) {
    for (const side of [-1, 1]) {
      const tusk = add(head, coneGeo(.045, .23, 6), tooth, side * .15, -.16, .55, 1.95, 0, side * .2);
    }
  }
  if (K.claws) {
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) add(head, coneGeo(.018, .06, 4), tooth, side * (.22 + i * .04), -.3, .45, 1.8);
    }
  }
  if (K.spots) {
    for (let i = 0; i < 7; i++) {
      add(body, sphereGeo(.025, 5), belly, (i % 2 ? -1 : 1) * br * (.3 + (i % 3) * .13), br * .3, -.4 + i * .11, 0, 0, 0, 1, .3, 1);
    }
  }
  if (K.glow) {
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x4fe7f0, emissive: 0x2bd8ee, emissiveIntensity: 1.4, roughness: .3 });
    for (let i = 0; i < 3; i++) {
      add(body, new THREE.TorusGeometry(br * (.32 + i * .02), .012, 5, 14, Math.PI * .85), glowMat, 0, br * .1, -.35 + i * .33, Math.PI / 2, 0, .5);
    }
    add(head, new THREE.TorusGeometry(K.headR * .32, .008, 4, 12, Math.PI * .6), glowMat, 0, .08, .02, 0, 0, 2.7);
  }

  // tail
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, br * .2, -br * stretch * .92);
  body.add(tailPivot);
  if (K.tail === 'puff') {
    add(tailPivot, sphereGeo(br * .24, 8), belly, 0, 0, -.08);
  } else if (K.tail === 'bushy') {
    let p = tailPivot;
    for (let i = 0; i < 3; i++) {
      const seg = new THREE.Group();
      seg.position.z = i === 0 ? -.08 : -.18;
      seg.rotation.x = i === 0 ? .45 : .16;
      tailPivot.add(seg);
      add(seg, sphereGeo(br * (.2 - i * .03), 8), i === 2 ? belly : fur, 0, 0, -.1, 0, 0, 0, 1, .9, 1.7);
      p = seg;
    }
    tailPivot.rotation.x = .3;
  } else if (K.tail === 'tiny') {
    add(tailPivot, sphereGeo(br * .14, 7), fur, 0, 0, 0);
  } else {
    add(tailPivot, capGeo(br * .06, br * .4, 5), fur, 0, 0, -.12, Math.PI / 2);
  }

  // legs
  const legs = [];
  const defs = [
    { x: -.48, z: .62, front: true },
    { x: .48, z: .62, front: true },
    { x: -.52, z: -.58, front: false },
    { x: .52, z: -.58, front: false }
  ];
  for (const def of defs) {
    const hip = new THREE.Group();
    hip.position.set(def.x * br, -br * .35, def.z * br * stretch * .62);
    body.add(hip);
    const upperLen = legLen * .55;
    const lowerLen = legLen * .48;
    const legR = br * (def.front ? .22 : .28);
    add(hip, capGeo(legR, upperLen, 6), fur, 0, -upperLen * .52, 0);
    const knee = new THREE.Group();
    knee.position.y = -upperLen;
    hip.add(knee);
    add(knee, cylGeo(legR * .72, legR * .6, lowerLen, 6), fur, 0, -lowerLen * .5, 0);
    const paw = add(knee, sphereGeo(legR * 1.15, 8), dark, 0, -lowerLen - .015, .035, 0, 0, 0, 1, .55, 1.25);
    if (K.claws) {
      for (let i = 0; i < 3; i++) add(knee, coneGeo(.022, .08, 4), tooth, (i - 1) * legR * .6, -lowerLen - .03, legR * 1.2, Math.PI / 2.2);
    }
    legs.push({ hip, knee, front: def.front, paw });
  }

  const state = { phase: Math.random() * 9, time: Math.random() * 5, dead: false, deadT: 0, hurtT: 0, move: 0, hop: 0 };
  const baseY = root.position.y;
  const eyes = [eye];
  function update(dt, opts = {}) {
    state.time += dt;
    const speed = opts.speed || 0;
    state.move = damp(state.move, clamp(speed / 4.5, 0, 1.4), 8, dt);
    state.phase += dt * (speed * 1.7 + 1.1);
    state.hurtT = Math.max(0, state.hurtT - dt);
    if (state.dead) {
      state.deadT = Math.min(1, state.deadT + dt * 2.4);
      root.rotation.z = -state.deadT * 1.38;
      body.position.y = legLen + br * .74 - state.deadT * br * .35;
      return;
    }
    const p = state.phase;
    const mv = state.move;
    const isHop = kind === 'rabbit' || kind === 'hare';
    if (isHop) {
      const hop = Math.max(0, Math.sin(p * 1.6)) * mv;
      body.position.y = legLen + br * .74 + hop * br * .5;
      state.hop = hop;
      for (let i = 0; i < 4; i++) {
        const l = legs[i];
        if (i >= 2) {
          l.hip.rotation.x = -hop * .7 + Math.sin(p * 1.6) * .18 * mv;
          l.knee.rotation.x = hop * 1.1;
        } else {
          l.hip.rotation.x = hop * .25;
          l.knee.rotation.x = -.2 * hop;
        }
      }
    } else {
      body.position.y = legLen + br * .74 + Math.abs(Math.sin(p)) * .025 * mv;
      for (let i = 0; i < 4; i++) {
        const l = legs[i];
        const off = i === 0 || i === 3 ? 0 : Math.PI;
        const s = Math.sin(p + off);
        const c = Math.cos(p + off);
        l.hip.rotation.x = s * .66 * mv;
        l.knee.rotation.x = Math.max(0, -c) * .45 * mv;
      }
    }
    body.rotation.z = Math.sin(p) * .02 * mv;
    neckPivot.rotation.x = -.05 + Math.sin(state.time * 1.4) * .03 + mv * .05;
    head.rotation.x = Math.sin(state.time * 1.2) * .03 + mv * .04;
    head.rotation.y = Math.sin(state.time * .55) * .12 * (1 - mv);
    tailPivot.rotation.y = Math.sin(state.time * 4.2) * (.1 + mv * .2);
    if (K.tail === 'bushy') tailPivot.rotation.x = .3 + Math.sin(state.time * 2) * .1;
    if (state.hurtT > 0) {
      const k = state.hurtT / .22;
      body.position.x = (Math.random() - .5) * .05 * k;
      for (const e of eyes) e.emissiveIntensity = 1.8 * k;
    } else {
      body.position.x = 0;
      for (const e of eyes) e.emissiveIntensity = K.glow ? 1.2 : .35;
    }
  }
  function hurt() { state.hurtT = .22; }
  function die() { state.dead = true; state.deadT = 0; root.rotation.z = 0; }

  root.scale.setScalar(scale);
  const group = root;
  return {
    group, body, head, state, stats: K, kind,
    update, hurt, die,
    get height() { return K.height * scale; },
    setNight(n) {
      for (const e of eyes) e.emissiveIntensity = (K.glow ? 1.2 : .35) + n * (K.prey ? .05 : .5);
    },
    dispose() {
      // shared geometries and per-creature materials
      const mats = new Set();
      root.traverse(o => {
        if (o.material) mats.add(o.material);
      });
      for (const m of mats) m.dispose?.();
    }
  };
}

export const PREY_KINDS = ['rabbit', 'hare', 'fawn'];
export const PREDATOR_KINDS = ['fox', 'boar', 'wolf', 'bear', 'shadow'];
