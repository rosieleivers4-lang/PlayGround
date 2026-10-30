import { clamp } from './utils.js';

export class Input {
  constructor() {
    this.keys = new Set();
    this.touch = { left: false, right: false, throttle: false, brake: false };
    this.tiltEnabled = false;
    this.tiltSteer = 0;
    this.tiltAvailable = 'DeviceOrientationEvent' in window;
    this.tiltPermission = 'unknown';
    this._baseline = null;
    this._lastOrientation = 0;
    this._interact = false;
    this._onKeyDown = null;
    this._onKeyUp = null;
    this._touchPointers = new Map();
    this._bindKeyboard();
    this._bindTouch();
    this._bindTilt();
  }

  _bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
        return;
      }
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      this.keys.add(e.key.toLowerCase());
      if (e.key === 'Escape') this.keys.add('escape');
      if (e.key.toLowerCase() === 'e') this._interact = true;
      if (this._onKeyDown) this._onKeyDown(e);
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
      if (this._onKeyUp) this._onKeyUp(e);
    });
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.touch.left = false;
      this.touch.right = false;
      this.touch.throttle = false;
      this.touch.brake = false;
      document.querySelectorAll('.tbtn.active').forEach((b) => b.classList.remove('active'));
    });
  }

  onKey(fn) {
    this._onKeyDown = fn;
  }

  _bindTouch() {
    const buttons = document.querySelectorAll('.tbtn[data-action]');
    for (const btn of buttons) {
      const action = btn.dataset.action;
      const down = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.touch[action] = true;
        btn.classList.add('active');
        this._touchPointers.set(e.pointerId, { action, btn });
        if (btn.setPointerCapture) {
          try {
            btn.setPointerCapture(e.pointerId);
          } catch {}
        }
      };
      const up = (e) => {
        e.preventDefault();
        const rec = this._touchPointers.get(e.pointerId);
        if (rec) {
          this.touch[rec.action] = false;
          rec.btn.classList.remove('active');
          this._touchPointers.delete(e.pointerId);
        } else {
          this.touch[action] = false;
          btn.classList.remove('active');
        }
      };
      btn.addEventListener('pointerdown', down);
      btn.addEventListener('pointerup', up);
      btn.addEventListener('pointercancel', up);
      btn.addEventListener('lostpointercapture', up);
      btn.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    window.addEventListener('pointerup', (e) => {
      const rec = this._touchPointers.get(e.pointerId);
      if (rec) {
        this.touch[rec.action] = false;
        rec.btn.classList.remove('active');
        this._touchPointers.delete(e.pointerId);
      }
    });
  }

  _bindTilt() {
    this._orientationHandler = (e) => {
      if (!this.tiltEnabled) return;
      const angle = screen.orientation?.angle ?? window.orientation ?? 0;
      const landscape = Math.abs(angle) === 90 || Math.abs(angle) === 270;
      const raw = landscape ? e.beta : e.gamma;
      if (raw == null) return;
      if (angle !== this._lastOrientation) {
        this._lastOrientation = angle;
        this._baseline = null;
      }
      if (this._baseline == null) {
        this._baseline = raw;
        return;
      }
      const diff = raw - this._baseline;
      const dead = 3;
      const span = landscape ? 24 : 26;
      let v = 0;
      if (Math.abs(diff) > dead) {
        v = Math.sign(diff) * clamp((Math.abs(diff) - dead) / span, 0, 1);
      }
      this.tiltSteer = v;
    };
    window.addEventListener('deviceorientation', this._orientationHandler);
    this._lastOrientation = screen.orientation?.angle ?? window.orientation ?? 0;
  }

  async enableTilt() {
    if (!this.tiltAvailable) {
      this.tiltPermission = 'unsupported';
      return { ok: false, reason: 'This device does not report motion.' };
    }
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const res = await DeviceOrientationEvent.requestPermission();
        this.tiltPermission = res;
        if (res !== 'granted') {
          return { ok: false, reason: 'Motion permission was not granted.' };
        }
      } catch (err) {
        this.tiltPermission = 'denied';
        return { ok: false, reason: 'Motion permission was not granted.' };
      }
    } else {
      this.tiltPermission = 'granted';
    }
    this.tiltEnabled = true;
    this._baseline = null;
    this.tiltSteer = 0;
    return { ok: true };
  }

  disableTilt() {
    this.tiltEnabled = false;
    this.tiltSteer = 0;
    this._baseline = null;
  }

  resetTilt() {
    this._baseline = null;
    this.tiltSteer = 0;
  }

  get steer() {
    let k = 0;
    if (this.keys.has('a') || this.keys.has('arrowleft')) k -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) k += 1;
    if (this.touch.left) k -= 1;
    if (this.touch.right) k += 1;
    if (k === 0 && this.tiltEnabled) k = this.tiltSteer;
    return clamp(k, -1, 1);
  }

  get throttle() {
    return (
      this.keys.has('w') ||
      this.keys.has('arrowup') ||
      this.keys.has(' ') ||
      this.touch.throttle
    );
  }

  get brake() {
    return this.keys.has('s') || this.keys.has('arrowdown') || this.touch.brake;
  }

  get reverse() {
    return this.keys.has('s') || this.keys.has('arrowdown');
  }

  consumeInteract() {
    if (this._interact) {
      this._interact = false;
      return true;
    }
    return false;
  }

  clear() {
    this.keys.clear();
    this.touch.left = this.touch.right = this.touch.throttle = this.touch.brake = false;
    this._interact = false;
    document.querySelectorAll('.tbtn.active').forEach((b) => b.classList.remove('active'));
  }
}
