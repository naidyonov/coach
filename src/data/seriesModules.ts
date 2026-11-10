import { ActiveModuleId, Language } from '../i18n/types';

export interface TrainingSeriesModule {
  id: string;
  code: string;
  shortStep: string;
  duration: string;
  title: string;
  subtitle: string;
  active: boolean;
  badge: string;
}

const SERIES_TRANSLATIONS: Record<
  Language,
  {
    headerTitle: string;
    sessionBarLabel: string;
    activeRondoName: string;
    activeActivationName: string;
    moreSoon: string;
    modules: TrainingSeriesModule[];
  }
> = {
  en: {
    headerTitle: 'Training Session Blocks (90 Min)',
    sessionBarLabel: 'Training Session Flow:',
    activeRondoName: '2. Rondo',
    activeActivationName: '1. Activation',
    moreSoon: 'Blocks 3 & 4 coming soon.',
    modules: [
      {
        id: 'activation-series',
        code: '01',
        shortStep: '1. Activation',
        duration: '15m',
        title: '1. Activation (Warm-Up)',
        subtitle: '15 min • Progressive 3-phase warm-up grouped by 6 coaching rubrics',
        active: true,
        badge: 'Block 1',
      },
      {
        id: 'rondo-series',
        code: '02',
        shortStep: '2. Rondo',
        duration: '15–20m',
        title: '2. Rondo',
        subtitle: '15–20 min • 3v1 → 8v4 progressions • La Masia basis & m²/player math',
        active: true,
        badge: 'Block 2',
      },
      {
        id: 'positional-play',
        code: '03',
        shortStep: '3. Positional Play',
        duration: '25m',
        title: '3. Positional Play',
        subtitle: '25 min • Half-spaces, passing diamonds & numerical overloads',
        active: false,
        badge: 'Soon',
      },
      {
        id: 'game-series',
        code: '04',
        shortStep: '4. Final Game',
        duration: '30m',
        title: '4. Final Game',
        subtitle: '30 min • 7v7 / 9v9 / 11v11 with tactical bonus rules',
        active: false,
        badge: 'Soon',
      },
    ],
  },
  de: {
    headerTitle: 'Trainingsblöcke (90 Min.)',
    sessionBarLabel: 'Trainingsaufbau:',
    activeRondoName: '2. Rondo',
    activeActivationName: '1. Einstieg',
    moreSoon: 'Blöcke 3 & 4 folgen in Kürze.',
    modules: [
      {
        id: 'activation-series',
        code: '01',
        shortStep: '1. Einstieg',
        duration: '15m',
        title: '1. Einstieg (Aufwärmen)',
        subtitle: '15 Min. • Progressives 3-Phasen-Aufwärmen nach 6 Rubriken geordnet',
        active: true,
        badge: 'Block 1',
      },
      {
        id: 'rondo-series',
        code: '02',
        shortStep: '2. Rondo',
        duration: '15–20m',
        title: '2. Rondo',
        subtitle: '15–20 Min. • 3gg1 → 8gg4 Progressionen • La-Masia-Basis & m²/Spieler',
        active: true,
        badge: 'Block 2',
      },
      {
        id: 'positional-play',
        code: '03',
        shortStep: '3. Spielformen',
        duration: '25m',
        title: '3. Positionsspiel & Spielformen',
        subtitle: '25 Min. • Halbräume, Rautenbildung & Überzahl schaffen',
        active: false,
        badge: 'Bald',
      },
      {
        id: 'game-series',
        code: '04',
        shortStep: '4. Abschlussspiel',
        duration: '30m',
        title: '4. Abschlussspiel',
        subtitle: '30 Min. • 7gg7 / 9gg9 / 11gg11 mit taktischen Bonusregeln',
        active: false,
        badge: 'Bald',
      },
    ],
  },
  ru: {
    headerTitle: 'Блоки тренировки (90 мин)',
    sessionBarLabel: 'Структура тренировки:',
    activeRondoName: '2. Рондо',
    activeActivationName: '1. Активация',
    moreSoon: 'Блоки 3 и 4 скоро появятся.',
    modules: [
      {
        id: 'activation-series',
        code: '01',
        shortStep: '1. Активация',
        duration: '15м',
        title: '1. Активация (Разминка)',
        subtitle: '15 мин • 16 упражнений с прогрессией из 3 фаз по 6 футбольным рубрикам',
        active: true,
        badge: 'Блок 1',
      },
      {
        id: 'rondo-series',
        code: '02',
        shortStep: '2. Рондо',
        duration: '15–20м',
        title: '2. Рондо',
        subtitle: '15–20 мин • Прогрессии 3v1 → 8v4 • Базис Ла Масии и м²/игрока',
        active: true,
        badge: 'Блок 2',
      },
      {
        id: 'positional-play',
        code: '03',
        shortStep: '3. Игровые формы',
        duration: '25м',
        title: '3. Позиционные и игровые упражнения',
        subtitle: '25 мин • Полуфланги, ромбы и создание численного большинства',
        active: false,
        badge: 'Скоро',
      },
      {
        id: 'game-series',
        code: '04',
        shortStep: '4. Игра',
        duration: '30м',
        title: '4. Финальная игра',
        subtitle: '30 мин • 7v7 / 9v9 / 11v11 с тактическими заданиями по теме',
        active: false,
        badge: 'Скоро',
      },
    ],
  },
};

export const getSeriesHubData = (lang: Language, activeModule: ActiveModuleId = 'rondo-series') => {
  const base = SERIES_TRANSLATIONS[lang];
  return {
    ...base,
    activeRondoName:
      activeModule === 'activation-series'
        ? base.activeActivationName
        : base.activeRondoName,
  };
};

