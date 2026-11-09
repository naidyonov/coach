import { RondoItem } from '../i18n/types';

export interface TimerDosagePreset {
  work: number;
  rest: number;
  sets: number;
}

export const DEFAULT_TIMER_PRESET: TimerDosagePreset = {
  work: 120,
  rest: 40,
  sets: 4,
};

export const RONDO_TIMER_PRESETS: Record<string, TimerDosagePreset> = {
  'rondo-1': { work: 90, rest: 30, sets: 4 },
  'rondo-2': { work: 120, rest: 40, sets: 4 },
  'rondo-3': { work: 150, rest: 45, sets: 4 },
  'rondo-4': { work: 180, rest: 60, sets: 3 },
  'rondo-5': { work: 150, rest: 45, sets: 4 },
  'rondo-6': { work: 240, rest: 60, sets: 3 },
  'rondo-7': { work: 120, rest: 45, sets: 4 },
  'rondo-8': { work: 150, rest: 60, sets: 4 },
  'rondo-9': { work: 120, rest: 45, sets: 4 },
  'rondo-10': { work: 150, rest: 45, sets: 4 },
};

export const getRondoTimerPreset = (
  rondoOrId: RondoItem | string
): TimerDosagePreset => {
  const id = typeof rondoOrId === 'string' ? rondoOrId : rondoOrId.id;
  return Object.prototype.hasOwnProperty.call(RONDO_TIMER_PRESETS, id)
    ? RONDO_TIMER_PRESETS[id]
    : DEFAULT_TIMER_PRESET;
};

export const formatTimerMinutesSeconds = (sec: number): string => {
  const safeSec = Math.max(0, Math.floor(sec));
  const m = Math.floor(safeSec / 60);
  const s = safeSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const clampWorkSeconds = (seconds: number): number =>
  Math.max(15, Math.min(600, seconds));

export const clampRestSeconds = (seconds: number): number =>
  Math.max(10, Math.min(300, seconds));

export const clampTotalSets = (sets: number): number =>
  Math.max(1, Math.min(12, sets));
