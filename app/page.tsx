import { capabilityGroups, caseStudies, contact, experience, heroTags, services } from "@/lib/content";

const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.inquirySubject)}`;
const inquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.inquirySubject)}&body=${encodeURIComponent(contact.inquiryBody)}`;

const flagship = caseStudies.find((item) => item.group === "backend");
const realProject = caseStudies.find((item) => item.group === "experimental");
const productDemos = caseStudies.filter((item) => item.group === "product");
const [currentRole, ...previousRoles] = experience;

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Manuel Botto — back to top">MB / build & ship</a>
        <nav aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a className="navCta" href={emailHref}>Start a project</a>
        </nav>
      </header>

      <section id="top" className="hero shell">
        <div className="eyebrow"><span className="statusDot" /> Backend Software Engineer — available for focused projects</div>
        <h1>Backend Software Engineer building <span>reliable distributed systems</span> in Go.</h1>
        <p className="heroCopy">
          I design, build and operate production backend services — APIs, microservices, event-driven workflows — and ship the React/TypeScript product surfaces around them when the job needs it.
        </p>
        <p className="heroPrice">Available for focused backend engagements — hourly or fixed scope.</p>
        <div className="heroActions">
          <a className="button primary" href={inquiryHref}>Tell me what you need</a>
          {contact.whatsappUrl ? (
            <a className="button ghost" href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          ) : null}
          <a className="button ghost" href="#work">See proof of work</a>
        </div>
        <div className="trustRow" aria-label="Backend focus areas">
          {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      <section className="intro shell">
        <p className="kicker">WHO I AM</p>
        <p className="introCopy">I&apos;m Manuel Botto, a backend software engineer from Argentina. I build and operate production services in Go at Mercado Libre, and I take on focused freelance projects across backend systems, React/TypeScript products and interactive web experiences.</p>
      </section>

      <section id="experience" className="section shell">
        <div className="sectionHead">
          <div><p className="kicker">EXPERIENCE</p><h2>Production backend engineering, not portfolio claims.</h2></div>
          <p>Currently building customer-experience backend services at Mercado Libre. Concepts yes — employer code and internal details stay private.</p>
        </div>

        <article className="xpCurrent">
          <div className="xpHead">
            <div>
              <h3>{currentRole.role} — {currentRole.company}</h3>
              <p className="xpPeriod">{currentRole.period}</p>
            </div>
            <span className="xpBadge">CURRENT</span>
          </div>
          <p className="xpSummary">{currentRole.summary}</p>
          <ul className="xpBullets">
            {currentRole.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
          <div className="trustRow" aria-label="Technologies used in this role">
            {currentRole.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </article>

        <div className="xpGrid">
          {previousRoles.map((entry) => (
            <article className="xpItem" key={entry.role}>
              <h3>{entry.role}{entry.company ? ` — ${entry.company}` : ""}</h3>
              <p className="xpPeriod">{entry.period}</p>
              <p className="xpSummary">{entry.summary}</p>
              {entry.tags.length > 0 ? (
                <div className="trustRow" aria-label="Technologies used in this role">
                  {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="sectionHead">
          <div><p className="kicker">WHAT I WORK WITH</p><h2>Backend first. Product engineering when the job needs it.</h2></div>
          <p>The stack I use professionally every day, plus the product and experimental tools I ship with outside of it.</p>
        </div>
        <div className="capGroups">
          {capabilityGroups.map((group) => (
            <div className="capGroup" key={group.title}>
              <h3>{group.title}</h3>
              <div className="trustRow" aria-label={group.title}>
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section shell">
        <div className="sectionHead">
          <div><p className="kicker">PROOF, NOT CLAIMS</p><h2>Real work separated from commercial demos.</h2></div>
          <p>No fake client logos. Demonstration projects are labeled as demos until they become paid case studies.</p>
        </div>

        {flagship ? (
          <>
            <p className="workSubhead">BACKEND REFERENCE IMPLEMENTATION</p>
            <a className="caseCard flagshipCard" href={flagship.href}>
              <span className="label">{flagship.label}</span>
              <h3>{flagship.title}</h3>
              <strong>{flagship.subtitle}</strong>
              <p>{flagship.description}</p>
              <div className="flowRow" aria-label="System flow">
                <span>API</span><span>Event Stream</span><span>Orchestrator</span><span>Email / Push / In-app</span>
              </div>
              <div className="outcome">{flagship.outcome}</div>
              <span className="caseLink">Open case →</span>
            </a>
          </>
        ) : null}

        {realProject ? (
          <>
            <p className="workSubhead">EXPERIMENTAL / AI ENGINEERING</p>
            <a className="caseCard flagshipCard" href={realProject.href} target="_blank" rel="noreferrer">
              <span className="label">{realProject.label}</span>
              <h3>{realProject.title}</h3>
              <strong>{realProject.subtitle}</strong>
              <p>{realProject.description}</p>
              <div className="outcome">{realProject.outcome}</div>
              <span className="caseLink">Open case →</span>
            </a>
          </>
        ) : null}

        <p className="workSubhead">PRODUCT ENGINEERING DEMOS</p>
        <div className="caseGrid three">
          {productDemos.map((item) => (
            <a className="caseCard" href={item.href} key={item.title}>
              <span className="label">{item.label}</span>
              <h3>{item.title}</h3>
              <strong>{item.subtitle}</strong>
              <p>{item.description}</p>
              <div className="outcome">{item.outcome}</div>
              <span className="caseLink">Open case →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="services" className="section shell">
        <div className="sectionHead">
          <div><p className="kicker">PRODUCTIZED SERVICES</p><h2>Small enough to start. Valuable enough to matter.</h2></div>
          <p>Clear first scope, explicit acceptance criteria and a path to expand only after the first result works.</p>
        </div>
        <div className="serviceGrid">
          {services.map((service, index) => (
            <article className="serviceCard" key={service.slug}>
              <div className="cardTop"><span>0{index + 1}</span><strong>{service.price}</strong></div>
              <h3>{service.title}</h3>
              <p>{service.promise}</p>
              <small>{service.proof}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section shell">
        <div className="processPanel">
          <div>
            <p className="kicker">HOW I WORK</p>
            <h2>AI speeds up delivery. Validation decides when it is done.</h2>
          </div>
          <ol>
            <li><b>01</b><span><strong>Define the outcome</strong><small>One user/business result, scope boundaries and acceptance checks.</small></span></li>
            <li><b>02</b><span><strong>Build in parallel</strong><small>Implementation, copy, review and QA run in parallel against the agreed spec, so the result matches what you approved.</small></span></li>
            <li><b>03</b><span><strong>Run the gates</strong><small>Lint, types, tests, production build and browser checks before calling it finished.</small></span></li>
            <li><b>04</b><span><strong>Ship and measure</strong><small>A working deliverable first; further scope is earned by evidence.</small></span></li>
          </ol>
        </div>
      </section>

      <section className="finalCta shell">
        <p className="kicker">NEED TO SHIP SOMETHING?</p>
        <h2>Send the problem, current stack and desired outcome.</h2>
        <p>Available for focused hourly engagements and fixed-scope backend projects. Tell me where you are, what you need shipped, and I will reply with a scoped proposal.</p>
        <div className="finalCtaActions">
          <a className="button primary" href={inquiryHref}>{contact.email}</a>
          {contact.whatsappUrl ? (
            <a className="button ghost" href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          ) : null}
        </div>
      </section>

      <footer className="footer shell">
        <span>Manuel Botto · Argentina · Remote worldwide</span>
        <a href="https://github.com/Bottousky" target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </main>
  );
}
