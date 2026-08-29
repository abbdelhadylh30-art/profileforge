// ─────────────────────────────────────────────────────────────────────────────
// ProfileForge — README generator (pure, deterministic, unit-testable)
// ─────────────────────────────────────────────────────────────────────────────
import type { ProfileConfig, StatsTheme } from "./types";
import { TECH_CATEGORIES, findTech } from "./tech-catalog";

/** Escape a shields.io badge segment: literal `--` for dashes, `%20` for spaces. */
export function shieldEscape(value: string): string {
  return value.replace(/-/g, "--").replace(/ /g, "%20").trim();
}

/** Percent-encode a URL query value (keeps it deterministic). */
export function encodeParam(value: string): string {
  return encodeURIComponent(value.trim());
}

/** Build a shields.io badge markdown image. */
export function techBadge(name: string): string {
  const tech = findTech(name);
  const label = tech?.name ?? name;
  const color = tech?.color ?? "a855f7";
  const logo = tech?.logo ? `&logo=${tech.logo}&logoColor=white` : "";
  const url = `https://img.shields.io/badge/${shieldEscape(label)}-${color}?style=flat-square${logo}`;
  return `![${label}](${url})`;
}

/** Social shield badge with logo icon, linking out to the profile. */
function socialBadge(
  label: string,
  logo: string,
  color: string,
  href: string | null
): string | null {
  if (!href) return null;
  const url = `https://img.shields.io/badge/${shieldEscape(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
  return `[![${label}](${url})](${href})`;
}

export function socialBadges(config: ProfileConfig): string {
  const s = config.socials;
  const u = (v: string) => encodeParam(v);
  const badges = [
    socialBadge(
      "GitHub",
      "github",
      "1a1a1a",
      s.github ? `https://github.com/${u(s.github)}` : null
    ),
    socialBadge(
      "X/Twitter",
      "x",
      "1a1a1a",
      s.twitter ? `https://x.com/${u(s.twitter)}` : null
    ),
    socialBadge(
      "LinkedIn",
      "linkedin",
      "0a66c2",
      s.linkedin ? `https://linkedin.com/in/${u(s.linkedin)}` : null
    ),
    socialBadge(
      "Dev.to",
      "devdotto",
      "0a0a0a",
      s.devto ? `https://dev.to/${u(s.devto)}` : null
    ),
    socialBadge(
      "Medium",
      "medium",
      "1a1a1a",
      s.medium ? `https://medium.com/@${u(s.medium)}` : null
    ),
    socialBadge(
      "YouTube",
      "youtube",
      "ff0000",
      s.youtube ? `https://youtube.com/@${u(s.youtube)}` : null
    ),
    socialBadge(
      "Discord",
      "discord",
      "5865f2",
      s.discord ? `https://discord.com/users/${u(s.discord)}` : null
    ),
    socialBadge(
      "Email",
      "gmail",
      "ea4335",
      s.email ? `mailto:${u(s.email)}` : null
    ),
    socialBadge(
      "Website",
      "googlechrome",
      "fbbc05",
      s.website ? /^https?:\/\//.test(s.website) ? s.website.trim() : `https://${s.website.trim()}` : null
    ),
  ].filter(Boolean) as string[];
  return badges.join(" ");
}

/** Tech stack grouped by category, one badge row per category. */
export function techStackSection(config: ProfileConfig): string {
  const lines: string[] = [];
  for (const category of TECH_CATEGORIES) {
    const selected = category.items
      .map((t) => t.name)
      .filter((name) => config.tech.includes(name));
    if (selected.length === 0) continue;
    lines.push(selected.map(techBadge).join(" "));
  }
  return lines.join("\n\n");
}

export function statsSection(config: ProfileConfig): string {
  const { stats } = config;
  if (!stats.username.trim()) return "";
  const user = encodeParam(stats.username);
  const theme = encodeParam(stats.theme);
  const blocks: string[] = [];

  if (stats.showStatsCard) {
    blocks.push(
      `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme}&hide_border=true&bg_color=0d1117)`
    );
  }
  if (stats.showStreak) {
    blocks.push(
      `![GitHub streak](https://streak-stats.demolab.com?user=${user}&theme=${theme}&hide_border=true&background=0d1117)`
    );
  }
  if (stats.showTopLanguages) {
    blocks.push(
      `![Top languages](https://github-readme-stats.vercel.app/top-langs/?username=${user}&layout=compact&theme=${theme}&hide_border=true&bg_color=0d1117)`
    );
  }
  if (stats.showTrophies) {
    blocks.push(
      `![GitHub trophies](https://github-profile-trophy.vercel.app/?username=${user}&theme=${theme}&no-frame=true&row=1&column=6)`
    );
  }
  if (stats.showActivityGraph) {
    blocks.push(
      `![Activity graph](https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=${theme}&hide_border=true&bg_color=0d1117)`
    );
  }
  return blocks.join("\n\n");
}

export function extrasSection(config: ProfileConfig): string {
  const { extras, stats, socials } = config;
  const user = encodeParam(stats.username || socials.github || "octocat");
  const blocks: string[] = [];

  if (extras.showSnake) {
    blocks.push(
      [
        "<picture>",
        `  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg" />`,
        `  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`,
        `  <img alt="github contribution snake animation" src="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`,
        "</picture>",
      ].join("\n")
    );
  }
  if (extras.showQuote) {
    const theme = quoteTheme(config.stats.theme);
    blocks.push(
      `![Dev quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme})`
    );
  }
  return blocks.join("\n\n");
}

function quoteTheme(theme: StatsTheme): string {
  const map: Partial<Record<StatsTheme, string>> = {
    radical: "radical",
    dark: "dark",
    tokyonight: "tokyonight",
    gruvbox: "gruvbox",
    dracula: "dracula",
    onedark: "onedark",
    synthwave: "solarized",
    merko: "merko",
    prism: "transparent",
    ghost: "dark",
  };
  return map[theme] ?? "dark";
}

/** Main entry: assemble the full README markdown. */
export function generateReadme(config: ProfileConfig): string {
  const b = config.basics;
  const out: string[] = [];

  // Profile views counter
  if (config.extras.showProfileViews) {
    const user = encodeParam(config.stats.username || config.socials.github || "octocat");
    out.push(
      `![Profile views](https://komarev.com/ghpvc/?username=${user}&color=blueviolet&style=flat-square)`
    );
    out.push("");
  }

  // Blog badge
  if (config.extras.showBlogBadge && config.extras.blogUrl.trim()) {
    const blog = /^https?:\/\//.test(config.extras.blogUrl)
      ? config.extras.blogUrl.trim()
      : `https://${config.extras.blogUrl.trim()}`;
    const badge = `https://img.shields.io/badge/Read%20my%20blog-%E2%9C%8D%EF%B8%8F-f97316?style=for-the-badge&logo=ghost&logoColor=white`;
    out.push(`[![Blog](${badge})](${blog})`);
    out.push("");
  }

  // Header
  const name = b.fullName.trim() || "Your Name";
  out.push(`<h1 align="center">Hi 👋, I'm ${escapeHtml(name)}</h1>`);
  if (b.tagline.trim()) {
    out.push(`<h3 align="center">${escapeHtml(b.tagline.trim())}</h3>`);
  }
  out.push("");

  // Sponsor button
  if (config.extras.showSponsor) {
    const user = encodeParam(config.socials.github || config.stats.username || "octocat");
    const badge = `https://img.shields.io/badge/Sponsor%20me-%E2%9D%A4-db2777?style=for-the-badge&logo=githubsponsors&logoColor=white`;
    out.push(`[![Sponsor](${badge})](https://github.com/sponsors/${user})`);
    out.push("");
  }

  // Socials row
  const socials = socialBadges(config);
  if (socials) {
    // Blank lines inside the <p> keep the badges markdown-parsed (GitHub + preview).
    out.push(`<p align="center">`);
    out.push("");
    out.push(socials);
    out.push("");
    out.push(`</p>`);
    out.push("");
  }

  // About me
  const bullets: string[] = [];
  if (b.bio.trim()) bullets.push(`- 👨‍💻 ${escapeMd(b.bio.trim())}`);
  if (b.workingOn.trim()) bullets.push(`- 🔭 I'm currently working on **${escapeMd(b.workingOn.trim())}**`);
  if (b.learning.trim()) bullets.push(`- 🌱 I'm currently learning **${escapeMd(b.learning.trim())}**`);
  if (b.location.trim()) bullets.push(`- 📍 I'm based in ${escapeMd(b.location.trim())}`);
  if (b.funFact.trim()) bullets.push(`- ⚡ Fun fact: ${escapeMd(b.funFact.trim())}`);
  if (bullets.length > 0) {
    out.push("## 🚀 About Me");
    out.push("");
    out.push(...bullets);
    out.push("");
  }

  // Tech stack
  const stack = techStackSection(config);
  if (stack) {
    out.push("## 🛠️ Tech Stack");
    out.push("");
    out.push(stack);
    out.push("");
  }

  // GitHub stats
  const stats = statsSection(config);
  if (stats) {
    out.push("## 📊 GitHub Stats");
    out.push("");
    out.push(`<div align="center">`);
    out.push("");
    out.push(stats);
    out.push("");
    out.push(`</div>`);
    out.push("");
  }

  // Extras (snake, quote)
  const extras = extrasSection(config);
  if (extras) {
    out.push("## ✨ Extras");
    out.push("");
    out.push(`<div align="center">`);
    out.push("");
    out.push(extras);
    out.push("");
    out.push(`</div>`);
    out.push("");
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

/** Escape HTML-sensitive characters for raw <h1>/<h3> blocks. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimal markdown inline escaping for bullet text. */
export function escapeMd(value: string): string {
  return value.replace(/([\\`*_{}[\]<>])/g, "\\$1");
}
