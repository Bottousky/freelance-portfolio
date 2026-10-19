import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = "Manuel Botto";
const description =
  "Desarrollador backend en Mercado Libre, técnico electrónico y ex docente. Hago juegos —Juntopia, Proyecto Roxana— y cuento cómo los construyo.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Manuel Botto",
  authors: [{ name: "Manuel Botto" }],
  creator: "Manuel Botto",
  keywords: [
    "Manuel Botto",
    "Juntopia",
    "Proyecto Roxana",
    "desarrollo de videojuegos",
    "juegos de cartas",
    "backend",
    "Go",
    "electrónica",
    "docencia",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    title,
    description,
    siteName: "Manuel Botto",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe4" },
    { media: "(prefers-color-scheme: dark)", color: "#14110d" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
