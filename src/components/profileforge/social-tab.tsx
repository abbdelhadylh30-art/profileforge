"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";

const FIELDS = [
  { key: "github", label: "GitHub", placeholder: "github.com/octocat" },
  { key: "twitter", label: "X / Twitter", placeholder: "x.com/handle" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/handle" },
  { key: "devto", label: "Dev.to", placeholder: "dev.to/handle" },
  { key: "medium", label: "Medium", placeholder: "medium.com/@handle" },
  { key: "youtube", label: "YouTube", placeholder: "youtube.com/@channel" },
  { key: "discord", label: "Discord user ID", placeholder: "1234567890" },
  { key: "email", label: "Email", placeholder: "hi@example.dev" },
  { key: "website", label: "Website", placeholder: "yoursite.dev" },
] as const;

export function SocialTab() {
  const socials = useProfileStore((s) => s.config.socials);
  const updateSocials = useProfileStore((s) => s.updateSocials);

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Handles or IDs only — leave a field empty to skip its badge.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key} className="grid gap-2">
            <Label htmlFor={`social-${field.key}`}>{field.label}</Label>
            <Input
              id={`social-${field.key}`}
              placeholder={field.placeholder}
              value={socials[field.key]}
              onChange={(e) => updateSocials({ [field.key]: e.target.value })}
              className="min-h-11"
              autoComplete="off"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        ✨ Badges use shields.io flat-square style with brand logos.
      </p>
    </div>
  );
}
