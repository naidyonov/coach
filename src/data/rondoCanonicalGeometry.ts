import { Point2D, RondoDiagram, RondoGate, RondoGoal, RondoItem } from '../i18n/types';
import { RONDOS_EN } from '../i18n/en';

export interface CanonicalPhaseGeometry {
  players: Array<{
    id: string;
    role: 'att' | 'def' | 'neutral';
    x: number;
    y: number;
  }>;
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
  shadows: Array<{
    points: string;
  }>;
}

export interface CanonicalRondoGeometry {
  id: string;
  number: string;
  category: RondoItem['category'];
  diagramType: RondoDiagram['type'];
  cones: Point2D[];
  goals?: RondoGoal[];
  gates?: RondoGate[];
  phases: CanonicalPhaseGeometry[];
}

export const extractCanonicalGeometry = (
  rondo: RondoItem
): CanonicalRondoGeometry => ({
  id: rondo.id,
  number: rondo.number,
  category: rondo.category,
  diagramType: rondo.diagram.type,
  cones: rondo.diagram.cones.map((c) => ({ x: c.x, y: c.y })),
  ...(rondo.diagram.goals
    ? {
        goals: rondo.diagram.goals.map((g) => ({
          ...(g.id ? { id: g.id } : {}),
          x: g.x,
          y: g.y,
          size: g.size,
          facing: g.facing,
          ...(g.label ? { label: g.label } : {}),
        })),
      }
    : {}),
  ...(rondo.diagram.gates
    ? {
        gates: rondo.diagram.gates.map((gt) => ({
          ...(gt.id ? { id: gt.id } : {}),
          p1: { x: gt.p1.x, y: gt.p1.y },
          p2: { x: gt.p2.x, y: gt.p2.y },
          ...(gt.color ? { color: gt.color } : {}),
          ...(gt.label ? { label: gt.label } : {}),
        })),
      }
    : {}),
  phases: rondo.diagram.phases.map((ph) => ({
    players: ph.players.map((p) => ({
      id: p.id,
      role: p.role,
      x: p.x,
      y: p.y,
    })),
    ball: ph.ball ? { x: ph.ball.x, y: ph.ball.y } : undefined,
    ...(ph.balls
      ? { balls: ph.balls.map((b) => ({ x: b.x, y: b.y })) }
      : {}),
    passes: ph.passes.map((ps) => ({
      from: { x: ps.from.x, y: ps.from.y },
      to: { x: ps.to.x, y: ps.to.y },
      primary: ps.primary,
      ...(ps.curve !== undefined ? { curve: ps.curve } : {}),
    })),
    movements: ph.movements.map((mv) => ({
      from: { x: mv.from.x, y: mv.from.y },
      to: { x: mv.to.x, y: mv.to.y },
      role: mv.role,
      ...(mv.curve !== undefined ? { curve: mv.curve } : {}),
    })),
    shadows: ph.shadows.map((sh) => ({ points: sh.points })),
  })),
});

export const RONDO_CANONICAL_GEOMETRY: Record<string, CanonicalRondoGeometry> =
  Object.fromEntries(
    RONDOS_EN.map((r) => [r.id, extractCanonicalGeometry(r)])
  );
