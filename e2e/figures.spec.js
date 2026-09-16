const { expect, test } = require("@playwright/test");
const { SEL, packetCentre, dist, collectErrors } = require("./helpers");

const PAGES = ["/groundplane", "/jobforge", "/uipack"];

for (const path of PAGES) {
	test.describe(`${path} figures`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(path);
			await page.locator(SEL).first().waitFor();
			await page.locator("figure.uipack").first().scrollIntoViewIfNeeded();
		});

		test("a packet moves while playing", async ({ page }) => {
			const a = await packetCentre(page);
			await page.waitForTimeout(500);
			const b = await packetCentre(page);
			expect(dist(a, b)).toBeGreaterThan(4);
		});

		test("a packet holds still after Pause", async ({ page }) => {
			const figure = page.locator("figure.uipack").first();
			await figure.getByRole("button", { name: "Pause" }).click();
			const a = await packetCentre(page);
			await page.waitForTimeout(500);
			const b = await packetCentre(page);
			expect(dist(a, b)).toBeLessThan(0.5);
		});

		test("Replay restarts the timeline", async ({ page }) => {
			const figure = page.locator("figure.uipack").first();
			await page.waitForTimeout(700);
			await figure.getByRole("button", { name: "Replay" }).click();
			const t0 = await figure.locator("svg.uipack--wide").evaluate((svg) => svg.getCurrentTime());
			expect(t0).toBeLessThan(0.3);
		});
	});

	test(`${path} under reduced motion renders static packets and no controls`, async ({ page }) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto(path);
		const figure = page.locator("figure.uipack").first();
		await figure.waitFor();
		expect(await page.locator("animateMotion").count()).toBe(0);
		expect(await page.locator('[data-uipack="packet"][data-static="true"]').count()).toBeGreaterThan(0);
		await expect(figure.getByRole("button", { name: /Pause|Replay/ })).toHaveCount(0);
		const a = await packetCentre(page);
		await page.waitForTimeout(500);
		const b = await packetCentre(page);
		expect(dist(a, b)).toBeLessThan(0.5);
	});

	for (const theme of ["light", "dark"]) {
		test(`${path} in ${theme} renders with no console errors`, async ({ page }) => {
			const errors = collectErrors(page);
			await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
			await page.goto(path);
			await page.locator("figure.uipack").first().waitFor();
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			const bg = await page.locator("figure.uipack").first().evaluate((el) => getComputedStyle(el).backgroundColor);
			expect(bg).toBe(theme === "dark" ? "rgb(14, 21, 18)" : "rgb(241, 238, 230)");
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
			expect(overflow).toBe(0);
			if (path === "/uipack") expect(await page.locator("figure.uipack").count()).toBe(6);
			expect(errors).toEqual([]);
		});
	}
}

test("/groundplane expand opens the wide drawing full-screen and Esc closes it", async ({ page }) => {
	await page.goto("/groundplane");
	await page.getByRole("button", { name: /Expand diagram/ }).first().click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	expect(await dialog.locator('[data-uipack="packet"]').count()).toBeGreaterThan(0);
	await page.keyboard.press("Escape");
	await expect(dialog).toHaveCount(0);
});

for (const path of ["/uipack", "/groundplane", "/jobforge"]) {
	test(`${path} at 390 has no horizontal overflow`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
	});
}
