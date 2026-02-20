# Jeff's Portfolio -- Starter Kit

A portfolio website starter built with Next.js, Tailwind CSS, and Sanity CMS. This repo is designed as a learning platform -- it gives you a working baseline with real patterns so you can practice building features, writing tests, and using Claude Code to level up your development workflow.

The goal is a launchpad, not a finished product. You will add pages, write tests, customize the design, and make it yours.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| [Sanity CMS](https://www.sanity.io/) | Headless content management |
| [Vitest](https://vitest.dev/) | Unit and component testing |
| [Playwright](https://playwright.dev/) | End-to-end browser testing |
| [Testing Library](https://testing-library.com/) | Component test utilities |

---

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js 18+** -- check with `node --version`
- **npm** -- comes with Node.js, check with `npm --version`
- **A Sanity account** -- free tier works fine, sign up at [sanity.io](https://www.sanity.io/)

---

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url> jeff-c-port
cd jeff-c-port
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your Sanity project values:

```bash
cp .env.example .env.local
```

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

See the "Creating a Sanity Project" section below if you need to get a project ID.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser -- you should see the homepage.

### 5. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to open the embedded Sanity Studio. This is where you create and manage content (projects, site settings, etc.).

### 6. Install Playwright browsers (for e2e tests)

```bash
npx playwright install
```

This downloads the browser binaries Playwright needs. You only need to run this once.

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server at localhost:3000 |
| `npm run build` | Build the production bundle |
| `npm start` | Start the production server (run build first) |
| `npm test` | Run unit and component tests with Vitest |
| `npm run test:watch` | Run tests in watch mode (re-runs on file changes) |
| `npm run test:coverage` | Run tests and generate a coverage report |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run test:e2e:ui` | Run Playwright tests with the interactive UI |
| `npm run lint` | Run ESLint to check for code issues |

---

## Project Structure

```
jeff-c-port/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (shared across all pages)
│   │   ├── page.tsx            # Homepage (/)
│   │   ├── globals.css         # Tailwind v4 config and global styles
│   │   ├── about/              # About page (/about)
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects listing page (/projects)
│   │   │   └── [slug]/         # Dynamic project detail page (/projects/my-project)
│   │   └── studio/
│   │       └── [[...tool]]/    # Embedded Sanity Studio (/studio)
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Sticky site header with nav and mobile menu
│   │   ├── Footer.tsx          # Site footer with copyright
│   │   ├── ProjectCard.tsx     # Card component for project listings
│   │   └── DarkModeToggle.tsx  # Light/dark theme switcher
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn, formatDate, slugify)
│   │   └── sanity/
│   │       ├── client.ts       # Sanity client configuration
│   │       ├── queries.ts      # GROQ queries for fetching content
│   │       ├── types.ts        # TypeScript interfaces for Sanity documents
│   │       └── image.ts        # Sanity image URL builder
│   └── sanity/
│       ├── env.ts              # Sanity environment variable helpers
│       └── schemas/
│           ├── index.ts        # Schema registry
│           ├── project.ts      # Project document schema
│           └── siteSettings.ts # Site settings document schema
├── tests/
│   ├── setup.ts                # Vitest setup (jest-dom matchers)
│   ├── utils.tsx               # Custom render with providers for component tests
│   ├── unit/                   # Vitest unit and component tests
│   └── e2e/                    # Playwright end-to-end tests
├── public/                     # Static assets (SVG icons, images)
├── docs/                       # Documentation and planning
├── sanity.config.ts            # Sanity Studio configuration
├── .env.example                # Template for environment variables
├── CLAUDE.md                   # Claude Code project context
└── TESTING.md                  # Testing guide and exercises
```

---

## Creating a Sanity Project

If you do not have a Sanity project ID yet, follow these steps:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (or create an account).
2. Click **"Create new project"**.
3. Give it a name (e.g., "Jeff Portfolio").
4. Choose the **free** plan.
5. Create a dataset called `production` (this is the default).
6. Copy your **Project ID** from the project dashboard -- it looks something like `abc123xy`.
7. Paste it into your `.env.local` file as the value for `NEXT_PUBLIC_SANITY_PROJECT_ID`.

That is it. The Sanity Studio at `/studio` will now connect to your project and you can start creating content.

---

## Adding Content

Once your Sanity project is connected:

1. Go to [http://localhost:3000/studio](http://localhost:3000/studio).
2. Click **"Project"** in the left sidebar to create a new project entry.
3. Fill in the title, slug (click "Generate" to auto-create it), description, and any tags.
4. Publish the document.
5. Go back to [http://localhost:3000](http://localhost:3000) to see your project appear.

---

## Deployment

The easiest way to deploy this site is with [Vercel](https://vercel.com/):

1. Push your repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add your environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`) in the Vercel project settings.
4. Deploy.
5. After deploying, add your Vercel URL to your Sanity project's CORS origins at [sanity.io/manage](https://www.sanity.io/manage) > API > CORS Origins. Without this, the embedded Studio will not work on the deployed site.

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Learning Path

This repo is set up to help you learn progressively:

- **TESTING.md** -- A guided walkthrough of testing concepts with hands-on exercises
- **CLAUDE.md** -- Context file that helps Claude Code understand this project
- **docs/plans/** -- Planning documents showing how the project was designed (e.g., the initial portfolio starter plan)

Start with `TESTING.md` for structured exercises, or just start building and ask Claude Code for help along the way.
