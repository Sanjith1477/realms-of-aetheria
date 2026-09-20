export type AttackArchetype = 'melee_slash' | 'heavy_sweep' | 'solar_strike' | 'chakram_throw' | 'trident_pierce' | 'void_rift' | 'storm_maul' | 'drake_cleave';

export interface WeaponEvoTier {
  threshold: number; // stack count required
  title: string;
  desc: string;
}

export interface WeaponArchetypeDef {
  classId: string;
  weaponName: string;
  archetype: AttackArchetype;
  rangeTiers: WeaponEvoTier[];
  speedTiers: WeaponEvoTier[];
  evolutionPowers: {
    id: string;
    name: string;
    kicker: string;
    desc: string;
    rarity: 'rare' | 'epic' | 'legendary';
    milestone: string;
  }[];
}

export const WEAPON_ARCHETYPES: Record<string, WeaponArchetypeDef> = {
  kensei: {
    classId: 'kensei',
    weaponName: 'Moonlit Katana',
    archetype: 'melee_slash',
    rangeTiers: [
      { threshold: 1, title: 'Extended Edge', desc: 'Blade reach +22%; slash effect visibly extends.' },
      { threshold: 2, title: 'Crescent Arc', desc: 'Wider 140° swing; launches crescent wind on criticals.' },
      { threshold: 3, title: 'Flying Petal Blade', desc: 'Every swing releases a flying crescent blade slicing distant foes.' },
      { threshold: 4, title: 'Supernatural Blade Storm', desc: 'Each swing launches 3 piercing crescent blades in a fan.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Swift Draw', desc: '18% faster katana strikes with quick-sheath blur.' },
      { threshold: 2, title: 'Blossom Flurry', desc: 'Kills grant 3s of +30% attack speed flurry.' },
      { threshold: 3, title: 'Thousand Cuts Rhythm', desc: 'Attacks chain into continuous afterimage swings.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_kensei_crescent',
        name: 'Crescent Moon Arts',
        kicker: 'KATANA EVO',
        desc: 'All katana slashes unleash crescent projectiles that pierce 2 foes.',
        rarity: 'rare',
        milestone: 'Melee slashes gain ranged crescent blades',
      },
      {
        id: 'evo_kensei_petalstorm',
        name: 'Storm of Petals',
        kicker: 'BLADE FLURRY',
        desc: 'Critical strikes erupt in 6 razor petals that shred nearby enemies.',
        rarity: 'epic',
        milestone: 'Crits explode into flying petal shrapnel',
      },
      {
        id: 'evo_kensei_raincutter',
        name: 'Rain-Cutter Mastery',
        kicker: 'LEGENDARY EVO',
        desc: 'Katana attacks fire 3 crescent blades and Still Water spawns an echo-ring.',
        rarity: 'legendary',
        milestone: 'Triple crescent waves + Still Water echo',
      },
    ],
  },

  shieldthane: {
    classId: 'shieldthane',
    weaponName: 'Runed Beard Axe',
    archetype: 'heavy_sweep',
    rangeTiers: [
      { threshold: 1, title: 'Broad Cleave', desc: 'Axe sweep extends +24% with heavy frost trail.' },
      { threshold: 2, title: 'Glacial Shockwave', desc: 'Impact creates an expanding ground frost ring that slows foes.' },
      { threshold: 3, title: 'Chasm Cleaver', desc: 'Slashes send a freezing ground shockwave traveling 280px.' },
      { threshold: 4, title: 'Returning Glacier Wave', desc: 'Shockwave surges outward then returns, crushing foes twice.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Heft Momentum', desc: 'Heavy swing recovery reduced by 18%.' },
      { threshold: 2, title: 'Viking Frenzy', desc: 'Taking damage increases attack speed by 25% for 4s.' },
      { threshold: 3, title: 'Unbroken Rhythm', desc: 'Axe momentum cannot be interrupted, sweeping at maximum tempo.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_shield_frostwave',
        name: 'Frostwake Cleave',
        kicker: 'AXE EVO',
        desc: 'Every axe swing launches an icy ground shockwave that damages and chills.',
        rarity: 'rare',
        milestone: 'Heavy melee attacks create linear frost waves',
      },
      {
        id: 'evo_shield_runicthorns',
        name: 'Runic Reflection',
        kicker: 'DEFENSIVE EVO',
        desc: 'Blocking or getting hit sends 4 frost runes outward that shatter attackers.',
        rarity: 'epic',
        milestone: 'Oathwall and hits trigger frost rune bursts',
      },
      {
        id: 'evo_shield_glaciermaster',
        name: 'Glacier King Sovereign',
        kicker: 'LEGENDARY EVO',
        desc: 'Axe shocks erupt into huge glacier spikes; Oathwall reflects 200% force.',
        rarity: 'legendary',
        milestone: 'Giant glacial ruptures + crushing counter-force',
      },
    ],
  },

  jaguar: {
    classId: 'jaguar',
    weaponName: 'Obsidian Macuahuitl',
    archetype: 'solar_strike',
    rangeTiers: [
      { threshold: 1, title: 'Sun-Forged Teeth', desc: 'Obsidian blades ignite with solar embers (+22% reach).' },
      { threshold: 2, title: 'Solar Fang Flare', desc: 'Strikes emit burning solar sparks that seek nearby foes.' },
      { threshold: 3, title: 'Blazing Sun Spear', desc: 'Every strike fires a piercing solar bolt in your swing direction.' },
      { threshold: 4, title: 'Wrath of the 5th Sun', desc: 'Attacks unleash 3 piercing solar spears that set targets ablaze.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Prowler Rush', desc: 'Attacks are 20% faster; sprint leaves sun trails.' },
      { threshold: 2, title: 'Blood Hunger', desc: 'Each consecutive hit ramps attack speed by up to 35%.' },
      { threshold: 3, title: 'Solar Frenzy', desc: 'High-speed attack barrage while Blood Rite is active.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_jaguar_spears',
        name: 'Sun-Spire Spears',
        kicker: 'HYBRID EVO',
        desc: 'Strikes fire radiant solar bolts. Wrath of the Fifth Sun fires 4 extra spears.',
        rarity: 'rare',
        milestone: 'Melee strikes generate piercing sun projectiles',
      },
      {
        id: 'evo_jaguar_pyramidrite',
        name: 'Pyramid of Dawn',
        kicker: 'SOLAR RAGE',
        desc: 'Blood Rite releases 8 solar flares and grants +50% projectile count.',
        rarity: 'epic',
        milestone: 'Blood Rite triggers a solar nova and supercharges projectiles',
      },
      {
        id: 'evo_jaguar_fifthsunborn',
        name: 'Avatar of the Fifth Sun',
        kicker: 'LEGENDARY EVO',
        desc: 'Your weapon fires continuous solar barrages; critical kills trigger miniature suns.',
        rarity: 'legendary',
        milestone: 'Full hybrid solar warrior transformation',
      },
    ],
  },

  sandseer: {
    classId: 'sandseer',
    weaponName: 'Glass Sand-Chakram',
    archetype: 'chakram_throw',
    rangeTiers: [
      { threshold: 1, title: 'Silica Glide', desc: 'Chakram flies 25% farther and returns with increased width.' },
      { threshold: 2, title: 'Mirrored Boomerang', desc: 'Returning blade curves through enemies, dealing bonus damage on return.' },
      { threshold: 3, title: 'Twin Sand-Chakrams', desc: 'Throw 2 spinning glass chakrams simultaneously in a spread.' },
      { threshold: 4, title: 'Whirling Dune Scythe', desc: 'Throws 3 returning chakrams that carve a vortex through the sand.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Desert Wind Toss', desc: 'Throws are 22% faster with increased projectile speed.' },
      { threshold: 2, title: 'Sirocco Cycle', desc: 'Catching returning chakrams speeds up your next toss.' },
      { threshold: 3, title: 'Storm Cascade', desc: 'Rapid-fire glass chakrams that orbit before returning.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_sand_split',
        name: 'Mirage Chakram Split',
        kicker: 'CHAKRAM EVO',
        desc: 'Chakrams pierce all foes and release sand shards upon hitting walls or distance.',
        rarity: 'rare',
        milestone: 'Chakrams pierce and explode into shards',
      },
      {
        id: 'evo_sand_vortex',
        name: 'Vortex of Glass',
        kicker: 'MIRAGE SYNERGY',
        desc: 'Mirage Step summons a duplicate that also throws chakrams toward your target.',
        rarity: 'epic',
        milestone: 'Mirage clone actively throws returning blades',
      },
      {
        id: 'evo_sand_dunelord',
        name: 'Sultan of the Glass Storm',
        kicker: 'LEGENDARY EVO',
        desc: 'Throws 3 homing sand chakrams that leave burning glass trails and pierce all.',
        rarity: 'legendary',
        milestone: 'Triple piercing returning glass storm',
      },
    ],
  },

  tidecaller: {
    classId: 'tidecaller',
    weaponName: 'Coral Trident',
    archetype: 'trident_pierce',
    rangeTiers: [
      { threshold: 1, title: 'Deep Current Thrust', desc: 'Thrust launches a water trident spear that pierces the first foe.' },
      { threshold: 2, title: 'Tidal Undertow Wave', desc: 'Trident projectile pulls enemies inward toward its wake.' },
      { threshold: 3, title: 'Twin Pearl Harpoons', desc: 'Throws 2 piercing tidal tridents with lingering water surges.' },
      { threshold: 4, title: 'Tsunami Leviathan', desc: 'Throws 3 giant water spears that crash forward in a tidal wall.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Atoll Spring', desc: 'Throws fly 20% faster with quicker recovery.' },
      { threshold: 2, title: 'Tidal Surging', desc: 'Piercing an enemy grants +15% attack speed for 3s (stacks 3x).' },
      { threshold: 3, title: 'Moon-Pull Tempest', desc: 'Continuous rapid spears as if riding an unbroken crest.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_tide_boomerang',
        name: 'Undertow Recall',
        kicker: 'TRIDENT EVO',
        desc: 'Trident spears pierce all enemies, then return back to you, dragging foes.',
        rarity: 'rare',
        milestone: 'Piercing tidal spears return and pull enemies',
      },
      {
        id: 'evo_tide_pearlsurge',
        name: 'Pearl Tide Resonance',
        kicker: 'DEEP MAGIC',
        desc: 'Pearl Tide shoots 8 water tridents in all directions that mend you on hit.',
        rarity: 'epic',
        milestone: 'Pearl Tide triggers radial trident wave + life return',
      },
      {
        id: 'evo_tide_oceanmonarch',
        name: 'Ocean Sovereign',
        kicker: 'LEGENDARY EVO',
        desc: 'Your spears turn into crashing tidal waves that crush, slow and drown bosses.',
        rarity: 'legendary',
        milestone: 'Tridents become crashing tsunami walls',
      },
    ],
  },

  riftblade: {
    classId: 'riftblade',
    weaponName: 'Nullglass Glaive',
    archetype: 'void_rift',
    rangeTiers: [
      { threshold: 1, title: 'Warp Reach', desc: 'Glaive cuts across folded space (+25% reach, void blade trail).' },
      { threshold: 2, title: 'Dimensional Rupture', desc: 'Slashes leave a rift in the air that explodes after 0.3s.' },
      { threshold: 3, title: 'Blink Cut', desc: 'Attack teleports you 40px forward through targets, slashing all behind.' },
      { threshold: 4, title: 'Eventide Void Scythe', desc: 'Cuts tear 3 rifts across space that collapse into singularity blasts.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Heartbeat Pace', desc: 'Attacks are 24% faster — the gap between beats narrows.' },
      { threshold: 2, title: 'Phase Step', desc: 'Dashing resets weapon cooldown instantly.' },
      { threshold: 3, title: 'Singularity Flurry', desc: 'Attacks strike twice in rapid succession across parallel realities.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_rift_echoes',
        name: 'Echoes of the Void',
        kicker: 'RIFT EVO',
        desc: 'Every slash leaves a void tear that strikes again 0.35s later for 70% damage.',
        rarity: 'rare',
        milestone: 'Attacks leave delayed space-tearing echoes',
      },
      {
        id: 'evo_rift_stasisdoubler',
        name: 'Stasis Paradox',
        kicker: 'TIME REND',
        desc: 'Heartbeat Stasis duration +1s; all echo damage dealt during stasis deals 2.5x.',
        rarity: 'epic',
        milestone: 'Stasis duration increased + amplified echo damage',
      },
      {
        id: 'evo_rift_unwrittenvoid',
        name: 'The Unwritten Reality',
        kicker: 'LEGENDARY EVO',
        desc: 'Slashes slice across the entire screen; kills generate black holes that swallow foes.',
        rarity: 'legendary',
        milestone: 'Full dimensional mastery + void singularities',
      },
    ],
  },

  stormwarden: {
    classId: 'stormwarden',
    weaponName: 'Stormforged Maul',
    archetype: 'storm_maul',
    rangeTiers: [
      { threshold: 1, title: 'Ozone Arc', desc: 'Maul impact extends +20%; discharges sparks to the nearest foe.' },
      { threshold: 2, title: 'Thunderclap Ring', desc: 'Impact creates an expanding electric shockwave around the strike.' },
      { threshold: 3, title: 'Chain Lightning Hammer', desc: 'Every melee strike arcs chain lightning through 3 additional enemies.' },
      { threshold: 4, title: 'Wrath of the First Storm', desc: 'Hammer calls a lightning bolt from the sky onto every target hit.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Conductor Swing', desc: 'Lightened copper weight reduces attack recovery by 18%.' },
      { threshold: 2, title: 'Static Surge', desc: 'Moving builds charge that makes your next strike 40% faster.' },
      { threshold: 3, title: 'Tempest Overclock', desc: 'Continuous electrical discharge while attacking.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_storm_chainbolt',
        name: 'Chain Lightning Conduit',
        kicker: 'LIGHTNING EVO',
        desc: 'Every hammer blow arcs electric bolts to 4 secondary targets for 65% damage.',
        rarity: 'rare',
        milestone: 'Melee hammer triggers chain lightning arcs',
      },
      {
        id: 'evo_storm_skysmite',
        name: 'Sky-Smite Catalyst',
        kicker: 'THUNDER CALL',
        desc: 'Critical strikes and Tempest Judgment call lightning pillars from heaven.',
        rarity: 'epic',
        milestone: 'Crits summon vertical smiting lightning pillars',
      },
      {
        id: 'evo_storm_firststormlord',
        name: 'Lord of the First Tempest',
        kicker: 'LEGENDARY EVO',
        desc: 'Hammer attacks trigger continuous fork lightning across the screen.',
        rarity: 'legendary',
        milestone: 'Screen-wide chain lightning + thunder shockwaves',
      },
    ],
  },

  drakewarden: {
    classId: 'drakewarden',
    weaponName: 'Wyrmfang Greatblade',
    archetype: 'drake_cleave',
    rangeTiers: [
      { threshold: 1, title: 'Furnace Sweep', desc: 'Greatblade cleave +24%; leaves a burning fire trail on the ground.' },
      { threshold: 2, title: 'Fire Wave Eruption', desc: 'Attacks launch a forward wave of dragonfire traveling 300px.' },
      { threshold: 3, title: 'Piercing Wyrmfire', desc: 'Fire wave pierces through all enemies, leaving an inferno wake.' },
      { threshold: 4, title: 'Twin Inferno Cataclysm', desc: 'Attacks launch 2 massive dragonfire waves that incinerate everything.' },
    ],
    speedTiers: [
      { threshold: 1, title: 'Slag Balance', desc: 'Furnace counterweight reduces recovery by 18%.' },
      { threshold: 2, title: 'Thermal Accelerator', desc: 'Hitting burning enemies increases attack speed by 20%.' },
      { threshold: 3, title: 'Conflagration Tempo', desc: 'Unbroken sweeping swings of burning dragonsteel.' },
    ],
    evolutionPowers: [
      {
        id: 'evo_drake_firewave',
        name: 'Wyrmfire Wave Cleave',
        kicker: 'DRAGON EVO',
        desc: 'Every greatblade swing launches a piercing dragonfire wave forward.',
        rarity: 'rare',
        milestone: 'Melee swings launch piercing fire waves',
      },
      {
        id: 'evo_drake_pyreburst',
        name: 'Furnace Cataclysm Flare',
        kicker: 'INFERNO',
        desc: 'Critical strikes explode for 150% damage in a 100px fire nova.',
        rarity: 'epic',
        milestone: 'Crits trigger radial dragonfire explosions',
      },
      {
        id: 'evo_drake_firstflameavatar',
        name: 'Avatar of the First Flame',
        kicker: 'LEGENDARY EVO',
        desc: 'Slashes launch 3 piercing dragonfire waves; Pyreheart spawns dragon apparitions.',
        rarity: 'legendary',
        milestone: 'Triple fire wave cataclysm + phantom wyrms',
      },
    ],
  },
};
