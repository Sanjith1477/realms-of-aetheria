import test from 'node:test';
import assert from 'node:assert/strict';

import { heroBasePower, waveDifficulty } from './difficulty.ts';

const earlyHero = {
  baseDamage: 12,
  attackCooldown: 0.3,
  damageMultiplier: 1,
  attackRateMultiplier: 1,
  critChance: 0.18,
  maxHealth: 92,
  armor: 0,
  movementSpeed: 252,
};

test('hero baseline uses permanent combat stats and ignores temporary buffs', () => {
  const baseline = heroBasePower(earlyHero);
  const stronger = heroBasePower({ ...earlyHero, damageMultiplier: 1.8, attackRateMultiplier: 1.4, maxHealth: 140, armor: 0.25 });
  assert.ok(baseline > 0);
  assert.ok(stronger > baseline);
  assert.ok(stronger < baseline * 4);
});

test('wave pressure rises smoothly and first boss is substantially stronger', () => {
  const baseline = heroBasePower(earlyHero);
  const wave1 = waveDifficulty(baseline, baseline, 1);
  const early = waveDifficulty(baseline * 1.2, baseline, 3);
  const firstBoss = waveDifficulty(baseline * 1.35, baseline, 5);
  const mid = waveDifficulty(baseline * 1.8, baseline, 10);
  const lateBoss = waveDifficulty(baseline * 2.6, baseline, 25);

  assert.ok(wave1.hp < early.hp && early.hp < firstBoss.hp && firstBoss.hp < mid.hp && mid.hp < lateBoss.hp);
  assert.ok(firstBoss.bossHp > 2);
  assert.ok(firstBoss.bossDmg > 1.4);
  assert.ok(firstBoss.bossAttackGap < 1);
  assert.ok(lateBoss.bossMinionGap < firstBoss.bossMinionGap);
});

test('hero scaling is bounded instead of allowing one build to explode difficulty', () => {
  const baseline = heroBasePower(earlyHero);
  const ordinary = waveDifficulty(baseline * 1.1, baseline, 20);
  const extreme = waveDifficulty(baseline * 10, baseline, 20);
  assert.ok(extreme.hp / ordinary.hp < 1.5);
  assert.ok(extreme.bossHp / ordinary.bossHp < 1.5);
});