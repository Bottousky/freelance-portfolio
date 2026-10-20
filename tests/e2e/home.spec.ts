import { expect, test } from "@playwright/test";

test("home introduces Manuel in Spanish", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Hola, soy\s*Manuel Botto/);
  await expect(page.getByText(/Desarrollador backend en Mercado Libre/)).toBeVisible();
});

test("home shows projects, passions and career sections", async ({ page }) => {
  await page.goto("/");
  for (const id of ["proyectos", "pasiones", "trayectoria", "contacto"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  const trayectoria = page.locator("#trayectoria");
  await expect(trayectoria.getByRole("heading", { name: "Técnico en Electrónica" })).toBeVisible();
  await expect(trayectoria.getByText("Programación, electrónica, matemática y física.")).toBeVisible();
});

test("projects link Juntopia but not Proyecto Roxana", async ({ page }) => {
  await page.goto("/");
  const projects = page.locator("#proyectos");
  await expect(projects.getByRole("link", { name: /juntopia\.com/ })).toHaveAttribute("href", "https://juntopia.com");
  await expect(projects.getByRole("heading", { level: 3, name: "Proyecto Roxana" })).toBeVisible();
  const roxanaCard = projects.locator("article", { has: page.getByRole("heading", { name: "Proyecto Roxana" }) });
  await expect(roxanaCard.getByRole("link")).toHaveCount(0);
});

test("contact is a plain email, with no services or prices", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contacto");
  await expect(contact.getByRole("link", { name: /@/ })).toHaveAttribute("href", /^mailto:/);
  await expect(page.locator("body")).not.toContainText(/USD|WhatsApp|freelance/i);
});

test("videos section stays hidden without a configured channel", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#videos")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Videos" })).toHaveCount(0);
});

test("page does not overflow horizontally", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("hero circuit is decorative and animates without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const canvas = page.locator("canvas.circuit");
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await page.mouse.move(600, 400);
  await page.mouse.click(600, 400);
  await page.waitForTimeout(300);
  expect(errors).toEqual([]);
});
