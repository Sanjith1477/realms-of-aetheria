import test from 'node:test';
import assert from 'node:assert/strict';

import { analyzeMovement, predictedAim, turnToward, type MovementSample } from './boss-ai.ts';

function history(vx: number, vy: number, count = 8): MovementSample[] {
  return Array.from({ length: count }, (_, i) => ({ x: 100 + vx * i, y: 100 + vy * i, vx, vy }));
}

test('steady lateral movement is detected and led', () => {
  const behavior = analyzeMovement(history(0, -120), 0, 100);
  const aim = predictedAim(0, 100, 100, 100, behavior, 220, 0.08, 0.7, 0.8);
  assert.ok(behavior.vy < 0);
  assert.ok(behavior.consistency > 0.9);
  assert.ok(aim < 0);
});

test('stationary, rightward, approaching, and retreating movement stay valid', () => {
  const still = analyzeMovement(history(0, 0), 0, 0);
  const right = analyzeMovement(history(120, 0), 0, 100);
  const approaching = analyzeMovement(history(-120, 0).map((sample, i) => ({ ...sample, x: 500 - i * 120 })), 0, 100);
  const retreating = analyzeMovement(history(120, 0), 0, 100);
  assert.equal(still.speed, 0);
  assert.ok(right.vx > 0);
  assert.ok(approaching.radialBias < 0);
  assert.ok(retreating.radialBias > 0);
  assert.ok(Number.isFinite(predictedAim(0, 100, 100, 100, still, 220, 0.08, 0.7, 0.8)));
});

test('reversals reduce prediction confidence without producing invalid angles', () => {
  const reversal: MovementSample[] = [
    ...history(140, 0, 4),
    ...history(-140, 0, 4).map((sample, i) => ({ ...sample, x: 520 - i * 140 })),
  ];
  const behavior = analyzeMovement(reversal, 0, 100);
  const aim = predictedAim(0, 100, 100, 100, behavior, 220, 0.08, 0.7, 0.8);
  assert.ok(behavior.directionChanges > 0);
  assert.ok(behavior.consistency < 0.9);
  assert.ok(Number.isFinite(aim));
});

test('strafing and radial movement are distinguished', () => {
  const strafe = analyzeMovement(Array.from({ length: 8 }, (_, i) => {
    const angle = i * 0.12;
    return { x: Math.cos(angle) * 200, y: Math.sin(angle) * 200, vx: -Math.sin(angle) * 120, vy: Math.cos(angle) * 120 };
  }), 0, 0);
  const retreat = analyzeMovement(history(120, 0), 0, 0);
  assert.ok(Math.abs(strafe.strafeBias) > Math.abs(strafe.radialBias));
  assert.ok(Math.abs(retreat.radialBias) > Math.abs(retreat.strafeBias));
});

test('direction smoothing has a finite turn rate', () => {
  const current = 0;
  const target = Math.PI;
  assert.equal(Math.abs(turnToward(current, target, 0.2)), 0.2);
});