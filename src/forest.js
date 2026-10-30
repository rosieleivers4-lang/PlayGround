import * as THREE from 'three';
import { clamp, lerp, smoothstep, mulberry32 } from './util.js';

const TAU = Math.PI * 2;

function makeCanvas(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function groundTexture() {
  const c = makeCanvas(256);
  const g = c.getContext('2d');
  g.fillStyle = '#b9b9a9';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * 256, y = Math.random() * 256;
    const v = Math.random();
    g.fillStyle = v > .55 ? `rgba(70,60,38,${.08 + Math.random() * .2})` : `rgba(210,208,170,${.05 + Math.random() * .2})`;
    g.beginPath();
    g.ellipse(x, y, 1 + Math.random() * 8, .6 + Math.random() * 2.5, Math.random() * TAU, 0, TAU);
    g.fill();
  }
  for (let i = 0; i < 160; i++) {
    g.strokeStyle = `rgba(50,45,28,${.06 + Math.random() * .12})`;
    g.lineWidth = .5 + Math.random();
    const x = Math.random() * 256, y = Math.random() * 256;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(26, 26);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function barkTexture(birch = false) {
  const c = makeCanvas(256);
  const g = c.getContext('2d');
  if (birch) {
    g.fillStyle = '#d8d4c4'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 256, y = Math.random() * 256;
      g.fillStyle = `rgba(25,24,20,${.5 + Math.random() * .4})`;
      g.beginPath();
      g.ellipse(x, y, 3 + Math.random() * 15, 1 + Math.random() * 2.2, Math.random() * .25, 0, TAU);
      g.fill();
    }
    for (let i = 0; i < 80; i++) {
      g.fillStyle = `rgba(90,85,70,${Math.random() * .18})`;
      g.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 5, 1 + Math.random() * 2);
    }
  } else {
    g.fillStyle = '#aaaaaa'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * 256;
      g.strokeStyle = `rgba(${50 + Math.random() * 60},${45 + Math.random() * 50},${35 + Math.random() * 40},${.15 + Math.random() * .25})`;
      g.lineWidth = 1 + Math.random() * 4;
      g.beginPath();
      g.moveTo(x, 0);
      g.bezierCurveTo(x + Math.random() * 30 - 15, 80, x + Math.random() * 30 - 15, 170, x + Math.random() * 20 - 10, 256);
      g.stroke();
    }
    for (let i = 0; i < 100; i++) {
      g.fillStyle = `rgba(20,16,10,${Math.random() * .25})`;
      g.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 4, 1 + Math.random() * 6);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function radialTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)', size = 128) {
  const c = makeCanvas(size);
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, inner);
  grd.addColorStop(.35, 'rgba(255,255,255,.65)');
  grd.addColorStop(1, outer);
  g.fillStyle = grd; g.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function cloudTexture() {
  const c = makeCanvas(256);
  const g = c.getContext('2d');
  g.clearRect(0, 0, 256, 256);
  for (let i = 0; i < 26; i++) {
    const x = 40 + Math.random() * 176, y = 65 + Math.random() * 120;
    const r = 18 + Math.random() * 42;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, `rgba(255,255,255,${.03 + Math.random() * .06})`);
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function tuftGeometry() {
  const positions = [];
  const indices = [];
  let vi = 0;
  for (let b = 0; b < 5; b++) {
    const a = (b / 5) * TAU + Math.random() * .5;
    const lean = .18 + Math.random() * .25;
    const h = .45 + Math.random() * .38;
    const w = .035 + Math.random() * .025;
    const dx = Math.cos(a) * lean, dz = Math.sin(a) * lean;
    const px = Math.cos(a) * w, pz = Math.sin(a) * w;
    positions.push(-px, 0, -pz, px, 0, pz, dx, h, dz);
    indices.push(vi, vi + 1, vi + 2);
    vi += 3;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function setMatrix(pos, quat, scale) {
  return new THREE.Matrix4().compose(pos, quat, scale);
}
const _q = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

export class Forest {
  constructor(scene, config, quality = 'med') {
    this.scene = scene;
    this.config = config;
    this.cfg = config;
    this.chapter = config.chapter;
    this.quality = quality;
    this.root = new THREE.Group();
    this.root.name = 'forest';
    this.colliders = [];
    this.treeCount = 0;
    this.time = 0;
    this.phase = config.phase;
    this.elapsed = 0;
    this.gateActive = false;
    this.gateReached = false;
    this.weather = config.weather;
    this.rng = mulberry32(config.seed);
    this.qualityScale = quality === 'high' ? 1 : quality === 'med' ? .74 : .5;
    this.chapterColor = new THREE.Color(this.chapter.accent);
    this.sunColor = new THREE.Color(this.chapter.sunColor);
    this.nightLight = new THREE.Color(this.chapter.nightLight);
    this.tmpV = new THREE.Vector3();
    this.tmpC = new THREE.Color();
    this.skyDayTop = new THREE.Color(this.chapter.dayTop);
    this.skyDayHorizon = new THREE.Color(this.chapter.dayHorizon);
    this.skyNightTop = new THREE.Color(this.chapter.nightTop);
    this.skyNightHorizon = new THREE.Color(this.chapter.nightHorizon);
    this.fogDay = new THREE.Color(this.chapter.fogDay);
    this.fogNight = new THREE.Color(this.chapter.fogNight);
    this.moonDir = new THREE.Vector3(0, 1, 0);
    this.sunDir = new THREE.Vector3(0, 1, 0);
    this.dayFactor = 1;
    this.isNight = false;

    this._heightA = 0.7 + this.rng() * 1.4;
    this._heightB = 0.6 + this.rng() * 1.1;
    this._heightOff1 = this.rng() * 10;
    this._heightOff2 = this.rng() * 10;

    const gateAngle = (this.cfg.seed % 360) / 360 * TAU;
    this.gateAngle = gateAngle;
    this.gatePos = new THREE.Vector3(Math.cos(gateAngle) * 46, 0, Math.sin(gateAngle) * 46);
    this.gatePos.y = this.heightAt(this.gatePos.x, this.gatePos.z);

    this.buildSky();
    this.buildLights();
    this.buildTerrain();
    this.buildMountains();
    this.buildForest();
    this.buildGroundDetails();
    this.buildParticles();
    this.buildWeather();
    this.buildGate();
    this.update(0, 0, new THREE.Vector3(), new THREE.Vector3());
    scene.add(this.root);
  }

  heightAt(x, z) {
    const r = Math.hypot(x, z);
    const rolling =
      Math.sin(x * .052 + this._heightOff1) * Math.cos(z * .047 + this._heightOff2) * this._heightA +
      Math.sin(x * .119 - z * .084 + this._heightOff1 * .7) * .55 +
      Math.cos(x * .026 + z * .031 + this._heightOff2) * this._heightB;
    const edge = smoothstep(28, 74, r);
    const rim = edge * (2.2 + Math.sin(x * .077 + z * .061 + this._heightOff1) * 2.4);
    return rolling * (0.25 + smoothstep(5, 20, r) * .75) * .85 + rim;
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(620, 40, 22);
    this.skyUniforms = {
      uTop: { value: this.skyDayTop.clone() },
      uHorizon: { value: this.skyDayHorizon.clone() },
      uSun: { value: this.sunColor.clone() },
      uSunDir: { value: new THREE.Vector3(0, .5, .2) },
      uMoonDir: { value: new THREE.Vector3(0, -.5, -.2) },
      uNight: { value: 0 },
      uTime: { value: 0 }
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      toneMapped: false,
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vWorld = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        uniform vec3 uTop, uHorizon, uSun, uSunDir, uMoonDir;
        uniform float uNight, uTime;
        void main() {
          vec3 d = normalize(vWorld);
          float h = clamp(d.y, -0.15, 1.0);
          float grad = pow(smoothstep(0.0, 0.85, h), 0.72);
          vec3 col = mix(uHorizon, uTop, grad);
          float sd = max(dot(d, normalize(uSunDir)), 0.0);
          col += uSun * (pow(sd, 260.0) * 1.9 + pow(sd, 14.0) * 0.22);
          float md = max(dot(d, normalize(uMoonDir)), 0.0);
          col += vec3(0.62, 0.74, 1.0) * pow(md, 900.0) * uNight * 1.15;
          // faint high cloud bands
          float band = sin(d.x * 6.0 + uTime * .008) * sin(d.z * 5.0 - uTime * .006);
          col += vec3(0.05, 0.06, 0.05) * smoothstep(.45, 1.0, h) * (band * .5 + .5) * 0.12;
          col = mix(vec3(0.015, 0.024, 0.022), col, smoothstep(-0.18, 0.02, d.y));
          gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(0.4545)), 1.0);
        }
      `
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    this.root.add(this.sky);

    // stars
    const starPos = [];
    const starCol = [];
    const srng = mulberry32(this.cfg.seed + 71);
    for (let i = 0; i < 900; i++) {
      const theta = srng() * TAU;
      const phi = Math.acos(srng() * .94 + .04);
      const r = 500;
      starPos.push(Math.sin(phi) * Math.cos(theta) * r, Math.cos(phi) * r, Math.sin(phi) * Math.sin(theta) * r);
      const v = .55 + srng() * .45;
      starCol.push(v * .8, v * .9, v);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    sg.setAttribute('color', new THREE.Float32BufferAttribute(starCol, 3));
    this.starMat = new THREE.PointsMaterial({ size: 1.9, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.stars = new THREE.Points(sg, this.starMat);
    this.stars.renderOrder = -9;
    this.root.add(this.stars);

    const tex = radialTexture();
    this.moonMat = new THREE.SpriteMaterial({ map: tex, color: 0xdceaff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.moon = new THREE.Sprite(this.moonMat);
    this.moon.scale.set(48, 48, 1);
    this.moon.renderOrder = -8;
    this.root.add(this.moon);

    this.cloudTex = cloudTexture();
    this.mistSprites = [];
    const mrng = mulberry32(this.cfg.seed + 908);
    for (let i = 0; i < 9; i++) {
      const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.cloudTex, color: 0xdfe6d7, transparent: true, opacity: .13, depthWrite: false, fog: true }));
      const a = mrng() * TAU;
      const r = 8 + mrng() * 44;
      m.position.set(Math.cos(a) * r, 1.6 + mrng() * 2.6, Math.sin(a) * r);
      m.scale.set(16 + mrng() * 18, 7 + mrng() * 6, 1);
      m.userData.base = m.position.clone();
      m.userData.speed = .1 + mrng() * .25;
      m.userData.phase = mrng() * 10;
      this.mistSprites.push(m);
      this.root.add(m);
    }
  }

  buildLights() {
    this.hemi = new THREE.HemisphereLight(0xb8d9d1, 0x3a4731, .9);
    this.root.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffe1a6, 2.7);
    this.sun.castShadow = this.quality !== 'low';
    const size = this.quality === 'high' ? 2048 : 1024;
    this.sun.shadow.mapSize.set(size, size);
    this.sun.shadow.camera.left = -34;
    this.sun.shadow.camera.right = 34;
    this.sun.shadow.camera.top = 34;
    this.sun.shadow.camera.bottom = -34;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 130;
    this.sun.shadow.bias = -0.0008;
    this.sun.shadow.normalBias = .045;
    this.sun.target.position.set(0, 0, 0);
    this.root.add(this.sun);
    this.root.add(this.sun.target);
    this.ambient = new THREE.AmbientLight(0x506b5e, .4);
    this.root.add(this.ambient);
  }

  buildTerrain() {
    const seg = this.quality === 'high' ? 120 : this.quality === 'med' ? 88 : 58;
    const geo = new THREE.PlaneGeometry(180, 180, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = [];
    const cA = new THREE.Color(this.chapter.ground[0]);
    const cB = new THREE.Color(this.chapter.ground[1]);
    const cC = new THREE.Color(this.chapter.ground[2]);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const y = this.heightAt(x, z);
      pos.setY(i, y);
      const r = Math.hypot(x, z);
      const n = (Math.sin(x * .71 + z * .53 + this.cfg.seed) * .5 + .5) * .65 + (Math.random() * .2);
      tmp.copy(cA).lerp(cB, n);
      if (n > .72) tmp.lerp(cC, .35);
      if (r < 15) tmp.lerp(cB, .18);
      if (r > 64) tmp.lerp(cC, .35);
      const shade = .82 + Math.sin(x * 1.7) * .06 + Math.cos(z * 1.9) * .05;
      colors.push(tmp.r * shade, tmp.g * shade, tmp.b * shade);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    this.groundTex = groundTexture();
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: this.groundTex, roughness: 1, metalness: 0 });
    this.terrain = new THREE.Mesh(geo, mat);
    this.terrain.receiveShadow = true;
    this.root.add(this.terrain);
  }

  makeRidge(radius, segments, minH, maxH, seed, color) {
    const rng = mulberry32(seed);
    const verts = [];
    const idx = [];
    let h = minH;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * TAU;
      if (i < segments) {
        h = minH + (rng() * .7 + Math.sin(a * 3.1 + seed) * .3 + 1) * (maxH - minH) * .5;
        if (rng() > .82) h += (maxH - minH) * .3;
      }
      const x = Math.cos(a) * radius, z = Math.sin(a) * radius;
      verts.push(x, -8, z, x, h, z);
      if (i < segments) {
        const b = i * 2;
        idx.push(b, b + 2, b + 1, b + 2, b + 3, b + 1);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ color, fog: false, side: THREE.DoubleSide });
    return new THREE.Mesh(geo, mat);
  }

  buildMountains() {
    const near = this.makeRidge(132, 96, 9, 30, this.cfg.seed + 12, 0x273a35);
    const far = this.makeRidge(195, 80, 16, 54, this.cfg.seed + 55, 0x334a44);
    near.renderOrder = -6;
    far.renderOrder = -7;
    this.ridgeMats = [near.material, far.material];
    this.root.add(far, near);
    this.ridges = [near, far];
  }

  bucket(key, geo, mat, cast = true) {
    if (!this._buckets) this._buckets = new Map();
    if (!this._buckets.has(key)) this._buckets.set(key, { geo, mat, mats: [], cols: [], cast });
    return this._buckets.get(key);
  }

  addInst(key, geo, mat, matrix, color = null, cast = true) {
    const b = this.bucket(key, geo, mat, cast);
    b.mats.push(matrix);
    b.cols.push(color);
  }

  scatterMatrix(x, y, z, rotY, sx, sy, sz) {
    _q.setFromAxisAngle(_up, rotY);
    return setMatrix(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx, sy, sz));
  }

  buildForest() {
    this.barkTex = barkTexture(false);
    this.birchTex = barkTexture(true);
    this.barkMat = new THREE.MeshStandardMaterial({ map: this.barkTex, color: 0xffffff, roughness: .95 });
    this.birchMat = new THREE.MeshStandardMaterial({ map: this.birchTex, color: 0xffffff, roughness: .95 });
    this.bambooMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .72 });
    this.needleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .94, flatShading: true });
    this.leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .9, flatShading: true });
    this.snowMat = new THREE.MeshStandardMaterial({ color: 0xe9f2ef, roughness: .88, flatShading: true });
    this.glowMat = new THREE.MeshStandardMaterial({ color: 0x2bd8ee, emissive: 0x2bd8ee, emissiveIntensity: 1.2, roughness: .4 });

    const trunkGeo = new THREE.CylinderGeometry(.42, .58, 1, 7);
    const coneGeo = new THREE.ConeGeometry(1, 1, 7);
    const leafGeo = new THREE.IcosahedronGeometry(1, 1);
    const branchGeo = new THREE.CylinderGeometry(.045, .11, 1, 5);
    const branchMat = new THREE.MeshStandardMaterial({ color: 0x2c241d, roughness: .98 });
    const shelfGeo = new THREE.SphereGeometry(.18, 8, 5, 0, TAU, 0, Math.PI / 2);
    const trunkMat = this.barkMat;
    const leafColors = this.chapter.leaf.map(h => new THREE.Color(h));
    const baseTrunk = new THREE.Color(this.chapter.trunk);
    const baseLeaf = new THREE.Color(this.chapter.canopy);

    const addTrunk = (x, z, h, rad, rot, color, mat = trunkMat, key = 'trunk') => {
      const y = this.heightAt(x, z);
      const m = this.scatterMatrix(x, y + h / 2, z, rot, rad, h, rad);
      this.addInst(key, trunkGeo, mat, m, color);
      return y;
    };
    const addCone = (x, y, z, rad, h, rot, color, key = 'cone') => {
      const m = this.scatterMatrix(x, y + h / 2, z, rot, rad, h, rad);
      this.addInst(key, coneGeo, this.needleMat, m, color);
    };
    const addLeaf = (x, y, z, rx, ry, rz, sx, sy, sz, rot, color, mat = this.leafMat, key = 'leaf') => {
      _q.setFromAxisAngle(_up, rot);
      const m = setMatrix(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx * rx, sy * ry, sz * rz));
      this.addInst(key, leafGeo, mat, m, color);
    };

    const tree = (type, x, z, scale, rot) => {
      const r = this.rng;
      const jitter = (c) => c.clone().offsetHSL((r() - .5) * .025, (r() - .5) * .06, (r() - .5) * .08);
      const trunkColor = jitter(baseTrunk);
      if (type === 'pine' || type === 'frost') {
        const h = (7.5 + r() * 4.5) * scale;
        const baseY = addTrunk(x, z, h, .19 * scale, rot, trunkColor, this.barkMat, 'trunk');
        const col = jitter(type === 'frost' ? new THREE.Color(0x56776c) : baseLeaf);
        const layers = 3;
        for (let i = 0; i < layers; i++) {
          const f = i / layers;
          addCone(x, baseY + h * (.28 + f * .48), z, (2.5 - f * 1.15) * scale, (2.9 - f * .55) * scale, rot, jitter(col), 'cone');
        }
        if (type === 'frost') {
          addCone(x, baseY + h * .8, z, 1.15 * scale, 1.7 * scale, rot, jitter(new THREE.Color(0xdfe9e5)), 'snow');
          addCone(x, baseY + h * 1.03, z, .6 * scale, 1.0 * scale, rot, jitter(new THREE.Color(0xf0f6f2)), 'snow');
        }
      } else if (type === 'birch') {
        const h = (7.5 + r() * 3.5) * scale;
        const baseY = addTrunk(x, z, h, .115 * scale, rot, jitter(new THREE.Color(0xd4d0be)), this.birchMat, 'birch');
        const col = jitter(new THREE.Color(0x718a44));
        addLeaf(x, baseY + h * .95, z, 1.9, 1.5, 1.8, scale, scale, scale, rot, col);
        addLeaf(x + .9 * scale, baseY + h * .82, z + .45 * scale, 1.3, 1.0, 1.2, scale, scale, scale, rot + 1, jitter(col));
        addLeaf(x - .7 * scale, baseY + h * .88, z - .5 * scale, 1.2, 1.0, 1.2, scale, scale, scale, rot + 2, jitter(col));
      } else if (type === 'redwood') {
        const h = (16 + r() * 6) * scale;
        const baseY = addTrunk(x, z, h, .45 * scale, rot, jitter(new THREE.Color(0x5c3022)), this.barkMat, 'trunk');
        const col = jitter(new THREE.Color(0x1e3b2b));
        addCone(x, baseY + h * .62, z, 3.8 * scale, 6.8 * scale, rot, col, 'cone');
        addCone(x, baseY + h * .81, z, 2.8 * scale, 5.3 * scale, rot, jitter(col), 'cone');
        addCone(x, baseY + h * 1.0, z, 1.7 * scale, 3.2 * scale, rot, jitter(col), 'cone');
      } else if (type === 'autumn') {
        const h = (4.8 + r() * 2.8) * scale;
        const baseY = addTrunk(x, z, h, .21 * scale, rot, jitter(new THREE.Color(0x5a3829)), this.barkMat, 'trunk');
        const col = leafColors[Math.floor(r() * leafColors.length)].clone().offsetHSL((r() - .5) * .02, .05, (r() - .5) * .1);
        addLeaf(x, baseY + h * 1.02, z, 2.05, 1.55, 2.0, scale, scale, scale, rot, col);
        addLeaf(x + 1.05 * scale, baseY + h * .84, z + .4 * scale, 1.4, 1.1, 1.35, scale, scale, scale, rot, jitter(col));
        addLeaf(x - .85 * scale, baseY + h * .9, z - .45 * scale, 1.3, 1.05, 1.25, scale, scale, scale, rot, jitter(col));
      } else if (type === 'blossom') {
        const h = (4.6 + r() * 2.4) * scale;
        const baseY = addTrunk(x, z, h, .19 * scale, rot, jitter(new THREE.Color(0x674639)), this.barkMat, 'trunk');
        const col = jitter(new THREE.Color(0xd98fa5));
        addLeaf(x, baseY + h * 1.05, z, 1.95, 1.55, 1.95, scale, scale, scale, rot, col);
        addLeaf(x + 1.1 * scale, baseY + h * .9, z - .3 * scale, 1.3, 1.0, 1.25, scale, scale, scale, rot, jitter(col));
        addLeaf(x - .8 * scale, baseY + h * .88, z + .55 * scale, 1.2, .9, 1.2, scale, scale, scale, rot, jitter(new THREE.Color(0xf0c1c8)));
      } else if (type === 'dead' || type === 'ashen') {
        const h = (5.5 + r() * 3.2) * scale;
        const baseY = addTrunk(x, z, h, .2 * scale, rot, jitter(new THREE.Color(0x352a21)), this.barkMat, 'trunk');
        for (let i = 0; i < 4; i++) {
          const a = rot + i * 1.7 + r();
          const by = baseY + h * (.55 + r() * .3);
          const len = (1.2 + r() * 1.6) * scale;
          const dir = new THREE.Vector3(Math.cos(a) * .85, .7 + r() * .4, Math.sin(a) * .85).normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(_up, dir);
          const m = setMatrix(new THREE.Vector3(x + Math.cos(a) * len * .35, by + len * .25, z + Math.sin(a) * len * .35), quat, new THREE.Vector3(scale, len, scale));
          this.addInst('branch', branchGeo, branchMat, m, jitter(new THREE.Color(0x34281f)));
        }
        if (type === 'ashen') {
          addLeaf(x + .2, baseY + h * .72, z, .65, .5, .6, scale, scale, scale, rot, jitter(new THREE.Color(0xb75f30)));
        }
      } else if (type === 'bamboo') {
        const baseY = this.heightAt(x, z);
        const col = jitter(new THREE.Color(0x85924d));
        for (let s = 0; s < 5; s++) {
          const a = s / 5 * TAU + rot;
          const bx = x + Math.cos(a) * .36 * scale, bz = z + Math.sin(a) * .36 * scale;
          const h = (5.4 + r() * 3.6) * scale;
          const m = this.scatterMatrix(bx, baseY + h / 2, bz, rot + s, .065 * scale, h, .065 * scale);
          this.addInst('bamboo', trunkGeo, this.bambooMat, m, col);
          addLeaf(bx, baseY + h * .86, bz, 1.1, .55, 1.1, scale, scale, scale, rot + s, jitter(new THREE.Color(0x4d7443)));
        }
        this.colliders.push({ x, z, r: .38 * scale });
      } else if (type === 'nightroot') {
        const h = (6.5 + r() * 4) * scale;
        const baseY = addTrunk(x, z, h, .24 * scale, rot, jitter(new THREE.Color(0x2c2437)), this.barkMat, 'trunk');
        const col = jitter(new THREE.Color(0x302750));
        addLeaf(x, baseY + h * .78, z, 2.4, 1.1, 2.2, scale, scale, scale, rot, col);
        addLeaf(x + 1.2 * scale, baseY + h * .6, z + .4 * scale, 1.1, .8, 1.0, scale, scale, scale, rot, jitter(col));
        // bioluminescent shelf fungi
        for (let i = 0; i < 3; i++) {
          const cap = new THREE.Mesh(shelfGeo, this.glowMat);
          cap.position.set(x + Math.cos(rot + i * 2) * .34 * scale, baseY + 1.2 + i * .55, z + Math.sin(rot + i * 2) * .34 * scale);
          cap.scale.setScalar(scale);
          cap.scale.y = .35 * scale;
          this.root.add(cap);
        }
      }
      if (type !== 'bamboo' && type !== 'nightroot') this.colliders.push({ x, z, r: (.3 + (type === 'redwood' ? .4 : 0)) * scale, cam: true });
      this.treeCount++;
    };

    const count = Math.round((this.quality === 'high' ? 190 : this.quality === 'med' ? 138 : 82) * (this.quality === 'low' ? .9 : 1));
    const types = this.chapter.treeMix;
    let attempts = 0;
    while (this.treeCount < count && attempts < count * 18) {
      attempts++;
      const a = this.rng() * TAU;
      const rad = 10 + Math.pow(this.rng(), .72) * 58;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
      if (Math.hypot(x, z) < 7.5) continue;
      if (this.gatePos && Math.hypot(x - this.gatePos.x, z - this.gatePos.z) < 6) continue;
      if (this.colliders.some(c => (c.x - x) ** 2 + (c.z - z) ** 2 < 3.8 ** 2)) continue;
      const type = types[Math.floor(this.rng() * types.length)];
      const scale = .72 + this.rng() * .62;
      tree(type, x, z, scale, this.rng() * TAU);
    }
    // dense boundary
    for (let i = 0; i < (this.quality === 'low' ? 24 : 42); i++) {
      const a = (i / 42) * TAU + this.rng() * .1;
      const rad = 66 + this.rng() * 14;
      const type = types[Math.floor(this.rng() * types.length)];
      tree(type, Math.cos(a) * rad, Math.sin(a) * rad, 1 + this.rng() * .5, this.rng() * TAU);
    }

    this._flushBuckets();
  }

  _flushBuckets() {
    for (const [key, b] of this._buckets) {
      if (!b.mats.length) continue;
      const inst = new THREE.InstancedMesh(b.geo, b.mat, b.mats.length);
      inst.castShadow = b.cast && this.quality !== 'low';
      inst.receiveShadow = true;
      for (let i = 0; i < b.mats.length; i++) {
        inst.setMatrixAt(i, b.mats[i]);
        if (b.cols[i]) inst.setColorAt(i, b.cols[i]);
      }
      inst.instanceMatrix.needsUpdate = true;
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
      inst.matrixAutoUpdate = false;
      inst.computeBoundingSphere();
      this.root.add(inst);
    }
    this._buckets = null;
  }

  buildGroundDetails() {
    const r = this.rng;
    const maxR = 66;
    const randomPos = (min = 4) => {
      const a = r() * TAU;
      const rad = min + Math.pow(r(), .7) * (maxR - min);
      return { x: Math.cos(a) * rad, z: Math.sin(a) * rad, a, rad };
    };

    // rocks
    const rockGeo = new THREE.DodecahedronGeometry(1, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .98, flatShading: true });
    const rockColors = [0x677068, 0x555d58, 0x747a6d, 0x4b514b];
    const rockCount = Math.round((this.quality === 'high' ? 74 : this.quality === 'med' ? 54 : 30));
    for (let i = 0; i < rockCount; i++) {
      const p = randomPos(9);
      if (Math.hypot(p.x, p.z) < 9) continue;
      const s = .25 + r() * 1.2;
      const y = this.heightAt(p.x, p.z);
      _q.setFromEuler(new THREE.Euler(r() * .4, r() * TAU, r() * .4));
      const m = setMatrix(new THREE.Vector3(p.x, y + s * .35, p.z), _q, new THREE.Vector3(s * (1 + r() * .6), s * (.55 + r() * .45), s * (1 + r() * .5)));
      this.addInst('rock', rockGeo, rockMat, m, new THREE.Color(rockColors[Math.floor(r() * 4)]));
      if (s > .55) this.colliders.push({ x: p.x, z: p.z, r: s * .85 });
    }

    // bushes
    const bushGeo = new THREE.IcosahedronGeometry(1, 1);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
    const bushColors = this.chapter.leaf.map(h => new THREE.Color(h).multiplyScalar(.62));
    for (let i = 0; i < (this.quality === 'high' ? 150 : this.quality === 'med' ? 100 : 55); i++) {
      const p = randomPos(5);
      const s = .45 + r() * 1.0;
      const y = this.heightAt(p.x, p.z);
      const col = bushColors[Math.floor(r() * bushColors.length)].clone().offsetHSL(0, .04, (r() - .5) * .08);
      for (let k = 0; k < 2; k++) {
        const a = r() * TAU, d = r() * s * .6;
        _q.setFromAxisAngle(_up, r() * TAU);
        this.addInst('bush', bushGeo, bushMat, setMatrix(new THREE.Vector3(p.x + Math.cos(a) * d, y + s * .42, p.z + Math.sin(a) * d), _q, new THREE.Vector3(s * (1 + r() * .4), s * (.55 + r() * .25), s * (1 + r() * .4))), col);
      }
      if (s > .85) this.colliders.push({ x: p.x, z: p.z, r: s * .5 });
    }

    // grass tufts
    const tuft = tuftGeometry();
    const grassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .95, side: THREE.DoubleSide });
    const grassColors = [0x61783b, 0x748b45, 0x4f6a37, 0x849b50, 0x9aa565];
    const grassCount = Math.round((this.quality === 'high' ? 950 : this.quality === 'med' ? 620 : 250));
    for (let i = 0; i < grassCount; i++) {
      const p = randomPos(2.5);
      const s = .55 + r() * .95;
      const y = this.heightAt(p.x, p.z);
      _q.setFromAxisAngle(_up, r() * TAU);
      const col = new THREE.Color(grassColors[Math.floor(r() * grassColors.length)]).offsetHSL(0, 0, (r() - .5) * .1);
      this.addInst('grass', tuft, grassMat, setMatrix(new THREE.Vector3(p.x, y + .01, p.z), _q, new THREE.Vector3(s, s * (.7 + r() * .5), s)), col, false);
    }

    // ferns
    const fernColors = [0x3f6338, 0x557747, 0x33522f];
    for (let i = 0; i < (this.quality === 'high' ? 80 : 40); i++) {
      const p = randomPos(8);
      const s = .9 + r() * .9;
      const y = this.heightAt(p.x, p.z);
      _q.setFromAxisAngle(_up, r() * TAU);
      this.addInst('grass', tuft, grassMat, setMatrix(new THREE.Vector3(p.x, y, p.z), _q, new THREE.Vector3(s * 1.3, s * .7, s * 1.3)), new THREE.Color(fernColors[Math.floor(r() * 3)]), false);
    }

    // mushrooms
    const stemGeo = new THREE.CylinderGeometry(.032, .048, .28, 6);
    const capGeo = new THREE.SphereGeometry(.16, 8, 5, 0, TAU, 0, Math.PI / 2);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xd8d4c1, roughness: .8 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .75, emissive: 0x000000 });
    const capColors = [0xb85b45, 0xd8a35a, 0x8d4f3d, this.chapter.accent];
    const glowCaps = this.chapter.id === 'nightroot' || this.chapter.id === 'mossfen';
    for (let i = 0; i < (this.quality === 'high' ? 84 : 46); i++) {
      const p = randomPos(5);
      const y = this.heightAt(p.x, p.z);
      const s = .6 + r() * .9;
      this.addInst('stem', stemGeo, stemMat, setMatrix(new THREE.Vector3(p.x, y + .14 * s, p.z), _q.identity(), new THREE.Vector3(s, s, s)), new THREE.Color(0xddd7c4), false);
      const col = new THREE.Color(capColors[Math.floor(r() * capColors.length)]);
      this.addInst('cap', capGeo, glowCaps ? this.glowMat : capMat, setMatrix(new THREE.Vector3(p.x, y + .27 * s, p.z), _q.identity(), new THREE.Vector3(s * (1 + r() * .4), s * .5, s * (1 + r() * .4))), glowCaps ? col : col, false);
    }

    // fallen logs
    const logGeo = new THREE.CylinderGeometry(.25, .32, 1, 8);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x4c3828, roughness: .97 });
    for (let i = 0; i < 16; i++) {
      const p = randomPos(12);
      const len = 2.5 + r() * 4;
      const y = this.heightAt(p.x, p.z);
      _q.setFromEuler(new THREE.Euler(Math.PI / 2, p.a + Math.PI / 2, 0));
      const m = setMatrix(new THREE.Vector3(p.x, y + .25, p.z), _q, new THREE.Vector3(1, len, 1));
      this.addInst('log', logGeo, logMat, m, new THREE.Color(0x4b3727), true);
      this.colliders.push({ x: p.x, z: p.z, r: 1.3 });
    }

    // fallen leaves — a thin carpet of colour
    const leafGeo = new THREE.CircleGeometry(.12, 3);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, side: THREE.DoubleSide });
    const leafCols = this.chapter.leaf.map(h => new THREE.Color(h));
    for (let i = 0; i < (this.quality === 'high' ? 600 : 320); i++) {
      const p = randomPos(3);
      const y = this.heightAt(p.x, p.z);
      _q.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, r() * TAU));
      const s = .6 + r() * 1.4;
      this.addInst('groundleaf', leafGeo, leafMat, setMatrix(new THREE.Vector3(p.x, y + .015, p.z), _q, new THREE.Vector3(s, s, s)), leafCols[Math.floor(r() * leafCols.length)], false);
    }

    this._flushBuckets();
  }

  buildParticles() {
    const sparkTex = radialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)', 64);
    this.sparkTex = sparkTex;
    const rng = this.rng;
    // fireflies
    const fireCount = this.quality === 'high' ? 110 : this.quality === 'med' ? 70 : 38;
    const fp = new Float32Array(fireCount * 3);
    this.fireBase = [];
    for (let i = 0; i < fireCount; i++) {
      const a = rng() * TAU, rad = 4 + rng() * 44;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad, y = .5 + rng() * 3.8;
      fp[i * 3] = x; fp[i * 3 + 1] = y; fp[i * 3 + 2] = z;
      this.fireBase.push({ x, y, z, p: rng() * 10, s: .4 + rng() * .8 });
    }
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    this.fireflyMat = new THREE.PointsMaterial({ map: sparkTex, color: this.chapter.accent, size: .42, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.fireflies = new THREE.Points(fg, this.fireflyMat);
    this.root.add(this.fireflies);

    // dust
    const dustCount = this.quality === 'high' ? 170 : 90;
    const dp = new Float32Array(dustCount * 3);
    this.dustBase = [];
    for (let i = 0; i < dustCount; i++) {
      const a = rng() * TAU, rad = 2 + rng() * 38;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad, y = .4 + rng() * 6;
      dp[i * 3] = x; dp[i * 3 + 1] = y; dp[i * 3 + 2] = z;
      this.dustBase.push({ x, y, z, p: rng() * 10, s: .2 + rng() * .5 });
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    this.dustMat = new THREE.PointsMaterial({ map: sparkTex, color: 0xffe7b0, size: .18, transparent: true, opacity: .3, depthWrite: false, blending: THREE.AdditiveBlending, fog: true });
    this.dust = new THREE.Points(dg, this.dustMat);
    this.root.add(this.dust);
  }

  buildWeather() {
    this.weatherGroup = new THREE.Group();
    this.root.add(this.weatherGroup);
    const w = this.weather;
    if (w === 'rain') {
      const count = this.quality === 'low' ? 260 : 540;
      const pos = new Float32Array(count * 6);
      for (let i = 0; i < count; i++) {
        const x = (this.rng() - .5) * 60, z = (this.rng() - .5) * 60, y = this.rng() * 28;
        pos[i * 6] = x; pos[i * 6 + 1] = y; pos[i * 6 + 2] = z;
        pos[i * 6 + 3] = x + .08; pos[i * 6 + 4] = y - .7; pos[i * 6 + 5] = z + .04;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      this.rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xb5d7de, transparent: true, opacity: .34 }));
      this.rain.frustumCulled = false;
      this.weatherGroup.add(this.rain);
    } else if (w === 'snow') {
      const count = this.quality === 'low' ? 260 : 700;
      const pos = new Float32Array(count * 3);
      this.snowData = [];
      for (let i = 0; i < count; i++) {
        const x = (this.rng() - .5) * 54, z = (this.rng() - .5) * 54, y = this.rng() * 27;
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
        this.snowData.push({ p: this.rng() * TAU, s: .4 + this.rng() * .8 });
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      this.snow = new THREE.Points(g, new THREE.PointsMaterial({ map: this.sparkTex, color: 0xe4f1f6, size: .24, transparent: true, opacity: .8, depthWrite: false, blending: THREE.AdditiveBlending }));
      this.snow.frustumCulled = false;
      this.weatherGroup.add(this.snow);
    } else if (w === 'embers' || w === 'fireflies') {
      const count = w === 'embers' ? 200 : 70;
      const pos = new Float32Array(count * 3);
      this.emberData = [];
      for (let i = 0; i < count; i++) {
        const x = (this.rng() - .5) * 54, z = (this.rng() - .5) * 54, y = this.rng() * 10;
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
        this.emberData.push({ p: this.rng() * TAU, s: .3 + this.rng() * .9 });
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      this.embers = new THREE.Points(g, new THREE.PointsMaterial({ map: this.sparkTex, color: w === 'embers' ? 0xff8a3d : 0x82e9ff, size: w === 'embers' ? .18 : .3, transparent: true, opacity: .75, depthWrite: false, blending: THREE.AdditiveBlending }));
      this.embers.frustumCulled = false;
      this.weatherGroup.add(this.embers);
    }
  }

  buildGate() {
    const angle = (this.cfg.seed % 360) / 360 * TAU;
    const radius = 46;
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius;
    const y = this.heightAt(x, z);
    this.gatePos = new THREE.Vector3(x, y, z);
    this.gateAngle = angle;
    const gate = new THREE.Group();
    gate.position.copy(this.gatePos);
    gate.rotation.y = angle + Math.PI / 2;
    this.root.add(gate);
    this.gate = gate;

    const stone = new THREE.MeshStandardMaterial({ color: 0x60645d, roughness: .91, flatShading: true });
    const stoneDark = new THREE.MeshStandardMaterial({ color: 0x3e423d, roughness: .95, flatShading: true });
    const runeMat = new THREE.MeshStandardMaterial({ color: 0x5fe4e4, emissive: 0x2bcfd9, emissiveIntensity: .5, roughness: .3 });
    this.gateRuneMat = runeMat;
    // pillars
    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(.5, .76, 5.2, 6), stone);
      pillar.position.set(side * 2.5, 2.6, 0);
      pillar.castShadow = true; pillar.receiveShadow = true;
      gate.add(pillar);
      for (let i = 0; i < 3; i++) {
        const band = new THREE.Mesh(new THREE.CylinderGeometry(.62, .68, .12, 6), stoneDark);
        band.position.set(side * 2.5, .8 + i * 1.5, 0);
        gate.add(band);
      }
      const rune = new THREE.Mesh(new THREE.TorusGeometry(.22, .035, 5, 10, Math.PI * 1.3), runeMat);
      rune.position.set(side * 2.5, 3.5, .7);
      rune.rotation.z = side * .4;
      gate.add(rune);
    }
    const lintel = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, 6.2, 6), stone);
    lintel.rotation.z = Math.PI / 2;
    lintel.position.set(0, 5.4, 0);
    lintel.castShadow = true;
    gate.add(lintel);
    const keystone = new THREE.Mesh(new THREE.OctahedronGeometry(.46, 0), stoneDark);
    keystone.position.set(0, 6.15, .1);
    gate.add(keystone);
    const runeRing = new THREE.Mesh(new THREE.TorusGeometry(.35, .04, 5, 18), runeMat);
    runeRing.position.set(0, 6.15, .52);
    gate.add(runeRing);
    // ground ring
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.35, 40), new THREE.MeshBasicMaterial({ color: 0x5fe4e4, transparent: true, opacity: .2, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = .08;
    gate.add(ring);
    this.gateRing = ring;

    // portal surface
    const portalMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uColor: { value: new THREE.Color(this.chapter.accent) } },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform float uTime; uniform float uOpacity; uniform vec3 uColor;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
        void main(){
          vec2 p=vUv-.5; float r=length(p); float a=atan(p.y,p.x);
          float swirl=noise(vec2(a*2.2+r*5.0-uTime*.6, r*8.0-uTime*.3));
          float rings=smoothstep(.48,.3,r)*(.55+.45*sin(r*22.0-uTime*2.4));
          float edge=smoothstep(.5,.34,r);
          vec3 col=uColor*(.45+swirl*.8)+vec3(.8,1.,1.)*pow(swirl,4.0)*.45;
          gl_FragColor=vec4(col, uOpacity*edge*(.4+rings));
        }
      `
    });
    this.portalMat = portalMat;
    const portal = new THREE.Mesh(new THREE.CircleGeometry(2.42, 40), portalMat);
    portal.position.set(0, 2.7, 0);
    gate.add(portal);
    this.portal = portal;

    // light beam
    const beamMat = new THREE.MeshBasicMaterial({ color: this.chapter.accent, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    this.beamMat = beamMat;
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.9, 1.7, 26, 12, 1, true), beamMat);
    beam.position.set(0, 13, 0);
    gate.add(beam);
    this.beam = beam;

    // portal motes
    const count = 70;
    const pos = new Float32Array(count * 3);
    this.gateMotes = [];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TAU, r = .35 + Math.random() * 2;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = 1 + Math.random() * 4.2; pos[i * 3 + 2] = Math.sin(a) * r;
      this.gateMotes.push({ a, r, y: 1 + Math.random() * 4.2, s: .3 + Math.random() * .8 });
    }
    const mg = new THREE.BufferGeometry();
    mg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.gateMoteMat = new THREE.PointsMaterial({ map: this.sparkTex, color: this.chapter.accent, size: .19, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    this.gateMotePoints = new THREE.Points(mg, this.gateMoteMat);
    gate.add(this.gateMotePoints);
    this.gateLight = new THREE.PointLight(this.chapter.accent, 0, 16, 2);
    this.gateLight.position.set(0, 2.8, 1);
    gate.add(this.gateLight);

    // clear trees around gate
    this.colliders.push({ x: x - Math.cos(angle + Math.PI / 2) * 3.2, z: z - Math.sin(angle + Math.PI / 2) * 3.2, r: .7, cam: true });
    this.colliders.push({ x: x + Math.cos(angle + Math.PI / 2) * 3.2, z: z + Math.sin(angle + Math.PI / 2) * 3.2, r: .7, cam: true });
  }

  activateGate() {
    if (this.gateActive) return;
    this.gateActive = true;
    this.gateRuneMat.emissiveIntensity = 1.6;
    this.gateRing.material.opacity = .65;
    this.portalMat.uniforms.uOpacity.value = .85;
    this.beamMat.opacity = .1;
    this.gateMoteMat.opacity = .9;
    this.gateLight.intensity = 3.5;
  }

  setGateReached() { this.gateReached = true; }

  gateDistance(pos) {
    return pos.distanceTo(this.gatePos);
  }

  update(dt, elapsed, playerPos = new THREE.Vector3(), cameraPos = new THREE.Vector3()) {
    this.elapsed = elapsed;
    this.time += dt;
    this.phase = (this.cfg.phase + this.time / this.cfg.cycle) % 1;
    const angle = (this.phase - .25) * TAU;
    this.sunDir.set(Math.cos(angle), Math.sin(angle), .22).normalize();
    this.moonDir.set(-Math.cos(angle), -Math.sin(angle), -.22).normalize();
    const sunY = this.sunDir.y;
    const day = smoothstep(-.13, .22, sunY);
    const twilight = clamp(1 - Math.abs(sunY) / .32, 0, 1) * (sunY > -.45 ? 1 : 0);
    this.dayFactor = day;
    this.isNight = day < .22;

    const top = this.skyNightTop.clone().lerp(this.skyDayTop, day);
    const horizon = this.skyNightHorizon.clone().lerp(this.skyDayHorizon, day);
    const warm = new THREE.Color(0xffa25c);
    horizon.lerp(warm, twilight * .32);
    const sunCol = this.sunColor.clone().lerp(this.nightLight, 1 - day);
    this.skyUniforms.uTop.value.copy(top);
    this.skyUniforms.uHorizon.value.copy(horizon);
    this.skyUniforms.uSun.value.copy(sunCol);
    this.skyUniforms.uSunDir.value.copy(this.sunDir);
    this.skyUniforms.uMoonDir.value.copy(this.moonDir);
    this.skyUniforms.uNight.value = 1 - day;
    this.skyUniforms.uTime.value = this.time;

    this.starMat.opacity = smoothstep(.1, .65, 1 - day) * .9;
    this.moonMat.opacity = smoothstep(.05, .55, 1 - day);
    this.moon.position.copy(this.moonDir).multiplyScalar(470);
    this.moon.position.y = Math.max(this.moon.position.y, -80);
    this.moonMat.rotation = Math.atan2(this.moonDir.y, this.moonDir.x);

    const activeDir = sunY > 0 ? this.sunDir : this.moonDir;
    this.sun.target.position.set(playerPos.x, 0, playerPos.z);
    this.sun.position.copy(activeDir).multiplyScalar(62).add(this.sun.target.position);
    this.sun.color.copy(sunY > 0 ? sunCol : this.nightLight);
    this.sun.intensity = sunY > 0 ? .4 + day * 2.7 : .55 + (1 - day) * .32;
    this.hemi.color.copy(horizon).lerp(this.nightLight, .3);
    this.hemi.groundColor.copy(new THREE.Color(this.chapter.ground[0])).multiplyScalar(.75);
    this.hemi.intensity = .42 + day * .7;
    this.ambient.intensity = .26 + day * .18;
    this.ambient.color.copy(horizon).lerp(new THREE.Color(0x416157), .65);
    this.sun.shadow.intensity = .5 + day * .5;

    const fog = this.fogNight.clone().lerp(this.fogDay, day).lerp(horizon, twilight * .12);
    this.scene.fog = this.scene.fog || new THREE.FogExp2(fog.getHex(), this.chapter.fogDensity);
    this.scene.fog.color.copy(fog);
    this.scene.fog.density = this.chapter.fogDensity * (1 + (1 - day) * .65) * (this.weather === 'mist' ? 1.55 : 1);

    const ridgeColor = horizon.clone().lerp(new THREE.Color(0x101815), .35).multiplyScalar(.75);
    this.ridgeMats[0].color.copy(ridgeColor);
    this.ridgeMats[1].color.copy(ridgeColor).lerp(horizon, .2);

    this.mistSprites.forEach((m, i) => {
      const b = m.userData.base;
      m.position.x = b.x + Math.sin(this.time * m.userData.speed + m.userData.phase) * 2.1;
      m.position.z = b.z + Math.cos(this.time * m.userData.speed * .8 + m.userData.phase) * 2.1;
      m.material.opacity = (this.weather === 'mist' ? .17 : .07) * (0.8 + Math.sin(this.time * .2 + i) * .2);
    });

    // fireflies
    const fp = this.fireflies.geometry.attributes.position;
    for (let i = 0; i < this.fireBase.length; i++) {
      const f = this.fireBase[i];
      fp.setXYZ(i,
        f.x + Math.sin(this.time * .35 * f.s + f.p) * 1.8 + Math.sin(this.time * .11 + i) * .8,
        f.y + Math.sin(this.time * .5 * f.s + f.p) * .7,
        f.z + Math.cos(this.time * .3 * f.s + f.p) * 1.8
      );
    }
    fp.needsUpdate = true;
    this.fireflyMat.opacity = (1 - day) * .95;
    this.dustMat.opacity = day * .23;
    const dp = this.dust.geometry.attributes.position;
    for (let i = 0; i < this.dustBase.length; i++) {
      const d = this.dustBase[i];
      dp.setXYZ(i, d.x + Math.sin(this.time * .13 + d.p) * 1.2, d.y + Math.sin(this.time * .3 + d.p) * .8, d.z + Math.cos(this.time * .16 + d.p) * 1.2);
    }
    dp.needsUpdate = true;

    // weather follows player, but does not spin
    this.weatherGroup.position.x = playerPos.x;
    this.weatherGroup.position.z = playerPos.z;
    if (this.rain) {
      const p = this.rain.geometry.attributes.position;
      for (let i = 0; i < p.count / 2; i++) {
        const y0 = p.getY(i * 2), y1 = p.getY(i * 2 + 1);
        const ny0 = y0 - dt * 24, ny1 = y1 - dt * 24;
        if (ny0 < 0) {
          const x = (Math.random() - .5) * 60, z = (Math.random() - .5) * 60;
          p.setXYZ(i * 2, x, 27, z); p.setXYZ(i * 2 + 1, x + .08, 26.3, z + .04);
        } else {
          p.setY(i * 2, ny0); p.setY(i * 2 + 1, ny1);
          p.setX(i * 2, p.getX(i * 2) + dt * 2); p.setX(i * 2 + 1, p.getX(i * 2 + 1) + dt * 2);
        }
      }
      p.needsUpdate = true;
    }
    if (this.snow) {
      const p = this.snow.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const d = this.snowData[i];
        let y = p.getY(i) - dt * (.8 + d.s * .8);
        let x = p.getX(i) + Math.sin(this.time * .5 + d.p) * dt * .35;
        if (y < 0) { y = 26; x = (Math.random() - .5) * 54; p.setZ(i, (Math.random() - .5) * 54); }
        p.setXYZ(i, x, y, p.getZ(i));
      }
      p.needsUpdate = true;
    }
    if (this.embers) {
      const p = this.embers.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const d = this.emberData[i];
        let y = p.getY(i) + dt * (.4 + d.s);
        if (y > 11) y = 0;
        p.setXYZ(i, p.getX(i) + Math.sin(this.time + d.p) * dt * .4, y, p.getZ(i) + Math.cos(this.time + d.p) * dt * .25);
      }
      p.needsUpdate = true;
    }

    // gate
    this.portalMat.uniforms.uTime.value = this.time;
    this.gateRing.rotation.z += dt * .22;
    this.gateRuneMat.emissiveIntensity = this.gateActive ? 1.3 + Math.sin(this.time * 5) * .6 : .3 + Math.sin(this.time * 1.3) * .08;
    if (this.gateActive) {
      this.portalMat.uniforms.uOpacity.value = .7 + Math.sin(this.time * 3) * .12;
      this.beamMat.opacity = .09 + Math.sin(this.time * 2.1) * .035;
      this.gateLight.intensity = 3 + Math.sin(this.time * 4) * .6;
      const gp = this.gateMotePoints.geometry.attributes.position;
      for (let i = 0; i < this.gateMotes.length; i++) {
        const m = this.gateMotes[i];
        const a = m.a + this.time * (0.5 + m.s * .3);
        gp.setXYZ(i, Math.cos(a) * m.r, 1 + (m.y + this.time * .4 * m.s) % 4.2, Math.sin(a) * m.r);
      }
      gp.needsUpdate = true;
    }
    const gd = this.gatePos.distanceTo(playerPos);
    this.gateMoteMat.opacity = this.gateActive ? .85 : 0;
    this.beam.visible = this.gateActive;
    this.gateLight.visible = this.gateActive;
  }

  dispose() {
    this.scene.remove(this.root);
    this.root.traverse(o => {
      if (o.geometry) o.geometry.dispose?.();
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (!m) continue;
        for (const k of Object.keys(m)) {
          const v = m[k];
          if (v && v.isTexture) v.dispose?.();
        }
        m.dispose?.();
      }
    });
    this.groundTex?.dispose();
    this.barkTex?.dispose();
    this.birchTex?.dispose();
    this.cloudTex?.dispose();
    this.sparkTex?.dispose();
    if (this.scene.fog) this.scene.fog = null;
  }
}
