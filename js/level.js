import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/* ------------------------------------------------------------------ *
 *  BLACKSITE ZERO — forward operating base "Anvil", dusk.
 *  A hand-composed, fully procedural level: modular concrete, shipping
 *  containers, fuel depot, watchtower, practical lights and atmosphere.
 * ------------------------------------------------------------------ */

const V = (x, y, z) => new THREE.Vector3(x, y, z)
const rand = (() => {
  let s = 90210
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
})()

function stencilTexture(lines, opts = {}) {
  const w = opts.w || 512, h = opts.h || 256
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  if (opts.bg) {
    ctx.fillStyle = opts.bg
    ctx.fillRect(0, 0, w, h)
  }
  ctx.fillStyle = opts.color || 'rgba(226,220,202,0.92)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const size = opts.size || 54
  const font = opts.font || `700 ${size}px "Arial Narrow", Arial, sans-serif`
  ctx.font = font
  if (opts.letterSpacing) ctx.letterSpacing = opts.letterSpacing
  const total = lines.length
  lines.forEach((line, i) => {
    ctx.globalAlpha = opts.fade ? 0.4 + 0.6 * (1 - i / total) : 1
    ctx.fillText(line, w / 2, h / 2 + (i - (total - 1) / 2) * size * 1.25)
  })
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function signMat(texture, opts = {}) {
  return new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    roughness: 0.85,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    depthWrite: false,
    ...opts
  })
}

function skyDome() {
  const geo = new THREE.SphereGeometry(600, 48, 24)
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      sunDir: { value: V(-0.58, 0.50, 0.64).normalize() },
      time: { value: 0 },
      topColor: { value: new THREE.Color(0x18283f) },
      midColor: { value: new THREE.Color(0x6b6b7a) },
      horizonColor: { value: new THREE.Color(0xe39a63) },
      sunColor: { value: new THREE.Color(0xffd2a1) },
      groundColor: { value: new THREE.Color(0x3b3129) }
    },
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vDir;
      uniform vec3 sunDir, topColor, midColor, horizonColor, sunColor, groundColor;
      uniform float time;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
                   mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -1.0, 1.0);
        vec3 sky = mix(horizonColor, midColor, smoothstep(0.0, 0.28, h));
        sky = mix(sky, topColor, smoothstep(0.22, 0.85, h));
        sky = mix(groundColor, sky, smoothstep(-0.09, 0.015, h));
        float sd = max(dot(d, sunDir), 0.0);
        sky += sunColor * pow(sd, 900.0) * 3.2;
        sky += sunColor * pow(sd, 14.0) * 0.20;
        sky += sunColor * pow(sd, 3.0) * 0.05;
        // stratocumulus deck, lit from below by the low sun
        if (h > 0.01) {
          vec2 uv = d.xz / (h + 0.12) * 1.35;
          float c = fbm(uv * 1.15 + vec2(time * 0.004, 0.0));
          float c2 = fbm(uv * 2.9 - vec2(time * 0.006, 0.02));
          float cover = smoothstep(0.54, 0.84, c * 0.8 + c2 * 0.35);
          cover *= smoothstep(0.02, 0.25, h) * smoothstep(0.95, 0.3, h);
          vec3 cloud = mix(vec3(0.20,0.18,0.20), vec3(1.0,0.62,0.42), 0.55 + 0.45 * pow(sd, 2.0));
          cloud = mix(cloud, vec3(0.9,0.55,0.42), smoothstep(0.55,0.95,c2) * 0.4);
          sky = mix(sky, cloud, cover * 0.58);
        }
        // warm haze band
        sky += vec3(0.35, 0.16, 0.05) * exp(-abs(h) * 22.0) * 0.35;
        gl_FragColor = vec4(sky, 1.0);
      }
    `
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.frustumCulled = false
  mesh.renderOrder = -1000
  return mesh
}

function equirectEnv(renderer) {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 512
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, '#1a2b45')
  g.addColorStop(0.35, '#67677a')
  g.addColorStop(0.49, '#f0a56e')
  g.addColorStop(0.53, '#7b5d48')
  g.addColorStop(0.7, '#2e2a25')
  g.addColorStop(1, '#191714')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1024, 512)
  const sun = ctx.createRadialGradient(220, 245, 2, 220, 245, 150)
  sun.addColorStop(0, 'rgba(255,244,220,1)')
  sun.addColorStop(0.06, 'rgba(255,210,150,0.85)')
  sun.addColorStop(0.35, 'rgba(255,150,80,0.22)')
  sun.addColorStop(1, 'rgba(255,150,80,0)')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, 1024, 512)
  // cloud bands
  for (let i = 0; i < 70; i++) {
    const y = 70 + rand() * 210
    const x = rand() * 1024
    const w = 60 + rand() * 220
    const h = 8 + rand() * 30
    const grad = ctx.createRadialGradient(x, y, 1, x, y, w)
    grad.addColorStop(0, `rgba(${180 + rand() * 50},${140 + rand() * 40},${125 + rand() * 30},${0.05 + rand() * 0.14})`)
    grad.addColorStop(1, 'rgba(120,100,95,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(x, y, w, h, 0, 0, 6.28)
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromEquirectangular(tex).texture
  tex.dispose()
  pmrem.dispose()
  return env
}

function makeConeBeam(color = 0xffd9a0, opacity = 0.10) {
  const geo = new THREE.ConeGeometry(1, 1, 32, 1, true)
  geo.translate(0, -0.5, 0)
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { color: { value: new THREE.Color(color) }, opacity: { value: opacity }, time: { value: 0 } },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vView;
      uniform vec3 color;
      uniform float opacity, time;
      void main() {
        float edge = pow(abs(dot(normalize(vNormal), normalize(vView))), 1.4);
        float fade = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
        float flicker = 0.86 + 0.14 * sin(time * 7.0 + vUv.y * 4.0);
        gl_FragColor = vec4(color, edge * fade * opacity * flicker);
      }
    `
  })
  return new THREE.Mesh(geo, mat)
}

export function buildLevel(scene, renderer, tex) {
  const root = new THREE.Group()
  root.name = 'level'
  scene.add(root)
  const colliders = []
  const solidMeshes = []
  const animated = { beams: [], flickers: [], spinners: [], flags: [] }
  const spawnPoints = []
  const coverPoints = []

  const env = equirectEnv(renderer)
  scene.environment = env
  scene.environmentIntensity = 0.98

  const sky = skyDome()
  scene.add(sky)

  scene.fog = new THREE.FogExp2(0x8f8479, 0.0056)
  scene.background = new THREE.Color(0x91857a)

  const sunDir = V(-0.58, 0.50, 0.64).normalize()

  /* ------------------------- lighting ------------------------- */
  const hemi = new THREE.HemisphereLight(0xa7c1df, 0x5a4a38, 1.95)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(0xffc089, 3.2)
  sun.position.copy(sunDir).multiplyScalar(60)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -46
  sun.shadow.camera.right = 46
  sun.shadow.camera.top = 46
  sun.shadow.camera.bottom = -46
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 140
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.035
  sun.target.position.set(0, 0, -8)
  scene.add(sun, sun.target)
  const fill = new THREE.DirectionalLight(0x7b9bd0, 1.35)
  fill.position.set(30, 18, 30)
  scene.add(fill)
  const bounce = new THREE.DirectionalLight(0xffc79a, 0.6)
  bounce.position.set(-18, 9, 28)
  bounce.target.position.set(-2, 0, 4)
  scene.add(bounce, bounce.target)
  scene.add(new THREE.AmbientLight(0x516172, 0.38))

  /* ------------------------- materials ------------------------- */
  const M = {}
  const std = (name, set, repeat, props = {}) => {
    const t = tex.rel(set, repeat)
    M[name] = new THREE.MeshStandardMaterial({
      map: t.map,
      normalMap: t.normalMap,
      normalScale: new THREE.Vector2(1, 1),
      roughness: 0.88,
      metalness: 0.02,
      envMapIntensity: 0.7,
      ...props
    })
  }
  std('asphalt', tex.asphalt, 24, { color: 0xa39a8d, roughness: 0.95 })
  M.asphalt.normalScale.set(0.72, 0.72)
  std('ground', tex.asphalt, 11, { color: 0x9a9184, roughness: 0.98 })
  M.ground.normalScale.set(0.55, 0.55)
  std('concrete', tex.concrete, 2, { color: 0xcbc2b2, roughness: 0.9 })
  std('concreteWide', tex.concrete, 8, { color: 0xb8afa0, roughness: 0.92 })
  std('concreteDark', tex.concreteDark, 2, { color: 0xb2a99b, roughness: 0.95 })
  std('metal', tex.metal, 2, { color: 0x9a9c9d, roughness: 0.42, metalness: 0.75, envMapIntensity: 1.1 })
  std('metalDark', tex.metalDark, 2, { color: 0x8e9296, roughness: 0.38, metalness: 0.8, envMapIntensity: 1.15 })
  std('containerTeal', tex.containerTeal, 1, { color: 0xb4c4bd, roughness: 0.62, metalness: 0.35, envMapIntensity: 0.9 })
  std('containerRust', tex.containerRust, 1, { color: 0xc8b6a8, roughness: 0.7, metalness: 0.3 })
  std('containerOlive', tex.containerOlive, 1, { color: 0xb5b8a2, roughness: 0.66, metalness: 0.32 })
  std('sandbag', tex.sandbag, 1.4, { color: 0xb0a185, roughness: 0.98 })
  std('wood', tex.wood, 1, { color: 0xb8a27c, roughness: 0.9 })
  std('hazard', tex.hazard, 1, { color: 0xd8c9a0, roughness: 0.7, metalness: 0.2 })
  std('fabric', tex.fabric, 3, { color: 0x9a9c8d, roughness: 0.98 })

  const glass = new THREE.MeshStandardMaterial({
    color: 0x0b1116, roughness: 0.13, metalness: 0.65, envMapIntensity: 1.5,
    emissive: 0x16232b, emissiveIntensity: 0.35
  })
  const warmGlass = new THREE.MeshStandardMaterial({
    color: 0x120d08, roughness: 0.2, metalness: 0.3,
    emissive: 0xff9b46, emissiveIntensity: 0.55
  })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.92 })
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x2b2d2d, roughness: 0.62, metalness: 0.6 })

  const add = (mesh, opts = {}) => {
    mesh.castShadow = opts.cast !== false
    mesh.receiveShadow = opts.receive !== false
    root.add(mesh)
    if (opts.solid) solidMeshes.push(mesh)
    return mesh
  }
  const box = (w, h, d, mat, x, y, z, opts = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    if (opts.ry) m.rotation.y = opts.ry
    add(m, opts)
    if (opts.collide) colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, h })
    return m
  }
  const cyl = (rt, rb, h, mat, x, y, z, seg = 20, opts = {}) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)
    m.position.set(x, y, z)
    if (opts.rx) m.rotation.x = opts.rx
    if (opts.rz) m.rotation.z = opts.rz
    if (opts.ry) m.rotation.y = opts.ry
    add(m, opts)
    if (opts.collide) colliders.push({ minX: x - rt, maxX: x + rt, minZ: z - rt, maxZ: z + rt, h })
    return m
  }
  const addCollider = (x, z, w, d) => colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, h: 8 })
  const decal = (texture, w, h, x, y, z, ry = 0, opts = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), signMat(texture, opts))
    m.position.set(x, y, z)
    m.rotation.y = ry
    m.renderOrder = 2
    root.add(m)
    return m
  }

  /* --------------------------- ground --------------------------- */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 240, 1, 1), M.ground)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  root.add(ground)
  solidMeshes.push(ground)

  // concrete apron under the compound
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(76, 78), M.concreteWide)
  apron.rotation.x = -Math.PI / 2
  apron.position.set(-2, 0.012, -12)
  apron.receiveShadow = true
  root.add(apron)
  solidMeshes.push(apron)

  // access road
  const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 92), M.asphalt)
  road.rotation.x = -Math.PI / 2
  road.position.set(25, 0.018, 8)
  road.receiveShadow = true
  root.add(road)
  const markTex = tex.roadMarkings.clone()
  markTex.repeat.set(1, 16)
  markTex.needsUpdate = true
  const markings = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 92), new THREE.MeshStandardMaterial({
    map: markTex, transparent: true, roughness: 0.9, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -2
  }))
  markings.rotation.x = -Math.PI / 2
  markings.position.set(25, 0.026, 8)
  root.add(markings)

  // painted courtyard markings, laid flat on the apron
  const court = stencilTexture(['H  A  R  D  S  T  A  N  D', 'BLACKSITE 07'], { w: 1024, h: 256, size: 80, color: 'rgba(205,196,165,0.30)' })
  const courtDecal = decal(court, 18, 4.5, -2, 0.032, 5, 0, { roughness: 0.95 })
  courtDecal.rotation.x = -Math.PI / 2

  // puddles
  const puddleMat = new THREE.MeshPhysicalMaterial({
    color: 0x111417, roughness: 0.06, metalness: 0.25, transparent: true, opacity: 0.82,
    envMapIntensity: 1.8, depthWrite: false
  })
  for (const [x, z, sx, sz] of [[-8, 9, 4.2, 1.6], [7, -3, 2.8, 1.2], [-18, -2, 3.4, 1.4], [17, 7, 2.6, 1.1], [1, -29, 3.8, 1.5]]) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(1, 28), puddleMat)
    p.rotation.x = -Math.PI / 2
    p.scale.set(sx, sz, 1)
    p.position.set(x, 0.022, z)
    root.add(p)
  }

  // scattered gravel and debris (instanced)
  {
    const geo = new THREE.DodecahedronGeometry(0.055, 0)
    const mat = new THREE.MeshStandardMaterial({ color: 0x716b60, roughness: 1 })
    const inst = new THREE.InstancedMesh(geo, mat, 700)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < 700; i++) {
      const x = (rand() - 0.5) * 96, z = (rand() - 0.5) * 86 - 6
      dummy.position.set(x, 0.02 + rand() * 0.02, z)
      dummy.rotation.set(rand() * 3, rand() * 3, rand() * 3)
      const s = 0.4 + rand() * 1.6
      dummy.scale.set(s, s * 0.6, s)
      dummy.updateMatrix()
      inst.setMatrixAt(i, dummy.matrix)
    }
    inst.castShadow = true
    inst.receiveShadow = true
    root.add(inst)
  }

  /* ----------------------- perimeter walls ---------------------- */
  const wallSegs = [
    [-40, 20, 4, 44, 0], [40, 6, 4, 70, 0],
    [-15, -44, 54, 4, 0], [24, 42, 36, 4, 0]
  ]
  for (const [x, z, w, d] of wallSegs) {
    const wall = box(w, 4.4, d, M.concreteWide, x, 2.2, z, { collide: true, solid: true })
    const cap = box(w + 0.4, 0.3, d + 0.4, M.concrete, x, 4.5, z, { solid: true })
    wall.userData.bullet = true
    // panel seams
    const len = Math.max(w, d)
    const axis = w > d ? 'x' : 'z'
    for (let i = -len / 2 + 4; i < len / 2; i += 4) {
      if (axis === 'x') box(0.08, 4.2, 0.1, M.concreteDark, x + i, 2.15, z + d / 2 + 0.01, { cast: false })
      else box(0.1, 4.2, 0.08, M.concreteDark, x + w / 2 + 0.01, 2.15, z + i, { cast: false })
    }
    cap.receiveShadow = true
  }
  // Hesco barriers along west edge
  for (let i = 0; i < 7; i++) {
    const z = -26 + i * 4.6
    const b = box(2.6, 1.5, 3.9, M.sandbag, -35.5, 0.75, z, { collide: true, solid: true })
    b.rotation.y = 0.05
    box(2.7, 0.18, 4, M.sandbag, -35.5, 1.55, z, { cast: true })
  }

  // chain-link fence sections on north side
  {
    const fenceMat = new THREE.MeshStandardMaterial({
      map: tex.chainlink, transparent: true, alphaTest: 0.18, side: THREE.DoubleSide,
      roughness: 0.55, metalness: 0.7, color: 0x9a9d9a
    })
    for (let x = -34; x < 30; x += 8) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.6), fenceMat)
      f.position.set(x, 1.5, -41.5)
      root.add(f)
      box(0.12, 3.2, 0.12, darkMetal, x - 4, 1.6, -41.5, { solid: true })
    }
    // concertina wire
    const points = []
    for (let i = 0; i <= 260; i++) {
      const t = i / 260
      const a = t * Math.PI * 38
      points.push(V(-34 + t * 64, 2.9 + Math.sin(a) * 0.32, -41.1 + Math.cos(a) * 0.32))
    }
    const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 300, 0.012, 4, false), darkMetal)
    wire.castShadow = true
    root.add(wire)
  }

  /* ---------------------- command building --------------------- */
  const B = { x: -8, z: -23, w: 20, d: 12, h: 9.4 }
  {
    const b = box(B.w, B.h, B.d, M.concrete, B.x, B.h / 2, B.z, { collide: true, solid: true })
    b.userData.bullet = true
    // foundation, trim bands, parapet
    box(B.w + 0.5, 0.6, B.d + 0.5, M.concreteDark, B.x, 0.3, B.z, { solid: true })
    box(B.w + 0.7, 0.28, B.d + 0.7, M.concrete, B.x, 4.9, B.z, { solid: true })
    box(B.w + 0.7, 0.5, B.d + 0.7, M.concrete, B.x, B.h + 0.05, B.z, { solid: true })
    // recessed facade panels
    for (let i = 0; i < 5; i++) {
      const px = B.x - 7.2 + i * 3.6
      box(3.1, 3.4, 0.16, M.concreteDark, px, 2.6, B.z + B.d / 2 + 0.06, { cast: false, solid: true })
      box(3.1, 3.0, 0.16, M.concreteDark, px, 7.1, B.z + B.d / 2 + 0.06, { cast: false, solid: true })
    }
    // windows (lower + upper)
    for (let i = 0; i < 4; i++) {
      const px = B.x - 5.4 + i * 3.9
      const w1 = box(1.7, 1.15, 0.1, i === 2 ? warmGlass : glass, px, 7.0, B.z + B.d / 2 + 0.14, { cast: false })
      box(1.95, 1.4, 0.16, darkMetal, px, 7.0, B.z + B.d / 2 + 0.08, { cast: false })
      w1.position.z += 0.05
      const w2 = box(1.5, 0.8, 0.1, glass, px + 0.4, 2.6, B.z + B.d / 2 + 0.14, { cast: false })
      w2.material = i === 1 ? warmGlass : glass
    }
    // blast door + frame + steps
    box(3.6, 4.1, 0.35, M.metalDark, B.x + 0.2, 2.05, B.z + B.d / 2 + 0.16, { solid: true })
    box(4.2, 4.5, 0.22, M.concreteDark, B.x + 0.2, 2.25, B.z + B.d / 2 + 0.04, { cast: false })
    box(3.7, 0.28, 0.7, M.concrete, B.x + 0.2, 0.14, B.z + B.d / 2 + 0.55, { solid: true })
    box(3.7, 0.22, 1.15, M.concrete, B.x + 0.2, 0.08, B.z + B.d / 2 + 1.05, { solid: true })
    const warm = new THREE.PointLight(0xffa45e, 20, 9, 2)
    warm.position.set(B.x + 0.2, 2.5, B.z + B.d / 2 + 0.7)
    root.add(warm)
    // warning stripes on door
    box(3.62, 0.22, 0.36, M.hazard, B.x + 0.2, 1.0, B.z + B.d / 2 + 0.2, { cast: false })
    // signage
    const sign = stencilTexture(['BLACKSITE 07', 'JOINT FORWARD OPERATING BASE'], { w: 1024, h: 256, size: 74, color: 'rgba(222,214,192,0.75)' })
    decal(sign, 7.8, 1.95, B.x, 5.55, B.z + B.d / 2 + 0.22)
    const doorSign = stencilTexture(['AUTHORIZED', 'PERSONNEL ONLY'], { w: 512, h: 256, size: 56, color: 'rgba(232,120,70,0.9)' })
    decal(doorSign, 1.8, 0.9, B.x + 0.2, 3.2, B.z + B.d / 2 + 0.36)
    // conduit + downpipes
    for (const px of [B.x - 9.4, B.x + 8.9]) {
      cyl(0.11, 0.11, B.h, M.metalDark, px, B.h / 2, B.z + B.d / 2 + 0.18, 12, { cast: false })
    }
    for (let i = 0; i < 3; i++) {
      const y = 1.4 + i * 3.1
      box(B.w - 0.8, 0.12, 0.14, M.metalDark, B.x, y, B.z + B.d / 2 + 0.24, { cast: false })
    }
    // rooftop clutter
    for (let i = 0; i < 3; i++) {
      const ax = B.x - 6 + i * 6
      box(2.0, 1.1, 1.4, M.metal, ax, B.h + 0.6, B.z - 2.4, { solid: true })
      box(1.6, 0.08, 1.1, darkMetal, ax, B.h + 1.18, B.z - 2.4, { cast: false })
      for (let j = 0; j < 4; j++) box(0.06, 0.9, 1.0, darkMetal, ax - 0.75 + j * 0.5, B.h + 0.6, B.z - 2.4, { cast: false })
    }
    // railing
    for (let i = 0; i < 24; i++) {
      const px = B.x - 9.6 + i * 0.84
      box(0.055, 1.1, 0.055, darkMetal, px, B.h + 0.55, B.z + B.d / 2 - 0.2, { cast: false })
    }
    box(B.w, 0.06, 0.06, darkMetal, B.x, B.h + 1.1, B.z + B.d / 2 - 0.2, { cast: false })
    // antenna mast + dish
    cyl(0.09, 0.13, 8, M.metalDark, B.x + 7.6, B.h + 4, B.z - 3.2, 10)
    box(0.06, 0.06, 3.2, darkMetal, B.x + 7.6, B.h + 7.4, B.z - 3.2, { cast: false })
    box(1.2, 0.05, 0.05, darkMetal, B.x + 7.6, B.h + 6.4, B.z - 3.2, { cast: false })
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff2a18 }))
    beacon.position.set(B.x + 7.6, B.h + 8.1, B.z - 3.2)
    root.add(beacon)
    const beaconLight = new THREE.PointLight(0xff2a18, 0, 10, 2)
    beaconLight.position.copy(beacon.position)
    root.add(beaconLight)
    animated.flickers.push((t) => {
      const on = (t * 1.2) % 1 < 0.12
      beacon.material.color.setHex(on ? 0xff3a20 : 0x400806)
      beaconLight.intensity = on ? 8 : 0
    })
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), M.metal)
    dish.position.set(B.x - 7.8, B.h + 1.4, B.z - 3.2)
    dish.rotation.set(0.6, 0.4, 0.3)
    add(dish)
    cyl(0.05, 0.05, 1.4, darkMetal, B.x - 7.8, B.h + 0.6, B.z - 3.2, 8, { cast: false })
    // exterior stairs
    for (let i = 0; i < 12; i++) {
      box(1.5, 0.08, 0.32, darkMetal, B.x + B.w / 2 + 0.9, 0.4 + i * 0.42, B.z - 2.2 + i * 0.36, { cast: false })
    }
    box(0.08, 4.6, 0.08, darkMetal, B.x + B.w / 2 + 1.6, 2.7, B.z - 2.2, { cast: false })
    box(0.08, 4.6, 0.08, darkMetal, B.x + B.w / 2 + 1.6, 2.7, B.z + 1.8, { cast: false })
  }

  /* ------------------------- containers ------------------------ */
  const container = (x, z, ry, matName, len = 6.1) => {
    const m = box(len, 2.62, 2.5, M[matName], x, 1.31, z, { ry, collide: true, solid: true })
    m.userData.bullet = true
    // corner posts + top/bottom rails
    const c = Math.cos(ry), s = Math.sin(ry)
    const lx = (dx, dz) => [x + dx * c - dz * s, z + dx * s + dz * c]
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const [px, pz] = lx(sx * (len / 2 - 0.09), sz * 1.16)
      box(0.22, 2.64, 0.22, M.metalDark, px, 1.31, pz, { cast: false, solid: true })
    }
    box(len, 0.14, 0.12, M.metalDark, x, 2.55, z + (1.21 * c), { ry, cast: false })
    box(len, 0.1, 0.12, M.metalDark, x, 0.12, z + (1.21 * c), { ry, cast: false })
    // door bars
    for (let i = 0; i < 4; i++) box(0.05, 1.9, 0.05, M.metalDark, x - 2.6 + i * 0.08, 1.35, z + 1.28 * c, { ry, cast: false })
    return m
  }
  container(16, -7, 0, 'containerTeal')
  container(16, -10.2, 0, 'containerRust')
  container(16, -13.4, 0, 'containerOlive')
  container(21.5, -9.8, Math.PI / 2, 'containerTeal')
  container(21.5, -16.3, Math.PI / 2, 'containerRust')
  container(16, -7, 0, 'containerRust').position.y = 3.94
  container(21.5, -9.8, Math.PI / 2, 'containerOlive').position.y = 3.94
  container(28, -22, 0.08, 'containerOlive')
  container(30.5, 8, Math.PI / 2, 'containerRust', 5.5)
  // open container with interior light
  {
    const openMat = new THREE.MeshStandardMaterial({ color: 0x15120f, roughness: 0.95, side: THREE.BackSide })
    const room = new THREE.Mesh(new THREE.BoxGeometry(5.9, 2.5, 2.3), openMat)
    room.position.set(24, 1.3, -30)
    root.add(room)
    container(24, -30, 0, 'containerTeal', 6.1)
    const glow = new THREE.PointLight(0xffb46a, 12, 7, 2)
    glow.position.set(24, 1.8, -30)
    root.add(glow)
    box(0.5, 0.8, 0.4, M.wood, 24.8, 0.4, -30.4, { solid: true })
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.22, 10), new THREE.MeshStandardMaterial({ color: 0x201a10, emissive: 0xffa040, emissiveIntensity: 3 }))
    lantern.position.set(24.8, 1.0, -30.4)
    root.add(lantern)
  }

  // container doors lying against a stack
  box(2.4, 2.5, 0.1, M.containerRust, 13.2, 1.28, -9, { ry: 0.16, collide: true })

  /* --------------------------- fuel depot ----------------------- */
  const tank = (x, z, r, h) => {
    const body = cyl(r, r, h, M.metal, x, h / 2, z, 28, { collide: true, solid: true })
    body.userData.bullet = true
    const top = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 10, 0, 6.283, 0, Math.PI / 2), M.metal)
    top.position.set(x, h, z)
    top.scale.y = 0.28
    add(top)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r + 0.02, 0.045, 6, 40), M.metalDark)
      ring.rotation.x = Math.PI / 2
      ring.position.set(x, 1.2 + i * (h - 2) / 2, z)
      root.add(ring)
    }
    // ladder
    for (let i = 0; i < 9; i++) box(0.05, 0.05, 0.6, M.metalDark, x - r - 0.05, 0.7 + i * 0.62, z, { cast: false })
    box(0.05, h, 0.05, M.metalDark, x - r - 0.05, h / 2, z - 0.28, { cast: false })
    box(0.05, h, 0.05, M.metalDark, x - r - 0.05, h / 2, z + 0.28, { cast: false })
    // hazard ring
    const band = cyl(r + 0.012, r + 0.012, 0.55, M.hazard, x, 1.0, z, 32, { cast: false })
    band.material = M.hazard
    // pipes
    cyl(0.16, 0.16, 4.2, M.metalDark, x + r * 0.6, 0.6, z + r + 1.8, 12, { rz: Math.PI / 2, cast: false })
    return body
  }
  tank(-25, -12, 3.2, 6.2)
  tank(-25, -21, 2.4, 5.0)
  // pipe run to building
  const pipeCurve = new THREE.CatmullRomCurve3([V(-22, 1.4, -14), V(-20, 1.3, -8), V(-16, 1.6, -2), V(-11.5, 2.2, 3), V(-8, 2.4, 5)])
  const pipe = new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 40, 0.13, 8, false), M.metal)
  pipe.castShadow = true
  root.add(pipe)
  for (let i = 0; i < 6; i++) {
    const p = pipeCurve.getPoint(i / 5)
    box(0.22, 3.4, 0.22, M.metalDark, p.x, 1.7, p.z, { cast: false })
  }
  // barrel clusters
  const barrelMats = [M.hazard, M.metalDark, M.containerOlive]
  const barrel = (x, z, mat, tipped = false) => {
    const g = new THREE.Group()
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.05, 20), mat)
    b.castShadow = b.receiveShadow = true
    g.add(b)
    for (const y of [-0.34, 0.34]) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.425, 0.025, 5, 22), M.metalDark)
      r.rotation.x = Math.PI / 2
      r.position.y = y
      g.add(r)
    }
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.04, 20), M.metalDark)
    lid.position.y = 0.53
    g.add(lid)
    g.position.set(x, tipped ? 0.42 : 0.525, z)
    if (tipped) g.rotation.z = Math.PI / 2
    root.add(g)
    colliders.push({ minX: x - 0.45, maxX: x + 0.45, minZ: z - 0.45, maxZ: z + 0.45, h: 1.1 })
    solidMeshes.push(b)
    return g
  }
  barrel(-17, -4, M.hazard)
  barrel(-17.9, -4.4, M.metalDark)
  barrel(-17.5, -5.3, M.containerOlive)
  barrel(-16.3, -5.1, M.hazard)
  barrel(-18.4, -3.5, M.metalDark, true)
  barrel(7.5, -17.5, M.containerOlive)
  barrel(8.4, -17.8, M.hazard)
  barrel(26, 2, M.metalDark)
  barrel(26.7, 1.4, M.containerOlive)

  // burning barrel set piece
  const fireBase = barrel(10, 6, M.metalDark)
  fireBase.position.y = 0.5
  const fireLight = new THREE.PointLight(0xff7a22, 26, 14, 2)
  fireLight.position.set(10, 1.6, 6)
  root.add(fireLight)
  const flameTex = tex.spark
  const flames = []
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: flameTex, color: i % 2 ? 0xffb050 : 0xff6a18, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85
    }))
    s.position.set(10 + (rand() - 0.5) * 0.35, 1.2 + i * 0.12, 6 + (rand() - 0.5) * 0.35)
    s.scale.setScalar(1.4 - i * 0.14)
    root.add(s)
    flames.push(s)
  }
  animated.flickers.push((t) => {
    fireLight.intensity = 22 + Math.sin(t * 17) * 4 + Math.sin(t * 31.7) * 3
    flames.forEach((f, i) => {
      const k = 0.85 + Math.sin(t * (8 + i * 2.3) + i) * 0.22
      f.scale.set(1.3 * k - i * 0.1, (1.6 - i * 0.16) * k, 1)
      f.position.y = 0.9 + i * 0.1 + Math.sin(t * (3 + i) + i) * 0.08
      f.material.opacity = 0.55 + 0.3 * k
    })
  })
  // embers
  {
    const n = 90
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      pos[i * 3] = 10 + (rand() - 0.5) * 0.8
      pos[i * 3 + 1] = 1.1 + rand() * 3
      pos[i * 3 + 2] = 6 + (rand() - 0.5) * 0.8
      seed[i] = rand()
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.09, map: tex.spark, color: 0xffab55, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    const pts = new THREE.Points(geo, mat)
    root.add(pts)
    animated.flickers.push((t) => {
      const p = geo.attributes.position
      for (let i = 0; i < n; i++) {
        const ph = (seed[i] + t * (0.14 + seed[i] * 0.1)) % 1
        p.array[i * 3 + 1] = 1.1 + ph * 4.2
        p.array[i * 3] = 10 + Math.sin(t * 1.3 + seed[i] * 20) * 0.5 * ph + (seed[i] - 0.5) * 0.7
        p.array[i * 3 + 2] = 6 + Math.cos(t * 1.1 + seed[i] * 14) * 0.5 * ph + (seed[i] - 0.5) * 0.7
      }
      p.needsUpdate = true
    })
  }
  // fire smoke
  {
    const smokeMat = new THREE.SpriteMaterial({ map: tex.smoke, color: 0x3b3530, transparent: true, opacity: 0.2, depthWrite: false })
    const puffs = []
    for (let i = 0; i < 12; i++) {
      const s = new THREE.Sprite(smokeMat.clone())
      s.position.set(10, 2 + i * 1.3, 6)
      s.scale.setScalar(1.5 + i * 0.35)
      root.add(s)
      puffs.push({ s, i })
    }
    animated.flickers.push((t) => {
      puffs.forEach(({ s, i }) => {
        const ph = ((t * 0.09 + i / puffs.length) % 1)
        s.position.y = 2 + ph * 15
        s.position.x = 10 + Math.sin(t * 0.25 + i) * ph * 2.5 + ph * 1.5
        s.position.z = 6 + Math.cos(t * 0.2 + i) * ph * 2
        s.scale.setScalar(1.2 + ph * 5)
        s.material.opacity = 0.22 * (1 - ph) * Math.min(1, ph * 5)
      })
    })
  }

  /* ---------------------- yard props & cover ------------------- */
  // jersey barriers (extruded profile)
  const jShape = new THREE.Shape()
  jShape.moveTo(-0.4, 0)
  jShape.lineTo(0.4, 0)
  jShape.lineTo(0.28, 0.32)
  jShape.lineTo(0.16, 1.05)
  jShape.lineTo(-0.16, 1.05)
  jShape.lineTo(-0.28, 0.32)
  jShape.closePath()
  const jGeo = new THREE.ExtrudeGeometry(jShape, { depth: 2.2, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1 })
  jGeo.translate(0, 0, -1.1)
  const jersey = (x, z, ry, mat = M.concrete) => {
    const m = new THREE.Mesh(jGeo, mat)
    m.position.set(x, 0, z)
    m.rotation.y = ry
    m.castShadow = m.receiveShadow = true
    root.add(m)
    const c = Math.cos(ry), s = Math.sin(ry)
    const w = 2.2
    colliders.push({
      minX: x - Math.abs(c * 0.45) - Math.abs(s * w / 2), maxX: x + Math.abs(c * 0.45) + Math.abs(s * w / 2),
      minZ: z - Math.abs(s * 0.45) - Math.abs(c * w / 2), maxZ: z + Math.abs(s * 0.45) + Math.abs(c * w / 2), h: 1.05
    })
    solidMeshes.push(m)
    return m
  }
  jersey(1, 1, 0.08)
  jersey(-5.5, -6.5, 0.32)
  jersey(-8.2, -6.0, 0.32)
  jersey(7, -12.5, -0.15)
  jersey(9.3, -14.8, 0.5)
  jersey(-15, 4.5, -0.25)
  jersey(13.5, 12.5, 1.2)
  jersey(-20.5, -2.5, 0.1)
  jersey(19, -30.5, 0.05)

  // sandbag emplacements (instanced bags)
  {
    const bagGeo = new RoundedBoxGeometry(0.72, 0.3, 0.42, 2, 0.08)
    const inst = new THREE.InstancedMesh(bagGeo, M.sandbag, 300)
    inst.castShadow = inst.receiveShadow = true
    const dummy = new THREE.Object3D()
    let idx = 0
    const wall = (cx, cz, len, ry = 0, rows = 3) => {
      const c = Math.cos(ry), s = Math.sin(ry)
      for (let row = 0; row < rows; row++) {
        const count = Math.floor(len / 0.78)
        for (let i = 0; i < count; i++) {
          const d = (i - (count - 1) / 2) * 0.78
          const x = cx + d * c + (row % 2 ? 0.39 * -s : 0)
          const z = cz + d * s + (row % 2 ? 0.39 * c : 0)
          dummy.position.set(x, 0.16 + row * 0.28, z)
          dummy.rotation.set((rand() - 0.5) * 0.05, ry + (rand() - 0.5) * 0.12, (rand() - 0.5) * 0.04)
          dummy.scale.set(1 + (rand() - 0.5) * 0.08, 1, 1 + (rand() - 0.5) * 0.08)
          dummy.updateMatrix()
          inst.setMatrixAt(idx++, dummy.matrix)
        }
      }
      const c2 = Math.abs(c) * len / 2 + Math.abs(s) * 0.5
      const s2 = Math.abs(s) * len / 2 + Math.abs(c) * 0.5
      colliders.push({ minX: cx - c2, maxX: cx + c2, minZ: cz - s2, maxZ: cz + s2, h: rows * 0.28 })
      coverPoints.push({ x: cx, z: cz, ry })
    }
    wall(6.5, 3.5, 4.2, 0.05)
    wall(-12, -12.5, 5.2, -0.3)
    wall(-13.4, -11.5, 3.5, 1.1)
    wall(12.5, -24, 4.6, 0.12)
    wall(3.2, -31.5, 5, 0.04)
    wall(-27, 8, 4, 1.3)
    wall(22, 16, 4.4, -0.6)
    wall(-2.5, 17.5, 3.4, 0.2)
    inst.count = idx
    root.add(inst)
    solidMeshes.push(inst)
  }

  // wooden crates
  const crate = (x, z, s = 1.1, y = 0, ry = 0) => {
    const m = box(s, s, s, M.wood, x, y + s / 2, z, { ry, collide: true, solid: true })
    const t = s * 0.06
    for (const [ax, ay, az, w, h, d] of [
      [0, s / 2 - t / 2, s / 2, s, t, 0.05], [0, -s / 2 + t / 2, s / 2, s, t, 0.05],
      [s / 2, 0, s / 2, t, s, 0.05], [-s / 2, 0, s / 2, t, s, 0.05]
    ]) box(w, h, d, M.wood, x + ax, y + s / 2 + ay, z + az, { ry, cast: false })
    m.userData.bullet = true
    return m
  }
  crate(4.5, -7.5, 1.2)
  crate(4.6, -7.6, 1.0, 1.2, 0.05)
  crate(5.6, -8.2, 0.9, 0, 0.4)
  crate(-3, -10.5, 1.15, 0, -0.2)
  crate(-3.2, -11.6, 1.0, 0, 0.1)
  crate(13.8, -3.2, 1.2, 0, 0.3)
  crate(14.9, -3.4, 0.9, 0, 0.1)
  crate(30, -3, 1.2, 0, 0.4)
  crate(29.2, -4.1, 1.0, 0, 0.2)
  crate(-15.5, 10, 1.3, 0, 0.15)
  crate(-14.2, 10.4, 1.0, 0, -0.2)
  crate(-15, 10.15, 1.0, 1.28, 0.05)

  // pallets
  {
    const palMat = M.wood
    for (const [x, z, ry] of [[2, 7, 0.2], [12, -20, -0.3], [-19, 3, 0.7], [27, 12, 0.1]]) {
      const g = new THREE.Group()
      for (let i = 0; i < 5; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.16), palMat)
        b.position.set(0, 0.12, -0.42 + i * 0.21)
        b.castShadow = true
        g.add(b)
      }
      for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 1.0), palMat)
        b.position.set(-0.45 + i * 0.45, 0.05, 0)
        g.add(b)
      }
      g.position.set(x, 0, z)
      g.rotation.y = ry
      root.add(g)
      // tarp on one
      const tarp = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.2), M.fabric)
      tarp.position.set(x, 0.35, z)
      tarp.rotation.y = ry
      tarp.castShadow = true
      root.add(tarp)
      colliders.push({ minX: x - 0.8, maxX: x + 0.8, minZ: z - 0.7, maxZ: z + 0.7, h: 0.6 })
    }
  }

  // cable spools
  for (const [x, z, s] of [[-11.5, 7.5, 1], [11.8, -1.5, 0.8], [27, -26, 1.1]]) {
    const g = new THREE.Group()
    for (const side of [-1, 1]) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.1, 20), M.wood)
      disc.rotation.x = Math.PI / 2
      disc.position.z = side * 0.45
      disc.castShadow = true
      g.add(disc)
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.8, 16), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 }))
    hub.rotation.x = Math.PI / 2
    g.add(hub)
    g.position.set(x, 0.85, z)
    g.scale.setScalar(s)
    g.rotation.z = Math.PI / 2
    root.add(g)
    colliders.push({ minX: x - 0.9 * s, maxX: x + 0.9 * s, minZ: z - 0.9 * s, maxZ: z + 0.9 * s, h: 1.6 * s })
  }

  // tires
  {
    const tireGeo = new THREE.TorusGeometry(0.42, 0.16, 8, 18)
    for (const [x, z, n] of [[-21, 1, 3], [20, -19, 2], [9, 11.5, 3]]) {
      for (let i = 0; i < n; i++) {
        const t = new THREE.Mesh(tireGeo, rubber)
        t.rotation.x = Math.PI / 2
        t.position.set(x + (rand() - 0.5) * 0.1, 0.17 + i * 0.22, z + (rand() - 0.5) * 0.1)
        t.castShadow = t.receiveShadow = true
        root.add(t)
      }
      colliders.push({ minX: x - 0.6, maxX: x + 0.6, minZ: z - 0.6, maxZ: z + 0.6, h: 0.7 })
    }
  }

  // wrecked technical vehicle at the courtyard
  {
    const g = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3d4238, roughness: 0.7, metalness: 0.4, map: tex.metal.map, normalMap: tex.metal.normalMap })
    const body = new THREE.Mesh(new RoundedBoxGeometry(4.2, 1.1, 1.9, 3, 0.12), bodyMat)
    body.position.y = 0.95
    body.castShadow = body.receiveShadow = true
    g.add(body)
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.9, 1.15, 1.8, 3, 0.1), bodyMat)
    cab.position.set(0.6, 1.75, 0)
    cab.castShadow = true
    g.add(cab)
    const glassM = new THREE.MeshStandardMaterial({ color: 0x0a0c0d, roughness: 0.1, metalness: 0.6, envMapIntensity: 1.4 })
    const wind = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.7), glassM)
    wind.position.set(1.57, 1.85, 0)
    wind.rotation.y = Math.PI / 2
    g.add(wind)
    // roll cage / bed
    for (const z of [-0.8, 0.8]) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 8), darkMetal)
      bar.rotation.z = Math.PI / 2
      bar.position.set(-1.1, 1.9, z)
      g.add(bar)
    }
    for (let i = 0; i < 4; i++) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.34, 18), rubber)
      wheel.rotation.x = Math.PI / 2
      wheel.position.set(-1.3 + (i % 2) * 2.6, 0.46, i < 2 ? -0.95 : 0.95)
      wheel.castShadow = true
      g.add(wheel)
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.36, 12), M.metalDark)
      hub.rotation.x = Math.PI / 2
      hub.position.copy(wheel.position)
      g.add(hub)
    }
    // tarp over bed
    const tarp = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7, 8, 6), new THREE.MeshStandardMaterial({ color: 0x5a5540, roughness: 0.95, side: THREE.DoubleSide }))
    tarp.rotation.x = -Math.PI / 2
    tarp.position.set(-1.1, 1.55, 0)
    tarp.castShadow = true
    g.add(tarp)
    g.position.set(-16, 0, 14)
    g.rotation.y = 0.7
    g.rotation.z = 0.02
    root.add(g)
    colliders.push({ minX: -19.2, maxX: -12.8, minZ: 11.2, maxZ: 16.8, h: 2.4 })
    coverPoints.push({ x: -16, z: 17.6, ry: 0.7 })
    // spilling cargo
    crate(-14, 16.5, 0.8, 0, 0.6)
  }

  // generators / power units with emissive screens
  const gen = (x, z, ry) => {
    const g = new THREE.Group()
    const b = new THREE.Mesh(new RoundedBoxGeometry(2.2, 1.35, 1.2, 2, 0.06), M.metalDark)
    b.position.y = 0.7
    b.castShadow = b.receiveShadow = true
    g.add(b)
    for (let i = 0; i < 8; i++) {
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.03), darkMetal)
      v.position.set(-0.4, 0.85 + i * 0.05, 0.61)
      g.add(v)
    }
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.16), new THREE.MeshStandardMaterial({ color: 0x082018, emissive: 0x39ffb0, emissiveIntensity: 1.15 }))
    screen.position.set(0.65, 0.95, 0.615)
    g.add(screen)
    const lamp = new THREE.PointLight(0x39ffb0, 2.5, 3.5, 2)
    lamp.position.set(0.65, 0.95, 0.9)
    g.add(lamp)
    g.position.set(x, 0, z)
    g.rotation.y = ry
    root.add(g)
    colliders.push({ minX: x - 1.2, maxX: x + 1.2, minZ: z - 0.8, maxZ: z + 0.8, h: 1.4 })
    solidMeshes.push(b)
    coverPoints.push({ x, z: z + 1.2, ry })
  }
  gen(-4.5, 4.5, 0.1)
  gen(19.5, -2.5, -0.5)

  // ammo crates with stencils
  for (const [x, z, ry, color] of [[2.5, 5.5, 0.1, 'AMMO'], [9.5, -9.5, -0.3, 'MUNITIONS'], [-9.5, 1.4, 0.4, 'MEDICAL']]) {
    const boxm = box(0.9, 0.42, 0.5, M.containerOlive, x, 0.21, z, { ry, collide: true })
    const t = stencilTexture([color], { w: 256, h: 128, size: 44, color: 'rgba(225,218,190,0.8)' })
    decal(t, 0.75, 0.32, x, 0.23, z + 0.26, ry, { transparent: true })
    boxm.userData.bullet = true
  }

  /* -------------------------- watchtower ----------------------- */
  {
    const tx = 30, tz = -30
    for (const [dx, dz] of [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]]) {
      box(0.22, 7.2, 0.22, M.metalDark, tx + dx, 3.6, tz + dz, { solid: true })
    }
    for (let level = 1; level <= 3; level++) {
      const y = level * 1.9
      for (let side = 0; side < 4; side++) {
        const a = side * Math.PI / 2
        const cx = tx + Math.cos(a) * 1.5 * 0.75
        const cz = tz + Math.sin(a) * 1.5 * 0.75
        const br = box(2.2, 0.08, 0.08, M.metalDark, cx, y, cz, { cast: false })
        br.rotation.y = a
      }
    }
    const platform = box(4.6, 0.25, 4.6, M.metal, tx, 7.2, tz, { solid: true })
    platform.userData.bullet = true
    // cabin
    box(3.2, 2.2, 3.2, M.containerOlive, tx, 8.45, tz, { solid: true })
    box(3.5, 0.18, 3.5, M.metalDark, tx, 9.62, tz, { solid: true })
    // windows
    for (let side = 0; side < 4; side++) {
      const a = side * Math.PI / 2
      const w = box(2.4, 0.8, 0.05, warmGlass, tx + Math.sin(a) * 1.62, 8.7, tz + Math.cos(a) * 1.62, { cast: false })
      w.rotation.y = a
    }
    // railing
    for (let side = 0; side < 4; side++) {
      const a = side * Math.PI / 2
      for (let i = -2; i <= 2; i++) {
        box(0.04, 0.9, 0.04, M.metalDark, tx + Math.sin(a) * 2.2 + Math.cos(a) * i * 0.9, 7.8, tz + Math.cos(a) * 2.2 - Math.sin(a) * i * 0.9, { cast: false })
      }
      box(4.4, 0.05, 0.05, M.metalDark, tx + Math.sin(a) * 2.2, 8.25, tz + Math.cos(a) * 2.2, { cast: false, ry: a })
    }
    // searchlight head group
    const head = new THREE.Group()
    head.position.set(tx, 8.4, tz)
    root.add(head)
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.4, 0.8, 18), M.metalDark)
    housing.rotation.x = Math.PI / 2
    head.add(housing)
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), new THREE.MeshStandardMaterial({ color: 0xfff2cc, emissive: 0xffe0a0, emissiveIntensity: 4 }))
    lens.position.z = 0.41
    head.add(lens)
    const search = new THREE.SpotLight(0xffe0b0, 120, 80, 0.16, 0.55, 1.6)
    search.position.set(tx, 8.4, tz)
    search.target.position.set(6, 0, -6)
    scene.add(search, search.target)
    const beam = makeConeBeam(0xffe0b0, 0.055)
    beam.scale.set(4.5, 34, 4.5)
    beam.position.set(tx, 8.4, tz)
    root.add(beam)
    animated.beams.push({ beam, search, head })
    // ladder
    for (let i = 0; i < 16; i++) box(0.5, 0.05, 0.05, M.metalDark, tx - 1.5, 0.45 + i * 0.45, tz + 1.5, { cast: false })
    for (const dz of [0.2, 0.8]) box(0.05, 7.2, 0.05, M.metalDark, tx - 1.5, 3.6, tz + 1.5 + dz - 0.5, { cast: false })
    colliders.push({ minX: tx - 2.4, maxX: tx + 2.4, minZ: tz - 2.4, maxZ: tz + 2.4, h: 10 })
    coverPoints.push({ x: tx - 3.4, z: tz + 1, ry: 0 })
  }

  /* ----------------------- floodlight poles --------------------- */
  const floodPole = (x, z, ry, height = 7.5) => {
    cyl(0.11, 0.18, height, M.metalDark, x, height / 2, z, 10, { collide: true, cast: true })
    const bar = box(1.5, 0.09, 0.09, M.metalDark, x, height - 0.2, z, { ry, cast: false })
    const head = new THREE.Group()
    head.position.set(x, height - 0.35, z)
    head.rotation.y = ry
    root.add(head)
    for (const dx of [-0.45, 0.45]) {
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.3, 0.28), M.metalDark)
      h.position.x = dx
      head.add(h)
      const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.22), new THREE.MeshStandardMaterial({ color: 0xfff0cc, emissive: 0xffd79a, emissiveIntensity: 5, side: THREE.DoubleSide }))
      lens.position.set(dx, 0, 0.145)
      head.add(lens)
    }
    const spot = new THREE.SpotLight(0xffd9a3, 55, 30, 0.75, 0.6, 1.5)
    spot.position.set(x, height - 0.5, z)
    spot.target.position.set(x + Math.sin(ry) * 2, 0, z + Math.cos(ry) * 2)
    scene.add(spot, spot.target)
    const beam = makeConeBeam(0xffd9a3, 0.032)
    beam.scale.set(5.5, height - 0.3, 5.5)
    beam.position.set(x, height - 0.4, z)
    beam.rotation.x = Math.PI
    root.add(beam)
    animated.beams.push({ beam, spot, static: true })
    // cable conduit
    box(0.06, height, 0.06, M.metalDark, x + 0.2, height / 2, z, { cast: false })
  }
  floodPole(-18, 8, 2.1)
  floodPole(8, -22, 0.4)
  floodPole(22, 6, 3.2)

  // generator trailer with cable
  {
    box(2.2, 0.25, 1.0, M.metalDark, -30, 0.65, 14, { ry: 1.1 })
    for (const dx of [-0.8, 0.8]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 14), rubber)
      w.rotation.x = Math.PI / 2
      w.position.set(-30 + dx, 0.3, 14)
      root.add(w)
    }
    box(1.7, 1.0, 0.9, M.metal, -30, 1.4, 14, { ry: 1.1, collide: true })
    const cablePoints = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      cablePoints.push(V(-29 + t * 7, 0.09 + Math.sin(t * Math.PI) * 0.04, 13.5 + t * -7.5))
    }
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cablePoints), 30, 0.035, 5, false), rubber)
    cable.castShadow = true
    root.add(cable)
  }

  // overhead power lines between poles
  {
    const poleAt = (x, z, h) => {
      cyl(0.14, 0.2, h, M.metalDark, x, h / 2, z, 10, { collide: true })
      box(2.6, 0.12, 0.12, M.metalDark, x, h - 0.4, z, { cast: false })
    }
    poleAt(-36, 24, 9)
    poleAt(-8, 28, 8.5)
    poleAt(20, 22, 8)
    const wireMat = darkMetal
    for (const [a, b, sag] of [[[-36, 24], [-8, 28], 1.4], [[-8, 28], [20, 22], 1.2], [[-36, 24], [20, 22], 2.2]]) {
      const pts = []
      for (let i = 0; i <= 24; i++) {
        const t = i / 24
        pts.push(V(a[0] + (b[0] - a[0]) * t, 8.5 - Math.sin(t * Math.PI) * sag, a[1] + (b[1] - a[1]) * t))
      }
      const w = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.017, 4, false), wireMat)
      root.add(w)
    }
  }

  // flags / tarps to catch wind
  {
    for (const [x, z, h, color] of [[-33, 2, 6, 0x6b2b20], [15, 18, 5, 0x2b3d4a]]) {
      cyl(0.07, 0.09, h, M.metalDark, x, h / 2, z, 8)
      const geo = new THREE.PlaneGeometry(2.2, 1.3, 12, 6)
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.95, side: THREE.DoubleSide })
      const flag = new THREE.Mesh(geo, mat)
      flag.position.set(x + 1.1, h - 0.8, z)
      flag.castShadow = true
      root.add(flag)
      animated.flags.push({ mesh: flag, base: geo.attributes.position.array.slice(), x, z })
    }
  }

  // perimeter lights (small red/blue points)
  for (let i = 0; i < 8; i++) {
    const x = -35 + i * 10
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3b28 }))
    m.position.set(x, 4.7, -43.8)
    root.add(m)
    const l = new THREE.PointLight(0xff3b28, 1.2, 5, 2)
    l.position.copy(m.position)
    root.add(l)
  }

  /* ------------------------- atmosphere ------------------------ */
  // dust motes
  {
    const n = 1100
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(n * 3)
    const seeds = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (rand() - 0.5) * 80
      pos[i * 3 + 1] = 0.2 + rand() * 14
      pos[i * 3 + 2] = (rand() - 0.5) * 70 - 8
      seeds[i] = rand()
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.045, map: tex.smoke, color: 0xffd9ae, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    })
    const dust = new THREE.Points(geo, mat)
    dust.frustumCulled = false
    root.add(dust)
    animated.flickers.push((t) => {
      dust.position.x = Math.sin(t * 0.05) * 1.5
      dust.position.y = Math.sin(t * 0.11) * 0.2
    })
  }

  // distant skyline silhouettes
  {
    const farMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1c, roughness: 1, metalness: 0 })
    for (let i = 0; i < 22; i++) {
      const x = -110 + rand() * 220
      const z = -80 - rand() * 50
      const w = 8 + rand() * 22
      const h = 5 + rand() * 22
      box(w, h, 10, farMat, x, h / 2 - 1, z, { cast: false, receive: false })
    }
    // lit windows on distant blocks
    const winMat = new THREE.MeshBasicMaterial({ color: 0xffb067 })
    for (let i = 0; i < 40; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), winMat)
      m.position.set(-100 + rand() * 200, 2 + rand() * 16, -79.4 - rand() * 40)
      root.add(m)
    }
    // hills
    for (let i = 0; i < 12; i++) {
      const c = new THREE.Mesh(new THREE.ConeGeometry(30 + rand() * 40, 14 + rand() * 16, 5), new THREE.MeshStandardMaterial({ color: 0x241f1b, roughness: 1 }))
      c.position.set(-150 + i * 28 + rand() * 10, 2, -120 - rand() * 40)
      c.rotation.y = rand()
      root.add(c)
    }
  }

  // ground haze planes
  {
    const hazeMat = new THREE.MeshBasicMaterial({
      map: tex.smoke, transparent: true, opacity: 0.05, depthWrite: false,
      color: 0xffcfa0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    })
    for (let i = 0; i < 5; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(50, 18), hazeMat)
      m.position.set(-10 + i * 6, 4.5, -18 - i * 5)
      m.rotation.y = 0.1 * i
      root.add(m)
    }
  }

  /* --------------------------- spawns -------------------------- */
  spawnPoints.push(
    { x: 22, z: -33 }, { x: -30, z: -30 }, { x: 32, z: 2 }, { x: -30, z: 20 },
    { x: 12, z: -34 }, { x: -18, z: -33 }, { x: 34, z: -14 }, { x: -33, z: -6 },
    { x: 6, z: -36 }, { x: 28, z: -27 }, { x: -26, z: 2 }, { x: 24, z: 22 }
  )
  coverPoints.push(
    { x: 2, z: 3, ry: 0 }, { x: -6, z: -4.5, ry: 0.3 }, { x: 11, z: -12, ry: 0 },
    { x: -12, z: -10, ry: 0 }, { x: 14, z: -21, ry: 0 }, { x: 0, z: -29, ry: 0 },
    { x: 18, z: 0, ry: 0 }, { x: -20, z: 7, ry: 0 }, { x: 27, z: 13, ry: 0 },
    { x: -8, z: 9, ry: 0 }, { x: 21, z: -19, ry: 0 }, { x: -14, z: -2, ry: 0 }
  )

  const playerStart = V(0, 1.7, 25)
  const playerStartYaw = Math.PI

  // camera sun lens flare sprites (subtle)
  {
    const flare = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex.spark, color: 0xffc38a, transparent: true, opacity: 0.20,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false
    }))
    flare.position.copy(sunDir).multiplyScalar(470)
    flare.scale.setScalar(0.001)
    flare.renderOrder = 100
    root.add(flare)
  }

  const clockTmp = new THREE.Vector3()
  function update(dt, t) {
    sky.material.uniforms.time.value = t
    for (const fn of animated.flickers) fn(t)
    for (const f of animated.beams) {
      if (f.static) {
        f.beam.material.uniforms.time.value = t
        continue
      }
      const sweep = Math.sin(t * 0.16) * 0.75
      const targetX = 4 + Math.sin(t * 0.16) * 26
      const targetZ = -8 + Math.cos(t * 0.16 * 0.8) * 20
      f.search.target.position.set(targetX, 0, targetZ)
      f.search.target.updateMatrixWorld()
      f.beam.position.set(30, 8.4, -30)
      clockTmp.set(targetX, 0, targetZ).sub(f.beam.position)
      const len = clockTmp.length()
      f.beam.scale.set(4.5, len, 4.5)
      f.beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), clockTmp.normalize())
      f.beam.material.uniforms.time.value = t
      f.head.lookAt(targetX, 0, targetZ)
    }
    for (const flag of animated.flags) {
      const pos = flag.mesh.geometry.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = flag.base[i * 3]
        const y = flag.base[i * 3 + 1]
        const wave = Math.sin((x + 1.1) * 2.2 - t * 3.4) * 0.11 * ((x + 1.1) / 2.2) + Math.sin(y * 2 + t * 2.1) * 0.03
        pos.setZ(i, wave)
      }
      pos.needsUpdate = true
      flag.mesh.geometry.computeVertexNormals()
    }
  }

  function dispose() {
    scene.remove(root, sky)
    root.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material]
        for (const m of ms) m.dispose()
      }
    })
    env.dispose()
  }

  return {
    root, colliders, solidMeshes, spawnPoints, coverPoints, playerStart, playerStartYaw,
    sun, sunDir, env, update, dispose, sky
  }
}
