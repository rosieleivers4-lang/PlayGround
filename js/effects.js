import * as THREE from 'three'

/* Pooled combat effects: impacts, tracers, blood, sparks, shells, decals. */
export function createEffects(scene, tex) {
  const group = new THREE.Group()
  group.name = 'effects'
  scene.add(group)

  const rnd = () => Math.random()

  /* --------------------------- tracers --------------------------- */
  const tracerPool = []
  for (let i = 0; i < 14; i++) {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
    const mat = new THREE.LineBasicMaterial({ color: 0xffd08a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    const line = new THREE.Line(geo, mat)
    line.frustumCulled = false
    line.visible = false
    group.add(line)
    tracerPool.push({ line, life: 0, max: 0.07 })
  }
  let tracerIdx = 0

  function tracer(from, to, color = 0xffc070) {
    const t = tracerPool[tracerIdx++ % tracerPool.length]
    const p = t.line.geometry.attributes.position
    p.setXYZ(0, from.x, from.y, from.z)
    p.setXYZ(1, to.x, to.y, to.z)
    p.needsUpdate = true
    t.line.material.color.setHex(color)
    t.line.material.opacity = 0.85
    t.line.visible = true
    t.life = t.max
    t.line.geometry.computeBoundingSphere()
  }

  /* --------------------------- decals --------------------------- */
  const decalGeo = new THREE.PlaneGeometry(1, 1)
  const holeMat = new THREE.MeshBasicMaterial({
    map: tex.bulletDecal, transparent: true, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6, opacity: 0.95
  })
  const decals = []
  for (let i = 0; i < 48; i++) {
    const m = new THREE.Mesh(decalGeo, holeMat)
    m.visible = false
    m.renderOrder = 3
    group.add(m)
    decals.push(m)
  }
  let decalIdx = 0
  function bulletHole(point, normal) {
    const m = decals[decalIdx++ % decals.length]
    m.position.copy(point).addScaledVector(normal, 0.012)
    m.lookAt(point.clone().add(normal))
    m.rotateZ(Math.random() * Math.PI * 2)
    const s = 0.09 + Math.random() * 0.05
    m.scale.set(s, s, 1)
    m.visible = true
  }

  /* --------------------------- sprites -------------------------- */
  const puffs = []
  const puffGeo = new THREE.PlaneGeometry(1, 1)
  for (let i = 0; i < 90; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex.smoke, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xd8c6a8
    })
    const m = new THREE.Mesh(puffGeo, mat)
    m.visible = false
    m.renderOrder = 4
    group.add(m)
    puffs.push({ m, vel: new THREE.Vector3(), life: 0, max: 1, size: 1, grow: 1, dark: false })
  }
  let puffIdx = 0
  function puff(point, opts = {}) {
    const p = puffs[puffIdx++ % puffs.length]
    p.m.position.copy(point)
    p.m.material.color.setHex(opts.color ?? 0xd8c6a8)
    p.m.material.blending = opts.additive === false ? THREE.NormalBlending : THREE.AdditiveBlending
    p.m.material.opacity = opts.opacity ?? 0.55
    p.m.visible = true
    p.vel.copy(opts.vel || new THREE.Vector3((rnd() - 0.5) * 2, 0.4 + rnd(), (rnd() - 0.5) * 2))
    p.size = opts.size ?? 0.25
    p.grow = opts.grow ?? 2.2
    p.life = p.max = opts.life ?? 0.7
    p.m.scale.setScalar(p.size)
    p.m.rotation.z = rnd() * 6.28
    p.fadeIn = opts.fadeIn ?? 0.1
  }

  /* ---------------------------- sparks -------------------------- */
  const sparks = []
  const sparkGeo = new THREE.BufferGeometry()
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3))
  for (let i = 0; i < 70; i++) {
    const mat = new THREE.PointsMaterial({
      size: 0.045, map: tex.spark, color: 0xffc070, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    const pts = new THREE.Points(sparkGeo.clone(), mat)
    pts.visible = false
    group.add(pts)
    sparks.push({ pts, vel: new THREE.Vector3(), life: 0, max: 0.35 })
  }
  let sparkIdx = 0
  function sparkBurst(point, normal, count = 1) {
    for (let k = 0; k < count; k++) {
      const s = sparks[sparkIdx++ % sparks.length]
      const pos = s.pts.geometry.attributes.position
      pos.setXYZ(0, point.x, point.y, point.z)
      pos.needsUpdate = true
      s.vel.set(normal.x * 2 + (rnd() - 0.5) * 5, normal.y * 2 + rnd() * 4, normal.z * 2 + (rnd() - 0.5) * 5)
      s.life = s.max = 0.18 + rnd() * 0.25
      s.pts.material.opacity = 1
      s.pts.material.size = 0.03 + rnd() * 0.03
      s.pts.visible = true
    }
  }

  /* ------------------------ bullet impact ----------------------- */
  function impact(point, normal, kind = 'concrete') {
    bulletHole(point, normal)
    const spark = kind === 'metal' || kind === 'stone'
    const dustColor = kind === 'metal' ? 0xffcf8a : kind === 'wood' ? 0xb99a6a : kind === 'flesh' ? 0x6a0b0b : 0xcfc3ad
    puff(point, { color: dustColor, size: 0.16, grow: 2.4, life: 0.55, opacity: spark ? 0.3 : 0.5, additive: !spark })
    puff(point, { color: dustColor, size: 0.1, grow: 3.0, life: 0.9, opacity: 0.25, additive: false })
    if (spark) {
      sparkBurst(point, normal, 3)
    }
    for (let i = 0; i < 3; i++) {
      puff(point, {
        color: dustColor, size: 0.06, grow: 2, life: 0.35,
        vel: new THREE.Vector3(normal.x * 1.5 + (rnd() - 0.5), normal.y * 1.5 + rnd(), normal.z * 1.5 + (rnd() - 0.5)),
        opacity: 0.3
      })
    }
  }

  function blood(point, dir) {
    for (let i = 0; i < 4; i++) {
      puff(point, {
        color: 0x5e0b0c, size: 0.14, grow: 1.8, life: 0.6, opacity: 0.75, additive: false,
        vel: new THREE.Vector3(dir.x * 1.5 + (rnd() - 0.5) * 2, dir.y * 1.5 + rnd() * 2, dir.z * 1.5 + (rnd() - 0.5) * 2)
      })
    }
    puff(point, { color: 0x3a0608, size: 0.1, grow: 4, life: 0.8, opacity: 0.4, additive: false })
  }

  /* --------------------------- shells --------------------------- */
  const shellGeo = new THREE.CylinderGeometry(0.008, 0.009, 0.038, 6)
  const shellMat = new THREE.MeshStandardMaterial({ color: 0xc9a44e, metalness: 0.9, roughness: 0.32, envMapIntensity: 1.4 })
  const shells = []
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(shellGeo, shellMat)
    m.visible = false
    group.add(m)
    shells.push({ m, vel: new THREE.Vector3(), spin: new THREE.Vector3(), life: 0, max: 2.2 })
  }
  let shellIdx = 0
  function ejectShell(pos, right) {
    const s = shells[shellIdx++ % shells.length]
    s.m.visible = true
    s.m.position.copy(pos)
    s.vel.set(right.x * (1.3 + rnd()) + (rnd() - 0.5) * 0.6, 1.2 + rnd() * 0.8, right.z * (0.6 + rnd()) + 0.2)
    s.spin.set(rnd() * 20, rnd() * 20, rnd() * 20)
    s.life = s.max
  }

  /* --------------------------- update --------------------------- */
  function update(dt) {
    for (const t of tracerPool) {
      if (t.life > 0) {
        t.life -= dt
        t.line.material.opacity = Math.max(0, t.life / t.max) * 0.9
        if (t.life <= 0) t.line.visible = false
      }
    }
    for (const p of puffs) {
      if (!p.m.visible) continue
      p.life -= dt
      if (p.life <= 0) { p.m.visible = false; continue }
      const k = 1 - p.life / p.max
      p.m.position.addScaledVector(p.vel, dt)
      p.vel.multiplyScalar(0.94)
      p.vel.y += dt * 0.25
      p.m.scale.setScalar(p.size + k * p.grow * p.size)
      p.m.material.opacity = (1 - k) * (1 - k) * 0.7
      p.m.quaternion.copy(scene.userData.cameraQuat || p.m.quaternion)
    }
    for (const s of sparks) {
      if (!s.pts.visible) continue
      s.life -= dt
      if (s.life <= 0) { s.pts.visible = false; continue }
      const pos = s.pts.geometry.attributes.position
      s.vel.y -= 9.8 * dt
      pos.setXYZ(0, pos.getX(0) + s.vel.x * dt, pos.getY(0) + s.vel.y * dt, pos.getZ(0) + s.vel.z * dt)
      pos.needsUpdate = true
      s.pts.material.opacity = Math.max(0, s.life / s.max)
    }
    for (const s of shells) {
      if (!s.m.visible) continue
      s.life -= dt
      if (s.life <= 0) { s.m.visible = false; continue }
      s.vel.y -= 9.8 * dt
      s.m.position.addScaledVector(s.vel, dt)
      s.m.rotation.x += s.spin.x * dt
      s.m.rotation.y += s.spin.y * dt
      s.m.rotation.z += s.spin.z * dt
      if (s.m.position.y < 0.02) {
        s.m.position.y = 0.02
        s.vel.multiplyScalar(0.3)
        s.vel.y = Math.abs(s.vel.y) * 0.25
        s.spin.multiplyScalar(0.5)
      }
    }
  }

  // keep billboarded puffs oriented to camera
  const camQuat = new THREE.Quaternion()
  function faceCamera(camera) {
    camQuat.copy(camera.quaternion)
    scene.userData.cameraQuat = camQuat
  }

  return { group, impact, blood, tracer, ejectShell, update, faceCamera, bullets: decals }
}
