import { expect, test } from "@playwright/test";

test("EventFlow demo page describes the architecture and links to the public repository", async ({ page }) => {
  await page.goto("/demos/eventflow");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("EventFlow");
  await expect(page.getByText("DEMONSTRATION PROJECT").first()).toBeVisible();
  await expect(page.getByText(/architecture/i).first()).toBeVisible();
  await expect(page.getByText(/I can(?:'|&#39;)t share my employer/i)).toBeVisible();
  const repoLink = page.getByRole("link", { name: /View the public repository/i });
  await expect(repoLink).toBeVisible();
  await expect(repoLink).toHaveAttribute("href", "https://github.com/Bottousky/eventflow");
});

test("EventFlow page makes the architecture vs executable evidence distinction", async ({ page }) => {
  await page.goto("/demos/eventflow");
  // The page describes a system; it must not claim to host the service.
  await expect(page.getByText(/architecture/i).first()).toBeVisible();
  await expect(page.getByText(/the implementation lives in the linked public repository|public repository/i).first()).toBeVisible();
});
