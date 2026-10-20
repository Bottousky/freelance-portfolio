# Product Brief — Manuel Botto, personal site

## Goal

A personal website for Manuel Botto at `manuelbotto.com`. It presents his projects,
his career and studies, and his passions. It is not a sales page. The only contact
path is email.

## Positioning line

Use this line verbatim (Spanish), in the first viewport:

> Software Engineer en Mercado Libre, técnico electrónico y docente. Estoy construyendo Juntopia y Proyecto Roxana.

## Audience

1. **People who follow his games and his channel** (Spanish-speaking). They want to see
   what he is making and where to play or follow it.
2. **Peers and recruiters** curious about his engineering work. They want a plain,
   factual view of his career and public projects.
3. **Students** interested in programming and electronics. They want to see how a
   person moves from electronics and teaching into software and game development.

## What the site must do

- In under 30 seconds, a visitor can answer: who Manuel is, what he is building, what
  he studied and did, and how to reach him.
- Show each project with its real status (launched, in development, early design).
  Do not overstate any of them.
- Show passions as their own section, and career and studies as plain facts from
  `docs/CONTENT.md`.
- Offer one contact path: email, through `NEXT_PUBLIC_CONTACT_EMAIL`. Link to GitHub
  and, when configured, to YouTube.

## Sections

Headings are in Spanish.

1. **Inicio** (hero) — name, positioning line, short links to the sections below.
2. **Proyectos** — Juntopia, Proyecto Roxana, Juego de Hormigas, EventFlow.
3. **Pasiones** — video games, board and card games, teaching and science/tech outreach.
4. **Fuera del código** — futsal at Racing Club (champion 2026) and what it teaches him.
4. **Trayectoria** — work (trabajo) and studies (estudios).
5. **Videos** — rendered only when `NEXT_PUBLIC_YOUTUBE_URL` is set.
6. **Contacto** — a `mailto:` link, plus GitHub.

## Tone

- Spanish, direct and plain. Short sentences.
- Factual. No superlatives, hype or marketing clichés ("soluciones a medida",
  "apasionado por", "transformo ideas").
- Do not say a project is running, shipped or in production unless `docs/CONTENT.md`
  says so.

## Out of scope

- Services, prices, hourly rates, sprints or packages.
- Freelance offers, "contrátame" CTAs, qualification forms.
- Commercial demos or demo pages of any kind.
- Testimonials, client logos, production metrics, conversion goals.
- WhatsApp or any messaging-app CTA.
- Blog or CMS, auth, database, server-side features.

## Content boundaries

- Every fact comes from `docs/CONTENT.md`. A fact that is not there is not published.
- Proyecto Roxana is shown under its working title and links to its public repository.
- Juntopia links to `https://juntopia.com`.
- Juego de Hormigas and EventFlow link to their public GitHub repositories.

## Success

- A reader leaves knowing who Manuel is and what he makes.
- The page reads well on mobile and feels alive: an interactive circuit hero, project tiles with their own animation, and motion that respects reduced-motion settings.
- No numeric targets are set. Do not invent baselines.
