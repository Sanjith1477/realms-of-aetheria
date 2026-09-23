import type { ActiveSkillSummary, MarketplacePowerupSummary } from '../game/engine';
import { ZONES } from '../game/data';
import { useViewport } from '../hooks/useViewport';

interface Props {
  wave: number;
  score: number;
  skills: ActiveSkillSummary[];
  totalStats: { label: string; value: string }[];
  marketplacePowerups: MarketplacePowerupSummary[];
  onOpenSettings: () => void;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

export function PauseOverlay({ wave, score, skills, totalStats, marketplacePowerups, onOpenSettings, onResume, onRestart, onMenu }: Props) {
  const vp = useViewport();
  const realm = ZONES[Math.max(0, wave - 1) % ZONES.length].name;


  return (
    <div className="absolute inset-0 z-40 bg-abyss/75 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-5xl p-4 sm:p-6 anim-fade-up my-auto">
        <div className="text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-faint">THE REALMS WAIT</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-goldbright text-emboss mt-1">GAME PAUSED</h2>
          <div className="text-xs text-cyan-100/85 mt-1 font-bold tracking-wider">
            {realm} · Wave {wave} · {score.toLocaleString()} score
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[148px_minmax(0,1fr)]">
          <nav className="panel clip-notch p-2 flex flex-row lg:flex-col gap-2" aria-label="Pause menu">
            <button onClick={onResume} className="btn-gold clip-notch py-3 text-xs font-black flex-1 lg:flex-none">
              ▶ RESUME
            </button>
            <button onClick={onOpenSettings} className="btn-dark clip-notch py-2.5 text-xs font-bold flex-1 lg:flex-none items-center justify-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
              SETTINGS
            </button>
            <button onClick={onRestart} className="btn-dark clip-notch py-2.5 text-xs font-bold flex-1 lg:flex-none">
              ↻ RESTART
            </button>
            <button onClick={onMenu} className="btn-dark clip-notch py-2.5 text-xs font-bold text-blood/90 flex-1 lg:flex-none">
              ⌂ ABANDON
            </button>
          </nav>

          <div className="grid gap-4 md:grid-cols-2 min-w-0">
          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-4 border-cyan-200/25">
            <h3 className="font-display text-[12px] tracking-[0.28em] font-black text-goldbright mb-3">SKILLS</h3>
            <div className="space-y-2.5 text-[11px] text-cyan-50/90">
              {skills.length === 0 ? <div className="text-faint">No active skills.</div> : skills.map((skill) => (
                <div key={skill.id} className="border border-cyan-200/20 p-2.5 rounded-sm bg-[#081522]/90">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/70">{skill.rarity}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-goldbright/90">Stacks: {skill.count}{skill.maxStacks ? ` / ${skill.maxStacks}` : ''}</div>
                  <div className="mt-1 text-cyan-50/90 leading-relaxed">{skill.valueText}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-4 border-cyan-200/25">
            <h3 className="font-display text-[12px] tracking-[0.28em] font-black text-goldbright mb-3">TOTAL BUILD STATS</h3>
            <div className="space-y-2.5 text-[11px] text-cyan-50/90">
              {totalStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-2 border-b border-cyan-200/15 pb-1.5">
                  <span>{stat.label}</span>
                  <span className="font-bold text-white tabular-nums">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-4 border-cyan-200/25 md:col-span-2">
            <h3 className="font-display text-[12px] tracking-[0.28em] font-black text-goldbright mb-3">MARKETPLACE POWER-UPS</h3>
            <div className="grid gap-2 md:grid-cols-2 text-[11px] text-cyan-50/90">
              {marketplacePowerups.length === 0 ? <div className="text-faint">No active marketplace power-ups.</div> : marketplacePowerups.map((entry, i) => (
                <div key={`${entry.name}-${i}`} className="border border-cyan-200/20 p-2.5 rounded-sm bg-[#081522]/90">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">{entry.name}</span>
                    {entry.count > 1 && <span className="text-[10px] text-goldbright">x{entry.count}</span>}
                  </div>
                  <div className="mt-1 text-cyan-50/90 leading-relaxed">{entry.effect}</div>
                  {entry.remainingSeconds !== null ? (
                    <div className="mt-1 text-[10px] text-goldbright/90">Remaining: {entry.remainingSeconds.toFixed(1)}s</div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </div>
        </div>

        <div className="mt-5 border-t border-cyan-200/20 pt-3">
          {vp.coarse ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-parch/80">
              <div className="flex items-center gap-1.5">Left side — drag to move</div>
              <div className="flex items-center gap-1.5">Gold circle — attack</div>
              <div className="flex items-center gap-1.5">★ button — signature</div>
              <div className="flex items-center gap-1.5">◈ button — legacy ability</div>
              <div className="flex items-center gap-1.5">➤ button — dash (i-frames)</div>
              <div className="flex items-center gap-1.5 col-span-2">⏸ top-right — pause any time</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-parch/80">
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">WASD</span> move</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">SPACE</span>/<span className="kbd">CLICK</span> attack</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">SHIFT</span> dash · i-frames</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">E</span>/<span className="kbd">R-CLICK</span> signature</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">Q</span> legacy ability</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">ESC</span>/<span className="kbd">P</span> pause</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">M</span> mute</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
