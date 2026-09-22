# Skill Balance Audit

Audited from `src/game/data.ts` and `src/game/engine.ts`. Multiplicative values use the same repeated multiplication as `applyPower`; realistic maximum means the configured cap, not unlimited theoretical stacking. Archetype/evolution skills are one-time because their engine effects are boolean.

| Skill | Current Rarity | Stackable? | Max Realistic Power | Suitable Rarity | Action |
| --- | --- | ---: | --- | --- | --- |
| Keen Edge | Common | Yes, 3 | +82% weapon damage | Common | KEEP |
| Ironhide | Common | Yes, 4 | +100 max HP | Common | KEEP |
| Windstep | Common | Yes, 3 | +48% movement speed | Common | KEEP |
| Hunter's Eye | Rare | Yes, 4 | +48% crit chance | Rare | KEEP |
| Long Reach | Common | Yes, 4 | +88 reach | Common | KEEP |
| Soul Siphon | Rare | Yes, 3 | +6 HP per kill | Rare | KEEP |
| Quicksilver | Rare | Yes, 3 | +65% attack speed | Rare | KEEP |
| Sunward Focus | Rare | Yes, 3 | -45% signature/legacy cooldown | Rare | KEEP |
| Gilded Hand | Common | Yes, 3 | +100% coin value, +78 pickup range | Common | KEEP |
| Wardplate | Rare | Yes, 4 | 48% damage reduction | Rare | KEEP |
| Battle Tempo | Rare | Yes, 3 | +33% damage, +37% attack speed | Rare | KEEP |
| Titan Blood | Rare | Yes, 2 | +39% max HP | Rare | KEEP |
| Veteran's Reach | Rare | Yes, 3 | +78 reach, +40.5% weapon damage | Rare | NERF |
| Blood Harvest | Epic | Yes, 3 | +12 HP per kill, +33% damage | Epic | KEEP |
| Astral Echo | Epic | Yes, 2 | -48% ability cooldown, refresh on acquire | Epic | KEEP |
| Predator Instinct | Epic | Yes, 2 | +20% crit, +27% speed, +21% damage | Epic | CHANGE STACKING |
| Colossus Soul | Epic | Yes, 2 | +90 HP, 20% damage reduction | Epic | KEEP |
| Death Dealer | Epic | No | +32% damage, +8% crit | Epic | CHANGE STACKING |
| Chronomancer | Legendary | No | -38% ability cooldown, -22% dash cooldown | Legendary | CHANGE STACKING |
| Royal Treasury | Legendary | No | 2x coin value, +70 pickup range, +16% damage | Legendary | CHANGE STACKING |
| Aetherborn Form | Legendary | No | +42% damage, +16% speed, +12% crit, +25 HP | Legendary | CHANGE STACKING |
| Undying Legend | Legendary | No | +35 HP, +6 HP per kill, 15% damage reduction | Legendary | CHANGE STACKING |
| Piercing Edge | Rare | No | +2 pierce and +15% travel range | Rare | CHANGE STACKING |
| Impact Shockwave | Rare | No | One 90px, 60% weapon-damage shockwave per hit | Rare | CHANGE STACKING |
| Ricochet Edge | Epic | No | One 75% damage bounce per projectile | Epic | CHANGE STACKING |
| Echoing Afterimage | Epic | No | One delayed echo at 50% damage per attack | Epic | CHANGE STACKING |
| Kinetic Repulsion | Common | Yes, 3 | +58% damage plus knockback | Common | KEEP |
| Tesla Conductor | Epic | No | Chain arc to 3 targets at 45% damage | Epic | CHANGE STACKING |
| Terminal Detonation | Epic | No | 110px death blast at 70% weapon damage | Epic | CHANGE STACKING |
| Frenzy Momentum | Rare | Yes, 3 | +36% attack speed from permanent acquisitions | Rare | KEEP |
| Crescent Moon Arts | Rare | No | Kensei crescent projectiles, 2 pierce | Rare | CHANGE STACKING |
| Storm of Petals | Epic | No | 6 petal shards on Kensei crits | Epic | CHANGE STACKING |
| Rain-Cutter Mastery | Legendary | No | 3 crescent blades plus Still Water echo-ring | Legendary | CHANGE STACKING |
| Frostwake Cleave | Rare | No | Shieldthane freezing ground wave | Rare | CHANGE STACKING |
| Runic Reflection | Epic | No | 4 frost runes on block/hit | Epic | CHANGE STACKING |
| Glacier King Sovereign | Legendary | No | Glacier spikes plus 200% Oathwall reflection | Legendary | CHANGE STACKING |
| Sun-Spire Spears | Rare | No | Solar bolt on strikes, 4 extra from signature | Rare | CHANGE STACKING |
| Pyramid of Dawn | Epic | No | 8 solar flares and +50% projectile count | Epic | CHANGE STACKING |
| Avatar of the Fifth Sun | Legendary | No | Continuous solar barrage and crit-kill suns | Legendary | CHANGE STACKING |
| Mirage Chakram Split | Rare | No | All-foe pierce and sand shards | Rare | CHANGE STACKING |
| Vortex of Glass | Epic | No | Mirage clone also throws chakrams | Epic | CHANGE STACKING |
| Sultan of the Glass Storm | Legendary | No | 3 homing, piercing chakrams with burning trails | Legendary | CHANGE STACKING |
| Undertow Recall | Rare | No | All-foe pierce, return, and pull | Rare | CHANGE STACKING |
| Pearl Tide Resonance | Epic | No | 8 radial tridents with healing | Epic | CHANGE STACKING |
| Ocean Sovereign | Legendary | No | Tidal-wave spears with slow and boss pressure | Legendary | CHANGE STACKING |
| Echoes of the Void | Rare | No | Delayed 70% echo per Riftblade slash | Rare | CHANGE STACKING |
| Stasis Paradox | Epic | No | +1s stasis and 2.5x echo damage during stasis | Epic | CHANGE STACKING |
| The Unwritten Reality | Legendary | No | Screen-wide slashes and kill black holes | Legendary | CHANGE STACKING |
| Chain Lightning Conduit | Rare | No | 4 secondary lightning targets at 65% damage | Rare | CHANGE STACKING |
| Sky-Smite Catalyst | Epic | No | Lightning pillars on crits and Tempest Judgment | Epic | CHANGE STACKING |
| Lord of the First Tempest | Legendary | No | Continuous fork lightning from hammer attacks | Legendary | CHANGE STACKING |
| Wyrmfire Wave Cleave | Rare | No | Piercing dragonfire wave per greatblade swing | Rare | CHANGE STACKING |
| Furnace Cataclysm Flare | Epic | No | 150% fire nova on crits | Epic | CHANGE STACKING |
| Avatar of the First Flame | Legendary | No | 3 piercing fire waves plus dragon apparitions | Legendary | CHANGE STACKING |

## Veteran's Reach

The old implementation applied +30 reach and +15% damage per stack despite the tooltip claiming +12 reach and +8% damage. It now applies the audited +26 reach and +12% damage. At one, two, and three stacks its multiplicative damage is +12%, +25.4%, and +40.5%, while reach is +26, +52, and +78. The three-stack ceiling remains below three Keen Edge stacks for damage and below four Long Reach stacks for reach, so Rare remains appropriate.

## Progression and selection

- Level-up rarity gates are Common at level 1, Rare at level 5, Epic at level 10, and Legendary at level 18.
- Rarity weights are normalized after locked tiers and depleted/owned power pools are removed.
- A power is eligible only while its existing `ownedPowerIds` count is below `getPowerStackCap`.
- All boolean mechanical and legend evolution powers have a cap of one; no second inventory or stat system was added.
- Rerolls call the same filtered `rollPowers` path, and `choosePower` rejects stale or already-maxed choices.
- No new skills were added and no active skills were removed.
