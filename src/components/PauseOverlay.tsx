import { useState } from 'react';
import type { ScoreEntry } from '../game/highscores';
import type { ActiveSkillSummary, MarketplacePowerupSummary } from '../game/engine';
import { ZONES } from '../game/data';
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

function formatRemainingTime(seconds: number | null): string {
  if (seconds === null || seconds <= 0) return '0s';
  const total = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

function DesktopPauseLayout({ wave, score, scores, activeProfileId, skills, totalStats, marketplacePowerups, onOpenSettings, onResume, onRestart, onMenu }: Props) {
  const [buildTab, setBuildTab] = useState<'skills' | 'marketplace'>('skills');

  return (
    <div className="absolute inset-0 z-40 bg-abyss/75 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-2xl p-4 sm:p-6 anim-fade-up my-auto">
        <div className="text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-faint">THE REALMS WAIT</div>
          <h2 className="font-display font-black text-3xl text-goldbright text-emboss mt-1">PAUSED</h2>
          <div className="text-xs text-parch/70 mt-1 font-bold tracking-wider">Wave {wave} · {score.toLocaleString()} score</div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <button onClick={onResume} className="btn-gold clip-notch py-3 text-sm font-black">▶ RESUME THE HUNT</button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onRestart} className="btn-dark clip-notch py-2.5 text-xs font-bold">↻ RESTART RUN</button>
            <button onClick={onOpenSettings} className="btn-dark clip-notch py-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
              <span aria-hidden="true">⚙</span> SETTINGS
            </button>
          </div>
          <button onClick={onMenu} className="btn-dark clip-notch py-2.5 text-xs font-bold text-blood/90">⌂ ABANDON TO TITLE</button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <section className="panel bg-abyss/60 p-3">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">SKILLS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {skills.length === 0 ? <div className="text-faint">No active skills.</div> : skills.map((skill) => (
                <div key={skill.id} className="border border-iron/80 p-2 rounded-sm bg-abyss/40">
                  <div className="flex items-center justify-between gap-2"><span className="font-bold text-parch">{skill.name}</span><span className="text-[10px] uppercase tracking-[0.22em] text-faint">{skill.rarity}</span></div>
                  <div className="mt-1 text-[10px] text-faint">Stacks: {skill.count}{skill.maxStacks ? ` / ${skill.maxStacks}` : ''}</div>
                  <div className="mt-1 text-parch/90">{skill.valueText}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel bg-abyss/60 p-3">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">TOTAL BUILD STATS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {totalStats.map((stat) => <div key={stat.label} className="flex items-center justify-between gap-2 border-b border-iron/70 pb-1"><span>{stat.label}</span><span className="font-bold text-parch">{stat.value}</span></div>)}
            </div>
          </section>

          <section className="panel bg-abyss/60 p-3 md:col-span-2">
            <h3 className="font-display text-[11px] tracking-[0.28em] text-gold mb-2">MARKETPLACE POWER-UPS</h3>
            <div className="space-y-2 text-[11px] text-parch/80">
              {marketplacePowerups.length === 0 ? <div className="text-faint">No active marketplace power-ups.</div> : marketplacePowerups.map((entry, i) => (
                <div key={`${entry.name}-${i}`} className="border border-iron/80 p-2 rounded-sm bg-abyss/40">
                  <div className="flex items-center justify-between gap-2"><span className="font-bold text-parch">{entry.name}</span>{entry.count > 1 && <span className="text-[10px] text-faint">x{entry.count}</span>}</div>
                  <div className="mt-1 text-parch/90">{entry.effect}</div>
                  {entry.remainingSeconds !== null && <div className="mt-1 text-[10px] text-faint">Remaining: {entry.remainingSeconds.toFixed(1)}s</div>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 border-t border-iron pt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-parch/80">
          <div><span className="kbd">WASD</span> move</div><div><span className="kbd">SPACE</span>/<span className="kbd">CLICK</span> attack</div>
          <div><span className="kbd">SHIFT</span> dash · i-frames</div><div><span className="kbd">E</span>/<span className="kbd">R-CLICK</span> signature</div>
          <div><span className="kbd">Q</span> legacy ability</div><div><span className="kbd">ESC</span>/<span className="kbd">P</span> pause</div><div><span className="kbd">M</span> mute</div>
        </div>

        <div className="mt-5 border-t border-iron pt-4">
          <div className="flex items-center justify-between gap-3 mb-3"><h3 className="font-display text-[11px] tracking-[0.3em] text-gold">CURRENT BUILD</h3><div className="flex gap-2">
            <button type="button" onClick={() => setBuildTab('skills')} className={`px-2.5 py-1 text-[10px] font-display tracking-[0.2em] clip-notch-sm border ${buildTab === 'skills' ? 'bg-gold/15 text-goldbright border-gold/60' : 'bg-abyss/30 text-faint border-iron'}`}>SKILLS</button>
            <button type="button" onClick={() => setBuildTab('marketplace')} className={`px-2.5 py-1 text-[10px] font-display tracking-[0.2em] clip-notch-sm border ${buildTab === 'marketplace' ? 'bg-gold/15 text-goldbright border-gold/60' : 'bg-abyss/30 text-faint border-iron'}`}>MARKETPLACE</button>
          </div></div>
          <div className="max-h-[28rem] overflow-y-auto pr-1">
            {buildTab === 'skills' ? <div className="space-y-2.5 text-[11px] text-parch/80">{skills.length === 0 ? <div className="panel bg-abyss/50 border border-iron/80 p-3 text-faint">No skills acquired</div> : skills.map((skill) => <div key={skill.id} className="panel bg-abyss/50 border border-iron/80 p-2.5"><div className="flex items-start justify-between gap-2"><div><div className="font-bold text-parch text-sm leading-tight">{skill.name}</div><div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-faint">{skill.rarity}</div></div>{skill.maxStacks && <div className="text-[10px] text-goldbright font-bold whitespace-nowrap">Stacks: {skill.count}/{skill.maxStacks}</div>}</div><div className="mt-2 text-parch/90 leading-relaxed">{skill.valueText}</div></div>)}</div> : <div className="space-y-2.5 text-[11px] text-parch/80">{marketplacePowerups.length === 0 ? <div className="panel bg-abyss/50 border border-iron/80 p-3 text-faint">No active marketplace effects</div> : marketplacePowerups.map((entry, i) => <div key={`${entry.name}-${i}`} className="panel bg-abyss/50 border border-iron/80 p-2.5"><div className="flex items-start justify-between gap-2"><div><div className="font-bold text-parch text-sm leading-tight">{entry.name}</div>{entry.count > 1 && <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-faint">x{entry.count}</div>}</div>{entry.remainingSeconds !== null ? <div className="text-[10px] text-goldbright font-bold whitespace-nowrap">ACTIVE · {formatRemainingTime(entry.remainingSeconds)} remaining</div> : <div className="text-[10px] text-verdant font-bold whitespace-nowrap">PERMANENT</div>}</div><div className="mt-2 text-parch/90 leading-relaxed">{entry.effect}</div></div>)}</div>}
          </div>
        </div>

        <div className="mt-4"><h3 className="font-display text-[11px] tracking-[0.3em] text-gold mb-1.5">HALL OF LEGENDS</h3><Leaderboard scores={scores} activeProfileId={activeProfileId} compact /></div>
      </div>
    </div>
  );
}

export function PauseOverlay(props: Props) {
  const { wave, score, skills, totalStats, marketplacePowerups, onOpenSettings, onResume, onRestart, onMenu } = props;
  const vp = useViewport();
  const realm = ZONES[Math.max(0, wave - 1) % ZONES.length].name;

  if (!vp.coarse) {
    return <DesktopPauseLayout {...props} />;
  }

  return (
    <div className="absolute inset-0 z-40 bg-abyss/75 flex items-center justify-center p-2.5 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-3xl p-3 sm:p-4 anim-fade-up my-auto">
        <div className="text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-faint">THE REALMS WAIT</div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss mt-0.5">GAME PAUSED</h2>
          <div className="text-[11px] sm:text-xs text-cyan-100/85 mt-0.5 font-bold tracking-wider">
            {realm} · Wave {wave} · {score.toLocaleString()} score
          </div>
        </div>

        <nav className="pause-actions mt-3 grid grid-cols-2 gap-2 p-2" aria-label="Pause menu">
            <button onClick={onResume} className="pause-action pause-action-primary btn-gold clip-notch min-h-[78px] flex flex-col items-center justify-center gap-1 py-2 text-xs sm:text-sm font-black">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6c0 1 1.1 1.6 2 1l9.2-6.8c.8-.6.8-1.8 0-2.4L10 3.8c-.9-.6-2-.1-2 1.4Z" /></svg>
              RESUME
            </button>
            <button onClick={onOpenSettings} className="pause-action btn-dark clip-notch min-h-[78px] flex flex-col items-center justify-center gap-1 py-2 text-xs sm:text-sm font-bold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
              SETTINGS
            </button>
            <button onClick={onRestart} className="pause-action btn-dark clip-notch min-h-[78px] flex flex-col items-center justify-center gap-1 py-2 text-xs sm:text-sm font-bold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0 1 4" /><path d="M20 4v7h-7" /></svg>
              RESTART
            </button>
            <button onClick={onMenu} className="pause-action pause-action-danger btn-dark clip-notch min-h-[78px] flex flex-col items-center justify-center gap-1 py-2 text-xs sm:text-sm font-bold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h12v16H6z" /><path d="m10 9 4 3-4 3" /></svg>
              ABANDON
            </button>
        </nav>

        <div className="mt-3 grid gap-2.5 md:grid-cols-2 min-w-0">
          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-3 border-cyan-200/25">
            <h3 className="font-display text-[11px] tracking-[0.25em] font-black text-goldbright mb-2">SKILLS</h3>
            <div className="space-y-1.5 text-[11px] text-cyan-50/90">
              {skills.length === 0 ? <div className="text-faint">No active skills.</div> : skills.map((skill) => (
                <div key={skill.id} className="border border-cyan-200/20 p-2 rounded-sm bg-[#081522]/90">
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

          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-3 border-cyan-200/25">
            <h3 className="font-display text-[11px] tracking-[0.25em] font-black text-goldbright mb-2">TOTAL BUILD STATS</h3>
            <div className="space-y-1.5 text-[11px] text-cyan-50/90">
              {totalStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-2 border-b border-cyan-200/15 pb-1">
                  <span>{stat.label}</span>
                  <span className="font-bold text-white tabular-nums">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel clip-notch bg-[rgba(5,14,24,0.92)] p-3 border-cyan-200/25 md:col-span-2">
            <h3 className="font-display text-[11px] tracking-[0.25em] font-black text-goldbright mb-2">MARKETPLACE POWER-UPS</h3>
            <div className="grid gap-1.5 md:grid-cols-2 text-[11px] text-cyan-50/90">
              {marketplacePowerups.length === 0 ? <div className="text-faint">No active marketplace power-ups.</div> : marketplacePowerups.map((entry, i) => (
                <div key={`${entry.name}-${i}`} className="border border-cyan-200/20 p-2 rounded-sm bg-[#081522]/90">
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

        <div className="mt-3 border-t border-cyan-200/20 pt-2">
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
