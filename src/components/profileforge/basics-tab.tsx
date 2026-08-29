"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/lib/store";

export function BasicsTab() {
  const basics = useProfileStore((s) => s.config.basics);
  const updateBasics = useProfileStore((s) => s.updateBasics);
  const [generating, setGenerating] = useState(false);

  async function generateBio() {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: basics.fullName,
          role: basics.tagline,
          workingOn: basics.workingOn,
          learning: basics.learning,
          funFact: basics.funFact,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "AI unavailable");
      updateBasics({ bio: data.bio });
      toast.success("Bio generated — tweak it however you like!");
    } catch {
      toast.error("AI unavailable — write your own bio ✍️");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          placeholder="Ada Lovelace"
          value={basics.fullName}
          onChange={(e) => updateBasics({ fullName: e.target.value })}
          className="min-h-11"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          placeholder="Building delightful things for the web"
          value={basics.tagline}
          onChange={(e) => updateBasics({ tagline: e.target.value })}
          className="min-h-11"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Berlin, Germany"
            value={basics.location}
            onChange={(e) => updateBasics({ location: e.target.value })}
            className="min-h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="funFact">Fun fact ⚡</Label>
          <Input
            id="funFact"
            placeholder="I debug in my sleep"
            value={basics.funFact}
            onChange={(e) => updateBasics({ funFact: e.target.value })}
            className="min-h-11"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="workingOn">🔭 Currently working on</Label>
          <Input
            id="workingOn"
            placeholder="A side project that will definitely ship"
            value={basics.workingOn}
            onChange={(e) => updateBasics({ workingOn: e.target.value })}
            className="min-h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="learning">🌱 Currently learning</Label>
          <Input
            id="learning"
            placeholder="Rust, obviously"
            value={basics.learning}
            onChange={(e) => updateBasics({ learning: e.target.value })}
            className="min-h-11"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="bio">About me</Label>
          <Button
            type="button"
            size="sm"
            className="min-h-9 gap-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20 hover:from-violet-600 hover:to-fuchsia-600"
            onClick={generateBio}
            disabled={generating}
            aria-label="Generate bio with AI"
          >
            {generating ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Sparkles className="size-4" aria-hidden />
            )}
            {generating ? "Writing…" : "Generate with AI"}
          </Button>
        </div>
        <Textarea
          id="bio"
          placeholder="A short, punchy intro — what you do and what you love."
          value={basics.bio}
          onChange={(e) => updateBasics({ bio: e.target.value })}
          rows={4}
          className="resize-y"
        />
        <p className="text-xs text-muted-foreground">
          Tip: keep it to 1–2 sentences. Recruiters skim!
        </p>
      </div>
    </div>
  );
}
