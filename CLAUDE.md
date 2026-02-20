# CLAUDE.md -- Project Context for Claude Code

This file gives Claude Code the context it needs to work effectively in this project.

---

## Project Overview

This is a portfolio website for showcasing projects. It is built with Next.js (App Router), TypeScript in strict mode, Tailwind CSS v4, and Sanity CMS as the content backend. The Sanity Studio is embedded in the app at the `/studio` route.

The project is also a learning platform for practicing Quality Engineering skills -- writing tests, using TDD, and working with Claude Code.

---

## Directory Structure

```
src/
├── app/                        # Next.js App Router -- all routes live here
│   ├── layout.tsx              # Root layout with fonts, metadata, global wrapper
│   ├── page.tsx                # Homepage (/)
│   ├── globals.css             # Tailwind v4 theme tokens and base styles
│   ├── about/                  # About page (/about)
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx            # Projects listing (/projects)
│   │   └── [slug]/             # Dynamic project page (/projects/my-project)
│   │       └── page.tsx
│   └── studio/
│       └── [[...tool]]/        # Sanity Studio (/studio) -- catch-all route
│           └── page.tsx
├── components/                 # Reusable UI components
│   ├── Header.tsx              # Sticky header with nav links and mobile menu (client component)
│   ├── Footer.tsx              # Site footer with copyright year
│   ├── ProjectCard.tsx         # Card linking to a project detail page
│   └── DarkModeToggle.tsx      # Theme toggle (client component)
├── lib/
│   ├── utils.ts                # Utilities: cn(), formatDate(), slugify()
│   └── sanity/
│       ├── client.ts           # Sanity client (createClient from next-sanity)
│       ├── queries.ts          # GROQ queries (projectsQuery, projectBySlugQuery, etc.)
│       ├── types.ts            # TypeScript interfaces for Sanity documents
│       └── image.ts            # Sanity image URL builder helper
└── sanity/
    ├── env.ts                  # Environment variable accessors with validation
    └── schemas/
        ├── index.ts            # Schema registry (exports schemaTypes array)
        ├── project.ts          # Project document schema
        └── siteSettings.ts     # Site settings singleton schema

tests/
├── setup.ts                    # Vitest setup file (imports jest-dom matchers)
├── utils.tsx                   # Custom render helper wrapping providers
├── unit/                       # Vitest unit and component tests
│   ├── utils.test.ts           # Tests for cn(), formatDate(), slugify()
│   ├── queries.test.ts         # Tests for GROQ query strings
│   └── project-card.test.tsx   # Component tests for ProjectCard
└── e2e/                        # Playwright end-to-end tests
    ├── homepage.spec.ts        # Homepage content and structure tests
    ├── navigation.spec.ts      # Page navigation flow tests
    ├── dark-mode.spec.ts       # Dark mode toggle tests
    └── fixtures/               # Test fixtures (empty -- ready for use)

docs/
└── plans/                      # Planning and design documents
```

---

## Tech Stack Details

### Next.js 16 -- App Router

- This project uses the **App Router** (the `src/app/` directory), NOT the Pages Router.
- All pages are in `src/app/` following the file-system routing convention.
- Server Components are the default. Add `"use client"` only when the component needs browser APIs, state, or event handlers.
- The root layout is at `src/app/layout.tsx`.

### TypeScript -- Strict Mode

- `tsconfig.json` has `"strict": true`.
- Use `import type` for type-only imports (e.g., `import type { Project } from "@/lib/sanity/types"`).
- All Sanity document types are defined in `src/lib/sanity/types.ts`: `Project`, `SiteSettings`, `SanityImage`, `SocialLink`.
- Path alias: `@/` maps to `./src/`.

### Tailwind CSS v4

- **IMPORTANT**: This project uses Tailwind CSS v4, which has a CSS-based configuration.
- There is NO `tailwind.config.js` or `tailwind.config.ts` file.
- All theme tokens (colors, fonts, spacing) are defined in `src/app/globals.css` inside the `@theme inline {}` block.
- Custom color palettes:
  - `accent-*` (50--950): Slate-blue accent colors
  - `surface-*` (50--950): Neutral grays for backgrounds and text
- Use Tailwind utility classes for all styling. Never use inline `style={{}}` unless technically necessary.
- Use the `cn()` utility from `@/lib/utils` for conditional class merging.

### Dark Mode

- Dark mode uses the `class` strategy (the `dark` class on `<html>`).
- The `DarkModeToggle` component handles toggling and persists the preference to localStorage.
- When writing styles, always include dark mode variants: `bg-surface-50 dark:bg-surface-950`.

### Sanity CMS

- Sanity Studio is embedded at `/studio` (catch-all route: `src/app/studio/[[...tool]]/page.tsx`).
- Configuration is in `sanity.config.ts` at the project root.
- Environment variables for Sanity are accessed via `src/sanity/env.ts`.

**Sanity content pattern** (follow this flow for new content types):
1. Define the schema in `src/sanity/schemas/` and register it in `src/sanity/schemas/index.ts`
2. Add the TypeScript interface in `src/lib/sanity/types.ts`
3. Write the GROQ query in `src/lib/sanity/queries.ts`
4. Create the page or component that fetches and renders the data

**Current schemas:**
- `project` -- title, slug, description, image, tags, url, body (portable text)
- `siteSettings` -- name, title, description, socialLinks

**Available GROQ queries** (in `src/lib/sanity/queries.ts`):
- `projectsQuery` -- fetch all projects, ordered by creation date
- `projectBySlugQuery` -- fetch a single project by slug
- `siteSettingsQuery` -- fetch site settings singleton
- `projectSlugsQuery` -- fetch all project slugs (for static params)

### Components

**`Header`** (`src/components/Header.tsx`) -- client component
- Sticky header with desktop nav, mobile hamburger menu, and dark mode toggle.
- No props. Uses `NAV_LINKS` constant internally: Home (`/`), Projects (`/projects`), About (`/about`).
- Named export: `Header`.

**`Footer`** (`src/components/Footer.tsx`) -- server component
- Minimal footer displaying the current year and a copyright line.
- No props.
- Named export: `Footer`.

**`ProjectCard`** (`src/components/ProjectCard.tsx`) -- server component
- Renders a clickable card linking to `/projects/{slug}`. Shows title, description (line-clamped to 2 lines), tags, and a "View project" call-to-action.
- Props: `{ project: Project }` (the `Project` interface from `@/lib/sanity/types`).
- Named export: `ProjectCard`.

**`DarkModeToggle`** (`src/components/DarkModeToggle.tsx`) -- client component
- Toggle button switching between sun/moon icons. Persists preference to `localStorage` under the key `"theme"`.
- Props: `{ className?: string }`.
- Named export: `DarkModeToggle`.

### Utilities (`src/lib/utils.ts`)

- **`cn(...inputs: ClassValue[]): string`** -- Merges Tailwind classes using `clsx` + `tailwind-merge`. Use this everywhere for conditional classes.
- **`formatDate(dateString: string): string`** -- Converts a date string to a human-readable format (e.g., `"2024-06-15"` returns `"June 15, 2024"`). Uses `en-US` locale.
- **`slugify(text: string): string`** -- Converts text to a URL-friendly slug. Lowercases, trims, strips non-word characters (except hyphens), collapses whitespace/underscores to hyphens.

### Sanity Image Helper (`src/lib/sanity/image.ts`)

- **`urlForImage(source: SanityImage)`** -- Returns an image URL builder from `@sanity/image-url`. Chain `.width()`, `.height()`, `.url()` etc.

### Testing

- **Unit/component tests**: Vitest + Testing Library (`tests/unit/`)
- **End-to-end tests**: Playwright (`tests/e2e/`)
- Vitest config is in `vitest.config.ts` at the project root.
- Playwright config is in `playwright.config.ts` at the project root.
- `tests/setup.ts` imports `@testing-library/jest-dom/vitest` for DOM matchers (`.toBeInTheDocument()`, etc.).
- `tests/utils.tsx` exports a custom `render` that wraps components with providers. Use `import { render, screen } from "../../tests/utils"` in component tests when providers are needed. Currently a passthrough -- extend as the app adds context providers.

---

## Code Conventions

### General

- Package manager is **npm** (not pnpm, not yarn).
- Keep components small and focused. One component per file.
- Prefer Server Components. Only use `"use client"` when needed.
- Export named functions for components (not default exports), except for page routes which use `export default`.

### Styling

- Tailwind classes only. Use `cn()` from `@/lib/utils` for conditional classes.
- Always include `dark:` variants for background, text, and border colors.
- Use the project's semantic color tokens (`accent-*`, `surface-*`) rather than raw Tailwind colors.

### File Naming

- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities and libraries: camelCase (e.g., `utils.ts`, `client.ts`)
- Test files: match the source file name with `.test.ts` or `.test.tsx` suffix

### Imports

- Use the `@/` path alias for all imports from `src/`.
- Use `import type` for type-only imports.
- Group imports: React/Next.js first, then external libraries, then internal (`@/`) imports.

---

## Common Tasks

### How to add a new page

1. Create a new directory under `src/app/` with a `page.tsx` file.
2. Export a default function component from `page.tsx`.
3. For dynamic routes, use bracket notation: `src/app/things/[slug]/page.tsx`.
4. The page is a Server Component by default -- fetch data directly, no `useEffect` needed.

### How to add a new Sanity schema

1. Create a new file in `src/sanity/schemas/` (e.g., `blogPost.ts`).
2. Use `defineType` and `defineField` from the `sanity` package.
3. Import and add it to the `schemaTypes` array in `src/sanity/schemas/index.ts`.
4. Add the corresponding TypeScript interface in `src/lib/sanity/types.ts`.
5. Add GROQ queries in `src/lib/sanity/queries.ts`.

### How to add a new component

1. Create a new file in `src/components/` (e.g., `SkillBadge.tsx`).
2. Export a named function component.
3. Use Tailwind classes for styling, `cn()` for conditional classes.
4. Add dark mode variants for all color-related classes.
5. If the component needs state or browser APIs, add `"use client"` at the top.

### How to write a test

**Unit test** (for utilities or pure logic):
1. Create a file in `tests/unit/` (e.g., `tests/unit/utils.test.ts`).
2. Import the function and use `describe`, `it`, `expect` from Vitest.

**Component test** (for React components):
1. Create a file in `tests/unit/` (e.g., `tests/unit/ProjectCard.test.tsx`).
2. Use `render` from Testing Library to mount the component.
3. Use queries like `getByText`, `getByRole` to find elements and assert.

**E2E test** (for full user flows):
1. Create a file in `tests/e2e/` (e.g., `tests/e2e/navigation.spec.ts`).
2. Use Playwright's `page` fixture to navigate and interact with the running app.
3. Use `expect(page).toHaveTitle()`, `expect(locator).toBeVisible()`, etc.

---

## Testing Commands

```bash
npm test              # Run all unit/component tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run Playwright e2e tests (headless)
npm run test:e2e:ui   # Run Playwright with interactive UI
```

---

## Environment Variables

Required (set in `.env.local`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` -- your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` -- Sanity dataset name (usually `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` -- Sanity API version date string

Optional:
- `SANITY_API_TOKEN` -- for write operations or preview mode
