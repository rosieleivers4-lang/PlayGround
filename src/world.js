import * as THREE from '../vendor/three.module.min.js';

const BIOMES = {
  verdant: {
    ground: '#5b7d45', groundDark: '#3e5b33', groundLight: '#789a54',
    leaf: [0x4b7b3f, 0x5f8f49, 0x6e9c50, 0x3e6938, 0x84a95c],
    trunk: 0x5b4832, bush: 0x456e3b, rock: 0x737a70,
    flower: [0xffd166, 0xf6f0d8, 0xd96b8a, 0xb18cff], fog: 0x9fb68a
  },
  autumn: {
    ground: '#796b3d', groundDark: '#54482b', groundLight: '#9a854e',
    leaf: [0xc46b2d, 0xd99038, 0xa84a24, 0xe0b04e, 0x8b5b2c],
    trunk: 0x59422e, bush: 0x7c5a2e, rock: 0x7d7469,
    flower: [0xf0c15a, 0xe58b4d, 0xf1e6c8, 0xb15b3a], fog: 0xc0a47a
  },
  mist: {
    ground: '#5b7163', groundDark: '#405449', groundLight: '#758b78',
    leaf: [0x46655a, 0x567a68, 0x668d76, 0x3b574e, 0x7b9c86],
    trunk: 0x4e4a40, bush: 0x4b6a5b, rock: 0x808a87,
    flower: [0xd9e7e0, 0xb7cfd1, 0xe8e2c8], fog: 0xa9bdb4
  },
  frost: {
    ground: '#9aa9a4', groundDark: '#74837f', groundLight: '#c0cbc4',
    leaf: [0x66807a, 0x7d9890, 0x9db4aa, 0x55716b, 0xb2c7bd],
    trunk: 0x55524b, bush: 0x6f847e, rock: 0x9aa4a3,
    flower: [0xdcece9, 0xb9d4d6, 0xf3f6f2], fog: 0xc3d1cd
  },
  ember: {
    ground: '#6d4b36', groundDark: '#4c3327', groundLight: '#8d6444',
    leaf: [0x9e4a2a, 0xbf5c2d, 0x7f3923, 0xd47b35, 0x6d3c2b],
    trunk: 0x4f372b, bush: 0x74442c, rock: 0x6c625c,
    flower: [0xffa54a, 0xff6f3d, 0xffd28a, 0xc94a37], fog: 0xb0836a
  },
  violet: {
    ground: '#544c66', groundDark: '#3c3550', groundLight: '#6e6384',
    leaf: [0x4a3f68, 0x5d4f7e, 0x706093, 0x3e3458, 0x8574a8],
    trunk: 0x413a46, bush: 0x51456a, rock: 0x716b7d,
    flower: [0xc7a6ff, 0xe6d3ff, 0x8f6dd8, 0xffc7e6], fog: 0x6e6484
  },
  bog: {
    ground: '#4a5b45', groundDark: '#324236', groundLight: '#64775a',
    leaf: [0x3b5540, 0x48664a, 0x577759, 0x314832, 0x6b8b68],
    trunk: 0x453f32, bush: 0x3d5b44, rock: 0x6d7469,
    flower: [0xb8e0a8, 0xd9efc2, 0x8fbf8a, 0xe8f0d0], fog: 0x7c9278
  }
};

const PHASES = {
  day: {
    top: 0x71bde6, bottom: 0xdce8c8, fog: 0xbdd3ab,
    sun: 0xfff2cb, sunI: 2.55, hemiSky: 0xc4ebff, hemiGround: 0x4b613a, hemiI: 1.3,
    sunPos: [55, 68, -45], stars: 0, ambient: 0.22
  },
  dusk: {
    top: 0x343b74, bottom: 0xf1a469, fog: 0xab8476,
    sun: 0xffad6a, sunI: 1.55, hemiSky: 0xffc6a0, hemiGround: 0x39383d, hemiI: 0.9,
    sunPos: [-58, 24, -50], stars: 0.28, ambient: 0.12
  },
  night: {
    top: 0x040a1e, bottom: 0x143039, fog: 0x0b1a1e,
    sun: 0x9fc9ff, sunI: 0.88, hemiSky: 0x6f8fbd, hemiGround: 0x0d1a18, hemiI: 0.72,
    sunPos: [48, 62, -38], stars: 1, ambient: 0.13
  }
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 2, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(0.22, inner);
  g.addColorStop(0.5, outer.replace(/[\d.]+\)$/, '0.35)'));
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function grassTexture(base = '#5b7d45', dark = '#3e5b33', light = '#789a54') {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  for (let i = 0; i < 46; i += 1) {
    const x = Math.random() * 256;
    const baseY = 256;
    const w = 2 + Math.random() * 4;
    const h = 50 + Math.random() * 170;
    const lean = (Math.random() - 0.5) * 42;
    const grad = ctx.createLinearGradient(x, baseY, x + lean, baseY - h);
    grad.addColorStop(0, dark);
    grad.addColorStop(0.55, base);
    grad.addColorStop(1, light);
    ctx.strokeStyle = grad;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.quadraticCurveTo(x + lean * 0.25, baseY - h * 0.55, x + lean, baseY - h);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function groundTexture(biome) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = biome.ground;
  ctx.fillRect(0, 0, 512, 512);
  const colors = [biome.groundDark, biome.groundLight, biome.ground, biome.groundLight];
  for (let i = 0; i < 4200; i += 1) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.globalAlpha = 0.16 + Math.random() * 0.34;
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const w = 1 + Math.random() * 5;
    const h = 1 + Math.random() * 5;
    ctx.fillRect(x, y, w, h);
  }
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < 70; i += 1) {
    ctx.fillStyle = i % 2 ? biome.groundDark : biome.groundLight;
    ctx.beginPath();
    ctx.ellipse(Math.random() * 512, Math.random() * 512, 10 + Math.random() * 45, 5 + Math.random() * 20, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(18, 18);
  tex.anisotropy = 4;
  return tex;
}

function makeSky(phaseData, biome) {
  const geo = new THREE.SphereGeometry(175, 24, 16);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(phaseData.top) },
      bottomColor: { value: new THREE.Color(phaseData.bottom) },
      offset: { value: 8 },
      exponent: { value: 0.7 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false
  });
  const sky = new THREE.Mesh(geo, mat);
  sky.renderOrder = -20;
  return sky;
}

function makeStars(count, rng) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(rng() * 0.88 + 0.06);
    const r = 150 + rng() * 15;
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.cos(phi) * r + 12;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    color.setHSL(0.52 + rng() * 0.12, 0.35, 0.75 + rng() * 0.25);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 1.05,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const stars = new THREE.Points(geo, mat);
  stars.renderOrder = -10;
  return stars;
}

function makeFireflies(count, rng, radius) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 6 + rng() * (radius - 8);
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = 0.5 + rng() * 3.5;
    positions[i * 3 + 2] = Math.sin(a) * r;
    seeds[i] = rng() * 100;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xd8ff9b,
    size: 0.16,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geo, mat);
  points.userData = { seeds, base: positions.slice() };
  return points;
}

function makeMotes(count, rng, radius) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = rng() * radius;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = 0.4 + rng() * 6;
    positions[i * 3 + 2] = Math.sin(a) * r;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xfff2c4,
    size: 0.06,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Points(geo, mat);
}

function setInstanced(mesh, index, dummy, position, scale, rotationY, color) {
  dummy.position.copy(position);
  dummy.scale.copy(scale);
  dummy.rotation.set(0, rotationY, 0);
  dummy.updateMatrix();
  mesh.setMatrixAt(index, dummy.matrix);
  if (color) mesh.setColorAt(index, color);
}

export function createWorld(scene, level) {
  const rng = mulberry32(level.seed);
  const biome = BIOMES[level.biome] || BIOMES.verdant;
  const phase = PHASES[level.phase] || PHASES.day;
  const group = new THREE.Group();
  group.name = `Wild-${level.number}`;
  scene.add(group);

  const fogColor = new THREE.Color(phase.fog).lerp(new THREE.Color(biome.fog), 0.35);
  if (level.phase === 'night') fogColor.multiplyScalar(0.62);
  scene.fog = new THREE.FogExp2(fogColor.getHex(), level.phase === 'night' ? 0.016 : 0.0135);
  scene.background = new THREE.Color(fogColor.getHex());

  const sky = makeSky(phase, biome);
  group.add(sky);

  const stars = makeStars(560, rng);
  group.add(stars);

  const sunTex = glowTexture('rgba(255,246,208,1)', 'rgba(255,170,80,0)');
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunTex,
    color: level.phase === 'night' ? 0xcfe4ff : phase.sun,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: level.phase === 'night' ? 0.9 : 1
  }));
  const sunScale = level.phase === 'dusk' ? 46 : level.phase === 'night' ? 22 : 32;
  sunSprite.scale.setScalar(sunScale);
  sunSprite.position.set(...phase.sunPos).multiplyScalar(1.45);
  group.add(sunSprite);

  const sunCore = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)'),
    color: level.phase === 'night' ? 0xffffff : 0xfff9df,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.9
  }));
  sunCore.scale.setScalar(sunScale * 0.3);
  sunCore.position.copy(sunSprite.position);
  group.add(sunCore);

  const hemi = new THREE.HemisphereLight(phase.hemiSky, phase.hemiGround, phase.hemiI);
  group.add(hemi);

  const sunLight = new THREE.DirectionalLight(phase.sun, phase.sunI);
  sunLight.position.set(...phase.sunPos);
  sunLight.target.position.set(0, 0, 0);
  group.add(sunLight);
  group.add(sunLight.target);

  const ambient = new THREE.AmbientLight(level.phase === 'night' ? 0x1a2c3d : 0xfff3dc, phase.ambient);
  group.add(ambient);

  const clouds = [];
  for (let i = 0; i < 7; i += 1) {
    const cloud = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: level.phase === 'night' ? 0x1c2d3b : 0xffffff,
        transparent: true,
        opacity: level.phase === 'night' ? 0.08 : 0.16,
        depthWrite: false,
        fog: false
      })
    );
    cloud.position.set((rng() - 0.5) * 180, 28 + rng() * 20, (rng() - 0.5) * 180);
    cloud.scale.set(12 + rng() * 20, 2.5 + rng() * 3.5, 8 + rng() * 12);
    group.add(cloud);
    clouds.push(cloud);
  }

  // Ground.
  const groundMap = groundTexture(biome);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(230, 230, 1, 1),
    new THREE.MeshStandardMaterial({ map: groundMap, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = false;
  group.add(ground);

  // Soft clearing at the heart of the level.
  const clearing = new THREE.Mesh(
    new THREE.CircleGeometry(12, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(biome.groundLight).multiplyScalar(level.phase === 'night' ? 0.42 : 0.8),
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    })
  );
  clearing.rotation.x = -Math.PI / 2;
  clearing.position.y = 0.012;
  group.add(clearing);

  const obstacles = [];

  // Generate tree layout.
  const trees = [];
  const targetTrees = 130;
  for (let i = 0; i < targetTrees; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 10 + Math.pow(rng(), 0.72) * 62;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (Math.hypot(x, z) < 7) continue;
    const pine = rng() < 0.56;
    const trunkH = pine ? 2.9 + rng() * 3.4 : 2.2 + rng() * 2.4;
    const trunkR = 0.19 + rng() * 0.16;
    const lean = (rng() - 0.5) * 0.06;
    trees.push({ x, z, pine, trunkH, trunkR, lean, scale: 0.8 + rng() * 0.55, phase: rng() * Math.PI * 2 });
    obstacles.push({ x, z, r: trunkR + 0.26 });
  }
  // Dense border so the wild feels endless.
  for (let i = 0; i < 95; i += 1) {
    const a = (i / 95) * Math.PI * 2 + rng() * 0.12;
    const r = 76 + rng() * 12;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const pine = rng() < 0.62;
    trees.push({
      x, z, pine,
      trunkH: 3.6 + rng() * 4.4,
      trunkR: 0.26 + rng() * 0.22,
      lean: (rng() - 0.5) * 0.05,
      scale: 1 + rng() * 0.6,
      phase: rng() * Math.PI * 2
    });
  }

  let pineLayers = 0;
  let leafBlobs = 0;
  for (const tree of trees) {
    if (tree.pine) pineLayers += 3;
    else leafBlobs += 3;
  }

  const trunkGeo = new THREE.CylinderGeometry(0.17, 0.24, 1, 6);
  trunkGeo.translate(0, 0.5, 0);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);
  trunks.frustumCulled = false;

  const coneGeo = new THREE.ConeGeometry(1, 1, 7);
  coneGeo.translate(0, 0.5, 0);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
  const pines = new THREE.InstancedMesh(coneGeo, coneMat, pineLayers);
  pines.frustumCulled = false;

  const leafGeo = new THREE.IcosahedronGeometry(1, 1);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, flatShading: true });
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, leafBlobs);
  leaves.frustumCulled = false;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const trunkColor = new THREE.Color(biome.trunk);
  let ti = 0;
  let pi = 0;
  let li = 0;

  for (const tree of trees) {
    color.copy(trunkColor).offsetHSL(0, 0, (rng() - 0.5) * 0.1);
    setInstanced(trunks, ti, dummy, new THREE.Vector3(tree.x, 0, tree.z), new THREE.Vector3(tree.trunkR / 0.2, tree.trunkH, tree.trunkR / 0.2), tree.phase, color);
    ti += 1;

    if (tree.pine) {
      for (let layer = 0; layer < 3; layer += 1) {
        const baseY = tree.trunkH * (0.42 + layer * 0.18);
        const radius = (1.55 - layer * 0.34) * tree.scale;
        const height = (2.15 - layer * 0.28) * tree.scale;
        const leafColor = new THREE.Color(biome.leaf[Math.floor(rng() * biome.leaf.length)]).offsetHSL((rng() - 0.5) * 0.02, 0, (rng() - 0.5) * 0.08);
        if (level.phase === 'night') leafColor.multiplyScalar(0.55);
        setInstanced(pines, pi, dummy, new THREE.Vector3(tree.x, baseY, tree.z), new THREE.Vector3(radius, height, radius), tree.phase + layer * 0.4, leafColor);
        pi += 1;
      }
    } else {
      for (let blob = 0; blob < 3; blob += 1) {
        const a = (blob / 3) * Math.PI * 2 + tree.phase;
        const offset = blob === 0 ? 0 : 0.8 * tree.scale;
        const leafColor = new THREE.Color(biome.leaf[Math.floor(rng() * biome.leaf.length)]).offsetHSL((rng() - 0.5) * 0.02, 0, (rng() - 0.5) * 0.08);
        if (level.phase === 'night') leafColor.multiplyScalar(0.55);
        setInstanced(
          leaves, li, dummy,
          new THREE.Vector3(tree.x + Math.cos(a) * offset, tree.trunkH + 0.9 * tree.scale + (blob === 0 ? 0.5 : 0), tree.z + Math.sin(a) * offset),
          new THREE.Vector3((1.55 + rng() * 0.6) * tree.scale, (1.25 + rng() * 0.55) * tree.scale, (1.55 + rng() * 0.6) * tree.scale),
          tree.phase, leafColor
        );
        li += 1;
      }
    }
  }
  trunks.instanceMatrix.needsUpdate = true;
  if (trunks.instanceColor) trunks.instanceColor.needsUpdate = true;
  pines.instanceMatrix.needsUpdate = true;
  if (pines.instanceColor) pines.instanceColor.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
  group.add(trunks, pines, leaves);

  // Bushes.
  const bushGeo = new THREE.IcosahedronGeometry(1, 1);
  const bushMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
  const bushCount = 80;
  const bushes = new THREE.InstancedMesh(bushGeo, bushMat, bushCount);
  bushes.frustumCulled = false;
  for (let i = 0; i < bushCount; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 7 + rng() * 66;
    const size = 0.45 + rng() * 1.1;
    const bColor = new THREE.Color(biome.bush).offsetHSL((rng() - 0.5) * 0.04, 0, (rng() - 0.5) * 0.1);
    if (level.phase === 'night') bColor.multiplyScalar(0.55);
    setInstanced(bushes, i, dummy, new THREE.Vector3(Math.cos(a) * r, size * 0.6, Math.sin(a) * r), new THREE.Vector3(size, size * 0.75, size), rng() * Math.PI, bColor);
  }
  bushes.instanceMatrix.needsUpdate = true;
  if (bushes.instanceColor) bushes.instanceColor.needsUpdate = true;
  group.add(bushes);

  // Rocks.
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  const rockMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
  const rockCount = 46;
  const rocks = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
  rocks.frustumCulled = false;
  for (let i = 0; i < rockCount; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 9 + rng() * 64;
    const size = 0.18 + rng() * 0.75;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const rColor = new THREE.Color(biome.rock).offsetHSL(0, 0, (rng() - 0.5) * 0.15);
    if (level.phase === 'night') rColor.multiplyScalar(0.55);
    setInstanced(rocks, i, dummy, new THREE.Vector3(x, size * 0.45, z), new THREE.Vector3(size * 1.2, size * 0.75, size), rng() * Math.PI, rColor);
    if (size > 0.5) obstacles.push({ x, z, r: size * 0.75 });
  }
  rocks.instanceMatrix.needsUpdate = true;
  if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
  group.add(rocks);

  // Grass tufts.
  const gTex = grassTexture(biome.ground, biome.groundDark, biome.groundLight);
  const bladeGeo = new THREE.PlaneGeometry(0.85, 0.85);
  bladeGeo.translate(0, 0.425, 0);
  const bladeMat = new THREE.MeshStandardMaterial({
    map: gTex,
    alphaTest: 0.42,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 1,
    color: 0xffffff,
    emissive: new THREE.Color(biome.ground).multiplyScalar(0.2),
    emissiveIntensity: 0.75
  });
  const bladeCount = 1000;
  const blades = new THREE.InstancedMesh(bladeGeo, bladeMat, bladeCount);
  blades.frustumCulled = false;
  for (let i = 0; i < bladeCount; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 3 + Math.pow(rng(), 0.6) * 70;
    const s = 0.55 + rng() * 1.0;
    const c = new THREE.Color(biome.groundLight).lerp(new THREE.Color(0xd7e8a8), 0.16).offsetHSL((rng() - 0.5) * 0.04, 0.05, (rng() - 0.5) * 0.12);
    if (level.phase === 'night') c.multiplyScalar(0.5);
    setInstanced(blades, i, dummy, new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r), new THREE.Vector3(s, s * (0.7 + rng() * 0.7), s), rng() * Math.PI, c);
  }
  blades.instanceMatrix.needsUpdate = true;
  if (blades.instanceColor) blades.instanceColor.needsUpdate = true;
  group.add(blades);

  // Flowers and mushrooms.
  const flowerGeo = new THREE.IcosahedronGeometry(0.055, 0);
  const flowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, flatShading: true });
  const flowerCount = 130;
  const flowers = new THREE.InstancedMesh(flowerGeo, flowerMat, flowerCount);
  flowers.frustumCulled = false;
  for (let i = 0; i < flowerCount; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 5 + rng() * 58;
    const fc = new THREE.Color(biome.flower[Math.floor(rng() * biome.flower.length)]);
    if (level.phase === 'night') fc.multiplyScalar(0.55);
    setInstanced(flowers, i, dummy, new THREE.Vector3(Math.cos(a) * r, 0.12 + rng() * 0.12, Math.sin(a) * r), new THREE.Vector3(1, 1, 1), rng() * Math.PI, fc);
  }
  flowers.instanceMatrix.needsUpdate = true;
  if (flowers.instanceColor) flowers.instanceColor.needsUpdate = true;
  group.add(flowers);

  const mushroomStemGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.2, 5);
  const mushroomStemMat = new THREE.MeshStandardMaterial({ color: 0xe7dfca, roughness: 1, flatShading: true });
  const mushroomCapGeo = new THREE.ConeGeometry(0.14, 0.12, 7);
  const mushroomCapMat = new THREE.MeshStandardMaterial({ color: 0xc75d3f, roughness: 0.9, flatShading: true });
  const mushroomCount = 34;
  const stems = new THREE.InstancedMesh(mushroomStemGeo, mushroomStemMat, mushroomCount);
  const caps = new THREE.InstancedMesh(mushroomCapGeo, mushroomCapMat, mushroomCount);
  stems.frustumCulled = caps.frustumCulled = false;
  for (let i = 0; i < mushroomCount; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 6 + rng() * 58;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const s = 0.6 + rng() * 0.9;
    setInstanced(stems, i, dummy, new THREE.Vector3(x, 0.1 * s, z), new THREE.Vector3(s, s, s), rng() * Math.PI, null);
    setInstanced(caps, i, dummy, new THREE.Vector3(x, 0.2 * s, z), new THREE.Vector3(s, s, s), rng() * Math.PI, null);
  }
  stems.instanceMatrix.needsUpdate = true;
  caps.instanceMatrix.needsUpdate = true;
  group.add(stems, caps);

  // A few fallen logs.
  const logMat = new THREE.MeshStandardMaterial({ color: biome.trunk, roughness: 1, flatShading: true });
  for (let i = 0; i < 9; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 12 + rng() * 48;
    const len = 1.6 + rng() * 2.6;
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.16 + rng() * 0.1, 0.2 + rng() * 0.1, len, 6), logMat);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = rng() * Math.PI;
    log.position.set(Math.cos(a) * r, 0.18, Math.sin(a) * r);
    group.add(log);
    obstacles.push({ x: log.position.x, z: log.position.z, r: 0.55 });
  }

  // Night life and air.
  const fireflies = makeFireflies(110, rng, 62);
  fireflies.material.opacity = level.phase === 'night' ? 0.95 : level.phase === 'dusk' ? 0.5 : 0.06;
  group.add(fireflies);

  const motes = makeMotes(150, rng, 55);
  motes.material.opacity = level.phase === 'night' ? 0.25 : 0.45;
  group.add(motes);

  const leafFall = (() => {
    const count = level.biome === 'autumn' || level.biome === 'ember' ? 70 : 24;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (rng() - 0.5) * 70;
      positions[i * 3 + 1] = 1 + rng() * 14;
      positions[i * 3 + 2] = (rng() - 0.5) * 70;
      speeds[i] = 0.4 + rng() * 0.9;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(biome.leaf[0]),
      size: 0.14,
      transparent: true,
      opacity: level.phase === 'night' ? 0.25 : 0.55,
      depthWrite: false
    });
    const points = new THREE.Points(geo, mat);
    points.userData.speeds = speeds;
    return points;
  })();
  group.add(leafFall);

  const startTime = rng() * 10;
  let elapsed = startTime;

  const world = {
    group,
    obstacles,
    biome,
    phase,
    radius: 72,
    fireflies,
    motes,
    leafFall,
    clouds,
    stars,
    sunSprite,
    sunCore,
    update(dt) {
      elapsed += dt;
      for (let i = 0; i < clouds.length; i += 1) {
        clouds[i].position.x += dt * (0.22 + i * 0.025);
        if (clouds[i].position.x > 100) clouds[i].position.x = -100;
      }

      const firePos = fireflies.geometry.attributes.position;
      const base = fireflies.userData.base;
      const seeds = fireflies.userData.seeds;
      for (let i = 0; i < firePos.count; i += 1) {
        const s = seeds[i];
        firePos.array[i * 3] = base[i * 3] + Math.sin(elapsed * 0.5 + s) * 1.6;
        firePos.array[i * 3 + 1] = base[i * 3 + 1] + Math.sin(elapsed * 0.9 + s * 1.7) * 0.7;
        firePos.array[i * 3 + 2] = base[i * 3 + 2] + Math.cos(elapsed * 0.42 + s * 1.3) * 1.6;
      }
      firePos.needsUpdate = true;
      fireflies.material.opacity = Math.max(0, (level.phase === 'night' ? 0.75 : level.phase === 'dusk' ? 0.42 : 0.04) + Math.sin(elapsed * 1.7) * 0.08);

      const motePos = motes.geometry.attributes.position;
      for (let i = 0; i < motePos.count; i += 1) {
        motePos.array[i * 3 + 1] += dt * 0.11;
        if (motePos.array[i * 3 + 1] > 7.5) motePos.array[i * 3 + 1] = 0.4;
        motePos.array[i * 3] += Math.sin(elapsed * 0.3 + i) * dt * 0.035;
      }
      motePos.needsUpdate = true;

      const fallPos = leafFall.geometry.attributes.position;
      const speeds = leafFall.userData.speeds;
      for (let i = 0; i < fallPos.count; i += 1) {
        fallPos.array[i * 3 + 1] -= dt * speeds[i];
        fallPos.array[i * 3] += Math.sin(elapsed * 0.8 + i) * dt * 0.22;
        if (fallPos.array[i * 3 + 1] < 0.1) {
          fallPos.array[i * 3 + 1] = 10 + Math.random() * 6;
          fallPos.array[i * 3] = (Math.random() - 0.5) * 70;
          fallPos.array[i * 3 + 2] = (Math.random() - 0.5) * 70;
        }
      }
      fallPos.needsUpdate = true;

      if (level.phase === 'night') {
        stars.material.opacity = 0.7 + Math.sin(elapsed * 0.8) * 0.08;
        stars.rotation.y = elapsed * 0.003;
      } else if (level.phase === 'dusk') {
        stars.material.opacity = 0.18 + Math.sin(elapsed * 0.6) * 0.04;
      } else {
        stars.material.opacity = 0;
      }
    },
    dispose() {
      scene.remove(group);
      scene.fog = null;
      group.traverse((child) => {
        if (child.isMesh || child.isPoints || child.isSprite) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((mat) => {
              if (mat.map && mat.map !== gTex) mat.map.dispose();
              mat.dispose();
            });
          }
        }
      });
      gTex.dispose();
      groundMap.dispose();
      sunTex.dispose();
    }
  };

  return world;
}
