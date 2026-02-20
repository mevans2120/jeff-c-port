import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await client.fetch<Project[]>(projectsQuery);
  } catch {
    // Sanity may be unreachable (e.g. placeholder credentials)
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 md:pt-24">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          "text-surface-900 dark:text-surface-50",
        )}
      >
        Projects
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-surface-600 dark:text-surface-400">
        A collection of selected work. Click any project to learn more.
      </p>

      {projects && projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "mt-10 rounded-xl border border-dashed p-12 text-center",
            "border-surface-300 dark:border-surface-700",
          )}
        >
          <p className="text-sm text-surface-500 dark:text-surface-400">
            No projects yet. Add your first project in the{" "}
            <a
              href="/studio"
              className="font-medium text-accent-600 underline underline-offset-4 dark:text-accent-400"
            >
              Sanity Studio
            </a>
            .
          </p>
        </div>
      )}
    </section>
  );
}
