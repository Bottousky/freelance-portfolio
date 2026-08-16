import Link from "next/link";
import { DemoCta } from "@/components/DemoCta";
import { SaasSprintDemo } from "@/components/demos/SaasSprintDemo";

export default function SaasSprintDemoPage() {
  return (
    <main className="demo shell">
      <Link className="demoBack" href="/">← Back to portfolio</Link>
      <section className="demoHero">
        <p className="kicker">DEMONSTRATION PROJECT</p>
        <h1>SaaS Validation Sprint</h1>
        <p className="heroCopy">
          A product slice concept for founders who need to test the core workflow before spending months
          building the complete platform. Pick a project, add tasks and watch loading, empty, success and
          error states behave like a real product.
        </p>
      </section>
      <SaasSprintDemo />
      <DemoCta />
    </main>
  );
}