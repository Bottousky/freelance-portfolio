import type { Metadata } from "next";
import Link from "next/link";
import { DemoCta } from "@/components/DemoCta";

export const metadata: Metadata = {
  title: "EventFlow — Notification Orchestrator | Manuel Botto",
  description:
    "A reference architecture for an event-driven notification system in Go: REST API, append-only event stream, notification orchestrator with ordered processing, idempotency, retries, dead-lettering, SQL storage, metrics and unit tests. The implementation lives in a separate public repository.",
};

const repoUrl = "https://github.com/Bottousky/eventflow";

const highlights = [
  {
    title: "Ordered event processing",
    body: "Events are appended to a durable stream and consumed in order per ordering key, so a user's notifications never arrive shuffled.",
  },
  {
    title: "Idempotency",
    body: "A key-value store deduplicates deliveries by event ID — retries never send the same notification twice.",
  },
  {
    title: "Retries + dead-letter queue",
    body: "Failed sends retry with exponential backoff; after the attempt budget is exhausted the event lands in a dead-letter queue for inspection.",
  },
  {
    title: "SQL storage",
    body: "Events, notifications and delivery attempts are persisted in SQLite via a pure-Go driver — no external services required to run or test.",
  },
  {
    title: "Observability",
    body: "Structured logs (log/slog) on every stage transition and a /metrics endpoint with counters for received, processed, retried and dead-lettered events.",
  },
  {
    title: "Tested",
    body: "Unit tests for stream ordering, retry/backoff, idempotency and API validation, plus an end-to-end test that runs the whole pipeline.",
  },
] as const;

const stack = ["Go", "net/http", "SQLite (pure Go)", "log/slog", "Docker", "docker-compose"] as const;

export default function EventFlowDemoPage() {
  return (
    <main className="demo shell">
      <Link className="demoBack" href="/">← Back to portfolio</Link>
      <section className="demoHero">
        <p className="kicker">DEMONSTRATION PROJECT · REFERENCE ARCHITECTURE</p>
        <h1>EventFlow — Notification Orchestrator</h1>
        <p className="heroCopy">
          A reference architecture for an event-driven notification system in Go:
          a REST API accepts events, an append-only stream orders them, and an
          orchestrator fans them out to email, push and in-app senders with
          retries, idempotency and observability.
        </p>
      </section>

      <p className="demoEvidenceNote" role="note">
        <strong>What this page is:</strong> a description of the system I built and the
        engineering concepts behind it.
        <br />
        <strong>What this page is not:</strong> a hosted, running instance of the service.
        The implementation lives in the public repository below — clone it, run the tests,
        and start the API and worker locally.
      </p>

      <blockquote className="demoQuote">
        I can&apos;t share my employer&apos;s production code, so I built a small public system
        demonstrating the same engineering concepts I work with professionally — and
        described the architecture on this page so the engineering thinking is visible
        even before you clone the repository.
      </blockquote>

      <section className="demoPanel" aria-label="Architecture diagram">
        <p className="kicker">ARCHITECTURE</p>
        <div className="archDiagram">
          <svg viewBox="0 0 900 340" role="img" aria-label="EventFlow reference architecture: a REST API writes events to an append-only event stream; the notification orchestrator consumes them in order and fans out to email, push and in-app senders.">
            <defs>
              <marker id="archArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a8ff6a" />
              </marker>
            </defs>

            <g className="archBox">
              <rect x="20" y="120" width="150" height="80" rx="12" />
              <text x="95" y="155" className="archLabel" textAnchor="middle">REST API</text>
              <text x="95" y="178" className="archSub" textAnchor="middle">POST /events</text>
            </g>

            <line className="archArrow" x1="176" y1="160" x2="224" y2="160" markerEnd="url(#archArrow)" />

            <g className="archBox">
              <rect x="230" y="120" width="170" height="80" rx="12" />
              <text x="315" y="155" className="archLabel" textAnchor="middle">Event Stream</text>
              <text x="315" y="178" className="archSub" textAnchor="middle">append-only, ordered</text>
            </g>

            <line className="archArrow" x1="406" y1="160" x2="464" y2="160" markerEnd="url(#archArrow)" />

            <g className="archBox">
              <rect x="470" y="120" width="190" height="80" rx="12" />
              <text x="565" y="155" className="archLabel" textAnchor="middle">Notification</text>
              <text x="565" y="178" className="archLabel" textAnchor="middle">Orchestrator</text>
            </g>

            <path className="archArrow" d="M 666 140 C 700 140 700 70 724 70" markerEnd="url(#archArrow)" />
            <path className="archArrow" d="M 666 160 L 724 160" markerEnd="url(#archArrow)" />
            <path className="archArrow" d="M 666 180 C 700 180 700 270 724 270" markerEnd="url(#archArrow)" />

            <g className="archBox">
              <rect x="730" y="40" width="150" height="60" rx="12" />
              <text x="805" y="76" className="archLabel" textAnchor="middle">Email</text>
            </g>
            <g className="archBox">
              <rect x="730" y="140" width="150" height="60" rx="12" />
              <text x="805" y="176" className="archLabel" textAnchor="middle">Push</text>
            </g>
            <g className="archBox">
              <rect x="730" y="240" width="150" height="60" rx="12" />
              <text x="805" y="276" className="archLabel" textAnchor="middle">In-app</text>
            </g>
          </svg>
        </div>
        <p className="demoHint">
          The diagram describes the reference architecture. The senders are simulated and
          failures can be injected deterministically to demonstrate retry and dead-letter
          behavior. In production, the same components map to managed infrastructure —
          the stream to Kafka/SQS, the store to Postgres, the KVS to Redis.
        </p>
      </section>

      <section className="demoGridSection" aria-label="Engineering highlights">
        <div className="demoGrid">
          {highlights.map((item) => (
            <div className="demoItem" key={item.title}>
              <span>{item.title}</span>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="demoPanel" aria-label="Stack and repository">
        <p className="kicker">STACK</p>
        <div className="trustRow">
          {stack.map((item) => <span key={item}>{item}</span>)}
        </div>
        <h3 className="demoRunTitle">Run the implementation</h3>
        <p className="demoHint">
          The runnable system lives in the public repository. These commands assume
          you have cloned it locally — they are not executed by this portfolio.
        </p>
        <pre className="codeBlock"><code>{`git clone https://github.com/Bottousky/eventflow.git
cd eventflow
go test ./...
go run ./cmd/eventflow api      # REST API on :8080
go run ./cmd/eventflow worker   # orchestrator + senders`}</code></pre>
        <div className="demoCtaActions" style={{ marginTop: 24 }}>
          <a className="button primary" href={repoUrl} target="_blank" rel="noreferrer">View the public repository ↗</a>
        </div>
      </section>

      <DemoCta />
    </main>
  );
}
