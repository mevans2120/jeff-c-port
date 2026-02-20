import { describe, it, expect } from "vitest";
import { cn, formatDate, slugify } from "@/lib/utils";

// ─── slugify() ──────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("should convert normal text to a URL-friendly slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should handle text with special characters", () => {
    expect(slugify("Hello, World! How's it going?")).toBe(
      "hello-world-hows-it-going",
    );
  });

  it("should collapse extra spaces into a single hyphen", () => {
    expect(slugify("too   many    spaces")).toBe("too-many-spaces");
  });

  it("should trim leading and trailing whitespace", () => {
    expect(slugify("  padded text  ")).toBe("padded-text");
  });

  it("should return an empty string when given an empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should convert underscores to hyphens", () => {
    expect(slugify("snake_case_text")).toBe("snake-case-text");
  });

  it("should strip leading and trailing hyphens caused by special chars", () => {
    expect(slugify("---hello---")).toBe("hello");
  });

  it("should handle a string that is already a valid slug", () => {
    expect(slugify("already-a-slug")).toBe("already-a-slug");
  });
});

// ─── formatDate() ───────────────────────────────────────────────────────────

describe("formatDate", () => {
  // NOTE: Date-only strings like "2024-01-15" are parsed as UTC midnight.
  // toLocaleDateString() then converts to the local timezone, which can
  // shift the displayed day backward (e.g. UTC midnight = previous evening
  // in US timezones). To avoid flaky tests, use full ISO timestamps that
  // include a time component, like "2024-01-15T12:00:00Z".

  it("should format an ISO date string into a readable US date", () => {
    expect(formatDate("2024-01-15T12:00:00Z")).toBe("January 15, 2024");
  });

  it("should handle a different date correctly", () => {
    expect(formatDate("2023-12-25T12:00:00Z")).toBe("December 25, 2023");
  });

  it("should return a string containing the year and month", () => {
    const result = formatDate("2024-06-01T14:30:00Z");
    expect(result).toContain("2024");
    expect(result).toContain("June");
  });

  it("should handle the first day of the year", () => {
    expect(formatDate("2025-01-01T12:00:00Z")).toBe("January 1, 2025");
  });
});

// ─── cn() ───────────────────────────────────────────────────────────────────

describe("cn", () => {
  it("should merge multiple class strings", () => {
    const result = cn("text-sm", "font-bold");
    expect(result).toBe("text-sm font-bold");
  });

  it("should handle conditional classes via clsx syntax", () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn("base", isActive && "active", isDisabled && "disabled");
    expect(result).toContain("base");
    expect(result).toContain("active");
    expect(result).not.toContain("disabled");
  });

  it("should resolve conflicting Tailwind classes using the last one", () => {
    // tailwind-merge should keep the last conflicting utility
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("should handle an empty call gracefully", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle undefined and null values without crashing", () => {
    const result = cn("base", undefined, null, "extra");
    expect(result).toBe("base extra");
  });

  it("should merge padding conflicts correctly", () => {
    const result = cn("px-4 py-2", "px-6");
    expect(result).toBe("py-2 px-6");
  });
});
