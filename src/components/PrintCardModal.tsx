import React from 'react';
import { Printer, X } from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';
import { TacticalPitchSVG } from './TacticalPitchSVG';

export interface PrintCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRondo: RondoItem;
  phaseIndex: number;
}

export const PrintCardModal: React.FC<PrintCardModalProps> = ({
  isOpen,
  onClose,
  selectedRondo,
  phaseIndex
}) => {
  const {
    lang,
    t,
    generateMonthlyPlan,
    currentAgeBandInfo,
    getRondoAgeVariant,
    getRondoMethodology,
  } = useLanguage();

  if (!isOpen) {
    return null;
  }

  const monthlySessions = generateMonthlyPlan(selectedRondo);
  const ageVariant = getRondoAgeVariant(selectedRondo.id);
  const methodology = getRondoMethodology(selectedRondo.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                {t.printModal.badge}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {currentAgeBandInfo.label} • {currentAgeBandInfo.stageTitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {t.catalog.numberPrefix}{selectedRondo.number} • {selectedRondo.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printModal.printBtn}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>{t.printModal.closeBtn}</span>
            </button>
          </div>
        </div>

        {/* Diagram + Age-Adapted Parameters & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-6 space-y-3">
            <TacticalPitchSVG
              rondo={selectedRondo}
              phaseIndex={phaseIndex}
              showPasses={true}
              showMovements={true}
              showShadows={true}
            />

            {/* Methodological & Scientific Basis Summary on Print Card */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs space-y-2">
              <div>
                <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  {lang === 'ru' ? 'Методическая школа и первоисточник' : 'Methodological Lineage & Origin'}
                </div>
                <p className="text-slate-200 font-semibold leading-snug mt-0.5">
                  {methodology.originSchool}
                </p>
              </div>
              <div>
                <div className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                  {lang === 'ru' ? 'Научный и биомеханический базис' : 'Scientific & Biomechanical Basis'}
                </div>
                <p className="text-slate-300 leading-snug mt-0.5">
                  {methodology.scientificBasis}
                </p>
              </div>
              <div>
                <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                  {lang === 'ru' ? 'Перенос в матч 11×11' : 'Match Transfer (11v11)'}
                </div>
                <p className="text-slate-300 leading-snug mt-0.5">
                  {methodology.matchTransfer}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div>
                <span className="text-slate-400 font-semibold">
                  {t.printModal.dimensionsLabel}{' '}
                </span>
                <span className="text-white font-bold">
                  {ageVariant.baseGrid}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">
                  {t.printModal.intensiveLabel}{' '}
                </span>
                <span className="text-emerald-400 font-bold">
                  {ageVariant.intensiveGrid}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">
                  {t.printModal.dosageLabel}{' '}
                </span>
                <span className="text-amber-300 font-bold">
                  {ageVariant.timing} • {ageVariant.touchesRule}
                </span>
              </div>
              <div className="pt-1 border-t border-slate-800/80 text-emerald-300">
                <span className="font-bold">{currentAgeBandInfo.label}: </span>
                <span>{ageVariant.ageCoachingFocus}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-950/20 border border-red-800/40">
              <div className="font-bold text-red-400 mb-0.5">
                {t.printModal.attackGoalLabel}
              </div>
              <p className="text-slate-200 leading-relaxed">
                {selectedRondo.attackGoal}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/40">
              <div className="font-bold text-blue-400 mb-0.5">
                {t.printModal.defenseGoalLabel}
              </div>
              <p className="text-slate-200 leading-relaxed">
                {selectedRondo.defenseGoal}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40">
              <div className="font-bold text-amber-400 mb-0.5">
                {t.printModal.scoringRuleLabel}
              </div>
              <p className="text-slate-200 leading-relaxed">
                {selectedRondo.scoringRule}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">
                {t.catalog.coachingCuesTitle}
              </div>
              <ul className="space-y-1 text-slate-300">
                {selectedRondo.coachingCues.map((cue, idx) => (
                  <li key={idx} className="leading-snug">
                    • {cue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 8-Session Monthly Progression Summary */}
        <div className="pt-3 border-t border-slate-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2.5">
            {t.printModal.monthlyProgressionTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {monthlySessions.map((item) => (
              <div
                key={item.session}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-black text-emerald-400">
                      {t.printModal.sessionShortPrefix} #{item.session}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.week}</span>
                  </div>
                  <div className="font-bold text-white mb-1 leading-snug">
                    {item.stage}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-snug mb-1.5">
                    {item.goal}
                  </p>
                </div>
                <div className="text-[10px] text-amber-300/90 font-mono pt-1 border-t border-slate-800/80">
                  {item.loadU15}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
