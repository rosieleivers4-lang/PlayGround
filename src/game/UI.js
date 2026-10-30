import { phaseLabel, timeLabel, chapterInfo, LEVELS_PER_CHAPTER, MAX_LEVEL } from "./Levels.js";
import { clamp, TAU } from "./util.js";

export class UI {
  constructor(game) {
    this.game = game;
    this.el = {};
    const ids = [
      "screen-menu", "hud", "screen-levels", "screen-settings", "screen-pause", "screen-complete", "screen-dead",
      "btn-play", "btn-continue", "btn-menu-levels", "btn-menu-settings", "btn-menu-sound", "btn-levels-play",
      "menu-biome", "menu-biome-sub", "menu-clock", "menu-phase", "menu-feasts", "menu-beasts",
      "stat-trail", "stat-best", "stat-total",
      "hud-biome", "hud-chapter", "hud-level", "hud-clock", "hud-phase", "time-icon", "time-fill",
      "life-num", "life-fill", "life-max", "hunger-num", "hunger-fill", "obj-prey-count", "obj-prey-fill",
      "obj-beast-count", "obj-beast-fill", "obj-beast-label", "obj-prey", "obj-beast",
      "btn-pause", "btn-sound", "btn-paw", "btn-pounce", "btn-bite", "boss-wrap", "boss-name", "boss-hp-num", "boss-fill",
      "target-tag", "target-name", "target-fill", "level-banner", "banner-kicker", "banner-title", "banner-sub",
      "tip", "toasts", "floaters", "hitmark", "minimap", "joystick", "joystick-knob",
      "chapter-name", "chapter-range", "chapter-prev", "chapter-next", "level-grid",
      "toggle-tilt", "toggle-sound", "tilt-status", "sens-range", "sens-val", "quality-seg", "btn-fullscreen", "btn-reset",
      "pause-level", "pause-feasts", "pause-beasts", "pause-life", "btn-resume", "btn-pause-settings", "btn-quit", "pause-tip",
      "complete-kicker", "complete-sub", "complete-feasts", "complete-beasts", "complete-life", "complete-time",
      "btn-next", "btn-replay", "btn-complete-map",
      "dead-sub", "dead-feasts", "dead-beasts", "dead-time", "btn-retry", "btn-dead-map",
      "loading", "load-fill", "load-text", "screen-menu", "hurt", "heal", "flash",
    ];
    for (const id of ids) this.el[id] = document.getElementById(id);
    this.mapCanvas = document.getElementById("minimap");
    this.mapCtx = this.mapCanvas?.getContext("2d");
    this.bannerTimer = null;
    this.tipTimer = null;
    this.selectedLevel = 1;
    this.chapter = 1;
    this.lastMap = 0;
    this.lastVitals = "";
    this.bind();
  }

  bind() {
    const click = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", (e) => { this.game.audio.click(); fn(e); });
    };
    click("btn-play", () => this.game.startFromMenu());
    click("btn-continue", () => this.game.startFromMenu());
    click("btn-menu-levels", () => this.game.openLevels());
    click("btn-menu-settings", () => this.game.openSettings());
    click("btn-menu-sound", () => this.game.toggleSound());
    click("btn-pause", () => this.game.togglePause());
    click("btn-sound", () => this.game.toggleSound());
    click("btn-pause-settings", () => this.game.openSettings());
    click("btn-resume", () => this.game.togglePause(false));
    click("btn-quit", () => this.game.quitToMenu());
    click("btn-next", () => this.game.nextLevel());
    click("btn-replay", () => this.game.replayLevel());
    click("btn-complete-map", () => this.game.openLevels());
    click("btn-retry", () => this.game.replayLevel());
    click("btn-dead-map", () => this.game.openLevels());
    click("btn-fullscreen", () => this.game.toggleFullscreen());
    click("btn-reset", () => this.game.resetProgress());
    click("chapter-prev", () => this.game.changeChapter(-1));
    click("chapter-next", () => this.game.changeChapter(1));
    click("btn-levels-play", () => this.game.playSelectedLevel());

    document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", (e) => {
      this.game.audio.click();
      const which = el.getAttribute("data-close");
      if (which === "levels") this.game.closeLevels();
      if (which === "settings") this.game.closeSettings();
    }));

    const tilt = document.getElementById("toggle-tilt");
    if (tilt) tilt.addEventListener("click", () => this.game.toggleTilt());
    const sound = document.getElementById("toggle-sound");
    if (sound) sound.addEventListener("click", () => this.game.toggleSound());
    const sens = document.getElementById("sens-range");
    if (sens) sens.addEventListener("input", () => {
      const value = Number(sens.value) / 100;
      const el = document.getElementById("sens-val");
      if (el) el.textContent = `${sens.value}%`;
      this.game.setSensitivity(value);
    });
    document.querySelectorAll("#quality-seg button").forEach(btn => btn.addEventListener("click", () => {
      this.game.audio.click();
      this.game.setQuality(btn.getAttribute("data-q"));
    }));
    this.bindSwipeNav();
  }

  bindSwipeNav() {
    const grid = document.getElementById("level-grid");
    if (!grid) return;
    let sx = 0, sy = 0;
    grid.addEventListener("pointerdown", (e) => { sx = e.clientX; sy = e.clientY; });
    grid.addEventListener("pointerup", (e) => {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dy) < 50) this.game.changeChapter(dx < 0 ? 1 : -1);
    });
  }

  refreshMenu(save, info) {
    const set = (id, text) => { const el = this.el[id]; if (el) el.textContent = text; };
    set("menu-biome", info.biome.name);
    set("menu-biome-sub", `Trail ${String(info.level).padStart(3, "0")} · ${info.phase.label}`);
    set("menu-clock", timeLabel(info.clock));
    set("menu-phase", info.phase.label);
    set("menu-feasts", save.totalFeasts);
    set("menu-beasts", save.cleared.length);
    set("stat-trail", String(info.level).padStart(3, "0"));
    set("stat-best", save.cleared.length);
    set("stat-total", save.totalFeasts > 999 ? "999+" : save.totalFeasts);
    const cont = this.el["btn-continue"];
    const play = this.el["btn-play"];
    if (cont) {
      if (save.unlocked > 1) {
        cont.hidden = false;
        cont.textContent = `Continue · Trail ${String(save.unlocked).padStart(3, "0")}`;
        play.querySelector(".btn-label").textContent = "New trail";
      } else {
        cont.hidden = true;
        play.querySelector(".btn-label").textContent = "Start the trail";
      }
    }
  }

  showMenu(show) {
    this.el["screen-menu"].hidden = !show;
    if (show) this.el.hud.classList.remove("on");
  }

  showHUD(show) {
    const hud = this.el.hud;
    hud.hidden = !show;
    requestAnimationFrame(() => hud.classList.toggle("on", show));
  }

  hideAllPanels() {
    for (const id of ["screen-levels", "screen-settings", "screen-pause", "screen-complete", "screen-dead"]) {
      if (this.el[id]) this.el[id].hidden = true;
    }
  }

  openPanel(id) {
    this.hideAllPanels();
    if (this.el[id]) this.el[id].hidden = false;
  }

  closePanel(id) {
    if (this.el[id]) this.el[id].hidden = true;
  }

  updateHud(s) {
    const { player, level, counts, boss } = s;
    const ratio = clamp(player.hp / player.maxLife, 0, 1);
    const hRatio = clamp(player.hunger / 100, 0, 1);
    this.el["life-fill"].style.width = `${ratio * 100}%`;
    this.el["hunger-fill"].style.width = `${hRatio * 100}%`;
    this.el["life-num"].textContent = `${Math.ceil(player.hp)} / ${Math.round(player.maxLife)}`;
    this.el["hunger-num"].textContent = `${Math.ceil(player.hunger)}`;
    this.el["life-fill"].closest(".vital")?.classList.toggle("low", ratio < 0.25);
    this.el["hunger-fill"].closest(".vital")?.classList.toggle("low", hRatio < 0.22);
    this.el["obj-prey-count"].textContent = `${counts.prey}/${level.preyGoal}`;
    this.el["obj-beast-count"].textContent = `${counts.beasts}/${level.beastGoal}`;
    this.el["obj-prey-fill"].style.width = `${clamp(counts.prey / level.preyGoal, 0, 1) * 100}%`;
    this.el["obj-beast-fill"].style.width = `${clamp(counts.beasts / level.beastGoal, 0, 1) * 100}%`;
    this.el["obj-prey"].classList.toggle("done", counts.prey >= level.preyGoal);
    this.el["obj-beast"].classList.toggle("done", counts.beasts >= level.beastGoal);
    if (level.boss) this.el["obj-beast-label"].textContent = boss?.name || "Face the alpha";

    const time = s.time;
    this.el["hud-clock"].textContent = timeLabel(time);
    this.el["hud-phase"].textContent = phaseLabel(time);
    this.el["time-fill"].style.width = `${time * 100}%`;
    const night = time >= 0.805 || time < 0.215;
    this.el["time-icon"].classList.toggle("night", night);
    const use = this.el["time-icon"].querySelector("use");
    if (use) use.setAttribute("href", night ? "#icon-moon" : "#icon-sun");

    this.el["btn-sound"].querySelector("use")?.setAttribute("href", this.game.audio.enabled ? "#icon-sound" : "#icon-mute");
    this.el["btn-menu-sound"].querySelector("use")?.setAttribute("href", this.game.audio.enabled ? "#icon-sound" : "#icon-mute");

    if (boss) {
      this.el["boss-wrap"].hidden = false;
      this.el["boss-wrap"].classList.add("on");
      this.el["boss-name"].textContent = boss.name;
      this.el["boss-fill"].style.width = `${clamp(boss.hp / boss.maxHp, 0, 1) * 100}%`;
      this.el["boss-hp-num"].textContent = `${Math.ceil(clamp(boss.hp / boss.maxHp, 0, 1) * 100)}%`;
    } else {
      this.el["boss-wrap"].classList.add("off");
      this.el["boss-wrap"].hidden = true;
    }

    if (performance.now() - this.lastMap > 90) {
      this.lastMap = performance.now();
      this.drawMinimap(s);
    }
  }

  updateCooldowns(bite, paw, pounce) {
    const set = (id, rem, max) => {
      const el = this.el[id];
      if (!el) return;
      const pct = rem > 0 ? clamp(1 - rem / max, 0, 1) * 100 : 0;
      el.style.setProperty("--cd", `${rem > 0 ? 100 - pct : 100}%`);
      el.classList.toggle("cooling", rem > 0.02);
    };
    set("btn-bite", bite.remaining, bite.cooldown);
    set("btn-paw", paw.remaining, paw.cooldown);
    set("btn-pounce", pounce.remaining, pounce.cooldown);
  }

  flashAbility(id) {
    const el = this.el[id];
    if (!el) return;
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }

  showLevelBanner(info, boss) {
    const kicker = `Trail ${String(info.level).padStart(3, "0")} · ${info.biome.name}`;
    this.el["banner-kicker"].textContent = kicker;
    this.el["banner-title"].textContent = info.name;
    this.el["banner-sub"].textContent = boss ? "The alpha is close. Face it, and the trail is yours." : info.subtitle;
    const b = this.el["level-banner"];
    b.classList.remove("on");
    void b.offsetWidth;
    b.classList.add("on");
    clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => b.classList.remove("on"), 4600);
  }

  setLevelChrome(info) {
    this.el["hud-biome"].textContent = info.biome.name;
    this.el["hud-chapter"].textContent = `Chapter ${info.chapter}`;
    this.el["hud-level"].textContent = String(info.level).padStart(3, "0");
  }

  showTip(text, duration = 6000) {
    const tip = this.el.tip;
    tip.innerHTML = text;
    tip.classList.add("on");
    clearTimeout(this.tipTimer);
    this.tipTimer = setTimeout(() => tip.classList.remove("on"), duration);
  }

  hideTip() {
    clearTimeout(this.tipTimer);
    this.el.tip.classList.remove("on");
  }

  toast(text, type = "") {
    const wrap = this.el.toasts;
    while (wrap.children.length >= 3) wrap.firstElementChild.remove();
    const div = document.createElement("div");
    div.className = `toast ${type}`;
    div.innerHTML = text;
    wrap.appendChild(div);
    setTimeout(() => div.classList.add("fade"), 1900);
    setTimeout(() => div.remove(), 2450);
  }

  float(text, x, y, type = "") {
    const el = document.createElement("div");
    el.className = `floater ${type}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    this.el.floaters.appendChild(el);
    setTimeout(() => el.remove(), 1350);
  }

  floatWorld(pos, camera, text, type = "") {
    const v = pos.clone().project(camera);
    if (v.z > 1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    this.float(text, x, y, type);
  }

  hitmark() {
    const el = this.el.hitmark;
    el.classList.remove("on");
    void el.offsetWidth;
    el.classList.add("on");
  }

  damageFlash(amount = 1) {
    const el = this.el.hurt;
    el.style.opacity = String(clamp(0.4 + amount * 0.35, 0, 1));
    setTimeout(() => { el.style.opacity = "0"; }, 130);
  }

  healFlash() {
    const el = this.el.heal;
    el.style.opacity = "0.7";
    setTimeout(() => { el.style.opacity = "0"; }, 220);
  }

  whiteFlash() {
    const el = this.el.flash;
    el.style.opacity = "0.7";
    setTimeout(() => { el.style.opacity = "0"; }, 100);
  }

  setTarget(target, camera) {
    const tag = this.el["target-tag"];
    if (!target || target.dead) { tag.hidden = true; return; }
    const pos = target.root.position.clone();
    pos.y += target.spec.height * target.scaleValue + 0.6;
    const v = pos.project(camera);
    if (v.z > 1) { tag.hidden = true; return; }
    tag.hidden = false;
    tag.style.left = `${(v.x * 0.5 + 0.5) * window.innerWidth}px`;
    tag.style.top = `${(-v.y * 0.5 + 0.5) * window.innerHeight}px`;
    this.el["target-name"].textContent = target.boss ? target.name : target.spec.name;
    this.el["target-fill"].style.width = `${clamp(target.hp / target.maxHp, 0, 1) * 100}%`;
  }

  drawMinimap(s) {
    const ctx = this.mapCtx;
    if (!ctx) return;
    const canvas = this.mapCanvas;
    const size = canvas.width;
    const c = size / 2;
    const range = 32;
    const scale = (size * 0.46) / range;
    const px = s.player.position.x, pz = s.player.position.z;
    const yaw = s.player.heading;
    const cos = Math.cos(yaw), sin = Math.sin(yaw);
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, size * 0.48, 0, TAU);
    ctx.clip();
    const bg = ctx.createRadialGradient(c, c * 0.8, 10, c, c, size * 0.5);
    bg.addColorStop(0, "rgba(45,74,52,.96)");
    bg.addColorStop(1, "rgba(10,22,15,.98)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    const transform = (x, z) => {
      const dx = x - px, dz = z - pz;
      const u = dx * cos - dz * sin;
      const v = dx * sin + dz * cos;
      return [c + u * scale, c - v * scale];
    };
    // trees
    ctx.fillStyle = "rgba(111,150,96,.52)";
    for (const t of s.world.treeDots) {
      const [x, y] = transform(t.x, t.z);
      if (x < 0 || y < 0 || x > size || y > size) continue;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(1.2, t.r * 1.5), 0, TAU);
      ctx.fill();
    }
    // creatures
    for (const cr of s.creatures) {
      if (cr.dead) continue;
      if (cr.boss) continue;
      const [x, y] = transform(cr.root.position.x, cr.root.position.z);
      if (Math.hypot(x - c, y - c) > size * 0.47) continue;
      ctx.beginPath();
      ctx.arc(x, y, cr.spec.prey ? 2.8 : 3.4, 0, TAU);
      ctx.fillStyle = cr.spec.prey ? "#f0cc7a" : "#e37a67";
      ctx.fill();
      if (cr.targeted) {
        ctx.strokeStyle = "#f7e6bb";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }
    // boss
    if (s.boss && !s.boss.dead) {
      const [x, y] = transform(s.boss.root.position.x, s.boss.root.position.z);
      if (Math.hypot(x - c, y - c) < size * 0.47) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = "#f07a5b";
        ctx.fillRect(-4, -4, 8, 8);
        ctx.restore();
      }
    }
    // player arrow
    ctx.save();
    ctx.translate(c, c);
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(6, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fillStyle = "#55d8ce";
    ctx.shadowColor = "rgba(85,216,206,.8)";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    // scan sweep
    const t = performance.now() / 1000;
    const grad = ctx.createLinearGradient(c, c, c, 0);
    grad.addColorStop(0, "rgba(85,216,206,.08)");
    grad.addColorStop(1, "rgba(85,216,206,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, size * 0.47, -Math.PI / 2 - 0.24, -Math.PI / 2 + 0.24);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  setupLevelSelect(save, current, chapter, selected) {
    this.chapter = chapter;
    this.selectedLevel = selected;
    const info = chapterInfo(chapter);
    this.el["chapter-name"].textContent = `Chapter ${String(chapter).padStart(2, "0")} · ${info.name}`;
    this.el["chapter-range"].textContent = `Trails ${String(info.range[0]).padStart(3, "0")} – ${String(info.range[1]).padStart(3, "0")}`;
    this.el["chapter-prev"].disabled = chapter <= 1;
    this.el["chapter-next"].disabled = chapter >= Math.ceil(MAX_LEVEL / LEVELS_PER_CHAPTER);
    const grid = this.el["level-grid"];
    grid.innerHTML = "";
    const start = (chapter - 1) * LEVELS_PER_CHAPTER + 1;
    const end = Math.min(MAX_LEVEL, chapter * LEVELS_PER_CHAPTER);
    for (let n = start; n <= end; n++) {
      const btn = document.createElement("button");
      const locked = n > save.unlocked;
      const cleared = save.cleared.includes(n);
      btn.className = `level-btn${locked ? " locked" : ""}${cleared ? " cleared" : ""}${n === current ? " current" : ""}${n === selected ? " selected" : ""}${n % 25 === 0 ? " boss" : ""}`;
      btn.dataset.level = n;
      if (locked) {
        btn.innerHTML = `<svg><use href="#icon-lock"/></svg><span>${String(n).padStart(3, "0")}</span>`;
      } else {
        btn.innerHTML = `<b>${String(n).padStart(3, "0")}</b><span>${n === current ? "Current" : cleared ? "Cleared" : "Trail"}</span>`;
      }
      btn.addEventListener("click", () => {
        if (locked) {
          this.game.audio.click();
          this.toast(`Clear Trail <strong>${String(save.unlocked).padStart(3, "0")}</strong> first`, "warn");
          return;
        }
        this.selectedLevel = n;
        grid.querySelectorAll(".level-btn").forEach(b => b.classList.toggle("selected", Number(b.dataset.level) === n));
        const playBtn = this.el["btn-levels-play"].querySelector(".btn-label");
        if (playBtn) playBtn.textContent = `Play trail ${String(n).padStart(3, "0")}`;
      });
      grid.appendChild(btn);
    }
    const playBtn = this.el["btn-levels-play"].querySelector(".btn-label");
    if (playBtn) playBtn.textContent = `Play trail ${String(selected).padStart(3, "0")}`;
  }

  populateSettings(settings, audioEnabled) {
    const tilt = this.el["toggle-tilt"];
    if (tilt) {
      tilt.classList.toggle("on", !!settings.tilt);
      tilt.setAttribute("aria-checked", String(!!settings.tilt));
    }
    const status = this.el["tilt-status"];
    if (status) status.textContent = settings.tilt ? "On · tilt to steer" : "Off";
    const sound = this.el["toggle-sound"];
    if (sound) {
      sound.classList.toggle("on", audioEnabled);
      sound.setAttribute("aria-checked", String(audioEnabled));
    }
    const sens = this.el["sens-range"];
    if (sens) {
      sens.value = String(Math.round((settings.sensitivity || 1) * 100));
      const sv = this.el["sens-val"];
      if (sv) sv.textContent = `${sens.value}%`;
    }
    document.querySelectorAll("#quality-seg button").forEach(btn => {
      btn.classList.toggle("on", btn.getAttribute("data-q") === (settings.quality || "auto"));
    });
  }

  showComplete(info, stats) {
    this.el["complete-kicker"].textContent = `Trail ${String(info.level).padStart(3, "0")} cleared · ${info.biome.name}`;
    this.el["complete-sub"].textContent = info.level >= MAX_LEVEL
      ? "Five hundred trails. One small pup. The whole forest knows your name now."
      : "You fed well. Another trail opens beneath the trees.";
    this.el["complete-feasts"].textContent = stats.feasts;
    this.el["complete-beasts"].textContent = stats.beasts;
    this.el["complete-life"].textContent = Math.round(stats.life);
    this.el["complete-time"].textContent = stats.time;
    this.openPanel("screen-complete");
  }

  showDead(info, stats, reason) {
    this.el["dead-sub"].textContent = reason || "You starved before the trail was done. Eat sooner, and eat more.";
    this.el["dead-feasts"].textContent = stats.feasts;
    this.el["dead-beasts"].textContent = stats.beasts;
    this.el["dead-time"].textContent = stats.time;
    this.openPanel("screen-dead");
  }

  showPause(info, stats) {
    this.el["pause-level"].textContent = String(info.level).padStart(3, "0");
    this.el["pause-feasts"].textContent = stats.feasts;
    this.el["pause-beasts"].textContent = stats.beasts;
    this.el["pause-life"].textContent = Math.round(stats.life);
    const tips = [
      "Keep your hunger above the red line. Eating restores life and raises your maximum.",
      "Rabbits bolt when you get close. Pounce first, then bite.",
      "Paw swipes push beasts back. Bites do the real damage.",
      "Every animal you eat makes you harder to kill. Every empty belly makes you easier.",
      "Night trails are full of eyes. Keep moving and keep feeding.",
    ];
    this.el["pause-tip"].textContent = tips[Math.floor(Math.random() * tips.length)];
    this.openPanel("screen-pause");
  }

  setLoading(progress, text) {
    if (this.el["load-fill"]) this.el["load-fill"].style.width = `${clamp(progress, 0, 1) * 100}%`;
    if (text && this.el["load-text"]) this.el["load-text"].textContent = text;
  }

  hideLoading() {
    this.el.loading.classList.add("done");
  }

  setTiltStatus(text) {
    if (this.el["tilt-status"]) this.el["tilt-status"].textContent = text;
  }

  setSoundIcon() {
    const href = this.game.audio.enabled ? "#icon-sound" : "#icon-mute";
    this.el["btn-sound"].querySelector("use")?.setAttribute("href", href);
    this.el["btn-menu-sound"].querySelector("use")?.setAttribute("href", href);
  }
}
