import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';

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
    <div className="space-y-6">
      {/* Header & Rondo Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              {t.monthly.matrixBadge}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t.monthly.planTitlePrefix}{' '}
              <span className="text-emerald-400">{selectedRondo.title}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {t.monthly.planSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[270px]">
            <label
              htmlFor="monthly-rondo-select"
              className="text-xs text-slate-400 font-semibold uppercase tracking-wider"
            >
              {t.monthly.selectRondoLabel}
            </label>
            <select
              id="monthly-rondo-select"
              value={selectedRondo.id}
              onChange={(e) => onSelectRondoId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
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
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-300">
              {t.monthly.progressPrefix}{' '}
              <span className="text-emerald-400 font-bold">
                {completedSessions.length} {t.monthly.progressMiddle} 8
              </span>{' '}
              {t.monthly.progressSuffix}
            </div>
            <span className="text-xs text-slate-500">({t.monthly.progressHint})</span>
          </div>
          <div className="w-full sm:w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${(completedSessions.length / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 8 Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monthlyPlan.map((item) => {
          const isDone = completedSessions.includes(item.session);
          const isAttackFocus =
            item.focusSide.includes('АТАК') ||
            item.focusSide.includes('ATTACK') ||
            item.focusSide.includes('Attack');
          const isDefenseFocus =
            item.focusSide.includes('ОБОРОН') ||
            item.focusSide.includes('DEFENS') ||
            item.focusSide.includes('Defens');

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
              className={`group cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-200 group-hover:bg-slate-700'
                    }`}
                  >
                    #{item.session}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">{item.week}</div>
                    <span
                      className={`inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded border ${item.stageBadge}`}
                    >
                      {item.stage}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    isAttackFocus
                      ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                      : isDefenseFocus
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {item.focusSide}
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {item.goal}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {item.conditions}
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {t.monthly.loadPrefix}{' '}
                  <strong className="text-slate-200">{item.loadU15}</strong>
                </span>
                <span
                  className={`font-semibold flex items-center gap-1 ${
                    isDone ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isDone ? t.monthly.completedBadge : t.monthly.markCompletedBtn}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 90-Minute Session Structure */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          {t.monthly.sessionStructureTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {t.monthly.sessionBlocks.map((block, idx) => (
            <div
              key={idx}
              className={
                block.highlighted
                  ? 'bg-emerald-950/30 border-2 border-emerald-500/50 rounded-xl p-4 relative'
                  : 'bg-slate-950 border border-slate-800 rounded-xl p-4'
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
