import type { TechCategory } from "./types";

// Brand-accurate badge colors (hex, no `#`) + simple-icons logo slugs.
export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "Code2",
    items: [
      { name: "JavaScript", logo: "javascript", color: "f7df1e" },
      { name: "TypeScript", logo: "typescript", color: "3178c6" },
      { name: "Python", logo: "python", color: "3776ab" },
      { name: "Go", logo: "go", color: "00add8" },
      { name: "Rust", logo: "rust", color: "dea584" },
      { name: "Java", logo: "openjdk", color: "007396" },
      { name: "C++", logo: "cplusplus", color: "00599c" },
      { name: "C#", logo: "csharp", color: "512bd4" },
      { name: "PHP", logo: "php", color: "777bb4" },
      { name: "Ruby", logo: "ruby", color: "cc342d" },
      { name: "Kotlin", logo: "kotlin", color: "7f52ff" },
      { name: "Swift", logo: "swift", color: "f05138" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "MonitorSmartphone",
    items: [
      { name: "React", logo: "react", color: "61dafb" },
      { name: "Next.js", logo: "nextdotjs", color: "1a1a1a" },
      { name: "Vue", logo: "vuedotjs", color: "4fc08d" },
      { name: "Svelte", logo: "svelte", color: "ff3e00" },
      { name: "Angular", logo: "angular", color: "dd0031" },
      { name: "Tailwind", logo: "tailwindcss", color: "06b6d4" },
      { name: "HTML5", logo: "html5", color: "e34f26" },
      { name: "CSS3", logo: "css3", color: "663399" },
      { name: "Redux", logo: "redux", color: "764abc" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "ServerCog",
    items: [
      { name: "Node.js", logo: "nodedotjs", color: "5fa04e" },
      { name: "Express", logo: "express", color: "1a1a1a" },
      { name: "NestJS", logo: "nestjs", color: "e0234e" },
      { name: "Django", logo: "django", color: "092e20" },
      { name: "FastAPI", logo: "fastapi", color: "009688" },
      { name: "Spring", logo: "spring", color: "6db33f" },
      { name: "Laravel", logo: "laravel", color: "ff2d20" },
      { name: "GraphQL", logo: "graphql", color: "e10098" },
      { name: "REST", logo: "jsonwebtokens", color: "f97316" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "Database",
    items: [
      { name: "PostgreSQL", logo: "postgresql", color: "4169e1" },
      { name: "MySQL", logo: "mysql", color: "4479a1" },
      { name: "MongoDB", logo: "mongodb", color: "47a248" },
      { name: "Redis", logo: "redis", color: "ff4438" },
      { name: "SQLite", logo: "sqlite", color: "003b57" },
      { name: "Prisma", logo: "prisma", color: "2d3748" },
      { name: "Firebase", logo: "firebase", color: "ffca28" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: "CloudCog",
    items: [
      { name: "Docker", logo: "docker", color: "2496ed" },
      { name: "Kubernetes", logo: "kubernetes", color: "326ce5" },
      { name: "AWS", logo: "amazonwebservices", color: "ff9900" },
      { name: "GCP", logo: "googlecloud", color: "4285f4" },
      { name: "Azure", logo: "azuredevops", color: "0078d4" },
      { name: "Nginx", logo: "nginx", color: "009639" },
      { name: "Linux", logo: "linux", color: "fcc624" },
      { name: "GitHub Actions", logo: "githubactions", color: "2088ff" },
      { name: "CI/CD", logo: "git", color: "f05032" },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    icon: "BrainCircuit",
    items: [
      { name: "TensorFlow", logo: "tensorflow", color: "ff6f00" },
      { name: "PyTorch", logo: "pytorch", color: "ee4c2c" },
      { name: "scikit-learn", logo: "scikitlearn", color: "f7931e" },
      { name: "Pandas", logo: "pandas", color: "150458" },
      { name: "NumPy", logo: "numpy", color: "4dabcf" },
      { name: "OpenCV", logo: "opencv", color: "5c3ee8" },
      { name: "LangChain", logo: "langchain", color: "00b96b" },
    ],
  },
];

export const ALL_TECH: { name: string; logo: string; color: string }[] =
  TECH_CATEGORIES.flatMap((c) => c.items);

export function findTech(name: string) {
  return ALL_TECH.find((t) => t.name === name);
}
