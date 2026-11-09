import { Language } from '../i18n/types';

export interface TrainingSeriesModule {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  active: boolean;
  badge: string;
}

const SERIES_TRANSLATIONS: Record<
  Language,
  {
    headerTitle: string;
    activeRondoName: string;
    moreSoon: string;
    modules: TrainingSeriesModule[];
  }
> = {
  en: {
    headerTitle: 'Training Modules',
    activeRondoName: 'Rondo',
    moreSoon: 'More modules coming soon.',
    modules: [
      {
        id: 'rondo-series',
        code: '01',
        title: 'Rondo',
        subtitle: '3v1 → 8v4 progressions • La Masia basis & m²/player math',
        active: true,
        badge: 'Active',
      },
      {
        id: 'positional-play',
        code: '02',
        title: 'Positional Play',
        subtitle: 'Half-spaces, diamonds & numerical overloads',
        active: false,
        badge: 'Soon',
      },
      {
        id: 'pressing-transitions',
        code: '03',
        title: 'Pressing & Transitions',
        subtitle: 'Counter-pressing (6-sec rule), touchline traps & high block',
        active: false,
        badge: 'Soon',
      },
      {
        id: 'finishing-box',
        code: '04',
        title: 'Finishing & Box Entries',
        subtitle: 'Breaking low blocks, cutbacks & blind-side box runs',
        active: false,
        badge: 'Soon',
      },
    ],
  },
  de: {
    headerTitle: 'Trainingsmodule',
    activeRondoName: 'Rondo',
    moreSoon: 'Weitere Module folgen in Kürze.',
    modules: [
      {
        id: 'rondo-series',
        code: '01',
        title: 'Rondo',
        subtitle: '3v1 → 8v4 Progressionen • La-Masia-Basis & m²/Spieler',
        active: true,
        badge: 'Aktiv',
      },
      {
        id: 'positional-play',
        code: '02',
        title: 'Positionsspiel',
        subtitle: 'Halbräume, Rautenbildung & Überzahl schaffen',
        active: false,
        badge: 'Bald',
      },
      {
        id: 'pressing-transitions',
        code: '03',
        title: 'Pressing & Umschaltspiel',
        subtitle: 'Gegenpressing (6-Sek.-Regel), Pressingfallen & Angriffspressing',
        active: false,
        badge: 'Bald',
      },
      {
        id: 'finishing-box',
        code: '04',
        title: 'Torabschluss & Strafraum',
        subtitle: 'Tiefe Blöcke knacken, Cutbacks & Blind-Side-Läufe',
        active: false,
        badge: 'Bald',
      },
    ],
  },
  ru: {
    headerTitle: 'Тренерские модули',
    activeRondoName: 'Рондо',
    moreSoon: 'Новые модули скоро появятся.',
    modules: [
      {
        id: 'rondo-series',
        code: '01',
        title: 'Рондо',
        subtitle: 'Прогрессии 3v1 → 8v4 • Базис Ла Масии и м²/игрока',
        active: true,
        badge: 'Активно',
      },
      {
        id: 'positional-play',
        code: '02',
        title: 'Позиционная игра',
        subtitle: 'Полуфланги, ромбы и численный перевес',
        active: false,
        badge: 'Скоро',
      },
      {
        id: 'pressing-transitions',
        code: '03',
        title: 'Прессинг и Переходы',
        subtitle: 'Контрпрессинг (правило 6 сек), ловушки на флангах и высокий блок',
        active: false,
        badge: 'Скоро',
      },
      {
        id: 'finishing-box',
        code: '04',
        title: 'Завершение и Штрафная',
        subtitle: 'Вскрытие низкого блока, прострелы и врывания в слепую зону',
        active: false,
        badge: 'Скоро',
      },
    ],
  },
};

export const getSeriesHubData = (lang: Language) => SERIES_TRANSLATIONS[lang];
