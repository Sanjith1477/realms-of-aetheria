import test from 'node:test';
import assert from 'node:assert/strict';

import { capStackCount, getPowerStackCap, getShopItemStackCap, isPowerAvailable } from './data.ts';

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
