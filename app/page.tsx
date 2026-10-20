import type { CSSProperties, ReactNode } from "react";
import { CircuitField } from "@/components/CircuitField";
import { CopyEmail } from "@/components/CopyEmail";
import { Interactions } from "@/components/Interactions";
import { contact, marquee, passions, profile, projects, studies, tools, work } from "@/lib/content";

const emailHref = `mailto:${contact.email}`;

// Each project tile carries its own accent (as "R G B" so CSS can vary the alpha).
const projectAccent: Record<string, string> = {
  juntopia: "255 77 141",
  "proyecto-roxana": "51 225 255",
  "juego-de-hormigas": "255 184 77",
  eventflow: "139 108 255",
};

function JuntopiaVisual() {
  return (
    <div className="vHand" aria-hidden="true">
      {["Truco", "Brisca", "Generala"].map((game, i) => (
        <div className="vCard" key={game} style={{ "--i": i } as CSSProperties}>
          <span className="vPip">{["1", "7", "12"][i]}</span>
          <strong>{game}</strong>
          <span className="vPip vPipEnd">{["1", "7", "12"][i]}</span>
        </div>
      ))}
    </div>
  );
}

function RoxanaVisual() {
  return (
    <svg className="vCircuit" viewBox="0 0 240 150" aria-hidden="true">
      <path className="wire" d="M40 80 V110 H190 V40 H137 M95 40 H40 V70" />
      <path className="current" d="M40 80 V110 H190 V40 H137 M95 40 H40 V70" />
      <g className="battery">
        <line x1="28" y1="70" x2="52" y2="70" />
        <line x1="33" y1="80" x2="47" y2="80" />
      </g>
      <g className="resistor">
        <path d="M95 40 l6 -8 l10 16 l10 -16 l10 16 l6 -8" />
      </g>
      <circle className="bulbGlow" cx="190" cy="75" r="26" />
      <circle className="bulb" cx="190" cy="75" r="12" />
      <path className="filament" d="M184 77 q3 -8 6 0 q3 8 6 0" />
    </svg>
  );
}

function HormigasVisual() {
  const trail = "M10 120 C 60 120, 70 40, 120 60 S 190 130, 230 30";
  return (
    <svg className="vTrail" viewBox="0 0 240 150" aria-hidden="true">
      <path className="trail" d={trail} />
      <circle className="colony" cx="230" cy="30" r="9" />
      <g className="ant">
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={trail} />
        <ellipse cx="-7" cy="0" rx="5" ry="3.6" />
        <ellipse cx="0" cy="0" rx="3" ry="2.6" />
        <ellipse cx="6" cy="0" rx="3.4" ry="3" />
        <path d="M-2 -2 l-3 -5 M1 -2 l0 -6 M3 -2 l4 -5 M-2 2 l-3 5 M1 2 l0 6 M3 2 l4 5" />
      </g>
    </svg>
  );
}

function EventFlowVisual() {
  return (
    <div className="vFlow" aria-hidden="true">
      <div className="vFlowRail">
        {[0, 1, 2, 3].map((i) => <span key={i} className="vEvent" style={{ "--i": i } as CSSProperties} />)}
      </div>
      <div className="vFlowNodes">
        <span>API</span>
        <span>Stream</span>
        <span>Orquestador</span>
        <span className="vFan"><i>email</i><i>push</i><i>in-app</i></span>
      </div>
    </div>
  );
}

const projectVisual: Record<string, () => ReactNode> = {
  juntopia: JuntopiaVisual,
  "proyecto-roxana": RoxanaVisual,
  "juego-de-hormigas": HormigasVisual,
  eventflow: EventFlowVisual,
};

function PassionIcon({ slug }: { slug: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (slug === "videojuegos") {
    return (
      <svg {...common}>
        <path d="M7 8h10a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1-6.3 2.1L14 14.5h-4l-.7 1.1A3.5 3.5 0 0 1 3 13.5V12a4 4 0 0 1 4-4Z" />
        <path d="M7.5 11v3M6 12.5h3" />
        <circle cx="16" cy="11.5" r=".6" fill="currentColor" />
        <circle cx="17.5" cy="13.5" r=".6" fill="currentColor" />
      </svg>
    );
  }
  if (slug === "juegos-de-mesa") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="10" height="14" rx="1.6" transform="rotate(-10 8.5 12)" />
        <rect x="10.5" y="5" width="10" height="14" rx="1.6" transform="rotate(8 15.5 12)" />
        <path d="M15.6 10.2l1 1.6-1 1.6-1-1.6Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      <path d="M12 7.5 10.5 10h3L12 12.5" />
    </svg>
  );
}

function MarqueeRow({ words, reverse }: { words: readonly string[]; reverse?: boolean }) {
  const items = [...words, ...words];
  return (
    <div className={`marqueeRow${reverse ? " reverse" : ""}`}>
      <div className="marqueeTrack">
        {items.map((word, i) => <span key={`${word}-${i}`}>{word}</span>)}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Interactions />
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <header className="topbar">
        <div className="wrap topbarInner">
          <a className="brand" href="#inicio"><span className="brandMark" aria-hidden="true">MB</span>{profile.name}</a>
          <nav aria-label="Secciones">
            <a href="#proyectos">Proyectos</a>
            <a href="#pasiones">Pasiones</a>
            <a href="#trayectoria">Trayectoria</a>
            {contact.youtubeUrl ? <a href="#videos">Videos</a> : null}
            <a className="navContact" href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero">
          <CircuitField />
          <div className="heroShade" aria-hidden="true" />
          <div className="wrap heroInner">
            <p className="mono heroTag"><span className="liveDot" aria-hidden="true" /> {profile.facts.join(" · ")}</p>
            <h1>
              <span className="hi">{profile.greeting}</span>{" "}
              <span className="name">{profile.name}</span>
            </h1>
            <p className="rotator">
              <span className="srOnly">Yo {profile.roles.join(" ")}</span>
              <span aria-hidden="true" className="rotPrefix">Yo</span>
              <span aria-hidden="true" className="rotWindow">
                <span className="rotTrack">
                  {[...profile.roles, profile.roles[0]].map((role, i) => <span key={`${role}-${i}`}>{role}</span>)}
                </span>
              </span>
            </p>
            <p className="lead">{profile.lead}</p>
            <div className="actions">
              <a className="btn btnPrimary" href="#proyectos">Ver mis proyectos <span aria-hidden="true">→</span></a>
              <a className="btn btnGhost" href={emailHref}>Escribime</a>
            </div>
            <p className="mono probeHint" aria-hidden="true">↳ Es un circuito: <span className="hintPointer">mové el puntero o hacé click</span><span className="hintTouch">tocalo</span> para darle corriente.</p>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <MarqueeRow words={marquee.craft} />
          <MarqueeRow words={marquee.play} reverse />
        </div>

        <section id="proyectos" className="section wrap" aria-labelledby="proyectos-title">
          <header className="sectionHead" data-reveal>
            <p className="eyebrow mono">01 / Proyectos</p>
            <h2 id="proyectos-title">Lo que estoy <em>construyendo</em>.</h2>
            <p>Juegos y herramientas que hago por mi cuenta. Cada uno tiene su propio público; acá está el panorama completo.</p>
          </header>

          <div className="bento">
            {projects.map((project, i) => {
              const Visual = projectVisual[project.slug];
              return (
                <article
                  key={project.slug}
                  className={`tile tile-${project.slug}`}
                  style={{ "--accent": projectAccent[project.slug] ?? "139 108 255", "--d": `${i * 80}ms` } as CSSProperties}
                  data-glow
                  data-tilt
                  data-reveal
                >
                  <div className="tileVisual">{Visual ? <Visual /> : null}</div>
                  <div className="tileBody">
                    <p className="tileMeta"><span className="status">{project.status}</span><span className="mono">{project.kind}</span></p>
                    <h3>{project.title}</h3>
                    <p className="tileSummary">{project.summary}</p>
                    <p className="tileNote">{project.note}</p>
                    <ul className="chips" aria-label={`Tecnologías de ${project.title}`}>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    {project.href ? (
                      <a className="tileLink" href={project.href} target="_blank" rel="noreferrer">
                        {project.linkLabel} <span className="srOnly">de {project.title}</span> <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="pasiones" className="section wrap" aria-labelledby="pasiones-title">
          <header className="sectionHead" data-reveal>
            <p className="eyebrow mono">02 / Pasiones</p>
            <h2 id="pasiones-title">Lo que me <em>mueve</em>.</h2>
            <p>Casi todo lo que hago fuera del trabajo sale de alguna de estas tres cosas.</p>
          </header>
          <div className="passionGrid">
            {passions.map((passion, i) => (
              <article className="passion" key={passion.slug} data-glow data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                <span className="passionNum" aria-hidden="true">0{i + 1}</span>
                <span className="passionIcon"><PassionIcon slug={passion.slug} /></span>
                <h3>{passion.title}</h3>
                <p>{passion.body}</p>
                <ul className="chips" aria-label="Proyectos relacionados">
                  {passion.related.map((name) => <li key={name}>{name}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="trayectoria" className="section wrap" aria-labelledby="trayectoria-title">
          <header className="sectionHead" data-reveal>
            <p className="eyebrow mono">03 / Trayectoria</p>
            <h2 id="trayectoria-title">De la electrónica al backend, <em>siempre docente</em>.</h2>
          </header>
          <div className="pathGrid">
            <div data-reveal>
              <h3 className="colTitle mono">Trabajo</h3>
              <ol className="timeline">
                {work.map((entry) => (
                  <li key={entry.place} className={entry.current ? "current" : undefined}>
                    <p className="period mono">{entry.period}</p>
                    <h4>{entry.role} <span>· {entry.place}</span></h4>
                    <p>{entry.summary}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <h3 className="colTitle mono">Estudios</h3>
              <ul className="studyList">
                {studies.map((study) => (
                  <li key={study.title} data-glow>
                    <h4>{study.title}</h4>
                    <p>{study.detail}</p>
                  </li>
                ))}
              </ul>
              <h3 className="colTitle mono">Con qué construyo</h3>
              <ul className="chips chipsLoose" aria-label="Herramientas">
                {tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {contact.youtubeUrl ? (
          <section id="videos" className="section wrap" aria-labelledby="videos-title">
            <div className="videoPanel" data-glow data-reveal>
              <span className="playOrb" aria-hidden="true"><span /></span>
              <div>
                <p className="eyebrow mono">04 / Videos</p>
                <h2 id="videos-title">Devlog: construyendo <em>en público</em>.</h2>
                <p>Cómo hago Juntopia, Proyecto Roxana y lo que venga después, contado en video.</p>
              </div>
              <a className="btn btnPrimary" href={contact.youtubeUrl} target="_blank" rel="noreferrer">
                Ver el canal en YouTube <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        ) : null}

        <section id="contacto" className="contact" aria-labelledby="contacto-title">
          <div className="wrap contactInner" data-reveal>
            <p className="eyebrow mono">Contacto</p>
            <h2 id="contacto-title">Escribime.</h2>
            <p>Si querés charlar sobre algún proyecto, un juego o sobre enseñar programación y electrónica, mandame un mail.</p>
            <a className="bigMail" href={emailHref}>{contact.email}</a>
            <div className="actions">
              <CopyEmail email={contact.email} />
              <a className="btn btnGhost" href={contact.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <span className="mono">© {profile.name} · Argentina</span>
        <nav aria-label="Redes">
          <a href={contact.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          {contact.youtubeUrl ? <a href={contact.youtubeUrl} target="_blank" rel="noreferrer">YouTube</a> : null}
          <a href={emailHref}>Email</a>
        </nav>
      </footer>
    </>
  );
}
