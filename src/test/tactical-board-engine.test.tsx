import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import {
  buildCurvedPathD,
  clampPointToBounds,
  clientToSvgPoint,
  deriveGridZonesFromCones,
  detectHorizontalSwipe,
  interpolatePointCubicOut,
  pointsToSvgPathD,
  resolveVectorEndpoints,
  rondoPhaseToTacticalScene,
  TacticalBoardToolMode,
  TacticalCanvas,
  TacticalScene,
  useTacticalBoard,
} from '../lib/tactical-board';
import { RONDOS_EN } from '../i18n/en';

beforeAll(() => {
  if (!window.PointerEvent) {
    (window as unknown as { PointerEvent: typeof MouseEvent }).PointerEvent = MouseEvent;
  }
});

describe('Tactical Board Engine — Pure Geometry & Math', () => {
  it('clamps points to pitch bounds and rounds coordinates', () => {
    expect(clampPointToBounds({ x: -15.4, y: 512.8 })).toEqual({
      x: 20,
      y: 380,
    });
    expect(clampPointToBounds({ x: 250.4, y: 199.6 })).toEqual({
      x: 250,
      y: 200,
    });
  });

  it('converts client pointer coordinates to SVG coordinates and handles zero-rect safely', () => {
    expect(
      clientToSvgPoint(100, 100, { left: 0, top: 0, width: 0, height: 200 })
    ).toBeNull();

    const pt = clientToSvgPoint(250, 200, {
      left: 0,
      top: 0,
      width: 500,
      height: 400,
    });
    expect(pt).toEqual({ x: 250, y: 200 });
  });

  it('interpolates ball trajectory with cubic ease-out', () => {
    const from = { x: 100, y: 100 };
    const to = { x: 300, y: 200 };
    expect(interpolatePointCubicOut(from, to, 0)).toEqual(from);
    expect(interpolatePointCubicOut(from, to, 1)).toEqual(to);
    const mid = interpolatePointCubicOut(from, to, 0.5);
    expect(mid.x).toBeGreaterThan(200);
    expect(mid.y).toBeGreaterThan(150);
  });

  it('resolves vector endpoints dynamically when tokens are moved', () => {
    const tokens = [
      { id: 'A', role: 'att' as const, label: 'A', x: 100, y: 100 },
      { id: 'B', role: 'att' as const, label: 'B', x: 300, y: 200 },
    ];
    const customPositions = {
      A: { x: 140, y: 120 },
      B: { x: 350, y: 250 },
    };

    // Proximity matching
    const resolvedProximity = resolveVectorEndpoints(
      {
        id: 'p1',
        type: 'pass',
        from: { x: 105, y: 105 },
        to: { x: 295, y: 195 },
      },
      tokens,
      customPositions
    );
    expect(resolvedProximity).toEqual({
      from: { x: 140, y: 120 },
      to: { x: 350, y: 250 },
    });

    // Explicit tokenId matching
    const resolvedExplicit = resolveVectorEndpoints(
      {
        id: 'p2',
        type: 'pass',
        from: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        fromTokenId: 'A',
        toTokenId: 'B',
      },
      tokens,
      customPositions
    );
    expect(resolvedExplicit).toEqual({
      from: { x: 140, y: 120 },
      to: { x: 350, y: 250 },
    });
  });

  it('builds straight and curved SVG path strings and converts freehand points', () => {
    const straight = buildCurvedPathD({ x: 100, y: 100 }, { x: 200, y: 100 }, 0);
    expect(straight.d).toBe('M 100 100 L 200 100');
    expect(straight.midPoint).toEqual({ x: 150, y: 100 });

    const curved = buildCurvedPathD({ x: 100, y: 100 }, { x: 200, y: 100 }, 30);
    expect(curved.d).toContain('Q 150 130 200 100');

    expect(pointsToSvgPathD([])).toBe('');
    expect(pointsToSvgPathD([{ x: 10, y: 20 }])).toBe('M 10 20 L 10 20');
    expect(
      pointsToSvgPathD([
        { x: 10, y: 20 },
        { x: 30, y: 40 },
        { x: 50, y: 60 },
      ])
    ).toBe('M 10 20 L 30 40 L 50 60');
  });

  it('detects horizontal swipes and rejects vertical or short movements', () => {
    expect(detectHorizontalSwipe(200, 100, 120, 105)).toBe('next');
    expect(detectHorizontalSwipe(120, 100, 200, 105)).toBe('prev');
    expect(detectHorizontalSwipe(200, 100, 180, 105)).toBeNull();
    expect(detectHorizontalSwipe(200, 100, 120, 200)).toBeNull();
  });

  it('derives grid markings for single_square, corner traps, double_zone, and concentric_square', () => {
    const squareCones = RONDOS_EN[0].diagram.cones;
    const singleZones = deriveGridZonesFromCones('single_square', squareCones, false);
    expect(singleZones).toHaveLength(1);

    const trapZones = deriveGridZonesFromCones('single_square', squareCones, true);
    expect(trapZones).toHaveLength(5);

    const doubleCones = RONDOS_EN[4].diagram.cones;
    const doubleZones = deriveGridZonesFromCones('double_zone', doubleCones);
    expect(doubleZones).toHaveLength(2);
    expect(doubleZones[1].shape).toBe('line');

    const concentricCones = RONDOS_EN[7].diagram.cones;
    const concentricZones = deriveGridZonesFromCones(
      'concentric_square',
      concentricCones
    );
    expect(concentricZones).toHaveLength(2);

    expect(deriveGridZonesFromCones('full_pitch', [])).toEqual([]);
  });

  it('deconflicts overlapping vector labels and nudges away from token obstacles', async () => {
    const { deconflictVectorLabelPositions } = await import(
      '../lib/tactical-board/geometry'
    );
    const res = deconflictVectorLabelPositions(
      [
        { id: 'mv-1', x: 250, y: 200, width: 70, height: 16 },
        { id: 'pass-1', x: 250, y: 202, width: 75, height: 17 },
      ],
      [{ x: 250, y: 200 }]
    );
    expect(Math.abs(res['mv-1'].y - res['pass-1'].y)).toBeGreaterThanOrEqual(16);
  });
});

describe('Tactical Board Engine — Controller Hook & Canvas Manual Drawing Modes', () => {
  const Harness: React.FC<{ initialTool?: TacticalBoardToolMode }> = ({
    initialTool = 'move',
  }) => {
    const { scene, safePhaseIndex, totalPhases } = rondoPhaseToTacticalScene(
      RONDOS_EN[0],
      0
    );
    const enrichedScene: TacticalScene = {
      ...scene,
      zones: [
        {
          id: 'custom-poly-zone',
          shape: 'polygon',
          points: '50,50 100,50 75,90',
          fill: 'rgba(255,255,255,0.1)',
        },
      ],
      tokens: scene.tokens.map((t, i) =>
        i === 0 ? { ...t, bodyAngle: -35, bodyBarColor: '#10b981' } : t
      ),
      vectors: [
        ...scene.vectors,
        {
          id: 'curved-move',
          type: 'movement',
          from: { x: 120, y: 120 },
          to: { x: 220, y: 180 },
          role: 'neutral',
          curve: 25,
          label: 'Arc run',
        },
        {
          id: 'curved-pass',
          type: 'pass',
          from: { x: 150, y: 150 },
          to: { x: 280, y: 220 },
          primary: false,
          curve: -20,
          label: 'Chip',
        },
      ],
      shadows: [
        ...scene.shadows,
        {
          id: 'sol-shadow',
          points: '100,100 150,100 125,140',
          variant: 'solution',
        },
      ],
      annotations: [
        {
          id: 'note-1',
          x: 250,
          y: 30,
          text: 'Coach Note',
          color: '#34d399',
        },
      ],
    };

    const board = useTacticalBoard({
      scene: enrichedScene,
      drillKey: 'rondo-1',
      phaseIndex: safePhaseIndex,
      totalPhases,
      initialToolMode: initialTool,
    });

    return (
      <div>
        <div data-testid="tool-mode">{board.toolMode}</div>
        <div data-testid="can-undo">{String(board.canUndo)}</div>
        <div data-testid="can-redo">{String(board.canRedo)}</div>
        <div data-testid="custom-vectors-count">{board.customVectors.length}</div>
        <div data-testid="strokes-count">{board.freehandStrokes.length}</div>
        <button
          type="button"
          data-testid="set-draw-pass"
          onClick={() => board.setToolMode('draw_pass')}
        >
          Draw Pass
        </button>
        <button
          type="button"
          data-testid="set-freehand"
          onClick={() => board.setToolMode('freehand')}
        >
          Freehand
        </button>
        <button
          type="button"
          data-testid="set-erase"
          onClick={() => board.setToolMode('erase')}
        >
          Erase
        </button>
        <button type="button" data-testid="btn-undo" onClick={board.undo}>
          Undo
        </button>
        <button type="button" data-testid="btn-redo" onClick={board.redo}>
          Redo
        </button>
        <TacticalCanvas
          scene={enrichedScene}
          ariaLabel="Test Tactical Board"
          customPositions={board.customPositions}
          ballCoords={board.ballCoords}
          draggingTokenId={board.draggingTokenId}
          isPassAnimating={board.isPassAnimating}
          customVectors={board.customVectors}
          draftVector={board.draftVector}
          freehandStrokes={board.freehandStrokes}
          draftStroke={board.draftStroke}
          onTokenPointerDown={board.handleTokenPointerDown}
          onSvgPointerDown={board.handleSvgPointerDown}
          onSvgPointerMove={board.handleSvgPointerMove}
          onSvgPointerUp={board.handleSvgPointerUp}
        />
      </div>
    );
  };

  it('supports drawing custom pass vectors, freehand strokes, erasing, and undo/redo history', () => {
    render(<Harness initialTool="draw_pass" />);

    const svg = screen.getByRole('img', { name: /Test Tactical Board/i });
    vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 500,
      height: 400,
      right: 500,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    // Draw a custom pass vector
    fireEvent.pointerDown(svg, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(svg, { clientX: 220, clientY: 180 });
    fireEvent.pointerUp(svg);

    expect(screen.getByTestId('custom-vectors-count')).toHaveTextContent('1');
    expect(screen.getByTestId('can-undo')).toHaveTextContent('true');

    // Switch to freehand and draw a stroke
    fireEvent.click(screen.getByTestId('set-freehand'));
    fireEvent.pointerDown(svg, { clientX: 50, clientY: 50 });
    fireEvent.pointerMove(svg, { clientX: 80, clientY: 70 });
    fireEvent.pointerMove(svg, { clientX: 110, clientY: 90 });
    fireEvent.pointerUp(svg);

    expect(screen.getByTestId('strokes-count')).toHaveTextContent('1');

    // Undo freehand stroke, then redo it
    fireEvent.click(screen.getByTestId('btn-undo'));
    expect(screen.getByTestId('strokes-count')).toHaveTextContent('0');
    expect(screen.getByTestId('can-redo')).toHaveTextContent('true');

    fireEvent.click(screen.getByTestId('btn-redo'));
    expect(screen.getByTestId('strokes-count')).toHaveTextContent('1');

    // Erase mode removes last stroke and custom vector
    fireEvent.click(screen.getByTestId('set-erase'));
    fireEvent.pointerDown(svg, { clientX: 100, clientY: 100 });
    expect(screen.getByTestId('strokes-count')).toHaveTextContent('0');
    expect(screen.getByTestId('custom-vectors-count')).toHaveTextContent('0');
  });
});
