import * as THREE from 'three';
import { clamp, damp, makeCanvas, canvasTexture } from './utils.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function tubeBetween(a, b, radius, material, segments = 8) {
  const dir = b.clone().sub(a);
  const len = dir.length();
  const geo = new THREE.CylinderGeometry(radius, radius * 0.94, len, segments);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  return mesh;
}

function radialGlowTexture(inner = 'rgba(255,213,80,0.9)', outer = 'rgba(255,180,20,0)') {
  const { canvas, ctx } = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, inner.replace(/[\d.]+\)$/, '0.4)'));
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return canvasTexture(canvas);
}

function numberPlateTexture() {
  const { canvas, ctx } = makeCanvas(256, 64);
  ctx.fillStyle = '#f3d24a';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 252, 60);
  ctx.fillStyle = '#101010';
  ctx.font = '800 42px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MB01 CRT', 128, 34);
  return canvasTexture(canvas);
}

export function createRider(textures = {}) {
  const root = new THREE.Group();
  root.name = 'Motorbunny rider';

  const lean = new THREE.Group();
  lean.name = 'Lean';
  root.add(lean);

  const black = new THREE.MeshStandardMaterial({ color: 0x2a3330, roughness: 0.52, metalness: 0.28 });
  const matte = new THREE.MeshStandardMaterial({ color: 0x343d38, roughness: 0.9 });
  const hoodie = new THREE.MeshStandardMaterial({ color: 0x39443a, roughness: 0.88 });
  const denim = new THREE.MeshStandardMaterial({ color: 0x35435a, roughness: 0.9 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x0d0f0e, roughness: 0.98 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffc93c, emissive: 0x5c3500, emissiveIntensity: 0.55, roughness: 0.26, metalness: 0.65 });
  const neon = new THREE.MeshStandardMaterial({ color: 0xe4ff4f, emissive: 0xbfe820, emissiveIntensity: 1.6, roughness: 0.4 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xb6bfbe, roughness: 0.3, metalness: 0.8 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x4a5554, roughness: 0.4, metalness: 0.68 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xc8997b, roughness: 0.85 });
  const pink = new THREE.MeshStandardMaterial({ color: 0xb45d67, roughness: 0.95 });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff3c8,
    emissive: 0xffe8a0,
    emissiveIntensity: 3,
    roughness: 0.2,
  });
  const brakeMat = new THREE.MeshStandardMaterial({
    color: 0xff2a1a,
    emissive: 0xff1608,
    emissiveIntensity: 1.2,
    roughness: 0.35,
  });

  // ---------------- bike ----------------
  const bike = new THREE.Group();
  bike.name = 'Black bike';
  lean.add(bike);

  const wheelRadius = 0.36;
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.16, 18);
  wheelGeo.rotateZ(Math.PI / 2);
  const rimGeo = new THREE.TorusGeometry(wheelRadius * 0.78, 0.026, 6, 20);
  rimGeo.rotateY(Math.PI / 2);
  const spokeGeo = new THREE.BoxGeometry(0.035, wheelRadius * 1.4, 0.045);

  function makeWheel(width = 0.16) {
    const group = new THREE.Group();
    const tyre = new THREE.Mesh(wheelGeo, rubber);
    tyre.scale.x = width / 0.16;
    tyre.castShadow = true;
    group.add(tyre);
    const rim = new THREE.Mesh(rimGeo, gold);
    group.add(rim);
    for (let i = 0; i < 5; i++) {
      const spoke = new THREE.Mesh(spokeGeo, darkSteel);
      spoke.rotation.x = (i / 5) * Math.PI;
      group.add(spoke);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, width + 0.05, 10), gold);
    hub.rotation.z = Math.PI / 2;
    group.add(hub);
    return group;
  }

  const rearWheel = makeWheel(0.2);
  rearWheel.position.set(0, wheelRadius, -0.76);
  bike.add(rearWheel);

  const frontAssembly = new THREE.Group();
  frontAssembly.position.set(0, wheelRadius, 0.84);
  const frontWheel = makeWheel(0.15);
  frontAssembly.add(frontWheel);
  bike.add(frontAssembly);

  // frame + engine
  const engine = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.62), darkSteel);
  engine.position.set(0, 0.56, -0.06);
  engine.castShadow = true;
  bike.add(engine);
  for (const side of [-1, 1]) {
    const caseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.07, 12), steel);
    caseMesh.rotation.z = Math.PI / 2;
    caseMesh.position.set(side * 0.23, 0.54, -0.06);
    bike.add(caseMesh);
  }

  const tank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.66), black);
  tank.position.set(0, 0.9, 0.14);
  tank.castShadow = true;
  bike.add(tank);
  const tankStripe = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.305, 0.6), gold);
  tankStripe.position.set(0, 0.9, 0.16);
  bike.add(tankStripe);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.11, 0.58), matte);
  seat.position.set(0, 0.96, -0.4);
  bike.add(seat);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.52), black);
  tail.position.set(0, 0.87, -0.78);
  tail.rotation.x = 0.08;
  bike.add(tail);

  const fairing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.44, 0.55), black);
  fairing.position.set(0, 0.76, 0.68);
  fairing.rotation.x = -0.18;
  fairing.castShadow = true;
  bike.add(fairing);
  const fairingNeon = new THREE.Mesh(new THREE.BoxGeometry(0.505, 0.035, 0.45), neon);
  fairingNeon.position.set(0, 0.68, 0.72);
  fairingNeon.rotation.x = -0.18;
  bike.add(fairingNeon);

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.24, 0.03),
    new THREE.MeshStandardMaterial({
      color: 0x1d2b2c,
      roughness: 0.05,
      metalness: 0.3,
      transparent: true,
      opacity: 0.72,
    })
  );
  screen.position.set(0, 1.03, 0.82);
  screen.rotation.x = -0.45;
  bike.add(screen);

  const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.105, 12, 8), headlightMat);
  headlight.scale.set(1.25, 0.8, 0.5);
  headlight.position.set(0, 0.77, 0.97);
  bike.add(headlight);
  const glows = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(255,245,200,0.95)', 'rgba(255,220,120,0)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.7,
    })
  );
  glows.scale.set(0.8, 0.8, 1);
  glows.position.set(0, 0.77, 1.05);
  bike.add(glows);

  // fork
  for (const side of [-1, 1]) {
    bike.add(
      tubeBetween(V(side * 0.13, 0.42, 0.9), V(side * 0.09, 1.03, 0.56), 0.032, steel, 6)
    );
  }
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.72, 8), darkSteel);
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 1.06, 0.55);
  bike.add(bar);
  for (const side of [-1, 1]) {
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.15, 8), rubber);
    grip.rotation.z = Math.PI / 2;
    grip.position.set(side * 0.34, 1.06, 0.55);
    bike.add(grip);
    const mirrorStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.2, 5), steel);
    mirrorStem.position.set(side * 0.25, 1.17, 0.5);
    mirrorStem.rotation.z = side * 0.5;
    bike.add(mirrorStem);
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.07, 0.03), darkSteel);
    mirror.position.set(side * 0.31, 1.25, 0.5);
    bike.add(mirror);
  }

  // exhaust
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, 0.78, 10), darkSteel);
  exhaust.rotation.x = Math.PI / 2 - 0.06;
  exhaust.position.set(0.2, 0.45, -0.48);
  exhaust.castShadow = true;
  bike.add(exhaust);
  const exhaustTip = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 10), steel);
  exhaustTip.rotation.x = Math.PI / 2;
  exhaustTip.position.set(0.2, 0.48, -0.88);
  bike.add(exhaustTip);

  // rear light + plate
  const tailLight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.07, 0.04), brakeMat);
  tailLight.position.set(0, 0.94, -1.02);
  bike.add(tailLight);
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.085),
    new THREE.MeshBasicMaterial({ map: numberPlateTexture() })
  );
  plate.position.set(0, 0.76, -1.045);
  plate.rotation.y = Math.PI;
  bike.add(plate);

  // swingarm + pegs
  const swing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.62), darkSteel);
  swing.position.set(0.17, 0.42, -0.42);
  bike.add(swing);
  for (const side of [-1, 1]) {
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.24, 6), steel);
    peg.rotation.z = Math.PI / 2;
    peg.position.set(side * 0.29, 0.44, -0.28);
    bike.add(peg);
  }

  // underglow
  const under = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 2.6),
    new THREE.MeshBasicMaterial({
      map: radialGlowTexture('rgba(255,196,50,0.5)', 'rgba(255,180,20,0)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.55,
    })
  );
  under.rotation.x = -Math.PI / 2;
  under.position.y = 0.015;
  bike.add(under);

  // ---------------- rider ----------------
  const rider = new THREE.Group();
  rider.name = 'Rider';
  lean.add(rider);

  // pelvis / hips
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.26, 0.3), denim);
  hips.position.set(0, 1.04, -0.22);
  hips.castShadow = true;
  rider.add(hips);

  // torso, leaning forward
  const torso = new THREE.Group();
  torso.position.set(0, 1.18, -0.12);
  torso.rotation.x = 0.42;
  rider.add(torso);
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.235, 0.34, 5, 10), hoodie);
  chest.scale.set(1.05, 1, 0.7);
  chest.position.y = 0.2;
  chest.castShadow = true;
  torso.add(chest);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.245, 14, 10), hoodie);
  hood.scale.set(1.12, 0.9, 0.95);
  hood.position.set(0, 0.54, -0.03);
  hood.castShadow = true;
  torso.add(hood);
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.13, 0.04), matte);
  pocket.position.set(0, 0.03, 0.19);
  pocket.rotation.x = -0.05;
  torso.add(pocket);
  for (const side of [-1, 1]) {
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.19, 4), gold);
    string.position.set(side * 0.075, 0.34, 0.235);
    torso.add(string);
    const aglet = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.035, 0.022), gold);
    aglet.position.set(side * 0.075, 0.24, 0.235);
    torso.add(aglet);
  }

  // chest logo, extracted from the reference photo
  if (textures.logo) {
    const logoMat = new THREE.MeshStandardMaterial({
      map: textures.logo,
      transparent: true,
      alphaTest: 0.04,
      emissive: 0xf0ff6a,
      emissiveMap: textures.logo,
      emissiveIntensity: 2.6,
      roughness: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.21), logoMat);
    logo.position.set(0.02, 0.36, 0.222);
    torso.add(logo);
    const backPatch = new THREE.Mesh(
      new THREE.PlaneGeometry(0.34, 0.36),
      new THREE.MeshStandardMaterial({ color: 0x0c110e, roughness: 0.95, side: THREE.DoubleSide })
    );
    backPatch.position.set(0, 0.1, -0.285);
    backPatch.rotation.y = Math.PI;
    torso.add(backPatch);
    const backLogo = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.32), logoMat);
    backLogo.position.set(0, 0.1, -0.292);
    backLogo.rotation.y = Math.PI;
    torso.add(backLogo);
  }

  // gold carrot pendant
  const pendantCone = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.11, 6), gold);
  pendantCone.rotation.x = Math.PI;
  pendantCone.position.set(-0.09, 0.5, 0.24);
  torso.add(pendantCone);
  const pendantLeaf = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.045, 5), neon);
  pendantLeaf.position.set(-0.09, 0.565, 0.24);
  torso.add(pendantLeaf);

  // arms
  const shoulderL = V(-0.28, 0.42, 0.02);
  const elbowL = V(-0.38, 0.33, 0.34);
  const handL = V(-0.34, 0.16, 0.66);
  const shoulderR = V(0.28, 0.42, 0.02);
  const elbowR = V(0.38, 0.33, 0.34);
  const handR = V(0.34, 0.16, 0.66);
  torso.add(tubeBetween(shoulderL, elbowL, 0.078, hoodie));
  torso.add(tubeBetween(shoulderR, elbowR, 0.078, hoodie));
  torso.add(tubeBetween(elbowL, handL, 0.062, hoodie));
  torso.add(tubeBetween(elbowR, handR, 0.062, hoodie));
  // Neon piping keeps the lightning sleeves readable at gameplay distance.
  for (const [side, shoulder, elbow, hand] of [
    [-1, shoulderL, elbowL, handL],
    [1, shoulderR, elbowR, handR],
  ]) {
    const pa = shoulder.clone();
    pa.x += side * 0.055;
    const pb = elbow.clone();
    pb.x += side * 0.06;
    torso.add(tubeBetween(pa, pb, 0.014, neon, 5));
    const pc = elbow.clone();
    pc.x += side * 0.055;
    const pd = hand.clone();
    pd.x += side * 0.05;
    torso.add(tubeBetween(pc, pd, 0.011, neon, 5));
  }
  for (const [side, a, b, tex] of [
    [-1, shoulderL, elbowL, textures.boltLeft],
    [1, shoulderR, elbowR, textures.boltRight],
  ]) {
    if (!tex) continue;
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.04,
      emissive: 0xeaff5e,
      emissiveMap: tex,
      emissiveIntensity: 2.8,
      roughness: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.31), mat);
    plane.position.copy(a).add(b).multiplyScalar(0.5);
    plane.position.x += side * 0.085;
    plane.position.z -= 0.015;
    plane.rotation.y = side * Math.PI * 0.72;
    plane.rotation.z = side * 0.18;
    torso.add(plane);
  }
  for (const [side, p] of [[-1, handL], [1, handR]]) {
    const glove = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), matte);
    glove.scale.set(0.9, 0.8, 1.3);
    glove.position.copy(p);
    torso.add(glove);
  }

  // legs
  const hipL = V(-0.17, 0.95, -0.23);
  const kneeL = V(-0.28, 0.66, 0.08);
  const footL = V(-0.28, 0.43, -0.22);
  const hipR = V(0.17, 0.95, -0.23);
  const kneeR = V(0.28, 0.66, 0.08);
  const footR = V(0.28, 0.43, -0.22);
  for (const [a, b] of [[hipL, kneeL], [hipR, kneeR], [kneeL, footL], [kneeR, footR]]) {
    rider.add(tubeBetween(a, b, 0.09, denim));
  }
  for (const [side, foot] of [[-1, footL], [1, footR]]) {
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.16, 0.32), matte);
    boot.position.copy(foot);
    boot.position.z += 0.05;
    boot.position.y -= 0.02;
    boot.castShadow = true;
    rider.add(boot);
    const bootGold = new THREE.Mesh(new THREE.BoxGeometry(0.175, 0.025, 0.33), gold);
    bootGold.position.copy(boot.position);
    bootGold.position.y += 0.05;
    rider.add(bootGold);
  }

  // head: balaclava, face, bunny ears
  const head = new THREE.Group();
  head.position.set(0, 1.76, 0.04);
  rider.add(head);
  const hoodOuter = new THREE.Mesh(new THREE.SphereGeometry(0.245, 16, 12), hoodie);
  hoodOuter.scale.set(1.04, 1.0, 1.02);
  hoodOuter.castShadow = true;
  head.add(hoodOuter);
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.175, 14, 10), skin);
  face.scale.set(0.82, 1, 0.62);
  face.position.set(0, -0.015, 0.145);
  head.add(face);
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), matte);
  mask.scale.set(0.88, 0.62, 0.55);
  mask.position.set(0, -0.09, 0.15);
  head.add(mask);
  for (const side of [-1, 1]) {
    const eyeWhite = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xf3e9d2, emissive: 0x7a6a3a, emissiveIntensity: 0.5, roughness: 0.4 })
    );
    eyeWhite.position.set(side * 0.058, 0.028, 0.287);
    eyeWhite.scale.set(1, 0.8, 0.5);
    head.add(eyeWhite);
    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.013, 6, 5),
      new THREE.MeshStandardMaterial({ color: 0x1b221c, roughness: 0.2 })
    );
    pupil.position.set(side * 0.058, 0.028, 0.303);
    head.add(pupil);
  }

  // ears — tall, black with pink inner ear
  for (const side of [-1, 1]) {
    const ear = new THREE.Group();
    ear.position.set(side * 0.11, 0.26, -0.02);
    ear.rotation.z = side * -0.16;
    ear.rotation.x = -0.12;
    const outer = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.34, 4, 8), hoodie);
    outer.scale.set(1, 1, 0.6);
    outer.position.y = 0.2;
    outer.castShadow = true;
    ear.add(outer);
    const inner = new THREE.Mesh(new THREE.CapsuleGeometry(0.034, 0.24, 4, 8), pink);
    inner.scale.set(1, 1, 0.25);
    inner.position.set(0, 0.2, 0.045);
    ear.add(inner);
    head.add(ear);
  }

  const earHoop = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 5, 12), gold);
  earHoop.position.set(-0.225, 1.91, 0.03);
  earHoop.rotation.y = Math.PI / 2;
  rider.add(earHoop);

  // Soft rim light anchored to the rider so the black outfit keeps its edge.
  const rim = new THREE.PointLight(0xffd98a, 5.5, 8.5, 2);
  rim.position.set(0, 3.1, -2.4);
  rider.add(rim);

  // hoodie hood bunched behind the neck
  const neckHood = new THREE.Mesh(new THREE.SphereGeometry(0.23, 12, 8), hoodie);
  neckHood.scale.set(1.25, 0.55, 0.7);
  neckHood.position.set(0, 1.5, -0.16);
  rider.add(neckHood);

  // small white bobtail on the jeans
  const tailPom = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshStandardMaterial({ color: 0xd9d2c0, roughness: 1 }));
  tailPom.position.set(0, 1.05, -0.38);
  rider.add(tailPom);

  // ---------------- animation ----------------
  let leanValue = 0;
  let pitch = 0;
  const frontSteer = frontAssembly;

  function update(dt, time, speed, steer, braking, throttle) {
    const targetLean = clamp(-steer * clamp(speed / 11, 0, 1) * 0.52, -0.55, 0.55);
    leanValue = damp(leanValue, targetLean, 6.5, dt);
    lean.rotation.z = leanValue;
    const targetPitch = clamp((throttle ? -0.02 : 0) + (braking ? 0.035 : 0), -0.05, 0.05);
    pitch = damp(pitch, targetPitch + Math.sin(time * 9) * 0.002, 5, dt);
    lean.rotation.x = pitch;
    lean.position.y = Math.sin(time * (3 + speed * 0.2)) * 0.008 * clamp(speed / 8, 0, 1);

    rearWheel.rotation.x += (speed / wheelRadius) * dt;
    frontWheel.rotation.x += (speed / wheelRadius) * dt;
    frontSteer.rotation.y = damp(frontSteer.rotation.y, steer * 0.18, 8, dt);

    rider.rotation.z = leanValue * 0.35;
    rider.rotation.x = damp(rider.rotation.x, braking ? 0.06 : 0, 4, dt);
    head.rotation.y = damp(head.rotation.y, steer * 0.22, 4, dt);
    torso.rotation.z = -leanValue * 0.12;

    brakeMat.emissiveIntensity = braking ? 4.2 : 1.1;
    headlightMat.emissiveIntensity = 3 + Math.sin(time * 7) * 0.1;
  }

  return {
    root,
    lean,
    bike,
    rider,
    wheels: { front: frontWheel, rear: rearWheel },
    frontAssembly,
    materials: { brakeMat, headlightMat },
    update,
  };
}
