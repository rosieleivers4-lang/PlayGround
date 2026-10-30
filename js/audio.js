/**
 * Procedural audio engine for the tactical FPS.
 *
 * Everything is synthesized at runtime with the Web Audio API: no files, no
 * network. The graph is:
 *
 *   sfx / ambience / ui buses -> master (0.8) -> compressor -> limiter -> out
 *
 * A single procedurally generated impulse response feeds one shared convolver,
 * and one shared noise buffer feeds every noise layer. Voices are disposable:
 * every source disconnects its little sub-graph in `onended`, and a hard cap
 * keeps worst-case automatic fire bounded.
 */

export function createAudio() {
  'use strict';

  const VOLUME = 0.8;
  const MAX_VOICES = 72; // concurrent buffer/oscillator sources

  let ctx = null;
  let master = null;
  let compressor = null;
  let limiter = null;
  let sfxBus = null;
  let ambBus = null;
  let uiBus = null;
  let reverbSend = null;
  let noiseBuf = null;
  let brownBuf = null;

  let muted = false;
  let voiceCount = 0;
  let ambience = null;
  let ambienceWanted = false;
  let combatTarget = 0;

  // ---------------------------------------------------------------- utilities

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const rnd = (lo, hi) => lo + Math.random() * (hi - lo);

  function now() {
    // Small lookahead so automation is never scheduled in the render past.
    return ctx ? ctx.currentTime + 0.004 : 0;
  }

  /** Resolve the context, nudging a suspended one back to life. Never throws. */
  function ensure() {
    if (!ctx) return null;
    if (ctx.state === 'closed') return null;
    if (ctx.state !== 'running') {
      try {
        const p = ctx.resume();
        if (p && p.catch) p.catch(() => {});
      } catch (e) {
        /* unavailable / gesture still required */
      }
    }
    return ctx;
  }

  function canPlay() {
    return voiceCount < MAX_VOICES;
  }

  function makeGain(value = 1) {
    const g = ctx.createGain();
    g.gain.value = value;
    return g;
  }

  function makeFilter(type, freq, q = 1) {
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  /** Stereo panner with a cheap mono fallback for old engines. */
  function panner(value) {
    if (typeof ctx.createStereoPanner === 'function') {
      const p = ctx.createStereoPanner();
      p.pan.value = clamp(value, -1, 1);
      return p;
    }
    return makeGain(1);
  }

  /** Percussive envelope: silence -> peak (attack) -> silence (decay). */
  function env(param, t0, peak, attack, decay) {
    const a = Math.max(0.001, attack);
    param.cancelScheduledValues(t0);
    param.setValueAtTime(0.0001, t0);
    param.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + a);
    param.exponentialRampToValueAtTime(0.0001, t0 + a + Math.max(0.01, decay));
  }

  /** Count a source and release its sub-graph when it finishes. */
  function track(source, nodes) {
    voiceCount++;
    let done = false;
    source.onended = () => {
      if (done) return;
      done = true;
      voiceCount = Math.max(0, voiceCount - 1);
      for (let i = 0; i < nodes.length; i++) {
        try { nodes[i].disconnect(); } catch (e) { /* already gone */ }
      }
    };
  }

  function sendTo(node, amount) {
    if (!reverbSend || !amount) return null;
    const g = makeGain(amount);
    node.connect(g);
    g.connect(reverbSend);
    return g;
  }

  /** Attach a node to a bus (and optional reverb send). Returns the panner. */
  function route(node, pan, bus, send, nodes) {
    let out = node;
    if (pan) {
      const p = panner(pan);
      node.connect(p);
      out = p;
      nodes.push(p);
    }
    out.connect(bus || sfxBus);
    const s = sendTo(node, send);
    if (s) nodes.push(s);
    return out;
  }

  /**
   * One-shot filtered noise burst.
   * Options: when, dur, level, pan, rate, brown, hp, filter, freq, endFreq,
   * q, attack, bus, send, force.
   */
  function burst(o = {}) {
    if (!ctx || (!o.force && !canPlay())) return;
    const buf = o.brown ? brownBuf : noiseBuf;
    if (!buf) return;

    const t0 = o.when == null ? now() : o.when;
    const dur = Math.max(0.012, o.dur == null ? 0.1 : o.dur);
    const rate = o.rate == null ? 1 : o.rate;
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.playbackRate.value = rate;
    const nodes = [source];
    let node = source;

    if (o.hp) {
      const hp = makeFilter('highpass', o.hp, o.hpQ == null ? 0.7 : o.hpQ);
      node.connect(hp);
      node = hp;
      nodes.push(hp);
    }
    if (o.filter) {
      const f = makeFilter(o.filter, o.freq == null ? 1000 : o.freq, o.q == null ? 1 : o.q);
      if (o.endFreq) {
        f.frequency.setValueAtTime(Math.max(20, o.freq || 1000), t0);
        f.frequency.exponentialRampToValueAtTime(Math.max(20, o.endFreq), t0 + dur);
      }
      node.connect(f);
      node = f;
      nodes.push(f);
    }

    const g = makeGain(0);
    env(g.gain, t0, o.level == null ? 0.3 : o.level, o.attack == null ? 0.002 : o.attack, dur);
    node.connect(g);
    nodes.push(g);
    const out = route(g, o.pan, o.bus, o.send || 0, nodes);

    const playLen = Math.min(buf.duration - 0.02, dur * rate + 0.04);
    const offset = Math.random() * Math.max(0, buf.duration - playLen - 0.01);
    source.start(t0, offset, Math.max(0.02, playLen));
    track(source, nodes);
    return out;
  }

  /**
   * One-shot oscillator tone with optional downward/upward pitch sweep and
   * low-pass shaping. Options: when, dur, type, freq, endFreq, level, pan,
   * attack, lp, lpEnd, q, bus, send, force, detune.
   */
  function tone(o = {}) {
    if (!ctx || (!o.force && !canPlay())) return;
    const t0 = o.when == null ? now() : o.when;
    const dur = Math.max(0.02, o.dur == null ? 0.12 : o.dur);
    const f0 = Math.max(20, o.freq == null ? 100 : o.freq);
    const osc = ctx.createOscillator();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(f0, t0);
    if (o.detune) osc.detune.value = o.detune;
    if (o.endFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.endFreq), t0 + dur);
    }
    const nodes = [osc];
    let node = osc;

    if (o.lp) {
      const f = makeFilter('lowpass', o.lp, o.q == null ? 1 : o.q);
      if (o.lpEnd) {
        f.frequency.setValueAtTime(Math.max(20, o.lp), t0);
        f.frequency.exponentialRampToValueAtTime(Math.max(20, o.lpEnd), t0 + dur);
      }
      node.connect(f);
      node = f;
      nodes.push(f);
    }

    const g = makeGain(0);
    env(g.gain, t0, o.level == null ? 0.2 : o.level, o.attack == null ? 0.003 : o.attack, dur);
    node.connect(g);
    nodes.push(g);
    route(g, o.pan, o.bus, o.send || 0, nodes);

    osc.start(t0);
    osc.stop(t0 + dur + 0.06);
    track(osc, nodes);
  }

  /** Small metallic tink used by the reload / shell-drop layers. */
  function metalTick(when, freq, level, pan = 0, send = 0.12) {
    burst({
      when, dur: 0.035, level, filter: 'bandpass', freq, q: 7,
      pan, send, rate: rnd(0.95, 1.08)
    });
    tone({
      when, freq: freq * rnd(0.98, 1.05), endFreq: freq * 0.92,
      dur: 0.035, level: level * 0.4, type: 'sine', pan, send
    });
  }

  // -------------------------------------------------------------- weapon fire

  /** Shared gunshot voice. The layers are: crack, sub thump, bark, air tail. */
  function gunshot(o) {
    const t0 = now() + (o.delay || 0);
    const p = 1 + rnd(-0.04, 0.04); // required per-shot pitch variation
    const pan = o.pan == null ? rnd(-0.08, 0.08) : o.pan;
    const lvl = o.level == null ? 0.9 : o.level;
    const send = o.send == null ? 0.45 : o.send;

    // 1. supersonic crack
    burst({
      when: t0, dur: 0.028, level: lvl * 0.5, hp: 1200,
      filter: 'bandpass', freq: 3600 * p, q: 0.7,
      pan, send: send * 0.6, rate: rnd(0.94, 1.06)
    });

    // 2. chest thump
    tone({
      when: t0, freq: (o.body || 150) * p, endFreq: (o.bodyEnd || 55) * p,
      dur: 0.17, level: lvl * 0.55, type: 'sine', pan, send: 0.1
    });
    tone({
      when: t0, freq: (o.body || 150) * 2 * p, endFreq: (o.bodyEnd || 55) * 1.5 * p,
      dur: 0.09, level: lvl * 0.12, type: 'triangle', pan
    });

    // 3. low mid "bark"
    tone({
      when: t0, freq: (o.body || 150) * 3 * p, endFreq: (o.body || 150) * 1.2 * p,
      dur: 0.075, level: lvl * 0.14, type: 'sawtooth',
      lp: 900 * p, q: 0.8, pan
    });

    // 4. filtered noise tail + short room
    burst({
      when: t0 + 0.008, dur: o.tail == null ? 0.45 : o.tail,
      level: lvl * (o.tailLevel == null ? 0.28 : o.tailLevel),
      filter: 'lowpass', freq: (o.cutoff || 4200) * p,
      endFreq: o.tailEnd || 480, q: 0.7,
      pan, send, rate: rnd(0.9, 1.02)
    });
  }

  function shoot(kind = 'rifle') {
    if (!ensure() || !canPlay()) return;
    if (kind === 'pistol') {
      gunshot({
        body: 195, bodyEnd: 85, level: 0.7, tail: 0.3,
        tailLevel: 0.22, cutoff: 5200, tailEnd: 700, send: 0.38
      });
    } else if (kind === 'enemy') {
      gunshot({
        body: 120, bodyEnd: 45, level: 0.34, tail: 0.55,
        tailLevel: 0.24, cutoff: 1500, tailEnd: 260, send: 0.5,
        pan: rnd(-0.7, 0.7)
      });
    } else {
      gunshot({
        body: 150, bodyEnd: 55, level: 0.9, tail: 0.45,
        tailLevel: 0.28, cutoff: 4200, tailEnd: 480, send: 0.45
      });
    }
  }

  /** Distant shot: caller handles travel delay; this handles air absorption. */
  function enemyShoot(distance = 20) {
    if (!ensure() || !canPlay()) return;
    const d = clamp(Number(distance) || 20, 1, 200);
    const att = clamp(1 / (1 + d * 0.07), 0.08, 1);
    const cutoff = clamp(7000 / (1 + d * 0.45), 420, 7000);
    gunshot({
      body: 120, bodyEnd: 45, level: 0.85 * att,
      tail: 0.55 + d * 0.004, tailLevel: 0.26,
      cutoff, tailEnd: Math.max(160, cutoff * 0.35),
      send: 0.55, pan: rnd(-0.8, 0.8)
    });
  }

  function dryFire() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    metalTick(t, rnd(3000, 3600), 0.16, rnd(-0.1, 0.1), 0.1);
    burst({
      when: t, dur: 0.025, level: 0.08, filter: 'bandpass',
      freq: 1800, q: 2, pan: 0, send: 0.05
    });
  }

  // ------------------------------------------------------------ weapon handling

  function reloadStart() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.95, 1.05);
    burst({
      when: t, dur: 0.16, level: 0.07, filter: 'bandpass',
      freq: 900 * p, q: 0.7, pan: rnd(-0.12, 0.12), attack: 0.02, send: 0.12
    });
    burst({
      when: t + 0.02, dur: 0.1, level: 0.05, filter: 'bandpass',
      freq: 2400 * p, q: 1.2, pan: 0.1, attack: 0.01
    });
  }

  function reloadMagOut() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.94, 1.06);
    metalTick(t, 2100 * p, 0.16, -0.12, 0.16);
    burst({
      when: t + 0.04, dur: 0.06, level: 0.11, filter: 'bandpass',
      freq: 1300 * p, q: 1.5, pan: -0.1, send: 0.1
    });
    tone({
      when: t + 0.035, freq: 260 * p, endFreq: 150 * p,
      dur: 0.08, level: 0.12, type: 'triangle', pan: -0.1
    });
  }

  function reloadMagIn() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.94, 1.06);
    tone({
      when: t, freq: 190 * p, endFreq: 90 * p,
      dur: 0.11, level: 0.2, type: 'sine', pan: -0.06, send: 0.1
    });
    metalTick(t + 0.005, 2600 * p, 0.18, -0.05, 0.18);
    burst({
      when: t + 0.012, dur: 0.055, level: 0.14, filter: 'bandpass',
      freq: 800 * p, q: 1.1, pan: -0.05, send: 0.08
    });
  }

  function reloadBolt() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.95, 1.05);
    metalTick(t, 3000 * p, 0.13, 0.12, 0.16);
    burst({
      when: t + 0.02, dur: 0.085, level: 0.07, filter: 'bandpass',
      freq: 1600 * p, endFreq: 420 * p, q: 1.4, pan: 0.08, send: 0.12
    });
    metalTick(t + 0.075, 2200 * p, 0.09, -0.05, 0.14);
  }

  function weaponSwitch() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.95, 1.05);
    burst({
      when: t, dur: 0.2, level: 0.06, filter: 'bandpass',
      freq: 1500 * p, q: 0.6, attack: 0.025, pan: rnd(-0.1, 0.1), send: 0.1
    });
    metalTick(t + 0.08, 2400 * p, 0.1, 0.05, 0.15);
    metalTick(t + 0.16, 1800 * p, 0.07, -0.08, 0.12);
  }

  // --------------------------------------------------------------- gameplay feedback

  function hitMarker(headshot = false) {
    if (!ensure()) return;
    const t = now();
    const f = headshot ? 2700 : 1900;
    burst({
      when: t, dur: 0.02, level: 0.11, filter: 'bandpass',
      freq: f * 2, q: 2.2, bus: uiBus, force: true
    });
    tone({
      when: t, freq: f, endFreq: f * 0.9, dur: 0.05,
      level: 0.09, type: 'triangle', bus: uiBus, force: true
    });
    if (headshot) {
      tone({
        when: t + 0.03, freq: f * 1.5, endFreq: f * 1.48,
        dur: 0.06, level: 0.055, type: 'sine', bus: uiBus, force: true
      });
    }
  }

  const IMPACTS = {
    concrete: { freq: 1500, q: 0.7, dur: 0.09, level: 0.32, body: 110, bodyEnd: 55, bodyLevel: 0.18 },
    metal: { freq: 2800, q: 5, dur: 0.2, level: 0.2, ring: [2200, 3100] },
    flesh: { freq: 650, q: 0.9, dur: 0.13, level: 0.3, body: 95, bodyEnd: 45, bodyLevel: 0.24 },
    wood: { freq: 900, q: 2, dur: 0.085, level: 0.3, ring: [1300, 1800] }
  };

  function impact(kind = 'concrete') {
    if (!ensure() || !canPlay()) return;
    const cfg = IMPACTS[kind] || IMPACTS.concrete;
    const t = now();
    const p = 1 + rnd(-0.1, 0.1);
    const pan = rnd(-0.38, 0.38);

    burst({
      when: t, dur: cfg.dur * rnd(0.85, 1.15), level: cfg.level * rnd(0.85, 1.1),
      filter: 'bandpass', freq: cfg.freq * p,
      q: cfg.q, pan, send: 0.18, rate: rnd(0.9, 1.1)
    });
    if (cfg.body) {
      tone({
        when: t, freq: cfg.body * p, endFreq: cfg.bodyEnd * p,
        dur: cfg.dur + 0.03, level: cfg.bodyLevel, type: 'sine', pan
      });
    }
    if (cfg.ring) {
      const f = cfg.ring[Math.floor(Math.random() * cfg.ring.length)];
      tone({
        when: t, freq: f * p, endFreq: f * p * 0.985,
        dur: rnd(0.16, 0.28), level: 0.075, type: 'sine', pan, send: 0.3
      });
    }
  }

  const SURFACES = {
    concrete: { freq: 1600, q: 0.8, body: 95 },
    metal: { freq: 2600, q: 2.5, body: 150, ring: 1900 },
    wood: { freq: 1000, q: 1.4, body: 115 },
    dirt: { freq: 700, q: 0.7, body: 80 },
    grass: { freq: 3000, q: 0.5, body: 70 }
  };

  function footstep(surface = 'concrete', sprint = false) {
    if (!ensure() || !canPlay()) return;
    const cfg = SURFACES[surface] || SURFACES.concrete;
    const t = now();
    const p = rnd(0.9, 1.1);
    const pan = rnd(-0.16, 0.16);
    const loud = sprint ? 1.45 : 1;

    tone({
      when: t, freq: cfg.body * p, endFreq: cfg.body * 0.52 * p,
      dur: 0.075, level: 0.2 * loud, type: 'sine', pan, send: 0.04
    });
    burst({
      when: t, dur: sprint ? 0.085 : 0.065, level: 0.13 * loud,
      filter: 'bandpass', freq: cfg.freq * p, q: cfg.q,
      pan, send: 0.07, rate: rnd(0.85, 1.15)
    });
    if (cfg.ring) {
      tone({
        when: t, freq: cfg.ring * p, endFreq: cfg.ring * 0.96 * p,
        dur: 0.06, level: 0.04, type: 'sine', pan
      });
    }
  }

  function jump() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    burst({
      when: t, dur: 0.2, level: 0.12, filter: 'bandpass',
      freq: 900, endFreq: 380, q: 0.7, attack: 0.03,
      pan: rnd(-0.1, 0.1), send: 0.08
    });
    tone({
      when: t, freq: 95, endFreq: 65, dur: 0.1,
      level: 0.12, type: 'sine', pan: 0
    });
  }

  function land() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const p = rnd(0.9, 1.1);
    tone({
      when: t, freq: 85 * p, endFreq: 42 * p,
      dur: 0.18, level: 0.34, type: 'sine', pan: rnd(-0.1, 0.1), send: 0.12
    });
    burst({
      when: t, dur: 0.16, level: 0.2, filter: 'lowpass',
      freq: 1000 * p, endFreq: 180, q: 0.8, send: 0.15
    });
    burst({
      when: t, dur: 0.06, level: 0.07, filter: 'bandpass',
      freq: 2800 * p, q: 0.8, pan: 0.1, send: 0.1
    });
  }

  // ---------------------------------------------------------------- player state

  function playerHurt() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    tone({
      when: t, freq: 125, endFreq: 42, dur: 0.24,
      level: 0.38, type: 'sine', send: 0.2
    });
    burst({
      when: t, dur: 0.2, level: 0.24, filter: 'lowpass',
      freq: 900, endFreq: 180, q: 0.8, attack: 0.003, send: 0.25
    });
    tone({
      when: t + 0.02, freq: 2900, endFreq: 2600, dur: 0.55,
      level: 0.022, type: 'sine', send: 0.4
    });
  }

  function playerDeath() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    tone({
      when: t, freq: 130, endFreq: 30, dur: 1.3,
      level: 0.44, type: 'sine', send: 0.5
    });
    tone({
      when: t, freq: 68, endFreq: 24, dur: 1.6,
      level: 0.28, type: 'triangle', lp: 240, q: 0.9, send: 0.6
    });
    burst({
      when: t, dur: 1.5, level: 0.24, filter: 'lowpass',
      freq: 900, endFreq: 70, q: 0.7, attack: 0.01, send: 0.7
    });
  }

  function waveStart() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    [55, 82.5, 110].forEach((f, i) => {
      tone({
        when: t, freq: f * rnd(0.995, 1.005), endFreq: f * 0.98,
        dur: 1.2, level: i === 0 ? 0.09 : 0.05, type: 'sawtooth',
        lp: 420 + i * 120, q: 0.8, attack: 0.09,
        pan: i === 1 ? -0.3 : i === 2 ? 0.3 : 0, send: 0.55
      });
    });
    tone({
      when: t, freq: 36, endFreq: 34, dur: 1.5,
      level: 0.15, type: 'sine', send: 0.3
    });
    burst({
      when: t, dur: 0.9, level: 0.05, filter: 'lowpass',
      freq: 300, q: 0.6, attack: 0.12, send: 0.6
    });
  }

  function objectiveComplete() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    [523.25, 783.99].forEach((f, i) => {
      const when = t + i * 0.11;
      tone({
        when, freq: f, endFreq: f * 0.998, dur: 0.7,
        level: 0.1, type: 'sine', attack: 0.01, send: 0.5
      });
      tone({
        when, freq: f * 2, endFreq: f * 1.995, dur: 0.4,
        level: 0.032, type: 'triangle', attack: 0.01, send: 0.4
      });
    });
  }

  function uiClick() {
    if (!ensure()) return;
    const t = now();
    burst({
      when: t, dur: 0.025, level: 0.07, filter: 'bandpass',
      freq: 1900, q: 0.9, bus: uiBus, force: true
    });
    tone({
      when: t, freq: 900, endFreq: 700, dur: 0.04,
      level: 0.045, type: 'sine', bus: uiBus, force: true
    });
  }

  function uiHover() {
    if (!ensure()) return;
    tone({
      when: now(), freq: rnd(1450, 1650), endFreq: 1350, dur: 0.022,
      level: 0.018, type: 'sine', bus: uiBus, force: true
    });
  }

  // ------------------------------------------------------------------- extra fx

  function shellDrop() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const pan = rnd(-0.55, 0.55);
    const n = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      metalTick(
        t + i * rnd(0.045, 0.11),
        rnd(2400, 3600),
        rnd(0.04, 0.075),
        clamp(pan + rnd(-0.2, 0.2), -1, 1),
        0.25
      );
    }
  }

  function whizz() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const side = Math.random() < 0.5 ? -1 : 1;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.playbackRate.value = rnd(0.9, 1.15);
    const f = makeFilter('bandpass', 3400, 1.4);
    f.frequency.setValueAtTime(3400, t);
    f.frequency.exponentialRampToValueAtTime(480, t + 0.22);
    const g = makeGain(0);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.27, t + 0.045);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    const p = panner(side);
    if (p.pan) {
      p.pan.setValueAtTime(side, t);
      p.pan.linearRampToValueAtTime(-side * 0.15, t + 0.22);
    }
    src.connect(f);
    f.connect(g);
    g.connect(p);
    p.connect(sfxBus);
    const send = sendTo(g, 0.2);
    const nodes = [src, f, g, p];
    if (send) nodes.push(send);
    src.start(t, Math.random() * Math.max(0, noiseBuf.duration - 0.3), 0.26);
    track(src, nodes);
  }

  function explosion() {
    if (!ensure() || !canPlay()) return;
    const t = now();
    const pan = rnd(-0.4, 0.4);
    tone({
      when: t, freq: 75, endFreq: 22, dur: 1.1,
      level: 0.5, type: 'sine', pan, send: 0.7
    });
    tone({
      when: t, freq: 45, endFreq: 25, dur: 1.2,
      level: 0.25, type: 'triangle', lp: 160, q: 0.8, pan, send: 0.5
    });
    burst({
      when: t, dur: 1.6, level: 0.45, filter: 'lowpass',
      freq: 1400, endFreq: 90, q: 0.7, pan, send: 0.8, attack: 0.004
    });
    burst({
      when: t, dur: 0.05, level: 0.32, hp: 700,
      filter: 'bandpass', freq: 2200, q: 0.7, pan, send: 0.6
    });
  }

  // ------------------------------------------------------------------ ambience

  function addLFO(amb, freq, depth, param, type = 'sine') {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = makeGain(depth);
    o.connect(g);
    g.connect(param);
    o.start(now());
    amb.sources.push(o);
    amb.nodes.push(g);
  }

  /** A quiet, heavily filtered event far outside the play space. */
  function ambientEvent(amb) {
    if (!ctx || ambience !== amb) return;
    const t = now() + rnd(0.1, 1.0);

    if (Math.random() < 0.6) {
      // Distant burst of small-arms fire.
      const shots = 1 + Math.floor(Math.random() * 3);
      const pan = rnd(-0.85, 0.85);
      for (let i = 0; i < shots; i++) {
        burst({
          when: t + i * rnd(0.25, 0.65),
          dur: rnd(0.15, 0.3), level: rnd(0.035, 0.07),
          filter: 'lowpass', freq: rnd(600, 1400),
          endFreq: rnd(140, 320), q: 0.7,
          pan: clamp(pan + rnd(-0.15, 0.15), -1, 1),
          attack: 0.004, bus: amb.gain, send: 0.9,
          brown: Math.random() < 0.4
        });
      }
    } else {
      // Distant artillery: sub thump plus rolling rumble.
      const pan = rnd(-0.9, 0.9);
      tone({
        when: t, freq: rnd(52, 72), endFreq: rnd(24, 32),
        dur: rnd(1.6, 2.4), level: rnd(0.1, 0.16), type: 'sine',
        pan, bus: amb.gain, send: 0.95, attack: 0.02
      });
      burst({
        when: t, dur: rnd(1.4, 2.2), level: rnd(0.07, 0.12),
        brown: true, filter: 'lowpass',
        freq: rnd(220, 420), endFreq: 50, q: 0.6,
        pan, bus: amb.gain, send: 0.9, attack: 0.03
      });
    }
  }

  function scheduleAmbientEvent(amb) {
    amb.timer = setTimeout(() => {
      if (ambience !== amb) return;
      ambientEvent(amb);
      scheduleAmbientEvent(amb);
    }, rnd(8000, 20000));
  }

  function startAmbience() {
    ambienceWanted = true;
    if (!ensure() || !ambBus || !noiseBuf || ambience) return;

    const t0 = now();
    const a = {
      sources: [], nodes: [], timer: null, gain: null,
      combatGain: null, combatFilter: null, pulseDepth: null
    };
    ambience = a;

    // Fade-in bed. Everything hangs off this gain so stop() is one ramp.
    const out = makeGain(0.0001);
    out.connect(ambBus);
    out.gain.setValueAtTime(0.0001, t0);
    out.gain.exponentialRampToValueAtTime(1, t0 + 3);
    a.gain = out;
    a.nodes.push(out);

    // Wind: looping noise, slowly breathing low-pass and level.
    const wind = ctx.createBufferSource();
    wind.buffer = noiseBuf;
    wind.loop = true;
    const windLP = makeFilter('lowpass', 420, 0.6);
    const windGain = makeGain(0.07);
    wind.connect(windLP);
    windLP.connect(windGain);
    windGain.connect(out);
    wind.start(t0);
    a.sources.push(wind);
    a.nodes.push(windLP, windGain);
    addLFO(a, 0.055, 130, windLP.frequency);
    addLFO(a, 0.09, 0.022, windGain.gain);

    // Low war rumble: brown noise under a very low low-pass.
    const rumble = ctx.createBufferSource();
    rumble.buffer = brownBuf;
    rumble.loop = true;
    const rumbleLP = makeFilter('lowpass', 85, 0.7);
    const rumbleGain = makeGain(0.13);
    rumble.connect(rumbleLP);
    rumbleLP.connect(rumbleGain);
    rumbleGain.connect(out);
    rumble.start(t0);
    a.sources.push(rumble);
    a.nodes.push(rumbleLP, rumbleGain);
    addLFO(a, 0.031, 0.04, rumbleGain.gain);

    // Sparse high drone, two close frequencies for slow beating.
    const droneGain = makeGain(0.35);
    droneGain.connect(out);
    a.nodes.push(droneGain);
    [523.25, 527.5, 1046.5].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = makeGain(i === 2 ? 0.008 : 0.018);
      o.connect(g);
      g.connect(droneGain);
      o.start(t0);
      a.sources.push(o);
      a.nodes.push(g);
    });

    // Combat tension: low saw/sine pair, amplitude-pulsed by a slow LFO.
    const combatGain = makeGain(0.0001 + combatTarget * 0.3);
    combatGain.connect(out);
    const pulseDepth = makeGain(combatTarget * 0.07);
    const pulse = ctx.createOscillator();
    pulse.type = 'sine';
    pulse.frequency.value = 1.1;
    pulse.connect(pulseDepth);
    pulseDepth.connect(combatGain.gain);
    pulse.start(t0);
    const tensionTone = makeGain(0.35);
    tensionTone.connect(combatGain);
    const combatFilter = makeFilter('lowpass', 180 + combatTarget * 480, 0.8);
    combatFilter.connect(tensionTone);
    const lowA = ctx.createOscillator();
    lowA.type = 'sine';
    lowA.frequency.value = 48.5;
    const lowB = ctx.createOscillator();
    lowB.type = 'sawtooth';
    lowB.frequency.value = 49.2;
    lowA.connect(combatFilter);
    lowB.connect(combatFilter);
    lowA.start(t0);
    lowB.start(t0);
    a.sources.push(pulse, lowA, lowB);
    a.nodes.push(combatGain, pulseDepth, tensionTone, combatFilter);
    a.combatGain = combatGain;
    a.combatFilter = combatFilter;
    a.pulseDepth = pulseDepth;

    scheduleAmbientEvent(a);
  }

  function stopAmbience() {
    ambienceWanted = false;
    const a = ambience;
    if (!a) return;
    ambience = null;
    if (a.timer) clearTimeout(a.timer);
    a.timer = null;

    if (ctx && a.gain) {
      try {
        const t = now();
        a.gain.gain.cancelScheduledValues(t);
        a.gain.gain.setTargetAtTime(0.0001, t, 0.28);
      } catch (e) { /* context already closed */ }
    }

    setTimeout(() => {
      for (let i = 0; i < a.sources.length; i++) {
        try { a.sources[i].stop(); } catch (e) { /* already stopped */ }
      }
      for (let i = 0; i < a.nodes.length; i++) {
        try { a.nodes[i].disconnect(); } catch (e) { /* already gone */ }
      }
    }, 1400);
  }

  function setCombatIntensity(t) {
    const k = clamp(Number(t) || 0, 0, 1);
    combatTarget = k;
    if (!ambience || !ctx) return;
    const a = ambience;
    const at = now();
    const smooth = (param, value) => {
      try {
        param.cancelScheduledValues(at);
        param.setTargetAtTime(value, at, 0.7);
      } catch (e) { /* param detached */ }
    };
    smooth(a.combatGain.gain, 0.0001 + k * 0.3);
    smooth(a.pulseDepth.gain, k * 0.07);
    smooth(a.combatFilter.frequency, 180 + k * 480);
  }

  // ------------------------------------------------------------ graph + startup

  /** Shared white / brown noise. Generated once, reused by every voice. */
  function makeNoise(seconds, brown) {
    const rate = ctx.sampleRate;
    const len = Math.max(256, Math.floor(rate * seconds));
    const buffer = ctx.createBuffer(1, len, rate);
    const data = buffer.getChannelData(0);

    if (!brown) {
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    }

    // Leaky-integrated brown noise, normalized, with a soft loop seam.
    let lp = 0;
    let peak = 0;
    for (let i = 0; i < len; i++) {
      lp = (lp + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = lp;
      const a = Math.abs(lp);
      if (a > peak) peak = a;
    }
    const scale = peak ? 0.85 / peak : 1;
    for (let i = 0; i < len; i++) data[i] *= scale;
    const fade = Math.min(Math.floor(rate * 0.3), Math.floor(len / 3));
    for (let i = 0; i < fade; i++) {
      const j = len - fade + i;
      const k = i / fade;
      data[j] = data[j] * (1 - k) + data[i] * k;
    }
    return buffer;
  }

  /** Short stereo impulse response for the shared convolver. */
  function makeIR(seconds) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const ir = ctx.createBuffer(2, len, rate);

    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      let lp = 0;
      let peak = 0;
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const decay = Math.pow(1 - t, 3.2);
        let v = (Math.random() * 2 - 1) * decay;
        // A few early reflections make the tail sound like a room, not a wash.
        if (i < rate * 0.07 && Math.random() < 0.003) {
          v += (Math.random() * 2 - 1) * 0.8;
        }
        lp += 0.24 * (v - lp);
        d[i] = lp;
        const a = Math.abs(lp);
        if (a > peak) peak = a;
      }
      const scale = peak ? 0.5 / peak : 1;
      for (let i = 0; i < len; i++) d[i] *= scale;
    }
    return ir;
  }

  function buildGraph() {
    // Master: fixed 0.8 headroom -> gentle bus compression -> brick-wall-ish limiter.
    master = makeGain(muted ? 0 : VOLUME);
    compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -14;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.24;
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -2.5;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.1;

    master.connect(compressor);
    compressor.connect(limiter);
    limiter.connect(ctx.destination);

    sfxBus = makeGain(0.9);
    ambBus = makeGain(0.6);
    uiBus = makeGain(0.8);
    sfxBus.connect(master);
    ambBus.connect(master);
    uiBus.connect(master);

    noiseBuf = makeNoise(2.2, false);
    brownBuf = makeNoise(4, true);

    const convolver = ctx.createConvolver();
    convolver.normalize = true;
    convolver.buffer = makeIR(1.35);
    const wet = makeGain(0.3);
    reverbSend = makeGain(1);
    reverbSend.connect(convolver);
    convolver.connect(wet);
    wet.connect(master);
  }

  function clearGraph() {
    voiceCount = 0;
    master = null;
    compressor = null;
    limiter = null;
    sfxBus = null;
    ambBus = null;
    uiBus = null;
    reverbSend = null;
    noiseBuf = null;
    brownBuf = null;
  }

  function init() {
    if (ctx && ctx.state !== 'closed' && master) {
      ensure();
      return true;
    }

    // A closed context cannot be reused; drop any ambience tied to it.
    if (ambience) {
      if (ambience.timer) clearTimeout(ambience.timer);
      ambience = null;
    }
    if (ctx) {
      try { ctx.close(); } catch (e) { /* already closed */ }
      ctx = null;
      clearGraph();
    }

    const AC = (typeof window !== 'undefined') &&
      (window.AudioContext || window.webkitAudioContext);
    if (!AC) return false;

    try {
      ctx = new AC({ latencyHint: 'interactive' });
    } catch (e) {
      try { ctx = new AC(); } catch (e2) { ctx = null; return false; }
    }

    try {
      buildGraph();
    } catch (e) {
      try { ctx.close(); } catch (e2) { /* ignore */ }
      ctx = null;
      clearGraph();
      return false;
    }

    ensure();
    // A startAmbience() call before the first gesture is honored once ready.
    if (ambienceWanted) startAmbience();
    return true;
  }

  function setMuted(value) {
    muted = !!value;
    if (!ctx || !master) return;
    try {
      const t = now();
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(muted ? 0 : VOLUME, t, 0.03);
    } catch (e) { /* context closed */ }
  }

  function isMuted() {
    return muted;
  }

  // ------------------------------------------------------------------- public

  return {
    init,
    setMuted,
    isMuted,

    shoot,
    dryFire,
    reloadStart,
    reloadMagOut,
    reloadMagIn,
    reloadBolt,
    weaponSwitch,

    hitMarker,
    impact,
    enemyShoot,
    footstep,
    jump,
    land,
    playerHurt,
    playerDeath,
    waveStart,
    objectiveComplete,
    uiClick,
    uiHover,

    startAmbience,
    stopAmbience,
    setCombatIntensity,

    shellDrop,
    whizz,
    explosion
  };
}
