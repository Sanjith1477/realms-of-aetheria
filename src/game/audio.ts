/* Procedural WebAudio SFX — no assets, all synthesized. */

type SfxName =
  | 'click'
  | 'swing'
  | 'hit'
  | 'crit'
  | 'kill'
  | 'coin'
  | 'potion'
  | 'rune'
  | 'hurt'
  | 'dash'
  | 'petals'
  | 'nova'
  | 'bolts'
  | 'storm'
  | 'shoot'
  | 'levelup'
  | 'wave'
  | 'boss'
  | 'streak'
  | 'death'
  | 'stillwater'
  | 'oathwall'
  | 'bloodrite'
  | 'mirage'
  | 'pearltide'
  | 'stasis'
  | 'stasisEnd'
  | 'tide'
  | 'rift'
  | 'tempest'
  | 'pyre'
  | 'stormcall'
  | 'pyreheart'
  | 'reroll'
  | 'dragonroar';

export class SFX {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  muted = false;
  /** user volume 0..1 */
  private volume = 0.7;

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    } catch {
      this.ctx = null;
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    this.apply();
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    this.apply();
  }
  getVolume() {
    return this.volume;
  }

  private apply() {
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    vol: number,
    slideTo?: number,
    delay = 0
  ) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(this.master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  private noise(dur: number, vol: number, filterFreq: number, type: BiquadFilterType = 'bandpass', delay = 0) {
    if (!this.ctx || !this.master || !this.noiseBuf) return;
    const t0 = this.ctx.currentTime + delay;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = filterFreq;
    f.Q.value = 0.9;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f).connect(g).connect(this.master);
    s.start(t0);
    s.stop(t0 + dur + 0.02);
  }

  /** Every legend's weapon has a different material, weight and swing voice. */
  playWeapon(classId: string) {
    if (!this.ctx || this.muted) return;
    switch (classId) {
      case 'kensei':
        // fast steel hiss + bright katana ring
        this.noise(0.085, 0.11, 3600, 'highpass');
        this.tone(980, 0.12, 'sine', 0.07, 680);
        break;
      case 'shieldthane':
        // heavy axe displacement and low iron weight
        this.noise(0.15, 0.15, 720, 'lowpass');
        this.tone(145, 0.16, 'square', 0.1, 82);
        break;
      case 'jaguar':
        // wooden macuahuitl with obsidian teeth
        this.noise(0.11, 0.13, 1450);
        this.tone(360, 0.1, 'triangle', 0.08, 230);
        break;
      case 'sandseer':
        // glass khopesh shimmer through sand
        this.noise(0.12, 0.09, 2200, 'bandpass');
        this.tone(760, 0.16, 'sine', 0.075, 510);
        break;
      case 'tidecaller':
        // coral trident through water
        this.noise(0.16, 0.1, 520, 'lowpass');
        this.tone(420, 0.2, 'sine', 0.08, 690);
        break;
      case 'riftblade':
        // nullglass cuts the space between moments
        this.noise(0.07, 0.12, 5600, 'highpass');
        this.tone(1280, 0.12, 'square', 0.065, 190);
        break;
      case 'stormwarden':
        // crackling maul head dragging ozone
        this.noise(0.12, 0.13, 2800, 'highpass');
        this.tone(220, 0.14, 'sawtooth', 0.09, 660);
        break;
      case 'drakewarden':
        // massive fang blade with a furnace hum
        this.noise(0.16, 0.14, 500, 'lowpass');
        this.tone(98, 0.2, 'sawtooth', 0.11, 196);
        break;
      default:
        this.play('swing');
    }
  }

  play(name: SfxName) {
    if (!this.ctx || this.muted) return;
    switch (name) {
      case 'click':
        this.tone(640, 0.06, 'sine', 0.15, 520);
        break;
      case 'swing':
        this.noise(0.09, 0.1, 1800);
        this.tone(320, 0.07, 'triangle', 0.06, 160);
        break;
      case 'hit':
        this.noise(0.07, 0.18, 900);
        this.tone(190, 0.08, 'square', 0.12, 120);
        break;
      case 'crit':
        this.noise(0.1, 0.22, 2400);
        this.tone(520, 0.12, 'triangle', 0.16, 880);
        break;
      case 'kill':
        this.noise(0.16, 0.2, 500, 'lowpass');
        this.tone(300, 0.18, 'sawtooth', 0.1, 60);
        break;
      case 'coin':
        this.tone(880, 0.07, 'sine', 0.14);
        this.tone(1320, 0.12, 'sine', 0.12, undefined, 0.06);
        break;
      case 'potion':
        this.tone(392, 0.1, 'sine', 0.14);
        this.tone(523, 0.14, 'sine', 0.12, undefined, 0.08);
        break;
      case 'rune':
        this.tone(660, 0.1, 'triangle', 0.13);
        this.tone(990, 0.16, 'triangle', 0.11, undefined, 0.07);
        break;
      case 'hurt':
        this.tone(175, 0.22, 'sawtooth', 0.24, 62);
        this.tone(92, 0.26, 'square', 0.1, 50, 0.025);
        this.noise(0.15, 0.2, 340, 'lowpass');
        break;
      case 'dash':
        this.noise(0.14, 0.12, 3200, 'highpass');
        break;
      case 'petals':
        this.noise(0.3, 0.16, 2600);
        this.tone(740, 0.22, 'triangle', 0.12, 1180);
        break;
      case 'nova':
        this.tone(220, 0.4, 'sine', 0.22, 50);
        this.noise(0.35, 0.2, 4200, 'highpass');
        break;
      case 'bolts':
        this.tone(520, 0.16, 'square', 0.1, 940);
        this.noise(0.12, 0.1, 3000);
        break;
      case 'storm':
        this.noise(0.6, 0.14, 700);
        this.tone(140, 0.5, 'sawtooth', 0.08, 90);
        break;
      case 'shoot':
        this.tone(480, 0.12, 'square', 0.07, 240);
        break;
      case 'levelup':
        this.tone(523, 0.12, 'triangle', 0.16);
        this.tone(659, 0.12, 'triangle', 0.16, undefined, 0.09);
        this.tone(784, 0.12, 'triangle', 0.16, undefined, 0.18);
        this.tone(1047, 0.26, 'triangle', 0.16, undefined, 0.27);
        break;
      case 'wave':
        this.tone(392, 0.14, 'triangle', 0.14);
        this.tone(587, 0.2, 'triangle', 0.13, undefined, 0.11);
        break;
      case 'boss':
        this.tone(70, 0.7, 'sawtooth', 0.24, 38);
        this.noise(0.6, 0.18, 240, 'lowpass');
        this.tone(140, 0.5, 'square', 0.1, 60, 0.15);
        break;
      case 'streak':
        this.tone(659, 0.1, 'square', 0.1);
        this.tone(880, 0.16, 'square', 0.1, undefined, 0.08);
        break;
      case 'death':
        this.tone(300, 0.5, 'sawtooth', 0.16, 60);
        this.tone(150, 0.8, 'triangle', 0.14, 40, 0.15);
        this.noise(0.7, 0.16, 400, 'lowpass');
        break;
      case 'stillwater':
        this.tone(1046, 0.5, 'sine', 0.12, 523);
        this.noise(0.5, 0.06, 6000, 'highpass');
        this.tone(261, 0.9, 'sine', 0.08);
        break;
      case 'oathwall':
        this.noise(0.18, 0.2, 500, 'lowpass');
        this.tone(110, 0.45, 'square', 0.14, 70);
        this.tone(220, 0.3, 'triangle', 0.1, undefined, 0.1);
        break;
      case 'bloodrite':
        this.tone(196, 0.35, 'sawtooth', 0.14, 392);
        this.tone(587, 0.4, 'triangle', 0.12, 784, 0.12);
        this.noise(0.3, 0.1, 1800);
        break;
      case 'mirage':
        this.noise(0.45, 0.12, 900);
        this.tone(440, 0.3, 'triangle', 0.1, 330);
        this.tone(660, 0.25, 'sine', 0.08, undefined, 0.15);
        break;
      case 'pearltide':
        this.tone(330, 0.6, 'sine', 0.12, 660);
        this.tone(495, 0.7, 'sine', 0.1, 990, 0.1);
        this.noise(0.6, 0.1, 700, 'lowpass');
        break;
      case 'stasis':
        this.tone(880, 0.6, 'sine', 0.14, 110);
        this.noise(0.25, 0.12, 5000, 'highpass');
        break;
      case 'stasisEnd':
        this.tone(110, 0.3, 'sawtooth', 0.16, 660);
        this.noise(0.2, 0.18, 2400);
        break;
      case 'tide':
        this.noise(0.7, 0.16, 620, 'lowpass');
        this.tone(196, 0.65, 'sine', 0.14, 784);
        this.tone(392, 0.45, 'triangle', 0.1, 988, 0.14);
        break;
      case 'rift':
        this.noise(0.18, 0.2, 6400, 'highpass');
        this.tone(1500, 0.28, 'square', 0.11, 75);
        this.tone(110, 0.5, 'sawtooth', 0.12, 660, 0.08);
        break;
      case 'tempest':
        this.noise(0.22, 0.22, 5200, 'highpass');
        this.tone(1800, 0.18, 'square', 0.12, 240);
        this.tone(120, 0.4, 'sawtooth', 0.14, 55);
        break;
      case 'pyre':
        this.noise(0.55, 0.18, 900, 'lowpass');
        this.tone(90, 0.6, 'sawtooth', 0.16, 220);
        this.tone(660, 0.3, 'triangle', 0.1, 220, 0.1);
        break;
      case 'stormcall':
        this.noise(0.3, 0.16, 4200, 'highpass');
        this.tone(440, 0.5, 'sawtooth', 0.12, 1760);
        break;
      case 'pyreheart':
        this.noise(0.5, 0.15, 700, 'lowpass');
        this.tone(140, 0.55, 'sawtooth', 0.14, 420);
        this.tone(523, 0.4, 'triangle', 0.1, undefined, 0.12);
        break;
      case 'reroll':
        this.tone(520, 0.09, 'triangle', 0.12);
        this.tone(660, 0.09, 'triangle', 0.12, undefined, 0.07);
        this.tone(880, 0.14, 'triangle', 0.13, undefined, 0.14);
        break;
      case 'dragonroar':
        this.tone(75, 0.7, 'sawtooth', 0.22, 45);
        this.noise(0.6, 0.16, 350, 'lowpass');
        break;
    }
  }
}
