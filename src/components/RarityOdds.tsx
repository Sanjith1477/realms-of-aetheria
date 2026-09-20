import { RARITY_META, type Rarity } from '../game/data';

interface Props {
  odds: Record<Rarity, number>;
  /** label shown when odds are 0, e.g. { epic: 'W5', legendary: 'W10' } */
  lockedLabels?: Partial<Record<Rarity, string>>;
  /** explains when odds improve, e.g. unlock thresholds */
  hint: string;
}

const ORDER: Rarity[] = ['common', 'rare', 'epic', 'legendary'];

export function RarityOdds({ odds, lockedLabels, hint }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {ORDER.map((rarity) => {
          const pct = Math.round((odds[rarity] ?? 0) * 100);
          const locked = pct <= 0 && lockedLabels?.[rarity];
          return (
            <span
              key={rarity}
              title={locked ? `Unlocks at ${lockedLabels?.[rarity]}` : `${RARITY_META[rarity].label} drop chance`}
              className="clip-notch-sm border px-2 py-1 text-[9px] font-display font-bold tracking-[0.18em]"
              style={{
                color: locked ? '#5d6a80' : RARITY_META[rarity].color,
                borderColor: locked ? '#2a3448' : `${RARITY_META[rarity].color}55`,
                background: locked ? 'rgba(0,0,0,0.25)' : `${RARITY_META[rarity].color}10`,
              }}
            >
              {locked ? `🔒 ${RARITY_META[rarity].label} ${lockedLabels?.[rarity]}` : `${RARITY_META[rarity].label} ${pct}%`}
            </span>
          );
        })}
      </div>
      <p className="mt-1.5 text-[10px] text-faint text-center">{hint}</p>
    </div>
  );
}
