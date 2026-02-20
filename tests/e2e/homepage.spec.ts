import { test, expect } from "@playwright/test";

// ─── Homepage E2E Tests ────────────────────────────────────────────────────
//
// These tests verify the homepage loads and displays the expected content.
// They require a running dev server (Playwright starts one automatically
// via the webServer config in playwright.config.ts).
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Homepage", () => {
  test("should load the homepage successfully", async ({ page }) => {
    const response = await page.goto("/");

    // The server should return a 200 status
    expect(response?.status()).toBe(200);
  });

  test("should display the hero section with name and tagline", async ({
    page,
  }) => {
    await page.goto("/");

    // The hero heading should contain Jeff's name
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Jeff");

    // The tagline paragraph should be visible beneath the heading
    const tagline = page.locator("h1 + p");
    await expect(tagline).toBeVisible();
    await expect(tagline).toContainText("Designer");
  });

  test("should display the Projects section heading", async ({ page }) => {
    await page.goto("/");

    const projectsHeading = page.getByRole("heading", { name: "Projects" });
    await expect(projectsHeading).toBeVisible();
  });

  test("should have navigation links for Home, Projects, and About", async ({
    page,
  }) => {
    await page.goto("/");

    // The desktop nav should contain all three links
    const nav = page.locator("header nav");
    await expect(nav.getByText("Home")).toBeVisible();
    await expect(nav.getByText("Projects")).toBeVisible();
    await expect(nav.getByText("About")).toBeVisible();
  });

  test("should have the Portfolio logo/site name in the header", async ({
    page,
  }) => {
    await page.goto("/");

    const logo = page.locator("header").getByText("Portfolio");
    await expect(logo).toBeVisible();
  });
});
