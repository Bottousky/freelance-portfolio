import { describe, expect, it } from "vitest";
import {
  buildSalesSummary,
  scoreLead,
  type LeadFormData,
} from "../../lib/demo/leadScoring";

const hotLead: LeadFormData = {
  projectType: "house",
  location: "gba",
  squareMeters: 120,
  landStatus: "owned",
  budgetBand: "high",
  timing: "immediate",
};

const nurtureLead: LeadFormData = {
  projectType: "land",
  location: "other",
  squareMeters: 10,
  landStatus: "none",
  budgetBand: "unknown",
  timing: "exploring",
};

describe("lead scoring", () => {
  it("is deterministic", () => {
    expect(scoreLead(hotLead)).toEqual(scoreLead(hotLead));
  });

  it("routes a ready buyer to hot", () => {
    expect(scoreLead(hotLead).route).toBe("hot");
  });

  it("routes an early-stage prospect to nurture", () => {
    expect(scoreLead(nurtureLead).route).toBe("nurture");
  });

  it("explains every scoring factor", () => {
    const score = scoreLead(hotLead);
    expect(score.factors).toHaveLength(6);
    expect(score.factors.every((factor) => factor.reason.length > 0)).toBe(true);
    expect(score.total).toBe(score.factors.reduce((sum, factor) => sum + factor.points, 0));
  });

  it("builds a deterministic sales summary", () => {
    const summary = buildSalesSummary(hotLead, scoreLead(hotLead));
    expect(summary.estimatedValue).toBe("USD 80k+");
    expect(summary.suggestedMessage).toContain("120 m²");
    expect(summary.profile).toContain("House construction");
  });
});