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

test("work section groups case studies by production / experimental / product", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  await expect(work).toBeVisible();
  await expect(work.getByText("PRODUCTION BACKEND")).toBeVisible();
  await expect(work.getByText("EXPERIMENTAL / AI ENGINEERING")).toBeVisible();
  await expect(work.getByText("PRODUCT ENGINEERING DEMOS")).toBeVisible();
  await expect(work.getByRole("link", { name: /EventFlow/i })).toBeVisible();
  await expect(work.getByRole("link", { name: /Proyecto Roxana/i })).toBeVisible();
});
