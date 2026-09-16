const { expect, test } = require("@playwright/test");
const { collectErrors } = require("./helpers");

// /assets is unlisted: noindex, off the sitemap, linked only from /uipack.
test.describe("/assets", () => {
	test("is noindex, absent from the sitemap, and linked from /uipack only", async ({ page, request }) => {
		await page.goto("/assets");
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
		const xml = await (await request.get("/sitemap.xml")).text();
		expect(xml).not.toContain("/assets");
		expect(xml).toContain("/uipack");
		await page.goto("/uipack");
		expect(await page.locator('a[href="/assets"]').count()).toBeGreaterThan(0);
		await page.goto("/");
		expect(await page.locator('a[href="/assets"]').count()).toBe(0);
	});

	test("category filter changes the count and search narrows", async ({ page }) => {
		const errors = collectErrors(page);
		await page.goto("/assets");
		const status = page.getByRole("status");
		await expect(status).toHaveText(/^60 assets$/);
		await page.getByRole("button", { name: /^Icons/ }).click();
		await expect(status).toHaveText("25 assets in Icons");
		await expect(page.locator(".uipack-browser__card")).toHaveCount(25);
		await page.getByRole("searchbox").fill("robot");
		await expect(status).toHaveText("1 asset in Icons");
		const broken = await page.evaluate(() => [...document.querySelectorAll(".uipack-browser__tile img")].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
		expect(broken).toEqual([]);
		expect(errors).toEqual([]);
	});

	test("copy writes the import line to the clipboard", async ({ page, context }) => {
		await context.grantPermissions(["clipboard-read", "clipboard-write"]);
		await page.goto("/assets");
		const btn = page.getByRole("button", { name: "Copy lock" });
		await btn.click();
		await expect(btn).toHaveText("Copied");
		expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('icon="lock"');
	});

	test("390 wide has no horizontal overflow", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 900 });
		await page.goto("/assets");
		await page.locator(".uipack-browser__card").first().waitFor();
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
	});
});
