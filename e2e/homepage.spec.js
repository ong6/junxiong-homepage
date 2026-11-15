const { test, expect } = require("@playwright/test");
const { collectErrors } = require("./helpers");
const notes = require("../lib/notes.snapshot.json");

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`homepage at ${width} in ${theme} shows the full project cabinet`, async ({
			page,
		}) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("junxiong-theme", t), theme);
			await page.goto("/");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(600);
			await expect(page.locator("h1")).toHaveText("Ong Jun Xiong");
			const projectHeadings = await page.locator("#work h3").allTextContents();
			expect(projectHeadings.map((heading) => heading.replace(/[→↗]/, "").trim())).toEqual([
				"AI tooling",
				"Compoze",
				"Trading engine",
				"UiPack",
			]);
			await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
			await expect(page.getByRole("heading", { name: "Also building" })).toBeVisible();
			await expect(page.getByRole("heading", { name: "Around the site" })).toBeVisible();
			await expect(page.getByText("04 more", { exact: true })).toHaveCount(0);
			const firstProject = await page.locator("#work h3").first().boundingBox();
			expect(firstProject.y + firstProject.height).toBeLessThan(900);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
				false,
			);
			// The ↗ is aria-hidden (components/OutArrow.js), so it is not part of the name.
			for (const label of ["GitHub", "LinkedIn", "Resume"]) {
				// GitHub and LinkedIn open a new tab and say so in their name.
				const name = label === "Resume" ? label : `${label} (opens in a new tab)`;
				const target = await page.getByRole("link", { name, exact: true }).first().boundingBox();
				expect(target.height).toBeGreaterThanOrEqual(43.9);
			}
			await expect(page.locator("#about").getByRole("link", { name: "Resume", exact: true })).toHaveAttribute("href", "/resume");
			await expect(page.locator("main").getByRole("link", { name: "Email", exact: true })).toHaveCount(0);
			await expect(page.getByText("Most of my work is Go backends and distributed systems", { exact: false })).toBeVisible();
			await expect(
				page.locator("#work").getByRole("link", { name: "Compoze", exact: true }),
			).toHaveAttribute("href", "/compoze");
			await expect(page.locator("#now")).toHaveCount(0);
			for (const [name, href] of [
				["UiPack", "/uipack"],
				["Trading engine", "/trading-engine"],
				["AI tooling", "/ai-tooling"],
			]) {
				await expect(page.locator("#work").getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
			}
			// Notes moved up into Recent writing; three rows fill the grid.
			const elsewhere = page.getByRole("region", { name: "Around the site" });
			await expect(elsewhere.getByRole("link")).toHaveCount(3);
			for (const name of ["Hobbies", "Archive", "Resume"]) {
				await expect(elsewhere.getByRole("link", { name: new RegExp(`^${name}`) })).toBeVisible();
			}

			// Recent writing: the four newest notes as links out, then all notes,
			// between Also building and Around the site.
			const writing = page.getByRole("region", { name: "Recent writing" });
			const rows = writing.getByRole("listitem");
			await expect(rows).toHaveCount(4);
			for (const [index, note] of notes.slice(0, 4).entries()) {
				const row = rows.nth(index).getByRole("link");
				await row.scrollIntoViewIfNeeded();
				await expect(row).toHaveAttribute("href", note.url);
				await expect(row).toHaveAttribute("target", "_blank");
				await expect(row).toContainText(note.title);
				await expect(row.locator("time")).toHaveAttribute("datetime", note.date);
				expect((await row.boundingBox()).height).toBeGreaterThanOrEqual(44);
			}
			const allNotes = writing.getByRole("link", { name: "All notes (opens in a new tab)", exact: true });
			await expect(allNotes).toHaveAttribute("href", "https://notes.junxiong.dev");
			expect((await allNotes.boundingBox()).height).toBeGreaterThanOrEqual(43.9);
			const order = await page.evaluate(() =>
				["Also building", "Recent writing", "Around the site"].map((name) =>
					[...document.querySelectorAll("h2")].find((h) => h.textContent.trim() === name).getBoundingClientRect().top,
				),
			);
			expect(order[0]).toBeLessThan(order[1]);
			expect(order[1]).toBeLessThan(order[2]);

			// The supporting cards carry a framed static preview like the leads,
			// with nothing under 12px.
			for (const name of ["Trading engine", "UiPack"]) {
				const card = page.locator("#work article").filter({ has: page.getByRole("heading", { name }) });
				const panel = card.locator("[data-panel]");
				await expect(panel).toHaveCount(1);
				await panel.scrollIntoViewIfNeeded();
				await expect(panel).toBeVisible();
				// SVG text renders at its font size times the drawing's scale.
				const smallest = await panel.evaluate((el) => {
					const sizes = [];
					for (const node of el.querySelectorAll("*")) {
						if (!node.getClientRects().length) continue;
						if (![...node.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
						const svg = node.closest("svg");
						const scale = svg ? svg.getBoundingClientRect().width / svg.viewBox.baseVal.width : 1;
						sizes.push(parseFloat(getComputedStyle(node).fontSize) * scale);
					}
					return Math.min(...sizes);
				});
				expect(smallest, `${name} preview text`).toBeGreaterThanOrEqual(11.5);
			}
			await expect(page.locator("#work").getByText("$1.56", { exact: true })).toBeVisible();
			await expect(page.locator("#work canvas")).toHaveCount(0);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
			expect(errors).toEqual([]);
		});
	}
}

for (const width of [768, 960]) {
	test(`homepage at ${width} changes project columns without clipping`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/");
		await page.evaluate(() => document.fonts.ready);
		const a = await page.locator("#work h3").nth(0).boundingBox();
		const b = await page.locator("#work h3").nth(1).boundingBox();
		if (width === 768) expect(b.y).toBeGreaterThan(a.y + a.height);
		else expect(Math.abs(b.y - a.y)).toBeLessThan(1);
		expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
			false,
		);
	});
}

for (const route of ["/compoze", "/groundplane"]) {
	test(`${route} keeps supporting detail keyboard accessible and printable`, async ({ page }) => {
		await page.goto(route);
		for (const detail of await page.locator("details").all()) {
			const summary = detail.locator("summary");
			await summary.focus();
			await expect(summary).toBeFocused();
			await page.keyboard.press("Enter");
			await expect(detail).toHaveAttribute("open", "");
			await page.keyboard.press("Space");
			await expect(detail).not.toHaveAttribute("open");
		}
		await expect(page.locator("details figure")).toHaveCount(0);
		await page.emulateMedia({ media: "print" });
		const visible = await page.locator("details").evaluateAll((nodes) =>
			nodes.every((node) => {
				const body = node.querySelector(".case-study-details-body");
				return (
					getComputedStyle(node, "::details-content").contentVisibility === "visible" &&
					node.getBoundingClientRect().height > body.getBoundingClientRect().height
				);
			}),
		);
		expect(visible).toBe(true);
	});

	test(`${route} shows a concrete example before architecture with ordered figures`, async ({
		page,
	}) => {
		await page.goto(route);
		const captions = await page.locator("figcaption").allTextContents();
		const numbers = captions
			.map((caption) => caption.match(/^fig\.\s*(\d+)/i))
			.filter(Boolean)
			.map((match) => Number(match[1]));
		expect(numbers).toEqual(route === "/compoze" ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 2]);
		const first = await page.locator("main figure").first().boundingBox();
		const architecture = await page.locator("figure.uipack").first().boundingBox();
		expect(first.y).toBeLessThan(architecture.y);
	});
}

test("/ai-tooling lists the tools by layer and each tool links back", async ({ page }) => {
	const errors = collectErrors(page);
	await page.goto("/ai-tooling");
	await expect(page.locator("h1")).toHaveText("AI tooling");
	const layers = page.getByRole("region", { name: "Tools by layer" });
	for (const [name, href] of [
		["Workbase", "/workbase"],
		["Agent skills", "/skills"],
		["Skillsmith", "/skillsmith"],
		["Groundplane", "/groundplane"],
	]) {
		await expect(layers.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
	}
	for (const route of ["/workbase", "/skills", "/skillsmith", "/groundplane"]) {
		await page.goto(route);
		await expect(page.getByRole("link", { name: "← AI tooling" })).toHaveAttribute("href", "/ai-tooling");
	}
	expect(errors).toEqual([]);
});
