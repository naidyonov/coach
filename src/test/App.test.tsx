import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import { App } from '../App';

const renderApp = () =>
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );

describe('U15 Rondo Tactical Playbook & Monthly Curriculum App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the default English interface and all 10 rondos in the catalog', () => {
    renderApp();

    expect(
      screen.getByText(/Anatomy of the Rondo: Tactical Playbook & Monthly Curriculum/i)
    ).toBeInTheDocument();

    // Check that all 10 rondo numbers (1.1 to 5.2) are rendered in the catalog selector
    const rondoNumbers = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '5.1', '5.2'];
    for (const num of rondoNumbers) {
      expect(screen.getAllByText(new RegExp(num)).length).toBeGreaterThan(0);
    }

    // Default selected rondo 1.1 should display its details
    expect(
      screen.getAllByText(/3v1 Rondo: Support Angles & Passing Lanes/i).length
    ).toBeGreaterThan(0);
  });

  it('switches language between English (EN), German (DE), and Russian (RU) accurately', () => {
    renderApp();

    const langSwitcher = screen.getByTestId('lang-switcher');
    const deButton = within(langSwitcher).getByRole('button', { name: /german/i });
    const ruButton = within(langSwitcher).getByRole('button', { name: /russian/i });
    const enButton = within(langSwitcher).getByRole('button', { name: /english/i });

    // Switch to German (DE)
    fireEvent.click(deButton);

    expect(
      screen.getByText(/Anatomie des Rondos: Taktik-Playbook & Monatsplan/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/3-gegen-1-Rondo: Anspielwinkel & Passlinien/i).length
    ).toBeGreaterThan(0);

    // Switch to Russian (RU)
    fireEvent.click(ruButton);

    expect(
      screen.getByText(/Анатомия рондо: Тактический плейбук и программа на месяц/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Рондо 3 на 1: Углы и линии паса/i).length
    ).toBeGreaterThan(0);

    // Switch back to English (EN)
    fireEvent.click(enButton);

    expect(
      screen.getByText(/Anatomy of the Rondo: Tactical Playbook & Monthly Curriculum/i)
    ).toBeInTheDocument();
  });

  it('filters by tactical categories and selects different rondos', () => {
    renderApp();

    // Click category "2. Progression"
    const progressionBtn = screen.getByRole('button', { name: /2\. Progression/i });
    fireEvent.click(progressionBtn);

    // Rondo 2.1 should now be active
    expect(
      screen.getAllByText(/7v3 Rondo: Progression Through Pivot \(#6\)/i).length
    ).toBeGreaterThan(0);

    // Click category "5. Transition"
    const transitionBtn = screen.getByRole('button', { name: /5\. Transition/i });
    fireEvent.click(transitionBtn);

    // Rondo 5.2 should be available and selectable
    expect(
      screen.getAllByText(/Escape Pressure Zone/i).length
    ).toBeGreaterThan(0);
  });

  it('navigates across all 4 main tabs and opens the Printable Coach Card modal', () => {
    renderApp();

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });

    // 1. Navigate to Monthly Plan (8 Sess.)
    fireEvent.click(within(mainNav).getByRole('button', { name: /Monthly Plan/i }));
    expect(
      screen.getByText(/Periodization Matrix • 4 Weeks \/ 8 Sessions/i)
    ).toBeInTheDocument();

    // Toggle a session card completion
    const session3Text = screen.getByText(/Week 2 \(Tuesday\)/i);
    fireEvent.click(session3Text);

    // 2. Navigate to U15 Methodology
    fireEvent.click(within(mainNav).getByRole('button', { name: /U15 Methodology/i }));
    expect(
      screen.getByText(/1\. Micro-Principles \("Barcelona School"\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Master Cheat-Sheet: Grid Dimensions/i)
    ).toBeInTheDocument();

    // 3. Navigate to Pitch Timer
    fireEvent.click(within(mainNav).getByRole('button', { name: /Pitch Timer/i }));
    expect(
      screen.getByText(/Rondo Interval Set Timer \(with Coach Whistle\)/i)
    ).toBeInTheDocument();

    // 4. Open Printable Coach Card modal
    fireEvent.click(within(mainNav).getByRole('button', { name: /Pitch Print Card/i }));
    expect(
      screen.getByText(/Training Session Drill Card • U15/i)
    ).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);
  });

  it('opens the Settings dropdown menu, toggles Dark/Light theme, and opens the Training Series hub', () => {
    renderApp();

    // Open Settings dropdown menu
    const settingsBtn = screen.getByTestId('settings-menu-btn');
    fireEvent.click(settingsBtn);

    const themeSwitcher = screen.getByTestId('theme-switcher');
    const lightBtn = within(themeSwitcher).getByRole('button', { name: /Light/i });
    const darkBtn = within(themeSwitcher).getByRole('button', { name: /Dark/i });

    // Switch to Light mode
    fireEvent.click(lightBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Switch back to Dark mode
    fireEvent.click(darkBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Open Training Series Switcher popover to see Series 01: Rondo and upcoming modules
    const seriesBtn = screen.getByTestId('series-switcher-btn');
    fireEvent.click(seriesBtn);
    expect(
      screen.getByText(/Series 02: Positional Play/i)
    ).toBeInTheDocument();
  });

  it('supports Interactive Pitch Board 2.0 controls (Auto-Play, Replay Pass, Speed, and Tokens)', () => {
    renderApp();

    const autoPlayBtn = screen.getByTestId('pitch-autoplay-btn');
    expect(autoPlayBtn).toHaveTextContent(/Auto-Play/i);

    // Toggle Auto-Play on and off
    fireEvent.click(autoPlayBtn);
    expect(autoPlayBtn).toHaveTextContent(/Pause/i);
    fireEvent.click(autoPlayBtn);
    expect(autoPlayBtn).toHaveTextContent(/Auto-Play/i);

    // Trigger Replay Pass
    const replayPassBtn = screen.getByTestId('pitch-replay-pass-btn');
    fireEvent.click(replayPassBtn);

    // Check interactive player & ball tokens are rendered
    expect(screen.getByTestId('pitch-ball-token')).toBeInTheDocument();
    expect(screen.getByTestId('pitch-player-A')).toBeInTheDocument();
  });

  it('supports Quick Pitch-Side Rondo Stepper, Mobile Sub-Tabs, and Drill-Aware Timer Preset', () => {
    renderApp();

    // Quick Rondo Stepper pill selection (jump directly to Rondo 2.1 / rondo-3)
    const quickPillRondo3 = screen.getByTestId('quick-rondo-pill-rondo-3');
    fireEvent.click(quickPillRondo3);

    expect(
      screen.getAllByText(/7v3 Rondo: Progression Through Pivot \(#6\)/i).length
    ).toBeGreaterThan(0);

    // Mobile drill sub-tabs switching
    const mobileSubTabs = screen.getByTestId('mobile-drill-subtabs');
    fireEvent.click(within(mobileSubTabs).getByRole('button', { name: /Cues & Stages/i }));
    fireEvent.click(within(mobileSubTabs).getByRole('button', { name: /Squad/i }));
    fireEvent.click(within(mobileSubTabs).getByRole('button', { name: /Goals & Score/i }));

    // Launch Drill Timer directly from the active rondo card
    const launchTimerBtn = screen.getByTestId('launch-rondo-timer-btn');
    fireEvent.click(launchTimerBtn);

    // Apply Rondo 2.1 dosage preset (4 x 2:30 / 45s)
    const activeRondoPresetBtn = screen.getByTestId('timer-active-rondo-preset-btn');
    fireEvent.click(activeRondoPresetBtn);

    expect(screen.getAllByText('2:30').length).toBeGreaterThan(0);
  });

  it('renders Expanded Methodology Interactive Geometry diagrams and Coach Freeze Interventions', () => {
    renderApp();

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
    fireEvent.click(within(mainNav).getByRole('button', { name: /U15 Methodology/i }));

    // Check Interactive Geometry section & toggle Mistake vs Solution mode
    const geometryToggles = screen.getAllByTestId('geometry-mode-toggle');
    expect(geometryToggles.length).toBe(4);
    fireEvent.click(geometryToggles[0]);

    // Check Coach Freeze Interventions section
    expect(screen.getAllByText(/FREEZE!/i).length).toBeGreaterThanOrEqual(6);
  });

  it('switches age bands (U9–U10 through U17+ / Pro) and renders the Methodological & Scientific Basis tab', () => {
    renderApp();

    // Verify Age Band Selector is rendered in the Catalog view
    const ageSelector = screen.getByTestId('age-band-selector');
    expect(ageSelector).toBeInTheDocument();

    // Switch to U9–U10 (Foundation Stage)
    const u10Pill = screen.getByTestId('age-pill-u10');
    fireEvent.click(u10Pill);
    expect(
      screen.getAllByText(/Foundation Stage \(Funino \/ Game Discovery\)/i).length
    ).toBeGreaterThan(0);

    // Switch to U17+ / Pro (High Performance)
    const proPill = screen.getByTestId('age-pill-u18_pro');
    fireEvent.click(proPill);
    expect(
      screen.getAllByText(/High Performance & Adult Football/i).length
    ).toBeGreaterThan(0);

    // Open the "Basis & Science" tab inside the Coaching Brief
    const basisTabBtn = screen.getByTestId('scientific-basis-tab-btn');
    fireEvent.click(basisTabBtn);

    const basisPanel = screen.getByTestId('scientific-basis-panel');
    expect(basisPanel).toBeInTheDocument();
    expect(
      within(basisPanel).getByText(/FC Barcelona \(La Masia\)/i)
    ).toBeInTheDocument();
  });
});



