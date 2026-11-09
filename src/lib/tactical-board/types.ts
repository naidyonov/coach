export interface Point2D {
  x: number;
  y: number;
}

export type PitchTemplate =
  | 'single_square'
  | 'double_zone'
  | 'concentric_square'
  | 'mini_geometry'
  | 'half_pitch'
  | 'full_pitch';

export type TokenRole = 'att' | 'def' | 'neutral' | 'gk' | 'coach';

export interface TacticalZone {
  id: string;
  shape: 'rect' | 'line' | 'polygon';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  points?: string;
  rx?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface TacticalToken {
  id: string;
  role: TokenRole;
  label: string;
  x: number;
  y: number;
  radius?: number;
  /** Optional shoulder/hip orientation bar angle in degrees (for Perfilación / body-shape diagrams) */
  bodyAngle?: number;
  bodyBarColor?: string;
}

export interface TacticalVector {
  id: string;
  type: 'pass' | 'movement';
  from: Point2D;
  to: Point2D;
  fromTokenId?: string;
  toTokenId?: string;
  primary?: boolean;
  role?: TokenRole;
  variant?: 'default' | 'ok' | 'warn' | 'bad';
  dashed?: boolean;
  /** Perpendicular offset in SVG units for curved runs/passes (0 = straight line) */
  curve?: number;
  label?: string;
}

export interface TacticalShadow {
  id: string;
  points: string;
  variant?: 'danger' | 'solution' | 'mistake';
}

export interface TacticalAnnotation {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize?: number;
  textAnchor?: 'start' | 'middle' | 'end';
}

export interface FreehandStroke {
  id: string;
  points: Point2D[];
  color: string;
  width: number;
}

export interface TacticalScene {
  id: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  template: PitchTemplate;
  gridLabel?: string;
  hasCornerTraps?: boolean;
  cones: Point2D[];
  zones?: TacticalZone[];
  tokens: TacticalToken[];
  ball?: Point2D;
  vectors: TacticalVector[];
  shadows: TacticalShadow[];
  annotations?: TacticalAnnotation[];
}

export type TacticalBoardToolMode =
  | 'move'
  | 'draw_pass'
  | 'draw_movement'
  | 'freehand'
  | 'erase';

export interface TacticalBoardSnapshot {
  customPositions: Record<string, Point2D>;
  customBallPos: Point2D | null;
  customVectors: TacticalVector[];
  freehandStrokes: FreehandStroke[];
}
