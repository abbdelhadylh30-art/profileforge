"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Copy,
  Download,
  FolderOpen,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfileStore } from "@/lib/store";
import type { Preset, ProfileConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Naive markdown source syntax-styling: headings + URLs. */
function StyledSource({ source }: { source: string }) {
  const lines = source.split("\n");
  return (
    <pre
      className="pf-scroll max-h-[62vh] min-h-[420px] overflow-auto rounded-xl border border-border/60 bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-zinc-300 lg:max-h-[calc(100vh-19rem)]"
      aria-label="README markdown source"
    >
      <code>
        {lines.map((line, i) => {
          const isHeading = /^#{1,6}\s/.test(line);
          const isTag = /^<\/?[a-z]/.test(line.trim());
          const parts = line.split(/(https?:\/\/[^\s")\]]+)/g);
          return (
            <div key={i} className={cn(isHeading && "text-fuchsia-400 font-semibold", isTag && "text-emerald-300/90")}>
              {parts.map((part, j) =>
                /^https?:\/\//.test(part) ? (
                  <span key={j} className="text-violet-400">
                    {part}
                  </span>
                ) : (
                  <span key={j}>{part || "\u00A0"}</span>
                )
              )}
            </div>
          );
        })}
      </code>
    </pre>
  );
}

export function PreviewPanel({ markdown }: { markdown: string }) {
  const config = useProfileStore((s) => s.config);
  const loadPreset = useProfileStore((s) => s.loadPreset);

  const [presets, setPresets] = useState<Preset[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(true);
  const [saving, setSaving] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchPresets = useCallback(async () => {
    setLoadingPresets(true);
    try {
      const res = await fetch("/api/presets");
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      const parsed: Preset[] = (data.presets ?? []).flatMap(
        (p: { id: string; name: string; config: string; createdAt: string }) => {
          try {
            return [{ ...p, config: JSON.parse(p.config) as ProfileConfig }];
          } catch {
            return [];
          }
        }
      );
      setPresets(parsed);
    } catch {
      toast.error("Could not load saved presets");
    } finally {
      setLoadingPresets(false);
    }
  }, []);

  useEffect(() => {
    fetchPresets();
  }, [fetchPresets]);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard 📋");
    } catch {
      toast.error("Copy failed — select the Markdown tab and copy manually");
    }
  }

  function downloadMarkdown() {
    try {
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("README.md downloaded 🎉");
    } catch {
      toast.error("Download failed — try copying instead");
    }
  }

  async function savePreset() {
    const name = presetName.trim();
    if (!name) {
      toast.error("Give your preset a name first");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/presets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, config: JSON.stringify(config) }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(`Preset "${name}" saved ☁️`);
      setPresetName("");
      setDialogOpen(false);
      fetchPresets();
    } catch {
      toast.error("Saving failed — is the server awake?");
    } finally {
      setSaving(false);
    }
  }

  async function deletePreset(id: string, name: string) {
    try {
      const res = await fetch(`/api/presets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
      setPresets((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Preset "${name}" deleted`);
    } catch {
      toast.error("Delete failed — try again");
    }
  }

  function handleLoadPreset(preset: Preset) {
    loadPreset(preset.config);
    toast.success(`Preset "${preset.name}" loaded ✨`);
  }

  const stats = useMemo(
    () => ({
      lines: markdown.split("\n").length,
      chars: markdown.length,
    }),
    [markdown]
  );

  return (
    <Card className="border-border/70 bg-card/60">
      <CardContent className="p-4 sm:p-6">
        {/* Action bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="min-h-11 flex-1 gap-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20 hover:from-violet-600 hover:to-fuchsia-600 sm:flex-none"
            onClick={copyMarkdown}
            aria-label="Copy markdown to clipboard"
          >
            <Copy className="size-4" aria-hidden />
            Copy Markdown
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11 flex-1 gap-1.5 sm:flex-none"
            onClick={downloadMarkdown}
            aria-label="Download README.md"
          >
            <Download className="size-4" aria-hidden />
            Download
          </Button>

          {/* Save preset dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="min-h-11 flex-1 gap-1.5 sm:flex-none"
                aria-label="Save current config as preset"
              >
                <Save className="size-4" aria-hidden />
                Save Preset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Save preset</DialogTitle>
                <DialogDescription>
                  Stores your current configuration so you can reload it later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <Label htmlFor="preset-name">Preset name</Label>
                <Input
                  id="preset-name"
                  placeholder="e.g. My 2025 profile"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && savePreset()}
                  className="min-h-11"
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  className="min-h-11 w-full gap-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600"
                  onClick={savePreset}
                  disabled={saving}
                >
                  {saving && <Loader2 className="size-4 animate-spin" aria-hidden />}
                  Save preset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Presets dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="min-h-11 flex-1 gap-1.5 sm:flex-none"
                aria-label="Open saved presets"
              >
                <FolderOpen className="size-4" aria-hidden />
                Presets
                {!loadingPresets && presets.length > 0 && (
                  <span className="rounded-full bg-violet-400/15 px-1.5 text-xs font-semibold text-violet-400">
                    {presets.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Saved presets</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {loadingPresets ? (
                <div className="grid gap-2 p-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-8 w-3/5" />
                </div>
              ) : presets.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No presets yet — hit “Save Preset” to store one.
                </p>
              ) : (
                <div className="pf-scroll max-h-64 overflow-y-auto">
                  {presets.map((preset) => (
                    <DropdownMenuItem
                      key={preset.id}
                      className="group items-center gap-2 py-2"
                    >
                      <button
                        type="button"
                        className="min-h-8 flex-1 truncate text-left"
                        onClick={() => handleLoadPreset(preset)}
                        aria-label={`Load preset ${preset.name}`}
                      >
                        <span className="block truncate font-medium">{preset.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {new Date(preset.createdAt).toLocaleDateString()}
                        </span>
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
                        onClick={() => deletePreset(preset.id, preset.name)}
                        aria-label={`Delete preset ${preset.name}`}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Preview / Markdown tabs */}
        <Tabs defaultValue="preview">
          <div className="mb-3 flex items-center justify-between gap-2">
            <TabsList className="bg-muted/60">
              <TabsTrigger value="preview" className="min-h-10 px-4">
                Preview
              </TabsTrigger>
              <TabsTrigger value="markdown" className="min-h-10 px-4">
                Markdown
              </TabsTrigger>
            </TabsList>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {stats.lines} lines · {stats.chars.toLocaleString()} chars
            </p>
          </div>

          <TabsContent value="preview" className="mt-0">
            <div
              className="pf-scroll pf-md max-h-[62vh] min-h-[420px] overflow-y-auto rounded-xl border border-border/60 bg-background/60 p-5 lg:max-h-[calc(100vh-19rem)]"
              aria-label="Rendered README preview"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </TabsContent>
          <TabsContent value="markdown" className="mt-0">
            <StyledSource source={markdown} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
