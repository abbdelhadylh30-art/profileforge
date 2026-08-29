import { SiteNav } from "@/components/profileforge/nav";
import { Hero } from "@/components/profileforge/hero";
import { Features } from "@/components/profileforge/features";
import { Builder } from "@/components/profileforge/builder";
import { SiteFooter } from "@/components/profileforge/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <Builder />
      </main>
      <SiteFooter />
    </div>
  );
}
