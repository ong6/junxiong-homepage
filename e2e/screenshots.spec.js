const { test } = require("@playwright/test");

// Not a test: writes QA screenshots into the store's gitignored folder.
// Run with `SHOTS=1 npx playwright test e2e/screenshots.spec.js`.
const OUT = process.env.SHOTS_DIR || "/Users/bytedance/Sideproject/personal-data-store/.playwright-mcp";

for (const path of ["/uipack", "/assets", "/groundplane"]) {
	for (const theme of ["light", "dark"]) {
		for (const [w, h] of [
			[1440, 1000],
			[390, 844],
		]) {
			test(`shot ${path} ${theme} ${w}`, async ({ page }) => {
				await page.setViewportSize({ width: w, height: h });
				await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
				await page.goto(path);
				await page.locator("figure.uipack, .uipack-browser").first().scrollIntoViewIfNeeded();
				await page.waitForTimeout(600);
				const name = path.replace("/", "");
				await page.screenshot({ path: `${OUT}/${name}-${w}-${theme}.png`, fullPage: w === 390 });
			});
		}
	}
}
