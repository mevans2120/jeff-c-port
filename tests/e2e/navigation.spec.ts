import { test, expect } from "@playwright/test";

// ─── Navigation E2E Tests ──────────────────────────────────────────────────
//
// These tests verify that the site's navigation works correctly:
// clicking links loads the expected pages and the browser back button
// returns the user to where they came from.
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Navigation", () => {
  test("should navigate to the About page when clicking the About link", async ({
    page,
  }) => {
    await page.goto("/");

    // Click the About link in the header nav
    await page.locator("header nav").getByText("About").click();

    // The URL should update to /about
    await expect(page).toHaveURL(/\/about/);

    // The About page heading should be visible
    await expect(
      page.getByRole("heading", { name: "About" }),
    ).toBeVisible();
  });

  test("should navigate back to the homepage from the About page", async ({
    page,
  }) => {
    await page.goto("/about");

    // Click the Home link in the header nav
    await page.locator("header nav").getByText("Home").click();

    // The URL should be the root
    await expect(page).toHaveURL(/\/$/);

    // The hero heading with "Jeff" should be visible again
    await expect(page.locator("h1")).toContainText("Jeff");
  });

  test("should support browser back button navigation", async ({ page }) => {
    // Start on the homepage
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Jeff");

    // Navigate to About
    await page.locator("header nav").getByText("About").click();
    await expect(page).toHaveURL(/\/about/);

    // Press the browser back button
    await page.goBack();

    // We should be back on the homepage
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("h1")).toContainText("Jeff");
  });

  test("should navigate to the Projects page when clicking the Projects link", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator("header nav").getByText("Projects").click();

    await expect(page).toHaveURL(/\/projects/);
  });
});
