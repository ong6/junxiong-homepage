const { expect, test } = require("@playwright/test");

// Studio contact is the one scene that plays once and settles (uipack v0.2.0;
// every other Studio subject loops as a take). This file runs in installed
// Chrome: since uipack v0.2.0 the gallery's player holds its first frame in
// Playwright's bundled Chromium (software WebGL), while GPU-backed Chrome plays.
test.use({ channel: "chrome" });

async function settleLayout(page) {
	await page.evaluate(() => document.fonts.ready);
	await page.locator("article").evaluate((article) =>
		Promise.all(article.getAnimations().map((animation) => animation.finished)),
	);
}

test("studio gallery motion advances through an authored sequence, settles, then replays on demand", async ({ page }) => {
	await page.goto("/uipack?category=web&object=contact&look=0#objects");
	await settleLayout(page);
	await page.locator(".uipack-object").evaluate((chapter) =>
		chapter.scrollIntoView({ behavior: "instant", block: "center" }),
	);
	const scene = page.locator('.uipack-object canvas[data-renderer="webgl"]');
	await scene.waitFor();
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 10000 }).toBe("route-signals");
	const firstPose = Number(await scene.getAttribute("data-pose"));
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 5000 }).toBe("collect-messages");
	expect(Number(await scene.getAttribute("data-pose"))).not.toBe(firstPose);
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 10000 }).toBe("rest");
	const completedAt = await scene.getAttribute("data-frames");
	await page.waitForTimeout(500);
	expect(await scene.getAttribute("data-frames")).toBe(completedAt);
	const replay = page.locator(".uipack-object").getByRole("button", { name: "Replay motion" });
	await replay.click();
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 2000 }).toMatch(/open-channels|route-signals/);
	expect(await page.locator("main canvas").count()).toBe(1);
});
