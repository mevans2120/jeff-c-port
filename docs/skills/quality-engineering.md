---
name: quality-engineering
description: Comprehensive testing strategy, implementation, and analysis. Use when user says "write tests", "test strategy", "test coverage", "unit tests", "integration tests", "e2e tests", "end to end tests", "Playwright tests", "Jest tests", "Vitest", "test plan", "coverage report", "flaky tests", "debug failing tests", "testing best practices", or "QA". Covers unit, integration, and end-to-end testing with prioritized coverage improvements based on risk, coverage gaps, and critical user paths. Do NOT use when reviewing visual design implementation (use design-qa) or designing system architecture (use technical-architecture).
---

# Quality Engineering Skill

Testing strategy, prioritization, and analysis. Use this skill for deciding **what** to test and **why** — the `testing` agent handles the execution.

## When to Use This Skill

- Develop testing strategy for a project
- Analyze test coverage and identify gaps
- Prioritize testing efforts based on risk
- Plan test improvements across sprints
- Establish testing best practices for a codebase

## Test Pyramid

```
        /\
       /E2E\          <- Few (slow, expensive, brittle)
      /------\
     /INTEG  \        <- Some (moderate speed, moderate cost)
    /--------\
   /   UNIT   \       <- Many (fast, cheap, reliable)
  /------------\
```

## Test Quality Attributes (FIRST)

- **Fast:** Run quickly to enable rapid feedback
- **Isolated:** Don't depend on other tests
- **Repeatable:** Same result every time
- **Self-validating:** Clear pass/fail without manual inspection
- **Timely:** Written close to when code is written

## When to Write Each Test Type

### Unit Tests
- All business logic and utility functions
- Data transformations and component logic
- Tools: Jest, Vitest, React Testing Library, pytest

### Integration Tests
- API endpoints and database operations
- Complex component interactions
- Third-party service integrations
- Tools: Supertest, Next.js route testing, Testing Library with real data

### E2E Tests
- Critical user journeys (auth, core workflows, data submission)
- Multi-step business processes
- Tools: Playwright (preferred), Cypress

## Test Prioritization Framework

### 1. Risk-Based Prioritization

**High Risk (Test First):**
- User authentication/authorization
- Data modification operations
- Critical business logic
- Areas with history of bugs

**Medium Risk:**
- Data validation, user workflows
- Third-party integrations
- Configuration logic

**Low Risk:**
- Static content rendering
- Simple presentational components

### 2. Coverage Gap Analysis

```
Impact vs. Coverage

High Impact | Test Now     | Monitor
            | (gaps here)  | (covered)
            |-----------------------------
Low Impact  | Plan         | Skip
            | (gaps here)  | (covered)
              Low Coverage   High Coverage
```

1. **Test Now:** High impact + low coverage
2. **Monitor:** High impact + high coverage (maintain)
3. **Plan:** Low impact + low coverage (queue for later)
4. **Skip:** Low impact + high coverage (already good)

### 3. Critical User Paths

For each critical path:
- Write at least one E2E test
- Ensure unit tests for each step
- Test happy path and error scenarios

### 4. Change Frequency

- Comprehensive testing in high-change areas
- Lighter testing in stable areas
- Always add tests before refactoring

## Mocking Strategy

**Mock:** External API calls, database ops (in unit tests), file system, time-dependent operations

**Don't mock:** In integration tests, simple utilities, pure functions, within the same module

## Test Data Management

Use **factories** for creating test data with sensible defaults and overrides. Use **fixtures** for static reference data. Always clean up test data after execution.

## Coverage Goals

- Overall: 80%+
- Critical paths: 100%
- Utilities: 100%
- UI Components: 70%+ (focus on logic, not rendering)

## Debugging Failing Tests

1. **Understand:** Read error message, check which assertion failed
2. **Reproduce:** Run specific test locally, use `--debug` for E2E
3. **Isolate:** Flaky? Consistent? CI-only or local too?
4. **Common causes:** Missing `await`, state pollution between tests, environment differences, race conditions, stale fixtures/mocks

## Developing a Test Strategy

1. **Assess current state:** What exists? What's covered? Where are gaps?
2. **Define testing levels:** Unit scope, integration approach, E2E critical paths
3. **Prioritize:** Critical paths first, high-risk areas second, coverage gaps third
4. **Establish guidelines:** When to use unit vs integration vs E2E, file organization, naming conventions, mocking strategy

## Quality Criteria

Testing is complete when:
- Critical paths have E2E tests
- High-risk areas have comprehensive unit tests
- Coverage meets defined goals
- All tests pass consistently
- No known flaky tests
- Tests are maintainable and readable

## Notes

- Testing is iterative — start with critical paths, expand over time
- Flaky tests are worse than no tests — fix or remove them
- Tests are documentation — make them readable
- Don't chase 100% coverage — focus on valuable tests
- Good tests enable confident refactoring
