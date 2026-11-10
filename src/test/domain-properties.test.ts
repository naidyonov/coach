import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { computeSquadSetup } from '../domain/squadCalculator';
import {
  formatTimerMinutesSeconds,
  clampWorkSeconds,
  clampRestSeconds,
  clampTotalSets,
  getRondoTimerPreset,
  DEFAULT_TIMER_PRESET,
} from '../domain/timerDosage';
import { classifySessionFocus } from '../domain/periodization';
import {
  clampActivationMinutes,
  computeActivationPhaseSplit,
  TrainingDayProfile,
} from '../domain/activationCalculator';
import { AgeBandId } from '../i18n/types';

describe('Domain Logic Property-Based Tests (fast-check)', () => {
  describe('activationCalculator properties', () => {
    it('clampActivationMinutes is idempotent and always bounds result within [10, 25]', () => {
      fc.assert(
        fc.property(fc.double({ min: -500, max: 500, noNaN: true }), (minutes) => {
          const clamped = clampActivationMinutes(minutes);
          expect(clamped).toBeGreaterThanOrEqual(10);
          expect(clamped).toBeLessThanOrEqual(25);
          expect(Number.isInteger(clamped)).toBe(true);
          expect(clampActivationMinutes(clamped)).toBe(clamped);
        })
      );
    });

    it('computeActivationPhaseSplit preserves sum invariant (raiseMin + activateMin + potentiateMin === totalMinutes) and PHV safety across all inputs', () => {
      const ageArb = fc.constantFrom<AgeBandId>('u10', 'u12', 'u14', 'u16', 'u18_pro');
      const dayArb = fc.constantFrom<TrainingDayProfile>('md-4', 'md-3', 'md-2', 'md-1');

      fc.assert(
        fc.property(
          fc.integer({ min: -50, max: 100 }),
          ageArb,
          dayArb,
          (rawMinutes, ageBand, dayProfile) => {
            const split = computeActivationPhaseSplit(rawMinutes, ageBand, dayProfile);
            expect(split.totalMinutes).toBeGreaterThanOrEqual(10);
            expect(split.totalMinutes).toBeLessThanOrEqual(25);
            expect(split.raiseMin + split.activateMin + split.potentiateMin).toBe(
              split.totalMinutes
            );
            expect(split.raiseMin).toBeGreaterThanOrEqual(2);
            expect(split.activateMin).toBeGreaterThanOrEqual(2);
            expect(split.potentiateMin).toBeGreaterThanOrEqual(2);
            expect(split.setsRecommended).toBe(3);
            expect(split.workSecPerSet).toBeGreaterThanOrEqual(90);
            expect(split.phvSafe).toBe(true);

            if (ageBand === 'u14') {
              expect(split.activateMin).toBeGreaterThanOrEqual(split.raiseMin);
              expect(split.activateMin).toBeGreaterThanOrEqual(split.potentiateMin);
            }
          }
        )
      );
    });
  });

  describe('squadCalculator properties', () => {
    it('always clamps playersCount to integer >= 4 regardless of input', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1000, max: 1000, noNaN: true }),
          fc.string(),
          (playersCount, rondoId) => {
            const setup = computeSquadSetup(playersCount, rondoId);
            expect(setup.playersCount).toBeGreaterThanOrEqual(4);
            expect(Number.isInteger(setup.playersCount)).toBe(true);
          }
        )
      );
    });

    it('preserves rondo-1 partition invariant: squares * 4 + rotatingDefenders === playersCount', () => {
      fc.assert(
        fc.property(fc.integer({ min: 4, max: 100 }), (playersCount) => {
          const setup = computeSquadSetup(playersCount, 'rondo-1');
          if (setup.type === 'rondo_1_parallel_squares') {
            expect(setup.squares * 4 + setup.rotatingDefenders).toBe(setup.playersCount);
            expect(setup.rotatingDefenders).toBeGreaterThanOrEqual(0);
            expect(setup.rotatingDefenders).toBeLessThan(4);
            expect(setup.squares).toBeGreaterThanOrEqual(1);
          } else {
            throw new Error(`Unexpected setup type for rondo-1: ${setup.type}`);
          }
        })
      );
    });

    it('correctly partitions rondo-2 based on threshold 14', () => {
      fc.assert(
        fc.property(fc.integer({ min: 4, max: 50 }), (playersCount) => {
          const setup = computeSquadSetup(playersCount, 'rondo-2');
          if (playersCount >= 14) {
            expect(setup.type).toBe('rondo_2_dual_grids');
          } else {
            expect(setup.type).toBe('rondo_2_single_with_neutrals');
          }
        })
      );
    });

    it('correctly partitions rondo-3 based on threshold 18 and calculates extraPressers', () => {
      fc.assert(
        fc.property(fc.integer({ min: 4, max: 50 }), (playersCount) => {
          const setup = computeSquadSetup(playersCount, 'rondo-3');
          if (playersCount >= 18) {
            expect(setup.type).toBe('rondo_3_dual_grids');
          } else {
            expect(setup.type).toBe('rondo_3_single_with_pressing_unit');
            if (setup.type === 'rondo_3_single_with_pressing_unit') {
              expect(setup.extraPressers).toBe(Math.max(0, playersCount - 10));
            }
          }
        })
      );
    });

    it('correctly computes Activation squad setups for act-1..10 without zero-capacity stations', () => {
      const actIds = [
        'act-1',
        'act-2',
        'act-3',
        'act-4',
        'act-5',
        'act-6',
        'act-7',
        'act-8',
        'act-9',
        'act-10',
      ];
      fc.assert(
        fc.property(
          fc.integer({ min: 4, max: 40 }),
          fc.constantFrom(...actIds),
          (playersCount, actId) => {
            const setup = computeSquadSetup(playersCount, actId);
            if (actId === 'act-7' || actId === 'act-8') {
              expect(setup.type).toBe('activation_diamond_circuits');
              if (setup.type === 'activation_diamond_circuits') {
                expect(setup.circuits * setup.playersPerCircuit).toBeGreaterThanOrEqual(
                  setup.playersCount
                );
                if (setup.playersCount < 20) {
                  expect(setup.circuits).toBe(1);
                }
              }
            } else if (actId === 'act-9' || actId === 'act-10') {
              expect(setup.type).toBe('activation_duel_stations');
              if (setup.type === 'activation_duel_stations') {
                expect(setup.pairsCount).toBeGreaterThanOrEqual(2);
                expect(setup.stations).toBeGreaterThanOrEqual(1);
                if (setup.playersCount < 20) {
                  expect(setup.stations).toBe(1);
                }
              }
            } else {
              expect(setup.type).toBe('activation_parallel_boxes');
              if (setup.type === 'activation_parallel_boxes') {
                expect(setup.boxes * setup.playersPerBox).toBeGreaterThanOrEqual(
                  setup.playersCount
                );
                if (setup.playersCount < 20) {
                  expect(setup.boxes).toBe(1);
                }
              }
            }
          }
        )
      );
    });
  });

  describe('timerDosage properties', () => {
    it('formatTimerMinutesSeconds produces valid mm:ss string matching seconds integer floor', () => {
      fc.assert(
        fc.property(fc.integer({ min: 0, max: 36000 }), (sec) => {
          const formatted = formatTimerMinutesSeconds(sec);
          expect(formatted).toMatch(/^\d+:[0-5]\d$/);

          const [mStr, sStr] = formatted.split(':');
          const reconstructed = parseInt(mStr, 10) * 60 + parseInt(sStr, 10);
          expect(reconstructed).toBe(sec);
        })
      );
    });

    it('clampWorkSeconds always bounds result within [15, 600] and is idempotent', () => {
      fc.assert(
        fc.property(fc.integer({ min: -100, max: 2000 }), (val) => {
          const clamped = clampWorkSeconds(val);
          expect(clamped).toBeGreaterThanOrEqual(15);
          expect(clamped).toBeLessThanOrEqual(600);
          expect(clampWorkSeconds(clamped)).toBe(clamped);
        })
      );
    });

    it('clampRestSeconds always bounds result within [10, 300] and is idempotent', () => {
      fc.assert(
        fc.property(fc.integer({ min: -100, max: 2000 }), (val) => {
          const clamped = clampRestSeconds(val);
          expect(clamped).toBeGreaterThanOrEqual(10);
          expect(clamped).toBeLessThanOrEqual(300);
          expect(clampRestSeconds(clamped)).toBe(clamped);
        })
      );
    });

    it('clampTotalSets always bounds result within [1, 12] and is idempotent', () => {
      fc.assert(
        fc.property(fc.integer({ min: -100, max: 100 }), (val) => {
          const clamped = clampTotalSets(val);
          expect(clamped).toBeGreaterThanOrEqual(1);
          expect(clamped).toBeLessThanOrEqual(12);
          expect(clampTotalSets(clamped)).toBe(clamped);
        })
      );
    });

    it('getRondoTimerPreset returns valid positive presets for any rondo or activation ID', () => {
      fc.assert(
        fc.property(fc.string(), (id) => {
          const preset = getRondoTimerPreset(id);
          expect(preset.work).toBeGreaterThan(0);
          expect(preset.rest).toBeGreaterThan(0);
          expect(preset.sets).toBeGreaterThan(0);
        })
      );
    });
  });

  describe('periodization properties', () => {
    it('always classifies sessions 1 & 3 as attack, 2 & 4 as defense', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(1, 3),
          fc.string(),
          (session, focusSide) => {
            expect(classifySessionFocus({ session, focusSide })).toBe('attack');
          }
        )
      );

      fc.assert(
        fc.property(
          fc.constantFrom(2, 4),
          fc.string(),
          (session, focusSide) => {
            expect(classifySessionFocus({ session, focusSide })).toBe('defense');
          }
        )
      );
    });

    it('always returns one of the 3 valid focus categories', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: -10, max: 10 }),
          fc.string(),
          (session, focusSide) => {
            const category = classifySessionFocus({ session, focusSide });
            expect(['attack', 'defense', 'other']).toContain(category);
          }
        )
      );
    });
  });

  describe('rondoAdapter tactical geometry properties', () => {
    it('preserves pass/movement curve offsets and shadow variants across arbitrary Rondo & Activation phase geometries', async () => {
      const { rondoPhaseToTacticalScene } = await import(
        '../lib/tactical-board/adapters/rondoAdapter'
      );
      const { RONDOS_EN } = await import('../i18n/en');
      const { ACTIVATIONS_EN } = await import('../i18n/activationData');
      const allDrills = [...RONDOS_EN, ...ACTIVATIONS_EN];

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: allDrills.length - 1 }),
          fc.integer({ min: 0, max: 2 }),
          fc.integer({ min: -60, max: 60 }),
          fc.constantFrom('danger' as const, 'solution' as const),
          (drillIdx, phaseIdx, curveVal, shadowVariant) => {
            const baseDrill = structuredClone(allDrills[drillIdx]);
            const phase = baseDrill.diagram.phases[phaseIdx];
            if (phase.passes.length > 0) {
              phase.passes[0].curve = curveVal;
            }
            if (phase.movements.length > 0) {
              phase.movements[0].curve = curveVal;
            }
            if (phase.shadows.length > 0) {
              phase.shadows[0].variant = shadowVariant;
            }

            const result = rondoPhaseToTacticalScene(baseDrill, phaseIdx);
            expect(result.totalPhases).toBe(3);

            if (phase.passes.length > 0) {
              const passVec = result.scene.vectors.find((v) => v.id === 'pass-0');
              expect(passVec?.curve).toBe(curveVal);
            }
            if (phase.movements.length > 0) {
              const mvVec = result.scene.vectors.find((v) => v.id === 'mv-0');
              expect(mvVec?.curve).toBe(curveVal);
            }
            if (phase.shadows.length > 0) {
              expect(result.scene.shadows[0].variant).toBe(shadowVariant);
            }
          }
        )
      );
    });
  });
});

