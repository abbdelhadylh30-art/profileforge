"use client";

import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";
import { TECH_CATEGORIES } from "@/lib/tech-catalog";
import { cn } from "@/lib/utils";

export function TechStackTab() {
  const selected = useProfileStore((s) => s.config.tech);
  const toggleTech = useProfileStore((s) => s.toggleTech);
  const clearTech = useProfileStore((s) => s.clearTech);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{selected.length}</span>{" "}
          {selected.length === 1 ? "badge" : "badges"} selected — tap to toggle
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="min-h-9 gap-1.5 text-muted-foreground hover:text-destructive"
          onClick={clearTech}
          disabled={selected.length === 0}
          aria-label="Clear all selected tech badges"
        >
          <Eraser className="size-4" aria-hidden />
          Clear
        </Button>
      </div>

      <div className="pf-scroll max-h-96 overflow-y-auto pr-1">
        <div className="grid gap-5">
          {TECH_CATEGORIES.map((category) => (
            <fieldset key={category.id} className="grid gap-2.5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {category.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const active = selected.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={active}
                      aria-label={`${active ? "Remove" : "Add"} ${item.name} badge`}
                      onClick={() => toggleTech(item.name)}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/25"
                          : "border-border bg-card text-foreground/80 hover:border-violet-400/50 hover:bg-accent"
                      )}
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: `#${item.color}` }}
                        aria-hidden
                      />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
}
