const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export class Input {
  constructor({ onPaw, onBite, onPause, onTiltChange }) {
    this.onPaw = onPaw;
    this.onBite = onBite;
    this.onPause = onPause;
    this.onTiltChange = onTiltChange || (() => {});
    this.keys = new Set();
    this.joystick = { x: 0, y: 0, active: false, pointerId: null };
    this.tiltEnabled = false;
    this.tiltSteer = 0;
    this.tiltRaw = 0;
    this.tiltZero = null;
    this.sprint = false;
    this.touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this._bound = false;
  }

  bind() {
    if (this._bound) return;
    this._bound = true;

    const stick = document.getElementById('stick');
    const knob = document.getElementById('stickKnob');
    this.stick = stick;
    this.knob = knob;

    if (stick && knob) {
      const radius = 46;
      const update = (event) => {
        const rect = stick.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let dx = event.clientX - cx;
        let dy = event.clientY - cy;
        const len = Math.hypot(dx, dy);
        if (len > radius) {
          dx = (dx / len) * radius;
          dy = (dy / len) * radius;
        }
        this.joystick.x = dx / radius;
        this.joystick.y = -dy / radius;
        this.joystick.active = true;
        knob.style.transform = `translate(${dx}px, ${dy}px)`;
        stick.classList.add('active');
      };

      stick.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        if (this.joystick.pointerId !== null) return;
        this.joystick.pointerId = event.pointerId;
        stick.setPointerCapture?.(event.pointerId);
        update(event);
      });
      stick.addEventListener('pointermove', (event) => {
        if (event.pointerId !== this.joystick.pointerId) return;
        event.preventDefault();
        update(event);
      });
      const end = (event) => {
        if (event.pointerId !== this.joystick.pointerId) return;
        this.joystick.pointerId = null;
        this.joystick.x = 0;
        this.joystick.y = 0;
        this.joystick.active = false;
        knob.style.transform = 'translate(0px, 0px)';
        stick.classList.remove('active');
      };
      stick.addEventListener('pointerup', end);
      stick.addEventListener('pointercancel', end);
      stick.addEventListener('lostpointercapture', end);
    }

    const bindAction = (id, action) => {
      const el = document.getElementById(id);
      if (!el) return;
      const down = (event) => {
        event.preventDefault();
        el.classList.add('pressed');
        action();
      };
      const up = () => el.classList.remove('pressed');
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('pointerleave', up);
    };

    bindAction('btnPaw', () => this.onPaw?.());
    bindAction('btnBite', () => this.onBite?.());
    bindAction('btnDash', () => { this.sprint = true; });

    const dash = document.getElementById('btnDash');
    if (dash) {
      const stop = () => { this.sprint = false; dash.classList.remove('pressed'); };
      dash.addEventListener('pointerup', stop);
      dash.addEventListener('pointercancel', stop);
      dash.addEventListener('pointerleave', stop);
    }

    window.addEventListener('keydown', (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar'].includes(event.key)) event.preventDefault();
      if (event.repeat) return;
      this.keys.add(event.key.toLowerCase());
      if (event.code === 'Space') this.onBite?.();
      if (event.key.toLowerCase() === 'f') this.onPaw?.();
      if (event.key.toLowerCase() === 'p' || event.key === 'Escape') this.onPause?.();
      if (event.key === 'Shift') this.sprint = true;
    });
    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
      if (event.key === 'Shift') this.sprint = false;
    });
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.sprint = false;
    });
  }

  getAxes() {
    let x = this.joystick.x;
    let y = this.joystick.y;
    if (this.keys.has('a') || this.keys.has('arrowleft')) x -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) x += 1;
    if (this.keys.has('w') || this.keys.has('arrowup')) y += 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) y -= 1;
    if (this.tiltEnabled) x += this.tiltSteer * 0.62;
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }

  async enableTilt() {
    if (this.tiltEnabled) return { ok: true, already: true };
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') return { ok: false, reason: 'Motion access was not granted.' };
      }
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try { await DeviceMotionEvent.requestPermission(); } catch { /* orientation permission is enough */ }
      }
      if (typeof DeviceOrientationEvent === 'undefined') {
        return { ok: false, reason: 'This device has no tilt sensor.' };
      }
      this._orientationHandler = (event) => {
        if (event.gamma == null) return;
        if (this.tiltZero == null) this.tiltZero = event.gamma;
        this.tiltRaw = event.gamma - this.tiltZero;
        this.tiltSteer = clamp(this.tiltRaw / 24, -1, 1);
      };
      window.addEventListener('deviceorientation', this._orientationHandler, true);
      this.tiltEnabled = true;
      this.onTiltChange(true);
      return { ok: true };
    } catch (error) {
      return { ok: false, reason: 'Motion access needs a tap on the screen.' };
    }
  }

  disableTilt() {
    this.tiltEnabled = false;
    this.tiltSteer = 0;
    this.tiltZero = null;
    if (this._orientationHandler) {
      window.removeEventListener('deviceorientation', this._orientationHandler, true);
      this._orientationHandler = null;
    }
    this.onTiltChange(false);
  }

  calibrateTilt() {
    this.tiltZero = this.tiltRaw + (this.tiltZero || 0);
    this.tiltSteer = 0;
  }
}
