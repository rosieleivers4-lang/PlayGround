import { clamp, damp } from "./util.js";

export class Input {
  constructor(game) {
    this.game = game;
    this.keys = new Set();
    this.joy = { active: false, x: 0, y: 0, id: null, startX: 0, startY: 0, radius: 52 };
    this.steer = 0;
    this.throttle = 0;
    this.sprint = false;
    this.tiltEnabled = false;
    this.tilt = { steer: 0, throttle: 0, baseBeta: null, baseGamma: null };
    this.actionQueue = [];
    this.setupKeyboard();
    this.setupJoystick();
    this.setupButtons();
  }

  setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      this.keys.add(e.code);
      if (e.repeat) return;
      if (e.code === "KeyJ" || e.code === "KeyF") this.queue("bite");
      if (e.code === "KeyK") this.queue("paw");
      if (e.code === "Space") this.queue("pounce");
      if (e.code === "KeyP" || e.code === "Escape") this.game.togglePause();
      if (e.code === "KeyM") this.game.toggleSound();
    });
    window.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => { this.keys.clear(); this.joy.active = false; this.joy.id = null; this.resetKnob(); });
  }

  setupJoystick() {
    const el = document.getElementById("joystick");
    const knob = document.getElementById("joystick-knob");
    this.joyEl = el;
    this.knob = knob;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const start = (e) => {
      if (!this.game.canControl()) return;
      const r = rect();
      this.joy.active = true;
      this.joy.id = e.pointerId;
      this.joy.startX = r.left + r.width / 2;
      this.joy.startY = r.top + r.height / 2;
      this.joy.radius = r.width * 0.36;
      el.setPointerCapture?.(e.pointerId);
      this.applyJoy(e.clientX, e.clientY);
      e.preventDefault();
    };
    const move = (e) => {
      if (!this.joy.active || (this.joy.id !== null && e.pointerId !== this.joy.id)) return;
      this.applyJoy(e.clientX, e.clientY);
      e.preventDefault();
    };
    const end = (e) => {
      if (e && this.joy.id !== null && e.pointerId !== this.joy.id) return;
      this.joy.active = false;
      this.joy.id = null;
      this.joy.x = 0; this.joy.y = 0;
      this.resetKnob();
    };
    el.addEventListener("pointerdown", start, { passive: false });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    el.addEventListener("contextmenu", e => e.preventDefault());
  }

  setupButtons() {
    const bind = (id, action) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.queue(action);
      });
    };
    bind("btn-bite", "bite");
    bind("btn-paw", "paw");
    bind("btn-pounce", "pounce");
    const bite = document.getElementById("btn-bite");
    if (bite) bite.addEventListener("contextmenu", e => e.preventDefault());
  }

  queue(action) {
    if (!this.game.canControl()) return;
    this.game.doAction(action);
  }

  applyJoy(cx, cy) {
    const dx = cx - this.joy.startX;
    const dy = cy - this.joy.startY;
    const dist = Math.hypot(dx, dy);
    const max = this.joy.radius;
    const clampDist = Math.min(dist, max);
    const nx = dist > 0 ? (dx / dist) * (clampDist / max) : 0;
    const ny = dist > 0 ? (dy / dist) * (clampDist / max) : 0;
    this.joy.x = Math.abs(nx) < 0.06 ? 0 : nx;
    this.joy.y = Math.abs(ny) < 0.06 ? 0 : ny;
    this.knob.style.transform = `translate(${nx * max}px, ${ny * max}px)`;
  }

  resetKnob() {
    if (this.knob) this.knob.style.transform = "translate(0px, 0px)";
  }

  async requestTilt() {
    try {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        const res = await DeviceMotionEvent.requestPermission();
        if (res !== "granted") return { ok: false, reason: "Motion access was not granted." };
      }
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res !== "granted") return { ok: false, reason: "Motion access was not granted." };
      }
      if (typeof DeviceOrientationEvent === "undefined" && typeof DeviceMotionEvent === "undefined") {
        return { ok: false, reason: "This device has no motion sensor." };
      }
      this.enableTilt();
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: "Motion access is not available here." };
    }
  }

  enableTilt() {
    if (this.tiltEnabled) return;
    this.tiltEnabled = true;
    this.tilt.baseBeta = null;
    this.tilt.baseGamma = null;
    this.tilt.samples = 0;
    this._onOrient = (e) => {
      if (e.beta === null || e.gamma === null) return;
      this.tilt.samples++;
      if (this.tilt.baseBeta === null) {
        this.tilt.baseBeta = e.beta;
        this.tilt.baseGamma = e.gamma;
        return;
      }
      let angle = 0;
      try { angle = screen.orientation?.angle ?? window.orientation ?? 0; } catch { angle = 0; }
      let dg = e.gamma - this.tilt.baseGamma;
      let db = e.beta - this.tilt.baseBeta;
      let steer = clamp(dg / 16, -1, 1);
      let throttle = clamp(-db / 16, -1, 1);
      if (Math.abs(angle) === 90) {
        const ts = steer;
        steer = clamp(db / 16, -1, 1) * (angle === 90 ? 1 : -1);
        throttle = clamp(-dg / 16, -1, 1);
      }
      if (Math.abs(steer) < 0.08) steer = 0;
      if (Math.abs(throttle) < 0.1) throttle = 0;
      this.tilt.steer = steer;
      this.tilt.throttle = throttle;
    };
    window.addEventListener("deviceorientation", this._onOrient, true);
  }

  disableTilt() {
    this.tiltEnabled = false;
    this.tilt.steer = 0;
    this.tilt.throttle = 0;
    if (this._onOrient) window.removeEventListener("deviceorientation", this._onOrient, true);
    this._onOrient = null;
  }

  update(dt) {
    const k = this.keys;
    let kSteer = 0, kThrottle = 0;
    if (k.has("KeyA") || k.has("ArrowLeft")) kSteer -= 1;
    if (k.has("KeyD") || k.has("ArrowRight")) kSteer += 1;
    if (k.has("KeyW") || k.has("ArrowUp")) kThrottle += 1;
    if (k.has("KeyS") || k.has("ArrowDown")) kThrottle -= 1;

    const joyActive = Math.hypot(this.joy.x, this.joy.y) > 0.08;
    const tiltActive = this.tiltEnabled && (this.tilt.steer !== 0 || this.tilt.throttle !== 0);

    let steer, throttle;
    if (joyActive) {
      steer = this.joy.x;
      throttle = -this.joy.y;
    } else if (kSteer !== 0 || kThrottle !== 0) {
      steer = kSteer;
      throttle = kThrottle;
    } else if (tiltActive) {
      steer = this.tilt.steer;
      throttle = this.tilt.throttle;
    } else {
      steer = 0;
      throttle = 0;
    }

    this.steer = damp(this.steer, clamp(steer, -1, 1), 18, dt);
    this.throttle = damp(this.throttle, clamp(throttle, -1, 1), 18, dt);
    this.sprint = Math.hypot(this.joy.x, this.joy.y) > 0.86 || k.has("ShiftLeft") || k.has("ShiftRight");
    this.joyMagnitude = Math.min(1, Math.hypot(this.joy.x, this.joy.y));
  }
}
