const { test, expect } = require("@playwright/test");
const { collectErrors } = require("./helpers");

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`homepage at ${width} in ${theme} shows the full project cabinet`, async ({
			page,
		}) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
			await page.goto("/");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(600);
			await expect(page.locator("h1")).toHaveText("Ong Jun Xiong");
			const projectHeadings = await page.locator("#work h3").allTextContents();
			expect(projectHeadings.map((heading) => heading.replace("→", "").trim())).toEqual([
				"Groundplane",
				"Compoze",
				"UI Pack",
				"Trading engine",
				"Skillpack",
				"Jobforge",
			]);
			await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
			await expect(page.getByRole("heading", { name: "The rest of the cabinet" })).toBeVisible();
			const firstProject = await page.locator("#work h3").first().boundingBox();
			expect(firstProject.y + firstProject.height).toBeLessThan(900);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
				false,
			);
			for (const label of ["GitHub ↗", "LinkedIn ↗", "Resume"]) {
				const target = await page.getByRole("link", { name: label, exact: true }).first().boundingBox();
				expect(target.height).toBeGreaterThanOrEqual(43.9);
			}
			await expect(page.locator("main").getByRole("link", { name: "Email", exact: true })).toHaveCount(0);
			await expect(page.getByText("Before AI infrastructure, I wrote Go services", { exact: false })).toBeVisible();
			await expect(
				page.locator("#work").getByRole("link", { name: "Compoze", exact: true }),
			).toHaveAttribute("href", "/compoze");
			await expect(page.locator("#now")).toHaveCount(0);
			for (const [name, href] of [
				["UI Pack", "/uipack"],
				["Trading engine", "/trading-engine"],
				["Skillpack", "/skillpack"],
				["Jobforge", "/jobforge"],
			]) {
				await expect(page.locator("#work").getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
			}
			for (const name of ["Hobbies", "Notes", "Archive", "Resume"]) {
				await expect(page.getByRole("region", { name: "The rest of the cabinet" }).getByRole("link", { name: new RegExp(`^${name}`) })).toBeVisible();
			}
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
		expect(numbers).toEqual(route === "/compoze" ? [1, 2, 3, 4, 5, 6, 7] : [1, 2]);
		const first = await page.locator("main figure").first().boundingBox();
		const architecture = await page.locator("figure.uipack").first().boundingBox();
		expect(first.y).toBeLessThan(architecture.y);
	});
}
