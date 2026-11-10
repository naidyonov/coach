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
    <div className="space-y-3 sm:space-y-4">
      {/* Unified Drill Navigator: Full-Width Category Pills + Compact 2-Col Rubric Chips (Activation) + Quick Stepper */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-2.5 sm:p-4 shadow-sm space-y-2 sm:space-y-3">
        {/* Row 1: Full-Width Category / Rubric Filter Pills (Never crushed by side buttons on mobile) */}
        <div className="w-full flex items-center overflow-x-auto sm:flex-wrap gap-1.5 no-scrollbar">
          {isActivation && (
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition cursor-pointer border ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
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
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition cursor-pointer border ${
                  isActive
                    ? `${cat.color} text-white keep-white border-white/20 shadow-sm`
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: ACTIVATION RUBRIC SHOWCASE SHELF (Compact 2-Column Chip Grid so the Pitch stays above the fold) */}
        {isActivation && isShowcaseExpanded && (
          <div
            data-testid="activation-rubric-showcase"
            className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2 sm:p-3 max-h-32 sm:max-h-56 overflow-y-auto space-y-2 sm:space-y-3"
          >
            {visibleRubrics.map((rubric) => {
              const drillsInRubric = rondos.filter(
                (r) => r.category === rubric.id
              );
              if (drillsInRubric.length === 0) return null;
              return (
                <div key={rubric.id} className="space-y-1.5">
                  {/* Rubric Section Title */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/70 pb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${rubric.dot} shrink-0`}
                      />
                      <h3 className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight truncate">
                        {rubric.name}
                      </h3>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0">
                      {drillsInRubric.length}{' '}
                      {lang === 'ru'
                        ? 'упр.'
                        : lang === 'de'
                        ? 'Üb.'
                        : 'drills'}
                    </span>
                  </div>

                  {/* 2-Column Compact Chip Grid on Mobile, 3-Column on Desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
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
                          className={`text-left px-2.5 py-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all flex flex-col justify-between gap-1 cursor-pointer min-w-0 ${
                            isCurrent
                              ? 'bg-emerald-950/40 border-emerald-500/80 shadow-sm'
                              : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5 min-w-0">
                            <span
                              className={`text-[11px] sm:text-xs font-bold truncate ${
                                isCurrent ? 'text-emerald-300' : 'text-white'
                              }`}
                            >
                              {drill.shortTitle || drill.title}
                            </span>
                            {isCurrent && (
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0" />
                            )}
                          </div>

                          <div className="hidden sm:flex text-[10px] text-slate-400 items-center justify-between gap-1 pt-1 border-t border-slate-800/60">
                            <span className="truncate">{shortGrid}</span>
                            <span className="text-emerald-400/90 font-medium shrink-0">
                              {shortPlayers}
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

        {/* Row 3: Seamless Quick Stepper Row + Showcase Toggle */}
        <div
          data-testid="quick-rondo-stepper"
          className="pt-1.5 sm:pt-2 border-t border-slate-800/70 flex items-center justify-between gap-1.5 sm:gap-2"
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
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* When Activation Showcase is expanded on mobile, show a clean counter instead of repeating the drill pills a second time */}
          {isActivation && isShowcaseExpanded && (
            <div className="sm:hidden flex items-center gap-1.5 min-w-0 flex-1 px-1">
              <span className="text-[11px] font-bold text-emerald-400 shrink-0">
                {currentRondoIdx + 1}/{orderedRondos.length}
              </span>
              <span className="text-slate-600 text-xs">•</span>
              <span className="text-[11px] text-slate-300 font-semibold truncate">
                {selectedRondo.shortTitle || selectedRondo.title}
              </span>
            </div>
          )}

          <div
            className={`${
              isActivation && isShowcaseExpanded ? 'hidden sm:flex' : 'flex'
            } items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0`}
          >
            {isActivation && (
              <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 px-1 shrink-0">
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
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                      : 'bg-slate-950/70 text-slate-300 border-slate-800/90 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {!isActivation && (
                    <span className="font-bold">
                      {t.catalog.numberPrefix}{r.number}
                    </span>
                  )}
                  <span
                    className={`${
                      isActivation
                        ? 'inline truncate max-w-[160px] sm:max-w-[200px]'
                        : 'hidden xl:inline truncate max-w-[115px]'
                    } text-[11px] ${
                      isSelected ? 'text-slate-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {r.shortTitle || r.title}
                  </span>
                </button>
              );
            })}
          </div>

          {isActivation && (
            <button
              type="button"
              data-testid="toggle-rubric-showcase-btn"
              onClick={() => setIsShowcaseExpanded((v) => !v)}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-[11px] font-bold transition cursor-pointer"
            >
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>
                {isShowcaseExpanded
                  ? lang === 'ru'
                    ? 'Свернуть'
                    : lang === 'de'
                    ? 'Einklappen'
                    : 'Collapse'
                  : lang === 'ru'
                  ? `Сетка (${rondos.length})`
                  : lang === 'de'
                  ? `Alle (${rondos.length})`
                  : `Grid (${rondos.length})`}
              </span>
            </button>
          )}

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
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Workspace: Left Tactical Stage (7 cols) + Right Coaching Brief (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-start">
        {/* LEFT COLUMN (7 cols): Hero Drill Header + Interactive Pitch + Calm Phase Bar */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 sm:p-5 shadow-sm space-y-2.5 sm:space-y-4">
            {/* Selected Rondo / Activation Hero Header (Compact 2-Row Mobile Layout so Pitch is Above the Fold) */}
            <div className="pb-2 sm:pb-3 border-b border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 font-medium min-w-0 truncate">
                  {!isActivation && (
                    <span className="font-mono font-bold text-emerald-400 shrink-0">
                      {t.catalog.numberPrefix}{selectedRondo.number}
                    </span>
                  )}
                  {!isActivation && (
                    <span className="text-slate-600 shrink-0">•</span>
                  )}
                  <span className="text-emerald-300 font-semibold truncate">
                    {selectedRondo.categoryName}
                  </span>
                  <span className="hidden sm:inline text-slate-600 shrink-0">
                    •
                  </span>
                  <span className="hidden sm:inline truncate">
                    {activeAgeVariant.formatOverride || selectedRondo.playersCount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onOpenTimerForRondo && (
                    <button
                      type="button"
                      data-testid="launch-rondo-timer-btn"
                      onClick={onOpenTimerForRondo}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-[11px] font-semibold transition cursor-pointer"
                    >
                      <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{t.nav.timerShort}</span>
                    </button>
                  )}

                  {!isActivation && (
                    <button
                      type="button"
                      onClick={onOpenMonthlyPlan}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white keep-white text-[11px] font-semibold shadow-sm transition cursor-pointer"
                    >
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{t.catalog.openMonthlyPlanBtn}</span>
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-sm sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                {selectedRondo.title}
              </h2>
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

            {/* Step-by-Step Phase Animation Controls + Lightweight Layer Filter Chips */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.catalog.stepByStepTitle}
                </span>

                <div className="flex items-center justify-between sm:justify-end gap-1.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrevPhase}
                    title={t.catalog.prevPhase}
                    aria-label={t.catalog.prevPhase}
                    className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition cursor-pointer shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {phases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onPhaseChange(idx)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer shrink-0 ${
                          safePhaseIndex === idx
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
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
                    className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition cursor-pointer shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Phase Caption with Left Accent Bar (No Double Box) */}
              <div className="border-l-2 border-emerald-500 pl-2.5 sm:pl-3 py-0.5">
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mb-0.5">
                  {currentPhase.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentPhase.desc}
                </p>
              </div>

              {/* Lightweight Layer Filter Chips */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center overflow-x-auto sm:flex-wrap gap-1.5 no-scrollbar">
                <span className="hidden sm:inline text-xs text-slate-400 font-medium mr-1">
                  {t.catalog.boardLayersLabel}
                </span>

                <button
                  type="button"
                  onClick={onTogglePasses}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition cursor-pointer ${
                    showPasses
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {showPasses ? t.catalog.layerPassesOn : t.catalog.layerPassesOff}
                </button>

                <button
                  type="button"
                  onClick={onToggleMovements}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition cursor-pointer ${
                    showMovements
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {showMovements
                    ? t.catalog.layerMovementsOn
                    : t.catalog.layerMovementsOff}
                </button>

                <button
                  type="button"
                  onClick={onToggleShadows}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition cursor-pointer ${
                    showShadows
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {showShadows ? t.catalog.layerShadowsOn : t.catalog.layerShadowsOff}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Side-by-Side Metrics Strip + Unified 4-Tab Coaching Brief */}
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
          {/* Top Key Metrics Strip: Side-by-Side 2-Column Grid on Mobile & Desktop */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-2.5 sm:p-3.5 shadow-sm min-w-0">
              <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-400 font-medium mb-1">
                <span className="flex items-center gap-1 truncate">
                  <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{t.catalog.pitchSizeLabel}</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold shrink-0">
                  {currentAgeBandInfo.shortLabel}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">
                {activeAgeVariant.baseGrid}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                {t.catalog.intensivePrefix}{' '}
                <span className="text-emerald-300 font-medium">
                  {activeAgeVariant.intensiveGrid}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-2.5 sm:p-3.5 shadow-sm min-w-0">
              <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-400 font-medium mb-1">
                <span className="flex items-center gap-1 truncate">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{t.catalog.dosageLabel}</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-amber-300 font-semibold shrink-0 truncate max-w-[75px] sm:max-w-none">
                  {activeAgeVariant.touchesRule}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">
                {activeAgeVariant.timing}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                {t.catalog.formatPrefix}{' '}
                {activeAgeVariant.formatOverride || selectedRondo.format}
              </div>
            </div>
          </div>

          {/* Universal Coaching Brief Card */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-sm space-y-4">
            <div
              data-testid="mobile-drill-subtabs"
              className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
            >
              <button
                type="button"
                onClick={() => setBriefTab('goals')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer truncate ${
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
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer truncate ${
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
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer truncate ${
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
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer truncate ${
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

            {/* TAB 1: Age Focus + Unified Game Problem, Attack/Defense Goals & Scoring Rules */}
            {briefTab === 'goals' && (
              <div className="space-y-3.5">
                {/* In Activation mode: Interactive 3-Phase Progression Ladder */}
                {isActivation && (
                  <div
                    data-testid="activation-progression-ladder"
                    className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 shrink-0" />
                        <span>{t.catalog.progressionsTitle}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium normal-case">
                        {lang === 'ru'
                          ? 'Нажмите фазу → на доску'
                          : lang === 'de'
                          ? 'Phase klicken → Board'
                          : 'Click phase → Board'}
                      </span>
                    </div>

                    <div className="divide-y divide-slate-800/60">
                      {selectedRondo.progressions.map((prog, idx) => {
                        const isCurrPhase = safePhaseIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onPhaseChange(idx)}
                            className={`w-full text-left py-2 px-2.5 first:pt-1.5 last:pb-1.5 rounded-lg text-xs leading-relaxed transition cursor-pointer ${
                              isCurrPhase
                                ? 'bg-emerald-950/35 text-white'
                                : 'hover:bg-slate-900/60 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span
                                className={`font-bold ${
                                  isCurrPhase ? 'text-emerald-300' : 'text-white'
                                }`}
                              >
                                {prog.level}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                                  isCurrPhase
                                    ? 'bg-emerald-500 text-slate-950 font-bold'
                                    : 'text-slate-400'
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

                {/* Age-Specific Pedagogical Focus Callout */}
                <div
                  data-testid="age-coaching-focus-box"
                  className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>
                      {currentAgeBandInfo.shortLabel} • {currentAgeBandInfo.stageTitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeAgeVariant.ageCoachingFocus}
                  </p>
                </div>

                {/* Unified Game Problem, Objectives & Scoring Card (Replaces 4 separate colored boxes) */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 divide-y divide-slate-800/60">
                  {/* Problem in the Game */}
                  <div className="pb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.problemTitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedRondo.problemInGame}
                    </p>
                  </div>

                  {/* Attack Goal */}
                  <div className="py-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                      <Target className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.attackGoalTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedRondo.attackGoal}
                    </p>
                  </div>

                  {/* Defense Goal */}
                  <div className="py-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.catalog.defenseGoalTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedRondo.defenseGoal}
                    </p>
                  </div>

                  {/* Scoring Rule */}
                  <div className="pt-3">
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

            {/* TAB 2: Methodological Provenance & Scientific Basis (Unified Card) */}
            {briefTab === 'science' && (
              <div
                data-testid="scientific-basis-panel"
                className="space-y-3.5"
              >
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 divide-y divide-slate-800/60">
                  {/* Coaching School & Historical Origin */}
                  <div className="pb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
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
                  <div className="py-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
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
                  <div className="pt-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
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
                </div>

                {/* Multi-Age Scaling Table for this Specific Drill */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
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
                  <div className="divide-y divide-slate-800/60 text-[11px]">
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
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 divide-y divide-slate-800/60 space-y-3.5">
                {/* Live Coaching Cues */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
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
                <div className="pt-3.5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>{t.catalog.progressionsTitle}</span>
                  </div>

                  <div className="divide-y divide-slate-800/60">
                    {selectedRondo.progressions.map((prog, idx) => (
                      <div
                        key={idx}
                        className="py-2 first:pt-0 last:pb-0 text-xs leading-relaxed"
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
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 space-y-3">
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
