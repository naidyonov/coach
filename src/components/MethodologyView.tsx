import React from 'react';
import { Award, Eye, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface MethodologyViewProps {
  onSelectRondoAndOpenCatalog: (rondoId: string) => void;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({
  onSelectRondoAndOpenCatalog,
}) => {
  const { t, rondos } = useLanguage();

  const renderIcon = (iconName: 'eye' | 'award' | 'zap') => {
    switch (iconName) {
      case 'eye':
        return <Eye className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 3 Core Methodology Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {t.methodology.cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}>
              {renderIcon(card.icon)}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              {card.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800"
                >
                  <strong className={`${bullet.accentColor} block mb-0.5`}>
                    {bullet.title}
                  </strong>
                  {bullet.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Master Cheat-Sheet Table of All 10 Rondos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-base font-bold text-white mb-4">
          {t.methodology.tableTitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-3 px-3">{t.methodology.tableHeaders.num}</th>
                <th className="py-3 px-3">{t.methodology.tableHeaders.rondo}</th>
                <th className="py-3 px-3">{t.methodology.tableHeaders.goal}</th>
                <th className="py-3 px-3">{t.methodology.tableHeaders.baseArea}</th>
                <th className="py-3 px-3">{t.methodology.tableHeaders.intensiveArea}</th>
                <th className="py-3 px-3">{t.methodology.tableHeaders.setsAndRest}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {rondos.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => onSelectRondoAndOpenCatalog(r.id)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                    {r.number}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-white">{r.title}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded border ${r.badgeColor}`}
                    >
                      {r.categoryName}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono">{r.dimensionsU15.base}</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">
                    {r.dimensionsU15.intensive}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{r.timingU15}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
