interface Props {
  label: string;
  icon: 'music' | 'sfx';
  value: number; // 0..1
  muted?: boolean;
  compact?: boolean;
  onChange: (v: number) => void;
  onToggle: () => void;
}

const STEP = 0.1;

export function VolumeControl({ label, icon, value, muted, compact, onChange, onToggle }: Props) {
  const pct = Math.round(value * 100);
  const off = muted || value <= 0;
  const bars = 5;
  const filled = off ? 0 : Math.ceil(value * bars);

  const btn =
    'panel clip-notch-sm flex items-center justify-center text-parch/80 hover:text-goldbright active:scale-90 transition-all disabled:opacity-30 disabled:hover:text-parch/80';
  const size = compact ? 26 : 30;

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onToggle}
        title={`${label}: ${off ? 'muted' : `${pct}%`}`}
        aria-label={`Toggle ${label}`}
        className={`${btn} shrink-0`}
        style={{ width: size, height: size }}
      >
        {icon === 'music' ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18V5l11-2v13" />
            <circle cx="6.5" cy="18" r="2.6" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="16" r="2.6" fill="currentColor" stroke="none" />
            {off && <path d="M3 3l18 18" stroke="#e05252" strokeWidth="2.2" />}
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
            {off ? <path d="M17 9l5 6M22 9l-5 6" stroke="#e05252" /> : <path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10" />}
          </svg>
        )}
      </button>

      <button
        onClick={() => onChange(Math.max(0, +(value - STEP).toFixed(2)))}
        disabled={value <= 0}
        aria-label={`Lower ${label}`}
        title={`Lower ${label}`}
        className={btn}
        style={{ width: size, height: size }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      </button>

      {/* level meter */}
      <div className="flex items-end gap-[2px] px-1" style={{ height: size }} title={`${label} ${pct}%`}>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-[1px] transition-all duration-150"
            style={{
              height: `${28 + i * 16}%`,
              background: i < filled ? '#e2b45c' : '#2a3448',
              boxShadow: i < filled ? '0 0 6px rgba(226,180,92,0.5)' : undefined,
            }}
          />
        ))}
      </div>

      <button
        onClick={() => onChange(Math.min(1, +(value + STEP).toFixed(2)))}
        disabled={value >= 1}
        aria-label={`Raise ${label}`}
        title={`Raise ${label}`}
        className={btn}
        style={{ width: size, height: size }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {!compact && <span className="font-display text-[9px] tracking-[0.2em] text-faint w-8 text-right tabular-nums">{off ? 'OFF' : `${pct}%`}</span>}
    </div>
  );
}
