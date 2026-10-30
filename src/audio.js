export class GameAudio {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.muted = false;
    this.master = null;
    this.engine = null;
    this.siren = null;
    this.wind = null;
    this._engineNodes = [];
    this._lastTick = 0;
  }

  init() {
    if (this.ready) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : 0.55;
    master.connect(ctx.destination);
    this.master = master;

    // engine
    const engineGain = ctx.createGain();
    engineGain.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 2.2;
    engineGain.connect(filter);
    filter.connect(master);
    const oscA = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscA.frequency.value = 44;
    const oscB = ctx.createOscillator();
    oscB.type = 'square';
    oscB.frequency.value = 22;
    const gA = ctx.createGain();
    gA.gain.value = 0.5;
    const gB = ctx.createGain();
    gB.gain.value = 0.22;
    oscA.connect(gA);
    oscB.connect(gB);
    gA.connect(engineGain);
    gB.connect(engineGain);
    oscA.start();
    oscB.start();
    this.engine = { gain: engineGain, filter, oscA, oscB };
    this._engineNodes = [oscA, oscB];

    // wind / tyre noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 720;
    windFilter.Q.value = 0.5;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.0001;
    noise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    noise.start();
    this.wind = { gain: windGain, filter: windFilter };

    // siren
    const sirenOsc = ctx.createOscillator();
    sirenOsc.type = 'sawtooth';
    sirenOsc.frequency.value = 780;
    const sirenFilter = ctx.createBiquadFilter();
    sirenFilter.type = 'bandpass';
    sirenFilter.frequency.value = 900;
    sirenFilter.Q.value = 1.4;
    const sirenGain = ctx.createGain();
    sirenGain.gain.value = 0.0001;
    sirenOsc.connect(sirenFilter);
    sirenFilter.connect(sirenGain);
    sirenGain.connect(master);
    sirenOsc.start();
    this.siren = { osc: sirenOsc, gain: sirenGain, filter: sirenFilter };

    this.ready = true;
    if (ctx.state === 'suspended') ctx.resume();
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.05);
    }
  }

  update(dt, { speed = 0, throttle = 0, braking = false, wanted = 0, active = false } = {}) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const e = this.engine;
    if (!e) return;
    const rpm = Math.min(1, speed / 34);
    const targetFreq = 40 + rpm * 150 + throttle * 16;
    e.oscA.frequency.setTargetAtTime(targetFreq, t, 0.06);
    e.oscB.frequency.setTargetAtTime(targetFreq * 0.5, t, 0.06);
    e.filter.frequency.setTargetAtTime(320 + rpm * 1400, t, 0.08);
    const engineVol = active ? (0.028 + throttle * 0.025 + rpm * 0.02) * (braking ? 0.6 : 1) : 0.003;
    e.gain.gain.setTargetAtTime(engineVol, t, 0.08);

    if (this.wind) {
      this.wind.gain.gain.setTargetAtTime(active ? Math.min(0.045, speed * 0.0016) : 0.001, t, 0.1);
      this.wind.filter.frequency.setTargetAtTime(500 + speed * 38, t, 0.1);
    }

    if (this.siren) {
      const target = active && wanted > 0 ? 0.026 : 0.0001;
      this.siren.gain.gain.setTargetAtTime(target, t, 0.16);
      if (wanted > 0) {
        const phase = Math.floor(t * 2.6) % 2;
        this.siren.osc.frequency.setTargetAtTime(phase ? 960 : 690, t, 0.03);
      }
    }
  }

  tone(freq, duration = 0.14, type = 'sine', volume = 0.12, slide = 0, delay = 0) {
    if (!this.ready || this.muted) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + duration);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  noiseBurst(duration = 0.25, volume = 0.22, freq = 900) {
    if (!this.ready || this.muted) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq, t0);
    filter.frequency.exponentialRampToValueAtTime(80, t0 + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(t0);
  }

  pickup() {
    this.tone(880, 0.09, 'triangle', 0.1);
    this.tone(1320, 0.12, 'triangle', 0.08, 0, 0.06);
    this.tone(1760, 0.14, 'sine', 0.05, 0, 0.12);
  }

  alert() {
    this.tone(560, 0.16, 'square', 0.08);
    this.tone(760, 0.16, 'square', 0.08, 0, 0.18);
  }

  crash() {
    this.noiseBurst(0.35, 0.26, 1600);
    this.tone(90, 0.22, 'square', 0.12, -40);
  }

  policeHit() {
    this.noiseBurst(0.3, 0.22, 1000);
    this.tone(180, 0.25, 'sawtooth', 0.1, -80);
    this.tone(620, 0.1, 'square', 0.06, 0, 0.15);
  }

  refuel() {
    this.tone(420, 0.1, 'triangle', 0.08);
    this.tone(540, 0.1, 'triangle', 0.08, 0, 0.09);
    this.tone(700, 0.16, 'triangle', 0.09, 0, 0.18);
  }

  deny() {
    this.tone(220, 0.18, 'square', 0.07);
    this.tone(170, 0.2, 'square', 0.07, 0, 0.16);
  }

  arrest() {
    this.tone(320, 0.25, 'sawtooth', 0.1, -120);
    this.tone(240, 0.3, 'sawtooth', 0.1, -100, 0.25);
    this.tone(150, 0.5, 'sawtooth', 0.09, -80, 0.55);
  }

  click() {
    this.tone(520, 0.06, 'triangle', 0.05);
  }

  engineTick(speed) {
    // subtle mechanical ticking
    const t = this.ctx?.currentTime || 0;
    if (t - this._lastTick < 0.16 - Math.min(0.11, speed * 0.002)) return;
    this._lastTick = t;
    if (this.ready && !this.muted) this.tone(140 + Math.random() * 40, 0.025, 'square', 0.012);
  }
}
