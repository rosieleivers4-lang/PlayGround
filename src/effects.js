import * as THREE from 'three';
import { TAU } from './utils.js';

function softTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.bursts = [];
    this.slashes = [];
    this.decals = [];
    this.texture = softTexture();
    this.decalGeo = new THREE.CircleGeometry(1, 10);
    this.slashGeo = new THREE.TorusGeometry(1, 0.04, 4, 18, 2.1);
  }

  burst(position, options = {}) {
    const count = options.count ?? 18;
    const color = options.color ?? 0x7a1008;
    const speed = options.speed ?? 5;
    const size = options.size ?? 0.13;
    const life = options.life ?? 0.9;
    const gravity = options.gravity ?? 11;
    const additive = Boolean(options.additive);
    const spread = options.spread ?? 1;
    const dir = options.dir;

    const positions = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x + (Math.random() - 0.5) * 0.25;
      positions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.25;
      const theta = Math.random() * TAU;
      const phi = Math.random() * Math.PI;
      const s = speed * (0.35 + Math.random() * 0.85);
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * s * spread + (dir?.x || 0) * speed * 0.5;
      vel[i * 3 + 1] = Math.cos(phi) * s * 0.7 + (options.up ?? 2.2) + (dir?.y || 0) * speed * 0.4;
      vel[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * s * spread + (dir?.z || 0) * speed * 0.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      map: this.texture,
      color,
      size,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    this.scene.add(points);
    this.bursts.push({ points, geo, mat, positions, vel, life, age: 0, gravity, count });
  }

  blood(position, dir, amount = 1) {
    this.burst(position, {
      count: Math.round(16 * amount),
      color: 0x7a0c06,
      speed: 5.5,
      size: 0.14,
      life: 0.85,
      gravity: 13,
      dir,
    });
    this.burst(position, {
      count: Math.round(7 * amount),
      color: 0xb8200d,
      speed: 7,
      size: 0.09,
      life: 0.55,
      gravity: 10,
      dir,
    });
  }

  sparks(position, color = 0xffd27a) {
    this.burst(position, {
      count: 12,
      color,
      speed: 4.2,
      size: 0.08,
      life: 0.38,
      gravity: 2,
      additive: true,
      up: 1.2,
    });
  }

  dust(position, color = 0x9a8a68) {
    this.burst(position, {
      count: 6,
      color,
      speed: 1.4,
      size: 0.24,
      life: 0.7,
      gravity: 0.4,
      up: 0.6,
    });
  }

  slash(position, heading, color = 0xfff1c8) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(this.slashGeo, mat);
    mesh.position.set(
      position.x + Math.sin(heading) * 0.95,
      position.y + 0.92,
      position.z + Math.cos(heading) * 0.95
    );
    // Keep the arc upright in front of the muzzle instead of lying flat on
    // the ground like a painted ring.
    mesh.rotation.set(0, heading, -0.42);
    mesh.scale.setScalar(0.85);
    mesh.renderOrder = 12;
    this.scene.add(mesh);
    this.slashes.push({ mesh, mat, age: 0, life: 0.24 });
  }

  decal(position, radius = 0.7, color = 0x360a05) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(this.decalGeo, mat);
    mesh.position.set(position.x, position.y + 0.025, position.z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.setScalar(radius * (0.8 + Math.random() * 0.5));
    mesh.renderOrder = 2;
    this.scene.add(mesh);
    this.decals.push({ mesh, mat, age: 0, life: 26 });
    if (this.decals.length > 28) {
      const old = this.decals.shift();
      this.scene.remove(old.mesh);
      old.mat.dispose();
    }
  }

  update(dt) {
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.age += dt;
      const t = b.age / b.life;
      if (t >= 1) {
        this.scene.remove(b.points);
        b.geo.dispose();
        b.mat.dispose();
        this.bursts.splice(i, 1);
        continue;
      }
      const arr = b.positions;
      for (let j = 0; j < b.count; j++) {
        const k = j * 3;
        b.vel[k + 1] -= b.gravity * dt;
        arr[k] += b.vel[k] * dt;
        arr[k + 1] += b.vel[k + 1] * dt;
        arr[k + 2] += b.vel[k + 2] * dt;
        if (arr[k + 1] < 0.02) {
          arr[k + 1] = 0.02;
          b.vel[k + 1] *= -0.18;
          b.vel[k] *= 0.6;
          b.vel[k + 2] *= 0.6;
        }
      }
      b.points.geometry.attributes.position.needsUpdate = true;
      b.mat.opacity = 1 - Math.pow(t, 1.7);
    }

    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const s = this.slashes[i];
      s.age += dt;
      const t = s.age / s.life;
      if (t >= 1) {
        this.scene.remove(s.mesh);
        s.mat.dispose();
        this.slashes.splice(i, 1);
        continue;
      }
      s.mesh.scale.setScalar(0.85 + t * 0.55);
      s.mat.opacity = (1 - t) * 0.78;
    }

    for (let i = this.decals.length - 1; i >= 0; i--) {
      const d = this.decals[i];
      d.age += dt;
      if (d.age >= d.life) {
        this.scene.remove(d.mesh);
        d.mat.dispose();
        this.decals.splice(i, 1);
      } else if (d.age > d.life - 4) {
        d.mat.opacity = 0.58 * ((d.life - d.age) / 4);
      }
    }
  }

  clear() {
    for (const b of this.bursts) {
      this.scene.remove(b.points);
      b.geo.dispose();
      b.mat.dispose();
    }
    this.bursts.length = 0;
    for (const s of this.slashes) {
      this.scene.remove(s.mesh);
      s.mat.dispose();
    }
    this.slashes.length = 0;
    for (const d of this.decals) {
      this.scene.remove(d.mesh);
      d.mat.dispose();
    }
    this.decals.length = 0;
  }

  dispose() {
    this.clear();
    this.texture.dispose();
    this.decalGeo.dispose();
    this.slashGeo.dispose();
  }
}
