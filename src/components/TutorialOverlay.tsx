import { useEffect, useState, type ReactNode } from 'react';
import { ClassEmblem } from './ClassEmblem';
import { PowerIcon } from './PowerIcon';

interface Props {
  isTouch: boolean;
  onClose: () => void;
}

interface Controls {
  /** keyboard + mouse instruction */
  pc?: ReactNode;
  /** touch instruction */
  touch?: ReactNode;
}

interface Step {
  kicker: string;
  title: string;
  body: ReactNode;
  controls?: Controls;
  art: ReactNode;
}

const K = ({ k }: { k: string }) => <span className="kbd mx-0.5">{k}</span>;

const Sigil = ({ color, children, size = 72 }: { color: string; children: ReactNode; size?: number }) => (
  <span
    className="rounded-full flex items-center justify-center border-2 shrink-0"
    style={{ width: size, height: size, borderColor: color, color, boxShadow: `0 0 28px ${color}55`, background: `${color}12` }}
  >
    {children}
  </span>
);

const STEPS: Step[] = [
  {
    kicker: 'WELCOME',
    title: 'Realms of Aetheria',
    body: (
      <>
        Five cultures, one endless tide of monsters. You are a <b className="text-goldbright">legend</b> — survive escalating waves, grow
        stronger, and inscribe your name in the realm ledger. This guide takes about a minute, and you can replay it any time from the
        title screen.
      </>
    ),
    art: (
      <div className="grid grid-cols-3 gap-5 place-items-center">
        {['kensei', 'shieldthane', 'jaguar', 'sandseer', 'tidecaller', 'riftblade'].map((c, i) => (
          <span key={c} className="anim-floaty" style={{ color: ['#ff6b6b', '#6fb7ff', '#ff9d3c', '#e6c26a', '#55d9e8', '#b68cff'][i], animationDelay: `${i * 220}ms` }}>
            <ClassEmblem classId={c} size={40} />
          </span>
        ))}
      </div>
    ),
  },
  {
    kicker: 'LEGEND STATS',
    title: 'Read the four attributes',
    body: (
      <span className="block space-y-2">
        <span className="block">The bars compare each legend with the rest of the roster. A longer bar means a stronger starting attribute.</span>
        <span className="block text-[13px] leading-relaxed">
          <b className="text-[#ff9a9a]">VIT</b> — maximum health and survivability<br />
          <b className="text-goldbright">PWR</b> — weapon and ability damage<br />
          <b className="text-[#78e0d0]">SPD</b> — movement speed around the arena<br />
          <b className="text-[#d7adff]">CRIT</b> — chance for a hit to deal 2× damage
        </span>
        <span className="block text-faint text-[12px]">Level-up powers and market equipment can improve these during a run.</span>
      </span>
    ),
    art: (
      <div className="w-full max-w-[190px] flex flex-col gap-3">
        {[
          ['VIT', '88%', '#ff7d7d'],
          ['PWR', '72%', '#ffd97a'],
          ['SPD', '84%', '#78e0d0'],
          ['CRIT', '48%', '#d7adff'],
        ].map(([label, width, color]) => (
          <div key={label} className="grid grid-cols-[34px_1fr] items-center gap-2">
            <span className="font-display text-[9px] tracking-[0.2em] text-parch">{label}</span>
            <span className="bar-shell clip-notch-sm h-2">
              <span className="bar-fill block" style={{ width, background: `linear-gradient(90deg, ${color}, #efe3c2)` }} />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    kicker: 'MOVE',
    title: 'Stay moving',
    body: <>Standing still is how legends die. Keep circling — almost every enemy is slower than you.</>,
    controls: {
      pc: (
        <>
          <K k="W" /> <K k="A" /> <K k="S" /> <K k="D" /> or arrow keys
        </>
      ),
      touch: <>Drag anywhere on the <b className="text-goldbright">left half</b> — a joystick appears under your thumb</>,
    },
    art: (
      <div className="relative w-32 h-32 rounded-full border-2 border-gold/40 bg-white/5 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border border-gold/20" />
        <div className="w-12 h-12 rounded-full bg-gold/45 border-2 border-goldbright anim-floaty" />
      </div>
    ),
  },
  {
    kicker: 'ATTACK',
    title: 'Your blade aims itself',
    body: (
      <>
        Hold to swing continuously. Your weapon automatically turns toward the nearest foe, so you only ever think about{' '}
        <b className="text-goldbright">positioning</b>. Critical hits flash gold.
      </>
    ),
    controls: {
      pc: (
        <>
          Hold <K k="SPACE" /> or <K k="LEFT CLICK" />
        </>
      ),
      touch: <>Hold the big <b className="text-goldbright">gold circle</b> (bottom-right)</>,
    },
    art: (
      <Sigil color="#ffd97a" size={96}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M4 20 L15 9 M13 5 L19 11 M15 9 L19 5 M17.5 2.5 L21.5 6.5" strokeLinejoin="round" />
        </svg>
      </Sigil>
    ),
  },
  {
    kicker: 'DASH',
    title: 'Dash through danger',
    body: (
      <>
        You are <b className="text-goldbright">invulnerable</b> for the entire dash. Dash straight <i>through</i> a Warbrute&apos;s charge
        rather than away from it.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="SHIFT" />
        </>
      ),
      touch: <>The <b className="text-[#8ce0e8]">➤ sigil</b> above the attack button</>,
    },
    art: (
      <Sigil color="#8ce0e8" size={84}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M3 12 H14 M10 6 L17 12 L10 18" />
          <path d="M17 6 H21 M18 18 H21" opacity="0.6" />
        </svg>
      </Sigil>
    ),
  },
  {
    kicker: 'ABILITIES',
    title: 'Two abilities, one story',
    body: (
      <>
        Every legend has a <b className="text-goldbright">Signature</b> and a <b className="text-[#d7adff]">Legacy</b>. Both come straight
        from that legend&apos;s saga — the Kensei&apos;s <i>Still Water</i> slows the world because they trained to strike between
        raindrops. Read every saga in <b>Sagas</b> on the title screen.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="E" /> signature · <K k="Q" /> legacy
        </>
      ),
      touch: <>The <b className="text-[#ffd97a]">★</b> and <b className="text-[#d7adff]">◈</b> sigils</>,
    },
    art: (
      <div className="flex gap-7">
        <Sigil color="#ffd97a">
          <PowerIcon icon="spark" size={34} />
        </Sigil>
        <Sigil color="#d7adff">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M12 2 20 12 12 22 4 12Z" />
            <path d="M12 7 15.5 12 12 17 8.5 12Z" fill="currentColor" opacity="0.55" />
          </svg>
        </Sigil>
      </div>
    ),
  },
  {
    kicker: 'WAVES',
    title: 'Waves, threat and bosses',
    body: (
      <>
        Each wave is a new realm — Jade Coast, Ember Steppes, Frostveil, Sunspire, Dune Sea — and each is harder than the last. Every{' '}
        <b className="text-goldbright">5th wave</b> summons a world boss with its own battle music. Watch for the red ring: a charge is
        coming.
      </>
    ),
    art: (
      <div className="flex flex-col items-center gap-3">
        <div className="font-display text-goldbright text-emboss text-3xl tracking-widest">WAVE 5</div>
        <div className="bar-shell clip-notch-sm h-3 w-52">
          <div className="bar-fill w-3/4" style={{ background: 'linear-gradient(180deg,#ff7d7d,#a92626)' }} />
        </div>
        <div className="text-[10px] tracking-[0.35em] text-[#ff9a9a]">WORLD BOSS</div>
      </div>
    ),
  },
  {
    kicker: 'GROW',
    title: 'Level up, then shop',
    body: (
      <>
        Kills give XP. On every <b className="text-goldbright">level up</b> the fight pauses and you draft one of three permanent powers.
        Repeatedly drafting range, speed, or legendary archetype powers transforms your weapon into ranged slashes, chain arcs, or dragonfire.
        Between waves a <b className="text-goldbright">Traveling Market</b> opens with hold-lock layaway and restocks.
      </>
    ),
    controls: {
      pc: (
        <>
          Press <K k="1" /> <K k="2" /> <K k="3" /> to pick instantly
        </>
      ),
      touch: <>Tap a card to choose</>,
    },
    art: (
      <div className="flex gap-5">
        {['blade', 'heart', 'coin'].map((i, n) => (
          <Sigil key={i} color={['#ff907d', '#7fc4ff', '#ffd24a'][n]} size={64}>
            <PowerIcon icon={i} size={30} />
          </Sigil>
        ))}
      </div>
    ),
  },
  {
    kicker: 'LOOT',
    title: 'Coins, potions, runes',
    body: (
      <>
        Walk near loot and it flies to you. <span className="text-[#ffd24a] font-bold">Coins</span> fund the market,{' '}
        <span className="text-[#ff8a8a] font-bold">potions</span> heal, and a rare <span className="text-goldbright font-bold">Sun Rune</span>{' '}
        empowers your damage for eight seconds. Kill streaks build a <span className="text-emerald-300 font-bold">CHAIN</span> that
        multiplies your score.
      </>
    ),
    art: (
      <div className="flex gap-7 items-center">
        <span className="w-8 h-9 rounded-full bg-[#ffd24a] border-2 border-[#a87b1e] anim-floaty" />
        <span className="w-7 h-9 rounded-b-full bg-[#e05252] border-t-4 border-[#8a5a2a] anim-floaty" style={{ animationDelay: '200ms' }} />
        <span className="w-8 h-8 rotate-45 bg-goldbright border-2 border-[#54c9b4] anim-floaty" style={{ animationDelay: '400ms' }} />
      </div>
    ),
  },
  {
    kicker: 'LEGENDS',
    title: 'Unlock eight legends',
    body: (
      <>
        You begin as the <b className="text-goldbright">Kensei</b>. Reach waves 8, 15 and 25 to unlock the Shieldthane, Jaguar Knight and
        Sandseer. The <b className="text-[#55d9e8]">Tidecaller</b> (wave 40) and <b className="text-[#b68cff]">Riftblade</b> (wave 60) are
        for true legends — and beyond them wait the <b className="text-[#6ef3ff]">Stormwarden</b> (wave 80) and{' '}
        <b className="text-[#ff5a3c]">Drakewarden</b> (wave 100). Unlocks save to your account, even if you abandon a run.
      </>
    ),
    art: (
      <div className="flex gap-7">
        <span className="text-[#55d9e8] anim-floaty">
          <ClassEmblem classId="tidecaller" size={58} />
        </span>
        <span className="text-[#b68cff] anim-floaty" style={{ animationDelay: '300ms' }}>
          <ClassEmblem classId="riftblade" size={58} />
        </span>
      </div>
    ),
  },
  {
    kicker: 'REALM',
    title: 'Ledger, feed and pause',
    body: (
      <>
        Every fall is inscribed automatically to the <b className="text-goldbright">Realm Ledger</b> — ranked overall and per hero. The
        world feed shows what other adventurers achieve in real time. Check <b>Patch Notes</b> when the badge lights up.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="ESC" /> or the ⏸ button (top-right) to pause
        </>
      ),
      touch: <>Tap the <b className="text-goldbright">⏸ button</b> in the top-right corner</>,
    },
    art: (
      <div className="panel-gold clip-notch-sm w-16 h-16 flex items-center justify-center text-goldbright">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4.2" height="16" rx="1.2" />
          <rect x="13.8" y="4" width="4.2" height="16" rx="1.2" />
        </svg>
      </div>
    ),
  },
];

function ControlRow({ controls, isTouch }: { controls: Controls; isTouch: boolean }) {
  const rows: { tag: string; node: ReactNode; primary: boolean }[] = [];
  if (controls.pc) rows.push({ tag: 'KEYBOARD', node: controls.pc, primary: !isTouch });
  if (controls.touch) rows.push({ tag: 'TOUCH', node: controls.touch, primary: isTouch });
  rows.sort((a, b) => Number(b.primary) - Number(a.primary));

  return (
    <div className="mt-4 flex flex-col gap-1.5">
      {rows.map((r) => (
        <div
          key={r.tag}
          className={`flex items-center gap-2.5 px-2.5 py-1.5 clip-notch-sm border text-[12px] ${
            r.primary ? 'border-gold/45 bg-gold/10 text-parch' : 'border-iron bg-black/25 text-parch/65'
          }`}
        >
          <span
            className="font-display text-[8px] font-bold tracking-[0.2em] w-[62px] shrink-0 text-center py-[3px] clip-notch-sm"
            style={{
              color: r.primary ? '#ffd97a' : '#8a94a8',
              border: `1px solid ${r.primary ? '#e2b45c66' : '#2a3448'}`,
            }}
          >
            {r.tag}
          </span>
          <span className="min-w-0">{r.node}</span>
        </div>
      ))}
    </div>
  );
}

export function TutorialOverlay({ isTouch, onClose }: Props) {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        if (last) onClose();
        else setI((v) => v + 1);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setI((v) => Math.max(0, v - 1));
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [last, onClose]);

  return (
    <div className="absolute inset-0 z-[58] flex items-center justify-center bg-abyss/92 p-3 sm:p-6 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-3xl p-5 sm:p-8 anim-fade-up relative my-auto">
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close tutorial"
          title="Close tutorial (Esc)"
          className="absolute right-3 top-3 z-10 w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 mb-5 pr-12">
          {STEPS.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              className="h-1.5 flex-1 clip-notch-sm transition-all duration-300"
              style={{ background: n <= i ? '#e2b45c' : '#2a3448', boxShadow: n === i ? '0 0 10px rgba(226,180,92,0.7)' : undefined }}
              aria-label={`Step ${n + 1}`}
            />
          ))}
        </div>

        <div key={i} className="anim-fade-up">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            {/* roomy art stage */}
            <div className="shrink-0 w-full sm:w-52 h-44 flex items-center justify-center panel clip-notch bg-black/25 px-5 py-4">
              {step.art}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="font-display text-[10px] tracking-[0.45em] text-gold">
                {step.kicker} · {i + 1}/{STEPS.length}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-tight mt-1.5">{step.title}</h2>
              <p className="text-[15px] leading-relaxed text-parch/90 mt-3">{step.body}</p>
              {step.controls && <ControlRow controls={step.controls} isTouch={isTouch} />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-7">
          <button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} className="btn-dark clip-notch-sm px-4 py-2.5 text-xs font-bold disabled:opacity-30">
            ← BACK
          </button>
          <button onClick={onClose} className="btn-dark clip-notch-sm px-4 py-2.5 text-xs font-bold text-faint hover:text-blood">
            SKIP TUTORIAL
          </button>
          <button onClick={() => (last ? onClose() : setI((v) => v + 1))} className="btn-gold clip-notch px-6 py-3 text-sm font-black">
            {last ? '⚔ BEGIN THE HUNT' : 'NEXT →'}
          </button>
        </div>
      </div>
    </div>
  );
}
