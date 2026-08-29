<div align="center">

# 🔥 ProfileForge

**Craft a GitHub profile README that gets you noticed.**

An open-source generator that turns a simple form into a stunning, animated
profile README — tech badges, GitHub stats embeds, contribution snakes, AI
bios and one-click export. No YAML archaeology required.

[![License: MIT](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_16-1a1a1a?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ec4899?style=flat-square)](https://github.com/abbdelhadylh30-art/profileforge/pulls)
[![Stars](https://img.shields.io/badge/⭐-Leave%20a%20star-10b981?style=flat-square)](https://github.com/abbdelhadylh30-art/profileforge/stargazers)

</div>

---

## ✨ Why ProfileForge?

Most GitHub profile READMEs are hand-edited markdown files maintained at 2 AM.
Copying badge URLs from random gists, fighting shields.io query strings,
Googling "github readme stats theme names" — it's all busywork.

**ProfileForge makes it a form fill:**

- 🎨 **Live markdown preview** — see your README render exactly like GitHub as you type
- 🏷️ **Badge builder** — 50+ curated tech badges with brand colors and logos, grouped by category
- 📊 **GitHub stats embeds** — stats cards, streaks, top languages, trophies and activity graphs with 12 themes
- 🤖 **AI bio writer** — a punchy first-person bio generated from your details, on demand
- 📦 **Ready-made templates** — 5 battle-tested personas: Minimal, Full-Stack Dev, Data Scientist, Student, Open Sourceror
- ☁️ **Cloud presets** — save your config and reload it from any device
- 📋 **One-click export** — copy markdown or download `README.md`, drop it in your profile repo, done

## 🚀 Quick start

```bash
# 1. Clone
git clone https://github.com/abbdelhadylh30-art/profileforge.git
cd profileforge

# 2. Install dependencies
bun install   # or: npm install / pnpm install

# 3. Set up the database (SQLite via Prisma)
cp .env.example .env   # if present, else create .env with:
#   DATABASE_URL="file:./db/custom.db"
bun run db:push

# 4. Run the dev server
bun run dev
```

Open http://localhost:3000, build your README, copy, paste into
`your-username/your-username` repo. That's it. 🎉

## 🧱 Tech stack

| Layer      | Tools                                                        |
| ---------- | ------------------------------------------------------------ |
| Framework  | [Next.js 16](https://nextjs.org) (App Router) + TypeScript 5 |
| UI         | [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) + Lucide icons |
| Motion     | [Framer Motion](https://www.framer.com/motion/)              |
| Markdown   | [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm + rehype-raw |
| State      | [Zustand](https://zustand.docs.pmnd.rs)                      |
| Database   | [Prisma ORM](https://www.prisma.io) + SQLite                 |
| AI         | [z-ai-web-dev-sdk](https://www.npmjs.com/package/z-ai-web-dev-sdk) (server-side only) |
| Validation | [Zod](https://zod.dev)                                       |

## 🗺️ Feature map

| Area            | What you get                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| **Basics**      | Name, tagline, location, current work/learning, bio (+ AI writer), fun fact   |
| **Tech Stack**  | Languages, Frontend, Backend, Databases, DevOps/Cloud, AI/Data chip groups    |
| **GitHub Stats**| Stats card · streak · top languages · trophies · activity graph · 10 themes   |
| **Social**      | GitHub, X, LinkedIn, Dev.to, Medium, YouTube, Discord, Email, Website badges   |
| **Extras**      | Profile views counter, snake animation, dev quotes, sponsor button, blog badge |
| **Templates**   | Five one-click starter personas                                               |

## 🤝 Contributing

PRs are welcome and appreciated! Some fun ideas to hack on:

- More badge packs (game dev, mobile, security…)
- Drag-and-drop section reordering
- More stats providers & themes
- i18n for the builder UI

1. Fork the repo
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: my feature"`
4. Push and open a Pull Request

## 📄 License

[MIT](LICENSE) © ProfileForge Contributors

---

<div align="center">

**If ProfileForge made your profile pop, [leave a ⭐](https://github.com/abbdelhadylh30-art/profileforge/stargazers) — it genuinely helps!**

Made with ♥ by developers, for developers.

</div>
