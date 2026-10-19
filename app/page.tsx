import { contact, passions, profile, projects, studies, tools, work } from "@/lib/content";

const emailHref = `mailto:${contact.email}`;

const [featured, ...otherProjects] = projects;

function PassionIcon({ slug }: { slug: string }) {
  const common = {
    width: 28,
    height: 28,
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

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <header className="topbar wrap">
        <a className="brand" href="#inicio">{profile.name}</a>
        <nav aria-label="Secciones">
          <a href="#proyectos">Proyectos</a>
          <a href="#pasiones">Pasiones</a>
          <a href="#trayectoria">Trayectoria</a>
          {contact.youtubeUrl ? <a href="#videos">Videos</a> : null}
          <a className="navContact" href="#contacto">Contacto</a>
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero wrap">
          <div className="heroText">
            <h1>{profile.greeting}</h1>
            <p className="lead">{profile.lead}</p>
            <ul className="facts" aria-label="En pocas palabras">
              {profile.facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <div className="actions">
              <a className="btn btnPrimary" href="#proyectos">Ver mis proyectos</a>
              <a className="btn btnGhost" href={emailHref}>Escribime</a>
            </div>
          </div>
          <div className="hand" aria-hidden="true">
            {profile.hand.map((card) => (
              <div className="playCard" key={card.word}>
                <span className="pip">{card.index}</span>
                <strong>{card.word}</strong>
                <small>{card.caption}</small>
                <span className="pip pipBottom">{card.index}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="proyectos" className="section wrap" aria-labelledby="proyectos-title">
          <header className="sectionHead">
            <p className="eyebrow">01 · Proyectos</p>
            <h2 id="proyectos-title">Lo que estoy construyendo.</h2>
            <p>Juegos y herramientas que hago por mi cuenta. Cada uno tiene su propio público; acá está el panorama completo.</p>
          </header>

          {featured ? (
            <article className="project projectFeatured">
              <div className="projectMain">
                <p className="projectMeta"><span className="status">{featured.status}</span>{featured.kind}</p>
                <h3>{featured.title}</h3>
                <p className="projectSummary">{featured.summary}</p>
                <p className="projectNote">{featured.note}</p>
                {featured.href ? (
                  <a className="btn btnPrimary" href={featured.href} target="_blank" rel="noreferrer">
                    {featured.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
              <ul className="tags" aria-label={`Tecnologías de ${featured.title}`}>
                {featured.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ) : null}

          <div className="projectGrid">
            {otherProjects.map((project) => (
              <article className="project" key={project.slug}>
                <p className="projectMeta"><span className="status">{project.status}</span>{project.kind}</p>
                <h3>{project.title}</h3>
                <p className="projectSummary">{project.summary}</p>
                <p className="projectNote">{project.note}</p>
                <ul className="tags" aria-label={`Tecnologías de ${project.title}`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {project.href ? (
                  <a className="textLink" href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel} <span className="srOnly">de {project.title}</span> <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="pasiones" className="section wrap" aria-labelledby="pasiones-title">
          <header className="sectionHead">
            <p className="eyebrow">02 · Pasiones</p>
            <h2 id="pasiones-title">Lo que me mueve.</h2>
            <p>Casi todo lo que hago fuera del trabajo sale de alguna de estas tres cosas.</p>
          </header>
          <div className="passionGrid">
            {passions.map((passion) => (
              <article className="passion" key={passion.slug}>
                <span className="passionIcon"><PassionIcon slug={passion.slug} /></span>
                <h3>{passion.title}</h3>
                <p>{passion.body}</p>
                <p className="related">{passion.related.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="trayectoria" className="section wrap" aria-labelledby="trayectoria-title">
          <header className="sectionHead">
            <p className="eyebrow">03 · Trayectoria</p>
            <h2 id="trayectoria-title">De la electrónica al backend, pasando por el aula.</h2>
          </header>
          <div className="pathGrid">
            <div>
              <h3 className="colTitle">Trabajo</h3>
              <ol className="timeline">
                {work.map((entry) => (
                  <li key={entry.place} className={entry.current ? "current" : undefined}>
                    <p className="period">{entry.period}</p>
                    <h4>{entry.role} <span>· {entry.place}</span></h4>
                    <p>{entry.summary}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="colTitle">Estudios</h3>
              <ul className="studyList">
                {studies.map((study) => (
                  <li key={study.title}>
                    <h4>{study.title}</h4>
                    <p>{study.detail}</p>
                  </li>
                ))}
              </ul>
              <h3 className="colTitle">Con qué construyo</h3>
              <ul className="tags" aria-label="Herramientas">
                {tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {contact.youtubeUrl ? (
          <section id="videos" className="feltBand" aria-labelledby="videos-title">
            <div className="wrap feltInner">
              <div>
                <p className="eyebrow">04 · Videos</p>
                <h2 id="videos-title">Devlog: construyendo en público.</h2>
              </div>
              <div>
                <p>Cómo hago Juntopia, Proyecto Roxana y lo que venga después, contado en video.</p>
                <a className="btn btnLight" href={contact.youtubeUrl} target="_blank" rel="noreferrer">
                  Ver el canal en YouTube <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>
        ) : null}

        <section id="contacto" className="contact wrap" aria-labelledby="contacto-title">
          <p className="eyebrow">Contacto</p>
          <h2 id="contacto-title">Escribime.</h2>
          <p>Si querés charlar sobre algún proyecto, un juego o sobre enseñar programación y electrónica, mandame un mail.</p>
          <a className="btn btnPrimary btnBig" href={emailHref}>{contact.email}</a>
        </section>
      </main>

      <footer className="footer wrap">
        <span>{profile.name} · Argentina</span>
        <nav aria-label="Redes">
          <a href={contact.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          {contact.youtubeUrl ? <a href={contact.youtubeUrl} target="_blank" rel="noreferrer">YouTube</a> : null}
          <a href={emailHref}>Email</a>
        </nav>
      </footer>
    </>
  );
}
