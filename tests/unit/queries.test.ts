import { describe, it, expect } from "vitest";
import {
  projectsQuery,
  projectBySlugQuery,
  siteSettingsQuery,
  projectSlugsQuery,
} from "@/lib/sanity/queries";

// ─── GROQ Query Strings ────────────────────────────────────────────────────
//
// These tests verify that our GROQ query constants are defined and contain
// the expected filter/projection patterns. They do NOT execute queries
// against Sanity — that would be an integration test. Instead, they act as
// a safety net: if someone accidentally edits a query string, these tests
// will catch the breakage.
// ─────────────────────────────────────────────────────────────────────────────

describe("projectsQuery", () => {
  it("should be defined as a non-empty string", () => {
    expect(projectsQuery).toBeDefined();
    expect(typeof projectsQuery).toBe("string");
    expect(projectsQuery.length).toBeGreaterThan(0);
  });

  it('should filter by _type == "project"', () => {
    expect(projectsQuery).toContain('_type == "project"');
  });

  it("should order results by _createdAt descending", () => {
    expect(projectsQuery).toContain("order(_createdAt desc)");
  });

  it("should project the title, slug, description, image, tags, and url fields", () => {
    const expectedFields = ["title", "slug", "description", "image", "tags", "url"];
    for (const field of expectedFields) {
      expect(projectsQuery).toContain(field);
    }
  });
});

describe("projectBySlugQuery", () => {
  it("should be defined as a non-empty string", () => {
    expect(projectBySlugQuery).toBeDefined();
    expect(typeof projectBySlugQuery).toBe("string");
    expect(projectBySlugQuery.length).toBeGreaterThan(0);
  });

  it("should filter by slug.current == $slug", () => {
    expect(projectBySlugQuery).toContain("slug.current == $slug");
  });

  it('should filter by _type == "project"', () => {
    expect(projectBySlugQuery).toContain('_type == "project"');
  });

  it("should select only the first matching document with [0]", () => {
    expect(projectBySlugQuery).toContain("[0]");
  });

  it("should include the body field for full project detail", () => {
    expect(projectBySlugQuery).toContain("body");
  });
});

describe("siteSettingsQuery", () => {
  it("should be defined as a non-empty string", () => {
    expect(siteSettingsQuery).toBeDefined();
    expect(typeof siteSettingsQuery).toBe("string");
    expect(siteSettingsQuery.length).toBeGreaterThan(0);
  });

  it('should filter by _type == "siteSettings"', () => {
    expect(siteSettingsQuery).toContain('_type == "siteSettings"');
  });

  it("should select only the first document with [0]", () => {
    expect(siteSettingsQuery).toContain("[0]");
  });

  it("should project name, title, description, and socialLinks", () => {
    const expectedFields = ["name", "title", "description", "socialLinks"];
    for (const field of expectedFields) {
      expect(siteSettingsQuery).toContain(field);
    }
  });
});

describe("projectSlugsQuery", () => {
  it("should be defined as a non-empty string", () => {
    expect(projectSlugsQuery).toBeDefined();
    expect(typeof projectSlugsQuery).toBe("string");
    expect(projectSlugsQuery.length).toBeGreaterThan(0);
  });

  it('should filter by _type == "project"', () => {
    expect(projectSlugsQuery).toContain('_type == "project"');
  });

  it("should require slug.current to be defined", () => {
    expect(projectSlugsQuery).toContain("defined(slug.current)");
  });

  it("should return only the slug.current values", () => {
    expect(projectSlugsQuery).toContain("[].slug.current");
  });
});
