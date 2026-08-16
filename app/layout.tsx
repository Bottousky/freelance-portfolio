import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manuel Botto — Full-Stack + AI Automation",
  description: "Full-Stack + AI Automation — focused software sprints that ship. Freelance React/TypeScript development, AI integrations and automation from USD 650, scoped, tested and deployed.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
