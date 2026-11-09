import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CATEGORIES_EN,
  RONDOS_EN,
  UI_EN,
  generateMonthlyPlanEn,
  getSquadOrganizationAdviceEn,
} from '../i18n/en';
import {
  CATEGORIES_DE,
  RONDOS_DE,
  UI_DE,
  generateMonthlyPlanDe,
  getSquadOrganizationAdviceDe,
} from '../i18n/de';
import {
  CATEGORIES_RU,
  RONDOS_RU,
  UI_RU,
  generateMonthlyPlanRu,
  getSquadOrganizationAdviceRu,
} from '../i18n/ru';
import {
  AGE_BANDS_EN,
  AGE_BANDS_DE,
  AGE_BANDS_RU,
  RONDO_AGE_MATRIX_EN,
  RONDO_AGE_MATRIX_DE,
  RONDO_AGE_MATRIX_RU,
  RONDO_METHODOLOGY_EN,
  RONDO_METHODOLOGY_DE,
  RONDO_METHODOLOGY_RU,
} from '../i18n/ageMethodologyData';
import {
  extractCanonicalGeometry,
  RONDO_CANONICAL_GEOMETRY,
} from '../data/rondoCanonicalGeometry';
import { classifySessionFocus } from '../domain/periodization';
import {
  loadCompletedSessions,
  saveCompletedSessions,
  loadInitialTheme,
  saveTheme,
  loadInitialLanguage,
  saveLanguage,
  loadInitialAgeBand,
  saveAgeBand,
  COMPLETED_SESSIONS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  LANG_STORAGE_KEY,
  AGE_STORAGE_KEY,
} from '../domain/sessionStorage';

describe('Domain & Data Integrity — EN / DE / RU Parity & Canonical Geometry', () => {
  it('enforces 100% canonical geometry parity across EN, DE, and RU for all 10 rondos', () => {
    expect(RONDOS_EN).toHaveLength(10);
    expect(RONDOS_DE).toHaveLength(10);
    expect(RONDOS_RU).toHaveLength(10);

    for (let i = 0; i < 10; i++) {
      const enGeom = extractCanonicalGeometry(RONDOS_EN[i]);
      const deGeom = extractCanonicalGeometry(RONDOS_DE[i]);
      const ruGeom = extractCanonicalGeometry(RONDOS_RU[i]);
      const canonical = RONDO_CANONICAL_GEOMETRY[RONDOS_EN[i].id];

      expect(enGeom).toEqual(canonical);
      expect(deGeom).toEqual(canonical);
      expect(ruGeom).toEqual(canonical);

      // Verify all SVG coordinates are within valid [0..500, 0..400] viewBox
      for (const cone of canonical.cones) {
        expect(cone.x).toBeGreaterThanOrEqual(0);
        expect(cone.x).toBeLessThanOrEqual(500);
        expect(cone.y).toBeGreaterThanOrEqual(0);
        expect(cone.y).toBeLessThanOrEqual(400);
      }
      for (const phase of canonical.phases) {
        expect(phase.players.length).toBeGreaterThanOrEqual(4);
        for (const p of phase.players) {
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.x).toBeLessThanOrEqual(500);
          expect(p.y).toBeGreaterThanOrEqual(0);
          expect(p.y).toBeLessThanOrEqual(400);
        }
      }
    }
  });

  it('verifies complete parity across categories, age bands, methodology basis, and UI dictionaries', () => {
    expect(CATEGORIES_EN.map((c) => c.id)).toEqual(
      CATEGORIES_DE.map((c) => c.id)
    );
    expect(CATEGORIES_EN.map((c) => c.id)).toEqual(
      CATEGORIES_RU.map((c) => c.id)
    );

    expect(AGE_BANDS_EN.map((b) => b.id)).toEqual(
      AGE_BANDS_DE.map((b) => b.id)
    );
    expect(AGE_BANDS_EN.map((b) => b.id)).toEqual(
      AGE_BANDS_RU.map((b) => b.id)
    );

    for (const rondo of RONDOS_EN) {
      expect(RONDO_METHODOLOGY_EN[rondo.id]).toBeDefined();
      expect(RONDO_METHODOLOGY_DE[rondo.id]).toBeDefined();
      expect(RONDO_METHODOLOGY_RU[rondo.id]).toBeDefined();

      for (const band of AGE_BANDS_EN) {
        expect(RONDO_AGE_MATRIX_EN[rondo.id][band.id].baseGrid.length).toBeGreaterThan(0);
        expect(RONDO_AGE_MATRIX_DE[rondo.id][band.id].baseGrid.length).toBeGreaterThan(0);
        expect(RONDO_AGE_MATRIX_RU[rondo.id][band.id].baseGrid.length).toBeGreaterThan(0);
      }
    }

    expect(UI_EN.methodology.interventions).toHaveLength(6);
    expect(UI_DE.methodology.interventions).toHaveLength(6);
    expect(UI_RU.methodology.interventions).toHaveLength(6);
  });

  it('generates 8-session monthly plans across EN, DE, and RU for rondo-3 and non-rondo-3 drills', () => {
    const rondo1 = RONDOS_EN[0];
    const rondo3En = RONDOS_EN[2];
    const rondo1De = RONDOS_DE[0];
    const rondo3De = RONDOS_DE[2];
    const rondo1Ru = RONDOS_RU[0];
    const rondo3Ru = RONDOS_RU[2];

    const planEn1 = generateMonthlyPlanEn(rondo1);
    const planEn3 = generateMonthlyPlanEn(rondo3En, {
      baseGrid: '15x15',
      intensiveGrid: '13x13',
      timing: '4x2.5m',
    });
    const planDe1 = generateMonthlyPlanDe(rondo1De);
    const planDe3 = generateMonthlyPlanDe(rondo3De, {
      baseGrid: '15x15',
      intensiveGrid: '13x13',
      timing: '4x2.5m',
    });
    const planRu1 = generateMonthlyPlanRu(rondo1Ru);
    const planRu3 = generateMonthlyPlanRu(rondo3Ru, {
      baseGrid: '15x15',
      intensiveGrid: '13x13',
      timing: '4x2.5m',
    });

    for (const plan of [planEn1, planEn3, planDe1, planDe3, planRu1, planRu3]) {
      expect(plan).toHaveLength(8);
      expect(classifySessionFocus(plan[0])).toBe('attack');
      expect(classifySessionFocus(plan[1])).toBe('defense');
      expect(classifySessionFocus(plan[2])).toBe('attack');
      expect(classifySessionFocus(plan[3])).toBe('defense');
      expect(classifySessionFocus(plan[4])).toBe('other');
      expect(classifySessionFocus(plan[7])).toBe('other');
    }

    // Fallback string classification when session number is not 1..4
    expect(classifySessionFocus({ session: 99, focusSide: 'Attack Focus' })).toBe('attack');
    expect(classifySessionFocus({ session: 99, focusSide: 'Defensive Press' })).toBe('defense');
    expect(classifySessionFocus({ session: 99, focusSide: '4v4+3 Game' })).toBe('other');
  });

  it('computes squad organization advice across all rondo types and player counts in EN, DE, and RU', () => {
    const r1 = RONDOS_EN[0]; // rondo-1
    const r2 = RONDOS_EN[1]; // rondo-2
    const r3 = RONDOS_EN[2]; // rondo-3
    const r4 = RONDOS_EN[3]; // rondo-4

    for (const fn of [
      getSquadOrganizationAdviceEn,
      getSquadOrganizationAdviceDe,
      getSquadOrganizationAdviceRu,
    ]) {
      expect(fn(15, r1)).toContain('3');
      expect(fn(12, r2).length).toBeGreaterThan(10);
      expect(fn(16, r2).length).toBeGreaterThan(10);
      expect(fn(14, r3).length).toBeGreaterThan(10);
      expect(fn(20, r3).length).toBeGreaterThan(10);
      expect(fn(16, r4).length).toBeGreaterThan(10);
    }
  });
});

describe('Domain Storage Service — Persistence & Error Resilience', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loads and saves completed sessions, theme, language, and ageBand accurately', () => {
    expect(loadCompletedSessions()).toEqual([1, 2]);
    saveCompletedSessions([1, 2, 5]);
    expect(loadCompletedSessions()).toEqual([1, 2, 5]);

    expect(loadInitialTheme()).toBe('dark');
    saveTheme('light');
    expect(loadInitialTheme()).toBe('light');

    expect(loadInitialLanguage()).toBe('en');
    saveLanguage('de');
    expect(loadInitialLanguage()).toBe('de');

    expect(loadInitialAgeBand()).toBe('u16');
    saveAgeBand('u12');
    expect(loadInitialAgeBand()).toBe('u12');
  });

  it('recovers gracefully from corrupted JSON or storage exceptions', () => {
    window.localStorage.setItem(COMPLETED_SESSIONS_STORAGE_KEY, '{bad-json');
    expect(loadCompletedSessions()).toEqual([1, 2]);

    window.localStorage.setItem(
      COMPLETED_SESSIONS_STORAGE_KEY,
      JSON.stringify({ not: 'an-array' })
    );
    expect(loadCompletedSessions()).toEqual([1, 2]);

    window.localStorage.setItem(THEME_STORAGE_KEY, 'invalid-theme');
    expect(loadInitialTheme()).toBe('dark');

    window.localStorage.setItem(LANG_STORAGE_KEY, 'fr');
    expect(loadInitialLanguage()).toBe('en');

    window.localStorage.setItem(AGE_STORAGE_KEY, 'u99');
    expect(loadInitialAgeBand()).toBe('u16');

    // Simulate localStorage throwing SecurityError / QuotaExceededError
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    expect(loadCompletedSessions()).toEqual([1, 2]);
    expect(loadInitialTheme()).toBe('dark');
    expect(loadInitialLanguage()).toBe('en');
    expect(loadInitialAgeBand()).toBe('u16');

    expect(() => saveCompletedSessions([1])).not.toThrow();
    expect(() => saveTheme('light')).not.toThrow();
    expect(() => saveLanguage('ru')).not.toThrow();
    expect(() => saveAgeBand('u10')).not.toThrow();
  });
});
