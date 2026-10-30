export class AudioKit {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ambient = null;
    this.muted = false;
    this.night = false;
    this.started = false;
    this.noiseBuffer = null;
    this.birdTimer = 0;
    this.cricketTimer = 0;
    this.windNodes = [];
    this.lastStep = 0;
  }

  async init() {
    if (this.started) {
      if (this.ctx?.state === 'suspended') await this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.started = true;
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.8;
    this.master.connect(this.ctx.destination);
    this.ambient = this.ctx.createGain();
    this.ambient.gain.value = 0.65;
    this.ambient.connect(this.master);
    this.noiseBuffer = this.makeNoise(3);
    this.startWind();
    if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => {});
  }

  makeNoise(seconds = 2) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      d[i] = (b0 + b1 + b2 + white * 0.1848) * 0.18;
    }
    return buf;
  }

  startWind() {
    if (!this.ctx) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 520;
    lp.Q.value = 0.5;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 70;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.12;
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.045;
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain).connect(gain.gain);
    src.connect(hp).connect(lp).connect(gain).connect(this.ambient);
    src.start();
    lfo.start();
    this.windNodes.push(src, lfo);
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.8, this.ctx.currentTime, 0.08);
  }

  setNight(night) {
    this.night = night;
    if (this.ambient) this.ambient.gain.setTargetAtTime(night ? 0.5 : 0.65, this.ctx.currentTime, 1.2);
  }

  update(dt, night) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    this.night = night;
    this.birdTimer -= dt;
    this.cricketTimer -= dt;
    if (this.birdTimer <= 0) {
      this.birdTimer = night ? 7 + Math.random() * 12 : 3 + Math.random() * 8;
      if (!night && Math.random() < 0.8) this.bird();
    }
    if (this.cricketTimer <= 0) {
      this.cricketTimer = night ? 0.7 + Math.random() * 1.8 : 8 + Math.random() * 8;
      if (night && Math.random() < 0.8) this.cricket();
    }
  }

  bird() {
    const t = this.ctx.currentTime;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.035, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    const base = 1500 + Math.random() * 900;
    o.frequency.setValueAtTime(base, t);
    o.frequency.exponentialRampToValueAtTime(base * (1.25 + Math.random() * 0.35), t + 0.08);
    o.frequency.exponentialRampToValueAtTime(base * 0.82, t + 0.24);
    o.connect(g).connect(this.ambient);
    o.start(t); o.stop(t + 0.3);
    if (Math.random() < 0.5) setTimeout(() => this.ctx && this.bird(), 120 + Math.random() * 130);
  }

  cricket() {
    const t = this.ctx.currentTime;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.013, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = 3600 + Math.random() * 900;
    o.connect(g).connect(this.ambient);
    o.start(t); o.stop(t + 0.12);
  }

  now() { return this.ctx ? this.ctx.currentTime : 0; }

  tone(type, f0, f1, dur, vol = 0.08, dest = null, delay = 0) {
    if (!this.ctx) return;
    const t = this.now() + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(0.02, dur * 0.2));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest || this.master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  noise(dur, vol, freq, type = 'bandpass', q = 1, delay = 0) {
    if (!this.ctx) return;
    const t = this.now() + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t); src.stop(t + dur + 0.02);
  }

  step(sprint = false) {
    if (!this.ctx || this.muted) return;
    const t = this.now();
    if (t - this.lastStep < 0.12) return;
    this.lastStep = t;
    this.noise(0.09, sprint ? 0.06 : 0.04, 340 + Math.random() * 220, 'lowpass', 0.7);
    this.tone('sine', 68 + Math.random() * 25, 45, 0.08, 0.03);
  }

  bite() {
    this.noise(0.09, 0.16, 900, 'bandpass', 1.4);
    this.tone('sawtooth', 190, 70, 0.12, 0.08);
    this.tone('square', 1400, 400, 0.06, 0.03);
  }

  paw() {
    this.noise(0.16, 0.12, 620, 'bandpass', 0.9);
    this.tone('sine', 220, 90, 0.16, 0.04);
  }

  hit() {
    this.noise(0.12, 0.18, 260, 'lowpass', 0.8);
    this.tone('sawtooth', 110, 48, 0.18, 0.1);
  }

  hurt() {
    this.tone('sawtooth', 320, 90, 0.34, 0.12);
    this.noise(0.2, 0.14, 380, 'bandpass', 1);
  }

  eat() {
    for (let i = 0; i < 3; i++) {
      this.noise(0.08, 0.11, 700 + i * 250, 'bandpass', 1.2, i * 0.13);
      this.tone('square', 120 + i * 20, 60, 0.1, 0.04, null, i * 0.13);
    }
  }

  heal() {
    this.tone('sine', 420, 650, 0.5, 0.05);
    this.tone('sine', 630, 980, 0.65, 0.04, null, 0.08);
  }

  growl(deep = false) {
    const base = deep ? 55 : 85;
    this.tone('sawtooth', base * 1.4, base * 0.75, 0.5, 0.09);
    this.noise(0.45, 0.06, deep ? 120 : 220, 'lowpass', 0.7);
  }

  howl() {
    if (!this.ctx) return;
    const t = this.now();
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(280, t);
    o.frequency.exponentialRampToValueAtTime(560, t + 0.5);
    o.frequency.exponentialRampToValueAtTime(440, t + 1.4);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 1.7);
  }

  gate() {
    [330, 440, 550, 660].forEach((f, i) => this.tone('sine', f, f * 1.01, 1.4, 0.035, null, i * 0.1));
  }

  ui() {
    this.tone('sine', 440, 660, 0.1, 0.035);
  }

  lowHealth() {
    this.tone('sine', 56, 48, 0.2, 0.05);
    this.tone('sine', 84, 70, 0.18, 0.03, null, 0.18);
  }

  victory() {
    [392, 523, 659, 784].forEach((f, i) => {
      this.tone('triangle', f, f, 0.7, 0.05, null, i * 0.12);
    });
  }

  defeat() {
    [220, 185, 146, 110].forEach((f, i) => this.tone('triangle', f, f * 0.98, 0.8, 0.06, null, i * 0.18));
  }
}
