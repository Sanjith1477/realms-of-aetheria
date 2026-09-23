import test from 'node:test';
import assert from 'node:assert/strict';

import { unlockedClassIdsAtWave } from './data.ts';

test('legend unlocks use inclusive wave thresholds', () => {
  const before = unlockedClassIdsAtWave(79);
  const atThreshold = unlockedClassIdsAtWave(80);
  const after = unlockedClassIdsAtWave(81);

  assert.equal(before.includes('stormwarden'), false);
  assert.equal(atThreshold.includes('stormwarden'), true);
  assert.deepEqual(after, atThreshold);
});

test('multiple legend thresholds remain unlocked once reached', () => {
  assert.deepEqual(unlockedClassIdsAtWave(60), [
    'kensei',
    'shieldthane',
    'jaguar',
    'sandseer',
    'tidecaller',
    'riftblade',
  ]);
});
