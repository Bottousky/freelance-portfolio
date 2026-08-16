import { describe, expect, it } from "vitest";
import {
  DEFAULT_INTAKE,
  applyDecision,
  normalizeIntake,
  processRecord,
} from "../../lib/demo/aiOps";

describe("ai operations desk", () => {
  it("normalizes intake deterministically", () => {
    const first = normalizeIntake(DEFAULT_INTAKE);
    const second = normalizeIntake(DEFAULT_INTAKE);
    expect(first).toEqual(second);
    expect(first.id).toMatch(/^IN-/);
    expect(first.priority).toBe("high");
  });

  it("extracts structured fields from the mock message", () => {
    const record = normalizeIntake(DEFAULT_INTAKE);
    const result = processRecord(record);
    expect(result.classification).toBe("Invoice processing");
    expect(result.extracted.vendor).toBe("Acme Construcciones");
    expect(result.extracted.amount).toBe(4850);
    expect(result.extracted.dueDate).toBe("2026-09-05");
    expect(result.confidence).toBeGreaterThan(0.8);
  });

  it("flags missing fields as warnings", () => {
    const record = normalizeIntake({ channel: "form", contact: "x@y.com", message: "Hello, we need help." });
    const result = processRecord(record);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.classification).toBe("General inquiry");
  });

  it("logs the human decision", () => {
    const record = normalizeIntake(DEFAULT_INTAKE);
    const result = processRecord(record);
    const entry = applyDecision(result, { action: "approved", note: "OK" });
    expect(entry.action).toBe("Approved by human");
    expect(entry.detail).toContain("Acme Construcciones");
  });
});