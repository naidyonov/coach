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
  Sparkles,
  Timer
} from 'lucide-react';
import { CategoryId, RoleMode, RondoItem } from '../i18n/types';
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
  roleMode: RoleMode;
}

type MobileDrillSubTab = 'goals' | 'cues' | 'squad';

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
  roleMode
}) => {
  const { lang, t, categories, rondos, getSquadOrganizationAdvice } = useLanguage();
  const [isCatalogExpanded, setIsCatalogExpanded] = useState<boolean>(true);
  const [mobileSubTab, setMobileSubTab] = useState<MobileDrillSubTab>('goals');

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

  return (
    <div className="space-y-5">
      {/* Category Filter & Rondo Selector Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {t.catalog.filterTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.catalog.filterSubtitle}
            </p>
          </div>

          <button
            type="button"
            data-testid="toggle-catalog-grid-btn"
            onClick={() => setIsCatalogExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            {isCatalogExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'ru' ? 'Свернуть карточки' : 'Compact View'}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {lang === 'ru'
                    ? `Показать карточки (${filteredRondos.length})`
                    : `Show Cards (${filteredRondos.length})`}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Category Pills — Horizontally scrollable on mobile, wrapped on desktop */}
        <div className="flex overflow-x-auto sm:flex-wrap gap-2 pb-2 sm:pb-0 mb-3 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                  isActive
                    ? `${cat.color} text-white border-white/20 shadow-lg`
                    : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Rondo Cards Grid / Mobile Snap Strip (Collapsible for fast pitch-side access) */}
        {isCatalogExpanded && (
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pb-1 sm:pb-0 snap-x snap-mandatory no-scrollbar">
            {filteredRondos.map((rondo) => {
              const isSelected = rondo.id === selectedRondo.id;
              return (
                <button
                  key={rondo.id}
                  type="button"
                  onClick={() => onSelectRondoId(rondo.id)}
                  className={`snap-start shrink-0 w-60 sm:w-auto text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
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

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[60%] font-medium text-slate-300">
                      {rondo.format.split(' ')[0]}
                    </span>
                    <span className="text-emerald-300/90 font-mono">
                      {rondo.dimensionsU15.base.split('(')[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Pitch-Side Rondo Number Stepper Bar (1.1 -> 5.2) */}
      <div
        data-testid="quick-rondo-stepper"
        className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 flex items-center justify-between gap-2 shadow-lg"
      >
        <button
          type="button"
          data-testid="prev-rondo-btn"
          onClick={handlePrevRondo}
          aria-label={lang === 'ru' ? 'Предыдущее рондо' : 'Previous rondo'}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filteredRondos.map((r) => {
            const isSelected = r.id === selectedRondo.id;
            return (
              <button
                key={r.id}
                type="button"
                data-testid={`quick-rondo-pill-${r.id}`}
                onClick={() => onSelectRondoId(r.id)}
                title={r.title}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/30'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {t.catalog.numberPrefix}{r.number}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          data-testid="next-rondo-btn"
          onClick={handleNextRondo}
          aria-label={lang === 'ru' ? 'Следующее рондо' : 'Next rondo'}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Two-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 cols): Pitch Board, Step Controls, Layers & Squad Calculator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            {/* Selected Rondo Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold">
                    {t.catalog.exerciseLabel} {t.catalog.numberPrefix}{selectedRondo.number}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${selectedRondo.badgeColor}`}
                  >
                    {selectedRondo.categoryName}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    • {selectedRondo.playersCount}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {selectedRondo.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {onOpenTimerForRondo && (
                  <button
                    type="button"
                    data-testid="launch-rondo-timer-btn"
                    onClick={onOpenTimerForRondo}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer"
                  >
                    <Timer className="w-4 h-4" />
                    <span>{lang === 'ru' ? 'Таймер рондо' : 'Drill Timer'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenMonthlyPlan}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
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

            {/* Step-by-Step Phase Animation Controls */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 sm:p-4 space-y-3">
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

                  <div className="flex flex-wrap items-center gap-1.5">
                    {phases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onPhaseChange(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          safePhaseIndex === idx
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
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

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-sm font-bold text-emerald-400 mb-1">
                  {currentPhase.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentPhase.desc}
                </p>
              </div>

              {/* Board Layer Toggle Buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-1">
                  {t.catalog.boardLayersLabel}
                </span>

                <button
                  type="button"
                  onClick={onTogglePasses}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    showPasses
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
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
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
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
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {showShadows ? t.catalog.layerShadowsOn : t.catalog.layerShadowsOff}
                </button>
              </div>
            </div>

            {/* Mobile-Only Drill Detail Sub-Tabs (lg:hidden) to eliminate long vertical scrolling on phones */}
            <div
              data-testid="mobile-drill-subtabs"
              className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileSubTab('goals')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mobileSubTab === 'goals'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ru' ? 'Цели и счёт' : 'Goals & Score'}
              </button>
              <button
                type="button"
                onClick={() => setMobileSubTab('cues')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mobileSubTab === 'cues'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ru' ? 'Подсказки (3)' : 'Cues & Stages'}
              </button>
              <button
                type="button"
                onClick={() => setMobileSubTab('squad')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mobileSubTab === 'squad'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ru' ? `Состав (${teamPlayersCount})` : `Squad (${teamPlayersCount})`}
              </button>
            </div>

            {/* U15 Squad Attendance Calculator (always visible on lg+, visible on mobile when 'squad' sub-tab selected) */}
            <div
              className={`${
                mobileSubTab === 'squad' ? 'block' : 'hidden lg:block'
              } bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-3.5 sm:p-4`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
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
                className="w-full accent-emerald-500 cursor-pointer mb-2"
              />

              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {getSquadOrganizationAdvice(teamPlayersCount, selectedRondo)}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Role Context, Parameters, Problem, Goals, Progressions, Cues */}
        <div className="lg:col-span-5 space-y-4">
          {/* Role-Adaptive Banner when roleMode is 'players' or 'parents' */}
          {roleMode !== 'coach' && (
            <div
              className={`rounded-2xl p-4 border shadow-lg ${
                roleMode === 'players'
                  ? 'bg-blue-950/40 border-blue-700/50 text-blue-200'
                  : 'bg-amber-950/40 border-amber-700/50 text-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{t.header.roles[roleMode]}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {t.header.roleDescriptions[roleMode]}
              </p>
            </div>
          )}

          {/* GROUP 1: Pitch Dimensions, Dosage, Game Problem, Conditions & Scoring (Mobile 'goals' sub-tab, always visible on lg+) */}
          <div className={`${mobileSubTab === 'goals' ? 'block' : 'hidden lg:block'} space-y-4`}>
            {/* Pitch Dimensions & U15 Dosage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.catalog.pitchSizeLabel}</span>
                </div>
                <div className="text-sm font-extrabold text-white">
                  {selectedRondo.dimensionsU15.base}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  {t.catalog.intensivePrefix} {selectedRondo.dimensionsU15.intensive}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.catalog.dosageLabel}</span>
                </div>
                <div className="text-sm font-extrabold text-white">
                  {selectedRondo.timingU15}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {t.catalog.formatPrefix} {selectedRondo.format}
                </div>
              </div>
            </div>

            {/* Problem in the Game -> Why This Rondo */}
            <div className="bg-rose-950/25 border border-rose-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-400 mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.catalog.problemTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedRondo.problemInGame}
              </p>
            </div>

            {/* Conditions & Objectives for Both Sides */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t.catalog.conditionsAndGoalsTitle}
              </h4>

              <div className="p-3 rounded-xl bg-red-950/25 border border-red-800/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                  <Target className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.catalog.attackGoalTitle}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedRondo.attackGoal}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/25 border border-blue-800/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.catalog.defenseGoalTitle}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedRondo.defenseGoal}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-800/40">
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

          {/* GROUP 2: 3 Progression Stages & Live Coaching Cues (Mobile 'cues' sub-tab, always visible on lg+) */}
          <div className={`${mobileSubTab === 'cues' ? 'block' : 'hidden lg:block'} space-y-4`}>
            {/* 3 Progression Stages */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                <Layers className="w-4 h-4 shrink-0" />
                <span>{t.catalog.progressionsTitle}</span>
              </div>

              <div className="space-y-2">
                {selectedRondo.progressions.map((prog, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs"
                  >
                    <span className="font-bold text-emerald-300">{prog.level}: </span>
                    <span className="text-slate-300">{prog.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Coaching Cues */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
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
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>“{cue}”</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

