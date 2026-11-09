import React, { useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import { TacticalPitchSVG } from '../components/TacticalPitchSVG';
import { RONDOS_EN } from '../i18n/en';

beforeAll(() => {
  if (!window.PointerEvent) {
    (window as unknown as { PointerEvent: typeof MouseEvent }).PointerEvent = MouseEvent;
  }
});

const StatefulBoardWrapper: React.FC<{ initialRondoIdx?: number }> = ({
  initialRondoIdx = 0,
}) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const rondo = RONDOS_EN[initialRondoIdx];
  return (
    <LanguageProvider>
      <div data-testid="current-phase-idx">{phaseIdx}</div>
      <TacticalPitchSVG
        rondo={rondo}
        phaseIndex={phaseIdx}
        onPhaseChange={setPhaseIdx}
        showPasses={true}
        showMovements={true}
        showShadows={true}
      />
    </LanguageProvider>
  );
};

describe('TacticalPitchSVG — Interactive Whiteboard, Fullscreen, Gestures & Animation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('drags player and ball tokens and resets custom positions', () => {
    render(<StatefulBoardWrapper />);

    const svg = screen.getByRole('img');
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

    const playerA = screen.getByTestId('pitch-player-A');
    const ball = screen.getByTestId('pitch-ball-token');

    // Drag player A
    fireEvent.pointerDown(playerA);
    fireEvent.pointerMove(svg, { clientX: 300, clientY: 220 });
    fireEvent.pointerUp(svg);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Reset button should now be visible
    const resetBtn = screen.getByTestId('pitch-reset-positions-btn');
    expect(resetBtn).toBeInTheDocument();

    // Drag ball token
    fireEvent.pointerDown(ball);
    fireEvent.pointerMove(svg, { clientX: 260, clientY: 180 });
    fireEvent.pointerUp(svg);

    // Click Reset Positions
    fireEvent.click(resetBtn);
    expect(
      screen.queryByTestId('pitch-reset-positions-btn')
    ).not.toBeInTheDocument();
  });

  it('navigates phases via horizontal touch swipe gestures', () => {
    const { container } = render(<StatefulBoardWrapper />);
    const canvasWrapper = container.querySelector('.tactical-pitch-canvas')!;

    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('0');

    // Swipe left -> next phase (0 -> 1)
    fireEvent.touchStart(canvasWrapper, {
      touches: [{ clientX: 300, clientY: 200 }],
    });
    fireEvent.touchEnd(canvasWrapper, {
      changedTouches: [{ clientX: 180, clientY: 205 }],
    });
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('1');

    // Swipe right -> prev phase (1 -> 0)
    fireEvent.touchStart(canvasWrapper, {
      touches: [{ clientX: 150, clientY: 200 }],
    });
    fireEvent.touchEnd(canvasWrapper, {
      changedTouches: [{ clientX: 280, clientY: 205 }],
    });
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('0');
  });

  it('opens fullscreen modal and handles keyboard shortcuts (ArrowRight, ArrowLeft, Space, Escape) and controls', () => {
    render(<StatefulBoardWrapper />);

    // Enter fullscreen
    const fullscreenBtns = screen.getAllByTitle(/Fullscreen Board/i);
    fireEvent.click(fullscreenBtns[0]);

    expect(screen.getByTestId('pitch-autoplay-btn-modal')).toBeInTheDocument();

    // ArrowRight advances phase
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('1');

    // ArrowLeft goes back
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('0');

    // Space toggles auto-play in fullscreen
    fireEvent.keyDown(window, { key: ' ' });
    expect(screen.getByTestId('pitch-autoplay-btn-modal')).toHaveTextContent(
      /Pause/i
    );
    fireEvent.keyDown(window, { key: ' ' });

    // Click phase button & next/prev phase buttons inside fullscreen modal
    const nextPhaseBtns = screen.getAllByLabelText(/Next Phase/i);
    fireEvent.click(nextPhaseBtns[nextPhaseBtns.length - 1]);
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('1');

    const prevPhaseBtns = screen.getAllByLabelText(/Prev Phase/i);
    fireEvent.click(prevPhaseBtns[prevPhaseBtns.length - 1]);
    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('0');

    // Escape closes fullscreen modal
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(
      screen.queryByTestId('pitch-autoplay-btn-modal')
    ).not.toBeInTheDocument();
  });

  it('changes playback speed and runs pass trajectory animation through completion', () => {
    render(<StatefulBoardWrapper />);

    // Switch speed to 1.5x (settle 213ms + duration 600ms + hold 387ms = 1200ms per phase)
    fireEvent.click(screen.getByRole('button', { name: '1.5x' }));

    // Trigger Auto-Play and step timers 1300ms to advance from Phase 0 -> Phase 1
    fireEvent.click(screen.getByTestId('pitch-autoplay-btn'));

    for (let i = 0; i < 13; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
      });
    }

    expect(screen.getByTestId('current-phase-idx')).toHaveTextContent('1');

    // Pause Auto-Play and trigger single Replay Pass through completion
    fireEvent.click(screen.getByTestId('pitch-autoplay-btn'));
    fireEvent.click(screen.getByTestId('pitch-replay-pass-btn'));
    for (let i = 0; i < 13; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
      });
    }
  });

  it('renders corner pressing trap zones for rondo-7 (4.1)', () => {
    render(<StatefulBoardWrapper initialRondoIdx={6} />);
    expect(screen.getByTestId('pitch-zone-corner-trap-tl')).toBeInTheDocument();
    expect(screen.getByTestId('pitch-zone-corner-trap-br')).toBeInTheDocument();
  });
});
