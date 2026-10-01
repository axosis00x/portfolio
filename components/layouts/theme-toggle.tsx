"use client";

import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const applyTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // swww-style "grow" transition: the new theme expands as a circle from the toggle.
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(nextTheme);
      return;
    }

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // The reveal itself is a CSS animation (globals.css) so the very first frame
    // is already clipped; starting it from JS after `ready` flashes a full frame.
    const root = document.documentElement;
    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-r", `${radius}px`);
    root.classList.add("theme-transitioning");

    const transition = document.startViewTransition(() => {
      flushSync(() => applyTheme(nextTheme));
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-transitioning");
      root.style.removeProperty("--reveal-x");
      root.style.removeProperty("--reveal-y");
      root.style.removeProperty("--reveal-r");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-800 dark:text-[#e4e4e4] transition-colors duration-200 cursor-pointer"
      aria-label="Toggle Theme"
      suppressHydrationWarning
    >
      {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default Theme;
