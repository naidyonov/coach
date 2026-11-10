import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ActiveModuleId,
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
  ACTIVATION_AGE_MATRIX_DE,
  ACTIVATION_AGE_MATRIX_EN,
  ACTIVATION_AGE_MATRIX_RU,
  ACTIVATION_CATEGORIES_DE,
  ACTIVATION_CATEGORIES_EN,
  ACTIVATION_CATEGORIES_RU,
  ACTIVATION_METHODOLOGY_DE,
  ACTIVATION_METHODOLOGY_EN,
  ACTIVATION_METHODOLOGY_RU,
  ACTIVATIONS_DE,
  ACTIVATIONS_EN,
  ACTIVATIONS_RU,
  UI_ACTIVATION_DE,
  UI_ACTIVATION_EN,
  UI_ACTIVATION_RU,
  generateActivationMonthlyPlanDe,
  generateActivationMonthlyPlanEn,
  generateActivationMonthlyPlanRu,
  getActivationSquadAdviceDe,
  getActivationSquadAdviceEn,
  getActivationSquadAdviceRu,
} from './activationData';
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

import {
  loadInitialActiveModule,
  loadInitialAgeBand,
  loadInitialLanguage,
  saveActiveModule,
  saveAgeBand,
  saveLanguage,
} from '../domain/sessionStorage';

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  activeModule: ActiveModuleId;
  setActiveModule: (moduleId: ActiveModuleId) => void;
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(loadInitialLanguage);
  const [ageBand, setAgeBandState] = useState<AgeBandId>(loadInitialAgeBand);
  const [activeModule, setActiveModuleState] = useState<ActiveModuleId>(
    loadInitialActiveModule
  );

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveLanguage(newLang);
  };

  const setAgeBand = (newAge: AgeBandId) => {
    setAgeBandState(newAge);
    saveAgeBand(newAge);
  };

  const setActiveModule = (newModule: ActiveModuleId) => {
    setActiveModuleState(newModule);
    saveActiveModule(newModule);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'de' : lang === 'de' ? 'ru' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const isActivation = activeModule === 'activation-series';

    const bands =
      lang === 'ru' ? AGE_BANDS_RU : lang === 'de' ? AGE_BANDS_DE : AGE_BANDS_EN;
    const currentAgeBandInfo =
      bands.find((b) => b.id === ageBand) || bands[3]; // fallback to u16

    const rondoMethodologyMap =
      lang === 'ru'
        ? RONDO_METHODOLOGY_RU
        : lang === 'de'
        ? RONDO_METHODOLOGY_DE
        : RONDO_METHODOLOGY_EN;
    const activationMethodologyMap =
      lang === 'ru'
        ? ACTIVATION_METHODOLOGY_RU
        : lang === 'de'
        ? ACTIVATION_METHODOLOGY_DE
        : ACTIVATION_METHODOLOGY_EN;

    const rondoAgeMatrix =
      lang === 'ru'
        ? RONDO_AGE_MATRIX_RU
        : lang === 'de'
        ? RONDO_AGE_MATRIX_DE
        : RONDO_AGE_MATRIX_EN;
    const activationAgeMatrix =
      lang === 'ru'
        ? ACTIVATION_AGE_MATRIX_RU
        : lang === 'de'
        ? ACTIVATION_AGE_MATRIX_DE
        : ACTIVATION_AGE_MATRIX_EN;

    const resolveMethodology = (drillId: string): RondoMethodologicalBasis => {
      if (drillId.startsWith('act-')) {
        return activationMethodologyMap[drillId] || activationMethodologyMap['act-1'];
      }
      return rondoMethodologyMap[drillId] || rondoMethodologyMap['rondo-1'];
    };

    const resolveAgeVariant = (drillId: string, ageOverride?: AgeBandId): RondoAgeVariant => {
      const targetAge = ageOverride || ageBand;
      if (drillId.startsWith('act-')) {
        const drillVariants = activationAgeMatrix[drillId] || activationAgeMatrix['act-1'];
        return drillVariants[targetAge] || drillVariants['u16'];
      }
      const drillVariants = rondoAgeMatrix[drillId] || rondoAgeMatrix['rondo-1'];
      return drillVariants[targetAge] || drillVariants['u16'];
    };

    const t = isActivation
      ? lang === 'ru'
        ? UI_ACTIVATION_RU
        : lang === 'de'
        ? UI_ACTIVATION_DE
        : UI_ACTIVATION_EN
      : lang === 'ru'
      ? UI_RU
      : lang === 'de'
      ? UI_DE
      : UI_EN;

    const categories = isActivation
      ? lang === 'ru'
        ? ACTIVATION_CATEGORIES_RU
        : lang === 'de'
        ? ACTIVATION_CATEGORIES_DE
        : ACTIVATION_CATEGORIES_EN
      : lang === 'ru'
      ? CATEGORIES_RU
      : lang === 'de'
      ? CATEGORIES_DE
      : CATEGORIES_EN;

    const rondos = isActivation
      ? lang === 'ru'
        ? ACTIVATIONS_RU
        : lang === 'de'
        ? ACTIVATIONS_DE
        : ACTIVATIONS_EN
      : lang === 'ru'
      ? RONDOS_RU
      : lang === 'de'
      ? RONDOS_DE
      : RONDOS_EN;

    return {
      lang,
      setLang,
      toggleLang,
      activeModule,
      setActiveModule,
      ageBand,
      setAgeBand,
      ageBands: bands,
      currentAgeBandInfo,
      getRondoMethodology: resolveMethodology,
      getRondoAgeVariant: resolveAgeVariant,
      t,
      categories,
      rondos,
      generateMonthlyPlan: (drill: RondoItem) => {
        const variant = resolveAgeVariant(drill.id);
        if (drill.id.startsWith('act-') || isActivation) {
          return lang === 'ru'
            ? generateActivationMonthlyPlanRu(drill, variant)
            : lang === 'de'
            ? generateActivationMonthlyPlanDe(drill, variant)
            : generateActivationMonthlyPlanEn(drill, variant);
        }
        return lang === 'ru'
          ? generateMonthlyPlanRu(drill, variant)
          : lang === 'de'
          ? generateMonthlyPlanDe(drill, variant)
          : generateMonthlyPlanEn(drill, variant);
      },
      getSquadOrganizationAdvice: (count: number, drill: RondoItem) => {
        if (drill.id.startsWith('act-') || isActivation) {
          return lang === 'ru'
            ? getActivationSquadAdviceRu(count, drill)
            : lang === 'de'
            ? getActivationSquadAdviceDe(count, drill)
            : getActivationSquadAdviceEn(count, drill);
        }
        return lang === 'ru'
          ? getSquadOrganizationAdviceRu(count, drill)
          : lang === 'de'
          ? getSquadOrganizationAdviceDe(count, drill)
          : getSquadOrganizationAdviceEn(count, drill);
      },
    };
  }, [lang, ageBand, activeModule]);

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


