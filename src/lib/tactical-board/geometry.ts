import {
  PitchTemplate,
  Point2D,
  TacticalToken,
  TacticalVector,
  TacticalZone,
} from './types';

export interface Bounds2D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const DEFAULT_PITCH_BOUNDS: Bounds2D = {
  minX: 20,
  maxX: 480,
  minY: 20,
  maxY: 380,
};

export const clampPointToBounds = (
  pt: Point2D,
  bounds: Bounds2D = DEFAULT_PITCH_BOUNDS
): Point2D => ({
  x: Math.round(Math.max(bounds.minX, Math.min(bounds.maxX, pt.x))),
  y: Math.round(Math.max(bounds.minY, Math.min(bounds.maxY, pt.y))),
});

export const clientToSvgPoint = (
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  viewBoxWidth = 500,
  viewBoxHeight = 400,
  bounds: Bounds2D = DEFAULT_PITCH_BOUNDS
): Point2D | null => {
  if (
    !Number.isFinite(clientX) ||
    !Number.isFinite(clientY) ||
    rect.width <= 0 ||
    rect.height <= 0
  ) {
    return null;
  }
  const rawX = ((clientX - rect.left) / rect.width) * viewBoxWidth;
  const rawY = ((clientY - rect.top) / rect.height) * viewBoxHeight;
  return clampPointToBounds({ x: rawX, y: rawY }, bounds);
};

export const interpolatePointCubicOut = (
  from: Point2D,
  to: Point2D,
  progress: number
): Point2D => {
  const clamped = Math.max(0, Math.min(1, progress));
  const ease = 1 - Math.pow(1 - clamped, 3);
  return {
    x: from.x + (to.x - from.x) * ease,
    y: from.y + (to.y - from.y) * ease,
  };
};

export const resolveVectorEndpoints = (
  vector: TacticalVector,
  tokens: TacticalToken[],
  customPositions: Record<string, Point2D>
): { from: Point2D; to: Point2D } => {
  let from = vector.from;
  let to = vector.to;

  if (vector.fromTokenId && customPositions[vector.fromTokenId]) {
    from = customPositions[vector.fromTokenId];
  } else {
    const matchingFromToken = tokens.find(
      (t) =>
        customPositions[t.id] &&
        Math.hypot(t.x - vector.from.x, t.y - vector.from.y) <= 18
    );
    if (matchingFromToken) {
      from = customPositions[matchingFromToken.id];
    }
  }

  if (vector.toTokenId && customPositions[vector.toTokenId]) {
    to = customPositions[vector.toTokenId];
  } else {
    const matchingToToken = tokens.find(
      (t) =>
        customPositions[t.id] &&
        Math.hypot(t.x - vector.to.x, t.y - vector.to.y) <= 18
    );
    if (matchingToToken) {
      to = customPositions[matchingToToken.id];
    }
  }

  return { from, to };
};

export const buildCurvedPathD = (
  from: Point2D,
  to: Point2D,
  curve = 0
): { d: string; midPoint: Point2D } => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  if (!curve) {
    return {
      d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
      midPoint: { x: midX, y: midY },
    };
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = Math.round(midX + nx * curve);
  const cy = Math.round(midY + ny * curve);

  return {
    d: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`,
    midPoint: {
      x: Math.round(0.25 * from.x + 0.5 * cx + 0.25 * to.x),
      y: Math.round(0.25 * from.y + 0.5 * cy + 0.25 * to.y),
    },
  };
};

export const pointsToSvgPathD = (points: Point2D[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x} ${p.y} L ${p.x} ${p.y}`;
  }
  return points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`)
    .join(' ');
};

export const detectHorizontalSwipe = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  minDeltaX = 45,
  dominanceRatio = 1.3
): 'next' | 'prev' | null => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  if (
    Math.abs(deltaX) > minDeltaX &&
    Math.abs(deltaX) > Math.abs(deltaY) * dominanceRatio
  ) {
    return deltaX < 0 ? 'next' : 'prev';
  }
  return null;
};

export const deriveGridZonesFromCones = (
  template: PitchTemplate,
  cones: Point2D[],
  hasCornerTraps = false
): TacticalZone[] => {
  if (template === 'single_square' && cones.length >= 4) {
    // Diamond configuration: cones[0] = Top, cones[1] = Left, cones[2] = Right, cones[3] = Bottom
    if (cones[1].x < cones[0].x) {
      return [
        {
          id: 'grid-main-diamond',
          shape: 'polygon',
          points: `${cones[0].x},${cones[0].y} ${cones[2].x},${cones[2].y} ${cones[3].x},${cones[3].y} ${cones[1].x},${cones[1].y}`,
          fill: 'rgba(16, 185, 129, 0.05)',
          stroke: 'rgba(255, 255, 255, 0.78)',
          strokeWidth: 2.5,
          strokeDasharray: '8 6',
        },
      ];
    }

    const x = cones[0].x;
    const y = cones[0].y;
    const width = cones[1].x - cones[0].x;
    const height = cones[2].y - cones[0].y;

    const zones: TacticalZone[] = [
      {
        id: 'grid-main-square',
        shape: 'rect',
        x,
        y,
        width,
        height,
        rx: 4,
        fill: 'rgba(16, 185, 129, 0.05)',
        stroke: 'rgba(255, 255, 255, 0.75)',
        strokeWidth: 2.5,
        strokeDasharray: '8 6',
      },
    ];

    if (hasCornerTraps) {
      const trapSize = 48;
      const trapStyle = {
        shape: 'rect' as const,
        width: trapSize,
        height: trapSize,
        fill: 'rgba(244, 63, 94, 0.12)',
        stroke: 'rgba(244, 63, 94, 0.65)',
        strokeWidth: 1.5,
        strokeDasharray: '4 3',
      };
      zones.push(
        { id: 'corner-trap-tl', ...trapStyle, x, y },
        { id: 'corner-trap-tr', ...trapStyle, x: x + width - trapSize, y },
        { id: 'corner-trap-bl', ...trapStyle, x, y: y + height - trapSize },
        {
          id: 'corner-trap-br',
          ...trapStyle,
          x: x + width - trapSize,
          y: y + height - trapSize,
        }
      );
    }

    if (cones.length === 9) {
      const midX = Math.round(x + width / 2);
      const midY = Math.round(y + height / 2);
      zones.push(
        {
          id: 'grid-quadrant-vline',
          shape: 'line',
          x1: midX,
          y1: y,
          x2: midX,
          y2: y + height,
          stroke: 'rgba(251, 191, 36, 0.8)',
          strokeWidth: 2,
          strokeDasharray: '6 5',
        },
        {
          id: 'grid-quadrant-hline',
          shape: 'line',
          x1: x,
          y1: midY,
          x2: x + width,
          y2: midY,
          stroke: 'rgba(251, 191, 36, 0.8)',
          strokeWidth: 2,
          strokeDasharray: '6 5',
        }
      );
    }

    // SFV 9-Felder-Einstieg (3x3 Grid = 9 sub-squares, 16 cones)
    if (cones.length === 16) {
      const v1 = Math.round(x + width / 3);
      const v2 = Math.round(x + (2 * width) / 3);
      const h1 = Math.round(y + height / 3);
      const h2 = Math.round(y + (2 * height) / 3);
      const lineStyle = {
        shape: 'line' as const,
        stroke: 'rgba(251, 191, 36, 0.82)',
        strokeWidth: 2,
        strokeDasharray: '6 5',
      };
      zones.push(
        { id: 'grid-9zone-v1', ...lineStyle, x1: v1, y1: y, x2: v1, y2: y + height },
        { id: 'grid-9zone-v2', ...lineStyle, x1: v2, y1: y, x2: v2, y2: y + height },
        { id: 'grid-9zone-h1', ...lineStyle, x1: x, y1: h1, x2: x + width, y2: h1 },
        { id: 'grid-9zone-h2', ...lineStyle, x1: x, y1: h2, x2: x + width, y2: h2 }
      );
    }

    return zones;
  }

  if (template === 'double_zone' && cones.length >= 6) {
    // 10-cone SFV 3-Line Overload setup (cones[0..3] outer corners, cones[4..9] 3 defensive lines)
    if (cones.length === 10) {
      const x = cones[0].x;
      const y = cones[0].y;
      const width = cones[1].x - cones[0].x;
      const height = cones[2].y - cones[0].y;
      const lineStyle = {
        shape: 'line' as const,
        stroke: 'rgba(251, 191, 36, 0.85)',
        strokeWidth: 2.2,
        strokeDasharray: '7 5',
      };
      return [
        {
          id: 'grid-double-outer',
          shape: 'rect',
          x,
          y,
          width,
          height,
          rx: 4,
          fill: 'rgba(16, 185, 129, 0.05)',
          stroke: 'rgba(255, 255, 255, 0.8)',
          strokeWidth: 2.5,
        },
        { id: 'grid-def-line-1', ...lineStyle, x1: cones[4].x, y1: cones[4].y, x2: cones[5].x, y2: cones[5].y },
        { id: 'grid-def-line-2', ...lineStyle, x1: cones[6].x, y1: cones[6].y, x2: cones[7].x, y2: cones[7].y },
        { id: 'grid-def-line-3', ...lineStyle, x1: cones[8].x, y1: cones[8].y, x2: cones[9].x, y2: cones[9].y },
      ];
    }

    const x = cones[0].x;
    const y = cones[0].y;
    const midX = cones[1].x;
    const width = cones[2].x - cones[0].x;
    const height = cones[3].y - cones[0].y;

    return [
      {
        id: 'grid-double-outer',
        shape: 'rect',
        x,
        y,
        width,
        height,
        rx: 4,
        fill: 'rgba(16, 185, 129, 0.05)',
        stroke: 'rgba(255, 255, 255, 0.8)',
        strokeWidth: 2.5,
      },
      {
        id: 'grid-double-midline',
        shape: 'line',
        x1: midX,
        y1: y,
        x2: midX,
        y2: y + height,
        stroke: 'rgba(251, 191, 36, 0.85)',
        strokeWidth: 2.5,
        strokeDasharray: '8 6',
      },
    ];
  }

  if (template === 'concentric_square' && cones.length >= 8) {
    const ox = cones[0].x;
    const oy = cones[0].y;
    const ow = cones[1].x - cones[0].x;
    const oh = cones[2].y - cones[0].y;

    // 16-cone SFV Dribbelzonen setup: cones[0..3] outer square + 3 internal 4-cone squares
    if (cones.length === 16) {
      const zones: TacticalZone[] = [
        {
          id: 'grid-concentric-outer',
          shape: 'rect',
          x: ox,
          y: oy,
          width: ow,
          height: oh,
          rx: 4,
          fill: 'rgba(16, 185, 129, 0.04)',
          stroke: 'rgba(255, 255, 255, 0.75)',
          strokeWidth: 2.5,
          strokeDasharray: '8 6',
        },
      ];
      for (let z = 0; z < 3; z++) {
        const baseIdx = 4 + z * 4;
        const zx = cones[baseIdx].x;
        const zy = cones[baseIdx].y;
        const zw = cones[baseIdx + 1].x - zx;
        const zh = cones[baseIdx + 2].y - zy;
        zones.push({
          id: `grid-dribbelzone-${z + 1}`,
          shape: 'rect',
          x: zx,
          y: zy,
          width: zw,
          height: zh,
          rx: 3,
          fill: 'rgba(245, 158, 11, 0.14)',
          stroke: 'rgba(251, 191, 36, 0.9)',
          strokeWidth: 2,
          strokeDasharray: '5 4',
        });
      }
      return zones;
    }

    const ix = cones[4].x;
    const iy = cones[4].y;
    const iw = cones[5].x - cones[4].x;
    const ih = cones[6].y - cones[4].y;

    return [
      {
        id: 'grid-concentric-outer',
        shape: 'rect',
        x: ox,
        y: oy,
        width: ow,
        height: oh,
        rx: 4,
        fill: 'rgba(16, 185, 129, 0.04)',
        stroke: 'rgba(255, 255, 255, 0.75)',
        strokeWidth: 2.5,
        strokeDasharray: '8 6',
      },
      {
        id: 'grid-concentric-inner',
        shape: 'rect',
        x: ix,
        y: iy,
        width: iw,
        height: ih,
        rx: 3,
        fill: 'rgba(245, 158, 11, 0.1)',
        stroke: 'rgba(251, 191, 36, 0.85)',
        strokeWidth: 2,
        strokeDasharray: '6 4',
      },
    ];
  }

  return [];
};

export interface VectorLabelBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const deconflictVectorLabelPositions = (
  labels: VectorLabelBox[],
  obstacles: Point2D[] = [],
  bounds: Bounds2D = DEFAULT_PITCH_BOUNDS
): Record<string, Point2D> => {
  const placed: VectorLabelBox[] = [];
  const result: Record<string, Point2D> = {};

  const clampLabelCenter = (
    x: number,
    y: number,
    width: number,
    height: number
  ): Point2D => {
    const halfW = Math.min(width / 2, (bounds.maxX - bounds.minX) / 2);
    const halfH = Math.min(height / 2, (bounds.maxY - bounds.minY) / 2);
    return {
      x: Math.round(
        Math.max(bounds.minX + halfW, Math.min(bounds.maxX - halfW, x))
      ),
      y: Math.round(
        Math.max(bounds.minY + halfH, Math.min(bounds.maxY - halfH, y))
      ),
    };
  };

  for (const item of labels) {
    const w = Math.max(24, item.width);
    const h = Math.max(14, item.height);
    let { x, y } = clampLabelCenter(item.x, item.y, w, h);

    // 1. Nudge away from nearby player/ball tokens so labels never obscure tokens
    for (const obs of obstacles) {
      const minDx = w / 2 + 12;
      const minDy = h / 2 + 15;
      if (Math.abs(x - obs.x) < minDx && Math.abs(y - obs.y) < minDy) {
        const pushUp = y <= obs.y;
        const targetY = pushUp ? obs.y - minDy - 2 : obs.y + minDy + 2;
        const clamped = clampLabelCenter(x, targetY, w, h);
        x = clamped.x;
        y = clamped.y;
      }
    }

    // 2. Pairwise deconfliction with already placed vector labels
    for (let pass = 0; pass < 2; pass++) {
      for (const prev of placed) {
        const minDx = (w + prev.width) / 2 + 4;
        const minDy = (h + prev.height) / 2 + 4;
        if (Math.abs(x - prev.x) < minDx && Math.abs(y - prev.y) < minDy) {
          const preferDown =
            y >= prev.y && prev.y + minDy + h / 2 <= bounds.maxY;
          const nextY = preferDown ? prev.y + minDy : prev.y - minDy;
          const clamped = clampLabelCenter(x, nextY, w, h);
          x = clamped.x;
          y = clamped.y;
        }
      }
    }

    placed.push({ id: item.id, x, y, width: w, height: h });
    result[item.id] = { x, y };
  }

  return result;
};

