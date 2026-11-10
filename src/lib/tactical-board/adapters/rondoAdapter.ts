import { RondoItem } from '../../../i18n/types';
import { TacticalScene, TacticalVector } from '../types';

export const rondoPhaseToTacticalScene = (
  rondo: RondoItem,
  phaseIndex: number
): {
  scene: TacticalScene;
  phaseTitle: string;
  phaseDesc: string;
  safePhaseIndex: number;
  totalPhases: number;
} => {
  const phases = rondo.diagram.phases;
  const safePhaseIndex = Math.max(
    0,
    Math.min(phaseIndex, Math.max(0, phases.length - 1))
  );
  const phase = phases[safePhaseIndex] || phases[0];

  const vectors: TacticalVector[] = [
    ...phase.movements.map((mv, idx) => ({
      id: `mv-${idx}`,
      type: 'movement' as const,
      from: mv.from,
      to: mv.to,
      role: mv.role,
      label: mv.label,
      curve: mv.curve,
    })),
    ...phase.passes.map((pass, idx) => ({
      id: `pass-${idx}`,
      type: 'pass' as const,
      from: pass.from,
      to: pass.to,
      primary: pass.primary,
      label: pass.label,
      curve: pass.curve,
    })),
  ];

  const scene: TacticalScene = {
    id: `${rondo.id}-phase-${safePhaseIndex}`,
    viewBoxWidth: 500,
    viewBoxHeight: 400,
    template: rondo.diagram.type,
    gridLabel: rondo.diagram.gridLabel,
    hasCornerTraps: rondo.id === 'rondo-7',
    cones: rondo.diagram.cones,
    goals: rondo.diagram.goals?.map((g, idx) => ({
      id: g.id || `goal-${idx}`,
      x: g.x,
      y: g.y,
      size: g.size,
      facing: g.facing,
      label: g.label,
    })),
    gates: rondo.diagram.gates?.map((gt, idx) => ({
      id: gt.id || `gate-${idx}`,
      p1: gt.p1,
      p2: gt.p2,
      color: gt.color,
      label: gt.label,
    })),
    tokens: phase.players.map((p) => ({
      id: p.id,
      role: p.role,
      label: p.label,
      x: p.x,
      y: p.y,
    })),
    ball: phase.ball,
    balls: phase.balls,
    vectors,
    shadows: phase.shadows.map((s, idx) => ({
      id: `shadow-${idx}`,
      points: s.points,
      variant: s.variant || 'danger',
    })),
  };

  return {
    scene,
    phaseTitle: phase.title,
    phaseDesc: phase.desc,
    safePhaseIndex,
    totalPhases: phases.length,
  };
};
