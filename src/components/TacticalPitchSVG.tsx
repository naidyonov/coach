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
}

export const TacticalPitchSVG: React.FC<TacticalPitchSVGProps> = ({
  rondo,
  phaseIndex,
  onPhaseChange,
  showPasses,
  showMovements,
  showShadows,
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
      className={`tactical-pitch-canvas relative rounded-2xl overflow-hidden border border-emerald-800/80 bg-emerald-950 shadow-2xl select-none ${
        inModal ? 'w-full max-w-5xl mx-auto' : 'w-full'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Grid Label, Legend, and Fullscreen Toggle */}
      <div className="bg-slate-900/95 px-3 sm:px-4 py-2 border-b border-slate-800 text-xs space-y-1.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-emerald-300 tracking-wide truncate">
              {scene.gridLabel}
            </span>
            {hasCustomPositions && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-medium shrink-0">
                <Move className="w-3 h-3" />
                {lang === 'ru'
                  ? 'Своя'
                  : lang === 'de'
                  ? 'Eigen'
                  : 'Custom'}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={
              isFullscreen ? t.catalog.fullscreenExit : t.catalog.fullscreenEnter
            }
            className="sm:hidden inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer print:hidden shrink-0"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3.5 text-[11px] sm:text-xs text-slate-300">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block border border-white/80 shadow-sm" />
              <span>{t.catalog.legendPossession}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block border border-white/80 shadow-sm" />
              <span>{t.catalog.legendDefenders}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block border border-slate-900 shadow-sm" />
              <span>{t.catalog.legendNeutral}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={
              isFullscreen ? t.catalog.fullscreenExit : t.catalog.fullscreenEnter
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer print:hidden"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">
                  {t.catalog.fullscreenExit}
                </span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">
                  {t.catalog.fullscreenEnter}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Pitch Controls Bar: Auto-Play, Replay Pass, Speed, and Whiteboard Reset */}
      <div className="bg-slate-900/80 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800/80 text-xs print:hidden">
        <div className="flex items-center gap-1.5 flex-wrap flex-1 justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            {/* Auto-Play / Pause Button */}
            <button
              type="button"
              data-testid={
                inModal ? 'pitch-autoplay-btn-modal' : 'pitch-autoplay-btn'
              }
              onClick={() => setIsPlaying((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer border ${
                isPlaying
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'ru' ? 'Пауза' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
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
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
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
                <span>
                  {lang === 'ru'
                    ? 'Повтор паса'
                    : lang === 'de'
                    ? 'Pass'
                    : 'Replay Pass'}
                </span>
              </button>
            )}
          </div>

          {/* Speed Selector Pill */}
          <div className="inline-flex items-center rounded-lg bg-slate-950/80 p-0.5 border border-slate-800">
            {([0.75, 1, 1.5] as const).map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Whiteboard Helper & Reset Button */}
        <div className="flex items-center gap-2">
          {hasCustomPositions ? (
            <button
              type="button"
              data-testid={
                inModal
                  ? 'pitch-reset-positions-btn-modal'
                  : 'pitch-reset-positions-btn'
              }
              onClick={handleResetPositions}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {lang === 'ru'
                  ? 'Сбросить расстановку'
                  : lang === 'de'
                  ? 'Positionen zurücksetzen'
                  : 'Reset Positions'}
              </span>
            </button>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400">
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

          {/* Quick Phase Stepper Controls in Fullscreen */}
          <div className="w-full max-w-5xl mx-auto mt-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-1.5">
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

              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  isPlaying
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'ru' ? 'Пауза' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {lang === 'ru'
                        ? 'Авто-показ фаз'
                        : lang === 'de'
                        ? 'Phasen Auto-Play'
                        : 'Auto-Play Phases'}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs sm:text-sm">
              <div className="font-bold text-emerald-400 mb-0.5">
                {phaseTitle}
              </div>
              <p className="text-slate-300 leading-relaxed">{phaseDesc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
