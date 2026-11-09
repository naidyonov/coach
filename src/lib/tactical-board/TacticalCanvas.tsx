import React, { useId } from 'react';
import {
  FreehandStroke,
  Point2D,
  TacticalScene,
  TacticalVector,
} from './types';
import {
  buildCurvedPathD,
  deriveGridZonesFromCones,
  pointsToSvgPathD,
  resolveVectorEndpoints,
} from './geometry';

export interface TacticalCanvasProps {
  scene: TacticalScene;
  ariaLabel: string;
  className?: string;
  showPasses?: boolean;
  showMovements?: boolean;
  showShadows?: boolean;
  customPositions?: Record<string, Point2D>;
  ballCoords?: Point2D;
  draggingTokenId?: string | null;
  isPassAnimating?: boolean;
  customVectors?: TacticalVector[];
  draftVector?: TacticalVector | null;
  freehandStrokes?: FreehandStroke[];
  draftStroke?: FreehandStroke | null;
  onTokenPointerDown?: (tokenId: string, e: React.PointerEvent) => void;
  onSvgPointerDown?: (e: React.PointerEvent<SVGSVGElement>) => void;
  onSvgPointerMove?: (e: React.PointerEvent<SVGSVGElement>) => void;
  onSvgPointerUp?: () => void;
}

export const TacticalCanvas: React.FC<TacticalCanvasProps> = ({
  scene,
  ariaLabel,
  className = 'w-full h-auto block touch-none',
  showPasses = true,
  showMovements = true,
  showShadows = true,
  customPositions = {},
  ballCoords,
  draggingTokenId = null,
  isPassAnimating = false,
  customVectors = [],
  draftVector = null,
  freehandStrokes = [],
  draftStroke = null,
  onTokenPointerDown,
  onSvgPointerDown,
  onSvgPointerMove,
  onSvgPointerUp,
}) => {
  const uid = useId().replace(/:/g, '');
  const viewBoxWidth = scene.viewBoxWidth || 500;
  const viewBoxHeight = scene.viewBoxHeight || 400;

  const derivedZones = deriveGridZonesFromCones(
    scene.template,
    scene.cones,
    scene.hasCornerTraps
  );
  const allZones = [...derivedZones, ...(scene.zones || [])];

  const allVectors = [
    ...scene.vectors,
    ...customVectors,
    ...(draftVector ? [draftVector] : []),
  ];
  const movementVectors = allVectors.filter((v) => v.type === 'movement');
  const passVectors = allVectors.filter((v) => v.type === 'pass');

  const allStrokes = [
    ...freehandStrokes,
    ...(draftStroke ? [draftStroke] : []),
  ];

  const stripeCount = 10;
  const stripeWidth = viewBoxWidth / stripeCount;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={className}
      role="img"
      aria-label={ariaLabel}
      onPointerDown={onSvgPointerDown}
      onPointerMove={onSvgPointerMove}
      onPointerUp={onSvgPointerUp}
      onPointerCancel={onSvgPointerUp}
      onPointerLeave={onSvgPointerUp}
    >
      <defs>
        <filter
          id={`token-shadow-${uid}`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.55"
          />
        </filter>

        <marker
          id={`arrow-pass-primary-${uid}`}
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
          id={`arrow-pass-secondary-${uid}`}
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
          id={`arrow-move-att-${uid}`}
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
          id={`arrow-move-def-${uid}`}
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
          id={`arrow-move-neutral-${uid}`}
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
      {Array.from({ length: stripeCount }, (_, stripeIdx) => (
        <rect
          key={stripeIdx}
          x={stripeIdx * stripeWidth}
          y={0}
          width={stripeWidth}
          height={viewBoxHeight}
          fill={stripeIdx % 2 === 0 ? '#064e3b' : '#065f46'}
        />
      ))}

      {/* Subtle Pitch Border */}
      <rect
        x={12}
        y={12}
        width={viewBoxWidth - 24}
        height={viewBoxHeight - 24}
        fill="none"
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="1.5"
        rx="8"
      />

      {/* Dynamic Grid & Zone Markings */}
      <g data-testid="pitch-zones-layer">
        {allZones.map((zone) => {
          if (zone.shape === 'rect') {
            return (
              <rect
                key={zone.id}
                data-testid={`pitch-zone-${zone.id}`}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={zone.rx}
                fill={zone.fill || 'none'}
                stroke={zone.stroke}
                strokeWidth={zone.strokeWidth}
                strokeDasharray={zone.strokeDasharray}
              />
            );
          }
          if (zone.shape === 'line') {
            return (
              <line
                key={zone.id}
                data-testid={`pitch-zone-${zone.id}`}
                x1={zone.x1}
                y1={zone.y1}
                x2={zone.x2}
                y2={zone.y2}
                stroke={zone.stroke}
                strokeWidth={zone.strokeWidth}
                strokeDasharray={zone.strokeDasharray}
              />
            );
          }
          if (zone.shape === 'polygon' && zone.points) {
            return (
              <polygon
                key={zone.id}
                data-testid={`pitch-zone-${zone.id}`}
                points={zone.points}
                fill={zone.fill || 'none'}
                stroke={zone.stroke}
                strokeWidth={zone.strokeWidth}
                strokeDasharray={zone.strokeDasharray}
              />
            );
          }
          return null;
        })}
      </g>

      {/* Cover Shadows / Pressing Traps */}
      {showShadows &&
        scene.shadows.map((shadow) => (
          <polygon
            key={shadow.id}
            points={shadow.points}
            fill={
              shadow.variant === 'solution'
                ? 'rgba(52, 211, 153, 0.18)'
                : 'rgba(244, 63, 94, 0.24)'
            }
            stroke={
              shadow.variant === 'solution'
                ? 'rgba(52, 211, 153, 0.55)'
                : 'rgba(251, 113, 133, 0.65)'
            }
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}

      {/* Orange Cones */}
      {scene.cones.map((cone, idx) => (
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
        movementVectors.map((mv) => {
          const { from, to } = resolveVectorEndpoints(
            mv,
            scene.tokens,
            customPositions
          );
          const { d, midPoint } = buildCurvedPathD(from, to, mv.curve);
          const strokeColor =
            mv.role === 'def'
              ? '#93c5fd'
              : mv.role === 'neutral'
              ? '#fde047'
              : '#fca5a5';
          const markerId =
            mv.role === 'def'
              ? `url(#arrow-move-def-${uid})`
              : mv.role === 'neutral'
              ? `url(#arrow-move-neutral-${uid})`
              : `url(#arrow-move-att-${uid})`;

          return (
            <g key={mv.id} data-testid={`pitch-vector-${mv.id}`}>
              {mv.curve ? (
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                  markerEnd={markerId}
                />
              ) : (
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={strokeColor}
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                  markerEnd={markerId}
                />
              )}
              {mv.label && (
                <g transform={`translate(${midPoint.x}, ${midPoint.y - 8})`}>
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
        passVectors.map((pass) => {
          const { from, to } = resolveVectorEndpoints(
            pass,
            scene.tokens,
            customPositions
          );
          const { d, midPoint } = buildCurvedPathD(from, to, pass.curve);
          const strokeColor = pass.primary ? '#facc15' : '#e2e8f0';
          const markerId = pass.primary
            ? `url(#arrow-pass-primary-${uid})`
            : `url(#arrow-pass-secondary-${uid})`;

          return (
            <g key={pass.id} data-testid={`pitch-vector-${pass.id}`}>
              {pass.curve ? (
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={pass.primary ? '3.2' : '2.2'}
                  strokeDasharray={pass.primary ? undefined : '6 4'}
                  markerEnd={markerId}
                />
              ) : (
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={strokeColor}
                  strokeWidth={pass.primary ? '3.2' : '2.2'}
                  strokeDasharray={pass.primary ? undefined : '6 4'}
                  markerEnd={markerId}
                />
              )}
              {pass.label && (
                <g transform={`translate(${midPoint.x}, ${midPoint.y + 12})`}>
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

      {/* Freehand Coach Whiteboard Strokes */}
      {allStrokes.map((stroke) => (
        <path
          key={stroke.id}
          data-testid={`pitch-freehand-${stroke.id}`}
          d={pointsToSvgPathD(stroke.points)}
          fill="none"
          stroke={stroke.color}
          strokeWidth={stroke.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Optional Scene Annotations */}
      {scene.annotations?.map((ann) => (
        <text
          key={ann.id}
          x={ann.x}
          y={ann.y}
          textAnchor={ann.textAnchor || 'middle'}
          fill={ann.color}
          fontSize={ann.fontSize || 10}
          fontWeight="bold"
        >
          {ann.text}
        </text>
      ))}

      {/* Players (Interactive Draggable Tokens) */}
      {scene.tokens.map((p) => {
        const pos = customPositions[p.id] || { x: p.x, y: p.y };
        const isBeingDragged = draggingTokenId === p.id;
        const isCustomMoved = Boolean(customPositions[p.id]);
        const fill =
          p.role === 'att'
            ? '#ef4444'
            : p.role === 'def'
            ? '#3b82f6'
            : '#facc15';
        const textColor = p.role === 'neutral' ? '#0f172a' : '#ffffff';
        const stroke = p.role === 'neutral' ? '#0f172a' : '#ffffff';
        const radius = p.radius || 15;

        return (
          <g
            key={p.id}
            data-testid={`pitch-player-${p.id}`}
            transform={`translate(${pos.x}, ${pos.y})`}
            style={{
              transition: isBeingDragged
                ? 'none'
                : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            filter={`url(#token-shadow-${uid})`}
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={
              onTokenPointerDown ? (e) => onTokenPointerDown(p.id, e) : undefined
            }
          >
            {typeof p.bodyAngle === 'number' && (
              <g transform={`rotate(${p.bodyAngle})`}>
                <rect
                  x={-18}
                  y={-4}
                  width={36}
                  height={8}
                  rx={4}
                  fill={p.bodyBarColor || '#10b981'}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {(isBeingDragged || isCustomMoved) && (
              <circle
                cx={0}
                cy={0}
                r={isBeingDragged ? radius + 6 : radius + 3.5}
                fill="none"
                stroke={
                  isBeingDragged ? '#34d399' : 'rgba(251, 191, 36, 0.75)'
                }
                strokeWidth={isBeingDragged ? '2.5' : '1.5'}
                strokeDasharray={isBeingDragged ? undefined : '3 2'}
              />
            )}
            <circle
              cx={0}
              cy={0}
              r={radius}
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
              style={{
                fontFamily: 'system-ui, sans-serif',
                pointerEvents: 'none',
              }}
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Football (Animated along Primary Pass or Draggable) */}
      {ballCoords && (
        <g
          data-testid="pitch-ball-token"
          transform={`translate(${ballCoords.x}, ${ballCoords.y})`}
          style={{
            transition:
              draggingTokenId === 'ball' || isPassAnimating
                ? 'none'
                : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          filter={`url(#token-shadow-${uid})`}
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={
            onTokenPointerDown ? (e) => onTokenPointerDown('ball', e) : undefined
          }
        >
          {(draggingTokenId === 'ball' || isPassAnimating) && (
            <circle
              cx={0}
              cy={0}
              r={13.5}
              fill="none"
              stroke="#facc15"
              strokeWidth="1.8"
              strokeDasharray="3 2"
            />
          )}
          <circle cx={0} cy={0} r={9.5} fill="rgba(250, 204, 21, 0.28)" />
          <circle
            cx={0}
            cy={0}
            r={6.5}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="1.6"
          />
          <polygon
            points="0,-3 2.8,-0.8 1.7,2.5 -1.7,2.5 -2.8,-0.8"
            fill="#0f172a"
          />
        </g>
      )}
    </svg>
  );
};
