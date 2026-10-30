import * as THREE from "three";
import { TAU, clamp, damp, dampAngle, lerp, smoothstep } from "./util.js";
import { bakeGroup, matteMaterial } from "./merge.js";

const SPECS = {
  rabbit: {
    name: "Rabbit", scale: 0.55, hp: 34, speed: 5.7, prey: true, food: 18, hunger: 22,
    fur: 0xb4a087, fur2: 0xd3c5ad, belly: 0xe6dbc7, inner: 0xd39a91, eye: 0x231a13,
    legs: 0.52, body: 0.23, bodyLen: 0.26, head: 0.2, snout: 0.16, ear: "long", tail: "puff",
    aggro: 0, range: 0, damage: 0, flee: 9.5, radius: 0.42, height: 1.08, hop: true,
  },
  fox: {
    name: "Fox", scale: 0.82, hp: 58, speed: 6.5, prey: false, food: 20, hunger: 16,
    fur: 0xbc6733, fur2: 0xd17a3f, belly: 0xeee3d0, dark: 0x30241d, eye: 0xffb347,
    legs: 0.46, body: 0.25, bodyLen: 0.42, head: 0.23, snout: 0.26, ear: "point", tail: "bush",
    aggro: 12, range: 2.4, damage: 9, flee: 0, radius: 0.55, height: 1.25,
  },
  badger: {
    name: "Badger", scale: 0.86, hp: 92, speed: 4.9, prey: false, food: 24, hunger: 18,
    fur: 0x4b4d50, fur2: 0x62646a, belly: 0x292a2c, dark: 0x1a1b1d, eye: 0x0a0a0b,
    legs: 0.34, body: 0.28, bodyLen: 0.46, head: 0.24, snout: 0.2, ear: "round", tail: "short",
    aggro: 10, range: 2.2, damage: 13, flee: 0, radius: 0.62, height: 1.08, stripe: true,
  },
  boar: {
    name: "Boar", scale: 1.03, hp: 132, speed: 5.3, prey: false, food: 30, hunger: 24,
    fur: 0x4d3a2d, fur2: 0x624b39, belly: 0x382a21, dark: 0x241b16, eye: 0xffa640,
    legs: 0.4, body: 0.33, bodyLen: 0.55, head: 0.27, snout: 0.26, ear: "round", tail: "short",
    aggro: 11, range: 2.7, damage: 17, flee: 0, radius: 0.78, height: 1.28, tusks: true,
  },
  wolf: {
    name: "Wolf", scale: 1.0, hp: 108, speed: 6.7, prey: false, food: 28, hunger: 22,
    fur: 0x5b5e64, fur2: 0x70737a, belly: 0xb5b6b2, dark: 0x33353a, eye: 0xffc55e,
    legs: 0.5, body: 0.27, bodyLen: 0.5, head: 0.25, snout: 0.28, ear: "point", tail: "bush",
    aggro: 15, range: 2.6, damage: 15, flee: 0, radius: 0.68, height: 1.42,
  },
  deer: {
    name: "Deer", scale: 1.15, hp: 118, speed: 7.2, prey: true, food: 40, hunger: 32,
    fur: 0x98724a, fur2: 0xac855a, belly: 0xd9c6a9, dark: 0x433225, eye: 0x211a13,
    legs: 0.62, body: 0.3, bodyLen: 0.55, head: 0.22, snout: 0.28, ear: "deer", tail: "short",
    aggro: 0, range: 0, damage: 0, flee: 12, radius: 0.7, height: 1.9, antlers: true,
  },
};

function mat(color, roughness = 0.92, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, flatShading: false, ...extra });
}
function sph(r, material, sx = 1, sy = 1, sz = 1, seg = 10) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)), material);
  m.scale.set(sx, sy, sz);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function cap(r, len, material, seg = 8) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, seg), material);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

export class Creature {
  constructor(type, level, world, scene, x, z, boss = false) {
    this.type = type;
    const base = SPECS[type] || SPECS.rabbit;
    this.spec = base;
    this.level = level;
    this.world = world;
    this.scene = scene;
    this.boss = boss;
    this.maxHp = Math.round(base.hp * level.difficulty * (boss ? 4.6 : 1));
    this.hp = this.maxHp;
    this.damage = Math.round(base.damage * level.difficulty * (boss ? 1.45 : 1));
    this.speed = base.speed * (boss ? 0.93 : 1);
    this.radius = base.radius * (boss ? 1.55 : 1) * base.scale;
    this.dead = false;
    this.deathT = 0;
    this.heading = Math.random() * TAU;
    this.state = "wander";
    this.stateT = 1 + Math.random() * 2;
    this.wander = new THREE.Vector3(x, 0, z);
    this.home = new THREE.Vector2(x, z);
    this.phase = Math.random() * 10;
    this.attackCd = 0.8 + Math.random() * 1.5;
    this.windup = 0;
    this.hurtT = 0;
    this.kb = new THREE.Vector3();
    this.flash = 0;
    this.targeted = false;
    this.onAttack = null;
    this.onDeath = null;
    this._mats = [];
    this._build();
    this.root.position.set(x, world.heightAt(x, z), z);
    this.root.rotation.y = this.heading;
    scene.add(this.root);
    this._buildBar();
  }

  _m(color) {
    const m = mat(color);
    this._mats.push(m);
    return m;
  }

  _build() {
    const s = this.spec;
    const scale = s.scale * (this.boss ? 1.55 : 1);
    this.root = new THREE.Group();
    this.root.scale.setScalar(scale);
    this.rig = new THREE.Group();
    this.root.add(this.rig);
    this.scaleValue = scale;

    const fur = this._m(s.fur);
    const fur2 = this._m(s.fur2);
    const belly = this._m(s.belly);
    const dark = this._m(s.dark || s.fur);
    const eye = mat(s.eye, 0.25, { emissive: s.eye, emissiveIntensity: 0.5 });
    this._mats.push(eye);
    this.eyeMat = eye;
    this.furMat = matteMaterial(0.9, 0.02, 0xffd7a6, 0.1);
    this.matte = this.furMat;

    const body = new THREE.Group();
    body.position.y = s.legs + s.body * 0.9;
    this.rig.add(body);
    this.body = body;
    const bodyMesh = cap(s.body, s.bodyLen, fur, 10);
    bodyMesh.rotation.x = Math.PI / 2;
    bodyMesh.scale.set(1.03, 1, 0.98);
    body.add(bodyMesh);
    const chest = sph(s.body * 0.9, fur2, 1.0, 1.0, 1.06);
    chest.position.set(0, 0.03, s.bodyLen * 0.65);
    body.add(chest);
    const rump = sph(s.body * 0.92, fur2, 1, 0.98, 1);
    rump.position.set(0, 0.01, -s.bodyLen * 0.62);
    body.add(rump);
    const bellyMesh = sph(s.body * 0.8, belly, 0.9, 0.7, 1.0);
    bellyMesh.position.set(0, -s.body * 0.42, 0.02);
    body.add(bellyMesh);

    // head
    const neck = new THREE.Group();
    neck.position.set(0, s.body * 0.75, s.bodyLen * 0.7);
    body.add(neck);
    this.neck = neck;
    const head = new THREE.Group();
    head.position.set(0, s.head * 0.35, s.head * 0.35);
    neck.add(head);
    this.head = head;
    const skull = sph(s.head, fur, 1, 0.98, 1.05, 12);
    head.add(skull);
    const snout = cap(s.snout * 0.55, s.snout * 0.75, s.name === "Rabbit" ? fur2 : fur, 8);
    snout.rotation.x = Math.PI / 2;
    snout.position.set(0, -s.head * 0.18, s.head * 0.75 + s.snout * 0.22);
    snout.scale.set(1.0, 0.8, 1);
    head.add(snout);
    const nose = sph(s.snout * 0.22, dark, 1.2, 0.8, 0.8, 7);
    nose.position.set(0, -s.head * 0.1, s.head * 0.75 + s.snout * 0.68);
    head.add(nose);

    if (s.stripe) {
      const stripe = sph(s.head * 0.52, this._m(0xe1ddd1), 0.65, 0.5, 1.35, 10);
      stripe.position.set(0, s.head * 0.3, s.head * 0.15);
      head.add(stripe);
      for (const side of [-1, 1]) {
        const patch = sph(s.head * 0.32, this._m(0x18191b), 0.8, 0.55, 0.7, 8);
        patch.position.set(side * s.head * 0.22, s.head * 0.08, s.head * 0.72);
        head.add(patch);
      }
    }

    // eyes (irises live in their own group so they keep the emissive glow)
    const eyeGroup = new THREE.Group();
    head.add(eyeGroup);
    for (const side of [-1, 1]) {
      const eyeball = sph(s.head * 0.19, this._m(0x0a0908), 1, 1, 0.8, 8);
      eyeball.position.set(side * s.head * 0.48, s.head * 0.2, s.head * 0.56);
      head.add(eyeball);
      const iris = sph(s.head * 0.105, eye, 1, 1, 0.6, 8);
      iris.position.set(side * s.head * 0.5, s.head * 0.21, s.head * 0.7);
      eyeGroup.add(iris);
      const glint = sph(s.head * 0.035, this._m(0xf3f0de), 1, 1, 0.5, 5);
      glint.position.set(side * s.head * 0.47 - 0.01, s.head * 0.25, s.head * 0.73);
      head.add(glint);
    }

    // ears
    this.ears = [];
    for (const side of [-1, 1]) {
      const ear = new THREE.Group();
      if (s.ear === "long") {
        ear.position.set(side * s.head * 0.34, s.head * 0.72, -s.head * 0.08);
        ear.rotation.set(-0.16, 0, side * 0.18);
        const outer = cap(s.head * 0.3, s.head * 1.4, fur, 8);
        outer.scale.set(0.58, 1, 0.32);
        outer.position.y = s.head * 0.72;
        ear.add(outer);
        const inner = sph(s.head * 0.21, this._m(s.inner || 0xd39a91), 0.45, 1.45, 0.15, 8);
        inner.position.set(0, s.head * 0.72, s.head * 0.1);
        ear.add(inner);
        ear.userData.long = true;
      } else if (s.ear === "deer") {
        ear.position.set(side * s.head * 0.58, s.head * 0.55, 0);
        ear.rotation.set(0.1, 0, side * 1.05);
        const outer = cap(s.head * 0.24, s.head * 0.5, fur, 7);
        outer.scale.set(0.65, 1, 0.35);
        outer.rotation.z = Math.PI / 2;
        ear.add(outer);
        const inner = sph(s.head * 0.13, this._m(0xc9a88c), 1.5, 0.55, 0.2, 7);
        ear.add(inner);
      } else {
        ear.position.set(side * s.head * 0.46, s.head * 0.68, -s.head * 0.05);
        ear.rotation.set(-0.14, 0, side * 0.23);
        const outer = new THREE.Mesh(new THREE.ConeGeometry(s.head * 0.36, s.head * 0.95, 5), fur);
        outer.position.y = s.head * 0.46;
        outer.scale.set(1, 1, 0.55);
        outer.castShadow = true;
        ear.add(outer);
        const inner = new THREE.Mesh(new THREE.ConeGeometry(s.head * 0.18, s.head * 0.62, 4), this._m(0xb08078));
        inner.position.set(0, s.head * 0.38, s.head * 0.1);
        inner.scale.set(1, 1, 0.25);
        ear.add(inner);
      }
      head.add(ear);
      this.ears.push(ear);
    }

    // antlers
    this.antlerGroups = [];
    if (s.antlers) {
      const antlerMat = this._m(0xd1c5a5);
      for (const side of [-1, 1]) {
        const group = new THREE.Group();
        group.position.set(side * s.head * 0.28, s.head * 0.85, -0.02);
        group.rotation.set(-0.2, 0, side * 0.3);
        head.add(group);
        this.antlerGroups.push(group);
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.035, s.head * 1.1, 5), antlerMat);
        stem.position.y = s.head * 0.54;
        stem.castShadow = true;
        group.add(stem);
        for (let b = 0; b < 2; b++) {
          const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.026, s.head * 0.52, 5), antlerMat);
          branch.position.set(side * 0.09, s.head * (0.7 + b * 0.28), 0);
          branch.rotation.z = side * (0.8 + b * 0.15);
          branch.castShadow = true;
          group.add(branch);
        }
      }
    }

    // tusks
    if (s.tusks) {
      const tuskMat = this._m(0xe6ddc7);
      for (const side of [-1, 1]) {
        const tusk = new THREE.Mesh(new THREE.ConeGeometry(s.head * 0.1, s.head * 0.5, 5), tuskMat);
        tusk.position.set(side * s.head * 0.42, -s.head * 0.28, s.head * 1.12);
        tusk.rotation.set(-0.4, 0, side * 0.2);
        tusk.castShadow = true;
        head.add(tusk);
      }
      const ridgeMat = this._m(s.dark);
      for (let i = 0; i < 5; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 4), ridgeMat);
        spike.position.set(0, s.body * 0.96, -s.bodyLen * 0.4 + i * s.bodyLen * 0.2);
        spike.castShadow = true;
        body.add(spike);
      }
    }

    // tail
    if (s.tail === "puff") {
      const puff = sph(s.body * 0.4, belly, 1, 1, 1, 9);
      puff.position.set(0, s.body * 0.25, -s.bodyLen - s.body * 0.3);
      body.add(puff);
    } else if (s.tail === "bush") {
      const tail = new THREE.Group();
      tail.position.set(0, s.body * 0.5, -s.bodyLen - s.body * 0.35);
      tail.rotation.x = -0.55;
      body.add(tail);
      this.tail = tail;
      const seg1 = cap(s.body * 0.22, s.body * 0.75, fur, 8);
      seg1.rotation.x = Math.PI / 2;
      seg1.position.z = -s.body * 0.33;
      tail.add(seg1);
      const seg2 = cap(s.body * 0.17, s.body * 0.55, fur2, 8);
      seg2.rotation.x = Math.PI / 2;
      seg2.position.z = -s.body * 0.92;
      tail.add(seg2);
      const tip = sph(s.body * 0.18, belly, 1, 1, 1.2, 8);
      tip.position.z = -s.body * 1.2;
      tail.add(tip);
    } else {
      const tail = new THREE.Group();
      tail.position.set(0, s.body * 0.55, -s.bodyLen - s.body * 0.42);
      tail.rotation.x = -0.5;
      body.add(tail);
      this.tail = tail;
      const t = cap(s.body * 0.075, s.body * 0.3, fur, 6);
      t.rotation.x = Math.PI / 2;
      t.position.z = -s.body * 0.2;
      tail.add(t);
    }

    // legs
    this.legs = [];
    const positions = [
      [-s.body * 0.62, s.bodyLen * 0.62, false],
      [s.body * 0.62, s.bodyLen * 0.62, false],
      [-s.body * 0.68, -s.bodyLen * 0.6, true],
      [s.body * 0.68, -s.bodyLen * 0.6, true],
    ];
    for (let i = 0; i < 4; i++) {
      const [x, z, rear] = positions[i];
      const hip = new THREE.Group();
      hip.position.set(x, s.legs, z);
      this.rig.add(hip);
      const upper = cap(s.body * 0.16, s.legs * 0.55, fur, 7);
      upper.position.y = -s.legs * 0.28;
      upper.scale.set(1, 1, 1);
      hip.add(upper);
      const knee = new THREE.Group();
      knee.position.y = -s.legs * 0.52;
      hip.add(knee);
      const lower = cap(s.body * 0.11, s.legs * 0.45, dark, 6);
      lower.position.y = -s.legs * 0.22;
      knee.add(lower);
      const paw = sph(s.body * 0.16, dark, 1.0, 0.55, 1.4, 7);
      paw.position.set(0, -s.legs * 0.48, s.body * 0.16);
      knee.add(paw);
      this.legs.push({ hip, knee, rear, offset: (i === 0 || i === 3) ? 0 : Math.PI });
    }

    // Collapse the many decorative meshes into one draw call per animated part.
    bakeGroup(body, this.matte);
    bakeGroup(head, this.matte);
    bakeGroup(eyeGroup, this.eyeMat);
    for (const ear of this.ears) bakeGroup(ear, this.matte);
    for (const group of this.antlerGroups) bakeGroup(group, this.matte);
    for (const leg of this.legs) {
      bakeGroup(leg.hip, this.matte);
      bakeGroup(leg.knee, this.matte);
    }
    if (this.tail) bakeGroup(this.tail, this.matte);

    // boss aura/eyes
    if (this.boss) {
      const aura = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 1.15, 24),
        new THREE.MeshBasicMaterial({ color: 0xd05a3a, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false })
      );
      aura.rotation.x = -Math.PI / 2;
      aura.position.y = 0.04;
      this.root.add(aura);
      this.aura = aura;
      this.eyeMat.emissiveIntensity = 1.7;
      this.eyeMat.color.setHex(0xff7a3a);
    }

    this.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 18),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    shadow.scale.set(1.2, 1.5, 1);
    this.root.add(shadow);
    this.shadow = shadow;
  }

  _buildBar() {
    const group = new THREE.Group();
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(0.84, 0.075),
      new THREE.MeshBasicMaterial({ color: 0x050806, transparent: true, opacity: 0.62, depthWrite: false, depthTest: false, fog: false })
    );
    const fill = new THREE.Mesh(
      new THREE.PlaneGeometry(0.78, 0.04),
      new THREE.MeshBasicMaterial({ color: this.spec.prey ? 0xf0b45f : 0xe36358, depthWrite: false, depthTest: false, fog: false })
    );
    fill.position.z = 0.002;
    group.add(bg, fill);
    group.renderOrder = 30;
    group.visible = false;
    this.scene.add(group);
    this.barGroup = group;
    this.barFill = fill;
    this.barWidth = 0.78;
  }

  updateBar(camera) {
    if (this.dead) { this.barGroup.visible = false; return; }
    const ratio = clamp(this.hp / this.maxHp, 0, 1);
    const visible = ratio < 0.999 || this.targeted || this.boss;
    this.barGroup.visible = visible;
    if (!visible) return;
    const y = this.root.position.y + this.spec.height * this.scaleValue * (this.boss ? 1.0 : 1.03) + 0.18;
    this.barGroup.position.set(this.root.position.x, y, this.root.position.z);
    this.barGroup.quaternion.copy(camera.quaternion);
    this.barFill.scale.x = Math.max(0.001, ratio);
    this.barFill.position.x = -(1 - ratio) * this.barWidth * 0.5;
    this.barFill.material.color.setHex(this.spec.prey ? (this.targeted ? 0xf7d58f : 0xf0b45f) : 0xe36358);
  }

  hit(damage, fromPos, knockback = 2.4) {
    if (this.dead) return false;
    this.hp = Math.max(0, this.hp - damage);
    this.hurtT = 0.36;
    this.flash = 1;
    this.state = "hurt";
    this.stateT = 0.24;
    const dx = this.root.position.x - fromPos.x, dz = this.root.position.z - fromPos.z;
    const len = Math.hypot(dx, dz) || 1;
    this.kb.set(dx / len, 0, dz / len).multiplyScalar(knockback * (this.boss ? 0.35 : 1));
    if (this.hp <= 0) this.die();
    return true;
  }

  die() {
    if (this.dead) return;
    this.dead = true;
    this.deathT = 0;
    this.state = "dead";
    this.barGroup.visible = false;
    if (this.aura) this.aura.visible = false;
    this.onDeath?.(this);
  }

  _move(dt, speed) {
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    this.root.position.x += fx * speed * dt;
    this.root.position.z += fz * speed * dt;
  }

  _avoid(dt) {
    const pos = this.root.position;
    for (const c of this.world.colliders) {
      const dx = pos.x - c.x, dz = pos.z - c.z;
      const d = Math.hypot(dx, dz);
      const min = c.r + this.radius;
      if (d < min && d > 0.0001) {
        const push = (min - d) * 0.65;
        pos.x += (dx / d) * push;
        pos.z += (dz / d) * push;
      }
    }
    for (const other of this.world.creatures || []) {
      if (other === this || other.dead) continue;
      const dx = pos.x - other.root.position.x, dz = pos.z - other.root.position.z;
      const d = Math.hypot(dx, dz);
      const min = this.radius + other.radius;
      if (d < min && d > 0.001) {
        const push = (min - d) * 0.4;
        pos.x += (dx / d) * push;
        pos.z += (dz / d) * push;
      }
    }
    const r = Math.hypot(pos.x, pos.z);
    if (r > 41) {
      pos.x = (pos.x / r) * 41;
      pos.z = (pos.z / r) * 41;
    }
  }

  update(dt, t, player, camera) {
    if (!this.dead) {
      const spec = this.spec;
      const px = player.position.x, pz = player.position.z;
      const dx = px - this.root.position.x, dz = pz - this.root.position.z;
      const dist = Math.hypot(dx, dz);
      const playerAlive = !player.dead;

      this.attackCd = Math.max(0, this.attackCd - dt);
      this.stateT -= dt;
      if (this.hurtT > 0) this.hurtT -= dt;
      if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 5);

      let moveSpeed = 0;
      let desiredHeading = this.heading;

      if (this.state === "hurt") {
        if (this.stateT <= 0) this.state = spec.prey ? "flee" : "chase";
      } else if (spec.prey) {
        if (dist < spec.flee && playerAlive) {
          this.state = "flee";
          desiredHeading = Math.atan2(-dx, -dz) + Math.sin(t * 5 + this.phase) * 0.22;
          moveSpeed = this.speed;
        } else if (this.state === "flee" && dist > spec.flee * 1.5) {
          this.state = "wander";
          this.stateT = 1 + Math.random() * 2;
        } else {
          if (this.stateT <= 0 || this.root.position.distanceTo(this.wander) < 1.2) {
            const spot = this.world.openSpot(Math.random, 4, 34, 1.2);
            this.wander.set(spot.x, 0, spot.z);
            this.stateT = 2 + Math.random() * 3;
          }
          if (this.root.position.distanceTo(this.wander) > 1.4) {
            desiredHeading = Math.atan2(this.wander.x - this.root.position.x, this.wander.z - this.root.position.z);
            moveSpeed = this.speed * 0.28;
          }
          this.state = "wander";
        }
      } else {
        const aggro = this.boss ? Math.max(spec.aggro, 24) : spec.aggro;
        if (playerAlive && dist < aggro) {
          if (this.state === "windup") {
            this.windup -= dt;
            moveSpeed = this.speed * 0.18;
            desiredHeading = Math.atan2(dx, dz);
            if (this.windup <= 0) {
              this.state = "recover";
              this.stateT = 0.48;
              if (dist < spec.range + 1.1) {
                this.onAttack?.(this);
                this.lunge = 1;
              }
            }
          } else if (this.state === "recover") {
            if (this.stateT <= 0) this.state = "chase";
            desiredHeading = Math.atan2(dx, dz);
            moveSpeed = -this.speed * 0.16;
          } else {
            this.state = "chase";
            desiredHeading = Math.atan2(dx, dz);
            if (dist > spec.range * 0.72) moveSpeed = this.speed;
            else if (this.attackCd <= 0) {
              this.state = "windup";
              this.windup = this.boss ? 0.48 : 0.58;
              this.attackCd = (this.boss ? 1.35 : 1.65) + Math.random() * 0.7;
            } else {
              // circle the pup while waiting to strike
              desiredHeading = Math.atan2(dx, dz) + 0.7;
              moveSpeed = this.speed * 0.4;
            }
          }
        } else {
          if (this.stateT <= 0 || this.root.position.distanceTo(this.wander) < 1.3) {
            const spot = this.world.openSpot(Math.random, 5, 35, 1.2);
            this.wander.set(spot.x, 0, spot.z);
            this.stateT = 2.5 + Math.random() * 4;
          }
          this.state = "wander";
          if (this.root.position.distanceTo(this.wander) > 1.4) {
            desiredHeading = Math.atan2(this.wander.x - this.root.position.x, this.wander.z - this.root.position.z);
            moveSpeed = this.speed * 0.24;
          }
        }
      }

      // keep a minimum distance from the player
      if (playerAlive && dist < this.radius + 0.75 && dist > 0.001) {
        this.root.position.x -= (dx / dist) * 0.04;
        this.root.position.z -= (dz / dist) * 0.04;
      }

      this.heading = dampAngle(this.heading, desiredHeading, this.state === "flee" ? 8 : 5.5, dt);
      const moving = Math.abs(moveSpeed) > 0.1;
      if (moving) {
        this._move(dt, moveSpeed);
        this.phase += dt * (4 + Math.abs(moveSpeed) * 2.1);
      } else {
        this.phase += dt * 1.4;
      }
      if (this.lunge > 0) {
        this._move(dt, (this.boss ? 7 : 5.2));
        this.lunge = Math.max(0, this.lunge - dt * 4);
      }
      if (this.kb.lengthSq() > 0.001) {
        this.root.position.x += this.kb.x * dt;
        this.root.position.z += this.kb.z * dt;
        this.kb.multiplyScalar(Math.max(0, 1 - dt * 8));
      }
      this._avoid(dt);

      const hop = spec.hop ? Math.abs(Math.sin(this.phase)) * 0.26 * clamp(Math.abs(moveSpeed) / this.speed, 0, 1) : 0;
      this.root.position.y = this.world.heightAt(this.root.position.x, this.root.position.z) + hop;
      this.root.rotation.y = this.heading;

      // animation
      const stride = clamp(Math.abs(moveSpeed) / this.speed, 0, 1.1);
      this.body.position.y = spec.legs + spec.body * 0.9 + (moving ? Math.abs(Math.sin(this.phase * 2)) * 0.025 * stride : Math.sin(t * 1.2 + this.phase) * 0.006);
      this.body.rotation.z = Math.sin(this.phase) * 0.03 * stride;
      const headTurn = clamp(Math.atan2(dx, dz) - this.heading, -1.2, 1.2);
      this.head.rotation.y = damp(this.head.rotation.y, headTurn * 0.65, 5, dt);
      this.head.rotation.x = Math.sin(this.phase * 2) * 0.04 * stride + (this.state === "windup" ? 0.18 : 0);
      for (const leg of this.legs) {
        const sw = Math.sin(this.phase + leg.offset);
        leg.hip.rotation.x = sw * (0.25 + stride * 0.6);
        leg.knee.rotation.x = Math.max(0, Math.cos(this.phase + leg.offset)) * (0.15 + stride * 0.5);
        if (leg.rear) leg.knee.rotation.x *= 0.8;
      }
      if (spec.hop) {
        const hopT = clamp(Math.abs(moveSpeed) / this.speed, 0, 1);
        this.legs.forEach((leg, i) => {
          leg.hip.rotation.x = (i < 2 ? -0.65 : 0.7) * hopT + Math.sin(this.phase + leg.offset) * 0.15 * hopT;
          leg.knee.rotation.x = 0.7 * hopT;
        });
        this.root.position.y += Math.max(0, Math.sin(this.phase * 2)) * 0.16 * hopT;
      }
      if (this.ears) {
        this.ears.forEach((ear, i) => {
          ear.rotation.x = (ear.userData.long ? -0.16 : -0.12) + Math.sin(t * 2 + i) * 0.03 + (this.state === "windup" ? -0.2 : 0);
        });
      }
      if (this.tail) {
        this.tail.rotation.y = Math.sin(t * (this.spec.prey ? 6 : 3.2) + this.phase) * 0.3;
      }
      if (this.aura) {
        this.aura.rotation.z += dt * 0.4;
        this.aura.material.opacity = 0.2 + Math.sin(t * 2) * 0.08;
      }
      this.eyeMat.emissiveIntensity = this.state === "windup" ? 2.0 : (this.boss ? 1.6 : 0.55);

      // flash on hit
      if (this.flash > 0) {
        this.furMat.emissive = this.furMat.emissive || new THREE.Color();
        this.furMat.emissive.setRGB(0.8 * this.flash, 0.15 * this.flash, 0.08 * this.flash);
      } else if (this.furMat.emissive && !this.boss) {
        this.furMat.emissive.setRGB(0, 0, 0);
      }
      this.shadow.position.y = 0.02 - hop;
      this.shadow.scale.setScalar(1 - hop * 0.5);
    } else {
      this.deathT += dt;
      this.root.rotation.z = damp(this.root.rotation.z, Math.PI * 0.47, 5, dt);
      this.root.position.y = damp(this.root.position.y, this.world.heightAt(this.root.position.x, this.root.position.z) - 0.14, 4, dt);
      this.rig.scale.setScalar(damp(this.rig.scale.x, 0.92, 2, dt));
    }

    this.updateBar(camera);
  }

  dispose() {
    this.scene.remove(this.root);
    this.scene.remove(this.barGroup);
    this.root.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const arr = Array.isArray(o.material) ? o.material : [o.material];
        arr.forEach(m => m.dispose());
      }
    });
    this.barGroup.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
    this._mats.forEach(m => m.dispose());
    this.matte?.dispose();
  }
}
