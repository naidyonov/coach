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

    // Click category "Progression"
    const progressionBtn = screen.getByRole('button', { name: /^Progression$/i });
    fireEvent.click(progressionBtn);

    // Rondo 2.1 should now be active
    expect(
      screen.getAllByText(/7v3 Rondo: Progression Through Pivot \(#6\)/i).length
    ).toBeGreaterThan(0);

    // Click category "Transition"
    const transitionBtn = screen.getByRole('button', { name: /^Transition$/i });
    fireEvent.click(transitionBtn);

    // Rondo 5.1 should be active
    expect(
      screen.getAllByText(/Escape Pressure Zone/i).length
    ).toBeGreaterThan(0);
  });

  it('navigates across all 4 main tabs and opens the Printable Coach Card modal', () => {
    renderApp();

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });

    // 1. Navigate to Monthly Plan
    fireEvent.click(within(mainNav).getByRole('button', { name: /Monthly Plan/i }));
    expect(
      screen.getByText(/4 Weeks • 8 Sessions/i)
    ).toBeInTheDocument();

    // Toggle a session card completion
    const session3Text = screen.getByText(/Week 2 \(Tuesday\)/i);
    fireEvent.click(session3Text);

    // 2. Navigate to Methodology
    fireEvent.click(within(mainNav).getByRole('button', { name: /Methodology/i }));
    expect(
      screen.getByText(/1\. Micro-Principles \("Barcelona School"\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Master Cheat-Sheet: Grid Dimensions/i)
    ).toBeInTheDocument();

    // 3. Navigate to Timer
    fireEvent.click(within(mainNav).getByRole('button', { name: /Timer/i }));
    expect(
      screen.getByText(/Rondo Interval Set Timer \(with Coach Whistle\)/i)
    ).toBeInTheDocument();

    // 4. Open Printable Coach Card modal
    fireEvent.click(within(mainNav).getByRole('button', { name: /Print Card/i }));
    expect(
      screen.getByText(/Training Session Drill Card/i)
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

    // Open Training Series Switcher popover to see Rondo and upcoming modules
    const seriesBtn = screen.getByTestId('series-switcher-btn');
    fireEvent.click(seriesBtn);
    expect(
      screen.getAllByText(/Positional Play/i).length
    ).toBeGreaterThan(0);
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
    fireEvent.click(within(mainNav).getByRole('button', { name: /Methodology/i }));

    // Check Interactive Geometry section & toggle Mistake vs Solution mode
    const geometryToggles = screen.getAllByTestId('geometry-mode-toggle');
    expect(geometryToggles.length).toBe(4);
    fireEvent.click(geometryToggles[0]);

    // Check Coach Freeze Interventions section
    expect(screen.getAllByText(/FREEZE!/i).length).toBeGreaterThanOrEqual(6);
  });

  it('switches age bands (U9-10 through U17+) in the Settings dropdown and renders the Methodological & Scientific Basis tab', () => {
    renderApp();

    // Verify Age Band Selector is rendered inside Settings dropdown
    const settingsAgeSwitcher = screen.getByTestId('settings-age-switcher');
    expect(settingsAgeSwitcher).toBeInTheDocument();

    // Switch to U9-10 (Foundation Stage)
    const u10Pill = screen.getByTestId('age-pill-u10');
    expect(u10Pill).toHaveTextContent('U9-10');
    fireEvent.click(u10Pill);
    expect(
      screen.getAllByText(/Foundation Stage \(Funino \/ Game Discovery\)/i).length
    ).toBeGreaterThan(0);

    // Switch to U17+ (High Performance)
    const proPill = screen.getByTestId('age-pill-u18_pro');
    expect(proPill).toHaveTextContent('U17+');
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

  it('switches to the Activation module via Series Switcher or 4-Block Session Bar, renders 6-Rubric Showcase & 3-Phase Progression Ladder, and hides Monthly Plan in Activation', () => {
    renderApp();

    // 1. Verify 4-Block Training Session Flow Bar is rendered in header
    const blocksBar = screen.getByTestId('training-blocks-bar');
    expect(blocksBar).toBeInTheDocument();
    const actBlockPill = screen.getByTestId('block-pill-activation-series');
    const rondoBlockPill = screen.getByTestId('block-pill-rondo-series');
    expect(actBlockPill).toHaveTextContent(/1\. Activation/i);
    expect(rondoBlockPill).toHaveTextContent(/2\. Rondo/i);

    // Click Block 1: Activation directly from the 4-Block Training Session Bar
    fireEvent.click(actBlockPill);

    const seriesBtn = screen.getByTestId('series-switcher-btn');
    expect(seriesBtn).toHaveTextContent(/Activation/i);
    expect(
      screen.getAllByText(/Coerver & Funino 4-Minigoal Arena: Ball Control, Color Gates & 1v1 Breakouts/i).length
    ).toBeGreaterThan(0);

    // 2. Verify Monthly Plan tab is NOT present in Activation mode (only 3 clean tabs)
    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(mainNav).queryByRole('button', { name: /Monthly Plan/i })).not.toBeInTheDocument();

    // 3. Verify 3-Phase Progression Ladder is displayed front-and-center in the Activation card
    const progressionLadder = screen.getByTestId('activation-progression-ladder');
    expect(progressionLadder).toBeInTheDocument();
    expect(within(progressionLadder).getAllByText(/Phase 1/i).length).toBeGreaterThan(0);
    expect(within(progressionLadder).getAllByText(/Phase 2/i).length).toBeGreaterThan(0);
    expect(within(progressionLadder).getAllByText(/Phase 3/i).length).toBeGreaterThan(0);

    // 4. Verify 6-Rubric Showcase Grid and selecting an exercise card
    const rubricShowcase = screen.getByTestId('activation-rubric-showcase');
    expect(rubricShowcase).toBeInTheDocument();
    expect(rubricShowcase.textContent).not.toMatch(/1\.\s*1\./);
    const rubricCardAct11 = screen.getByTestId('rubric-card-act-11');
    fireEvent.click(rubricCardAct11);
    expect(
      screen.getAllByText(/Breakout from 3 Dribble Zones & 4v4 on 4 Mini-Goals \(SFV\)/i).length
    ).toBeGreaterThan(0);

    // Toggle collapse/expand of the Rubric Showcase Grid
    const toggleShowcaseBtn = screen.getByTestId('toggle-rubric-showcase-btn');
    fireEvent.click(toggleShowcaseBtn);
    expect(screen.queryByTestId('activation-rubric-showcase')).not.toBeInTheDocument();
    fireEvent.click(toggleShowcaseBtn);
    expect(screen.getByTestId('activation-rubric-showcase')).toBeInTheDocument();

    // 5. Filter by independent SFV Activation categories
    const firstTouchCategoryBtn = screen.getByRole('button', {
      name: /2\. First Touch & Directional Reception/i,
    });
    fireEvent.click(firstTouchCategoryBtn);
    expect(
      screen.getAllByText(/SFV Central Box: Directional First Touch & 6-to-6 Rotation on 4 Mini-Goals/i).length
    ).toBeGreaterThan(0);

    const defendingCategoryBtn = screen.getByRole('button', {
      name: /6\. 1v1 Defending & Closing Passing Lanes/i,
    });
    fireEvent.click(defendingCategoryBtn);
    expect(
      screen.getAllByText(/Dribbling Through 5m Gates & 1v1 Ball Recovery with Counter on 4 Mini-Goals \(SFV\)/i).length
    ).toBeGreaterThan(0);

    // 6. Navigate to Methodology & Conditioning inside Activation module and toggle all 4 Biomechanics & Touch SVG diagrams
    fireEvent.click(within(mainNav).getByRole('button', { name: /Methodology/i }));
    expect(
      screen.getByText(/1\. 3-Phase Single-Drill Progression \(SFV \/ UEFA Methodology\)/i)
    ).toBeInTheDocument();

    const geometryToggles = screen.getAllByTestId('geometry-mode-toggle');
    expect(geometryToggles.length).toBe(4);
    for (const toggleBtn of geometryToggles) {
      fireEvent.click(toggleBtn);
    }

    // 7. Switch to Russian (RU) while in Activation module
    const langSwitcher = screen.getByTestId('lang-switcher');
    fireEvent.click(within(langSwitcher).getByRole('button', { name: /russian/i }));
    expect(seriesBtn).toHaveTextContent(/Активация/i);

    // 8. Switch back to Rondo module via Series Switcher
    fireEvent.click(seriesBtn);
    fireEvent.click(screen.getByTestId('series-module-rondo-series'));
    expect(seriesBtn).toHaveTextContent(/Рондо/i);
  });
});




