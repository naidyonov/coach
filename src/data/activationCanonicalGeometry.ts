import {
  Point2D,
  RondoDiagram,
  RondoGate,
  RondoGoal,
  RondoPhasePlayer,
  RondoPhaseShadow,
} from '../i18n/types';

export interface CanonicalPhaseGeometry {
  players: RondoPhasePlayer[];
  ball?: Point2D;
  balls?: Point2D[];
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
  goals?: RondoGoal[];
  gates?: RondoGate[];
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
    goals: geom.goals,
    gates: geom.gates,
    phases: geom.phases.map((p, idx) => ({
      title: phaseTexts[idx].title,
      desc: phaseTexts[idx].desc,
      players: p.players,
      ball: p.ball,
      balls: p.balls,
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
  // ==========================================================================
  // act-1 (1.1): Coerver & Funino 4-Minigoal Team Arena (12-16 players in 1 box)
  // 4 outer Mini-Goals + 4 internal Colored Cone Gates + 8 players on canvas
  // ==========================================================================
  'act-1': {
    type: 'single_square',
    cones: [
      { x: 85, y: 55 },
      { x: 415, y: 55 },
      { x: 85, y: 345 },
      { x: 415, y: 345 },
    ],
    goals: [
      { id: 'act1-g1', x: 250, y: 42, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act1-g2', x: 250, y: 358, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act1-g3', x: 72, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act1-g4', x: 428, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    gates: [
      { id: 'act1-gt1', p1: { x: 150, y: 130 }, p2: { x: 188, y: 130 }, color: 'amber' },
      { id: 'act1-gt2', p1: { x: 312, y: 130 }, p2: { x: 350, y: 130 }, color: 'cyan' },
      { id: 'act1-gt3', p1: { x: 150, y: 270 }, p2: { x: 188, y: 270 }, color: 'rose' },
      { id: 'act1-gt4', p1: { x: 312, y: 270 }, p2: { x: 350, y: 270 }, color: 'emerald' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 95 },
          { id: 'A2', role: 'att', label: 'A2', x: 365, y: 95 },
          { id: 'A3', role: 'att', label: 'A3', x: 135, y: 305 },
          { id: 'A4', role: 'att', label: 'A4', x: 365, y: 305 },
          { id: 'A5', role: 'att', label: 'A5', x: 250, y: 155 },
          { id: 'A6', role: 'att', label: 'A6', x: 250, y: 245 },
          { id: 'D1', role: 'neutral', label: 'H1', x: 195, y: 200 },
          { id: 'D2', role: 'neutral', label: 'H2', x: 305, y: 200 },
        ],
        ball: { x: 147, y: 103 },
        balls: [
          { x: 353, y: 103 },
          { x: 147, y: 297 },
          { x: 353, y: 297 },
          { x: 262, y: 155 },
          { x: 238, y: 245 },
          { x: 195, y: 186 },
          { x: 305, y: 214 },
        ],
        passes: [],
        movements: [
          { from: { x: 135, y: 95 }, to: { x: 170, y: 155 }, role: 'att' },
          { from: { x: 365, y: 95 }, to: { x: 330, y: 155 }, role: 'att' },
          { from: { x: 135, y: 305 }, to: { x: 170, y: 245 }, role: 'att' },
          { from: { x: 365, y: 305 }, to: { x: 330, y: 245 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 168, y: 150 },
          { id: 'A2', role: 'att', label: 'A2', x: 332, y: 150 },
          { id: 'A3', role: 'att', label: 'A3', x: 168, y: 250 },
          { id: 'A4', role: 'att', label: 'A4', x: 332, y: 250 },
          { id: 'A5', role: 'att', label: 'A5', x: 250, y: 115 },
          { id: 'A6', role: 'att', label: 'A6', x: 250, y: 285 },
          { id: 'D1', role: 'neutral', label: 'H1', x: 215, y: 200 },
          { id: 'D2', role: 'neutral', label: 'H2', x: 285, y: 200 },
        ],
        ball: { x: 168, y: 134 },
        balls: [
          { x: 332, y: 134 },
          { x: 168, y: 266 },
          { x: 332, y: 266 },
          { x: 250, y: 101 },
          { x: 250, y: 299 },
        ],
        passes: [],
        movements: [
          { from: { x: 168, y: 150 }, to: { x: 168, y: 105 }, role: 'att' },
          { from: { x: 332, y: 150 }, to: { x: 332, y: 105 }, role: 'att' },
          { from: { x: 168, y: 250 }, to: { x: 168, y: 295 }, role: 'att' },
          { from: { x: 332, y: 250 }, to: { x: 332, y: 295 }, role: 'att' },
        ],
        shadows: [
          { points: '142,115 196,115 196,158 142,158', variant: 'solution' },
          { points: '304,115 358,115 358,158 304,158', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 205, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 345, y: 175 },
          { id: 'A3', role: 'att', label: 'A3', x: 155, y: 225 },
          { id: 'A4', role: 'att', label: 'A4', x: 295, y: 285 },
          { id: 'A5', role: 'att', label: 'A5', x: 120, y: 135 },
          { id: 'A6', role: 'att', label: 'A6', x: 380, y: 265 },
          { id: 'D1', role: 'def', label: 'D1', x: 215, y: 165 },
          { id: 'D2', role: 'def', label: 'D2', x: 285, y: 235 },
        ],
        ball: { x: 215, y: 102 },
        balls: [
          { x: 358, y: 175 },
          { x: 142, y: 225 },
          { x: 285, y: 298 },
        ],
        passes: [
          { from: { x: 215, y: 100 }, to: { x: 248, y: 48 }, primary: true },
          { from: { x: 285, y: 300 }, to: { x: 252, y: 352 }, primary: false },
        ],
        movements: [
          { from: { x: 215, y: 165 }, to: { x: 210, y: 125 }, role: 'def' },
          { from: { x: 345, y: 175 }, to: { x: 418, y: 198 }, role: 'att' },
          { from: { x: 155, y: 225 }, to: { x: 82, y: 202 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-2 (1.2): DFB Team "Schatten-Dribbling & 4-Tor-Jagd" (12-16 players in pairs)
  // 4 Mini-Goals on perimeter + 8 players (4 simultaneous pairs) in shared arena
  // ==========================================================================
  'act-2': {
    type: 'single_square',
    cones: [
      { x: 80, y: 55 },
      { x: 420, y: 55 },
      { x: 80, y: 345 },
      { x: 420, y: 345 },
    ],
    goals: [
      { id: 'act2-g1', x: 155, y: 42, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act2-g2', x: 345, y: 42, size: 'mini', facing: 'bottom', label: 'M2' },
      { id: 'act2-g3', x: 155, y: 358, size: 'mini', facing: 'top', label: 'M3' },
      { id: 'act2-g4', x: 345, y: 358, size: 'mini', facing: 'top', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 155, y: 135 },
          { id: 'D1', role: 'def', label: 'S1', x: 155, y: 175 },
          { id: 'A2', role: 'att', label: 'A2', x: 325, y: 135 },
          { id: 'D2', role: 'def', label: 'S2', x: 325, y: 175 },
          { id: 'A3', role: 'att', label: 'A3', x: 175, y: 265 },
          { id: 'D3', role: 'def', label: 'S3', x: 175, y: 225 },
          { id: 'A4', role: 'att', label: 'A4', x: 345, y: 265 },
          { id: 'D4', role: 'def', label: 'S4', x: 345, y: 225 },
        ],
        ball: { x: 168, y: 130 },
        balls: [
          { x: 338, y: 130 },
          { x: 162, y: 270 },
          { x: 332, y: 270 },
        ],
        passes: [],
        movements: [
          { from: { x: 155, y: 135 }, to: { x: 215, y: 115 }, role: 'att' },
          { from: { x: 155, y: 175 }, to: { x: 215, y: 155 }, role: 'def' },
          { from: { x: 325, y: 135 }, to: { x: 375, y: 115 }, role: 'att' },
          { from: { x: 345, y: 265 }, to: { x: 285, y: 285 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 195, y: 125 },
          { id: 'D1', role: 'def', label: 'S1', x: 195, y: 165 },
          { id: 'A2', role: 'att', label: 'A2', x: 345, y: 125 },
          { id: 'D2', role: 'def', label: 'S2', x: 345, y: 165 },
          { id: 'A3', role: 'att', label: 'A3', x: 155, y: 275 },
          { id: 'D3', role: 'def', label: 'S3', x: 155, y: 235 },
          { id: 'A4', role: 'att', label: 'A4', x: 305, y: 275 },
          { id: 'D4', role: 'def', label: 'S4', x: 305, y: 235 },
        ],
        ball: { x: 182, y: 120 },
        balls: [
          { x: 358, y: 120 },
          { x: 142, y: 280 },
          { x: 318, y: 280 },
        ],
        passes: [],
        movements: [
          { from: { x: 195, y: 125 }, to: { x: 155, y: 100 }, role: 'att', curve: -16 },
          { from: { x: 195, y: 165 }, to: { x: 165, y: 135 }, role: 'def', curve: -12 },
          { from: { x: 305, y: 275 }, to: { x: 345, y: 300 }, role: 'att', curve: 16 },
        ],
        shadows: [
          { points: '165,105 225,105 225,178 165,178', variant: 'solution' },
          { points: '275,222 335,222 335,295 275,295', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 155, y: 92 },
          { id: 'D1', role: 'def', label: 'S1', x: 185, y: 135 },
          { id: 'A2', role: 'att', label: 'A2', x: 345, y: 92 },
          { id: 'D2', role: 'def', label: 'S2', x: 315, y: 135 },
          { id: 'A3', role: 'att', label: 'A3', x: 155, y: 308 },
          { id: 'D3', role: 'def', label: 'S3', x: 185, y: 265 },
          { id: 'A4', role: 'att', label: 'A4', x: 345, y: 308 },
          { id: 'D4', role: 'def', label: 'S4', x: 315, y: 265 },
        ],
        ball: { x: 155, y: 78 },
        balls: [
          { x: 345, y: 78 },
          { x: 155, y: 322 },
          { x: 345, y: 322 },
        ],
        passes: [
          { from: { x: 155, y: 76 }, to: { x: 155, y: 48 }, primary: true },
          { from: { x: 345, y: 324 }, to: { x: 345, y: 352 }, primary: false },
        ],
        movements: [
          { from: { x: 185, y: 135 }, to: { x: 162, y: 98 }, role: 'def' },
          { from: { x: 345, y: 92 }, to: { x: 345, y: 55 }, role: 'att' },
          { from: { x: 155, y: 308 }, to: { x: 155, y: 345 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-3 (2.1): SFV "Zentrum-Stern" Team Circuit (6 Outside + 4-6 Inside)
  // Concentric Square + 4 Corner Mini-Goals + 10 players + 3 simultaneous balls
  // ==========================================================================
  'act-3': {
    type: 'concentric_square',
    cones: [
      { x: 75, y: 45 },
      { x: 425, y: 45 },
      { x: 75, y: 355 },
      { x: 425, y: 355 },
      { x: 175, y: 130 },
      { x: 325, y: 130 },
      { x: 175, y: 270 },
      { x: 325, y: 270 },
    ],
    goals: [
      { id: 'act3-g1', x: 250, y: 32, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act3-g2', x: 250, y: 368, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act3-g3', x: 62, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act3-g4', x: 438, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'S1', x: 155, y: 345 },
          { id: 'A2', role: 'att', label: 'S2', x: 345, y: 345 },
          { id: 'A3', role: 'att', label: 'S3', x: 88, y: 135 },
          { id: 'A4', role: 'att', label: 'S4', x: 412, y: 135 },
          { id: 'A5', role: 'att', label: 'S5', x: 155, y: 55 },
          { id: 'A6', role: 'att', label: 'S6', x: 345, y: 55 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 215, y: 225 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 285, y: 175 },
          { id: 'D1', role: 'neutral', label: 'N3', x: 215, y: 160 },
          { id: 'D2', role: 'neutral', label: 'N4', x: 285, y: 240 },
        ],
        ball: { x: 162, y: 330 },
        balls: [
          { x: 338, y: 68 },
          { x: 102, y: 135 },
        ],
        passes: [
          { from: { x: 162, y: 328 }, to: { x: 210, y: 238 }, primary: true },
          { from: { x: 338, y: 70 }, to: { x: 290, y: 162 }, primary: false },
        ],
        movements: [
          { from: { x: 215, y: 225 }, to: { x: 265, y: 205 }, role: 'neutral' },
          { from: { x: 285, y: 175 }, to: { x: 235, y: 195 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'S1', x: 155, y: 345 },
          { id: 'A2', role: 'att', label: 'S2', x: 345, y: 345 },
          { id: 'A3', role: 'att', label: 'S3', x: 88, y: 135 },
          { id: 'A4', role: 'att', label: 'S4', x: 412, y: 135 },
          { id: 'A5', role: 'att', label: 'S5', x: 155, y: 55 },
          { id: 'A6', role: 'att', label: 'S6', x: 345, y: 55 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 245, y: 210 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 255, y: 160 },
          { id: 'D1', role: 'def', label: 'D1', x: 205, y: 215 },
          { id: 'D2', role: 'def', label: 'D2', x: 295, y: 155 },
        ],
        ball: { x: 258, y: 210 },
        balls: [{ x: 242, y: 160 }],
        passes: [
          { from: { x: 260, y: 208 }, to: { x: 398, y: 142 }, primary: true },
          { from: { x: 240, y: 158 }, to: { x: 102, y: 138 }, primary: false },
        ],
        movements: [
          { from: { x: 205, y: 215 }, to: { x: 235, y: 210 }, role: 'def' },
          { from: { x: 245, y: 210 }, to: { x: 305, y: 190 }, role: 'neutral' },
        ],
        shadows: [
          { points: '175,130 325,130 325,270 175,270', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'S1', x: 155, y: 345 },
          { id: 'A2', role: 'att', label: 'S2', x: 345, y: 345 },
          { id: 'A3', role: 'att', label: 'S3', x: 88, y: 135 },
          { id: 'A4', role: 'att', label: 'S4', x: 412, y: 135 },
          { id: 'A5', role: 'att', label: 'S5', x: 155, y: 55 },
          { id: 'A6', role: 'att', label: 'S6', x: 345, y: 55 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 275, y: 165 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 225, y: 235 },
          { id: 'D1', role: 'def', label: 'D1', x: 235, y: 195 },
          { id: 'D2', role: 'def', label: 'D2', x: 265, y: 215 },
        ],
        ball: { x: 285, y: 152 },
        balls: [{ x: 215, y: 248 }],
        passes: [
          { from: { x: 286, y: 150 }, to: { x: 338, y: 68 }, primary: true },
          { from: { x: 214, y: 250 }, to: { x: 162, y: 332 }, primary: false },
        ],
        movements: [
          { from: { x: 235, y: 195 }, to: { x: 268, y: 170 }, role: 'def' },
          { from: { x: 275, y: 165 }, to: { x: 315, y: 120 }, role: 'neutral' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-4 (2.2): FC Barcelona Symmetrical Dual-Y Open-Hip Circuit & Large Goals
  // 2 Large Goals (top & bottom) + 10 players (2 simultaneous balls via #6A & #6B)
  // ==========================================================================
  'act-4': {
    type: 'single_square',
    cones: [
      { x: 75, y: 55 },
      { x: 425, y: 55 },
      { x: 75, y: 345 },
      { x: 425, y: 345 },
    ],
    goals: [
      { id: 'act4-lg1', x: 250, y: 38, size: 'large', facing: 'bottom', label: 'GK' },
      { id: 'act4-m1', x: 140, y: 362, size: 'mini', facing: 'top', label: 'M1' },
      { id: 'act4-m2', x: 360, y: 362, size: 'mini', facing: 'top', label: 'M2' },
    ],
    gates: [
      { id: 'act4-gt1', p1: { x: 95, y: 115 }, p2: { x: 125, y: 95 }, color: 'amber', label: 'L1' },
      { id: 'act4-gt2', p1: { x: 375, y: 95 }, p2: { x: 405, y: 115 }, color: 'cyan', label: 'R1' },
      { id: 'act4-gt3', p1: { x: 95, y: 285 }, p2: { x: 125, y: 305 }, color: 'cyan', label: 'L2' },
      { id: 'act4-gt4', p1: { x: 375, y: 305 }, p2: { x: 405, y: 285 }, color: 'amber', label: 'R2' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 330 },
          { id: 'A2', role: 'att', label: 'A2', x: 285, y: 70 },
          { id: 'N1', role: 'neutral', label: '6A', x: 215, y: 215 },
          { id: 'N2', role: 'neutral', label: '6B', x: 285, y: 185 },
          { id: 'A3', role: 'att', label: 'L1', x: 110, y: 125 },
          { id: 'A4', role: 'att', label: 'R1', x: 390, y: 125 },
          { id: 'A5', role: 'att', label: 'L2', x: 110, y: 275 },
          { id: 'A6', role: 'att', label: 'R2', x: 390, y: 275 },
          { id: 'D1', role: 'neutral', label: 'D1', x: 215, y: 175 },
          { id: 'D2', role: 'neutral', label: 'D2', x: 285, y: 225 },
        ],
        ball: { x: 215, y: 314 },
        balls: [{ x: 285, y: 86 }],
        passes: [
          { from: { x: 215, y: 312 }, to: { x: 215, y: 228 }, primary: true },
          { from: { x: 204, y: 208 }, to: { x: 122, y: 134 }, primary: false },
          { from: { x: 285, y: 88 }, to: { x: 285, y: 172 }, primary: false },
        ],
        movements: [
          { from: { x: 215, y: 215 }, to: { x: 190, y: 195 }, role: 'neutral' },
          { from: { x: 285, y: 185 }, to: { x: 310, y: 205 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 330 },
          { id: 'A2', role: 'att', label: 'A2', x: 285, y: 70 },
          { id: 'N1', role: 'neutral', label: '6A', x: 225, y: 205 },
          { id: 'N2', role: 'neutral', label: '6B', x: 295, y: 225 },
          { id: 'A3', role: 'att', label: 'L1', x: 110, y: 125 },
          { id: 'A4', role: 'att', label: 'R1', x: 390, y: 125 },
          { id: 'A5', role: 'att', label: 'L2', x: 110, y: 275 },
          { id: 'A6', role: 'att', label: 'R2', x: 390, y: 275 },
          { id: 'D1', role: 'def', label: 'D1', x: 185, y: 175 },
          { id: 'D2', role: 'def', label: 'D2', x: 335, y: 235 },
        ],
        ball: { x: 238, y: 198 },
        balls: [{ x: 280, y: 220 }],
        passes: [
          { from: { x: 240, y: 196 }, to: { x: 376, y: 132 }, primary: true },
          { from: { x: 280, y: 225 }, to: { x: 124, y: 268 }, primary: false },
        ],
        movements: [
          { from: { x: 185, y: 175 }, to: { x: 215, y: 195 }, role: 'def' },
          { from: { x: 225, y: 205 }, to: { x: 265, y: 175 }, role: 'neutral' },
        ],
        shadows: [
          { points: '185,175 110,125 205,125', variant: 'danger' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 310 },
          { id: 'A2', role: 'att', label: 'A2', x: 215, y: 115 },
          { id: 'N1', role: 'neutral', label: '6A', x: 265, y: 155 },
          { id: 'N2', role: 'neutral', label: '6B', x: 235, y: 245 },
          { id: 'A3', role: 'att', label: 'L1', x: 125, y: 105 },
          { id: 'A4', role: 'att', label: 'R1', x: 365, y: 105 },
          { id: 'A5', role: 'att', label: 'L2', x: 135, y: 295 },
          { id: 'A6', role: 'att', label: 'R2', x: 375, y: 295 },
          { id: 'D1', role: 'def', label: 'D1', x: 220, y: 175 },
          { id: 'D2', role: 'def', label: 'D2', x: 280, y: 225 },
        ],
        ball: { x: 352, y: 102 },
        balls: [{ x: 148, y: 298 }],
        passes: [
          { from: { x: 350, y: 98 }, to: { x: 268, y: 46 }, primary: true },
          { from: { x: 150, y: 302 }, to: { x: 142, y: 354 }, primary: false },
        ],
        movements: [
          { from: { x: 265, y: 155 }, to: { x: 255, y: 95 }, role: 'neutral' },
          { from: { x: 220, y: 175 }, to: { x: 255, y: 158 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-5 (3.1): SFV / Horst Wein 4-Quadrant Space Explorer & 4 Mini-Goals
  // 9 cones = 4 true quadrants with cross-lines + 4 outer Mini-Goals + 10 players
  // ==========================================================================
  'act-5': {
    type: 'single_square',
    cones: [
      { x: 75, y: 50 },
      { x: 425, y: 50 },
      { x: 75, y: 350 },
      { x: 425, y: 350 },
      { x: 250, y: 50 },
      { x: 250, y: 350 },
      { x: 75, y: 200 },
      { x: 425, y: 200 },
      { x: 250, y: 200 },
    ],
    goals: [
      { id: 'act5-g1', x: 162, y: 36, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act5-g2', x: 338, y: 36, size: 'mini', facing: 'bottom', label: 'M2' },
      { id: 'act5-g3', x: 162, y: 364, size: 'mini', facing: 'top', label: 'M3' },
      { id: 'act5-g4', x: 338, y: 364, size: 'mini', facing: 'top', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 125, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 195, y: 135 },
          { id: 'A3', role: 'att', label: 'A3', x: 145, y: 165 },
          { id: 'A4', role: 'att', label: 'A4', x: 135, y: 265 },
          { id: 'A5', role: 'att', label: 'A5', x: 205, y: 305 },
          { id: 'A6', role: 'att', label: 'A6', x: 315, y: 265 },
          { id: 'A7', role: 'att', label: 'A7', x: 375, y: 305 },
          { id: 'D1', role: 'neutral', label: 'N1', x: 215, y: 235 },
          { id: 'D2', role: 'neutral', label: 'N2', x: 345, y: 235 },
          { id: 'D3', role: 'neutral', label: 'N3', x: 115, y: 315 },
        ],
        ball: { x: 208, y: 132 },
        balls: [
          { x: 138, y: 105 },
          { x: 148, y: 265 },
          { x: 328, y: 265 },
          { x: 228, y: 235 },
        ],
        passes: [],
        movements: [
          { from: { x: 195, y: 135 }, to: { x: 335, y: 115 }, role: 'att' },
          { from: { x: 215, y: 235 }, to: { x: 315, y: 155 }, role: 'neutral' },
        ],
        shadows: [
          { points: '250,50 425,50 425,200 250,200', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 340, y: 115 },
          { id: 'A3', role: 'att', label: 'A3', x: 185, y: 155 },
          { id: 'A4', role: 'att', label: 'A4', x: 145, y: 275 },
          { id: 'A5', role: 'att', label: 'A5', x: 215, y: 305 },
          { id: 'A6', role: 'att', label: 'A6', x: 315, y: 265 },
          { id: 'A7', role: 'att', label: 'A7', x: 375, y: 305 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 135 },
          { id: 'D2', role: 'def', label: 'D2', x: 345, y: 285 },
          { id: 'D3', role: 'def', label: 'D3', x: 185, y: 285 },
        ],
        ball: { x: 340, y: 130 },
        balls: [
          { x: 145, y: 260 },
          { x: 315, y: 250 },
        ],
        passes: [
          { from: { x: 338, y: 132 }, to: { x: 318, y: 248 }, primary: true },
        ],
        movements: [
          { from: { x: 185, y: 155 }, to: { x: 295, y: 135 }, role: 'att' },
          { from: { x: 215, y: 305 }, to: { x: 155, y: 295 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 340, y: 115 },
          { id: 'A3', role: 'att', label: 'A3', x: 295, y: 145 },
          { id: 'A4', role: 'att', label: 'A4', x: 155, y: 295 },
          { id: 'A5', role: 'att', label: 'A5', x: 215, y: 265 },
          { id: 'A6', role: 'att', label: 'A6', x: 315, y: 255 },
          { id: 'A7', role: 'att', label: 'A7', x: 375, y: 305 },
          { id: 'D1', role: 'def', label: 'D1', x: 175, y: 135 },
          { id: 'D2', role: 'def', label: 'D2', x: 335, y: 135 },
          { id: 'D3', role: 'def', label: 'D3', x: 345, y: 275 },
        ],
        ball: { x: 158, y: 310 },
        balls: [{ x: 302, y: 255 }],
        passes: [
          { from: { x: 158, y: 312 }, to: { x: 162, y: 356 }, primary: true },
          { from: { x: 302, y: 255 }, to: { x: 228, y: 265 }, primary: false },
        ],
        movements: [
          { from: { x: 155, y: 295 }, to: { x: 160, y: 340 }, role: 'att' },
          { from: { x: 345, y: 275 }, to: { x: 318, y: 258 }, role: 'def' },
        ],
        shadows: [
          { points: '75,200 250,200 250,350 75,350', variant: 'solution' },
        ],
      },
    ],
  },

  // ==========================================================================
  // act-6 (3.2): DFB Two-Way 3-Zone Line-Breaking Carry on 4 Mini-Goals
  // 2 Mini-Goals Left + 2 Mini-Goals Right + 3 Midline Gates + 10 players
  // ==========================================================================
  'act-6': {
    type: 'double_zone',
    cones: [
      { x: 70, y: 50 },
      { x: 250, y: 50 },
      { x: 430, y: 50 },
      { x: 70, y: 350 },
      { x: 250, y: 350 },
      { x: 430, y: 350 },
    ],
    goals: [
      { id: 'act6-gl1', x: 56, y: 115, size: 'mini', facing: 'right', label: 'L1' },
      { id: 'act6-gl2', x: 56, y: 285, size: 'mini', facing: 'right', label: 'L2' },
      { id: 'act6-gr1', x: 444, y: 115, size: 'mini', facing: 'left', label: 'R1' },
      { id: 'act6-gr2', x: 444, y: 285, size: 'mini', facing: 'left', label: 'R2' },
    ],
    gates: [
      { id: 'act6-gt1', p1: { x: 250, y: 85 }, p2: { x: 250, y: 125 }, color: 'emerald' },
      { id: 'act6-gt2', p1: { x: 250, y: 180 }, p2: { x: 250, y: 220 }, color: 'amber' },
      { id: 'act6-gt3', p1: { x: 250, y: 275 }, p2: { x: 250, y: 315 }, color: 'cyan' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 135, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 135, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 105, y: 155 },
          { id: 'A4', role: 'att', label: 'A4', x: 105, y: 255 },
          { id: 'A5', role: 'att', label: 'B1', x: 365, y: 295 },
          { id: 'A6', role: 'att', label: 'B2', x: 365, y: 150 },
          { id: 'A7', role: 'att', label: 'B3', x: 395, y: 235 },
          { id: 'A8', role: 'att', label: 'B4', x: 395, y: 105 },
          { id: 'D1', role: 'neutral', label: 'D1', x: 250, y: 150 },
          { id: 'D2', role: 'neutral', label: 'D2', x: 250, y: 250 },
        ],
        ball: { x: 148, y: 105 },
        balls: [
          { x: 148, y: 200 },
          { x: 352, y: 295 },
          { x: 352, y: 150 },
        ],
        passes: [],
        movements: [
          { from: { x: 135, y: 105 }, to: { x: 305, y: 105 }, role: 'att' },
          { from: { x: 135, y: 200 }, to: { x: 305, y: 200 }, role: 'att' },
          { from: { x: 365, y: 295 }, to: { x: 195, y: 295 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 235, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 235, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 125, y: 150 },
          { id: 'A4', role: 'att', label: 'A4', x: 125, y: 250 },
          { id: 'A5', role: 'att', label: 'B1', x: 265, y: 295 },
          { id: 'A6', role: 'att', label: 'B2', x: 355, y: 150 },
          { id: 'A7', role: 'att', label: 'B3', x: 375, y: 235 },
          { id: 'A8', role: 'att', label: 'B4', x: 375, y: 105 },
          { id: 'D1', role: 'def', label: 'D1', x: 245, y: 140 },
          { id: 'D2', role: 'def', label: 'D2', x: 255, y: 260 },
        ],
        ball: { x: 248, y: 105 },
        balls: [
          { x: 248, y: 200 },
          { x: 252, y: 295 },
        ],
        passes: [],
        movements: [
          { from: { x: 235, y: 105 }, to: { x: 335, y: 105 }, role: 'att' },
          { from: { x: 245, y: 140 }, to: { x: 265, y: 112 }, role: 'def' },
          { from: { x: 265, y: 295 }, to: { x: 165, y: 295 }, role: 'att' },
          { from: { x: 255, y: 260 }, to: { x: 235, y: 288 }, role: 'def' },
        ],
        shadows: [
          { points: '225,80 285,80 285,130 225,130', variant: 'solution' },
          { points: '215,270 275,270 275,320 215,320', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 355, y: 110 },
          { id: 'A2', role: 'att', label: 'A2', x: 315, y: 205 },
          { id: 'A3', role: 'att', label: 'A3', x: 145, y: 150 },
          { id: 'A4', role: 'att', label: 'A4', x: 145, y: 250 },
          { id: 'A5', role: 'att', label: 'B1', x: 145, y: 290 },
          { id: 'A6', role: 'att', label: 'B2', x: 355, y: 165 },
          { id: 'A7', role: 'att', label: 'B3', x: 385, y: 240 },
          { id: 'A8', role: 'att', label: 'B4', x: 385, y: 95 },
          { id: 'D1', role: 'def', label: 'D1', x: 295, y: 135 },
          { id: 'D2', role: 'def', label: 'D2', x: 205, y: 270 },
        ],
        ball: { x: 370, y: 112 },
        balls: [{ x: 130, y: 288 }],
        passes: [
          { from: { x: 372, y: 112 }, to: { x: 436, y: 115 }, primary: true },
          { from: { x: 128, y: 288 }, to: { x: 64, y: 285 }, primary: false },
        ],
        movements: [
          { from: { x: 295, y: 135 }, to: { x: 345, y: 118 }, role: 'def' },
          { from: { x: 205, y: 270 }, to: { x: 155, y: 284 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-7 (4.1): FC Barcelona Symmetrical 2-Ball Diamond (Rueda de Pases)
  // True Diamond Polygon + 2 Mini-Goals + 10 players + 2 simultaneous balls
  // ==========================================================================
  'act-7': {
    type: 'single_square',
    cones: [
      { x: 250, y: 40 },
      { x: 75, y: 200 },
      { x: 425, y: 200 },
      { x: 250, y: 360 },
    ],
    goals: [
      { id: 'act7-g1', x: 125, y: 55, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act7-g2', x: 375, y: 345, size: 'mini', facing: 'top', label: 'M2' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 380 },
          { id: 'B1', role: 'att', label: 'B1', x: 92, y: 200 },
          { id: 'B2', role: 'att', label: 'B2', x: 55, y: 200 },
          { id: 'C1', role: 'att', label: 'C1', x: 250, y: 55 },
          { id: 'C2', role: 'att', label: 'C2', x: 250, y: 22 },
          { id: 'D1', role: 'att', label: 'D1', x: 408, y: 200 },
          { id: 'D2', role: 'att', label: 'D2', x: 445, y: 200 },
          { id: 'N1', role: 'neutral', label: '6A', x: 215, y: 200 },
          { id: 'N2', role: 'neutral', label: '6B', x: 285, y: 200 },
        ],
        ball: { x: 236, y: 334 },
        balls: [{ x: 264, y: 66 }],
        passes: [
          { from: { x: 235, y: 332 }, to: { x: 105, y: 212 }, primary: true },
          { from: { x: 105, y: 188 }, to: { x: 235, y: 68 }, primary: false },
          { from: { x: 265, y: 68 }, to: { x: 395, y: 188 }, primary: false },
          { from: { x: 395, y: 212 }, to: { x: 265, y: 332 }, primary: false },
        ],
        movements: [
          { from: { x: 250, y: 345 }, to: { x: 165, y: 268 }, role: 'att' },
          { from: { x: 250, y: 55 }, to: { x: 335, y: 132 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 345 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 380 },
          { id: 'B1', role: 'att', label: 'B1', x: 92, y: 200 },
          { id: 'B2', role: 'att', label: 'B2', x: 55, y: 200 },
          { id: 'C1', role: 'att', label: 'C1', x: 250, y: 55 },
          { id: 'C2', role: 'att', label: 'C2', x: 250, y: 22 },
          { id: 'D1', role: 'att', label: 'D1', x: 408, y: 200 },
          { id: 'D2', role: 'att', label: 'D2', x: 445, y: 200 },
          { id: 'N1', role: 'neutral', label: '6A', x: 205, y: 185 },
          { id: 'N2', role: 'neutral', label: '6B', x: 295, y: 215 },
        ],
        ball: { x: 108, y: 198 },
        balls: [{ x: 392, y: 202 }],
        passes: [
          { from: { x: 110, y: 196 }, to: { x: 192, y: 186 }, primary: true },
          { from: { x: 208, y: 172 }, to: { x: 244, y: 70 }, primary: false },
          { from: { x: 390, y: 204 }, to: { x: 308, y: 214 }, primary: false },
          { from: { x: 292, y: 228 }, to: { x: 256, y: 330 }, primary: false },
        ],
        movements: [
          { from: { x: 92, y: 200 }, to: { x: 145, y: 145 }, role: 'att' },
          { from: { x: 408, y: 200 }, to: { x: 355, y: 255 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 345 },
          { id: 'A2', role: 'def', label: 'P1', x: 240, y: 225 },
          { id: 'B1', role: 'att', label: 'B1', x: 120, y: 155 },
          { id: 'B2', role: 'att', label: 'B2', x: 85, y: 200 },
          { id: 'C1', role: 'att', label: 'C1', x: 250, y: 55 },
          { id: 'C2', role: 'def', label: 'P2', x: 260, y: 175 },
          { id: 'D1', role: 'att', label: 'D1', x: 380, y: 245 },
          { id: 'D2', role: 'att', label: 'D2', x: 415, y: 200 },
          { id: 'N1', role: 'neutral', label: '6A', x: 200, y: 175 },
          { id: 'N2', role: 'neutral', label: '6B', x: 300, y: 225 },
        ],
        ball: { x: 186, y: 170 },
        balls: [{ x: 314, y: 230 }],
        passes: [
          { from: { x: 184, y: 168 }, to: { x: 132, y: 156 }, primary: true },
          { from: { x: 120, y: 142 }, to: { x: 125, y: 64 }, primary: false },
          { from: { x: 316, y: 232 }, to: { x: 368, y: 244 }, primary: false },
          { from: { x: 380, y: 258 }, to: { x: 375, y: 336 }, primary: false },
        ],
        movements: [
          { from: { x: 240, y: 225 }, to: { x: 210, y: 188 }, role: 'def' },
          { from: { x: 260, y: 175 }, to: { x: 290, y: 212 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-8 (4.2): AFC Ajax 4-Corner Double-Square Scanning Circuit
  // All 4 corners active + 2 balls + 4 outer Mini-Goals + 10 players
  // ==========================================================================
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
    goals: [
      { id: 'act8-g1', x: 250, y: 32, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act8-g2', x: 250, y: 368, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act8-g3', x: 62, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act8-g4', x: 438, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: '1A', x: 92, y: 65 },
          { id: 'A2', role: 'att', label: '2A', x: 408, y: 65 },
          { id: 'A3', role: 'att', label: '3A', x: 92, y: 335 },
          { id: 'A4', role: 'att', label: '4A', x: 408, y: 335 },
          { id: 'A5', role: 'att', label: '1B', x: 120, y: 55 },
          { id: 'A6', role: 'att', label: '2B', x: 380, y: 55 },
          { id: 'A7', role: 'att', label: '3B', x: 120, y: 345 },
          { id: 'A8', role: 'att', label: '4B', x: 380, y: 345 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 210, y: 215 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 290, y: 185 },
        ],
        ball: { x: 105, y: 322 },
        balls: [{ x: 395, y: 78 }],
        passes: [
          { from: { x: 106, y: 320 }, to: { x: 200, y: 225 }, primary: true },
          { from: { x: 205, y: 200 }, to: { x: 102, y: 78 }, primary: false },
          { from: { x: 394, y: 80 }, to: { x: 300, y: 175 }, primary: false },
          { from: { x: 295, y: 200 }, to: { x: 398, y: 322 }, primary: false },
        ],
        movements: [
          { from: { x: 92, y: 335 }, to: { x: 155, y: 270 }, role: 'att' },
          { from: { x: 408, y: 65 }, to: { x: 345, y: 130 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: '1A', x: 92, y: 65 },
          { id: 'A2', role: 'att', label: '2A', x: 408, y: 65 },
          { id: 'A3', role: 'att', label: '3A', x: 92, y: 335 },
          { id: 'A4', role: 'att', label: '4A', x: 408, y: 335 },
          { id: 'A5', role: 'att', label: '1B', x: 120, y: 55 },
          { id: 'A6', role: 'att', label: '2B', x: 380, y: 55 },
          { id: 'A7', role: 'att', label: '3B', x: 120, y: 345 },
          { id: 'A8', role: 'att', label: '4B', x: 380, y: 345 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 210, y: 175 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 290, y: 225 },
        ],
        ball: { x: 224, y: 178 },
        balls: [{ x: 105, y: 78 }],
        passes: [
          { from: { x: 225, y: 180 }, to: { x: 278, y: 218 }, primary: true },
          { from: { x: 302, y: 215 }, to: { x: 396, y: 78 }, primary: false },
        ],
        movements: [
          { from: { x: 210, y: 175 }, to: { x: 210, y: 225 }, role: 'neutral' },
          { from: { x: 290, y: 225 }, to: { x: 315, y: 185 }, role: 'neutral' },
        ],
        shadows: [
          { points: '185,140 315,140 315,260 185,260', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: '1A', x: 92, y: 65 },
          { id: 'A2', role: 'att', label: '2A', x: 408, y: 65 },
          { id: 'A3', role: 'att', label: '3A', x: 92, y: 335 },
          { id: 'A4', role: 'att', label: '4A', x: 408, y: 335 },
          { id: 'A5', role: 'att', label: '1B', x: 120, y: 55 },
          { id: 'A6', role: 'att', label: '2B', x: 380, y: 55 },
          { id: 'A7', role: 'def', label: 'D1', x: 245, y: 155 },
          { id: 'A8', role: 'def', label: 'D2', x: 255, y: 245 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 205, y: 195 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 295, y: 195 },
        ],
        ball: { x: 308, y: 188 },
        balls: [{ x: 192, y: 202 }],
        passes: [
          { from: { x: 310, y: 188 }, to: { x: 430, y: 198 }, primary: true },
          { from: { x: 190, y: 202 }, to: { x: 70, y: 198 }, primary: false },
        ],
        movements: [
          { from: { x: 245, y: 155 }, to: { x: 282, y: 185 }, role: 'def' },
          { from: { x: 255, y: 245 }, to: { x: 218, y: 205 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-9 (6.1): SFV 11_d "5m-Tore durchdribbeln & Bälle jagen" (1v1 Defensiv)
  // 4 internal 5m gates + 4 outer Mini-Goals + 9-10 players
  // ==========================================================================
  'act-9': {
    type: 'single_square',
    cones: [
      { x: 75, y: 55 },
      { x: 425, y: 55 },
      { x: 75, y: 345 },
      { x: 425, y: 345 },
    ],
    goals: [
      { id: 'act9-g1', x: 250, y: 42, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act9-g2', x: 250, y: 358, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act9-g3', x: 62, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act9-g4', x: 438, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    gates: [
      { id: 'act9-gt1', p1: { x: 155, y: 115 }, p2: { x: 195, y: 115 }, color: 'amber', label: 'G1' },
      { id: 'act9-gt2', p1: { x: 305, y: 115 }, p2: { x: 345, y: 115 }, color: 'cyan', label: 'G2' },
      { id: 'act9-gt3', p1: { x: 155, y: 285 }, p2: { x: 195, y: 285 }, color: 'rose', label: 'G3' },
      { id: 'act9-gt4', p1: { x: 305, y: 285 }, p2: { x: 345, y: 285 }, color: 'emerald', label: 'G4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 175, y: 165 },
          { id: 'D1', role: 'def', label: 'D1', x: 175, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 325, y: 165 },
          { id: 'D2', role: 'def', label: 'D2', x: 325, y: 115 },
          { id: 'A3', role: 'att', label: 'A3', x: 175, y: 235 },
          { id: 'D3', role: 'def', label: 'D3', x: 175, y: 285 },
          { id: 'A4', role: 'att', label: 'A4', x: 325, y: 235 },
          { id: 'D4', role: 'def', label: 'D4', x: 325, y: 285 },
        ],
        ball: { x: 175, y: 150 },
        balls: [
          { x: 325, y: 150 },
          { x: 175, y: 250 },
          { x: 325, y: 250 },
        ],
        passes: [],
        movements: [
          { from: { x: 175, y: 165 }, to: { x: 175, y: 128 }, role: 'att' },
          { from: { x: 175, y: 115 }, to: { x: 215, y: 115 }, role: 'def' },
          { from: { x: 325, y: 165 }, to: { x: 325, y: 128 }, role: 'att' },
          { from: { x: 325, y: 235 }, to: { x: 325, y: 272 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 130, y: 125 },
          { id: 'A2', role: 'att', label: 'A2', x: 365, y: 125 },
          { id: 'A3', role: 'att', label: 'A3', x: 130, y: 275 },
          { id: 'A4', role: 'att', label: 'A4', x: 365, y: 275 },
          { id: 'A5', role: 'att', label: 'A5', x: 250, y: 140 },
          { id: 'A6', role: 'att', label: 'A6', x: 250, y: 260 },
          { id: 'D1', role: 'def', label: 'D1', x: 175, y: 155 },
          { id: 'D2', role: 'def', label: 'D2', x: 315, y: 155 },
          { id: 'D3', role: 'def', label: 'D3', x: 205, y: 245 },
        ],
        ball: { x: 144, y: 125 },
        balls: [
          { x: 350, y: 125 },
          { x: 144, y: 275 },
          { x: 350, y: 275 },
          { x: 250, y: 125 },
          { x: 250, y: 275 },
        ],
        passes: [],
        movements: [
          { from: { x: 175, y: 155 }, to: { x: 142, y: 132 }, role: 'def' },
          { from: { x: 315, y: 155 }, to: { x: 352, y: 132 }, role: 'def' },
          { from: { x: 205, y: 245 }, to: { x: 142, y: 268 }, role: 'def' },
          { from: { x: 250, y: 140 }, to: { x: 215, y: 105 }, role: 'att' },
        ],
        shadows: [
          { points: '110,100 190,100 190,165 110,165', variant: 'danger' },
          { points: '305,100 385,100 385,165 305,165', variant: 'danger' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 145, y: 135 },
          { id: 'A2', role: 'att', label: 'A2', x: 375, y: 195 },
          { id: 'A3', role: 'att', label: 'A3', x: 135, y: 265 },
          { id: 'A4', role: 'att', label: 'A4', x: 335, y: 285 },
          { id: 'A5', role: 'att', label: 'A5', x: 250, y: 195 },
          { id: 'D1', role: 'def', label: 'D1', x: 190, y: 105 },
          { id: 'D2', role: 'def', label: 'D2', x: 340, y: 185 },
          { id: 'D3', role: 'def', label: 'D3', x: 215, y: 295 },
        ],
        ball: { x: 196, y: 92 },
        balls: [
          { x: 388, y: 198 },
          { x: 222, y: 308 },
        ],
        passes: [
          { from: { x: 198, y: 90 }, to: { x: 244, y: 48 }, primary: true },
          { from: { x: 390, y: 198 }, to: { x: 430, y: 200 }, primary: false },
          { from: { x: 224, y: 310 }, to: { x: 246, y: 352 }, primary: false },
        ],
        movements: [
          { from: { x: 190, y: 105 }, to: { x: 225, y: 68 }, role: 'def' },
          { from: { x: 340, y: 185 }, to: { x: 372, y: 194 }, role: 'def' },
          { from: { x: 215, y: 295 }, to: { x: 238, y: 335 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-10 (5.2): SFV 10_d "Linien zusammen überspielen & Zu zweit Tore erzielen"
  // 10 cones = 3 vertical defensive lines + 2 far Mini-Goals + 9 players (3 pairs vs 3 line defenders)
  // ==========================================================================
  'act-10': {
    type: 'double_zone',
    cones: [
      { x: 70, y: 55 },
      { x: 430, y: 55 },
      { x: 70, y: 345 },
      { x: 430, y: 345 },
      { x: 165, y: 55 },
      { x: 165, y: 345 },
      { x: 250, y: 55 },
      { x: 250, y: 345 },
      { x: 335, y: 55 },
      { x: 335, y: 345 },
    ],
    goals: [
      { id: 'act10-g1', x: 444, y: 125, size: 'mini', facing: 'left', label: 'M1' },
      { id: 'act10-g2', x: 444, y: 275, size: 'mini', facing: 'left', label: 'M2' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 120, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 205, y: 95 },
          { id: 'A3', role: 'att', label: 'B1', x: 120, y: 265 },
          { id: 'A4', role: 'att', label: 'B2', x: 205, y: 295 },
          { id: 'A5', role: 'att', label: 'C1', x: 82, y: 185 },
          { id: 'A6', role: 'att', label: 'C2', x: 82, y: 215 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 175 },
          { id: 'D2', role: 'def', label: 'D2', x: 250, y: 200 },
          { id: 'D3', role: 'def', label: 'D3', x: 335, y: 200 },
        ],
        ball: { x: 134, y: 112 },
        balls: [
          { x: 134, y: 268 },
          { x: 95, y: 185 },
        ],
        passes: [
          { from: { x: 136, y: 112 }, to: { x: 192, y: 98 }, primary: true },
          { from: { x: 136, y: 268 }, to: { x: 192, y: 292 }, primary: false },
        ],
        movements: [
          { from: { x: 120, y: 115 }, to: { x: 152, y: 135 }, role: 'att' },
          { from: { x: 165, y: 175 }, to: { x: 165, y: 135 }, role: 'def' },
          { from: { x: 205, y: 95 }, to: { x: 235, y: 115 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 210, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 295, y: 95 },
          { id: 'A3', role: 'att', label: 'B1', x: 210, y: 265 },
          { id: 'A4', role: 'att', label: 'B2', x: 295, y: 295 },
          { id: 'A5', role: 'att', label: 'C1', x: 120, y: 185 },
          { id: 'A6', role: 'att', label: 'C2', x: 120, y: 225 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 205 },
          { id: 'D2', role: 'def', label: 'D2', x: 250, y: 165 },
          { id: 'D3', role: 'def', label: 'D3', x: 335, y: 215 },
        ],
        ball: { x: 224, y: 112 },
        balls: [
          { x: 224, y: 268 },
          { x: 134, y: 185 },
        ],
        passes: [
          { from: { x: 226, y: 112 }, to: { x: 282, y: 98 }, primary: true },
        ],
        movements: [
          { from: { x: 250, y: 165 }, to: { x: 250, y: 125 }, role: 'def' },
          { from: { x: 210, y: 265 }, to: { x: 280, y: 255 }, role: 'att' },
          { from: { x: 295, y: 95 }, to: { x: 325, y: 115 }, role: 'att' },
        ],
        shadows: [
          { points: '250,125 295,95 295,155', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 365, y: 115 },
          { id: 'A2', role: 'att', label: 'A2', x: 310, y: 155 },
          { id: 'A3', role: 'att', label: 'B1', x: 365, y: 285 },
          { id: 'A4', role: 'att', label: 'B2', x: 310, y: 245 },
          { id: 'A5', role: 'att', label: 'C1', x: 205, y: 185 },
          { id: 'A6', role: 'att', label: 'C2', x: 205, y: 225 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 205 },
          { id: 'D2', role: 'def', label: 'D2', x: 250, y: 205 },
          { id: 'D3', role: 'def', label: 'D3', x: 335, y: 175 },
        ],
        ball: { x: 378, y: 117 },
        balls: [
          { x: 378, y: 283 },
          { x: 218, y: 185 },
        ],
        passes: [
          { from: { x: 380, y: 117 }, to: { x: 436, y: 124 }, primary: true },
          { from: { x: 380, y: 283 }, to: { x: 436, y: 276 }, primary: false },
        ],
        movements: [
          { from: { x: 335, y: 175 }, to: { x: 355, y: 130 }, role: 'def' },
          { from: { x: 205, y: 185 }, to: { x: 275, y: 175 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-11 (1.3): SFV 02_d "Aus den Zonen dribbeln & 4gg4 mit Dribbelzonen"
  // 16 cones = outer square + 3 internal 4-cone Dribbelzonen + 4 outer Mini-Goals
  // ==========================================================================
  'act-11': {
    type: 'concentric_square',
    cones: [
      { x: 65, y: 45 },
      { x: 435, y: 45 },
      { x: 65, y: 355 },
      { x: 435, y: 355 },
      // Dribbelzone 1 (Top-Left)
      { x: 105, y: 85 },
      { x: 190, y: 85 },
      { x: 105, y: 165 },
      { x: 190, y: 165 },
      // Dribbelzone 2 (Top-Right)
      { x: 310, y: 85 },
      { x: 395, y: 85 },
      { x: 310, y: 165 },
      { x: 395, y: 165 },
      // Dribbelzone 3 (Bottom-Center)
      { x: 205, y: 240 },
      { x: 295, y: 240 },
      { x: 205, y: 320 },
      { x: 295, y: 320 },
    ],
    goals: [
      { id: 'act11-g1', x: 250, y: 34, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act11-g2', x: 250, y: 366, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act11-g3', x: 54, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act11-g4', x: 446, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 150, y: 125 },
          { id: 'A2', role: 'att', label: 'A2', x: 350, y: 125 },
          { id: 'A3', role: 'att', label: 'A3', x: 250, y: 280 },
          { id: 'A4', role: 'att', label: 'A4', x: 150, y: 265 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 245, y: 80 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 415, y: 215 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 355, y: 295 },
          { id: 'N4', role: 'neutral', label: 'N4', x: 90, y: 220 },
        ],
        ball: { x: 164, y: 122 },
        balls: [
          { x: 364, y: 135 },
          { x: 264, y: 280 },
          { x: 136, y: 260 },
        ],
        passes: [
          { from: { x: 205, y: 108 }, to: { x: 235, y: 86 }, primary: true },
          { from: { x: 300, y: 280 }, to: { x: 342, y: 292 }, primary: false },
        ],
        movements: [
          { from: { x: 150, y: 125 }, to: { x: 202, y: 110 }, role: 'att' },
          { from: { x: 350, y: 125 }, to: { x: 375, y: 185 }, role: 'att' },
          { from: { x: 250, y: 280 }, to: { x: 298, y: 280 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 150, y: 125 },
          { id: 'A2', role: 'att', label: 'A2', x: 350, y: 125 },
          { id: 'A3', role: 'att', label: 'A3', x: 250, y: 280 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 185 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 82, y: 125 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 350, y: 60 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 160, y: 280 },
          { id: 'N4', role: 'neutral', label: 'N4', x: 415, y: 250 },
        ],
        ball: { x: 95, y: 125 },
        balls: [
          { x: 350, y: 72 },
          { x: 174, y: 280 },
        ],
        passes: [
          { from: { x: 96, y: 125 }, to: { x: 136, y: 125 }, primary: true },
          { from: { x: 350, y: 74 }, to: { x: 350, y: 112 }, primary: false },
          { from: { x: 175, y: 280 }, to: { x: 236, y: 280 }, primary: false },
        ],
        movements: [
          { from: { x: 150, y: 125 }, to: { x: 150, y: 185 }, role: 'att' },
          { from: { x: 350, y: 125 }, to: { x: 285, y: 125 }, role: 'att' },
          { from: { x: 250, y: 280 }, to: { x: 250, y: 215 }, role: 'att' },
        ],
        shadows: [
          { points: '105,85 190,85 190,165 105,165', variant: 'solution' },
          { points: '310,85 395,85 395,165 310,165', variant: 'solution' },
          { points: '205,240 295,240 295,320 205,320', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 150, y: 125 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 115 },
          { id: 'A3', role: 'att', label: 'A3', x: 350, y: 125 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 280 },
          { id: 'A5', role: 'att', label: 'A5', x: 125, y: 275 },
          { id: 'D1', role: 'def', label: 'D1', x: 195, y: 185 },
          { id: 'D2', role: 'def', label: 'D2', x: 310, y: 185 },
          { id: 'D3', role: 'def', label: 'D3', x: 195, y: 265 },
          { id: 'D4', role: 'def', label: 'D4', x: 335, y: 280 },
        ],
        ball: { x: 164, y: 123 },
        balls: [],
        passes: [
          { from: { x: 165, y: 123 }, to: { x: 236, y: 116 }, primary: true },
        ],
        movements: [
          { from: { x: 250, y: 115 }, to: { x: 335, y: 125 }, role: 'att' },
          { from: { x: 250, y: 280 }, to: { x: 310, y: 280 }, role: 'att' },
          { from: { x: 195, y: 185 }, to: { x: 165, y: 140 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-12 (1.4): SFV 03_d "Doppelpass & Ins Feld dribbeln" (1v1 Line Entry)
  // 8 cones = Concentric Inner/Outer Square + 4 outer Mini-Goals
  // ==========================================================================
  'act-12': {
    type: 'concentric_square',
    cones: [
      { x: 70, y: 45 },
      { x: 430, y: 45 },
      { x: 70, y: 355 },
      { x: 430, y: 355 },
      { x: 155, y: 115 },
      { x: 345, y: 115 },
      { x: 155, y: 285 },
      { x: 345, y: 285 },
    ],
    goals: [
      { id: 'act12-g1', x: 250, y: 34, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act12-g2', x: 250, y: 366, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act12-g3', x: 58, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act12-g4', x: 442, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 205, y: 165 },
          { id: 'A2', role: 'att', label: 'A2', x: 295, y: 165 },
          { id: 'A3', role: 'att', label: 'A3', x: 205, y: 235 },
          { id: 'A4', role: 'att', label: 'A4', x: 295, y: 235 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 115 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 345, y: 200 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 250, y: 285 },
          { id: 'N4', role: 'neutral', label: 'N4', x: 155, y: 200 },
        ],
        ball: { x: 215, y: 154 },
        balls: [
          { x: 308, y: 172 },
          { x: 215, y: 246 },
          { x: 192, y: 228 },
        ],
        passes: [
          { from: { x: 216, y: 152 }, to: { x: 244, y: 122 }, primary: true },
          { from: { x: 256, y: 122 }, to: { x: 282, y: 142 }, primary: false },
          { from: { x: 216, y: 248 }, to: { x: 244, y: 278 }, primary: false },
        ],
        movements: [
          { from: { x: 205, y: 165 }, to: { x: 280, y: 140 }, role: 'att' },
          { from: { x: 205, y: 235 }, to: { x: 280, y: 260 }, role: 'att' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 250, y: 150 },
          { id: 'A2', role: 'att', label: 'A2', x: 310, y: 200 },
          { id: 'A3', role: 'att', label: 'A3', x: 250, y: 250 },
          { id: 'A4', role: 'att', label: 'A4', x: 190, y: 200 },
          { id: 'D1', role: 'def', label: 'D1', x: 250, y: 115 },
          { id: 'D2', role: 'def', label: 'D2', x: 345, y: 200 },
          { id: 'D3', role: 'def', label: 'D3', x: 250, y: 285 },
          { id: 'D4', role: 'def', label: 'D4', x: 155, y: 200 },
        ],
        ball: { x: 250, y: 136 },
        balls: [
          { x: 324, y: 200 },
          { x: 250, y: 264 },
          { x: 176, y: 200 },
        ],
        passes: [],
        movements: [
          { from: { x: 250, y: 150 }, to: { x: 295, y: 85 }, role: 'att', curve: 18 },
          { from: { x: 310, y: 200 }, to: { x: 385, y: 240 }, role: 'att', curve: 18 },
          { from: { x: 250, y: 250 }, to: { x: 205, y: 315 }, role: 'att', curve: 18 },
          { from: { x: 190, y: 200 }, to: { x: 115, y: 160 }, role: 'att', curve: 18 },
        ],
        shadows: [
          { points: '155,115 345,115 345,285 155,285', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 230, y: 72 },
          { id: 'A2', role: 'att', label: 'A2', x: 400, y: 185 },
          { id: 'A3', role: 'att', label: 'A3', x: 270, y: 328 },
          { id: 'A4', role: 'att', label: 'A4', x: 100, y: 215 },
          { id: 'D1', role: 'def', label: 'D1', x: 250, y: 120 },
          { id: 'D2', role: 'def', label: 'D2', x: 340, y: 200 },
          { id: 'D3', role: 'def', label: 'D3', x: 250, y: 280 },
          { id: 'D4', role: 'def', label: 'D4', x: 160, y: 200 },
        ],
        ball: { x: 230, y: 86 },
        balls: [
          { x: 386, y: 185 },
          { x: 270, y: 314 },
          { x: 114, y: 215 },
        ],
        passes: [],
        movements: [
          { from: { x: 230, y: 72 }, to: { x: 205, y: 155 }, role: 'att', curve: -18 },
          { from: { x: 400, y: 185 }, to: { x: 305, y: 160 }, role: 'att', curve: -18 },
          { from: { x: 270, y: 328 }, to: { x: 295, y: 245 }, role: 'att', curve: -18 },
          { from: { x: 100, y: 215 }, to: { x: 195, y: 240 }, role: 'att', curve: -18 },
          { from: { x: 250, y: 120 }, to: { x: 218, y: 120 }, role: 'def' },
          { from: { x: 340, y: 200 }, to: { x: 340, y: 168 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-13 (4.3): SFV 04_d "Von Seite zu Seite & Vom 2gg2 zum 4gg4"
  // 4 outer cones + 2 Large Goals (G1 & G2) + 8-10 players
  // ==========================================================================
  'act-13': {
    type: 'single_square',
    cones: [
      { x: 100, y: 65 },
      { x: 400, y: 65 },
      { x: 100, y: 335 },
      { x: 400, y: 335 },
    ],
    goals: [
      { id: 'act13-lg1', x: 52, y: 200, size: 'large', facing: 'right', label: 'G1' },
      { id: 'act13-lg2', x: 448, y: 200, size: 'large', facing: 'left', label: 'G2' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 72, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 185, y: 130 },
          { id: 'A3', role: 'att', label: 'A3', x: 295, y: 155 },
          { id: 'A4', role: 'att', label: 'A4', x: 428, y: 145 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 72, y: 255 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 205, y: 245 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 315, y: 265 },
          { id: 'N4', role: 'neutral', label: 'N4', x: 428, y: 255 },
        ],
        ball: { x: 308, y: 152 },
        balls: [{ x: 192, y: 248 }],
        passes: [
          { from: { x: 310, y: 152 }, to: { x: 414, y: 146 }, primary: true },
          { from: { x: 86, y: 145 }, to: { x: 172, y: 132 }, primary: false },
          { from: { x: 190, y: 248 }, to: { x: 86, y: 254 }, primary: false },
        ],
        movements: [
          { from: { x: 185, y: 130 }, to: { x: 225, y: 115 }, role: 'att' },
          { from: { x: 315, y: 265 }, to: { x: 275, y: 280 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 72, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 185, y: 145 },
          { id: 'A3', role: 'att', label: 'A3', x: 315, y: 145 },
          { id: 'A4', role: 'att', label: 'A4', x: 428, y: 145 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 72, y: 255 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 185, y: 255 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 315, y: 255 },
          { id: 'N4', role: 'neutral', label: 'N4', x: 428, y: 255 },
        ],
        ball: { x: 170, y: 145 },
        balls: [{ x: 330, y: 255 }],
        passes: [
          { from: { x: 168, y: 145 }, to: { x: 86, y: 145 }, primary: true },
          { from: { x: 332, y: 255 }, to: { x: 414, y: 255 }, primary: false },
        ],
        movements: [
          { from: { x: 72, y: 145 }, to: { x: 135, y: 115 }, role: 'att' },
          { from: { x: 185, y: 145 }, to: { x: 82, y: 165 }, role: 'att' },
          { from: { x: 428, y: 255 }, to: { x: 365, y: 285 }, role: 'neutral' },
        ],
        shadows: [
          { points: '100,95 165,95 165,175 100,175', variant: 'solution' },
          { points: '335,225 400,225 400,305 335,305', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 185, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 310, y: 135 },
          { id: 'A3', role: 'att', label: 'A3', x: 72, y: 135 },
          { id: 'A4', role: 'att', label: 'A4', x: 428, y: 135 },
          { id: 'D1', role: 'def', label: 'D1', x: 215, y: 205 },
          { id: 'D2', role: 'def', label: 'D2', x: 285, y: 225 },
          { id: 'D3', role: 'def', label: 'D3', x: 72, y: 265 },
          { id: 'D4', role: 'def', label: 'D4', x: 428, y: 265 },
        ],
        ball: { x: 324, y: 135 },
        balls: [],
        passes: [
          { from: { x: 326, y: 135 }, to: { x: 414, y: 135 }, primary: true },
          { from: { x: 198, y: 144 }, to: { x: 296, y: 136 }, primary: false },
        ],
        movements: [
          { from: { x: 428, y: 135 }, to: { x: 365, y: 175 }, role: 'att' },
          { from: { x: 285, y: 225 }, to: { x: 310, y: 165 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-14 (5.1): SFV 07_d "Passspiel & 4gg4+Joker mit Abschluss auf 4 Minitore"
  // 4 outer cones + 4 outer Mini-Goals + 10 players (3 teams / 4v4+2 Jokers)
  // ==========================================================================
  'act-14': {
    type: 'single_square',
    cones: [
      { x: 80, y: 55 },
      { x: 420, y: 55 },
      { x: 80, y: 345 },
      { x: 420, y: 345 },
    ],
    goals: [
      { id: 'act14-g1', x: 250, y: 42, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act14-g2', x: 250, y: 358, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act14-g3', x: 66, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act14-g4', x: 434, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 145, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 215, y: 105 },
          { id: 'A3', role: 'att', label: 'A3', x: 155, y: 235 },
          { id: 'A4', role: 'att', label: 'A4', x: 245, y: 195 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 325, y: 125 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 375, y: 195 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 315, y: 255 },
          { id: 'D1', role: 'def', label: 'D1', x: 195, y: 300 },
          { id: 'D2', role: 'def', label: 'D2', x: 285, y: 305 },
        ],
        ball: { x: 222, y: 92 },
        balls: [
          { x: 388, y: 196 },
          { x: 272, y: 312 },
        ],
        passes: [
          { from: { x: 224, y: 90 }, to: { x: 246, y: 48 }, primary: true },
          { from: { x: 155, y: 140 }, to: { x: 204, y: 112 }, primary: false },
          { from: { x: 390, y: 196 }, to: { x: 428, y: 200 }, primary: false },
        ],
        movements: [
          { from: { x: 215, y: 105 }, to: { x: 235, y: 78 }, role: 'att' },
          { from: { x: 375, y: 195 }, to: { x: 405, y: 198 }, role: 'neutral' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 145, y: 245 },
          { id: 'A2', role: 'att', label: 'A2', x: 275, y: 135 },
          { id: 'A3', role: 'att', label: 'A3', x: 185, y: 155 },
          { id: 'A4', role: 'att', label: 'A4', x: 235, y: 255 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 345, y: 115 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 355, y: 265 },
          { id: 'N3', role: 'neutral', label: 'N3', x: 135, y: 125 },
          { id: 'D1', role: 'def', label: 'D1', x: 195, y: 305 },
          { id: 'D2', role: 'def', label: 'D2', x: 305, y: 305 },
        ],
        ball: { x: 288, y: 140 },
        balls: [{ x: 122, y: 132 }],
        passes: [
          { from: { x: 290, y: 142 }, to: { x: 426, y: 196 }, primary: true },
          { from: { x: 198, y: 152 }, to: { x: 262, y: 138 }, primary: false },
        ],
        movements: [
          { from: { x: 275, y: 135 }, to: { x: 315, y: 152 }, role: 'att' },
          { from: { x: 135, y: 125 }, to: { x: 95, y: 165 }, role: 'neutral' },
        ],
        shadows: [
          { points: '250,55 420,55 420,345 250,345', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 105 },
          { id: 'A2', role: 'att', label: 'A2', x: 135, y: 185 },
          { id: 'A3', role: 'att', label: 'A3', x: 355, y: 165 },
          { id: 'A4', role: 'att', label: 'A4', x: 295, y: 285 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 245, y: 175 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 215, y: 245 },
          { id: 'D1', role: 'def', label: 'D1', x: 185, y: 145 },
          { id: 'D2', role: 'def', label: 'D2', x: 305, y: 155 },
          { id: 'D3', role: 'def', label: 'D3', x: 175, y: 235 },
          { id: 'D4', role: 'def', label: 'D4', x: 275, y: 235 },
        ],
        ball: { x: 222, y: 92 },
        balls: [],
        passes: [
          { from: { x: 224, y: 90 }, to: { x: 246, y: 48 }, primary: true },
          { from: { x: 242, y: 162 }, to: { x: 218, y: 118 }, primary: false },
        ],
        movements: [
          { from: { x: 185, y: 145 }, to: { x: 210, y: 115 }, role: 'def' },
          { from: { x: 355, y: 165 }, to: { x: 395, y: 192 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-15 (3.3): SFV 09_d "9-Felder-Einstieg" (3x3 Grid Scanning & Freilaufen)
  // 16 cones = 3x3 9-zone grid + 4 outer Mini-Goals + 10 players (4v4 + 2 Neutrals)
  // ==========================================================================
  'act-15': {
    type: 'single_square',
    cones: [
      // 4 outer corners first
      { x: 80, y: 50 },
      { x: 420, y: 50 },
      { x: 80, y: 350 },
      { x: 420, y: 350 },
      // 12 internal/edge cones of the 3x3 grid
      { x: 193, y: 50 },
      { x: 307, y: 50 },
      { x: 80, y: 150 },
      { x: 193, y: 150 },
      { x: 307, y: 150 },
      { x: 420, y: 150 },
      { x: 80, y: 250 },
      { x: 193, y: 250 },
      { x: 307, y: 250 },
      { x: 420, y: 250 },
      { x: 193, y: 350 },
      { x: 307, y: 350 },
    ],
    goals: [
      { id: 'act15-g1', x: 250, y: 36, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act15-g2', x: 250, y: 364, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act15-g3', x: 64, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act15-g4', x: 436, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 136, y: 100 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 100 },
          { id: 'A3', role: 'att', label: 'A3', x: 364, y: 200 },
          { id: 'A4', role: 'att', label: 'A4', x: 136, y: 300 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 200 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 364, y: 300 },
          { id: 'D1', role: 'def', label: 'D1', x: 364, y: 100 },
          { id: 'D2', role: 'def', label: 'D2', x: 136, y: 200 },
          { id: 'D3', role: 'def', label: 'D3', x: 250, y: 300 },
        ],
        ball: { x: 150, y: 100 },
        balls: [{ x: 150, y: 200 }],
        passes: [
          { from: { x: 152, y: 100 }, to: { x: 234, y: 100 }, primary: true },
          { from: { x: 152, y: 200 }, to: { x: 234, y: 200 }, primary: false },
        ],
        movements: [
          { from: { x: 364, y: 200 }, to: { x: 364, y: 135 }, role: 'att' },
          { from: { x: 250, y: 300 }, to: { x: 175, y: 300 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 136, y: 100 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 100 },
          { id: 'A3', role: 'att', label: 'A3', x: 136, y: 200 },
          { id: 'A4', role: 'att', label: 'A4', x: 250, y: 300 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 364, y: 200 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 136, y: 300 },
          { id: 'D1', role: 'def', label: 'D1', x: 364, y: 100 },
          { id: 'D2', role: 'def', label: 'D2', x: 250, y: 200 },
          { id: 'D3', role: 'def', label: 'D3', x: 364, y: 300 },
        ],
        ball: { x: 264, y: 112 },
        balls: [{ x: 150, y: 300 }],
        passes: [
          { from: { x: 266, y: 114 }, to: { x: 350, y: 186 }, primary: true },
          { from: { x: 152, y: 300 }, to: { x: 234, y: 300 }, primary: false },
        ],
        movements: [
          { from: { x: 250, y: 100 }, to: { x: 250, y: 165 }, role: 'att' },
          { from: { x: 364, y: 200 }, to: { x: 364, y: 125 }, role: 'neutral' },
        ],
        shadows: [
          { points: '307,150 420,150 420,250 307,250', variant: 'solution' },
          { points: '193,250 307,250 307,350 193,350', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 136, y: 100 },
          { id: 'A2', role: 'att', label: 'A2', x: 364, y: 100 },
          { id: 'A3', role: 'att', label: 'A3', x: 136, y: 300 },
          { id: 'A4', role: 'att', label: 'A4', x: 364, y: 300 },
          { id: 'N1', role: 'neutral', label: 'N1', x: 250, y: 200 },
          { id: 'N2', role: 'neutral', label: 'N2', x: 250, y: 300 },
          { id: 'D1', role: 'def', label: 'D1', x: 185, y: 135 },
          { id: 'D2', role: 'def', label: 'D2', x: 235, y: 125 },
          { id: 'D3', role: 'def', label: 'D3', x: 175, y: 235 },
          { id: 'D4', role: 'def', label: 'D4', x: 325, y: 235 },
        ],
        ball: { x: 264, y: 188 },
        balls: [],
        passes: [
          { from: { x: 266, y: 186 }, to: { x: 350, y: 112 }, primary: true },
          { from: { x: 250, y: 286 }, to: { x: 250, y: 216 }, primary: false },
        ],
        movements: [
          { from: { x: 364, y: 100 }, to: { x: 364, y: 165 }, role: 'att' },
          { from: { x: 235, y: 125 }, to: { x: 315, y: 110 }, role: 'def' },
        ],
        shadows: [
          { points: '307,50 420,50 420,150 307,150', variant: 'solution' },
        ],
      },
    ],
  },

  // ==========================================================================
  // act-16 (6.2): SFV 12_d "Pylonentore schliessen & 2 Teams gegen 1 Team"
  // 4 outer cones + 4 outer Mini-Goals + 6 internal 2m colored Cone Gates + 10 players
  // ==========================================================================
  'act-16': {
    type: 'single_square',
    cones: [
      { x: 70, y: 50 },
      { x: 430, y: 50 },
      { x: 70, y: 350 },
      { x: 430, y: 350 },
    ],
    goals: [
      { id: 'act16-g1', x: 250, y: 36, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act16-g2', x: 250, y: 364, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act16-g3', x: 56, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act16-g4', x: 444, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    gates: [
      { id: 'act16-gt1', p1: { x: 165, y: 90 }, p2: { x: 165, y: 125 }, color: 'amber', label: 'G1' },
      { id: 'act16-gt2', p1: { x: 335, y: 90 }, p2: { x: 335, y: 125 }, color: 'cyan', label: 'G2' },
      { id: 'act16-gt3', p1: { x: 230, y: 185 }, p2: { x: 270, y: 185 }, color: 'rose', label: 'G3' },
      { id: 'act16-gt4', p1: { x: 140, y: 215 }, p2: { x: 175, y: 215 }, color: 'emerald', label: 'G4' },
      { id: 'act16-gt5', p1: { x: 165, y: 275 }, p2: { x: 165, y: 310 }, color: 'cyan', label: 'G5' },
      { id: 'act16-gt6', p1: { x: 335, y: 275 }, p2: { x: 335, y: 310 }, color: 'amber', label: 'G6' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 110, y: 108 },
          { id: 'A2', role: 'att', label: 'A2', x: 225, y: 108 },
          { id: 'A3', role: 'att', label: 'A3', x: 390, y: 155 },
          { id: 'N1', role: 'neutral', label: 'B1', x: 110, y: 292 },
          { id: 'N2', role: 'neutral', label: 'B2', x: 235, y: 292 },
          { id: 'N3', role: 'neutral', label: 'B3', x: 390, y: 255 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 165 },
          { id: 'D2', role: 'def', label: 'D2', x: 335, y: 110 },
          { id: 'D3', role: 'def', label: 'D3', x: 250, y: 185 },
          { id: 'D4', role: 'def', label: 'D4', x: 335, y: 292 },
        ],
        ball: { x: 124, y: 108 },
        balls: [{ x: 124, y: 292 }],
        passes: [
          { from: { x: 126, y: 108 }, to: { x: 210, y: 108 }, primary: true },
          { from: { x: 126, y: 292 }, to: { x: 220, y: 292 }, primary: false },
        ],
        movements: [
          { from: { x: 165, y: 165 }, to: { x: 165, y: 120 }, role: 'def' },
          { from: { x: 250, y: 185 }, to: { x: 185, y: 245 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 115, y: 155 },
          { id: 'A2', role: 'att', label: 'A2', x: 250, y: 115 },
          { id: 'A3', role: 'att', label: 'A3', x: 390, y: 115 },
          { id: 'N1', role: 'neutral', label: 'B1', x: 110, y: 285 },
          { id: 'N2', role: 'neutral', label: 'B2', x: 230, y: 285 },
          { id: 'N3', role: 'neutral', label: 'B3', x: 390, y: 285 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 110 },
          { id: 'D2', role: 'def', label: 'D2', x: 335, y: 110 },
          { id: 'D3', role: 'def', label: 'D3', x: 160, y: 215 },
          { id: 'D4', role: 'def', label: 'D4', x: 335, y: 292 },
        ],
        ball: { x: 124, y: 285 },
        balls: [{ x: 264, y: 115 }],
        passes: [
          { from: { x: 126, y: 285 }, to: { x: 214, y: 285 }, primary: true },
        ],
        movements: [
          { from: { x: 160, y: 215 }, to: { x: 165, y: 278 }, role: 'def' },
          { from: { x: 335, y: 110 }, to: { x: 275, y: 165 }, role: 'def' },
        ],
        shadows: [
          { points: '165,110 115,155 185,155', variant: 'danger' },
          { points: '335,110 390,115 355,155', variant: 'danger' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 115, y: 108 },
          { id: 'A2', role: 'att', label: 'A2', x: 235, y: 108 },
          { id: 'A3', role: 'att', label: 'A3', x: 395, y: 108 },
          { id: 'N1', role: 'neutral', label: 'B1', x: 115, y: 255 },
          { id: 'N2', role: 'neutral', label: 'B2', x: 250, y: 245 },
          { id: 'N3', role: 'neutral', label: 'B3', x: 390, y: 265 },
          { id: 'D1', role: 'def', label: 'D1', x: 165, y: 115 },
          { id: 'D2', role: 'def', label: 'D2', x: 315, y: 165 },
          { id: 'D3', role: 'def', label: 'D3', x: 250, y: 185 },
          { id: 'D4', role: 'def', label: 'D4', x: 335, y: 285 },
        ],
        ball: { x: 248, y: 108 },
        balls: [{ x: 250, y: 230 }],
        passes: [
          { from: { x: 250, y: 108 }, to: { x: 380, y: 108 }, primary: true },
          { from: { x: 250, y: 228 }, to: { x: 250, y: 155 }, primary: false },
        ],
        movements: [
          { from: { x: 315, y: 165 }, to: { x: 335, y: 112 }, role: 'def' },
          { from: { x: 250, y: 185 }, to: { x: 250, y: 215 }, role: 'def' },
        ],
        shadows: [],
      },
    ],
  },
};

