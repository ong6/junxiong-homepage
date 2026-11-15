const { test, expect } = require("@playwright/test");
const { collectErrors } = require("./helpers");

// /uipack is a short showcase: one live figure, one 3D object and one slide
// starter, each linking to its page on ui.junxiong.dev, where the catalogue
// lives.
const DOCS_LINKS = [
	["Architecture diagrams on the docs site", "https://ui.junxiong.dev/components/diagrams"],
	["3D object scenes on the docs site", "https://ui.junxiong.dev/components/objects"],
	["Slide starters on the docs site", "https://ui.junxiong.dev/presentations"],
];

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`UiPack shows one example of each part at ${width} in ${theme}`, async ({ page }) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("junxiong-theme", t), theme);
			await page.goto("/uipack");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			const main = page.locator("main");
			await expect(main.getByRole("tab")).toHaveCount(0);
			await expect(page.locator("figure.uipack")).toHaveCount(1);
			await expect(main.getByRole("heading", { level: 2 })).toContainText(["Figures and motion", "3D objects", "Slide starters"]);
			for (const [name, href] of DOCS_LINKS) {
				await expect(main.getByRole("link", { name: new RegExp(`^${name}`) }).first()).toHaveAttribute("href", href);
			}
			await expect(main.getByRole("link", { name: /^All six on Hobbies/ })).toHaveAttribute("href", "/hobbies");

			// The object mounts as the reader nears it.
			await page.locator("#objects").scrollIntoViewIfNeeded();
			const object = page.locator("section:has(#objects) .uipack-object");
			await expect(object).toHaveAttribute("data-kind", "ai");
			await expect(object.locator("canvas")).toHaveAttribute("data-renderer", "webgl");
			await expect(page.locator(".uipack-object")).toHaveCount(1);

			// One slide starter, no strip of the others.
			await page.locator("#slides").scrollIntoViewIfNeeded();
			await expect(page.locator(".uipack-slide-starter")).toHaveCount(1);
			await expect(page.getByRole("img", { name: /^Opening:/ })).toBeVisible();
			await expect(page.getByRole("complementary", { name: "Speaker guide" })).toBeVisible();
			await expect(page.getByRole("heading", { name: "Say this" })).toBeVisible();
			await expect(page.getByRole("heading", { name: "Delivery" })).toBeVisible();

			const small = await main
				.locator("section button:visible, section a:visible")
				.evaluateAll((nodes) => nodes.filter((node) => node.offsetHeight < 44).map((node) => node.textContent.trim().slice(0, 30)));
			expect(small).toEqual([]);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
			expect(errors).toEqual([]);
		});
	}
}

test("old /uipack links still load the page", async ({ page }) => {
	const errors = collectErrors(page);
	for (const url of ["/uipack?category=slides", "/uipack?category=web", "/uipack?category=web&object=travel&look=1&edition=2#objects"]) {
		const response = await page.goto(url);
		expect(response.status(), url).toBe(200);
		await expect(page.locator("main h1")).toHaveText("UiPack");
		await expect(page.locator("figure.uipack")).toHaveCount(1);
	}
	// #objects lands on the 3D section (the page scrolls there smoothly).
	await expect.poll(() => page.locator("#objects").evaluate((h) => Math.round(h.getBoundingClientRect().top)), { timeout: 10_000 }).toBeLessThan(200);
	expect(errors).toEqual([]);
});

test("slide starter copies its talk track", async ({ page, context }) => {
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.goto("/uipack#slides");
	const slides = page.locator("section:has(#slides)");
	await slides.getByRole("button", { name: "Copy talk track" }).click();
	await expect(slides.getByRole("status")).toHaveText("Opening talk track copied.");
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Every project used to start");
});

test("hobbies opens with travel and keeps coding as the main hobby", async ({ page }) => {
	await page.goto("/hobbies");
	const firstChapter = page.locator("[data-chapter]").first();
	await expect(firstChapter.getByRole("heading", { level: 2 })).toHaveText("Travel");
	await expect(page.locator("#coding-ai")).toContainText("This is my main hobby.");
});
