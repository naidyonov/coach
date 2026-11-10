import { Point2D, RondoDiagram, RondoPhasePlayer, RondoPhaseShadow } from '../i18n/types';

export interface CanonicalPhaseGeometry {
  players: RondoPhasePlayer[];
  ball?: Point2D;
  passes: Array<{
    from: Point2D;
    to: Point2D;
    primary: boolean;
    curve?: number;
  }>;
  movements: Array<{
    from: Point2D;
    to: Point2D;
    role: 'att' | 'def' | 'neutral';
    curve?: number;
  }>;
  shadows: RondoPhaseShadow[];
}

export interface CanonicalDrillGeometry {
  type: 'single_square' | 'double_zone' | 'concentric_square';
  cones: Point2D[];
  phases: [CanonicalPhaseGeometry, CanonicalPhaseGeometry, CanonicalPhaseGeometry];
}

export interface LocalizedPhaseText {
  title: string;
  desc: string;
  passLabels: (string | undefined)[];
  movementLabels: (string | undefined)[];
}

export function buildActivationDiagram(
  id: string,
  gridLabel: string,
  phaseTexts: [LocalizedPhaseText, LocalizedPhaseText, LocalizedPhaseText]
): RondoDiagram {
  const geom = ACTIVATION_CANONICAL_GEOMETRY[id];
  return {
    type: geom.type,
    gridLabel,
    cones: geom.cones,
    phases: geom.phases.map((p, idx) => ({
      title: phaseTexts[idx].title,
      desc: phaseTexts[idx].desc,
      players: p.players,
      ball: p.ball,
      passes: p.passes.map((pass, pIdx) => ({
        ...pass,
        label: phaseTexts[idx].passLabels[pIdx],
      })),
      movements: p.movements.map((mov, mIdx) => ({
        ...mov,
        label: phaseTexts[idx].movementLabels[mIdx],
      })),
      shadows: p.shadows,
    })),
  };
}

export const ACTIVATION_CANONICAL_GEOMETRY: Record<string, CanonicalDrillGeometry> = {
  'act-1': {
    type: 'single_square',
    cones: [
      { x: 80, y: 50 },
      { x: 420, y: 50 },
      { x: 80, y: 350 },
      { x: 420, y: 350 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 140, y: 120 },
          { id: 'A2', role: 'att', label: 'A2', x: 350, y: 120 },
          { id: 'A3', role: 'att', label: 'A3', x: 140, y: 280 },
          { id: 'A4', role: 'att', label: 'A4', x: 350, y: 280 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 90 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 250, y: 310 },
        ],
        ball: { x: 152, y: 126 },
        passes: [],
        movements: [
          { from: { x: 140, y: 120 }, to: { x: 215, y: 175 }, role: 'att' },
          { from: { x: 350, y: 120 }, to: { x: 285, y: 175 }, role: 'att' },
          { from: { x: 140, y: 280 }, to: { x: 215, y: 225 }, role: 'att' },
          { from: { x: 350, y: 280 }, to: { x: 285, y: 225 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 195, y: 165 },
          { id: 'A2', role: 'att', label: 'A2', x: 305, y: 165 },
          { id: 'A3', role: 'att', label: 'A3', x: 195, y: 245 },
          { id: 'A4', role: 'att', label: 'A4', x: 305, y: 245 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 65 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 250, y: 335 },
        ],
        ball: { x: 205, y: 158 },
        passes: [
          { from: { x: 205, y: 155 }, to: { x: 245, y: 78 }, primary: true },
        ],
        movements: [
          { from: { x: 305, y: 165 }, to: { x: 395, y: 110 }, role: 'att' },
          { from: { x: 195, y: 245 }, to: { x: 105, y: 295 }, role: 'att' },
        ],
        shadows: [
          { points: '215,175 285,175 285,235 215,235', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 185, y: 180 },
          { id: 'A2', role: 'att', label: 'A2', x: 315, y: 180 },
          { id: 'D1', role: 'def', label: 'D1', x: 185, y: 120 },
          { id: 'D2', role: 'def', label: 'D2', x: 315, y: 120 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 110, y: 65 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 390, y: 65 },
        ],
        ball: { x: 175, y: 172 },
        passes: [
          { from: { x: 175, y: 168 }, to: { x: 118, y: 78 }, primary: true },
        ],
        movements: [
          { from: { x: 185, y: 180 }, to: { x: 125, y: 95 }, role: 'att', curve: -20 },
          { from: { x: 315, y: 180 }, to: { x: 375, y: 95 }, role: 'att', curve: 20 },
        ],
        shadows: [],
      },
    ],
  },

  'act-2': {
    type: 'double_zone',
    cones: [
      { x: 70, y: 60 },
      { x: 250, y: 60 },
      { x: 430, y: 60 },
      { x: 70, y: 340 },
      { x: 250, y: 340 },
      { x: 430, y: 340 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 220, y: 130 },
          { id: 'D1', role: 'def', label: 'S1', x: 280, y: 130 },
          { id: 'A2', role: 'att', label: 'A2', x: 220, y: 270 },
          { id: 'D2', role: 'def', label: 'S2', x: 280, y: 270 },
          { id: 'N1', role: 'neutral', label: 'G1', x: 85, y: 95 },
          { id: 'N2', role: 'neutral', label: 'G2', x: 85, y: 305 },
        ],
        ball: { x: 208, y: 130 },
        passes: [],
        movements: [
          { from: { x: 220, y: 130 }, to: { x: 220, y: 85 }, role: 'att' },
          { from: { x: 280, y: 130 }, to: { x: 280, y: 85 }, role: 'def' },
          { from: { x: 220, y: 270 }, to: { x: 220, y: 315 }, role: 'att' },
          { from: { x: 280, y: 270 }, to: { x: 280, y: 315 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 115 },
          { id: 'D1', role: 'def', label: 'S1', x: 285, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 215, y: 285 },
          { id: 'D2', role: 'def', label: 'S2', x: 285, y: 285 },
          { id: 'N1', role: 'neutral', label: 'G1', x: 85, y: 95 },
          { id: 'N2', role: 'neutral', label: 'G2', x: 85, y: 305 },
        ],
        ball: { x: 202, y: 115 },
        passes: [],
        movements: [
          { from: { x: 215, y: 115 }, to: { x: 165, y: 155 }, role: 'att', curve: -18 },
          { from: { x: 285, y: 115 }, to: { x: 335, y: 155 }, role: 'def', curve: 18 },
        ],
        shadows: [
          { points: '190,90 310,90 310,165 190,165', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 165, y: 125 },
          { id: 'D1', role: 'def', label: 'S1', x: 235, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 165, y: 275 },
          { id: 'D2', role: 'def', label: 'S2', x: 235, y: 255 },
          { id: 'N1', role: 'neutral', label: 'G1', x: 85, y: 95 },
          { id: 'N2', role: 'neutral', label: 'G2', x: 85, y: 305 },
        ],
        ball: { x: 152, y: 120 },
        passes: [
          { from: { x: 150, y: 118 }, to: { x: 96, y: 98 }, primary: true },
        ],
        movements: [
          { from: { x: 165, y: 125 }, to: { x: 100, y: 98 }, role: 'att' },
          { from: { x: 235, y: 145 }, to: { x: 135, y: 112 }, role: 'def' },
          { from: { x: 165, y: 275 }, to: { x: 100, y: 302 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  'act-3': {
    type: 'concentric_square',
    cones: [
      { x: 75, y: 45 },
      { x: 425, y: 45 },
      { x: 75, y: 355 },
      { x: 425, y: 355 },
      { x: 190, y: 140 },
      { x: 310, y: 140 },
      { x: 190, y: 260 },
      { x: 310, y: 260 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 350 },
          { id: 'A2', role: 'att', label: 'A2', x: 80, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 420, y: 200 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 50 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 215 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 215, y: 165 },
        ],
        ball: { x: 250, y: 334 },
        passes: [
          { from: { x: 250, y: 334 }, to: { x: 250, y: 228 }, primary: true },
        ],
        movements: [
          { from: { x: 250, y: 215 }, to: { x: 325, y: 185 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 350 },
          { id: 'A2', role: 'att', label: 'A2', x: 80, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 420, y: 200 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 50 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 295, y: 195 },
          { id: 'D1', role: 'def', label: 'D1', x: 215, y: 195 },
        ],
        ball: { x: 308, y: 195 },
        passes: [
          { from: { x: 310, y: 195 }, to: { x: 405, y: 200 }, primary: true },
        ],
        movements: [
          { from: { x: 215, y: 195 }, to: { x: 265, y: 195 }, role: 'def' },
          { from: { x: 295, y: 195 }, to: { x: 345, y: 175 }, role: 'neutral' },
        ],
        shadows: [
          { points: '190,140 310,140 310,260 190,260', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 350 },
          { id: 'A2', role: 'att', label: 'A2', x: 80, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 420, y: 200 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 50 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 265, y: 165 },
          { id: 'D1', role: 'def', label: 'D1', x: 225, y: 220 },
        ],
        ball: { x: 265, y: 150 },
        passes: [
          { from: { x: 265, y: 148 }, to: { x: 252, y: 65 }, primary: true },
          { from: { x: 278, y: 165 }, to: { x: 405, y: 195 }, primary: false },
        ],
        movements: [
          { from: { x: 225, y: 220 }, to: { x: 255, y: 180 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  'act-4': {
    type: 'single_square',
    cones: [
      { x: 85, y: 50 },
      { x: 415, y: 50 },
      { x: 85, y: 350 },
      { x: 415, y: 350 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 380 },
          { id: 'N6', role: 'neutral', label: '6', x: 250, y: 205 },
          { id: 'A3', role: 'att', label: 'L', x: 115, y: 75 },
          { id: 'A4', role: 'att', label: 'R', x: 385, y: 75 },
        ],
        ball: { x: 250, y: 328 },
        passes: [
          { from: { x: 250, y: 328 }, to: { x: 250, y: 220 }, primary: true },
          { from: { x: 240, y: 195 }, to: { x: 128, y: 85 }, primary: false },
        ],
        movements: [
          { from: { x: 250, y: 205 }, to: { x: 230, y: 185 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 345 },
          { id: 'N6', role: 'neutral', label: '6', x: 255, y: 195 },
          { id: 'D1', role: 'def', label: 'D1', x: 210, y: 165 },
          { id: 'A3', role: 'att', label: 'L', x: 115, y: 75 },
          { id: 'A4', role: 'att', label: 'R', x: 385, y: 75 },
        ],
        ball: { x: 268, y: 190 },
        passes: [
          { from: { x: 268, y: 188 }, to: { x: 374, y: 86 }, primary: true },
        ],
        movements: [
          { from: { x: 210, y: 165 }, to: { x: 242, y: 188 }, role: 'def' },
          { from: { x: 255, y: 195 }, to: { x: 295, y: 165 }, role: 'neutral' },
        ],
        shadows: [
          { points: '210,165 115,75 220,75', variant: 'danger' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 310 },
          { id: 'N6', role: 'neutral', label: '6', x: 295, y: 165 },
          { id: 'D1', role: 'def', label: 'D1', x: 235, y: 180 },
          { id: 'A3', role: 'att', label: 'L', x: 115, y: 75 },
          { id: 'A4', role: 'att', label: 'R', x: 385, y: 75 },
        ],
        ball: { x: 305, y: 152 },
        passes: [
          { from: { x: 308, y: 148 }, to: { x: 376, y: 85 }, primary: true },
          { from: { x: 282, y: 155 }, to: { x: 128, y: 82 }, primary: false },
        ],
        movements: [
          { from: { x: 295, y: 165 }, to: { x: 345, y: 115 }, role: 'neutral' },
          { from: { x: 235, y: 180 }, to: { x: 285, y: 158 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  'act-5': {
    type: 'concentric_square',
    cones: [
      { x: 75, y: 45 },
      { x: 425, y: 45 },
      { x: 75, y: 355 },
      { x: 425, y: 355 },
      { x: 185, y: 140 },
      { x: 315, y: 140 },
      { x: 185, y: 260 },
      { x: 315, y: 260 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 140, y: 110 },
          { id: 'A2', role: 'att', label: 'A2', x: 160, y: 155 },
          { id: 'A3', role: 'att', label: 'A3', x: 135, y: 280 },
          { id: 'A4', role: 'att', label: 'A4', x: 355, y: 280 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 200 },
        ],
        ball: { x: 172, y: 152 },
        passes: [],
        movements: [
          { from: { x: 160, y: 155 }, to: { x: 355, y: 105 }, role: 'att' },
          { from: { x: 250, y: 200 }, to: { x: 135, y: 215 }, role: 'neutral' },
        ],
        shadows: [
          { points: '315,45 425,45 425,140 315,140', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 355, y: 105 },
          { id: 'A3', role: 'att', label: 'A3', x: 135, y: 285 },
          { id: 'A4', role: 'att', label: 'A4', x: 345, y: 275 },
          { id: 'D1', role: 'def', label: 'D1', x: 250, y: 195 },
        ],
        ball: { x: 355, y: 120 },
        passes: [
          { from: { x: 350, y: 122 }, to: { x: 345, y: 260 }, primary: true },
        ],
        movements: [
          { from: { x: 135, y: 285 }, to: { x: 245, y: 315 }, role: 'att' },
          { from: { x: 250, y: 195 }, to: { x: 315, y: 150 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 355, y: 105 },
          { id: 'A3', role: 'att', label: 'A3', x: 245, y: 315 },
          { id: 'A4', role: 'att', label: 'A4', x: 345, y: 245 },
          { id: 'D1', role: 'def', label: 'D1', x: 295, y: 195 },
        ],
        ball: { x: 332, y: 245 },
        passes: [
          { from: { x: 330, y: 252 }, to: { x: 258, y: 310 }, primary: true },
        ],
        movements: [
          { from: { x: 245, y: 315 }, to: { x: 120, y: 295 }, role: 'att' },
          { from: { x: 295, y: 195 }, to: { x: 325, y: 235 }, role: 'def' },
        ],
        shadows: [
          { points: '75,260 185,260 185,355 75,355', variant: 'solution' },
        ],
      },
    ],
  },

  'act-6': {
    type: 'double_zone',
    cones: [
      { x: 65, y: 55 },
      { x: 250, y: 55 },
      { x: 435, y: 55 },
      { x: 65, y: 345 },
      { x: 250, y: 345 },
      { x: 435, y: 345 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 135 },
          { id: 'A2', role: 'att', label: 'A2', x: 155, y: 265 },
          { id: 'A3', role: 'att', label: 'A3', x: 110, y: 210 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 385, y: 115 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 385, y: 285 },
        ],
        ball: { x: 148, y: 135 },
        passes: [],
        movements: [
          { from: { x: 135, y: 135 }, to: { x: 295, y: 135 }, role: 'att' },
          { from: { x: 155, y: 265 }, to: { x: 295, y: 265 }, role: 'att' },
        ],
        shadows: [
          { points: '250,55 435,55 435,345 250,345', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 235, y: 140 },
          { id: 'D1', role: 'def', label: 'D1', x: 235, y: 195 },
          { id: 'A2', role: 'att', label: 'A2', x: 225, y: 270 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 385, y: 115 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 385, y: 285 },
        ],
        ball: { x: 248, y: 136 },
        passes: [],
        movements: [
          { from: { x: 235, y: 140 }, to: { x: 330, y: 125 }, role: 'att' },
          { from: { x: 235, y: 195 }, to: { x: 285, y: 155 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 320, y: 130 },
          { id: 'D1', role: 'def', label: 'D1', x: 270, y: 165 },
          { id: 'A2', role: 'att', label: 'A2', x: 310, y: 275 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 405, y: 115 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 405, y: 285 },
        ],
        ball: { x: 334, y: 128 },
        passes: [
          { from: { x: 336, y: 126 }, to: { x: 392, y: 118 }, primary: true },
          { from: { x: 325, y: 275 }, to: { x: 392, y: 283 }, primary: false },
        ],
        movements: [
          { from: { x: 310, y: 275 }, to: { x: 365, y: 245 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  'act-7': {
    type: 'single_square',
    cones: [
      { x: 250, y: 45 },
      { x: 90, y: 200 },
      { x: 410, y: 200 },
      { x: 250, y: 355 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'B', x: 105, y: 200 },
          { id: 'A3', role: 'att', label: 'D', x: 395, y: 200 },
          { id: 'A4', role: 'att', label: 'C', x: 250, y: 55 },
          { id: 'N6', role: 'neutral', label: '6', x: 250, y: 200 },
        ],
        ball: { x: 238, y: 335 },
        passes: [
          { from: { x: 236, y: 332 }, to: { x: 118, y: 212 }, primary: true },
          { from: { x: 118, y: 188 }, to: { x: 238, y: 68 }, primary: false },
        ],
        movements: [
          { from: { x: 250, y: 345 }, to: { x: 165, y: 265 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'B', x: 105, y: 200 },
          { id: 'A3', role: 'att', label: 'D', x: 395, y: 200 },
          { id: 'A4', role: 'att', label: 'C', x: 250, y: 55 },
          { id: 'N6', role: 'neutral', label: '6', x: 225, y: 195 },
        ],
        ball: { x: 120, y: 200 },
        passes: [
          { from: { x: 122, y: 200 }, to: { x: 210, y: 196 }, primary: true },
          { from: { x: 225, y: 182 }, to: { x: 246, y: 72 }, primary: false },
        ],
        movements: [
          { from: { x: 105, y: 200 }, to: { x: 155, y: 145 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'B', x: 105, y: 200 },
          { id: 'A3', role: 'att', label: 'D', x: 395, y: 200 },
          { id: 'A4', role: 'att', label: 'C', x: 250, y: 55 },
          { id: 'N6', role: 'neutral', label: '6', x: 250, y: 185 },
          { id: 'D1', role: 'def', label: 'D1', x: 250, y: 255 },
        ],
        ball: { x: 262, y: 180 },
        passes: [
          { from: { x: 265, y: 185 }, to: { x: 380, y: 198 }, primary: true },
          { from: { x: 382, y: 188 }, to: { x: 262, y: 68 }, primary: false },
        ],
        movements: [
          { from: { x: 250, y: 255 }, to: { x: 250, y: 210 }, role: 'def' },
        ],
        shadows: [
          { points: '250,255 210,175 290,175', variant: 'danger' },
        ],
      },
    ],
  },

  'act-8': {
    type: 'concentric_square',
    cones: [
      { x: 75, y: 45 },
      { x: 425, y: 45 },
      { x: 75, y: 355 },
      { x: 425, y: 355 },
      { x: 185, y: 140 },
      { x: 315, y: 140 },
      { x: 185, y: 260 },
      { x: 315, y: 260 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: '1', x: 90, y: 65 },
          { id: 'A2', role: 'att', label: '2', x: 410, y: 65 },
          { id: 'A3', role: 'att', label: '3', x: 90, y: 335 },
          { id: 'A4', role: 'att', label: '4', x: 410, y: 335 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 215, y: 195 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 295, y: 205 },
        ],
        ball: { x: 102, y: 325 },
        passes: [
          { from: { x: 105, y: 322 }, to: { x: 202, y: 208 }, primary: true },
        ],
        movements: [
          { from: { x: 215, y: 195 }, to: { x: 200, y: 165 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: '1', x: 90, y: 65 },
          { id: 'A2', role: 'att', label: '2', x: 410, y: 65 },
          { id: 'A3', role: 'att', label: '3', x: 90, y: 335 },
          { id: 'A4', role: 'att', label: '4', x: 410, y: 335 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 210, y: 175 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 295, y: 225 },
        ],
        ball: { x: 222, y: 175 },
        passes: [
          { from: { x: 224, y: 178 }, to: { x: 282, y: 218 }, primary: true },
          { from: { x: 308, y: 215 }, to: { x: 396, y: 78 }, primary: false },
        ],
        movements: [
          { from: { x: 295, y: 225 }, to: { x: 320, y: 195 }, role: 'neutral' },
        ],
        shadows: [
          { points: '185,140 315,140 315,260 185,260', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: '1', x: 90, y: 65 },
          { id: 'A2', role: 'att', label: '2', x: 410, y: 65 },
          { id: 'A3', role: 'att', label: '3', x: 90, y: 335 },
          { id: 'A4', role: 'att', label: '4', x: 410, y: 335 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 210, y: 175 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 305, y: 195 },
          { id: 'D1', role: 'def', label: 'D1', x: 255, y: 135 },
        ],
        ball: { x: 318, y: 185 },
        passes: [
          { from: { x: 320, y: 182 }, to: { x: 398, y: 78 }, primary: true },
        ],
        movements: [
          { from: { x: 255, y: 135 }, to: { x: 290, y: 175 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  'act-9': {
    type: 'single_square',
    cones: [
      { x: 85, y: 55 },
      { x: 415, y: 55 },
      { x: 85, y: 345 },
      { x: 415, y: 345 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 165, y: 140 },
          { id: 'D1', role: 'def', label: 'B1', x: 165, y: 205 },
          { id: 'A2', role: 'att', label: 'A2', x: 335, y: 140 },
          { id: 'D2', role: 'def', label: 'B2', x: 335, y: 205 },
          { id: 'N1', role: 'neutral', label: 'F1', x: 165, y: 320 },
          { id: 'N2', role: 'neutral', label: 'F2', x: 335, y: 320 },
        ],
        ball: { x: 165, y: 158 },
        passes: [],
        movements: [
          { from: { x: 165, y: 140 }, to: { x: 165, y: 105 }, role: 'att' },
          { from: { x: 335, y: 140 }, to: { x: 335, y: 105 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 165, y: 195 },
          { id: 'D1', role: 'def', label: 'B1', x: 165, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 335, y: 195 },
          { id: 'D2', role: 'def', label: 'B2', x: 335, y: 145 },
          { id: 'N1', role: 'neutral', label: 'F1', x: 165, y: 320 },
          { id: 'N2', role: 'neutral', label: 'F2', x: 335, y: 320 },
        ],
        ball: { x: 165, y: 302 },
        passes: [
          { from: { x: 165, y: 302 }, to: { x: 165, y: 212 }, primary: true },
        ],
        movements: [
          { from: { x: 165, y: 145 }, to: { x: 165, y: 175 }, role: 'def' },
          { from: { x: 335, y: 145 }, to: { x: 335, y: 175 }, role: 'def' },
        ],
        shadows: [
          { points: '130,165 200,165 200,225 130,225', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 205, y: 155 },
          { id: 'D1', role: 'def', label: 'B1', x: 150, y: 165 },
          { id: 'A2', role: 'att', label: 'A2', x: 365, y: 155 },
          { id: 'D2', role: 'def', label: 'B2', x: 315, y: 165 },
          { id: 'N1', role: 'neutral', label: 'G1', x: 205, y: 65 },
          { id: 'N2', role: 'neutral', label: 'G2', x: 365, y: 65 },
        ],
        ball: { x: 205, y: 138 },
        passes: [
          { from: { x: 205, y: 138 }, to: { x: 205, y: 80 }, primary: true },
        ],
        movements: [
          { from: { x: 205, y: 155 }, to: { x: 205, y: 95 }, role: 'att' },
          { from: { x: 365, y: 155 }, to: { x: 365, y: 95 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  'act-10': {
    type: 'double_zone',
    cones: [
      { x: 70, y: 55 },
      { x: 250, y: 55 },
      { x: 430, y: 55 },
      { x: 70, y: 345 },
      { x: 250, y: 345 },
      { x: 430, y: 345 },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 140, y: 135 },
          { id: 'D1', role: 'def', label: 'D1', x: 140, y: 265 },
          { id: 'N1', role: 'neutral', label: 'C1', x: 250, y: 200 },
          { id: 'A2', role: 'att', label: 'G1', x: 410, y: 105 },
          { id: 'A3', role: 'att', label: 'G2', x: 410, y: 295 },
        ],
        ball: { x: 154, y: 135 },
        passes: [],
        movements: [
          { from: { x: 140, y: 135 }, to: { x: 225, y: 135 }, role: 'att' },
          { from: { x: 140, y: 265 }, to: { x: 225, y: 265 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 235, y: 135 },
          { id: 'D1', role: 'def', label: 'D1', x: 235, y: 265 },
          { id: 'N1', role: 'neutral', label: 'C1', x: 250, y: 200 },
          { id: 'A2', role: 'att', label: 'G1', x: 410, y: 105 },
          { id: 'A3', role: 'att', label: 'G2', x: 410, y: 295 },
        ],
        ball: { x: 248, y: 135 },
        passes: [],
        movements: [
          { from: { x: 235, y: 135 }, to: { x: 315, y: 115 }, role: 'att' },
          { from: { x: 235, y: 265 }, to: { x: 315, y: 175 }, role: 'def' },
        ],
        shadows: [
          { points: '215,110 275,110 275,165 215,165', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 330, y: 115 },
          { id: 'D1', role: 'def', label: 'D1', x: 310, y: 175 },
          { id: 'N1', role: 'neutral', label: 'C1', x: 250, y: 200 },
          { id: 'A2', role: 'att', label: 'G1', x: 410, y: 105 },
          { id: 'A3', role: 'att', label: 'G2', x: 410, y: 295 },
        ],
        ball: { x: 344, y: 112 },
        passes: [
          { from: { x: 346, y: 112 }, to: { x: 396, y: 106 }, primary: true },
        ],
        movements: [
          { from: { x: 330, y: 115 }, to: { x: 385, y: 108 }, role: 'att' },
          { from: { x: 310, y: 175 }, to: { x: 365, y: 130 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },
};
