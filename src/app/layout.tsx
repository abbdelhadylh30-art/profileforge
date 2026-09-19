import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profile.abdelhadygabriel.me"),
  alternates: { canonical: "/" },
  title: "ProfileForge — GitHub Profile README Generator",
  description:
    "Forge a stunning GitHub profile README in minutes. Live markdown preview, 50+ tech badges, GitHub stats embeds, AI bio writer, ready-made templates and one-click export. Free & open source.",
  keywords: [
    "GitHub profile README",
    "README generator",
    "GitHub badges",
    "github-readme-stats",
    "developer profile",
    "open source",
  ],
  authors: [{ name: "ProfileForge Contributors" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ProfileForge — GitHub Profile README Generator",
    description:
      "Craft a GitHub profile README that gets you noticed. Live preview, badges, stats embeds, AI bio, templates.",
    siteName: "ProfileForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileForge — GitHub Profile README Generator",
    description:
      "Craft a GitHub profile README that gets you noticed. Free & open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
