// ─────────────────────────────────────────────────────────────────────────────
// ProfileForge — shared types
// ─────────────────────────────────────────────────────────────────────────────

export interface ProfileBasics {
  fullName: string;
  tagline: string;
  location: string;
  workingOn: string;
  learning: string;
  bio: string;
  funFact: string;
}

export interface ProfileSocials {
  github: string;
  twitter: string;
  linkedin: string;
  devto: string;
  medium: string;
  youtube: string;
  discord: string;
  email: string;
  website: string;
}

export interface StatsOptions {
  username: string;
  theme: StatsTheme;
  showStatsCard: boolean;
  showStreak: boolean;
  showTopLanguages: boolean;
  showTrophies: boolean;
  showActivityGraph: boolean;
}

export type StatsTheme =
  | "radical"
  | "dark"
  | "tokyonight"
  | "gruvbox"
  | "dracula"
  | "onedark"
  | "synthwave"
  | "merko"
  | "prism"
  | "ghost";

export interface ExtrasOptions {
  showProfileViews: boolean;
  showSnake: boolean;
  showQuote: boolean;
  showSponsor: boolean;
  showBlogBadge: boolean;
  blogUrl: string;
}

export type TechCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "devops"
  | "ai";

export interface ProfileConfig {
  basics: ProfileBasics;
  tech: string[]; // selected tech names (unique, across categories)
  stats: StatsOptions;
  socials: ProfileSocials;
  extras: ExtrasOptions;
}

// ── Tech catalog ─────────────────────────────────────────────────────────────

export interface TechItem {
  name: string;
  logo: string; // shields.io / simple-icons slug
  color: string; // badge color (hex without #)
}

export interface TechCategory {
  id: TechCategoryId;
  label: string;
  icon: string; // lucide icon name hint (not serialized to markdown)
  items: TechItem[];
}

// ── Presets (API shape) ──────────────────────────────────────────────────────

export interface Preset {
  id: string;
  name: string;
  config: ProfileConfig;
  createdAt: string;
}

// ── Templates ────────────────────────────────────────────────────────────────

export interface TemplateDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  build: () => ProfileConfig;
}
