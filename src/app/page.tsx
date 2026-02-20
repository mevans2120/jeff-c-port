import { client } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  let projects: Project[] = [];
  try {
    projects = await client.fetch<Project[]>(projectsQuery);
  } catch {
    // Sanity may be unreachable (e.g. placeholder credentials)
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <h1
          className={cn(
            "text-4xl font-bold tracking-tight md:text-5xl",
            "text-surface-900 dark:text-surface-50",
          )}
        >
          Hey, I&rsquo;m{" "}
          <span className="text-accent-600 dark:text-accent-400">Jeff</span>.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-surface-600 dark:text-surface-400">
          Designer &amp; developer crafting thoughtful digital experiences. Take
          a look at my recent work below.
        </p>
      </section>

      {/* ── Projects grid ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2
          className={cn(
            "text-2xl font-semibold tracking-tight",
            "text-surface-900 dark:text-surface-50",
          )}
        >
          Projects
        </h2>

        {projects && projects.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "mt-8 rounded-xl border border-dashed p-12 text-center",
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
    </>
  );
}
