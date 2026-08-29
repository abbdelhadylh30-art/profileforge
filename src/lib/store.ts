"use client";

import { create } from "zustand";
import type { ProfileConfig } from "./types";
import { DEFAULT_CONFIG } from "./templates";

interface ProfileStore {
  config: ProfileConfig;
  editorTab: string;
  setEditorTab: (tab: string) => void;
  updateBasics: (patch: Partial<ProfileConfig["basics"]>) => void;
  updateStats: (patch: Partial<ProfileConfig["stats"]>) => void;
  updateSocials: (patch: Partial<ProfileConfig["socials"]>) => void;
  updateExtras: (patch: Partial<ProfileConfig["extras"]>) => void;
  toggleTech: (name: string) => void;
  clearTech: () => void;
  applyTemplate: (config: ProfileConfig) => void;
  loadPreset: (config: ProfileConfig) => void;
  resetConfig: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  config: DEFAULT_CONFIG,
  editorTab: "basics",
  setEditorTab: (tab) => set({ editorTab: tab }),

  updateBasics: (patch) =>
    set((state) => ({
      config: { ...state.config, basics: { ...state.config.basics, ...patch } },
    })),

  updateStats: (patch) =>
    set((state) => ({
      config: { ...state.config, stats: { ...state.config.stats, ...patch } },
    })),

  updateSocials: (patch) =>
    set((state) => ({
      config: { ...state.config, socials: { ...state.config.socials, ...patch } },
    })),

  updateExtras: (patch) =>
    set((state) => ({
      config: { ...state.config, extras: { ...state.config.extras, ...patch } },
    })),

  toggleTech: (name) =>
    set((state) => {
      const has = state.config.tech.includes(name);
      return {
        config: {
          ...state.config,
          tech: has
            ? state.config.tech.filter((t) => t !== name)
            : [...state.config.tech, name],
        },
      };
    }),

  clearTech: () => set((state) => ({ config: { ...state.config, tech: [] } })),

  applyTemplate: (config) => set({ config: structuredClone(config) }),

  loadPreset: (config) => set({ config: structuredClone(config) }),

  resetConfig: () => set({ config: structuredClone(DEFAULT_CONFIG) }),
}));
