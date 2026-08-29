"use client";

import { Flame, Star } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-emerald-400">
            <Flame className="size-4 text-white" aria-hidden />
          </span>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Built with <span className="text-fuchsia-500">♥</span> by developers,
            for developers — ProfileForge is open source under{" "}
            <a
              href="https://github.com/abbdelhadylh30-art/profileforge/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              MIT
            </a>
          </p>
        </div>

        <a
          href="https://github.com/abbdelhadylh30-art/profileforge"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/80 bg-background px-4 text-sm font-medium transition-colors hover:border-violet-400/50 hover:bg-accent"
        >
          <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
          Leave a ⭐ on GitHub
        </a>
      </div>
    </footer>
  );
}
