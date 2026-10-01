"use client";

import { useEffect, useState } from "react";

const BLOCKS = 12;
const BLOCK_STEP_MS = 70;
// Time for every block to fill (see .loader-block in globals.css).
const FILL_MS = BLOCKS * BLOCK_STEP_MS + 120;
const LEAVE_MS = 350;

export default function Loading({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-white text-black dark:bg-[#080808] dark:text-[#e4e4e4] ${className}`}
    >
      <span className="sr-only">Loading portfolio</span>

      <div className="flex flex-col items-center gap-4 select-none" aria-hidden="true">
        <span
          style={{ fontFamily: "'Tiny5', sans-serif" }}
          className="text-3xl tracking-wide text-black dark:text-[#eeeeee]"
        >
          axosis
          <span className="loader-cursor text-(--accent-brand)">_</span>
        </span>

        <div className="flex gap-[3px]">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span
              key={i}
              className="loader-block size-[6px] bg-(--accent-brand)"
              style={{ animationDelay: `${i * BLOCK_STEP_MS}ms` }}
            />
          ))}
        </div>

        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-500 dark:text-[#949494]">
          loading
        </span>
      </div>
    </div>
  );
}

// Splash on every full page load. Rendered from layout.tsx so it is part of the
// server HTML and covers the page from the first paint; client-side navigation
// keeps the layout mounted, so it doesn't replay between pages.
export function IntroLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const blocksFilled = new Promise<void>((resolve) => setTimeout(resolve, FILL_MS));

    let leaveTimer: ReturnType<typeof setTimeout>;
    Promise.all([pageLoaded, blocksFilled]).then(() => {
      setPhase("leaving");
      leaveTimer = setTimeout(() => setPhase("done"), LEAVE_MS);
    });

    return () => clearTimeout(leaveTimer);
  }, []);

  if (phase === "done") return null;

  return <Loading className={phase === "leaving" ? "loader-leave" : ""} />;
}
