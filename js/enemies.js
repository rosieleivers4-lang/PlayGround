import * as THREE from 'three'
import { buildSoldier } from './soldier-model.js'

/* ------------------------------------------------------------------ *
 *  Hostile force: soldier rigs, perception, squad pressure, gunfire.
 * ------------------------------------------------------------------ */

const rand = (a = 0, b = 1) => a + Math.random() * (b - a)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const damp = (a, b, l, dt) => a + (b - a) * (1 - Math.exp(-l * dt))

export function createEnemySystem({ scene, level, tex, audio, effects, player }) {
  const enemies = []
  const queue = []
  const group = new THREE.Group()
  group.name = 'hostiles'
  scene.add(group)
  const raycaster = new THREE.Raycaster()
  const tmp = new THREE.Vector3()
  const eye = new THREE.Vector3()
  const target = new THREE.Vector3()
  const api = {
    enemies,
    get hitboxes() {
      const out = []
      for (const e of enemies) if (e.alive) out.push(...e.hitboxes.map((h) => h.mesh))
      return out
    },
    get remaining() {
      return enemies.filter((e) => e.alive).length + queue.length
    },
    get waveTotal() { return api._waveTotal || 0 },
    onPlayerHit: null,
    onKill: null,
    onAlert: null
  }

  function makeFlash() {
    const mat = new THREE.SpriteMaterial({
      map: tex.spark, color: 0xffb25a, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
    const s = new THREE.Sprite(mat)
    s.scale.setScalar(0.35)
    s.visible = false
    return s
  }

  function spawnOne(phase, spawnHint) {
    const variant = Math.floor(rand(0, 4))
    let model
    try {
      model = buildSoldier(THREE, {}, { variant })
    } catch (err) {
      console.error('soldier build failed', err)
      return null
    }
    const e = {
      ref: model,
      group: model.group,
      refs: model.refs,
      hitboxes: [],
      health: 100,
      alive: true,
      alerted: false,
      state: 'patrol',
      stateT: rand(0, 3),
      deathT: 0,
      fireT: rand(0.4, 1.4),
      burst: 0,
      burstT: 0,
      strafe: Math.random() < 0.5 ? -1 : 1,
      flinch: 0,
      speed: rand(0.85, 1.12),
      walkT: rand(0, 10),
      moving: 0,
      waypoint: null,
      suppressT: 0,
      flashT: 0,
      phase
    }
    // spawn point selection: prefer distance from player and from other hostiles
    let best = null
    let bestScore = -Infinity
    const spots = level.spawnPoints
    for (let i = 0; i < 14; i++) {
      const p = spawnHint || spots[Math.floor(rand(0, spots.length))]
      const d = Math.hypot(p.x - player.pos.x, p.z - player.pos.z)
      let score = Math.min(d, 40) + rand(0, 10)
      if (d < 16) score -= 30
      for (const o of enemies) {
        if (!o.alive) continue
        const od = Math.hypot(p.x - o.group.position.x, p.z - o.group.position.z)
        if (od < 4) score -= 20
      }
      if (score > bestScore) { bestScore = score; best = p }
    }
    const p = best || spots[0]
    e.group.position.set(p.x + rand(-1.2, 1.2), 0, p.z + rand(-1.2, 1.2))
    e.group.rotation.y = Math.atan2(-(player.pos.x - p.x), -(player.pos.z - p.z)) + rand(-0.5, 0.5)
    group.add(e.group)

    // hitboxes
    for (const hb of model.hitboxes) {
      const mesh = hb.mesh
      mesh.visible = false
      mesh.userData.enemyRef = e
      mesh.userData.part = hb.part
      mesh.raycast = THREE.Mesh.prototype.raycast
      if (!mesh.parent) {
        // fall back: attach to the group so it follows the body
        if (hb.part === 'head' && model.refs.head) model.refs.head.add(mesh)
        else if (hb.part === 'body' && model.refs.chest) model.refs.chest.add(mesh)
        else group.add(mesh)
      }
      e.hitboxes.push({ mesh, part: hb.part })
    }

    // muzzle flash follows rifle
    const flash = makeFlash()
    const muzzle = model.muzzle || model.refs.muzzle
    if (muzzle) muzzle.add(flash)
    else e.group.add(flash)
    e.flash = flash
    e.muzzle = muzzle

    // NVG glint / optic indicator
    e.refs.nvgGlow?.material?.color?.setHex(0x58ff9a)

    enemies.push(e)
    return e
  }

  function spawnWave(phase, count) {
    api._waveTotal = count
    api._phase = phase
    // clear old corpses once the new wave begins
    enemies.length = 0
    for (const c of [...group.children]) {
      group.remove(c)
      c.traverse?.((o) => {
        if (o.geometry) o.geometry.dispose()
      })
    }
    queue.length = 0
    for (let i = 0; i < count; i++) {
      queue.push({ delay: 0.5 + i * rand(0.8, 1.4), spawned: false })
    }
  }

  function reset() {
    queue.length = 0
    for (const e of enemies) {
      group.remove(e.group)
      e.ref.dispose?.()
    }
    enemies.length = 0
  }

  function alertAt(pos, radius) {
    for (const e of enemies) {
      if (!e.alive || e.alerted) continue
      const d = Math.hypot(e.group.position.x - pos.x, e.group.position.z - pos.z)
      if (d < radius) {
        e.alerted = true
        e.state = 'combat'
        e.stateT = 0
        api.onAlert?.(e)
      }
    }
  }

  function hasLOS(e) {
    const p = e.group.position
    eye.set(p.x, 1.55, p.z)
    target.set(player.pos.x, 1.15, player.pos.z)
    const dir = tmp.copy(target).sub(eye)
    const dist = dir.length()
    dir.normalize()
    raycaster.set(eye, dir)
    raycaster.far = dist - 0.4
    const hits = raycaster.intersectObjects(level.solidMeshes, false)
    return hits.length === 0
  }

  function moveEnemy(e, dx, dz) {
    const R = 0.42
    const pos = e.group.position
    pos.x += dx
    for (const c of level.colliders) {
      if (pos.z > c.minZ - R && pos.z < c.maxZ + R && pos.x > c.minX - R && pos.x < c.maxX + R) {
        if (dx > 0) pos.x = c.minX - R
        else if (dx < 0) pos.x = c.maxX + R
        else pos.x += (Math.random() - 0.5) * 0.15
      }
    }
    pos.z += dz
    for (const c of level.colliders) {
      if (pos.x > c.minX - R && pos.x < c.maxX + R && pos.z > c.minZ - R && pos.z < c.maxZ + R) {
        if (dz > 0) pos.z = c.minZ - R
        else if (dz < 0) pos.z = c.maxZ + R
        else pos.z += (Math.random() - 0.5) * 0.15
      }
    }
    pos.x = clamp(pos.x, -36, 36)
    pos.z = clamp(pos.z, -37, 39)
  }

  function shoot(e, dist) {
    const muzzlePos = new THREE.Vector3()
    if (e.muzzle) e.muzzle.getWorldPosition(muzzlePos)
    else muzzlePos.set(e.group.position.x, 1.35, e.group.position.z)
    const playerTarget = new THREE.Vector3(
      player.pos.x + rand(-0.25, 0.25),
      player.pos.y + player.eye + rand(-0.35, 0.3),
      player.pos.z + rand(-0.25, 0.25)
    )
    const miss = rand(0, 1) > clamp(0.62 - dist * 0.007, 0.16, 0.55) * (player.moving > 0.5 ? 0.72 : 1)
    if (miss) {
      playerTarget.x += rand(-2.2, 2.2)
      playerTarget.y += rand(-0.8, 1.6)
      playerTarget.z += rand(-1.4, 1.4)
    }
    effects.tracer(muzzlePos, playerTarget, 0xff8a4a)
    const along = new THREE.Vector3().subVectors(playerTarget, muzzlePos).normalize()
    effects.puff(muzzlePos, {
      color: 0xffc080, size: 0.12, grow: 3, life: 0.22, opacity: 0.6,
      additive: true, vel: along.clone().multiplyScalar(3)
    })
    audio.enemyShoot?.(dist)
    if (!miss) {
      api.onPlayerHit?.(rand(5.5, 9.5), e.group.position, false)
    } else if (dist < 30) {
      audio.whizz?.()
    }
    e.flashT = 0.05
    if (e.flash) {
      e.flash.visible = true
      e.flash.material.opacity = 1
      e.flash.material.rotation = rand(0, 6.28)
      e.flash.scale.setScalar(rand(0.22, 0.38))
    }
  }

  function animate(e, dt, time) {
    const r = e.refs
    e.flinch = damp(e.flinch, 0, 8, dt)
    const moving = e.moving
    e.walkT += dt * (4.5 + moving * 5.5)
    const swing = Math.sin(e.walkT) * 0.55 * moving
    if (r.hipL) r.hipL.rotation.x = swing
    if (r.hipR) r.hipR.rotation.x = -swing
    if (r.kneeL) r.kneeL.rotation.x = Math.max(0, -swing) * 0.9 + 0.05
    if (r.kneeR) r.kneeR.rotation.x = Math.max(0, swing) * 0.9 + 0.05
    if (r.shoulderL) r.shoulderL.rotation.x = 0.9 + Math.sin(e.walkT * 0.5) * 0.03
    if (r.shoulderR) r.shoulderR.rotation.x = 0.85 - e.flinch * 0.15
    if (r.elbowL) r.elbowL.rotation.x = 0.65
    if (r.elbowR) r.elbowR.rotation.x = 0.7
    if (r.spine) r.spine.rotation.x = 0.05 + e.flinch * 0.12
    if (r.chest) {
      r.chest.rotation.x = -e.flinch * 0.16
      r.chest.rotation.z = Math.sin(time * 1.1 + e.walkT) * 0.012
    }
    if (r.hips) r.hips.position.y = Math.abs(Math.sin(e.walkT)) * 0.025 * moving
    if (r.head) {
      // scan when idle, track player when alerted
      if (e.alerted) {
        r.head.rotation.y = clamp(-e.group.rotation.y + Math.atan2(-(player.pos.x - e.group.position.x), -(player.pos.z - e.group.position.z)), -0.5, 0.5) * 0.4
        r.head.rotation.x = 0
      } else {
        r.head.rotation.y = Math.sin(time * 0.7 + e.walkT * 0.1) * 0.35
      }
    }
  }

  function update(dt, time, playerRef, dyingOnly = false) {
    // spawn queue
    for (const q of queue) {
      if (!q.spawned) {
        q.delay -= dt
        if (q.delay <= 0) {
          q.spawned = true
          spawnOne(api._phase || 1)
        }
      }
    }
    for (let i = queue.length - 1; i >= 0; i--) if (queue[i].spawned) queue.splice(i, 1)

    for (const e of enemies) {
      if (!e.alive) {
        e.deathT += dt
        const k = Math.min(1, e.deathT / 0.65)
        const ease = 1 - Math.pow(1 - k, 3)
        e.group.rotation.x = -ease * Math.PI * 0.5
        e.group.rotation.z = ease * 0.18 * e.strafe
        e.group.position.y = 0
        if (e.deathT > 12) {
          e.group.visible = false
        }
        continue
      }
      if (dyingOnly) continue

      const px = player.pos.x, pz = player.pos.z
      const dx = px - e.group.position.x
      const dz = pz - e.group.position.z
      const dist = Math.hypot(dx, dz)
      const nx = dx / (dist || 1), nz = dz / (dist || 1)

      // perception
      if (!e.alerted) {
        const los = dist < 34 && hasLOS(e)
        if (los || dist < 9 || (e.phase >= 3 && dist < 26)) {
          e.alerted = true
          e.state = 'combat'
          e.stateT = 0
          api.onAlert?.(e)
        }
      }

      e.stateT -= dt
      let moveSpeed = 0
      if (e.alerted) {
        // face the player
        const wantYaw = Math.atan2(-dx, -dz)
        let dy = wantYaw - e.group.rotation.y
        while (dy > Math.PI) dy -= Math.PI * 2
        while (dy < -Math.PI) dy += Math.PI * 2
        e.group.rotation.y += clamp(dy, -3.2 * dt, 3.2 * dt)

        // maintain fighting distance, strafe, use cover-ish spacing
        const los = hasLOS(e)
        let mx = 0, mz = 0
        if (!los || dist > 19) {
          // advance, slightly offset to avoid stacking
          mx = nx + nz * 0.22 * e.strafe
          mz = nz - nx * 0.22 * e.strafe
          moveSpeed = 2.7 * e.speed
        } else if (dist < 7.5) {
          mx = -nx + nz * 0.5 * e.strafe
          mz = -nz - nx * 0.5 * e.strafe
          moveSpeed = 2.0 * e.speed
        } else if (e.stateT < 0) {
          e.stateT = rand(1.4, 3.4)
          e.strafe *= Math.random() < 0.45 ? -1 : 1
        } else {
          mx = -nz * e.strafe + nx * 0.15
          mz = nx * e.strafe + nz * 0.15
          moveSpeed = 1.25 * e.speed
        }
        if (e.suppressT > 0) {
          e.suppressT -= dt
          moveSpeed *= 0.25
        }
        if (moveSpeed > 0) {
          const len = Math.hypot(mx, mz) || 1
          const beforeX = e.group.position.x, beforeZ = e.group.position.z
          moveEnemy(e, mx / len * moveSpeed * dt, mz / len * moveSpeed * dt)
          const travelled = Math.hypot(e.group.position.x - beforeX, e.group.position.z - beforeZ)
          e.moving = damp(e.moving, travelled > 0.0005 ? 1 : 0, 10, dt)
          // unstick
          if (travelled < moveSpeed * dt * 0.15) {
            e.strafe *= -1
            e.suppressT = Math.max(e.suppressT, 0.3)
          }
        } else {
          e.moving = damp(e.moving, 0, 10, dt)
        }

        // shooting
        e.fireT -= dt
        if (e.burst > 0) {
          e.burstT -= dt
          if (e.burstT <= 0 && los && dist < 50) {
            e.burst--
            e.burstT = rand(0.1, 0.16)
            shoot(e, dist)
            if (e.burst <= 0) e.fireT = rand(1.0, 2.4)
          }
        } else if (e.fireT <= 0 && los && dist < 48) {
          if (Math.random() < 0.75) {
            e.burst = Math.floor(rand(3, 6))
            e.burstT = 0.05
          } else {
            e.fireT = rand(0.6, 1.2)
          }
        }
      } else {
        // patrol loosely toward the compound center / cover
        e.moving = damp(e.moving, 0, 6, dt)
        if (e.stateT < 0) {
          e.stateT = rand(2, 5)
          const spot = level.coverPoints[Math.floor(rand(0, level.coverPoints.length))]
          e.waypoint = spot
        }
        if (e.waypoint) {
          const wx = e.waypoint.x - e.group.position.x
          const wz = e.waypoint.z - e.group.position.z
          const wd = Math.hypot(wx, wz)
          if (wd > 1.2) {
            e.group.rotation.y = Math.atan2(-wx, -wz)
            moveEnemy(e, wx / wd * 1.05 * dt, wz / wd * 1.05 * dt)
            e.moving = damp(e.moving, 1, 6, dt)
          } else e.waypoint = null
        }
      }

      // muzzle flash fade
      if (e.flashT > 0) {
        e.flashT -= dt
        if (e.flashT <= 0 && e.flash) {
          e.flash.visible = false
          e.flash.material.opacity = 0
        }
      }

      animate(e, dt, time)
      e.group.position.y = 0
    }
  }

  function hit(e, amount, part, point, dir) {
    if (!e || !e.alive) return { killed: false, headshot: false }
    const headshot = part === 'head'
    e.health -= amount
    e.flinch = 1
    e.alerted = true
    e.suppressT = 0.55
    if (e.health <= 0) {
      e.alive = false
      e.deathT = 0
      e.strafe = Math.random() < 0.5 ? -1 : 1
      e.group.rotation.y = Math.atan2(-(player.pos.x - e.group.position.x), -(player.pos.z - e.group.position.z))
      api.onKill?.({ enemy: e, headshot })
      return { killed: true, headshot }
    }
    return { killed: false, headshot }
  }

  function suppress(point, radius) {
    for (const e of enemies) {
      if (!e.alive) continue
      if (Math.hypot(e.group.position.x - point.x, e.group.position.z - point.z) < radius) {
        e.suppressT = 0.8
        if (!e.alerted) { e.alerted = true; e.state = 'combat'; api.onAlert?.(e) }
      }
    }
  }

  api.spawnWave = spawnWave
  api.spawn = (n = 1) => { for (let i = 0; i < n; i++) spawnOne(api._phase || 1) }
  api.reset = reset
  api.update = update
  api.hit = hit
  api.alertAt = alertAt
  api.suppress = suppress
  return api
}
