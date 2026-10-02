const { test } = require("@playwright/test");
const path = require("node:path");

const output = process.env.SHOTS_DIR || path.join(__dirname, "../.playwright-mcp");

for (const width of [1280, 390]) {
	for (const theme of ["light", "dark"]) {
		test(`trading docs screenshot at ${width}px in ${theme}`, async ({ page }) => {
			await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
			await page.addInitScript((mode) => localStorage.setItem("chakra-ui-color-mode", mode), theme);
			await page.goto("/trading-engine/docs");
			await page.evaluate(() => document.fonts.ready);
			await page.screenshot({
				path: path.join(output, `trading-docs-${width}-${theme}.png`),
				fullPage: true,
			});
		});
	}
}
