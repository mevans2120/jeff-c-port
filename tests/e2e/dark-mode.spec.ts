import { test, expect } from "@playwright/test";

// ─── Dark Mode E2E Tests ───────────────────────────────────────────────────
//
// These tests verify the dark mode toggle works:
// - The toggle button is present and clickable
// - Clicking it adds/removes the "dark" class on the <html> element
// - System preference (prefers-color-scheme) is respected on first load
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Dark Mode", () => {
  test("should start in light mode when system preference is light", async ({
    page,
  }) => {
    // Emulate light color scheme before navigating
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    // The <html> element should NOT have the "dark" class
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).not.toContain("dark");
  });

  test("should start in dark mode when system preference is dark", async ({
    page,
  }) => {
    // Emulate dark color scheme before navigating
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    // Wait for the DarkModeToggle useEffect to run and apply the class
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("should toggle dark mode on when clicking the toggle button", async ({
    page,
  }) => {
    // Start with light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    // Confirm we start without "dark" class
    const htmlBefore = await page.locator("html").getAttribute("class");
    expect(htmlBefore).not.toContain("dark");

    // Click the dark mode toggle button (identified by its aria-label)
    const toggleButton = page.getByRole("button", {
      name: "Switch to dark mode",
    });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // The <html> element should now have the "dark" class
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("should toggle back to light mode on a second click", async ({
    page,
  }) => {
    // Start with light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    // First click: enable dark mode
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Second click: disable dark mode (the label changes when dark is active)
    await page.getByRole("button", { name: "Switch to light mode" }).click();

    // The "dark" class should be removed
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).not.toContain("dark");
  });
});
