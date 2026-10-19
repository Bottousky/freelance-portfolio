import { describe, expect, it } from "vitest";
import * as content from "../../lib/content";
import { buildYoutubeUrl, contact, passions, profile, projects, studies, work } from "../../lib/content";

describe("personal site content", () => {
  it("introduces Manuel without selling freelance services", () => {
    expect(profile.greeting).toBe("Hola, soy Manuel.");
    expect(profile.lead).toMatch(/Mercado Libre/);
    expect(Object.keys(content)).not.toContain("services");
    expect(JSON.stringify(content)).not.toMatch(/USD|freelance|WhatsApp/i);
  });

  it("leads the projects with Juntopia linking to its own site", () => {
    expect(projects[0]?.slug).toBe("juntopia");
    expect(projects[0]?.href).toBe("https://juntopia.com");
  });

  it("keeps Proyecto Roxana under its working title without a public link", () => {
    const roxana = projects.find((item) => item.slug === "proyecto-roxana");
    expect(roxana?.title).toBe("Proyecto Roxana");
    expect(roxana?.href).toBeNull();
    expect(JSON.stringify(content)).not.toMatch(/ohmdal/i);
  });

  it("only links projects to https URLs", () => {
    for (const project of projects) {
      if (project.href) {
        expect(project.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("shows the three passions Manuel chose", () => {
    expect(passions.map((item) => item.title)).toEqual([
      "Hacer videojuegos",
      "Juegos de mesa y cartas",
      "Enseñar y divulgar",
    ]);
  });

  it("lists the electronics degree and the teaching role", () => {
    expect(studies.map((item) => item.title)).toContain("Técnico en Electrónica");
    expect(work.some((entry) => entry.role === "Docente")).toBe(true);
    expect(work.find((entry) => entry.current)?.place).toBe("Mercado Libre");
  });
});

describe("contact configuration", () => {
  it("always has an email to write to", () => {
    expect(contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
  });
});

describe("YouTube channel configuration", () => {
  it("accepts https YouTube channel URLs", () => {
    expect(buildYoutubeUrl("https://www.youtube.com/@manuelbotto")).toBe("https://www.youtube.com/@manuelbotto");
    expect(buildYoutubeUrl("  https://youtube.com/@manuelbotto  ")).toBe("https://youtube.com/@manuelbotto");
  });

  it("rejects an unset URL instead of pointing to a channel that does not exist", () => {
    expect(buildYoutubeUrl("")).toBeNull();
  });

  it("rejects non-YouTube hosts, plain http and malformed values", () => {
    expect(buildYoutubeUrl("https://example.com/@manuelbotto")).toBeNull();
    expect(buildYoutubeUrl("http://www.youtube.com/@manuelbotto")).toBeNull();
    expect(buildYoutubeUrl("javascript:alert(1)")).toBeNull();
    expect(buildYoutubeUrl("not a url")).toBeNull();
  });

  it("hides the Videos section when the environment has no channel", () => {
    expect(contact.youtubeUrl).toBeNull();
  });
});
