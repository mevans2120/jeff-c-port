# Testing Guide and Exercises

Welcome to the testing guide. This document will walk you through the testing tools in this project and give you hands-on exercises to build your skills, starting simple and increasing in difficulty.

---

## Why Testing Matters

When you write tests, you are creating a safety net. Tests verify that your code works the way you expect it to -- and more importantly, they catch problems when you change things later. A good test suite lets you refactor, add features, and fix bugs with confidence that you are not breaking something else.

As a Quality Engineer, testing is not just about finding bugs after the fact. It is about building quality into the development process from the start. That means thinking about what could go wrong, writing tests before or alongside your code, and using automation to catch regressions.

---

## What is QE?

**Quality Engineering (QE)** is a step beyond traditional QA. Where QA focuses on manual testing and bug reports, QE integrates testing into the development workflow:

- Writing automated tests (unit, component, end-to-end)
- Using test-driven development (TDD) to write tests before code
- Building CI/CD pipelines that run tests automatically
- Thinking about testability when designing features
- Using tools like Playwright and Vitest to create reliable, repeatable test suites

This project is your sandbox for practicing all of these skills.

---

## Testing Stack

This project uses three main testing tools. Here is what each one does and when to use it:

### Vitest (Unit and Component Tests)

[Vitest](https://vitest.dev/) is a fast test runner built for modern JavaScript. It works just like Jest (which you may have seen before) but is faster and integrates better with Vite-based projects.

**Use Vitest when you want to test:**
- Utility functions (does `slugify("Hello World")` return `"hello-world"`?)
- Component rendering (does a `ProjectCard` display the title you pass to it?)
- Data transformations (does your query builder return the right GROQ string?)

Test files live in: `tests/unit/`

### Playwright (End-to-End Tests)

[Playwright](https://playwright.dev/) controls a real browser and interacts with your running application just like a user would -- clicking links, filling forms, and verifying that pages look right.

**Use Playwright when you want to test:**
- Full user flows (can a user navigate from the homepage to a project page?)
- Page loading (does the about page load without errors?)
- Visual correctness (is the navigation visible? Does the dark mode toggle work?)

Test files live in: `tests/e2e/`

### Testing Library

[Testing Library](https://testing-library.com/) provides helper functions for testing React components. Instead of testing implementation details (like state values or CSS classes), it encourages you to test from the user's perspective -- finding elements by their text, role, or label.

Testing Library is used inside your Vitest tests when testing components.

---

## How to Run Tests

Here are all the testing commands available in this project:

```bash
# Unit and component tests (Vitest)
npm test                  # Run all tests once and exit
npm run test:watch        # Run tests in watch mode -- re-runs when you save a file
npm run test:coverage     # Run tests and show a coverage report (what % of code is tested)

# End-to-end tests (Playwright)
npm run test:e2e          # Run all e2e tests headlessly (no browser window)
npm run test:e2e:ui       # Run e2e tests with Playwright's interactive UI
```

**Tip:** When you are actively writing tests, use `npm run test:watch`. It will re-run your tests every time you save, giving you instant feedback.

**Tip:** When running Playwright for the first time, you may need to install browsers:
```bash
npx playwright install
```

---

## What is Already Tested

The project comes with a few example tests to show you the patterns. Here is what is covered and what is intentionally left for you to practice:

### Included Example Tests

| Test file | What it tests | Type |
|---|---|---|
| `tests/unit/utils.test.ts` | `cn()`, `formatDate()`, `slugify()` utilities (18 tests) | Unit |
| `tests/unit/queries.test.ts` | All GROQ query strings are correct (17 tests) | Unit |
| `tests/unit/project-card.test.tsx` | ProjectCard renders title, description, tags, links (8 tests) | Component |
| `tests/e2e/homepage.spec.ts` | Homepage loads, hero section, nav links visible | E2E |
| `tests/e2e/navigation.spec.ts` | Navigate between pages, back button works | E2E |
| `tests/e2e/dark-mode.spec.ts` | Dark mode toggle, system preference detection | E2E |

### Left as Exercises (for you to write)

| What to test | Suggested file | Type | Difficulty |
|---|---|---|---|
| About page loads and renders content | `tests/e2e/about.spec.ts` | E2E | Beginner |
| Header component renders nav links | `tests/unit/header.test.tsx` | Component | Beginner |
| Footer component renders copyright | `tests/unit/footer.test.tsx` | Component | Beginner |
| DarkModeToggle component (unit) | `tests/unit/dark-mode-toggle.test.tsx` | Component | Intermediate |
| Project detail page loads content | `tests/e2e/project-detail.spec.ts` | E2E | Intermediate |
| Contact form (TDD challenge) | `tests/unit/ContactForm.test.tsx` | Component | Advanced |
| Search feature (TDD challenge) | `tests/unit/search.test.tsx` | Component | Advanced |

---

## Exercises

Work through these in order. Each one builds on skills from the previous exercise. Take your time -- understanding why a test is written a certain way is more valuable than rushing through all of them.

### Exercise 1: Run the Existing Tests

**Goal:** Get comfortable running tests and reading their output.

1. Open your terminal and run:
   ```bash
   npm test
   ```
2. Read the output carefully. You should see passing tests with green checkmarks.
3. Now run:
   ```bash
   npm run test:e2e
   ```
4. Playwright will start a dev server, launch a browser behind the scenes, and run the e2e tests.

**What to notice:**
- Vitest runs instantly because it does not need a browser.
- Playwright is slower because it launches a real browser and loads actual pages.
- Both tools report which tests passed and which failed.

**Try this:** Open the test files and read through them. Start with `tests/unit/utils.test.ts` -- it tests three utility functions with a variety of edge cases. Then look at `tests/unit/project-card.test.tsx` to see how a React component is tested. Can you follow what each test is doing?

---

### Exercise 2: Study the Existing Unit Tests, Then Write Your Own

**Goal:** Learn from the existing test patterns, then write a new test from scratch.

Open `tests/unit/utils.test.ts` and read through it. Notice how `slugify()` is tested with 8 different scenarios -- normal text, special characters, extra spaces, empty strings, underscores, and more. This is how a QE thinks: not just "does it work with normal input?" but "what could go wrong?"

Now write your first test from scratch. Create `tests/unit/header.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("renders the site navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /home/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /projects/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /about/i })).toBeDefined();
  });

  // Challenge: What else should you test about the Header?
  // Hint: Does it have a dark mode toggle? What about the mobile menu?
});
```

Run with `npm run test:watch` to see results as you add cases.

---

### Exercise 3: Study and Extend the GROQ Query Tests

**Goal:** Practice testing data layer code and thinking about what matters.

Open `tests/unit/queries.test.ts` and read through it. It tests that each GROQ query string contains the right patterns -- correct document type filters, field projections, and sorting.

**Challenge:** Add a new Sanity schema (e.g., `blogPost`) by following the pattern in `CLAUDE.md` under "How to add a new Sanity schema." Then write query tests for it before you write the actual query. This is a mini TDD exercise.

---

### Exercise 4: Study the ProjectCard Tests, Then Test Another Component

**Goal:** Learn how component testing works by reading an example, then apply it.

Open `tests/unit/project-card.test.tsx` and study it. Notice:
- Mock data is created to match the `Project` type
- `next/link` is mocked so it renders as a plain `<a>` tag
- Both happy-path and edge cases (missing description, missing tags) are tested

Now write a component test for the `Footer` component. Create `tests/unit/footer.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("renders the copyright notice", () => {
    render(<Footer />);
    // What text should the footer contain?
    // Hint: Check src/components/Footer.tsx to see what it renders
  });

  // Challenge: What else could you test here?
});
```

**Tip:** The project includes a custom render helper in `tests/utils.tsx` that wraps components with application-level providers. You can import from there instead of `@testing-library/react` if you need provider context in the future.

---

### Exercise 5: Write an E2E Test for the About Page

**Goal:** Write your first Playwright test.

Playwright tests interact with the actual running application. Create `tests/e2e/about.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveURL(/.*about/);
  });

  test("displays the page heading", async ({ page }) => {
    await page.goto("/about");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("has a link back to the homepage", async ({ page }) => {
    await page.goto("/about");
    const homeLink = page.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeVisible();
  });
});
```

Run it with:
```bash
npm run test:e2e
```

**Key concepts:**
- `page.goto()` navigates to a URL (relative to your dev server).
- `page.getByRole()` finds elements the same way a screen reader would.
- `await expect(...).toBeVisible()` waits for the element to appear before checking.
- Playwright automatically waits and retries, so you do not need manual sleeps.

---

### Exercise 6: Write an E2E Test for Navigation

**Goal:** Test a multi-step user flow.

This test verifies that a user can navigate from the homepage to a specific project page. Create `tests/e2e/navigation.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Site navigation", () => {
  test("can navigate from homepage to a project", async ({ page }) => {
    // Start at the homepage
    await page.goto("/");
    await expect(page).toHaveURL("/");

    // Find and click the first project link
    const projectLink = page.getByRole("link").filter({ hasText: /project/i }).first();

    // Only proceed if there are project links on the page
    if (await projectLink.isVisible()) {
      await projectLink.click();

      // Verify we landed on a project detail page
      await expect(page).toHaveURL(/\/projects\/.+/);
    }
  });

  test("can navigate between main pages", async ({ page }) => {
    // Start at the homepage
    await page.goto("/");

    // Navigate to About
    const aboutLink = page.getByRole("link", { name: /about/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/.*about/);

    // Navigate back to Home
    const homeLink = page.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });
});
```

**Things to think about:**
- E2E tests depend on actual content. If there are no projects in Sanity, the project link test needs to handle that gracefully.
- The `filter()` and `first()` methods help you narrow down which element to interact with.

---

### Exercise 7: TDD Challenge -- Build a Contact Form

**Goal:** Practice test-driven development. Write the tests first, then build the component to make them pass.

TDD follows three steps:
1. **Red** -- Write a test that fails (because the code does not exist yet).
2. **Green** -- Write the minimum code to make the test pass.
3. **Refactor** -- Clean up the code while keeping the test green.

Start by creating `tests/unit/ContactForm.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders name, email, and message fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/message/i)).toBeDefined();
  });

  it("renders a submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send/i })).toBeDefined();
  });

  it("shows validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    // Expect some kind of validation feedback
    expect(screen.getByText(/required/i)).toBeDefined();
  });
});
```

Now run `npm test` -- the tests will fail because `ContactForm` does not exist yet. That is expected. Now ask Claude Code:

> "Help me create a ContactForm component in src/components/ContactForm.tsx that makes these tests pass."

This is the TDD workflow: the tests define the behavior you want, and you write code to satisfy them.

---

### Exercise 8: Explore Code Coverage

**Goal:** Learn to use coverage reports to find untested code.

Run the coverage report:
```bash
npm run test:coverage
```

This generates a report showing what percentage of your code is covered by tests. Look for:
- **Statements**: How many lines of code ran during tests.
- **Branches**: How many if/else paths were tested.
- **Functions**: How many functions were called during tests.
- **Lines**: Line-by-line breakdown.

**What to do with the report:**
1. Look for files with low coverage.
2. Identify which functions or branches are not tested.
3. Write tests to cover the gaps.
4. Run coverage again to see the numbers improve.

Coverage is not about hitting 100% -- it is about making sure the important paths through your code are verified.

---

### Exercise 9: Get a Full Testing Strategy

**Goal:** Use Claude Code's quality engineering perspective to think about testing at a higher level.

Ask Claude Code:

> "Review this project and suggest a comprehensive testing strategy. What should be tested at each level (unit, component, e2e)? What are the highest-risk areas? Where would you add tests first?"

This exercise is about stepping back from individual tests and thinking about the big picture:
- Which parts of the application are most likely to break?
- Which tests give you the most confidence for the least effort?
- How do unit, component, and e2e tests complement each other?

A good testing strategy is not "test everything" -- it is "test the right things at the right level."

---

## Tips for Using Claude Code for Testing

Claude Code can help you write, debug, and improve tests. Here are some prompts to try:

**Writing new tests:**
- "Write a Vitest unit test for the slugify function in src/lib/utils.ts"
- "Write a Playwright test that checks the dark mode toggle works"
- "What edge cases should I test for the formatDate function?"

**Using TDD:**
- "Use TDD to implement a ProjectGrid component -- write the test first"
- "I want to add a search feature. Help me write the tests first, then implement it."

**Improving existing tests:**
- "Review my test file at tests/unit/utils.test.ts -- what am I missing?"
- "This test is flaky. Can you help me figure out why?"
- "How can I make this Playwright test more resilient?"

**Understanding test output:**
- "My test is failing with this error: [paste error]. What does it mean?"
- "What does this coverage report tell me? [paste report]"

**General quality guidance:**
- "What should I test next in this project?"
- "Is this component testable? How would you refactor it for better testability?"

---

## Key Testing Concepts (Quick Reference)

| Term | What it means |
|---|---|
| **Unit test** | Tests a single function or small piece of logic in isolation |
| **Component test** | Tests that a React component renders correctly given certain props |
| **E2E test** | Tests a full user workflow by controlling a real browser |
| **Mock** | A fake version of something (like fake data or a fake API response) used in tests |
| **Assertion** | A check that a value matches what you expect (e.g., `expect(result).toBe("hello")`) |
| **Test suite** | A group of related tests (a `describe()` block) |
| **Test case** | A single test (an `it()` or `test()` block) |
| **Coverage** | A measure of how much of your code runs during tests |
| **TDD** | Writing tests before writing the code they test |
| **Fixture** | Pre-set data or state used by tests (like Playwright's `page` object) |
| **Flaky test** | A test that sometimes passes and sometimes fails without code changes |
| **Regression** | A bug introduced by a code change that breaks something that used to work |

---

## Resources

- **Vitest Documentation**: [https://vitest.dev/](https://vitest.dev/)
- **Playwright Documentation**: [https://playwright.dev/](https://playwright.dev/)
- **Testing Library Documentation**: [https://testing-library.com/](https://testing-library.com/)
- **Testing Library React**: [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
- **Playwright Best Practices**: [https://playwright.dev/docs/best-practices](https://playwright.dev/docs/best-practices)
- **Kent C. Dodds -- Write Tests, Not Too Many, Mostly Integration**: [https://kentcdodds.com/blog/write-tests](https://kentcdodds.com/blog/write-tests)
