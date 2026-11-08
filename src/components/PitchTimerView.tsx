import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Timer,
  Volume2,
  VolumeX,
  Trophy,
  MessageSquare,
  Zap
} from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';

export interface PitchTimerViewProps {
  selectedRondo?: RondoItem;
}

const getRondoTimerPreset = (
  rondo: RondoItem
): { work: number; rest: number; sets: number } => {
  switch (rondo.id) {
    case 'rondo-1':
      return { work: 90, rest: 30, sets: 4 };
    case 'rondo-2':
      return { work: 120, rest: 40, sets: 4 };
    case 'rondo-3':
      return { work: 150, rest: 45, sets: 4 };
    case 'rondo-4':
      return { work: 180, rest: 60, sets: 3 };
    case 'rondo-5':
      return { work: 150, rest: 45, sets: 4 };
    case 'rondo-6':
      return { work: 240, rest: 60, sets: 3 };
    case 'rondo-7':
      return { work: 120, rest: 45, sets: 4 };
    case 'rondo-8':
      return { work: 150, rest: 60, sets: 4 };
    case 'rondo-9':
      return { work: 120, rest: 45, sets: 4 };
    case 'rondo-10':
      return { work: 150, rest: 45, sets: 4 };
    default:
      return { work: 120, rest: 40, sets: 4 };
  }
};

export const PitchTimerView: React.FC<PitchTimerViewProps> = ({ selectedRondo }) => {
  const { lang, t } = useLanguage();

  const [workSeconds, setWorkSeconds] = useState<number>(120); // 2 min default
  const [restSeconds, setRestSeconds] = useState<number>(40);
  const [totalSets, setTotalSets] = useState<number>(4);

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [isWorkPhase, setIsWorkPhase] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playWhistle = useCallback(
    (type: 'start' | 'rest') => {
      if (!soundEnabled) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'start') {
          osc.frequency.setValueAtTime(2800, ctx.currentTime);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        } else {
          osc.frequency.setValueAtTime(2400, ctx.currentTime);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        }
      } catch {
        // Ignore audio errors on restricted browsers
      }
    },
    [soundEnabled]
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (isWorkPhase) {
          playWhistle('rest');
          setIsWorkPhase(false);
          return restSeconds;
        } else {
          if (currentSet < totalSets) {
            playWhistle('start');
            setCurrentSet((s) => s + 1);
            setIsWorkPhase(true);
            return workSeconds;
          } else {
            playWhistle('rest');
            setIsRunning(false);
            return 0;
          }
        }
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning, isWorkPhase, restSeconds, workSeconds, currentSet, totalSets, playWhistle]);

  const applyPreset = (work: number, rest: number, sets: number) => {
    setIsRunning(false);
    setWorkSeconds(work);
    setRestSeconds(rest);
    setTotalSets(sets);
    setCurrentSet(1);
    setIsWorkPhase(true);
    setTimeLeft(work);
  };

  const adjustWork = (delta: number) => {
    const next = Math.max(15, Math.min(600, workSeconds + delta));
    setWorkSeconds(next);
    if (!isRunning && isWorkPhase) {
      setTimeLeft(next);
    }
  };

  const adjustRest = (delta: number) => {
    const next = Math.max(10, Math.min(300, restSeconds + delta));
    setRestSeconds(next);
    if (!isRunning && !isWorkPhase) {
      setTimeLeft(next);
    }
  };

  const adjustSets = (delta: number) => {
    const next = Math.max(1, Math.min(12, totalSets + delta));
    setTotalSets(next);
    if (currentSet > next) {
      setCurrentSet(next);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const rondoPreset = selectedRondo ? getRondoTimerPreset(selectedRondo) : null;
  const isRondoPresetActive =
    rondoPreset !== null &&
    workSeconds === rondoPreset.work &&
    restSeconds === rondoPreset.rest &&
    totalSets === rondoPreset.sets;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {t.timer.badge}
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{t.timer.title}</h2>
            {selectedRondo && (
              <p className="text-xs text-slate-400 mt-1">
                #{selectedRondo.number} {selectedRondo.title} ({selectedRondo.timingU15})
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              soundEnabled
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {soundEnabled ? t.timer.whistleOn : t.timer.whistleOff}
          </button>
        </div>

        {/* Active Rondo One-Tap Preset Banner */}
        {selectedRondo && rondoPreset && (
          <div className="mb-4">
            <button
              type="button"
              data-testid="timer-active-rondo-preset-btn"
              onClick={() =>
                applyPreset(rondoPreset.work, rondoPreset.rest, rondoPreset.sets)
              }
              className={`w-full flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                isRondoPresetActive
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-950/90 border-emerald-500/40 hover:border-emerald-400 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-emerald-300">
                    {lang === 'ru'
                      ? `Загрузить дозировку выбранного рондо №${selectedRondo.number}`
                      : lang === 'de'
                      ? `Belastung für gewähltes Rondo #${selectedRondo.number} laden`
                      : `Load Selected Rondo #${selectedRondo.number} Dosage`}
                  </div>
                  <div className="text-xs text-slate-300">
                    {selectedRondo.shortTitle || selectedRondo.title} —{' '}
                    <span className="font-semibold text-white">
                      {selectedRondo.timingU15}
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold shrink-0">
                {rondoPreset.sets} × {formatTime(rondoPreset.work)} / {rondoPreset.rest}s
              </span>
            </button>
          </div>
        )}

        {/* Standard Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <button
            type="button"
            onClick={() => applyPreset(90, 30, 4)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              workSeconds === 90 && restSeconds === 30 && totalSets === 4
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-emerald-500/50 text-slate-200'
            }`}
          >
            {t.timer.presets.small}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(150, 45, 4)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              workSeconds === 150 && restSeconds === 45 && totalSets === 4
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-emerald-500/50 text-slate-200'
            }`}
          >
            {t.timer.presets.medium}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(240, 60, 3)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              workSeconds === 240 && restSeconds === 60 && totalSets === 3
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-emerald-500/50 text-slate-200'
            }`}
          >
            {t.timer.presets.positional}
          </button>
        </div>

        {/* Quick Thumb-Friendly +/- Controls */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              {t.timer.customWorkLabel}
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => adjustWork(-15)}
                aria-label="Decrease work time"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-sm text-emerald-400">
                {formatTime(workSeconds)}
              </span>
              <button
                type="button"
                onClick={() => adjustWork(15)}
                aria-label="Increase work time"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              {t.timer.customRestLabel}
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => adjustRest(-5)}
                aria-label="Decrease rest time"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-sm text-amber-400">
                {restSeconds}
                {t.timer.secondsUnit}
              </span>
              <button
                type="button"
                onClick={() => adjustRest(5)}
                aria-label="Increase rest time"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              {t.timer.customSetsLabel}
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => adjustSets(-1)}
                aria-label="Decrease sets"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-sm text-white">{totalSets}</span>
              <button
                type="button"
                onClick={() => adjustSets(1)}
                aria-label="Increase sets"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Countdown Display */}
        <div
          className={`rounded-2xl p-8 text-center border-2 transition-all mb-6 ${
            isWorkPhase
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-amber-950/30 border-amber-500/40'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Timer className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">
              {t.timer.setLabel} {currentSet} {t.timer.ofLabel} {totalSets}
            </span>
            <span className="text-slate-600">•</span>
            <span className={isWorkPhase ? 'text-emerald-400' : 'text-amber-400'}>
              {isWorkPhase ? t.timer.workPhaseText : t.timer.restPhaseText}
            </span>
          </div>

          <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-tight my-4">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                if (!isRunning && timeLeft === workSeconds && currentSet === 1) {
                  playWhistle('start');
                }
                setIsRunning(!isRunning);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunning ? t.timer.pauseBtn : t.timer.startBtn}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setCurrentSet(1);
                setIsWorkPhase(true);
                setTimeLeft(workSeconds);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {t.timer.resetBtn}
            </button>
          </div>
        </div>

        {/* Live On-Pitch Reference Card for the Active Rondo */}
        {selectedRondo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-1">
                <Trophy className="w-3.5 h-3.5 shrink-0" />
                <span>{t.catalog.scoringRuleTitle}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedRondo.scoringRule}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>{t.catalog.coachingCuesTitle}</span>
              </div>
              <ul className="space-y-1">
                {selectedRondo.coachingCues.map((cue, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 leading-snug flex items-start gap-1.5"
                  >
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>“{cue}”</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

