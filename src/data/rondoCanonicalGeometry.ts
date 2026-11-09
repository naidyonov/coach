import { Point2D, RondoDiagram, RondoItem } from '../i18n/types';
import { RONDOS_EN } from '../i18n/en';

export interface CanonicalPhaseGeometry {
  players: Array<{
    id: string;
    role: 'att' | 'def' | 'neutral';
    x: number;
    y: number;
  }>;
  ball?: Point2D;
  passes: Array<{
    from: Point2D;
    to: Point2D;
    primary: boolean;
  }>;
  movements: Array<{
    from: Point2D;
    to: Point2D;
    role: 'att' | 'def' | 'neutral';
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
  phases: rondo.diagram.phases.map((ph) => ({
    players: ph.players.map((p) => ({
      id: p.id,
      role: p.role,
      x: p.x,
      y: p.y,
    })),
    ball: ph.ball ? { x: ph.ball.x, y: ph.ball.y } : undefined,
    passes: ph.passes.map((ps) => ({
      from: { x: ps.from.x, y: ps.from.y },
      to: { x: ps.to.x, y: ps.to.y },
      primary: ps.primary,
    })),
    movements: ph.movements.map((mv) => ({
      from: { x: mv.from.x, y: mv.from.y },
      to: { x: mv.to.x, y: mv.to.y },
      role: mv.role,
    })),
    shadows: ph.shadows.map((sh) => ({ points: sh.points })),
  })),
});

export const RONDO_CANONICAL_GEOMETRY: Record<string, CanonicalRondoGeometry> =
  Object.fromEntries(
    RONDOS_EN.map((r) => [r.id, extractCanonicalGeometry(r)])
  );
