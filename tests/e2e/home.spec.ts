import { expect, test } from "@playwright/test";

test("homepage communicates the backend offer and the contact path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Backend Software Engineer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable distributed systems");
  await expect(page.getByText("PRODUCTIZED SERVICES")).toBeVisible();
  await expect(page.getByText("PROOF, NOT CLAIMS")).toBeVisible();
  await expect(page.getByRole("link", { name: /start a project/i })).toBeVisible();
});

test("real and demo work are visibly distinguished", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("REAL PROJECT")).toBeVisible();
  await expect(page.getByText("DEMONSTRATION PROJECT").first()).toBeVisible();
});

test("homepage surfaces the experience section with the current employer", async ({ page }) => {
  await page.goto("/");
  const experience = page.locator("#experience");
  await expect(experience).toBeVisible();
  await expect(experience.getByRole("heading", { level: 3, name: /Mercado Libre/ })).toBeVisible();
  await expect(experience.locator(".xpBadge").first()).toHaveText("CURRENT");
});

test("work section groups case studies by reference / experimental / product", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  await expect(work).toBeVisible();
  await expect(work.getByText("BACKEND REFERENCE IMPLEMENTATION")).toBeVisible();
  await expect(work.getByText("EXPERIMENTAL / AI ENGINEERING")).toBeVisible();
  await expect(work.getByText("PRODUCT ENGINEERING DEMOS")).toBeVisible();
  await expect(work.getByRole("link", { name: /EventFlow/i })).toBeVisible();
  await expect(work.getByRole("link", { name: /Proyecto Roxana/i })).toBeVisible();
});

test("homepage does not anchor the backend offer at USD 650", async ({ page }) => {
  await page.goto("/");
  // The hero must communicate scope / engagement model, not a hard price floor.
  // The check is scoped to the hero section so that explicit per-service prices
  // (e.g. the Conversion Web Sprint in the services grid) keep working.
  const hero = page.locator("section.hero");
  await expect(hero.getByText(/Available for focused backend engagements/i)).toBeVisible();
  await expect(hero).not.toContainText("Sprints from");
  await expect(hero).not.toContainText("USD 650");
});
