import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import {
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(projectSlugsQuery);
    if (!slugs) return [];
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Sanity may be unreachable (e.g. placeholder credentials)
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await client.fetch<Project | null>(projectBySlugQuery, {
      slug,
    });
    if (!project) return { title: "Project not found" };
    return {
      title: project.title,
      description: project.description ?? "",
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  let project: Project | null = null;
  try {
    project = await client.fetch<Project | null>(projectBySlugQuery, {
      slug,
    });
  } catch {
    // Sanity may be unreachable (e.g. placeholder credentials)
  }

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
      {/* Back link */}
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          "text-surface-500 hover:text-surface-900",
          "dark:text-surface-400 dark:hover:text-surface-50",
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>

      {/* Title */}
      <h1
        className={cn(
          "mt-8 text-3xl font-bold tracking-tight md:text-4xl",
          "text-surface-900 dark:text-surface-50",
        )}
      >
        {project.title}
      </h1>

      {/* Tags */}
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

      {/* Description */}
      {project.description && (
        <p className="mt-6 text-lg leading-relaxed text-surface-600 dark:text-surface-400">
          {project.description}
        </p>
      )}

      {/* External link */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 text-sm font-medium",
            "text-accent-600 hover:text-accent-700",
            "dark:text-accent-400 dark:hover:text-accent-300",
          )}
        >
          Visit project
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      )}

      {/* Body / rich text */}
      {project.body && project.body.length > 0 && (
        <div
          className={cn(
            "prose mt-12 max-w-none",
            "prose-headings:text-surface-900 prose-p:text-surface-700 prose-a:text-accent-600",
            "dark:prose-headings:text-surface-50 dark:prose-p:text-surface-300 dark:prose-a:text-accent-400",
          )}
        >
          <PortableText value={project.body} />
        </div>
      )}
    </article>
  );
}
