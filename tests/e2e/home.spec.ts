import { expect, test } from "@playwright/test";

test("homepage communicates the offer and contact path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("web software");
  await expect(page.getByText("PRODUCTIZED SERVICES")).toBeVisible();
  await expect(page.getByText("PROOF, NOT CLAIMS")).toBeVisible();
  await expect(page.getByRole("link", { name: /start a project/i })).toBeVisible();
});

test("real and demo work are visibly distinguished", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("REAL PROJECT")).toBeVisible();
  await expect(page.getByText("DEMONSTRATION PROJECT").first()).toBeVisible();
});
