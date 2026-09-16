const { defineConfig, devices } = require("@playwright/test");

// Browser tests for the uipack figures on the live pages. `npm run test:e2e`
// builds, starts a production server on 3011 and runs against it.
module.exports = defineConfig({
	testDir: "e2e",
	testIgnore: process.env.SHOTS ? [] : ["**/screenshots.spec.js"],
	timeout: 30_000,
	fullyParallel: false,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? "github" : "list",
	use: { baseURL: "http://localhost:3011" },
	webServer: {
		command: "npm run build && npx next start -p 3011",
		url: "http://localhost:3011",
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
