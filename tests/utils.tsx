import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";

/**
 * Add any global providers here (theme, state, etc.)
 * For now this is a passthrough — extend as the app grows.
 */
function AllProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * Custom render that wraps the component under test with all
 * application-level providers. Use this instead of the raw
 * `render` from @testing-library/react.
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything from testing-library so tests only need
// one import source.
export * from "@testing-library/react";
export { customRender as render };
