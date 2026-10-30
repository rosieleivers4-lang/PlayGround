import * as THREE from "three";
import { clamp, smoothstep } from "./util.js";
import { bakeGroup, matteMaterial } from "./merge.js";

const MAT = {
  fur: new THREE.MeshStandardMaterial({ color: 0x23272f, roughness: 0.84, metalness: 0.03 }),
  fur2: new THREE.MeshStandardMaterial({ color: 0x2d323c, roughness: 0.82, metalness: 0.03 }),
  furDark: new THREE.MeshStandardMaterial({ color: 0x14171c, roughness: 0.88 }),
  teal: new THREE.MeshStandardMaterial({ color: 0x1ba4ba, roughness: 0.52, metalness: 0.08, emissive: 0x0a3b44, emissiveIntensity: 0.55 }),
  tealLight: new THREE.MeshStandardMaterial({ color: 0x3cc7d6, roughness: 0.5, emissive: 0x0d4650, emissiveIntensity: 0.6 }),
  cream: new THREE.MeshStandardMaterial({ color: 0xe4e7e2, roughness: 0.76 }),
  leather: new THREE.MeshStandardMaterial({ color: 0x121419, roughness: 0.4, metalness: 0.16 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xc9d3da, roughness: 0.22, metalness: 0.94 }),
  nose: new THREE.MeshStandardMaterial({ color: 0x0b0d11, roughness: 0.26, metalness: 0.12 }),
  amber: new THREE.MeshStandardMaterial({ color: 0xffbf62, roughness: 0.26, emissive: 0xff8a24, emissiveIntensity: 1.05 }),
  black: new THREE.MeshStandardMaterial({ color: 0x08090b, roughness: 0.36 }),
  tongue: new THREE.MeshStandardMaterial({ color: 0xd27884, roughness: 0.66 }),
  curl: new THREE.MeshStandardMaterial({ color: 0x7a4a2e, roughness: 0.92 }),
  curl2: new THREE.MeshStandardMaterial({ color: 0x93603c, roughness: 0.92 }),
};

function capsule(radius, length, mat, radial = 8) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 4, radial), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function sphere(r, mat, sx = 1, sy = 1, sz = 1, seg = 12) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)), mat);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function tube(points, radius, mat) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const geo = new THREE.TubeGeometry(curve, 18, radius, 5, false);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return mesh;
}

export class Pup {
  constructor() {
    this.root = new THREE.Group();
    this.rig = new THREE.Group();
    this.root.add(this.rig);
    this.phase = 0;
    this.biteT = 0;
    this.pawT = 0;
    this.eatT = 0;
    this.hurtT = 0;
    this.dead = false;
    this.earTwitch = 0;
    this._build();
  }

  _build() {
    const rig = this.rig;
    this.matte = matteMaterial(0.82, 0.04, 0x6f9fae, 0.18);

    // torso
    const body = new THREE.Group();
    body.position.y = 0.88;
    rig.add(body);
    this.body = body;
    const bodyMetal = new THREE.Group();
    body.add(bodyMetal);

    const torso = capsule(0.33, 0.66, MAT.fur, 14);
    torso.rotation.x = Math.PI / 2;
    torso.scale.set(1.05, 1, 0.95);
    body.add(torso);
    this.torso = torso;

    const chest = sphere(0.35, MAT.fur2, 1.02, 0.98, 1.08);
    chest.position.set(0, 0.045, 0.32);
    body.add(chest);
    const rump = sphere(0.33, MAT.fur2, 1.0, 0.98, 1.0);
    rump.position.set(0, 0.02, -0.42);
    body.add(rump);

    // subtle shoulder ruff
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const tuft = sphere(0.1, i % 2 ? MAT.fur2 : MAT.fur, 0.7, 1.25, 0.7, 6);
      tuft.position.set(Math.cos(a) * 0.28, 0.16 + Math.sin(a) * 0.11, 0.36 + Math.sin(a) * 0.04);
      tuft.rotation.z = a;
      body.add(tuft);
    }

    // neck + head
    const neck = new THREE.Group();
    neck.position.set(0, 0.16, 0.46);
    body.add(neck);
    this.neck = neck;
    const neckMesh = capsule(0.23, 0.16, MAT.fur, 10);
    neckMesh.rotation.x = 0.35;
    neckMesh.position.set(0, 0.09, 0.06);
    neck.add(neckMesh);
    const neckMetal = new THREE.Group();
    neck.add(neckMetal);

    const head = new THREE.Group();
    head.position.set(0, 0.25, 0.17);
    head.rotation.x = 0.06;
    neck.add(head);
    this.head = head;

    const skull = sphere(0.34, MAT.fur, 1, 1.03, 1.06, 16);
    head.add(skull);
    const crown = sphere(0.25, MAT.fur2, 1.0, 0.9, 1.0, 12);
    crown.position.set(0, 0.1, -0.06);
    head.add(crown);
    const browRidge = sphere(0.3, MAT.fur, 0.95, 0.55, 0.7, 12);
    browRidge.position.set(0, 0.14, 0.16);
    head.add(browRidge);

    // teal muzzle mask
    const muzzle = capsule(0.145, 0.2, MAT.teal, 12);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, -0.055, 0.26);
    muzzle.scale.set(1.08, 1.0, 1.0);
    head.add(muzzle);
    this.muzzle = muzzle;

    const leftCheek = sphere(0.14, MAT.teal, 1.05, 0.9, 0.8, 10);
    leftCheek.position.set(-0.145, -0.09, 0.21);
    leftCheek.rotation.z = 0.22;
    head.add(leftCheek);
    const rightCheek = leftCheek.clone();
    rightCheek.position.x = 0.145;
    rightCheek.rotation.z = -0.22;
    head.add(rightCheek);

    // black nose bridge + nose
    const bridge = sphere(0.105, MAT.nose, 1.2, 0.55, 1.5, 10);
    bridge.position.set(0, 0.035, 0.4);
    bridge.rotation.x = 0.12;
    head.add(bridge);
    const nose = sphere(0.105, MAT.nose, 1.18, 0.82, 0.9, 12);
    nose.position.set(0, 0.015, 0.475);
    head.add(nose);
    const nostrilL = sphere(0.018, MAT.black, 1, 0.6, 0.6, 6);
    nostrilL.position.set(-0.045, 0.02, 0.545);
    head.add(nostrilL);
    const nostrilR = nostrilL.clone();
    nostrilR.position.x = 0.045;
    head.add(nostrilR);

    // lower jaw
    const jaw = new THREE.Group();
    jaw.position.set(0, -0.135, 0.15);
    head.add(jaw);
    this.jaw = jaw;
    const jawMesh = capsule(0.115, 0.14, MAT.teal, 10);
    jawMesh.rotation.x = Math.PI / 2;
    jawMesh.position.set(0, -0.02, 0.18);
    jawMesh.scale.set(1.05, 0.72, 1);
    jaw.add(jawMesh);
    const chin = sphere(0.11, MAT.teal, 1.05, 0.62, 0.9, 10);
    chin.position.set(0, -0.01, 0.35);
    jaw.add(chin);
    const tongue = sphere(0.055, MAT.tongue, 1.2, 0.4, 1.5, 8);
    tongue.position.set(0, 0.035, 0.29);
    jaw.add(tongue);
    this.tongue = tongue;
    const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, 0.04), MAT.cream);
    teeth.position.set(0, 0.02, 0.34);
    jaw.add(teeth);

    // white brow markings
    const browL = sphere(0.11, MAT.cream, 1.5, 0.42, 0.5, 10);
    browL.position.set(-0.145, 0.175, 0.275);
    browL.rotation.set(-0.2, 0.1, 0.18);
    head.add(browL);
    const browR = browL.clone();
    browR.position.x = 0.145;
    browR.rotation.z = -0.18;
    head.add(browR);

    // eyes (glowing irises stay separate from the matte head merge)
    const eyeGlow = new THREE.Group();
    head.add(eyeGlow);
    for (const side of [-1, 1]) {
      const socket = sphere(0.088, MAT.furDark, 1, 1, 0.7, 10);
      socket.position.set(side * 0.145, 0.078, 0.29);
      head.add(socket);
      const iris = sphere(0.045, MAT.amber, 1, 1, 0.6, 10);
      iris.position.set(side * 0.145, 0.082, 0.348);
      eyeGlow.add(iris);
      const pupil = sphere(0.018, MAT.black, 1, 1.15, 0.5, 6);
      pupil.position.set(side * 0.145, 0.082, 0.377);
      head.add(pupil);
      const glint = sphere(0.009, MAT.cream, 1, 1, 0.5, 5);
      glint.position.set(side * 0.14 - 0.01, 0.095, 0.386);
      head.add(glint);
    }

    // tall ears
    this.ears = [];
    for (const side of [-1, 1]) {
      const ear = new THREE.Group();
      ear.position.set(side * 0.19, 0.31, -0.04);
      ear.rotation.set(-0.12, side * 0.09, side * 0.16);
      head.add(ear);
      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.155, 0.62, 5), MAT.fur);
      outer.position.y = 0.31;
      outer.scale.set(1, 1, 0.52);
      outer.castShadow = true;
      ear.add(outer);
      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.082, 0.44, 4), MAT.teal);
      inner.position.set(0, 0.26, 0.046);
      inner.scale.set(1, 1, 0.24);
      ear.add(inner);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.16, 4), MAT.fur2);
      tip.position.set(0, 0.56, -0.01);
      tip.scale.set(1, 1, 0.5);
      ear.add(tip);
      this.ears.push(ear);
    }

    // collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.034, 6, 22), MAT.teal);
    collar.position.set(0, 0.2, 0.08);
    collar.scale.set(1, 0.9, 1);
    collar.castShadow = true;
    neck.add(collar);
    const tagRing = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 5, 14), MAT.silver);
    tagRing.position.set(0, 0.02, 0.27);
    neckMetal.add(tagRing);
    const tag = new THREE.Mesh(new THREE.CircleGeometry(0.038, 12), MAT.silver);
    tag.position.set(0, -0.04, 0.275);
    tag.rotation.x = 0.1;
    tag.material = MAT.silver;
    neckMetal.add(tag);

    // harness: chest + belly straps, shoulder straps, rings and rivets
    const strapA = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.036, 6, 26), MAT.leather);
    strapA.position.set(0, 0.0, 0.2);
    strapA.scale.set(1.03, 0.94, 1);
    strapA.castShadow = true;
    body.add(strapA);
    const strapB = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.03, 6, 24), MAT.leather);
    strapB.position.set(0, 0.01, -0.22);
    strapB.scale.set(1.03, 0.94, 1);
    strapB.castShadow = true;
    body.add(strapB);
    for (const side of [-1, 1]) {
      body.add(tube([
        [side * 0.3, -0.05, 0.36],
        [side * 0.36, 0.14, 0.26],
        [side * 0.31, 0.36, 0.05],
        [side * 0.3, 0.31, -0.25],
        [side * 0.28, 0.1, -0.4],
      ], 0.024, MAT.leather));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.014, 6, 16), MAT.silver);
      ring.position.set(side * 0.37, 0.04, 0.28);
      ring.rotation.y = Math.PI / 2;
      bodyMetal.add(ring);
    }
    const centerStrap = tube([[0, 0.34, 0.12], [0, 0.3, 0.36], [0, 0.12, 0.5]], 0.026, MAT.leather);
    body.add(centerStrap);
    const chestRing = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.015, 6, 18), MAT.silver);
    chestRing.position.set(0, 0.05, 0.515);
    bodyMetal.add(chestRing);
    for (let i = 0; i < 8; i++) {
      const stud = sphere(0.015, MAT.silver, 1, 1, 1, 5);
      const a = (i / 8) * Math.PI * 2;
      stud.position.set(Math.cos(a) * 0.39, Math.sin(a) * 0.34, 0.2);
      bodyMetal.add(stud);
    }

    // curly auburn mane peeking beneath the mask (a nod to the photo)
    const mane = new THREE.Group();
    mane.position.set(0, -0.06, -0.08);
    head.add(mane);
    for (let i = 0; i < 11; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.048 + Math.random() * 0.025, 0.021, 4, 8), i % 3 ? MAT.curl : MAT.curl2);
      ring.position.set(side * (0.16 + Math.random() * 0.13), -0.2 - Math.random() * 0.18, -0.1 + Math.random() * 0.25);
      ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      ring.scale.setScalar(0.8 + Math.random() * 0.7);
      ring.castShadow = true;
      mane.add(ring);
    }

    // legs
    this.legs = [];
    const legDefs = [
      { x: -0.25, z: 0.36, rear: false, side: -1 },
      { x: 0.25, z: 0.36, rear: false, side: 1 },
      { x: -0.27, z: -0.42, rear: true, side: -1 },
      { x: 0.27, z: -0.42, rear: true, side: 1 },
    ];
    legDefs.forEach((def, i) => {
      const hip = new THREE.Group();
      hip.position.set(def.x, 0.74, def.z);
      rig.add(hip);
      const upper = capsule(0.083, 0.2, MAT.fur, 8);
      upper.position.y = -0.16;
      upper.scale.set(1, 1, 1.2);
      hip.add(upper);
      const knee = new THREE.Group();
      knee.position.y = -0.33;
      hip.add(knee);
      const lower = capsule(0.06, 0.18, MAT.fur2, 7);
      lower.position.y = -0.12;
      knee.add(lower);
      const paw = sphere(0.1, MAT.furDark, 1.15, 0.62, 1.35, 9);
      paw.position.set(0, -0.28, 0.055);
      knee.add(paw);
      // toe split
      const toe = sphere(0.035, MAT.fur, 1.2, 0.5, 1.0, 5);
      toe.position.set(0, -0.31, 0.16);
      knee.add(toe);
      this.legs.push({ hip, knee, paw, baseX: def.x, baseZ: def.z, rear: def.rear, side: def.side, offset: (i === 0 || i === 3) ? 0 : Math.PI });
    });

    // tail
    const tail = new THREE.Group();
    tail.position.set(0, 0.16, -0.64);
    tail.rotation.x = -0.45;
    body.add(tail);
    this.tail = tail;
    this.tailSegs = [];
    let parent = tail;
    for (let i = 0; i < 3; i++) {
      const seg = new THREE.Group();
      if (i > 0) seg.position.z = -0.23;
      parent.add(seg);
      const mesh = capsule(0.07 - i * 0.014, 0.19, MAT.fur, 7);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.z = -0.11;
      seg.add(mesh);
      this.tailSegs.push(seg);
      parent = seg;
    }
    const tailBand = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.011, 4, 12), MAT.teal);
    tailBand.position.z = -0.33;
    parent.add(tailBand);

    // shadow blob (helps ground the character)
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 24),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.025;
    shadow.scale.set(1.3, 1.6, 1);
    this.root.add(shadow);
    this.shadow = shadow;

    // Merge the decorative geometry into a handful of draw calls.
    bakeGroup(body, this.matte);
    bakeGroup(bodyMetal, MAT.silver);
    bakeGroup(neck, this.matte);
    bakeGroup(neckMetal, MAT.silver);
    bakeGroup(head, this.matte);
    bakeGroup(eyeGlow, MAT.amber);
    bakeGroup(jaw, this.matte);
    for (const ear of this.ears) bakeGroup(ear, this.matte);
    bakeGroup(mane, this.matte);
    for (const leg of this.legs) {
      bakeGroup(leg.hip, this.matte);
      bakeGroup(leg.knee, this.matte);
    }
    for (const seg of this.tailSegs) bakeGroup(seg, this.matte);

    rig.traverse(obj => {
      if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true; }
    });
  }

  bite() { this.biteT = 0.46; }
  paw() { this.pawT = 0.42; }
  eat() { this.eatT = 0.95; }
  hurt() { this.hurtT = 0.34; }

  update(dt, t, state = {}) {
    const speed = Math.abs(state.speed || 0);
    const moving = speed > 0.15;
    const sprint = clamp((speed - 4) / 4, 0, 1);
    const stride = clamp(speed / 7, 0, 1.1);
    this.phase += dt * (2.6 + speed * 2.1) * (state.speed < 0 ? -0.95 : 1);
    const p = this.phase;

    if (this.biteT > 0) this.biteT = Math.max(0, this.biteT - dt);
    if (this.pawT > 0) this.pawT = Math.max(0, this.pawT - dt);
    if (this.eatT > 0) this.eatT = Math.max(0, this.eatT - dt);
    if (this.hurtT > 0) this.hurtT = Math.max(0, this.hurtT - dt);

    // ears drift / twitch
    this.earTwitch = Math.max(0, this.earTwitch - dt);
    if (Math.random() < dt * 0.22) this.earTwitch = 0.25;

    const bob = moving ? Math.abs(Math.sin(p * 2)) * 0.038 * stride : Math.sin(t * 1.5) * 0.007;
    let rigY = bob + (state.jumpY || 0);
    let rigPitch = 0;
    let rigRoll = -clamp(state.turn || 0, -1, 1) * 0.055;

    const biteP = this.biteT > 0 ? 1 - this.biteT / 0.46 : 0;
    const pawP = this.pawT > 0 ? 1 - this.pawT / 0.42 : 0;
    const eatP = this.eatT > 0 ? Math.sin((1 - this.eatT / 0.95) * Math.PI) : 0;

    if (biteP > 0) {
      const jawOpen = biteP < 0.34 ? smoothstep(0, 0.34, biteP) : Math.max(0, 1 - smoothstep(0.34, 0.58, biteP));
      this.jaw.rotation.x = jawOpen * 0.72 + 0.03;
      this.head.rotation.x = 0.06 + (biteP < 0.4 ? -0.16 : 0.18) - jawOpen * 0.04;
      rigPitch += Math.sin(biteP * Math.PI) * 0.07;
      this.rig.position.z = Math.sin(biteP * Math.PI) * 0.12;
      this.tongue.visible = jawOpen > 0.12;
    } else {
      this.jaw.rotation.x = 0.03 + Math.sin(t * 1.7) * 0.008;
      this.head.rotation.x = 0.055 + Math.sin(p * 2) * 0.025 * stride + Math.sin(t * 1.2) * 0.006;
      this.rig.position.z = 0;
      this.tongue.visible = eatP > 0.2;
    }

    if (eatP > 0) {
      this.head.rotation.x += eatP * 0.5;
      this.neck.rotation.x = eatP * 0.22;
      this.jaw.rotation.x = 0.15 + Math.abs(Math.sin((1 - this.eatT / 0.95) * Math.PI * 5)) * 0.34;
      rigY -= eatP * 0.06;
    } else {
      this.neck.rotation.x = 0;
    }

    if (pawP > 0) {
      const swing = Math.sin(pawP * Math.PI);
      this.legs[1].hip.rotation.x = -swing * 1.25;
      this.legs[1].hip.rotation.z = -swing * 0.45;
      this.legs[1].knee.rotation.x = swing * 0.75;
      rigRoll -= swing * 0.1;
      rigPitch += swing * 0.04;
    } else {
      this.legs[1].hip.rotation.z = 0;
    }

    // legs
    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      const swing = Math.sin(p + leg.offset);
      const lift = Math.max(0, Math.cos(p + leg.offset));
      if (pawP > 0 && i === 1) continue;
      leg.hip.rotation.x = swing * (0.24 + stride * 0.52);
      leg.knee.rotation.x = lift * (0.12 + stride * 0.52);
      if (leg.rear) leg.knee.rotation.x *= 0.78;
      leg.hip.rotation.z = leg.side * 0.018;
    }

    // body sway + breathing
    this.body.position.y = 0.88 + (moving ? Math.sin(p * 2 + 0.4) * 0.018 * stride : Math.sin(t * 1.4) * 0.006);
    this.body.rotation.z = Math.sin(p) * 0.025 * stride + rigRoll * 0.35;
    this.body.rotation.x = rigPitch * 0.4;
    this.body.scale.y = 1 + Math.sin(t * 1.35) * 0.005;

    // head looks slightly into turns, ears bounce
    this.head.rotation.y = clamp(state.turn || 0, -1, 1) * 0.16 + Math.sin(t * 0.7) * 0.02;
    this.head.rotation.z = clamp(state.turn || 0, -1, 1) * 0.04;
    this.ears.forEach((ear, i) => {
      const side = i === 0 ? -1 : 1;
      ear.rotation.x = -0.12 + Math.sin(p * 2 + i) * 0.06 * stride + (this.earTwitch > 0 ? Math.sin(t * 35) * 0.08 : 0);
      ear.rotation.z = side * 0.16 + Math.sin(t * 1.2 + i * 2) * 0.015;
    });

    // tail
    const tailWag = 0.35 + stride * 0.55;
    this.tail.rotation.y = Math.sin(t * 5.2) * tailWag;
    this.tail.rotation.x = -0.45 + Math.sin(t * 2.1) * 0.08 + (this.hurtT > 0 ? -0.2 : 0);
    this.tailSegs.forEach((seg, i) => {
      seg.rotation.y = Math.sin(t * 5.2 - i * 0.55) * 0.24 * tailWag;
      seg.rotation.x = Math.sin(t * 2.4 - i * 0.4) * 0.04;
    });

    // jumping / pounce pose
    if (state.jumping) {
      rigPitch = -0.22;
      this.legs.forEach((leg, i) => {
        leg.hip.rotation.x = (i < 2 ? -0.8 : 0.9) + Math.sin(p * 2) * 0.1;
        leg.knee.rotation.x = i < 2 ? 0.9 : 0.25;
      });
    }

    // hurt flinch
    if (this.hurtT > 0) {
      const h = this.hurtT / 0.34;
      rigRoll += Math.sin(this.hurtT * 60) * 0.05 * h;
      rigY -= h * 0.04;
      this.head.rotation.z += Math.sin(this.hurtT * 40) * 0.08 * h;
    }

    if (this.dead) {
      rigPitch = -0.9;
      rigY = -0.38;
    }

    this.rig.position.y = rigY;
    this.rig.rotation.x = rigPitch;
    this.rig.rotation.z = rigRoll;

    // eye glow follows day/night slightly
    MAT.amber.emissiveIntensity = 0.65 + Math.sin(t * 2.2) * 0.12;
    this.shadow.scale.set(1.3 + stride * 0.2, 1.6 + stride * 0.25, 1);
    this.shadow.material.opacity = 0.22 + 0.08 * (1 - stride);
  }
}
