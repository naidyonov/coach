import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { RondoItem } from '../i18n/types';
import { useLanguage } from '../i18n/LanguageContext';

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
  showShadows
}) => {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const phases = rondo.diagram.phases;
  const safePhaseIndex = Math.min(phaseIndex, phases.length - 1);
  const phase = phases[safePhaseIndex] || phases[0];
  const { cones, type, gridLabel } = rondo.diagram;

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft' && onPhaseChange) {
        onPhaseChange((safePhaseIndex - 1 + phases.length) % phases.length);
      } else if (e.key === 'ArrowRight' && onPhaseChange) {
        onPhaseChange((safePhaseIndex + 1) % phases.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onPhaseChange, safePhaseIndex, phases.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (
      !onPhaseChange ||
      touchStartXRef.current === null ||
      touchStartYRef.current === null ||
      e.changedTouches.length === 0
    ) {
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Trigger horizontal swipe when horizontal movement exceeds 45px and dominates vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        onPhaseChange((safePhaseIndex + 1) % phases.length);
      } else {
        onPhaseChange((safePhaseIndex - 1 + phases.length) % phases.length);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Compute grid geometry dynamically from cone coordinates
  const renderGridMarkings = () => {
    if (type === 'single_square' && cones.length >= 4) {
      const x = cones[0].x;
      const y = cones[0].y;
      const w = cones[1].x - cones[0].x;
      const h = cones[2].y - cones[0].y;
      return (
        <g>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="rgba(16, 185, 129, 0.05)"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            rx="4"
          />
          {rondo.id === 'rondo-7' && (
            <g stroke="rgba(244, 63, 94, 0.65)" strokeWidth="1.5" strokeDasharray="4 3" fill="rgba(244, 63, 94, 0.12)">
              <rect x={x} y={y} width={48} height={48} />
              <rect x={x + w - 48} y={y} width={48} height={48} />
              <rect x={x} y={y + h - 48} width={48} height={48} />
              <rect x={x + w - 48} y={y + h - 48} width={48} height={48} />
            </g>
          )}
        </g>
      );
    }

    if (type === 'double_zone' && cones.length >= 6) {
      const x = cones[0].x;
      const y = cones[0].y;
      const midX = cones[1].x;
      const w = cones[2].x - cones[0].x;
      const h = cones[3].y - cones[0].y;
      return (
        <g>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="rgba(16, 185, 129, 0.05)"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2.5"
            rx="4"
          />
          <line
            x1={midX}
            y1={y}
            x2={midX}
            y2={y + h}
            stroke="rgba(251, 191, 36, 0.85)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
        </g>
      );
    }

    if (type === 'concentric_square' && cones.length >= 8) {
      const ox = cones[0].x;
      const oy = cones[0].y;
      const ow = cones[1].x - cones[0].x;
      const oh = cones[2].y - cones[0].y;

      const ix = cones[4].x;
      const iy = cones[4].y;
      const iw = cones[5].x - cones[4].x;
      const ih = cones[6].y - cones[4].y;

      return (
        <g>
          <rect
            x={ox}
            y={oy}
            width={ow}
            height={oh}
            fill="rgba(16, 185, 129, 0.04)"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            rx="4"
          />
          <rect
            x={ix}
            y={iy}
            width={iw}
            height={ih}
            fill="rgba(245, 158, 11, 0.1)"
            stroke="rgba(251, 191, 36, 0.85)"
            strokeWidth="2"
            strokeDasharray="6 4"
            rx="3"
          />
        </g>
      );
    }

    return null;
  };

  const renderBoardContent = (inModal = false) => (
    <div
      className={`relative rounded-2xl overflow-hidden border border-emerald-800/80 bg-emerald-950 shadow-2xl select-none ${
        inModal ? 'w-full max-w-5xl mx-auto' : 'w-full'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Grid Label, Legend, and Fullscreen Toggle */}
      <div className="bg-slate-900/95 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300 tracking-wide">
            {gridLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block border border-white/80 shadow-sm" />
            <span>{t.catalog.legendPossession}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block border border-white/80 shadow-sm" />
            <span>{t.catalog.legendDefenders}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border border-slate-900 shadow-sm" />
            <span>{t.catalog.legendNeutral}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? t.catalog.fullscreenExit : t.catalog.fullscreenEnter}
            className="ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer print:hidden"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t.catalog.fullscreenExit}</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t.catalog.fullscreenEnter}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Pitch */}
      <svg
        viewBox="0 0 500 400"
        className={`w-full h-auto block ${inModal ? 'max-h-[70vh]' : ''}`}
        role="img"
        aria-label={`${rondo.title} - ${phase.title}`}
      >
        <defs>
          {/* Drop Shadow for Players & Ball */}
          <filter id="token-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.55" />
          </filter>

          {/* Arrow Markers */}
          <marker
            id="arrow-pass-primary"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#facc15" />
          </marker>

          <marker
            id="arrow-pass-secondary"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#e2e8f0" />
          </marker>

          <marker
            id="arrow-move-att"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#fca5a5" />
          </marker>

          <marker
            id="arrow-move-def"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#93c5fd" />
          </marker>

          <marker
            id="arrow-move-neutral"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#fde047" />
          </marker>
        </defs>

        {/* Lawn Stripes */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((stripeIdx) => (
          <rect
            key={stripeIdx}
            x={stripeIdx * 50}
            y={0}
            width={50}
            height={400}
            fill={stripeIdx % 2 === 0 ? '#064e3b' : '#065f46'}
          />
        ))}

        {/* Subtle Pitch Border */}
        <rect
          x={12}
          y={12}
          width={476}
          height={376}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          rx="8"
        />

        {/* Dynamic Rondo Grid Markings */}
        {renderGridMarkings()}

        {/* Cover Shadows / Pressing Traps */}
        {showShadows &&
          phase.shadows.map((shadow, idx) => (
            <polygon
              key={`shadow-${idx}`}
              points={shadow.points}
              fill="rgba(244, 63, 94, 0.24)"
              stroke="rgba(251, 113, 133, 0.65)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          ))}

        {/* Orange Cones */}
        {cones.map((cone, idx) => (
          <g key={`cone-${idx}`} transform={`translate(${cone.x}, ${cone.y})`}>
            <polygon
              points="0,-8 -7,6 7,6"
              fill="#f97316"
              stroke="#fff7ed"
              strokeWidth="1.2"
            />
            <circle cx="0" cy="1" r="1.5" fill="#ffedd5" />
          </g>
        ))}

        {/* Off-Ball Movement Vectors */}
        {showMovements &&
          phase.movements.map((mv, idx) => {
            const midX = (mv.from.x + mv.to.x) / 2;
            const midY = (mv.from.y + mv.to.y) / 2;
            const strokeColor =
              mv.role === 'def'
                ? '#93c5fd'
                : mv.role === 'neutral'
                ? '#fde047'
                : '#fca5a5';
            const markerId =
              mv.role === 'def'
                ? 'url(#arrow-move-def)'
                : mv.role === 'neutral'
                ? 'url(#arrow-move-neutral)'
                : 'url(#arrow-move-att)';

            return (
              <g key={`mv-${idx}`}>
                <line
                  x1={mv.from.x}
                  y1={mv.from.y}
                  x2={mv.to.x}
                  y2={mv.to.y}
                  stroke={strokeColor}
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                  markerEnd={markerId}
                />
                {mv.label && (
                  <g transform={`translate(${midX}, ${midY - 8})`}>
                    <rect
                      x={-mv.label.length * 3.1 - 6}
                      y={-9}
                      width={mv.label.length * 6.2 + 12}
                      height={16}
                      rx={4}
                      fill="rgba(15, 23, 42, 0.82)"
                      stroke={strokeColor}
                      strokeWidth="0.8"
                    />
                    <text
                      x={0}
                      y={2}
                      textAnchor="middle"
                      fill={strokeColor}
                      fontSize="9.5"
                      fontWeight="600"
                    >
                      {mv.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

        {/* Pass Vectors */}
        {showPasses &&
          phase.passes.map((pass, idx) => {
            const midX = (pass.from.x + pass.to.x) / 2;
            const midY = (pass.from.y + pass.to.y) / 2;
            const strokeColor = pass.primary ? '#facc15' : '#e2e8f0';
            const markerId = pass.primary
              ? 'url(#arrow-pass-primary)'
              : 'url(#arrow-pass-secondary)';

            return (
              <g key={`pass-${idx}`}>
                <line
                  x1={pass.from.x}
                  y1={pass.from.y}
                  x2={pass.to.x}
                  y2={pass.to.y}
                  stroke={strokeColor}
                  strokeWidth={pass.primary ? '3.2' : '2.2'}
                  strokeDasharray={pass.primary ? undefined : '6 4'}
                  markerEnd={markerId}
                />
                {pass.label && (
                  <g transform={`translate(${midX}, ${midY + 12})`}>
                    <rect
                      x={-pass.label.length * 3.3 - 7}
                      y={-10}
                      width={pass.label.length * 6.6 + 14}
                      height={17}
                      rx={4}
                      fill="rgba(15, 23, 42, 0.9)"
                      stroke={strokeColor}
                      strokeWidth="1"
                    />
                    <text
                      x={0}
                      y={2}
                      textAnchor="middle"
                      fill={strokeColor}
                      fontSize="10"
                      fontWeight="700"
                    >
                      {pass.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

        {/* Players */}
        {phase.players.map((p) => {
          const fill =
            p.role === 'att'
              ? '#ef4444'
              : p.role === 'def'
              ? '#3b82f6'
              : '#facc15';
          const textColor = p.role === 'neutral' ? '#0f172a' : '#ffffff';
          const stroke = p.role === 'neutral' ? '#0f172a' : '#ffffff';

          return (
            <g
              key={p.id}
              transform={`translate(${p.x}, ${p.y})`}
              style={{ transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}
              filter="url(#token-shadow)"
            >
              <circle
                cx={0}
                cy={0}
                r={15}
                fill={fill}
                stroke={stroke}
                strokeWidth="2.5"
              />
              <text
                x={0}
                y={4.5}
                textAnchor="middle"
                fill={textColor}
                fontSize="11.5"
                fontWeight="800"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Football */}
        {phase.ball && (
          <g
            transform={`translate(${phase.ball.x}, ${phase.ball.y})`}
            style={{ transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            filter="url(#token-shadow)"
          >
            <circle
              cx={0}
              cy={0}
              r={9.5}
              fill="rgba(250, 204, 21, 0.28)"
            />
            <circle
              cx={0}
              cy={0}
              r={6.5}
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <polygon points="0,-3 2.8,-0.8 1.7,2.5 -1.7,2.5 -2.8,-0.8" fill="#0f172a" />
          </g>
        )}
      </svg>
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
                {t.catalog.numberPrefix}{rondo.number} • {rondo.format}
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

          <div className="my-auto w-full">
            {renderBoardContent(true)}
          </div>

          {/* Quick Phase Stepper Controls in Fullscreen */}
          <div className="w-full max-w-5xl mx-auto mt-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                {onPhaseChange && (
                  <button
                    type="button"
                    onClick={() =>
                      onPhaseChange((safePhaseIndex - 1 + phases.length) % phases.length)
                    }
                    aria-label={t.catalog.prevPhase}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <div className="flex flex-wrap items-center gap-1.5">
                  {phases.map((_, idx) => (
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
                    onClick={() => onPhaseChange((safePhaseIndex + 1) % phases.length)}
                    aria-label={t.catalog.nextPhase}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm">
              <div className="font-bold text-emerald-400 mb-0.5">{phase.title}</div>
              <p className="text-slate-300 leading-relaxed">{phase.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
