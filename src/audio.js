import { clamp, rand } from './utils.js';

export class AudioEngine {
  constructor(enabled = true) {
    this.enabled = enabled;
    this.ctx = null;
    this.master = null;
    this.ambientGain = null;
    this.elapsed = 0;
    this.nextBird = 3;
    this.nextCricket = 2;
    this.nextHeart = 0;
    this.night = 0;
    this.inGame = false;
    this.health = 100;
    this.noiseBuffer = null;
  }

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return this.ctx;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try {
      this.ctx = new Ctx();
      const ctx = this.ctx;
      this.master = ctx.createGain();
      this.master.gain.value = this.enabled ? 0.52 : 0;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 24;
      comp.ratio.value = 5;
      comp.attack.value = 0.003;
      comp.release.value = 0.22;
      this.master.connect(comp);
      comp.connect(ctx.destination);

      const len = Math.floor(ctx.sampleRate * 1.8);
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      this.noiseBuffer = buffer;
      this.startAmbient();
      return ctx;
    } catch {
      this.ctx = null;
      return null;
    }
  }

  startAmbient() {
    const ctx = this.ctx;
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    filter.Q.value = 0.4;
    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.value = 0.028;
    src.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.master);
    src.start();

    // Low, slow woodland drone.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.018;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 260;
    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = 55;
    const oscB = ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.value = 82.4;
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.009;
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    oscA.connect(droneFilter);
    oscB.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.master);
    oscA.start();
    oscB.start();
    lfo.start();
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(this.enabled ? 0.52 : 0, this.ctx.currentTime, 0.08);
    }
    if (this.enabled) this.ensure();
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  noise({ duration = 0.1, gain = 0.2, type = 'bandpass', freq = 900, q = 0.8, delay = 0, rate = 1 }) {
    const ctx = this.ctx;
    if (!ctx || !this.enabled) return;
    const t = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = rate;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t);
    src.stop(t + duration + 0.05);
  }

  tone({ freq = 220, endFreq = null, type = 'sine', duration = 0.2, gain = 0.12, delay = 0, attack = 0.01 }) {
    const ctx = this.ctx;
    if (!ctx || !this.enabled) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), t + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  click() {
    this.tone({ freq: 540, endFreq: 760, type: 'sine', duration: 0.08, gain: 0.05 });
  }

  footstep(sprint = false) {
    this.noise({ duration: sprint ? 0.09 : 0.12, gain: sprint ? 0.11 : 0.075, type: 'lowpass', freq: sprint ? 700 : 520, q: 0.7, rate: rand(0.7, 1.1) });
    this.tone({ freq: 74, endFreq: 44, type: 'sine', duration: 0.09, gain: 0.045 });
  }

  paw() {
    this.noise({ duration: 0.16, gain: 0.16, type: 'bandpass', freq: 1600, q: 0.9, rate: 1.4 });
    this.tone({ freq: 190, endFreq: 70, type: 'triangle', duration: 0.12, gain: 0.05 });
  }

  bite() {
    this.noise({ duration: 0.07, gain: 0.24, type: 'bandpass', freq: 900, q: 1.2 });
    this.noise({ duration: 0.1, gain: 0.18, type: 'lowpass', freq: 420, q: 0.6, delay: 0.045 });
    this.tone({ freq: 120, endFreq: 55, type: 'square', duration: 0.1, gain: 0.06 });
  }

  hit(heavy = false) {
    this.noise({ duration: heavy ? 0.16 : 0.1, gain: heavy ? 0.26 : 0.16, type: 'lowpass', freq: 300, q: 0.7 });
    this.tone({ freq: heavy ? 82 : 120, endFreq: 38, type: 'sine', duration: heavy ? 0.28 : 0.16, gain: heavy ? 0.22 : 0.12 });
  }

  eat() {
    for (let i = 0; i < 3; i++) {
      this.noise({ duration: 0.08, gain: 0.15, type: 'bandpass', freq: 700 + i * 180, q: 1.4, delay: i * 0.085, rate: rand(0.8, 1.3) });
    }
    this.tone({ freq: 150, endFreq: 90, type: 'triangle', duration: 0.25, gain: 0.06, delay: 0.05 });
  }

  hurt() {
    this.tone({ freq: 220, endFreq: 70, type: 'sawtooth', duration: 0.3, gain: 0.1 });
    this.noise({ duration: 0.2, gain: 0.12, type: 'lowpass', freq: 600, q: 0.7 });
  }

  growl() {
    this.tone({ freq: 92, endFreq: 54, type: 'sawtooth', duration: 0.55, gain: 0.075 });
    this.tone({ freq: 97, endFreq: 58, type: 'sawtooth', duration: 0.55, gain: 0.05, delay: 0.02 });
    this.noise({ duration: 0.5, gain: 0.05, type: 'lowpass', freq: 240, q: 0.8 });
  }

  roar() {
    this.tone({ freq: 78, endFreq: 38, type: 'sawtooth', duration: 0.9, gain: 0.16 });
    this.tone({ freq: 118, endFreq: 52, type: 'square', duration: 0.8, gain: 0.06, delay: 0.04 });
    this.noise({ duration: 0.8, gain: 0.12, type: 'lowpass', freq: 380, q: 0.6 });
  }

  squeak() {
    this.tone({ freq: 1350, endFreq: 1800, type: 'sine', duration: 0.1, gain: 0.045 });
    this.tone({ freq: 1600, endFreq: 1200, type: 'sine', duration: 0.08, gain: 0.03, delay: 0.07 });
  }

  snort() {
    this.noise({ duration: 0.22, gain: 0.14, type: 'bandpass', freq: 380, q: 0.9 });
    this.tone({ freq: 105, endFreq: 70, type: 'sawtooth', duration: 0.18, gain: 0.05 });
  }

  levelComplete() {
    const notes = [392, 523.25, 659.25, 783.99];
    notes.forEach((n, i) => {
      this.tone({ freq: n, type: 'triangle', duration: 0.55, gain: 0.075, delay: i * 0.11 });
      this.tone({ freq: n * 2, type: 'sine', duration: 0.35, gain: 0.02, delay: i * 0.11 });
    });
    this.tone({ freq: 98, endFreq: 130.8, type: 'sine', duration: 1.1, gain: 0.06, delay: 0.2 });
  }

  gameOver() {
    const notes = [196, 174.6, 146.8, 110];
    notes.forEach((n, i) => {
      this.tone({ freq: n, type: 'triangle', duration: 0.9, gain: 0.07, delay: i * 0.22 });
    });
    this.tone({ freq: 55, endFreq: 32, type: 'sine', duration: 1.8, gain: 0.12, delay: 0.4 });
  }

  update(dt, state = {}) {
    if (!this.ctx) return;
    this.elapsed += dt;
    this.night = state.night || 0;
    this.inGame = Boolean(state.inGame);
    this.health = state.health ?? 100;

    if (this.ambientGain) {
      const target = this.inGame ? 0.03 : 0.02;
      this.ambientGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.4);
    }

    // Daytime birds.
    if (this.inGame && this.night < 0.55 && this.elapsed > this.nextBird) {
      this.nextBird = this.elapsed + rand(3.5, 9);
      const base = rand(1700, 3100);
      this.tone({ freq: base, endFreq: base * rand(1.05, 1.35), type: 'sine', duration: 0.09, gain: 0.018 });
      this.tone({ freq: base * 1.1, endFreq: base * 0.85, type: 'sine', duration: 0.07, gain: 0.012, delay: 0.11 });
      if (Math.random() < 0.45) {
        this.tone({ freq: base * 1.2, endFreq: base * 1.45, type: 'sine', duration: 0.08, gain: 0.013, delay: 0.22 });
      }
    }

    // Night crickets.
    if (this.inGame && this.night > 0.45 && this.elapsed > this.nextCricket) {
      this.nextCricket = this.elapsed + rand(0.7, 1.8);
      const f = rand(3900, 4600);
      for (let i = 0; i < 3; i++) {
        this.tone({ freq: f, type: 'sine', duration: 0.035, gain: 0.008, delay: i * 0.06 });
      }
    }

    // Low-health heartbeat.
    if (this.inGame && this.health < 38) {
      if (this.elapsed > this.nextHeart) {
        const urgency = clamp((38 - this.health) / 38, 0.2, 1);
        this.nextHeart = this.elapsed + 1.15 - urgency * 0.45;
        this.tone({ freq: 58, endFreq: 42, type: 'sine', duration: 0.16, gain: 0.07 + urgency * 0.06 });
        this.tone({ freq: 52, endFreq: 38, type: 'sine', duration: 0.14, gain: 0.05 + urgency * 0.04, delay: 0.19 });
      }
    }
  }
}
