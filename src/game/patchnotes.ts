export interface PatchNote {
  version: string;
  date: string; // ISO date
  title: string;
  highlights: string[];
  changes: { kind: 'new' | 'improved' | 'balance' | 'fixed'; text: string }[];
}

/**
 * Bundled patch notes. The newest entry is the live game version — adding a
 * new entry here bumps the version shown in the title bar and lights the
 * "NEW" badge for every player who has not read it yet.
 */
export const PATCH_NOTES: PatchNote[] = [
  {
    version: '3.5.0',
    date: '2025-07-08',
    title: 'Weapon Evolutions & Archetype Mastery',
    highlights: [
      'Eight unique weapon archetypes with progressive visible evolutions',
      'Range and speed upgrades evolve into projectiles, shockwaves and waves',
      'Diverse mechanical & legend-specific power pools with balanced rerolls',
    ],
    changes: [
      { kind: 'new', text: 'Weapon Evolution System: stacking reach or speed now transforms every weapon (crescent blades, frost shockwaves, returning chakrams, tidal waves, void tears, chain lightning, dragonfire).' },
      { kind: 'new', text: 'Ranged & Hybrid Heroes: Sandseer now throws returning Glass Sand-Chakrams; Tidecaller throws piercing and returning Coral Tridents.' },
      { kind: 'new', text: 'Mechanical Power Pools: Ricochet Edge, Impact Shockwave, Echoing Afterimage, Tesla Conductor, Terminal Detonation, and Kinetic Repulsion.' },
      { kind: 'new', text: 'Legend-Specific Evolution Powers for all 8 legends with clear milestone descriptions.' },
      { kind: 'improved', text: 'Level-up rerolls now guarantee balanced variety across archetype, offensive, defensive, and mobility choices.' },
      { kind: 'improved', text: 'Weapon Archetype preview banner on the hero selection screen and full evolution roadmaps in the Sagas codex.' },
    ],
  },
  {
    version: '3.4.0',
    date: '2025-06-28',
    title: 'Market Lock & Layaway',
    highlights: [
      'Lock items in the market to hold them across waves',
      'Held items stay protected across restocks and wave transitions',
      'Auto-unlocks upon purchase',
    ],
    changes: [
      { kind: 'new', text: 'Market Item Hold: tap 🔓 HOLD on any item card to lock it in place. Held items carry over to every future market and survive restocks until bought or unlocked.' },
      { kind: 'improved', text: 'Locked market cards glow with a bright gold border and 🔒 HELD tag.' },
      { kind: 'improved', text: 'Buying a held item automatically clears the lock.' },
    ],
  },
  {
    version: '3.3.0',
    date: '2025-06-20',
    title: 'Twin Fates & Fairer Foes',
    highlights: [
      'Separate reroll fates for powers and the market',
      'Boss attacks recolored so they never blend with the arena',
      'Redesigned power-draft and market screens',
    ],
    changes: [
      { kind: 'new', text: 'Power rerolls and market restocks are now separate pools — each starts at 3 and both reset to 3 after defeating a boss.' },
      { kind: 'new', text: 'Five new high-wave enemies: Ashen Mages, Pit Demons, Veil Wraiths, Siege Golems and Cinder Whelps.' },
      { kind: 'new', text: 'Two endgame legends: the Stormwarden (wave 80) and the Drakewarden (wave 100).' },
      { kind: 'improved', text: 'Level-up and market cards now carry rarity-colored sheens, gems, glowing pips and a light sweep on hover.' },
      { kind: 'fixed', text: 'Market restock no longer removes previously purchased items; bought goods keep their SOLD slot while the rest refresh.' },
      { kind: 'fixed', text: 'Boss projectiles recolored for all five realm bosses so beams can never be mistaken for pickups, warnings or boss bodies.' },
      { kind: 'balance', text: 'Enemy health, damage and speed climb harder in the late waves; rare spawns ramp up past wave 12.' },
    ],
  },
  {
    version: '3.2.0',
    date: '2025-06-06',
    title: 'The Aetheria Archive',
    highlights: [
      'Twenty-two rarity-based level-up powers',
      'Twelve-item market catalog with discovery tracking',
      'Score-ranked leaderboards now show completion time',
    ],
    changes: [
      { kind: 'new', text: 'Progression Index documents every attainable power and shop item, including recommendations and stacking behavior.' },
      { kind: 'new', text: 'Discovery tracking darkens powers and items until you use them in a run.' },
      { kind: 'new', text: 'Common, Rare, Epic and Legendary power rarities with higher-tier odds increasing each level.' },
      { kind: 'improved', text: 'Permanent FOES LEFT counter is now visible on every device.' },
      { kind: 'improved', text: 'Leaderboard columns clearly show player, wave, time and score; rank remains score-based.' },
      { kind: 'balance', text: 'Added hybrid, sustain, economy, cooldown and high-tier transformation powers.' },
    ],
  },
  {
    version: '3.1.0',
    date: '2025-05-23',
    title: 'Competitive Ascension',
    highlights: [
      'Live skill cooldown timers and clearer key prompts',
      'Legend unlock milestones raised for long-term competition',
      'Distinct weapon and ability sound identities',
    ],
    changes: [
      { kind: 'new', text: 'Skill slots now show the exact cooldown in seconds, decreasing in real time.' },
      { kind: 'improved', text: 'Q, E and SHIFT prompts are larger, high-contrast, and kept inside their skill frames.' },
      { kind: 'improved', text: 'Threat tier is now a permanent high-contrast badge with six tiers.' },
      { kind: 'improved', text: 'Every legend weapon has a distinct swing sound; Tidecaller and Riftblade have unique signature cues.' },
      { kind: 'balance', text: 'Unlock milestones are now waves 8, 15, 25, 40 and 60.' },
      { kind: 'new', text: 'Tutorial now explains VIT, PWR, SPD and CRIT.' },
    ],
  },
  {
    version: '3.0.0',
    date: '2025-05-09',
    title: 'The Legends Awaken',
    highlights: [
      'Every legend gains a third Legacy ability rooted in their saga',
      'Legend Sagas with full backstories',
      'Procedural realm music, live world feed, tutorial & patch notes',
    ],
    changes: [
      { kind: 'new', text: 'Legacy abilities (Q / third sigil): Still Water, Oathwall, Blood Rite, Mirage Step, Pearl Tide, Heartbeat Stasis.' },
      { kind: 'new', text: 'Legend Sagas — read each legend\u2019s saga and see how their abilities were born from it.' },
      { kind: 'new', text: 'Realm music that shifts with the zone you are fighting in and rises for world bosses.' },
      { kind: 'new', text: 'World feed now shows real achievements from real adventurers, live.' },
      { kind: 'new', text: 'Online adventurer count is now true realm presence.' },
      { kind: 'new', text: 'Interactive tutorial for new adventurers (replayable from the title screen).' },
      { kind: 'new', text: 'Patch notes screen with automatic "new update" badge.' },
      { kind: 'improved', text: 'Unified skill bar with cooldown sweeps on desktop; third combat sigil on touch.' },
      { kind: 'improved', text: 'Title screen redesigned around the chosen legend.' },
      { kind: 'improved', text: 'Score, coin and chain readouts made far more legible.' },
      { kind: 'balance', text: 'Pause is now a dedicated button on every device.' },
    ],
  },
  {
    version: '2.6.0',
    date: '2025-04-25',
    title: 'Realm Gate',
    highlights: ['Supabase accounts and shared leaderboards', 'Per-hero leaderboard split'],
    changes: [
      { kind: 'new', text: 'Username/password accounts with cloud-saved progress.' },
      { kind: 'new', text: 'Leaderboards split by hero.' },
      { kind: 'improved', text: 'Runs are inscribed automatically the moment you fall.' },
      { kind: 'fixed', text: 'Match and hero records failing to save silently.' },
    ],
  },
  {
    version: '2.5.0',
    date: '2025-04-11',
    title: 'Locked Legends',
    highlights: ['Tidecaller & Riftblade', 'Character unlock progression'],
    changes: [
      { kind: 'new', text: 'Two new legends joined the roster.' },
      { kind: 'new', text: 'Legends unlock by reaching milestone waves.' },
      { kind: 'balance', text: 'Waves escalate more aggressively; boss reinforcements scale with wave.' },
      { kind: 'improved', text: 'Scenery for all five cultural zones; richer monster and hero silhouettes.' },
    ],
  },
  {
    version: '2.4.1',
    date: '2025-03-28',
    title: 'Traveling Market',
    highlights: ['Between-wave shop', 'Level-up power draft'],
    changes: [
      { kind: 'new', text: 'Traveling Market between waves — spend coins on tonics, steel and charms.' },
      { kind: 'new', text: 'Choose one of three powers on every level up.' },
    ],
  },
];

export const CURRENT_VERSION = PATCH_NOTES[0].version;

const SEEN_KEY = 'aetheria-seen-version';

export function lastSeenVersion(profileId?: string): string | null {
  try {
    return localStorage.getItem(profileId ? `${SEEN_KEY}-${profileId}` : SEEN_KEY);
  } catch {
    return null;
  }
}

export function markVersionSeen(profileId?: string, version = CURRENT_VERSION) {
  try {
    localStorage.setItem(profileId ? `${SEEN_KEY}-${profileId}` : SEEN_KEY, version);
  } catch {
    /* ignore */
  }
}

export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}
