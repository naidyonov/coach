import { MonthlySessionItem } from '../i18n/types';

export type SessionFocusCategory = 'attack' | 'defense' | 'other';

export const classifySessionFocus = (
  item: Pick<MonthlySessionItem, 'session' | 'focusSide'>
): SessionFocusCategory => {
  if (item.session === 1 || item.session === 3) {
    return 'attack';
  }
  if (item.session === 2 || item.session === 4) {
    return 'defense';
  }

  const focusLower = item.focusSide.toLowerCase();
  if (
    focusLower.includes('attack') ||
    focusLower.includes('angriff') ||
    focusLower.includes('атак')
  ) {
    return 'attack';
  }
  if (
    focusLower.includes('defens') ||
    focusLower.includes('press') ||
    focusLower.includes('abwehr') ||
    focusLower.includes('оборон') ||
    focusLower.includes('отбор')
  ) {
    return 'defense';
  }
  return 'other';
};
