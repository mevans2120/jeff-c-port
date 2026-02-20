"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DarkModeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Initialize from the document class or system preference
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (!document.documentElement.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    // Persist preference
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage may be unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-2",
        "text-surface-600 hover:text-surface-900 hover:bg-surface-100",
        "dark:text-surface-400 dark:hover:text-surface-50 dark:hover:bg-surface-800",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
        className,
      )}
    >
      {/* Sun icon — shown in dark mode */}
      <svg
        className={cn("h-5 w-5", dark ? "block" : "hidden")}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
      {/* Moon icon — shown in light mode */}
      <svg
        className={cn("h-5 w-5", dark ? "hidden" : "block")}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </button>
  );
}
