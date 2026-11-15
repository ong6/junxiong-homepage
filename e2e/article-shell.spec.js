const { expect, test } = require("@playwright/test");

// The case-study shell (STYLE.md, Layout: Article): the first visual right
// after the lede, the dated meta line and structured data, paired notes, the
// wide-screen side rail and the "On this page" bar below 1200px.

const CASE_STUDIES = ["/compoze", "/groundplane", "/skills", "/skillsmith", "/home-lab", "/ai-tooling", "/trading-engine", "/trading-engine/v2", "/uipack"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const human = (iso) => {
	const [y, m, d] = iso.split("-").map(Number);
	return `${d} ${MONTHS[m - 1]} ${y}`;
};

const scrollToHead = (page, index) =>
	page.evaluate((i) => {
		const heads = [...document.querySelectorAll("article h2[id]")].filter((h) => !h.closest("figure, [data-contents-skip]"));
		window.scrollTo({ top: heads[i].getBoundingClientRect().top + window.scrollY - 200, behavior: "instant" });
	}, index);

test("every case study shows when it was updated, and the structured data agrees", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const path of CASE_STUDIES) {
		await page.goto(path);
		const time = page.locator("main h1 ~ p time").first();
		const iso = await time.getAttribute("datetime");
		expect(iso, `${path}: a dated meta line`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		await expect(time).toBeVisible();
		await expect(time.locator("..")).toHaveText(`Updated ${human(iso)}`);
		const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').last().textContent());
		expect(ld.dateModified, `${path}: dateModified`).toBe(iso);
		if (ld.headline) {
			expect(ld.headline, `${path}: headline is the h1`).toBe((await page.locator("main h1").textContent()).trim());
			expect(ld.author).toMatchObject({ "@id": "https://junxiong.dev/#person", name: "Ong Jun Xiong", url: "https://junxiong.dev/" });
			expect(ld.publisher).toMatchObject({ name: "Ong Jun Xiong", url: "https://junxiong.dev/" });
		}
	}
});

test("the first visual follows the lede; links out close the page", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const path of CASE_STUDIES) {
		await page.goto(path);
		const order = await page.evaluate(() => {
			const lede = document.querySelector("main h1").parentElement;
			const next = lede.nextElementSibling;
			return {
				first: next && (next.matches("figure, section") || Boolean(next.querySelector("figure"))),
				linksBeforeVisual: [...document.querySelectorAll("main aside")].some(
					(aside) => !aside.closest("[data-article-contents]") && aside.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING,
				),
			};
		});
		expect(order.first, `${path}: a figure right after the lede`).toBe(true);
		expect(order.linksBeforeVisual, `${path}: no Links out block before it`).toBe(false);
	}
});

test("paired notes appear by title; a page with none keeps the generic Notes row", async ({ page }) => {
	await page.goto("/skills");
	const closing = page.locator("#links-out");
	for (const title of ["Hill-climb any deliverable with the /council skill", "Make decisions with the /decide skill"]) {
		await expect(closing.getByRole("link", { name: new RegExp(title.replace(/[/]/g, "\\/")) })).toHaveAttribute("href", /^https:\/\/notes\.junxiong\.dev\/[a-z-]+$/);
	}
	await page.goto("/trading-engine");
	await expect(page.locator("#links-out").getByRole("link", { name: /Why My Automated Trading Strategies/ })).toHaveAttribute(
		"href",
		"https://notes.junxiong.dev/why-my-trading-strategies-havent-earned-real-money",
	);
	await page.goto("/compoze");
	await expect(page.locator("#links-out").getByRole("link", { name: /^Notes/ })).toHaveAttribute("href", "https://notes.junxiong.dev");
});

const HARDWARE_NOTES = ["How I think about hardware for local models", "Prefill and decode want different machines", "What changes when you quantize a model"];

test("hobbies pairs the 3D note with the page and the hardware notes with Home lab", async ({ page }) => {
	await page.goto("/hobbies");
	const lab = page.locator("#home-lab");
	await expect(lab.getByText("Notes from this hobby")).toBeVisible();
	for (const title of HARDWARE_NOTES) {
		await expect(lab.getByRole("link", { name: new RegExp(title) })).toHaveAttribute("target", "_blank");
	}
	await expect(lab.getByRole("link", { name: /^Home lab/ }).last()).toHaveAttribute("href", "/home-lab");
	await expect(page.locator("#trading").getByRole("link", { name: /Why My Automated Trading Strategies/ })).toBeVisible();
	await expect(page.getByRole("link", { name: /How I build 3D that still behaves like a web page/ })).toHaveAttribute(
		"href",
		"https://notes.junxiong.dev/accessible-performant-3d-on-the-web",
	);
});

test("the side rail repeats the page's own facts, links and sections at 1440", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/compoze");
	// The facts sit beside the lede; the links and sections follow the reader.
	await expect(page.locator("[data-rail-facts]")).toBeVisible();
	await scrollToHead(page, 1);
	await expect(page.locator("[data-rail]")).toBeVisible();
	const found = await page.evaluate(() => {
		const rail = document.querySelector("[data-article-contents]");
		const pageFacts = new Set(
			[...document.querySelectorAll("main dl")]
				.filter((dl) => !dl.closest("[data-article-contents]"))
				.flatMap((dl) => [...dl.querySelectorAll("dt")].map((dt) => `${dt.textContent}=${dt.nextElementSibling.textContent}`)),
		);
		const railFacts = [...rail.querySelectorAll("dt")].map((dt) => `${dt.textContent}=${dt.nextElementSibling.textContent}`);
		const hrefs = (root) => [...root.querySelectorAll("a")].map((a) => a.getAttribute("href"));
		const heads = [...document.querySelectorAll("article h2[id]")].filter((h) => !h.closest("figure, [data-contents-skip]")).map((h) => `#${h.id}`);
		return {
			railFacts,
			unknownFacts: railFacts.filter((fact) => !pageFacts.has(fact)),
			railLinks: hrefs(rail.querySelector("[data-rail-links]")),
			closingLinks: hrefs(document.getElementById("links-out")),
			contents: hrefs(rail.querySelector("nav")),
			heads,
			hidden: [...rail.querySelectorAll("[data-rail-facts], [data-rail-links]")].every((el) => el.getAttribute("aria-hidden") === "true"),
			untabbable: [...rail.querySelectorAll("[data-rail-links] a")].every((a) => a.tabIndex === -1),
		};
	});
	expect(found.railFacts.length).toBeGreaterThan(2);
	expect(found.unknownFacts, "rail facts come from the page's fact table").toEqual([]);
	expect(found.railLinks).toEqual(found.closingLinks);
	expect(found.contents).toEqual(found.heads);
	expect(found.hidden && found.untabbable, "the repeated facts and links are hidden from screen readers and Tab").toBe(true);
	await expect(page.getByRole("navigation", { name: "On this page" })).toHaveCount(1);

	// The prose keeps its measure beside the rail.
	const measure = await page.locator("main article > .chakra-container").first().evaluate((el) => el.getBoundingClientRect().width);
	expect(measure).toBeLessThanOrEqual(680);
});

test("AI tooling and the trading overview get a rail, and it fades only under a full-width figure", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/ai-tooling");
	const rail = page.locator("[data-rail]");
	await expect(rail).toBeVisible();
	await expect(rail.getByRole("navigation", { name: "On this page" }).getByRole("link")).toHaveText(["Workbase", "Agent skills", "Skillsmith", "Groundplane"]);

	await page.goto("/trading-engine");
	await expect(page.locator("[data-rail-links] a")).toHaveCount(3);
	// Past fig. 1 the rail is beside plain text and shows.
	await scrollToHead(page, 1);
	await expect(rail).toBeVisible();
	// With the full-width figure across the rail's band, it hides.
	await page.locator("figure").first().evaluate((f) => window.scrollTo({ top: f.getBoundingClientRect().top + window.scrollY - 200, behavior: "instant" }));
	await expect(rail).toBeHidden();
});

test("below 1200px the On this page bar opens, jumps to a section and closes on Esc", async ({ browser }) => {
	const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
	const page = await context.newPage();
	await page.goto("/compoze");
	const bar = page.locator("[data-section-menu]");
	const button = bar.getByRole("button");
	// Not at the top: the title is the orientation there.
	await expect(button).toBeHidden();
	await expect(page.locator("[data-rail]")).toBeHidden();

	const height = await page.evaluate(() => document.documentElement.scrollHeight);
	await scrollToHead(page, 1);
	await expect(button).toBeVisible();
	await expect(button).toHaveText(/2 \/ \d+.*One codebase for every customer/);
	expect(await page.evaluate(() => document.documentElement.scrollHeight), "no layout shift").toBe(height);
	const box = await button.boundingBox();
	// Rounded: a fractional scroll offset reports 43.999996 for a 44px bar.
	expect(Math.round(box.height)).toBeGreaterThanOrEqual(44);

	// Open: the list, focus on the current section.
	await button.click();
	await expect(button).toHaveAttribute("aria-expanded", "true");
	const panel = page.getByRole("navigation", { name: "On this page" });
	await expect(panel).toBeVisible();
	await expect(panel.locator("[aria-current]")).toBeFocused();
	const rows = await panel.getByRole("link").evaluateAll((links) => links.map((a) => a.getBoundingClientRect().height));
	expect(Math.min(...rows)).toBeGreaterThanOrEqual(44);

	// Pick a section: the list closes, the URL and focus move to it, clear of the bar.
	await panel.getByRole("link", { name: "How I knew it worked" }).click();
	await expect(panel).toHaveCount(0);
	await expect(page).toHaveURL(/#how-i-knew-it-worked$/);
	const head = page.locator("#how-i-knew-it-worked");
	await expect(head).toBeFocused();
	await expect
		.poll(async () => {
			const [h, b] = await Promise.all([head.boundingBox(), bar.boundingBox()]);
			return h.y >= b.y + b.height;
		})
		.toBe(true);
	await expect(button).toHaveText(/How I knew it worked/);

	// Esc closes and hands focus back to the button.
	await button.click();
	await expect(panel).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(panel).toHaveCount(0);
	await expect(button).toBeFocused();

	// A tap outside closes it.
	await button.click();
	await expect(panel).toBeVisible();
	await page.mouse.click(200, 700);
	await expect(panel).toHaveCount(0);

	// The closing Links out is one tap away.
	await button.click();
	await panel.getByRole("link", { name: "Links out" }).click();
	await expect(page.locator("#links-out")).toBeFocused();
	await context.close();
});

test("the bar never covers the focused element, and it respects reduced motion", async ({ browser }) => {
	const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
	const page = await context.newPage();
	await page.goto("/groundplane");
	await scrollToHead(page, 1);
	const bar = page.locator("[data-section-menu]");
	await expect(bar.getByRole("button")).toBeVisible();
	const transition = await bar.evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration));
	expect(transition).toBeLessThan(0.02);
	// Put each link in the article right under the bar, then focus it: the
	// browser sees it on screen and would not scroll by itself.
	const links = page.locator("main article a:visible");
	const count = await links.count();
	expect(count).toBeGreaterThan(4);
	for (let i = count - 1; i >= Math.max(0, count - 8); i -= 1) {
		await links.nth(i).evaluate((a) => window.scrollTo({ top: a.getBoundingClientRect().top + window.scrollY - 80, behavior: "instant" }));
		await expect(bar.getByRole("button")).toBeVisible();
		await links.nth(i).focus();
		await expect
			.poll(async () => {
				const [el, b] = await Promise.all([links.nth(i).boundingBox(), bar.boundingBox()]);
				return !b || el.y >= b.y + b.height;
			})
			.toBe(true);
	}
	await context.close();
});

test("the bar appears only on pages with three sections or more", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	for (const path of ["/trading-engine", "/skillsmith", "/trading-engine/v2"]) {
		await page.goto(path);
		const sections = await page.evaluate(
			() => [...document.querySelectorAll("article h2")].filter((h) => !h.closest("figure, [data-contents-skip], [data-section-menu]")).length,
		);
		await expect(page.locator("[data-section-menu]"), path).toHaveCount(sections >= 3 ? 1 : 0);
	}
});

test("the home lab page returns to its Hobbies chapter, closes on the hardware notes and the old chapter anchor still lands", async ({ page }) => {
	await page.goto("/home-lab");
	await expect(page.locator("main h1")).toHaveText("Home lab");
	await expect(page.getByRole("link", { name: "← Hobbies" })).toHaveAttribute("href", "/hobbies#home-lab");
	const closing = page.locator("#links-out");
	await expect(closing.getByRole("link", { name: /^Hobbies/ })).toHaveAttribute("href", "/hobbies#home-lab");
	for (const title of HARDWARE_NOTES) {
		await expect(closing.getByRole("link", { name: new RegExp(title) })).toHaveAttribute("target", "_blank");
	}
	// Not promoted to the homepage cards until it runs.
	await page.goto("/");
	await expect(page.locator('main a[href="/home-lab"]')).toHaveCount(0);
	// The chapter's old anchor scrolls to the renamed chapter.
	await page.goto("/hobbies#home-servers");
	await expect.poll(() => page.locator("#home-lab").evaluate((el) => Math.round(el.getBoundingClientRect().top)), { timeout: 5_000 }).toBeLessThan(120);
	expect(await page.locator("#home-lab").evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});
