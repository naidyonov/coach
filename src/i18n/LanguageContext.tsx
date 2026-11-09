import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AgeBandId,
  CategoryItem,
  Language,
  MonthlySessionItem,
  RondoItem,
  UIStrings
} from './types';
import {
  CATEGORIES_RU,
  RONDOS_RU,
  UI_RU,
  generateMonthlyPlanRu,
  getSquadOrganizationAdviceRu
} from './ru';
import {
  CATEGORIES_EN,
  RONDOS_EN,
  UI_EN,
  generateMonthlyPlanEn,
  getSquadOrganizationAdviceEn
} from './en';
import {
  CATEGORIES_DE,
  RONDOS_DE,
  UI_DE,
  generateMonthlyPlanDe,
  getSquadOrganizationAdviceDe
} from './de';
import {
  AGE_BANDS_DE,
  AGE_BANDS_EN,
  AGE_BANDS_RU,
  AgeBandInfo,
  RONDO_AGE_MATRIX_DE,
  RONDO_AGE_MATRIX_EN,
  RONDO_AGE_MATRIX_RU,
  RONDO_METHODOLOGY_DE,
  RONDO_METHODOLOGY_EN,
  RONDO_METHODOLOGY_RU,
  RondoAgeVariant,
  RondoMethodologicalBasis,
} from './ageMethodologyData';

const STORAGE_KEY = 'coach_app_lang';
const AGE_STORAGE_KEY = 'coach_age_band';

const VALID_AGE_BANDS: AgeBandId[] = ['u10', 'u12', 'u14', 'u16', 'u18_pro'];

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  ageBand: AgeBandId;
  setAgeBand: (age: AgeBandId) => void;
  ageBands: AgeBandInfo[];
  currentAgeBandInfo: AgeBandInfo;
  getRondoMethodology: (rondoId: string) => RondoMethodologicalBasis;
  getRondoAgeVariant: (rondoId: string, ageOverride?: AgeBandId) => RondoAgeVariant;
  t: UIStrings;
  categories: CategoryItem[];
  rondos: RondoItem[];
  generateMonthlyPlan: (rondo: RondoItem) => MonthlySessionItem[];
  getSquadOrganizationAdvice: (count: number, rondo: RondoItem) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'de' || saved === 'ru') {
      return saved;
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
  return 'en';
};

const getInitialAgeBand = (): AgeBandId => {
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);
  const [ageBand, setAgeBandState] = useState<AgeBandId>(getInitialAgeBand);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const setAgeBand = (newAge: AgeBandId) => {
    setAgeBandState(newAge);
    try {
      window.localStorage.setItem(AGE_STORAGE_KEY, newAge);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'de' : lang === 'de' ? 'ru' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const bands =
      lang === 'ru' ? AGE_BANDS_RU : lang === 'de' ? AGE_BANDS_DE : AGE_BANDS_EN;
    const currentAgeBandInfo =
      bands.find((b) => b.id === ageBand) || bands[3]; // fallback to u16
    const methodologyMap =
      lang === 'ru'
        ? RONDO_METHODOLOGY_RU
        : lang === 'de'
        ? RONDO_METHODOLOGY_DE
        : RONDO_METHODOLOGY_EN;
    const ageMatrix =
      lang === 'ru'
        ? RONDO_AGE_MATRIX_RU
        : lang === 'de'
        ? RONDO_AGE_MATRIX_DE
        : RONDO_AGE_MATRIX_EN;

    return {
      lang,
      setLang,
      toggleLang,
      ageBand,
      setAgeBand,
      ageBands: bands,
      currentAgeBandInfo,
      getRondoMethodology: (rondoId: string) =>
        methodologyMap[rondoId] || methodologyMap['rondo-1'],
      getRondoAgeVariant: (rondoId: string, ageOverride?: AgeBandId) => {
        const targetAge = ageOverride || ageBand;
        const drillVariants = ageMatrix[rondoId] || ageMatrix['rondo-1'];
        return drillVariants[targetAge] || drillVariants['u16'];
      },
      t: lang === 'ru' ? UI_RU : lang === 'de' ? UI_DE : UI_EN,
      categories:
        lang === 'ru' ? CATEGORIES_RU : lang === 'de' ? CATEGORIES_DE : CATEGORIES_EN,
      rondos: lang === 'ru' ? RONDOS_RU : lang === 'de' ? RONDOS_DE : RONDOS_EN,
      generateMonthlyPlan: (rondo: RondoItem) => {
        const variant =
          (ageMatrix[rondo.id] || ageMatrix['rondo-1'])[ageBand] ||
          (ageMatrix[rondo.id] || ageMatrix['rondo-1'])['u16'];
        return lang === 'ru'
          ? generateMonthlyPlanRu(rondo, variant)
          : lang === 'de'
          ? generateMonthlyPlanDe(rondo, variant)
          : generateMonthlyPlanEn(rondo, variant);
      },
      getSquadOrganizationAdvice:
        lang === 'ru'
          ? getSquadOrganizationAdviceRu
          : lang === 'de'
          ? getSquadOrganizationAdviceDe
          : getSquadOrganizationAdviceEn
    };
  }, [lang, ageBand]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

