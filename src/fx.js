import * as THREE from '../vendor/three.module.min.js';

const MAX_PARTICLES = 420;

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.positions = new Float32Array(MAX_PARTICLES * 3);
    this.colors = new Float32Array(MAX_PARTICLES * 3);
    this.sizes = new Float32Array(MAX_PARTICLES);
    this.alphas = new Float32Array(MAX_PARTICLES);
    this.velocities = new Float32Array(MAX_PARTICLES * 3);
    this.life = new Float32Array(MAX_PARTICLES);
    this.maxLife = new Float32Array(MAX_PARTICLES);
    this.gravity = new Float32Array(MAX_PARTICLES);
    this.cursor = 0;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(this.alphas, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = alpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (320.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.05, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      vertexColors: true
    });

    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 6;
    scene.add(this.points);

    this.rings = [];
    this.texts = [];
    this.tmpColor = new THREE.Color();
  }

  spawnBurst(position, color, count = 10, options = {}) {
    const speed = options.speed ?? 3;
    const up = options.up ?? 1.6;
    const life = options.life ?? 0.6;
    const size = options.size ?? 0.16;
    const gravity = options.gravity ?? 4;
    const spread = options.spread ?? 1;
    const colorObj = this.tmpColor.set(color);
    for (let i = 0; i < count; i += 1) {
      const idx = this.cursor;
      this.cursor = (this.cursor + 1) % MAX_PARTICLES;
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * speed;
      this.positions[idx * 3] = position.x + (Math.random() - 0.5) * 0.2 * spread;
      this.positions[idx * 3 + 1] = position.y + (Math.random() - 0.5) * 0.2 * spread;
      this.positions[idx * 3 + 2] = position.z + (Math.random() - 0.5) * 0.2 * spread;
      this.velocities[idx * 3] = Math.cos(a) * s;
      this.velocities[idx * 3 + 1] = up * (0.35 + Math.random() * 0.9);
      this.velocities[idx * 3 + 2] = Math.sin(a) * s;
      this.colors[idx * 3] = colorObj.r;
      this.colors[idx * 3 + 1] = colorObj.g;
      this.colors[idx * 3 + 2] = colorObj.b;
      this.sizes[idx] = size * (0.6 + Math.random() * 0.8);
      this.alphas[idx] = 1;
      this.life[idx] = life * (0.6 + Math.random() * 0.7);
      this.maxLife[idx] = this.life[idx];
      this.gravity[idx] = gravity;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    this.points.geometry.attributes.size.needsUpdate = true;
    this.points.geometry.attributes.alpha.needsUpdate = true;
  }

  spawnDust(position, color = 0xb9a77c, count = 8) {
    this.spawnBurst(position, color, count, { speed: 1.8, up: 0.8, life: 0.5, size: 0.24, gravity: 1.5 });
  }

  spawnRing(position, color = 0x6ff4ec, scale = 1) {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.72, 28),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(position);
    mesh.position.y = 0.05;
    mesh.scale.setScalar(scale);
    mesh.renderOrder = 5;
    this.scene.add(mesh);
    this.rings.push({ mesh, t: 0, life: 0.45, scale });
  }

  spawnText(position, text, color = '#8ffcf2', size = 1) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.font = '800 62px Trebuchet MS, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(2,8,8,0.85)';
    ctx.strokeText(text, 256, 64);
    ctx.fillStyle = color;
    ctx.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      depthTest: false
    }));
    sprite.position.copy(position);
    sprite.scale.set(2.8 * size, 0.7 * size, 1);
    sprite.renderOrder = 10;
    this.scene.add(sprite);
    this.texts.push({ sprite, tex, t: 0, life: 1.15, startY: position.y });
  }

  update(dt) {
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.alphas[i] = 0;
        continue;
      }
      this.velocities[i * 3 + 1] -= this.gravity[i] * dt;
      this.positions[i * 3] += this.velocities[i * 3] * dt;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * dt;
      this.alphas[i] = Math.min(1, this.life[i] / (this.maxLife[i] * 0.45));
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.alpha.needsUpdate = true;

    for (let i = this.rings.length - 1; i >= 0; i -= 1) {
      const ring = this.rings[i];
      ring.t += dt;
      const p = ring.t / ring.life;
      ring.mesh.scale.setScalar(ring.scale * (1 + p * 2.6));
      ring.mesh.material.opacity = Math.max(0, 0.8 * (1 - p));
      if (p >= 1) {
        this.scene.remove(ring.mesh);
        ring.mesh.geometry.dispose();
        ring.mesh.material.dispose();
        this.rings.splice(i, 1);
      }
    }

    for (let i = this.texts.length - 1; i >= 0; i -= 1) {
      const item = this.texts[i];
      item.t += dt;
      const p = item.t / item.life;
      item.sprite.position.y = item.startY + p * 1.1;
      item.sprite.material.opacity = p < 0.7 ? 1 : Math.max(0, 1 - (p - 0.7) / 0.3);
      if (p >= 1) {
        this.scene.remove(item.sprite);
        item.sprite.material.dispose();
        item.tex.dispose();
        this.texts.splice(i, 1);
      }
    }
  }

  clear() {
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.life[i] = 0;
      this.alphas[i] = 0;
    }
    this.points.geometry.attributes.alpha.needsUpdate = true;
    for (const ring of this.rings) {
      this.scene.remove(ring.mesh);
      ring.mesh.geometry.dispose();
      ring.mesh.material.dispose();
    }
    this.rings.length = 0;
    for (const item of this.texts) {
      this.scene.remove(item.sprite);
      item.sprite.material.dispose();
      item.tex.dispose();
    }
    this.texts.length = 0;
  }
}
