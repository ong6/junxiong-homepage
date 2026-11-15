const { expect, test } = require("@playwright/test");
const { SEL, packetCentre, dist, collectErrors } = require("./helpers");

const VERSION_PAGES = ["/trading-engine/v1"];
const PAGES = ["/compoze", "/groundplane", "/skills", "/skillsmith", "/workbase", "/trading-engine", "/trading-engine/v2", "/uipack", ...VERSION_PAGES];

for (const path of PAGES) {
	test.describe(`${path} figures`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(path);
			await page.locator(SEL).first().waitFor();
			await page.locator("figure.uipack").first().scrollIntoViewIfNeeded();
			// Scrolling can mount a page's lazy parts (components/LazyMount.js);
			// let that load settle so packets are sampled on a free main thread.
			await page.waitForLoadState("networkidle");
			await page.waitForTimeout(300);
		});

		test("a packet moves while playing", async ({ page }) => {
			const a = await packetCentre(page);
			await expect
				.poll(async () => dist(a, await packetCentre(page)), { timeout: 2_000 })
				.toBeGreaterThan(4);
		});

		test("a packet holds still after Pause", async ({ page }) => {
			const figure = page.locator("figure.uipack").first();
			await figure.getByRole("button", { name: "Pause", exact: true }).click();
			const a = await packetCentre(page);
			await page.waitForTimeout(500);
			const b = await packetCentre(page);
			expect(dist(a, b)).toBeLessThan(0.5);
		});

		test("Replay restarts the timeline", async ({ page }) => {
			const figure = page.locator("figure.uipack").first();
			await page.waitForTimeout(700);
			await figure.getByRole("button", { name: "Replay", exact: true }).click();
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
			await page.addInitScript((t) => localStorage.setItem("junxiong-theme", t), theme);
			await page.goto(path);
			await page.locator("figure.uipack").first().waitFor();
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			const expectedBg = theme === "dark" ? "rgb(21, 19, 17)" : "rgb(243, 239, 231)";
			await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(expectedBg);
			await expect.poll(() => page.locator("figure.uipack").first().evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(expectedBg);
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
			expect(overflow).toBe(0);
			if (path === "/uipack") expect(await page.locator("figure.uipack").count()).toBe(1);
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

for (const path of ["/uipack", "/compoze", "/groundplane", "/skills", "/skillsmith", "/workbase", "/trading-engine", "/trading-engine/v2", ...VERSION_PAGES]) {
	test(`${path} at 390 has no horizontal overflow`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
	});
}

test("/trading-engine: selecting a box shows its note beside it, and site figures have one enlarge control", async ({ page }) => {
	await page.goto("/trading-engine");
	const figure = page.locator("figure.uipack").first();
	await figure.scrollIntoViewIfNeeded();
	await expect(figure.getByRole("button", { name: "Open canvas" })).toHaveCount(0);
	await expect(page.getByRole("button", { name: /Expand diagram/ }).first()).toBeVisible();
	await expect(figure.getByRole("button", { name: /Clear selection/ })).toHaveCount(0);

	const node = figure.getByRole("button", { name: "deploy gate, fingerprint = registered" });
	const box = await node.boundingBox();
	await node.click();
	const note = figure.locator(".uipack__note");
	await expect(note).toBeVisible();
	await expect(note).toContainText("refuses a deploy whose code no longer matches");
	// The note sits against the box and the drawing does not move.
	const n = await note.boundingBox();
	expect(n.y + n.height).toBeLessThanOrEqual(box.y);
	expect(box.y - (n.y + n.height)).toBeLessThan(16);
	expect(Math.abs((await node.boundingBox()).y - box.y)).toBeLessThan(2);
	await node.click();
	await expect(note).toHaveCount(0);
});

test("engine pages link onward: the overview lists every v1 section and Engine v2, and v1 ends on Engine v2", async ({ page }) => {
	await page.goto("/trading-engine");
	const updates = page.locator("ol").filter({ hasText: "One shared backtest core" });
	await expect(updates.getByRole("link", { name: /Scoring every candidate/ })).toHaveAttribute("href", "/trading-engine/v1#1-7");
	// Newest first, the order of the v1 page.
	await expect(updates.getByRole("link").first()).toHaveAttribute("href", "/trading-engine/v1#1-8");
	await expect(updates.getByRole("link").last()).toHaveAttribute("href", "/trading-engine/v1#1-1");
	const eras = page.locator("ol").filter({ hasText: "Executor and ledger" });
	await expect(eras.getByRole("link", { name: /Executor and ledger/ })).toHaveAttribute("href", "/trading-engine/v2");
	await updates.getByRole("link", { name: /Scoring every candidate/ }).click();
	await expect(page).toHaveURL(/\/trading-engine\/v1#1-7$/);
	await expect.poll(() => page.locator('[id="1-7"]').evaluate((h) => Math.round(h.getBoundingClientRect().top))).toBeLessThan(200);
	await expect(page.getByRole("link", { name: /Executor and ledger/ })).toHaveAttribute("href", "/trading-engine/v2");
});

test("Engine v1 is one page: eight dated sections, newest first, each with its diagram and a closed fact disclosure", async ({ page }) => {
	await page.goto("/trading-engine/v1");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("A research simulator");
	const heads = page.locator("article h2[id^='1-']");
	await expect(heads).toHaveCount(8);
	expect(await heads.evaluateAll((els) => els.map((h) => h.id))).toEqual(["1-8", "1-7", "1-6", "1-5", "1-4", "1-3", "1-2", "1-1"]);
	await expect(page.locator('[id="1-8"]')).toHaveText("1.8 One shared backtest core");
	await expect(page.locator("article details")).toHaveCount(8);
	expect(await page.locator("article details[open]").count()).toBe(0);
	// Figures mount as they come near (components/LazyMount.js); the first, 1.8, is there at load.
	await expect(page.locator("figure.uipack")).toHaveCount(1);
	await expect(page.locator("#te-1-8-figure")).toHaveCount(1);
	for (const n of [7, 6, 5, 4, 3, 2, 1]) {
		await page.locator(`[id="1-${n}"]`).scrollIntoViewIfNeeded();
		await expect(page.locator(`#te-1-${n}-figure`)).toHaveCount(1);
	}
	await expect(page.locator("figure.uipack")).toHaveCount(8);
	// Figure numbers follow reading order: fig. 1 is 1.8 at the top, fig. 8 is 1.1 at the bottom.
	const order = ["1", "2", "3", "4", "5", "6", "7", "8"];
	expect(await page.locator("figure.uipack").evaluateAll((els) => els.map((el) => el.textContent.match(/Figure 0(\d)/i)?.[1]))).toEqual(order);
	expect(await page.locator("figcaption[id^='te-1-']").evaluateAll((els) => els.map((el) => el.textContent.match(/^fig\. (\d) —/)?.[1]))).toEqual(order);
});

test("old version routes redirect to their Engine v1 section", async ({ page }) => {
	for (const [from, to] of [
		["/trading-engine/v1/1.1", "1-1"],
		["/trading-engine/v1/1.3", "1-3"],
		["/trading-engine/v1/1.8", "1-8"],
		["/trading-engine/v4", "1-4"],
		["/trading-engine/v5", "1-5"],
	]) {
		await page.goto(from);
		await expect(page).toHaveURL(new RegExp(`/trading-engine/v1#${to}$`));
		// The page scrolls (smoothly) to the section, which lands under the sticky nav
		// and stays there while the figures it passed mount.
		const top = () => page.locator(`[id="${to}"]`).evaluate((h) => Math.round(h.getBoundingClientRect().top));
		await expect.poll(top, { timeout: 5_000 }).toBeLessThan(160);
		await page.waitForTimeout(500);
		expect(await top()).toBeGreaterThan(40);
		expect(await top()).toBeLessThan(160);
	}
	const res = await page.request.get("/trading-engine/v1", { maxRedirects: 0 });
	expect(res.status()).toBe(200);
});
