import test from 'node:test';
import assert from 'node:assert/strict';

import { capStackCount, getPowerStackCap, getShopItemStackCap } from './data.ts';

test('power stacking caps are finite and enforced', () => {
  assert.equal(getPowerStackCap('keen_edge'), 3);
  assert.equal(getPowerStackCap('veteran_reach'), 3);
  assert.equal(capStackCount(99, getPowerStackCap('keen_edge')), 3);
  assert.equal(capStackCount(4, getPowerStackCap('veteran_reach')), 3);
});

test('marketplace stacking caps prevent runaway purchases', () => {
  assert.equal(getShopItemStackCap('tonic'), 2);
  assert.equal(getShopItemStackCap('steel'), 3);
  assert.equal(capStackCount(999, getShopItemStackCap('tonic')), 2);
  assert.equal(capStackCount(5, getShopItemStackCap('steel')), 3);
});
