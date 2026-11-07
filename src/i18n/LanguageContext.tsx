import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
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

const STORAGE_KEY = 'coach_app_lang';

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
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
    if (saved === 'en' || saved === 'ru') {
      return saved;
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ru' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const isRu = lang === 'ru';
    return {
      lang,
      setLang,
      toggleLang,
      t: isRu ? UI_RU : UI_EN,
      categories: isRu ? CATEGORIES_RU : CATEGORIES_EN,
      rondos: isRu ? RONDOS_RU : RONDOS_EN,
      generateMonthlyPlan: isRu ? generateMonthlyPlanRu : generateMonthlyPlanEn,
      getSquadOrganizationAdvice: isRu ? getSquadOrganizationAdviceRu : getSquadOrganizationAdviceEn
    };
  }, [lang]);

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
