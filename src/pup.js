import * as THREE from 'three';
import { clamp, damp } from './util.js';

function furTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#808080';
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 440; i++) {
    const x = Math.random() * 128, y = Math.random() * 128;
    const len = 2 + Math.random() * 7;
    const v = Math.floor(90 + Math.random() * 80);
    g.strokeStyle = `rgba(${v},${v},${v},.35)`;
    g.lineWidth = .7;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (Math.random() - .5) * 2, y + len);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  return t;
}

function mesh(geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function sphere(r, mat, seg = 16) { return new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)); }

export function createPup() {
  const root = new THREE.Group();
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = 0.92;
  root.add(bodyGroup);

  const furTex = furTexture();
  const fur = new THREE.MeshStandardMaterial({ color: 0x20232b, roughness: .7, metalness: .04, bumpMap: furTex, bumpScale: .018 });
  const fur2 = new THREE.MeshStandardMaterial({ color: 0x292c35, roughness: .74, bumpMap: furTex, bumpScale: .014 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x27b8cf, roughness: .42, metalness: .08, emissive: 0x06333b, emissiveIntensity: .5 });
  const blueDark = new THREE.MeshStandardMaterial({ color: 0x177d91, roughness: .48, metalness: .08 });
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x07080b, roughness: .18, metalness: .12 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffb449, emissive: 0xcb6414, emissiveIntensity: .65, roughness: .25 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x050403, roughness: .1 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xdcd8ca, roughness: .72 });
  const leather = new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: .52, metalness: .15 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xaeb6b8, roughness: .28, metalness: .92 });
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x2b0d10, roughness: .65 });
  const toothMat = new THREE.MeshStandardMaterial({ color: 0xe8e0cd, roughness: .35 });

  // torso
  const torso = mesh(new THREE.CapsuleGeometry(.39, .78, 8, 18), fur, 0, .09, -.02, Math.PI / 2);
  torso.scale.set(1.1, 1, 1);
  bodyGroup.add(torso);
  const chest = mesh(sphere(.4, fur, 18), fur, 0, .08, .36);
  chest.scale.set(1.06, 1.06, .96);
  bodyGroup.add(chest);
  const rump = mesh(sphere(.37, fur, 18), fur, 0, .05, -.45);
  rump.scale.set(1.02, .98, 1.05);
  bodyGroup.add(rump);
  // chest ruff
  const ruff = mesh(sphere(.29, fur2, 12), fur2, 0, -.08, .55);
  ruff.scale.set(1.1, 1.25, .8);
  bodyGroup.add(ruff);

  // neck & head
  const neckPivot = new THREE.Group();
  neckPivot.position.set(0, .2, .5);
  bodyGroup.add(neckPivot);
  const neck = mesh(new THREE.CylinderGeometry(.2, .27, .4, 12), fur, 0, .12, .06, 0.8);
  neckPivot.add(neck);

  const head = new THREE.Group();
  head.position.set(0, .38, .2);
  neckPivot.add(head);

  const cranium = mesh(sphere(.3, fur, 20), fur, 0, .04, 0);
  cranium.scale.set(.98, .98, 1.12);
  head.add(cranium);
  const cheekL = mesh(sphere(.19, fur, 12), fur, -.17, -.06, .12);
  cheekL.scale.set(.8, 1, 1.15);
  head.add(cheekL);
  const cheekR = cheekL.clone();
  cheekR.position.x = .17;
  head.add(cheekR);

  // blue muzzle mask
  const muzzle = mesh(sphere(.245, blue, 18), blue, 0, -.075, .27);
  muzzle.scale.set(1.14, .78, 1.3);
  head.add(muzzle);
  const muzzleBridge = mesh(sphere(.15, blue, 14), blue, 0, .02, .31);
  muzzleBridge.scale.set(1.0, .62, 1.45);
  head.add(muzzleBridge);
  // black nose
  const nose = mesh(sphere(.098, noseMat, 16), noseMat, 0, -.015, .57);
  nose.scale.set(1.22, .85, .88);
  head.add(nose);
  const noseGlint = mesh(sphere(.019, whiteMat, 8), whiteMat, -.035, .025, .635);
  noseGlint.material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .5 });
  head.add(noseGlint);

  // lower jaw
  const jawPivot = new THREE.Group();
  jawPivot.position.set(0, -.19, .24);
  head.add(jawPivot);
  const jaw = mesh(sphere(.19, blueDark, 14), blueDark, 0, -.015, .17);
  jaw.scale.set(1.18, .45, 1.18);
  jawPivot.add(jaw);
  const chin = mesh(sphere(.13, fur, 12), fur, 0, -.08, .12);
  chin.scale.set(1.0, .55, 1.1);
  jawPivot.add(chin);
  const mouth = mesh(new THREE.BoxGeometry(.23, .022, .22), mouthMat, 0, .03, .31);
  jawPivot.add(mouth);
  for (let i = 0; i < 3; i++) {
    const tooth = mesh(new THREE.ConeGeometry(.018, .055, 5), toothMat, -.075 + i * .075, .075, .37, Math.PI, 0, 0);
    jawPivot.add(tooth);
  }
  // tongue
  const tongue = mesh(sphere(.07, new THREE.MeshStandardMaterial({ color: 0xc25565, roughness: .55 }), 8), new THREE.MeshStandardMaterial({ color: 0xc25565, roughness: .55 }), 0, .005, .27);
  tongue.scale.set(1, .25, 1.4);
  jawPivot.add(tongue);

  // eyes
  for (const side of [-1, 1]) {
    const eyeSocket = mesh(sphere(.11, fur, 12), fur, side * .145, .1, .215);
    eyeSocket.scale.set(1, 1, .72);
    eyeSocket.rotation.y = side * .18;
    head.add(eyeSocket);
    const eye = mesh(sphere(.058, eyeMat, 14), eyeMat, side * .143, .105, .285);
    eye.scale.set(.9, 1, .72);
    head.add(eye);
    const pupil = mesh(sphere(.027, pupilMat, 10), pupilMat, side * .143, .108, .335);
    pupil.scale.set(.6, 1.1, .5);
    head.add(pupil);
    const glint = mesh(sphere(.012, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 }), 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 }), side * .127, .137, .355);
    head.add(glint);
    // expressive white brow from the mask
    const brow = mesh(sphere(.095, whiteMat, 12), whiteMat, side * .145, .195, .235);
    brow.scale.set(1.1, .3, .52);
    brow.rotation.z = side * -.18;
    head.add(brow);
    // ear
    const earPivot = new THREE.Group();
    earPivot.position.set(side * .19, .27, -.015);
    earPivot.rotation.z = side * -.14;
    earPivot.rotation.x = -.05;
    head.add(earPivot);
    const ear = mesh(new THREE.ConeGeometry(.105, .6, 4), fur, 0, .27, 0, 0, Math.PI / 4, 0);
    ear.scale.set(1.2, 1, .55);
    earPivot.add(ear);
    const innerEar = mesh(new THREE.ConeGeometry(.058, .42, 4), blueDark, 0, .27, .026, 0, Math.PI / 4, 0);
    innerEar.scale.set(1, 1, .38);
    earPivot.add(innerEar);
    earPivot.userData.side = side;
  }

  // collar and harness
  const collar = mesh(new THREE.TorusGeometry(.235, .034, 8, 24), leather, 0, .25, .0);
  collar.rotation.x = -.16;
  head.add(collar);
  const ring = mesh(new THREE.TorusGeometry(.062, .013, 8, 18), metal, 0, .4, -.18, 0, 0, 0);
  head.add(ring);
  const tag = mesh(new THREE.CylinderGeometry(.04, .04, .018, 12), metal, 0, .38, -.23, Math.PI / 2);
  head.add(tag);

  const harnessBand1 = mesh(new THREE.TorusGeometry(.42, .025, 8, 28), leather, 0, .08, .3);
  harnessBand1.scale.set(1.06, 1, 1);
  harnessBand1.rotation.z = .12;
  bodyGroup.add(harnessBand1);
  const harnessBand2 = mesh(new THREE.TorusGeometry(.4, .022, 8, 28), leather, 0, .07, -.3);
  harnessBand2.rotation.z = -.08;
  bodyGroup.add(harnessBand2);
  const harnessStrap = mesh(new THREE.BoxGeometry(.075, .03, .86), leather, 0, .39, .02);
  harnessStrap.rotation.x = -.03;
  bodyGroup.add(harnessStrap);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const stud = mesh(sphere(.021, metal, 8), metal, side * .42, .1 + (i % 2) * .08, -.24 + i * .16);
      bodyGroup.add(stud);
    }
    const ring2 = mesh(new THREE.TorusGeometry(.045, .01, 6, 14), metal, side * .42, .15, .29);
    ring2.rotation.y = Math.PI / 2;
    bodyGroup.add(ring2);
  }
  const chestRing = mesh(new THREE.TorusGeometry(.075, .013, 8, 18), metal, 0, -.08, .72);
  bodyGroup.add(chestRing);

  // tail — segmented, expressive
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, .12, -.58);
  bodyGroup.add(tailPivot);
  const tailSegs = [];
  let parent = tailPivot;
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Group();
    seg.position.z = i === 0 ? 0 : -.19;
    const geo = new THREE.CapsuleGeometry(.075 - i * .012, .16, 5, 8);
    const part = mesh(geo, i === 3 ? blue : fur, 0, 0, -.1, Math.PI / 2);
    seg.add(part);
    parent.add(seg);
    tailSegs.push(seg);
    parent = seg;
  }
  tailPivot.rotation.x = -.55;

  // legs
  const legs = [];
  const legDefs = [
    { x: -.32, z: .43, upper: .44, lower: .4, r: .105, front: true },
    { x: .32, z: .43, upper: .44, lower: .4, r: .105, front: true },
    { x: -.35, z: -.46, upper: .43, lower: .38, r: .145, front: false },
    { x: .35, z: -.46, upper: .43, lower: .38, r: .145, front: false },
  ];
  for (const def of legDefs) {
    const hip = new THREE.Group();
    hip.position.set(def.x, -.02, def.z);
    bodyGroup.add(hip);
    const upper = mesh(new THREE.CapsuleGeometry(def.r, def.upper, 5, 9), fur, 0, -def.upper * .5 - def.r * .2, 0);
    upper.scale.set(def.front ? 1 : 1.14, 1, def.front ? 1 : 1.18);
    hip.add(upper);
    const knee = new THREE.Group();
    knee.position.y = -def.upper;
    hip.add(knee);
    const lower = mesh(new THREE.CylinderGeometry(def.r * .62, def.r * .52, def.lower, 8), fur, 0, -def.lower * .5, 0);
    knee.add(lower);
    const paw = mesh(sphere(.12, fur2, 10), fur2, 0, -def.lower - .015, .045);
    paw.scale.set(1.08, .62, 1.35);
    knee.add(paw);
    for (let c = 0; c < 3; c++) {
      const claw = mesh(new THREE.ConeGeometry(.012, .045, 4), toothMat, -.055 + c * .055, -def.lower - .035, .19, Math.PI / 2.2);
      knee.add(claw);
    }
    legs.push({ hip, knee, def, paw });
  }

  // little tufts for silhouette
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const tuft = mesh(new THREE.ConeGeometry(.055, .18, 4), fur2, side * .35, -.02 + i * .05, .2 - i * .16, .4, 0, side * .55);
      tuft.scale.set(1, 1, .45);
      bodyGroup.add(tuft);
    }
  }

  // glow eye-light at night (very subtle)
  const eyeLight = new THREE.PointLight(0xffa33d, 0, 2.8, 2);
  eyeLight.position.set(0, .09, .38);
  head.add(eyeLight);

  const state = {
    phase: Math.random() * 10,
    time: 0,
    biteT: 0,
    pawT: 0,
    pawSide: 1,
    eatT: 0,
    eating: false,
    hurtT: 0,
    deadT: 0,
    deadPose: false,
    night: 0,
    speed01: 0,
    sprint: 0,
    moving: 0,
  };
  const baseEmissiveFur = fur.emissive ? fur.emissive.clone() : new THREE.Color(0);
  const baseEmissiveBlue = blue.emissive.clone();

  function attack(type) {
    if (type === 'bite') { state.biteT = .48; }
    else { state.pawT = .42; state.pawSide *= -1; }
  }

  function hurt() { state.hurtT = .34; }
  function death() { state.deadT = 1.2; state.deadPose = true; }
  function setEating(on) { state.eating = on; }

  function update(dt, opts = {}) {
    state.time += dt;
    const speed = opts.speed || 0;
    const targetMove = clamp(speed / 5.8, 0, 1.35);
    state.moving = damp(state.moving, targetMove, 8, dt);
    state.sprint = damp(state.sprint, opts.sprint ? 1 : 0, 6, dt);
    state.night = damp(state.night, opts.night ?? 0, 1.6, dt);
    state.phase += dt * (1.1 + state.moving * 2.45 + state.sprint * .45);
    state.biteT = Math.max(0, state.biteT - dt);
    state.pawT = Math.max(0, state.pawT - dt);
    state.hurtT = Math.max(0, state.hurtT - dt);
    state.deadT = Math.max(0, state.deadT - dt);
    if (!state.eating) state.eatT = damp(state.eatT, 0, 12, dt);

    const p = state.phase;
    const mv = state.moving;
    const gait = Math.sin(p);
    const gait2 = Math.sin(p + Math.PI);
    const bob = Math.abs(Math.sin(p)) * .035 * mv;
    const walkAmt = .62 * mv;
    bodyGroup.position.y = .92 + bob - state.sprint * .025;
    bodyGroup.rotation.z = Math.sin(p) * .018 * mv;
    bodyGroup.rotation.x = -state.sprint * .035;

    // four-beat diagonal gait
    const offsets = [0, Math.PI, Math.PI, 0];
    for (let i = 0; i < 4; i++) {
      const leg = legs[i];
      const s = Math.sin(p + offsets[i]);
      const c = Math.cos(p + offsets[i]);
      let rx = s * walkAmt;
      let rz = 0;
      if (!leg.def.front) rx *= .85;
      // body support / knee bend
      let knee = Math.max(0, -c) * .55 * mv;
      if (leg.def.front) knee = Math.max(0, c) * .5 * mv;
      // paw swipe overrides the front leg
      if (state.pawT > 0) {
        const side = legs[state.pawSide > 0 ? 1 : 0];
        if (leg === side) {
          const t = 1 - state.pawT / .42;
          const arc = Math.sin(t * Math.PI);
          rx = -1.05 * arc;
          rz = (t < .45 ? -1 : 1) * .75 * arc;
          knee = .65 * arc;
        }
      }
      leg.hip.rotation.x = rx;
      leg.hip.rotation.z = rz;
      leg.knee.rotation.x = knee;
    }

    // breathing / head
    const breath = Math.sin(state.time * 2.2) * (1 - mv * .6);
    neckPivot.rotation.x = .12 + breath * .015 + mv * .06;
    head.rotation.x = -.1 - breath * .02 - mv * .04;
    head.rotation.y = Math.sin(state.time * .45) * .055 * (1 - mv);
    head.rotation.z = Math.sin(state.time * .7) * .02 * (1 - mv);
    jawPivot.rotation.x = .02 + breath * .012;

    // attack: bite
    if (state.biteT > 0) {
      const t = 1 - state.biteT / .48;
      const lunge = Math.sin(clamp(t * 1.35, 0, 1) * Math.PI);
      head.rotation.x = -.1 - lunge * .52;
      neckPivot.rotation.x = .12 + lunge * .25;
      bodyGroup.position.z = lunge * .12;
      const snap = t < .38 ? Math.sin(t / .38 * Math.PI * .5) : Math.sin(clamp((1 - t) / .2, 0, 1) * Math.PI * .5);
      jawPivot.rotation.x = -.62 * snap + .02;
    } else {
      bodyGroup.position.z = 0;
    }

    // attack: paw arc body torsion
    if (state.pawT > 0) {
      const t = 1 - state.pawT / .42;
      bodyGroup.rotation.y = Math.sin(t * Math.PI) * .12 * state.pawSide;
      neckPivot.rotation.x = .12 + Math.sin(t * Math.PI) * .05;
    } else {
      bodyGroup.rotation.y = 0;
    }

    // eating
    if (state.eating) {
      state.eatT = Math.min(1, state.eatT + dt * 1.15);
      const chew = Math.sin(state.time * 15) * .5 + .5;
      head.rotation.x = .72 + chew * .09;
      neckPivot.rotation.x = .62;
      jawPivot.rotation.x = -.22 - chew * .34;
      bodyGroup.position.y = .92 - .05;
    }

    // hurt shake
    if (state.hurtT > 0) {
      const k = state.hurtT / .34;
      bodyGroup.position.x = Math.sin(state.time * 70) * .035 * k;
      bodyGroup.rotation.z += Math.sin(state.time * 55) * .04 * k;
      fur.emissive.setRGB(.12 * k, .01 * k, .01 * k);
      blue.emissive.copy(baseEmissiveBlue).lerp(new THREE.Color(0.25, 0, 0), k * .5);
    } else {
      bodyGroup.position.x = 0;
      fur.emissive.copy(baseEmissiveFur);
      blue.emissive.copy(baseEmissiveBlue);
    }

    // tail
    const wag = Math.sin(state.time * (state.eating ? 10 : 3.4)) * (state.eating ? .22 : .12 + mv * .2);
    tailPivot.rotation.y = wag;
    tailPivot.rotation.x = -.55 + Math.sin(state.time * 2) * .04 + state.sprint * .25;
    for (let i = 0; i < tailSegs.length; i++) {
      tailSegs[i].rotation.y = Math.sin(state.time * 3.4 - i * .5) * .09;
      tailSegs[i].rotation.x = i === 0 ? 0 : .09;
    }

    // ears react
    for (const ear of head.children) {
      if (ear.userData.side !== undefined) {
        ear.rotation.x = -.05 + Math.sin(state.time * 1.2 + ear.userData.side) * .02 + state.sprint * .08;
      }
    }

    eyeLight.intensity = state.night * .9;
    // ear inner glow at night
    blue.emissiveIntensity = .5 + state.night * .25;

    // death fall
    if (state.deadPose) {
      const k = 1 - state.deadT / 1.2;
      root.rotation.z = -Math.min(1, k * 1.15) * Math.PI * .48;
      root.position.y = -Math.min(1, k * 1.15) * .1;
      root.rotation.x = Math.min(1, k * 1.15) * .12;
    } else {
      root.rotation.z = 0;
      root.rotation.x = 0;
    }
  }

  function reset() {
    state.biteT = state.pawT = state.eatT = state.hurtT = state.deadT = 0;
    state.eating = false;
    state.deadPose = false;
    root.rotation.set(0, 0, 0);
    root.position.y = 0;
    fur.emissive.copy(baseEmissiveFur);
    blue.emissive.copy(baseEmissiveBlue);
  }

  const muzzleTip = new THREE.Object3D();
  muzzleTip.position.set(0, -.03, .62);
  head.add(muzzleTip);
  const pawTipL = new THREE.Object3D();
  pawTipL.position.set(0, 0, .22);
  legs[0].paw.add(pawTipL);
  const pawTipR = new THREE.Object3D();
  pawTipR.position.set(0, 0, .22);
  legs[1].paw.add(pawTipR);

  return {
    root, bodyGroup, head, legs, state, magenta: null,
    update, attack, hurt, death, reset, setEating,
    muzzleTip, pawTipL, pawTipR,
    setVisible(v) { root.visible = v; },
    get worldHead() {
      const v = new THREE.Vector3();
      head.getWorldPosition(v);
      return v;
    }
  };
}
