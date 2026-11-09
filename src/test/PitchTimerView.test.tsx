import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import { PitchTimerView } from '../components/PitchTimerView';
import { RONDOS_EN } from '../i18n/en';
import { getRondoTimerPreset } from '../domain/timerDosage';

describe('PitchTimerView — Interval Countdown State Machine, Presets & Whistle Audio', () => {
  const mockStart = vi.fn();
  const mockStop = vi.fn();
  const mockSetValueAtTime = vi.fn();
  const mockExponentialRamp = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    mockStart.mockClear();
    mockStop.mockClear();
    mockSetValueAtTime.mockClear();
    mockExponentialRamp.mockClear();

    class MockAudioContext {
      currentTime = 0;
      destination = {};
      createOscillator() {
        return {
          connect: vi.fn(),
          frequency: { setValueAtTime: mockSetValueAtTime },
          start: mockStart,
          stop: mockStop,
        };
      }
      createGain() {
        return {
          connect: vi.fn(),
          gain: {
            setValueAtTime: vi.fn(),
            exponentialRampToValueAtTime: mockExponentialRamp,
          },
        };
      }
    }

    Object.defineProperty(window, 'AudioContext', {
      writable: true,
      configurable: true,
      value: MockAudioContext,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct presets for all 10 rondos and unknown fallback', () => {
    for (const rondo of RONDOS_EN) {
      const preset = getRondoTimerPreset(rondo);
      expect(preset.work).toBeGreaterThanOrEqual(90);
      expect(preset.rest).toBeGreaterThanOrEqual(30);
      expect(preset.sets).toBeGreaterThanOrEqual(3);
    }
    expect(getRondoTimerPreset('unknown-rondo')).toEqual({
      work: 120,
      rest: 40,
      sets: 4,
    });
  });

  it('adjusts work, rest, and sets with boundary clamping and applies standard presets', () => {
    render(
      <LanguageProvider>
        <PitchTimerView selectedRondo={RONDOS_EN[0]} />
      </LanguageProvider>
    );

    // Apply standard presets
    fireEvent.click(screen.getByText(/3v1 \/ 5v2/i));
    expect(screen.getAllByText('1:30').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText(/7v3 \/ Bartolini/i));
    expect(screen.getAllByText('2:30').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText(/Positional 4v4\+3/i));
    expect(screen.getAllByText('4:00').length).toBeGreaterThan(0);

    // Adjust work +/- 15s
    const decWorkBtn = screen.getByLabelText('Decrease work time');
    const incWorkBtn = screen.getByLabelText('Increase work time');
    fireEvent.click(decWorkBtn);
    expect(screen.getAllByText('3:45').length).toBeGreaterThan(0);
    fireEvent.click(incWorkBtn);
    expect(screen.getAllByText('4:00').length).toBeGreaterThan(0);

    // Adjust rest +/- 5s
    const decRestBtn = screen.getByLabelText('Decrease rest time');
    const incRestBtn = screen.getByLabelText('Increase rest time');
    fireEvent.click(decRestBtn);
    expect(screen.getByText('55s')).toBeInTheDocument();
    fireEvent.click(incRestBtn);
    expect(screen.getByText('60s')).toBeInTheDocument();

    // Adjust sets +/- 1
    const decSetsBtn = screen.getByLabelText('Decrease sets');
    const incSetsBtn = screen.getByLabelText('Increase sets');
    fireEvent.click(incSetsBtn);
    expect(screen.getByText('4')).toBeInTheDocument();
    fireEvent.click(decSetsBtn);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('runs full Work -> Rest -> Next Set -> Completion cycle with whistle synthesis and reset', () => {
    render(
      <LanguageProvider>
        <PitchTimerView selectedRondo={RONDOS_EN[0]} />
      </LanguageProvider>
    );

    // Reduce work to minimum (15s), rest to minimum (10s), sets to 2 for fast full-cycle test
    const decWorkBtn = screen.getByLabelText('Decrease work time');
    const decRestBtn = screen.getByLabelText('Decrease rest time');
    const decSetsBtn = screen.getByLabelText('Decrease sets');

    for (let i = 0; i < 10; i++) {
      fireEvent.click(decWorkBtn);
      fireEvent.click(decRestBtn);
    }
    fireEvent.click(decSetsBtn);
    fireEvent.click(decSetsBtn);

    // Start Set 1 (15s work, 10s rest, 2 sets)
    const startBtn = screen.getByRole('button', { name: /Start Set/i });
    fireEvent.click(startBtn);
    expect(mockSetValueAtTime).toHaveBeenCalledWith(2800, 0);

    // Advance 15 seconds to transition from Set 1 Work -> Set 1 Rest
    for (let i = 0; i < 15; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    expect(
      screen.getByText(/REST \/ ROTATE & COACHING CUE/i)
    ).toBeInTheDocument();
    expect(mockSetValueAtTime).toHaveBeenCalledWith(2400, 0);

    // Pause during rest phase and adjust rest time while in rest phase
    const pauseBtn = screen.getByRole('button', { name: /Pause/i });
    fireEvent.click(pauseBtn);
    fireEvent.click(decRestBtn);
    // Resume
    fireEvent.click(screen.getByRole('button', { name: /Start Set/i }));

    // Advance 10 seconds to transition from Set 1 Rest -> Set 2 Work
    for (let i = 0; i < 10; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    expect(screen.getByText(/Set 2 of 2/i)).toBeInTheDocument();

    // Decrease sets while on Set 2 -> clamps currentSet to 1
    fireEvent.click(decSetsBtn);
    expect(screen.getByText(/Set 1 of 1/i)).toBeInTheDocument();

    // Advance through Work and Rest of final set until timer finishes at 0:00
    for (let i = 0; i < 26; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    expect(screen.getByText('0:00')).toBeInTheDocument();

    // Toggle whistle mute and click Reset
    fireEvent.click(screen.getByRole('button', { name: /Whistle ON/i }));
    expect(screen.getByRole('button', { name: /Muted/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(screen.getAllByText('0:15').length).toBeGreaterThan(0);
  });
});
