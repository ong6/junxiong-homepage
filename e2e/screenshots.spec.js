const { test } = require("@playwright/test");

// Not a test: writes QA screenshots into the store's gitignored folder.
// Run with `SHOTS=1 npx playwright test e2e/screenshots.spec.js`.
const OUT = process.env.SHOTS_DIR || require("path").join(__dirname, "../.playwright-mcp");

for (const path of [
	"/",
	"/contact",
	"/compoze",
	"/skillpack",
	"/trading-engine",
	"/uipack",
	"/assets",
	"/groundplane",
	"/jobforge",
	"/hobbies",
]) {
	for (const theme of ["light", "dark"]) {
		for (const [w, h] of [
			[1440, 1000],
			[390, 900],
		]) {
			test(`shot ${path} ${theme} ${w}`, async ({ page }) => {
				await page.setViewportSize({ width: w, height: h });
				await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
				await page.goto(path);
				await page.evaluate(() => document.fonts.ready);
				for (
					let y = 0;
					y < (await page.evaluate(() => document.documentElement.scrollHeight));
					y += 700
				) {
					await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
					await page.waitForTimeout(80);
				}
				await page.waitForFunction(() =>
					[...document.images].every((img) => img.complete && img.naturalWidth > 0),
				);
				await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
				await page.waitForTimeout(600);
				const name = path.replace("/", "") || "home";
				await page.screenshot({ path: `${OUT}/${name}-${w}-${theme}.png`, fullPage: true });
			});
		}
	}
}
