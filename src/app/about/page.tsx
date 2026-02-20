import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  let settings: SiteSettings | null = null;
  try {
    settings = await client.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch {
    // Sanity may be unreachable (e.g. placeholder credentials)
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          "text-surface-900 dark:text-surface-50",
        )}
      >
        About
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-surface-700 dark:text-surface-300">
        {settings?.description ? (
          <p>{settings.description}</p>
        ) : (
          <>
            <p>
              Welcome! I&rsquo;m a designer and developer who loves building
              polished, accessible digital products. I focus on clean interfaces,
              thoughtful interactions, and performance.
            </p>
            <p>
              This portfolio is powered by Next.js and Sanity CMS. Head over to
              the{" "}
              <a
                href="/studio"
                className="font-medium text-accent-600 underline underline-offset-4 dark:text-accent-400"
              >
                Sanity Studio
              </a>{" "}
              to customize the site settings and add your own bio.
            </p>
          </>
        )}
      </div>

      {/* Social links from Sanity */}
      {settings?.socialLinks && settings.socialLinks.length > 0 && (
        <div className="mt-12">
          <h2
            className={cn(
              "text-lg font-semibold",
              "text-surface-900 dark:text-surface-50",
            )}
          >
            Connect
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            {settings.socialLinks.map((link) => (
              <li key={link._key}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium",
                    "border-surface-200 text-surface-700 hover:border-accent-300 hover:text-accent-600",
                    "dark:border-surface-700 dark:text-surface-300 dark:hover:border-accent-600 dark:hover:text-accent-400",
                    "transition-colors duration-200",
                  )}
                >
                  {link.platform}
                  <svg
                    className="h-3.5 w-3.5"
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
