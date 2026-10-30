import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/**
 * buildSoldier — fully procedural modern tactical operator.
 *
 * The model is authored facing -Z, feet on y = 0, 1.82 m tall, with a humanoid
 * pivot hierarchy intended for additive procedural animation. Every visible
 * surface is built from primitives / custom BufferGeometry. No textures, no
 * external assets.
 *
 * @param {typeof import('three')} THREE
 * @param {Object} materials  Optional shared material registry (left untouched).
 * @param {{variant?:number, rng?:()=>number}} options
 * @returns {{group:THREE.Group, refs:Object, hitboxes:Array, muzzle:THREE.Object3D, dispose:Function}}
 */
export function buildSoldier(THREE, materials, options = {}) {
  const variant = ((Number(options.variant) | 0) % 4 + 4) % 4;
  const rng = typeof options.rng === 'function' ? options.rng : mulberry32(0x5f3759df ^ (variant * 0x9e3779b9));
  const rnd = (a = 0, b = 1) => a + (b - a) * rng();

  // ---------------------------------------------------------------------------
  // Palette (all colours stored linear; vertex colours supply the variation)
  // ---------------------------------------------------------------------------
  const PALETTES = [
    { // 0 — multicam / sand
      cloth: '#70644b', clothAlt: '#333224', gear: '#49453a', gearAlt: '#343228',
      webbing: '#333127', helmet: '#4e4a39', wrap: '#857253', patch: '#7e2f27',
      boot: '#3c3328', glove: '#24211c', skin: '#96684e', sling: '#5b5039',
      accent: '#75664b', metal: '#2e3135'
    },
    { // 1 — ranger green
      cloth: '#4d5945', clothAlt: '#333f2e', gear: '#465040', gearAlt: '#333c2e',
      webbing: '#39422f', helmet: '#3d4635', wrap: '#3a4034', patch: '#4e6c40',
      boot: '#3a3226', glove: '#22241e', skin: '#8c6046', sling: '#363c2e',
      accent: '#556047', metal: '#2e3235'
    },
    { // 2 — PMC black / grey
      cloth: '#4b4e49', clothAlt: '#2e312f', gear: '#2f3330', gearAlt: '#222624',
      webbing: '#242825', helmet: '#32352f', wrap: '#64675d', patch: '#b08a2e',
      boot: '#2d2923', glove: '#1d1f1c', skin: '#c39a75', sling: '#252824',
      accent: '#3b3f3a', metal: '#23262a'
    },
    { // 3 — desert
      cloth: '#988765', clothAlt: '#6a593c', gear: '#88785a', gearAlt: '#65583f',
      webbing: '#6b5e45', helmet: '#7d7153', wrap: '#c1ac84', patch: '#8e3b2c',
      boot: '#5a4a36', glove: '#3a3126', skin: '#6f4c36', sling: '#88785a',
      accent: '#a08a61', metal: '#34373a'
    }
  ];
  const P = PALETTES[variant];

  const col = (hex) => new THREE.Color(hex);
  const C = {
    cloth: col(P.cloth), clothAlt: col(P.clothAlt), gear: col(P.gear), gearAlt: col(P.gearAlt),
    webbing: col(P.webbing), helmet: col(P.helmet), wrap: col(P.wrap), patch: col(P.patch),
    boot: col(P.boot), glove: col(P.glove), skin: col(P.skin), sling: col(P.sling),
    accent: col(P.accent), metal: col(P.metal),
    dark: col('#17181a'), black: col('#0d0e10'), rubber: col('#141416'),
    brass: col('#8a6b39'), red: col('#a51f18'), greenGlow: col('#58ff9a'),
    nvgBody: col('#2a2d2b'), lens: col('#11281a'), white: col('#e7e2d4')
  };
  // Skin tone is nudged per build.
  C.skin.multiplyScalar(0.92 + rnd(0, 0.16));

  // Silhouette variant switches
  const hasCap = variant === 2;
  const hasNVG = !hasCap && (variant === 0 || variant === 3);
  const hasGoggles = variant === 1 || variant === 2;
  const hasShemagh = variant !== 1;
  const hasBackpack = variant === 0 || variant === 3;
  const hasSuppressor = variant !== 1;
  const hasThighRig = variant !== 1;

  // ---------------------------------------------------------------------------
  // Utility — geometry
  // ---------------------------------------------------------------------------
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const DOWN = V3(0, -1, 0);
  const ZAXIS = V3(0, 0, 1);

  const geo = {
    box: (w, h, d) => new THREE.BoxGeometry(w, h, d),
    rbox: (w, h, d, r = 0.012, seg = 1) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w * 0.49, h * 0.49, d * 0.49)),
    cyl: (rt, rb, h, rs = 8, open = false) => new THREE.CylinderGeometry(rt, rb, h, rs, 1, open),
    sph: (r, ws = 10, hs = 7) => new THREE.SphereGeometry(r, ws, hs),
    cap: (r, len, capSeg = 3, rs = 8) => new THREE.CapsuleGeometry(r, Math.max(0.001, len), capSeg, rs),
    torus: (r, t, rs = 5, ts = 12, arc = Math.PI * 2) => new THREE.TorusGeometry(r, t, rs, ts, arc),
    cone: (r, h, rs = 5, open = false) => new THREE.ConeGeometry(r, h, rs, 1, open),
    lathe: (pts, seg = 14) => new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg),
    tube: (pts, r, ts = 14, rs = 4) => {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => V3(p[0], p[1], p[2])), false, 'centripetal');
      return new THREE.TubeGeometry(curve, ts, r, rs, false);
    },
    limb: (a, b, r, rs = 6, capSeg = 2) => {
      const av = V3(a[0], a[1], a[2]);
      const bv = V3(b[0], b[1], b[2]);
      const d = av.distanceTo(bv);
      const g = geo.cap(r, Math.max(0.001, d - r * 2), capSeg, rs);
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), bv.clone().sub(av).normalize());
      g.applyQuaternion(q);
      const mid = av.clone().add(bv).multiplyScalar(0.5);
      g.translate(mid.x, mid.y, mid.z);
      return g;
    },
    // High-cut helmet shell. The rim climbs at the brow and drops behind the
    // ears instead of folding a sphere's bottom ring back on itself.
    helmetShell: (segs = 18, rings = 7) => {
      const cx = 0.113, cz = 0.120, cy = 0.075, ry = 0.125;
      const pos = [0, cy + ry, 0.004];
      const idx = [];
      for (let r = 1; r <= rings; r++) {
        const t = r / rings;
        for (let s = 0; s < segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          const dx = Math.sin(a), dz = Math.cos(a);
          const rim = 0.091 - 0.022 * dz + 0.004 * Math.abs(dx);
          const cosMax = THREE.MathUtils.clamp((rim - cy) / ry, -1, 1);
          const th = t * Math.acos(cosMax);
          const st = Math.sin(th), ct = Math.cos(th);
          pos.push(cx * st * dx, cy + ry * ct, cz * st * dz + 0.004);
        }
      }
      for (let s = 0; s < segs; s++) {
        idx.push(0, 1 + s, 1 + ((s + 1) % segs));
      }
      for (let r = 0; r < rings - 1; r++) {
        const base = 1 + r * segs;
        for (let s = 0; s < segs; s++) {
          const s2 = (s + 1) % segs;
          idx.push(base + s, base + segs + s, base + s2);
          idx.push(base + s2, base + segs + s, base + segs + s2);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    }
  };

  const _q = new THREE.Quaternion();
  const _m = new THREE.Matrix4();
  const _s = new THREE.Vector3();
  const _p = new THREE.Vector3();

  function place(g, o = {}) {
    const pos = o.p ? V3(o.p[0], o.p[1], o.p[2]) : _p.set(0, 0, 0);
    const quat = o.q ? o.q.clone() : new THREE.Quaternion().setFromEuler(new THREE.Euler(
      o.r ? o.r[0] : 0, o.r ? o.r[1] : 0, o.r ? o.r[2] : 0, o.order || 'XYZ'
    ));
    const scale = o.s ? V3(o.s[0], o.s[1], o.s[2]) : _s.set(1, 1, 1);
    _m.compose(pos, quat, scale);
    g.applyMatrix4(_m);
    return g;
  }

  // Cheap spatial hash noise (stable, independent of call order).
  function hash3(x, y, z) {
    const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
    return n - Math.floor(n);
  }

  function camoColor(base, alt, p, amount = 0.58) {
    const warp = Math.sin(p.y * 11.3 + p.x * 5.7) * 0.85 + Math.cos(p.z * 9.1 - p.y * 7.7) * 0.6;
    const n = Math.sin(p.x * 61 + warp * 2.7) * Math.cos(p.z * 47 + p.y * 15 + warp * 1.3)
      + 0.33 * Math.sin(p.y * 83 + p.x * 27) + 0.18 * Math.cos(p.z * 101 - p.x * 19);
    const t = THREE.MathUtils.smoothstep(n, -0.15, 0.9) * amount;
    return base.clone().lerp(alt, t);
  }

  function tint(g, o, baseY, fallback) {
    const pos = g.attributes.position;
    const count = pos.count;
    const arr = new Float32Array(count * 3);
    const base = o.color || fallback;
    const alt = o.color2 || base;
    const dirt = o.dirt || 0;
    const grain = o.grain === undefined ? 0.055 : o.grain;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i) + baseY;
      const z = pos.getZ(i);
      const c = o.camo ? camoColor(base, alt, { x, y, z }, o.camoAmount === undefined ? 0.62 : o.camoAmount) : base.clone();
      const n = hash3(x * 0.73, y * 0.91, z * 0.67) - 0.5;
      const grime = dirt * THREE.MathUtils.clamp((0.78 - y) / 0.9, 0, 1) * 0.42;
      const k = Math.max(0.35, (1 + n * grain * 2) * (1 - grime));
      arr[i * 3] = Math.min(1.6, c.r * k);
      arr[i * 3 + 1] = Math.min(1.6, c.g * k);
      arr[i * 3 + 2] = Math.min(1.6, c.b * k);
    }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  }

  function prepare(g, o, baseY, fallback) {
    if (g.index) {
      const ni = g.toNonIndexed();
      g.dispose();
      g = ni;
    }
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    if (o.xf) place(g, o.xf);
    else if (o.p || o.r || o.q || o.s) place(g, o);
    tint(g, o, baseY, fallback);
    return g;
  }

  // ---------------------------------------------------------------------------
  // Materials
  // ---------------------------------------------------------------------------
  const createdMaterials = [];
  function mkMat(name, Ctor, params) {
    const m = new Ctor(Object.assign({ vertexColors: true }, params));
    m.name = name;
    createdMaterials.push(m);
    return m;
  }
  const white = new THREE.Color(1, 1, 1);
  const MATS = {
    cloth: mkMat('soldier.cloth', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.94, metalness: 0.0
    }),
    nylon: mkMat('soldier.nylon', THREE.MeshPhysicalMaterial, {
      color: white, roughness: 0.58, metalness: 0.02,
      sheen: 1.0, sheenRoughness: 0.72, sheenColor: new THREE.Color(0x9a9486)
    }),
    webbing: mkMat('soldier.webbing', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.86, metalness: 0.0
    }),
    gear: mkMat('soldier.gear', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.7, metalness: 0.05
    }),
    metal: mkMat('soldier.metal', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.34, metalness: 0.85
    }),
    polymer: mkMat('soldier.polymer', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.44, metalness: 0.08
    }),
    rubber: mkMat('soldier.rubber', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.96, metalness: 0.0
    }),
    leather: mkMat('soldier.leather', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.72, metalness: 0.03
    }),
    skin: mkMat('soldier.skin', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.62, metalness: 0.0
    }),
    glove: mkMat('soldier.glove', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.8, metalness: 0.02
    }),
    cord: mkMat('soldier.cord', THREE.MeshStandardMaterial, {
      color: white, roughness: 0.85, metalness: 0.0
    }),
    glass: mkMat('soldier.glass', THREE.MeshPhysicalMaterial, {
      color: white, roughness: 0.08, metalness: 0.22, transparent: true,
      opacity: 0.38, depthWrite: false, side: THREE.DoubleSide
    }),
    glow: mkMat('soldier.glow', THREE.MeshStandardMaterial, {
      color: col('#05150b'), emissive: col('#4dff91'), emissiveIntensity: 0.95,
      roughness: 0.3, metalness: 0.1, toneMapped: false
    }),
    reticle: mkMat('soldier.reticle', THREE.MeshBasicMaterial, {
      color: white, toneMapped: false
    })
  };
  const DEFAULT_COLOR = {
    cloth: C.cloth, nylon: C.gear, webbing: C.webbing, gear: C.gear,
    metal: C.metal, polymer: C.dark, rubber: C.rubber, leather: C.boot,
    skin: C.skin, glove: C.glove, cord: C.dark, glass: col('#7fa68d'),
    glow: C.greenGlow, reticle: C.red
  };
  const NO_SHADOW = new Set(['glass', 'glow', 'reticle']);

  // ---------------------------------------------------------------------------
  // Rig
  // ---------------------------------------------------------------------------
  const group = new THREE.Group();
  group.name = 'TacticalOperator';
  group.userData = { variant, forward: '-Z', height: 1.82, procedural: true };

  const hips = new THREE.Group(); hips.name = 'hips'; hips.position.set(0, 0.95, 0);
  const spine = new THREE.Group(); spine.name = 'spine'; spine.position.set(0, 0.07, 0);
  const chest = new THREE.Group(); chest.name = 'chest'; chest.position.set(0, 0.22, 0);
  const neck = new THREE.Group(); neck.name = 'neck'; neck.position.set(0, 0.28, 0);
  const head = new THREE.Group(); head.name = 'head'; head.position.set(0, 0.10, 0);
  group.add(hips); hips.add(spine); spine.add(chest); chest.add(neck); neck.add(head);

  const hipL = new THREE.Group(); hipL.name = 'hipL'; hipL.position.set(-0.105, -0.02, 0);
  const hipR = new THREE.Group(); hipR.name = 'hipR'; hipR.position.set(0.105, -0.02, 0);
  const kneeL = new THREE.Group(); kneeL.name = 'kneeL'; kneeL.position.set(0, -0.43, 0);
  const kneeR = new THREE.Group(); kneeR.name = 'kneeR'; kneeR.position.set(0, -0.43, 0);
  hips.add(hipL, hipR); hipL.add(kneeL); hipR.add(kneeR);
  const stance = rnd(0, 1);
  hipL.rotation.y = 0.068 + stance * 0.022;
  hipR.rotation.y = -0.058 - stance * 0.02;

  const shoulderL = new THREE.Group(); shoulderL.name = 'shoulderL'; shoulderL.position.set(-0.205, 0.20, 0);
  const shoulderR = new THREE.Group(); shoulderR.name = 'shoulderR'; shoulderR.position.set(0.205, 0.20, 0);
  chest.add(shoulderL, shoulderR);

  const elbowL = new THREE.Group(); elbowL.name = 'elbowL';
  const elbowR = new THREE.Group(); elbowR.name = 'elbowR';
  const handL = new THREE.Group(); handL.name = 'handL';
  const handR = new THREE.Group(); handR.name = 'handR';
  shoulderL.add(elbowL); shoulderR.add(elbowR);
  elbowL.add(handL); elbowR.add(handR);

  // ---------------------------------------------------------------------------
  // Builder: collects same-material geometry inside one bone, merges on finish.
  // ---------------------------------------------------------------------------
  const allMeshes = [];
  const builders = [];
  function builder(parent, name, baseY, opts = {}) {
    const buckets = Object.create(null);
    const b = {
      parent, name, baseY, buckets,
      add(key, g, o = {}) {
        if (!MATS[key]) throw new Error('soldier: unknown material bucket ' + key);
        const prepared = prepare(g, o, baseY, o.color || DEFAULT_COLOR[key]);
        (buckets[key] || (buckets[key] = [])).push(prepared);
        return prepared;
      },
      finish() {
        for (const key of Object.keys(buckets)) {
          const list = buckets[key];
          if (!list.length) continue;
          const merged = mergeGeometries(list, false);
          for (const g of list) g.dispose();
          if (!merged) throw new Error('soldier: merge failed for ' + name + ':' + key);
          merged.computeBoundingSphere();
          const mesh = new THREE.Mesh(merged, MATS[key]);
          mesh.name = name + ':' + key;
          mesh.castShadow = opts.castShadow !== false && !NO_SHADOW.has(key);
          mesh.receiveShadow = opts.receiveShadow !== false;
          parent.add(mesh);
          allMeshes.push(mesh);
        }
        bucketsCleanup(buckets);
      }
    };
    builders.push(b);
    return b;
  }
  function bucketsCleanup(buckets) {
    for (const k of Object.keys(buckets)) delete buckets[k];
  }

  const B = {
    hips: builder(hips, 'hips', 0.95),
    spine: builder(spine, 'spine', 1.02),
    chest: builder(chest, 'chest', 1.24),
    neck: builder(neck, 'neck', 1.52),
    head: builder(head, 'head', 1.62),
    legL: builder(hipL, 'legL.thigh', 0.93),
    kneeL: builder(kneeL, 'legL.shin', 0.50),
    legR: builder(hipR, 'legR.thigh', 0.93),
    kneeR: builder(kneeR, 'legR.shin', 0.50)
  };

  // ---------------------------------------------------------------------------
  // Hips / pelvis / belt
  // ---------------------------------------------------------------------------
  B.hips.add('cloth', geo.rbox(0.305, 0.18, 0.235, 0.055, 1), {
    p: [0, 0.015, 0], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.3
  });
  for (const sx of [-1, 1]) {
    B.hips.add('cloth', geo.sph(0.105, 10, 7), {
      p: [sx * 0.068, -0.025, 0.055], s: [0.95, 0.78, 0.9], color: C.cloth, color2: C.clothAlt, camo: true
    });
  }
  // belt
  B.hips.add('gear', geo.cyl(0.198, 0.198, 0.072, 14, true), {
    p: [0, 0.045, 0], s: [1, 1, 0.8], color: C.webbing, grain: 0.03
  });
  // webbing loops
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    B.hips.add('webbing', geo.box(0.018, 0.078, 0.012), {
      p: [Math.cos(a) * 0.194, 0.04, Math.sin(a) * 0.155], r: [0, -a, 0], color: C.webbing
    });
  }
  // buckle
  B.hips.add('metal', geo.rbox(0.062, 0.04, 0.018, 0.006, 1), {
    p: [0, 0.045, -0.155], color: C.metal
  });
  B.hips.add('metal', geo.box(0.042, 0.014, 0.022), {
    p: [0, 0.045, -0.163], color: C.dark
  });
  // belt pouches / dump pouch / knife
  B.hips.add('gear', geo.rbox(0.115, 0.125, 0.062, 0.014, 1), {
    p: [0.125, -0.005, 0.135], r: [0, -0.28, 0], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.25
  });
  B.hips.add('webbing', geo.box(0.118, 0.014, 0.065), {
    p: [0.125, 0.052, 0.135], r: [0, -0.28, 0], color: C.webbing
  });
  B.hips.add('gear', geo.box(0.085, 0.10, 0.05), {
    p: [-0.135, -0.01, 0.115], r: [0, 0.32, 0], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.2
  });
  B.hips.add('gear', geo.box(0.035, 0.14, 0.045), {
    p: [-0.175, -0.05, -0.02], r: [0, 0, 0.18], color: C.dark
  });
  B.hips.add('metal', geo.cyl(0.006, 0.006, 0.075, 6), {
    p: [-0.176, 0.02, -0.022], r: [0.35, 0, 0.2], color: C.metal
  });

  // ---------------------------------------------------------------------------
  // Abdomen (spine) — soft cloth bridge between hips and chest armour
  // ---------------------------------------------------------------------------
  B.spine.add('cloth', geo.lathe([
    [0.001, -0.055], [0.138, -0.045], [0.151, 0.02], [0.163, 0.10],
    [0.158, 0.15], [0.001, 0.17]
  ], 12), {
    s: [1, 1, 0.72], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.15
  });
  // belt-end shirt folds
  for (const sx of [-1, 1]) {
    B.spine.add('cloth', geo.torus(0.148, 0.007, 4, 12), {
      p: [0, 0.01, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.72], color: C.clothAlt, camo: true
    });
  }

  // ---------------------------------------------------------------------------
  // Chest: torso, plate carrier, pouches, radio, backpack
  // ---------------------------------------------------------------------------
  B.chest.add('cloth', geo.lathe([
    [0.001, -0.145], [0.146, -0.145], [0.162, -0.08], [0.178, 0.0],
    [0.198, 0.08], [0.206, 0.145], [0.186, 0.20], [0.125, 0.228], [0.001, 0.235]
  ], 14), {
    s: [1, 1, 0.70], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.06
  });
  for (const sx of [-1, 1]) {
    B.chest.add('cloth', geo.sph(0.078, 10, 7), {
      p: [sx * 0.188, 0.182, 0], s: [0.96, 0.82, 0.9], color: C.cloth, color2: C.clothAlt, camo: true
    });
    B.chest.add('cloth', new THREE.CircleGeometry(0.03, 6), {
      p: [sx * 0.175, 0.19, -0.055], r: [0.2, sx * 0.55, 0.4], s: [1.1, 0.55, 1], color: C.clothAlt, grain: 0.02
    });
  }

  // Front / back hard plates
  B.chest.add('nylon', geo.rbox(0.30, 0.325, 0.058, 0.02, 1), {
    p: [0, -0.012, -0.145], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.22
  });
  B.chest.add('nylon', geo.rbox(0.30, 0.34, 0.058, 0.02, 1), {
    p: [0, 0.006, 0.135], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.18
  });
  // Cummerbund
  B.chest.add('nylon', geo.cyl(0.207, 0.207, 0.155, 16, true), {
    p: [0, -0.105, 0], s: [1, 1, 0.73], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.25
  });
  // Shoulder straps
  for (const sx of [-1, 1]) {
    B.chest.add('webbing', geo.rbox(0.072, 0.038, 0.30, 0.012, 1), {
      p: [sx * 0.108, 0.176, 0], color: C.webbing
    });
    B.chest.add('metal', geo.box(0.026, 0.05, 0.018), {
      p: [sx * 0.108, 0.075, -0.168], color: C.metal
    });
  }
  // MOLLE rows
  for (let i = 0; i < 4; i++) {
    B.chest.add('webbing', geo.box(0.265, 0.011, 0.008), {
      p: [0, -0.10 + i * 0.042, -0.176], color: C.webbing
    });
  }
  for (let i = -2; i <= 2; i++) {
    B.chest.add('webbing', geo.box(0.009, 0.145, 0.008), {
      p: [i * 0.062, -0.04, -0.176], color: C.webbing
    });
  }
  // Three magazine pouches
  for (let i = -1; i <= 1; i++) {
    const x = i * 0.086;
    B.chest.add('nylon', geo.rbox(0.073, 0.098, 0.052, 0.012, 1), {
      p: [x, -0.115, -0.198], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.3
    });
    B.chest.add('nylon', geo.box(0.076, 0.033, 0.058), {
      p: [x, -0.061, -0.196], r: [-0.16, 0, 0], color: C.gearAlt
    });
    B.chest.add('webbing', geo.box(0.077, 0.011, 0.006), {
      p: [x, -0.103, -0.225], color: C.dark
    });
    B.chest.add('webbing', geo.box(0.012, 0.06, 0.008), {
      p: [x - 0.025, -0.07, -0.224], color: C.dark
    });
  }
  // Admin pouch
  B.chest.add('nylon', geo.rbox(0.145, 0.062, 0.04, 0.01, 1), {
    p: [0, 0.048, -0.181], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.2
  });
  B.chest.add('webbing', geo.box(0.137, 0.012, 0.008), {
    p: [0, 0.062, -0.202], color: C.webbing
  });
  // Radio on the left chest
  B.chest.add('gear', geo.rbox(0.05, 0.115, 0.042, 0.009, 1), {
    p: [0.162, 0.018, -0.07], r: [0, -0.27, 0], color: C.dark
  });
  B.chest.add('gear', geo.cyl(0.006, 0.006, 0.20, 6), {
    p: [0.182, 0.175, -0.052], r: [0.08, 0, -0.09], color: C.black
  });
  B.chest.add('metal', geo.cyl(0.0075, 0.0075, 0.014, 6), {
    p: [0.182, 0.278, -0.043], color: C.metal
  });
  B.chest.add('webbing', geo.box(0.054, 0.015, 0.045), {
    p: [0.162, 0.082, -0.07], r: [0, -0.27, 0], color: C.webbing
  });
  // PTT switch on the strap
  B.chest.add('gear', geo.rbox(0.034, 0.05, 0.022, 0.006, 1), {
    p: [-0.112, 0.055, -0.175], r: [0.1, 0, 0.05], color: C.dark
  });

  // Tourniquet on right shoulder strap
  B.chest.add('gear', geo.cyl(0.013, 0.013, 0.092, 7), {
    p: [-0.108, 0.115, -0.02], r: [0, 0, Math.PI / 2], color: C.black
  });
  B.chest.add('gear', geo.box(0.018, 0.036, 0.05), {
    p: [-0.065, 0.115, -0.02], color: C.black
  });
  B.chest.add('webbing', geo.box(0.012, 0.012, 0.048), {
    p: [-0.083, 0.133, -0.02], color: C.red
  });

  // Chem light on the left cummerbund
  B.chest.add('glow', geo.cyl(0.0075, 0.0075, 0.062, 6), {
    p: [0.196, -0.085, -0.083], r: [0.2, 0, -0.1], color: C.greenGlow
  });

  // Bungee / retention cord across the front plate
  B.chest.add('cord', geo.tube([
    [-0.145, 0.112, -0.173], [-0.07, 0.135, -0.184], [0.03, 0.128, -0.183], [0.12, 0.105, -0.174]
  ], 0.0042, 12, 4), { color: C.dark });

  // Backpack / hydration carrier
  if (hasBackpack) {
    B.chest.add('nylon', geo.rbox(0.268, 0.335, 0.15, 0.038, 1), {
      p: [0, 0.015, 0.245], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.22
    });
    B.chest.add('nylon', geo.rbox(0.272, 0.09, 0.158, 0.025, 1), {
      p: [0, 0.19, 0.248], r: [0.1, 0, 0], color: C.gearAlt, camo: true
    });
    B.chest.add('webbing', geo.box(0.24, 0.012, 0.012), {
      p: [0, 0.07, 0.325], color: C.webbing
    });
    B.chest.add('webbing', geo.box(0.24, 0.012, 0.012), {
      p: [0, -0.055, 0.325], color: C.webbing
    });
    for (const sx of [-1, 1]) {
      B.chest.add('nylon', geo.rbox(0.062, 0.12, 0.055, 0.016, 1), {
        p: [sx * 0.165, -0.015, 0.255], color: C.gearAlt, camo: true
      });
      B.chest.add('webbing', geo.box(0.055, 0.20, 0.016), {
        p: [sx * 0.112, 0.155, 0.03], r: [0, 0, sx * 0.06], color: C.webbing
      });
    }
    B.chest.add('cord', geo.tube([
      [0.10, 0.18, 0.31], [0.13, 0.24, 0.14], [0.13, 0.20, -0.06], [0.075, 0.10, -0.17]
    ], 0.004, 14, 4), { color: C.dark });
  }

  // ---------------------------------------------------------------------------
  // Legs — baggy combat trousers, thigh rigs, knee pads, laced boots
  // ---------------------------------------------------------------------------
  for (const side of [-1, 1]) {
    const isL = side === -1;
    const legB = isL ? B.legL : B.legR;
    const kneeB = isL ? B.kneeL : B.kneeR;
    const sx = isL ? -1 : 1;

    // Thigh
    legB.add('cloth', geo.cyl(0.063, 0.084, 0.40, 12), {
      p: [0, -0.215, 0], s: [1, 1, 0.96], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.35
    });
    legB.add('cloth', geo.sph(0.085, 10, 6), {
      p: [0, -0.012, 0], s: [1, 0.72, 0.96], color: C.cloth, color2: C.clothAlt, camo: true
    });
    for (const [y, r] of [[-0.10, 0.079], [-0.19, 0.074], [-0.30, 0.068]]) {
      legB.add('cloth', geo.torus(r, 0.0065, 4, 12), {
        p: [0, y, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.95], color: C.clothAlt, camo: true, camoAmount: 0.3
      });
    }
    // irregular camo blotches (flat discs, sub-cm offset to avoid z-fighting)
    const patchSpecs = [
      [sx * 0.022, -0.115, -0.0825, [0, Math.PI, 0.35], [1.35, 0.55, 1]],
      [sx * 0.0835, -0.245, 0.004, [0, sx * Math.PI / 2, -0.2], [1.0, 0.65, 1]],
      [0.012, -0.345, 0.065, [0, 0, 0.8], [1.2, 0.5, 1]]
    ];
    for (const [px, py, pz, rr, ss] of patchSpecs) {
      legB.add('cloth', new THREE.CircleGeometry(0.045, 6), {
        p: [px, py, pz], r: rr, s: ss, color: C.clothAlt, grain: 0.02
      });
    }
    // Cargo pocket
    legB.add('cloth', geo.rbox(0.032, 0.105, 0.078, 0.012, 1), {
      p: [sx * 0.073, -0.19, -0.012], r: [0, 0, sx * -0.04], color: C.clothAlt, camo: true, camoAmount: 0.25, dirt: 0.3
    });
    legB.add('webbing', geo.box(0.012, 0.016, 0.076), {
      p: [sx * 0.091, -0.145, -0.012], color: C.webbing
    });

    // Thigh rig + holster (right leg) or utility pouch (left)
    if (isL) {
      legB.add('gear', geo.rbox(0.035, 0.10, 0.06, 0.01, 1), {
        p: [-0.085, -0.20, -0.025], color: C.dark
      });
      legB.add('webbing', geo.box(0.008, 0.09, 0.045), {
        p: [-0.102, -0.20, -0.025], color: C.webbing
      });
    } else {
      // strap band
      legB.add('gear', geo.cyl(0.088, 0.088, 0.048, 12, true), {
        p: [0, -0.16, 0], s: [1, 1, 0.95], color: C.webbing
      });
      legB.add('gear', geo.rbox(0.058, 0.16, 0.088, 0.014, 1), {
        p: [0.095, -0.235, -0.012], r: [0, 0, -0.05], color: C.dark
      });
      legB.add('gear', geo.box(0.062, 0.018, 0.092), {
        p: [0.095, -0.155, -0.012], color: C.black
      });
      // holstered pistol grip
      legB.add('polymer', geo.rbox(0.028, 0.07, 0.038, 0.008, 1), {
        p: [0.104, -0.115, 0.012], r: [0.18, 0, -0.08], color: C.black
      });
      legB.add('webbing', geo.box(0.008, 0.115, 0.008), {
        p: [0.126, -0.24, -0.012], color: C.webbing
      });
    }

    // Knee pad
    kneeB.add('gear', geo.rbox(0.128, 0.152, 0.058, 0.024, 1), {
      p: [0, 0.018, -0.073], r: [0.10, 0, 0], color: C.dark
    });
    kneeB.add('gear', geo.rbox(0.115, 0.04, 0.062, 0.014, 1), {
      p: [0, 0.085, -0.064], r: [0.12, 0, 0], color: C.black
    });
    for (const y of [0.035, -0.045]) {
      kneeB.add('webbing', geo.cyl(0.078, 0.078, 0.016, 10, true), {
        p: [0, y, 0], s: [1, 1, 0.94], color: C.webbing
      });
    }

    // Shin / trousers
    kneeB.add('cloth', geo.cyl(0.056, 0.064, 0.30, 10), {
      p: [0, -0.185, 0], s: [1, 1, 0.95], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.55
    });
    kneeB.add('cloth', geo.sph(0.062, 10, 6), {
      p: [0, -0.04, 0], s: [1, 0.8, 0.95], color: C.cloth, color2: C.clothAlt, camo: true
    });
    for (const [y, r] of [[-0.10, 0.062], [-0.23, 0.058]]) {
      kneeB.add('cloth', geo.torus(r, 0.0055, 4, 12), {
        p: [0, y, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.95], color: C.clothAlt, camo: true
      });
    }
    // Camo blotches on the shin
    kneeB.add('cloth', new THREE.CircleGeometry(0.036, 6), {
      p: [0.01, -0.12, -0.0645], r: [0, Math.PI, -0.3], s: [1.25, 0.5, 1], color: C.clothAlt, grain: 0.02
    });
    kneeB.add('cloth', new THREE.CircleGeometry(0.031, 6), {
      p: [sx * 0.0625, -0.255, 0.012], r: [0, sx * Math.PI / 2, 0.4], s: [1.0, 0.65, 1], color: C.clothAlt, grain: 0.02
    });
    // Bloused cuff over boot
    kneeB.add('cloth', geo.cyl(0.066, 0.071, 0.055, 10, true), {
      p: [0, -0.318, 0], s: [1, 1, 0.96], color: C.clothAlt, camo: true, dirt: 0.5
    });

    // Boot upper + ankle shaft + laces
    kneeB.add('leather', geo.cyl(0.058, 0.061, 0.118, 9), {
      p: [0, -0.362, 0], color: C.boot
    });
    kneeB.add('leather', geo.rbox(0.108, 0.09, 0.225, 0.028, 1), {
      p: [0, -0.434, -0.04], color: C.boot, dirt: 0.45
    });
    kneeB.add('leather', geo.rbox(0.103, 0.067, 0.105, 0.026, 1), {
      p: [0, -0.437, -0.146], color: C.boot
    });
    kneeB.add('leather', geo.box(0.072, 0.012, 0.12), {
      p: [0, -0.381, -0.075], r: [-0.12, 0, 0], color: C.boot
    });
    for (let i = 0; i < 5; i++) {
      kneeB.add('leather', geo.box(0.076, 0.006, 0.011), {
        p: [0, -0.383 - i * 0.0145, -0.069 - i * 0.016], r: [-0.18, 0, 0],
        color: C.black, grain: 0.02
      });
    }
    // Collar padding + rear pull tab
    kneeB.add('leather', geo.torus(0.06, 0.009, 4, 10), {
      p: [0, -0.309, 0], r: [Math.PI / 2, 0, 0], color: C.boot
    });
    kneeB.add('webbing', geo.box(0.024, 0.044, 0.008), {
      p: [0, -0.33, 0.054], color: C.webbing
    });

    // Sole — bottom face is exactly at y = -0.5 in knee space (world y = 0)
    kneeB.add('rubber', geo.rbox(0.122, 0.036, 0.272, 0.012, 1), {
      p: [0, -0.482, -0.044], color: C.rubber
    });
    kneeB.add('rubber', geo.rbox(0.108, 0.026, 0.075, 0.01, 1), {
      p: [0, -0.468, 0.064], color: C.rubber
    });
    for (let i = 0; i < 3; i++) {
      kneeB.add('rubber', geo.box(0.105, 0.012, 0.022), {
        p: [0, -0.494, -0.145 + i * 0.062], color: C.dark
      });
    }
    // Toe rand
    kneeB.add('rubber', geo.box(0.104, 0.022, 0.028), {
      p: [0, -0.454, -0.192], r: [0.12, 0, 0], color: C.black
    });
  }

  // ---------------------------------------------------------------------------
  // Neck / head / face / helmet / night vision
  // ---------------------------------------------------------------------------
  B.neck.add('cloth', geo.cyl(0.052, 0.059, 0.12, 10), {
    p: [0, -0.018, 0], color: C.dark, grain: 0.03
  });
  B.neck.add('cloth', geo.torus(0.064, 0.008, 4, 12), {
    p: [0, -0.068, 0], r: [Math.PI / 2, 0, 0], color: C.clothAlt, camo: true
  });

  // Skull / balaclava
  B.head.add('cloth', geo.sph(0.092, 10, 7), {
    p: [0, 0.068, -0.003], s: [1.0, 1.10, 1.02], color: C.dark, grain: 0.035
  });
  for (const sx of [-1, 1]) {
    B.head.add('cloth', geo.sph(0.032, 8, 6), {
      p: [sx * 0.084, 0.066, 0.0], s: [0.7, 1.0, 0.85], color: C.dark
    });
  }
  // Exposed eye band / face
  B.head.add('skin', geo.sph(0.062, 12, 8), {
    p: [0, 0.078, -0.083], s: [1.0, 0.56, 0.42], color: C.skin
  });
  B.head.add('skin', geo.sph(0.014, 8, 6), {
    p: [0, 0.050, -0.106], s: [0.9, 1.25, 1.05], color: C.skin
  });
  for (const sx of [-1, 1]) {
    // recessed socket / almond eye / iris / brow. The dark panel sits behind
    // the eye rather than across it.
    B.head.add('cloth', geo.box(0.030, 0.016, 0.004), {
      p: [sx * 0.027, 0.079, -0.1105], color: C.black, grain: 0.005
    });
    B.head.add('skin', geo.sph(0.0085, 8, 5), {
      p: [sx * 0.027, 0.079, -0.1132], s: [1.42, 0.62, 0.5], color: col('#b6a48a'), grain: 0.004
    });
    B.head.add('glove', geo.sph(0.0034, 7, 4), {
      p: [sx * 0.027, 0.0785, -0.1174], s: [1.0, 1.0, 0.55], color: C.black, grain: 0.004
    });
  }

  // Lower-face wrap / shemagh
  if (hasShemagh) {
    // wrapped mask over mouth and jaw, kept below the eye band
    B.head.add('cloth', geo.sph(0.063, 10, 7), {
      p: [0, 0.019, -0.082], s: [0.93, 0.66, 0.62], color: C.wrap, camo: true, camoAmount: 0.16, grain: 0.035
    });
    // bridge fold / stitched seams
    B.head.add('cloth', geo.rbox(0.054, 0.008, 0.014, 0.004, 1), {
      p: [0, 0.045, -0.107], r: [0.30, 0, 0], color: C.wrap, grain: 0.02
    });
    B.head.add('cloth', geo.rbox(0.066, 0.0045, 0.009, 0.002, 1), {
      p: [0, 0.024, -0.126], r: [0.1, 0, 0.10], color: C.wrap, grain: 0.02
    });
    B.head.add('cloth', geo.rbox(0.058, 0.0042, 0.009, 0.002, 1), {
      p: [0, 0.006, -0.123], r: [0.1, 0, -0.07], color: C.wrap, grain: 0.02
    });
    // neck wrap
    B.head.add('cloth', geo.torus(0.076, 0.018, 4, 12), {
      p: [0, -0.047, -0.005], r: [Math.PI / 2, 0, 0], s: [1.0, 1, 0.92],
      color: C.wrap, camo: true, camoAmount: 0.2, grain: 0.03
    });
    // front drape
    B.head.add('cloth', geo.cone(0.105, 0.21, 5), {
      p: [0, -0.138, -0.058], s: [1, 1, 0.27], r: [0.05, 0.2, 0],
      color: C.wrap, camo: true, camoAmount: 0.2, grain: 0.03
    });
    // rear drape
    B.head.add('cloth', geo.cone(0.082, 0.16, 4), {
      p: [0, -0.12, 0.062], s: [1, 1, 0.26], r: [-0.08, 0.4, 0],
      color: C.wrap, camo: true, camoAmount: 0.2, grain: 0.03
    });
  } else {
    B.head.add('cloth', geo.torus(0.072, 0.016, 4, 12), {
      p: [0, -0.035, 0], r: [Math.PI / 2, 0, 0], color: C.dark
    });
  }

  // Goggles
  if (hasGoggles) {
    B.head.add('gear', geo.rbox(0.108, 0.05, 0.034, 0.014, 1), {
      p: [0, 0.074, -0.119], color: C.dark
    });
    B.head.add('glass', geo.rbox(0.09, 0.031, 0.012, 0.012, 1), {
      p: [0, 0.074, -0.139], color: col('#8fb8a2')
    });
    B.head.add('gear', geo.box(0.012, 0.041, 0.014), {
      p: [0, 0.074, -0.142], color: C.black
    });
    B.head.add('gear', geo.torus(0.103, 0.008, 4, 12), {
      p: [0, 0.074, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 1.04], color: C.dark
    });
  }

  // Helmet or patrol cap
  if (!hasCap) {
    // High-cut shell with a brow-high front rim and a lower rear skirt.
    B.head.add('cloth', geo.helmetShell(), {
      color: C.helmet, camo: true, camoAmount: 0.22, grain: 0.035
    });
    // scrim / retention band around the upper shell
    B.head.add('gear', geo.cyl(0.1005, 0.1025, 0.012, 18, true), {
      p: [0, 0.137, 0.004], s: [1.0, 1, 1.02], color: C.gearAlt
    });
    // front brow lip, kept at the raised helmet rim so it cannot shade the eyes
    B.head.add('gear', geo.rbox(0.096, 0.013, 0.032, 0.006, 1), {
      p: [0, 0.115, -0.112], r: [0.12, 0, 0], color: C.gearAlt
    });
    // ARC side rails
    for (const sx of [-1, 1]) {
      B.head.add('gear', geo.rbox(0.013, 0.04, 0.135, 0.006, 1), {
        p: [sx * 0.115, 0.088, -0.005], r: [0, 0, sx * 0.07], color: C.dark
      });
      for (let i = 0; i < 2; i++) {
        B.head.add('metal', geo.box(0.004, 0.015, 0.02), {
          p: [sx * 0.122, 0.088, -0.035 + i * 0.06], color: C.metal
        });
      }
      // velcro side patch
      B.head.add('gear', geo.box(0.006, 0.036, 0.05), {
        p: [sx * 0.116, 0.105, 0.028], r: [0, 0, sx * -0.12], color: C.gearAlt
      });
    }
    // top velcro strip
    B.head.add('gear', geo.box(0.045, 0.006, 0.10), {
      p: [0, 0.19, -0.025], color: C.gearAlt
    });
    // counterweight pouch
    B.head.add('gear', geo.rbox(0.086, 0.058, 0.042, 0.013, 1), {
      p: [0, 0.062, 0.112], r: [0.1, 0, 0], color: C.gear, camo: true, camoAmount: 0.2
    });
    B.head.add('webbing', geo.box(0.090, 0.011, 0.047), {
      p: [0, 0.085, 0.112], color: C.webbing
    });
    // retention bungees
    for (const sx of [-1, 1]) {
      B.head.add('cord', geo.tube([
        [sx * 0.111, 0.068, -0.064], [sx * 0.114, 0.082, 0.010], [sx * 0.092, 0.082, 0.098]
      ], 0.0038, 9, 4), { color: C.dark });
    }
    // NVG mount + binoculars
    // chin strap
    for (const sx of [-1, 1]) {
      B.head.add('cord', geo.tube([
        [sx * 0.106, 0.065, -0.012], [sx * 0.090, 0.008, -0.045], [sx * 0.042, -0.073, -0.056]
      ], 0.0045, 7, 3), { color: C.dark });
    }
    B.head.add('gear', geo.rbox(0.052, 0.018, 0.025, 0.006, 1), {
      p: [0, -0.073, -0.058], r: [0.1, 0, 0], color: C.black
    });
    if (hasNVG) {
      B.head.add('gear', geo.rbox(0.040, 0.030, 0.026, 0.007, 1), {
        p: [0, 0.122, -0.117], color: C.dark
      });
      B.head.add('gear', geo.rbox(0.024, 0.062, 0.024, 0.006, 1), {
        p: [0, 0.151, -0.136], r: [0.30, 0, 0], color: C.nvgBody
      });
      B.head.add('gear', geo.rbox(0.086, 0.044, 0.054, 0.013, 1), {
        p: [0, 0.163, -0.164], r: [0.06, 0, 0], color: C.nvgBody
      });
      for (const sx of [-1, 1]) {
        B.head.add('gear', geo.cyl(0.019, 0.021, 0.05, 8), {
          p: [sx * 0.0235, 0.163, -0.195], r: [Math.PI / 2, 0, 0], color: C.nvgBody
        });
        B.head.add('glow', geo.cyl(0.0145, 0.0145, 0.008, 8), {
          p: [sx * 0.0235, 0.163, -0.222], r: [Math.PI / 2, 0, 0], color: C.greenGlow
        });
      }
      B.head.add('gear', geo.box(0.078, 0.03, 0.022), {
        p: [0, 0.163, -0.134], color: C.black
      });
      B.head.add('metal', geo.cyl(0.008, 0.008, 0.018, 6), {
        p: [0, 0.190, -0.164], color: C.metal
      });
      B.head.add('webbing', geo.box(0.032, 0.008, 0.014), {
        p: [0, 0.114, -0.124], color: C.red
      });
    }
  } else {
    // Patrol cap
    B.head.add('cloth', geo.sph(0.115, 14, 8), {
      p: [0, 0.114, 0], s: [1.0, 0.7, 1.06], color: C.helmet, camo: true, camoAmount: 0.2
    });
    B.head.add('cloth', geo.rbox(0.105, 0.013, 0.083, 0.006, 1), {
      p: [0, 0.086, -0.135], r: [0.07, 0, 0], color: C.helmet
    });
    B.head.add('cloth', geo.cyl(0.012, 0.012, 0.006, 8), {
      p: [0, 0.202, 0], color: C.helmet
    });
    B.head.add('gear', geo.rbox(0.046, 0.03, 0.006, 0.005, 1), {
      p: [0, 0.15, -0.123], r: [0.18, 0, 0], color: C.gearAlt
    });
  }

  // ---------------------------------------------------------------------------
  // Carbine (points -Z). Held across the chest.
  // ---------------------------------------------------------------------------
  const rifle = new THREE.Group();
  rifle.name = 'rifle';
  rifle.position.set(0.02, 0.09, -0.12);
  rifle.rotation.set(0.02, 0.03, -0.04);
  chest.add(rifle);
  const B_rifle = builder(rifle, 'rifle', 1.33, { receiveShadow: false });
  B.rifle = B_rifle;

  // Upper / lower receiver
  B_rifle.add('metal', geo.rbox(0.056, 0.072, 0.30, 0.009, 1), {
    p: [0, 0.018, -0.005], color: C.metal
  });
  B_rifle.add('metal', geo.rbox(0.052, 0.056, 0.20, 0.008, 1), {
    p: [0, -0.031, 0.052], color: C.metal
  });
  B_rifle.add('metal', geo.rbox(0.06, 0.078, 0.095, 0.008, 1), {
    p: [0, -0.066, 0.012], r: [0.12, 0, 0], color: C.metal
  });
  // Ejection port + bolt + controls
  B_rifle.add('polymer', geo.box(0.004, 0.022, 0.055), {
    p: [0.029, 0.03, -0.012], color: C.black
  });
  B_rifle.add('metal', geo.box(0.008, 0.016, 0.03), {
    p: [0.032, 0.046, 0.005], color: C.dark
  });
  B_rifle.add('metal', geo.cyl(0.007, 0.007, 0.026, 6), {
    p: [-0.031, 0.0, 0.04], r: [0, 0, Math.PI / 2], color: C.dark
  });
  B_rifle.add('metal', geo.box(0.008, 0.008, 0.024), {
    p: [-0.032, -0.02, 0.02], color: C.dark
  });
  B_rifle.add('metal', geo.rbox(0.024, 0.009, 0.022, 0.003, 1), {
    p: [0, 0.052, 0.128], color: C.dark
  });

  // Top rail + teeth
  B_rifle.add('metal', geo.box(0.052, 0.012, 0.63), {
    p: [0, 0.064, -0.13], color: C.metal
  });
  for (let i = 0; i < 13; i++) {
    B_rifle.add('metal', geo.box(0.055, 0.008, 0.012), {
      p: [0, 0.0745, -0.432 + i * 0.04], color: C.metal
    });
  }
  // Handguard
  B_rifle.add('polymer', geo.rbox(0.062, 0.064, 0.325, 0.02, 1), {
    p: [0, 0.02, -0.317], color: C.polymer
  });
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      B_rifle.add('polymer', geo.box(0.005, 0.03, 0.046), {
        p: [sx * 0.0325, 0.02, -0.225 - i * 0.083], color: C.black
      });
    }
  }
  B_rifle.add('polymer', geo.rbox(0.03, 0.02, 0.06, 0.006, 1), {
    p: [0, -0.015, -0.44], color: C.black
  });
  // Barrel + gas block
  B_rifle.add('metal', geo.cyl(0.011, 0.011, 0.13, 8), {
    p: [0, 0.02, -0.518], r: [Math.PI / 2, 0, 0], color: C.metal
  });
  B_rifle.add('metal', geo.rbox(0.034, 0.038, 0.046, 0.006, 1), {
    p: [0, 0.043, -0.438], color: C.dark
  });
  // Suppressor or brake
  if (hasSuppressor) {
    B_rifle.add('metal', geo.cyl(0.026, 0.026, 0.145, 10), {
      p: [0, 0.02, -0.646], r: [Math.PI / 2, 0, 0], color: C.dark
    });
    B_rifle.add('metal', geo.cyl(0.028, 0.028, 0.012, 10), {
      p: [0, 0.02, -0.716], r: [Math.PI / 2, 0, 0], color: C.black
    });
    for (let i = 0; i < 2; i++) {
      B_rifle.add('metal', geo.torus(0.0265, 0.0022, 3, 10), {
        p: [0, 0.02, -0.618 - i * 0.05], r: [Math.PI / 2, 0, 0], color: C.black
      });
    }
    B_rifle.add('metal', geo.cyl(0.009, 0.009, 0.012, 6), {
      p: [0, 0.058, -0.61], color: C.dark
    });
  } else {
    B_rifle.add('metal', geo.cyl(0.019, 0.021, 0.075, 8), {
      p: [0, 0.02, -0.61], r: [Math.PI / 2, 0, 0], color: C.dark
    });
    for (let i = 0; i < 3; i++) {
      B_rifle.add('metal', geo.box(0.044, 0.01, 0.012), {
        p: [0, 0.02, -0.59 - i * 0.022], color: C.black
      });
    }
  }

  // Optic
  B_rifle.add('metal', geo.rbox(0.05, 0.022, 0.075, 0.006, 1), {
    p: [0, 0.083, -0.045], color: C.dark
  });
  B_rifle.add('metal', geo.rbox(0.054, 0.052, 0.135, 0.016, 1), {
    p: [0, 0.112, -0.045], color: C.black
  });
  B_rifle.add('metal', geo.cyl(0.028, 0.026, 0.04, 10), {
    p: [0, 0.112, -0.13], r: [Math.PI / 2, 0, 0], color: C.black
  });
  B_rifle.add('metal', geo.cyl(0.024, 0.024, 0.03, 10), {
    p: [0, 0.112, 0.03], r: [Math.PI / 2, 0, 0], color: C.black
  });
  B_rifle.add('glass', geo.cyl(0.0225, 0.0225, 0.004, 10), {
    p: [0, 0.112, 0.047], r: [Math.PI / 2, 0, 0], color: col('#6e9c86')
  });
  // Illuminated reticle
  B_rifle.add('reticle', geo.torus(0.0085, 0.0011, 3, 10), {
    p: [0, 0.112, 0.0495], color: C.red
  });
  B_rifle.add('reticle', geo.sph(0.0018, 5, 4), {
    p: [0, 0.112, 0.0498], color: C.red
  });
  B_rifle.add('metal', geo.cyl(0.011, 0.011, 0.016, 6), {
    p: [0, 0.145, -0.045], color: C.dark
  });
  B_rifle.add('metal', geo.cyl(0.01, 0.01, 0.014, 6), {
    p: [0.034, 0.112, -0.045], r: [0, 0, Math.PI / 2], color: C.dark
  });
  B_rifle.add('metal', geo.rbox(0.058, 0.016, 0.018, 0.004, 1), {
    p: [0, 0.083, -0.095], color: C.metal
  });
  // PEQ box + laser lens
  B_rifle.add('polymer', geo.rbox(0.044, 0.027, 0.062, 0.008, 1), {
    p: [0, 0.087, -0.302], color: C.black
  });
  B_rifle.add('glow', geo.cyl(0.009, 0.009, 0.006, 8), {
    p: [0, 0.087, -0.336], r: [Math.PI / 2, 0, 0], color: C.greenGlow
  });
  B_rifle.add('metal', geo.cyl(0.006, 0.006, 0.008, 6), {
    p: [0.014, 0.087, -0.336], r: [Math.PI / 2, 0, 0], color: C.dark
  });

  // Stock
  B_rifle.add('metal', geo.cyl(0.016, 0.016, 0.17, 8), {
    p: [0, 0.018, 0.225], r: [Math.PI / 2, 0, 0], color: C.metal
  });
  B_rifle.add('polymer', geo.rbox(0.05, 0.108, 0.135, 0.018, 1), {
    p: [0, -0.004, 0.303], color: variant === 0 || variant === 3 ? C.accent : C.polymer
  });
  B_rifle.add('polymer', geo.rbox(0.042, 0.023, 0.105, 0.008, 1), {
    p: [0, 0.059, 0.303], color: C.polymer
  });
  B_rifle.add('rubber', geo.rbox(0.053, 0.112, 0.02, 0.008, 1), {
    p: [0, -0.004, 0.379], color: C.rubber
  });
  B_rifle.add('metal', geo.box(0.012, 0.026, 0.02), {
    p: [0.029, -0.055, 0.285], color: C.dark
  });
  B_rifle.add('metal', geo.torus(0.009, 0.0025, 3, 8), {
    p: [0.03, 0.005, 0.245], r: [0, Math.PI / 2, 0], color: C.metal
  });

  // Pistol grip / trigger / magazine
  B_rifle.add('polymer', geo.rbox(0.035, 0.112, 0.052, 0.011, 1), {
    p: [0, -0.137, 0.071], r: [-0.26, 0, 0], color: C.black
  });
  for (let i = 0; i < 3; i++) {
    B_rifle.add('polymer', geo.box(0.036, 0.006, 0.03), {
      p: [0, -0.105 - i * 0.028, 0.079 + i * 0.007], r: [-0.26, 0, 0], color: C.dark
    });
  }
  B_rifle.add('metal', geo.torus(0.03, 0.0042, 3, 10), {
    p: [0, -0.047, 0.02], r: [0, Math.PI / 2, 0], color: C.metal
  });
  B_rifle.add('metal', geo.box(0.009, 0.032, 0.009), {
    p: [0, -0.05, 0.023], r: [0.18, 0, 0], color: C.dark
  });
  B_rifle.add('polymer', geo.rbox(0.035, 0.10, 0.062, 0.009, 1), {
    p: [0, -0.155, 0.038], r: [0.22, 0, 0], color: C.black
  });
  B_rifle.add('polymer', geo.rbox(0.035, 0.075, 0.058, 0.009, 1), {
    p: [0, -0.224, 0.004], r: [0.42, 0, 0], color: C.black
  });
  B_rifle.add('polymer', geo.rbox(0.044, 0.016, 0.07, 0.005, 1), {
    p: [0, -0.266, -0.008], r: [0.25, 0, 0], color: C.dark
  });
  for (let i = 0; i < 3; i++) {
    B_rifle.add('polymer', geo.box(0.002, 0.008, 0.012), {
      p: [0.018, -0.135 - i * 0.03, 0.045], color: C.dark
    });
  }
  // Vertical foregrip
  B_rifle.add('polymer', geo.cyl(0.016, 0.015, 0.11, 8), {
    p: [0, -0.088, -0.305], r: [0.04, 0, 0], color: C.black
  });
  B_rifle.add('polymer', geo.rbox(0.038, 0.018, 0.045, 0.007, 1), {
    p: [0, -0.145, -0.305], color: C.dark
  });
  for (let i = 0; i < 3; i++) {
    B_rifle.add('polymer', geo.torus(0.0165, 0.002, 3, 8), {
      p: [0, -0.05 - i * 0.025, -0.305], r: [Math.PI / 2, 0, 0], color: C.black
    });
  }

  // Sling
  B_rifle.add('cloth', geo.tube([
    [0.032, 0.004, 0.382], [0.052, -0.09, 0.30], [0.025, -0.185, 0.135],
    [-0.085, -0.215, -0.045], [-0.112, -0.13, -0.27], [-0.025, 0.012, -0.402]
  ], 0.0055, 18, 4), { color: C.sling, camo: true, camoAmount: 0.18 });
  B_rifle.add('metal', geo.rbox(0.02, 0.026, 0.012, 0.004, 1), {
    p: [-0.112, -0.13, -0.27], color: C.metal
  });

  // Grip anchors used to pose the hands.
  const pistolGripMarker = new THREE.Object3D();
  pistolGripMarker.position.set(0, -0.12, 0.075);
  rifle.add(pistolGripMarker);
  const foregripMarker = new THREE.Object3D();
  foregripMarker.position.set(0, -0.088, -0.305);
  rifle.add(foregripMarker);

  const muzzle = new THREE.Object3D();
  muzzle.name = 'muzzle';
  muzzle.position.set(0, 0.02, hasSuppressor ? -0.735 : -0.665);
  rifle.add(muzzle);

  // ---------------------------------------------------------------------------
  // Arms — posed onto the rifle grips using a two-bone analytic bind pose
  // ---------------------------------------------------------------------------
  group.updateMatrixWorld(true);
  const chestInv = chest.matrixWorld.clone().invert();
  const chestQInv = chest.getWorldQuaternion(new THREE.Quaternion()).invert();
  const rifleQ = rifle.getWorldQuaternion(new THREE.Quaternion());
  const pistolQ = rifleQ.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.26, 0, 0)));
  const foreQ = rifleQ.clone();

  const toChest = (v) => v.applyMatrix4(chestInv);
  const pistolW = pistolGripMarker.getWorldPosition(new THREE.Vector3());
  const foreW = foregripMarker.getWorldPosition(new THREE.Vector3());
  const wristRW = pistolW.clone().add(new THREE.Vector3(0, 0.058, 0).applyQuaternion(pistolQ));
  const wristLW = foreW.clone().add(new THREE.Vector3(0, 0.058, 0).applyQuaternion(foreQ));

  const shoulderLW = shoulderL.getWorldPosition(new THREE.Vector3());
  const shoulderRW = shoulderR.getWorldPosition(new THREE.Vector3());
  const elbowLW = toChest(V3(-0.18, 1.29, -0.20));
  const elbowRW = toChest(V3(0.27, 1.20, 0.03));
  const shoulderLC = toChest(shoulderLW.clone());
  const shoulderRC = toChest(shoulderRW.clone());
  const wristLC = toChest(wristLW.clone());
  const wristRC = toChest(wristRW.clone());
  const qHandL = chestQInv.clone().multiply(foreQ);
  const qHandR = chestQInv.clone().multiply(pistolQ);

  const armDims = {};
  function poseArm(isL) {
    const shoulder = isL ? shoulderL : shoulderR;
    const elbow = isL ? elbowL : elbowR;
    const hand = isL ? handL : handR;
    const sh = isL ? shoulderLC : shoulderRC;
    const el = isL ? elbowLW : elbowRW;
    const wr = isL ? wristLC : wristRC;
    const qHand = isL ? qHandL : qHandR;

    const d1 = el.clone().sub(sh);
    const L1 = d1.length();
    d1.normalize();
    const d2 = wr.clone().sub(el);
    const L2 = d2.length();
    d2.normalize();

    const q1 = new THREE.Quaternion().setFromUnitVectors(DOWN, d1);
    const q2w = new THREE.Quaternion().setFromUnitVectors(DOWN, d2);
    const q2 = q1.clone().invert().multiply(q2w);
    shoulder.quaternion.copy(q1);
    elbow.position.set(0, -L1, 0);
    elbow.quaternion.copy(q2);
    hand.position.set(0, -L2, 0);
    const qParent = q1.clone().multiply(q2);
    hand.quaternion.copy(qParent.invert().multiply(qHand));

    if (isL) armDims.L1L = L1; else armDims.L1R = L1;
    if (isL) armDims.L2L = L2; else armDims.L2R = L2;
    return { L1, L2, sx: isL ? -1 : 1 };
  }
  const dimL = poseArm(true);
  const dimR = poseArm(false);

  const B_armL_up = builder(shoulderL, 'armL.upper', 1.44);
  const B_armL_el = builder(elbowL, 'armL.fore', 1.26);
  const B_armL_hd = builder(handL, 'armL.hand', 1.24);
  const B_armR_up = builder(shoulderR, 'armR.upper', 1.44);
  const B_armR_el = builder(elbowR, 'armR.fore', 1.26);
  const B_armR_hd = builder(handR, 'armR.hand', 1.24);

  function buildArm(isL) {
    const up = isL ? B_armL_up : B_armR_up;
    const el = isL ? B_armL_el : B_armR_el;
    const hd = isL ? B_armL_hd : B_armR_hd;
    const dims = isL ? dimL : dimR;
    const sx = dims.sx;
    const L1 = dims.L1;
    const L2 = dims.L2;

    // Upper arm sleeve + deltoid shoulder pad
    up.add('cloth', geo.cap(0.052, Math.max(0.08, L1 - 0.106), 3, 8), {
      p: [0, -L1 * 0.5, 0], s: [1, 1, 0.96], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.08
    });
    up.add('cloth', geo.sph(0.061, 10, 7), {
      p: [0, -0.012, 0], s: [1.08, 0.84, 0.98], color: C.cloth, color2: C.clothAlt, camo: true
    });
    up.add('gear', geo.rbox(0.096, 0.052, 0.10, 0.02, 1), {
      p: [0, -0.043, 0], r: [0, 0, sx * -0.05], color: C.gear, color2: C.gearAlt, camo: true, camoAmount: 0.2
    });
    for (const y of [-0.105, -0.19, -0.275]) {
      if (y > -L1 + 0.03) {
        up.add('cloth', geo.torus(0.056, 0.006, 4, 10), {
          p: [0, y, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.96], color: C.clothAlt, camo: true
        });
      }
    }
    // Shoulder patch
    up.add('cloth', geo.box(0.007, 0.064, 0.05), {
      p: [sx * 0.056, -0.13, -0.004], color: C.gearAlt
    });
    up.add('cloth', geo.rbox(0.006, 0.052, 0.039, 0.003, 1), {
      p: [sx * 0.0605, -0.13, -0.004], color: C.patch, grain: 0.02
    });
    up.add('cloth', geo.box(0.004, 0.018, 0.007), {
      p: [sx * 0.0645, -0.126, -0.004], r: [0, 0, 0.6], color: C.white, grain: 0.01
    });
    up.add('cloth', geo.box(0.004, 0.014, 0.006), {
      p: [sx * 0.0645, -0.137, 0.004], r: [0, 0, -0.4], color: C.white, grain: 0.01
    });

    // Elbow pad + rolled sleeve cuff
    el.add('gear', geo.rbox(0.102, 0.09, 0.045, 0.02, 1), {
      p: [0, 0.005, 0.043], r: [0.22, 0, 0], color: C.dark
    });
    el.add('webbing', geo.cyl(0.058, 0.058, 0.016, 10, true), {
      p: [0, -0.045, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.98], color: C.webbing
    });
    el.add('cloth', geo.cyl(0.055, 0.058, 0.075, 10), {
      p: [0, -0.035, 0], color: C.cloth, color2: C.clothAlt, camo: true, dirt: 0.12
    });
    el.add('cloth', geo.torus(0.056, 0.008, 4, 12), {
      p: [0, -0.075, 0], r: [Math.PI / 2, 0, 0], color: C.clothAlt, camo: true
    });
    // Exposed forearm
    el.add('skin', geo.limb([0, -0.05, 0], [0, -L2 + 0.004, 0], 0.041, 8, 3), {
      color: C.skin, grain: 0.03
    });
    // Watch (left wrist only)
    if (isL) {
      el.add('gear', geo.torus(0.045, 0.0075, 4, 10), {
        p: [0, -L2 + 0.028, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 0.95], color: C.dark
      });
      el.add('gear', geo.box(0.008, 0.03, 0.024), {
        p: [sx * 0.047, -L2 + 0.028, 0], color: C.metal
      });
      el.add('glow', geo.box(0.002, 0.012, 0.008), {
        p: [sx * 0.052, -L2 + 0.028, 0], color: col('#7dffb2')
      });
    }

    // Gloved fist wrapped around the grip axis
    hd.add('glove', geo.cyl(0.045, 0.043, 0.058, 9), {
      p: [0, 0.012, 0], color: C.glove
    });
    hd.add('glove', geo.torus(0.046, 0.007, 3, 8), {
      p: [0, 0.044, 0], r: [Math.PI / 2, 0, 0], color: C.dark
    });
    hd.add('glove', geo.rbox(0.034, 0.086, 0.078, 0.016, 1), {
      p: [sx * 0.041, -0.053, 0], r: [0, 0, sx * 0.04], color: C.glove, grain: 0.03
    });
    hd.add('glove', geo.sph(0.03, 8, 6), {
      p: [sx * 0.033, -0.023, 0.026], s: [1.0, 1.25, 0.9], color: C.glove
    });
    // four curled fingers
    for (let i = 0; i < 4; i++) {
      const y = -0.017 - i * 0.0225;
      const r = i === 3 ? 0.0075 : 0.0082;
      const x0 = sx * (i === 3 ? 0.029 : 0.033);
      const a = [x0, y, -0.029];
      const b = [sx * 0.004, y, -0.050];
      const c = [-sx * 0.022, y, -0.032];
      const d = [-sx * 0.016, y, -0.003];
      hd.add('glove', geo.limb(a, b, r, 5, 1), { color: C.glove, grain: 0.025 });
      hd.add('glove', geo.limb(b, c, r * 0.95, 5, 1), { color: C.glove, grain: 0.025 });
      hd.add('glove', geo.limb(c, d, r * 0.9, 5, 1), { color: C.glove, grain: 0.025 });
    }
    // thumb
    hd.add('glove', geo.limb([sx * 0.039, -0.018, 0.024], [sx * 0.013, -0.034, 0.045], 0.0095, 5, 1), {
      color: C.glove
    });
    hd.add('glove', geo.limb([sx * 0.013, -0.034, 0.045], [-sx * 0.007, -0.049, 0.031], 0.009, 5, 1), {
      color: C.glove
    });
    // knuckle / back-of-hand pads
    for (let i = 0; i < 3; i++) {
      hd.add('glove', geo.box(0.012, 0.016, 0.034), {
        p: [sx * 0.058, -0.037 - i * 0.023, -0.008], r: [0, 0, sx * 0.04], color: C.dark
      });
    }
  }
  buildArm(true);
  buildArm(false);

  // ---------------------------------------------------------------------------
  // Finalise merged meshes
  // ---------------------------------------------------------------------------
  for (const b of builders) b.finish();

  // ---------------------------------------------------------------------------
  // Invisible hitscan volumes, rigidly parented to the animated bones
  // ---------------------------------------------------------------------------
  const hitMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2244, visible: false, depthWrite: false, depthTest: false, side: THREE.DoubleSide
  });
  hitMaterial.name = 'soldier.hitbox';
  createdMaterials.push(hitMaterial);
  const hitboxes = [];
  function hitbox(parent, part, w, h, d, x, y, z, name) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), hitMaterial);
    mesh.name = 'hitbox.' + name;
    mesh.position.set(x, y, z);
    mesh.visible = true;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.userData.hitbox = true;
    mesh.userData.part = part;
    parent.add(mesh);
    hitboxes.push({ mesh, part });
    return mesh;
  }
  hitbox(head, 'head', 0.21, 0.23, 0.22, 0, 0.06, 0, 'head');
  hitbox(chest, 'body', 0.42, 0.50, 0.32, 0, -0.03, 0, 'torso');
  hitbox(hips, 'body', 0.33, 0.20, 0.26, 0, 0.0, 0, 'pelvis');
  hitbox(shoulderL, 'limb', 0.13, Math.max(0.1, dimL.L1 - 0.02), 0.14, 0, -dimL.L1 * 0.5, 0, 'upperArmL');
  hitbox(shoulderR, 'limb', 0.13, Math.max(0.1, dimR.L1 - 0.02), 0.14, 0, -dimR.L1 * 0.5, 0, 'upperArmR');
  hitbox(elbowL, 'limb', 0.11, Math.max(0.1, dimL.L2 - 0.02), 0.12, 0, -dimL.L2 * 0.5, 0, 'forearmL');
  hitbox(elbowR, 'limb', 0.11, Math.max(0.1, dimR.L2 - 0.02), 0.12, 0, -dimR.L2 * 0.5, 0, 'forearmR');
  hitbox(hipL, 'limb', 0.17, 0.42, 0.19, 0, -0.215, 0, 'thighL');
  hitbox(hipR, 'limb', 0.17, 0.42, 0.19, 0, -0.215, 0, 'thighR');
  hitbox(kneeL, 'limb', 0.145, 0.36, 0.17, 0, -0.19, 0, 'shinL');
  hitbox(kneeR, 'limb', 0.145, 0.36, 0.17, 0, -0.19, 0, 'shinR');

  const nvgGlow = allMeshes.find((m) => m.name === 'head:glow') || null;

  group.updateMatrixWorld(true);
  for (const hb of hitboxes) hb.mesh.updateMatrixWorld(true);

  const refs = {
    hips, spine, chest, neck, head,
    shoulderL, elbowL, shoulderR, elbowR,
    hipL, kneeL, hipR, kneeR,
    handL, handR,
    rifle, muzzle, nvgGlow
  };

  // ---------------------------------------------------------------------------
  // Disposal — every geometry/material created here belongs to this soldier.
  // ---------------------------------------------------------------------------
  function dispose() {
    const geoSet = new Set();
    const matSet = new Set(createdMaterials);
    group.traverse((o) => {
      if (o.isMesh) {
        if (o.geometry) geoSet.add(o.geometry);
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => matSet.add(m));
          else matSet.add(o.material);
        }
      }
    });
    geoSet.forEach((g) => g.dispose());
    matSet.forEach((m) => m.dispose());
    if (group.parent) group.parent.remove(group);
  }

  return { group, refs, hitboxes, muzzle, dispose };
}

// Deterministic PRNG so builds remain reproducible when no rng is supplied.
function mulberry32(seed) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
