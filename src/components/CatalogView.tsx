import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Maximize2,
  Clock,
  AlertTriangle,
  Target,
  Shield,
  Trophy,
  Layers,
  MessageSquare,
  Timer,
  GraduationCap,
  Microscope,
  Compass,
  Sparkles,
} from 'lucide-react';
import { CategoryId, RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';
import { TacticalPitchSVG } from './TacticalPitchSVG';

export interface CatalogViewProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  selectedRondo: RondoItem;
  onSelectRondoId: (id: string) => void;
  phaseIndex: number;
  onPhaseChange: (index: number) => void;
  showPasses: boolean;
  onTogglePasses: () => void;
  showMovements: boolean;
  onToggleMovements: () => void;
  showShadows: boolean;
  onToggleShadows: () => void;
  teamPlayersCount: number;
  onChangeTeamPlayersCount: (count: number) => void;
  onOpenMonthlyPlan: () => void;
  onOpenTimerForRondo?: () => void;
}

type DrillBriefTab = 'goals' | 'science' | 'cues' | 'squad';

export const CatalogView: React.FC<CatalogViewProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedRondo,
  onSelectRondoId,
  phaseIndex,
  onPhaseChange,
  showPasses,
  onTogglePasses,
  showMovements,
  onToggleMovements,
  showShadows,
  onToggleShadows,
  teamPlayersCount,
  onChangeTeamPlayersCount,
  onOpenMonthlyPlan,
  onOpenTimerForRondo,
}) => {
  const {
    lang,
    t,
    activeModule,
    ageBand,
    setAgeBand,
    ageBands,
    currentAgeBandInfo,
    getRondoMethodology,
    getRondoAgeVariant,
    categories,
    rondos,
    getSquadOrganizationAdvice,
  } = useLanguage();

  const [briefTab, setBriefTab] = useState<DrillBriefTab>('goals');
  const [isShowcaseExpanded, setIsShowcaseExpanded] = useState<boolean>(true);

  const isActivation = activeModule === 'activation-series';
  const categoryItems = categories.filter((c) => c.id !== 'all');

  // In Activation mode, order exercises by Rubric order so prev/next and showcase are always grouped logically
  const orderedRondos = isActivation
    ? categoryItems.flatMap((cat) =>
        rondos.filter((r) => r.category === cat.id)
      )
    : rondos;

  const currentRondoIdx = Math.max(
    0,
    orderedRondos.findIndex((r) => r.id === selectedRondo.id)
  );

  const handlePrevRondo = () => {
    if (orderedRondos.length === 0) return;
    const prevIdx =
      (currentRondoIdx - 1 + orderedRondos.length) % orderedRondos.length;
    onSelectRondoId(orderedRondos[prevIdx].id);
  };

  const handleNextRondo = () => {
    if (orderedRondos.length === 0) return;
    const nextIdx = (currentRondoIdx + 1) % orderedRondos.length;
    onSelectRondoId(orderedRondos[nextIdx].id);
  };

  const phases = selectedRondo.diagram.phases;
  const safePhaseIndex = Math.min(phaseIndex, phases.length - 1);
  const currentPhase = phases[safePhaseIndex] || phases[0];

  const handlePrevPhase = () => {
    onPhaseChange((safePhaseIndex - 1 + phases.length) % phases.length);
  };

  const handleNextPhase = () => {
    onPhaseChange((safePhaseIndex + 1) % phases.length);
  };

  const activeAgeVariant = getRondoAgeVariant(selectedRondo.id);
  const methodologyBasis = getRondoMethodology(selectedRondo.id);

  // Sibling exercises within the active rubric (for clean 2-4 pill switcher in Activation)
  const activeRubricRondos = isActivation
    ? rondos.filter((r) => r.category === selectedRondo.category)
    : rondos;

  // Rubrics to display in the Activation Rubric Showcase Grid
  const visibleRubrics =
    selectedCategory === 'all'
      ? categoryItems
      : categoryItems.filter((c) => c.id === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Drill Navigator: Rubric Showcase Grid (Activation) OR Compact Theme Stepper (Rondo) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3.5 shadow-sm space-y-2.5">
        {/* Category / Rubric Filter Pills */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center overflow-x-auto sm:flex-wrap gap-1.5 no-scrollbar flex-1">
            {isActivation && (
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>
                  {lang === 'ru'
                    ? `Все 6 рубрик (${rondos.length})`
                    : lang === 'de'
                    ? `Alle 6 Rubriken (${rondos.length})`
                    : `All 6 Rubrics (${rondos.length})`}
                </span>
              </button>
            )}

            {categoryItems.map((cat) => {
              const isActive = isActivation
                ? selectedCategory === cat.id ||
                  (selectedCategory === 'all' &&
                    selectedRondo.category === cat.id)
                : selectedRondo.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    isActive
                      ? `${cat.color} text-white keep-white border-white/20 shadow-sm`
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {isActivation && (
            <button
              type="button"
              data-testid="toggle-rubric-showcase-btn"
              onClick={() => setIsShowcaseExpanded((v) => !v)}
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-bold transition cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>
                {isShowcaseExpanded
                  ? lang === 'ru'
                    ? 'Свернуть витрину'
                    : lang === 'de'
                    ? 'Rubriken einklappen'
                    : 'Collapse Rubrics'
                  : lang === 'ru'
                  ? `Витрина по рубрикам (${rondos.length})`
                  : lang === 'de'
                  ? `Alle Rubriken zeigen (${rondos.length})`
                  : `Show Rubric Grid (${rondos.length})`}
              </span>
            </button>
          )}
        </div>

        {/* ACTIVATION RUBRIC SHOWCASE GRID (Grouped by 6 Rubrics with Section Headers & Cards) */}
        {isActivation && isShowcaseExpanded && (
          <div
            data-testid="activation-rubric-showcase"
            className="bg-slate-950/75 border border-slate-800/90 rounded-xl p-3 space-y-4"
          >
            {visibleRubrics.map((rubric, rubricIdx) => {
              const drillsInRubric = rondos.filter(
                (r) => r.category === rubric.id
              );
              if (drillsInRubric.length === 0) return null;
              return (
                <div key={rubric.id} className="space-y-2">
                  {/* Rubric Section Title */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${rubric.dot} shrink-0`}
                      />
                      <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                        {selectedCategory === 'all'
                          ? `${rubricIdx + 1}. ${rubric.name}`
                          : rubric.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      {drillsInRubric.length}{' '}
                      {lang === 'ru'
                        ? 'упр.'
                        : lang === 'de'
                        ? 'Übungen'
                        : 'drills'}
                    </span>
                  </div>

                  {/* Cards Grid inside Rubric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {drillsInRubric.map((drill) => {
                      const isCurrent = drill.id === selectedRondo.id;
                      const shortGrid = drill.dimensionsU15.base.split('(')[0].trim();
                      const shortPlayers = drill.playersCount.split('(')[0].trim();
                      return (
                        <button
                          key={drill.id}
                          type="button"
                          data-testid={`rubric-card-${drill.id}`}
                          onClick={() => onSelectRondoId(drill.id)}
                          className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-950/35 border-emerald-500 shadow-md shadow-emerald-950/50'
                              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <span
                                className={`text-xs font-extrabold leading-snug ${
                                  isCurrent ? 'text-emerald-300' : 'text-white'
                                }`}
                              >
                                {drill.shortTitle || drill.title}
                              </span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black shrink-0">
                                  {lang === 'ru'
                                    ? 'Открыто'
                                    : lang === 'de'
                                    ? 'Aktiv'
                                    : 'Active'}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                              {drill.title}
                            </p>
                          </div>

                          <div className="pt-1.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
                            <span className="text-slate-300 font-semibold truncate max-w-[65%]">
                              {shortGrid}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 font-bold border border-slate-800">
                              3 {lang === 'ru' ? 'фазы' : lang === 'de' ? 'Phasen' : 'phases'} • {shortPlayers}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Stepper Bar (In Activation: shows ONLY the 2-4 sibling drills of the current rubric without confusing numbers; In Rondo: shows 1.1 -> 5.2) */}
        <div
          data-testid="quick-rondo-stepper"
          className="bg-slate-950/80 border border-slate-800/80 rounded-xl px-2 py-1.5 flex items-center justify-between gap-1.5"
        >
          <button
            type="button"
            data-testid="prev-rondo-btn"
            onClick={handlePrevRondo}
            aria-label={
              lang === 'ru'
                ? 'Предыдущее рондо'
                : lang === 'de'
                ? 'Vorheriges Rondo'
                : 'Previous rondo'
            }
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
            {isActivation && (
              <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 px-1.5 shrink-0">
                {selectedRondo.categoryName}:
              </span>
            )}
            {activeRubricRondos.map((r) => {
              const isSelected = r.id === selectedRondo.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  data-testid={`quick-rondo-pill-${r.id}`}
                  onClick={() => onSelectRondoId(r.id)}
                  title={r.title}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {!isActivation && (
                    <span className="font-extrabold">
                      {t.catalog.numberPrefix}{r.number}
                    </span>
                  )}
                  <span
                    className={`${
                      isActivation
                        ? 'inline truncate max-w-[200px]'
                        : 'hidden xl:inline truncate max-w-[115px]'
                    } font-medium text-[11px] ${
                      isSelected ? 'text-slate-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {r.shortTitle || r.title}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            data-testid="next-rondo-btn"
            onClick={handleNextRondo}
            aria-label={
              lang === 'ru'
                ? 'Следующее рондо'
                : lang === 'de'
                ? 'Nächstes Rondo'
                : 'Next rondo'
            }
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Workspace: Left Tactical Stage (7 cols) + Right Coaching Brief (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (7 cols): Hero Drill Header + Interactive Pitch + Step-by-Step Phase Bar */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            {/* Selected Rondo / Activation Hero Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {!isActivation && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-xs font-black">
                      {t.catalog.numberPrefix}{selectedRondo.number}
                    </span>
                  )}
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${selectedRondo.badgeColor}`}
                  >
                    {selectedRondo.categoryName}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeAgeVariant.formatOverride || selectedRondo.playersCount}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedRondo.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onOpenTimerForRondo && (
                  <button
                    type="button"
                    data-testid="launch-rondo-timer-btn"
                    onClick={onOpenTimerForRondo}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>{t.nav.timerShort}</span>
                  </button>
                )}

                {!isActivation && (
                  <button
                    type="button"
                    onClick={onOpenMonthlyPlan}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white keep-white text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.catalog.openMonthlyPlanBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive SVG Tactical Board */}
            <TacticalPitchSVG
              rondo={selectedRondo}
              phaseIndex={safePhaseIndex}
              onPhaseChange={onPhaseChange}
              showPasses={showPasses}
              showMovements={showMovements}
              showShadows={showShadows}
            />

            {/* Step-by-Step Phase Animation Controls + Layer Toggles */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.catalog.stepByStepTitle}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevPhase}
                    title={t.catalog.prevPhase}
                    aria-label={t.catalog.prevPhase}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex flex-wrap items-center gap-1">
                    {phases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onPhaseChange(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          safePhaseIndex === idx
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {t.catalog.phaseLabel} {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPhase}
                    title={t.catalog.nextPhase}
                    aria-label={t.catalog.nextPhase}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mb-1">
                  {currentPhase.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentPhase.desc}
                </p>
              </div>

              {/* Board Layer Toggle Buttons */}
              <div className="pt-0.5 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium mr-1">
                  {t.catalog.boardLayersLabel}
                </span>

                <button
                  type="button"
                  onClick={onTogglePasses}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    showPasses
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {showPasses ? t.catalog.layerPassesOn : t.catalog.layerPassesOff}
                </button>

                <button
                  type="button"
                  onClick={onToggleMovements}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    showMovements
                      ? 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {showMovements
                    ? t.catalog.layerMovementsOn
                    : t.catalog.layerMovementsOff}
                </button>

                <button
                  type="button"
                  onClick={onToggleShadows}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    showShadows
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {showShadows ? t.catalog.layerShadowsOn : t.catalog.layerShadowsOff}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Dynamic Age-Adapted Metrics + 4-Tab Coaching & Scientific Brief */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Key Metrics Strip: Age-Adapted Pitch Size (with m²/player) & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <div className="flex items-center justify-between gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.catalog.pitchSizeLabel}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold text-[10px]">
                  {currentAgeBandInfo.shortLabel}
                </span>
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeAgeVariant.baseGrid}
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                {t.catalog.intensivePrefix} {activeAgeVariant.intensiveGrid}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <div className="flex items-center justify-between gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.catalog.dosageLabel}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold text-[10px]">
                  {activeAgeVariant.touchesRule}
                </span>
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeAgeVariant.timing}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.catalog.formatPrefix}{' '}
                {activeAgeVariant.formatOverride || selectedRondo.format}
              </div>
            </div>
          </div>

          {/* Universal Coaching Brief Tab Switcher */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
            <div
              data-testid="mobile-drill-subtabs"
              className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
            >
              <button
                type="button"
                onClick={() => setBriefTab('goals')}
                className={`py-2 px-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer truncate ${
                  briefTab === 'goals'
                    ? 'bg-emerald-600 text-white keep-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? 'Цели и счёт'
                  : lang === 'de'
                  ? 'Ziele & Punkte'
                  : 'Goals & Score'}
              </button>
              <button
                type="button"
                data-testid="scientific-basis-tab-btn"
                onClick={() => setBriefTab('science')}
                className={`py-2 px-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer truncate ${
                  briefTab === 'science'
                    ? 'bg-emerald-600 text-white keep-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? 'Базис (Наука)'
                  : lang === 'de'
                  ? 'Basis & Wissenschaft'
                  : 'Basis & Science'}
              </button>
              <button
                type="button"
                onClick={() => setBriefTab('cues')}
                className={`py-2 px-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer truncate ${
                  briefTab === 'cues'
                    ? 'bg-emerald-600 text-white keep-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? 'Подсказки (3)'
                  : lang === 'de'
                  ? 'Coaching & Stufen'
                  : 'Cues & Stages'}
              </button>
              <button
                type="button"
                onClick={() => setBriefTab('squad')}
                className={`py-2 px-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer truncate ${
                  briefTab === 'squad'
                    ? 'bg-emerald-600 text-white keep-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ru'
                  ? `Состав (${teamPlayersCount})`
                  : lang === 'de'
                  ? `Kader (${teamPlayersCount})`
                  : `Squad (${teamPlayersCount})`}
              </button>
            </div>

            {/* TAB 1: Age Pedagogical Focus, 3-Phase Progression (Activation), Game Problem, Attack/Defense Goals & Scoring Rules */}
            {briefTab === 'goals' && (
              <div className="space-y-3">
                {/* In Activation mode: Interactive 3-Phase Progression Ladder front-and-center */}
                {isActivation && (
                  <div
                    data-testid="activation-progression-ladder"
                    className="bg-slate-950/85 border border-emerald-500/40 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 shrink-0" />
                        <span>{t.catalog.progressionsTitle}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {lang === 'ru'
                          ? 'Нажмите фазу → на доску'
                          : lang === 'de'
                          ? 'Phase klicken → Board'
                          : 'Click phase → Board'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedRondo.progressions.map((prog, idx) => {
                        const isCurrPhase = safePhaseIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onPhaseChange(idx)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs leading-relaxed transition cursor-pointer ${
                              isCurrPhase
                                ? 'bg-emerald-950/40 border-emerald-500 shadow-sm'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span
                                className={`font-extrabold ${
                                  isCurrPhase ? 'text-emerald-300' : 'text-white'
                                }`}
                              >
                                {prog.level}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                  isCurrPhase
                                    ? 'bg-emerald-500 text-slate-950'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {t.catalog.phaseLabel} {idx + 1}
                              </span>
                            </div>
                            <span className="text-slate-300 block">
                              {prog.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Age-Specific Pedagogical Focus Banner */}
                <div
                  data-testid="age-coaching-focus-box"
                  className="bg-emerald-950/25 border border-emerald-800/50 rounded-xl p-3.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>
                        {currentAgeBandInfo.shortLabel} • {currentAgeBandInfo.stageTitle}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeAgeVariant.ageCoachingFocus}
                  </p>
                </div>

                {/* Problem in the Game */}
                <div className="bg-rose-950/25 border border-rose-800/40 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-400 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.catalog.problemTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedRondo.problemInGame}
                  </p>
                </div>

                {/* Conditions & Objectives for Both Sides */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {t.catalog.conditionsAndGoalsTitle}
                  </h4>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-800/40">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                      <Target className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.attackGoalTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedRondo.attackGoal}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/40">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.defenseGoalTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedRondo.defenseGoal}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.scoringRuleTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedRondo.scoringRule}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Methodological Provenance & Scientific Basis */}
            {briefTab === 'science' && (
              <div
                data-testid="scientific-basis-panel"
                className="space-y-3"
              >
                {/* Coaching School & Historical Origin */}
                <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? 'Первоисточник и школа'
                        : lang === 'de'
                        ? 'Methodische Herkunft'
                        : 'Coaching Lineage & Origin'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.originSchool}
                  </p>
                </div>

                {/* Sports Science & Relative Area (m²/player) Math */}
                <div className="p-3.5 rounded-xl bg-blue-950/25 border border-blue-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-400">
                    <Microscope className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? 'Научное обоснование (м²/игрока)'
                        : lang === 'de'
                        ? 'Sportwissenschaftliche Basis (m²/Spieler)'
                        : 'Scientific Basis (m²/player & Scanning)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.scientificBasis}
                  </p>
                </div>

                {/* Match Transfer (11v11 / 9v9 / 7v7 Phase & Zone) */}
                <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? 'Перенос в матч'
                        : lang === 'de'
                        ? 'Direkter Spieltransfer'
                        : 'Match Transfer'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.matchTransfer}
                  </p>
                </div>

                {/* Multi-Age Scaling Table for this Specific Drill */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>
                      {lang === 'ru'
                        ? 'Площади по возрастам'
                        : lang === 'de'
                        ? 'Flächen- & Altersmatrix'
                        : 'Age Scaling Matrix'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      ApP (m²/pl)
                    </span>
                  </div>
                  <div className="divide-y divide-slate-800/70 text-[11px]">
                    {ageBands.map((band) => {
                      const v = getRondoAgeVariant(selectedRondo.id, band.id);
                      const isCurr = band.id === ageBand;
                      return (
                        <div
                          key={band.id}
                          onClick={() => setAgeBand(band.id)}
                          className={`py-1.5 px-2 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition ${
                            isCurr
                              ? 'bg-emerald-500/15 text-emerald-300 font-bold'
                              : 'text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          <span>{band.shortLabel}</span>
                          <span className="font-mono text-right">{v.baseGrid}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Live Coaching Cues & 3 Progression Stages */}
            {briefTab === 'cues' && (
              <div className="space-y-4">
                {/* Live Coaching Cues */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>{t.catalog.coachingCuesTitle}</span>
                  </div>

                  <ul className="space-y-2">
                    {selectedRondo.coachingCues.map((cue, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>“{cue}”</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 Progression Stages */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>{t.catalog.progressionsTitle}</span>
                  </div>

                  <div className="space-y-2">
                    {selectedRondo.progressions.map((prog, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs leading-relaxed"
                      >
                        <span className="font-bold text-emerald-300 block mb-0.5">
                          {prog.level}
                        </span>
                        <span className="text-slate-300">{prog.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Squad Attendance Calculator */}
            {briefTab === 'squad' && (
              <div className="bg-emerald-950/25 border border-emerald-800/40 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-300">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.catalog.squadCalcTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {t.catalog.playersTodayLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-extrabold text-xs">
                      {teamPlayersCount} {t.catalog.playersUnit}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={8}
                  max={22}
                  value={teamPlayersCount}
                  onChange={(e) => onChangeTeamPlayersCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />

                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {getSquadOrganizationAdvice(teamPlayersCount, selectedRondo)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
