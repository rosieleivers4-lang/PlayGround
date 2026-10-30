import * as THREE from 'three';
import { fbm, smoothstep, makeRng, clamp, lerp, pathX, TAU } from './utils.js';

const _colorA = new THREE.Color();
const _colorB = new THREE.Color();
const _colorC = new THREE.Color();
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();

function makeGlowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, inner);
  g.addColorStop(0.3, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeRainTexture() {
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, 'rgba(210,235,255,0)');
  g.addColorStop(0.45, 'rgba(210,235,255,.85)');
  g.addColorStop(1, 'rgba(210,235,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(5, 0, 6, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGroundTexture(level, pond) {
  const biome = level.biome;
  const size = 512;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const rng = makeRng(level.seed ^ 0x9e3779b9);

  const base = new THREE.Color(biome.ground);
  const dark = new THREE.Color(biome.ground2);
  ctx.fillStyle = `#${base.getHexString()}`;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 5200; i++) {
    const x = rng.range(0, size);
    const y = rng.range(0, size);
    const r = rng.range(0.6, 4.2);
    const t = rng.next();
    _colorA.copy(base).lerp(dark, t * 0.8);
    ctx.globalAlpha = rng.range(0.06, 0.28);
    ctx.fillStyle = `#${_colorA.getHexString()}`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * rng.range(0.4, 1.1), rng.range(0, TAU), 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // A long, winding game trail.
  const toX = (wx) => ((wx + 120) / 240) * size;
  const toY = (wz) => ((wz + 120) / 240) * size;
  const drawTrail = (width, color, alpha, offset = 0) => {
    ctx.beginPath();
    for (let z = -122; z <= 122; z += 3) {
      const x = pathX(z) + offset + Math.sin(z * 0.09) * 0.5;
      const px = toX(x);
      const py = toY(z);
      if (z === -122) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  drawTrail(24, '#2e2a1c', 0.28, 2);
  drawTrail(19, `#${new THREE.Color(biome.path).getHexString()}`, 0.78);
  drawTrail(8, `#${new THREE.Color(biome.path).offsetHSL(0.02, -0.04, 0.08).getHexString()}`, 0.5, -1.5);

  // Trail ruts and pebbles.
  for (let i = 0; i < 500; i++) {
    const z = rng.range(-118, 118);
    const x = pathX(z) + rng.range(-7, 7);
    ctx.globalAlpha = rng.range(0.1, 0.35);
    ctx.fillStyle = rng.chance(0.5) ? '#211f16' : '#a4916d';
    ctx.beginPath();
    ctx.ellipse(toX(x), toY(z), rng.range(1, 3.5), rng.range(0.8, 2.2), rng.range(0, TAU), 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Pond mud ring and dark centre.
  if (pond) {
    const px = toX(pond.x);
    const py = toY(pond.z);
    const pr = (pond.r / 240) * size;
    const g = ctx.createRadialGradient(px, py, pr * 0.2, px, py, pr * 1.2);
    g.addColorStop(0, 'rgba(20,42,38,.65)');
    g.addColorStop(0.7, 'rgba(52,57,38,.35)');
    g.addColorStop(1, 'rgba(40,44,30,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px, py, pr * 1.3, 0, TAU);
    ctx.fill();
  }

  // Tiny painted blades and flowers baked into the ground for density.
  for (let i = 0; i < 2600; i++) {
    const x = rng.range(0, size);
    const y = rng.range(0, size);
    ctx.globalAlpha = rng.range(0.12, 0.4);
    ctx.strokeStyle = rng.chance(0.7)
      ? `#${new THREE.Color(biome.grass).offsetHSL(0, 0, rng.range(-0.08, 0.1)).getHexString()}`
      : `#${new THREE.Color(biome.flower[0]).getHexString()}`;
    ctx.lineWidth = rng.range(0.5, 1.4);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + rng.range(-2.2, 2.2), y - rng.range(1.5, 5));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  return tex;
}

export function createWorld(scene, level, options = {}) {
  const quality = options.quality || 'auto';
  const isMobile = Boolean(options.isMobile);
  const low = quality === 'low' || (quality === 'auto' && isMobile);
  const biome = level.biome;
  const seed = level.seed;
  const group = new THREE.Group();
  group.name = 'world';
  scene.add(group);

  const disposables = [];
  const track = (item) => {
    disposables.push(item);
    return item;
  };

  const pond = biome.water
    ? {
        x: biome.waterPos?.[0] ?? 24,
        z: biome.waterPos?.[1] ?? -26,
        r: biome.waterRadius ?? 10,
        level: -0.42,
      }
    : null;

  const heightAt = (x, z) => {
    let h = (fbm(x * 0.013 + 61, z * 0.013 - 27, seed) * 4.2 + fbm(x * 0.051, z * 0.051, seed + 91) * 0.9) - 2.45;
    const d = Math.hypot(x, z);
    h *= smoothstep(5, 22, d);
    if (pond) {
      const pd = Math.hypot(x - pond.x, z - pond.z);
      if (pd < pond.r * 1.5) {
        const t = 1 - smoothstep(pond.r * 0.45, pond.r * 1.5, pd);
        h = lerp(h, pond.level - 0.55, t * 0.94);
      }
    }
    return h;
  };

  // ---------------------------------------------------------------- sky
  const skyUniforms = {
    topColor: { value: new THREE.Color(biome.skyTopDay) },
    horizonColor: { value: new THREE.Color(biome.skyHorizonDay) },
    bottomColor: { value: new THREE.Color(biome.skyHorizonDay) },
    sunDir: { value: new THREE.Vector3(0.4, 0.7, 0.3).normalize() },
    moonDir: { value: new THREE.Vector3(-0.4, -0.7, -0.3).normalize() },
    sunColor: { value: new THREE.Color(0xffd9a0) },
    moonColor: { value: new THREE.Color(0xbfd5ff) },
    sunIntensity: { value: 1 },
    moonIntensity: { value: 0 },
    glowColor: { value: new THREE.Color(biome.sunset) },
  };
  const skyGeo = track(new THREE.SphereGeometry(320, 32, 20));
  const skyMat = track(
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        uniform vec3 moonDir;
        uniform vec3 sunColor;
        uniform vec3 moonColor;
        uniform vec3 glowColor;
        uniform float sunIntensity;
        uniform float moonIntensity;
        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y;
          vec3 col = mix(horizonColor, topColor, pow(clamp(h, 0.0, 1.0), 0.58));
          col = mix(col, bottomColor, smoothstep(0.0, -0.3, h));
          float sunDot = max(dot(dir, normalize(sunDir)), 0.0);
          float sunDisc = smoothstep(0.9993, 0.9997, sunDot);
          float sunGlow = pow(sunDot, 12.0);
          col += sunColor * sunDisc * 2.8 * sunIntensity;
          col += glowColor * sunGlow * 0.34 * sunIntensity;
          float moonDot = max(dot(dir, normalize(moonDir)), 0.0);
          float moonDisc = smoothstep(0.99955, 0.99985, moonDot);
          float moonGlow = pow(moonDot, 90.0);
          col += moonColor * moonDisc * 1.9 * moonIntensity;
          col += moonColor * moonGlow * 0.18 * moonIntensity;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  group.add(sky);

  const starCount = low ? 380 : 760;
  const starPos = new Float32Array(starCount * 3);
  const starRng = makeRng(seed ^ 0xabc123);
  for (let i = 0; i < starCount; i++) {
    const theta = starRng.range(0, TAU);
    const y = starRng.range(0.02, 1);
    const r = Math.sqrt(1 - y * y);
    const radius = 300;
    starPos[i * 3] = Math.cos(theta) * r * radius;
    starPos[i * 3 + 1] = y * radius;
    starPos[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  const starGeo = track(new THREE.BufferGeometry());
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = track(
    new THREE.PointsMaterial({
      color: 0xdde9ff,
      size: 1.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      fog: false,
    })
  );
  const stars = new THREE.Points(starGeo, starMat);
  stars.renderOrder = -9;
  stars.frustumCulled = false;
  group.add(stars);

  // ---------------------------------------------------------------- lights
  const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x34442c, 1);
  group.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1d0, 2.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(low ? 1024 : 2048, low ? 1024 : 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 120;
  sun.shadow.camera.left = -32;
  sun.shadow.camera.right = 32;
  sun.shadow.camera.top = 32;
  sun.shadow.camera.bottom = -32;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  sun.shadow.radius = 2;
  group.add(sun);
  group.add(sun.target);
  const moon = new THREE.DirectionalLight(0x9fb8ff, 0);
  group.add(moon);
  group.add(moon.target);

  // ---------------------------------------------------------------- terrain
  const terrainSeg = low ? 84 : 132;
  const terrainGeo = track(new THREE.PlaneGeometry(240, 240, terrainSeg, terrainSeg));
  terrainGeo.rotateX(-Math.PI / 2);
  const tPos = terrainGeo.attributes.position;
  const colors = new Float32Array(tPos.count * 3);
  for (let i = 0; i < tPos.count; i++) {
    const x = tPos.getX(i);
    const z = tPos.getZ(i);
    const y = heightAt(x, z);
    tPos.setY(i, y);
    const n = fbm(x * 0.07 + 7, z * 0.07 - 3, seed + 33, 3);
    const shade = fbm(x * 0.22, z * 0.22, seed + 55, 2);
    // The ground texture already carries the biome colour, so vertex colours
    // only modulate brightness. Multiplying two full colours made the wood
    // look almost black under the tone mapper.
    let tone = 0.82 + (0.5 - n) * 0.4 + (shade - 0.5) * 0.14;
    if (biome.id === 'snow') tone += 0.08;
    tone = clamp(tone, 0.56, 1.08);
    colors[i * 3] = tone;
    colors[i * 3 + 1] = tone;
    colors[i * 3 + 2] = tone;
  }
  terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  terrainGeo.computeVertexNormals();
  const groundTex = track(makeGroundTexture(level, pond));
  const terrainMat = track(
    new THREE.MeshStandardMaterial({
      map: groundTex,
      vertexColors: true,
      roughness: 0.97,
      metalness: 0,
    })
  );
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.receiveShadow = true;
  group.add(terrain);

  // ---------------------------------------------------------------- water
  if (pond) {
    const waterGeo = track(new THREE.CircleGeometry(pond.r, 48));
    const waterMat = track(
      new THREE.MeshStandardMaterial({
        color: biome.id === 'fen' ? 0x244a5c : 0x2b5f5a,
        transparent: true,
        opacity: 0.78,
        roughness: 0.16,
        metalness: 0.35,
        emissive: biome.id === 'fen' ? 0x0b2230 : 0x08241f,
        emissiveIntensity: 0.6,
        depthWrite: false,
      })
    );
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(pond.x, pond.level, pond.z);
    group.add(water);
    const edgeGeo = track(new THREE.RingGeometry(pond.r * 0.94, pond.r * 1.08, 48));
    const edgeMat = track(new THREE.MeshStandardMaterial({ color: biome.ground2, roughness: 1, transparent: true, opacity: 0.65 }));
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.rotation.x = -Math.PI / 2;
    edge.position.set(pond.x, pond.level + 0.02, pond.z);
    group.add(edge);
  }

  // ---------------------------------------------------------------- instanced nature
  const buckets = new Map();
  const dummy = new THREE.Object3D();
  const treePoints = [];
  const colliders = [];

  const geoTrunk = track(new THREE.CylinderGeometry(0.72, 1, 1, 6, 1));
  const geoCone = track(new THREE.ConeGeometry(1, 1, 7, 1));
  const geoSphere = track(new THREE.SphereGeometry(1, 7, 5));
  const geoBranch = track(new THREE.CylinderGeometry(0.28, 0.52, 1, 5));
  const geoRock = track(new THREE.DodecahedronGeometry(1, 0));
  const geoBlade = track(new THREE.ConeGeometry(0.09, 1, 3));
  const geoFlower = track(new THREE.SphereGeometry(1, 5, 4));
  const geoReed = track(new THREE.CylinderGeometry(0.028, 0.06, 1, 3));

  const matTrunk = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.96, flatShading: true }));
  const matLeaf = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }));
  const matRock = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.94, flatShading: true }));
  const matGrass = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true, side: THREE.DoubleSide }));
  const matFlower = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, emissive: 0x151008, emissiveIntensity: 0.2 }));

  const bucket = (key, geo, mat, castShadow = true, receiveShadow = true) => {
    let b = buckets.get(key);
    if (!b) {
      b = { geo, mat, items: [], castShadow, receiveShadow };
      buckets.set(key, b);
    }
    return b;
  };
  const add = (key, geo, mat, x, y, z, sx, sy, sz, rx, ry, rz, color, cast = true) => {
    const b = bucket(key, geo, mat, cast);
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    b.items.push({ m: dummy.matrix.clone(), color: color ? new THREE.Color(color) : null });
  };
  const addBranch = (x, y, z, len, rx, rz, radius, color) => {
    const dir = _vecA.set(0, 1, 0).applyEuler(new THREE.Euler(rx, 0, rz));
    const mid = _vecB.set(x, y, z).addScaledVector(dir, len / 2);
    add('branch', geoBranch, matTrunk, mid.x, mid.y, mid.z, radius, len, radius, rx, 0, rz, color, true);
  };

  const foliagePick = (rng) => rng.pick(biome.foliage);
  const foliageTint = (rng, amount = 0.06) => {
    _colorA.set(foliagePick(rng)).offsetHSL(rng.range(-0.012, 0.012), rng.range(-0.05, 0.05), rng.range(-amount, amount));
    return _colorA.getHex();
  };

  function buildPine(x, z, y, s, rng, snowy = false) {
    const trunkH = (4.6 + rng.range(0, 2.6)) * s;
    const trunkR = 0.25 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    const layers = 3 + (rng.chance(0.5) ? 1 : 0);
    for (let i = 0; i < layers; i++) {
      const t = i / Math.max(1, layers - 1);
      const cy = y + trunkH * (0.36 + t * 0.56);
      const cr = (1.85 - t * 1.2) * s;
      const ch = (2.0 - t * 0.6) * s;
      const col = foliageTint(rng);
      add('leaf', geoCone, matLeaf, x, cy, z, cr, ch, cr, 0, rng.range(0, TAU), 0, col);
      if (snowy && i > 0) {
        add('snow', geoCone, matLeaf, x, cy + ch * 0.27, z, cr * 0.78, ch * 0.55, cr * 0.78, 0, rng.range(0, TAU), 0, 0xe8f2f4);
      }
    }
    colliders.push({ x, z, r: Math.max(0.34, trunkR * 1.2), y });
  }

  function buildBirch(x, z, y, s, rng) {
    const trunkH = (5.2 + rng.range(0, 2)) * s;
    const trunkR = 0.15 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    for (let i = 0; i < 3; i++) {
      const cy = y + trunkH * (0.64 + i * 0.1);
      const cr = (1.5 - i * 0.25) * s;
      add('leaf', geoSphere, matLeaf, x + rng.range(-0.7, 0.7) * s, cy, z + rng.range(-0.7, 0.7) * s, cr, cr * 1.15, cr, 0, rng.range(0, TAU), 0, foliageTint(rng, 0.07));
    }
    colliders.push({ x, z, r: Math.max(0.28, trunkR * 1.3), y });
  }

  function buildBroad(x, z, y, s, rng, glow = false) {
    const trunkH = (4.0 + rng.range(0, 1.8)) * s;
    const trunkR = 0.3 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * TAU + rng.range(-0.3, 0.3);
      const dist = rng.range(0.2, 1.15) * s;
      const cy = y + trunkH * rng.range(0.78, 1.05);
      const cr = rng.range(1.3, 2.2) * s;
      add('leaf', geoSphere, matLeaf, x + Math.cos(ang) * dist, cy, z + Math.sin(ang) * dist, cr, cr * rng.range(0.72, 1.05), cr, 0, rng.range(0, TAU), 0, foliageTint(rng, 0.08));
    }
    if (glow && rng.chance(0.55)) {
      const mx = x + rng.range(-1.2, 1.2);
      const mz = z + rng.range(-1.2, 1.2);
      addMushroom(mx, mz, heightAt(mx, mz), rng);
    }
    colliders.push({ x, z, r: Math.max(0.4, trunkR * 1.2), y });
  }

  function buildWillow(x, z, y, s, rng) {
    const trunkH = (4.2 + rng.range(0, 1.6)) * s;
    const trunkR = 0.34 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * TAU + rng.range(-0.4, 0.4);
      const dist = rng.range(0.3, 1.1) * s;
      const cy = y + trunkH * rng.range(0.8, 1.02);
      const cr = rng.range(1.5, 2.2) * s;
      const col = foliageTint(rng, 0.06);
      add('leaf', geoSphere, matLeaf, x + Math.cos(ang) * dist, cy, z + Math.sin(ang) * dist, cr, cr * 0.62, cr, 0, rng.range(0, TAU), 0, col);
      add('leaf', geoCone, matLeaf, x + Math.cos(ang) * dist * 1.2, cy - cr * 0.85, z + Math.sin(ang) * dist * 1.2, cr * 0.32, cr * 1.5, cr * 0.32, Math.PI, 0, 0, col);
    }
    colliders.push({ x, z, r: Math.max(0.45, trunkR * 1.2), y });
  }

  function buildRedwood(x, z, y, s, rng) {
    const trunkH = (12 + rng.range(0, 5)) * s;
    const trunkR = 1.05 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * TAU + rng.range(-0.5, 0.5);
      const dist = rng.range(0.5, 2.2) * s;
      const cy = y + trunkH * rng.range(0.86, 1.04);
      const cr = rng.range(2.8, 4.2) * s;
      add('leaf', geoSphere, matLeaf, x + Math.cos(ang) * dist, cy, z + Math.sin(ang) * dist, cr, cr * 0.8, cr, 0, rng.range(0, TAU), 0, foliageTint(rng, 0.05));
    }
    colliders.push({ x, z, r: Math.max(1.0, trunkR * 1.18), y });
  }

  function buildBamboo(x, z, y, s, rng) {
    const count = 3 + rng.int(0, 3);
    for (let i = 0; i < count; i++) {
      const ox = rng.range(-1.1, 1.1) * s;
      const oz = rng.range(-1.1, 1.1) * s;
      const h = (6 + rng.range(0, 3.5)) * s;
      const r = rng.range(0.055, 0.1) * s;
      const lean = rng.range(-0.1, 0.1);
      add('trunk', geoTrunk, matTrunk, x + ox, y + h / 2, z + oz, r, h, r, lean, 0, lean * 0.6, biome.trunk);
      for (let j = 0; j < 3; j++) {
        const cy = y + h * (0.62 + j * 0.13);
        const cr = rng.range(0.45, 0.9) * s;
        add('leaf', geoCone, matLeaf, x + ox + rng.range(-0.4, 0.4), cy, z + oz + rng.range(-0.4, 0.4), cr, cr * 0.7, cr, rng.range(-0.5, 0.5), rng.range(0, TAU), rng.range(-0.5, 0.5), foliageTint(rng, 0.06));
      }
    }
    colliders.push({ x, z, r: 0.55 * s, y });
  }

  function buildDead(x, z, y, s, rng) {
    const trunkH = (4.4 + rng.range(0, 2.4)) * s;
    const trunkR = 0.28 * s;
    add('trunk', geoTrunk, matTrunk, x, y + trunkH / 2, z, trunkR, trunkH, trunkR, 0, rng.range(0, TAU), 0, biome.trunk);
    const branches = 3 + rng.int(0, 3);
    for (let i = 0; i < branches; i++) {
      const h = trunkH * rng.range(0.45, 0.92);
      const ang = rng.range(0, TAU);
      const len = rng.range(1.4, 3.2) * s;
      addBranch(x, y + h, z, len, rng.range(0.5, 1.0), Math.cos(ang) * rng.range(0.5, 1.0), 0.09 * s, biome.trunk);
    }
    colliders.push({ x, z, r: Math.max(0.32, trunkR * 1.2), y });
  }

  function addMushroom(x, z, y, rng) {
    const glowMat = track(new THREE.MeshStandardMaterial({
      color: 0x9fffd0,
      emissive: 0x46e6a2,
      emissiveIntensity: 1.5,
      roughness: 0.4,
    }));
    const stem = new THREE.Mesh(track(new THREE.CylinderGeometry(0.04, 0.06, 0.3, 5)), track(new THREE.MeshStandardMaterial({ color: 0xd8f5df, roughness: 0.8 })));
    stem.position.set(x, y + 0.15, z);
    group.add(stem);
    const cap = new THREE.Mesh(track(new THREE.SphereGeometry(rng.range(0.12, 0.24), 7, 5, 0, TAU, 0, Math.PI / 2)), glowMat);
    cap.position.set(x, y + 0.3, z);
    cap.scale.y = 0.65;
    group.add(cap);
  }

  function placeTrees() {
    const target = Math.round(178 * biome.density * (low ? 0.58 : 1));
    const rng = makeRng(seed ^ 0x51ed270b);
    let tries = 0;
    let placed = 0;
    while (placed < target && tries < target * 20) {
      tries++;
      const ang = rng.range(0, TAU);
      const rad = Math.sqrt(rng.next()) * 96 + 10;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (Math.abs(x - pathX(z)) < 3.1) continue;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r + 3.4) continue;
      if (Math.hypot(x, z) < 10.5) continue;
      let tooClose = false;
      for (const p of treePoints) {
        if (Math.hypot(p.x - x, p.z - z) < (p.big ? 4.4 : 2.25)) { tooClose = true; break; }
      }
      if (tooClose) continue;
      treePoints.push({ x, z, big: biome.tree === 'redwood' });
      placed++;
      const y = heightAt(x, z);
      const s = rng.range(0.82, 1.3);
      switch (biome.tree) {
        case 'pine': buildPine(x, z, y, s, rng); break;
        case 'pineSnow': buildPine(x, z, y, s, rng, true); break;
        case 'birch': buildBirch(x, z, y, s, rng); break;
        case 'broad': buildBroad(x, z, y, s, rng); break;
        case 'broadGlow': buildBroad(x, z, y, s, rng, true); break;
        case 'willow': buildWillow(x, z, y, s, rng); break;
        case 'redwood': buildRedwood(x, z, y, s, rng); break;
        case 'bamboo': buildBamboo(x, z, y, s, rng); break;
        case 'dead': buildDead(x, z, y, s, rng); break;
        default: buildPine(x, z, y, s, rng);
      }
    }

    // A dense silhouette ring so the playable edge never looks like a cut plane.
    const edgeRng = makeRng(seed ^ 0x77a1c3);
    for (let i = 0; i < 54; i++) {
      const ang = (i / 54) * TAU + edgeRng.range(-0.04, 0.04);
      const rad = 103 + edgeRng.range(0, 8);
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      const y = heightAt(x, z);
      const s = edgeRng.range(1.1, 1.9);
      if (biome.tree === 'redwood' || biome.tree === 'pine' || biome.tree === 'pineSnow') {
        const h = edgeRng.range(8, 15);
        add('edge', geoCone, matLeaf, x, y + h / 2, z, edgeRng.range(2.4, 4.2), h, edgeRng.range(2.4, 4.2), 0, edgeRng.range(0, TAU), 0, 0x0d1c13);
      } else {
        const h = edgeRng.range(7, 13);
        add('edge', geoSphere, matLeaf, x, y + h * 0.62, z, edgeRng.range(2.8, 4.8), h * 0.5, edgeRng.range(2.8, 4.8), 0, edgeRng.range(0, TAU), 0, 0x0c1a11);
      }
    }
  }

  function placeDetails() {
    const rng = makeRng(seed ^ 0x2f9a11);
    // Bushes
    const bushCount = Math.round(90 * biome.density * (low ? 0.6 : 1));
    for (let i = 0; i < bushCount; i++) {
      const ang = rng.range(0, TAU);
      const rad = Math.sqrt(rng.next()) * 94 + 8;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r + 1) continue;
      const y = heightAt(x, z);
      const s = rng.range(0.35, 1.15);
      add('bush', geoSphere, matLeaf, x, y + s * 0.55, z, s * 1.2, s * 0.9, s * 1.2, 0, rng.range(0, TAU), 0, foliageTint(rng, 0.1), false);
    }
    // Rocks
    const rockCount = Math.round(38 * (low ? 0.65 : 1));
    for (let i = 0; i < rockCount; i++) {
      const ang = rng.range(0, TAU);
      const rad = Math.sqrt(rng.next()) * 92 + 9;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (Math.abs(x - pathX(z)) < 2.4) continue;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r + 0.5) continue;
      const y = heightAt(x, z);
      const s = rng.range(0.3, 1.15);
      add('rock', geoRock, matRock, x, y + s * 0.48, z, s, s * rng.range(0.5, 0.9), s, rng.range(0, 0.4), rng.range(0, TAU), rng.range(0, 0.4), biome.rock, true);
      if (s > 0.78) colliders.push({ x, z, r: s * 0.8, y });
    }
    // Grass tufts
    const grassCount = Math.round(620 * biome.density * (low ? 0.45 : 1));
    for (let i = 0; i < grassCount; i++) {
      const ang = rng.range(0, TAU);
      const rad = Math.sqrt(rng.next()) * 98 + 4;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (Math.abs(x - pathX(z)) < 1.2) continue;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r * 0.92) continue;
      const y = heightAt(x, z);
      const h = rng.range(0.25, 0.95);
      _colorA.set(biome.grass).offsetHSL(rng.range(-0.02, 0.02), rng.range(-0.05, 0.08), rng.range(-0.06, 0.12));
      add('grass', geoBlade, matGrass, x, y + h / 2, z, rng.range(0.6, 1.5), h, rng.range(0.6, 1.5), rng.range(-0.18, 0.18), rng.range(0, TAU), rng.range(-0.18, 0.18), _colorA.getHex(), false);
    }
    // Flowers
    const flowerCount = Math.round(120 * (low ? 0.6 : 1));
    for (let i = 0; i < flowerCount; i++) {
      const ang = rng.range(0, TAU);
      const rad = Math.sqrt(rng.next()) * 88 + 6;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (Math.abs(x - pathX(z)) < 1.6) continue;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r) continue;
      const y = heightAt(x, z);
      const s = rng.range(0.06, 0.13);
      add('flower', geoFlower, matFlower, x, y + rng.range(0.18, 0.5), z, s, s, s, 0, 0, 0, rng.pick(biome.flower), false);
    }
    // Fallen logs
    for (let i = 0; i < 6; i++) {
      const ang = rng.range(0, TAU);
      const rad = rng.range(16, 78);
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r + 2) continue;
      const y = heightAt(x, z);
      const len = rng.range(2.5, 5.2);
      const r = rng.range(0.25, 0.45);
      const rot = rng.range(0, TAU);
      add('log', geoTrunk, matTrunk, x, y + r, z, r, len, r, Math.PI / 2, 0, rot, biome.trunk, true);
      colliders.push({ x, z, r: r * 1.1, y });
    }
    // Reeds at the water's edge.
    if (pond) {
      for (let i = 0; i < 46; i++) {
        const ang = rng.range(0, TAU);
        const rad = pond.r * rng.range(0.82, 1.1);
        const x = pond.x + Math.cos(ang) * rad;
        const z = pond.z + Math.sin(ang) * rad;
        const h = rng.range(0.9, 2.3);
        _colorA.set(0x728a4d).offsetHSL(rng.range(-0.02, 0.02), 0, rng.range(-0.06, 0.1));
        add('reed', geoReed, matGrass, x, pond.level + h / 2, z, rng.range(0.6, 1.3), h, rng.range(0.6, 1.3), rng.range(-0.1, 0.1), rng.range(0, TAU), rng.range(-0.1, 0.1), _colorA.getHex(), false);
        if (rng.chance(0.25)) {
          add('reed', geoFlower, matFlower, x, pond.level + h + 0.08, z, 0.09, 0.2, 0.09, 0, 0, 0, 0x6e4a2b, false);
        }
      }
    }
  }

  placeTrees();
  placeDetails();

  for (const [key, b] of buckets) {
    const mesh = new THREE.InstancedMesh(b.geo, b.mat, b.items.length);
    for (let i = 0; i < b.items.length; i++) {
      mesh.setMatrixAt(i, b.items[i].m);
      if (b.items[i].color) mesh.setColorAt(i, b.items[i].color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = b.castShadow && key !== 'grass' && key !== 'flower' && key !== 'bush';
    mesh.receiveShadow = b.receiveShadow;
    mesh.computeBoundingSphere();
    group.add(mesh);
    track(mesh);
  }

  // ---------------------------------------------------------------- weather
  const glowTex = track(makeGlowTexture());
  const rainTex = track(makeRainTexture());
  let weather = null;
  const weatherType = level.weather;
  const weatherCount = low ? 260 : 520;
  if (weatherType === 'rain' || weatherType === 'snow' || weatherType === 'leaves') {
    const count = weatherType === 'leaves' ? (low ? 90 : 170) : weatherCount;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const wrng = makeRng(seed ^ 0x88f11a);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = wrng.range(-34, 34);
      positions[i * 3 + 1] = wrng.range(0, 26);
      positions[i * 3 + 2] = wrng.range(-34, 34);
      phases[i] = wrng.range(0, TAU);
      speeds[i] = wrng.range(0.7, 1.35);
    }
    const geo = track(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    let mat;
    if (weatherType === 'rain') {
      mat = track(new THREE.PointsMaterial({
        map: rainTex, color: 0xcfe3ee, size: 0.55, transparent: true, opacity: 0.55,
        depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending,
      }));
    } else if (weatherType === 'snow') {
      mat = track(new THREE.PointsMaterial({
        map: glowTex, color: 0xf4fbff, size: 0.24, transparent: true, opacity: 0.9,
        depthWrite: false, sizeAttenuation: true,
      }));
    } else {
      mat = track(new THREE.PointsMaterial({
        map: glowTex, color: 0xe2a24a, size: 0.26, transparent: true, opacity: 0.85,
        depthWrite: false, sizeAttenuation: true,
      }));
    }
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    group.add(points);
    weather = {
      type: weatherType, points, positions, phases, speeds, count,
      update(dt, playerPos) {
        const pos = geo.attributes.position;
        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          if (weatherType === 'rain') {
            positions[idx + 1] -= dt * (18 + speeds[i] * 8);
            positions[idx] -= dt * 1.6;
          } else if (weatherType === 'snow') {
            positions[idx + 1] -= dt * (1.4 + speeds[i] * 0.9);
            positions[idx] += Math.sin(phases[i] + performance.now() * 0.0006) * dt * 0.8;
            positions[idx + 2] += Math.cos(phases[i] + performance.now() * 0.0004) * dt * 0.5;
          } else {
            positions[idx + 1] -= dt * (0.55 + speeds[i] * 0.45);
            positions[idx] += Math.sin(phases[i] + performance.now() * 0.0008) * dt * 1.3;
            positions[idx + 2] += Math.cos(phases[i] + performance.now() * 0.0007) * dt * 1.0;
          }
          if (positions[idx + 1] < -1) {
            positions[idx + 1] = 26;
            positions[idx] = ((positions[idx] + 34) % 68 + 68) % 68 - 34;
            positions[idx + 2] = ((positions[idx + 2] + 34) % 68 + 68) % 68 - 34;
          }
          pos.array[idx] = positions[idx];
          pos.array[idx + 1] = positions[idx + 1];
          pos.array[idx + 2] = positions[idx + 2];
        }
        pos.needsUpdate = true;
        points.position.set(playerPos.x, 0, playerPos.z);
      },
    };
  }

  // Fireflies
  let fireflies = null;
  if (biome.fireflies) {
    const count = low ? 46 : 92;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const frng = makeRng(seed ^ 0xf17e11);
    for (let i = 0; i < count; i++) {
      const ang = frng.range(0, TAU);
      const rad = Math.sqrt(frng.next()) * 88 + 6;
      positions[i * 3] = Math.cos(ang) * rad;
      positions[i * 3 + 1] = frng.range(0.5, 4.2);
      positions[i * 3 + 2] = Math.sin(ang) * rad;
      phases[i] = frng.range(0, TAU);
    }
    const geo = track(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = track(new THREE.PointsMaterial({
      map: glowTex, color: 0x9fffc0, size: 0.34, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    }));
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    group.add(points);
    fireflies = { points, mat, positions, phases, count, geo };
  }

  // Day motes / pollen
  const moteCount = low ? 70 : 140;
  const motePositions = new Float32Array(moteCount * 3);
  const motePhases = new Float32Array(moteCount);
  const mrng = makeRng(seed ^ 0x11aa22);
  for (let i = 0; i < moteCount; i++) {
    motePositions[i * 3] = mrng.range(-40, 40);
    motePositions[i * 3 + 1] = mrng.range(0.4, 8);
    motePositions[i * 3 + 2] = mrng.range(-40, 40);
    motePhases[i] = mrng.range(0, TAU);
  }
  const moteGeo = track(new THREE.BufferGeometry());
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  const moteMat = track(new THREE.PointsMaterial({
    map: glowTex, color: 0xffe5a8, size: 0.14, transparent: true, opacity: 0.35,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  const motes = new THREE.Points(moteGeo, moteMat);
  motes.frustumCulled = false;
  group.add(motes);

  // ---------------------------------------------------------------- environment state
  const dayTop = new THREE.Color(biome.skyTopDay);
  const dayHorizon = new THREE.Color(biome.skyHorizonDay);
  const nightTop = new THREE.Color(biome.skyTopNight);
  const nightHorizon = new THREE.Color(biome.skyHorizonNight);
  const sunset = new THREE.Color(biome.sunset);
  const fogDay = new THREE.Color(biome.fogDay);
  const fogNight = new THREE.Color(biome.fogNight);
  const sunDay = new THREE.Color(0xfff3d7);
  const sunSet = new THREE.Color(biome.sunset);
  const topColor = new THREE.Color();
  const horizonColor = new THREE.Color();
  const fogColor = new THREE.Color();
  const sunDir = new THREE.Vector3();
  const moonDir = new THREE.Vector3();
  const lightTarget = new THREE.Vector3();
  scene.fog = new THREE.FogExp2(biome.fogDay, 0.013);

  let nightAmount = 0;
  let currentTime = level.startTime;

  const env = {
    group,
    terrain,
    heightAt,
    colliders,
    treePoints,
    pond,
    sun,
    moon,
    hemi,
    sky,
    stars,
    get nightAmount() { return nightAmount; },
    get time() { return currentTime; },
    setTime(t, playerPos = _vecA.set(0, 0, 0)) {
      currentTime = ((t % 1) + 1) % 1;
      const angle = (currentTime - 0.25) * TAU;
      const sunY = Math.sin(angle);
      sunDir.set(Math.cos(angle) * 0.82, sunY, 0.42).normalize();
      moonDir.copy(sunDir).multiplyScalar(-1);
      const day = smoothstep(-0.13, 0.18, sunY);
      const horizonGlow = clamp(1 - Math.abs(sunY) / 0.28, 0, 1);
      nightAmount = 1 - day;

      topColor.copy(nightTop).lerp(dayTop, day);
      horizonColor.copy(nightHorizon).lerp(dayHorizon, day);
      horizonColor.lerp(sunset, horizonGlow * 0.6);
      fogColor.copy(fogNight).lerp(fogDay, day);
      fogColor.lerp(sunset, horizonGlow * 0.22);

      skyUniforms.topColor.value.copy(topColor);
      skyUniforms.horizonColor.value.copy(horizonColor);
      skyUniforms.bottomColor.value.copy(horizonColor).multiplyScalar(0.55);
      skyUniforms.sunDir.value.copy(sunDir);
      skyUniforms.moonDir.value.copy(moonDir);
      skyUniforms.glowColor.value.copy(sunset);
      skyUniforms.sunIntensity.value = smoothstep(-0.03, 0.24, sunY);
      skyUniforms.moonIntensity.value = smoothstep(0.08, -0.24, sunY);

      _colorA.copy(sunSet).lerp(sunDay, smoothstep(0.04, 0.4, sunY));
      sun.color.copy(_colorA);
      sun.intensity = smoothstep(-0.03, 0.26, sunY) * 2.6;
      moon.intensity = smoothstep(0.06, -0.3, sunY) * 0.55;
      hemi.intensity = 0.32 + day * 1.0;
      hemi.color.copy(horizonColor).lerp(new THREE.Color(0xbfd8ff), 0.35);
      hemi.groundColor.setHex(biome.ground2).lerp(new THREE.Color(0x1a2318), 0.4);

      let fogDensity = 0.0125;
      if (level.weather === 'mist') fogDensity = 0.021;
      if (level.weather === 'fog') fogDensity = 0.027;
      if (level.weather === 'rain') fogDensity = 0.018;
      if (level.weather === 'snow') fogDensity = 0.019;
      fogDensity += nightAmount * 0.003;
      scene.fog.color.copy(fogColor);
      scene.fog.density = fogDensity;

      lightTarget.set(playerPos.x, playerPos.y + 1, playerPos.z);
      sun.position.set(playerPos.x + sunDir.x * 62, playerPos.y + sunDir.y * 62 + 12, playerPos.z + sunDir.z * 62);
      sun.target.position.copy(lightTarget);
      sun.target.updateMatrixWorld();
      moon.position.set(playerPos.x + moonDir.x * 50, playerPos.y + Math.abs(moonDir.y) * 50 + 10, playerPos.z + moonDir.z * 50);
      moon.target.position.copy(lightTarget);
      moon.target.updateMatrixWorld();

      starMat.opacity = Math.pow(nightAmount, 1.4) * 0.9;
      moteMat.opacity = day * 0.32;
      if (fireflies) fireflies.mat.opacity = Math.pow(nightAmount, 1.2) * 0.95;
      if (weather) weather.points.visible = true;

      sky.position.set(playerPos.x, 0, playerPos.z);
      stars.position.set(playerPos.x, 0, playerPos.z);
      motes.position.set(playerPos.x, 0, playerPos.z);
    },
    update(dt, elapsed, playerPos) {
      if (weather) weather.update(dt, playerPos);
      motes.position.set(playerPos.x, 0, playerPos.z);
      const pos = moteGeo.attributes.position;
      for (let i = 0; i < moteCount; i++) {
        const idx = i * 3;
        pos.array[idx] = motePositions[idx] + Math.sin(elapsed * 0.23 + motePhases[i]) * 1.4;
        pos.array[idx + 1] = motePositions[idx + 1] + Math.sin(elapsed * 0.31 + motePhases[i] * 1.3) * 0.7;
        pos.array[idx + 2] = motePositions[idx + 2] + Math.cos(elapsed * 0.19 + motePhases[i]) * 1.4;
      }
      pos.needsUpdate = true;
      if (fireflies) {
        const fpos = fireflies.geo.attributes.position;
        for (let i = 0; i < fireflies.count; i++) {
          const idx = i * 3;
          fpos.array[idx] = fireflies.positions[idx] + Math.sin(elapsed * 0.45 + fireflies.phases[i]) * 1.8;
          fpos.array[idx + 1] = fireflies.positions[idx + 1] + Math.sin(elapsed * 0.7 + fireflies.phases[i] * 1.7) * 0.5;
          fpos.array[idx + 2] = fireflies.positions[idx + 2] + Math.cos(elapsed * 0.38 + fireflies.phases[i]) * 1.8;
        }
        fpos.needsUpdate = true;
      }
      if (pond) {
        // no-op: water is a still sheet, kept here for future ripple work
      }
    },
    dispose() {
      scene.remove(group);
      scene.fog = null;
      for (const item of disposables) {
        if (item && typeof item.dispose === 'function') item.dispose();
      }
      group.traverse((obj) => {
        if (obj.isMesh || obj.isPoints) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        }
      });
    },
  };

  env.setTime(level.startTime, _vecA.set(0, 0, 0));
  return env;
}
