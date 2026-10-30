import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/* ------------------------------------------------------------------ *
 *  First-person weapon system.
 *  Hand-built M4-pattern carbine + sidearm, gloves, optics, animation.
 * ------------------------------------------------------------------ */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt))

function canvasLabel(text, size = 64, color = '#cfc8b8') {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 64
  const ctx = c.getContext('2d')
  ctx.font = `700 ${size * 0.42}px "Arial Narrow", Arial, sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 128, 32)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function createWeaponSystem({ camera, scene, tex, audio }) {
  const root = new THREE.Group()
  root.name = 'viewmodel'
  camera.add(root)

  /* -------------------------- materials ------------------------- */
  const normal = tex.metalDark.normalMap
  const gunmetal = new THREE.MeshStandardMaterial({
    color: 0x282a2c, metalness: 0.92, roughness: 0.36, envMapIntensity: 1.35,
    normalMap: normal, normalScale: new THREE.Vector2(0.32, 0.32)
  })
  const steel = new THREE.MeshStandardMaterial({
    color: 0x777c7d, metalness: 0.98, roughness: 0.22, envMapIntensity: 1.6,
    normalMap: normal, normalScale: new THREE.Vector2(0.18, 0.18)
  })
  const polymer = new THREE.MeshStandardMaterial({
    color: 0x17181a, metalness: 0.12, roughness: 0.62, envMapIntensity: 0.85,
    normalMap: tex.fabric.normalMap, normalScale: new THREE.Vector2(0.25, 0.25)
  })
  const tan = new THREE.MeshStandardMaterial({
    color: 0x685d46, metalness: 0.08, roughness: 0.7, envMapIntensity: 0.8,
    normalMap: tex.fabric.normalMap, normalScale: new THREE.Vector2(0.3, 0.3)
  })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x0e0f0f, roughness: 0.94, metalness: 0 })
  const glove = new THREE.MeshStandardMaterial({
    color: 0x1d1e1a, roughness: 0.9, metalness: 0.03,
    normalMap: tex.fabric.normalMap, normalScale: new THREE.Vector2(0.5, 0.5)
  })
  const glovePad = new THREE.MeshStandardMaterial({ color: 0x171713, roughness: 0.9 })
  const sleeve = new THREE.MeshStandardMaterial({
    color: 0x30332a, roughness: 0.97, metalness: 0,
    normalMap: tex.fabric.normalMap, normalScale: new THREE.Vector2(0.5, 0.5)
  })
  const brass = new THREE.MeshStandardMaterial({ color: 0xc7a24a, metalness: 0.95, roughness: 0.28, envMapIntensity: 1.5 })
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a2028, metalness: 0.1, roughness: 0.04, transparent: true, opacity: 0.42,
    envMapIntensity: 2.4, clearcoat: 1, clearcoatRoughness: 0.02, side: THREE.DoubleSide,
    depthWrite: false
  })
  const reticleMat = new THREE.MeshBasicMaterial({
    color: 0xff3a1c, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
    depthWrite: false, toneMapped: false, side: THREE.DoubleSide
  })
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffe3b0, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  const label = (txt, w, h) => {
    const t = canvasLabel(txt, 64, 'rgba(210,202,186,0.65)')
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false }))
    return m
  }

  /* --------------------------- helpers -------------------------- */
  const rb = (w, h, d, mat, x, y, z, r = 0.008, parent) => {
    const g = r > 0 ? new RoundedBoxGeometry(w, h, d, 2, r) : new THREE.BoxGeometry(w, h, d)
    const m = new THREE.Mesh(g, mat)
    m.position.set(x, y, z)
    m.castShadow = false
    m.receiveShadow = false
    ;(parent || null)?.add(m)
    return m
  }
  const cylMesh = (rt, rb2, h, mat, x, y, z, axis = 'z', seg = 16) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb2, h, seg), mat)
    m.position.set(x, y, z)
    if (axis === 'z') m.rotation.x = Math.PI / 2
    if (axis === 'x') m.rotation.z = Math.PI / 2
    m.castShadow = false
    return m
  }
  const tubeBetween = (a, b, radius, mat, seg = 8) => {
    const dir = new THREE.Vector3().subVectors(b, a)
    const len = dir.length()
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.92, len, seg), mat)
    m.position.copy(a).addScaledVector(dir, 0.5)
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    return m
  }

  function addGlove(parent, position, rotation, flip = 1) {
    const g = new THREE.Group()
    g.position.copy(position)
    g.rotation.set(rotation.x, rotation.y, rotation.z)
    parent.add(g)
    const palm = rb(0.072, 0.052, 0.085, glove, 0, 0, 0, 0.018, g)
    palm.rotation.x = 0.12
    // four fingers wrapping
    for (let i = 0; i < 4; i++) {
      const x = -0.024 + i * 0.017
      const f = rb(0.014, 0.03, 0.055, glove, x, 0.025, -0.035, 0.007, g)
      f.rotation.x = 0.85
      const tip = rb(0.013, 0.024, 0.034, glove, x, 0.005, -0.06, 0.006, g)
      tip.rotation.x = 1.9
      const knuckle = rb(0.015, 0.012, 0.016, glovePad, x, 0.033, -0.026, 0.005, g)
      knuckle.rotation.x = 0.6
    }
    // thumb over the top
    const th = rb(0.02, 0.026, 0.06, glove, -0.036 * flip, 0.014, -0.02, 0.009, g)
    th.rotation.set(0.35, 0, 0.5 * flip)
    // wrist cuff
    const cuff = rb(0.078, 0.06, 0.035, glovePad, 0, -0.004, 0.055, 0.012, g)
    cuff.rotation.x = 0.1
    return g
  }

  function buildRifle() {
    const g = new THREE.Group()
    const magGroup = new THREE.Group()
    const boltGroup = new THREE.Group()
    const leftHandGroup = new THREE.Group()
    const rightHandGroup = new THREE.Group()
    g.add(magGroup, boltGroup, leftHandGroup, rightHandGroup)

    // ---- receiver ----
    rb(0.066, 0.072, 0.30, gunmetal, 0, 0.045, 0.055, 0.006, g)
    rb(0.06, 0.066, 0.22, gunmetal, 0, 0.006, 0.075, 0.005, g)
    // chamfered top rail
    rb(0.044, 0.012, 0.31, steel, 0, 0.085, 0.055, 0.003, g)
    for (let i = 0; i < 12; i++) {
      rb(0.048, 0.008, 0.008, gunmetal, 0, 0.094, -0.08 + i * 0.024, 0.001, g)
    }
    // ejection port + brass deflector
    rb(0.006, 0.032, 0.07, steel, 0.034, 0.048, 0.045, 0.002, g)
    const deflect = rb(0.024, 0.03, 0.02, gunmetal, 0.033, 0.055, 0.10, 0.004, g)
    deflect.rotation.z = 0.5
    // forward assist
    cylMesh(0.012, 0.012, 0.035, steel, 0.037, 0.04, 0.115, 'x').rotation.z = Math.PI / 2
    g.add(cylMesh(0.012, 0.012, 0.035, steel, 0.037, 0.04, 0.115, 'x'))
    // selector + bolt catch
    const sel = cylMesh(0.013, 0.013, 0.014, steel, -0.035, 0.0, 0.09, 'x')
    g.add(sel)
    rb(0.008, 0.012, 0.04, steel, -0.037, -0.015, 0.14, 0.002, g)
    // trigger guard
    const tg = new THREE.Mesh(new THREE.TorusGeometry(0.031, 0.006, 5, 12, Math.PI), gunmetal)
    tg.position.set(0, -0.045, 0.13)
    tg.rotation.set(Math.PI / 2, 0, Math.PI)
    g.add(tg)
    rb(0.008, 0.024, 0.008, steel, 0, -0.05, 0.11, 0.002, g)
    // magazine well
    rb(0.058, 0.035, 0.05, gunmetal, 0, -0.035, 0.02, 0.004, g)

    // ---- handguard ----
    rb(0.07, 0.072, 0.34, tan, 0, 0.042, -0.23, 0.007, g)
    // mlok slots
    for (let i = 0; i < 5; i++) {
      for (const side of [-1, 1]) {
        const s = rb(0.003, 0.016, 0.038, polymer, side * 0.0355, 0.045, -0.34 + i * 0.055, 0.001, g)
        s.rotation.y = 0
      }
    }
    // top rail on handguard
    for (let i = 0; i < 12; i++) {
      rb(0.042, 0.008, 0.012, steel, 0, 0.086, -0.39 + i * 0.025, 0.001, g)
    }
    // handguard end cap / barrel nut
    rb(0.076, 0.078, 0.02, gunmetal, 0, 0.042, -0.405, 0.003, g)
    // barrel
    const barrel = cylMesh(0.012, 0.013, 0.24, steel, 0, 0.042, -0.53, 'z')
    g.add(barrel)
    // gas block + tube
    rb(0.028, 0.032, 0.05, gunmetal, 0, 0.058, -0.45, 0.004, g)
    // muzzle brake
    const brake = cylMesh(0.019, 0.022, 0.075, steel, 0, 0.042, -0.675, 'z', 12)
    g.add(brake)
    for (let i = 0; i < 3; i++) {
      rb(0.04, 0.006, 0.012, polymer, 0, 0.058, -0.655 - i * 0.02, 0.001, g)
    }
    const muzzle = new THREE.Object3D()
    muzzle.position.set(0, 0.042, -0.715)
    g.add(muzzle)

    // ---- stock ----
    const buffer = cylMesh(0.021, 0.021, 0.16, gunmetal, 0, 0.045, 0.30, 'z')
    g.add(buffer)
    rb(0.055, 0.08, 0.16, polymer, 0, 0.035, 0.39, 0.012, g)
    rb(0.06, 0.10, 0.025, rubber, 0, 0.025, 0.475, 0.008, g)
    rb(0.058, 0.03, 0.12, polymer, 0, 0.085, 0.39, 0.008, g)
    // QD sling points
    g.add(cylMesh(0.008, 0.008, 0.018, steel, 0.032, 0.02, 0.34, 'x'))
    g.add(cylMesh(0.008, 0.008, 0.018, steel, -0.036, 0.02, -0.3, 'x'))

    // ---- pistol grip ----
    const grip = rb(0.048, 0.13, 0.064, polymer, 0, -0.09, 0.105, 0.012, g)
    grip.rotation.x = -0.33
    rb(0.05, 0.04, 0.058, rubber, 0, -0.145, 0.13, 0.006, g).rotation.x = -0.33
    // trigger
    const trigger = rb(0.006, 0.032, 0.012, steel, 0, -0.03, 0.115, 0.002, g)
    trigger.rotation.x = -0.25

    // ---- magazine (curved) ----
    const mag1 = rb(0.048, 0.09, 0.085, tan, 0, -0.085, 0.01, 0.006, magGroup)
    mag1.rotation.x = 0.06
    const mag2 = rb(0.046, 0.085, 0.08, tan, 0, -0.158, 0.018, 0.006, magGroup)
    mag2.rotation.x = 0.18
    const mag3 = rb(0.044, 0.07, 0.072, tan, 0, -0.216, 0.043, 0.006, magGroup)
    mag3.rotation.x = 0.3
    rb(0.046, 0.02, 0.075, rubber, 0, -0.25, 0.058, 0.004, magGroup).rotation.x = 0.3
    for (let i = 0; i < 3; i++) {
      rb(0.003, 0.07, 0.07, tan, 0.025, -0.12 - i * 0.05, 0.02 + i * 0.012, 0.001, magGroup)
    }

    // ---- optic: holographic sight ----
    const optic = new THREE.Group()
    optic.position.set(0, 0.135, 0.03)
    g.add(optic)
    rb(0.05, 0.03, 0.085, gunmetal, 0, -0.018, 0, 0.004, optic)
    // housing frame
    rb(0.072, 0.012, 0.075, gunmetal, 0, 0.034, 0.005, 0.003, optic)
    rb(0.072, 0.012, 0.075, gunmetal, 0, -0.006, 0.005, 0.003, optic)
    rb(0.012, 0.052, 0.075, gunmetal, -0.03, 0.014, 0.005, 0.003, optic)
    rb(0.012, 0.052, 0.075, gunmetal, 0.03, 0.014, 0.005, 0.003, optic)
    // glass
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(0.056, 0.038), glassMat)
    gl.position.set(0, 0.014, -0.036)
    optic.add(gl)
    // reticle ring + dot + chevron
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.008, 0.0095, 20), reticleMat)
    ring.position.set(0, 0.014, -0.038)
    optic.add(ring)
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.0016, 8), reticleMat)
    dot.position.set(0, 0.014, -0.0385)
    optic.add(dot)
    const chev = new THREE.Mesh(new THREE.CircleGeometry(0.0022, 3), reticleMat)
    chev.position.set(0, 0.004, -0.0385)
    optic.add(chev)
    // glowing emitter housing at rear
    rb(0.03, 0.02, 0.03, gunmetal, 0, -0.002, 0.05, 0.004, optic)
    const emitter = new THREE.Mesh(new THREE.PlaneGeometry(0.016, 0.016), new THREE.MeshBasicMaterial({ color: 0xff4a20, toneMapped: false }))
    emitter.position.set(0, 0.002, 0.036)
    optic.add(emitter)
    // brightness logo
    const logo = label('EOTECH', 0.04, 0.012)
    logo.position.set(-0.031, 0.024, 0.042)
    logo.rotation.y = -Math.PI / 2
    optic.add(logo)
    // protective wings
    rb(0.01, 0.03, 0.06, polymer, -0.043, 0.012, 0.005, 0.003, optic)
    rb(0.01, 0.03, 0.06, polymer, 0.043, 0.012, 0.005, 0.003, optic)
    // flip magnifier behind
    const magBody = rb(0.038, 0.05, 0.07, gunmetal, 0.001, 0.02, 0.14, 0.008, optic)
    const magGlass = new THREE.Mesh(new THREE.CircleGeometry(0.016, 16), glassMat)
    magGlass.position.set(0, 0.02, 0.105)
    optic.add(magGlass)
    // backup iron sight folded
    rb(0.03, 0.022, 0.04, polymer, 0, 0.1, 0.16, 0.004, g)

    // ---- laser / light module ----
    const laser = rb(0.032, 0.03, 0.06, polymer, 0.045, 0.045, -0.24, 0.006, g)
    const laserLens = new THREE.Mesh(new THREE.CircleGeometry(0.008, 12), new THREE.MeshBasicMaterial({ color: 0x221a0a }))
    laserLens.position.set(0.045, 0.045, -0.272)
    g.add(laserLens)
    const laserGlow = new THREE.PointLight(0xff2010, 0.25, 0.8, 2)
    laserGlow.position.set(0.045, 0.045, -0.3)
    g.add(laserGlow)

    // ---- angled foregrip ----
    const afg = rb(0.035, 0.07, 0.05, polymer, 0, -0.02, -0.3, 0.01, g)
    afg.rotation.x = 0.3

    // ---- sling ----
    const slingPts = [
      new THREE.Vector3(0.04, 0.02, 0.33),
      new THREE.Vector3(0.09, -0.1, 0.16),
      new THREE.Vector3(0.05, -0.14, -0.12),
      new THREE.Vector3(-0.02, -0.02, -0.32)
    ]
    const sling = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(slingPts), 20, 0.006, 5, false), sleeve)
    g.add(sling)

    // ---- gloves ----
    const handR = addGlove(rightHandGroup, new THREE.Vector3(0.005, -0.128, 0.12), new THREE.Euler(0.2, 0.1, 0), -1)
    const handL = addGlove(leftHandGroup, new THREE.Vector3(0.006, -0.05, -0.29), new THREE.Euler(0.78, 0, 0), 1)
    handL.scale.setScalar(1.18)
    leftHandGroup.position.set(0.0, 0.0, 0.0)
    // forearms
    const armR = tubeBetween(new THREE.Vector3(0.045, -0.17, 0.16), new THREE.Vector3(0.22, -0.46, 0.52), 0.038, sleeve, 10)
    armR.castShadow = false
    g.add(armR)
    const armL = tubeBetween(new THREE.Vector3(-0.055, -0.12, -0.25), new THREE.Vector3(-0.28, -0.44, 0.34), 0.036, sleeve, 10)
    g.add(armL)
    // elbow pad / cuff details
    rb(0.06, 0.05, 0.07, glovePad, 0.11, -0.32, 0.35, 0.015, g).rotation.x = -0.7
    rb(0.055, 0.045, 0.065, glovePad, -0.17, -0.3, 0.14, 0.012, g).rotation.set(-0.7, 0.2, 0.5)
    // watch
    const watch = rb(0.03, 0.012, 0.04, glovePad, -0.115, -0.23, 0.02, 0.005, g)
    watch.rotation.z = 0.4

    // ---- muzzle flash ----
    const flash = new THREE.Group()
    flash.position.copy(muzzle.position)
    flash.visible = false
    g.add(flash)
    const flashCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.045, 0.17, 8, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })
    )
    flashCone.rotation.x = -Math.PI / 2
    flashCone.position.z = -0.09
    flash.add(flashCone)
    const flashSpriteMat = new THREE.SpriteMaterial({ map: tex.spark, color: 0xffc070, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    for (let i = 0; i < 2; i++) {
      const s = new THREE.Sprite(flashSpriteMat.clone())
      s.scale.setScalar(0.22)
      s.material.rotation = i * 1.57
      flash.add(s)
    }
    const flashLight = new THREE.PointLight(0xffa050, 0, 7, 2)
    flashLight.position.copy(muzzle.position)
    g.add(flashLight)

    return { group: g, muzzle, magGroup, boltGroup, leftHandGroup, rightHandGroup, flash, flashLight, flashCone, optic, gl, reticleMat }
  }

  function buildPistol() {
    const g = new THREE.Group()
    const magGroup = new THREE.Group()
    g.add(magGroup)
    // slide
    rb(0.042, 0.05, 0.20, gunmetal, 0, 0.035, -0.03, 0.006, g)
    rb(0.038, 0.016, 0.19, steel, 0, 0.062, -0.03, 0.004, g)
    for (let i = 0; i < 7; i++) rb(0.045, 0.008, 0.007, polymer, 0, 0.052, 0.05 + i * 0.012, 0.001, g)
    // frame
    rb(0.038, 0.032, 0.16, polymer, 0, 0.0, 0.015, 0.006, g)
    // grip
    const grip = rb(0.038, 0.12, 0.06, polymer, 0, -0.07, 0.06, 0.01, g)
    grip.rotation.x = -0.3
    for (let i = 0; i < 6; i++) rb(0.042, 0.006, 0.05, glovePad, 0, -0.04 - i * 0.016, 0.075 + i * 0.006, 0.002, g)
    // trigger guard
    const tg = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.005, 5, 10, Math.PI), gunmetal)
    tg.position.set(0, -0.03, 0.01)
    tg.rotation.set(Math.PI / 2, 0, Math.PI)
    g.add(tg)
    rb(0.006, 0.02, 0.006, steel, 0, -0.035, -0.005, 0.001, g)
    // barrel / suppressor
    const barrel = cylMesh(0.013, 0.013, 0.07, steel, 0, 0.035, -0.14, 'z', 12)
    g.add(barrel)
    const suppressor = cylMesh(0.025, 0.027, 0.14, gunmetal, 0, 0.035, -0.24, 'z', 16)
    g.add(suppressor)
    for (let i = 0; i < 4; i++) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.0265, 0.0025, 4, 16), steel)
      band.rotation.x = Math.PI / 2
      band.position.set(0, 0.035, -0.19 - i * 0.032)
      g.add(band)
    }
    const muzzle = new THREE.Object3D()
    muzzle.position.set(0, 0.035, -0.315)
    g.add(muzzle)
    // red dot
    const rds = new THREE.Group()
    rds.position.set(0, 0.095, -0.02)
    g.add(rds)
    rb(0.026, 0.012, 0.04, gunmetal, 0, -0.015, 0, 0.002, rds)
    rb(0.03, 0.034, 0.008, gunmetal, 0, 0.008, 0.02, 0.002, rds)
    rb(0.03, 0.034, 0.008, gunmetal, 0, 0.008, -0.02, 0.002, rds)
    rb(0.008, 0.034, 0.04, gunmetal, -0.012, 0.008, 0, 0.002, rds)
    rb(0.008, 0.034, 0.04, gunmetal, 0.012, 0.008, 0, 0.002, rds)
    const pglass = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.026), glassMat)
    pglass.position.set(0, 0.008, 0)
    rds.add(pglass)
    const pdot = new THREE.Mesh(new THREE.CircleGeometry(0.0014, 8), reticleMat)
    pdot.position.set(0, 0.008, -0.002)
    rds.add(pdot)
    // rear/front sights
    rb(0.03, 0.012, 0.008, polymer, 0, 0.074, 0.06, 0.002, g)
    rb(0.008, 0.014, 0.008, polymer, 0, 0.076, -0.11, 0.002, g)
    // mag base
    rb(0.034, 0.05, 0.05, steel, 0, -0.14, 0.085, 0.005, magGroup).rotation.x = -0.3
    // hands (two-handed grip)
    addGlove(g, new THREE.Vector3(0, -0.07, 0.075), new THREE.Euler(0.3, 0, 0), -1)
    const lh = new THREE.Group()
    lh.position.set(-0.035, -0.072, 0.055)
    lh.rotation.set(0.2, 0.5, 0.2)
    addGlove(lh, new THREE.Vector3(0, 0, 0), new THREE.Euler(0.3, 0, 0), 1)
    g.add(lh)
    const armR = tubeBetween(new THREE.Vector3(0.02, -0.12, 0.1), new THREE.Vector3(0.20, -0.44, 0.48), 0.038, sleeve, 10)
    g.add(armR)
    const armL = tubeBetween(new THREE.Vector3(-0.06, -0.12, 0.09), new THREE.Vector3(-0.26, -0.44, 0.36), 0.036, sleeve, 10)
    g.add(armL)
    // flash
    const flash = new THREE.Group()
    flash.position.copy(muzzle.position)
    flash.visible = false
    g.add(flash)
    const flashSpriteMat = new THREE.SpriteMaterial({ map: tex.spark, color: 0xffc070, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    for (let i = 0; i < 2; i++) {
      const s = new THREE.Sprite(flashSpriteMat.clone())
      s.scale.setScalar(0.15)
      s.material.rotation = i * 1.57
      flash.add(s)
    }
    const flashLight = new THREE.PointLight(0xffa050, 0, 6, 2)
    flashLight.position.copy(muzzle.position)
    g.add(flashLight)
    return { group: g, muzzle, magGroup, flash, flashLight, optic: rds, gl: pglass, reticleMat }
  }

  const rifle = buildRifle()
  const pistol = buildPistol()
  rifle.group.scale.setScalar(0.7)
  pistol.group.scale.setScalar(0.74)
  rifle.group.position.set(0.125, -0.155, -0.36)
  pistol.group.position.set(0.12, -0.14, -0.34)
  pistol.group.visible = false
  root.add(rifle.group, pistol.group)

  const models = { rifle, pistol }
  const configs = {
    rifle: { name: 'M4A1 / BLOCK II', mag: 30, reserve: 210, rpm: 720, reload: 2.35, damage: 26, headMult: 3.2, spread: 0.010, adsSpread: 0.0012, recoil: 0.010, adsFov: 42, audio: 'rifle' },
    pistol: { name: 'M17 / SUPPRESSED', mag: 17, reserve: 102, rpm: 340, reload: 1.85, damage: 34, headMult: 2.6, spread: 0.015, adsSpread: 0.0025, recoil: 0.016, adsFov: 50, audio: 'pistol' }
  }

  const state = {
    current: 'rifle',
    ammo: { rifle: configs.rifle.mag, pistol: configs.pistol.mag },
    reserve: { rifle: configs.rifle.reserve, pistol: configs.pistol.reserve },
    ads: 0,
    adsHeld: false,
    reloading: false,
    reloadT: 0,
    reloadDuration: 0,
    switching: 0,
    cooldown: 0,
    sprint: 0,
    kick: 0,
    kickRot: 0,
    swayX: 0,
    swayY: 0,
    lookX: 0,
    lookY: 0,
    spreadHeat: 0,
    flashT: 0,
    shotCount: 0,
    triggerReleased: true,
    swapFrom: null,
    swapT: 0
  }
  const events = { onReloadComplete: null, onShot: null, onEvent: null }
  const weaponRoot = () => models[state.current].group
  const cfg = () => configs[state.current]

  function setLookDelta(dx, dy) {
    state.lookX = clamp(state.lookX + dx * 0.00055, -0.05, 0.05)
    state.lookY = clamp(state.lookY + dy * 0.00055, -0.05, 0.05)
  }

  function switchTo(key) {
    if (key === state.current || state.switching > 0) return false
    state.switching = 0.55
    state.swapFrom = state.current
    state.current = key
    state.swapT = 0
    state.reloading = false
    state.adsHeld = false
    if (audio?.weaponSwitch) audio.weaponSwitch()
    events.onEvent?.('switch', key)
    return true
  }

  function reload() {
    if (state.reloading || state.switching > 0) return false
    const c = cfg()
    if (state.ammo[state.current] >= c.mag || state.reserve[state.current] <= 0) return false
    state.reloading = true
    state.reloadT = 0
    state.reloadDuration = c.reload
    state._reloaded = false
    state.adsHeld = false
    audio?.reloadStart?.()
    events.onEvent?.('reloadStart', state.current)
    return true
  }

  function fire() {
    if (state.reloading || state.switching > 0 || state.sprint > 0.5) return { fired: false, reason: 'busy' }
    if (state.cooldown > 0) return { fired: false, reason: 'cooldown' }
    const c = cfg()
    if (state.ammo[state.current] <= 0) {
      state.cooldown = 0.25
      audio?.dryFire?.()
      events.onEvent?.('empty', state.current)
      return { fired: false, reason: 'empty' }
    }
    state.ammo[state.current]--
    state.cooldown = 60 / c.rpm
    state.kick = Math.min(1.6, state.kick + 0.85)
    state.kickRot = Math.min(1.6, state.kickRot + 0.9)
    state.spreadHeat = Math.min(1, state.spreadHeat + 0.16)
    state.shotCount++
    state.flashT = 0.045
    const m = models[state.current]
    m.flash.visible = true
    m.flash.rotation.z = Math.random() * Math.PI
    m.flash.scale.setScalar(0.8 + Math.random() * 0.55)
    m.flashLight.intensity = 16 + Math.random() * 8
    m.flash.children.forEach((s) => {
      if (s.isSprite) {
        s.scale.setScalar((0.15 + Math.random() * 0.12) * (state.current === 'rifle' ? 1.6 : 1))
        s.material.rotation = Math.random() * 6.28
      }
    })
    audio?.shoot?.(c.audio)
    events.onShot?.({
      weapon: state.current,
      spread: getSpread(),
      muzzle: getMuzzleWorld(),
      ads: state.ads
    })
    return { fired: true, spread: getSpread(), ammo: state.ammo[state.current] }
  }

  function getSpread() {
    const c = cfg()
    const base = c.spread + (c.adsSpread - c.spread) * state.ads
    const move = state.sprint * 0.03
    return base + move + state.spreadHeat * 0.018 * (1 - state.ads * 0.65)
  }

  const _muzzlePos = new THREE.Vector3()
  function getMuzzleWorld() {
    models[state.current].muzzle.getWorldPosition(_muzzlePos)
    return _muzzlePos.clone()
  }

  function update(dt, input = {}) {
    const c = cfg()
    const moving = input.moving ?? 0
    const sprintTarget = input.sprinting ? 1 : 0
    state.sprint = damp(state.sprint, sprintTarget, 8, dt)
    const adsTarget = state.adsHeld && !input.sprinting && !state.reloading ? 1 : 0
    state.ads = damp(state.ads, adsTarget, 13, dt)
    state.cooldown = Math.max(0, state.cooldown - dt)
    state.spreadHeat = Math.max(0, state.spreadHeat - dt * 1.7)
    state.lookX = damp(state.lookX, 0, 7, dt)
    state.lookY = damp(state.lookY, 0, 7, dt)
    state.kick = damp(state.kick, 0, 13, dt)
    state.kickRot = damp(state.kickRot, 0, 11, dt)
    state.flashT = Math.max(0, state.flashT - dt)
    if (state.flashT <= 0) {
      const m = models[state.current]
      m.flash.visible = false
      m.flashLight.intensity = 0
    }

    if (state.switching > 0) {
      state.switching -= dt
      state.swapT += dt
      const total = 0.55
      const k = 1 - state.switching / total
      const prev = models[state.swapFrom]
      const next = models[state.current]
      if (k < 0.5) {
        prev.group.position.y = -0.165 - k * 0.5
        prev.group.visible = true
        next.group.visible = false
      } else {
        prev.group.visible = false
        next.group.visible = true
        next.group.position.y = -0.165 - (1 - k) * 0.5
        if (state.switching <= 0) {
          const base = new THREE.Vector3(0.13, -0.165, -0.36)
          next.group.position.copy(base)
          events.onEvent?.('switched', state.current)
        }
      }
    }

    if (state.reloading) {
      state.reloadT += dt
      const p = state.reloadT / state.reloadDuration
      if (p >= 0.72 && state.ammo[state.current] === 0) {
        // ammo swap moment handled below, but allow partial reloads too
      }
      if (p >= 0.7 && !state._reloaded) {
        const need = c.mag - state.ammo[state.current]
        const take = Math.min(need, state.reserve[state.current])
        state.ammo[state.current] += take
        state.reserve[state.current] -= take
        state._reloaded = true
        audio?.reloadMagIn?.()
        events.onReloadComplete?.(state.current)
      }
      if (p >= 1) {
        state.reloading = false
        state._reloaded = false
        if (audio) audio.reloadBolt?.()
      }
    }

    const m = models[state.current]
    if (state.switching <= 0) {
      const isAds = state.ads
      const hip = new THREE.Vector3(0.13, -0.165, -0.36)
      const ads = new THREE.Vector3(0.0, -0.106, -0.29)
      const target = hip.clone().lerp(ads, isAds)
      // sprint pose
      target.lerp(new THREE.Vector3(0.14, -0.20, -0.36), state.sprint * 0.85)
      // reload dip
      if (state.reloading) {
        const p = state.reloadT / state.reloadDuration
        const dip = Math.sin(Math.min(1, p) * Math.PI)
        target.y -= dip * 0.10
        target.x -= dip * 0.05
        target.z += dip * 0.03
      }
      // bob & breathe
      const bobT = performance.now() * 0.001
      const bobAmt = (1 - isAds * 0.8) * moving
      const breathe = Math.sin(bobT * 1.7) * 0.0018 * (1 - isAds * 0.5)
      target.x += Math.sin(bobT * (input.sprinting ? 12 : 8)) * 0.009 * bobAmt + breathe
      target.y += Math.abs(Math.cos(bobT * (input.sprinting ? 12 : 8))) * 0.008 * bobAmt + Math.sin(bobT * 2.3) * 0.0015
      target.z += Math.cos(bobT * 2) * 0.002
      m.group.position.lerp(target, 1 - Math.exp(-13 * dt))
      // sway from look
      m.group.rotation.y = -0.035 * (1 - isAds) + state.lookX * 1.6 * (1 - isAds * 0.65) + state.sprint * 0.5
      m.group.rotation.x = 0.015 * (1 - isAds) + state.lookY * 1.3 * (1 - isAds * 0.65) + state.kickRot * 0.035 - state.sprint * 0.18
      m.group.rotation.z = 0.02 * (1 - isAds) + state.lookX * -0.6 * (1 - isAds * 0.65) + state.sprint * 0.18
      m.group.position.z += state.kick * 0.028
      m.group.position.y += state.kickRot * 0.008
      // reload animation
      const reloading = state.reloading
      const p = reloading ? state.reloadT / state.reloadDuration : 0
      m.magGroup.position.set(0, 0, 0)
      m.magGroup.rotation.set(0, 0, 0)
      m.magGroup.visible = true
      if (reloading) {
        m.group.rotation.z += Math.sin(p * Math.PI) * 0.28
        m.group.rotation.x += Math.sin(p * Math.PI) * 0.16
        if (p > 0.18 && p < 0.52) {
          const k = (p - 0.18) / 0.34
          m.magGroup.position.y = -k * 0.35
          m.magGroup.rotation.x = k * 0.5
          if (k > 0.7) m.magGroup.visible = false
        } else if (p >= 0.52 && p < 0.66) {
          m.magGroup.visible = false
        } else if (p >= 0.66 && p < 0.78) {
          const k = (p - 0.66) / 0.12
          m.magGroup.visible = true
          m.magGroup.position.y = -(1 - k) * 0.3
        }
        if (m.leftHandGroup) {
          m.leftHandGroup.position.y = -Math.sin(Math.min(1, p) * Math.PI) * 0.08
          m.leftHandGroup.position.z = Math.sin(Math.min(1, p) * Math.PI) * 0.06
        }
      } else {
        if (m.leftHandGroup) m.leftHandGroup.position.set(0, 0, 0)
      }
    }
  }

  function setADS(v) {
    state.adsHeld = !!v
  }

  function reset() {
    state.current = 'rifle'
    state.ammo.rifle = configs.rifle.mag
    state.ammo.pistol = configs.pistol.mag
    state.reserve.rifle = configs.rifle.reserve
    state.reserve.pistol = configs.pistol.reserve
    state.ads = 0
    state.adsHeld = false
    state.reloading = false
    state.reloadT = 0
    state._reloaded = false
    state.switching = 0
    state.cooldown = 0
    state.kick = 0
    state.kickRot = 0
    state.spreadHeat = 0
    state.shotCount = 0
    state.flashT = 0
    state.triggerReleased = true
    models.rifle.group.visible = true
    models.pistol.group.visible = false
    models.rifle.group.position.set(0.13, -0.165, -0.36)
    models.pistol.group.position.set(0.12, -0.14, -0.34)
    for (const m of [models.rifle, models.pistol]) {
      m.flash.visible = false
      m.flashLight.intensity = 0
    }
  }

  function triggerDown() {
    if (!state.triggerReleased) return null
    state.triggerReleased = false
    return fire()
  }
  function triggerUp() {
    state.triggerReleased = true
  }

  return {
    root, state, configs, models,
    update, fire, reload, switchTo, setADS, setLookDelta, reset,
    triggerDown, triggerUp, getSpread, getMuzzleWorld,
    set onReloadComplete(fn) { events.onReloadComplete = fn },
    set onShot(fn) { events.onShot = fn },
    set onEvent(fn) { events.onEvent = fn },
    get currentKey() { return state.current },
    get ammo() { return state.ammo[state.current] },
    get reserve() { return state.reserve[state.current] },
    get maxMag() { return cfg().mag },
    get reloading() { return state.reloading },
    get ads() { return state.ads },
    get adsHeld() { return state.adsHeld },
    get weaponName() { return cfg().name },
    get adsFov() { return cfg().adsFov },
    get shotCount() { return state.shotCount },
    get isSprinting() { return state.sprint > 0.5 }
  }
}
