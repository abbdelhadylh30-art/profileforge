"use client";

import { Flame, Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Builder", href: "#builder" },
  { label: "Templates", href: "#templates", tab: "templates" },
] as const;

export function SiteNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const setEditorTab = useProfileStore((s) => s.setEditorTab);

  function handleNavClick(href: string, tab?: string) {
    if (tab) setEditorTab(tab);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex min-h-11 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="ProfileForge — back to top"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-emerald-400 shadow-lg shadow-fuchsia-500/25 transition-transform group-hover:scale-105">
            <Flame className="size-5 text-white" aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Profile
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent">
              Forge
            </span>
          </span>
        </button>

        {/* Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href, "tab" in link ? link.tab : undefined)}
              className="min-h-11 rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle onToggle={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} />
          <Button asChild variant="outline" className="min-h-11 gap-2 border-border/80">
            <a
              href="https://github.com/abbdelhadylh30-art/profileforge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ProfileForge on GitHub"
            >
              <Github className="size-4" aria-hidden />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

/** Hydration-safe theme toggle: icons swap via CSS `.dark` variants. */
function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11"
      aria-label="Toggle dark / light theme"
      onClick={onToggle}
    >
      <Sun className="size-5 dark:hidden" aria-hidden />
      <Moon className="hidden size-5 dark:block" aria-hidden />
    </Button>
  );
}
