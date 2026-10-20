import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Manuel Botto";
const description =
  "Software Engineer en Mercado Libre, técnico electrónico y docente. Estoy construyendo Juntopia y Proyecto Roxana, y juego al futsal en Racing.";

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
    "software engineer",
    "electrónica",
    "futsal",
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
  themeColor: "#06070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
