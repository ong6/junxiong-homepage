const { expect, test } = require("@playwright/test");
const { collectErrors } = require("./helpers");

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`contact page at ${width} in ${theme} exposes every contact path`, async ({ page }, info) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((mode) => localStorage.setItem("chakra-ui-color-mode", mode), theme);
			await page.goto("/contact");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			await expect(page.getByRole("heading", { level: 1, name: "Let's talk." })).toBeVisible();
			for (const [name, href] of [
				["Email", "mailto:junxiongong2@gmail.com"],
				["LinkedIn", "https://www.linkedin.com/in/junx6/"],
				["GitHub", "https://github.com/ong6"],
				["Resume", "/resume"],
				["Notes", "https://notes.junxiong.dev"],
			]) {
				await expect(page.getByRole("link", { name: new RegExp(`^${name}`) }).first()).toHaveAttribute("href", href);
			}
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
			const short = await page.locator('main a:visible, main button:visible').evaluateAll((controls) => controls
				.map((control) => ({ text: control.textContent.trim(), height: control.getBoundingClientRect().height }))
				.filter(({ height }) => height < 31.9));
			expect(short).toEqual([]);
			await expect(page.locator('main canvas')).toHaveAttribute('data-renderer', 'webgl');
			await expect(page.locator('main canvas')).toHaveCSS('opacity', '1');
			await expect(page.locator('.uipack-object')).toHaveAttribute('data-art-direction', 'cartoon');
			await expect(page.locator('.uipack-object')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
			await expect(page.locator('.uipack-object')).toHaveCSS('background-image', 'none');
			await page.screenshot({ path: info.outputPath('contact-locked.png'), fullPage: true });
			expect(errors).toEqual([]);
		});
	}
}

test("contact object becomes static under reduced motion", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/contact");
	const canvas = page.locator('main canvas[data-renderer="webgl"]');
	await canvas.waitFor();
	await expect(canvas).toHaveAttribute("data-phase", "rest");
	await expect(page.getByRole("button", { name: /motion/i })).toHaveCount(0);
});
