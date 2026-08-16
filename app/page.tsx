import { capabilities, caseStudies, contact, services } from "@/lib/content";

const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.inquirySubject)}`;
const inquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.inquirySubject)}&body=${encodeURIComponent(contact.inquiryBody)}`;

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Manuel Botto — back to top">MB / build & ship</a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a className="navCta" href={emailHref}>Start a project</a>
        </nav>
      </header>

      <section id="top" className="hero shell">
        <div className="eyebrow"><span className="statusDot" /> Available for focused freelance projects</div>
        <h1>Full-Stack + AI Automation — focused <span>web software</span> sprints that ship.</h1>
        <p className="heroCopy">
          Full-stack development, AI integration and web experiences built to turn traffic into qualified conversations for small teams and businesses that need a useful result — not a six-month discovery phase.
        </p>
        <p className="heroPrice">Sprints from <strong>USD 650</strong> — scoped, tested, deployed.</p>
        <div className="heroActions">
          <a className="button primary" href={inquiryHref}>Tell me what you need</a>
          {contact.whatsappUrl ? (
            <a className="button ghost" href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          ) : null}
          <a className="button ghost" href="#work">See proof of work</a>
        </div>
        <div className="trustRow" aria-label="Capabilities">
          {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
        </div>
      </section>

      <section className="intro shell">
        <p className="kicker">WHO I AM</p>
        <p className="introCopy">I&apos;m Manuel Botto, a software developer from Argentina focused on React/TypeScript products, AI-enabled workflows and browser experiences. I use AI aggressively to accelerate implementation, but I treat tests, review and a working production build as the definition of done.</p>
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

      <section id="work" className="section shell">
        <div className="sectionHead">
          <div><p className="kicker">PROOF, NOT CLAIMS</p><h2>Real work separated from commercial demos.</h2></div>
          <p>No fake client logos. Demonstration projects are labeled as demos until they become paid case studies.</p>
        </div>
        <div className="caseGrid">
          {caseStudies.map((item) => (
            <a className="caseCard" href={item.href} key={item.title} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
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
        <p>I can start with a small paid sprint and expand only if the first delivery creates value.</p>
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