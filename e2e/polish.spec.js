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
			// offsetHeight: layout height, unaffected by the entrance animation's transform.
			.filter((b) => b.offsetHeight < 44)
			.map((b) => b.className || b.tagName),
	);
	expect(short).toEqual([]);
	await page.goto("/uipack");
	await page.locator(".uipack__ctl").first().waitFor();
	const ctl = await page.evaluate(() => [...document.querySelectorAll(".uipack__ctl")].filter((b) => b.offsetHeight < 44).length);
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

// Lighthouse flagged both on 2026-09-16: axe reads an aria-hidden glyph as
// visible text, and uipack fades the category counts to 0.7 opacity.
test("expand button's accessible name contains its visible text", async ({ page }) => {
	await page.goto("/groundplane");
	const btn = page.getByRole("button", { name: /Expand diagram/ }).first();
	const visible = (await btn.textContent()).trim().toLowerCase();
	expect(visible.length).toBeGreaterThan(0);
	expect((await btn.getAttribute("aria-label")).toLowerCase()).toContain(visible);
});

for (const theme of ["light", "dark"]) {
	test(`/assets counts and status read at 4.5:1 in ${theme}`, async ({ page }) => {
		await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
		await page.goto("/assets");
		await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
		// The body background transitions between modes; measure once it lands.
		await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(theme === "dark" ? "rgb(14, 21, 18)" : "rgb(241, 238, 230)");
		await page.locator(".uipack-browser__count").first().waitFor();
		const ratios = await page.evaluate(() => {
			const lum = (c) => {
				const [r, g, b] = c.match(/\d+/g).map((n) => +n / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
				return 0.2126 * r + 0.7152 * g + 0.0722 * b;
			};
			const bg = (el) => {
				for (let e = el; e; e = e.parentElement) {
					const c = getComputedStyle(e).backgroundColor;
					if (c && !/rgba\(0, 0, 0, 0\)/.test(c)) return c;
				}
				return "rgb(255, 255, 255)";
			};
			return [...document.querySelectorAll(".uipack-browser__count, .uipack-browser__status")].map((el) => {
				const cs = getComputedStyle(el);
				const l1 = lum(cs.color), l2 = lum(bg(el));
				return { text: el.textContent.trim(), fg: cs.color, bg: bg(el), opacity: +cs.opacity, ratio: +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2) };
			});
		});
		expect(ratios.length).toBeGreaterThan(0);
		expect(ratios.filter((r) => r.opacity < 1 || r.ratio < 4.5)).toEqual([]);
	});
}
