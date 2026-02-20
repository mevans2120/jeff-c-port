# Plan: Portfolio Starter Repo — Jeff C Port

**Date:** 2026-02-20
**Tags:** next.js, tailwind, sanity, testing, playwright, vitest, claude-code, agent-teams, portfolio

## Objective

Build a minimal but fully-wired Next.js + Tailwind CSS + Sanity CMS starter repo that serves as a learning platform for a QA analyst to practice:
1. Using Claude Code for development workflows
2. Writing e2e tests with Playwright
3. Writing unit/integration tests with Vitest
4. Using Claude Code skills (design-concepts, quality-engineering, TDD)

## Background

A QA analyst friend is leveling up into Quality Engineering and learning Claude Code. Rather than starting from zero, we're providing a working baseline that demonstrates real patterns — Sanity CMS content flowing to Next.js pages, tests that actually pass, and documentation that teaches the Claude Code workflow. The repo should feel like a launchpad, not a finished product.

## Requirements

### Must Have
- Next.js 15 App Router with TypeScript strict mode
- Tailwind CSS v4 with basic design tokens
- Sanity CMS with embedded Studio and 2 simple schemas
- At least one dynamic route pulling content from Sanity
- Vitest configured with 2-3 example unit tests passing
- Playwright configured with 2-3 example e2e tests passing
- `npm test`, `npm run test:e2e` scripts working
- README.md with setup instructions
- CLAUDE.md with project conventions and Claude Code guidance
- TESTING.md with testing exercises and learning path
- `.env.example` with all required variables documented

### Nice to Have
- GitHub Actions CI workflow running tests on push
- A `EXERCISES.md` with progressive Claude Code challenges
- Dark mode toggle (gives a good component to test)
- Basic responsive layout
- Seed script or example Sanity dataset for quick start

---

## Approach

### Phase 1: Project Scaffold & Core Setup

**1.1 — Initialize Next.js project**
- `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint
- Configure `tsconfig.json` strict mode
- Set up path aliases (`@/`)

**1.2 — Install and configure Sanity**
- `npm create sanity@latest` — embedded studio at `/studio` route
- Create two schemas:
  - `project` — title, slug, description, image, tags, url, body (portable text)
  - `siteSettings` — name, title, description, socialLinks
- Set up Sanity client utility (`lib/sanity/client.ts`)
- Create GROQ query helpers (`lib/sanity/queries.ts`)
- Type definitions for Sanity documents (`lib/sanity/types.ts`)

**1.3 — Build minimal pages**
- Layout: header with nav, main content area, footer
- Homepage (`/`) — hero section + project grid pulling from Sanity
- Project detail page (`/projects/[slug]`) — dynamic route with Sanity data
- About page (`/about`) — static or from siteSettings
- Studio route (`/studio/[[...tool]]`) — embedded Sanity Studio

**1.4 — Tailwind design tokens**
- Custom color palette (neutral + 1 accent)
- Typography scale
- Spacing tokens
- Dark mode support via `class` strategy

### Phase 2: Testing Infrastructure

**2.1 — Vitest setup**
- Install vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- Configure `vitest.config.ts` with path aliases and jsdom environment
- Create test utilities file (`tests/utils.tsx`) with render helpers

**2.2 — Example unit tests**
- Test a utility function (e.g., `formatDate`, `slugify`)
- Test a component renders correctly (e.g., ProjectCard)
- Test GROQ query builder returns expected query string

**2.3 — Playwright setup**
- Install Playwright with browsers
- Configure `playwright.config.ts` with baseURL, webServer config
- Create page object models directory structure

**2.4 — Example e2e tests**
- Test homepage loads and displays project grid
- Test navigation between pages
- Test project detail page renders dynamic content
- Test dark mode toggle (if included)

### Phase 3: Documentation

**3.1 — README.md**
- Project overview and purpose
- Prerequisites (Node.js, npm, Sanity account)
- Getting started (clone, install, env setup, dev server)
- Available scripts
- Project structure overview
- How to add a new Sanity schema
- How to deploy

**3.2 — CLAUDE.md**
- Project structure and conventions
- Tech stack specifics (App Router, not Pages)
- Sanity patterns (schema -> query -> component flow)
- Testing commands and expectations
- Code style (TypeScript strict, Tailwind, cn() utility)
- Common tasks: "how to add a new page", "how to add a new schema"

**3.3 — TESTING.md**
- Testing philosophy and strategy
- What's tested vs. what's left as exercises
- How to run tests (unit, e2e, watch mode)
- Progressive exercises:
  1. Write a unit test for an existing utility
  2. Write a component test for an existing component
  3. Write an e2e test for a user flow
  4. Use Claude Code's quality-engineering skill
  5. Use Claude Code's TDD skill to add a new feature
  6. Set up a test for Sanity content rendering

**3.4 — .env.example**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN` (for preview/write if needed)

### Phase 4: Polish & Handoff

- Verify `npm run build` passes
- Verify `npm test` passes
- Verify `npm run test:e2e` passes
- Clean up boilerplate and unused files
- Final review of all documentation
- Initial git commit with clean history

---

## Agent Teams Strategy

This is where we can significantly speed up the build. Several phases have **independent workstreams** that can run in parallel using Claude Code agent teams.

### Team Structure

```
Team Lead (you/orchestrator)
├── scaffold-agent    — Project init, Next.js, Sanity, pages
├── testing-agent     — Vitest + Playwright setup and example tests
├── docs-agent        — All documentation files
└── review-agent      — Code review after each phase
```

### Parallelization Opportunities

#### Batch 1: Foundation (Sequential — must complete first)
- **scaffold-agent**: Phase 1.1 + 1.2 (Next.js init, Sanity setup, schemas)
- This must complete before other agents can work on project files

#### Batch 2: Build + Test + Docs (Parallel — 3 agents)
After the scaffold is in place:

| Agent | Tasks | Why Parallel |
|-------|-------|-------------|
| **scaffold-agent** | Phase 1.3 + 1.4 (pages, design tokens) | Building UI components |
| **testing-agent** | Phase 2.1 + 2.3 (Vitest + Playwright config) | Test infra is independent of page content |
| **docs-agent** | Phase 3.1 + 3.2 + 3.3 + 3.4 (all docs) | Docs can be drafted from the plan, refined later |

#### Batch 3: Integration (Parallel — 2 agents)
Once pages and test infra exist:

| Agent | Tasks | Why Parallel |
|-------|-------|-------------|
| **testing-agent** | Phase 2.2 + 2.4 (write actual tests against real components) | Tests target specific components |
| **docs-agent** | Refine docs based on actual file structure and scripts | Polish pass |

#### Batch 4: Review (Sequential)
- **review-agent**: Full code review against plan
- Fix any issues found
- Final verification (build, test, e2e all pass)

### Expected Speedup

Without teams: ~60-90 min of sequential Claude Code work
With teams: ~30-40 min — Batch 2 runs 3 agents simultaneously, Batch 3 runs 2

### Team Execution Commands

When ready to execute, the team would be created like:

```
TeamCreate: "jeff-portfolio-starter"

Tasks:
1. Scaffold Next.js + Sanity + pages        → scaffold-agent (coding)
2. Configure Vitest + example unit tests     → testing-agent (testing)
3. Configure Playwright + example e2e tests  → testing-agent (testing)
4. Write README.md                           → docs-agent (coding)
5. Write CLAUDE.md                           → docs-agent (coding)
6. Write TESTING.md + exercises              → docs-agent (coding)
7. Write .env.example                        → docs-agent (coding)
8. Code review against plan                  → review-agent (reviewer)
9. Final verification (build + test pass)    → testing-agent (testing)

Dependencies:
- Tasks 2-7 blocked by Task 1
- Task 8 blocked by Tasks 2-7
- Task 9 blocked by Task 8
```

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Sanity free tier limits hit | Low | Med | Use development dataset, document upgrade path |
| Next.js 15 + Sanity version conflicts | Med | Med | Pin specific versions in package.json |
| Playwright browser install issues on friend's machine | Med | Low | Document in README, include `npx playwright install` in setup steps |
| Tests become flaky with Sanity API calls | Med | High | Mock Sanity responses in unit tests, use dev server for e2e |
| Friend overwhelmed by too much code | Low | High | Keep it minimal — 2 schemas, 3 pages, clearly labeled exercises |
| Agent team merge conflicts | Med | Med | Scaffold completes before parallel work begins; agents work on separate files |

## Success Criteria

- [ ] `npm run dev` starts the app with no errors
- [ ] `npm run build` completes successfully
- [ ] `npm test` runs Vitest with all example tests passing
- [ ] `npm run test:e2e` runs Playwright with all example tests passing
- [ ] Homepage renders project cards from Sanity
- [ ] `/projects/[slug]` renders dynamic content
- [ ] Sanity Studio is accessible at `/studio`
- [ ] README.md is sufficient for someone to clone and run in < 5 minutes
- [ ] CLAUDE.md gives Claude Code enough context to help effectively
- [ ] TESTING.md exercises are progressive and achievable
- [ ] Friend can use `design-concepts` skill to redesign the look
- [ ] Friend can use `quality-engineering` skill to expand test coverage

## Open Questions

- Does Jeff already have a Sanity account, or should we set one up during handoff? Answer: We can set one up. 
- Should we include a seed dataset / example content, or let him create content from scratch? Answer: Maybe a minimal data set
- Any preference on color palette or design direction, or leave fully open for design-concepts skill? Answer: lets leave that to Jeff and the design concept skill
- Should we include a deployment config (Vercel) or keep it local-dev only? Answer: Lets help him deploy it to vercel. 
- Does Jeff have a GitHub account where we should push the initial repo? Answer: We can use mine for now

## Related Research

- No existing research documents found in `docs/research/`
