import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
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
  LayoutGrid,
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

  // Default to false so the user immediately sees the Tactical Pitch & active drill without 10 cards pushing it down
  const [isCatalogExpanded, setIsCatalogExpanded] = useState<boolean>(false);
  const [briefTab, setBriefTab] = useState<DrillBriefTab>('goals');

  const filteredRondos =
    selectedCategory === 'all'
      ? rondos
      : rondos.filter((r) => r.category === selectedCategory);

  const currentRondoIdx = Math.max(
    0,
    filteredRondos.findIndex((r) => r.id === selectedRondo.id)
  );

  const handlePrevRondo = () => {
    if (filteredRondos.length === 0) return;
    const prevIdx =
      (currentRondoIdx - 1 + filteredRondos.length) % filteredRondos.length;
    onSelectRondoId(filteredRondos[prevIdx].id);
  };

  const handleNextRondo = () => {
    if (filteredRondos.length === 0) return;
    const nextIdx = (currentRondoIdx + 1) % filteredRondos.length;
    onSelectRondoId(filteredRondos[nextIdx].id);
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

  return (
    <div className="space-y-4">
      {/* Unified Drill Navigator Bar: Categories + Age Group Selector + Quick Stepper */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
        {/* Top Row: Category Pills + Expand/Collapse All Cards Drawer Button */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center overflow-x-auto sm:flex-wrap gap-1.5 pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
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

          <button
            type="button"
            data-testid="toggle-catalog-grid-btn"
            onClick={() => setIsCatalogExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition cursor-pointer shrink-0 ml-auto"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
            {isCatalogExpanded ? (
              <>
                <span>{lang === 'ru' ? 'Скрыть каталог' : 'Hide Cards'}</span>
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              </>
            ) : (
              <>
                <span>
                  {lang === 'ru'
                    ? `Все карточки (${filteredRondos.length})`
                    : `Browse Cards (${filteredRondos.length})`}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </>
            )}
          </button>
        </div>

        {/* Multi-Age Group Selector Bar (U9-U10 | U11-U12 | U13-U14 | U15-U16 | U17+/Pro) */}
        <div
          data-testid="age-band-selector"
          className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-slate-300">
              {lang === 'ru' ? 'Возрастная адаптация:' : 'Age Adaptation:'}
            </span>
            <span className="hidden md:inline-block text-[11px] text-slate-400">
              {currentAgeBandInfo.stageTitle} •{' '}
              <strong className="text-emerald-400">
                {currentAgeBandInfo.relativeAreaRule}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {ageBands.map((band) => {
              const isSelected = ageBand === band.id;
              return (
                <button
                  key={band.id}
                  type="button"
                  data-testid={`age-pill-${band.id}`}
                  onClick={() => setAgeBand(band.id)}
                  title={`${band.label} — ${band.stageTitle}`}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {band.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Rondo Stepper Bar (1.1 -> 5.2) with Short Titles */}
        <div
          data-testid="quick-rondo-stepper"
          className="bg-slate-950/80 border border-slate-800/80 rounded-xl px-2 py-1.5 flex items-center justify-between gap-2"
        >
          <button
            type="button"
            data-testid="prev-rondo-btn"
            onClick={handlePrevRondo}
            aria-label={lang === 'ru' ? 'Предыдущее рондо' : 'Previous rondo'}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
            {filteredRondos.map((r) => {
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
                  <span className="font-extrabold">
                    {t.catalog.numberPrefix}{r.number}
                  </span>
                  <span
                    className={`hidden xl:inline truncate max-w-[115px] font-medium text-[11px] ${
                      isSelected ? 'text-slate-950 font-semibold' : 'text-slate-400'
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
            aria-label={lang === 'ru' ? 'Следующее рондо' : 'Next rondo'}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsible 10-Card Visual Drawer (Expanded on demand) */}
        {isCatalogExpanded && (
          <div className="pt-2 border-t border-slate-800/80 flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pb-1 sm:pb-0 snap-x snap-mandatory no-scrollbar">
            {filteredRondos.map((rondo) => {
              const isSelected = rondo.id === selectedRondo.id;
              const rondoAgeVar = getRondoAgeVariant(rondo.id);
              return (
                <button
                  key={rondo.id}
                  type="button"
                  onClick={() => {
                    onSelectRondoId(rondo.id);
                    setIsCatalogExpanded(false);
                  }}
                  className={`snap-start shrink-0 w-60 sm:w-auto text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <span className="text-xs font-black text-emerald-400">
                        {t.catalog.numberPrefix}{rondo.number}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${rondo.badgeColor}`}
                      >
                        {rondo.categoryName}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white line-clamp-2 mb-2">
                      {rondo.shortTitle || rondo.title}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[55%] font-medium text-slate-300">
                      {rondoAgeVar.formatOverride || rondo.format.split(' ')[0]}
                    </span>
                    <span className="text-emerald-300/90 font-mono truncate">
                      {rondoAgeVar.baseGrid.split('(')[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Two-Column Workspace: Left Tactical Stage (7 cols) + Right Coaching Brief (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (7 cols): Hero Drill Header + Interactive Pitch + Step-by-Step Phase Bar */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            {/* Selected Rondo Hero Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-xs font-black">
                    {t.catalog.numberPrefix}{selectedRondo.number}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${selectedRondo.badgeColor}`}
                  >
                    {selectedRondo.categoryName}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-300 text-xs font-bold">
                    {currentAgeBandInfo.shortLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    • {activeAgeVariant.formatOverride || selectedRondo.playersCount}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {selectedRondo.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {onOpenTimerForRondo && (
                  <button
                    type="button"
                    data-testid="launch-rondo-timer-btn"
                    onClick={onOpenTimerForRondo}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'Таймер' : 'Drill Timer'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenMonthlyPlan}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white keep-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.catalog.openMonthlyPlanBtn}</span>
                </button>
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
                {lang === 'ru' ? 'Цели и счёт' : 'Goals & Score'}
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
                {lang === 'ru' ? 'Базис (Наука)' : 'Basis & Science'}
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
                {lang === 'ru' ? 'Подсказки (3)' : 'Cues & Stages'}
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
                  : `Squad (${teamPlayersCount})`}
              </button>
            </div>

            {/* TAB 1: Age Pedagogical Focus, Game Problem, Attack/Defense Goals & Scoring Rules */}
            {briefTab === 'goals' && (
              <div className="space-y-3">
                {/* Age-Specific Pedagogical Focus Banner */}
                <div
                  data-testid="age-coaching-focus-box"
                  className="bg-emerald-950/25 border border-emerald-800/50 rounded-xl p-3.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>
                        {lang === 'ru'
                          ? `Методический фокус для ${currentAgeBandInfo.label}`
                          : `Coaching Focus for ${currentAgeBandInfo.label}`}
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

            {/* TAB 2: Methodological Provenance & Scientific Basis ("Базис и первоисточник") */}
            {briefTab === 'science' && (
              <div
                data-testid="scientific-basis-panel"
                className="space-y-3"
              >
                {/* 1. Coaching School & Historical Origin */}
                <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? '1. Первоисточник и тренерская школа'
                        : '1. Coaching Lineage & Origin School'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.originSchool}
                  </p>
                </div>

                {/* 2. Sports Science & Relative Area (m²/player) Math */}
                <div className="p-3.5 rounded-xl bg-blue-950/25 border border-blue-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-400">
                    <Microscope className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? '2. Научное обоснование (м²/игрока, биомеханика, сканирование)'
                        : '2. Scientific Basis (m²/player, Biomechanics & Scanning)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.scientificBasis}
                  </p>
                </div>

                {/* 3. Match Transfer (11v11 / 9v9 / 7v7 Phase & Zone) */}
                <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? '3. Прямой перенос в матч (Зона и игровая ситуация)'
                        : '3. Direct Match Transfer (Pitch Zone & Game Situation)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {methodologyBasis.matchTransfer}
                  </p>
                </div>

                {/* 4. Multi-Age Scaling Table for this Specific Drill */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>
                      {lang === 'ru'
                        ? 'Шкала площадей по возрастам (U9 → Pro)'
                        : 'Age Scaling Matrix (U9 → Pro)'}
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
