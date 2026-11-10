import React, { useState, useEffect, useMemo } from 'react';
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Move,
} from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  rondoPhaseToTacticalScene,
  TacticalCanvas,
  useTacticalBoard,
} from '../lib/tactical-board';

export interface TacticalPitchSVGProps {
  rondo: RondoItem;
  phaseIndex: number;
  onPhaseChange?: (index: number) => void;
  showPasses: boolean;
  showMovements: boolean;
  showShadows: boolean;
  compactHeader?: boolean;
}

export const TacticalPitchSVG: React.FC<TacticalPitchSVGProps> = ({
  rondo,
  phaseIndex,
  onPhaseChange,
  showPasses,
  showMovements,
  showShadows,
  compactHeader = false,
}) => {
  const { lang, t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    scene,
    phaseTitle,
    phaseDesc,
    safePhaseIndex,
    totalPhases,
  } = useMemo(
    () => rondoPhaseToTacticalScene(rondo, phaseIndex),
    [rondo, phaseIndex]
  );

  const {
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    isPassAnimating,
    primaryPass,
    handleReplayPass,
    customPositions,
    customVectors,
    freehandStrokes,
    draftVector,
    draftStroke,
    draggingTokenId,
    hasCustomPositions,
    handleResetPositions,
    handleTokenPointerDown,
    handleSvgPointerDown,
    handleSvgPointerMove,
    handleSvgPointerUp,
    handleTouchStart,
    handleTouchEnd,
    ballCoords,
  } = useTacticalBoard({
    scene,
    drillKey: rondo.id,
    phaseIndex: safePhaseIndex,
    totalPhases,
    onPhaseChange,
  });

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft' && onPhaseChange) {
        onPhaseChange((safePhaseIndex - 1 + totalPhases) % totalPhases);
      } else if (e.key === 'ArrowRight' && onPhaseChange) {
        onPhaseChange((safePhaseIndex + 1) % totalPhases);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onPhaseChange, safePhaseIndex, totalPhases, setIsPlaying]);

  const renderBoardContent = (inModal = false) => (
    <div
      className={`tactical-pitch-canvas relative rounded-2xl overflow-hidden border border-emerald-800/70 bg-emerald-950 shadow-xl select-none ${
        inModal ? 'w-full max-w-5xl mx-auto' : 'w-full'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Unified Single-Row Top Bar: Grid Dimension + Playback Controls + Fullscreen */}
      <div className="bg-slate-900/95 px-2.5 sm:px-4 py-1.5 sm:py-2 border-b border-slate-800/80 text-xs flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="sm:hidden font-semibold text-emerald-300 tracking-wide truncate text-[11px]">
            {rondo.dimensionsU15.base.split('(')[0].trim()}
          </span>
          <span className="hidden sm:inline font-semibold text-emerald-300 tracking-wide truncate">
            {scene.gridLabel}
          </span>
          {hasCustomPositions && !compactHeader && (
            <button
              type="button"
              data-testid={
                inModal
                  ? 'pitch-reset-positions-btn-modal'
                  : 'pitch-reset-positions-btn'
              }
              onClick={handleResetPositions}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-medium transition cursor-pointer shrink-0 print:hidden"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">
                {lang === 'ru'
                  ? 'Сбросить расстановку'
                  : lang === 'de'
                  ? 'Positionen zurücksetzen'
                  : 'Reset Positions'}
              </span>
            </button>
          )}
        </div>

        {!compactHeader && (
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 print:hidden">
            {/* Auto-Play / Pause Button */}
            <button
              type="button"
              data-testid={
                inModal ? 'pitch-autoplay-btn-modal' : 'pitch-autoplay-btn'
              }
              onClick={() => setIsPlaying((prev) => !prev)}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition cursor-pointer border ${
                isPlaying
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border-slate-700/80'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span>{lang === 'ru' ? 'Пауза' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span>
                    {lang === 'ru'
                      ? 'Авто-показ'
                      : lang === 'de'
                      ? 'Auto-Play'
                      : 'Auto-Play'}
                  </span>
                </>
              )}
            </button>

            {/* Replay Current Pass Trajectory Button */}
            {primaryPass && (
              <button
                type="button"
                data-testid={
                  inModal
                    ? 'pitch-replay-pass-btn-modal'
                    : 'pitch-replay-pass-btn'
                }
                onClick={handleReplayPass}
                className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition cursor-pointer"
                title={
                  lang === 'ru'
                    ? 'Повторить траекторию паса в текущей фазе'
                    : lang === 'de'
                    ? 'Passweg in dieser Phase wiederholen'
                    : 'Replay pass trajectory in current phase'
                }
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-amber-400 ${
                    isPassAnimating && !isPlaying ? 'animate-spin' : ''
                  }`}
                />
                <span className="hidden sm:inline">
                  {lang === 'ru'
                    ? 'Повтор паса'
                    : lang === 'de'
                    ? 'Pass-Replay'
                    : 'Replay Pass'}
                </span>
              </button>
            )}

            {/* Speed Selector Pill (visible on sm+ or inside Fullscreen Modal) */}
            <div
              className={`${
                inModal ? 'inline-flex' : 'hidden sm:inline-flex'
              } items-center rounded-lg bg-slate-950/80 p-0.5 border border-slate-800`}
            >
              {([0.75, 1, 1.5] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Fullscreen Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={
                isFullscreen
                  ? t.catalog.fullscreenExit
                  : t.catalog.fullscreenEnter
              }
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">
                    {t.catalog.fullscreenExit}
                  </span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">
                    {t.catalog.fullscreenEnter}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Standalone Tactical Canvas Engine */}
      <TacticalCanvas
        scene={scene}
        ariaLabel={`${rondo.title} - ${phaseTitle}`}
        className={`w-full h-auto block touch-none ${
          inModal ? 'max-h-[70vh]' : ''
        }`}
        showPasses={showPasses}
        showMovements={showMovements}
        showShadows={showShadows}
        customPositions={customPositions}
        ballCoords={ballCoords}
        draggingTokenId={draggingTokenId}
        isPassAnimating={isPassAnimating}
        customVectors={customVectors}
        draftVector={draftVector}
        freehandStrokes={freehandStrokes}
        draftStroke={draftStroke}
        onTokenPointerDown={handleTokenPointerDown}
        onSvgPointerDown={handleSvgPointerDown}
        onSvgPointerMove={handleSvgPointerMove}
        onSvgPointerUp={handleSvgPointerUp}
      />

      {/* Quiet Bottom Micro-Footer: Role Legend & Whiteboard Hint */}
      <div className="bg-slate-900/95 px-3 sm:px-4 py-1.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block border border-white/70" />
            <span>{t.catalog.legendPossession}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block border border-white/70" />
            <span>{t.catalog.legendDefenders}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block border border-slate-900" />
            <span>{t.catalog.legendNeutral}</span>
          </span>
        </div>

        {!compactHeader && (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 print:hidden">
            <Move className="w-3 h-3 text-emerald-400/80" />
            {lang === 'ru'
              ? 'Доска тренера: перетаскивайте игроков и мяч'
              : lang === 'de'
              ? 'Taktiktafel: Spieler & Ball frei verschieben'
              : 'Coach Whiteboard: drag players & ball'}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {renderBoardContent(false)}

      {/* Fullscreen Tactical Board Modal for On-Pitch Mobile View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 overflow-y-auto print:hidden">
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t.catalog.numberPrefix}
                {rondo.number} • {rondo.format}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white">
                {rondo.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 cursor-pointer"
            >
              <Minimize2 className="w-4 h-4 text-emerald-400" />
              <span>{t.catalog.fullscreenExit}</span>
            </button>
          </div>

          <div className="my-auto w-full">{renderBoardContent(true)}</div>

          {/* Quick Phase Stepper Controls in Fullscreen (No duplicate Auto-Play button) */}
          <div className="w-full max-w-5xl mx-auto mt-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm min-w-0">
              <div className="font-bold text-emerald-400 mb-0.5">
                {phaseTitle}
              </div>
              <p className="text-slate-300 leading-relaxed">{phaseDesc}</p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {onPhaseChange && (
                <button
                  type="button"
                  onClick={() =>
                    onPhaseChange(
                      (safePhaseIndex - 1 + totalPhases) % totalPhases
                    )
                  }
                  aria-label={t.catalog.prevPhase}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: totalPhases }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onPhaseChange && onPhaseChange(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      safePhaseIndex === idx
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t.catalog.phaseLabel} {idx + 1}
                  </button>
                ))}
              </div>

              {onPhaseChange && (
                <button
                  type="button"
                  onClick={() =>
                    onPhaseChange((safePhaseIndex + 1) % totalPhases)
                  }
                  aria-label={t.catalog.nextPhase}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
