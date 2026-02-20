import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/sanity/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className={cn(
        "group flex flex-col rounded-xl border p-5",
        "border-surface-200 bg-white",
        "dark:border-surface-800 dark:bg-surface-900",
        "hover:border-accent-300 hover:shadow-sm",
        "dark:hover:border-accent-700",
        "transition-all duration-200",
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold leading-snug",
          "text-surface-900 group-hover:text-accent-600",
          "dark:text-surface-50 dark:group-hover:text-accent-400",
        )}
      >
        {project.title}
      </h3>

      {project.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
          {project.description}
        </p>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                "bg-surface-100 text-surface-600",
                "dark:bg-surface-800 dark:text-surface-400",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span
        className={cn(
          "mt-4 inline-flex items-center gap-1 text-sm font-medium",
          "text-accent-600 dark:text-accent-400",
        )}
      >
        View project
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </Link>
  );
}
