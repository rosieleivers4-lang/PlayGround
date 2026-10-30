export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.night = false;
    this.started = false;
    this._ambient = [];
    this._birdTimer = null;
    this._cricketTimer = null;
    this._noiseBuffer = null;
  }

  init() {
    if (this.started) {
      if (this.ctx?.state === "suspended") this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.started = true;
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? 0.42 : 0;
    this.master.connect(this.ctx.destination);
    this._makeNoise();
    this._startWind();
    this._scheduleBirds();
    this._scheduleCrickets();
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  _makeNoise() {
    const length = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    this._noiseBuffer = buffer;
  }

  _noiseSource() {
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer;
    return src;
  }

  _env(gain, when, attack, decay, peak) {
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + attack + decay);
  }

  _startWind() {
    const src = this._noiseSource();
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.6;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.055;
    src.connect(filter).connect(gain).connect(this.master);
    src.start();
    // slow breathing of the wind
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();
    this._ambient.push(src, lfo);
  }

  _scheduleBirds() {
    clearInterval(this._birdTimer);
    this._birdTimer = setInterval(() => {
      if (!this.enabled || !this.started || this.night) return;
      if (Math.random() > 0.62) this.bird();
    }, 2600);
  }

  _scheduleCrickets() {
    clearInterval(this._cricketTimer);
    this._cricketTimer = setInterval(() => {
      if (!this.enabled || !this.started || !this.night) return;
      if (Math.random() > 0.5) this.cricket();
    }, 1500);
  }

  setNight(night) {
    this.night = night;
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.setTargetAtTime(on ? 0.42 : 0, this.ctx.currentTime, 0.05);
  }

  bird() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (pan) { pan.pan.value = Math.random() * 2 - 1; pan.connect(this.master); }
    const notes = 2 + Math.floor(Math.random() * 4);
    const base = 1750 + Math.random() * 1400;
    for (let i = 0; i < notes; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const start = t + i * (0.075 + Math.random() * 0.05);
      osc.frequency.setValueAtTime(base * (0.9 + Math.random() * 0.3), start);
      osc.frequency.exponentialRampToValueAtTime(base * (1.25 + Math.random() * 0.35), start + 0.045);
      osc.frequency.exponentialRampToValueAtTime(base * 0.85, start + 0.1);
      this._env(gain, start, 0.005, 0.09, 0.022);
      osc.connect(gain);
      if (pan) gain.connect(pan); else gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.15);
    }
  }

  cricket() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const base = 3800 + Math.random() * 900;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const start = t + i * 0.085;
      osc.frequency.value = base;
      this._env(gain, start, 0.003, 0.035, 0.009);
      osc.connect(gain).connect(this.master);
      osc.start(start);
      osc.stop(start + 0.06);
    }
  }

  footstep(soft = false) {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this._noiseSource();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650 + Math.random() * 350;
    const gain = this.ctx.createGain();
    this._env(gain, t, 0.004, 0.07, soft ? 0.01 : 0.035);
    src.connect(filter).connect(gain).connect(this.master);
    src.start(t, Math.random() * 2, 0.1);
  }

  bite() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this._noiseSource();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1900, t);
    filter.frequency.exponentialRampToValueAtTime(380, t + 0.12);
    filter.Q.value = 1.2;
    const gain = this.ctx.createGain();
    this._env(gain, t, 0.003, 0.13, 0.14);
    src.connect(filter).connect(gain).connect(this.master);
    src.start(t, Math.random() * 2, 0.2);
    const osc = this.ctx.createOscillator();
    const og = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(170, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.12);
    this._env(og, t, 0.004, 0.14, 0.12);
    osc.connect(og).connect(this.master);
    osc.start(t); osc.stop(t + 0.2);
  }

  claw() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this._noiseSource();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(2600, t + 0.1);
    filter.Q.value = 2;
    const gain = this.ctx.createGain();
    this._env(gain, t, 0.006, 0.12, 0.09);
    src.connect(filter).connect(gain).connect(this.master);
    src.start(t, Math.random() * 2, 0.15);
  }

  chomp() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const src = this._noiseSource();
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 480;
      const gain = this.ctx.createGain();
      this._env(gain, t + i * 0.11, 0.004, 0.09, 0.13);
      src.connect(filter).connect(gain).connect(this.master);
      src.start(t + i * 0.11, Math.random() * 2, 0.12);
    }
  }

  gulp() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.25);
    this._env(gain, t, 0.01, 0.24, 0.11);
    osc.connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 0.3);
  }

  hurt() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(85, t + 0.3);
    this._env(gain, t, 0.01, 0.3, 0.08);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    osc.connect(filter).connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 0.35);
    this.footstep();
  }

  growl() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 72;
    lfo.frequency.value = 24;
    lfoGain.gain.value = 18;
    lfo.connect(lfoGain).connect(osc.frequency);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    this._env(gain, t, 0.02, 0.45, 0.09);
    osc.connect(filter).connect(gain).connect(this.master);
    osc.start(t); lfo.start(t);
    osc.stop(t + 0.5); lfo.stop(t + 0.5);
  }

  pounce() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this._noiseSource();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.exponentialRampToValueAtTime(1800, t + 0.2);
    filter.Q.value = 1.4;
    const gain = this.ctx.createGain();
    this._env(gain, t, 0.02, 0.25, 0.06);
    src.connect(filter).connect(gain).connect(this.master);
    src.start(t, Math.random() * 2, 0.3);
  }

  levelComplete() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const notes = [392, 493.88, 587.33, 783.99];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      this._env(gain, t + i * 0.11, 0.02, 0.55, 0.045);
      osc.connect(gain).connect(this.master);
      osc.start(t + i * 0.11);
      osc.stop(t + i * 0.11 + 0.6);
    });
  }

  death() {
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 1.2);
    this._env(gain, t, 0.04, 1.15, 0.1);
    osc.connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 1.3);
  }

  click() {
    if (!this.started) this.init();
    if (!this.started || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.07);
    this._env(gain, t, 0.003, 0.07, 0.03);
    osc.connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 0.1);
  }
}
