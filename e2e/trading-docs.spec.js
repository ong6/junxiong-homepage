const { test, expect } = require("@playwright/test");
const { collectErrors } = require("./helpers");

test("trading docs render the overview, sidebar, and table of contents", async ({ page }) => {
	const errors = collectErrors(page);
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto("/trading-engine/docs");

	await expect(page).toHaveTitle(/The trading engine — Trading engine docs/);
	await expect(page.getByRole("heading", { level: 1, name: "The trading engine" })).toBeVisible();
	const sidebar = page.getByRole("navigation", { name: "Documentation", exact: true });
	await expect(sidebar).toBeVisible();
	await expect(sidebar.getByRole("link", { name: "The trading engine" })).toHaveAttribute(
		"aria-current",
		"page",
	);
	const contents = page.getByRole("complementary", { name: "On this page" });
	await expect(contents).toBeVisible();
	await expect(contents.getByRole("link", { name: "What happens each day" })).toBeVisible();
	expect(errors).toEqual([]);
});

test("trading docs statically render a second page with its metadata", async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto("/trading-engine/docs/daily-cycle");

	await expect(page).toHaveTitle(/The daily cycle — Trading engine docs/);
	await expect(page.getByRole("heading", { level: 1, name: "The daily cycle" })).toBeVisible();
	await expect(
		page.getByRole("navigation", { name: "Documentation", exact: true }).getByRole("link", {
			name: "The daily cycle",
		}),
	).toHaveAttribute("aria-current", "page");
	await expect(page.getByRole("complementary", { name: "On this page" })).toContainText(
		"Before and during the session",
	);
});

test("trading docs use an accessible navigation disclosure at 390px", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/trading-engine/docs");

	const disclosure = page.locator(".uipack-docs__mobile-navigation");
	await expect(disclosure.locator("summary")).toBeVisible();
	await expect(disclosure).not.toHaveAttribute("open", "");
	await expect(page.locator(".uipack-docs__toc")).toBeHidden();
	await disclosure.locator("summary").click();
	await expect(disclosure).toHaveAttribute("open", "");
	await expect(
		disclosure.getByRole("link", { name: "The daily cycle" }),
	).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
