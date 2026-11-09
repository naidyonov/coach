# Coach Playbook — Agent Instructions & Workflow Rules

## MANDATORY DIRECTIVE: Autonomous Test Verification & Auto-Deploy to Main

In this repository, **all coding agents must autonomously test, build, commit, and push changes directly to `main` to trigger production deployment upon completing any implementation.**

> **CRITICAL**: Do **NOT** stop and ask the user *"Would you like me to push?"*, *"Should I deploy this?"*, or *"Do you want me to commit?"*. The repository owner has granted permanent authorization for autonomous deployment. Your task is not complete until verified changes are pushed to `origin main`.

---

## 1. Test & Property Testing Requirements

Before any commit or push, you **must ensure comprehensive test coverage** for all changes:

### A. Property-Based Testing (`fast-check`)
- Any new or modified **domain calculations, algorithms, dosage formulas, tactical coordinates, or state logic** MUST be tested using property-based testing with `fast-check`.
- Property tests live in `src/test/domain-properties.test.ts` (or alongside the feature as `*.properties.test.ts`).
- Properties must verify mathematical invariants, idempotency, boundary clamping, and valid ranges across hundreds of generated random inputs:
  ```ts
  import * as fc from 'fast-check';
  it('invariant holds across all inputs', () => {
    fc.assert(fc.property(fc.integer(), (val) => {
      expect(myDomainFunction(val)).toBeDefined();
    }));
  });
  ```

### B. Unit & Interaction Testing (Vitest + React Testing Library)
- Any new or modified **UI components, modals, filters, or views** MUST be covered by unit/integration tests in `src/test/`.
- Verify user clicks, tab switches, keyboard shortcuts, and responsive behavior.

### C. Trilingual Parity (i18n)
- Any newly added user-facing strings must have corresponding translations in `en.ts`, `de.ts`, and `ru.ts`.

---

## 2. Pre-Deploy Verification Commands

Before pushing, you must run and verify:
```bash
npm run verify
```
This runs:
1. `npm test` — Executes all Vitest unit tests and `fast-check` property tests.
2. `npm run build` — Validates TypeScript types and generates the Vite production bundle.

If any failure occurs, fix it immediately. Never push failing code or bypass checks with `--no-verify`.

---

## 3. Autonomous Git Push & Deploy Protocol

Once verification passes:
1. **Stage all modified and created files**:
   ```bash
   git add <modified/new files>
   ```
2. **Create a Conventional Commit**:
   ```bash
   git commit -m "feat(<scope>): <description>"
   # or fix(...), test(...), refactor(...)
   ```
3. **Push to `main`**:
   ```bash
   git push origin main
   ```
   *Note: Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which automatically tests, builds, and deploys to GitHub Pages.*

4. **Report to User**:
   - Summarize what was implemented.
   - List the tests and property tests that verified the feature.
   - Provide the commit hash and confirm push to `main` for deployment.

---

## 4. Associated Skill & Scripts
- **Skill**: `/auto-ship` (defined in `.agents/skills/auto-ship/SKILL.md` and registered globally).
- **Scripts in `package.json`**:
  - `npm test`: Runs Vitest test suite.
  - `npm run test:property`: Runs `fast-check` property tests.
  - `npm run test:coverage`: Generates code coverage report.
  - `npm run verify`: Runs tests + production build.
  - `npm run ship`: Runs verify + pushes to `origin main`.
