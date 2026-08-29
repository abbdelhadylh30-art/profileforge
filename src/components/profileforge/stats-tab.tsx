"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useProfileStore } from "@/lib/store";
import type { StatsTheme } from "@/lib/types";

const THEMES: { value: StatsTheme; label: string }[] = [
  { value: "radical", label: "Radical" },
  { value: "dark", label: "Dark" },
  { value: "tokyonight", label: "Tokyo Night" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "dracula", label: "Dracula" },
  { value: "onedark", label: "One Dark" },
  { value: "synthwave", label: "Synthwave" },
  { value: "merko", label: "Merko" },
  { value: "prism", label: "Prism" },
  { value: "ghost", label: "Ghost" },
];

const TOGGLES = [
  { key: "showStatsCard", label: "Stats card", hint: "github-readme-stats" },
  { key: "showStreak", label: "Streak stats", hint: "streak-stats.demolab.com" },
  { key: "showTopLanguages", label: "Top languages", hint: "layout=compact" },
  { key: "showTrophies", label: "Profile trophy", hint: "github-profile-trophy" },
  { key: "showActivityGraph", label: "Activity graph", hint: "github-readme-activity-graph" },
] as const;

export function StatsTab() {
  const stats = useProfileStore((s) => s.config.stats);
  const updateStats = useProfileStore((s) => s.updateStats);

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="gh-username">GitHub username</Label>
        <Input
          id="gh-username"
          placeholder="octocat"
          value={stats.username}
          onChange={(e) => updateStats({ username: e.target.value })}
          className="min-h-11"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="stats-theme">Theme</Label>
        <Select
          value={stats.theme}
          onValueChange={(value) => updateStats({ theme: value as StatsTheme })}
        >
          <SelectTrigger id="stats-theme" className="min-h-11 w-full">
            <SelectValue placeholder="Pick a theme" />
          </SelectTrigger>
          <SelectContent>
            {THEMES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Embeds
        </legend>
        {TOGGLES.map((toggle) => (
          <div
            key={toggle.key}
            className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/50 px-3"
          >
            <div className="min-w-0">
              <Label
                htmlFor={`stats-${toggle.key}`}
                className="cursor-pointer text-sm font-medium"
              >
                {toggle.label}
              </Label>
              <p className="truncate text-xs text-muted-foreground">{toggle.hint}</p>
            </div>
            <Switch
              id={`stats-${toggle.key}`}
              checked={stats[toggle.key]}
              onCheckedChange={(checked) => updateStats({ [toggle.key]: checked })}
              aria-label={`${toggle.label} embed`}
            />
          </div>
        ))}
      </fieldset>
    </div>
  );
}
