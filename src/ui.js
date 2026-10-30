import { WORLD, TOWNS } from './config.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.el = {
      hud: $('hud'),
      lifeFill: $('lifeFill'),
      lifeVal: $('lifeVal'),
      fuelFill: $('fuelFill'),
      fuelVal: $('fuelVal'),
      wantedRow: $('wantedRow'),
      wantedStars: $('wantedStars'),
      limitSign: $('limitSign'),
      limitVal: $('limitVal'),
      speeding: $('speedingBadge'),
      speedVal: $('speedVal'),
      speedCard: document.querySelector('.speed-card'),
      gearVal: $('gearVal'),
      roadName: $('roadName'),
      carrotVal: $('carrotVal'),
      lifeGain: $('lifeGain'),
      minimap: $('minimap'),
      nearestFuel: $('nearestFuel'),
      districtName: $('districtName'),
      interact: $('interact'),
      interactTitle: $('interactTitle'),
      interactText: $('interactText'),
      refuelBtn: $('refuelBtn'),
      toasts: $('toasts'),
      tiltChip: $('tiltChip'),
      offroadChip: $('offroadChip'),
      bossBar: $('bossBar'),
      bossText: $('bossText'),
      bossFill: $('bossFill'),
      motionState: $('motionState'),
      menu: $('menu'),
      help: $('help'),
      pause: $('pause'),
      over: $('over'),
      bestStat: $('bestStat'),
      overTitle: $('overTitle'),
      overSub: $('overSub'),
      overKicker: $('overKicker'),
      overPanel: document.querySelector('.over-panel'),
      ovCarrots: $('ovCarrots'),
      ovDistance: $('ovDistance'),
      ovSpeed: $('ovSpeed'),
      ovTime: $('ovTime'),
      overWanted: $('overWanted'),
      overBest: $('overBest'),
      touch: $('touch'),
    };
    this.cache = {};
    this.mapCtx = this.el.minimap.getContext('2d');
    this.mapSize = 360;
    this.screens = ['menu', 'help', 'pause', 'over'];
    this.toastCount = 0;
    this.refuelHandler = null;
    this.el.refuelBtn.addEventListener('click', () => {
      if (this.refuelHandler) this.refuelHandler();
    });
    this._lastMap = 0;
  }

  setRefuelHandler(fn) {
    this.refuelHandler = fn;
  }

  showScreen(name) {
    for (const s of this.screens) {
      this.el[s].classList.toggle('hidden', s !== name);
    }
    if (name !== 'menu' && name !== null) this.el.menu.classList.add('hidden');
  }

  hideScreens() {
    for (const s of this.screens) this.el[s].classList.add('hidden');
  }

  showHUD(show) {
    this.el.hud.classList.toggle('hidden', !show);
  }

  showTouch(show) {
    document.body.classList.toggle('has-touch', show);
    this.el.touch.classList.toggle('hidden', !show);
  }

  setMenuBest(best) {
    if (!best) {
      this.el.bestStat.textContent = '0 carrots · 0.0 mi';
      return;
    }
    this.el.bestStat.textContent = `${best.carrots} carrots · ${(best.distance / 1609.34).toFixed(1)} mi`;
  }

  setLife(v, max = 100) {
    const pct = Math.max(0, Math.min(100, (v / max) * 100));
    if (this.cache.life !== pct) {
      this.cache.life = pct;
      this.el.lifeFill.style.width = `${pct}%`;
      this.el.lifeVal.textContent = Math.round(v);
      this.el.lifeFill.parentElement.classList.toggle('low', pct < 28);
    }
  }

  setFuel(v, max = 100) {
    const pct = Math.max(0, Math.min(100, (v / max) * 100));
    if (this.cache.fuel !== pct) {
      this.cache.fuel = pct;
      this.el.fuelFill.style.width = `${pct}%`;
      this.el.fuelVal.textContent = Math.round(v);
      this.el.fuelFill.parentElement.classList.toggle('low', pct < 22);
    }
  }

  setCarrots(n) {
    if (this.cache.carrots !== n) {
      this.cache.carrots = n;
      this.el.carrotVal.textContent = n;
    }
  }

  carrotGain(text = '+4 LIFE') {
    this.el.lifeGain.textContent = text;
    this.el.lifeGain.classList.add('show');
    clearTimeout(this._gainTimer);
    this._gainTimer = setTimeout(() => this.el.lifeGain.classList.remove('show'), 900);
  }

  setWanted(level) {
    level = Math.max(0, Math.min(3, level));
    if (this.cache.wanted === level) return;
    this.cache.wanted = level;
    this.el.wantedRow.classList.toggle('hidden', level === 0);
    this.el.wantedStars.textContent = '★'.repeat(level) + '☆'.repeat(3 - level);
    this.el.bossBar.classList.toggle('hidden', level === 0);
    if (level === 0) {
      this.el.bossFill.style.width = '0%';
    } else {
      this.el.bossText.textContent =
        level === 1 ? 'TRAFFIC POLICE ALERTED' : level === 2 ? 'TRAFFIC POLICE IN PURSUIT' : 'POLICE INTERCEPTION';
    }
  }

  setBossHeat(fraction) {
    this.el.bossFill.style.width = `${Math.max(0, Math.min(1, fraction)) * 100}%`;
  }

  setSpeed(mph, limit, speeding, gear, roadRef, offroad) {
    const rounded = Math.round(mph);
    if (this.cache.speed !== rounded) {
      this.cache.speed = rounded;
      this.el.speedVal.textContent = rounded;
    }
    if (this.cache.limit !== limit) {
      this.cache.limit = limit;
      this.el.limitVal.textContent = limit;
    }
    if (this.cache.speeding !== speeding) {
      this.cache.speeding = speeding;
      this.el.speeding.classList.toggle('hidden', !speeding);
      this.el.limitSign.classList.toggle('flash', speeding);
      this.el.speedCard.classList.toggle('over', speeding);
    }
    if (this.cache.gear !== gear) {
      this.cache.gear = gear;
      this.el.gearVal.textContent = gear;
    }
    if (this.cache.roadRef !== roadRef) {
      this.cache.roadRef = roadRef;
      this.el.roadName.textContent = roadRef || (offroad ? 'OFF ROAD' : '—');
    }
    this.el.offroadChip.classList.toggle('hidden', !offroad);
  }

  setDistrict(name, distanceToFuel) {
    if (this.cache.district !== name) {
      this.cache.district = name;
      this.el.districtName.textContent = name;
    }
    const txt = distanceToFuel == null ? 'FUEL —' : `FUEL ${Math.round(distanceToFuel)}m`;
    if (this.cache.fuelDist !== txt) {
      this.cache.fuelDist = txt;
      this.el.nearestFuel.textContent = txt;
    }
  }

  showPrompt({ title, text, button = 'TRADE', disabled = false }) {
    this.el.interact.classList.remove('hidden');
    if (this.cache.promptTitle !== title) {
      this.cache.promptTitle = title;
      this.el.interactTitle.textContent = title;
    }
    if (this.cache.promptText !== text) {
      this.cache.promptText = text;
      this.el.interactText.textContent = text;
    }
    if (this.cache.promptButton !== button) {
      this.cache.promptButton = button;
      this.el.refuelBtn.textContent = button;
    }
    this.el.refuelBtn.disabled = disabled;
  }

  hidePrompt() {
    if (!this.el.interact.classList.contains('hidden')) {
      this.el.interact.classList.add('hidden');
      this.cache.promptTitle = null;
    }
  }

  toast(text, style = '') {
    const div = document.createElement('div');
    div.className = `toast ${style}`;
    div.textContent = text;
    this.el.toasts.appendChild(div);
    this.toastCount++;
    while (this.el.toasts.children.length > 4) this.el.toasts.firstElementChild.remove();
    setTimeout(() => {
      div.remove();
      this.toastCount = Math.max(0, this.toastCount - 1);
    }, 3400);
  }

  setTilt(on, stateText) {
    for (const id of ['tiltToggle', 'tiltTogglePause']) {
      const b = $(id);
      if (b) {
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        const sw = b.querySelector('.switch');
        if (sw) sw.classList.toggle('on', on);
      }
    }
    if (stateText) this.el.motionState.textContent = stateText;
    this.el.tiltChip.classList.toggle('hidden', !on);
  }

  setSound(on) {
    for (const id of ['soundToggle', 'soundTogglePause']) {
      const b = $(id);
      if (b) {
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        const sw = b.querySelector('.switch');
        if (sw) sw.classList.toggle('on', on);
      }
    }
  }

  showOver({ busted = true, carrots, distance, topSpeed, time, wanted, best }) {
    this.el.overPanel.classList.toggle('fuel', !busted);
    this.el.overKicker.textContent = busted
      ? 'INCIDENT REPORT · EAST MIDLANDS TRAFFIC'
      : 'BREAKDOWN REPORT · A52 HARD SHOULDER';
    this.el.overTitle.textContent = busted ? 'BUSTED' : 'DRY TANK';
    this.el.overSub.textContent = busted
      ? 'The traffic police took your carrots, your bike and your dignity.'
      : 'You ran out of petrol with an empty tank and empty carrot pocket. The recovery truck is not cheap.';
    this.el.ovCarrots.textContent = carrots;
    this.el.ovDistance.textContent = `${(distance / 1609.34).toFixed(1)} mi`;
    this.el.ovSpeed.textContent = `${Math.round(topSpeed)} mph`;
    const mm = Math.floor(time / 60);
    const ss = Math.floor(time % 60).toString().padStart(2, '0');
    this.el.ovTime.textContent = `${mm}:${ss}`;
    this.el.overWanted.innerHTML = `WANTED LEVEL <b>${'★'.repeat(wanted) + '☆'.repeat(3 - wanted)}</b>`;
    this.el.overBest.textContent = best
      ? `${best.carrots} carrots · ${(best.distance / 1609.34).toFixed(1)} mi`
      : '—';
    this.showScreen('over');
  }

  drawMinimap(world, player, cops, carrots, time) {
    const now = performance.now();
    if (now - this._lastMap < 90) return;
    this._lastMap = now;
    const ctx = this.mapCtx;
    const S = this.mapSize;
    const pad = 14;
    const scale = Math.min((S - pad * 2) / (WORLD.maxX - WORLD.minX), (S - pad * 2) / (WORLD.maxZ - WORLD.minZ));
    const ox = (S - (WORLD.maxX - WORLD.minX) * scale) / 2;
    const oy = (S - (WORLD.maxZ - WORLD.minZ) * scale) / 2;
    const mx = (x) => ox + (x - WORLD.minX) * scale;
    const my = (z) => oy + (z - WORLD.minZ) * scale;

    ctx.clearRect(0, 0, S, S);
    const bg = ctx.createLinearGradient(0, 0, S, S);
    bg.addColorStop(0, '#1d2b1c');
    bg.addColorStop(1, '#172116');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, S, S);

    // faint field lines
    ctx.strokeStyle = 'rgba(126, 155, 102, 0.09)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i / 9) * S);
      ctx.lineTo(S, (i / 9) * S);
      ctx.stroke();
    }

    // towns
    for (const town of Object.values(TOWNS)) {
      const x = mx(town.x);
      const y = my(town.z);
      const r = Math.max(7, town.radius * scale * 0.8);
      ctx.fillStyle = 'rgba(155, 145, 117, 0.34)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b7ad98';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // roads
    for (const pass of [0, 1]) {
      for (const r of world.roads) {
        if (pass === 0 && !r.minor) continue;
        if (pass === 1 && r.minor) continue;
        if (r.minor) {
          ctx.strokeStyle = 'rgba(108, 120, 98, 0.42)';
          ctx.lineWidth = 1.1;
        } else if (r.kind === 'motorway' || r.kind === 'trunk') {
          ctx.strokeStyle = 'rgba(241, 210, 128, 0.9)';
          ctx.lineWidth = 4.2;
        } else {
          ctx.strokeStyle = 'rgba(198, 199, 177, 0.82)';
          ctx.lineWidth = 2.3;
        }
        ctx.beginPath();
        ctx.moveTo(mx(r.ax), my(r.az));
        ctx.lineTo(mx(r.bx), my(r.bz));
        ctx.stroke();
      }
    }

    // stations
    for (const st of world.stations) {
      const x = mx(st.x);
      const y = my(st.z);
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = 'rgba(242, 181, 47, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f2b52f';
      ctx.fillRect(-3.5, -3.5, 7, 7);
      ctx.fillStyle = '#1a1c10';
      ctx.font = '800 10px "Barlow Condensed", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('F', 0, 0.5);
      ctx.restore();
    }

    // nearby carrots
    if (carrots) {
      ctx.fillStyle = 'rgba(255, 207, 73, 0.9)';
      for (const c of carrots.carrots) {
        if (!c.active) continue;
        if (Math.abs(c.x - player.x) > 460 || Math.abs(c.z - player.z) > 460) continue;
        ctx.fillRect(mx(c.x) - 1, my(c.z) - 1, 2.2, 2.2);
      }
    }

    // police
    if (cops) {
      for (const cop of cops) {
        const x = mx(cop.x);
        const y = my(cop.z);
        const flash = Math.floor(time * 5) % 2 === 0;
        ctx.fillStyle = flash ? '#ff3b47' : '#3f86ff';
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = flash ? 'rgba(255,59,71,0.4)' : 'rgba(63,134,255,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 8.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // player arrow
    const px = mx(player.x);
    const py = my(player.z);
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.PI - player.yaw);
    ctx.fillStyle = 'rgba(217, 255, 58, 0.22)';
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(11, 10);
    ctx.lineTo(0, 6);
    ctx.lineTo(-11, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#d9ff3a';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#f7f6e8';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(4, 5);
    ctx.lineTo(0, 3);
    ctx.lineTo(-4, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // vector labels
    ctx.font = '800 15px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const [key, town] of Object.entries(TOWNS)) {
      if (!['nottingham', 'derby', 'leicester', 'newark', 'lincoln', 'grantham'].includes(key)) continue;
      const x = mx(town.x);
      const y = my(town.z) - 12;
      ctx.fillStyle = 'rgba(7,10,7,0.66)';
      const w = ctx.measureText(town.name).width + 8;
      ctx.fillRect(x - w / 2, y - 8, w, 14);
      ctx.fillStyle = '#d9d4bd';
      ctx.fillText(town.name, x, y);
    }

    // edge vignette
    const vg = ctx.createRadialGradient(S / 2, S / 2, S * 0.32, S / 2, S / 2, S * 0.72);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.44)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, S, S);
  }

  setMotionState(text) {
    this.el.motionState.textContent = text;
  }
}
