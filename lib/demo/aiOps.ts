/**
 * Deterministic mock for the AI Operations Desk demo.
 * Pure functions only — no DOM, no network, no randomness. The "AI" step is a
 * keyword-based classifier with a fixed confidence formula, so the same intake
 * always produces the same structured output.
 */

export type Channel = "email" | "form" | "whatsapp";

export interface IntakeRecord {
  id: string;
  receivedAt: string;
  channel: Channel;
  contact: string;
  message: string;
  priority: "low" | "medium" | "high";
}

export interface ExtractedFields {
  vendor: string;
  amount: number | null;
  currency: "USD" | "ARS";
  dueDate: string | null;
  category: string;
}

export interface AiResult {
  classification: string;
  confidence: number;
  extracted: ExtractedFields;
  draftReply: string;
  warnings: string[];
}

export type ReviewAction = "approved" | "edited" | "rejected";

export interface ReviewDecision {
  action: ReviewAction;
  note: string;
}

export interface ActionLogEntry {
  id: string;
  at: string;
  action: string;
  detail: string;
}

export const DEFAULT_INTAKE = {
  channel: "email" as Channel,
  contact: "laura@constructora-ejemplo.com",
  message:
    "Hi, we received invoice #1042 from Acme Construcciones for USD 4,850, due 2026-09-05. Please process payment and confirm receipt. This is urgent.",
};

const KNOWN_VENDORS = ["Acme Construcciones", "Metalúrgica Sur", "Hormigón Express"] as const;

/** Deterministic string hash (djb2) used to build stable record ids. */
function hashString(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36).toUpperCase();
}

export function normalizeIntake(raw: {
  channel: Channel;
  contact: string;
  message: string;
}): IntakeRecord {
  const trimmed = raw.message.trim();
  const priority =
    /urgent|asap|hoy|ya/i.test(trimmed) || trimmed.length > 200
      ? "high"
      : trimmed.length > 60
        ? "medium"
        : "low";

  return {
    id: `IN-${hashString(`${raw.contact}|${trimmed}`)}`,
    receivedAt: "2026-08-16 09:41",
    channel: raw.channel,
    contact: raw.contact.trim(),
    message: trimmed,
    priority,
  };
}

function classify(message: string): string {
  if (/invoice|factura|payment|pago/i.test(message)) return "Invoice processing";
  if (/order|pedido|quote|cotizaci/i.test(message)) return "Order intake";
  if (/support|soporte|issue|problema/i.test(message)) return "Support ticket";
  return "General inquiry";
}

function parseAmount(raw: string): number | null {
  const normalized = raw.replace(/,/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function extractFields(message: string): ExtractedFields {
  const vendor = KNOWN_VENDORS.find((known) => message.includes(known)) ?? "Unknown vendor";
  const amountMatch = message.match(/USD\s*([\d.,]+)/i);
  const amount = amountMatch ? parseAmount(amountMatch[1]) : null;
  const dueMatch = message.match(/due\s+(\d{4}-\d{2}-\d{2})/i);
  const dueDate = dueMatch ? dueMatch[1] : null;
  const category = /invoice|factura/i.test(message)
    ? "Accounts payable"
    : /order|pedido/i.test(message)
      ? "Procurement"
      : "General";

  return { vendor, amount, currency: "USD", dueDate, category };
}

function buildDraftReply(classification: string, extracted: ExtractedFields): string {
  const amount = extracted.amount === null ? "the amount" : `USD ${extracted.amount.toLocaleString("en-US")}`;
  const due = extracted.dueDate === null ? "the due date" : extracted.dueDate;
  return `Hi, we received your ${classification.toLowerCase()} for ${extracted.vendor} (${amount}, due ${due}). We'll confirm receipt and next steps within one business day.`;
}

export function processRecord(record: IntakeRecord): AiResult {
  const classification = classify(record.message);
  const extracted = extractFields(record.message);

  const warnings: string[] = [];
  if (extracted.amount === null) warnings.push("Amount not found in message.");
  if (extracted.dueDate === null) warnings.push("Due date not found in message.");
  if (extracted.vendor === "Unknown vendor") warnings.push("Vendor not recognized from known list.");

  let confidence = 0.55;
  if (classification !== "General inquiry") confidence += 0.1;
  if (extracted.amount !== null) confidence += 0.08;
  if (extracted.dueDate !== null) confidence += 0.08;
  if (extracted.vendor !== "Unknown vendor") confidence += 0.08;
  if (record.message.length > 80) confidence += 0.05;
  confidence = Math.min(0.97, Math.round(confidence * 100) / 100);

  return {
    classification,
    confidence,
    extracted,
    draftReply: buildDraftReply(classification, extracted),
    warnings,
  };
}

export function applyDecision(result: AiResult, decision: ReviewDecision): ActionLogEntry {
  const actionLabel =
    decision.action === "approved"
      ? "Approved by human"
      : decision.action === "edited"
        ? "Edited and approved by human"
        : "Rejected by human";
  const detail =
    decision.action === "rejected"
      ? decision.note || "Reviewer rejected the AI output."
      : `${result.classification} · ${result.extracted.vendor} · confidence ${Math.round(result.confidence * 100)}%`;

  return {
    id: `LOG-${hashString(`${result.classification}|${decision.action}|${decision.note}`)}`,
    at: "2026-08-16 09:44",
    action: actionLabel,
    detail,
  };
}