---
name: delegate-to-flash
description: Automatically delegate routine, simple, or bounded subtasks to Flash model subagents when operating as a Pro model, optimizing latency, conserving context, and accelerating execution.
---

# Delegate to Flash: Intelligent Subtask Delegation

This skill establishes the protocol for a high-capability primary agent (operating with a `pro` model) to delegate well-scoped, routine, and lightweight subtasks to the faster, cost-efficient `flash` model via subagents.

---

## 1. Principles & Objectives

When operating as a `pro` model agent, context window space and deep reasoning capacity are premium resources:
1. **Context Window Hygiene**: Prevent context saturation from large search outputs, directory scans, verbose logs, and mechanical boilerplate.
2. **Latency & Throughput Optimization**: Offload simple, parallelizable tasks to `flash` subagents, which execute quickly.
3. **Quality & Invariant Preservation**: Retain complex domain reasoning, architectural design, state-machine formulation, and property invariant definitions in the `pro` orchestrator while offloading deterministic execution to `flash`.

---

## 2. Delegation Decision Matrix

| Subtask Category | Model Tier | Subagent Type | Rationale |
| :--- | :--- | :--- | :--- |
| **Codebase Reconnaissance** (grepping, finding references, listing files) | `flash` | `research` | Read-only exploration; does not require high-tier reasoning. |
| **Log & Document Summarization** (inspecting build logs, test outputs) | `flash` | `research` | Fast token parsing and extraction of specific failure lines. |
| **Boilerplate & Fixtures** (mock data, typing scaffolding, simple helpers) | `flash` | `self` | Highly structured, predictable pattern completion. |
| **i18n & Localization Parity** (synchronizing keys in `en.ts`, `de.ts`, `ru.ts`) | `flash` | `self` | Mechanical translation and dictionary alignment. |
| **Single-Function Unit Tests** (straightforward assertions on pure utils) | `flash` | `self` | Direct assertion writing from explicit specifications. |
| **Isolated Command Verification** (running lint, formatting, or single checks) | `flash` | `self` | Bounded execution with clear pass/fail output. |
| **Architecture & State Design** | `pro` *(Retain)* | Primary / Parent | Requires global system understanding and design reasoning. |
| **Property-Based Invariant Formulation** (`fast-check`) | `pro` *(Retain)* | Primary / Parent | Requires mathematical modeling of domain properties and boundary behavior. |
| **Complex Multi-Module Refactoring** | `pro` *(Retain)* | Primary / Parent | Cross-cutting concerns and deep semantic dependencies. |
| **Deployment & Shipping Orchestration** (`auto-ship`) | `pro` *(Retain)* | Primary / Parent | High-stakes verification, commit generation, and production push. |

---

## 3. Delegation Protocol & Mechanics

### Step 1: Identify Subtask Boundaries
Ensure the subtask is:
- **Self-contained**: Can be executed without iterative clarifying dialogue with the user.
- **Explicitly bounded**: Clear input files, target outputs, and constraints.
- **Verifiable**: Has a clear definition of done (e.g. file written, findings summarized, test passed).

### Step 2: Select Subagent Type
- Use `TypeName: "research"` with `Model: "flash"` when the subtask is **read-only** (exploring files, searching web, inspecting logs).
- Use `TypeName: "self"` with `Model: "flash"` when the subtask requires **write tools or running commands** (editing files, creating boilerplate, running tests).
- Workspace mode: Always use `Workspace: "inherit"`.

### Step 3: Formulate Crisp Subagent Prompts
Flash models succeed when instructions are explicit and unambiguous. Include:
1. **Role & Objective**: One sentence defining the mission.
2. **Scope & Targets**: Absolute paths to files or directories.
3. **Strict Constraints**: What NOT to touch or modify.
4. **Expected Output Format**: Structured response (e.g., bulleted findings, unified diff, or specific return format).

#### Example: Delegating Codebase Search (Read-only)
```json
{
  "Subagents": [
    {
      "TypeName": "research",
      "Model": "flash",
      "Role": "Reference Finder",
      "Workspace": "inherit",
      "Prompt": "Search the codebase in /home/antigravity/naidyonov/coach/src/ for all usages of `calculatePitchGrid`. Return a list of filenames and line numbers where it is imported or called, with a 1-line snippet for each call."
    }
  ]
}
```

#### Example: Delegating Boilerplate Generation (Write tools)
```json
{
  "Subagents": [
    {
      "TypeName": "self",
      "Model": "flash",
      "Role": "Fixture Generator",
      "Workspace": "inherit",
      "Prompt": "Create a test fixture file at /home/antigravity/naidyonov/coach/src/test/fixtures/drill-fixtures.ts containing 3 mock RondoDrill objects matching the TypeScript interface in src/types/rondo.ts. Ensure all mandatory fields are populated. Run npm test to verify syntax."
    }
  ]
}
```

### Step 4: Parallel Batching
If multiple independent subtasks exist (e.g., checking i18n keys for German and Russian simultaneously, or searching two separate modules), launch them in a **single `invoke_subagent` call**:
```json
{
  "Subagents": [
    {
      "TypeName": "research",
      "Model": "flash",
      "Role": "DE Locale Auditor",
      "Workspace": "inherit",
      "Prompt": "Compare src/locales/en.ts and src/locales/de.ts. Report any keys present in en.ts that are missing in de.ts."
    },
    {
      "TypeName": "research",
      "Model": "flash",
      "Role": "RU Locale Auditor",
      "Workspace": "inherit",
      "Prompt": "Compare src/locales/en.ts and src/locales/ru.ts. Report any keys present in en.ts that are missing in ru.ts."
    }
  ]
}
```

### Step 5: Reactive Wakeup & Non-Blocking Execution
- Do **NOT** busy-poll subagent statuses.
- Proceed with high-level architectural work or end turn. The framework automatically wakes up the orchestrator upon subagent completion.

---

## 4. Synthesis & Verification Gate

When Flash subagents report back:
1. **Review Findings**: Pro agent validates subagent outputs against high-level specifications and invariants.
2. **Integration Testing**: Run the project verification suite (`npm run verify` or relevant tests).
3. **Resolve Edge Cases**: If a subagent encountered an ambiguous edge case, Pro agent intervenes with high-level reasoning.
4. **Deploy**: Hand off verified changes to the `/auto-ship` protocol.
