import * as THREE from '../vendor/three.module.min.js';

const C = {
  fur: 0x20282a,
  furLight: 0x333d40,
  teal: 0x19a6b8,
  tealDark: 0x0d6f7e,
  tealGlow: 0x49e6f2,
  cream: 0xe9e4d4,
  leather: 0x2b211c,
  leatherLight: 0x4a372d,
  silver: 0xaeb9bd,
  nose: 0x0a0b0c,
  amber: 0xffb44d
};

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.82,
    metalness: opts.metalness ?? 0.04,
    flatShading: opts.flatShading ?? true,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1
  });
}

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
}

function makeShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, 'rgba(0,0,0,0.55)');
  g.addColorStop(0.45, 'rgba(0,0,0,0.32)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let shadowTexture;
function shadowMesh(scaleX = 1.7, scaleZ = 1.05) {
  shadowTexture ||= makeShadowTexture();
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.9
    })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.018;
  m.scale.set(scaleX, scaleZ, 1);
  m.renderOrder = 1;
  return m;
}

function makeLeg(bodyGroup, materials, x, z, front) {
  const hip = new THREE.Group();
  hip.position.set(x, 0.76, z);
  bodyGroup.add(hip);

  if (!front) {
    const thigh = mesh(new THREE.SphereGeometry(0.15, 7, 6), materials.fur, 0, 0.02, 0);
    thigh.scale.set(0.9, 1.25, 1.15);
    hip.add(thigh);
  }

  const upper = mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.36, 6), materials.fur, 0, -0.18, 0);
  hip.add(upper);

  const knee = new THREE.Group();
  knee.position.y = -0.35;
  hip.add(knee);

  const lower = mesh(new THREE.CylinderGeometry(0.055, 0.042, 0.33, 6), materials.fur, 0, -0.16, 0);
  knee.add(lower);

  const paw = mesh(new THREE.SphereGeometry(0.085, 6, 5), materials.paw, 0, -0.335, 0.035);
  paw.scale.set(1.15, 0.55, 1.55);
  knee.add(paw);

  const toe = mesh(new THREE.SphereGeometry(0.028, 5, 4), materials.teal, 0, -0.35, 0.12);
  toe.scale.set(1, 0.5, 1.4);
  knee.add(toe);

  return { hip, knee, paw };
}

function makeEar(materials, side) {
  const ear = new THREE.Group();
  ear.position.set(side * 0.155, 0.31, -0.015);
  ear.rotation.z = -side * 0.17;
  ear.rotation.x = -0.08;

  const outer = mesh(new THREE.ConeGeometry(0.098, 0.47, 4), materials.fur, 0, 0.23, 0);
  outer.scale.z = 0.5;
  ear.add(outer);

  const inner = mesh(new THREE.ConeGeometry(0.062, 0.35, 4), materials.cream, 0, 0.2, 0.022);
  inner.scale.z = 0.32;
  ear.add(inner);

  const tip = mesh(new THREE.ConeGeometry(0.042, 0.16, 4), materials.tealDark, 0, 0.36, 0.01);
  tip.scale.z = 0.36;
  ear.add(tip);

  return ear;
}

function addHarness(bodyGroup, materials) {
  const ring1 = mesh(new THREE.TorusGeometry(0.34, 0.036, 6, 20), materials.leather, 0, 0.84, 0.27);
  ring1.scale.set(1, 1.16, 1);
  bodyGroup.add(ring1);

  const ring2 = mesh(new THREE.TorusGeometry(0.33, 0.03, 6, 20), materials.leather, 0, 0.83, -0.3);
  ring2.scale.set(1, 1.1, 1);
  bodyGroup.add(ring2);

  const spine = mesh(new THREE.BoxGeometry(0.14, 0.035, 0.72), materials.leatherLight, 0, 1.155, -0.01);
  bodyGroup.add(spine);

  const spineGlow = mesh(new THREE.BoxGeometry(0.035, 0.014, 0.54), materials.glow, 0, 1.18, -0.01);
  bodyGroup.add(spineGlow);

  const studGeo = new THREE.SphereGeometry(0.022, 5, 4);
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const s = mesh(studGeo, materials.silver, Math.cos(a) * 0.34, Math.sin(a) * 0.4 + 0.84, 0.29);
    bodyGroup.add(s);
  }

  const collar = mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.075, 10), materials.leather, 0, 1.01, 0.66);
  collar.rotation.x = 0.35;
  bodyGroup.add(collar);

  const ring = mesh(new THREE.TorusGeometry(0.075, 0.016, 5, 12), materials.silver, 0, 0.87, 0.76);
  bodyGroup.add(ring);

  let linkY = 0.76;
  for (let i = 0; i < 4; i += 1) {
    const link = mesh(new THREE.TorusGeometry(0.038, 0.01, 4, 8), materials.silver, 0, linkY, 0.78);
    link.rotation.y = i % 2 === 0 ? 0 : Math.PI / 2;
    link.rotation.x = 0.15;
    bodyGroup.add(link);
    linkY -= 0.062;
  }
}

export function createDog() {
  const materials = {
    fur: mat(C.fur),
    furLight: mat(C.furLight),
    teal: mat(C.teal, { roughness: 0.6, emissive: 0x0a4a55, emissiveIntensity: 0.35 }),
    tealDark: mat(C.tealDark, { roughness: 0.65 }),
    cream: mat(C.cream, { roughness: 0.9 }),
    leather: mat(C.leather, { roughness: 0.72 }),
    leatherLight: mat(C.leatherLight, { roughness: 0.7 }),
    silver: mat(C.silver, { roughness: 0.32, metalness: 0.7 }),
    paw: mat(0x101214, { roughness: 0.9 }),
    nose: mat(C.nose, { roughness: 0.25, metalness: 0.1 }),
    eyeSocket: mat(0x050607, { roughness: 0.25 }),
    iris: mat(C.amber, { roughness: 0.2, emissive: 0xb45c08, emissiveIntensity: 0.8 }),
    pupil: mat(0x000000, { roughness: 0.1 }),
    glint: mat(0xffffff, { roughness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.7 }),
    glow: mat(C.tealGlow, { roughness: 0.3, emissive: C.tealGlow, emissiveIntensity: 1.4 })
  };

  const root = new THREE.Group();
  root.name = 'Tealfang';
  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  const shadow = shadowMesh();
  root.add(shadow);

  // Torso and hips.
  const torso = mesh(new THREE.CapsuleGeometry(0.33, 0.75, 5, 8), materials.fur, 0, 0.82, 0);
  torso.rotation.x = Math.PI / 2;
  torso.scale.set(0.92, 1, 1.04);
  bodyGroup.add(torso);

  const chest = mesh(new THREE.SphereGeometry(0.36, 8, 7), materials.fur, 0, 0.84, 0.35);
  chest.scale.set(1.02, 1.02, 1.08);
  bodyGroup.add(chest);

  const haunch = mesh(new THREE.SphereGeometry(0.34, 8, 7), materials.fur, 0, 0.83, -0.38);
  haunch.scale.set(1, 0.98, 1.1);
  bodyGroup.add(haunch);

  // Teal flank markings keep the black pup readable from the chase camera.
  for (const side of [-1, 1]) {
    const flank = mesh(new THREE.BoxGeometry(0.035, 0.075, 0.5), materials.teal, side * 0.305, 0.9, 0.04);
    flank.rotation.z = side * 0.16;
    flank.rotation.y = side * 0.1;
    bodyGroup.add(flank);

    const hipMark = mesh(new THREE.BoxGeometry(0.032, 0.15, 0.23), materials.teal, side * 0.275, 0.96, -0.42);
    hipMark.rotation.x = 0.16;
    hipMark.rotation.z = side * 0.2;
    bodyGroup.add(hipMark);
  }

  // Neck.
  const neck = mesh(new THREE.CylinderGeometry(0.21, 0.27, 0.5, 7), materials.fur, 0, 1.02, 0.57);
  neck.rotation.x = -0.62;
  bodyGroup.add(neck);

  // Fur spikes along the shoulders.
  for (let i = 0; i < 5; i += 1) {
    const spike = mesh(new THREE.ConeGeometry(0.06, 0.2, 4), materials.furLight, 0, 1.05 + i * 0.008, 0.42 - i * 0.17);
    spike.rotation.x = 0.9;
    spike.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.08;
    bodyGroup.add(spike);
  }

  // Head.
  const head = new THREE.Group();
  head.position.set(0, 1.2, 0.86);
  head.rotation.x = 0.05;
  bodyGroup.add(head);

  const skull = mesh(new THREE.SphereGeometry(0.3, 9, 8), materials.fur, 0, 0.02, 0.02);
  skull.scale.set(0.98, 1.02, 1.04);
  head.add(skull);

  const hood = mesh(new THREE.SphereGeometry(0.315, 8, 7), materials.furLight, 0, 0.075, -0.035);
  hood.scale.set(1.01, 0.98, 1.01);
  head.add(hood);

  // Teal mask panels.
  const muzzle = mesh(new THREE.SphereGeometry(1, 8, 6), materials.teal, 0, -0.055, 0.265);
  muzzle.scale.set(0.2, 0.14, 0.245);
  head.add(muzzle);

  for (const side of [-1, 1]) {
    const cheek = mesh(new THREE.SphereGeometry(1, 7, 6), materials.teal, side * 0.165, -0.055, 0.16);
    cheek.scale.set(0.105, 0.165, 0.205);
    head.add(cheek);

    const brow = mesh(new THREE.BoxGeometry(0.155, 0.045, 0.085), materials.cream, side * 0.125, 0.175, 0.245);
    brow.rotation.z = -side * 0.24;
    brow.rotation.x = -0.18;
    head.add(brow);

    const socket = mesh(new THREE.SphereGeometry(0.066, 7, 6), materials.eyeSocket, side * 0.12, 0.075, 0.245);
    socket.scale.set(1, 1, 0.7);
    head.add(socket);

    const iris = mesh(new THREE.SphereGeometry(0.045, 7, 6), materials.iris, side * 0.12, 0.075, 0.285);
    iris.scale.set(1, 1, 0.5);
    head.add(iris);

    const pupil = mesh(new THREE.SphereGeometry(0.022, 6, 5), materials.pupil, side * 0.12, 0.075, 0.315);
    pupil.scale.set(1, 1, 0.5);
    head.add(pupil);

    const glint = mesh(new THREE.SphereGeometry(0.008, 4, 3), materials.glint, side * 0.105, 0.09, 0.328);
    head.add(glint);

    const ear = makeEar(materials, side);
    head.add(ear);
    head.userData[side === -1 ? 'leftEar' : 'rightEar'] = ear;
  }

  const nose = mesh(new THREE.SphereGeometry(0.075, 7, 6), materials.nose, 0, -0.04, 0.435);
  nose.scale.set(1.12, 0.78, 0.85);
  head.add(nose);

  const mouth = mesh(new THREE.BoxGeometry(0.13, 0.018, 0.03), materials.nose, 0, -0.135, 0.405);
  head.add(mouth);

  const jaw = new THREE.Group();
  jaw.position.set(0, -0.16, 0.18);
  head.add(jaw);
  const jawMesh = mesh(new THREE.BoxGeometry(0.21, 0.08, 0.27), materials.tealDark, 0, -0.025, 0.14);
  jaw.add(jawMesh);
  const chin = mesh(new THREE.BoxGeometry(0.15, 0.05, 0.1), materials.fur, 0, -0.055, 0.13);
  jaw.add(chin);

  addHarness(bodyGroup, materials);

  // Tail.
  const tail = new THREE.Group();
  tail.position.set(0, 0.93, -0.62);
  tail.rotation.x = -0.65;
  bodyGroup.add(tail);

  let tailParent = tail;
  const tailSegments = [];
  for (let i = 0; i < 4; i += 1) {
    const seg = new THREE.Group();
    seg.position.z = i === 0 ? 0 : -0.13;
    seg.rotation.x = i === 0 ? 0.18 : 0.09;
    tailParent.add(seg);
    const radius = 0.068 - i * 0.011;
    const piece = mesh(new THREE.CylinderGeometry(radius * 0.86, radius, 0.15, 6), materials.fur, 0, 0, -0.065);
    piece.rotation.x = Math.PI / 2;
    seg.add(piece);
    tailSegments.push(seg);
    tailParent = seg;
  }
  const tailTip = mesh(new THREE.SphereGeometry(0.055, 5, 4), materials.teal, 0, 0, -0.14);
  tailParent.add(tailTip);

  // Legs: front-left, front-right, back-left, back-right.
  const legs = {
    fl: makeLeg(bodyGroup, materials, -0.23, 0.38, true),
    fr: makeLeg(bodyGroup, materials, 0.23, 0.38, true),
    bl: makeLeg(bodyGroup, materials, -0.24, -0.42, false),
    br: makeLeg(bodyGroup, materials, 0.24, -0.42, false)
  };

  root.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
    }
  });

  const dog = {
    root,
    body: bodyGroup,
    head,
    jaw,
    tail,
    tailSegments,
    legs,
    shadow,
    materials,
    time: 0,
    gait: 0,
    pawTimer: 0,
    biteTimer: 0,
    hurtTimer: 0,
    flashTimer: 0
  };

  return dog;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function triggerPaw(dog) {
  dog.pawTimer = 0.34;
}

export function triggerBite(dog) {
  dog.biteTimer = 0.4;
}

export function triggerHurt(dog) {
  dog.hurtTimer = 0.5;
  dog.flashTimer = 0.16;
}

export function updateDogVisual(dog, dt, state = {}) {
  dog.time += dt;
  dog.pawTimer = Math.max(0, dog.pawTimer - dt);
  dog.biteTimer = Math.max(0, dog.biteTimer - dt);
  dog.hurtTimer = Math.max(0, dog.hurtTimer - dt);
  dog.flashTimer = Math.max(0, dog.flashTimer - dt);

  const moving = !!state.moving;
  const speed = state.speed || 0;
  const speedN = THREE.MathUtils.clamp(speed / 8.5, 0, 1.25);
  const t = dog.time;

  if (moving) dog.gait += dt * (4.2 + speedN * 7.4);
  else dog.gait += dt * 1.1;

  const gait = moving ? 0.62 + speedN * 0.42 : 0;
  const swing = Math.sin(dog.gait);
  const swing2 = Math.sin(dog.gait + Math.PI);

  const legs = dog.legs;
  legs.fl.hip.rotation.x = swing * gait;
  legs.br.hip.rotation.x = swing * gait * 0.92;
  legs.fr.hip.rotation.x = swing2 * gait;
  legs.bl.hip.rotation.x = swing2 * gait * 0.92;

  legs.fl.knee.rotation.x = Math.max(0, -swing) * gait * 0.9;
  legs.br.knee.rotation.x = Math.max(0, -swing) * gait * 0.8;
  legs.fr.knee.rotation.x = Math.max(0, -swing2) * gait * 0.9;
  legs.bl.knee.rotation.x = Math.max(0, -swing2) * gait * 0.8;

  const bob = moving ? Math.abs(Math.sin(dog.gait)) * 0.055 * (0.55 + speedN) : Math.sin(t * 1.8) * 0.012;
  dog.body.position.y = bob;
  dog.body.rotation.z = moving ? Math.sin(dog.gait) * 0.045 * speedN : Math.sin(t * 0.8) * 0.012;
  dog.body.rotation.x = moving ? -0.035 * speedN : 0;
  dog.body.scale.y = 1 + Math.sin(t * 1.6) * 0.008;

  dog.head.rotation.y = Math.sin(t * 0.7) * 0.05 + (state.lookYaw || 0) * 0.25;
  dog.head.rotation.x = 0.05 + (moving ? Math.sin(dog.gait * 2) * 0.03 : Math.sin(t * 1.2) * 0.012);

  const earTwitch = Math.sin(t * 2.3 + 1.7) > 0.985 ? 0.22 : 0;
  if (dog.head.userData.leftEar) dog.head.userData.leftEar.rotation.z = 0.17 + earTwitch;
  if (dog.head.userData.rightEar) dog.head.userData.rightEar.rotation.z = -0.17 - earTwitch * 0.7;

  const wagSpeed = moving ? 7 + speedN * 5 : 3.2;
  const wagAmp = moving ? 0.18 + speedN * 0.12 : 0.22;
  dog.tail.rotation.y = Math.sin(t * wagSpeed) * wagAmp;
  dog.tail.rotation.x = -0.65 + Math.sin(t * 2.2) * 0.08;
  dog.tailSegments.forEach((seg, i) => {
    seg.rotation.y = Math.sin(t * wagSpeed - i * 0.45) * 0.09;
  });

  // Paw swipe overrides the front-right leg.
  if (dog.pawTimer > 0) {
    const p = 1 - dog.pawTimer / 0.34;
    const arc = Math.sin(p * Math.PI);
    legs.fr.hip.rotation.x = -1.75 * arc;
    legs.fr.knee.rotation.x = 0.55 * arc;
    legs.fr.hip.rotation.z = -0.38 * arc;
    dog.body.rotation.x -= 0.06 * arc;
    dog.head.rotation.y -= 0.2 * arc;
  } else {
    legs.fr.hip.rotation.z = 0;
  }

  // Bite overrides head and jaw.
  if (dog.biteTimer > 0) {
    const p = 1 - dog.biteTimer / 0.4;
    const lunge = Math.sin(p * Math.PI);
    dog.head.rotation.x = 0.05 + 0.55 * lunge;
    dog.jaw.rotation.x = 0.7 * lunge;
    dog.body.position.z = 0.12 * lunge;
    dog.body.rotation.x = -0.08 * lunge;
  } else {
    dog.jaw.rotation.x = 0.05 + Math.sin(t * 1.4) * 0.02;
    dog.body.position.z = 0;
  }

  if (dog.flashTimer > 0) {
    const k = dog.flashTimer / 0.16;
    for (const key of ['fur', 'furLight', 'teal', 'cream']) {
      dog.materials[key].emissive.setRGB(0.55 * k, 0.06 * k, 0.03 * k);
      dog.materials[key].emissiveIntensity = 1;
    }
  } else {
    dog.materials.fur.emissive.setHex(0x000000);
    dog.materials.furLight.emissive.setHex(0x000000);
    dog.materials.teal.emissive.setHex(0x0a4a55);
    dog.materials.teal.emissiveIntensity = 0.35;
    dog.materials.cream.emissive.setHex(0x000000);
  }

  dog.shadow.position.y = 0.018 - bob;
  dog.shadow.material.opacity = state.inAir ? 0.3 : 0.85;
}

export function disposeDog(dog) {
  dog.root.removeFromParent();
  dog.root.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
    }
  });
  Object.values(dog.materials).forEach((m) => m.dispose());
  dog.shadow.material.map?.dispose();
  dog.shadow.material.dispose();
}

export { easeOutCubic };
