import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import { App } from '../App';

const renderApp = () =>
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );

describe('Views & Deep User Interactions Across Catalog, Monthly Plan, Methodology & Modals', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('validates LanguageContext toggleLang cycle, fallbacks, and error guard outside provider', () => {
    const ContextInspector: React.FC = () => {
      const { lang, toggleLang, getRondoMethodology, getRondoAgeVariant } =
        useLanguage();
      const fallbackMeth = getRondoMethodology('non-existent');
      const fallbackVar = getRondoAgeVariant('non-existent');
      return (
        <div>
          <span data-testid="ctx-lang">{lang}</span>
          <span data-testid="ctx-fallback">{fallbackMeth.originSchool}</span>
          <span data-testid="ctx-var">{fallbackVar.baseGrid}</span>
          <button
            type="button"
            data-testid="ctx-toggle-lang"
            onClick={toggleLang}
          >
            Toggle
          </button>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <ContextInspector />
      </LanguageProvider>
    );

    expect(screen.getByTestId('ctx-lang')).toHaveTextContent('en');
    fireEvent.click(screen.getByTestId('ctx-toggle-lang'));
    expect(screen.getByTestId('ctx-lang')).toHaveTextContent('de');
    fireEvent.click(screen.getByTestId('ctx-toggle-lang'));
    expect(screen.getByTestId('ctx-lang')).toHaveTextContent('ru');
    fireEvent.click(screen.getByTestId('ctx-toggle-lang'));
    expect(screen.getByTestId('ctx-lang')).toHaveTextContent('en');

    // Calling useLanguage outside LanguageProvider throws
    const BrokenConsumer = () => {
      useLanguage();
      return null;
    };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<BrokenConsumer />)).toThrow(
      /useLanguage must be used within a LanguageProvider/i
    );
    spy.mockRestore();
  });

  it('handles header popovers outside-click & Escape closing, mobile bottom nav tabs, and Print modal', () => {
    const printSpy = vi.fn();
    Object.defineProperty(window, 'print', {
      writable: true,
      configurable: true,
      value: printSpy,
    });

    renderApp();

    // Open Series Switcher and click active module to close
    const seriesBtn = screen.getByTestId('series-switcher-btn');
    fireEvent.click(seriesBtn);
    expect(screen.getByTestId('series-switcher-popover')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(
      screen.queryByTestId('series-switcher-popover')
    ).not.toBeInTheDocument();

    // Re-open Series Switcher and press Escape
    fireEvent.click(seriesBtn);
    expect(screen.getByTestId('series-switcher-popover')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(
      screen.queryByTestId('series-switcher-popover')
    ).not.toBeInTheDocument();

    // Open Settings Menu and trigger Print Card from inside Settings Menu
    fireEvent.click(screen.getByTestId('settings-menu-btn'));
    const settingsPanel = screen.getByTestId('settings-dropdown-panel');
    fireEvent.click(within(settingsPanel).getByRole('button', { name: /Print Card/i }));

    // Trigger window.print() inside PrintCardModal
    fireEvent.click(screen.getByRole('button', { name: /Print \/ Save PDF/i }));
    expect(printSpy).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    // Navigate using Mobile Bottom Navigation dock
    const mobileNav = screen.getByTestId('mobile-bottom-nav');
    const mobileButtons = within(mobileNav).getAllByRole('button');
    // 0: Rondos, 1: Plan, 2: Guide, 3: Timer, 4: Print
    fireEvent.click(mobileButtons[1]);
    expect(screen.getByText(/4 Weeks • 8 Sessions/i)).toBeInTheDocument();

    fireEvent.click(mobileButtons[2]);
    expect(
      screen.getByText(/1\. Micro-Principles \("Barcelona School"\)/i)
    ).toBeInTheDocument();

    fireEvent.click(mobileButtons[3]);
    expect(
      screen.getByText(/Rondo Interval Set Timer \(with Coach Whistle\)/i)
    ).toBeInTheDocument();

    fireEvent.click(mobileButtons[4]);
    expect(screen.getByText(/Training Session Drill Card/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    fireEvent.click(mobileButtons[0]);
  });

  it('exercises CatalogView prev/next rondo wraparound, phase stepper, layer toggles, squad slider, and age matrix row click', () => {
    renderApp();

    // Prev rondo from 1.1 wraps around to 5.2 (rondo-10)
    fireEvent.click(screen.getByTestId('prev-rondo-btn'));
    expect(
      screen.getAllByText(/Escape Pressure Zone/i).length
    ).toBeGreaterThan(0);

    // Next rondo from 5.2 wraps back to 1.1 (rondo-1)
    fireEvent.click(screen.getByTestId('next-rondo-btn'));
    expect(
      screen.getAllByText(/3v1 Rondo: Support Angles & Passing Lanes/i).length
    ).toBeGreaterThan(0);

    // Step-by-Step Phase buttons & prev/next phase
    fireEvent.click(screen.getByRole('button', { name: 'Phase 2' }));
    fireEvent.click(screen.getByLabelText('Next Phase'));
    fireEvent.click(screen.getByLabelText('Prev Phase'));

    // Toggle Passing Lanes, Support & Pressing Runs, Cover Shadows
    fireEvent.click(screen.getByRole('button', { name: /✓ Passing Lanes/i }));
    expect(
      screen.getByRole('button', { name: /× Passing Lanes/i })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /✓ Support & Pressing Runs/i })
    );
    expect(
      screen.getByRole('button', { name: /× Support & Pressing Runs/i })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /✓ Cover Shadows \/ Trap Zones/i })
    );
    expect(
      screen.getByRole('button', { name: /× Cover Shadows \/ Trap Zones/i })
    ).toBeInTheDocument();

    // Squad tab range slider
    const subTabs = screen.getByTestId('mobile-drill-subtabs');
    fireEvent.click(within(subTabs).getByRole('button', { name: /Squad/i }));
    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '20' } });
    expect(screen.getByText(/For 20 players/i)).toBeInTheDocument();

    // Science tab -> click age row in Age Scaling Matrix
    fireEvent.click(screen.getByTestId('scientific-basis-tab-btn'));
    const basisPanel = screen.getByTestId('scientific-basis-panel');
    fireEvent.click(within(basisPanel).getByText('U11-12'));
    expect(screen.getAllByText('U11-12').length).toBeGreaterThan(1);

    // Open Monthly Plan from CatalogView button
    const monthlyPlanBtns = screen.getAllByRole('button', {
      name: /^Monthly Plan$/i,
    });
    fireEvent.click(monthlyPlanBtns[monthlyPlanBtns.length - 1]);
    expect(screen.getByText(/4 Weeks • 8 Sessions/i)).toBeInTheDocument();
  });

  it('exercises MonthlyPlanView rondo select dropdown and keyboard Enter/Space session card completion', () => {
    renderApp();

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
    fireEvent.click(within(mainNav).getByRole('button', { name: /Monthly Plan/i }));

    // Change rondo via select dropdown
    const select = screen.getByLabelText(/Select Primary Rondo of the Month/i);
    fireEvent.change(select, { target: { value: 'rondo-3' } });
    expect(
      screen.getAllByText(/7v3 Rondo: Progression Through Pivot/i).length
    ).toBeGreaterThan(0);

    // Keyboard Enter and Space on a session card
    const sessionCard = screen
      .getByText(/Week 1 \(Tuesday\)/i)
      .closest('[role="button"]')!;
    fireEvent.keyDown(sessionCard, { key: 'Enter' });
    fireEvent.keyDown(sessionCard, { key: ' ' });
  });

  it('exercises MethodologyView sub-tabs, Mistake/Solution toggles across concepts, and drill jump actions', () => {
    renderApp();

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
    fireEvent.click(within(mainNav).getByRole('button', { name: /Methodology/i }));

    // Toggle all 4 geometry diagrams to Mistake mode and back to Solution mode
    const mistakeToggles = screen.getAllByTestId('geometry-mode-toggle');
    for (const btn of mistakeToggles) {
      fireEvent.click(btn);
    }
    const solutionBtns = screen.getAllByRole('button', {
      name: /✓ Correct Tactical Execution/i,
    });
    for (const btn of solutionBtns) {
      fireEvent.click(btn);
    }

    // Filter sub-tabs
    fireEvent.click(screen.getByRole('button', { name: /^Principles$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Geometry$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Freeze Cues$/i }));

    // Click "Open Rondo on Board" from an intervention card
    const openRondoBtns = screen.getAllByRole('button', {
      name: /Open Rondo on Board/i,
    });
    fireEvent.click(openRondoBtns[1]); // Opens Rondo 1.2 in Catalog

    // Navigate back to Methodology -> Master Table and click a table row
    fireEvent.click(within(mainNav).getByRole('button', { name: /Methodology/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Master Table$/i }));
    const rowCell = screen.getByText('2.1');
    fireEvent.click(rowCell);
    expect(
      screen.getAllByText(/7v3 Rondo: Progression Through Pivot/i).length
    ).toBeGreaterThan(0);
  });
});
