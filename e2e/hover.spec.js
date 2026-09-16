const { expect, test } = require("@playwright/test");

// Hover follows a `flow` on the ported Groundplane figure: the hovered node's
// flow lights up, everything else dims. Legend hover filters by kind.
const FIG = "figure.uipack";
const model = (page) => page.locator(`${FIG} svg.uipack--wide [data-uipack="node"][data-flow~="check"]`).first();
const recordNode = (page) => page.locator(`${FIG} svg.uipack--wide [data-uipack="node"][data-flow="record"]`).first();

test.describe("/groundplane hover", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/groundplane");
		await page.locator(FIG).first().scrollIntoViewIfNeeded();
		await model(page).waitFor();
		// Centre the node so the fixed navbar never sits over the hover point.
		await model(page).evaluate((el) => el.scrollIntoView({ block: "center" }));
		// Fonts and the figure's width settle before the pointer moves, so the
		// enter event lands on the node and not where it was a frame earlier.
		await page.evaluate(() => document.fonts.ready);
		await page.waitForTimeout(300);
		await page.mouse.move(4, 4);
	});

	test("hovering a node highlights its flow and dims unrelated nodes", async ({ page }) => {
		await expect
			.poll(async () => {
				await model(page).hover({ force: true });
				return page.locator(FIG).first().getAttribute("data-hover-flow");
			})
			.toMatch(/check/);
		await expect(recordNode(page)).toHaveAttribute("data-state", "dim");
		await page.waitForTimeout(250);
		expect(Number(await recordNode(page).evaluate((el) => getComputedStyle(el).opacity))).toBeCloseTo(0.35, 1);
		const hit = page.locator(`${FIG} svg.uipack--wide [data-uipack="connector"][data-state="hit"]`);
		expect(await hit.count()).toBeGreaterThan(0);
		await page.mouse.move(0, 0);
		await page.waitForTimeout(250);
		expect(Number(await recordNode(page).evaluate((el) => getComputedStyle(el).opacity))).toBe(1);
	});

	test("hovering a legend item filters by kind", async ({ page }) => {
		const figure = page.locator(FIG).first();
		await figure.locator(".uipack__legend li", { hasText: "Facts" }).hover();
		await expect(figure).toHaveAttribute("data-hover-kind", "change");
		const hitPackets = figure.locator('svg.uipack--wide [data-uipack="packet"][data-state="hit"]');
		const dimPackets = figure.locator('svg.uipack--wide [data-uipack="packet"][data-state="dim"]');
		expect(await hitPackets.count()).toBeGreaterThan(0);
		expect(await dimPackets.count()).toBeGreaterThan(0);
	});
});
