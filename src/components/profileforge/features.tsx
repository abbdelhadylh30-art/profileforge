"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Download,
  Eye,
  LayoutTemplate,
  Shapes,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Eye,
    title: "Live Markdown Preview",
    description:
      "See your README render exactly like GitHub does — badges, headings and images update as you type.",
    tint: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: Shapes,
    title: "Badge Builder",
    description:
      "Pick from 50+ curated tech badges with brand colors and logos. Chips in, beautiful shields.io rows out.",
    tint: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  },
  {
    icon: BarChart3,
    title: "GitHub Stats Embeds",
    description:
      "One click adds stats cards, streaks, top languages, trophies and activity graphs with 12 gorgeous themes.",
    tint: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: Sparkles,
    title: "AI Bio Writer",
    description:
      "Stuck on your intro? Let AI write a punchy first-person bio from your details — then tweak it to taste.",
    tint: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: LayoutTemplate,
    title: "Ready-made Templates",
    description:
      "Five battle-tested personas — Minimal, Full-Stack Dev, Data Scientist, Student and Open Sourceror.",
    tint: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  },
  {
    icon: Download,
    title: "One-click Export",
    description:
      "Copy the markdown or download README.md, then drop it straight into your profile repo. Done in minutes.",
    tint: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
] as const;

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent">
              stand out
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Stop hand-editing markdown at 2 AM. ProfileForge assembles the
            badges, stats and flair — you bring the personality.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border/70 bg-card/70 transition-colors hover:border-violet-400/40">
                <CardHeader className="pb-3">
                  <div
                    className={`mb-3 flex size-11 w-fit items-center justify-center rounded-xl border ${feature.tint}`}
                    aria-hidden
                  >
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
