import * as THREE from "three";
import { glowTexture } from "./util.js";

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.points = [];
    this.rings = [];
  }

  burst(pos, color = 0xf0b45f, count = 22, speed = 4.4, size = 0.22, life = 0.8, gravity = -5) {
    const positions = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
      const a = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI;
      const s = speed * (0.35 + Math.random() * 0.8);
      vel.push(new THREE.Vector3(Math.sin(p) * Math.cos(a) * s, Math.abs(Math.cos(p)) * s * 0.8, Math.sin(p) * Math.sin(a) * s));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size, map: glowTexture(), color, transparent: true, opacity: 1, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.scene.add(pts);
    this.points.push({ pts, vel, life, maxLife: life, gravity, positions });
  }

  dust(pos, color = 0x9a8660, count = 8) {
    this.burst(new THREE.Vector3(pos.x, pos.y + 0.08, pos.z), color, count, 1.3, 0.34, 0.55, -0.6);
  }

  ring(pos, color = 0xf0b45f, radius = 1.4, life = 0.45, arc = Math.PI * 2) {
    const geo = new THREE.RingGeometry(radius * 0.45, radius, 24, 1, 0, arc);
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.8, side: THREE.DoubleSide,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(pos.x, pos.y + 0.06, pos.z);
    mesh.renderOrder = 6;
    this.scene.add(mesh);
    this.rings.push({ mesh, life, maxLife: life, base: radius });
  }

  swipe(pos, heading) {
    const geo = new THREE.RingGeometry(0.9, 1.7, 18, 1, -0.8, 1.6);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffd9a0, transparent: true, opacity: 0.55, side: THREE.DoubleSide,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos.x, pos.y + 0.5, pos.z);
    mesh.rotation.set(-Math.PI / 2, 0, -heading + 0.8);
    mesh.renderOrder = 7;
    this.scene.add(mesh);
    this.rings.push({ mesh, life: 0.26, maxLife: 0.26, base: 1, swipe: true });
  }

  update(dt) {
    for (let i = this.points.length - 1; i >= 0; i--) {
      const p = this.points[i];
      p.life -= dt;
      const arr = p.positions;
      for (let j = 0; j < p.vel.length; j++) {
        const v = p.vel[j];
        v.y += p.gravity * dt;
        arr[j * 3] += v.x * dt;
        arr[j * 3 + 1] += v.y * dt;
        arr[j * 3 + 2] += v.z * dt;
        v.multiplyScalar(1 - dt * 1.3);
      }
      p.pts.geometry.attributes.position.needsUpdate = true;
      p.pts.material.opacity = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) {
        this.scene.remove(p.pts);
        p.pts.geometry.dispose();
        p.pts.material.dispose();
        this.points.splice(i, 1);
      }
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      const t = 1 - r.life / r.maxLife;
      if (r.swipe) {
        r.mesh.scale.setScalar(1 + t * 0.4);
        r.mesh.material.opacity = Math.max(0, 0.55 * (1 - t));
      } else {
        r.mesh.scale.setScalar(0.6 + t * 0.9);
        r.mesh.material.opacity = Math.max(0, 0.8 * (1 - t));
      }
      if (r.life <= 0) {
        this.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        this.rings.splice(i, 1);
      }
    }
  }

  clear() {
    for (const p of this.points) {
      this.scene.remove(p.pts); p.pts.geometry.dispose(); p.pts.material.dispose();
    }
    for (const r of this.rings) {
      this.scene.remove(r.mesh); r.mesh.geometry.dispose(); r.mesh.material.dispose();
    }
    this.points.length = 0;
    this.rings.length = 0;
  }
}
