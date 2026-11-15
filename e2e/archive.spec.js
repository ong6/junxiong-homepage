const { expect, test } = require("@playwright/test");

// The Archive (/works): every entry opens in place as a native disclosure,
// /works#<slug> opens and shows it, and the old /works/<slug> pages redirect
// there. Media loads only when a row opens.

const header = (page) => page.locator('nav[aria-label="Site"]').evaluate((nav) => nav.getBoundingClientRect().bottom);

// The row comes to rest just under the fixed header, not behind it (the
// site scrolls smoothly, so wait for it to settle).
async function expectInView(page, slug, slack = 8) {
	const bottom = await header(page);
	const top = () => page.locator(`details#${slug}`).evaluate((el) => Math.round(el.getBoundingClientRect().top));
	await expect.poll(top, { message: `${slug} under the header`, timeout: 3000 }).toBeGreaterThanOrEqual(bottom - 1);
	await expect.poll(top, { message: `${slug} near the top`, timeout: 3000 }).toBeLessThanOrEqual(bottom + 24 + slack);
}

// Screenshot files a row shows when open, which no thumbnail uses.
const SHOTS = /codeparty_0[23]|squeezy_0[234]|dexdao_0[23]|nusconnect_0[12]/;

test("a row opens by click, showing its paragraph, facts and screenshots", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/works");
	const entry = page.locator("details#codeparty");
	await expect(entry).not.toHaveAttribute("open", "");
	await entry.locator("summary").click();
	await expect(entry).toHaveAttribute("open", "");
	await expect(entry.locator(":scope > div > p")).toContainText("We built CodeParty for CS3219");
	await expect(entry.locator("dl")).toContainText("Next.js, TailwindCSS");
	await expect(entry.getByRole("link", { name: /Figma/ })).toHaveAttribute("target", "_blank");
	await expect(entry.locator("img[alt='CodeParty question library']")).toBeVisible();
	await expect(page.getByText(/^Project showcase$/i)).toHaveCount(0);
	// Natural width is the ceiling: the 804px MarkBind banner never stretches.
	await page.locator("details#markbind summary").click();
	const banner = page.locator("img[alt='MarkBind documentation homepage']");
	await expect(banner).toBeVisible();
	expect((await banner.boundingBox()).width).toBeLessThanOrEqual(680);
	await entry.locator("summary").click();
	await expect(entry).not.toHaveAttribute("open", "");
});

test("a row opens from the keyboard and shows its focus ring", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/works");
	const summary = page.locator("details#markup summary");
	await summary.focus();
	await page.keyboard.press("Tab");
	await page.keyboard.press("Shift+Tab");
	await expect(summary).toBeFocused();
	expect(await summary.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe("solid");
	expect((await summary.boundingBox()).height).toBeGreaterThanOrEqual(44);
	await page.keyboard.press("Enter");
	await expect(page.locator("details#markup")).toHaveAttribute("open", "");
	await page.keyboard.press("Space");
	await expect(page.locator("details#markup")).not.toHaveAttribute("open", "");
});

test("/works#<slug> opens that row below the header, on load and on a hash change", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/works#squeezy");
	await expect(page.locator("details#squeezy")).toHaveAttribute("open", "");
	await expect(page.locator("details#squeezy video, details#squeezy iframe")).toHaveCount(1);
	await expectInView(page, "squeezy");
	await page.evaluate(() => {
		window.location.hash = "imposter";
	});
	await expect(page.locator("details#imposter")).toHaveAttribute("open", "");
	await expectInView(page, "imposter");
	// An unknown hash leaves every row shut.
	await page.goto("about:blank");
	await page.goto("/works#nothing-here");
	await page.waitForTimeout(300);
	await expect(page.locator("details[open]")).toHaveCount(0);
});

test("without JavaScript the anchor still lands on the row", async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
	const page = await context.newPage();
	await page.goto("/works#markbind");
	// Fonts can still settle after the browser's own jump, so the row lands in
	// the top third rather than exactly under the header.
	await expectInView(page, "markbind", 240);
	await context.close();
});

test("an old /works/<slug> page redirects to its row", async ({ page, request }) => {
	const response = await request.get("/works/vitalvision", { maxRedirects: 0 });
	expect(response.status()).toBe(308);
	expect(response.headers().location).toBe("/works#vitalvision");
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/works/vitalvision");
	await expect(page).toHaveURL(/\/works#vitalvision$/);
	await expect(page.locator("details#vitalvision")).toHaveAttribute("open", "");
	await expectInView(page, "vitalvision");
});

test("the list loads its thumbnails only; a row's media loads when it opens", async ({ page }) => {
	const requested = [];
	page.on("request", (request) => {
		const url = decodeURIComponent(request.url());
		if (url.includes("/images/works/")) requested.push(url);
	});
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/works");
	await page.mouse.wheel(0, 4000);
	await page.waitForTimeout(800);
	expect(requested.filter((url) => SHOTS.test(url))).toEqual([]);
	expect(requested.filter((url) => /\.(mp4|webm)/.test(url))).toEqual([]);
	await page.locator("details#codeparty summary").click();
	await expect.poll(() => requested.filter((url) => /codeparty_0[23]/.test(url)).length).toBeGreaterThan(0);
});

test("the sitemap lists the Archive once and no entry pages", async ({ request }) => {
	const xml = await (await request.get("/sitemap.xml")).text();
	expect(xml).toContain("<loc>https://junxiong.dev/works</loc>");
	expect(xml).not.toContain("/works/");
});

test("two open rows at 390 never scroll sideways", async ({ browser }) => {
	const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
	const page = await context.newPage();
	await page.goto("/works#dexdao");
	await page.locator("details#squeezy summary").click();
	await expect(page.locator("details[open]")).toHaveCount(2);
	await page.waitForTimeout(500);
	expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
	await context.close();
});
