export function buildWhatsappUrl(number: string): string | null {
  const normalized = number.replace(/[\s+()-]/g, "");
  if (!/^\d{8,15}$/.test(normalized)) {
    return null;
  }
  return `https://wa.me/${normalized}`;
}

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "manuelgbotto@gmail.com",
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

export const services = [
  {
    slug: "conversion-web",
    title: "Conversion Web Sprint",
    price: "from USD 650",
    promise: "A fast, focused landing page built to turn traffic into qualified conversations.",
    proof: "Responsive UX, analytics-ready structure, forms, WhatsApp/email conversion paths and technical SEO basics.",
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
    slug: "interactive-web",
    title: "Interactive Web Experience",
    price: "from USD 1,500",
    promise: "A purposeful interactive experience when a standard landing page is not enough.",
    proof: "Three.js and real-time interactive systems with desktop/mobile considerations and deterministic QA hooks.",
  },
] as const;

export const capabilities = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "REST APIs",
  "LLM integrations",
  "AI workflow automation",
  "Three.js",
  "Playwright",
  "CI/CD-minded QA",
] as const;

export const caseStudies = [
  {
    label: "REAL PROJECT",
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
    title: "Lead Qualification Engine",
    subtitle: "Construction / real-estate sales funnel",
    description:
      "A portfolio demo showing how a high-ticket business can capture project data, qualify intent and route a useful lead instead of collecting a generic contact form.",
    outcome: "Built to demonstrate conversion thinking, UX and automation for high-ticket service businesses.",
    href: "/demos/lead-engine",
  },
  {
    label: "DEMONSTRATION PROJECT",
    title: "AI Operations Desk",
    subtitle: "Human-in-the-loop automation",
    description:
      "A transparent workflow demo: intake, structured AI processing, confidence, review and final action with errors and retries visible.",
    outcome: "Shows that AI integration is treated as software engineering, not a chatbot pasted onto a website.",
    href: "/demos/ai-ops",
  },
  {
    label: "DEMONSTRATION PROJECT",
    title: "SaaS Validation Sprint",
    subtitle: "Product-minded MVP surface",
    description:
      "A compact SaaS dashboard demo focused on the first useful user journey, measurable states and tested interaction patterns.",
    outcome: "Demonstrates the kind of scoped MVP that can be delivered rapidly for founders and small teams.",
    href: "/demos/saas-sprint",
  },
] as const;
