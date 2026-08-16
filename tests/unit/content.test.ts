import { describe, expect, it } from "vitest";
import { buildWhatsappUrl, caseStudies, contact, services } from "../../lib/content";

describe("commercial content", () => {
  it("publishes four productized services", () => {
    expect(services).toHaveLength(4);
  });

  it("clearly labels demonstration case studies", () => {
    const demoCases = caseStudies.filter((item) => item.label === "DEMONSTRATION PROJECT");
    expect(demoCases.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps at least one real-project proof point", () => {
    expect(caseStudies.some((item) => item.label === "REAL PROJECT")).toBe(true);
  });
});

describe("WhatsApp CTA configuration", () => {
  it("builds a wa.me link from a valid international number", () => {
    expect(buildWhatsappUrl("5491123456789")).toBe("https://wa.me/5491123456789");
  });

  it("rejects an unset number instead of pointing to a fake contact", () => {
    expect(buildWhatsappUrl("")).toBeNull();
  });

  it("rejects numbers with non-digit characters", () => {
    expect(buildWhatsappUrl("54911-not-a-number")).toBeNull();
  });

  it("normalizes common separators", () => {
    expect(buildWhatsappUrl("+54 9 11 1234-56789")).toBe("https://wa.me/54911123456789");
  });

  it("does not expose a WhatsApp URL when the environment has no number", () => {
    expect(contact.whatsappUrl).toBeNull();
  });
});
