"use client";

import { motion } from "framer-motion";
import { Check, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfileStore } from "@/lib/store";
import { TEMPLATES } from "@/lib/templates";

export function TemplatesTab() {
  const applyTemplate = useProfileStore((s) => s.applyTemplate);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  function handleApply(id: string) {
    const template = TEMPLATES.find((t) => t.id === id);
    if (!template) return;
    applyTemplate(template.build());
    setAppliedId(id);
    toast.success(`"${template.name}" template applied ✨`);
  }

  return (
    <div id="templates" className="scroll-mt-32">
      <p className="mb-4 text-sm text-muted-foreground">
        Pick a starting point — it fills every tab at once. You can always
        tweak the details afterwards.
      </p>
      <div className="pf-scroll grid max-h-96 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {TEMPLATES.map((template, i) => {
          const applied = appliedId === template.id;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <Card
                className={`h-full border-border/70 transition-colors ${
                  applied ? "border-violet-400/60 bg-violet-400/5" : "hover:border-violet-400/40"
                }`}
              >
                <CardContent className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" aria-hidden>
                      {template.emoji}
                    </span>
                    <h3 className="font-semibold">{template.name}</h3>
                    {applied && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                        <Check className="size-3" aria-hidden />
                        Applied
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {template.description}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant={applied ? "outline" : "default"}
                    className="mt-auto min-h-11 w-full gap-1.5"
                    onClick={() => handleApply(template.id)}
                    aria-label={`Apply ${template.name} template`}
                  >
                    <Wand2 className="size-4" aria-hidden />
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
