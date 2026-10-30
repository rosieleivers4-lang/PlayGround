import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

import { createTextureLibrary } from './textures.js'
import { buildLevel } from './level.js'
import { createWeaponSystem } from './weapons.js'
import { createEffects } from './effects.js'
import { createHUD, createLoading } from './hud.js'
import { createAudio } from './audio.js'
import { createEnemySystem } from './enemies.js'

const $ = (id) => document.getElementById(id)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const damp = (a, b, l, dt) => a + (b - a) * (1 - Math.exp(-l * dt))
const frame = () => new Promise((r) => requestAnimationFrame(r))

const RENDER_SCALE = 0.9
const PLAYER_RADIUS = 0.38
const EYE_STAND = 1.68
const EYE_CROUCH = 1.12

const canvas = $('scene')
const loading = createLoading()
let renderer, scene, camera, composer, bloomPass, gradePass, fxaaPass
let tex, level, weapons, effects, enemies, hud, audio
let state = 'loading'
let clock
let menuTime = 0
let gameTime = 0
let waveTimer = 0
let wavePending = false
let pointerLocked = false
let firing = false
let semiLatch = false
let reloadKey = false

const stats = { kills: 0, headshots: 0, shots: 0, hits: 0, time: 0 }
const respawnPoint = new THREE.Vector3(0, 0, 25)
const player = {
  pos: new THREE.Vector3(0, 0, 25),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  health: 100,
  grounded: true,
  crouched: false,
  sprinting: false,
  moving: 0,
  speed: 0,
  bobT: 0,
  landDip: 0,
  shake: 0,
  hitFlash: 0,
  lastDamage: -99,
  eye: EYE_STAND
}
const keys = Object.create(null)

let gradeUniforms, cameraShakeSeed = Math.random()

function fatal(err) {
  console.error(err)
  state = 'fatal'
  const el = $('fatal')
  el.classList.remove('hidden')
  el.innerHTML = `<div class="fatal-box"><h3>RENDER FAILURE</h3><p>The operation could not initialize on this device. A WebGL2-capable browser with hardware or software acceleration is required.</p><pre>${String(err && err.stack || err).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))}</pre></div>`
}

/* ------------------------------------------------------------------ */
/*  Boot                                                              */
/* ------------------------------------------------------------------ */
async function boot() {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false, alpha: false })
    renderer.setPixelRatio(1)
    renderer.setSize(Math.floor(innerWidth * RENDER_SCALE), Math.floor(innerHeight * RENDER_SCALE), false)
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.16
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.info.autoReset = true

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.03, 700)
    camera.rotation.order = 'YXZ'
    camera.position.set(0, EYE_STAND, 25)
    scene.add(camera)

    loading.set(0.04, 'ALLOCATING RENDER PIPELINE', 'WebGL2 context online')
    await frame()

    clock = new THREE.Clock()
    audio = createAudio()
    hud = createHUD()

    loading.set(0.10, 'COOKING SURFACE LIBRARY', 'procedural albedo / normal / roughness')
    await frame()
    const t0 = performance.now()
    tex = createTextureLibrary()
    const texMs = Math.round(performance.now() - t0)
    loading.set(0.42, 'CONSTRUCTING FORWARD OPERATING BASE', `surface library ${texMs}ms`)
    await frame()

    level = buildLevel(scene, renderer, tex)
    loading.set(0.58, 'PLACING STRUCTURES & LIGHTING', 'FOB ANVIL / 214 props')
    await frame()

    weapons = createWeaponSystem({ camera, scene, tex, audio })
    weapons.root.visible = false
    effects = createEffects(scene, tex)

    loading.set(0.72, 'DEPLOYING HOSTILE FORCES', 'operator rigs online')
    await frame()
    enemies = createEnemySystem({ scene, level, tex, audio, effects, player })
    enemies.onPlayerHit = onPlayerHit
    enemies.onKill = onEnemyKilled
    enemies.onAlert = onEnemyAlert

    setupComposer()

    loading.set(0.86, 'COMPILING SHADERS', 'warming draw calls')
    await frame()
    camera.position.set(2.5, 4.0, 33)
    camera.lookAt(-6, 2.0, -14)
    renderer.compile(scene, camera)
    renderer.render(scene, camera)

    // optional screenshot / automation handle
    loading.set(1, 'READY', 'operation blacksite // zero hour')
    await new Promise((r) => setTimeout(r, 420))
    loading.hide()
    audio.startAmbience()
    state = 'menu'
    hud.setHealth(100)
    hud.setAmmo(30, 210, 30, 'M4A1 / BLOCK II', '5.56 × 45 MM')
    hud.setObjective({ phase: 1, title: 'SECURE THE YARD', sub: 'HOSTILES REMAINING', remaining: 6, total: 6 })
    window.__blacksite.ready = true
    document.body.classList.add('menu-open')
  } catch (err) {
    fatal(err)
  }
}

/* ------------------------------------------------------------------ */
/*  Post processing                                                   */
/* ------------------------------------------------------------------ */
function setupComposer() {
  const w = Math.floor(innerWidth * RENDER_SCALE)
  const h = Math.floor(innerHeight * RENDER_SCALE)
  const target = new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    samples: 0,
    depthBuffer: true
  })
  composer = new EffectComposer(renderer, target)
  composer.setSize(w, h)
  composer.addPass(new RenderPass(scene, camera))
  bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.28, 0.5, 1.0)
  composer.addPass(bloomPass)

  const GradeShader = {
    uniforms: {
      tDiffuse: { value: null },
      resolution: { value: new THREE.Vector2(w, h) },
      time: { value: 0 },
      vignette: { value: 0.40 },
      grain: { value: 0.045 },
      aberration: { value: 0.0016 },
      saturation: { value: 1.07 },
      contrast: { value: 1.09 },
      lift: { value: new THREE.Vector3(0.004, 0.006, 0.009) },
      gain: { value: new THREE.Vector3(1.015, 0.995, 0.97) }
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      uniform float time, vignette, grain, aberration, saturation, contrast;
      uniform vec3 lift, gain;
      varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main(){
        vec2 uv = vUv;
        vec2 c = uv - 0.5;
        float dist = length(c);
        float ca = aberration * (0.25 + dist * dist * 2.2);
        vec3 col;
        col.r = texture2D(tDiffuse, uv + c * ca).r;
        col.g = texture2D(tDiffuse, uv).g;
        col.b = texture2D(tDiffuse, uv - c * ca).b;
        // subtle split-tone: cool shadows, warm highlights
        float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = col * gain + lift;
        col = mix(vec3(luma), col, saturation);
        col = (col - 0.5) * contrast + 0.5;
        float vig = smoothstep(0.92, 0.24, dist);
        col *= mix(1.0, vig, vignette);
        float g = hash(uv * resolution + fract(time) * 431.7) - 0.5;
        col += g * grain;
        gl_FragColor = vec4(max(col, 0.0), 1.0);
      }
    `
  }
  // Tone mapping happens in OutputPass. The grade MUST run after it so contrast,
  // lift and saturation operate on display-referred values instead of crushing
  // sub-0.5 linear HDR scene radiance to black.
  composer.addPass(new OutputPass())
  gradePass = new ShaderPass(GradeShader)
  composer.addPass(gradePass)
  fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms.resolution.value.set(1 / w, 1 / h)
  composer.addPass(fxaaPass)
}

function resize() {
  if (!renderer) return
  const w = Math.floor(innerWidth * RENDER_SCALE)
  const h = Math.floor(innerHeight * RENDER_SCALE)
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(w, h, false)
  if (composer) {
    composer.setSize(w, h)
    if (gradePass) gradePass.uniforms.resolution.value.set(w, h)
    if (fxaaPass) fxaaPass.material.uniforms.resolution.value.set(1 / w, 1 / h)
    if (bloomPass) bloomPass.setSize(w, h)
  }
}
window.addEventListener('resize', resize)

/* ------------------------------------------------------------------ */
/*  Input                                                             */
/* ------------------------------------------------------------------ */
function requestLock() {
  if (document.pointerLockElement !== canvas) {
    const p = canvas.requestPointerLock?.()
    if (p && p.catch) p.catch(() => {})
  }
}
document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === canvas
})
document.addEventListener('mousemove', (e) => {
  if (state !== 'playing') return
  if (!pointerLocked && !window.__blacksite.forceMouse) return
  const adsScale = 1 - weapons.ads * 0.32
  player.yaw -= e.movementX * 0.0021 * adsScale
  player.pitch -= e.movementY * 0.0021 * adsScale
  player.pitch = clamp(player.pitch, -1.42, 1.42)
  weapons.setLookDelta(e.movementX, e.movementY)
  hideMenuHint()
})
window.addEventListener('keydown', (e) => {
  keys[e.code] = true
  if (e.code === 'Escape') {
    if (state === 'playing') pauseGame()
    else if (state === 'paused') resumeGame()
    return
  }
  if (state !== 'playing') return
  if (e.code === 'KeyR') weapons.reload()
  if (e.code === 'Digit1') weapons.switchTo('rifle')
  if (e.code === 'Digit2') weapons.switchTo('pistol')
  if (e.code === 'KeyM') toggleMute()
  if (e.code === 'Space' && player.grounded) {
    player.vel.y = 5.3
    player.grounded = false
    audio.jump()
  }
})
window.addEventListener('keyup', (e) => { keys[e.code] = false })
window.addEventListener('mousedown', (e) => {
  if (state !== 'playing') return
  if (e.button === 0) {
    firing = true
    if (!semiLatch) tryFire()
    semiLatch = true
  }
  if (e.button === 2) weapons.setADS(true)
})
window.addEventListener('mouseup', (e) => {
  if (e.button === 0) { firing = false; semiLatch = false }
  if (e.button === 2) weapons.setADS(false)
})
window.addEventListener('contextmenu', (e) => e.preventDefault())
canvas.addEventListener('click', () => {
  if (state === 'playing') requestLock()
})
canvas.addEventListener('wheel', (e) => {
  if (state !== 'playing') return
  weapons.switchTo(weapons.currentKey === 'rifle' ? 'pistol' : 'rifle')
}, { passive: true })

function hideMenuHint() {}

/* ------------------------------------------------------------------ */
/*  Game flow                                                         */
/* ------------------------------------------------------------------ */
function resetGame() {
  player.pos.copy(respawnPoint)
  player.vel.set(0, 0, 0)
  player.yaw = 0
  player.pitch = 0
  player.recoilPitch = 0
  player.recoilYaw = 0
  player.health = 100
  player.grounded = true
  player.crouched = false
  player.sprinting = false
  player.eye = EYE_STAND
  player.shake = 0
  player.lastDamage = -99
  stats.kills = 0
  stats.headshots = 0
  stats.shots = 0
  stats.hits = 0
  stats.time = 0
  gameTime = 0
  wavePending = false
  waveTimer = 0
  weapons.reset()
  weapons.root.visible = true
  enemies.reset()
  hud.hideDeath()
  hud.hideVictory()
  hud.setHealth(100)
  hud.setStats({ kills: 0, headshots: 0, shots: 0, hits: 0, time: 0 })
  startWave(1)
}

function startGame() {
  if (state === 'loading' || state === 'fatal') return
  audio.init()
  audio.startAmbience()
  audio.uiClick()
  state = 'playing'
  $('menu').style.opacity = '0'
  $('menu').style.pointerEvents = 'none'
  setTimeout(() => $('menu').classList.add('hidden'), 450)
  document.body.classList.remove('menu-open')
  document.body.classList.add('playing')
  hud.show()
  hud.setSpread(14)
  resetGame()
  requestLock()
  window.__blacksite.ready = true
}

function startWave(n) {
  if (n > 5) {
    winGame()
    return
  }
  game.phase = n
  $('phase-num').textContent = String(n).padStart(2, '0')
  const total = 4 + n
  wavePending = true
  waveTimer = 0
  enemies.spawnWave(n, total)
  hud.setObjective({ phase: n, title: phaseTitle(n), sub: 'HOSTILES REMAINING', remaining: total, total })
  hud.notify(`PHASE ${String(n).padStart(2, '0')}`, phaseSub(n), 2400)
  audio.waveStart()
  gameTime = Math.max(0, gameTime)
}

function phaseTitle(n) {
  return ['SECURE THE YARD', 'CLEAR THE CONTAINERS', 'BREACH THE DEPOT', 'HOLD THE COURTYARD', 'EXFIL UNDER FIRE'][n - 1] || 'SECURE THE YARD'
}
function phaseSub(n) {
  return ['HOSTILES INBOUND', 'MORE CONTACTS EAST', 'FUEL DEPOT COMPROMISED', 'THEY ARE FLANKING', 'FINAL PUSH — SURVIVE'][n - 1] || 'HOSTILES INBOUND'
}

function onEnemyKilled(info) {
  stats.kills++
  hud.kill(weapons.weaponName, info.headshot)
  hud.setStats({ kills: stats.kills, headshots: stats.headshots, shots: stats.shots, hits: stats.hits })
  if (stats.kills % 4 === 0) hud.toast('HOSTILE DOWN')
  audio.hitMarker(info.headshot)
}

function onEnemyAlert() {
  audio.setCombatIntensity(0.8)
}

function onPlayerHit(dmg, origin, headshot) {
  if (state !== 'playing') return
  player.health = Math.max(0, player.health - dmg)
  player.lastDamage = gameTime
  player.hitFlash = 1
  player.shake = Math.min(1, player.shake + 0.5)
  hud.setHealth(player.health)
  hud.damage(dmg / 20)
  audio.playerHurt()
  if (origin) {
    // small directional shake away from the shooter
    const dx = origin.x - player.pos.x
    const dz = origin.z - player.pos.z
    const ang = Math.atan2(dx, dz)
    const rel = ang - (player.yaw + Math.PI)
    player.recoilYaw += Math.sin(rel) * 0.004
  }
  if (player.health <= 0) die()
}

function die() {
  if (state !== 'playing') return
  state = 'dead'
  audio.playerDeath()
  audio.setCombatIntensity(0)
  document.exitPointerLock?.()
  document.body.classList.remove('playing')
  hud.setStats({ kills: stats.kills, headshots: stats.headshots, shots: stats.shots, hits: stats.hits, time: stats.time })
  setTimeout(() => {
    hud.showDeath({
      kills: stats.kills,
      headshots: stats.headshots,
      accuracy: stats.shots ? Math.round(stats.hits / stats.shots * 100) : 0,
      time: fmtTime(stats.time),
      line: stats.kills > 4 ? 'OPERATOR DOWN. THE COMPOUND REMAINS HOSTILE.' : 'OPERATOR DOWN BEFORE THE MISSION BEGAN.'
    })
  }, 900)
}

function winGame() {
  if (state !== 'playing') return
  state = 'won'
  audio.objectiveComplete()
  audio.setCombatIntensity(0)
  document.exitPointerLock?.()
  document.body.classList.remove('playing')
  hud.showVictory({
    kills: stats.kills,
    headshots: stats.headshots,
    accuracy: stats.shots ? Math.round(stats.hits / stats.shots * 100) : 0,
    time: fmtTime(stats.time)
  })
}

function pauseGame() {
  if (state !== 'playing') return
  state = 'paused'
  document.exitPointerLock?.()
  $('pause').classList.remove('hidden')
}
function resumeGame() {
  if (state !== 'paused') return
  state = 'playing'
  $('pause').classList.add('hidden')
  requestLock()
}

function fmtTime(t) {
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function toggleMute() {
  const muted = !audio.isMuted()
  audio.setMuted(muted)
  $('mute-btn').textContent = `AUDIO: ${muted ? 'OFF' : 'ON'}`
  $('pause-mute').textContent = `AUDIO: ${muted ? 'OFF' : 'ON'}`
  return muted
}

/* ------------------------------------------------------------------ */
/*  Firing                                                            */
/* ------------------------------------------------------------------ */
const raycaster = new THREE.Raycaster()
raycaster.far = 220
const _dir = new THREE.Vector3()
const _right = new THREE.Vector3()
const _up = new THREE.Vector3()
const _hitPoint = new THREE.Vector3()
const _normal = new THREE.Vector3()
const _muzzle = new THREE.Vector3()

function tryFire() {
  if (state !== 'playing') return
  const res = weapons.fire()
  if (!res.fired) {
    if (res.reason === 'empty') hud.notify('MAGAZINE EMPTY', 'PRESS R TO RELOAD', 1400)
    return
  }
  stats.shots++
  doHitscan(res.spread)
  hud.setStats({ shots: stats.shots, hits: stats.hits })
  // muzzle light flicker + smoke
  effects.ejectShell(weapons.getMuzzleWorld(), _right.set(1, 0, 0).applyQuaternion(camera.quaternion))
  effects.puff(weapons.getMuzzleWorld(), {
    color: 0xffc08a, size: 0.05, grow: 4, life: 0.28, opacity: 0.35, additive: true,
    vel: new THREE.Vector3(0, 0.3, 0)
  })
}

function doHitscan(spread) {
  camera.getWorldDirection(_dir)
  _right.setFromMatrixColumn(camera.matrixWorld, 0)
  _up.setFromMatrixColumn(camera.matrixWorld, 1)
  const r = Math.sqrt(Math.random()) * Math.tan(spread)
  const a = Math.random() * Math.PI * 2
  _dir.addScaledVector(_right, Math.cos(a) * r).addScaledVector(_up, Math.sin(a) * r).normalize()

  raycaster.set(camera.getWorldPosition(_muzzle.clone()), _dir)
  const targets = enemies.hitboxes
  const targetList = level.solidMeshes.concat(targets)
  const hits = raycaster.intersectObjects(targetList, false)
  let hit = null
  for (const h of hits) {
    if (h.object.isSprite) continue
    hit = h
    break
  }
  weapons.getMuzzleWorld().copy?.(_muzzle) // no-op guard
  const muzzle = weapons.getMuzzleWorld()

  if (!hit) {
    const end = camera.getWorldPosition(new THREE.Vector3()).addScaledVector(_dir, 150)
    effects.tracer(muzzle, end, 0xffb975)
    return
  }
  _hitPoint.copy(hit.point)
  effects.tracer(muzzle, _hitPoint, 0xffc98a)

  const enemyRef = hit.object.userData.enemyRef
  if (enemyRef) {
    const part = hit.object.userData.part || 'body'
    const cfg = weapons.configs[weapons.currentKey]
    const mult = part === 'head' ? cfg.headMult : part === 'limb' ? 0.78 : 1
    const result = enemies.hit(enemyRef, cfg.damage * mult, part, hit.point, _dir)
    effects.blood(hit.point, _dir)
    hud.hit(part === 'head')
    if (result && result.killed) {
      if (part === 'head') stats.headshots++
      audio.impact('flesh')
    } else {
      audio.hitMarker(part === 'head')
      audio.impact('flesh')
    }
    stats.hits++
    hud.setStats({ shots: stats.shots, hits: stats.hits, headshots: stats.headshots })
  } else {
    if (hit.face) {
      _normal.copy(hit.face.normal).applyMatrix3(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).normalize()
    } else {
      _normal.copy(_dir).negate()
    }
    const surface = hit.object.userData.surface || (hit.object.material && hit.object.material.metalness > 0.5 ? 'metal' : 'concrete')
    effects.impact(hit.point, _normal, surface)
    audio.impact(surface === 'metal' ? 'metal' : surface === 'wood' ? 'wood' : 'concrete')
  }
}

/* ------------------------------------------------------------------ */
/*  Player movement / collisions                                      */
/* ------------------------------------------------------------------ */
function collideMove(pos, dx, dz) {
  const R = PLAYER_RADIUS
  pos.x += dx
  for (const c of level.colliders) {
    if (pos.z > c.minZ - R && pos.z < c.maxZ + R && pos.x > c.minX - R && pos.x < c.maxX + R) {
      if (dx > 0) pos.x = c.minX - R
      else if (dx < 0) pos.x = c.maxX + R
    }
  }
  pos.z += dz
  for (const c of level.colliders) {
    if (pos.x > c.minX - R && pos.x < c.maxX + R && pos.z > c.minZ - R && pos.z < c.maxZ + R) {
      if (dz > 0) pos.z = c.minZ - R
      else if (dz < 0) pos.z = c.maxZ + R
    }
  }
  pos.x = clamp(pos.x, -37, 37)
  pos.z = clamp(pos.z, -38, 39)
}

function updatePlayer(dt) {
  const wantCrouch = !!(keys['ControlLeft'] || keys['ControlRight'] || keys['KeyC'])
  const forward = (keys['KeyW'] ? 1 : 0) - (keys['KeyS'] ? 1 : 0)
  const strafe = (keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0)
  let mx = -Math.sin(player.yaw) * forward + Math.cos(player.yaw) * strafe
  let mz = -Math.cos(player.yaw) * forward - Math.sin(player.yaw) * strafe
  const mag = Math.hypot(mx, mz)
  if (mag > 0) { mx /= mag; mz /= mag }

  player.crouched = damp(player.crouched ? 1 : 0, wantCrouch ? 1 : 0, 12, dt) > 0.5 ? wantCrouch : wantCrouch
  player.eye = damp(player.eye, wantCrouch ? EYE_CROUCH : EYE_STAND, 12, dt)
  const canSprint = forward > 0 && !wantCrouch && !weapons.adsHeld && player.health > 0
  player.sprinting = canSprint && !!(keys['ShiftLeft'] || keys['ShiftRight'])
  const moving = mag > 0.01
  const targetSpeed = wantCrouch ? 2.35 : player.sprinting ? 7.1 : 4.35
  player.speed = damp(player.speed, moving ? targetSpeed : 0, moving ? 9 : 12, dt)
  if (moving) {
    collideMove(player.pos, mx * player.speed * dt, mz * player.speed * dt)
    player.moving = damp(player.moving, player.sprinting ? 1.35 : 1, 8, dt)
    player.bobT += dt * (player.sprinting ? 12.5 : 8.2)
    const step = player.sprinting ? 0.32 : 0.46
    const before = Math.sin(player.bobT)
    if (before > 0.985) {
      audio.footstep('concrete', player.sprinting)
    }
  } else {
    player.moving = damp(player.moving, 0, 10, dt)
  }

  // vertical
  if (!player.grounded) {
    player.vel.y -= 16 * dt
    player.pos.y += player.vel.y * dt
    if (player.pos.y <= 0) {
      player.pos.y = 0
      if (player.vel.y < -4) { audio.land(); player.landDip = 1 }
      player.vel.y = 0
      player.grounded = true
    }
  }
  player.landDip = damp(player.landDip, 0, 9, dt)

  // health regen
  if (gameTime - player.lastDamage > 6 && player.health < 100 && player.health > 0) {
    player.health = Math.min(100, player.health + dt * 7)
    hud.setHealth(player.health)
  }

  // recoil spring
  player.recoilPitch = damp(player.recoilPitch, 0, 9, dt)
  player.recoilYaw = damp(player.recoilYaw, 0, 9, dt)
  player.shake = damp(player.shake, 0, 6, dt)
  player.hitFlash = Math.max(0, player.hitFlash - dt * 2)

  // camera
  const bobY = Math.sin(player.bobT) * 0.018 * player.moving * (1 - weapons.ads * 0.7)
  const bobX = Math.cos(player.bobT * 0.5) * 0.022 * player.moving * (1 - weapons.ads * 0.8)
  const strafeLean = clamp((keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0), -1, 1) * 0.012
  const shakeX = (Math.sin(gameTime * 71 + cameraShakeSeed) * 0.5 + Math.sin(gameTime * 41) * 0.5) * player.shake * 0.012
  const shakeY = Math.cos(gameTime * 59) * player.shake * 0.01
  camera.position.set(
    player.pos.x + bobX,
    player.pos.y + player.eye + bobY - player.landDip * 0.09 + shakeY,
    player.pos.z
  )
  camera.rotation.set(
    player.pitch + player.recoilPitch + shakeY * 0.35,
    player.yaw + player.recoilYaw + shakeX * 0.35,
    strafeLean + player.recoilYaw * 0.5 + Math.sin(player.bobT * 0.5) * 0.0035 * player.moving
  )
  const targetFov = 72 + (player.sprinting ? 4 : 0) - weapons.ads * (72 - weapons.adsFov)
  camera.fov = damp(camera.fov, targetFov, 12, dt)
  camera.updateProjectionMatrix()
}

/* ------------------------------------------------------------------ */
/*  Loop                                                              */
/* ------------------------------------------------------------------ */
function updateMenu(dt) {
  menuTime += dt
  const t = menuTime * 0.045
  camera.position.set(4.5 + Math.sin(t) * 2.2, 4.4 + Math.sin(t * 0.7) * 0.35, 33 + Math.cos(t * 0.8) * 1.2)
  camera.lookAt(-6 + Math.sin(t * 0.6) * 1.4, 2.1, -16)
  camera.fov = damp(camera.fov, 58, 3, dt)
  camera.updateProjectionMatrix()
  weapons.root.visible = false
}

function playingUpdate(dt) {
  gameTime += dt
  stats.time = gameTime
  updatePlayer(dt)

  weapons.update(dt, {
    moving: player.moving,
    sprinting: player.sprinting,
    grounded: player.grounded
  })

  if (firing && weapons.currentKey === 'rifle') {
    tryFire()
  }

  enemies.update(dt, gameTime, player)
  effects.update(dt)

  // HUD
  hud.setCompass(player.yaw)
  hud.setAmmo(weapons.ammo, weapons.reserve, weapons.maxMag, weapons.weaponName, weapons.currentKey === 'rifle' ? '5.56 × 45 MM' : '9 × 19 MM')
  hud.setReload(weapons.reloading ? (weapons.state.reloadT / weapons.state.reloadDuration) : -1)
  hud.setADS(weapons.ads > 0.55)
  const base = 7 + weapons.getSpread() * 900
  hud.setSpread(base)
  hud.setStats({ kills: stats.kills, headshots: stats.headshots, shots: stats.shots, hits: stats.hits, time: stats.time })
  hud.update(dt)
  hud.drawMinimap({
    colliders: level.colliders,
    enemies: enemies.enemies,
    player: { x: player.pos.x, z: player.pos.z },
    yaw: player.yaw,
    range: 44
  })

  // combat ambience
  const alerted = enemies.enemies.filter((e) => e.alive && e.alerted).length
  audio.setCombatIntensity(alerted > 0 ? Math.min(1, 0.35 + alerted * 0.15) : 0)

  // wave progression
  if (wavePending && enemies.remaining === 0) {
    wavePending = false
    waveTimer = 3.4
    hud.setObjective({ remaining: 0 })
    hud.notify('SECTOR CLEAR', 'REGROUP — NEXT PHASE INBOUND', 2500)
    audio.objectiveComplete()
    if (game.phase >= 5) {
      waveTimer = 2.2
    }
  }
  if (waveTimer > 0) {
    waveTimer -= dt
    if (waveTimer <= 0) {
      if (game.phase >= 5) winGame()
      else startWave(game.phase + 1)
    }
  }

  // check enemy counts for objective
  if (wavePending) {
    hud.setObjective({ remaining: enemies.remaining, total: enemies.waveTotal })
  }
}

function loop() {
  requestAnimationFrame(loop)
  if (!renderer || state === 'loading' || state === 'fatal') return
  const dt = Math.min(clock.getDelta(), 0.05)
  if (state === 'menu') {
    updateMenu(dt)
    hud.update(dt)
  } else if (state === 'playing') {
    playingUpdate(dt)
  } else if (state === 'dead' || state === 'won') {
    // let bodies settle, freeze player input
    effects.update(dt)
    enemies.update(dt, gameTime, player, true)
    hud.update(dt)
  } else if (state === 'paused') {
    hud.update(dt)
  }
  if (gradeUniforms) gradeUniforms.time.value += dt
  if (gradePass) gradePass.uniforms.time.value += dt
  composer.render()
}

/* ------------------------------------------------------------------ */
/*  UI wiring                                                         */
/* ------------------------------------------------------------------ */
function wireUI() {
  $('deploy').addEventListener('click', startGame)
  $('redeploy').addEventListener('click', () => { hud.hideDeath(); startGame() })
  $('again').addEventListener('click', () => { hud.hideVictory(); startGame() })
  $('resume').addEventListener('click', resumeGame)
  $('restart').addEventListener('click', () => {
    $('pause').classList.add('hidden')
    hud.hideDeath(); hud.hideVictory()
    startGame()
  })
  $('mute-btn').addEventListener('click', toggleMute)
  $('pause-mute').addEventListener('click', toggleMute)
  for (const b of document.querySelectorAll('button')) {
    b.addEventListener('mouseenter', () => audio?.uiHover?.())
  }
}
wireUI()

/* Global handle for automation / visual QA. */
window.__blacksite = {
  ready: false,
  boot,
  start: startGame,
  get state() { return state },
  get player() { return player },
  get game() { return { state, phase: game?.phase, stats, health: player.health } },
  get weapons() { return weapons },
  get enemies() { return enemies },
  get camera() { return camera },
  get scene() { return scene },
  get renderer() { return renderer },
  get level() { return level },
  get audio() { return audio },
  get hud() { return hud },
  aim(yaw, pitch = 0) { player.yaw = yaw; player.pitch = pitch },
  teleport(x, z) { player.pos.set(x, 0, z) },
  fire: tryFire,
  spawn() { if (enemies) enemies.spawnWave(game.phase || 1, 4) },
  forceMouse: false
}

const game = { phase: 1 }

boot().then(() => { clock.start(); loop() })
