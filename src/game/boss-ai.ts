export interface MovementSample {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface MovementBehavior {
  vx: number;
  vy: number;
  speed: number;
  consistency: number;
  directionChanges: number;
  radialBias: number;
  strafeBias: number;
}

export const BOSS_AIM_TUNING = {
  sampleLimit: 10,
  reactionDelay: 0.08,
  maxPredictionHorizon: 0.7,
  predictionStrength: 0.72,
  turnRate: 2.8,
  aimError: 0.09,
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function analyzeMovement(history: MovementSample[], bossX: number, bossY: number): MovementBehavior {
  if (history.length < 2) return { vx: 0, vy: 0, speed: 0, consistency: 0, directionChanges: 0, radialBias: 0, strafeBias: 0 };

  let vx = 0;
  let vy = 0;
  let speed = 0;
  let directionChanges = 0;
  let consistency = 0;
  let radialBias = 0;
  let strafeBias = 0;
  let compared = 0;

  for (let i = 1; i < history.length; i++) {
    const sample = history[i];
    const previous = history[i - 1];
    const currentSpeed = Math.hypot(sample.vx, sample.vy);
    const previousSpeed = Math.hypot(previous.vx, previous.vy);
    vx += sample.vx;
    vy += sample.vy;
    speed += currentSpeed;
    if (currentSpeed > 8 && previousSpeed > 8) {
      const dot = (sample.vx * previous.vx + sample.vy * previous.vy) / (currentSpeed * previousSpeed);
      consistency += clamp((dot + 1) * 0.5, 0, 1);
      if (dot < 0.2) directionChanges++;
      compared++;
    }

    const dx = sample.x - bossX;
    const dy = sample.y - bossY;
    const distance = Math.hypot(dx, dy);
    if (distance > 1 && currentSpeed > 8) {
      const radialX = dx / distance;
      const radialY = dy / distance;
      radialBias += (sample.vx * radialX + sample.vy * radialY) / currentSpeed;
      strafeBias += (sample.vx * -radialY + sample.vy * radialX) / currentSpeed;
    }
  }

  const count = history.length - 1;
  return {
    vx: vx / count,
    vy: vy / count,
    speed: speed / count,
    consistency: compared ? consistency / compared : 0,
    directionChanges: compared ? directionChanges / compared : 0,
    radialBias: radialBias / count,
    strafeBias: strafeBias / count,
  };
}

export function predictedAim(
  bossX: number,
  bossY: number,
  playerX: number,
  playerY: number,
  behavior: MovementBehavior,
  projectileSpeed: number,
  reactionDelay: number,
  maxPredictionHorizon: number,
  predictionStrength: number,
): number {
  const dx = playerX - bossX;
  const dy = playerY - bossY;
  const distance = Math.hypot(dx, dy) || 1;
  const travelTime = clamp(distance / Math.max(1, projectileSpeed), 0, maxPredictionHorizon);
  const stability = clamp(behavior.consistency - behavior.directionChanges * 0.55, 0, 1);
  const strength = clamp(predictionStrength * (0.35 + stability * 0.65), 0, 1);
  const leadTime = Math.min(maxPredictionHorizon, reactionDelay + travelTime);
  const targetX = playerX + behavior.vx * leadTime * strength;
  const targetY = playerY + behavior.vy * leadTime * strength;
  const targetDx = targetX - bossX;
  const targetDy = targetY - bossY;
  return Math.atan2(targetDy || dy, targetDx || dx);
}

export function turnToward(current: number, target: number, maxTurn: number): number {
  let delta = (target - current + Math.PI) % (Math.PI * 2) - Math.PI;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return current + clamp(delta, -maxTurn, maxTurn);
}
