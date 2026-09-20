/* Procedural realm music — no audio assets.
 *
 * A lookahead scheduler plays culture-flavoured tracks per zone. Unlike a
 * random walk, the melody is locked to the current chord of a repeating
 * progression, which is what makes it sound like a composed tune rather than
 * noodling. Boss waves swap to dedicated battle tracks: faster, minor, with
 * war-drums, driving eighth-note bass and brass-like power stabs.
 */

export type Scene = 'menu' | 'zone';

interface Track {
  root: number; // MIDI root
  scale: number[]; // semitone offsets from root
  /** chord progression as scale degrees (index into scale) */
  prog: number[];
  bpm: number;
  lead: OscillatorType;
  pad: OscillatorType;
  bass: OscillatorType;
  leadDecay: number;
  swing: number;
  /** 0 = none, 1 = light, 2 = driving, 3 = war drums */
  drums: number;
  padLevel: number;
  leadLevel: number;
  bassLevel: number;
  /** chance a 16th slot carries a lead note */
  density: number;
  /** adds a fifth/octave stab layer on downbeats */
  stabs: boolean;
  bright: number; // lowpass cutoff
}

/** Zone tracks — one per realm, in wave order. */
const ZONE_TRACKS: Track[] = [
  // 0 Jade Coast — yo scale, koto plucks, gentle and flowing
  {
    root: 62, scale: [0, 2, 4, 7, 9], prog: [0, 3, 4, 3],
    bpm: 96, lead: 'triangle', pad: 'sine', bass: 'sine',
    leadDecay: 0.6, swing: 0.14, drums: 1,
    padLevel: 0.075, leadLevel: 0.16, bassLevel: 0.11,
    density: 0.62, stabs: false, bright: 3600,
  },
  // 1 Ember Steppes — minor pentatonic, galloping steppe drums
  {
    root: 57, scale: [0, 3, 5, 7, 10], prog: [0, 0, 3, 4],
    bpm: 124, lead: 'sawtooth', pad: 'triangle', bass: 'square',
    leadDecay: 0.3, swing: 0, drums: 2,
    padLevel: 0.05, leadLevel: 0.12, bassLevel: 0.13,
    density: 0.7, stabs: true, bright: 4200,
  },
  // 2 Frostveil Fjord — dorian, slow, wide and airy
  {
    root: 55, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 5, 3, 4],
    bpm: 82, lead: 'sine', pad: 'triangle', bass: 'sine',
    leadDecay: 1.0, swing: 0, drums: 1,
    padLevel: 0.085, leadLevel: 0.14, bassLevel: 0.1,
    density: 0.5, stabs: false, bright: 2800,
  },
  // 3 Sunspire Jungles — major pentatonic, bright marimba pulse
  {
    root: 64, scale: [0, 2, 4, 7, 9], prog: [0, 4, 3, 4],
    bpm: 132, lead: 'triangle', pad: 'sine', bass: 'triangle',
    leadDecay: 0.22, swing: 0.16, drums: 2,
    padLevel: 0.055, leadLevel: 0.15, bassLevel: 0.12,
    density: 0.74, stabs: false, bright: 4800,
  },
  // 4 Dune Sea — phrygian dominant, oud-like and snaking
  {
    root: 59, scale: [0, 1, 4, 5, 7, 8, 10], prog: [0, 0, 4, 3],
    bpm: 104, lead: 'sawtooth', pad: 'triangle', bass: 'square',
    leadDecay: 0.42, swing: 0.1, drums: 2,
    padLevel: 0.06, leadLevel: 0.13, bassLevel: 0.12,
    density: 0.66, stabs: true, bright: 3800,
  },
];

/** Boss battle tracks — one per realm. Heavy, fast, unmistakably a fight. */
const BOSS_TRACKS: Track[] = [
  // Mizuchi — storm-serpent: churning harmonic minor
  {
    root: 50, scale: [0, 2, 3, 5, 7, 8, 11], prog: [0, 0, 5, 4],
    bpm: 152, lead: 'sawtooth', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.24, swing: 0, drums: 3,
    padLevel: 0.075, leadLevel: 0.15, bassLevel: 0.2,
    density: 0.82, stabs: true, bright: 5200,
  },
  // Khorzun — ashen khagan: war gallop
  {
    root: 45, scale: [0, 3, 5, 6, 7, 10], prog: [0, 0, 3, 5],
    bpm: 164, lead: 'square', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.2, swing: 0, drums: 3,
    padLevel: 0.07, leadLevel: 0.14, bassLevel: 0.21,
    density: 0.86, stabs: true, bright: 5400,
  },
  // Isbrekk — hollow king: glacial dread, slower but crushing
  {
    root: 48, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 0, 4],
    bpm: 138, lead: 'sawtooth', pad: 'sawtooth', bass: 'sawtooth',
    leadDecay: 0.34, swing: 0, drums: 3,
    padLevel: 0.085, leadLevel: 0.14, bassLevel: 0.2,
    density: 0.74, stabs: true, bright: 4600,
  },
  // Balam K'in — eclipse priest: ritual polyrhythm
  {
    root: 52, scale: [0, 1, 4, 5, 7, 8, 11], prog: [0, 4, 0, 5],
    bpm: 158, lead: 'square', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.22, swing: 0.06, drums: 3,
    padLevel: 0.07, leadLevel: 0.15, bassLevel: 0.2,
    density: 0.84, stabs: true, bright: 5600,
  },
  // Zar'qun — sultan of glass: shrieking phrygian dominant
  {
    root: 47, scale: [0, 1, 4, 5, 7, 8, 10], prog: [0, 0, 4, 5],
    bpm: 156, lead: 'sawtooth', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.26, swing: 0, drums: 3,
    padLevel: 0.075, leadLevel: 0.15, bassLevel: 0.21,
    density: 0.84, stabs: true, bright: 5600,
  },
];

/** Title screen — slow, mysterious, inviting. */
const MENU_TRACK: Track = {
  root: 53, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 3, 4],
  bpm: 76, lead: 'sine', pad: 'triangle', bass: 'sine',
  leadDecay: 1.2, swing: 0, drums: 0,
  padLevel: 0.09, leadLevel: 0.12, bassLevel: 0.09,
  density: 0.42, stabs: false, bright: 2400,
};

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export class Music {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer = 0;
  private nextTime = 0;
  private step = 0;
  private bar = 0;
  private melIdx = 0;
  private track: Track = MENU_TRACK;
  private boss = false;
  /** user volume 0..1 */
  private volume = 0.7;
  private enabled = true;
  private ducked = false;
  private started = false;

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      if (!this.started) this.startLoop();
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 3600;
      this.filter.connect(this.master).connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.startLoop();
    } catch {
      this.ctx = null;
    }
  }

  setEnabled(v: boolean) {
    this.enabled = v;
    this.applyGain();
  }
  isEnabled() {
    return this.enabled;
  }

  setVolume(v: number) {
    this.volume = clamp01(v);
    this.applyGain();
  }
  getVolume() {
    return this.volume;
  }

  /** Lower volume while paused / overlays are open. */
  duck(v: boolean) {
    this.ducked = v;
    this.applyGain();
  }

  setScene(scene: Scene, zoneIndex = 0, boss = false) {
    const idx = ((zoneIndex % 5) + 5) % 5;
    const next = scene === 'menu' ? MENU_TRACK : boss ? BOSS_TRACKS[idx] : ZONE_TRACKS[idx];
    if (next !== this.track) {
      this.track = next;
      this.step = 0;
      this.bar = 0;
      this.melIdx = 0;
      if (this.filter && this.ctx) {
        this.filter.frequency.setTargetAtTime(next.bright, this.ctx.currentTime, 0.5);
      }
    }
    void scene;
    this.boss = boss;
    this.applyGain();
  }

  private applyGain() {
    if (!this.ctx || !this.master) return;
    // Headroom-aware master: boss tracks sit slightly louder.
    const target = !this.enabled ? 0 : this.volume * (this.ducked ? 0.32 : 1) * (this.boss ? 1.18 : 1);
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.35);
  }

  private startLoop() {
    if (this.started || !this.ctx) return;
    this.started = true;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.timer = window.setInterval(() => this.schedule(), 80);
    this.applyGain();
  }

  destroy() {
    window.clearInterval(this.timer);
    this.ctx?.close().catch(() => {});
    this.ctx = null;
  }

  private schedule() {
    if (!this.ctx || !this.enabled) {
      if (this.ctx) this.nextTime = Math.max(this.nextTime, this.ctx.currentTime + 0.05);
      return;
    }
    const lookahead = 0.25;
    const sixteenth = 60 / this.track.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + lookahead) {
      const swing = this.step % 2 === 1 ? sixteenth * this.track.swing : 0;
      this.playStep(this.nextTime + swing, sixteenth);
      this.nextTime += sixteenth;
      this.step++;
      if (this.step % 16 === 0) this.bar++;
    }
  }

  /** current chord root (scale degree) for this bar */
  private chordDeg() {
    const t = this.track;
    return t.prog[this.bar % t.prog.length];
  }

  /** note for a chord tone offset (0=root,1=third,2=fifth) in the current chord */
  private chordTone(i: number, octave = 0) {
    const t = this.track;
    const deg = this.chordDeg() + i * 2; // stack thirds within the scale
    const oct = Math.floor(deg / t.scale.length) + octave;
    return t.root + 12 * oct + t.scale[((deg % t.scale.length) + t.scale.length) % t.scale.length];
  }

  private playStep(t: number, sixteenth: number) {
    const tr = this.track;
    const s = this.step % 16;
    const beat = sixteenth * 4;

    // ---- chord pad on each bar ----
    if (s === 0) {
      const dur = beat * 4 * 0.98;
      this.pad(t, this.chordTone(0, -1), dur, tr.padLevel);
      this.pad(t, this.chordTone(1, -1), dur, tr.padLevel * 0.75);
      this.pad(t, this.chordTone(2, -1), dur, tr.padLevel * 0.8);
      if (this.boss) this.pad(t, this.chordTone(0, -2), dur, tr.padLevel * 1.1, 'sawtooth');
    }

    // ---- bass ----
    if (this.boss) {
      // driving eighths — the engine of a battle theme
      if (s % 2 === 0) {
        const n = s % 8 === 0 ? this.chordTone(0, -2) : s % 4 === 0 ? this.chordTone(2, -3) : this.chordTone(0, -2);
        this.bassNote(t, n, sixteenth * 1.7, tr.bassLevel);
      }
    } else if (tr.drums >= 2) {
      if (s === 0 || s === 6 || s === 10) this.bassNote(t, this.chordTone(0, -2), beat * 0.7, tr.bassLevel);
    } else if (s === 0 || s === 8) {
      this.bassNote(t, this.chordTone(0, -2), beat * 1.4, tr.bassLevel);
    }

    // ---- lead melody, locked to chord tones with passing notes ----
    const onEighth = s % 2 === 0;
    if (onEighth && Math.random() < tr.density) {
      const shape = [0, 2, 1, 2, 0, 1, 2, 1]; // chord-tone contour
      const useChordTone = s % 4 === 0 || Math.random() < 0.65;
      let note: number;
      if (useChordTone) {
        note = this.chordTone(shape[this.melIdx % shape.length], Math.random() < 0.25 ? 1 : 0);
        this.melIdx++;
      } else {
        // passing tone from the scale, near the chord root
        const deg = this.chordDeg() + (Math.random() < 0.5 ? 1 : 3);
        const oct = Math.floor(deg / tr.scale.length);
        note = tr.root + 12 * oct + tr.scale[deg % tr.scale.length];
      }
      const accent = s === 0 ? 1.15 : s % 4 === 0 ? 1 : 0.7;
      this.pluck(t, note, tr.leadDecay, tr.leadLevel * accent, tr.lead);
      // boss leads are doubled an octave up for bite
      if (this.boss && s % 4 === 0) this.pluck(t, note + 12, tr.leadDecay * 0.7, tr.leadLevel * 0.45, 'square');
    }

    // ---- power stabs ----
    if (tr.stabs && (s === 0 || (this.boss && s === 8))) {
      this.stab(t, this.chordTone(0, -1), beat * 0.5, this.boss ? 0.1 : 0.06);
      this.stab(t, this.chordTone(2, -1), beat * 0.5, this.boss ? 0.085 : 0.05);
    }

    // ---- percussion ----
    const d = tr.drums;
    if (d >= 1) {
      if (d === 3) {
        // war drums: heavy 4-on-floor + tom fills
        if (s % 4 === 0) this.kick(t, 0.3);
        if (s === 4 || s === 12) this.snare(t, 0.15);
        if (s % 2 === 1 && Math.random() < 0.6) this.hat(t, 0.035);
        if (s === 14 && this.bar % 4 === 3) {
          this.tom(t, 180, 0.16);
          this.tom(t + sixteenth * 0.5, 140, 0.16);
        }
      } else if (d === 2) {
        if (s === 0 || s === 8) this.kick(t, 0.22);
        if (s === 4 || s === 12) this.snare(t, 0.1);
        if (s % 2 === 1 && Math.random() < 0.45) this.hat(t, 0.025);
      } else {
        if (s === 0) this.kick(t, 0.16);
        if (s === 8 && Math.random() < 0.6) this.hat(t, 0.03);
      }
    }
  }

  /* ----------------------------- instruments ----------------------------- */

  private pluck(t: number, note: number, decay: number, vol: number, type: OscillatorType) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    o.connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + decay + 0.05);
  }

  private bassNote(t: number, note: number, dur: number, vol: number) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(this.boss ? 900 : 600, t);
    o.type = this.track.bass;
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private stab(t: number, note: number, dur: number, vol: number) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + dur + 0.04);
  }

  private pad(t: number, note: number, dur: number, vol: number, type: OscillatorType = this.track.pad) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o2.type = type;
    o.frequency.setValueAtTime(midi(note), t);
    o2.frequency.setValueAtTime(midi(note) * 1.005, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.7, dur * 0.25));
    g.gain.setValueAtTime(vol, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    o2.connect(g);
    g.connect(this.filter);
    o.start(t);
    o2.start(t);
    o.stop(t + dur + 0.05);
    o2.stop(t + dur + 0.05);
  }

  private kick(t: number, vol: number) {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(this.boss ? 170 : 150, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(this.master); // bypass lowpass so it punches
    o.start(t);
    o.stop(t + 0.26);
  }

  private tom(t: number, freq: number, vol: number) {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.55, t + 0.2);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.26);
  }

  private snare(t: number, vol: number) {
    if (!this.ctx || !this.master || !this.noise) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = this.boss ? 2200 : 1800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    s.connect(f).connect(g).connect(this.master);
    s.start(t);
    s.stop(t + 0.18);
  }

  private hat(t: number, vol: number) {
    if (!this.ctx || !this.master || !this.noise) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    s.connect(f).connect(g).connect(this.master);
    s.start(t);
    s.stop(t + 0.06);
  }
}
