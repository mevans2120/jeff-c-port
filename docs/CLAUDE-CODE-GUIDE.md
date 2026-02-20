# Getting Started with Claude Code

A step-by-step guide for using Claude Code with this portfolio project. This covers installation, setup, and how to use Claude Code's skills to design, build, and test your portfolio site.

---

## Step 1: Install Claude Code

Claude Code is a CLI tool that runs in your terminal. Install it globally:

```bash
npm install -g @anthropic-ai/claude-code
```

After installing, run it from your project directory:

```bash
cd jeff-c-port
claude
```

Claude Code will read the `CLAUDE.md` file in the project root to understand the codebase. This is how it knows about your project structure, conventions, and tools.

---

## Step 2: Get Familiar with the Basics

Once inside Claude Code, you can talk to it like a conversation. Here are some things to try:

**Ask questions about the codebase:**
- "What does the ProjectCard component do?"
- "How does the Sanity data flow from schema to page?"
- "What tests exist in this project?"

**Run commands:**
- "Run the tests" (it will run `npm test`)
- "Run the build" (it will run `npm run build`)
- "Start the dev server" (it will run `npm run dev`)

**Make changes:**
- "Add a new tag filter to the projects page"
- "Fix the dark mode toggle so it remembers my preference"
- "Create a new Sanity schema for blog posts"

**Key tip:** Claude Code reads your `CLAUDE.md` file automatically. The better that file is, the better Claude Code understands your project. If you add new patterns or conventions, update `CLAUDE.md` to keep it in sync.

---

## Step 3: Set Up Your Sanity CMS

Before designing your portfolio, you need content to work with.

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project (the free plan works fine)
3. Copy your project ID from the Sanity dashboard
4. Update your `.env.local` file:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

5. Run `npm run dev` and go to `http://localhost:3000/studio`
6. Add 2-3 projects with titles, descriptions, and tags

You can ask Claude Code to help with any of this:
- "Help me set up my Sanity project"
- "Walk me through adding content in the Sanity Studio"

---

## Step 4: Design Your Portfolio

This is where it gets fun. Use the **design-concepts** skill to create a unique look for your portfolio.

In Claude Code, say:

> "I want to design my portfolio. Help me create a design concept."

Claude Code will walk you through a design process:
1. It will ask about your emotional targets (how should visitors feel?)
2. It will ask about inspiration (brands or spaces you admire)
3. It will create mood boards and multiple design concepts
4. You pick a direction, and it refines from there

The design concepts skill creates HTML mockups you can open in your browser to preview. See `docs/skills/design-concepts.md` for the full skill reference.

---

## Step 5: Learn Testing with TDD

This is the core of your Quality Engineering practice. The project comes with 43 unit tests and 13 e2e tests as examples.

### Start with the exercises

Open `TESTING.md` and work through the exercises in order. They progress from reading existing tests to writing your own to doing full TDD.

### Use the TDD skill

When you are ready to add a new feature, use test-driven development. In Claude Code, say:

> "Use TDD to implement a contact form component"

The TDD workflow is:
1. **RED** -- Write a test that fails (the feature does not exist yet)
2. **GREEN** -- Write the minimum code to make the test pass
3. **REFACTOR** -- Clean up while keeping tests green

Claude Code will guide you through each step. It will write the test first, run it to verify it fails, then write the implementation. See `docs/skills/test-driven-development.md` for the full reference.

### Use the quality engineering skill

When you want a broader view of your testing strategy, say:

> "Review this project and suggest a comprehensive testing strategy"

This skill helps you think about what to test and why -- prioritizing by risk, coverage gaps, and critical user paths. See `docs/skills/quality-engineering.md` for the full reference.

---

## Step 6: Debug Issues Systematically

When something breaks (and it will), use the **systematic debugging** skill. In Claude Code, say:

> "This test is failing: [paste the error]. Help me debug it systematically."

The debugging process follows four phases:
1. **Root Cause Investigation** -- Read errors carefully, reproduce the issue, check recent changes
2. **Pattern Analysis** -- Find working examples, compare against what is broken
3. **Hypothesis Testing** -- Form a theory, test with the smallest possible change
4. **Implementation** -- Fix the root cause (not the symptom), verify with tests

The key discipline: **never guess at fixes.** Always understand the root cause first. See `docs/skills/systematic-debugging.md` for the full reference.

---

## Step 7: Verify Before Claiming Done

Before committing code or claiming a feature is complete, always verify. In Claude Code, this means:

- Run `npm test` and confirm all tests pass
- Run `npm run build` and confirm the build succeeds
- Run `npm run test:e2e` if you changed anything user-facing

The **verification-before-completion** skill is about building the habit of evidence before claims. Do not say "it works" until you have seen the test output. See `docs/skills/verification-before-completion.md` for the reference.

---

## Step 8: Deploy to Vercel

When your portfolio is ready to share:

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Add your environment variables in Vercel project settings
4. Deploy
5. Add your Vercel URL to Sanity CORS origins at [sanity.io/manage](https://www.sanity.io/manage) > API > CORS Origins

You can ask Claude Code to help:
- "Help me deploy this to Vercel"
- "What environment variables do I need to set?"

---

## Quick Reference: Useful Claude Code Prompts

### Design
- "Create a design concept for my portfolio"
- "Show me 3 different design directions"
- "Create a mood board for [direction]"

### Building Features
- "Add a blog section with Sanity"
- "Create a contact form"
- "Add search to the projects page"
- "Make the navigation responsive"

### Testing
- "Write a unit test for [function/component]"
- "Use TDD to implement [feature]"
- "Write a Playwright test for [page/flow]"
- "Review my test coverage and suggest improvements"
- "This test is flaky -- help me fix it"

### Debugging
- "This error is happening: [paste error]. Debug it systematically."
- "The build is failing. Help me investigate."
- "This Playwright test passes locally but fails in CI"

### Understanding Code
- "Explain how the Sanity data flows from CMS to page"
- "What does the cn() utility do?"
- "Walk me through the dark mode implementation"

---

## Skills Reference

The `docs/skills/` directory contains the full skill files for reference. These describe the processes and frameworks that Claude Code uses when you invoke these skills:

| Skill | What It Does | When to Use |
|-------|-------------|-------------|
| `design-concepts.md` | Creates visual design concepts with mood boards | Designing your portfolio look and feel |
| `quality-engineering.md` | Testing strategy and prioritization | Planning what to test and why |
| `test-driven-development.md` | Red-green-refactor TDD workflow | Adding any new feature or fixing bugs |
| `brainstorming.md` | Collaborative idea refinement | Before building something new |
| `systematic-debugging.md` | Four-phase debugging framework | When something breaks |
| `verification-before-completion.md` | Evidence-based completion claims | Before committing or deploying |
| `testing-anti-patterns.md` | Common testing mistakes to avoid | When writing or reviewing tests |

---

## Tips for Getting the Most from Claude Code

1. **Be specific.** "Add a filter dropdown to the projects page that filters by tag" is better than "improve the projects page."

2. **Share context.** If you are working on a specific file or feature, mention it. Paste error messages in full.

3. **Use TDD.** Ask Claude Code to write the test first. This is the single most effective way to learn testing.

4. **Read the tests it writes.** Do not just accept tests blindly. Read each one and make sure you understand what it is checking and why.

5. **Iterate.** Start simple, get it working, then improve. Do not try to build everything at once.

6. **Ask "why" questions.** "Why did you mock next/link in that test?" teaches more than "write me a test."

7. **Keep CLAUDE.md updated.** As you add features, update the project context file so Claude Code stays accurate.
