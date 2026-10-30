import * as THREE from "three";
import { TAU, clamp, lerp, smoothstep, mulberry32, fbm, valueNoise, pick, shade, glowTexture, softTexture, leafTexture, groundTexture } from "./util.js";

const SKY_KEYS = [
  { t: 0.0, top: 0x050a18, bottom: 0x12243a, fog: 0x0a1720, sun: 0x8fb7ff, sunI: 0.16, hemiSky: 0x274564, hemiGround: 0x080d09, hemiI: 0.42, exposure: 0.82, cloud: 0.3 },
  { t: 0.19, top: 0x101c33, bottom: 0x3b4d61, fog: 0x26343c, sun: 0xa9c6ff, sunI: 0.22, hemiSky: 0x365a72, hemiGround: 0x0d120c, hemiI: 0.48, exposure: 0.86, cloud: 0.36 },
  { t: 0.255, top: 0x405176, bottom: 0xeaa278, fog: 0xa99f89, sun: 0xffc38d, sunI: 1.15, hemiSky: 0x8fa4b2, hemiGround: 0x2c2a1e, hemiI: 0.8, exposure: 0.96, cloud: 0.52 },
  { t: 0.34, top: 0x3f7fb0, bottom: 0xd9e4cf, fog: 0xa7bd97, sun: 0xfff0c8, sunI: 2.35, hemiSky: 0xc3dde1, hemiGround: 0x3f4529, hemiI: 1.12, exposure: 1.06, cloud: 0.52 },
  { t: 0.5, top: 0x2f7cb8, bottom: 0xe2ebd7, fog: 0xb0c5a3, sun: 0xfff6dd, sunI: 2.6, hemiSky: 0xcbe4e6, hemiGround: 0x454a2d, hemiI: 1.22, exposure: 1.07, cloud: 0.46 },
  { t: 0.66, top: 0x507f9e, bottom: 0xd6cfac, fog: 0xadab8d, sun: 0xffdb9f, sunI: 1.8, hemiSky: 0xa8bfbd, hemiGround: 0x373a21, hemiI: 0.92, exposure: 1.01, cloud: 0.5 },
  { t: 0.745, top: 0x394a70, bottom: 0xed9465, fog: 0x9b7a68, sun: 0xffa25e, sunI: 1.25, hemiSky: 0x7b7890, hemiGround: 0x2a221a, hemiI: 0.72, exposure: 0.96, cloud: 0.58 },
  { t: 0.815, top: 0x111d38, bottom: 0x4f4d64, fog: 0x35434b, sun: 0xc1cef2, sunI: 0.3, hemiSky: 0x3b566e, hemiGround: 0x10130d, hemiI: 0.5, exposure: 0.86, cloud: 0.38 },
  { t: 1.0, top: 0x050a18, bottom: 0x12243a, fog: 0x0a1720, sun: 0x8fb7ff, sunI: 0.16, hemiSky: 0x274564, hemiGround: 0x080d09, hemiI: 0.42, exposure: 0.82, cloud: 0.3 },
].map(k => ({
  ...k,
  top: new THREE.Color(k.top), bottom: new THREE.Color(k.bottom), fog: new THREE.Color(k.fog),
  sun: new THREE.Color(k.sun), hemiSky: new THREE.Color(k.hemiSky), hemiGround: new THREE.Color(k.hemiGround),
}));

const SKY_VERT = `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const SKY_FRAG = `
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uSunColor;
uniform vec3 uSunDir;
uniform vec3 uMoonDir;
uniform float uTime;
uniform float uNight;
uniform float uCloud;
varying vec3 vDir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = clamp(dir.y, -0.12, 1.0);
  float grad = pow(smoothstep(-0.05, 0.72, h), 0.72);
  vec3 col = mix(uBottom, uTop, grad);

  float sunDot = max(dot(dir, uSunDir), 0.0);
  float moonDot = max(dot(dir, uMoonDir), 0.0);

  // atmospheric bloom around the sun and a soft moon halo
  col += uSunColor * pow(sunDot, 9.0) * 0.16;
  col += uSunColor * pow(sunDot, 90.0) * 0.45;
  col += uSunColor * smoothstep(0.9992, 0.99975, sunDot) * 2.4;
  col += vec3(0.55, 0.68, 0.94) * pow(moonDot, 90.0) * (0.08 + uNight * 0.26);
  col += vec3(0.80, 0.88, 1.0) * smoothstep(0.99945, 0.99985, moonDot) * (0.4 + uNight * 1.5);

  // painted cloud bands
  vec2 p = dir.xz / (abs(dir.y) + 0.18);
  float n = fbm(p * 1.15 + vec2(uTime * 0.004, uTime * 0.0015));
  n += fbm(p * 2.8 - vec2(uTime * 0.002, 0.0)) * 0.35;
  float band = smoothstep(0.035, 0.33, dir.y) * (1.0 - smoothstep(0.6, 0.95, dir.y));
  float clouds = smoothstep(0.54, 0.78, n) * band * uCloud;
  vec3 cloudDark = mix(uTop, uBottom, 0.35) * (0.72 + 0.1 * uNight);
  vec3 cloudLit = mix(uBottom, uSunColor, 0.42);
  col = mix(col, mix(cloudDark, cloudLit, 0.55 + sunDot * 0.3), clouds * 0.62);

  // gentle horizon haze
  col = mix(col, uBottom * 1.06, (1.0 - smoothstep(-0.02, 0.14, dir.y)) * 0.42);

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

function addWind(material, strength, label) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWindTime = { value: 0 };
    shader.vertexShader = `uniform float uWindTime;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec3 wpos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      #else
        vec3 wpos = vec3(0.0);
      #endif
      float wHeight = max(transformed.y, 0.0);
      float wSway = sin(uWindTime * 0.72 + wpos.x * 0.18 + wpos.z * 0.23) * ${strength.toFixed(4)};
      float wGust = sin(uWindTime * 0.23 + wpos.x * 0.04) * 0.5 + 0.5;
      transformed.x += wSway * (0.5 + wGust) * ${label === "grass" ? "wHeight" : "1.0"};
      transformed.z += wSway * 0.55 * (0.5 + wGust) * ${label === "grass" ? "wHeight" : "1.0"};
    `
    );
    material.userData.wind = shader.uniforms.uWindTime;
  };
  material.needsUpdate = true;
  return material;
}

function bladeTuft(bladeCount = 7) {
  const positions = [];
  for (let i = 0; i < bladeCount; i++) {
    const a = (i / bladeCount) * TAU + Math.random() * 0.25;
    const w = 0.028 + Math.random() * 0.022;
    const h = 0.2 + Math.random() * 0.34;
    const lean = 0.1 + Math.random() * 0.18;
    const bx = Math.cos(a) * 0.06, bz = Math.sin(a) * 0.06;
    const tx = bx + Math.cos(a) * lean, tz = bz + Math.sin(a) * lean;
    const px = Math.cos(a + Math.PI / 2) * w, pz = Math.sin(a + Math.PI / 2) * w;
    positions.push(bx - px, 0, bz - pz, bx + px, 0, bz + pz, tx, h, tz);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

function fernTuft() {
  const positions = [];
  const count = 9;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * TAU + Math.random() * 0.2;
    const len = 0.45 + Math.random() * 0.35;
    const width = 0.09 + Math.random() * 0.04;
    const px = Math.cos(a + Math.PI / 2) * width, pz = Math.sin(a + Math.PI / 2) * width;
    positions.push(
      px, 0.05, pz,
      -px, 0.05, -pz,
      Math.cos(a) * len, 0.32 + Math.random() * 0.18, Math.sin(a) * len
    );
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

export class World {
  constructor(level, renderer, quality = "high") {
    this.level = level;
    this.biome = level.biome;
    this.renderer = renderer;
    this.quality = quality;
    this.scene = new THREE.Scene();
    this.rng = mulberry32(level.seed);
    this.colliders = [];
    this.treeDots = [];
    this.time = level.clock;
    this.elapsed = 0;
    this.timeSpeed = 0.00024;
    this.sunDir = new THREE.Vector3(0, 1, 0);
    this.moonDir = new THREE.Vector3(0, -1, 0);
    this._interval = { a: SKY_KEYS[0], b: SKY_KEYS[1], f: 0 };
    this._color = new THREE.Color();
    this._color2 = new THREE.Color();
    this._build();
  }

  heightAt(x, z) {
    const r = Math.hypot(x, z);
    const flat = smoothstep(3.5, 15, r);
    return (
      Math.sin(x * 0.145) * Math.cos(z * 0.115) * 0.55 +
      Math.sin(x * 0.33 + 1.7) * Math.sin(z * 0.27 + 0.4) * 0.28 +
      Math.sin((x + z) * 0.71) * 0.055 +
      valueNoise(x * 0.22, z * 0.22, this.level.seed) * 0.16
    ) * flat;
  }

  openSpot(rng, minRadius = 9, maxRadius = 37, clearance = 1.7) {
    for (let tries = 0; tries < 60; tries++) {
      const a = rng() * TAU;
      const r = minRadius + Math.sqrt(rng()) * (maxRadius - minRadius);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      let ok = true;
      for (const c of this.colliders) {
        if (Math.hypot(c.x - x, c.z - z) < c.r + clearance) { ok = false; break; }
      }
      if (ok) return { x, z };
    }
    return { x: Math.cos(rng() * TAU) * 18, z: Math.sin(rng() * TAU) * 18 };
  }

  _build() {
    const { scene, biome, quality } = this;
    const low = quality === "low";
    const countScale = low ? 0.72 : quality === "high" ? 1.12 : 1;
    scene.fog = new THREE.FogExp2(0x8ea67d, biome.fogDensity);

    this._buildLights();
    this._buildSky();
    this._buildGround();
    this._buildTrees(countScale);
    this._buildUnderstory(countScale);
    this._buildMist();
    this._buildParticles(countScale);
    this._applyTime(0, true);
  }

  _buildLights() {
    const hemi = new THREE.HemisphereLight(0xb9d3d6, 0x3b4026, 1.05);
    this.hemi = hemi;
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xfff1d0, 2.2);
    sun.position.set(38, 60, 16);
    sun.castShadow = this.quality !== "low" && this.renderer?.shadowMap?.enabled !== false;
    const shadowSize = this.quality === "high" ? 1536 : 1024;
    sun.shadow.mapSize.set(shadowSize, shadowSize);
    sun.shadow.camera.left = -38;
    sun.shadow.camera.right = 38;
    sun.shadow.camera.top = 38;
    sun.shadow.camera.bottom = -38;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 140;
    sun.shadow.bias = -0.0008;
    sun.shadow.normalBias = 0.045;
    this.scene.add(sun);
    this.scene.add(sun.target);
    this.sunLight = sun;

    const fill = new THREE.DirectionalLight(0x8ab9c9, 0.3);
    fill.position.set(-20, 14, -30);
    this.scene.add(fill);
    this.fillLight = fill;
  }

  _buildSky() {
    const uniforms = {
      uTop: { value: SKY_KEYS[4].top.clone() },
      uBottom: { value: SKY_KEYS[4].bottom.clone() },
      uSunColor: { value: SKY_KEYS[4].sun.clone() },
      uSunDir: { value: new THREE.Vector3(0.6, 0.7, 0.2) },
      uMoonDir: { value: new THREE.Vector3(-0.6, -0.7, 0.2) },
      uTime: { value: 0 },
      uNight: { value: 0 },
      uCloud: { value: 0.5 },
    };
    this.skyUniforms = uniforms;
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(330, 40, 24),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      })
    );
    sky.frustumCulled = false;
    this.sky = sky;
    this.scene.add(sky);

    // stars
    const starCount = this.quality === "high" ? 700 : 380;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const a = Math.random() * TAU;
      const y = Math.pow(Math.random(), 0.65) * 0.95 + 0.04;
      const r = Math.sqrt(1 - y * y);
      positions[i * 3] = Math.cos(a) * r * 300;
      positions[i * 3 + 1] = y * 300;
      positions[i * 3 + 2] = Math.sin(a) * r * 300;
      sizes[i] = 0.7 + Math.random() * 1.8;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.35, map: glowTexture(), color: 0xcfddf5, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, fog: false,
    });
    this.stars = new THREE.Points(starGeo, starMat);
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);

    const sunSpriteMat = new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffe0a0, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.sunSprite = new THREE.Sprite(sunSpriteMat);
    this.sunSprite.scale.setScalar(36);
    this.scene.add(this.sunSprite);

    const moonSpriteMat = new THREE.SpriteMaterial({ map: glowTexture(), color: 0xd4e2ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.moonSprite = new THREE.Sprite(moonSpriteMat);
    this.moonSprite.scale.setScalar(19);
    this.scene.add(this.moonSprite);
  }

  _buildGround() {
    const size = 112;
    const segments = this.quality === "low" ? 64 : 104;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const biome = this.biome;
    const moss = new THREE.Color(biome.moss);
    const dirt = new THREE.Color(biome.dirt);
    const c1 = new THREE.Color(biome.ground[0]);
    const c2 = new THREE.Color(biome.ground[1]);
    const c3 = new THREE.Color(biome.ground[2]);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const y = this.heightAt(x, z);
      pos.setY(i, y);
      const r = Math.hypot(x, z);
      const n = fbm(x * 0.12, z * 0.12, this.level.seed, 3);
      const n2 = fbm(x * 0.46 + 20, z * 0.46 - 7, this.level.seed + 3, 2);
      c.copy(c1).lerp(c2, smoothstep(0.3, 0.72, n)).lerp(c3, smoothstep(0.55, 0.9, n2) * 0.6);
      if (n2 > 0.7) c.lerp(moss, (n2 - 0.7) * 2.1);
      const trailX = Math.sin(z * 0.13) * 4.2 + Math.sin(z * 0.043 + 1.3) * 2.2;
      const trail = (r < 6.6 ? smoothstep(6.6, 3.6, r) : 0) + (Math.abs(x - trailX) < 1.35 && Math.abs(z) < 35 ? smoothstep(1.35, 0.55, Math.abs(x - trailX)) * 0.8 : 0);
      if (trail > 0) c.lerp(dirt, clamp(trail * 0.72, 0, 0.75));
      c.offsetHSL(0, 0, (n2 - 0.5) * 0.06);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, map: groundTexture(), roughness: 0.97, metalness: 0, dithering: true,
    });
    const ground = new THREE.Mesh(geo, mat);
    ground.receiveShadow = true;
    this.ground = ground;
    this.scene.add(ground);

    // warm dirt clearing stones
    const stoneMat = new THREE.MeshStandardMaterial({ color: shade(this.biome.dirt, 24), roughness: 0.92, flatShading: true });
    const stoneGeo = new THREE.CylinderGeometry(0.5, 0.62, 0.07, 7);
    const stones = new THREE.InstancedMesh(stoneGeo, stoneMat, 26);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < 26; i++) {
      const a = this.rng() * TAU, r = 2.5 + this.rng() * 7.5;
      p.set(Math.cos(a) * r, this.heightAt(Math.cos(a) * r, Math.sin(a) * r) + 0.02, Math.sin(a) * r);
      q.setFromEuler(new THREE.Euler(0, this.rng() * TAU, 0));
      s.set(0.4 + this.rng() * 0.7, 0.5 + this.rng() * 0.8, 0.4 + this.rng() * 0.7);
      m.compose(p, q, s);
      stones.setMatrixAt(i, m);
    }
    stones.receiveShadow = true;
    stones.castShadow = true;
    this.scene.add(stones);
  }

  _buildTrees(countScale) {
    const rng = this.rng;
    const biome = this.biome;
    const treeCount = Math.round((this.quality === "low" ? 76 : 118) * countScale);
    const trunks = [], broad = [], pines = [], deads = [];
    const dots = [];
    const weights = biome.treeMix;
    const totalW = Object.values(weights).reduce((a, b) => a + b, 0);

    for (let i = 0; i < treeCount; i++) {
      let type;
      const roll = rng() * totalW;
      if (roll < weights.broad) type = "broad";
      else if (roll < weights.broad + weights.pine) type = "pine";
      else if (roll < weights.broad + weights.pine + weights.birch) type = "birch";
      else type = "dead";

      let x = 0, z = 0, ok = false;
      for (let tries = 0; tries < 30; tries++) {
        const a = rng() * TAU;
        const r = 10 + Math.pow(rng(), 0.72) * 42;
        x = Math.cos(a) * r;
        z = Math.sin(a) * r;
        ok = true;
        for (const c of this.colliders) {
          if (Math.hypot(c.x - x, c.z - z) < c.r + 2.2) { ok = false; break; }
        }
        if (ok) break;
      }
      if (!ok) continue;

      const scale = 0.82 + Math.pow(rng(), 1.35) * 1.05;
      const height = (type === "pine" ? 6.8 : 5.9) * scale;
      const tilt = (rng() - 0.5) * 0.075;
      const y = this.heightAt(x, z);
      const rot = rng() * TAU;
      const thick = (type === "birch" ? 0.75 : 1) * (0.75 + rng() * 0.45);
      const trunkColor = new THREE.Color(pick(rng, biome.bark)).offsetHSL(0, 0, (rng() - 0.5) * 0.06);
      const record = { x, z, y, height, tilt, rot, scale, type, thick, color: trunkColor };

      if (type === "birch") trunks.push({ ...record, birch: true });
      else if (type === "dead") deads.push(record);
      else trunks.push(record);

      if (type === "broad") {
        const blobs = 2 + (rng() > 0.45 ? 1 : 0);
        for (let b = 0; b < blobs; b++) {
          const r = (1.3 + rng() * 0.9) * scale;
          broad.push({
            x: x + (rng() - 0.5) * scale * 1.8,
            y: y + height * (0.67 + rng() * 0.3),
            z: z + (rng() - 0.5) * scale * 1.8,
            sx: r * (0.95 + rng() * 0.5), sy: r * (0.7 + rng() * 0.4), sz: r * (0.95 + rng() * 0.5),
            ry: rng() * TAU,
            color: new THREE.Color(pick(rng, biome.foliage)).offsetHSL((rng() - 0.5) * 0.015, 0, (rng() - 0.5) * 0.09),
          });
        }
      } else if (type === "pine") {
        const layers = 3;
        for (let b = 0; b < layers; b++) {
          const r = (2.05 - b * 0.38) * scale;
          pines.push({
            x, z, y: y + height * (0.43 + b * 0.22),
            sx: r, sy: (1.8 - b * 0.12) * scale, sz: r,
            ry: rot, color: new THREE.Color(pick(rng, biome.foliage)).offsetHSL(0, 0, (rng() - 0.5) * 0.08),
          });
        }
      }
      this.colliders.push({ x, z, r: type === "birch" ? 0.34 * thick : 0.42 * thick });
      if (rng() > 0.42) dots.push({ x, z, r: type === "pine" ? 1.5 : 1.1 });
    }

    // trunks (dead trees keep their bare trunk here too)
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.33, 1, 6, 1);
    trunkGeo.translate(0, 0.5, 0);
    const trunkMat = new THREE.MeshStandardMaterial({ roughness: 0.94, flatShading: true, vertexColors: false });
    const normalTrunks = trunks.filter(t => !t.birch).concat(deads);
    const birchTrunks = trunks.filter(t => t.birch);
    const trunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, normalTrunks.length);
    const birchMesh = new THREE.InstancedMesh(trunkGeo, trunkMat.clone(), birchTrunks.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
    normalTrunks.forEach((t, i) => {
      p.set(t.x, t.y - 0.15, t.z);
      q.setFromEuler(e.set(t.tilt, t.rot, t.tilt * 0.7));
      s.set(t.thick, t.height, t.thick);
      m.compose(p, q, s);
      trunkMesh.setMatrixAt(i, m);
      trunkMesh.setColorAt(i, t.color);
    });
    birchTrunks.forEach((t, i) => {
      p.set(t.x, t.y - 0.15, t.z);
      q.setFromEuler(e.set(t.tilt, t.rot, t.tilt * 0.7));
      s.set(t.thick, t.height, t.thick);
      m.compose(p, q, s);
      birchMesh.setMatrixAt(i, m);
      birchMesh.setColorAt(i, t.color);
    });
    trunkMesh.castShadow = true; trunkMesh.receiveShadow = true;
    birchMesh.castShadow = true; birchMesh.receiveShadow = true;
    if (trunkMesh.instanceColor) trunkMesh.instanceColor.needsUpdate = true;
    if (birchMesh.instanceColor) birchMesh.instanceColor.needsUpdate = true;
    this.scene.add(trunkMesh, birchMesh);

    // broadleaf canopies
    const canopyGeo = new THREE.IcosahedronGeometry(1, 1);
    const canopyMat = addWind(new THREE.MeshStandardMaterial({ roughness: 0.89, flatShading: true, dithering: true }), 0.055, "canopy");
    const canopyMesh = new THREE.InstancedMesh(canopyGeo, canopyMat, broad.length);
    broad.forEach((b, i) => {
      p.set(b.x, b.y, b.z);
      q.setFromEuler(e.set(0, b.ry, 0));
      s.set(b.sx, b.sy, b.sz);
      m.compose(p, q, s);
      canopyMesh.setMatrixAt(i, m);
      canopyMesh.setColorAt(i, b.color);
    });
    canopyMesh.castShadow = true; canopyMesh.receiveShadow = true;
    canopyMesh.instanceColor.needsUpdate = true;
    this.scene.add(canopyMesh);
    this._canopyMat = canopyMat;

    // pines
    const pineGeo = new THREE.ConeGeometry(1, 1, 7, 1);
    pineGeo.translate(0, 0.5, 0);
    const pineMat = addWind(new THREE.MeshStandardMaterial({ roughness: 0.91, flatShading: true, dithering: true }), 0.045, "pine");
    const pineMesh = new THREE.InstancedMesh(pineGeo, pineMat, pines.length);
    pines.forEach((b, i) => {
      p.set(b.x, b.y - b.sy * 0.5, b.z);
      q.setFromEuler(e.set(0, b.ry, 0));
      s.set(b.sx, b.sy, b.sz);
      m.compose(p, q, s);
      pineMesh.setMatrixAt(i, m);
      pineMesh.setColorAt(i, b.color);
    });
    pineMesh.castShadow = true; pineMesh.receiveShadow = true;
    pineMesh.instanceColor.needsUpdate = true;
    this.scene.add(pineMesh);
    this._pineMat = pineMat;

    // dead trees get a few bare branches
    const deadMat = new THREE.MeshStandardMaterial({ color: 0x4b4238, roughness: 0.97, flatShading: true });
    const branchGeo = new THREE.CylinderGeometry(0.05, 0.11, 1, 5);
    branchGeo.translate(0, 0.5, 0);
    const branchMesh = new THREE.InstancedMesh(branchGeo, deadMat, deads.length * 3);
    let di = 0;
    for (const t of deads) {
      for (let br = 0; br < 3; br++) {
        const ang = t.rot + br * 2.1;
        p.set(t.x, t.y + t.height * (0.45 + br * 0.16), t.z);
        q.setFromEuler(e.set(0.9 + rng() * 0.5, ang, 0.2));
        s.set(1, 1.4 + rng() * 1.5, 1);
        m.compose(p, q, s);
        branchMesh.setMatrixAt(di++, m);
      }
    }
    branchMesh.castShadow = true;
    this.scene.add(branchMesh);
    this.treeDots = dots;
  }

  _buildUnderstory(countScale) {
    const rng = this.rng;
    const low = this.quality === "low";
    const grassCount = Math.round((low ? 1750 : 3100) * countScale);
    const grassMat = addWind(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.96, side: THREE.DoubleSide, vertexColors: false,
      dithering: true,
    }), 0.16, "grass");
    const grassGeo = bladeTuft(7);
    const grass = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
    const grassColor = new THREE.Color();
    for (let i = 0; i < grassCount; i++) {
      const a = rng() * TAU;
      const near = rng() < 0.3;
      const r = near ? 1.2 + Math.sqrt(rng()) * 10.5 : 1.5 + Math.sqrt(rng()) * 43;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = this.heightAt(x, z);
      p.set(x, h - 0.03, z);
      q.setFromEuler(e.set(0, rng() * TAU, 0));
      const sc = 0.75 + rng() * 0.7;
      s.set(sc, sc * (0.7 + rng() * 0.55), sc);
      m.compose(p, q, s);
      grass.setMatrixAt(i, m);
      grassColor.setHex(this.biome.grass).offsetHSL((rng() - 0.5) * 0.02, (rng() - 0.5) * 0.07, (rng() - 0.5) * 0.12);
      grass.setColorAt(i, grassColor);
    }
    grass.receiveShadow = true;
    grass.instanceColor.needsUpdate = true;
    grass.frustumCulled = false;
    this.scene.add(grass);
    this._grassMat = grassMat;

    // ferns
    const fernCount = Math.round((low ? 170 : 300) * countScale);
    const fernMat = addWind(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.94, side: THREE.DoubleSide, dithering: true }), 0.08, "fern");
    const fern = new THREE.InstancedMesh(fernTuft(), fernMat, fernCount);
    for (let i = 0; i < fernCount; i++) {
      const a = rng() * TAU;
      const r = 7 + Math.sqrt(rng()) * 35;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = this.heightAt(x, z);
      p.set(x, y, z);
      q.setFromEuler(e.set(0, rng() * TAU, 0));
      const sc = 0.65 + rng() * 0.8;
      s.set(sc, sc * (0.8 + rng() * 0.5), sc);
      m.compose(p, q, s);
      fern.setMatrixAt(i, m);
      grassColor.setHex(this.biome.moss).offsetHSL(0, 0, (rng() - 0.5) * 0.1);
      fern.setColorAt(i, grassColor);
    }
    fern.instanceColor.needsUpdate = true;
    fern.castShadow = false;
    fern.receiveShadow = true;
    this.scene.add(fern);

    // flowers
    const flowerCount = Math.round((low ? 80 : 220) * countScale);
    const flowerGeo = new THREE.SphereGeometry(0.055, 5, 4);
    const flowerMat = new THREE.MeshStandardMaterial({ roughness: 0.65, emissive: this.biome.accent, emissiveIntensity: 0.08 });
    const flowers = new THREE.InstancedMesh(flowerGeo, flowerMat, flowerCount);
    const fcol = new THREE.Color();
    for (let i = 0; i < flowerCount; i++) {
      const a = rng() * TAU, r = 3 + Math.sqrt(rng()) * 39;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = this.heightAt(x, z) + 0.24 + rng() * 0.3;
      p.set(x, y, z);
      q.identity();
      s.setScalar(0.7 + rng() * 1.6);
      m.compose(p, q, s);
      flowers.setMatrixAt(i, m);
      fcol.setHex(pick(rng, this.biome.flowers));
      flowers.setColorAt(i, fcol);
    }
    flowers.instanceColor.needsUpdate = true;
    this.scene.add(flowers);

    // mushrooms
    const mushroomCount = Math.round(50 * this.biome.mushrooms * countScale);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xd8ceb0, roughness: 0.9 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0x9c4f3c, roughness: 0.7, emissive: 0x5c2b20, emissiveIntensity: 0.15 });
    const stems = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.03, 0.045, 0.18, 5), stemMat, mushroomCount);
    const caps = new THREE.InstancedMesh(new THREE.SphereGeometry(0.1, 6, 4), capMat, mushroomCount);
    for (let i = 0; i < mushroomCount; i++) {
      const c = pick(rng, this.colliders);
      const a = rng() * TAU, r = 0.6 + rng() * 1.8;
      const x = (c ? c.x : 0) + Math.cos(a) * r;
      const z = (c ? c.z : 0) + Math.sin(a) * r;
      const y = this.heightAt(x, z);
      p.set(x, y + 0.09, z); q.identity(); s.setScalar(0.7 + rng() * 0.9);
      m.compose(p, q, s); stems.setMatrixAt(i, m);
      p.set(x, y + 0.2, z); s.set(1, 0.62, 1).multiplyScalar(0.7 + rng() * 1.1);
      m.compose(p, q, s); caps.setMatrixAt(i, m);
      fcol.setHex(rng() > 0.55 ? 0xb5483c : 0xcfb37a);
      caps.setColorAt(i, fcol);
    }
    caps.instanceColor.needsUpdate = true;
    this.scene.add(stems, caps);
    this.mushroomCaps = capMat;

    // rocks
    const rockCount = Math.round(72 * countScale);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x6c7062, roughness: 0.95, flatShading: true });
    const rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), rockMat, rockCount);
    const rcol = new THREE.Color();
    for (let i = 0; i < rockCount; i++) {
      const a = rng() * TAU, r = 7 + Math.sqrt(rng()) * 36;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const sc = 0.28 + Math.pow(rng(), 1.8) * 1.5;
      p.set(x, this.heightAt(x, z) + sc * 0.17, z);
      q.setFromEuler(e.set(rng(), rng() * TAU, rng()));
      s.set(sc * (0.8 + rng() * 0.7), sc * (0.45 + rng() * 0.4), sc * (0.8 + rng() * 0.6));
      m.compose(p, q, s);
      rocks.setMatrixAt(i, m);
      rcol.setHex(0x6c7062).offsetHSL((rng() - 0.5) * 0.03, 0, (rng() - 0.5) * 0.14);
      rocks.setColorAt(i, rcol);
      if (sc > 0.75) this.colliders.push({ x, z, r: sc * 0.75 });
    }
    rocks.castShadow = true; rocks.receiveShadow = true;
    rocks.instanceColor.needsUpdate = true;
    this.scene.add(rocks);

    // fallen logs
    const logMat = new THREE.MeshStandardMaterial({ color: 0x49372a, roughness: 0.96, flatShading: true });
    const logGeo = new THREE.CylinderGeometry(0.22, 0.28, 1, 7);
    for (let i = 0; i < 10; i++) {
      const a = rng() * TAU, r = 9 + rng() * 30;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const len = 2.2 + rng() * 3.4;
      const log = new THREE.Mesh(logGeo, logMat);
      log.scale.set(1, len, 1);
      log.rotation.set(Math.PI / 2, 0, rng() * TAU);
      log.position.set(x, this.heightAt(x, z) + 0.24, z);
      log.castShadow = true; log.receiveShadow = true;
      this.scene.add(log);
      this.colliders.push({ x, z, r: 0.5 });
    }

    // hero clearing boulder and stump
    const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5, 0), rockMat);
    boulder.position.set(6.2, this.heightAt(6.2, 5.2) + 0.6, 5.2);
    boulder.scale.set(1.3, 0.9, 1.1);
    boulder.rotation.set(0.4, 0.9, 0.1);
    boulder.castShadow = true; boulder.receiveShadow = true;
    this.scene.add(boulder);
    this.colliders.push({ x: 6.2, z: 5.2, r: 1.7 });

    const stumpMat = new THREE.MeshStandardMaterial({ color: 0x5b432e, roughness: 0.95, flatShading: true });
    const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.95, 0.8, 7), stumpMat);
    stump.position.set(-5.8, this.heightAt(-5.8, 6.8) + 0.3, 6.8);
    stump.castShadow = true; stump.receiveShadow = true;
    this.scene.add(stump);
    this.colliders.push({ x: -5.8, z: 6.8, r: 1.0 });
  }

  _buildMist() {
    const count = this.quality === "low" ? 4 : 8;
    this.mist = [];
    const geo = new THREE.PlaneGeometry(1, 1);
    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: softTexture(), color: this.biome.fog, transparent: true, opacity: 0.06,
        depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = this.rng() * TAU;
      const r = 5 + this.rng() * 30;
      const a = this.rng() * TAU;
      mesh.position.set(Math.cos(a) * r, 0.4 + this.rng() * 1.5, Math.sin(a) * r);
      const s = 14 + this.rng() * 24;
      mesh.scale.set(s, s, 1);
      mesh.renderOrder = 3;
      this.scene.add(mesh);
      this.mist.push({ mesh, base: mesh.position.clone(), phase: this.rng() * TAU, speed: 0.05 + this.rng() * 0.08 });
    }
  }

  _buildParticles(countScale) {
    const rng = this.rng;

    // fireflies
    const ffCount = Math.round((this.quality === "low" ? 80 : 180) * countScale);
    const ffPositions = new Float32Array(ffCount * 3);
    const ffBase = [];
    for (let i = 0; i < ffCount; i++) {
      const a = rng() * TAU, r = 3 + Math.sqrt(rng()) * 34;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = this.heightAt(x, z) + 0.55 + rng() * 2.8;
      ffPositions[i * 3] = x; ffPositions[i * 3 + 1] = y; ffPositions[i * 3 + 2] = z;
      ffBase.push({ x, y, z, p: rng() * TAU, s: 0.35 + rng() * 0.8 });
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute("position", new THREE.BufferAttribute(ffPositions, 3));
    const ffMat = new THREE.PointsMaterial({
      size: 0.3, map: glowTexture(), color: this.biome.accent, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    this.fireflies = new THREE.Points(ffGeo, ffMat);
    this.fireflies.frustumCulled = false;
    this.firefliesBase = ffBase;
    this.scene.add(this.fireflies);

    // pollen / motes
    const pCount = this.quality === "low" ? 70 : 150;
    const pPositions = new Float32Array(pCount * 3);
    const pBase = [];
    for (let i = 0; i < pCount; i++) {
      const a = rng() * TAU, r = 2 + Math.sqrt(rng()) * 28;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = this.heightAt(x, z) + 0.4 + rng() * 5;
      pPositions[i * 3] = x; pPositions[i * 3 + 1] = y; pPositions[i * 3 + 2] = z;
      pBase.push({ x, y, z, p: rng() * TAU, s: 0.2 + rng() * 0.5 });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.13, map: glowTexture(), color: 0xffe0a2, transparent: true, opacity: 0.4,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    this.pollen = new THREE.Points(pGeo, pMat);
    this.pollen.frustumCulled = false;
    this.pollenBase = pBase;
    this.scene.add(this.pollen);

    // snow
    if (this.biome.snow) {
      const sCount = this.quality === "low" ? 260 : 480;
      const sPositions = new Float32Array(sCount * 3);
      const sBase = [];
      for (let i = 0; i < sCount; i++) {
        const x = (rng() - 0.5) * 70, z = (rng() - 0.5) * 70;
        const y = this.heightAt(x, z) + rng() * 12;
        sPositions[i * 3] = x; sPositions[i * 3 + 1] = y; sPositions[i * 3 + 2] = z;
        sBase.push({ x, z, y0: this.heightAt(x, z), speed: 0.5 + rng() * 0.7, p: rng() * TAU });
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute("position", new THREE.BufferAttribute(sPositions, 3));
      const sMat = new THREE.PointsMaterial({ size: 0.16, map: glowTexture(), color: 0xf0f7fa, transparent: true, opacity: 0.8, depthWrite: false, sizeAttenuation: true });
      const snow = new THREE.Points(sGeo, sMat);
      snow.frustumCulled = false;
      this.snow = snow;
      this.snowBase = sBase;
      this.scene.add(snow);
    }

    // autumn leaves
    if (this.biome.key === "birchfall" || this.biome.key === "redgrove" || this.biome.key === "ashen") {
      const lCount = 80;
      const lPositions = new Float32Array(lCount * 3);
      const lBase = [];
      for (let i = 0; i < lCount; i++) {
        const x = (rng() - 0.5) * 48, z = (rng() - 0.5) * 48;
        const y = this.heightAt(x, z) + 1 + rng() * 9;
        lPositions[i * 3] = x; lPositions[i * 3 + 1] = y; lPositions[i * 3 + 2] = z;
        lBase.push({ x, z, y0: this.heightAt(x, z), speed: 0.25 + rng() * 0.5, p: rng() * TAU });
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute("position", new THREE.BufferAttribute(lPositions, 3));
      const lMat = new THREE.PointsMaterial({ size: 0.28, map: leafTexture(), color: this.biome.accent, transparent: true, opacity: 0.75, depthWrite: false, alphaTest: 0.1, sizeAttenuation: true });
      const leaves = new THREE.Points(lGeo, lMat);
      leaves.frustumCulled = false;
      this.leaves = leaves;
      this.leavesBase = lBase;
      this.scene.add(leaves);
    }
  }

  _samplePalette(time) {
    let i = 0;
    for (i = 0; i < SKY_KEYS.length - 1; i++) {
      if (time >= SKY_KEYS[i].t && time <= SKY_KEYS[i + 1].t) break;
    }
    const a = SKY_KEYS[i], b = SKY_KEYS[Math.min(i + 1, SKY_KEYS.length - 1)];
    const f = smoothstep(0, 1, (time - a.t) / Math.max(0.0001, b.t - a.t));
    this._interval = { a, b, f };
    return this._interval;
  }

  _applyTime(dt, initial = false) {
    const { a, b, f } = this._samplePalette(this.time);
    const biome = this.biome;
    const u = this.skyUniforms;
    u.uTop.value.copy(a.top).lerp(b.top, f);
    u.uBottom.value.copy(a.bottom).lerp(b.bottom, f);
    u.uSunColor.value.copy(a.sun).lerp(b.sun, f);
    u.uCloud.value = lerp(a.cloud, b.cloud, f);
    this._color.copy(a.fog).lerp(b.fog, f).lerp(new THREE.Color(biome.fog), 0.3);
    const night = smoothstep(0.78, 0.93, this.time) + (this.time < 0.14 ? 1 : 0);
    u.uNight.value = clamp(night, 0, 1);

    const angle = (this.time - 0.25) * TAU;
    this.sunDir.set(Math.cos(angle), Math.sin(angle), 0.28).normalize();
    this.moonDir.copy(this.sunDir).multiplyScalar(-1);
    u.uSunDir.value.copy(this.sunDir);
    u.uMoonDir.value.copy(this.moonDir);
    u.uTime.value = this.elapsed;

    this.sunLight.position.copy(this.sunDir).multiplyScalar(70).add(new THREE.Vector3(0, 0, 0));
    this.sunLight.position.y = Math.max(this.sunLight.position.y, -20);
    this.sunLight.color.copy(u.uSunColor.value);
    this.sunLight.intensity = lerp(a.sunI, b.sunI, f) * (this.quality === "low" ? 0.9 : 1);
    this.hemi.color.copy(a.hemiSky).lerp(b.hemiSky, f);
    this.hemi.groundColor.copy(a.hemiGround).lerp(b.hemiGround, f);
    this.hemi.intensity = lerp(a.hemiI, b.hemiI, f);
    this.fillLight.intensity = clamp(lerp(a.hemiI, b.hemiI, f) * 0.13, 0.05, 0.2);

    this.scene.fog.color.copy(this._color);
    this.scene.fog.density = biome.fogDensity * lerp(1.18, 0.82, smoothstep(0.18, 0.55, this.time)) * (this.time > 0.78 || this.time < 0.14 ? 1.22 : 1);
    if (this.renderer) this.renderer.toneMappingExposure = lerp(a.exposure, b.exposure, f) * (biome.key === "moonfen" ? 0.94 : 1);

    this.stars.material.opacity = clamp(night * 0.85, 0, 0.85);
    this.sunSprite.position.copy(this.sunDir).multiplyScalar(250);
    this.sunSprite.material.opacity = this.sunDir.y > 0 ? 0.55 : 0;
    this.sunSprite.visible = this.sunDir.y > -0.04;
    this.moonSprite.position.copy(this.moonDir).multiplyScalar(250);
    this.moonSprite.material.opacity = this.moonDir.y > 0 ? 0.34 + night * 0.5 : 0;
    this.moonSprite.visible = this.moonDir.y > -0.04;
    if (this.sunSprite.material.color) this.sunSprite.material.color.copy(u.uSunColor.value).lerp(new THREE.Color(0xffffff), 0.35);

    if (this.fireflies) this.fireflies.material.opacity = clamp((night * 0.85 + 0.06) * Math.min(1, biome.fireflies), 0, 0.95);
    if (this.pollen) this.pollen.material.opacity = clamp((1 - night) * 0.55, 0, 0.55);
    if (this.snow) this.snow.material.opacity = 0.55 + (1 - night) * 0.25;
    this.mushroomCaps.emissiveIntensity = 0.1 + night * 0.55;
    this.mushroomCaps.emissive.copy(u.uSunColor.value).lerp(new THREE.Color(biome.accent), 0.7);
    for (const m of this.mist) {
      m.mesh.material.color.copy(this._color).lerp(new THREE.Color(0xffffff), 0.15);
      m.mesh.material.opacity = (night * 0.045 + 0.035) * (biome.fogDensity / 0.02);
    }
    this._windTime = this.elapsed;
    if (this._canopyMat?.userData.wind) this._canopyMat.userData.wind.value = this.elapsed;
    if (this._pineMat?.userData.wind) this._pineMat.userData.wind.value = this.elapsed;
    if (this._grassMat?.userData.wind) this._grassMat.userData.wind.value = this.elapsed;
    if (initial) this._applyTime(0, false);
  }

  update(dt) {
    this.elapsed += dt;
    this.time = (this.time + dt * this.timeSpeed) % 1;
    this._applyTime(dt);

    const t = this.elapsed;
    if (this.fireflies) {
      const pos = this.fireflies.geometry.attributes.position;
      for (let i = 0; i < this.firefliesBase.length; i++) {
        const b = this.firefliesBase[i];
        pos.setXYZ(
          i,
          b.x + Math.sin(t * 0.33 * b.s + b.p) * 0.75,
          b.y + Math.sin(t * 0.7 * b.s + b.p * 1.7) * 0.32,
          b.z + Math.cos(t * 0.27 * b.s + b.p) * 0.75
        );
      }
      pos.needsUpdate = true;
    }
    if (this.pollen) {
      const pos = this.pollen.geometry.attributes.position;
      for (let i = 0; i < this.pollenBase.length; i++) {
        const b = this.pollenBase[i];
        pos.setXYZ(i, b.x + Math.sin(t * 0.16 + b.p) * 1.2, b.y + Math.sin(t * 0.25 + b.p) * 0.4, b.z + Math.cos(t * 0.12 + b.p) * 1.2);
      }
      pos.needsUpdate = true;
    }
    if (this.snow) {
      const pos = this.snow.geometry.attributes.position;
      for (let i = 0; i < this.snowBase.length; i++) {
        const b = this.snowBase[i];
        const y = b.y0 + ((this.elapsed * b.speed + b.p * 3) % 12);
        pos.setXYZ(i, b.x + Math.sin(t * 0.4 + b.p) * 0.7, y, b.z + Math.cos(t * 0.35 + b.p) * 0.7);
      }
      pos.needsUpdate = true;
    }
    if (this.leaves) {
      const pos = this.leaves.geometry.attributes.position;
      for (let i = 0; i < this.leavesBase.length; i++) {
        const b = this.leavesBase[i];
        const fall = (this.elapsed * b.speed + b.p * 2) % 10;
        pos.setXYZ(i, b.x + Math.sin(t * 0.5 + b.p) * 1.4, b.y0 + 9 - fall, b.z + Math.cos(t * 0.4 + b.p) * 1.4);
      }
      pos.needsUpdate = true;
    }
    for (const m of this.mist) {
      m.mesh.position.x = m.base.x + Math.sin(t * 0.03 + m.phase) * 2.4;
      m.mesh.position.z = m.base.z + Math.cos(t * 0.024 + m.phase) * 2.4;
      m.mesh.rotation.z += dt * 0.004 * m.speed;
    }
  }

  dispose() {
    const seen = new Set();
    this.scene.traverse(obj => {
      if (obj.geometry && !seen.has(obj.geometry)) { seen.add(obj.geometry); obj.geometry.dispose(); }
      const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
      for (const m of mats) {
        if (seen.has(m)) continue;
        seen.add(m);
        m.dispose();
      }
    });
    this.scene.clear();
  }
}
