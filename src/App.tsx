import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Compass,
  Globe,
  Layers,
  Moon,
  Printer,
  Sparkles,
  Sun,
  Timer,
} from 'lucide-react';
import { CategoryId } from './i18n/types';
import { useLanguage } from './i18n/LanguageContext';
import { CatalogView } from './components/CatalogView';
import { MonthlyPlanView } from './components/MonthlyPlanView';
import { MethodologyView } from './components/MethodologyView';
import { PitchTimerView } from './components/PitchTimerView';
import { PrintCardModal } from './components/PrintCardModal';
import {
  loadCompletedSessions,
  loadInitialTheme,
  saveCompletedSessions,
  saveTheme,
  ThemeMode,
} from './domain/sessionStorage';
import { getSeriesHubData } from './data/seriesModules';

type ActiveTab = 'catalog' | 'monthly' | 'methodology' | 'timer';
export type { ThemeMode };

export function App() {
  const {
    lang,
    setLang,
    activeModule,
    setActiveModule,
    ageBand,
    setAgeBand,
    ageBands,
    currentAgeBandInfo,
    t,
    rondos,
  } = useLanguage();

  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedRondoId, setSelectedRondoId] = useState<string>('rondo-1');
  const [phaseIndex, setPhaseIndex] = useState<number>(0);

  // Theme Mode (Dark / Light)
  const [themeMode, setThemeMode] = useState<ThemeMode>(loadInitialTheme);

  // Header Popovers: Series Hub & Settings Dropdown
  const [isSeriesMenuOpen, setIsSeriesMenuOpen] = useState<boolean>(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState<boolean>(false);

  const seriesMenuRef = useRef<HTMLDivElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  // Tactical board layer toggles
  const [showPasses, setShowPasses] = useState<boolean>(true);
  const [showMovements, setShowMovements] = useState<boolean>(true);
  const [showShadows, setShowShadows] = useState<boolean>(true);

  // Print card modal
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Squad attendance calculator
  const [teamPlayersCount, setTeamPlayersCount] = useState<number>(16);

  // Monthly session completion tracker
  const [completedSessions, setCompletedSessions] = useState<number[]>(
    loadCompletedSessions
  );

  useEffect(() => {
    saveCompletedSessions(completedSessions);
  }, [completedSessions]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    saveTheme(themeMode);
  }, [themeMode]);

  // Close popovers when clicking outside or pressing Escape
  useEffect(() => {
    const handlePointerDownOutside = (e: MouseEvent) => {
      if (
        seriesMenuRef.current &&
        !seriesMenuRef.current.contains(e.target as Node)
      ) {
        setIsSeriesMenuOpen(false);
      }
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(e.target as Node)
      ) {
        setIsSettingsMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSeriesMenuOpen(false);
        setIsSettingsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedRondo =
    rondos.find((r) => r.id === selectedRondoId) || rondos[0];

  const handleSelectRondoId = (id: string) => {
    setSelectedRondoId(id);
    setPhaseIndex(0);
  };

  const handleSelectCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    const filtered =
      cat === 'all' ? rondos : rondos.filter((r) => r.category === cat);
    if (filtered.length > 0 && !filtered.some((r) => r.id === selectedRondoId)) {
      setSelectedRondoId(filtered[0].id);
      setPhaseIndex(0);
    }
  };

  const toggleSessionComplete = (sessionNum: number) => {
    setCompletedSessions((prev) =>
      prev.includes(sessionNum)
        ? prev.filter((s) => s !== sessionNum)
        : [...prev, sessionNum]
    );
  };

  const tr = (enText: string, deText: string, ruText: string) =>
    lang === 'ru' ? ruText : lang === 'de' ? deText : enText;

  const seriesHub = getSeriesHubData(lang, activeModule);
  const trainingSeriesModules = seriesHub.modules;

  return (
    <div
      data-theme={themeMode}
      className="app-shell min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-28 md:pb-12"
    >
      {/* Clean Single-Row Sticky Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* LEFT: Active Training Series Switcher */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-600/20 text-white keep-white shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            {/* Series Switcher Dropdown */}
            <div className="relative min-w-0" ref={seriesMenuRef}>
              <button
                type="button"
                data-testid="series-switcher-btn"
                onClick={() => {
                  setIsSeriesMenuOpen((v) => !v);
                  setIsSettingsMenuOpen(false);
                }}
                className="group flex items-center gap-1.5 text-left max-w-full cursor-pointer focus:outline-none py-1"
                title={t.header.title}
              >
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                  {seriesHub.activeRondoName}
                </h1>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-800 group-hover:bg-slate-700 text-emerald-400 transition shrink-0">
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSeriesMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>

              {/* Accessible visually-hidden full title for screen readers & SEO */}
              <span className="sr-only">{t.header.title}</span>

              {/* Training Series Hub Popover */}
              {isSeriesMenuOpen && (
                <div
                  data-testid="series-switcher-popover"
                  className="absolute left-0 mt-2 w-72 sm:w-88 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50 space-y-2"
                >
                  <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                      <Compass className="w-3.5 h-3.5" />
                      <span>
                        {tr(
                          'Training Modules',
                          'Trainingsmodule',
                          'Тренерские модули'
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {trainingSeriesModules.map((mod) => {
                      const isCurrent = mod.id === activeModule;
                      return (
                        <div
                          key={mod.id}
                          data-testid={`series-module-${mod.id}`}
                          onClick={() => {
                            if (mod.active) {
                              if (
                                mod.id === 'rondo-series' ||
                                mod.id === 'activation-series'
                              ) {
                                setActiveModule(mod.id);
                                setSelectedCategory('all');
                                setSelectedRondoId(
                                  mod.id === 'activation-series' ? 'act-1' : 'rondo-1'
                                );
                                setPhaseIndex(0);
                              }
                              setIsSeriesMenuOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-emerald-950/30 border-emerald-500/50 cursor-pointer'
                              : mod.active
                              ? 'bg-slate-950/90 border-slate-700 hover:border-emerald-500/40 cursor-pointer'
                              : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              {isCurrent && (
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              )}
                              {mod.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isCurrent
                                  ? 'bg-emerald-500 text-slate-950'
                                  : mod.active
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {mod.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {mod.subtitle}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-2 pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {tr(
                        'More modules coming soon.',
                        'Weitere Module folgen in Kürze.',
                        'Новые модули скоро появятся.'
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Desktop Main Navigation Tabs */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0"
          >
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-emerald-600 text-white keep-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.nav.catalog}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('monthly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-emerald-600 text-white keep-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.monthly}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'methodology'
                  ? 'bg-emerald-600 text-white keep-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.nav.methodology}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('timer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'timer'
                  ? 'bg-emerald-600 text-white keep-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{t.nav.timer}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              title={t.nav.printCardTooltip}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">{t.nav.printCard}</span>
            </button>
          </nav>

          {/* RIGHT: Settings Dropdown Menu (Age Band + Theme Dark/Light + Language EN/DE/RU) */}
          <div className="relative flex items-center gap-2 shrink-0" ref={settingsMenuRef}>
            <button
              type="button"
              data-testid="settings-menu-btn"
              onClick={() => {
                setIsSettingsMenuOpen((v) => !v);
                setIsSeriesMenuOpen(false);
              }}
              aria-expanded={isSettingsMenuOpen}
              aria-label={tr('Interface settings', 'Einstellungen', 'Настройки интерфейса')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition cursor-pointer"
            >
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px]">
                {currentAgeBandInfo.shortLabel}
              </span>
              {themeMode === 'light' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="uppercase font-bold">{lang}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isSettingsMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Panel */}
            <div
              data-testid="settings-dropdown-panel"
              className={`absolute right-0 top-full mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-3.5 z-50 space-y-3.5 transition-all ${
                isSettingsMenuOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-1 pointer-events-none'
              }`}
            >
              {/* Age Group Selector inside Settings Menu */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{tr('Age Group', 'Altersklasse', 'Возраст')}</span>
                  <span className="text-emerald-400 font-semibold">
                    {currentAgeBandInfo.ageYears}
                  </span>
                </div>
                <div
                  data-testid="settings-age-switcher"
                  className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
                >
                  {ageBands.map((band) => (
                    <button
                      key={band.id}
                      type="button"
                      data-testid={`age-pill-${band.id}`}
                      onClick={() => setAgeBand(band.id)}
                      className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate ${
                        ageBand === band.id
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {band.shortLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Switcher Section */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{tr('Appearance', 'Darstellung', 'Тема')}</span>
                  <span>{themeMode === 'light' ? '☀️' : '🌙'}</span>
                </div>
                <div
                  data-testid="theme-switcher"
                  className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() => setThemeMode('dark')}
                    aria-label="Switch to Dark theme"
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>{tr('Dark', 'Dunkel', 'Тёмная')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeMode('light')}
                    aria-label="Switch to Light theme"
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{tr('Light', 'Hell', 'Светлая')}</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher Section (EN / DE / RU) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    {tr('Language', 'Sprache', 'Язык')}
                  </span>
                </div>
                <div
                  data-testid="lang-switcher"
                  title={t.header.langToggleTitle}
                  className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    aria-label="Switch language to English"
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      lang === 'en'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('de')}
                    aria-label="Switch language to German"
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      lang === 'de'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('ru')}
                    aria-label="Switch language to Russian"
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      lang === 'ru'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    RU
                  </button>
                </div>
              </div>

              {/* Quick Print Action inside Settings Menu as well */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsSettingsMenuOpen(false);
                    setShowPrintModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.nav.printCard}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-3.5 sm:py-5">
        {activeTab === 'catalog' && (
          <CatalogView
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedRondo={selectedRondo}
            onSelectRondoId={handleSelectRondoId}
            phaseIndex={phaseIndex}
            onPhaseChange={setPhaseIndex}
            showPasses={showPasses}
            onTogglePasses={() => setShowPasses((v) => !v)}
            showMovements={showMovements}
            onToggleMovements={() => setShowMovements((v) => !v)}
            showShadows={showShadows}
            onToggleShadows={() => setShowShadows((v) => !v)}
            teamPlayersCount={teamPlayersCount}
            onChangeTeamPlayersCount={setTeamPlayersCount}
            onOpenMonthlyPlan={() => setActiveTab('monthly')}
            onOpenTimerForRondo={() => setActiveTab('timer')}
          />
        )}

        {activeTab === 'monthly' && (
          <MonthlyPlanView
            selectedRondo={selectedRondo}
            onSelectRondoId={handleSelectRondoId}
            completedSessions={completedSessions}
            onToggleSessionComplete={toggleSessionComplete}
          />
        )}

        {activeTab === 'methodology' && (
          <MethodologyView
            onSelectRondoAndOpenCatalog={(id) => {
              handleSelectRondoId(id);
              setActiveTab('catalog');
            }}
          />
        )}

        {activeTab === 'timer' && (
          <PitchTimerView selectedRondo={selectedRondo} />
        )}
      </main>

      {/* Mobile Floating Dock Navigation (inset from rounded screen corners & bottom gesture bar) */}
      <nav
        aria-label="Mobile bottom navigation"
        data-testid="mobile-bottom-nav"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-1"
      >
        <div className="pointer-events-auto max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl shadow-black/60 grid grid-cols-5 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.catalogShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('monthly')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              activeTab === 'monthly'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.monthlyShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('methodology')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.methodologyShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              activeTab === 'timer'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Timer className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.timerShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold text-slate-400 hover:text-emerald-300 border border-transparent transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 mb-0.5 text-emerald-400" />
            <span className="truncate max-w-full">{t.nav.printCardShort}</span>
          </button>
        </div>
      </nav>

      {/* Print Card Modal */}
      <PrintCardModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        selectedRondo={selectedRondo}
        phaseIndex={phaseIndex}
      />
    </div>
  );
}
export default App;

