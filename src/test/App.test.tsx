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

  it('switches language between English (EN) and Russian (RU) accurately', () => {
    renderApp();

    const langSwitcher = screen.getByTestId('lang-switcher');
    const ruButton = within(langSwitcher).getByRole('button', { name: /russian/i });
    const enButton = within(langSwitcher).getByRole('button', { name: /english/i });

    // Switch to Russian
    fireEvent.click(ruButton);

    expect(
      screen.getByText(/Анатомия рондо: Тактический плейбук и программа на месяц/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Рондо 3 на 1: Углы и линии паса/i).length
    ).toBeGreaterThan(0);

    // Switch back to English
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

  it('switches audience role modes (Coach, Players, Parents)', () => {
    renderApp();

    const roleSwitcher = screen.getByTestId('role-switcher');

    // Switch to Players mode
    fireEvent.click(within(roleSwitcher).getByRole('button', { name: /Players/i }));
    expect(
      screen.getAllByText(/U15 Player mode: step-by-step phase animations/i).length
    ).toBeGreaterThan(0);

    // Switch to Parents mode
    fireEvent.click(within(roleSwitcher).getByRole('button', { name: /Parents/i }));
    expect(
      screen.getAllByText(/Parent Overview mode: transparent breakdown/i).length
    ).toBeGreaterThan(0);

    // Switch back to Coach mode
    fireEvent.click(within(roleSwitcher).getByRole('button', { name: /Coach/i }));
    expect(
      screen.getAllByText(/Full Pro Coach mode: UEFA tactical cues/i).length
    ).toBeGreaterThan(0);
  });
});
