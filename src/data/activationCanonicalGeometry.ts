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
      { id: 'act4-lg1', x: 250, y: 38, size: 'large', facing: 'bottom', label: 'GK Goal' },
      { id: 'act4-m1', x: 140, y: 362, size: 'mini', facing: 'top', label: 'M1' },
      { id: 'act4-m2', x: 360, y: 362, size: 'mini', facing: 'top', label: 'M2' },
    ],
    gates: [
      { id: 'act4-gt1', p1: { x: 95, y: 115 }, p2: { x: 125, y: 95 }, color: 'amber', label: 'L' },
      { id: 'act4-gt2', p1: { x: 375, y: 95 }, p2: { x: 405, y: 115 }, color: 'cyan', label: 'R' },
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
          { id: 'D1', role: 'neutral', label: 'M1', x: 215, y: 175 },
          { id: 'D2', role: 'neutral', label: 'M2', x: 285, y: 225 },
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
      { id: 'act5-g1', x: 162, y: 36, size: 'mini', facing: 'bottom', label: 'Q1 Tor' },
      { id: 'act5-g2', x: 338, y: 36, size: 'mini', facing: 'bottom', label: 'Q2 Tor' },
      { id: 'act5-g3', x: 162, y: 364, size: 'mini', facing: 'top', label: 'Q3 Tor' },
      { id: 'act5-g4', x: 338, y: 364, size: 'mini', facing: 'top', label: 'Q4 Tor' },
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
  // act-9 (5.1): SFV "Mutig & Stark" + FIFA 11+ Team Duel Arena (4 Mini-Goals)
  // 8 players (4 simultaneous pairs, 1 ball per pair) + 4 Perimeter Mini-Goals
  // ==========================================================================
  'act-9': {
    type: 'single_square',
    cones: [
      { x: 80, y: 55 },
      { x: 420, y: 55 },
      { x: 80, y: 345 },
      { x: 420, y: 345 },
    ],
    goals: [
      { id: 'act9-g1', x: 250, y: 42, size: 'mini', facing: 'bottom', label: 'M1' },
      { id: 'act9-g2', x: 250, y: 358, size: 'mini', facing: 'top', label: 'M2' },
      { id: 'act9-g3', x: 66, y: 200, size: 'mini', facing: 'right', label: 'M3' },
      { id: 'act9-g4', x: 434, y: 200, size: 'mini', facing: 'left', label: 'M4' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 165, y: 130 },
          { id: 'D1', role: 'def', label: 'B1', x: 200, y: 130 },
          { id: 'A2', role: 'att', label: 'A2', x: 300, y: 130 },
          { id: 'D2', role: 'def', label: 'B2', x: 335, y: 130 },
          { id: 'A3', role: 'att', label: 'A3', x: 165, y: 270 },
          { id: 'D3', role: 'def', label: 'B3', x: 200, y: 270 },
          { id: 'A4', role: 'att', label: 'A4', x: 300, y: 270 },
          { id: 'D4', role: 'def', label: 'B4', x: 335, y: 270 },
        ],
        ball: { x: 150, y: 130 },
        balls: [
          { x: 285, y: 130 },
          { x: 150, y: 270 },
          { x: 285, y: 270 },
        ],
        passes: [],
        movements: [
          { from: { x: 165, y: 130 }, to: { x: 180, y: 105 }, role: 'att' },
          { from: { x: 200, y: 130 }, to: { x: 185, y: 105 }, role: 'def' },
          { from: { x: 300, y: 270 }, to: { x: 315, y: 295 }, role: 'att' },
          { from: { x: 335, y: 270 }, to: { x: 320, y: 295 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 170, y: 140 },
          { id: 'D1', role: 'def', label: 'B1', x: 198, y: 155 },
          { id: 'A2', role: 'att', label: 'A2', x: 330, y: 140 },
          { id: 'D2', role: 'def', label: 'B2', x: 302, y: 155 },
          { id: 'A3', role: 'att', label: 'A3', x: 170, y: 260 },
          { id: 'D3', role: 'def', label: 'B3', x: 198, y: 245 },
          { id: 'A4', role: 'att', label: 'A4', x: 330, y: 260 },
          { id: 'D4', role: 'def', label: 'B4', x: 302, y: 245 },
        ],
        ball: { x: 154, y: 132 },
        balls: [
          { x: 346, y: 132 },
          { x: 154, y: 268 },
          { x: 346, y: 268 },
        ],
        passes: [],
        movements: [
          { from: { x: 198, y: 155 }, to: { x: 176, y: 144 }, role: 'def' },
          { from: { x: 302, y: 155 }, to: { x: 324, y: 144 }, role: 'def' },
          { from: { x: 198, y: 245 }, to: { x: 176, y: 256 }, role: 'def' },
          { from: { x: 302, y: 245 }, to: { x: 324, y: 256 }, role: 'def' },
        ],
        shadows: [
          { points: '140,115 215,115 215,170 140,170', variant: 'solution' },
          { points: '285,115 360,115 360,170 285,170', variant: 'solution' },
          { points: '140,230 215,230 215,285 140,285', variant: 'solution' },
          { points: '285,230 360,230 360,285 285,285', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 215, y: 105 },
          { id: 'D1', role: 'def', label: 'B1', x: 185, y: 145 },
          { id: 'A2', role: 'att', label: 'A2', x: 365, y: 185 },
          { id: 'D2', role: 'def', label: 'B2', x: 315, y: 165 },
          { id: 'A3', role: 'att', label: 'A3', x: 135, y: 215 },
          { id: 'D3', role: 'def', label: 'B3', x: 185, y: 235 },
          { id: 'A4', role: 'att', label: 'A4', x: 285, y: 295 },
          { id: 'D4', role: 'def', label: 'B4', x: 315, y: 255 },
        ],
        ball: { x: 226, y: 92 },
        balls: [
          { x: 380, y: 190 },
          { x: 120, y: 210 },
          { x: 274, y: 308 },
        ],
        passes: [
          { from: { x: 228, y: 90 }, to: { x: 248, y: 48 }, primary: true },
          { from: { x: 382, y: 192 }, to: { x: 428, y: 198 }, primary: false },
          { from: { x: 118, y: 208 }, to: { x: 72, y: 202 }, primary: false },
          { from: { x: 272, y: 310 }, to: { x: 252, y: 352 }, primary: false },
        ],
        movements: [
          { from: { x: 215, y: 105 }, to: { x: 242, y: 65 }, role: 'att', curve: 15 },
          { from: { x: 285, y: 295 }, to: { x: 258, y: 335 }, role: 'att', curve: 15 },
        ],
        shadows: [],
      },
    ],
  },

  // ==========================================================================
  // act-10 (5.2): DFB & RAMP Team Potentiation Waves (Multi-Lane Braking & Goals)
  // 2 Mini-Goals + 1 Central Large Goal + 2 Midline Braking Gates + 8 players
  // ==========================================================================
  'act-10': {
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
      { id: 'act10-g1', x: 444, y: 105, size: 'mini', facing: 'left', label: 'M1' },
      { id: 'act10-g2', x: 444, y: 295, size: 'mini', facing: 'left', label: 'M2' },
    ],
    gates: [
      { id: 'act10-gt1', p1: { x: 250, y: 95 }, p2: { x: 250, y: 140 }, color: 'emerald', label: 'Brake 1' },
      { id: 'act10-gt2', p1: { x: 250, y: 260 }, p2: { x: 250, y: 305 }, color: 'cyan', label: 'Brake 2' },
    ],
    phases: [
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 145, y: 105 },
          { id: 'D1', role: 'def', label: 'D1', x: 145, y: 150 },
          { id: 'A2', role: 'att', label: 'A2', x: 145, y: 250 },
          { id: 'D2', role: 'def', label: 'D2', x: 145, y: 295 },
          { id: 'A3', role: 'att', label: 'A3', x: 88, y: 105 },
          { id: 'D3', role: 'def', label: 'D3', x: 88, y: 150 },
          { id: 'A4', role: 'att', label: 'A4', x: 88, y: 250 },
          { id: 'D4', role: 'def', label: 'D4', x: 88, y: 295 },
        ],
        ball: { x: 158, y: 105 },
        balls: [
          { x: 158, y: 250 },
          { x: 101, y: 105 },
          { x: 101, y: 250 },
        ],
        passes: [],
        movements: [
          { from: { x: 145, y: 105 }, to: { x: 235, y: 105 }, role: 'att' },
          { from: { x: 145, y: 150 }, to: { x: 235, y: 150 }, role: 'def' },
          { from: { x: 145, y: 250 }, to: { x: 235, y: 250 }, role: 'att' },
          { from: { x: 145, y: 295 }, to: { x: 235, y: 295 }, role: 'def' },
        ],
        shadows: [],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 240, y: 110 },
          { id: 'D1', role: 'def', label: 'D1', x: 240, y: 155 },
          { id: 'A2', role: 'att', label: 'A2', x: 240, y: 265 },
          { id: 'D2', role: 'def', label: 'D2', x: 240, y: 310 },
          { id: 'A3', role: 'att', label: 'A3', x: 115, y: 105 },
          { id: 'D3', role: 'def', label: 'D3', x: 115, y: 150 },
          { id: 'A4', role: 'att', label: 'A4', x: 115, y: 250 },
          { id: 'D4', role: 'def', label: 'D4', x: 115, y: 295 },
        ],
        ball: { x: 254, y: 110 },
        balls: [
          { x: 254, y: 265 },
          { x: 128, y: 105 },
          { x: 128, y: 250 },
        ],
        passes: [],
        movements: [
          { from: { x: 240, y: 110 }, to: { x: 325, y: 95 }, role: 'att', curve: -15 },
          { from: { x: 240, y: 155 }, to: { x: 315, y: 135 }, role: 'def', curve: -10 },
          { from: { x: 240, y: 265 }, to: { x: 325, y: 285 }, role: 'att', curve: 15 },
          { from: { x: 240, y: 310 }, to: { x: 315, y: 305 }, role: 'def', curve: 10 },
        ],
        shadows: [
          { points: '215,90 275,90 275,165 215,165', variant: 'solution' },
          { points: '215,250 275,250 275,325 215,325', variant: 'solution' },
        ],
      },
      {
        players: [
          { id: 'A1', role: 'att', label: 'A1', x: 350, y: 102 },
          { id: 'D1', role: 'def', label: 'D1', x: 310, y: 140 },
          { id: 'A2', role: 'att', label: 'A2', x: 350, y: 292 },
          { id: 'D2', role: 'def', label: 'D2', x: 310, y: 255 },
          { id: 'A3', role: 'att', label: 'A3', x: 165, y: 105 },
          { id: 'D3', role: 'def', label: 'D3', x: 165, y: 150 },
          { id: 'A4', role: 'att', label: 'A4', x: 165, y: 250 },
          { id: 'D4', role: 'def', label: 'D4', x: 165, y: 295 },
        ],
        ball: { x: 365, y: 102 },
        balls: [
          { x: 365, y: 292 },
          { x: 178, y: 105 },
          { x: 178, y: 250 },
        ],
        passes: [
          { from: { x: 368, y: 102 }, to: { x: 436, y: 105 }, primary: true },
          { from: { x: 368, y: 292 }, to: { x: 436, y: 295 }, primary: false },
        ],
        movements: [
          { from: { x: 310, y: 140 }, to: { x: 365, y: 112 }, role: 'def' },
          { from: { x: 310, y: 255 }, to: { x: 365, y: 282 }, role: 'def' },
          { from: { x: 165, y: 105 }, to: { x: 235, y: 105 }, role: 'att' },
          { from: { x: 165, y: 250 }, to: { x: 235, y: 250 }, role: 'att' },
        ],
        shadows: [],
      },
    ],
  },
};
