import type { ScoreEntry } from '../game/highscores';
import type { ActiveSkillSummary, MarketplacePowerupSummary } from '../game/engine';
import { Leaderboard } from './Leaderboard';
import { useViewport } from '../hooks/useViewport';

interface Props {
  wave: number;
  score: number;
  scores: ScoreEntry[];
  activeProfileId?: string;
  skills: ActiveSkillSummary[];
  totalStats: { label: string; value: string }[];
  marketplacePowerups: MarketplacePowerupSummary[];
  onOpenSettings: () => void;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

export function PauseOverlay({ wave, score, scores, activeProfileId, skills, totalStats, marketplacePowerups, onOpenSettings, onResume, onRestart, onMenu }: Props) {
  const vp = useViewport();
  return (
    <div className="absolute inset-0 z-40 bg-abyss/75 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-2xl p-4 sm:p-6 anim-fade-up my-auto">
        <div className="text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-faint">THE REALMS WAIT</div>
          <h2 className="font-display font-black text-3xl text-goldbright text-emboss mt-1">PAUSED</h2>
          <div className="text-xs text-parch/70 mt-1 font-bold tracking-wider">
            Wave {wave} · {score.toLocaleString()} score
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <button onClick={onResume} className="btn-gold clip-notch py-3 text-sm font-black">
            ▶ RESUME THE HUNT
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onRestart} className="btn-dark clip-notch py-2.5 text-xs font-bold">
              ↻ RESTART RUN
            </button>
            <button onClick={onOpenSettings} className="btn-dark clip-notch py-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
              SETTINGS
            </button>
          </div>
          <button onClick={onMenu} className="btn-dark clip-notch py-2.5 text-xs font-bold text-blood/90">
            ⌂ ABANDON TO TITLE
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <section className="panel bg-abyss/60 p-3">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">SKILLS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {skills.length === 0 ? <div className="text-faint">No active skills.</div> : skills.map((skill) => (
                <div key={skill.id} className="border border-iron/80 p-2 rounded-sm bg-abyss/40">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-parch">{skill.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-faint">{skill.rarity}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-faint">Stacks: {skill.count}{skill.maxStacks ? ` / ${skill.maxStacks}` : ''}</div>
                  <div className="mt-1 text-parch/90">{skill.valueText}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel bg-abyss/60 p-3">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">TOTAL BUILD STATS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {totalStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-2 border-b border-iron/70 pb-1">
                  <span>{stat.label}</span>
                  <span className="font-bold text-parch">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel bg-abyss/60 p-3 md:col-span-2">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">MARKETPLACE POWER-UPS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {marketplacePowerups.length === 0 ? <div className="text-faint">No active marketplace power-ups.</div> : marketplacePowerups.map((entry, i) => (
                <div key={`${entry.name}-${i}`} className="border border-iron/80 p-2 rounded-sm bg-abyss/40">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-parch">{entry.name}</span>
                    {entry.count > 1 && <span className="text-[10px] text-faint">x{entry.count}</span>}
                  </div>
                  <div className="mt-1 text-parch/90">{entry.effect}</div>
                  {entry.remainingSeconds !== null ? (
                    <div className="mt-1 text-[10px] text-faint">Remaining: {entry.remainingSeconds.toFixed(1)}s</div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 border-t border-iron pt-3">
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

        <div className="mt-4">
          <h3 className="font-display text-[11px] tracking-[0.3em] text-gold mb-1.5">HALL OF LEGENDS</h3>
          <Leaderboard scores={scores} activeProfileId={activeProfileId} compact />
        </div>
      </div>
    </div>
  );
}
