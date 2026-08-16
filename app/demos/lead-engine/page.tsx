import Link from "next/link";
import { DemoCta } from "@/components/DemoCta";
import { LeadEngineDemo } from "@/components/demos/LeadEngineDemo";

export default function LeadEngineDemoPage() {
  return (
    <main className="demo shell">
      <Link className="demoBack" href="/">← Back to portfolio</Link>
      <section className="demoHero">
        <p className="kicker">DEMONSTRATION PROJECT</p>
        <h1>Lead Qualification Engine</h1>
        <p className="heroCopy">
          A construction-company funnel concept designed to turn vague WhatsApp traffic into useful,
          structured sales opportunities. Fill in the form below — the scoring rules are deterministic
          and fully explained.
        </p>
      </section>
      <LeadEngineDemo />
      <DemoCta />
    </main>
  );
}