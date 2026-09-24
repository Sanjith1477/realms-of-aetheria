import test from 'node:test';
import assert from 'node:assert/strict';

import { capStackCount, getPowerStackCap, getShopItemStackCap, isPowerAvailable, POWERS, SHOP_ITEMS } from './data.ts';

test('power stacking caps are finite and enforced', () => {
  assert.equal(getPowerStackCap('keen_edge'), 3);
  assert.equal(getPowerStackCap('veteran_reach'), 3);
  assert.equal(capStackCount(99, getPowerStackCap('keen_edge')), 3);
  assert.equal(capStackCount(4, getPowerStackCap('veteran_reach')), 3);
});

test('one-time powers and maxed stacks leave the draft pool', () => {
  assert.equal(getPowerStackCap('evo_kensei_crescent'), 1);
  assert.equal(isPowerAvailable('evo_kensei_crescent', []), true);
  assert.equal(isPowerAvailable('evo_kensei_crescent', ['evo_kensei_crescent']), false);
  assert.equal(isPowerAvailable('veteran_reach', ['veteran_reach', 'veteran_reach']), true);
  assert.equal(isPowerAvailable('veteran_reach', ['veteran_reach', 'veteran_reach', 'veteran_reach']), false);
});

test('late multiplicative outliers have bounded realistic caps', () => {
  assert.equal(getPowerStackCap('death_dealer'), 1);
  assert.equal(getPowerStackCap('chronomancer'), 1);
  assert.equal(getPowerStackCap('royal_treasury'), 1);
  assert.equal(getPowerStackCap('aetherborn_form'), 1);
  assert.equal(getPowerStackCap('predator_instinct'), 2);
});

test('marketplace stacking caps prevent runaway purchases', () => {
  assert.equal(getShopItemStackCap('tonic'), 2);
  assert.equal(getShopItemStackCap('steel'), 3);
  assert.equal(capStackCount(999, getShopItemStackCap('tonic')), 2);
  assert.equal(capStackCount(5, getShopItemStackCap('steel')), 3);
});

test('late-game draft reserves and XP power remain valid', () => {
  assert.equal(getPowerStackCap('aether_insight'), 5);
  assert.equal(isPowerAvailable('aether_insight', Array(4).fill('aether_insight')), true);
  assert.equal(isPowerAvailable('aether_insight', Array(5).fill('aether_insight')), false);
  assert.deepEqual(POWERS.filter((power) => power.id.startsWith('late_')).map((power) => power.id), [
    'late_aether_surge', 'late_void_horizon', 'late_starfall',
  ]);
});

test('marketplace prices scale with item power and rarity', () => {
  const prices = Object.fromEntries(SHOP_ITEMS.map((item) => [item.id, item.cost]));
  assert.equal(prices.rations, 100);
  assert.equal(prices.steel, 5000);
  assert.equal(prices.hourglass, 7000);
  assert.equal(prices.war_banner, 12000);
});
