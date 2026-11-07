import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Globe,
  Layers,
  Printer,
  Timer,
  Users,
} from 'lucide-react';
import { CategoryId, RoleMode } from './i18n/types';
import { useLanguage } from './i18n/LanguageContext';
import { CatalogView } from './components/CatalogView';
import { MonthlyPlanView } from './components/MonthlyPlanView';
import { MethodologyView } from './components/MethodologyView';
import { PitchTimerView } from './components/PitchTimerView';
import { PrintCardModal } from './components/PrintCardModal';

type ActiveTab = 'catalog' | 'monthly' | 'methodology' | 'timer';

const COMPLETED_SESSIONS_STORAGE_KEY = 'coach_completed_sessions';

const loadCompletedSessions = (): number[] => {
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

export function App() {
  const { lang, setLang, t, rondos } = useLanguage();

  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedRondoId, setSelectedRondoId] = useState<string>('rondo-1');
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [roleMode, setRoleMode] = useState<RoleMode>('coach');

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
    try {
      window.localStorage.setItem(
        COMPLETED_SESSIONS_STORAGE_KEY,
        JSON.stringify(completedSessions)
      );
    } catch {
      // Ignore storage errors
    }
  }, [completedSessions]);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-24 md:pb-12">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col gap-3">
          {/* Top Row: Brand Title + Language & Role Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-600/20 font-black text-base sm:text-lg tracking-tighter text-white shrink-0">
                U15
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t.header.moduleBadge}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {t.header.ageBadge}
                  </span>
                </div>
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-tight mt-0.5 truncate">
                  {t.header.title}
                </h1>
              </div>
            </div>

            {/* Right Controls: Audience Role Switcher + Bilingual Language Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Role Mode Switcher */}
              <div
                className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800"
                data-testid="role-switcher"
              >
                <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 px-2">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  {t.header.roleSwitcherLabel}
                </span>
                {(['coach', 'players', 'parents'] as RoleMode[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleMode(role)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      roleMode === role
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.header.roles[role]}
                  </button>
                ))}
              </div>

              {/* Language Switcher (EN | RU) */}
              <div
                className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800"
                data-testid="lang-switcher"
                title={t.header.langToggleTitle}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400 ml-1.5 mr-1 hidden sm:inline" />
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  aria-label="Switch language to English"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    lang === 'en'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ru')}
                  aria-label="Switch language to Russian"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    lang === 'ru'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RU
                </button>
              </div>
            </div>
          </div>

          {/* Second Row: Role Banner + Desktop Main Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pt-2 border-t border-slate-800/70">
            <p className="text-xs text-slate-400 leading-snug">
              <span className="font-bold text-emerald-400 uppercase mr-1.5">
                [{t.header.roles[roleMode]}]
              </span>
              {t.header.roleDescriptions[roleMode]}
            </p>

            {/* Desktop Navigation Tabs */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0"
            >
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {t.nav.catalog}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monthly')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                {t.nav.monthly}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('methodology')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'methodology'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                {t.nav.methodology}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('timer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'timer'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                {t.nav.timer}
              </button>

              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                title={t.nav.printCardTooltip}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                {t.nav.printCard}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6">
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
            roleMode={roleMode}
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

      {/* Mobile Thumb-Friendly Bottom Navigation Bar */}
      <nav
        aria-label="Mobile bottom navigation"
        data-testid="mobile-bottom-nav"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 shadow-2xl"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              activeTab === 'catalog'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.catalogShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('monthly')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              activeTab === 'monthly'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.monthlyShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('methodology')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              activeTab === 'methodology'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.methodologyShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
              activeTab === 'timer'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Timer className="w-4 h-4 mb-0.5" />
            <span className="truncate max-w-full">{t.nav.timerShort}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold text-emerald-300 bg-slate-800/80 border border-emerald-500/20"
          >
            <Printer className="w-4 h-4 mb-0.5" />
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
