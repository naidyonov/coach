---
name: auto-ship
description: Automatically verify test coverage, run property tests with fast-check, validate production build, commit, and push directly to main for deployment. Use whenever completing any feature, enhancement, or bugfix in the coach playbook repository.
---

# Auto-Ship: Continuous Test Verification & Deployment to Main

This skill automates the full test-verify-and-deploy pipeline for the `coach-playbook-rondos` project. Whenever an agent finishes implementing any feature, enhancement, or bugfix, this protocol MUST be executed automatically so changes are immediately deployed to GitHub Pages without requiring the user to prompt or approve.

---

## Autonomous Trigger Rules

- **Zero-Prompt Deployment**: The user has explicitly authorized automatic deployments. DO NOT ask "Should I push to main?" or "Would you like me to deploy?". Run this skill and push directly to `origin main`.
- **Pre-Deploy Gate**: A deployment is strictly forbidden unless:
  1. All new or modified features have corresponding tests (and property-based tests for domain/calculation logic).
  2. All tests pass (`npm test`).
  3. Production build succeeds (`npm run build`).

---

## Step-by-Step Execution Protocol

### Step 1: Ensure Test & Property-Based Test Coverage
Before shipping, audit what was implemented or modified:
1. **Domain, Calculations & Logic**:
   - If mathematical formulas, dosage timers, pitch coordinates, squad calculations, or state machines were added/modified, ensure they have property-based tests using `fast-check` in `src/test/domain-properties.test.ts` (or a dedicated `*.properties.test.ts`).
   - Property tests must verify invariants over arbitrary randomized ranges (e.g., negative numbers, large inputs, edge cases).
2. **UI Components & Views**:
   - If UI components, modal dialogs, or user interactions were added/modified, ensure corresponding component tests exist in `src/test/`.
3. **i18n & Localization**:
   - If new text or keys were introduced, ensure parity across `en.ts`, `de.ts`, `ru.ts` and verify with tests.

### Step 2: Run Verification Pipeline
Execute the project verification script:
```bash
npm run verify
```
This runs:
- `npm test`: executes all Vitest unit and property tests.
- `npm run build`: runs TypeScript type-checking and Vite production bundling.

Both MUST exit with code 0. If any test or type error occurs, diagnose and fix it immediately before proceeding.

### Step 3: Stage and Commit
Check git status and stage all relevant code, test, and documentation files:
```bash
git status
git add <files>
```
Create a descriptive commit following Conventional Commits format:
```bash
git commit -m "feat(<scope>): <short description of changes>"
```
(or `fix(...)`, `perf(...)`, `refactor(...)` as appropriate).

### Step 4: Push to Main for Deployment
Push the commit directly to the `main` branch:
```bash
git push origin main
```
Pushing to `main` automatically triggers GitHub Actions (`.github/workflows/deploy-pages.yml`), building and publishing the live application to GitHub Pages.

### Step 5: Report Status to User
Provide a brief summary containing:
- Feature/bugfix implemented.
- Tests executed (including property test count & assertions).
- Commit hash and push confirmation.
- Live deployment confirmation via GitHub Actions.
