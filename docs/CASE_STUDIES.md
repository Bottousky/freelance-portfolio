# Case Study Policy

## Flagship demo: EventFlow / Notification Orchestrator

Public repository (fictitious, self-contained, no employer code or concepts copied):

`https://github.com/Bottousky/eventflow`

Purpose: prove production backend engineering for visitors who cannot see employer code.

Approved framing (use verbatim or near-verbatim):

> I can't share my employer's production code, so I built a small public system demonstrating the same engineering concepts I work with professionally.

What the system must contain:

- Go services: REST API → append-only event stream → notification orchestrator → email / push / in-app senders (simulated);
- ordered event processing per ordering key;
- SQL storage (SQLite, pure Go) and a key-value store used for idempotency;
- retries with backoff and a dead-letter queue;
- structured logging and a metrics endpoint;
- unit tests and an end-to-end test;
- documented architecture (README + diagram), honest mapping to production infrastructure (Kafka/SQS etc.);
- Docker support optional.

Explicit “DEMONSTRATION PROJECT” label. Never imply it is a production system or a client deliverable.

## Real: Proyecto Roxana

Public repository:

`https://github.com/Bottousky/proyecto-roxana`

What can be claimed from the repository:

- educational browser game ecosystem;
- TypeScript + Vite;
- Three.js for spatial/HD-2D work;
- Babylon.js for Physica experiments;
- Phaser 4 baseline/experiments;
- Playwright and deterministic gameplay QA hooks;
- explicit agentic production documentation.

Do not claim commercial users, revenue or client outcomes.

## Product Engineering demos (secondary group)

The three demos below stay on the site as the “Product Engineering” group, below EventFlow and Proyecto Roxana in visual hierarchy.

## Demo: Lead Qualification Engine

Purpose: prove conversion/funnel thinking for construction and other high-ticket service businesses.

Desired final demo:

- interactive multi-step form;
- visible lead score/route explanation;
- generated sales summary using deterministic mock data (no paid API required);
- mobile-first behavior;
- explicit “DEMONSTRATION PROJECT” label.

## Demo: AI Operations Desk

Purpose: prove human-in-the-loop AI integration thinking.

Desired final demo:

- intake record;
- AI processing state;
- confidence/structured output;
- human approve/edit/reject gate;
- retry/error state;
- deterministic mocked data.

## Demo: SaaS Validation Sprint

Purpose: prove product/React engineering for founders.

Desired final demo:

- compact dashboard;
- one core workflow;
- loading, empty, success and error states;
- responsive layout;
- deterministic data.

## Optional demo: Interactive Web

Only add if it remains fast and does not distract from the first three commercial offers. A small purposeful Three.js scene is better than a heavy decorative background.
