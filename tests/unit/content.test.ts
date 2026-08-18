import { describe, expect, it } from "vitest";
import {
  buildWhatsappUrl,
  capabilityGroups,
  caseStudies,
  contact,
  experience,
  heroTags,
  services,
} from "../../lib/content";

describe("commercial content", () => {
  it("publishes four productized services", () => {
    expect(services).toHaveLength(4);
  });

  it("leads with the backend sprint, not the conversion sprint", () => {
    expect(services[0]?.slug).toBe("backend-api");
    expect(services[services.length - 1]?.slug).toBe("conversion-web");
  });

  it("clearly labels demonstration case studies", () => {
    const demoCases = caseStudies.filter((item) => item.label === "DEMONSTRATION PROJECT");
    expect(demoCases.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps at least one real-project proof point", () => {
    expect(caseStudies.some((item) => item.label === "REAL PROJECT")).toBe(true);
  });
});

describe("case study hierarchy", () => {
  it("uses backend / experimental / product groups", () => {
    const groups = new Set(caseStudies.map((item) => item.group));
    expect(groups).toEqual(new Set(["backend", "experimental", "product"]));
  });

  it("flagships the backend case (EventFlow) as the only backend entry", () => {
    const backend = caseStudies.filter((item) => item.group === "backend");
    expect(backend).toHaveLength(1);
    expect(backend[0]?.title).toContain("EventFlow");
  });

  it("keeps Proyecto Roxana as the experimental / real case", () => {
    const real = caseStudies.find((item) => item.group === "experimental");
    expect(real?.label).toBe("REAL PROJECT");
    expect(real?.href).toBe("https://github.com/Bottousky/proyecto-roxana");
  });

  it("groups the three product demos under product", () => {
    const products = caseStudies.filter((item) => item.group === "product");
    expect(products).toHaveLength(3);
    for (const item of products) {
      expect(item.label).toBe("DEMONSTRATION PROJECT");
    }
  });
});

describe("experience and capability copy", () => {
  it("lists Mercado Libre as the current role", () => {
    const current = experience.find((entry) => entry.current);
    expect(current?.company).toBe("Mercado Libre");
    expect(current?.period).toMatch(/Present/);
  });

  it("does not expose the employer as a fabricated client", () => {
    // The current role carries detail; previous roles keep it conceptual.
    const current = experience.find((entry) => entry.current);
    expect(current?.bullets.length).toBeGreaterThan(0);
    for (const bullet of current?.bullets ?? []) {
      expect(bullet).not.toMatch(/client|customer of|paid by/i);
    }
  });

  it("keeps backend capability group first", () => {
    expect(capabilityGroups[0]?.title).toBe("Core backend");
    expect(capabilityGroups[0]?.items).toContain("Go");
  });

  it("leads the hero tags with backend concepts", () => {
    expect(heroTags[0]).toBe("APIs");
    expect(heroTags[heroTags.length - 1]).toBe("Cloud");
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
