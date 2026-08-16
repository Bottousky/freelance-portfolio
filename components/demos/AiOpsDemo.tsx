"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_INTAKE,
  applyDecision,
  normalizeIntake,
  processRecord,
  type ActionLogEntry,
  type AiResult,
  type Channel,
  type IntakeRecord,
  type ReviewDecision,
} from "@/lib/demo/aiOps";

type Phase = "idle" | "processing" | "success" | "error";

const PROCESSING_MS = 1400;

export function AiOpsDemo() {
  const [channel, setChannel] = useState<Channel>(DEFAULT_INTAKE.channel);
  const [contact, setContact] = useState(DEFAULT_INTAKE.contact);
  const [message, setMessage] = useState(DEFAULT_INTAKE.message);
  const [intake, setIntake] = useState<IntakeRecord | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<AiResult | null>(null);
  const [failNext, setFailNext] = useState(false);
  const [decision, setDecision] = useState<ReviewDecision | null>(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState<AiResult | null>(null);
  const [log, setLog] = useState<ActionLogEntry[]>([]);

  const timerRef = useRef<number | null>(null);
  const logSeq = useRef(0);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  function pushLog(action: string, detail: string) {
    logSeq.current += 1;
    setLog((prev) => [...prev, { id: `LOG-${logSeq.current}`, at: "2026-08-16 09:42", action, detail }]);
  }

  function handleNormalize() {
    const record = normalizeIntake({ channel, contact, message });
    setIntake(record);
    setPhase("idle");
    setResult(null);
    setDecision(null);
    setEditing(false);
    pushLog("Intake normalized", `${record.channel} · ${record.contact} · priority ${record.priority}`);
  }

  function runAiStep() {
    if (!intake) return;
    setPhase("processing");
    setResult(null);
    setDecision(null);
    setEditing(false);
    timerRef.current = window.setTimeout(() => {
      if (failNext) {
        setPhase("error");
        pushLog("AI step failed", "Simulated provider timeout after 30s.");
      } else {
        const processed = processRecord(intake);
        setResult(processed);
        setPhase("success");
        pushLog("AI step completed", `${processed.classification} · confidence ${Math.round(processed.confidence * 100)}%`);
      }
    }, PROCESSING_MS);
  }

  function handleApprove() {
    if (!result) return;
    const entry = applyDecision(result, { action: "approved", note: "Approved as-is." });
    setDecision({ action: "approved", note: "Approved as-is." });
    pushLog(entry.action, entry.detail);
  }

  function handleStartEdit() {
    if (!result) return;
    setEdited({ ...result, extracted: { ...result.extracted } });
    setEditing(true);
  }

  function handleSaveEdit() {
    if (!edited) return;
    const entry = applyDecision(edited, { action: "edited", note: "Human corrected extracted fields." });
    setResult(edited);
    setDecision({ action: "edited", note: "Human corrected extracted fields." });
    setEditing(false);
    pushLog(entry.action, entry.detail);
  }

  function handleReject() {
    if (!result) return;
    const entry = applyDecision(result, { action: "rejected", note: "Reviewer rejected the AI output." });
    setDecision({ action: "rejected", note: "Reviewer rejected the AI output." });
    pushLog(entry.action, entry.detail);
  }

  function handleReset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setPhase("idle");
    setResult(null);
    setDecision(null);
    setEditing(false);
    setEdited(null);
    setIntake(null);
    setLog([]);
    logSeq.current = 0;
  }

  return (
    <div className="demoResult">
      {/* 1. Intake */}
      <section className="demoPanel">
        <p className="kicker">1 · INTAKE</p>
        <h3>Normalize the incoming record</h3>
        <div className="demoFieldRow">
          <div className="demoField">
            <label htmlFor="aiChannel">Channel</label>
            <select
              id="aiChannel"
              className="demoInput"
              value={channel}
              onChange={(event) => setChannel(event.target.value as Channel)}
            >
              <option value="email">Email</option>
              <option value="form">Web form</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div className="demoField">
            <label htmlFor="aiContact">Contact</label>
            <input
              id="aiContact"
              className="demoInput"
              type="text"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
          </div>
        </div>
        <div className="demoField">
          <label htmlFor="aiMessage">Raw message</label>
          <textarea
            id="aiMessage"
            className="demoInput"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <div className="demoNav">
          <span className="demoHint">Normalization is deterministic: id, priority and timestamp derive from the input.</span>
          <button type="button" className="button primary" onClick={handleNormalize}>
            Normalize intake
          </button>
        </div>
        {intake && (
          <div className="demoFinal">
            <strong>Record {intake.id}</strong>
            <p>
              {intake.receivedAt} · {intake.channel} · {intake.contact} · priority {intake.priority}
            </p>
          </div>
        )}
      </section>

      {/* 2. AI step */}
      <section className="demoPanel">
        <p className="kicker">2 · AI PROCESSING</p>
        <h3>Run the structured extraction step</h3>
        <div className="demoNav">
          <label className="demoCheck">
            <input
              type="checkbox"
              checked={failNext}
              onChange={(event) => setFailNext(event.target.checked)}
            />
            Simulate provider failure on next run
          </label>
          <button
            type="button"
            className="button primary"
            onClick={runAiStep}
            disabled={!intake || phase === "processing"}
          >
            {phase === "processing" ? "Processing…" : "Run AI step"}
          </button>
        </div>

        {phase === "processing" && (
          <p className="demoStatus" aria-live="polite">
            <span className="spinner" aria-hidden="true" /> Processing… (simulated, ~1.4s)
          </p>
        )}

        {phase === "error" && (
          <div className="demoError" role="alert">
            <strong>AI step failed.</strong> The provider timed out after 30s (simulated). The workflow
            surfaces the error instead of failing silently — retry below.
            <div className="demoGate">
              <button type="button" className="button primary" onClick={runAiStep}>
                Retry AI step
              </button>
            </div>
          </div>
        )}

        {phase === "success" && result && !decision && (
          <div aria-live="polite">
            <div className="confidenceRow">
              <span>Confidence</span>
              <div className="scoreBar">
                <span style={{ width: `${Math.round(result.confidence * 100)}%` }} />
              </div>
              <strong>{Math.round(result.confidence * 100)}%</strong>
            </div>
            <table className="demoTable">
              <tbody>
                <tr>
                  <th>Classification</th>
                  <td>{result.classification}</td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>{result.extracted.vendor}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>
                    {result.extracted.amount === null
                      ? "—"
                      : `${result.extracted.currency} ${result.extracted.amount.toLocaleString("en-US")}`}
                  </td>
                </tr>
                <tr>
                  <th>Due date</th>
                  <td>{result.extracted.dueDate ?? "—"}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{result.extracted.category}</td>
                </tr>
              </tbody>
            </table>
            <div className="suggestedMessage">
              <p className="kicker">DRAFT REPLY</p>
              <p>{result.draftReply}</p>
            </div>
            {result.warnings.length > 0 && (
              <ul className="demoWarnings">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* 3. Human gate */}
      {phase === "success" && result && !decision && (
        <section className="demoPanel">
          <p className="kicker">3 · HUMAN GATE</p>
          <h3>Review before the action is final</h3>
          <p className="demoHint">
            Business risk warrants a human decision. Approve as-is, edit the structured output, or reject it.
          </p>
          {!editing ? (
            <div className="demoGate">
              <button type="button" className="button primary" onClick={handleApprove}>
                Approve
              </button>
              <button type="button" className="button ghost" onClick={handleStartEdit}>
                Edit
              </button>
              <button type="button" className="button ghost" onClick={handleReject}>
                Reject
              </button>
            </div>
          ) : (
            edited && (
              <div>
                <div className="demoFieldRow">
                  <div className="demoField">
                    <label htmlFor="editVendor">Vendor</label>
                    <input
                      id="editVendor"
                      className="demoInput"
                      type="text"
                      value={edited.extracted.vendor}
                      onChange={(event) =>
                        setEdited({ ...edited, extracted: { ...edited.extracted, vendor: event.target.value } })
                      }
                    />
                  </div>
                  <div className="demoField">
                    <label htmlFor="editAmount">Amount (USD)</label>
                    <input
                      id="editAmount"
                      className="demoInput"
                      type="number"
                      min={0}
                      value={edited.extracted.amount ?? ""}
                      onChange={(event) => {
                        const raw = event.target.value;
                        const amount = raw === "" ? null : Number(raw);
                        setEdited({
                          ...edited,
                          extracted: {
                            ...edited.extracted,
                            amount: amount !== null && Number.isFinite(amount) ? amount : null,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="demoFieldRow">
                  <div className="demoField">
                    <label htmlFor="editDueDate">Due date</label>
                    <input
                      id="editDueDate"
                      className="demoInput"
                      type="text"
                      value={edited.extracted.dueDate ?? ""}
                      onChange={(event) =>
                        setEdited({ ...edited, extracted: { ...edited.extracted, dueDate: event.target.value } })
                      }
                    />
                  </div>
                  <div className="demoField">
                    <label htmlFor="editCategory">Category</label>
                    <input
                      id="editCategory"
                      className="demoInput"
                      type="text"
                      value={edited.extracted.category}
                      onChange={(event) =>
                        setEdited({ ...edited, extracted: { ...edited.extracted, category: event.target.value } })
                      }
                    />
                  </div>
                </div>
                <div className="demoField">
                  <label htmlFor="editReply">Draft reply</label>
                  <textarea
                    id="editReply"
                    className="demoInput"
                    value={edited.draftReply}
                    onChange={(event) => setEdited({ ...edited, draftReply: event.target.value })}
                  />
                </div>
                <div className="demoGate">
                  <button type="button" className="button primary" onClick={handleSaveEdit}>
                    Save edited version
                  </button>
                  <button type="button" className="button ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )
          )}
        </section>
      )}

      {/* 4. Final action */}
      {decision && (
        <section className="demoPanel" aria-live="polite">
          <p className="kicker">4 · FINAL ACTION</p>
          <h3>{decision.action === "approved" ? "Approved and queued" : decision.action === "edited" ? "Edited version approved" : "Rejected — no action taken"}</h3>
          <div className="demoFinal">
            <strong>{decision.note}</strong>
            <p>
              {result?.classification} · {result?.extracted.vendor} · logged at 2026-08-16 09:44
            </p>
          </div>
          <div className="demoGate">
            <button type="button" className="button ghost" onClick={handleReset}>
              Reset workflow
            </button>
          </div>
        </section>
      )}

      {/* Activity log */}
      {log.length > 0 && (
        <section className="demoPanel">
          <p className="kicker">ACTIVITY LOG</p>
          <div className="demoLog">
            {log.map((entry) => (
              <div className="demoLogItem" key={entry.id}>
                <time>{entry.at}</time>
                <div>
                  <strong>{entry.action}</strong>
                  <span>{entry.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}