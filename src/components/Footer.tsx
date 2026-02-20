export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200 dark:border-surface-800">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-8">
        <p className="text-sm text-surface-500 dark:text-surface-400">
          &copy; {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
