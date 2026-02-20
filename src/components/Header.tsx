"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "./DarkModeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b",
        "border-surface-200 bg-surface-50/80 backdrop-blur-md",
        "dark:border-surface-800 dark:bg-surface-950/80",
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo / site name */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-surface-900 dark:text-surface-50"
        >
          Portfolio
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium",
                "text-surface-600 hover:text-surface-900 hover:bg-surface-100",
                "dark:text-surface-400 dark:hover:text-surface-50 dark:hover:bg-surface-800",
              )}
            >
              {link.label}
            </Link>
          ))}
          <DarkModeToggle className="ml-2" />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2",
              "text-surface-600 hover:text-surface-900 hover:bg-surface-100",
              "dark:text-surface-400 dark:hover:text-surface-50 dark:hover:bg-surface-800",
            )}
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-surface-200 px-6 pb-4 pt-2 dark:border-surface-800 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium",
                    "text-surface-600 hover:text-surface-900 hover:bg-surface-100",
                    "dark:text-surface-400 dark:hover:text-surface-50 dark:hover:bg-surface-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
