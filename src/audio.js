const STORAGE_KEY = 'tealfang.muted';

function makeNoiseBuffer(ctx, seconds = 2) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }
  return buffer;
}

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noise = null;
    this.ambience = null;
    this.ambienceToken = 0;
    this.muted = localStorage.getItem(STORAGE_KEY) === '1';
    this.danger = false;
    this.heartTimer = 0;
    this.stepTimer = 0;
  }

  get available() {
    return !!this.ctx;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.58;
    this.master.connect(this.ctx.destination);
    this.noise = makeNoiseBuffer(this.ctx);
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(muted ? 0 : 0.58, this.ctx.currentTime + 0.18);
    }
  }

  toggleMuted() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  _env(gainNode, peak, attack, decay, when = 0) {
    const t = this.ctx.currentTime + when;
    gainNode.gain.cancelScheduledValues(t);
    gainNode.gain.setValueAtTime(0.0001, t);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  _tone(freq, type, peak, attack, decay, when = 0, slide = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    const t = this.ctx.currentTime + when;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + attack + decay);
    gain.connect(this.master);
    osc.connect(gain);
    this._env(gain, peak, attack, decay, when);
    osc.start(t);
    osc.stop(t + attack + decay + 0.05);
  }

  _noiseBurst(peak, attack, decay, filterFreq, q = 1, when = 0) {
    if (!this.ctx || !this.noise) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = q;
    const gain = this.ctx.createGain();
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    this._env(gain, peak, attack, decay, when);
    source.start(this.ctx.currentTime + when);
    source.stop(this.ctx.currentTime + when + attack + decay + 0.08);
  }

  startAmbience(phase) {
    if (!this.ctx) return;
    this.stopAmbience();
    const token = ++this.ambienceToken;
    const t = this.ctx.currentTime;

    const wind = this.ctx.createBufferSource();
    wind.buffer = this.noise;
    wind.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = phase === 'night' ? 310 : 460;
    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.0001;
    windGain.gain.exponentialRampToValueAtTime(phase === 'night' ? 0.06 : 0.045, t + 1.6);
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.master);
    wind.start();

    const drone = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    drone.type = 'sine';
    drone.frequency.value = phase === 'night' ? 48 : 55;
    droneGain.gain.value = 0.012;
    drone.connect(droneGain);
    droneGain.connect(this.master);
    drone.start();

    this.ambience = { wind, windGain, drone, droneGain, phase, token };

    const scheduleBird = () => {
      if (!this.ambience || this.ambience.token !== token) return;
      const delay = 2200 + Math.random() * 5200;
      this._birdTimer = setTimeout(() => {
        if (!this.ambience || this.ambience.token !== token) return;
        this._chirp();
        scheduleBird();
      }, delay);
    };
    const scheduleCricket = () => {
      if (!this.ambience || this.ambience.token !== token) return;
      const delay = 550 + Math.random() * 1300;
      this._cricketTimer = setTimeout(() => {
        if (!this.ambience || this.ambience.token !== token) return;
        this._cricket();
        scheduleCricket();
      }, delay);
    };

    if (phase === 'day' || phase === 'dusk') scheduleBird();
    if (phase === 'night' || phase === 'dusk') scheduleCricket();
  }

  stopAmbience() {
    this.ambienceToken += 1;
    clearTimeout(this._birdTimer);
    clearTimeout(this._cricketTimer);
    if (!this.ambience || !this.ctx) return;
    const { wind, windGain, drone, droneGain } = this.ambience;
    const t = this.ctx.currentTime;
    windGain.gain.cancelScheduledValues(t);
    windGain.gain.setValueAtTime(Math.max(0.0001, windGain.gain.value), t);
    windGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    droneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    try { wind.stop(t + 0.55); } catch { /* already stopped */ }
    try { drone.stop(t + 0.55); } catch { /* already stopped */ }
    this.ambience = null;
  }

  _chirp() {
    if (!this.ctx) return;
    const base = 1500 + Math.random() * 1300;
    const notes = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < notes; i += 1) {
      this._tone(base + Math.random() * 500, 'sine', 0.018, 0.012, 0.09, i * 0.12, 260);
    }
  }

  _cricket() {
    if (!this.ctx) return;
    for (let i = 0; i < 3; i += 1) {
      this._tone(3800 + Math.random() * 700, 'triangle', 0.012, 0.008, 0.035, i * 0.055, 0);
    }
  }

  step(sprint = false) {
    this._noiseBurst(sprint ? 0.035 : 0.022, 0.004, 0.07, 240 + Math.random() * 120, 0.8);
  }

  paw() {
    this._noiseBurst(0.16, 0.01, 0.16, 900, 0.7);
    this._tone(170, 'sine', 0.06, 0.008, 0.12, 0, -70);
  }

  bite() {
    this._noiseBurst(0.2, 0.004, 0.09, 1800, 0.9);
    this._tone(110, 'square', 0.05, 0.005, 0.1, 0, -60);
  }

  hit() {
    this._noiseBurst(0.15, 0.003, 0.12, 320, 1.1);
    this._tone(85, 'sine', 0.14, 0.004, 0.16, 0, -30);
  }

  hurt() {
    this._tone(140, 'sawtooth', 0.09, 0.01, 0.25, 0, -70);
    this._noiseBurst(0.13, 0.004, 0.18, 480, 0.8);
  }

  windup() {
    this._tone(155, 'sawtooth', 0.045, 0.04, 0.26, 0, 55);
    this._noiseBurst(0.04, 0.02, 0.2, 700, 1.4);
  }

  feast() {
    this._noiseBurst(0.12, 0.005, 0.1, 700, 0.8);
    this._tone(330, 'sine', 0.05, 0.02, 0.22, 0.03, 260);
    this._tone(494, 'sine', 0.04, 0.02, 0.28, 0.12, 320);
    this._tone(660, 'sine', 0.035, 0.02, 0.32, 0.22, 380);
  }

  levelUp() {
    const notes = [392, 494, 587, 784];
    notes.forEach((freq, i) => this._tone(freq, 'triangle', 0.055, 0.02, 0.34, i * 0.11, 40));
    this._tone(98, 'sine', 0.06, 0.05, 0.7, 0, 30);
  }

  death() {
    this._tone(220, 'sawtooth', 0.08, 0.02, 0.8, 0, -160);
    this._tone(110, 'sine', 0.08, 0.05, 1.1, 0.1, -60);
  }

  click() {
    this._tone(640, 'sine', 0.035, 0.004, 0.06, 0, 120);
  }

  update(dt, lowLife) {
    if (!this.ctx) return;
    this.danger = lowLife;
    if (lowLife) {
      this.heartTimer -= dt;
      if (this.heartTimer <= 0) {
        this.heartTimer = 0.78;
        this._tone(58, 'sine', 0.16, 0.01, 0.12, 0, -18);
        this._tone(48, 'sine', 0.1, 0.01, 0.16, 0.16, -12);
      }
    } else {
      this.heartTimer = 0;
    }
  }
}
