import type { Metadata } from "next";
import "./globals.css";

const title = "Manuel Botto — Backend Software Engineer (Go, Distributed Systems)";
const description =
  "Backend Software Engineer building reliable distributed systems in Go — APIs, microservices, event-driven workflows — plus React/TypeScript product engineering. Focused software sprints from USD 650, scoped, tested and deployed.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Manuel Botto — Freelance Portfolio",
  authors: [{ name: "Manuel Botto" }],
  creator: "Manuel Botto",
  keywords: [
    "Backend Software Engineer",
    "Go",
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "REST API",
    "React",
    "TypeScript",
    "Next.js",
    "Three.js",
    "Playwright",
    "Cloudflare Workers",
    "OpenNext",
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
