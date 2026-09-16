const { expect, test } = require("@playwright/test");

// Regressions from the 2026-09-16 QA pass: labels that ran past their node,
// a narrow drawing that ran off its canvas, a 36px copy button, a focus ring
// on the wrong token, and gallery captions copied from the case studies.
const FIGURE_PAGES = ["/uipack", "/groundplane", "/skillpack", "/compoze"];

const visibleTexts = (svgSel) => {
	const out = [];
	for (const svg of document.querySelectorAll(svgSel)) {
		if (getComputedStyle(svg).display === "none") continue;
		const sb = svg.getBoundingClientRect();
		for (const t of svg.querySelectorAll("text")) {
			if (!t.textContent.trim()) continue;
			const r = t.getBoundingClientRect();
			const node = t.closest('[data-uipack="node"]');
			const nr = node ? node.querySelector("rect").getBoundingClientRect() : null;
			out.push({
				text: t.textContent.slice(0, 40),
				outsideSvg: r.left < sb.left - 1 || r.right > sb.right + 1 || r.top < sb.top - 1 || r.bottom > sb.bottom + 1,
				pastNode: nr ? Math.max(nr.left - r.left, r.right - nr.right) > 1 : false,
			});
		}
	}
	return out;
};

for (const path of FIGURE_PAGES) {
	test(`${path} at 1440: no node label or sub runs past its box`, async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 1000 });
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		await page.evaluate(() => document.fonts.ready);
		const bad = (await page.evaluate(visibleTexts, "figure.uipack .uipack__canvas > svg")).filter((t) => t.pastNode).map((t) => t.text);
		expect(bad).toEqual([]);
	});

	test(`${path} at 390: no figure text runs off its canvas`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		await page.evaluate(() => document.fonts.ready);
		const texts = await page.evaluate(visibleTexts, "figure.uipack .uipack__canvas > svg");
		expect(texts.length).toBeGreaterThan(0);
		expect(texts.filter((t) => t.outsideSvg || t.pastNode).map((t) => t.text)).toEqual([]);
	});
}

test("figure controls and asset actions are 44px targets at 390", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/assets");
	await page.locator(".uipack-browser__action").first().waitFor();
	const short = await page.evaluate(() =>
		[...document.querySelectorAll(".uipack-browser__cat, .uipack-browser__action, .uipack-browser__search input")]
			.filter((b) => b.getBoundingClientRect().height < 44)
			.map((b) => b.className || b.tagName),
	);
	expect(short).toEqual([]);
	await page.goto("/uipack");
	await page.locator(".uipack__ctl").first().waitFor();
	const ctl = await page.evaluate(() => [...document.querySelectorAll(".uipack__ctl")].filter((b) => b.getBoundingClientRect().height < 44).length);
	expect(ctl).toBe(0);
});

test("expand button and overlay controls focus on the brand token", async ({ page }) => {
	await page.goto("/groundplane");
	const expand = page.getByRole("button", { name: /Expand diagram/ }).first();
	await expand.focus();
	await page.keyboard.press("Shift+Tab");
	await page.keyboard.press("Tab");
	const brand = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--chakra-colors-brand-solid").trim());
	const ring = await expand.evaluate((el) => ({ fv: el.matches(":focus-visible"), style: getComputedStyle(el).outlineStyle, color: getComputedStyle(el).outlineColor }));
	expect(ring.fv).toBe(true);
	expect(ring.style).toBe("solid");
	const hex = (c) => `#${c.match(/\d+/g).slice(0, 3).map((n) => (+n).toString(16).padStart(2, "0")).join("")}`;
	expect(hex(ring.color)).toBe(brand.toLowerCase());
	await page.keyboard.press("Enter");
	const close = page.getByRole("dialog").getByRole("button", { name: "Close diagram" });
	await expect(close).toBeFocused();
	expect(hex(await close.evaluate((el) => getComputedStyle(el).outlineColor))).toBe(brand.toLowerCase());
});

test("/uipack gallery does not repeat a case-study figure title or sentence", async ({ page }) => {
	const grab = async (path) => {
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		return page.evaluate(() => ({
			titles: [...document.querySelectorAll(".uipack__title")].map((t) => t.textContent.trim()),
			sentences: [...document.querySelectorAll(".uipack__caption")].flatMap((c) => c.textContent.split(/(?<=[.;])\s+/)).map((s) => s.trim().toLowerCase()).filter((s) => s.length > 20),
		}));
	};
	const gallery = await grab("/uipack");
	for (const path of ["/groundplane", "/skillpack", "/compoze"]) {
		const study = await grab(path);
		expect(gallery.titles.filter((t) => study.titles.includes(t))).toEqual([]);
		expect(gallery.sentences.filter((s) => study.sentences.includes(s))).toEqual([]);
	}
});
