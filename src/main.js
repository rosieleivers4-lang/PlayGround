import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/* ------------------------------------------------------------------ *
 *  Bone Garden — a 3D puppy digging game for phones & tablets.
 *  Original stylised character, no external assets.
 * ------------------------------------------------------------------ */

const $ = (id) => document.getElementById(id)

const canvas = $('scene')
const hud = $('hud')
const startScreen = $('startScreen')
const endScreen = $('endScreen')
const sleepScreen = $('sleepScreen')
const startButton = $('startButton')
const restartButton = $('restartButton')
const digBtn = $('digBtn')
const eatBtn = $('eatBtn')
const tiltBtn = $('tiltBtn')
const stick = $('stick')
const knob = $('knob')
const toastEl = $('toast')
const promptEl = $('prompt')
const digMeter = $('digMeter')
const digMeterFill = digMeter.querySelector('i')

const ui = {
  dayNum: $('dayNum'),
  skyIcon: $('skyIcon'),
  clockLabel: $('clockLabel'),
  lifeFill: $('lifeFill'),
  lifeVal: $('lifeVal'),
  foodFill: $('foodFill'),
  foodVal: $('foodVal'),
  cntNickel: $('cntNickel'),
  cntSilver: $('cntSilver'),
  cntGold: $('cntGold'),
  cntFood: $('cntFood'),
  scoreVal: $('scoreVal'),
  bestScore: $('bestScore'),
  endScore: $('endScore'),
  endBones: $('endBones'),
  endLevel: $('endLevel'),
  endMessage: $('endMessage')
}

/* ------------------------------------------------------------------ *
 *  Renderer, scene, camera
 * ------------------------------------------------------------------ */

const rendererName = (() => {
  try {
    const probe = document.createElement('canvas')
    const gl = probe.getContext('webgl2') || probe.getContext('webgl')
    if (!gl) return 'none'
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    return ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : 'unknown'
  } catch {
    return 'unknown'
  }
})()
const softwareRenderer = /swiftshader|software|llvmpipe|mesa offscreen/i.test(rendererName)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !softwareRenderer,
  powerPreference: 'high-performance'
})
renderer.setPixelRatio(
  softwareRenderer ? 1 : Math.min(window.devicePixelRatio || 1, 2)
)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = !softwareRenderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x9fd0f0)
scene.fog = new THREE.Fog(0x9fd0f0, 34, 68)

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 220)

const hemi = new THREE.HemisphereLight(0xd9efff, 0x40552f, 1.05)
scene.add(hemi)

const sun = new THREE.DirectionalLight(0xfff2d6, 1.85)
sun.position.set(-18, 28, 16)
sun.castShadow = true
sun.shadow.mapSize.set(1024, 1024)
sun.shadow.camera.left = -26
sun.shadow.camera.right = 26
sun.shadow.camera.top = 26
sun.shadow.camera.bottom = -26
sun.shadow.camera.near = 1
sun.shadow.camera.far = 80
sun.shadow.bias = -0.0015
sun.shadow.normalBias = 0.02
scene.add(sun)
scene.add(sun.target)

const kennelLight = new THREE.PointLight(0xffc06a, 0, 14, 2)
kennelLight.position.set(-13, 2.4, 9.6)
scene.add(kennelLight)

/* ------------------------------------------------------------------ *
 *  Small canvas textures
 * ------------------------------------------------------------------ */

function canvasTexture(size, draw, repeatX = 1, repeatY = 1) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  draw(ctx, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeatX, repeatY)
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  return tex
}

const grassTex = canvasTexture(
  256,
  (ctx, s) => {
    ctx.fillStyle = '#6c9a4d'
    ctx.fillRect(0, 0, s, s)
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * s
      const y = Math.random() * s
      const h = 2 + Math.random() * 6
      const shade = 96 + Math.random() * 70
      ctx.fillStyle = `rgba(${Math.round(shade * 0.62)},${Math.round(shade)},${Math.round(shade * 0.46)},0.5)`
      ctx.fillRect(x, y, 1.4, h)
    }
    for (let i = 0; i < 26; i++) {
      const x = Math.random() * s
      const y = Math.random() * s
      const r = 12 + Math.random() * 40
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(120,150,72,0.22)')
      g.addColorStop(1, 'rgba(120,150,72,0)')
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
  },
  14,
  14
)

const dirtTex = canvasTexture(128, (ctx, s) => {
  ctx.fillStyle = '#6b4726'
  ctx.fillRect(0, 0, s, s)
  for (let i = 0; i < 500; i++) {
    const v = 60 + Math.random() * 70
    ctx.fillStyle = `rgba(${v + 35},${v * 0.72},${v * 0.42},0.55)`
    ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2)
  }
})

const woodTex = canvasTexture(128, (ctx, s) => {
  ctx.fillStyle = '#8d5a34'
  ctx.fillRect(0, 0, s, s)
  for (let x = 0; x < s; x += 16) {
    ctx.fillStyle = `rgba(60,32,14,${0.12 + Math.random() * 0.12})`
    ctx.fillRect(x, 0, 2, s)
  }
  for (let i = 0; i < 130; i++) {
    ctx.fillStyle = `rgba(70,40,18,${0.06 + Math.random() * 0.1})`
    ctx.fillRect(0, Math.random() * s, s, 1)
  }
})

const shadowTex = canvasTexture(128, (ctx, s) => {
  const g = ctx.createRadialGradient(s / 2, s / 2, 3, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(18,28,14,0.6)')
  g.addColorStop(0.55, 'rgba(18,28,14,0.3)')
  g.addColorStop(1, 'rgba(18,28,14,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
})

const dotTex = canvasTexture(64, (ctx, s) => {
  const g = ctx.createRadialGradient(s / 2, s / 2, 1, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
})

// Cheap equirect environment so metal bones catch a sky highlight.
const envTex = canvasTexture(256, (ctx, s) => {
  const sky = ctx.createLinearGradient(0, 0, 0, s)
  sky.addColorStop(0, '#cfe9ff')
  sky.addColorStop(0.48, '#eef7ff')
  sky.addColorStop(0.52, '#9db77f')
  sky.addColorStop(1, '#4c6f3c')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, s, s)
})
envTex.mapping = THREE.EquirectangularReflectionMapping
scene.environment = envTex
scene.environmentIntensity = 0.55

function blobShadow(width, depth, opacity = 0.85) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, depth),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity, depthWrite: false })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = 0.018
  return mesh
}

/* ------------------------------------------------------------------ *
 *  World
 * ------------------------------------------------------------------ */

const WORLD_LIMIT = 19.2
const world = new THREE.Group()
scene.add(world)

const grass = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100, 1, 1),
  new THREE.MeshStandardMaterial({ map: grassTex, roughness: 0.95, color: 0xffffff })
)
grass.rotation.x = -Math.PI / 2
grass.receiveShadow = true
world.add(grass)

// soft radial shadow/vignette ring so the garden reads as a place
const edgeFade = new THREE.Mesh(
  new THREE.RingGeometry(26, 46, 64),
  new THREE.MeshBasicMaterial({ color: 0x2c4423, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
)
edgeFade.rotation.x = -Math.PI / 2
edgeFade.position.y = 0.01
world.add(edgeFade)

/* --- fence --- */
const dummy = new THREE.Object3D()
const fenceMat = new THREE.MeshStandardMaterial({ map: woodTex, color: 0xc79a6a, roughness: 0.85 })
const fence = new THREE.Group()
const HALF = 20
const postPositions = []
for (let side = 0; side < 4; side++) {
  const horizontal = side < 2
  for (let i = -20; i <= 20; i += 2.5) {
    postPositions.push([
      horizontal ? i : side === 2 ? -HALF : HALF,
      0.75,
      horizontal ? (side === 0 ? -HALF : HALF) : i
    ])
  }
}
const posts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.22, 1.5, 0.22), fenceMat, postPositions.length)
postPositions.forEach((p, i) => {
  dummy.position.set(p[0], p[1], p[2])
  dummy.rotation.set(0, 0, 0)
  dummy.scale.setScalar(1)
  dummy.updateMatrix()
  posts.setMatrixAt(i, dummy.matrix)
})
fence.add(posts)

for (const [side, geometry] of [
  [0, new THREE.BoxGeometry(40, 0.12, 0.12)],
  [1, new THREE.BoxGeometry(40, 0.12, 0.12)],
  [2, new THREE.BoxGeometry(0.12, 0.12, 40)],
  [3, new THREE.BoxGeometry(0.12, 0.12, 40)]
]) {
  const rails = new THREE.InstancedMesh(geometry, fenceMat, 2)
  ;[0.55, 1.1].forEach((y, i) => {
    dummy.position.set(side < 2 ? 0 : side === 2 ? -HALF : HALF, y, side < 2 ? (side === 0 ? -HALF : HALF) : 0)
    dummy.rotation.set(0, 0, 0)
    dummy.scale.setScalar(1)
    dummy.updateMatrix()
    rails.setMatrixAt(i, dummy.matrix)
  })
  fence.add(rails)
}
world.add(fence)

/* --- trees & bushes along the fence --- */
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.9 })
const leafMats = [0x3f7a3a, 0x4c8f42, 0x356c34].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
)

const TREES = 18
const treeTrunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.24, 0.34, 2.2, 8).translate(0, 1.1, 0), trunkMat, TREES)
const treeLayers = [0, 1, 2].map(
  (i) => new THREE.InstancedMesh(new THREE.ConeGeometry(1.5 - i * 0.34, 1.7, 9), leafMats[i], TREES)
)
for (let i = 0; i < TREES; i++) {
  const a = (i / TREES) * Math.PI * 2 + (i < 8 ? 0.35 : 0.9)
  const r = i < 8 ? 27.5 : 32 + Math.random() * 5
  const scale = (i < 8 ? 1.15 : 1.35) + Math.random() * 0.6
  const rot = Math.random() * Math.PI * 2
  dummy.position.set(Math.cos(a) * r, 0, Math.sin(a) * r)
  dummy.rotation.set(0, rot, 0)
  dummy.scale.setScalar(scale)
  dummy.updateMatrix()
  treeTrunks.setMatrixAt(i, dummy.matrix)
  treeLayers.forEach((layer, li) => {
    dummy.position.y = (2.4 + li * 0.85) * scale
    dummy.updateMatrix()
    layer.setMatrixAt(i, dummy.matrix)
  })
}
world.add(treeTrunks)
treeLayers.forEach((layer) => world.add(layer))

for (let i = 0; i < 10; i++) {
  const a = Math.random() * Math.PI * 2
  const r = 15 + Math.random() * 3
  const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7 + Math.random() * 0.5, 1), leafMats[i % 3])
  bush.position.set(Math.cos(a) * r, 0.45, Math.sin(a) * r)
  bush.scale.y = 0.7
  bush.castShadow = true
  bush.receiveShadow = true
  world.add(bush)
}

/* --- instanced grass tufts --- */
const tuftGeo = new THREE.ConeGeometry(0.07, 0.26, 4)
tuftGeo.translate(0, 0.13, 0)
const tuftMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
const tufts = new THREE.InstancedMesh(tuftGeo, tuftMat, 220)
const tuftColor = new THREE.Color()
for (let i = 0; i < tufts.count; i++) {
  const a = Math.random() * Math.PI * 2
  const r = 3 + Math.random() * 16
  dummy.position.set(Math.cos(a) * r, 0, Math.sin(a) * r)
  dummy.rotation.y = Math.random() * Math.PI
  dummy.scale.setScalar(0.7 + Math.random() * 0.9)
  dummy.updateMatrix()
  tufts.setMatrixAt(i, dummy.matrix)
  tuftColor.setHSL(0.24 + Math.random() * 0.06, 0.52, 0.2 + Math.random() * 0.1)
  tufts.setColorAt(i, tuftColor)
}
world.add(tufts)

/* --- flowers --- */
const flowerGeo = new THREE.SphereGeometry(0.075, 7, 6)
const flowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 })
const flowers = new THREE.InstancedMesh(flowerGeo, flowerMat, 72)
const flowerPalette = [0xfff0f4, 0xffe066, 0xff9fc0, 0xe6f2ff]
const fColor = new THREE.Color()
const clusterCount = 9
const clusters = []
for (let i = 0; i < clusterCount; i++) {
  const a = Math.random() * Math.PI * 2
  const r = 5 + Math.random() * 11
  clusters.push([Math.cos(a) * r, Math.sin(a) * r])
}
for (let i = 0; i < flowers.count; i++) {
  const c = clusters[i % clusterCount]
  const a = Math.random() * Math.PI * 2
  const r = Math.random() * 1.3
  dummy.position.set(c[0] + Math.cos(a) * r, 0.16, c[1] + Math.sin(a) * r)
  dummy.rotation.set(0, 0, 0)
  dummy.scale.setScalar(1)
  dummy.updateMatrix()
  flowers.setMatrixAt(i, dummy.matrix)
  fColor.set(flowerPalette[i % flowerPalette.length])
  flowers.setColorAt(i, fColor)
}
world.add(flowers)

/* --- stone path to the kennel --- */
const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9b978b, roughness: 0.95 })
const pathStones = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.34, 0.38, 0.1, 8), stoneMat, 9)
for (let i = 0; i < 9; i++) {
  dummy.position.set(-8.15 + i * 0.92 + Math.sin(i * 0.7) * 0.42, 0.05, -6.8 + i * 0.58)
  dummy.rotation.set(0, Math.random() * Math.PI, 0)
  dummy.scale.setScalar(1)
  dummy.updateMatrix()
  pathStones.setMatrixAt(i, dummy.matrix)
}
world.add(pathStones)
// chew ball by the kennel
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 16, 12),
  new THREE.MeshStandardMaterial({ color: 0xd8564f, roughness: 0.55 })
)
ball.position.set(-6.2, 0.3, -11.2)
ball.castShadow = true
world.add(ball)
const ballStripe = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.035, 6, 20),
  new THREE.MeshStandardMaterial({ color: 0xffe6c4, roughness: 0.6 })
)
ballStripe.position.copy(ball.position)
ballStripe.rotation.x = Math.PI / 2
world.add(ballStripe)

/* ------------------------------------------------------------------ *
 *  Kennel + food bowl
 * ------------------------------------------------------------------ */

const KENNEL = new THREE.Vector3(-9, 0, -9)
const BOWL = new THREE.Vector3(-5.4, 0, -8.1)
kennelLight.position.set(KENNEL.x, 2.4, KENNEL.z + 3.6)

const kennel = new THREE.Group()
kennel.position.copy(KENNEL)
kennel.rotation.y = Math.PI
world.add(kennel)

const kennelShadow = blobShadow(5.8, 5.2, 0.9)
kennelShadow.position.set(KENNEL.x, 0.016, KENNEL.z)
world.add(kennelShadow)

const kennelWallMat = new THREE.MeshStandardMaterial({ map: woodTex, color: 0xc08a55, roughness: 0.85 })
const kennelRoofMat = new THREE.MeshStandardMaterial({ color: 0x8a5636, roughness: 0.8 })

const base = new THREE.Mesh(new THREE.BoxGeometry(4.3, 2.9, 3.8), kennelWallMat)
base.position.y = 1.45
base.castShadow = true
base.receiveShadow = true
kennel.add(base)

const roofL = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.24, 4.2), kennelRoofMat)
roofL.position.set(-1.05, 3.28, 0)
roofL.rotation.z = 0.58
roofL.castShadow = true
kennel.add(roofL)
const roofR = roofL.clone()
roofR.position.x = 1.05
roofR.rotation.z = -0.58
kennel.add(roofR)

const opening = new THREE.Mesh(
  new THREE.BoxGeometry(1.7, 1.85, 0.12),
  new THREE.MeshStandardMaterial({ color: 0x24170f, roughness: 1 })
)
opening.position.set(0, 0.95, -1.92)
kennel.add(opening)

const arch = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.11, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ map: woodTex, color: 0xd0a271, roughness: 0.8 }))
arch.position.set(0, 1.82, -1.95)
kennel.add(arch)

// little carved heart sign above the door
const signTex = canvasTexture(128, (ctx, s) => {
  ctx.fillStyle = '#8d5a34'
  ctx.fillRect(0, 0, s, s)
  ctx.fillStyle = '#ffe6b8'
  ctx.font = 'bold 30px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('KENNEL', s / 2, s / 2)
})
const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.5), new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.8 }))
sign.position.set(0, 2.82, -2.06)
sign.rotation.y = Math.PI
kennel.add(sign)

// glow inside the door at night
const doorwayGlow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.7),
  new THREE.MeshBasicMaterial({ map: dotTex, color: 0xffa64d, transparent: true, opacity: 0, depthWrite: false })
)
doorwayGlow.scale.set(1.5, 1.9, 1)
doorwayGlow.position.set(0, 0.95, -1.99)
doorwayGlow.rotation.y = Math.PI
kennel.add(doorwayGlow)

// floating lantern glow above the kennel at night
const beacon = new THREE.Group()
const beaconCore = new THREE.Mesh(
  new THREE.SphereGeometry(0.17, 12, 10),
  new THREE.MeshStandardMaterial({ color: 0xffe9a8, emissive: 0xffb838, emissiveIntensity: 2.2, roughness: 0.3 })
)
beacon.add(beaconCore)
const beaconHalo = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: dotTex,
    color: 0xffc95e,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
)
beaconHalo.scale.setScalar(1.7)
beacon.add(beaconHalo)
beacon.position.set(0, 4.7, 0)
beacon.visible = false
kennel.add(beacon)

/* --- bowl --- */
const bowlGroup = new THREE.Group()
bowlGroup.position.copy(BOWL)
world.add(bowlGroup)

const bowlShadow = blobShadow(2.2, 2.2, 0.8)
bowlShadow.position.set(BOWL.x, 0.017, BOWL.z)
world.add(bowlShadow)

const bowlBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.95, 0.72, 0.35, 20),
  new THREE.MeshStandardMaterial({ color: 0x3f6f96, roughness: 0.55, metalness: 0.1 })
)
bowlBase.position.y = 0.18
bowlBase.castShadow = true
bowlBase.receiveShadow = true
bowlGroup.add(bowlBase)

const bowlRim = new THREE.Mesh(
  new THREE.TorusGeometry(0.93, 0.1, 8, 22),
  new THREE.MeshStandardMaterial({ color: 0x86b4d6, roughness: 0.4, metalness: 0.2 })
)
bowlRim.rotation.x = Math.PI / 2
bowlRim.position.y = 0.35
bowlGroup.add(bowlRim)

const kibbleMat = new THREE.MeshStandardMaterial({ color: 0x9a5a2a, roughness: 0.85 })
const KIBBLE_MAX = 18
const bowlFood = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.13, 0), kibbleMat, KIBBLE_MAX)
bowlFood.position.y = 0.34
bowlGroup.add(bowlFood)
const kibbleTransforms = []
for (let i = 0; i < KIBBLE_MAX; i++) {
  const a = (i / KIBBLE_MAX) * Math.PI * 2 + Math.random()
  const r = 0.15 + Math.random() * 0.5
  kibbleTransforms.push({
    x: Math.cos(a) * r,
    y: 0.06 + Math.random() * 0.08,
    z: Math.sin(a) * r,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI
  })
}
function layoutKibble(stock) {
  const shown = Math.min(KIBBLE_MAX, stock * 2)
  for (let i = 0; i < KIBBLE_MAX; i++) {
    const t = kibbleTransforms[i]
    dummy.position.set(t.x, t.y, t.z)
    dummy.rotation.set(t.rx, t.ry, t.rz)
    dummy.scale.setScalar(i < shown ? 1 : 0.0001)
    dummy.updateMatrix()
    bowlFood.setMatrixAt(i, dummy.matrix)
  }
  bowlFood.instanceMatrix.needsUpdate = true
}
layoutKibble(2)

/* --- stars + fireflies --- */
const starPositions = []
for (let i = 0; i < 420; i++) {
  const a = Math.random() * Math.PI * 2
  const r = 60 + Math.random() * 50
  const y = 14 + Math.random() * 60
  starPositions.push(Math.cos(a) * r, y, Math.sin(a) * r)
}
const starGeo = new THREE.BufferGeometry()
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
const starMat = new THREE.PointsMaterial({
  color: 0xfff6d2,
  size: 0.6,
  map: dotTex,
  transparent: true,
  opacity: 0,
  alphaTest: 0.02,
  depthWrite: false
})
const stars = new THREE.Points(starGeo, starMat)
scene.add(stars)

const fireflyPositions = []
for (let i = 0; i < 34; i++) {
  fireflyPositions.push((Math.random() - 0.5) * 34, 0.6 + Math.random() * 1.8, (Math.random() - 0.5) * 34)
}
const fireflyGeo = new THREE.BufferGeometry()
fireflyGeo.setAttribute('position', new THREE.Float32BufferAttribute(fireflyPositions, 3))
const fireflyMat = new THREE.PointsMaterial({
  color: 0xffe37a,
  size: 0.3,
  map: dotTex,
  transparent: true,
  opacity: 0,
  alphaTest: 0.02,
  depthWrite: false,
  blending: THREE.AdditiveBlending
})
const fireflies = new THREE.Points(fireflyGeo, fireflyMat)
scene.add(fireflies)
const fireflyBase = fireflyGeo.attributes.position.array.slice()

/* ------------------------------------------------------------------ *
 *  Puppy (all fours, built from primitives)
 * ------------------------------------------------------------------ */

function makePuppy() {
  const root = new THREE.Group()

  const fur = new THREE.MeshStandardMaterial({ color: 0xd79f63, roughness: 0.88 })
  const furLight = new THREE.MeshStandardMaterial({ color: 0xf2d9b3, roughness: 0.92 })
  const furDark = new THREE.MeshStandardMaterial({ color: 0xa96f3e, roughness: 0.9 })
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x241a16, roughness: 0.4 })
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1b1410, roughness: 0.15 })
  const collarMat = new THREE.MeshStandardMaterial({ color: 0x3f7fa8, roughness: 0.45, metalness: 0.15 })
  const tagMat = new THREE.MeshStandardMaterial({ color: 0xffcf4d, metalness: 0.85, roughness: 0.25 })

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), fur)
  body.scale.set(0.78, 0.72, 1.3)
  body.position.set(0, 0.64, 0.06)
  body.castShadow = true
  root.add(body)

  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 16), furLight)
  chest.scale.set(0.82, 0.8, 0.8)
  chest.position.set(0, 0.6, -0.47)
  chest.castShadow = true
  root.add(chest)

  const rump = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 14), fur)
  rump.scale.set(0.9, 0.9, 0.8)
  rump.position.set(0, 0.64, 0.58)
  rump.castShadow = true
  root.add(rump)

  const head = new THREE.Group()
  head.position.set(0, 0.96, -0.68)
  root.add(head)

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 18), fur)
  skull.scale.set(1, 0.96, 0.95)
  skull.castShadow = true
  head.add(skull)

  const blaze = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), furLight)
  blaze.scale.set(0.75, 0.9, 0.55)
  blaze.position.set(0, 0.13, -0.27)
  head.add(blaze)

  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 14), furLight)
  muzzle.scale.set(1, 0.82, 1.2)
  muzzle.position.set(0, -0.11, -0.29)
  head.add(muzzle)

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.078, 12, 10), noseMat)
  nose.position.set(0, -0.05, -0.48)
  head.add(nose)

  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.062, 12, 10), eyeMat)
    eye.position.set(sx * 0.15, 0.08, -0.32)
    head.add(eye)
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }))
    glint.position.set(sx * 0.155, 0.105, -0.365)
    head.add(glint)

    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 12), furDark)
    ear.scale.set(0.46, 0.95, 0.34)
    ear.position.set(sx * 0.34, 0.08, -0.01)
    ear.rotation.z = sx * 0.62
    ear.rotation.x = 0.18
    ear.castShadow = true
    head.add(ear)
    ear.userData.baseZ = ear.rotation.z
    if (!head.userData.ears) head.userData.ears = []
    head.userData.ears.push(ear)
  }

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.055, 8, 22), collarMat)
  collar.position.set(0, 0.86, -0.46)
  collar.rotation.x = 0.06
  root.add(collar)

  const tag = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 12), tagMat)
  tag.rotation.x = Math.PI / 2
  tag.position.set(0, 0.72, -0.7)
  root.add(tag)

  const legs = []
  const legData = [
    [-0.27, -0.46, false],
    [0.27, -0.46, false],
    [-0.3, 0.55, true],
    [0.3, 0.55, true]
  ]
  legData.forEach(([x, z, rear], i) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, 0.62, z)
    root.add(pivot)

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.085, 0.46, 8), fur)
    upper.position.y = -0.23
    upper.castShadow = true
    pivot.add(upper)

    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), furLight)
    paw.scale.set(1, 0.62, 1.35)
    paw.position.set(0, -0.47, -0.04)
    paw.castShadow = true
    pivot.add(paw)

    legs.push({ pivot, rear, phase: i % 2 ? Math.PI : 0 })
  })

  const tail = new THREE.Group()
  tail.position.set(0, 0.72, 0.72)
  root.add(tail)
  const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.09, 0.4, 8), fur)
  tailMesh.position.set(0, 0.1, 0.2)
  tailMesh.rotation.x = 1.25
  tailMesh.castShadow = true
  tail.add(tailMesh)
  const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), furLight)
  tailTip.position.set(0, 0.16, 0.4)
  tail.add(tailTip)

  root.userData = { body, head, tail, legs, chest }
  return root
}

const puppy = makePuppy()
puppy.scale.setScalar(1.3)
puppy.children.forEach((child) => {
  child.position.y -= 0.055
})
puppy.position.set(0, 0, 3)
puppy.rotation.y = Math.PI
scene.add(puppy)

const puppyShadow = blobShadow(2.3, 3.1, 0.95)
puppyShadow.position.set(0, 0.019, 3)
scene.add(puppyShadow)
const puppyRig = puppy.userData
const bodyBase = puppyRig.body.position.y

/* ------------------------------------------------------------------ *
 *  Bones, kibble, dig spots
 * ------------------------------------------------------------------ */

const TIERS = {
  nickel: { color: 0xaeb5bd, metalness: 0.55, roughness: 0.45, value: 10, label: 'Nickel' },
  silver: { color: 0xe3ecf5, metalness: 0.85, roughness: 0.28, value: 25, label: 'Silver' },
  gold: { color: 0xffc93c, metalness: 0.9, roughness: 0.22, value: 60, label: 'Gold' }
}

function makeBone(tier) {
  const t = TIERS[tier]
  const mat = new THREE.MeshStandardMaterial({
    color: t.color,
    metalness: t.metalness,
    roughness: t.roughness,
    emissive: new THREE.Color(tier === 'gold' ? 0x7a5200 : tier === 'silver' ? 0x263340 : 0x1c1f22),
    emissiveIntensity: tier === 'gold' ? 0.5 : 0.2
  })
  const g = new THREE.Group()
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.64, 10), mat)
  shaft.rotation.z = Math.PI / 2
  shaft.castShadow = true
  g.add(shaft)
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 10), mat)
      knob.position.set(sx * 0.34, sy * 0.1, 0)
      knob.castShadow = true
      g.add(knob)
    }
  }
  g.scale.setScalar(1.6)
  return g
}

function makeKibbleChunk() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0x9c5a2b, roughness: 0.8 })
  for (let i = 0; i < 3; i++) {
    const k = new THREE.Mesh(new THREE.DodecahedronGeometry(0.17, 0), mat)
    k.position.set((Math.random() - 0.5) * 0.22, 0.06 + i * 0.1, (Math.random() - 0.5) * 0.22)
    k.rotation.set(Math.random(), Math.random(), Math.random())
    k.castShadow = true
    g.add(k)
  }
  return g
}

const dirtPatchTex = canvasTexture(128, (ctx, s) => {
  const g = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(78,47,22,0.96)')
  g.addColorStop(0.5, 'rgba(84,52,26,0.82)')
  g.addColorStop(0.82, 'rgba(92,59,31,0.34)')
  g.addColorStop(1, 'rgba(92,59,31,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
})

const moundMat = new THREE.MeshStandardMaterial({ color: 0xa9784c, roughness: 1 })
const holeMat = new THREE.MeshStandardMaterial({ color: 0x4a3320, roughness: 1 })
const boneHintMat = new THREE.MeshStandardMaterial({ color: 0xe4d3b3, roughness: 0.85 })

const spots = []
const spotsGroup = new THREE.Group()
world.add(spotsGroup)
const spotStatics = new THREE.Group()
world.add(spotStatics)
const staticMeshes = []

const discMat = new THREE.MeshStandardMaterial({ map: dirtPatchTex, transparent: true, roughness: 1, depthWrite: false })

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function pickTier() {
  const r = Math.random()
  if (r < 0.2) return 'gold'
  if (r < 0.5) return 'silver'
  return 'nickel'
}

function bake(geometry, fn) {
  fn(geometry)
  return geometry
}

function clearSpots() {
  for (const mesh of staticMeshes) {
    spotStatics.remove(mesh)
    mesh.geometry.dispose()
  }
  staticMeshes.length = 0
  for (const s of spots) {
    spotsGroup.remove(s.group)
    s.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
    })
  }
  spots.length = 0
}

function addStatic(geometries, material, order) {
  if (!geometries.length) return
  const merged = mergeGeometries(geometries, false)
  geometries.forEach((g) => g.dispose())
  if (!merged) return
  const mesh = new THREE.Mesh(merged, material)
  mesh.renderOrder = order
  spotStatics.add(mesh)
  staticMeshes.push(mesh)
}

function generateSpots() {
  clearSpots()

  const discGeos = []
  const dentGeos = []
  const clodGeos = []
  const pebbleGeos = []
  let forcedGold = false

  let guard = 0
  while (spots.length < 13 && guard++ < 500) {
    const a = Math.random() * Math.PI * 2
    const r = rand(3.5, 12.5)
    const x = Math.cos(a) * r
    const z = -1 + Math.sin(a) * r
    if (z > 7.2) continue
    if (Math.hypot(x - KENNEL.x, z - KENNEL.z) < 5.4) continue
    if (Math.hypot(x - BOWL.x, z - BOWL.z) < 3.2) continue
    if (Math.hypot(x, z - 2.5) < 3.4) continue
    // keep the stone path from the kennel clear
    const px = -8.15
    const pz = -6.8
    const pdx = 8.0
    const pdz = 4.6
    const t = clamp(((x - px) * pdx + (z - pz) * pdz) / (pdx * pdx + pdz * pdz), 0, 1)
    if (Math.hypot(x - (px + pdx * t), z - (pz + pdz * t)) < 1.6) continue
    if (spots.some((s) => Math.hypot(s.group.position.x - x, s.group.position.z - z) < 3.2)) continue

    const isFood = forcedGold ? Math.random() < 0.36 : false
    const tier = isFood ? null : forcedGold ? 'gold' : pickTier()
    forcedGold = true

    const group = new THREE.Group()
    group.position.set(x, 0, z)
    spotsGroup.add(group)

    // static dirt patch, depression and clods are merged once for all spots
    discGeos.push(bake(new THREE.CircleGeometry(1.06, 24), (g) => g.rotateX(-Math.PI / 2).translate(x, 0.014, z)))
    dentGeos.push(bake(new THREE.CircleGeometry(0.3, 14), (g) => g.rotateX(-Math.PI / 2).translate(x, 0.05, z)))

    for (let i = 0; i < 3; i++) {
      const ang = Math.random() * Math.PI * 2
      const rad = 0.34 + Math.random() * 0.3
      clodGeos.push(
        bake(new THREE.SphereGeometry(0.07 + Math.random() * 0.04, 7, 5), (g) =>
          g.translate(x + Math.cos(ang) * rad, 0.05, z + Math.sin(ang) * rad)
        )
      )
    }
    for (let i = 0; i < 2; i++) {
      const ang = Math.random() * Math.PI * 2
      const rad = rand(0.62, 0.85)
      pebbleGeos.push(
        bake(new THREE.DodecahedronGeometry(0.08, 0), (g) =>
          g.translate(x + Math.cos(ang) * rad, 0.05, z + Math.sin(ang) * rad)
        )
      )
    }

    // a little bone half-buried in the disturbed earth marks the spot
    const hintAngle = Math.random() * Math.PI
    const hx = Math.cos(hintAngle)
    const hz = Math.sin(hintAngle)
    const hintGeos = [
      bake(new THREE.CapsuleGeometry(0.045, 0.24, 4, 8), (g) =>
        g.rotateZ(Math.PI / 2).rotateY(hintAngle).translate(0.02, 0.055, 0.02)
      )
    ]
    for (const end of [-1, 1]) {
      for (const side of [-1, 1]) {
        hintGeos.push(
          bake(new THREE.SphereGeometry(0.058, 8, 6), (g) =>
            g.translate(
              0.02 + hx * end * 0.16 - hz * side * 0.04,
              0.05,
              0.02 + hz * end * 0.16 + hx * side * 0.04
            )
          )
        )
      }
    }
    const hintMerged = mergeGeometries(hintGeos, false)
    hintGeos.forEach((g) => g.dispose())
    const hint = new THREE.Mesh(hintMerged, boneHintMat)
    group.add(hint)

    const item = isFood ? makeKibbleChunk() : makeBone(tier)
    item.visible = false
    item.position.y = -0.45
    group.add(item)

    spots.push({
      group,
      hint,
      item,
      isFood,
      tier,
      dug: false,
      hole: null,
      progress: 0,
      itemT: 0,
      seed: Math.random() * 10
    })
  }

  addStatic(discGeos, discMat, 1)
  addStatic(dentGeos, holeMat, 2)
  addStatic(clodGeos, moundMat, 3)
  addStatic(pebbleGeos, stoneMat, 4)
}

/* ------------------------------------------------------------------ *
 *  Particles
 * ------------------------------------------------------------------ */

class ParticleBurst {
  constructor(capacity, size, additive) {
    this.capacity = capacity
    this.parts = []
    this.geo = new THREE.BufferGeometry()
    this.positions = new Float32Array(capacity * 3)
    this.colors = new Float32Array(capacity * 3)
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    this.points = new THREE.Points(
      this.geo,
      new THREE.PointsMaterial({
        size,
        map: dotTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        alphaTest: 0.08,
        depthWrite: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
      })
    )
    this.points.frustumCulled = false
    scene.add(this.points)
  }

  spawn(origin, count, opts = {}) {
    const { spread = 0.4, speed = 2.4, up = 2.6, life = 0.9, colors = [0x7a5230], gravity = 8, size = 0.16 } = opts
    for (let i = 0; i < count; i++) {
      if (this.parts.length >= this.capacity) this.parts.shift()
      this.parts.push({
        x: origin.x + (Math.random() - 0.5) * spread,
        y: origin.y + Math.random() * 0.25,
        z: origin.z + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * speed,
        vy: Math.random() * up + 0.6,
        vz: (Math.random() - 0.5) * speed,
        life: life * (0.65 + Math.random() * 0.6),
        max: life,
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
        size
      })
    }
  }

  update(dt) {
    const n = this.parts.length
    for (let i = n - 1; i >= 0; i--) {
      const p = this.parts[i]
      p.life -= dt
      if (p.life <= 0) {
        this.parts.splice(i, 1)
        continue
      }
      p.vy -= 8 * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.z += p.vz * dt
      if (p.y < 0.05) {
        p.y = 0.05
        p.vy *= -0.25
        p.vx *= 0.6
        p.vz *= 0.6
      }
    }
    for (let i = 0; i < this.capacity; i++) {
      const p = this.parts[i]
      if (!p) {
        this.positions[i * 3 + 1] = -999
        this.colors[i * 3] = this.colors[i * 3 + 1] = this.colors[i * 3 + 2] = 0
        continue
      }
      this.positions[i * 3] = p.x
      this.positions[i * 3 + 1] = p.y
      this.positions[i * 3 + 2] = p.z
      const fade = Math.min(1, p.life / (p.max * 0.5))
      this.colors[i * 3] = p.color.r * fade
      this.colors[i * 3 + 1] = p.color.g * fade
      this.colors[i * 3 + 2] = p.color.b * fade
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.color.needsUpdate = true
    this.points.material.size = 0.16
  }
}

const dirtBurst = new ParticleBurst(260, 0.17, false)
const sparkBurst = new ParticleBurst(160, 0.14, true)

/* ------------------------------------------------------------------ *
 *  Audio (tiny, created after a gesture)
 * ------------------------------------------------------------------ */

let audioCtx = null
function tone(freq, dur = 0.12, type = 'sine', vol = 0.05, slide = 0) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)()
    if (audioCtx.state === 'suspended') audioCtx.resume()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq + slide), audioCtx.currentTime + dur)
    gain.gain.setValueAtTime(vol, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur)
    osc.connect(gain).connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + dur)
  } catch {}
}

/* ------------------------------------------------------------------ *
 *  Game state
 * ------------------------------------------------------------------ */

const DAY_LEN = 105
const DUSK_LEN = 13
const NIGHT_LEN = 20
const CYCLE_LEN = DAY_LEN + DUSK_LEN + NIGHT_LEN

const state = {
  running: false,
  sleeping: false,
  sleepT: 0,
  autoSlept: false,
  time: 0,
  day: 1,
  rank: 1,
  score: 0,
  hunger: 100,
  life: 100,
  counts: { nickel: 0, silver: 0, gold: 0 },
  foodStock: 2,
  cycleT: 29,
  phase: 'day',
  night: 0,
  speed: 0,
  digging: false,
  digSpot: null,
  shake: 0,
  eatT: 0,
  toastT: 0,
  duskWarned: false,
  nightWarned: false,
  walking: false,
  best: Number(localStorage.getItem('boneGarden.best') || 0),
  fps: 0,
  frameCount: 0,
  fpsWindow: 0
}

const input = {
  x: 0,
  y: 0,
  mag: 0,
  dig: false,
  keys: new Set(),
  stickActive: false,
  stickX: 0,
  stickY: 0,
  tilt: false,
  tiltReady: false,
  baseBeta: null,
  baseGamma: null,
  tx: 0,
  ty: 0
}

ui.bestScore.textContent = String(state.best)

/* ------------------------------------------------------------------ *
 *  UI helpers
 * ------------------------------------------------------------------ */

let toastTimer = null
function toast(text, kind = '') {
  toastEl.textContent = text
  toastEl.className = 'toast show ' + kind
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastEl.className = 'toast ' + kind
  }, 3000)
}

let lastPrompt = ''
function setPrompt(text) {
  if (text === lastPrompt) return
  lastPrompt = text
  if (!text) {
    promptEl.className = 'prompt'
    promptEl.innerHTML = ''
    return
  }
  promptEl.className = 'prompt show'
  promptEl.innerHTML = text
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt))

function dampAngle(a, b, lambda, dt) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI
  if (d < -Math.PI) d += Math.PI * 2
  return a + d * (1 - Math.exp(-lambda * dt))
}

/* ------------------------------------------------------------------ *
 *  Camera
 * ------------------------------------------------------------------ */

const camPos = new THREE.Vector3(0, 11, 18)
const camLook = new THREE.Vector3(0, 1, 0)
const tmpV = new THREE.Vector3()

function cameraOffset() {
  const aspect = window.innerWidth / window.innerHeight
  if (aspect < 0.8) return new THREE.Vector3(0, 12.2, 14.8)
  if (aspect < 1.2) return new THREE.Vector3(0, 10.4, 13.0)
  return new THREE.Vector3(0, 7.6, 10.6)
}

function updateCamera(dt) {
  if (!state.running) {
    const t = state.time * 0.18
    camPos.set(Math.cos(t) * 10.5, 5.4 + Math.sin(t * 0.7) * 0.7, Math.sin(t) * 10.5 + 2)
    camLook.set(0, 1.0, 2)
  } else {
    const off = cameraOffset()
    const target = tmpV.set(puppy.position.x + off.x, off.y, puppy.position.z + off.z)
    const k = 1 - Math.exp(-3.4 * dt)
    camPos.lerp(target, k)
    camLook.lerp(new THREE.Vector3(puppy.position.x, 1.05, puppy.position.z), 1 - Math.exp(-6 * dt))
  }
  camPos.x = clamp(camPos.x, -25, 25)
  camPos.z = clamp(camPos.z, -25, 25)
  if (state.shake > 0.001) {
    camPos.x += (Math.random() - 0.5) * state.shake
    camPos.y += (Math.random() - 0.5) * state.shake
    state.shake *= Math.exp(-6 * dt)
  }
  camera.position.copy(camPos)
  camera.lookAt(camLook)
}

/* ------------------------------------------------------------------ *
 *  Input
 * ------------------------------------------------------------------ */

const STICK_RADIUS = 42

function setStickFromEvent(e) {
  const rect = stick.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  let dx = e.clientX - cx
  let dy = e.clientY - cy
  const len = Math.hypot(dx, dy)
  if (len > STICK_RADIUS) {
    dx = (dx / len) * STICK_RADIUS
    dy = (dy / len) * STICK_RADIUS
  }
  knob.style.transform = `translate(${dx}px, ${dy}px)`
  input.stickX = dx / STICK_RADIUS
  input.stickY = dy / STICK_RADIUS
  input.mag = Math.min(1, len / STICK_RADIUS)
}

stick.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  stick.setPointerCapture(e.pointerId)
  input.stickActive = true
  setStickFromEvent(e)
})
stick.addEventListener('pointermove', (e) => {
  if (!input.stickActive) return
  e.preventDefault()
  setStickFromEvent(e)
})
function releaseStick(e) {
  if (!input.stickActive) return
  input.stickActive = false
  input.stickX = input.stickY = 0
  input.mag = 0
  knob.style.transform = 'translate(0px, 0px)'
  if (e && stick.hasPointerCapture && stick.hasPointerCapture(e.pointerId)) stick.releasePointerCapture(e.pointerId)
}
stick.addEventListener('pointerup', releaseStick)
stick.addEventListener('pointercancel', releaseStick)
stick.addEventListener('lostpointercapture', releaseStick)

function holdButton(btn, onDown, onUp) {
  const down = (e) => {
    e.preventDefault()
    btn.classList.add('held')
    try {
      btn.setPointerCapture(e.pointerId)
    } catch {}
    onDown()
  }
  const up = (e) => {
    e.preventDefault()
    btn.classList.remove('held')
    onUp()
  }
  btn.addEventListener('pointerdown', down)
  btn.addEventListener('pointerup', up)
  btn.addEventListener('pointercancel', up)
  btn.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse' && e.buttons === 0) return
    up(e)
  })
}

holdButton(
  digBtn,
  () => {
    input.dig = true
  },
  () => {
    input.dig = false
  }
)

eatBtn.addEventListener('click', (e) => {
  e.preventDefault()
  tryEat()
})

/* tilt */
async function enableTilt() {
  if (input.tilt) {
    input.tilt = false
    tiltBtn.classList.remove('on')
    toast('Tilt steering off')
    return
  }
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      const result = await DeviceOrientationEvent.requestPermission()
      if (result !== 'granted') {
        toast('Motion permission denied — joystick still works', 'warn')
        return
      }
    }
  } catch {
    toast('Motion unavailable — joystick still works', 'warn')
    return
  }
  if (typeof DeviceOrientationEvent === 'undefined') {
    toast('No tilt sensor — joystick still works', 'warn')
    return
  }
  input.baseBeta = null
  input.baseGamma = null
  input.tilt = true
  tiltBtn.classList.add('on')
  toast('Tilt steering on — shift your device to move')
  tone(520, 0.1, 'sine', 0.04)
}
tiltBtn.addEventListener('click', enableTilt)

window.addEventListener('deviceorientation', (e) => {
  if (!input.tilt) return
  if (e.beta === null || e.gamma === null) return
  if (input.baseBeta === null) {
    input.baseBeta = e.beta
    input.baseGamma = e.gamma
  }
  input.tiltReady = true
  input.tx = clamp((e.gamma - input.baseGamma) / 22, -1, 1)
  input.ty = clamp((e.beta - input.baseBeta) / 22, -1, 1)
})

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase()
  if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault()
  input.keys.add(k)
  if (k === ' ') input.dig = true
  if (k === 'e') tryEat()
  if (k === 't') enableTilt()
  if ((k === 'enter' || k === ' ') && !state.running) startGame()
})
window.addEventListener('keyup', (e) => {
  const k = e.key.toLowerCase()
  input.keys.delete(k)
  if (k === ' ') input.dig = false
})
window.addEventListener('blur', () => {
  input.keys.clear()
  input.dig = false
  releaseStick()
})

function readInput() {
  let x = 0
  let y = 0
  if (input.stickActive) {
    x = input.stickX
    y = input.stickY
  } else {
    const k = input.keys
    if (k.has('a') || k.has('arrowleft')) x -= 1
    if (k.has('d') || k.has('arrowright')) x += 1
    if (k.has('w') || k.has('arrowup')) y -= 1
    if (k.has('s') || k.has('arrowdown')) y += 1
  }
  if (input.tilt && input.tiltReady) {
    x += input.tx
    y += input.ty
  }
  const mag = Math.min(1, Math.hypot(x, y))
  if (mag < 0.16) return { x: 0, y: 0, mag: 0 }
  const norm = Math.hypot(x, y) || 1
  return { x: x / norm, y: y / norm, mag }
}

/* ------------------------------------------------------------------ *
 *  Gameplay
 * ------------------------------------------------------------------ */

function nearestSpot(maxDist = 2.7) {
  let best = null
  let bestD = maxDist
  for (const s of spots) {
    if (s.dug) continue
    const d = Math.hypot(puppy.position.x - s.group.position.x, puppy.position.z - s.group.position.z)
    if (d < bestD) {
      bestD = d
      best = s
    }
  }
  return best
}

function distTo(v) {
  return Math.hypot(puppy.position.x - v.x, puppy.position.z - v.z)
}

function updateSpots(dt) {
  for (const s of spots) {
    if (!s.dug) {
      if (s.progress > 0) {
        const pulse = 1 + Math.sin(state.time * 8) * 0.05
        s.hint.scale.setScalar(pulse)
      }
      continue
    }
    if (s.itemT < 1.6) {
      s.itemT += dt
      const t = clamp(s.itemT / 0.45, 0, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      s.item.visible = true
      s.item.position.y = -0.45 + ease * 1.1
      s.item.rotation.y += dt * 3.2
      if (t >= 1) s.item.position.y = 0.78 + Math.sin(state.time * 3 + s.seed) * 0.06
      if (s.itemT > 1.25) s.item.visible = false
    }
  }
}

function completeSpot(spot) {
  spot.dug = true
  spot.hint.visible = false
  const hole = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), holeMat)
  hole.rotation.x = -Math.PI / 2
  hole.position.y = 0.056
  spot.group.add(hole)
  spot.hole = hole
  spot.itemT = 0
  state.digging = false
  state.digSpot = null

  const pos = spot.group.position
  if (spot.isFood) {
    state.foodStock += 2
    dirtBurst.spawn(pos, 26, { spread: 0.8, speed: 3.2, up: 3.4, life: 1.1, colors: [0x7a5230, 0x9a6c42, 0xb58455] })
    toast('Kibble dug up! +2 in your bowl 🥣')
    tone(420, 0.1, 'triangle', 0.05, 160)
  } else {
    const tier = spot.tier
    const t = TIERS[tier]
    state.counts[tier] += 1
    state.score += t.value
    dirtBurst.spawn(pos, 34, { spread: 0.9, speed: 3.6, up: 4, life: 1.2, colors: [0x7a5230, 0x9a6c42, 0x6b4726] })
    sparkBurst.spawn(pos, tier === 'gold' ? 40 : 18, {
      spread: 0.5,
      speed: 2.2,
      up: 3.4,
      life: 1.15,
      colors: tier === 'gold' ? [0xffe27a, 0xffb52e, 0xfff6c9] : tier === 'silver' ? [0xffffff, 0xd7e6f5] : [0xc8ced6, 0x9aa2ab]
    })

    if (tier === 'gold') {
      state.rank += 1
      state.hunger = clamp(state.hunger + 25, 0, 100)
      state.life = clamp(state.life + 15, 0, 100)
      state.shake = 0.55
      toast(`GOLD BONE! +${t.value} · LEVEL UP — now level ${state.rank} ⭐`, 'gold')
      tone(660, 0.16, 'triangle', 0.06, 340)
      setTimeout(() => tone(880, 0.22, 'triangle', 0.05, 260), 130)
    } else {
      toast(`${t.label} bone +${t.value}${tier === 'silver' ? ' 🦴' : ''}`)
      tone(tier === 'silver' ? 560 : 480, 0.12, 'triangle', 0.05, 140)
    }
  }
  state.shake = Math.max(state.shake, 0.12)
}

function tryEat() {
  if (!state.running || state.sleeping) return
  if (state.digging) return
  if (distTo(BOWL) > 3.6) {
    toast('Your bowl is by the kennel — head over to eat', 'warn')
    return
  }
  if (state.foodStock <= 0) {
    toast('Bowl is empty — dig up kibble in the garden', 'warn')
    tone(200, 0.14, 'square', 0.04)
    return
  }
  if (state.hunger >= 99 && state.life >= 99) {
    toast('You are stuffed — save it for later')
    return
  }
  state.foodStock -= 1
  state.hunger = clamp(state.hunger + 30, 0, 100)
  state.life = clamp(state.life + 10, 0, 100)
  state.eatT = 0.9
  dirtBurst.spawn(tmpV.set(BOWL.x, 0.45, BOWL.z), 12, { spread: 0.5, speed: 1.4, up: 1.6, life: 0.5, colors: [0x9c5a2b, 0x7d4720] })
  toast('Nom nom — bowl-fed and feeling good 🍖')
  tone(340, 0.09, 'sine', 0.05, 120)
  setTimeout(() => tone(420, 0.09, 'sine', 0.04, 80), 110)
}

function updateNeeds(dt) {
  if (state.sleeping) return
  const drain = state.phase === 'night' ? 0.34 : 0.58
  state.hunger = clamp(state.hunger - drain * dt, 0, 100)
  if (state.hunger <= 0) {
    state.life = clamp(state.life - 3.2 * dt, 0, 100)
  } else if (state.hunger > 55) {
    state.life = clamp(state.life + 1.4 * dt, 0, 100)
  }
  if (state.life <= 0) gameOver()
}

function setPhase(p) {
  if (state.phase === p) return
  state.phase = p
  if (p === 'dusk' && !state.duskWarned) {
    state.duskWarned = true
    toast('Sunset — your owner is calling you to the kennel 🌇', 'warn')
    tone(300, 0.2, 'sine', 0.04)
  }
  if (p === 'night' && !state.nightWarned) {
    state.nightWarned = true
    toast('Night — get inside your kennel to sleep 🌙', 'warn')
  }
}

function updateCycle(dt) {
  if (state.sleeping) {
    state.sleepT += dt
    if (state.sleepT > 2.9) nextDay()
    return
  }
  state.cycleT += dt
  const t = state.cycleT

  if (t < DAY_LEN) setPhase('day')
  else if (t < DAY_LEN + DUSK_LEN) setPhase('dusk')
  else setPhase('night')

  if (state.phase === 'night') {
    if (distTo(KENNEL) < 3.6) startSleep(false)
    else if (t > CYCLE_LEN) startSleep(true)
  }
}

function startSleep(auto) {
  if (state.sleeping) return
  state.sleeping = true
  state.autoSlept = auto
  state.sleepT = 0
  state.digging = false
  state.digSpot = null
  input.dig = false
  digBtn.classList.remove('held')
  hud.classList.remove('visible')
  setPrompt('')
  sleepScreen.querySelector('.tagline').textContent = auto
    ? 'You dozed off in the garden. Your owner carried you to the kennel — try to be home before nightfall tomorrow.'
    : 'Your owner latches the kennel door. Sleep tight — the garden refills by morning.'
  sleepScreen.classList.remove('hidden')
  tone(392, 0.3, 'sine', 0.04, -80)
  setTimeout(() => tone(261, 0.5, 'sine', 0.04, -40), 220)
}

function nextDay() {
  state.sleeping = false
  state.day += 1
  state.cycleT = 2
  state.duskWarned = false
  state.nightWarned = false
  state.hunger = clamp(state.hunger + (state.autoSlept ? 12 : 26), 0, 100)
  state.life = clamp(state.life + (state.autoSlept ? 14 : 24), 0, 100)
  state.foodStock += 2
  generateSpots()
  puppy.position.set(KENNEL.x + 1.4, 0, KENNEL.z - 3.4)
  puppy.rotation.y = -0.6
  sleepScreen.classList.add('hidden')
  hud.classList.add('visible')
  toast(`Good morning! Day ${state.day} — fresh bones in the garden ☀️`)
  tone(523, 0.12, 'sine', 0.05, 120)
  setTimeout(() => tone(659, 0.16, 'sine', 0.04, 80), 140)
}

function gameOver() {
  if (!state.running) return
  state.running = false
  state.digging = false
  const bones = state.counts.nickel + state.counts.silver + state.counts.gold
  if (state.score > state.best) {
    state.best = state.score
    localStorage.setItem('boneGarden.best', String(state.best))
  }
  ui.bestScore.textContent = String(state.best)
  ui.endScore.textContent = String(state.score)
  ui.endBones.textContent = String(bones)
  ui.endLevel.textContent = String(state.day)
  ui.endMessage.textContent =
    state.foodStock > 0
      ? 'Your life bar gave out with food still in the bowl. Eat sooner next time.'
      : 'Your bowl ran dry and your life bar gave out. Dig kibble before you get hungry.'
  endScreen.classList.remove('hidden')
  hud.classList.remove('visible')
  setPrompt('')
  tone(330, 0.3, 'sine', 0.05, -120)
  setTimeout(() => tone(247, 0.5, 'sine', 0.05, -80), 200)
}

/* ------------------------------------------------------------------ *
 *  Movement + animation
 * ------------------------------------------------------------------ */

const walkState = { phase: 0, idleT: 0 }
let stockKey = -1

function updateMovement(dt, move) {
  const moving = !state.sleeping && move.mag > 0.16 && !state.digging
  state.walking = moving
  let speed = 0
  if (moving) {
    const runSpeed = 5.1
    speed = runSpeed * clamp(move.mag, 0.35, 1)
    puppy.position.x += move.x * speed * dt
    puppy.position.z += move.y * speed * dt
    puppy.position.x = clamp(puppy.position.x, -WORLD_LIMIT, WORLD_LIMIT)
    puppy.position.z = clamp(puppy.position.z, -WORLD_LIMIT, WORLD_LIMIT)
    const targetYaw = Math.atan2(-move.x, -move.y)
    puppy.rotation.y = dampAngle(puppy.rotation.y, targetYaw, 12, dt)
  } else if (state.digging && state.digSpot) {
    const dx = puppy.position.x - state.digSpot.group.position.x
    const dz = puppy.position.z - state.digSpot.group.position.z
    const yaw = Math.atan2(-dx, -dz)
    puppy.rotation.y = dampAngle(puppy.rotation.y, yaw, 8, dt)
  }
  state.speed = damp(state.speed, speed, 10, dt)
}

function animatePuppy(dt) {
  const rig = puppyRig
  const speedN = clamp(state.speed / 5.1, 0, 1)
  const moving = speedN > 0.05

  if (moving) walkState.phase += dt * (4.6 + speedN * 7.5)
  else walkState.phase += dt * 1.2

  const amp = state.digging ? 0 : 0.78 * speedN
  rig.legs.forEach((leg, i) => {
    if (state.digging) {
      if (leg.rear) {
        leg.pivot.rotation.x = 0.55 + Math.sin(state.time * 24 + i * Math.PI) * 0.85
      } else {
        leg.pivot.rotation.x = -0.22 + Math.sin(state.time * 6 + i) * 0.05
      }
    } else {
      const swing = Math.sin(walkState.phase + leg.phase) * amp
      leg.pivot.rotation.x = swing
      if (moving) leg.pivot.position.y = 0.62 + Math.max(0, Math.cos(walkState.phase + leg.phase)) * 0.045
    }
  })

  // body bob + dig posture
  const bob = moving ? Math.abs(Math.sin(walkState.phase)) * 0.024 * speedN : Math.sin(state.time * 1.7) * 0.01
  rig.body.position.y = damp(rig.body.position.y, bodyBase + bob, 12, dt)
  rig.chest.position.y = rig.body.position.y - 0.04
  rig.body.rotation.x = damp(rig.body.rotation.x, state.digging ? -0.1 : 0, 8, dt)

  // head: look down while digging / eating, gentle bob otherwise
  let headTarget = 0
  if (state.digging) headTarget = 0.42
  else if (state.eatT > 0) headTarget = 0.55
  else headTarget = moving ? Math.sin(walkState.phase * 2) * 0.06 : Math.sin(state.time * 0.9) * 0.03
  rig.head.rotation.x = damp(rig.head.rotation.x, headTarget, 10, dt)
  rig.head.position.y = damp(rig.head.position.y, 0.96 + bob * 0.8, 12, dt)

  // tail wag
  const wagSpeed = moving ? 12 : 7
  const wagAmp = state.digging ? 0.2 : moving ? 0.6 : 0.35
  rig.tail.rotation.y = Math.sin(state.time * wagSpeed) * wagAmp
  rig.tail.rotation.x = damp(rig.tail.rotation.x, state.digging ? 0.4 : 0, 8, dt)

  // ears flop a little
  if (rig.head.userData.ears) {
    rig.head.userData.ears.forEach((ear) => {
      const base = ear.userData.baseZ
      ear.rotation.z = base + Math.sin(state.time * (moving ? 12 : 2.2) + base) * (moving ? 0.1 : 0.03)
    })
  }

  if (state.eatT > 0) state.eatT = Math.max(0, state.eatT - dt)

  puppyShadow.position.set(puppy.position.x, 0.019, puppy.position.z)
  puppyShadow.rotation.z = -puppy.rotation.y
}

function updateWorld(dt) {
  const night = state.night
  const t = state.cycleT

  // sky colour keyframes
  const daySky = new THREE.Color(0x9fd0f0)
  const duskSky = new THREE.Color(0xff9b62)
  const nightSky = new THREE.Color(0x0a1226)
  let sky
  if (t < DAY_LEN * 0.78) sky = daySky.clone()
  else if (t < DAY_LEN) sky = daySky.clone().lerp(duskSky, (t - DAY_LEN * 0.78) / (DAY_LEN * 0.22))
  else if (t < DAY_LEN + DUSK_LEN) sky = duskSky.clone().lerp(nightSky, (t - DAY_LEN) / DUSK_LEN)
  else sky = nightSky.clone()
  // night transitions back to dawn after sleeping is handled by nextDay reset

  state.night = damp(state.night, state.phase === 'night' ? 1 : state.phase === 'dusk' ? 0.55 : 0, 3, dt)

  scene.background.copy(sky)
  scene.fog.color.copy(sky)
  scene.fog.near = 32 - night * 8
  scene.fog.far = 70 - night * 18

  hemi.color.copy(sky).lerp(new THREE.Color(0x9ab7ff), 0.35 * night)
  hemi.groundColor.setHex(0x40552f)
  hemi.intensity = 1.1 - night * 0.72

  const sunAngle = clamp(t / (DAY_LEN + DUSK_LEN), 0, 1) * Math.PI
  sun.position.set(Math.cos(Math.PI - sunAngle) * 30, 14 + Math.max(0, Math.sin(sunAngle)) * 18, 14)
  const warmth = t > DAY_LEN * 0.78 ? clamp((t - DAY_LEN * 0.78) / (DAY_LEN * 0.22), 0, 1) : 0
  sun.color.setHex(0xfff2d6).lerp(new THREE.Color(0xff9a52), Math.max(warmth * 0.85, state.phase === 'dusk' ? 0.85 : 0))
  sun.intensity = (1.9 - night * 1.72) * (state.phase === 'night' ? 1 : 1)
  sun.target.position.set(puppy.position.x, 0, puppy.position.z)

  renderer.toneMappingExposure = 1.06 - night * 0.24

  kennelLight.intensity = night * 2.2 + (state.phase === 'dusk' ? 0.7 : 0)
  doorwayGlow.material.opacity = 0.05 + night * 0.34
  beacon.visible = state.phase === 'night' || state.phase === 'dusk'
  if (beacon.visible) {
    beacon.position.y = 4.9 + Math.sin(state.time * 2.2) * 0.25
    beacon.rotation.y += dt * 1.8
  }

  starMat.opacity = clamp(night * 1.15, 0, 1)
  fireflyMat.opacity = night * 0.95
  if (fireflyMat.opacity > 0.02) {
    const arr = fireflyGeo.attributes.position.array
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = fireflyBase[i] + Math.sin(state.time * 0.7 + i) * 1.4
      arr[i + 1] = fireflyBase[i + 1] + Math.sin(state.time * 1.1 + i * 0.7) * 0.4
      arr[i + 2] = fireflyBase[i + 2] + Math.cos(state.time * 0.6 + i * 0.3) * 1.4
    }
    fireflyGeo.attributes.position.needsUpdate = true
  }

  // bowl stock visual
  if (stockKey !== state.foodStock) {
    stockKey = state.foodStock
    layoutKibble(state.foodStock)
  }
}

function updateUI() {
  ui.lifeFill.style.width = `${clamp(state.life, 0, 100)}%`
  ui.foodFill.style.width = `${clamp(state.hunger, 0, 100)}%`
  ui.lifeVal.textContent = String(Math.round(state.life))
  ui.foodVal.textContent = String(Math.round(state.hunger))
  ui.lifeFill.style.background =
    state.life < 25 ? 'linear-gradient(90deg,#ff5f5f,#c81f2c)' : 'linear-gradient(90deg,#ff8a9b,#ef4f67)'

  ui.cntNickel.textContent = String(state.counts.nickel)
  ui.cntSilver.textContent = String(state.counts.silver)
  ui.cntGold.textContent = String(state.counts.gold)
  ui.cntFood.textContent = String(state.foodStock)
  ui.scoreVal.textContent = String(state.score)

  ui.dayNum.textContent = `DAY ${state.day}${state.rank > 1 ? ` · ⭐${state.rank}` : ''}`

  let icon = '☀️'
  let label = 'Midday'
  if (state.phase === 'dusk') {
    icon = '🌇'
    label = 'Sunset'
  } else if (state.phase === 'night') {
    icon = '🌙'
    label = 'Night'
  } else if (state.cycleT < 22) {
    icon = '🌅'
    label = 'Morning'
  } else if (state.cycleT > DAY_LEN * 0.66) {
    icon = '🌤️'
    label = 'Afternoon'
  }
  ui.skyIcon.textContent = icon
  ui.clockLabel.textContent = label

  // prompts
  if (!state.running) {
    setPrompt('')
  } else if (state.sleeping) {
    setPrompt('')
  } else if (state.phase === 'night') {
    setPrompt('🌙 <b>Bedtime!</b> Walk into your kennel to sleep')
  } else if (state.digging) {
    setPrompt('Digging with your back paws… keep holding <b>DIG</b>')
  } else if (Math.hypot(puppy.position.x - BOWL.x, puppy.position.z - BOWL.z) < 3.6) {
    setPrompt(state.foodStock > 0 ? `Tap <b>EAT</b> — ${state.foodStock} kibble in the bowl` : 'Bowl is empty — dig for kibble 🍖')
  } else if (state.hunger < 28) {
    setPrompt('Hungry! Dig kibble, then eat at your bowl 🍖')
  } else {
    const s = nearestSpot(2.7)
    setPrompt(s ? 'Hold <b>DIG</b> to dig with your back paws' : '')
  }

  const showMeter = state.digging && state.digSpot
  digMeter.classList.toggle('show', Boolean(showMeter))
  if (showMeter) digMeterFill.style.width = `${clamp(state.digSpot.progress, 0, 1) * 100}%`
}

/* ------------------------------------------------------------------ *
 *  Start / restart
 * ------------------------------------------------------------------ */

function resetGame() {
  state.running = true
  state.sleeping = false
  state.time = 0
  state.day = 1
  state.rank = 1
  state.score = 0
  state.hunger = 100
  state.life = 100
  state.counts = { nickel: 0, silver: 0, gold: 0 }
  state.foodStock = 2
  state.cycleT = 29
  state.phase = 'day'
  state.night = 0
  state.shake = 0
  state.digging = false
  state.digSpot = null
  state.duskWarned = false
  state.nightWarned = false
  state.autoSlept = false
  state.toastT = 0
  walkState.phase = 0

  puppy.position.set(0, 0, 2.5)
  puppy.rotation.y = Math.PI
  generateSpots()
  camPos.set(0, 12, 18)
  camLook.set(0, 1, 0)
  setPrompt('')
  lastPrompt = ''
  digMeter.classList.remove('show')
  endScreen.classList.add('hidden')
  sleepScreen.classList.add('hidden')
  startScreen.classList.add('hidden')
  hud.classList.add('visible')
  toast('Find the mounds — hold DIG to dig 🐾')
  tone(523, 0.1, 'sine', 0.05, 100)
}

function startGame() {
  if (state.running) return
  resetGame()
  window.__gameStarted = true
}

startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

/* ------------------------------------------------------------------ *
 *  Main loop
 * ------------------------------------------------------------------ */

function resize() {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setPixelRatio(softwareRenderer ? 1 : Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', () => setTimeout(resize, 150))

let lastTime = performance.now()
let frameCount = 0

function frame(now) {
  const elapsed = Math.max(0.001, (now - lastTime) / 1000)
  const dt = Math.min(0.05, elapsed)
  // day/night, hunger and sleep run on wall-clock so slow devices stay in sync
  const simDt = Math.min(0.25, elapsed)
  lastTime = now
  state.time += dt
  state.frameCount += 1
  state.fpsWindow += elapsed
  if (state.fpsWindow >= 1) {
    state.fps = Math.round(state.frameCount / state.fpsWindow)
    state.frameCount = 0
    state.fpsWindow = 0
  }

  if (state.running) {
    const move = readInput()

    // digging
    const target = nearestSpot(2.7)
    if (!state.sleeping && input.dig && move.mag < 0.35 && target) {
      if (!state.digging) {
        state.digging = true
        state.digSpot = target
      }
      target.progress += simDt / 1.9
      if (Math.random() < 0.55) {
        const back = new THREE.Vector3(
          puppy.position.x + Math.sin(puppy.rotation.y) * 0.85,
          0.15,
          puppy.position.z + Math.cos(puppy.rotation.y) * 0.85
        )
        dirtBurst.spawn(back, 2, { spread: 0.5, speed: 1.8, up: 2.2, life: 0.65, colors: [0x7a5230, 0x9a6c42] })
      }
      if (target.progress >= 1) completeSpot(target)
    } else {
      state.digging = false
      state.digSpot = null
    }

    updateMovement(dt, move)

    updateNeeds(simDt)
    updateCycle(simDt)
    updateSpots(dt)
    updateWorld(dt)
    updateUI()
  } else {
    // menu: idle world, slow camera orbit handled in updateCamera
    updateWorld(dt)
  }

  animatePuppy(dt)
  dirtBurst.update(dt)
  sparkBurst.update(dt)
  updateCamera(dt)

  renderer.render(scene, camera)
  frameCount++
  if (frameCount === 3) window.__gameReady = true
  requestAnimationFrame(frame)
}

/* ------------------------------------------------------------------ *
 *  Boot
 * ------------------------------------------------------------------ */

generateSpots()
resize()
updateWorld(0.016)
updateCamera(0.016)
requestAnimationFrame(frame)

window.__game = {
  start: startGame,
  state,
  puppy,
  spots,
  get ready() {
    return Boolean(window.__gameReady)
  },
  get started() {
    return Boolean(window.__gameStarted)
  },
  get fps() {
    return state.fps
  },
  get rendererName() {
    return rendererName
  },
  get softwareRenderer() {
    return softwareRenderer
  },
  get renderInfo() {
    return {
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      points: renderer.info.render.points,
      programs: renderer.info.programs?.length ?? 0
    }
  },
  // Used by capture/verification to stage a dig without hunting for a mound.
  teleportToSpot() {
    const bones = spots.filter((s) => !s.dug && !s.isFood)
    const central = bones.filter((s) => Math.abs(s.group.position.x) < 8 && Math.abs(s.group.position.z + 1) < 5)
    const spot = central[0] || bones[0] || spots.find((s) => !s.dug)
    if (!spot) return false
    puppy.position.set(spot.group.position.x + 1.15, 0, spot.group.position.z + 0.15)
    state.digging = false
    state.digSpot = null
    return true
  }
}
