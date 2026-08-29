"use client";

import {
  LayoutTemplate,
  Settings2,
  Shapes,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfileStore } from "@/lib/store";
import { BasicsTab } from "./basics-tab";
import { TechStackTab } from "./tech-stack-tab";
import { StatsTab } from "./stats-tab";
import { SocialTab } from "./social-tab";
import { ExtrasTab } from "./extras-tab";
import { TemplatesTab } from "./templates-tab";

const TABS = [
  { value: "basics", label: "Basics", icon: Settings2 },
  { value: "tech", label: "Tech Stack", icon: Shapes },
  { value: "stats", label: "GitHub Stats", icon: Trophy },
  { value: "social", label: "Social", icon: Users },
  { value: "extras", label: "Extras", icon: Sparkles },
  { value: "templates", label: "Templates", icon: LayoutTemplate },
] as const;

export function Editor() {
  const editorTab = useProfileStore((s) => s.editorTab);
  const setEditorTab = useProfileStore((s) => s.setEditorTab);

  return (
    <Card className="border-border/70 bg-card/60">
      <CardContent className="p-4 sm:p-6">
        <Tabs value={editorTab} onValueChange={setEditorTab}>
          <div className="pf-scroll -mx-1 mb-5 overflow-x-auto pb-1">
            <TabsList className="mx-1 inline-flex h-auto w-max gap-1 bg-muted/60 p-1">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="min-h-10 gap-1.5 px-3 text-sm data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  <tab.icon className="size-4 shrink-0" aria-hidden />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden" aria-hidden>
                    {tab.label.split(" ")[0]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="pf-scroll max-h-[62vh] min-h-[420px] overflow-y-auto pr-1 lg:max-h-[calc(100vh-19rem)]">
            <TabsContent value="basics" className="mt-0">
              <BasicsTab />
            </TabsContent>
            <TabsContent value="tech" className="mt-0">
              <TechStackTab />
            </TabsContent>
            <TabsContent value="stats" className="mt-0">
              <StatsTab />
            </TabsContent>
            <TabsContent value="social" className="mt-0">
              <SocialTab />
            </TabsContent>
            <TabsContent value="extras" className="mt-0">
              <ExtrasTab />
            </TabsContent>
            <TabsContent value="templates" className="mt-0">
              <TemplatesTab />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
