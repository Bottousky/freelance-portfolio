import type { Metadata } from "next";
import "./globals.css";

const title = "Manuel Botto — Full-Stack + AI Automation";
const description =
  "Full-Stack + AI Automation — focused software sprints that ship. Freelance React/TypeScript development, AI integrations and automation from USD 650, scoped, tested and deployed.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Manuel Botto — Freelance Portfolio",
  authors: [{ name: "Manuel Botto" }],
  creator: "Manuel Botto",
  keywords: [
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "AI Automation",
    "LLM Integration",
    "SaaS MVP",
    "Three.js",
    "Playwright",
    "Freelance Developer",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Manuel Botto — Freelance Portfolio",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
