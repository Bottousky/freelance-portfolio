export function buildYoutubeUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
  if (parsed.protocol !== "https:" || (host !== "youtube.com" && host !== "youtu.be")) {
    return null;
  }
  return parsed.toString();
}

export const contact = {
  // Public contact email, set via NEXT_PUBLIC_CONTACT_EMAIL in the host (target: hola@manuelbotto.com).
  // The fallback stays on a mailbox that already receives mail, so the CTA never points to an
  // address whose email routing is not live yet.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "manuelgbotto@gmail.com",
  githubUrl: "https://github.com/Bottousky",
  // Personal YouTube channel (videos / devlog), set via NEXT_PUBLIC_YOUTUBE_URL in the host.
  // Expected format: an https://youtube.com/... or https://youtu.be/... URL.
  // When unset or invalid, youtubeUrl is null and the site hides the Videos section instead of
  // linking to a channel that does not exist yet.
  youtubeUrl: buildYoutubeUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL ?? ""),
} as const;

export const profile = {
  name: "Manuel Botto",
  greeting: "Hola, soy",
  lead: "Software Engineer en Mercado Libre, técnico electrónico y docente. Estoy construyendo Juntopia y Proyecto Roxana.",
  // Rotating endings for "Yo …" in the hero; the full facts are stated in `lead`.
  roles: ["escribo software.", "construyo Juntopia.", "diseño Proyecto Roxana.", "enseño y divulgo.", "juego al futsal."],
  facts: ["Argentina", "Software Engineer", "Técnico Electrónico", "Docente"],
  // The thread that ties the whole site together.
  manifesto: {
    lead: "Me interesa entender cómo funcionan las cosas, construir otras nuevas y mejorar continuamente lo que hago.",
    tail: "Ya sea desarrollando software, creando experiencias educativas o jugando al futsal.",
  },
} as const;

export const marquee = {
  craft: ["Full stack", "Go", "TypeScript", "React", "React Native", "Cloudflare Workers", "Phaser", "Three.js", "SQL / NoSQL"],
  mine: ["Juntopia", "Proyecto Roxana", "A la distancia", "Juego de Hormigas", "EventFlow", "Futsal", "Docencia", "Devlogs"],
} as const;

export type Project = {
  slug: string;
  status: string;
  kind: string;
  title: string;
  summary: string;
  note: string;
  tags: readonly string[];
  href: string | null;
  linkLabel: string;
};

export const projects: readonly Project[] = [
  {
    slug: "juntopia",
    status: "Lanzamiento: diciembre 2026",
    kind: "Juego de cartas para juntadas",
    title: "Juntopia",
    summary:
      "Un mazo compartido para juntadas: cada persona juega desde su celular, en la misma mesa, sin repartir cartas de papel.",
    note: "Próximamente, «A la distancia»: juegos de mesa largos para seguir jugando aunque estemos lejos, empezando por Atlas.",
    tags: ["React Native", "Expo", "Cloudflare Workers", "WebSocket"],
    href: "https://juntopia.com",
    linkLabel: "juntopia.com",
  },
  {
    slug: "proyecto-roxana",
    status: "En desarrollo",
    kind: "Universo educativo",
    title: "Proyecto Roxana",
    summary:
      "Un universo interactivo de aprendizaje que convierte matemática, física, electrónica y programación en experiencias jugables, para chicos y chicas de 12 a 18 años. Es mi proyecto más ambicioso.",
    note: "Nombre de trabajo: el nombre público se anuncia más adelante.",
    tags: ["TypeScript", "Phaser", "Three.js"],
    href: "https://github.com/Bottousky/proyecto-roxana",
    linkLabel: "Ver repositorio",
  },
  {
    slug: "juego-de-hormigas",
    status: "En diseño",
    kind: "Aventura 3D",
    title: "Juego de Hormigas",
    summary:
      "Una hormiga queda lejos de su colonia y tiene que volver a tiempo. A su escala, los lugares de todos los días se vuelven continentes y océanos.",
    note: "Etapa temprana: diseño del juego y primeras pruebas.",
    tags: ["3D", "Diseño de juego"],
    href: "https://github.com/Bottousky/juego-de-hormigas",
    linkLabel: "Ver repositorio",
  },
  {
    slug: "eventflow",
    status: "Código abierto",
    kind: "Backend en Go",
    title: "EventFlow",
    summary:
      "Un orquestador de notificaciones orientado a eventos, hecho para mostrar en público cómo trabajo el backend sin compartir código de ningún empleador.",
    note: "Procesamiento ordenado, idempotencia, reintentos, cola de mensajes fallidos, métricas y tests.",
    tags: ["Go", "Eventos", "SQL"],
    href: "https://github.com/Bottousky/eventflow",
    linkLabel: "Ver repositorio",
  },
];

export const passions = [
  {
    slug: "videojuegos",
    title: "Hacer videojuegos",
    body: "De juegos de cartas para jugar en la mesa a aventuras educativas y en 3D: diseño las reglas y programo lo que las hace funcionar.",
    related: ["Juntopia", "Proyecto Roxana", "Juego de Hormigas"],
  },
  {
    slug: "juegos-de-mesa",
    title: "Juegos de mesa y cartas",
    body: "De las sobremesas con cartas nació Juntopia; de las ganas de seguir jugando con quien vive lejos, «A la distancia» y Atlas.",
    related: ["Juntopia"],
  },
  {
    slug: "ensenar",
    title: "Enseñar y divulgar",
    body: "Soy docente y lo voy a ser siempre. Di clases en una escuela técnica y hoy sigo enseñando con Proyecto Roxana y, pronto, con videos sobre cómo construyo lo que hago.",
    related: ["Proyecto Roxana"],
  },
] as const;

export const futsal = {
  sport: "Futsal",
  since: "Desde chico",
  title: { lead: "La disciplina también se", em: "entrena." },
  body: "Juego al fútbol desde chico y nunca dejé: hoy sigo jugando al futsal. La cancha me enseñó cosas que uso todos los días fuera de ella.",
  lessons: [
    "Entrenar aunque no haya partido.",
    "Jugar el rol que el equipo necesite.",
    "Decidir rápido, bajo presión.",
  ],
} as const;

export const work = [
  {
    role: "Software Engineer",
    place: "Mercado Libre",
    period: "Nov 2023 — hoy",
    current: true,
    summary:
      "Entré como desarrollador Jr y soy Semi Senior desde febrero de 2026. Trabajo full stack en sistemas de experiencia de cliente: del backend en Go —microservicios, APIs, arquitecturas orientadas a eventos y observabilidad— al frontend.",
  },
  {
    role: "Desarrollador de software",
    place: "Telectrónica Peajes S.A.",
    period: "2022 — 2023",
    current: false,
    summary: "Software de escritorio en C++ y C# para sistemas de peaje.",
  },
  {
    role: "Docente",
    place: "Escuela técnica",
    period: "2020 — 2023",
    current: false,
    summary: "Programación, electrónica, matemática y física.",
  },
] as const;

export const studies = [
  {
    title: "Técnico Electrónico",
    place: "Escuela Técnica Otto Krause",
    detail: "Título secundario técnico: la base de todo lo que vino después.",
  },
  {
    title: "CBC de Ingeniería",
    place: "Universidad de Buenos Aires",
    detail: "Aprobado, con recorrido en Ingeniería Informática.",
  },
  {
    title: "Autodidacta",
    place: "Siempre",
    detail: "Todo lo demás lo aprendí con cursos, documentación y proyectos propios.",
  },
] as const;

export const tools = [
  "Go",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Cloudflare Workers",
  "SQL / NoSQL",
  "Phaser",
  "Three.js",
  "C / C++",
  "C#",
] as const;
