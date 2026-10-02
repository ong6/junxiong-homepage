const { defineConfig, devices } = require("@playwright/test");
const port = process.env.PLAYWRIGHT_PORT || "3011";

// Browser tests for the uipack figures on the live pages. `npm run test:e2e`
// builds, starts a production server on 3011 and runs against it.
module.exports = defineConfig({
	testDir: "e2e",
	testIgnore: process.env.SHOTS ? [] : ["**/screenshots.spec.js", "**/docs-screenshots.spec.js"],
	timeout: 30_000,
	fullyParallel: false,
	// Keep the software-WebGL checks within this machine's rendering budget.
	workers: 4,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? "github" : "list",
	use: { baseURL: `http://localhost:${port}` },
	webServer: {
		command: `npm run build && npx next start -p ${port}`,
		url: `http://localhost:${port}`,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
