import { ActiveModuleId, AgeBandId, Language } from '../i18n/types';

export type ThemeMode = 'dark' | 'light';

export const COMPLETED_SESSIONS_STORAGE_KEY = 'coach_completed_sessions';
export const THEME_STORAGE_KEY = 'coach_theme_mode';
export const LANG_STORAGE_KEY = 'coach_app_lang';
export const AGE_STORAGE_KEY = 'coach_age_band';
export const ACTIVE_MODULE_STORAGE_KEY = 'coach_active_module';

export const VALID_AGE_BANDS: AgeBandId[] = [
  'u10',
  'u12',
  'u14',
  'u16',
  'u18_pro',
];

export const VALID_ACTIVE_MODULES: ActiveModuleId[] = [
  'rondo-series',
  'activation-series',
];

export const loadCompletedSessions = (): number[] => {
  try {
    const raw = window.localStorage.getItem(COMPLETED_SESSIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((n): n is number => typeof n === 'number');
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return [1, 2];
};

export const saveCompletedSessions = (sessions: number[]): void => {
  try {
    window.localStorage.setItem(
      COMPLETED_SESSIONS_STORAGE_KEY,
      JSON.stringify(sessions)
    );
  } catch {
    // Ignore storage errors
  }
};

export const loadInitialTheme = (): ThemeMode => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'dark';
};

export const saveTheme = (themeMode: ThemeMode): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  } catch {
    // Ignore storage errors
  }
};

export const loadInitialLanguage = (): Language => {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'de' || saved === 'ru') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'en';
};

export const saveLanguage = (lang: Language): void => {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage errors
  }
};

export const loadInitialAgeBand = (): AgeBandId => {
  try {
    const saved = window.localStorage.getItem(AGE_STORAGE_KEY) as AgeBandId | null;
    if (saved && VALID_AGE_BANDS.includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'u16';
};

export const saveAgeBand = (ageBand: AgeBandId): void => {
  try {
    window.localStorage.setItem(AGE_STORAGE_KEY, ageBand);
  } catch {
    // Ignore storage errors
  }
};

export const loadInitialActiveModule = (): ActiveModuleId => {
  try {
    const saved = window.localStorage.getItem(
      ACTIVE_MODULE_STORAGE_KEY
    ) as ActiveModuleId | null;
    if (saved && VALID_ACTIVE_MODULES.includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'rondo-series';
};

export const saveActiveModule = (moduleId: ActiveModuleId): void => {
  try {
    window.localStorage.setItem(ACTIVE_MODULE_STORAGE_KEY, moduleId);
  } catch {
    // Ignore storage errors
  }
};

