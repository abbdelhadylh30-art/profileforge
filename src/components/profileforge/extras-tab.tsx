"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useProfileStore } from "@/lib/store";

const EXTRAS = [
  { key: "showProfileViews", label: "Profile views counter", hint: "komarev.com badge" },
  { key: "showSnake", label: "Snake animation", hint: "Platane/snk contribution snake" },
  { key: "showQuote", label: "Random dev quote", hint: "quotes-github-readme" },
  { key: "showSponsor", label: "Sponsor button", hint: "github.com/sponsors" },
  { key: "showBlogBadge", label: "Latest blog badge", hint: "link to your blog" },
] as const;

export function ExtrasTab() {
  const extras = useProfileStore((s) => s.config.extras);
  const updateExtras = useProfileStore((s) => s.updateExtras);

  return (
    <div className="grid gap-5">
      <fieldset className="grid gap-3">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Fun additions
        </legend>
        {EXTRAS.map((extra) => (
          <div
            key={extra.key}
            className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/50 px-3"
          >
            <div className="min-w-0">
              <Label
                htmlFor={`extra-${extra.key}`}
                className="cursor-pointer text-sm font-medium"
              >
                {extra.label}
              </Label>
              <p className="truncate text-xs text-muted-foreground">{extra.hint}</p>
            </div>
            <Switch
              id={`extra-${extra.key}`}
              checked={extras[extra.key]}
              onCheckedChange={(checked) => updateExtras({ [extra.key]: checked })}
              aria-label={extra.label}
            />
          </div>
        ))}
      </fieldset>

      {extras.showBlogBadge && (
        <div className="grid gap-2">
          <Label htmlFor="blog-url">Blog URL</Label>
          <Input
            id="blog-url"
            placeholder="blog.yoursite.dev"
            value={extras.blogUrl}
            onChange={(e) => updateExtras({ blogUrl: e.target.value })}
            className="min-h-11"
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
