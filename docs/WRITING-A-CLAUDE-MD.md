# Writing a Good CLAUDE.md

`CLAUDE.md` is the most important file in your project for working with Claude Code. It is the first thing Claude reads when it starts a session, and it shapes every response you get. Think of it as onboarding documentation — but for an AI pair programmer instead of a new hire.

This guide explains what makes a good `CLAUDE.md`, why each section matters, and how to keep it useful as your project grows.

---

## Why CLAUDE.md Matters

Without a `CLAUDE.md`, Claude Code has to guess about your project:
- What framework are you using? (Next.js Pages Router? App Router?)
- What package manager? (npm? pnpm? yarn?)
- Where do tests live? What commands run them?
- What naming conventions do you follow?
- What patterns does your codebase use?

With a good `CLAUDE.md`, Claude Code knows all of this immediately. The result: fewer wrong suggestions, less back-and-forth, and code that fits your project from the first try.

---

## Anatomy of a Good CLAUDE.md

Here is the structure used in this project's `CLAUDE.md`, with annotations explaining why each section exists.

### 1. Project Overview (2-3 sentences)

```markdown
## Project Overview

This is a portfolio website for showcasing projects. It is built with
Next.js (App Router), TypeScript in strict mode, Tailwind CSS v4, and
Sanity CMS as the content backend.
```

**Why:** Gives Claude the big picture in 10 seconds. Without this, it might suggest patterns from the wrong framework or era.

**Keep it short.** This is not a README — it is a quick orientation.

### 2. Directory Structure

```markdown
## Directory Structure

src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage (/)
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/page.tsx     # Project detail page
│   └── studio/                 # Embedded Sanity Studio
├── components/                 # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/                        # Utilities and Sanity client
└── sanity/                     # Sanity schemas and config
```

**Why:** Claude Code can read your files, but a directory tree with descriptions tells it *what things are for* — not just that they exist. When Claude knows `src/sanity/schemas/` is where schemas live, it will put new schemas there instead of guessing.

**Tip:** Include brief descriptions (the `# comments`) for any directory or file whose purpose is not obvious from the name.

### 3. Tech Stack Specifics

```markdown
## Tech Stack Details

### Next.js 16 -- App Router
- This project uses the App Router (src/app/), NOT the Pages Router.
- Server Components are the default.

### Tailwind CSS v4
- CSS-based configuration. There is NO tailwind.config.js file.
- Theme tokens defined in src/app/globals.css.
```

**Why:** This is where you prevent the most common mistakes. Claude has knowledge of many versions and patterns. Without explicit guidance, it might:
- Suggest Pages Router patterns (`getServerSideProps`) instead of App Router patterns
- Try to create a `tailwind.config.js` that does not exist in Tailwind v4
- Use the wrong import style or API version

**Be specific about what NOT to do.** "NOT the Pages Router" and "There is NO tailwind.config.js" are more useful than just stating what you use.

### 4. Code Conventions

```markdown
## Code Conventions

- Package manager is npm (not pnpm, not yarn)
- Use `import type` for type-only imports
- Use cn() from @/lib/utils for conditional Tailwind classes
- Always include dark: variants for color classes
- Use semantic tokens (accent-*, surface-*) not raw Tailwind colors
```

**Why:** Conventions are the difference between code that fits your project and code that technically works but looks foreign. Every project has unwritten rules — CLAUDE.md is where you write them down.

**Include:** Package manager, import patterns, naming conventions, styling rules, component patterns.

### 5. Domain-Specific Patterns

```markdown
## Sanity CMS

Sanity content pattern (follow this flow for new content types):
1. Define the schema in src/sanity/schemas/
2. Add the TypeScript interface in src/lib/sanity/types.ts
3. Write the GROQ query in src/lib/sanity/queries.ts
4. Create the page or component that fetches and renders the data
```

**Why:** This is the highest-value section for productivity. When Claude knows your established patterns, it replicates them exactly instead of inventing new ones. This is especially important for multi-step patterns like the Sanity flow above — Claude will follow all four steps in the right order.

**Document any pattern that involves multiple files working together.** API routes, data fetching, form handling, authentication flows — anything where "how to add a new X" involves touching more than one file.

### 6. Components Reference

```markdown
## Components

**Header** (src/components/Header.tsx) -- client component
- Props: none
- Sticky header with nav links and mobile menu

**ProjectCard** (src/components/ProjectCard.tsx) -- server component
- Props: { project: Project }
- Card linking to /projects/{slug}
```

**Why:** When Claude knows what components exist and what props they take, it can reuse them instead of creating duplicates. It also helps when writing tests — Claude knows exactly what to render and what data to provide.

### 7. Testing Commands

```markdown
## Testing Commands

npm test              # Run unit/component tests
npm run test:watch    # Watch mode
npm run test:e2e      # Run Playwright e2e tests
npm run test:coverage # Coverage report
```

**Why:** Simple but critical. Claude needs to know which command verifies its work. Without this, it might guess wrong or skip verification entirely.

### 8. Common Tasks

```markdown
## Common Tasks

### How to add a new page
1. Create directory under src/app/ with page.tsx
2. Export default function component
3. Page is a Server Component by default

### How to add a new Sanity schema
1. Create file in src/sanity/schemas/
2. Register in src/sanity/schemas/index.ts
3. Add TypeScript interface in src/lib/sanity/types.ts
4. Add GROQ query in src/lib/sanity/queries.ts
```

**Why:** Step-by-step instructions for repeated tasks mean Claude gets it right on the first try. Without these, it will figure it out by reading the codebase — but it might miss a step (like registering the schema in `index.ts`).

### 9. Environment Variables

```markdown
## Environment Variables

Required (set in .env.local):
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_SANITY_API_VERSION
```

**Why:** Prevents Claude from hardcoding values or creating code that references variables that do not exist.

---

## What NOT to Put in CLAUDE.md

- **Lengthy explanations or tutorials.** Keep it reference-style, not prose.
- **Information that changes every session.** Current task, in-progress work, temporary state.
- **Duplicates of README content.** CLAUDE.md is for Claude, README is for humans. Some overlap is fine, but CLAUDE.md should be more technical and terse.
- **Obvious things.** "JavaScript files end in .js" adds noise without value.

---

## How to Keep CLAUDE.md Current

The biggest risk with CLAUDE.md is it going stale. When it says tests are in `tests/unit/example.test.ts` but that file no longer exists, Claude gets confused.

**Update CLAUDE.md when you:**
- Add a new component (add it to the components section)
- Add a new Sanity schema (update the schemas list)
- Add a new npm script (update the commands section)
- Change a convention (update the conventions section)
- Add a new directory or major file (update the tree)

**Quick way to check:** After finishing a feature, ask Claude Code:

> "Is the CLAUDE.md still accurate? Check it against the actual project."

Claude will read the file, scan the project, and flag discrepancies.

---

## Real Example: Before and After

### Bad CLAUDE.md (too vague)

```markdown
# CLAUDE.md

This is a Next.js project with Tailwind and Sanity.

Use TypeScript. Follow best practices.
```

**Problems:**
- Which Next.js pattern? (Pages or App Router?)
- Which Tailwind version? (v3 with config file or v4 with CSS?)
- What are "best practices"? (Every project defines them differently)
- No directory structure, no components, no commands

### Good CLAUDE.md (specific and actionable)

```markdown
# CLAUDE.md

## Project Overview
Portfolio site. Next.js 16 App Router, TypeScript strict, Tailwind v4, Sanity CMS.

## Tech Stack
- App Router (NOT Pages Router)
- Tailwind v4 -- tokens in globals.css, NO tailwind.config.js
- Sanity Studio embedded at /studio

## Conventions
- npm (not pnpm)
- import type for type-only imports
- cn() for conditional classes
- dark: variants on all color classes

## Testing
- npm test (Vitest)
- npm run test:e2e (Playwright)

## How to add a new schema
1. Create in src/sanity/schemas/
2. Register in index.ts
3. Add types in src/lib/sanity/types.ts
4. Add queries in src/lib/sanity/queries.ts
```

**Why this works:** Every line prevents a specific mistake. Claude knows exactly what to use, what not to use, and how to follow existing patterns.

---

## Evolving Your CLAUDE.md

As your project grows, your CLAUDE.md should grow with it. Here is a rough guide:

| Project Stage | What to Add |
|---------------|-------------|
| **Starter** (now) | Tech stack, directory structure, conventions, commands |
| **Adding features** | New components, new schemas, new patterns |
| **Adding auth** | Auth pattern, protected routes, session handling |
| **Adding API routes** | API conventions, error handling patterns |
| **Adding CI/CD** | Build pipeline, deployment process |
| **Team collaboration** | PR conventions, branch naming, review process |

The goal is not completeness — it is accuracy. A short, accurate CLAUDE.md is better than a long, outdated one.
