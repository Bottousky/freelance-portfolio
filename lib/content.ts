export function buildWhatsappUrl(number: string): string | null {
  const normalized = number.replace(/[\s+()-]/g, "");
  if (!/^\d{8,15}$/.test(normalized)) {
    return null;
  }
  return `https://wa.me/${normalized}`;
}

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
  // WhatsApp number must be set via NEXT_PUBLIC_WHATSAPP_NUMBER in the host.
  // Expected format: "54911XXXXXXXX" (country code + number, digits only, no "+", spaces or dashes).
  // When unset or invalid, whatsappUrl is null and the site hides the WhatsApp CTA instead of
  // linking to a fake number.
  whatsappUrl: buildWhatsappUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""),
  inquirySubject: "Project inquiry",
  inquiryBody: [
    "Hi Manuel,",
    "",
    "1. Problem:",
    "2. Current stack / site:",
    "3. Desired result:",
    "4. Urgency:",
    "5. Approximate budget:",
    "",
    "Thanks!",
  ].join("\n"),
} as const;

export const channels = {
  // Personal YouTube channel (videos / devlog), set via NEXT_PUBLIC_YOUTUBE_URL in the host.
  // Expected format: an https://youtube.com/... or https://youtu.be/... URL.
  // When unset or invalid, youtubeUrl is null and the site hides the Videos section instead of
  // linking to a channel that does not exist yet.
  youtubeUrl: buildYoutubeUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL ?? ""),
} as const;

export const projects = [
  {
    slug: "juntopia",
    status: "LAUNCHING DEC 2026",
    title: "Juntopia",
    subtitle: "One shared deck for game nights",
    description:
      "A shared deck for get-togethers: everyone plays from their own phone at the same table — truco, brisca, generala and a free-play deck.",
    detail:
      "Coming soon: “A la distancia”, long asynchronous board games for when the group is far apart, starting with Atlas.",
    tags: ["Truco", "Brisca", "Generala", "Atlas"],
    href: "https://juntopia.com" as string | null,
    linkLabel: "juntopia.com ↗",
  },
  {
    slug: "proyecto-roxana",
    status: "IN DEVELOPMENT",
    title: "Proyecto Roxana",
    subtitle: "Educational adventure about electricity",
    description:
      "An educational adventure game about electricity for ages 12 to 18.",
    detail: "Working title — the public name will be announced with its own channels.",
    tags: ["Ages 12–18", "Electricity", "Education"],
    href: null as string | null,
    linkLabel: "",
  },
] as const;

export const heroTags = [
  "APIs",
  "Microservices",
  "Event-Driven Systems",
  "SQL/NoSQL",
  "Observability",
  "Cloud",
] as const;

export const experience = [
  {
    role: "Software Engineer",
    company: "Mercado Libre",
    period: "Nov 2023 — Present",
    current: true,
    summary:
      "Building and owning production backend services for customer-experience systems, primarily in Go. Working with microservices, APIs, event-driven architectures, SQL/NoSQL storage, distributed queues, observability and high-throughput production environments.",
    bullets: [
      "Own backend services handling high-volume event-driven workflows.",
      "Design APIs and microservices in Go.",
      "Participate in architecture decisions and RFCs.",
      "Operate production systems through monitoring and on-call.",
      "Maintain high automated test coverage.",
      "Review code and mentor engineers transitioning into backend development.",
    ],
    tags: ["Go", "Microservices", "REST APIs", "Event-Driven", "SQL/NoSQL", "Observability"],
  },
  {
    role: "Software Developer",
    company: "Telectrónica Peajes S.A.",
    period: "2022 — 2023",
    current: false,
    summary: "Desktop software in C++ and C# for toll infrastructure systems.",
    bullets: [] as string[],
    tags: ["C++", "C#", "Desktop software", "Toll infrastructure"],
  },
  {
    role: "Technical School Teacher",
    company: "",
    period: "2020 — 2023",
    current: false,
    summary:
      "Teaching and mentoring — the communication practice behind how I document, review code and onboard engineers today.",
    bullets: [] as string[],
    tags: [] as string[],
  },
] as const;

export const capabilityGroups = [
  {
    title: "Core backend",
    items: [
      "Go",
      "Microservices",
      "REST APIs",
      "Distributed Systems",
      "Event-Driven Architecture",
      "SQL / NoSQL",
      "Key-Value Stores",
      "Observability",
      "Unit Testing",
      "AWS / GCP",
      "Git",
      "System Design",
    ],
  },
  {
    title: "Product & experimental",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "C / C++",
      "C#",
      "AI-assisted engineering",
      "Three.js",
      "Phaser",
    ],
  },
] as const;

export const services = [
  {
    slug: "backend-api",
    title: "Backend & API Sprint",
    price: "from USD 1,500",
    promise: "A production-minded backend slice — API, data model, tests and observability — designed and shipped.",
    proof: "Go or Node/TypeScript services, REST design, SQL/NoSQL modeling, automated tests, structured logging and a deployment-ready build.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation Sprint",
    price: "from USD 1,200",
    promise: "Remove repetitive manual work with a focused AI-enabled workflow.",
    proof: "API integration, structured outputs, human review points, logging, retries and measurable acceptance checks.",
  },
  {
    slug: "saas-mvp",
    title: "AI / SaaS MVP",
    price: "from USD 2,500",
    promise: "Go from product idea to a testable web application without building an oversized v1.",
    proof: "React/TypeScript product UI, backend/API integration, auth/data foundations and a deployment-ready build.",
  },
  {
    slug: "conversion-web",
    title: "Conversion Web Sprint",
    price: "from USD 650",
    promise: "A fast, focused landing page built to turn traffic into qualified conversations.",
    proof: "Responsive UX, analytics-ready structure, forms, WhatsApp/email conversion paths and technical SEO basics.",
  },
] as const;

export type CaseStudyGroup = "backend" | "experimental" | "product";

export const caseStudies = [
  {
    label: "DEMONSTRATION PROJECT",
    group: "backend" as CaseStudyGroup,
    title: "EventFlow — Notification Orchestrator",
    subtitle: "Event-driven backend system in Go",
    description:
      "A small public system: REST API, append-only event stream and a notification orchestrator fanning out to email, push and in-app senders — with ordered processing, idempotency, retries, dead-lettering, SQL storage, a metrics endpoint and unit tests.",
    outcome:
      "Built to demonstrate publicly the same backend engineering concepts I work with professionally, without sharing employer code.",
    href: "/demos/eventflow",
  },
  {
    label: "REAL PROJECT",
    group: "experimental" as CaseStudyGroup,
    title: "Proyecto Roxana",
    subtitle: "Educational web game ecosystem",
    description:
      "A multi-world browser experience combining TypeScript, Three.js, Babylon.js and Phaser experiments, with an agent-oriented production workflow and deterministic gameplay QA.",
    outcome:
      "Demonstrates architecture, interactive web graphics, technical documentation, iterative engine evaluation and browser QA beyond a standard CRUD portfolio.",
    href: "https://github.com/Bottousky/proyecto-roxana",
  },
  {
    label: "DEMONSTRATION PROJECT",
    group: "product" as CaseStudyGroup,
    title: "Lead Qualification Engine",
    subtitle: "Construction / real-estate sales funnel",
    description:
      "A portfolio demo showing how a high-ticket business can capture project data, qualify intent and route a useful lead instead of collecting a generic contact form.",
    outcome: "Built to demonstrate conversion thinking, UX and automation for high-ticket service businesses.",
    href: "/demos/lead-engine",
  },
  {
    label: "DEMONSTRATION PROJECT",
    group: "product" as CaseStudyGroup,
    title: "AI Operations Desk",
    subtitle: "Human-in-the-loop automation",
    description:
      "A transparent workflow demo: intake, structured AI processing, confidence, review and final action with errors and retries visible.",
    outcome: "Shows that AI integration is treated as software engineering, not a chatbot pasted onto a website.",
    href: "/demos/ai-ops",
  },
  {
    label: "DEMONSTRATION PROJECT",
    group: "product" as CaseStudyGroup,
    title: "SaaS Validation Sprint",
    subtitle: "Product-minded MVP surface",
    description:
      "A compact SaaS dashboard demo focused on the first useful user journey, measurable states and tested interaction patterns.",
    outcome: "Demonstrates the kind of scoped MVP that can be delivered rapidly for founders and small teams.",
    href: "/demos/saas-sprint",
  },
] as const;
