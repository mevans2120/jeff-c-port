import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../utils";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/sanity/types";

// ─── Mock next/link ─────────────────────────────────────────────────────────
// In a Vitest + jsdom environment there is no Next.js router, so we replace
// next/link with a plain <a> tag that preserves the href for assertions.
// ─────────────────────────────────────────────────────────────────────────────
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// ─── Test Data ──────────────────────────────────────────────────────────────

/** A fully populated project for the "happy path" tests. */
const fullProject: Project = {
  _id: "project-1",
  _type: "project",
  title: "My Awesome Project",
  slug: { current: "my-awesome-project" },
  description: "A brief description of the project.",
  tags: ["React", "TypeScript", "Tailwind"],
};

/** A minimal project with only the required fields — no description, no tags. */
const minimalProject: Project = {
  _id: "project-2",
  _type: "project",
  title: "Minimal Project",
  slug: { current: "minimal-project" },
};

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("ProjectCard", () => {
  it("should render the project title", () => {
    render(<ProjectCard project={fullProject} />);

    expect(screen.getByText("My Awesome Project")).toBeInTheDocument();
  });

  it("should render the project description when provided", () => {
    render(<ProjectCard project={fullProject} />);

    expect(
      screen.getByText("A brief description of the project."),
    ).toBeInTheDocument();
  });

  it("should render all tags when provided", () => {
    render(<ProjectCard project={fullProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("should link to the correct /projects/[slug] URL", () => {
    render(<ProjectCard project={fullProject} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/my-awesome-project");
  });

  it("should display a 'View project' call-to-action", () => {
    render(<ProjectCard project={fullProject} />);

    expect(screen.getByText("View project")).toBeInTheDocument();
  });

  it("should handle a project with no description gracefully", () => {
    render(<ProjectCard project={minimalProject} />);

    // The title should still render
    expect(screen.getByText("Minimal Project")).toBeInTheDocument();

    // There should be no description paragraph
    // (We verify nothing blew up and the title is there)
    expect(
      screen.queryByText("A brief description of the project."),
    ).not.toBeInTheDocument();
  });

  it("should handle a project with no tags gracefully", () => {
    render(<ProjectCard project={minimalProject} />);

    // The card renders without crashing; no tag elements in the DOM.
    // The only rendered text elements should be title + "View project"
    expect(screen.getByText("Minimal Project")).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("should render a project with an empty tags array without crashing", () => {
    const projectWithEmptyTags: Project = {
      ...fullProject,
      _id: "project-3",
      tags: [],
    };

    render(<ProjectCard project={projectWithEmptyTags} />);

    expect(screen.getByText("My Awesome Project")).toBeInTheDocument();
  });
});
