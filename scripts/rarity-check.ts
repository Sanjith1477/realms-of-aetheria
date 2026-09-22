/* One-off verification harness for the rarity unlock fix. Bundled with esbuild, run in node. */
import { Game } from '../src/game/engine';
import { CLASSES, POWERS, SHOP_ITEMS, isRarityUnlocked, type Rarity, type ShopItemId } from '../src/game/data';

const g = Object.create(Game.prototype) as Game;
let failures = 0;
function check(name: string, ok: boolean, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures++;
}

// ---- rarityOdds: single source of truth ----
for (const level of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  const odds = (g as any).rarityOdds(level) as Record<Rarity, number>;
  const sum = odds.common + odds.rare + odds.epic + odds.legendary;
  check(`Lv${level} odds sum to 1`, Math.abs(sum - 1) < 1e-9, `sum=${sum.toFixed(6)}`);
  check(`Lv${level} legendary odds = 0`, odds.legendary === 0, `legendary=${odds.legendary}`);
}
for (const level of [10, 12, 30]) {
  const odds = (g as any).rarityOdds(level) as Record<Rarity, number>;
  check(`Lv${level} legendary odds > 0`, odds.legendary > 0, `legendary=${(odds.legendary * 100).toFixed(2)}%`);
}
const lv4 = (g as any).rarityOdds(4) as Record<Rarity, number>;
console.log(`Lv4 displayed odds: COMMON ${Math.round(lv4.common * 100)}% RARE ${Math.round(lv4.rare * 100)}% EPIC ${Math.round(lv4.epic * 100)}% LEGENDARY ${Math.round(lv4.legendary * 100)}%`);

// ---- rollPowers across every class, levels 1-4 (+ reroll simulation) ----
const N = 1000;
for (const classDef of CLASSES) {
  (g as any).classDef = classDef;
  for (const level of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    let legendaryCount = 0;
    let total = 0;
    for (let i = 0; i < N; i++) {
      // initial roll + two "rerolls" per iteration (reroll calls the same rollPowers)
      for (let r = 0; r < 3; r++) {
        const choices = (g as any).rollPowers(level) as { rarity: Rarity; id: string }[];
        if (choices.length !== 3) { check(`${classDef.id} Lv${level} produces 3 choices`, false, `got ${choices.length}`); break; }
        total += 3;
        for (const c of choices) if (c.rarity === 'legendary') { legendaryCount++; console.log(`  LEAK: ${c.id} at Lv${level} as ${classDef.id}`); }
      }
    }
    check(`${classDef.id} Lv${level}: 0 legendary in ${total} generated powers (${N} level-ups + rerolls)`, legendaryCount === 0, `legendary=${legendaryCount}`);
  }
}

// ---- rollPowers at level 10+: legendary becomes reachable ----
for (const classDef of CLASSES) {
  (g as any).classDef = classDef;
  let legendaryCount = 0;
  for (let i = 0; i < 2000; i++) {
    const choices = (g as any).rollPowers(10) as { rarity: Rarity }[];
    for (const c of choices) if (c.rarity === 'legendary') legendaryCount++;
  }
  check(`${classDef.id} Lv10: legendary can appear`, legendaryCount > 0, `legendary=${legendaryCount}/6000`);
}

// ---- isRarityUnlocked contract ----
check('isRarityUnlocked rare Lv2 = false', isRarityUnlocked('rare', 2) === false);
check('isRarityUnlocked rare Lv3 = true', isRarityUnlocked('rare', 3) === true);
check('isRarityUnlocked epic Lv5 = false', isRarityUnlocked('epic', 5) === false);
check('isRarityUnlocked epic Lv6 = true', isRarityUnlocked('epic', 6) === true);
check('isRarityUnlocked legendary Lv9 = false', isRarityUnlocked('legendary', 9) === false);
check('isRarityUnlocked legendary Lv10 = true', isRarityUnlocked('legendary', 10) === true);
check('isRarityUnlocked common Lv1 = true', isRarityUnlocked('common', 1) === true);

// ---- power pool sanity: every power's rarity obeys the filter ----
const legendaries = POWERS.filter((p) => p.rarity === 'legendary');
check('legendary powers exist in the database', legendaries.length > 0, `count=${legendaries.length}`);

// ---- shop: wave-gated rarities never leak through fallback ----
for (const wave of [1, 2, 3, 4]) {
  let epic = 0, legendary = 0;
  for (let i = 0; i < 500; i++) {
    const offers = (g as any).rollShopOffers(wave, new Set<ShopItemId>(), 4) as { rarity: Rarity }[];
    for (const o of offers) { if (o.rarity === 'epic') epic++; if (o.rarity === 'legendary') legendary++; }
  }
  check(`shop wave ${wave}: no locked epic/legendary`, epic === 0 && legendary === 0, `epic=${epic} legendary=${legendary}`);
}
{
  let rare = 0;
  for (let i = 0; i < 300; i++) for (const o of (g as any).rollShopOffers(3, new Set<ShopItemId>(), 4) as { rarity: Rarity }[]) if (o.rarity === 'rare') rare++;
  check('shop wave 3: rare can appear', rare > 0, `rare=${rare}`);
}
{
  // heavily-excluded wave-1 shop must still not fall back to locked rarities
  const exclude = new Set<ShopItemId>(SHOP_ITEMS.filter((i) => i.rarity === 'common' || i.rarity === 'rare').map((i) => i.id));
  const offers = (g as any).rollShopOffers(1, exclude, 4) as { rarity: Rarity }[];
  check('shop wave 1 with all unlocked items excluded: no locked-rarity fallback', offers.every((o) => o.rarity !== 'epic' && o.rarity !== 'legendary'), `offers=${offers.map((o) => o.rarity).join(',') || 'empty'}`);
}
for (const wave of [5, 9]) {
  let epic = 0;
  for (let i = 0; i < 300; i++) for (const o of (g as any).rollShopOffers(wave, new Set<ShopItemId>(), 4) as { rarity: Rarity }[]) if (o.rarity === 'epic') epic++;
  check(`shop wave ${wave}: epic can appear`, epic > 0, `epic=${epic}`);
}
{
  let legendary = 0;
  for (let i = 0; i < 500; i++) for (const o of (g as any).rollShopOffers(12, new Set<ShopItemId>(), 4) as { rarity: Rarity }[]) if (o.rarity === 'legendary') legendary++;
  check('shop wave 12: legendary can appear', legendary > 0, `legendary=${legendary}`);
}

console.log(failures === 0 ? '\nALL TESTS PASSED' : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
