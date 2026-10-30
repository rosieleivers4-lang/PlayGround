import * as THREE from '../vendor/three.module.min.js';

export const ANIMAL_TYPES = {
  rabbit: {
    label: 'Rabbit', prey: true, hp: 26, speed: 6.35, life: 20, score: 80,
    radius: 0.55, height: 0.9, detect: 16, attackRange: 0, damage: 0, xp: 1
  },
  squirrel: {
    label: 'Squirrel', prey: true, hp: 17, speed: 6.9, life: 13, score: 60,
    radius: 0.42, height: 0.7, detect: 15, attackRange: 0, damage: 0, xp: 1
  },
  fawn: {
    label: 'Fawn', prey: true, hp: 56, speed: 5.55, life: 34, score: 150,
    radius: 0.72, height: 1.55, detect: 18, attackRange: 0, damage: 0, xp: 2
  },
  fox: {
    label: 'Fox', prey: false, hp: 46, speed: 6.5, life: 26, score: 180,
    radius: 0.65, height: 0.95, detect: 19, attackRange: 2.3, damage: 7, xp: 2
  },
  boar: {
    label: 'Boar', prey: false, hp: 94, speed: 5.4, life: 38, score: 240,
    radius: 0.95, height: 1.15, detect: 17, attackRange: 2.6, damage: 14, xp: 3
  },
  wolf: {
    label: 'Wolf', prey: false, hp: 78, speed: 6.8, life: 40, score: 280,
    radius: 0.75, height: 1.15, detect: 23, attackRange: 2.5, damage: 12, xp: 3
  },
  stag: {
    label: 'Antlered King', prey: false, hp: 300, speed: 5.9, life: 90, score: 900,
    radius: 1.25, height: 2.5, detect: 27, attackRange: 3.1, damage: 18, xp: 8, boss: true
  }
};

const shadowTexture = (() => {
  let tex;
  return () => {
    if (tex) return tex;
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(48, 48, 2, 48, 48, 48);
    g.addColorStop(0, 'rgba(0,0,0,0.42)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.22)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 96, 96);
    tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };
})();

function makeMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.86,
    metalness: opts.metalness ?? 0.02,
    flatShading: true,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1
  });
}

function m(geo, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  return mesh;
}

function addShadow(root, size) {
  const mesh = m(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
    0, 0.02, 0
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.scale.set(size * 1.7, size * 1.2, 1);
  mesh.renderOrder = 1;
  root.add(mesh);
  return mesh;
}

function addLeg(parent, materials, x, z, hipY, upper, lower, radius, pawScale = 1) {
  const hip = new THREE.Group();
  hip.position.set(x, hipY, z);
  parent.add(hip);
  const upperMesh = m(new THREE.CylinderGeometry(radius, radius * 0.8, upper, 6), materials.body, 0, -upper / 2, 0);
  hip.add(upperMesh);
  const knee = new THREE.Group();
  knee.position.y = -upper;
  hip.add(knee);
  const lowerMesh = m(new THREE.CylinderGeometry(radius * 0.76, radius * 0.55, lower, 6), materials.dark, 0, -lower / 2, 0);
  knee.add(lowerMesh);
  const paw = m(new THREE.SphereGeometry(radius * 0.9 * pawScale, 5, 4), materials.dark, 0, -lower, 0.03);
  paw.scale.set(1.1, 0.55, 1.5);
  knee.add(paw);
  return { hip, knee };
}

function addEar(parent, materials, x, y, z, size, tilt = 0.15, color = null) {
  const ear = new THREE.Group();
  ear.position.set(x, y, z);
  ear.rotation.z = -x > 0 ? -tilt : tilt;
  const outer = m(new THREE.ConeGeometry(size * 0.42, size, 4), color || materials.body, 0, size / 2, 0);
  outer.scale.z = 0.55;
  ear.add(outer);
  const inner = m(new THREE.ConeGeometry(size * 0.24, size * 0.72, 4), materials.inner || materials.belly, 0, size * 0.44, 0.012);
  inner.scale.z = 0.3;
  ear.add(inner);
  parent.add(ear);
  return ear;
}

function addEyes(head, materials, y, z, spread, size) {
  for (const side of [-1, 1]) {
    const socket = m(new THREE.SphereGeometry(size, 6, 5), materials.eye, side * spread, y, z);
    head.add(socket);
    const glint = m(new THREE.SphereGeometry(size * 0.3, 4, 3), materials.glint, side * spread + 0.006, y + size * 0.25, z + size * 0.55);
    head.add(glint);
  }
}

function baseMaterials(palette) {
  return {
    body: makeMat(palette.body),
    dark: makeMat(palette.dark || palette.body),
    belly: makeMat(palette.belly || 0xd6cbb8),
    inner: makeMat(palette.inner || 0xc98f86),
    eye: makeMat(0x08090a, { roughness: 0.25 }),
    glint: makeMat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.4 }),
    horn: makeMat(palette.horn || 0xcdbb96, { roughness: 0.7 }),
    nose: makeMat(0x171313, { roughness: 0.4 })
  };
}

function buildRabbit(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 0.55);

  const torso = m(new THREE.SphereGeometry(0.24, 8, 7), materials.body, 0, 0.34, 0);
  torso.scale.set(1, 1.05, 1.65);
  body.add(torso);
  const chest = m(new THREE.SphereGeometry(0.2, 7, 6), materials.belly, 0, 0.33, 0.22);
  chest.scale.set(0.9, 0.9, 1);
  body.add(chest);

  const head = new THREE.Group();
  head.position.set(0, 0.53, 0.31);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.17, 8, 7), materials.body, 0, 0, 0);
  skull.scale.set(0.95, 1, 1.08);
  head.add(skull);
  const muzzle = m(new THREE.SphereGeometry(0.1, 7, 6), materials.belly, 0, -0.05, 0.14);
  muzzle.scale.set(0.9, 0.75, 1);
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.035, 5, 4), materials.nose, 0, -0.04, 0.23);
  head.add(nose);
  addEyes(head, materials, 0.06, 0.13, 0.095, 0.038);

  const ears = [];
  for (const side of [-1, 1]) {
    const ear = new THREE.Group();
    ear.position.set(side * 0.07, 0.14, -0.02);
    ear.rotation.z = -side * 0.13;
    ear.rotation.x = -0.12;
    const outer = m(new THREE.CapsuleGeometry(0.045, 0.3, 3, 5), materials.body, 0, 0.19, 0);
    outer.scale.set(1, 1, 0.5);
    ear.add(outer);
    const inner = m(new THREE.CapsuleGeometry(0.027, 0.25, 3, 5), materials.inner, 0, 0.19, 0.018);
    inner.scale.set(1, 1, 0.3);
    ear.add(inner);
    head.add(ear);
    ears.push(ear);
  }

  const tail = m(new THREE.SphereGeometry(0.09, 6, 5), materials.belly, 0, 0.37, -0.41);
  body.add(tail);

  const legs = [
    addLeg(body, materials, -0.14, 0.25, 0.28, 0.17, 0.15, 0.045),
    addLeg(body, materials, 0.14, 0.25, 0.28, 0.17, 0.15, 0.045),
    addLeg(body, materials, -0.15, -0.24, 0.3, 0.2, 0.18, 0.055),
    addLeg(body, materials, 0.15, -0.24, 0.3, 0.2, 0.18, 0.055)
  ];

  return { root, body, head, ears, tail, legs, materials, hop: true };
}

function buildSquirrel(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 0.4);

  const torso = m(new THREE.SphereGeometry(0.16, 7, 6), materials.body, 0, 0.3, 0);
  torso.scale.set(0.95, 1.15, 1.4);
  body.add(torso);
  const belly = m(new THREE.SphereGeometry(0.12, 6, 5), materials.belly, 0, 0.27, 0.1);
  belly.scale.set(0.8, 1, 1.1);
  body.add(belly);

  const head = new THREE.Group();
  head.position.set(0, 0.48, 0.2);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.13, 7, 6), materials.body, 0, 0, 0);
  head.add(skull);
  const muzzle = m(new THREE.SphereGeometry(0.07, 6, 5), materials.belly, 0, -0.04, 0.1);
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.025, 4, 3), materials.nose, 0, -0.03, 0.16);
  head.add(nose);
  addEyes(head, materials, 0.04, 0.1, 0.075, 0.03);
  const ears = [];
  for (const side of [-1, 1]) {
    ears.push(addEar(head, materials, side * 0.08, 0.1, 0, 0.12, 0.15));
  }

  const tail = new THREE.Group();
  tail.position.set(0, 0.34, -0.22);
  tail.rotation.x = -0.2;
  body.add(tail);
  let parent = tail;
  for (let i = 0; i < 4; i += 1) {
    const seg = new THREE.Group();
    seg.position.set(0, i === 0 ? 0 : 0.11, i === 0 ? 0 : -0.02);
    seg.rotation.x = -0.32;
    parent.add(seg);
    const puff = m(new THREE.SphereGeometry(0.12 - i * 0.012, 6, 5), i === 3 ? materials.belly : materials.body, 0, 0.05, 0);
    puff.scale.set(0.85, 1.1, 0.8);
    seg.add(puff);
    parent = seg;
  }

  const legs = [
    addLeg(body, materials, -0.1, 0.15, 0.24, 0.13, 0.1, 0.035),
    addLeg(body, materials, 0.1, 0.15, 0.24, 0.13, 0.1, 0.035),
    addLeg(body, materials, -0.11, -0.14, 0.25, 0.16, 0.12, 0.04),
    addLeg(body, materials, 0.11, -0.14, 0.25, 0.16, 0.12, 0.04)
  ];

  return { root, body, head, ears, tail, legs, materials, hop: true };
}

function buildFawn(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 0.85);

  const torso = m(new THREE.SphereGeometry(0.29, 8, 7), materials.body, 0, 0.82, 0);
  torso.scale.set(0.95, 1, 1.55);
  body.add(torso);
  const chest = m(new THREE.SphereGeometry(0.24, 7, 6), materials.body, 0, 0.83, 0.28);
  chest.scale.set(0.9, 1, 1);
  body.add(chest);

  for (let i = 0; i < 10; i += 1) {
    const spot = m(new THREE.SphereGeometry(0.022, 4, 3), materials.belly, (Math.random() - 0.5) * 0.4, 0.99 + Math.random() * 0.06, (Math.random() - 0.5) * 0.75);
    spot.scale.set(1, 0.5, 1.3);
    body.add(spot);
  }

  const neck = m(new THREE.CylinderGeometry(0.12, 0.18, 0.62, 7), materials.body, 0, 1.13, 0.42);
  neck.rotation.x = -0.35;
  body.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 1.44, 0.6);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.16, 7, 6), materials.body, 0, 0, 0);
  skull.scale.set(0.9, 1, 1.15);
  head.add(skull);
  const muzzle = m(new THREE.SphereGeometry(0.11, 6, 5), materials.dark, 0, -0.06, 0.13);
  muzzle.scale.set(0.8, 0.75, 1.2);
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.03, 4, 3), materials.nose, 0, -0.05, 0.24);
  head.add(nose);
  addEyes(head, materials, 0.06, 0.1, 0.12, 0.035);
  const ears = [];
  for (const side of [-1, 1]) {
    ears.push(addEar(head, materials, side * 0.13, 0.12, -0.02, 0.22, 0.6));
  }

  const legs = [
    addLeg(body, materials, -0.18, 0.28, 0.72, 0.42, 0.34, 0.055),
    addLeg(body, materials, 0.18, 0.28, 0.72, 0.42, 0.34, 0.055),
    addLeg(body, materials, -0.19, -0.3, 0.72, 0.44, 0.34, 0.06),
    addLeg(body, materials, 0.19, -0.3, 0.72, 0.44, 0.34, 0.06)
  ];

  return { root, body, head, ears, tail: null, legs, materials, hop: false };
}

function buildFox(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 0.7);

  const torso = m(new THREE.SphereGeometry(0.25, 8, 7), materials.body, 0, 0.6, 0);
  torso.scale.set(0.95, 1, 1.65);
  body.add(torso);
  const chest = m(new THREE.SphereGeometry(0.18, 6, 5), materials.belly, 0, 0.58, 0.27);
  body.add(chest);

  const head = new THREE.Group();
  head.position.set(0, 0.82, 0.42);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.18, 7, 6), materials.body, 0, 0, 0);
  skull.scale.set(1, 0.95, 1.05);
  head.add(skull);
  const muzzle = m(new THREE.ConeGeometry(0.1, 0.28, 6), materials.belly, 0, -0.05, 0.2);
  muzzle.rotation.x = Math.PI / 2;
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.032, 4, 3), materials.nose, 0, -0.05, 0.35);
  head.add(nose);
  addEyes(head, materials, 0.07, 0.06, 0.105, 0.036);
  const ears = [];
  for (const side of [-1, 1]) {
    ears.push(addEar(head, materials, side * 0.1, 0.12, -0.02, 0.26, 0.2));
  }

  const tail = new THREE.Group();
  tail.position.set(0, 0.63, -0.4);
  tail.rotation.x = -0.55;
  body.add(tail);
  let parent = tail;
  for (let i = 0; i < 4; i += 1) {
    const seg = new THREE.Group();
    seg.position.z = i === 0 ? 0 : -0.13;
    seg.rotation.x = i === 0 ? 0 : 0.12;
    parent.add(seg);
    const puff = m(new THREE.SphereGeometry(0.14 - i * 0.015, 6, 5), i === 3 ? materials.belly : materials.body, 0, 0, -0.06);
    puff.scale.set(0.9, 1, 1.2);
    seg.add(puff);
    parent = seg;
  }

  const legs = [
    addLeg(body, materials, -0.16, 0.25, 0.54, 0.3, 0.23, 0.045),
    addLeg(body, materials, 0.16, 0.25, 0.54, 0.3, 0.23, 0.045),
    addLeg(body, materials, -0.17, -0.27, 0.54, 0.32, 0.24, 0.05),
    addLeg(body, materials, 0.17, -0.27, 0.54, 0.32, 0.24, 0.05)
  ];

  return { root, body, head, ears, tail, legs, materials, hop: false };
}

function buildBoar(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 1.1);

  const torso = m(new THREE.SphereGeometry(0.38, 8, 7), materials.body, 0, 0.58, 0);
  torso.scale.set(1, 1.05, 1.5);
  body.add(torso);
  const hump = m(new THREE.SphereGeometry(0.3, 7, 6), materials.body, 0, 0.8, 0.12);
  hump.scale.set(0.9, 0.7, 1.1);
  body.add(hump);

  for (let i = 0; i < 8; i += 1) {
    const spike = m(new THREE.ConeGeometry(0.055, 0.2, 4), materials.dark, (i % 2 ? -1 : 1) * 0.08, 0.92, 0.28 - i * 0.1);
    spike.rotation.x = -0.4;
    body.add(spike);
  }

  const head = new THREE.Group();
  head.position.set(0, 0.62, 0.55);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.27, 7, 6), materials.body, 0, 0, 0);
  skull.scale.set(0.95, 0.9, 1.1);
  head.add(skull);
  const snout = m(new THREE.CylinderGeometry(0.13, 0.17, 0.3, 7), materials.dark, 0, -0.08, 0.27);
  snout.rotation.x = Math.PI / 2;
  head.add(snout);
  const nose = m(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 7), materials.nose, 0, -0.08, 0.43);
  nose.rotation.x = Math.PI / 2;
  head.add(nose);
  addEyes(head, materials, 0.07, 0.05, 0.16, 0.035);
  for (const side of [-1, 1]) {
    const tusk = m(new THREE.ConeGeometry(0.035, 0.22, 5), materials.horn, side * 0.16, -0.14, 0.32);
    tusk.rotation.x = 0.55;
    tusk.rotation.z = side * 0.35;
    head.add(tusk);
    const ear = m(new THREE.ConeGeometry(0.08, 0.16, 4), materials.dark, side * 0.2, 0.16, -0.02);
    ear.rotation.z = -side * 1.1;
    head.add(ear);
  }

  const legs = [
    addLeg(body, materials, -0.24, 0.3, 0.46, 0.25, 0.18, 0.075),
    addLeg(body, materials, 0.24, 0.3, 0.46, 0.25, 0.18, 0.075),
    addLeg(body, materials, -0.25, -0.3, 0.46, 0.26, 0.19, 0.08),
    addLeg(body, materials, 0.25, -0.3, 0.46, 0.26, 0.19, 0.08)
  ];

  return { root, body, head, ears: [], tail: null, legs, materials, hop: false };
}

function buildWolf(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 0.85);

  const torso = m(new THREE.SphereGeometry(0.28, 8, 7), materials.body, 0, 0.65, 0);
  torso.scale.set(0.95, 1, 1.7);
  body.add(torso);
  const chest = m(new THREE.SphereGeometry(0.22, 7, 6), materials.belly, 0, 0.62, 0.32);
  body.add(chest);

  const head = new THREE.Group();
  head.position.set(0, 0.88, 0.5);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.2, 8, 7), materials.body, 0, 0, 0);
  skull.scale.set(0.95, 0.95, 1.1);
  head.add(skull);
  const muzzle = m(new THREE.ConeGeometry(0.105, 0.3, 6), materials.dark, 0, -0.06, 0.22);
  muzzle.rotation.x = Math.PI / 2;
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.035, 4, 3), materials.nose, 0, -0.06, 0.38);
  head.add(nose);
  addEyes(head, materials, 0.08, 0.06, 0.11, 0.038);
  const ears = [];
  for (const side of [-1, 1]) {
    ears.push(addEar(head, materials, side * 0.11, 0.14, -0.02, 0.25, 0.2));
  }

  const tail = new THREE.Group();
  tail.position.set(0, 0.7, -0.48);
  tail.rotation.x = -0.7;
  body.add(tail);
  let parent = tail;
  for (let i = 0; i < 4; i += 1) {
    const seg = new THREE.Group();
    seg.position.z = i === 0 ? 0 : -0.13;
    seg.rotation.x = i === 0 ? 0 : 0.08;
    parent.add(seg);
    const puff = m(new THREE.SphereGeometry(0.1 - i * 0.008, 6, 5), i === 3 ? materials.dark : materials.body, 0, 0, -0.06);
    puff.scale.set(0.85, 0.9, 1.4);
    seg.add(puff);
    parent = seg;
  }

  const legs = [
    addLeg(body, materials, -0.17, 0.28, 0.58, 0.32, 0.26, 0.05),
    addLeg(body, materials, 0.17, 0.28, 0.58, 0.32, 0.26, 0.05),
    addLeg(body, materials, -0.18, -0.3, 0.58, 0.34, 0.27, 0.055),
    addLeg(body, materials, 0.18, -0.3, 0.58, 0.34, 0.27, 0.055)
  ];

  return { root, body, head, ears, tail, legs, materials, hop: false };
}

function buildStag(palette) {
  const materials = baseMaterials(palette);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  addShadow(root, 1.5);

  const torso = m(new THREE.SphereGeometry(0.4, 8, 7), materials.body, 0, 1.05, 0);
  torso.scale.set(1, 1.05, 1.6);
  body.add(torso);
  const chest = m(new THREE.SphereGeometry(0.34, 7, 6), materials.body, 0, 1.02, 0.4);
  body.add(chest);

  const neck = m(new THREE.CylinderGeometry(0.16, 0.24, 0.85, 7), materials.body, 0, 1.5, 0.48);
  neck.rotation.x = -0.3;
  body.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 1.95, 0.72);
  body.add(head);
  const skull = m(new THREE.SphereGeometry(0.2, 7, 6), materials.body, 0, 0, 0);
  skull.scale.set(0.9, 1, 1.15);
  head.add(skull);
  const muzzle = m(new THREE.SphereGeometry(0.13, 6, 5), materials.dark, 0, -0.07, 0.17);
  muzzle.scale.set(0.8, 0.75, 1.25);
  head.add(muzzle);
  const nose = m(new THREE.SphereGeometry(0.035, 4, 3), materials.nose, 0, -0.06, 0.3);
  head.add(nose);
  addEyes(head, materials, 0.07, 0.1, 0.14, 0.04);

  for (const side of [-1, 1]) {
    const ear = addEar(head, materials, side * 0.15, 0.14, -0.03, 0.27, 0.75);
    const antler = new THREE.Group();
    antler.position.set(side * 0.1, 0.2, 0.02);
    antler.rotation.z = side * 0.35;
    head.add(antler);
    const main = m(new THREE.CylinderGeometry(0.022, 0.035, 0.55, 5), materials.horn, 0, 0.25, 0);
    antler.add(main);
    for (let i = 0; i < 3; i += 1) {
      const branch = m(new THREE.CylinderGeometry(0.012, 0.022, 0.25, 4), materials.horn, 0, 0.18 + i * 0.13, 0.04);
      branch.rotation.x = -0.8 + i * 0.2;
      branch.rotation.z = side * (0.55 - i * 0.1);
      antler.add(branch);
    }
    ear.userData.antler = antler;
  }

  const legs = [
    addLeg(body, materials, -0.23, 0.36, 0.95, 0.55, 0.42, 0.065),
    addLeg(body, materials, 0.23, 0.36, 0.95, 0.55, 0.42, 0.065),
    addLeg(body, materials, -0.24, -0.38, 0.95, 0.56, 0.42, 0.07),
    addLeg(body, materials, 0.24, -0.38, 0.95, 0.56, 0.42, 0.07)
  ];

  root.scale.setScalar(1.12);
  return { root, body, head, ears: [], tail: null, legs, materials, hop: false };
}

const BUILDERS = {
  rabbit: buildRabbit,
  squirrel: buildSquirrel,
  fawn: buildFawn,
  fox: buildFox,
  boar: buildBoar,
  wolf: buildWolf,
  stag: buildStag
};

const PALETTES = {
  rabbit: { body: 0x95816a, belly: 0xd9cdb8, dark: 0x6d5b49, inner: 0xd4a49a },
  squirrel: { body: 0xa46b3f, belly: 0xe0c9a6, dark: 0x6d4529, inner: 0xd0a28e },
  fawn: { body: 0xb98b5d, belly: 0xf0e2c9, dark: 0x7f5c3b, inner: 0xc9a09b },
  fox: { body: 0xc96732, belly: 0xf0e5d2, dark: 0x6f3a1e, inner: 0xd9a199 },
  boar: { body: 0x4c3b2c, belly: 0x6d5a45, dark: 0x33261c, inner: 0x8a5a4f, horn: 0xd9c8a2 },
  wolf: { body: 0x70797e, belly: 0xc4c7c2, dark: 0x444b50, inner: 0xb98c87 },
  stag: { body: 0x86603b, belly: 0xd6bd93, dark: 0x5e4128, inner: 0xc79e92, horn: 0xcdbb96 }
};

function makeHealthBar() {
  const group = new THREE.Group();
  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.05, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x050708, transparent: true, opacity: 0.7, depthTest: false })
  );
  bg.renderOrder = 8;
  group.add(bg);
  const fill = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.09),
    new THREE.MeshBasicMaterial({ color: 0x7ae7d6, transparent: true, opacity: 0.95, depthTest: false })
  );
  fill.position.z = 0.002;
  fill.renderOrder = 9;
  group.add(fill);
  group.visible = false;
  group.userData.fill = fill;
  group.userData.bg = bg;
  return group;
}

function makeRing() {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.78, 1, 36),
    new THREE.MeshBasicMaterial({
      color: 0x54e6e0,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.035;
  ring.renderOrder = 2;
  ring.visible = false;
  return ring;
}

function dampAngle(current, target, lambda, dt) {
  let delta = target - current;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return current + delta * (1 - Math.exp(-lambda * dt));
}

export class Animal {
  constructor(type, level, scene, position, options = {}) {
    this.type = type;
    this.config = ANIMAL_TYPES[type];
    this.boss = !!options.boss;
    this.scene = scene;
    this.level = level;
    const healthScale = this.config.prey ? level.preyHealth : level.predatorHealth;
    this.maxHp = Math.round(this.config.hp * healthScale * (this.boss ? 4.2 : 1));
    this.hp = this.maxHp;
    this.alive = true;
    this.downed = false;
    this.eaten = false;
    this.remove = false;
    this.state = 'wander';
    this.stateTimer = 0;
    this.attackCooldown = 1 + Math.random() * 2;
    this.windup = 0;
    this.stamina = 1;
    this.hitFlash = 0;
    this.time = Math.random() * 10;
    this.gait = Math.random() * 6;
    this.yaw = Math.random() * Math.PI * 2;
    this.velocity = new THREE.Vector3();
    this.knockback = new THREE.Vector3();
    this.wanderDir = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.wanderTimer = 0;
    this.highlighted = false;
    this.removeTimer = 0;
    this.fade = 1;

    const built = (BUILDERS[type] || buildRabbit)(PALETTES[type] || PALETTES.rabbit);
    this.parts = built;
    this.root = built.root;
    this.root.position.copy(position);
    this.root.rotation.y = this.yaw;
    if (this.boss) this.root.scale.multiplyScalar(1.05);
    scene.add(this.root);

    this.bar = makeHealthBar();
    scene.add(this.bar);
    this.ring = makeRing();
    this.ring.scale.setScalar(this.config.radius * 1.8);
    scene.add(this.ring);

    this.speed = this.config.speed * (this.config.prey ? level.preySpeed : level.predatorSpeed);
    if (this.boss) this.speed *= 0.94;
  }

  get position() {
    return this.root.position;
  }

  setHighlight(on) {
    this.highlighted = on;
  }

  damage(amount, fromPosition) {
    if (!this.alive || this.downed) return { killed: false, damage: 0 };
    const dealt = Math.min(this.hp, amount);
    this.hp -= dealt;
    this.hitFlash = 0.16;
    if (fromPosition) {
      const away = this.root.position.clone().sub(fromPosition);
      away.y = 0;
      if (away.lengthSq() < 0.001) away.set(0, 0, 1);
      away.normalize().multiplyScalar(this.boss ? 0.9 : 1.8);
      this.knockback.copy(away);
    }
    this.state = this.config.prey ? 'flee' : 'chase';
    this.stateTimer = 0;
    this.stamina = 0.55;

    if (this.hp <= 0) {
      this.hp = 0;
      this.downed = true;
      this.state = 'downed';
      this.windup = 0;
      this.alive = false;
      this.knockback.set(0, 0, 0);
      return { killed: true, damage: dealt };
    }
    return { killed: false, damage: dealt };
  }

  consume() {
    if (!this.downed || this.eaten) return null;
    this.eaten = true;
    this.removeTimer = 0.55;
    const reward = {
      type: this.type,
      label: this.config.label,
      life: this.config.life + (this.boss ? 30 : 0),
      score: this.config.score,
      prey: this.config.prey,
      boss: this.boss
    };
    return reward;
  }

  update(dt, ctx) {
    this.time += dt;
    this.stateTimer += dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt);

    if (this.eaten) {
      this.removeTimer -= dt;
      this.fade = Math.max(0, this.removeTimer / 0.55);
      this.root.scale.setScalar(Math.max(0.001, this.fade));
      this.root.rotation.y += dt * 4;
      this.bar.visible = false;
      this.ring.visible = false;
      if (this.removeTimer <= 0) this.remove = true;
      return;
    }

    if (this.downed) {
      this.updateDowned(dt, ctx);
      this.updateAttachments(ctx.camera);
      return;
    }

    const player = ctx.playerPos;
    const dx = player.x - this.root.position.x;
    const dz = player.z - this.root.position.z;
    const dist = Math.hypot(dx, dz);
    const playerAlive = ctx.playerAlive !== false;

    let moveSpeed = 0;
    let desired = this.wanderDir;

    if (this.config.prey) {
      const detect = this.config.detect + (this.boss ? 6 : 0);
      if (playerAlive && dist < detect) {
        this.state = 'flee';
        const away = new THREE.Vector3(-dx, 0, -dz).normalize();
        const side = new THREE.Vector3(-away.z, 0, away.x).multiplyScalar(Math.sin(this.time * 0.8) * 0.3);
        desired = away.add(side).normalize();
        this.stamina = Math.max(0, this.stamina - dt * 0.085);
        moveSpeed = this.speed * (this.stamina > 0.02 ? 1 : 0.62);
        if (dist < 2.4) moveSpeed *= 1.15;
      } else {
        this.state = 'wander';
        this.stamina = Math.min(1, this.stamina + dt * 0.14);
        this.wanderTimer -= dt;
        if (this.wanderTimer <= 0) {
          this.wanderTimer = 2 + Math.random() * 4;
          const a = Math.random() * Math.PI * 2;
          this.wanderDir.set(Math.sin(a), 0, Math.cos(a));
        }
        desired = this.wanderDir;
        moveSpeed = this.speed * 0.18;
      }
    } else {
      this.attackCooldown = Math.max(0, this.attackCooldown - dt);
      if (this.windup > 0) {
        this.windup -= dt;
        moveSpeed = 0;
        if (this.windup <= 0) {
          const range = this.config.attackRange + 0.8;
          if (dist < range && playerAlive) {
            ctx.damagePlayer(this.config.damage, this);
            if (ctx.onAttack) ctx.onAttack(this, true);
          }
          this.attackCooldown = 1.5 + Math.random() * 0.8;
          this.state = 'chase';
        }
      } else if (playerAlive && dist < this.config.detect) {
        this.state = 'chase';
        desired = new THREE.Vector3(dx, 0, dz).normalize();
        if (dist < this.config.attackRange && this.attackCooldown <= 0) {
          this.windup = 0.42;
          this.state = 'windup';
          if (ctx.onWindup) ctx.onWindup(this);
        }
        moveSpeed = this.speed * (this.windup > 0 ? 0 : 1);
        if (this.boss) moveSpeed *= 1.02;
      } else {
        this.state = 'wander';
        this.wanderTimer -= dt;
        if (this.wanderTimer <= 0) {
          this.wanderTimer = 3 + Math.random() * 4;
          const a = Math.random() * Math.PI * 2;
          this.wanderDir.set(Math.sin(a), 0, Math.cos(a));
        }
        desired = this.wanderDir;
        moveSpeed = this.speed * 0.15;
      }
    }

    if (this.knockback.lengthSq() > 0.001) {
      this.root.position.addScaledVector(this.knockback, dt);
      this.knockback.multiplyScalar(Math.exp(-7 * dt));
    }

    if (moveSpeed > 0 && desired.lengthSq() > 0.0001) {
      this.yaw = dampAngle(this.yaw, Math.atan2(desired.x, desired.z), 7, dt);
      this.root.position.x += Math.sin(this.yaw) * moveSpeed * dt;
      this.root.position.z += Math.cos(this.yaw) * moveSpeed * dt;
      this.gait += dt * (4 + moveSpeed * 1.3);
    } else {
      this.gait += dt * 0.7;
    }

    // Keep animals inside the wild and out of tree trunks.
    const radius = Math.hypot(this.root.position.x, this.root.position.z);
    if (radius > ctx.worldRadius - 2) {
      const inward = new THREE.Vector3(-this.root.position.x, 0, -this.root.position.z).normalize();
      this.root.position.x += inward.x * (radius - ctx.worldRadius + 2);
      this.root.position.z += inward.z * (radius - ctx.worldRadius + 2);
      this.wanderDir.copy(inward);
      this.yaw = Math.atan2(inward.x, inward.z);
    }

    if (ctx.obstacles) {
      for (const ob of ctx.obstacles) {
        const ox = this.root.position.x - ob.x;
        const oz = this.root.position.z - ob.z;
        const d = Math.hypot(ox, oz);
        const min = ob.r + this.config.radius * 0.55;
        if (d < min && d > 0.0001) {
          this.root.position.x += (ox / d) * (min - d);
          this.root.position.z += (oz / d) * (min - d);
        }
      }
    }

    this.root.rotation.y = this.yaw;
    this.animateVisual(dt, moveSpeed);
    this.updateAttachments(ctx.camera);
  }

  updateDowned(dt, ctx) {
    const targetTilt = this.config.radius > 0.9 ? 1.3 : 1.45;
    const targetY = this.config.radius > 0.9 ? 0.5 : 0.3;
    this.root.rotation.z += (targetTilt - this.root.rotation.z) * Math.min(1, dt * 5);
    this.root.position.y += (targetY - this.root.position.y) * Math.min(1, dt * 5);
    this.parts.body.position.y = Math.sin(this.time * 2) * 0.015;
    this.parts.body.rotation.x = 0;
    this.parts.body.rotation.z = 0;
    this.legsRest();
    if (this.parts.tail) this.parts.tail.rotation.x = -0.2;
    this.ring.visible = this.highlighted;
    if (this.highlighted) {
      const pulse = 1 + Math.sin(this.time * 5) * 0.08;
      this.ring.scale.setScalar(this.config.radius * 1.9 * pulse);
      this.ring.material.color.setHex(0xffc45c);
      this.ring.material.opacity = 0.7;
    }
    if (this.bar) {
      this.bar.visible = this.highlighted;
    }
    this.updateBar(ctx.camera);
  }

  legsRest() {
    for (const leg of this.parts.legs) {
      leg.hip.rotation.x *= 0.9;
      leg.knee.rotation.x *= 0.9;
    }
  }

  animateVisual(dt, moveSpeed) {
    const parts = this.parts;
    const moving = moveSpeed > 0.2;
    const speedN = Math.min(1.3, moveSpeed / 6);
    const phase = this.gait;

    if (parts.hop) {
      const hop = moving ? Math.abs(Math.sin(phase)) * (0.12 + speedN * 0.22) : 0;
      parts.body.position.y = hop + (moving ? 0 : Math.sin(this.time * 2.4) * 0.01);
      parts.body.rotation.x = moving ? Math.sin(phase) * 0.12 : 0;
      for (let i = 0; i < parts.legs.length; i += 1) {
        const leg = parts.legs[i];
        const dir = i < 2 ? 1 : -1;
        leg.hip.rotation.x = moving ? Math.sin(phase + (i % 2 ? Math.PI : 0)) * 0.7 * dir : 0;
        leg.knee.rotation.x = moving ? Math.max(0, Math.sin(phase + (i % 2 ? Math.PI : 0))) * 0.7 : 0;
      }
    } else {
      parts.body.position.y = moving ? Math.abs(Math.sin(phase * 2)) * 0.04 * speedN : Math.sin(this.time * 1.7) * 0.01;
      const gait = moving ? 0.55 + speedN * 0.4 : 0;
      for (let i = 0; i < parts.legs.length; i += 1) {
        const leg = parts.legs[i];
        const offset = i === 0 || i === 3 ? 0 : Math.PI;
        const sw = Math.sin(phase + offset);
        leg.hip.rotation.x = sw * gait;
        leg.knee.rotation.x = Math.max(0, -sw) * gait * 0.9;
      }
    }

    if (parts.head) {
      parts.head.rotation.y = Math.sin(this.time * 0.9) * 0.08;
      parts.head.rotation.x = Math.sin(this.time * 1.4) * 0.02;
    }
    if (parts.ears) {
      parts.ears.forEach((ear, i) => {
        ear.rotation.x = -0.1 + Math.sin(this.time * 2 + i) * 0.03;
      });
    }
    if (parts.tail) {
      parts.tail.rotation.y = Math.sin(this.time * (moving ? 7 : 2.5)) * (moving ? 0.22 : 0.12);
    }

    if (this.windup > 0) {
      parts.body.rotation.z = Math.sin(this.time * 55) * 0.035;
      parts.head.rotation.x = -0.25;
      this.setEmissive(0x8a1c0a, 0.7);
    } else if (this.hitFlash > 0) {
      this.setEmissive(0xff4a2a, 0.9);
    } else {
      this.setEmissive(0x000000, 0);
    }

    this.ring.visible = this.highlighted;
    if (this.highlighted) {
      const pulse = 1 + Math.sin(this.time * 5) * 0.08;
      this.ring.scale.setScalar(this.config.radius * 1.8 * pulse);
      this.ring.material.color.setHex(this.config.prey ? 0x54e6e0 : 0xff5d4a);
      this.ring.material.opacity = 0.55;
    }
  }

  setEmissive(color, intensity) {
    for (const key of ['body', 'dark', 'belly']) {
      const material = this.parts.materials[key];
      if (material) {
        material.emissive.setHex(color);
        material.emissiveIntensity = intensity || 1;
      }
    }
  }

  updateAttachments(camera) {
    const height = this.config.height * (this.boss ? 1.1 : 1);
    this.bar.position.set(this.root.position.x, this.root.position.y + height + 0.45, this.root.position.z);
    this.bar.quaternion.copy(camera.quaternion);
    this.ring.position.set(this.root.position.x, 0.035, this.root.position.z);
    const showBar = this.highlighted || (this.hp < this.maxHp && !this.downed);
    this.bar.visible = showBar;
    if (showBar) {
      const ratio = Math.max(0, this.hp / this.maxHp);
      const fill = this.bar.userData.fill;
      fill.scale.x = Math.max(0.001, ratio);
      fill.position.x = -(1 - ratio) * 0.5;
      fill.material.color.setHex(ratio < 0.3 ? 0xff5a44 : this.config.prey ? 0x7ae7d6 : 0xffb04a);
    }
  }

  updateBar(camera) {
    const height = this.config.height * (this.boss ? 1.1 : 1);
    this.bar.position.set(this.root.position.x, this.root.position.y + height + 0.4, this.root.position.z);
    this.bar.quaternion.copy(camera.quaternion);
  }

  dispose() {
    this.scene.remove(this.root);
    this.scene.remove(this.bar);
    this.scene.remove(this.ring);
    const sharedMaterials = new Set(Object.values(this.parts.materials));
    this.root.traverse((child) => {
      if (!child.isMesh) return;
      child.geometry.dispose();
      if (child.material && !sharedMaterials.has(child.material)) child.material.dispose();
    });
    sharedMaterials.forEach((material) => material.dispose());
    this.bar.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    this.ring.geometry.dispose();
    this.ring.material.dispose();
  }
}
