/* HUD controller: compass, minimap, vitals, ammo, killfeed, notifications. */

const $ = (id) => document.getElementById(id)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function createHUD() {
  const hud = $('hud')
  const text = {
    phase: $('phase-num'),
    objTitle: $('obj-title'),
    objSub: $('obj-sub'),
    hostiles: $('hostile-count'),
    objProgress: $('obj-progress'),
    compassStrip: $('compass-strip'),
    compassHeading: $('compass-heading'),
    health: $('health-num'),
    healthBar: $('health-bar'),
    vitalStatus: $('vital-status'),
    pulse: $('pulse-line'),
    ammoMag: $('ammo-mag'),
    ammoReserve: $('ammo-reserve'),
    ammoWeapon: $('ammo-weapon'),
    ammoCal: $('ammo-cal'),
    fireMode: $('fire-mode'),
    ammoBar: $('ammo-bar'),
    reloadBar: $('reload-bar'),
    reloadProgress: $('reload-progress'),
    kills: $('stat-kills'),
    heads: $('stat-heads'),
    acc: $('stat-acc'),
    time: $('stat-time'),
    crosshair: $('crosshair'),
    hitmarker: $('hitmarker'),
    notify: $('notify'),
    notifyMain: $('notify-main'),
    notifySub: $('notify-sub'),
    killfeed: $('killfeed'),
    toast: $('toast'),
    damage: $('damage'),
    minimap: $('minimap'),
    death: $('death'),
    victory: $('victory'),
    pause: $('pause'),
    deathKills: $('death-kills'),
    deathHeads: $('death-heads'),
    deathAcc: $('death-acc'),
    deathTime: $('death-time'),
    winKills: $('win-kills'),
    winHeads: $('win-heads'),
    winAcc: $('win-acc'),
    winTime: $('win-time'),
    deathLine: $('death-line')
  }

  /* ------------------------- compass ------------------------- */
  const PPX = 7 // pixels per degree
  const spanDeg = 0
  for (let deg = -180; deg <= 540; deg += 5) {
    const tick = document.createElement('i')
    const major = deg % 15 === 0
    if (major) tick.className = 'major'
    tick.style.left = `${(deg + 180) * PPX}px`
    text.compassStrip.appendChild(tick)
  }
  for (let deg = -180; deg <= 540; deg += 15) {
    const span = document.createElement('span')
    const d = ((deg % 360) + 360) % 360
    if (d % 90 === 0) {
      span.className = 'major cardinal'
      span.textContent = ['N', 'E', 'S', 'W'][d / 90]
    } else if (d % 45 === 0) {
      span.className = 'major'
      span.textContent = String(d).padStart(3, '0')
    } else {
      span.className = ''
      span.textContent = String(d).padStart(3, '0')
    }
    span.style.left = `${(deg + 180) * PPX}px`
    text.compassStrip.appendChild(span)
  }
  let compassWidth = 480
  function setCompass(yaw, width) {
    const measured = document.getElementById('compass')?.getBoundingClientRect().width
    if (width) compassWidth = width
    else if (measured > 100) compassWidth = measured
    // camera yaw 0 faces north (-Z)
    const heading = ((-yaw * 180 / Math.PI) % 360 + 360) % 360
    // strip coordinate: deg -180 at 0, deg heading at (heading+180)*PPX
    text.compassStrip.style.transform = `translateX(${compassWidth / 2 - (heading + 180) * PPX}px)`
    text.compassHeading.textContent = String(Math.round(heading) % 360).padStart(3, '0')
    return heading
  }

  /* ------------------------- minimap ------------------------- */
  const map = text.minimap
  const mctx = map.getContext('2d')
  function drawMinimap({ colliders = [], enemies = [], player, yaw = 0, range = 46 }) {
    const W = map.width, H = map.height
    const cx = W / 2, cy = H / 2
    const s = (W / 2) / range
    mctx.save()
    mctx.clearRect(0, 0, W, H)
    mctx.beginPath()
    mctx.arc(cx, cy, W / 2 - 2, 0, Math.PI * 2)
    mctx.clip()
    mctx.fillStyle = 'rgba(7,10,11,0.94)'
    mctx.fillRect(0, 0, W, H)
    // grid
    mctx.strokeStyle = 'rgba(160,180,175,0.055)'
    mctx.lineWidth = 1
    for (let i = -range; i <= range; i += 10) {
      const p = i * s
      mctx.beginPath(); mctx.moveTo(cx + p, 0); mctx.lineTo(cx + p, H); mctx.stroke()
      mctx.beginPath(); mctx.moveTo(0, cy + p); mctx.lineTo(W, cy + p); mctx.stroke()
    }
    const cos = Math.cos(yaw), sin = Math.sin(yaw)
    const toScreen = (wx, wz) => {
      const dx = wx - player.x, dz = wz - player.z
      return [cx + (dx * cos - dz * sin) * s, cy + (dx * sin + dz * cos) * s]
    }
    // walls / props
    for (const c of colliders) {
      const pts = [toScreen(c.minX, c.minZ), toScreen(c.maxX, c.minZ), toScreen(c.maxX, c.maxZ), toScreen(c.minX, c.maxZ)]
      mctx.beginPath()
      mctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i < 4; i++) mctx.lineTo(pts[i][0], pts[i][1])
      mctx.closePath()
      mctx.fillStyle = 'rgba(120,132,128,0.26)'
      mctx.fill()
      mctx.strokeStyle = 'rgba(170,186,178,0.28)'
      mctx.lineWidth = 0.7
      mctx.stroke()
    }
    // vision cone
    mctx.save()
    mctx.translate(cx, cy)
    const grad = mctx.createRadialGradient(0, 0, 4, 0, 0, 105)
    grad.addColorStop(0, 'rgba(255,160,90,0.13)')
    grad.addColorStop(1, 'rgba(255,160,90,0)')
    mctx.fillStyle = grad
    mctx.beginPath()
    mctx.moveTo(0, 0)
    mctx.arc(0, 0, 105, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55)
    mctx.closePath()
    mctx.fill()
    mctx.restore()
    // enemies
    for (const e of enemies) {
      if (!e.alive) continue
      const [ex, ey] = toScreen(e.x, e.z)
      if ((ex - cx) ** 2 + (ey - cy) ** 2 > (W / 2 - 6) ** 2) continue
      mctx.save()
      mctx.translate(ex, ey)
      mctx.rotate(Math.atan2(e.x - player.x, e.z - player.z) + yaw + Math.PI)
      mctx.fillStyle = e.alert ? '#ff4a32' : '#c69b52'
      mctx.beginPath()
      mctx.moveTo(0, -5); mctx.lineTo(4, 4); mctx.lineTo(0, 2); mctx.lineTo(-4, 4)
      mctx.closePath()
      mctx.fill()
      mctx.restore()
    }
    // player arrow
    mctx.save()
    mctx.translate(cx, cy)
    mctx.fillStyle = '#ffb15c'
    mctx.shadowColor = 'rgba(255,140,60,0.8)'
    mctx.shadowBlur = 8
    mctx.beginPath()
    mctx.moveTo(0, -9); mctx.lineTo(6, 6); mctx.lineTo(0, 3); mctx.lineTo(-6, 6)
    mctx.closePath()
    mctx.fill()
    mctx.restore()
    // ring
    mctx.restore()
  }

  /* -------------------------- state -------------------------- */
  let health = 100
  let notifyTimer = 0
  let damageTimer = 0
  let toastTimer = 0
  let killTimer = 0

  function setHealth(hp) {
    health = clamp(hp, 0, 100)
    text.health.textContent = String(Math.ceil(health))
    text.healthBar.style.width = `${health}%`
    if (health > 60) {
      text.healthBar.style.background = 'linear-gradient(90deg, #8fd8ad, #d7f5df)'
      text.vitalStatus.textContent = 'STABLE'
      text.vitalStatus.className = 'vital-status'
      text.pulse.style.stroke = '#8fd8ad'
    } else if (health > 25) {
      text.healthBar.style.background = 'linear-gradient(90deg, #ff9a4a, #ffd08c)'
      text.vitalStatus.textContent = 'WOUNDED'
      text.vitalStatus.className = 'vital-status hurt'
      text.pulse.style.stroke = '#ff9a4a'
    } else {
      text.healthBar.style.background = 'linear-gradient(90deg, #ff3e2e, #ff8a6a)'
      text.vitalStatus.textContent = 'CRITICAL'
      text.vitalStatus.className = 'vital-status crit'
      text.pulse.style.stroke = '#ff3e2e'
    }
  }

  function setAmmo(mag, reserve, max, weapon, cal) {
    text.ammoMag.textContent = String(mag)
    text.ammoReserve.textContent = `/ ${reserve}`
    text.ammoWeapon.textContent = weapon
    if (cal) text.ammoCal.textContent = cal
    text.fireMode.textContent = weapon.includes('M4') ? 'AUTO' : 'SEMI'
    const pct = clamp(mag / max, 0, 1) * 100
    text.ammoBar.style.width = `${pct}%`
    text.ammoBar.className = mag / max < 0.28 ? 'low' : ''
    text.ammoMag.style.color = mag === 0 ? '#ff5a44' : ''
  }

  function setReload(progress) {
    if (progress == null || progress < 0) {
      text.reloadBar.classList.remove('on')
      text.reloadProgress.style.width = '0%'
    } else {
      text.reloadBar.classList.add('on')
      text.reloadProgress.style.width = `${clamp(progress, 0, 1) * 100}%`
    }
  }

  function setObjective({ phase, title, sub, remaining, total }) {
    if (phase != null) text.phase.textContent = String(phase).padStart(2, '0')
    if (title) text.objTitle.textContent = title
    if (sub) text.objSub.textContent = sub
    if (remaining != null) text.hostiles.textContent = String(remaining).padStart(2, '0')
    if (total) text.objProgress.style.width = `${clamp(1 - remaining / total, 0, 1) * 100}%`
  }

  function setStats({ kills, headshots, shots, hits, time }) {
    if (kills != null) text.kills.textContent = String(kills)
    if (headshots != null) text.heads.textContent = String(headshots)
    if (shots != null) {
      text.acc.textContent = shots === 0 ? '--' : `${Math.round((hits / shots) * 100)}%`
    }
    if (time != null) {
      const m = Math.floor(time / 60)
      const s = Math.floor(time % 60)
      text.time.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }
  }

  function hit(headshot) {
    const hm = text.hitmarker
    hm.classList.remove('active', 'head')
    void hm.offsetWidth
    if (headshot) hm.classList.add('head')
    hm.classList.add('active')
  }

  function kill(weapon, headshot) {
    killTimer = 5
    const el = document.createElement('div')
    el.className = 'kill'
    el.innerHTML = `<span class="who">OPERATOR</span><span class="what">${weapon}</span><span class="${headshot ? 'head' : ''}">${headshot ? '◉ HEADSHOT' : '✕ ELIMINATED'}</span>`
    text.killfeed.appendChild(el)
    while (text.killfeed.children.length > 5) text.killfeed.firstChild.remove()
    setTimeout(() => {
      el.classList.add('out')
      setTimeout(() => el.remove(), 340)
    }, 4400)
  }

  function notify(main, sub = '', duration = 1900) {
    text.notifyMain.textContent = main
    text.notifySub.textContent = sub
    text.notify.classList.add('on')
    notifyTimer = duration / 1000
  }

  function toast(msg, duration = 1200) {
    text.toast.textContent = msg
    text.toast.classList.add('on')
    toastTimer = duration / 1000
  }

  function damage(amount = 1) {
    text.damage.classList.add('on')
    text.damage.style.opacity = String(clamp(0.35 + amount * 0.35, 0.35, 1))
    damageTimer = 0.35
    // camera shake handled by game
  }

  function setSpread(px) {
    document.documentElement.style.setProperty('--spread', `${px.toFixed(1)}px`)
  }

  function setADS(on) {
    text.crosshair.classList.toggle('ads', on)
  }

  function update(dt) {
    if (notifyTimer > 0) {
      notifyTimer -= dt
      if (notifyTimer <= 0) text.notify.classList.remove('on')
    }
    if (toastTimer > 0) {
      toastTimer -= dt
      if (toastTimer <= 0) text.toast.classList.remove('on')
    }
    if (damageTimer > 0) {
      damageTimer -= dt
      if (damageTimer <= 0) {
        text.damage.classList.remove('on')
        text.damage.style.opacity = '0'
      } else {
        text.damage.style.opacity = String(Math.max(0, damageTimer / 0.35) * 0.85)
      }
    }
  }

  function showDeath(stats) {
    text.deathKills.textContent = stats.kills
    text.deathHeads.textContent = stats.headshots
    text.deathAcc.textContent = `${stats.accuracy}%`
    text.deathTime.textContent = stats.time
    text.deathLine.textContent = stats.line || 'OPERATOR DOWN. THE COMPOUND REMAINS HOSTILE.'
    text.death.classList.remove('hidden')
  }
  function hideDeath() { text.death.classList.add('hidden') }
  function showVictory(stats) {
    text.winKills.textContent = stats.kills
    text.winHeads.textContent = stats.headshots
    text.winAcc.textContent = `${stats.accuracy}%`
    text.winTime.textContent = stats.time
    text.victory.classList.remove('hidden')
  }
  function hideVictory() { text.victory.classList.add('hidden') }

  function updateCompassWidth() {
    const w = document.getElementById('compass')?.getBoundingClientRect().width
    if (w > 100) compassWidth = w
  }
  updateCompassWidth()
  window.addEventListener('resize', updateCompassWidth)

  return {
    hud, show() { hud.classList.remove('hidden'); hud.setAttribute('aria-hidden', 'false') },
    hide() { hud.classList.add('hidden'); hud.setAttribute('aria-hidden', 'true') },
    setHealth, setAmmo, setReload, setObjective, setStats, setCompass,
    drawMinimap, hit, kill, notify, toast, damage, setSpread, setADS, update,
    showDeath, hideDeath, showVictory, hideVictory
  }
}

/* Loading screen helpers are separate so they can run before the HUD exists. */
export function createLoading() {
  const el = $('loading')
  const status = $('load-status')
  const bar = $('load-progress')
  const pct = $('load-pct')
  const log = $('load-log')
  return {
    set(progress, message, line) {
      const p = Math.round(progress * 100)
      bar.style.width = `${p}%`
      pct.textContent = String(p).padStart(2, '0')
      if (message) status.textContent = message
      if (line) {
        const d = document.createElement('div')
        d.textContent = line
        log.appendChild(d)
        while (log.children.length > 4) log.firstChild.remove()
      }
    },
    hide() { el.classList.add('hidden') },
    show() { el.classList.remove('hidden') }
  }
}
