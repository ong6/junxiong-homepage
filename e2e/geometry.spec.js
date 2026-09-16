const { expect, test } = require("@playwright/test");

// uipack's geometry checks, run against every wide drawing on the site: no
// arrowhead tip or path end inside a node, no packet path ending on a head.
const PAGES = ["/groundplane", "/jobforge", "/skillpack", "/compoze", "/uipack"];

for (const path of PAGES) {
	test(`${path}: no arrowhead ends inside a node`, async ({ page }) => {
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		const report = await page.evaluate(() => {
			const bad = [];
			let checked = 0;
			for (const svg of document.querySelectorAll("svg.uipack--wide")) {
				const rects = [...svg.querySelectorAll('[data-uipack="node"] > rect')].map((r) => ({ x: r.x.baseVal.value, y: r.y.baseVal.value, w: r.width.baseVal.value, h: r.height.baseVal.value }));
				for (const p of svg.querySelectorAll('[data-uipack="connector"][marker-end]')) {
					checked++;
					const len = p.getTotalLength();
					const end = p.getPointAtLength(len);
					const back = p.getPointAtLength(Math.max(0, len - 1));
					const dx = end.x - back.x, dy = end.y - back.y, n = Math.hypot(dx, dy) || 1;
					const tip = { x: end.x + dx / n, y: end.y + dy / n };
					const inside = (q, r) => q.x > r.x + 0.5 && q.x < r.x + r.w - 0.5 && q.y > r.y + 0.5 && q.y < r.y + r.h - 0.5;
					for (const r of rects) if (inside(end, r) || inside(tip, r)) bad.push(`${(svg.getAttribute("aria-label") || "").slice(0, 30)}: ${p.getAttribute("d").slice(0, 30)}`);
				}
			}
			return { bad, checked };
		});
		expect(report.checked).toBeGreaterThan(0);
		expect(report.bad).toEqual([]);
	});

	test(`${path}: packets never reach an arrowhead`, async ({ page }) => {
		await page.goto(path);
		await page.locator("figure.uipack").first().waitFor();
		const bad = await page.evaluate(() => {
			const out = [];
			for (const svg of document.querySelectorAll("svg.uipack--wide")) {
				const ends = [...svg.querySelectorAll('[data-uipack="connector"][marker-end]')].map((p) => p.getPointAtLength(p.getTotalLength()));
				for (const am of svg.querySelectorAll("animateMotion")) {
					const d = am.getAttribute("path") || "";
					const nums = (d.match(/-?\d+(\.\d+)?/g) || []).map(Number);
					const last = { x: nums[nums.length - 2], y: nums[nums.length - 1] };
					for (const e of ends) if (Math.hypot(e.x - last.x, e.y - last.y) < 8) out.push(`${d.slice(0, 30)} ends ${Math.hypot(e.x - last.x, e.y - last.y).toFixed(1)} from a head`);
				}
			}
			return out;
		});
		expect(bad).toEqual([]);
	});
}
