import { contact } from "@/lib/content";

const inquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.inquirySubject)}&body=${encodeURIComponent(contact.inquiryBody)}`;

export function DemoCta() {
  return (
    <section className="demoCta">
      <p className="kicker">LIKE WHAT YOU SEE?</p>
      <h2>Want this built for your business?</h2>
      <p>Send the problem, current stack, desired result, urgency and approximate budget — I&apos;ll reply with a scoped sprint proposal.</p>
      <div className="demoCtaActions">
        <a className="button primary" href={inquiryHref}>Tell me what you need</a>
        {contact.whatsappUrl ? (
          <a className="button ghost" href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        ) : null}
      </div>
    </section>
  );
}