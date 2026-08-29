"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, HeartHandshake, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";

const ROLES = ["Full-Stack Dev", "Open Sourcerer", "Data Wizard", "Indie Hacker"];

const MOCK_BADGES = [
  { label: "TypeScript", color: "3178c6", logo: "typescript" },
  { label: "React", color: "61dafb", logo: "react" },
  { label: "Node.js", color: "5fa04e", logo: "nodedotjs" },
  { label: "PostgreSQL", color: "4169e1", logo: "postgresql" },
  { label: "Docker", color: "2496ed", logo: "docker" },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const setEditorTab = useProfileStore((s) => s.setEditorTab);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  function scrollToBuilder(tab?: string) {
    if (tab) setEditorTab(tab);
    document.querySelector("#builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#0a0713]"
    >
      {/* Gradient blobs */}
      <div className="pf-blob left-[-10%] top-[-20%] size-[420px] bg-violet-600" aria-hidden />
      <div className="pf-blob right-[-5%] top-[10%] size-[360px] bg-fuchsia-600" aria-hidden />
      <div className="pf-blob bottom-[-30%] left-[35%] size-[380px] bg-emerald-500/70" aria-hidden />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 text-sm font-medium text-violet-200">
            <Sparkles className="size-4 text-fuchsia-300" aria-hidden />
            100% free &amp; open source
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl"
          >
            Craft a GitHub profile README that{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">
              gets you noticed
            </span>
          </h1>

          <div
            className="mt-5 flex min-h-9 items-center justify-center gap-2 text-lg text-zinc-300 sm:text-xl lg:justify-start"
            aria-live="polite"
          >
            <span>Look like the</span>
            <span className="relative inline-grid overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-semibold text-emerald-300"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>you are</span>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0">
            ProfileForge turns a simple form into a stunning, animated profile
            README — badges, stats cards, contribution snakes and all. No YAML
            archaeology required.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="min-h-12 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:bg-[position:100%_0] sm:w-auto"
              onClick={() => scrollToBuilder()}
            >
              <Sparkles className="size-4" aria-hidden />
              Open the Builder
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-12 w-full border-zinc-600 bg-transparent text-zinc-100 hover:bg-zinc-800 hover:text-white sm:w-auto"
              onClick={() => scrollToBuilder("templates")}
            >
              View Templates
            </Button>
          </div>

          {/* Stats row */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400 lg:justify-start">
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-violet-400" aria-hidden />
              <strong className="font-semibold text-zinc-200">40+</strong> tech badges
            </li>
            <li className="flex items-center gap-1.5">
              <Palette className="size-4 text-fuchsia-400" aria-hidden />
              <strong className="font-semibold text-zinc-200">12</strong> stats themes
            </li>
            <li className="flex items-center gap-1.5">
              <HeartHandshake className="size-4 text-emerald-400" aria-hidden />
              <strong className="font-semibold text-zinc-200">100%</strong> free &amp; open source
            </li>
          </ul>
        </motion.div>

        {/* Right: floating mock README card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl border border-violet-400/25 bg-[#0d1117] p-5 shadow-2xl shadow-violet-950/60"
          >
            {/* Window chrome */}
            <div className="mb-4 flex items-center gap-2" aria-hidden>
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-400">
                README.md
              </span>
            </div>
            <div className="text-center" aria-hidden>
              <p className="text-xl font-bold text-zinc-100">
                Hi 👋, I&apos;m Ada Lovelace
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Building analytical engines since 1843
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
                {MOCK_BADGES.map((b) => (
                  <img
                    key={b.label}
                    src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white`}
                    alt={`${b.label} badge`}
                    className="h-5"
                    loading="lazy"
                  />
                ))}
              </div>
              <img
                src="https://github-readme-stats.vercel.app/api?username=octocat&show_icons=true&theme=radical&hide_border=true"
                alt="GitHub stats card preview"
                className="mx-auto mt-4 w-full max-w-[340px] rounded-lg"
                loading="lazy"
              />
              <p className="mt-3 font-mono text-[11px] text-emerald-300/80">
                ▲ generated with ProfileForge
              </p>
            </div>
          </motion.div>

          {/* Glow behind card */}
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-emerald-500/20 blur-2xl"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
