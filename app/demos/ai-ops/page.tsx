import Link from "next/link";
import { DemoCta } from "@/components/DemoCta";
import { AiOpsDemo } from "@/components/demos/AiOpsDemo";

export default function AiOpsDemoPage() {
  return (
    <main className="demo shell">
      <Link className="demoBack" href="/">← Back to portfolio</Link>
      <section className="demoHero">
        <p className="kicker">DEMONSTRATION PROJECT</p>
        <h1>AI Operations Desk</h1>
        <p className="heroCopy">
          A human-in-the-loop AI workflow concept that makes state, confidence, retries and final
          actions visible instead of hiding everything behind a chat bubble. Run the simulated AI step,
          then approve, edit or reject before the action is final.
        </p>
      </section>
      <AiOpsDemo />
      <DemoCta />
    </main>
  );
}