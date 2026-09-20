export type LegacyKind = 'stillwater' | 'oathwall' | 'bloodrite' | 'mirage' | 'pearltide' | 'stasis' | 'stormcall' | 'pyreheart';

export interface LegacyDef {
  name: string;
  cd: number;
  desc: string;
  kind: LegacyKind;
  /** one-line explanation of how the story becomes the mechanic */
  origin: string;
}

export interface LegendLore {
  title: string;
  /** narrative paragraphs */
  saga: string[];
  /** why the signature ability exists in the story */
  signatureOrigin: string;
  legacy: LegacyDef;
}

export const LORE: Record<string, LegendLore> = {
  kensei: {
    title: 'The Blade That Cut the Rain',
    saga: [
      'On the Yamashiro Isles a sword is not a weapon but a vow. The Kensei were once temple sweepers who trained beneath the Weeping Falls, where the monks taught that a true cut passes between raindrops without wetting the steel.',
      'When the Tide Serpent Mizuchi drowned the eastern harbors, the sweepers walked into the storm with nothing but their vow. They returned with the storm cut into a thousand petals of light — and the sea has feared the isles since.',
      'A Kensei never rushes. They wait in stillness until the world slows, then move once, perfectly. Every blossom that falls in Aetheria is said to be a stroke they chose not to make.',
    ],
    signatureOrigin:
      'Thousand Petals is the storm-cut itself: the night the sweepers turned Mizuchi\u2019s rain into a spinning ring of blades.',
    legacy: {
      name: 'Still Water',
      cd: 16,
      kind: 'stillwater',
      desc: 'Enter the stillness for 3.5s: every foe slows to a crawl and your next 4 strikes are guaranteed critical hits.',
      origin: 'The Weeping Falls discipline — waiting until the world slows so one cut can be perfect.',
    },
  },
  shieldthane: {
    title: 'The Oath at Glacier\u2019s Edge',
    saga: [
      'In Skaldheim the winter does not end; it only pauses. The Shieldthanes are the pause. Sworn at the lip of the great glacier Isbrekk, each thane carves a rune of their oath into their shield and into their own arm.',
      'When the Hollow King rose from the ice and led the dead down the fjords, three hundred thanes locked shields across the narrows and did not step back for eleven days. Their runes froze the very ground the dead walked upon.',
      'A Shieldthane does not win by striking first. They win by still standing when everything else has fallen — and by making the earth itself refuse their enemy.',
    ],
    signatureOrigin:
      'Frostwake Nova is the glacier\u2019s answer to the oath: the ground shatters and freezes as it did beneath the dead at the narrows.',
    legacy: {
      name: 'Oathwall',
      cd: 18,
      kind: 'oathwall',
      desc: 'Plant your shield for 4.5s: take 70% less damage, mend 3 health every second, and every foe that strikes you is hurled back and wounded.',
      origin: 'Eleven days at the narrows — the wall that does not break, and punishes those who test it.',
    },
  },
  jaguar: {
    title: 'Blood for the Fifth Sun',
    saga: [
      'The Tlanex believe four suns have already died. The fifth burns only because it is fed. Atop the Sunspire pyramid the Jaguar Knights offer their own blood at every dawn so the light will rise once more.',
      'Balam K\u2019in, the Eclipse Priest, tried to starve the sun and rule the dark. The knights answered by opening their veins on the pyramid steps and hurling the sun\u2019s fury back at him in ten burning spears.',
      'To be a Jaguar Knight is to trade flesh for radiance. The more they bleed, the brighter they burn — and the sun always pays its debts.',
    ],
    signatureOrigin:
      'Wrath of the Fifth Sun is the pyramid rite made war: solar spears cast outward exactly as they were against the Eclipse Priest.',
    legacy: {
      name: 'Blood Rite',
      cd: 15,
      kind: 'bloodrite',
      desc: 'Offer 15% of your current health to the sun. For 6s deal 45% more damage, move 25% faster, and drink 4 health from every kill.',
      origin: 'The dawn offering — the sun repays blood with radiance, and radiance with life.',
    },
  },
  sandseer: {
    title: 'The Veil Over the Dune Sea',
    saga: [
      'In the Zahraan wastes the sand remembers every footstep ever taken across it. The Sandseers forged curved chakrams from lightning-fused silica — throwing blades weighted to return like whispered rumors on the wind.',
      'When Zar\u2019qun, the Sultan of Glass, sent his mirrored legions across the dunes, the seers cast their spinning glass chakrams from the ridge-lines. Every returning blade sliced through ranks twice before vanishing into false trails.',
      'A Sandseer is never where the enemy believes. The chakrams whistle, the storm sings its requiem, and by the time the sand settles, the fate written in it has already come true.',
    ],
    signatureOrigin:
      'Dune Requiem is the singing storm the seers summoned around their chakram vortex — sand that shreds and slows everything it swallows.',
    legacy: {
      name: 'Mirage Step',
      cd: 17,
      kind: 'mirage',
      desc: 'Leave a sand mirage of yourself for 4s. Every foe hunts the mirage instead of you — then it bursts, scouring all around it.',
      origin: 'The false footsteps the seers wrote for the Glass Legions to follow.',
    },
  },
  tidecaller: {
    title: 'The Pearl and the Deep',
    saga: [
      'The Nacrean Atolls have no ground to stand on, only tides to ride. A Tidecaller is bonded at birth to a living pearl set beneath the skin of the wrist, and through it they hear the moon pulling at the sea.',
      'When the drowned fleets rose to reclaim the atolls, the Tidecallers called the moon down. The undertow dragged the dead ships into a single churning ring and broke them upon the reef.',
      'The pearl takes as much as it gives: the same tide that crushes an enemy can, if the caller asks softly, wash their wounds back into the sea.',
    ],
    signatureOrigin:
      'Moonfall Undertow is the moon called down upon the drowned fleets — everything nearby dragged into one crushing ring.',
    legacy: {
      name: 'Pearl Tide',
      cd: 19,
      kind: 'pearltide',
      desc: 'Ask the pearl softly: a wave throws every nearby foe back and slows them, and the sea mends 24% of your health over 3s.',
      origin: 'The gentler tide — the pearl\u2019s gift of returning wounds to the sea.',
    },
  },
  riftblade: {
    title: 'The Edge Between Heartbeats',
    saga: [
      'Nobody is born in the Umbral Reach. People arrive there — exiles, deserters, the erased. They find a fallen star buried in the dark and learn that its shards can cut through the space between two moments.',
      'A Riftblade fights in the gap between heartbeats. To everyone else, they simply vanish and reappear behind the fallen; to the Riftblade, the world merely paused politely while they walked through it.',
      'The star is not free. Each stasis borrows a heartbeat from the future, and the debt returns as an echo — every wound dealt in the stillness strikes once more when time remembers itself.',
    ],
    signatureOrigin:
      'Eventide Rift is the walk between moments: step through the nearest foe and leave the collapsing gap behind you.',
    legacy: {
      name: 'Heartbeat Stasis',
      cd: 20,
      kind: 'stasis',
      desc: 'Stop the world for 2s. Foes and their bolts freeze while you move freely — and when time resumes, every wound you dealt strikes again.',
      origin: 'The borrowed heartbeat, and the echo that repays it.',
    },
  },
  stormwarden: {
    title: 'The Chain That Bound the Sky',
    saga: [
      'Above the Voltaic Peaks the First Storm has raged since before memory — a living tempest that crowned itself king of the sky. The wardens were the shepherds who climbed into it with copper chains and refused to come down.',
      'For nine nights they wrestled lightning with their bare hands until the storm, exhausted and impressed, bent its knee. It poured itself into their mauls and taught them the one law of thunder: judgment falls on the proud first.',
      'A Stormwarden does not chase enemies. They raise their maul, and the sky itself delivers the verdict — sevenfold, inescapable, and utterly without mercy.',
    ],
    signatureOrigin:
      'Tempest Judgment is the storm\u2019s own verdict: lightning that leaps from foe to foe exactly as it did the night the sky was chained.',
    legacy: {
      name: 'Stormcall',
      cd: 18,
      kind: 'stormcall',
      desc: 'Become the storm for 6s: lightning smites random nearby foes every 0.4s and you move 30% faster.',
      origin: 'The wardens\u2019 oldest rite — opening their veins to the tempest and letting it strike through them.',
    },
  },
  drakewarden: {
    title: 'Heir of the First Flame',
    saga: [
      'When the First Flame died atop the Ashen Roost, its last ember fell into an unhatched clutch. The wyrmlings that crawled from those eggs imprinted not on dragons, but on the wardens who kept the vigil — and shared their fire-blood.',
      'A Drakewarden carries a furnace where a heart should be. In the War of Cinders they walked alone into the Hollow vanguard wreathed in wyrmfire, and where they passed, nothing remained but glass footprints in cooling slag.',
      'The flame demands tribute: every breath of the cataclysm scorches the warden as well as the foe. But dragon-blooded flesh knits itself back together in the heat — stronger, harder, and hungrier than before.',
    ],
    signatureOrigin:
      'Wyrmfire Cataclysm is the vigil-fire unleashed: the same breath that turned the Hollow vanguard to glass.',
    legacy: {
      name: 'Pyreheart',
      cd: 22,
      kind: 'pyreheart',
      desc: 'Ignite your dragon heart for 6s: pulsing fire novas scorch all around you while you regenerate health in the flames.',
      origin: 'The furnace-heart — dragon fire that burns the enemy and mends the warden in the same breath.',
    },
  },
};

export function legacyFor(classId: string): LegacyDef {
  return LORE[classId]?.legacy ?? LORE.kensei.legacy;
}
