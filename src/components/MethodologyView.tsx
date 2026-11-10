import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Eye,
  HelpCircle,
  Layers,
  MessageSquare,
  Octagon,
  Sparkles,
  Table,
  Wrench,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { GeometryConceptItem } from '../i18n/types';

export interface MethodologyViewProps {
  onSelectRondoAndOpenCatalog: (rondoId: string) => void;
}

type SubTabId = 'all' | 'principles' | 'geometry' | 'interventions' | 'cheatsheet';
type DiagramMode = 'mistake' | 'solution';

const GeometryMiniPitchSVG: React.FC<{
  conceptId: GeometryConceptItem['id'];
  mode: DiagramMode;
  lang: 'en' | 'de' | 'ru';
}> = ({ conceptId, mode, lang }) => {
  const isSolution = mode === 'solution';
  const lbl = (enText: string, deText: string, ruText: string) =>
    lang === 'ru' ? ruText : lang === 'de' ? deText : enText;

  return (
    <svg
      viewBox="0 0 360 215"
      className="w-full h-auto rounded-xl border border-slate-800 bg-emerald-950/90 shadow-inner select-none"
    >
      <defs>
        <pattern
          id={`stripes-${conceptId}`}
          width="36"
          height="215"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="215" fill="rgba(16, 185, 129, 0.04)" />
        </pattern>
        <marker
          id={`arrow-ok-${conceptId}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
        </marker>
        <marker
          id={`arrow-warn-${conceptId}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
        </marker>
        <marker
          id={`arrow-bad-${conceptId}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f87171" />
        </marker>
      </defs>

      {/* Pitch stripes & Rondo square */}
      <rect width="360" height="215" fill={`url(#stripes-${conceptId})`} />
      <rect
        x="45"
        y="22"
        width="270"
        height="170"
        rx="4"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      {/* 4 Corner Cones */}
      {[
        { x: 45, y: 22 },
        { x: 315, y: 22 },
        { x: 45, y: 192 },
        { x: 315, y: 192 },
      ].map((c, i) => (
        <polygon
          key={i}
          points={`${c.x},${c.y - 5} ${c.x - 5},${c.y + 4} ${c.x + 5},${c.y + 4}`}
          fill="#f97316"
        />
      ))}

      {/* CONCEPT 1: 45° SUPPORT ANGLES VS FLAT LINES */}
      {conceptId === 'angles-45' && (
        <g>
          {/* Cover Shadow from D1 */}
          <polygon
            points={
              isSolution
                ? '180,105 125,22 235,22'
                : '180,92 60,22 300,22'
            }
            fill="rgba(239, 68, 68, 0.22)"
            stroke="rgba(239, 68, 68, 0.45)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {!isSolution ? (
            <>
              {/* Blocked flat passes */}
              <line
                x1="180"
                y1="175"
                x2="85"
                y2="42"
                stroke="#f87171"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <line
                x1="180"
                y1="175"
                x2="275"
                y2="42"
                stroke="#f87171"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text
                x="180"
                y="45"
                textAnchor="middle"
                fill="#fca5a5"
                fontSize="10"
                fontWeight="bold"
              >
                {lbl('Both options in shadow!', 'Beide im Deckungsschatten!', 'Оба адресата в тени!')}
              </text>
            </>
          ) : (
            <>
              {/* 45 degree open passes */}
              <line
                x1="180"
                y1="175"
                x2="58"
                y2="112"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <line
                x1="180"
                y1="175"
                x2="302"
                y2="112"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              {/* 45 deg angle arcs */}
              <path
                d="M 155,162 A 30,30 0 0,1 180,148"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
              <text x="135" y="158" fill="#fde68a" fontSize="10" fontWeight="bold">
                45°
              </text>
              <text x="212" y="158" fill="#fde68a" fontSize="10" fontWeight="bold">
                45°
              </text>
            </>
          )}

          {/* Ball-carrier A at bottom */}
          <circle cx="180" cy="185" r="13" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="189" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            A
          </text>
          <circle cx="180" cy="167" r="4.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />

          {/* Teammate B (left) */}
          <circle
            cx={isSolution ? 45 : 80}
            cy={isSolution ? 105 : 32}
            r="12"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={isSolution ? 45 : 80}
            y={isSolution ? 109 : 36}
            textAnchor="middle"
            fill="#fff"
            fontSize="10"
            fontWeight="bold"
          >
            B
          </text>

          {/* Teammate C (right) */}
          <circle
            cx={isSolution ? 315 : 280}
            cy={isSolution ? 105 : 32}
            r="12"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={isSolution ? 315 : 280}
            y={isSolution ? 109 : 36}
            textAnchor="middle"
            fill="#fff"
            fontSize="10"
            fontWeight="bold"
          >
            C
          </text>

          {/* Defender D1 */}
          <circle
            cx="180"
            cy={isSolution ? 105 : 92}
            r="12"
            fill="#3b82f6"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="180"
            y={isSolution ? 109 : 96}
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="bold"
          >
            D1
          </text>
        </g>
      )}

      {/* CONCEPT 2: OPEN BODY SHAPE (PERFILACIÓN) & FAR-FOOT RECEPTION */}
      {conceptId === 'body-shape' && (
        <g>
          {/* Vision Cone of Player B */}
          {isSolution ? (
            <polygon
              points="75,105 315,30 315,185"
              fill="rgba(52, 211, 153, 0.16)"
              stroke="rgba(52, 211, 153, 0.45)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          ) : (
            <polygon
              points="75,105 130,192 225,192"
              fill="rgba(248, 113, 113, 0.18)"
              stroke="rgba(248, 113, 113, 0.45)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          )}

          {/* Pass from A (bottom) to B (left) */}
          <line
            x1="175"
            y1="182"
            x2="86"
            y2="115"
            stroke="#fbbf24"
            strokeWidth="2.5"
            markerEnd={`url(#arrow-warn-${conceptId})`}
          />

          {/* Next action from B */}
          {isSolution ? (
            <>
              <line
                x1="88"
                y1="98"
                x2="295"
                y2="98"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <line
                x1="86"
                y1="92"
                x2="180"
                y2="38"
                stroke="#34d399"
                strokeWidth="2"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="205" y="88" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl('Far-foot → switch open!', 'Ferner Fuß → offenes Feld!', 'Дальняя нога → разворот!')}
              </text>
            </>
          ) : (
            <>
              <line
                x1="85"
                y1="118"
                x2="155"
                y2="168"
                stroke="#f87171"
                strokeWidth="2"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="195" y="85" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl('Back turned to pitch!', 'Rücken zum Zentrum!', 'Спиной к полю — тупик!')}
              </text>
            </>
          )}

          {/* Passer A at bottom */}
          <circle cx="185" cy="185" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="185" y="189" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            A
          </text>

          {/* Receiver B on left line with shoulder/hip orientation bar */}
          <g transform={`translate(72, 105) rotate(${isSolution ? -35 : 55})`}>
            {/* Shoulder bar */}
            <rect
              x="-18"
              y="-4"
              width="36"
              height="8"
              rx="4"
              fill={isSolution ? '#10b981' : '#f87171'}
              stroke="#fff"
              strokeWidth="1.5"
            />
          </g>
          <circle cx="72" cy="105" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="72" y="109" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            B
          </text>
          {/* Ball at B's far foot (top-right of B) vs near foot (bottom of B) */}
          <circle
            cx={isSolution ? 84 : 78}
            cy={isSolution ? 92 : 122}
            r="4.5"
            fill="#fff"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Teammate C (top) & D (right) */}
          <circle cx="195" cy="28" r="11" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="195" y="32" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            C
          </text>
          <circle cx="312" cy="100" r="11" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="312" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            D
          </text>

          {/* Defender D1 */}
          <circle cx="155" cy="128" r="11" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          <text x="155" y="132" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            D1
          </text>
        </g>
      )}

      {/* CONCEPT 3: COVER SHADOW & ARC PRESSING */}
      {conceptId === 'cover-shadow' && (
        <g>
          {isSolution ? (
            <>
              {/* Cover shadow hiding #6 */}
              <polygon
                points="170,115 145,60 235,60"
                fill="rgba(239, 68, 68, 0.26)"
                stroke="rgba(239, 68, 68, 0.5)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Curved arc pressing run by D1 */}
              <path
                d="M 195,90 Q 155,115 175,162"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="115" y="135" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl('Arc press blocks #6!', 'Bogenlauf schließt #6!', 'Дуга прячет №6 в тень!')}
              </text>
            </>
          ) : (
            <>
              {/* Straight run by D1 leaving #6 wide open */}
              <line
                x1="225"
                y1="105"
                x2="192"
                y2="168"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              {/* Exposed vertical pass to #6 */}
              <line
                x1="180"
                y1="172"
                x2="180"
                y2="98"
                stroke="#fbbf24"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-warn-${conceptId})`}
              />
              <text x="115" y="135" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl('Straight run exposes #6!', 'Gerader Lauf öffnet #6!', 'Прямой бег открыл №6!')}
              </text>
            </>
          )}

          {/* Ball-carrier A at bottom */}
          <circle cx="180" cy="185" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="189" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            A
          </text>
          <circle cx="180" cy="168" r="4.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />

          {/* Central Pivot #6 */}
          <circle cx="180" cy="80" r="12" fill="#eab308" stroke="#fff" strokeWidth="2" />
          <text x="180" y="84" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
            6
          </text>

          {/* Defender D1 */}
          <circle
            cx={isSolution ? 172 : 225}
            cy={isSolution ? 120 : 105}
            r="12"
            fill="#3b82f6"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={isSolution ? 172 : 225}
            y={isSolution ? 124 : 109}
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="bold"
          >
            D1
          </text>
        </g>
      )}

      {/* CONCEPT 4: THIRD-MAN COMBINATION (A -> B -> C) */}
      {conceptId === 'third-man' && (
        <g>
          {/* Inner 5x5 Bartolini box */}
          <rect
            x="140"
            y="65"
            width="80"
            height="65"
            fill="rgba(234, 179, 8, 0.08)"
            stroke="rgba(234, 179, 8, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Defender D1 cover shadow screening C */}
          <polygon
            points="180,142 145,82 215,82"
            fill="rgba(239, 68, 68, 0.25)"
            stroke="rgba(239, 68, 68, 0.5)"
            strokeWidth="1"
          />

          {!isSolution ? (
            <>
              {/* Forced direct pass A -> C intercepted by D1 */}
              <line
                x1="180"
                y1="175"
                x2="180"
                y2="148"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="180" y="45" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl(
                  'Direct pass A → C blocked by D1!',
                  'Direktpass A → C von D1 abgefangen!',
                  'Прямой пас А → С перехвачен!'
                )}
              </text>
            </>
          ) : (
            <>
              {/* Pass 1: A -> B */}
              <line
                x1="192"
                y1="180"
                x2="295"
                y2="132"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              {/* Pass 2: 1-touch layoff B -> C */}
              <line
                x1="295"
                y1="122"
                x2="196"
                y2="98"
                stroke="#fbbf24"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-warn-${conceptId})`}
              />
              <text x="265" y="165" fill="#6ee7b7" fontSize="9.5" fontWeight="bold">
                1. A → B
              </text>
              <text x="255" y="96" fill="#fde68a" fontSize="9.5" fontWeight="bold">
                {lbl('2. 1-Touch → C!', '2. Ablage (1 K.) → C!', '2. В 1 кас. → С!')}
              </text>
            </>
          )}

          {/* Player A (First Man) */}
          <circle cx="180" cy="185" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="189" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            A
          </text>
          <circle cx="180" cy="168" r="4.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />

          {/* Player B (Second Man on right perimeter) */}
          <circle cx="310" cy="125" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="310" y="129" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            B
          </text>

          {/* Player C (Third Man in inner box) */}
          <circle cx="180" cy="95" r="12" fill="#eab308" stroke="#fff" strokeWidth="2" />
          <text x="180" y="99" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
            C
          </text>

          {/* Defender D1 blocking A -> C */}
          <circle cx="180" cy="142" r="11" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          <text x="180" y="146" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            D1
          </text>
        </g>
      )}

      {/* ACTIVATION CONCEPT 1: DIRECTIONAL FIRST TOUCH (MITNAHME) VS DEAD-BALL STOP */}
      {conceptId === 'first-touch-escape' && (
        <g>
          {/* Central 5x5 star zone */}
          <rect
            x="140"
            y="72"
            width="80"
            height="70"
            fill="rgba(59, 130, 246, 0.08)"
            stroke="rgba(59, 130, 246, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Entry pass from A1 */}
          <line
            x1="180"
            y1="176"
            x2="180"
            y2="122"
            stroke="#fbbf24"
            strokeWidth="2.5"
            markerEnd={`url(#arrow-warn-${conceptId})`}
          />
          {!isSolution ? (
            <>
              {/* D1 closes down stationary N1 */}
              <line
                x1="125"
                y1="107"
                x2="165"
                y2="107"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="180" y="45" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl(
                  'Dead stop under sole → D1 traps!',
                  'Totstopp unter Sohle → D1 stellt zu!',
                  'Стоп на месте → D1 накрыл!'
                )}
              </text>
            </>
          ) : (
            <>
              {/* Dynamic first touch out of box into space */}
              <line
                x1="190"
                y1="105"
                x2="285"
                y2="82"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="245" y="62" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl(
                  '1st touch = 1st step into space!',
                  '1. Kontakt = 1. Schritt in den Raum!',
                  '1-е касание = уход в свободную зону!'
                )}
              </text>
            </>
          )}
          <circle cx="180" cy="185" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="189" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            A1
          </text>
          <circle
            cx={isSolution ? 205 : 180}
            cy={isSolution ? 102 : 107}
            r="12"
            fill="#eab308"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={isSolution ? 205 : 180}
            y={isSolution ? 106 : 111}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="9"
            fontWeight="bold"
          >
            N1
          </text>
          <circle
            cx={isSolution ? 222 : 180}
            cy={isSolution ? 96 : 118}
            r="4.5"
            fill="#fff"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <circle cx="115" cy="107" r="11" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          <text x="115" y="111" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            D1
          </text>
        </g>
      )}

      {/* ACTIVATION CONCEPT 2: PRE-SCANNING & COLOR GATE ORIENTATION */}
      {conceptId === 'scan-before-touch' && (
        <g>
          {/* Pass from bottom A1 to central N1 */}
          <line
            x1="180"
            y1="176"
            x2="180"
            y2="122"
            stroke="#fbbf24"
            strokeWidth="2.5"
            markerEnd={`url(#arrow-warn-${conceptId})`}
          />
          {isSolution ? (
            <>
              {/* Visual scan cone toward open right gate */}
              <polygon
                points="180,108 275,35 315,95"
                fill="rgba(52, 211, 153, 0.18)"
                stroke="rgba(52, 211, 153, 0.45)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="192"
                y1="104"
                x2="292"
                y2="62"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="235" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl(
                  'Scanned during flight → free gate!',
                  'Im Ballflug gescannt → freies Tor!',
                  'Сканирование в полёте → выход!'
                )}
              </text>
            </>
          ) : (
            <>
              {/* Blind turn into D1 on the left */}
              <line
                x1="168"
                y1="104"
                x2="108"
                y2="68"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="180" y="42" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl(
                  'No scan → turns straight into D1!',
                  'Kein Scan → dreht direkt in D1!',
                  'Без сканирования → разворот в D1!'
                )}
              </text>
            </>
          )}
          <circle cx="180" cy="185" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="189" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            A1
          </text>
          <circle cx="180" cy="108" r="12" fill="#eab308" stroke="#fff" strokeWidth="2" />
          <text x="180" y="112" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            N1
          </text>
          <circle cx="95" cy="60" r="11" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          <text x="95" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            D1
          </text>
          <circle cx="302" cy="55" r="11" fill="#10b981" stroke="#fff" strokeWidth="2" />
          <text x="302" y="59" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            G2
          </text>
        </g>
      )}

      {/* ACTIVATION CONCEPT 3: ECCENTRIC BRAKING & KNEE-OVER-TOE AXIS (FIFA 11+) */}
      {conceptId === 'deceleration-axis' && (
        <g>
          {/* Braking zone box */}
          <rect
            x="145"
            y="78"
            width="70"
            height="55"
            rx="6"
            fill={isSolution ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)'}
            stroke={isSolution ? '#34d399' : '#f87171'}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {!isSolution ? (
            <>
              <line
                x1="80"
                y1="145"
                x2="215"
                y2="95"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="180" y="45" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl(
                  'Tall chest + knee valgus → overruns cut!',
                  'Hohe Hüfte + Knie-Valgus → überläuft!',
                  'Прямые ноги + вальгус колена → снос!'
                )}
              </text>
            </>
          ) : (
            <>
              {/* 3 braking steps + sharp 45 deg cut */}
              <line
                x1="80"
                y1="145"
                x2="172"
                y2="108"
                stroke="#fbbf24"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-warn-${conceptId})`}
              />
              <line
                x1="182"
                y1="102"
                x2="295"
                y2="52"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="180" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl(
                  '3 low braking steps → explosive 45° cut!',
                  '3 tiefe Bremsschritte → 45°-Explosiv-Cut!',
                  '3 низких шага стопа → взрывной срез 45°!'
                )}
              </text>
            </>
          )}
          <circle cx="75" cy="148" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="75" y="152" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            A1
          </text>
          <circle cx="180" cy="105" r="12" fill={isSolution ? '#10b981' : '#f87171'} stroke="#fff" strokeWidth="2" />
          <text x="180" y="109" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            A1
          </text>
          <circle cx="305" cy="48" r="11" fill="#eab308" stroke="#fff" strokeWidth="2" />
          <text x="305" y="52" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            G1
          </text>
        </g>
      )}

      {/* ACTIVATION CONCEPT 4: WIDE-BASE BALL SHIELDING & FOREARM SENSOR */}
      {conceptId === 'shielding-base' && (
        <g>
          {/* Defender B1 pressing from top */}
          <circle cx="180" cy="78" r="12" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          <text x="180" y="82" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            B1
          </text>
          {/* Attacker A1 shielding */}
          <circle cx="180" cy="118" r="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <text x="180" y="122" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
            A1
          </text>
          {!isSolution ? (
            <>
              {/* Ball exposed on near side */}
              <circle cx="165" cy="96" r="4.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />
              <line
                x1="175"
                y1="86"
                x2="166"
                y2="95"
                stroke="#f87171"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-bad-${conceptId})`}
              />
              <text x="180" y="42" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {lbl(
                  'Narrow stance + near foot → easy tackle!',
                  'Schmaler Stand + naher Fuß → Ballverlust!',
                  'Узкая стойка + ближняя нога → потеря!'
                )}
              </text>
            </>
          ) : (
            <>
              {/* Wide shielding bar + ball on far foot + spin arrow */}
              <rect
                x="156"
                y="98"
                width="48"
                height="7"
                rx="3.5"
                fill="#10b981"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <circle cx="180" cy="142" r="4.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />
              <path
                d="M 192,118 Q 245,105 265,60"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-ok-${conceptId})`}
              />
              <text x="180" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                {lbl(
                  'Wide base + far foot + forearm sensor → spin!',
                  'Breite Basis + ferner Fuß + Schutzarm → Spin!',
                  'Широкая база + дальняя нога → разворот!'
                )}
              </text>
            </>
          )}
        </g>
      )}
    </svg>
  );
};

export const MethodologyView: React.FC<MethodologyViewProps> = ({
  onSelectRondoAndOpenCatalog,
}) => {
  const {
    lang,
    t,
    rondos,
    currentAgeBandInfo,
    getRondoAgeVariant,
    getRondoMethodology,
  } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('all');
  const [geometryModes, setGeometryModes] = useState<Record<string, DiagramMode>>({
    'angles-45': 'solution',
    'body-shape': 'solution',
    'cover-shadow': 'solution',
    'third-man': 'solution',
    'first-touch-escape': 'solution',
    'scan-before-touch': 'solution',
    'deceleration-axis': 'solution',
    'shielding-base': 'solution',
  });

  const toggleGeometryMode = (id: string) => {
    setGeometryModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'solution' ? 'mistake' : 'solution',
    }));
  };

  const setGeometryModeExplicit = (id: string, mode: DiagramMode) => {
    setGeometryModes((prev) => ({
      ...prev,
      [id]: mode,
    }));
  };

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

  const subTabs: { id: SubTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.methodology.tabAll, icon: <Layers className="w-4 h-4" /> },
    { id: 'principles', label: t.methodology.tabPrinciples, icon: <Eye className="w-4 h-4" /> },
    { id: 'geometry', label: t.methodology.tabGeometry, icon: <Compass className="w-4 h-4" /> },
    {
      id: 'interventions',
      label: t.methodology.tabInterventions,
      icon: <Octagon className="w-4 h-4" />,
    },
    { id: 'cheatsheet', label: t.methodology.tabCheatSheet, icon: <Table className="w-4 h-4" /> },
  ];

  const showPrinciples = activeSubTab === 'all' || activeSubTab === 'principles';
  const showGeometry = activeSubTab === 'all' || activeSubTab === 'geometry';
  const showInterventions = activeSubTab === 'all' || activeSubTab === 'interventions';
  const showCheatSheet = activeSubTab === 'all' || activeSubTab === 'cheatsheet';

  return (
    <div className="space-y-6">
      {/* Sub-navigation filter bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 flex flex-wrap gap-1.5 shadow-lg">
        {subTabs.map((tab) => {
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: 3 Core Methodology Cards */}
      {showPrinciples && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.methodology.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}
              >
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
      )}

      {/* SECTION 2: Interactive Tactical Geometry, Body Shape & Cover Shadow */}
      {showGeometry && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.methodology.tabGeometry}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {t.methodology.geometrySectionTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.methodology.geometrySectionSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {t.methodology.geometryConcepts.map((concept) => {
              const currentMode = geometryModes[concept.id] || 'solution';
              const isSolution = currentMode === 'solution';

              return (
                <div
                  key={concept.id}
                  className="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-2.5">
                    <div>
                      <h4 className="text-sm font-bold text-white">{concept.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{concept.subtitle}</p>
                    </div>

                    {/* Dual Mode Segmented Switcher */}
                    <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        data-testid="geometry-mode-toggle"
                        onClick={() => toggleGeometryMode(concept.id)}
                        className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer truncate ${
                          !isSolution
                            ? 'bg-rose-600/90 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.methodology.geometryModeMistakeBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setGeometryModeExplicit(concept.id, 'solution')}
                        className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer truncate ${
                          isSolution
                            ? 'bg-emerald-600/90 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.methodology.geometryModeSolutionBtn}
                      </button>
                    </div>
                  </div>

                  {/* Interactive SVG Mini-Pitch */}
                  <GeometryMiniPitchSVG
                    conceptId={concept.id}
                    mode={currentMode}
                    lang={lang}
                  />

                  {/* Explanation Box */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-colors ${
                      isSolution
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-100'
                        : 'bg-rose-950/30 border-rose-500/30 text-rose-100'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {isSolution ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span>
                        {isSolution ? concept.solutionLabel : concept.mistakeLabel}
                      </span>
                    </div>
                    <p className="text-slate-300">
                      {isSolution ? concept.solutionDesc : concept.mistakeDesc}
                    </p>
                  </div>

                  {/* Live Coaching Cue */}
                  <div className="bg-slate-900/90 border border-amber-500/25 rounded-xl p-3 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-amber-300 mr-1.5">
                        {t.methodology.geometryCueLabel}
                      </span>
                      <span className="text-slate-200 italic">{concept.coachingCue}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: 6 Coach Freeze & Live Interventions */}
      {showInterventions && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full mb-2">
              <Octagon className="w-3.5 h-3.5" />
              <span>{t.methodology.tabInterventions}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {t.methodology.interventionsSectionTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.methodology.interventionsSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.methodology.interventions.map((item) => (
              <div
                key={item.rondoId}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      #{item.rondoNumber}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <Octagon className="w-3 h-3" />
                      FREEZE!
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h4>

                  {/* 1. Symptom */}
                  <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.methodology.symptomLabel}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.symptom}</p>
                  </div>

                  {/* 2. Freeze Trigger */}
                  <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Octagon className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.methodology.freezeTriggerLabel}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.freezeTrigger}</p>
                  </div>

                  {/* 3. Socratic Guided Question */}
                  <div className="bg-blue-950/25 border border-blue-500/30 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-bold text-blue-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.methodology.guidedQuestionLabel}</span>
                    </div>
                    <p className="text-blue-100 italic leading-relaxed">
                      {item.guidedQuestion}
                    </p>
                  </div>

                  {/* 4. 15-Second Micro-Fix */}
                  <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.methodology.microCorrectionLabel}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {item.microCorrection}
                    </p>
                  </div>
                </div>

                {/* Action Button to Open Rondo in Catalog */}
                <button
                  type="button"
                  onClick={() => onSelectRondoAndOpenCatalog(item.rondoId)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.methodology.openRondoInCatalogBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Master Cheat-Sheet Table of All 10 Rondos (Multi-Age & Scientific Basis) */}
      {showCheatSheet && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                {t.methodology.tableTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentAgeBandInfo.label} • {currentAgeBandInfo.stageTitle} ({currentAgeBandInfo.relativeAreaRule})
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold">
              {currentAgeBandInfo.shortLabel}
            </span>
          </div>

          {/* Age Physiological & Cognitive Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                {lang === 'ru'
                  ? 'Когнитивное окно и площадь (ApP)'
                  : lang === 'de'
                  ? 'Kognitives Zeitfenster & Relativfläche (ApP)'
                  : 'Cognitive Window & Relative Area'}
              </div>
              <div className="font-bold text-white">{currentAgeBandInfo.decisionWindow}</div>
              <div className="text-slate-400 mt-1">{currentAgeBandInfo.relativeAreaRule}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                {lang === 'ru'
                  ? 'Физиологический профиль'
                  : lang === 'de'
                  ? 'Physiologisches Profil'
                  : 'Physiological Profile'}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentAgeBandInfo.physiologicalProfile}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                {lang === 'ru'
                  ? 'Методический фокус возраста'
                  : lang === 'de'
                  ? 'Methodischer Altersfokus'
                  : 'Age Methodological Focus'}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentAgeBandInfo.summaryFocus}
              </p>
            </div>
          </div>

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
                {rondos.map((r) => {
                  const ageVar = getRondoAgeVariant(r.id);
                  const meth = getRondoMethodology(r.id);
                  return (
                    <tr
                      key={r.id}
                      onClick={() => onSelectRondoAndOpenCatalog(r.id)}
                      className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                        {r.number}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-white">{r.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{meth.originSchool}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded border ${r.badgeColor}`}
                        >
                          {r.categoryName}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{ageVar.baseGrid}</td>
                      <td className="py-2.5 px-3 font-mono text-amber-300">
                        {ageVar.intensiveGrid}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <div>{ageVar.timing}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{ageVar.touchesRule}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
