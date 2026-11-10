import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';
import { classifySessionFocus } from '../domain/periodization';

export interface MonthlyPlanViewProps {
  selectedRondo: RondoItem;
  onSelectRondoId: (id: string) => void;
  completedSessions: number[];
  onToggleSessionComplete: (sessionNum: number) => void;
}

export const MonthlyPlanView: React.FC<MonthlyPlanViewProps> = ({
  selectedRondo,
  onSelectRondoId,
  completedSessions,
  onToggleSessionComplete,
}) => {
  const { t, rondos, generateMonthlyPlan } = useLanguage();
  const monthlyPlan = generateMonthlyPlan(selectedRondo);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Compact Header, Rondo Selector & Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold mb-1.5">
              <Calendar className="w-3 h-3" />
              <span>{t.monthly.matrixBadge}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {t.monthly.planTitlePrefix}{' '}
              <span className="text-emerald-400">{selectedRondo.title}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-1 w-full lg:w-72 shrink-0">
            <label
              htmlFor="monthly-rondo-select"
              className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider"
            >
              {t.monthly.selectRondoLabel}
            </label>
            <select
              id="monthly-rondo-select"
              value={selectedRondo.id}
              onChange={(e) => onSelectRondoId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-semibold"
            >
              {rondos.map((r) => (
                <option key={r.id} value={r.id}>
                  #{r.number} — {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-xs">
            <span className="font-semibold text-slate-300">
              {t.monthly.progressPrefix}{' '}
              <span className="text-emerald-400 font-bold">
                {completedSessions.length} {t.monthly.progressMiddle} 8
              </span>{' '}
              {t.monthly.progressSuffix}
            </span>
          </div>
          <div className="w-full sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${(completedSessions.length / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 8 Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {monthlyPlan.map((item) => {
          const isDone = completedSessions.includes(item.session);
          const focusCategory = classifySessionFocus(item);
          const isAttackFocus = focusCategory === 'attack';
          const isDefenseFocus = focusCategory === 'defense';

          return (
            <div
              key={item.session}
              onClick={() => onToggleSessionComplete(item.session)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleSessionComplete(item.session);
                }
              }}
              className={`group cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Clean Single-Row Aligned Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 flex items-center justify-center font-black text-xs sm:text-sm transition-colors ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200 group-hover:bg-slate-700'
                      }`}
                    >
                      #{item.session}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white leading-tight truncate">
                        {item.week}
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-400 leading-tight mt-0.5 truncate">
                        {item.stage}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                      isAttackFocus
                        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        : isDefenseFocus
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {item.focusSide}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {item.goal}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3.5 border-l-2 border-slate-700 pl-3 py-0.5">
                  {item.conditions}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs pt-2.5 border-t border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium min-w-0">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.loadU15}</span>
                </span>
                <span
                  className={`shrink-0 font-semibold flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-colors ${
                    isDone
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isDone ? t.monthly.completedBadge : t.monthly.markCompletedBtn}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 90-Minute Session Structure */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-white mb-3.5 flex items-center gap-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <span>{t.monthly.sessionStructureTitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {t.monthly.sessionBlocks.map((block, idx) => (
            <div
              key={idx}
              className={
                block.highlighted
                  ? 'bg-emerald-950/30 border-2 border-emerald-500/50 rounded-xl p-3.5 relative'
                  : 'bg-slate-950 border border-slate-800 rounded-xl p-3.5'
              }
            >
              <div className={`${block.accentColor || 'text-slate-400'} font-bold mb-1`}>
                {block.step}
              </div>
              <div className="text-white font-semibold mb-1">{block.title}</div>
              <p className={block.highlighted ? 'text-slate-300' : 'text-slate-400'}>
                {block.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
