"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, PencilLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useProfileStore } from "@/lib/store";
import { generateReadme } from "@/lib/generator";
import { Editor } from "./editor";
import { PreviewPanel } from "./preview-panel";

export function Builder() {
  const config = useProfileStore((s) => s.config);
  const markdown = useMemo(() => generateReadme(config), [config]);

  return (
    <section
      id="builder"
      aria-labelledby="builder-heading"
      className="scroll-mt-20 border-t border-border/50 bg-gradient-to-b from-muted/30 via-background to-background py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 id="builder-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Build your README
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Fill in the editor, watch the preview update live, then copy or
            download the markdown. Everything renders exactly like GitHub.
          </p>
        </motion.div>

        {/* Mobile: stacked with Editor/Preview switcher */}
        <div className="md:hidden">
          <Tabs defaultValue="editor">
            <TabsList className="mb-4 grid h-12 w-full grid-cols-2 bg-muted/60">
              <TabsTrigger value="editor" className="min-h-10 gap-1.5">
                <PencilLine className="size-4" aria-hidden />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="min-h-10 gap-1.5">
                <Eye className="size-4" aria-hidden />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="mt-0">
              <Editor />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <PreviewPanel markdown={markdown} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: resizable split */}
        <div className="hidden md:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="items-stretch gap-3"
            autoSaveId="profileforge-builder"
          >
            <ResizablePanel defaultSize={46} minSize={28}>
              <Editor />
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="w-1.5 rounded-full bg-border/70 transition-colors hover:bg-violet-400/60"
              aria-label="Resize editor and preview panels"
            />
            <ResizablePanel defaultSize={54} minSize={32}>
              <PreviewPanel markdown={markdown} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </section>
  );
}
