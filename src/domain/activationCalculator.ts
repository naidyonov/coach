import { AgeBandId } from '../i18n/types';

export type TrainingDayProfile = 'md-4' | 'md-3' | 'md-2' | 'md-1';

export interface ActivationPhaseSplit {
  totalMinutes: number;
  raiseMin: number;
  activateMin: number;
  potentiateMin: number;
  setsRecommended: number;
  workSecPerSet: number;
  restSecBetweenSets: number;
  phvSafe: boolean;
  targetHeartRateZone: string;
}

const MIN_WARMUP_MINUTES = 10;
const MAX_WARMUP_MINUTES = 25;

export function clampActivationMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) return 15;
  const rounded = Math.round(minutes);
  return Math.max(MIN_WARMUP_MINUTES, Math.min(MAX_WARMUP_MINUTES, rounded));
}

/**
 * Computes the 3-phase progression split (Phase 1: Light Entry / Raise,
 * Phase 2: Coordination + Body Strength / Activate, Phase 3: Explosive / Potentiate)
 * for a single cohesive Activation drill.
 *
 * Mathematical Invariants:
 * 1. clampedTotal is in [10, 25]
 * 2. raiseMin + activateMin + potentiateMin === clampedTotal
 * 3. raiseMin >= 2, activateMin >= 2, potentiateMin >= 2
 * 4. For 'u14' (PHV growth-spurt stage), activateMin >= raiseMin and activateMin >= potentiateMin
 */
export function computeActivationPhaseSplit(
  totalMinutes: number,
  ageBand: AgeBandId,
  dayProfile: TrainingDayProfile = 'md-3'
): ActivationPhaseSplit {
  const clampedTotal = clampActivationMinutes(totalMinutes);

  let raiseRatio = 0.34;
  let activateRatio = 0.38;

  if (ageBand === 'u10' || ageBand === 'u12') {
    raiseRatio = 0.35;
    activateRatio = 0.35;
  } else if (ageBand === 'u14') {
    // PHV growth spurt: prioritize Phase 2 (knee-axis deceleration, core stability, proprioception)
    raiseRatio = 0.30;
    activateRatio = 0.44;
  } else if (ageBand === 'u16') {
    raiseRatio = 0.32;
    activateRatio = 0.38;
  } else {
    // u18_pro
    raiseRatio = 0.30;
    activateRatio = 0.38;
  }

  if (dayProfile === 'md-1') {
    // Pre-match neural primer: smooth entry, crisp activation, short explosive primer
    raiseRatio += 0.04;
  }

  let raiseMin = Math.max(2, Math.round(clampedTotal * raiseRatio));
  let activateMin = Math.max(2, Math.round(clampedTotal * activateRatio));
  let potentiateMin = clampedTotal - raiseMin - activateMin;

  if (potentiateMin < 2) {
    const deficit = 2 - potentiateMin;
    potentiateMin = 2;
    if (raiseMin - deficit >= 2) {
      raiseMin -= deficit;
    } else {
      activateMin = Math.max(2, activateMin - deficit);
    }
  }

  // Enforce U14 PHV invariant: activateMin must be the largest (or tied for largest) phase
  if (ageBand === 'u14') {
    while (activateMin < raiseMin && raiseMin > 2) {
      activateMin += 1;
      raiseMin -= 1;
    }
    while (activateMin < potentiateMin && potentiateMin > 2) {
      activateMin += 1;
      potentiateMin -= 1;
    }
  }

  const setsRecommended = 3;
  const workSecPerSet = Math.max(90, Math.round(((clampedTotal - 2) * 60) / setsRecommended));
  const restSecBetweenSets = ageBand === 'u14' ? 45 : 30;

  const targetHeartRateZone =
    ageBand === 'u10' || ageBand === 'u12'
      ? '65% → 85% HRmax (Playful Joy & Coordination)'
      : ageBand === 'u14'
        ? '65% → 85% HRmax (PHV Joint-Safe Progression)'
        : '65% → 92% HRmax (RAMP Neural Potentiation)';

  return {
    totalMinutes: clampedTotal,
    raiseMin,
    activateMin,
    potentiateMin,
    setsRecommended,
    workSecPerSet,
    restSecBetweenSets,
    phvSafe: ageBand === 'u14' ? activateMin >= raiseMin && activateMin >= potentiateMin : true,
    targetHeartRateZone
  };
}
