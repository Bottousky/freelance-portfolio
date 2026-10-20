import { describe, expect, it } from "vitest";
import * as content from "../../lib/content";
import { buildYoutubeUrl, contact, futsal, marquee, passions, profile, projects, studies, work } from "../../lib/content";

describe("personal site content", () => {
  it("introduces Manuel without selling freelance services", () => {
    expect(`${profile.greeting} ${profile.name}`).toBe("Hola, soy Manuel Botto");
    expect(profile.roles.length).toBeGreaterThanOrEqual(3);
    expect(profile.lead).toMatch(/Mercado Libre/);
    expect(Object.keys(content)).not.toContain("services");
    expect(JSON.stringify(content)).not.toMatch(/USD|freelance|WhatsApp/i);
    // Manuel is a teacher for life, never a former one.
    expect(JSON.stringify(content)).not.toMatch(/ex[ -]?docente|fui docente/i);
  });

  it("leads the projects with Juntopia linking to its own site", () => {
    expect(projects[0]?.slug).toBe("juntopia");
    expect(projects[0]?.href).toBe("https://juntopia.com");
  });

  it("keeps Proyecto Roxana under its working title, linked to its public repository", () => {
    const roxana = projects.find((item) => item.slug === "proyecto-roxana");
    expect(roxana?.title).toBe("Proyecto Roxana");
    expect(roxana?.href).toBe("https://github.com/Bottousky/proyecto-roxana");
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
    expect(studies.map((item) => item.title)).toContain("Técnico Electrónico");
    expect(studies.find((item) => item.title === "Técnico Electrónico")?.place).toBe("Escuela Técnica Otto Krause");
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

describe("hero focus and Manuel's own story", () => {
  it("keeps the hero generic: Software Engineer, without stack details", () => {
    expect(profile.lead).toMatch(/^Software Engineer en Mercado Libre/);
    expect(profile.facts).toContain("Software Engineer");
    expect(JSON.stringify([profile.lead, profile.facts, profile.roles])).not.toMatch(/\bGo\b|backend/i);
  });

  it("puts his own projects in the carousel instead of traditional games", () => {
    expect(marquee.mine).toContain("Juntopia");
    expect(JSON.stringify(marquee)).not.toMatch(/Truco|Brisca|Generala/);
  });

  it("never presents the UBA studies as a finished engineering degree", () => {
    expect(JSON.stringify(content)).not.toMatch(/ingenier[oa] (en|informátic)|t[ií]tulo de ingenier/i);
    expect(studies.find((item) => item.place === "Universidad de Buenos Aires")?.title).toBe("CBC de Ingeniería");
  });

  it("tells the futsal story without exposing the club or titles", () => {
    expect(futsal.since).toBe("Desde chico");
    expect(JSON.stringify(content)).not.toMatch(/Racing|campe[oó]n/i);
  });
});
