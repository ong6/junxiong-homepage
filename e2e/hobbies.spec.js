const { expect, test } = require("@playwright/test");
const { collectErrors } = require("./helpers");

const labels = ["Coding & AI", "Tennis", "Trading", "Home servers", "Travel", "Reading"];

async function settleLayout(page) {
	await page.evaluate(() => document.fonts.ready);
	await page.locator("article").evaluate((article) =>
		Promise.all(article.getAnimations().map((animation) => animation.finished)),
	);
}

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`hobbies chapters at ${width} in ${theme} preserve reading order and native scroll`, async ({ page }) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
			await page.goto("/hobbies");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			await expect(page.locator("h1")).toHaveText("Things I keep returning to.");
			await expect(page.locator("main h2")).toHaveText(labels);
			await settleLayout(page);
			await expect(page.locator("main canvas")).toHaveCount(0);
			expect(await page.locator("[data-chapter]").count()).toBe(6);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
			expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType)).toBe("none");
			const targets = await page.locator('main nav a, main button').evaluateAll((nodes) => nodes.map((node) => ({ w: node.getBoundingClientRect().width, h: node.getBoundingClientRect().height })));
			expect(targets.every(({ w, h }) => w >= 44 && h >= 44)).toBe(true);
			await page.locator("#tennis").scrollIntoViewIfNeeded();
			await expect(page.locator('#tennis canvas[data-renderer="webgl"]')).toBeVisible();
			expect(await page.locator("main canvas").count()).toBe(1);
			await expect(page.locator('#tennis [role="img"]')).toHaveAttribute("aria-label", "Tennis illustration");
			await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
			await expect(page.locator("main canvas")).toHaveCount(0);
			expect(errors).toEqual([]);
		});
	}
}

test("hobbies pauses motion explicitly and while a chapter is offscreen", async ({ page }) => {
	await page.goto("/hobbies#coding-ai");
	await settleLayout(page);
	// Start from a settled chapter, after the native anchor scroll and entrance.
	await page.locator("#coding-ai").evaluate((chapter) =>
		chapter.scrollIntoView({ behavior: "instant", block: "center" }),
	);
	const scene = page.locator('#coding-ai canvas[data-renderer="webgl"]');
	await scene.waitFor();
	const pause = page.locator("#coding-ai").getByRole("button", { name: "Pause motion" });
	await expect(pause).toBeVisible();
	await pause.click();
	await expect(page.locator("#coding-ai").getByRole("button", { name: "Resume motion" })).toHaveAttribute("aria-pressed", "true");
	const pausedAt = await scene.getAttribute("data-frames");
	await page.waitForTimeout(250);
	expect(await scene.getAttribute("data-frames")).toBe(pausedAt);
	await page.locator("#coding-ai").getByRole("button", { name: "Resume motion" }).click();
	await page.locator("#trading").scrollIntoViewIfNeeded();
	await expect(scene).toHaveCount(0);
	expect(await page.locator("main canvas").count()).toBeLessThanOrEqual(1);
});

test("hobby motion advances through an authored sequence, settles, then replays on demand", async ({ page }) => {
	await page.goto("/hobbies#coding-ai");
	await settleLayout(page);
	await page.locator("#coding-ai").evaluate((chapter) =>
		chapter.scrollIntoView({ behavior: "instant", block: "center" }),
	);
	const scene = page.locator('#coding-ai canvas[data-renderer="webgl"]');
	await scene.waitFor();
	await expect.poll(() => scene.getAttribute("data-phase")).toBe("prompt-to-tools");
	const firstPose = Number(await scene.getAttribute("data-pose"));
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 5000 }).toBe("tools-to-check");
	expect(Number(await scene.getAttribute("data-pose"))).not.toBe(firstPose);
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 5000 }).toBe("rest");
	const completedAt = await scene.getAttribute("data-frames");
	await page.waitForTimeout(500);
	expect(await scene.getAttribute("data-frames")).toBe(completedAt);
	const replay = page.locator("#coding-ai").getByRole("button", { name: "Replay motion" });
	await replay.click();
	await expect.poll(() => scene.getAttribute("data-phase"), { timeout: 2000 }).toMatch(/prompt|prompt-to-tools/);
	expect(await page.locator("main canvas").count()).toBe(1);
});

test("hobbies reduced motion uses a static WebGL frame with no motion controls", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/hobbies#tennis");
	const canvas = page.locator('#tennis canvas[data-renderer="webgl"]');
	await canvas.waitFor();
	await expect(page.locator("#tennis").getByRole("button", { name: /motion/i })).toHaveCount(0);
	await expect(canvas).toHaveAttribute("data-phase", "rest");
	const frames = Number(await canvas.getAttribute("data-frames"));
	const pose = await canvas.getAttribute("data-pose");
	await page.waitForTimeout(250);
	expect(Number(await canvas.getAttribute("data-frames"))).toBe(frames);
	expect(await canvas.getAttribute("data-pose")).toBe(pose);
});

test("hobbies keeps the labelled fallback when WebGL is unavailable", async ({ page }) => {
	await page.addInitScript(() => {
		const getContext = HTMLCanvasElement.prototype.getContext;
		HTMLCanvasElement.prototype.getContext = function patchedGetContext(type, ...args) {
			if (type === "webgl" || type === "webgl2") return null;
			return getContext.call(this, type, ...args);
		};
	});
	await page.goto("/hobbies#tennis");
	await expect(page.locator('#tennis canvas[data-renderer="fallback"]')).toHaveCount(1);
	await expect(page.locator('#tennis [role="img"]')).toHaveAttribute("aria-label", "Tennis illustration");
	await expect(page.locator("#tennis").getByRole("button", { name: /motion/i })).toHaveCount(0);
});

test("hobbies returns to the labelled fallback when a WebGL context is lost", async ({ page }) => {
	await page.goto("/hobbies#tennis");
	const canvas = page.locator('#tennis canvas[data-renderer="webgl"]');
	await canvas.waitFor();
	await canvas.dispatchEvent("webglcontextlost");
	await expect(page.locator('#tennis canvas[data-renderer="fallback"]')).toHaveCount(1);
	await expect(page.locator('#tennis [role="img"]')).toHaveAttribute("aria-label", "Tennis illustration");
	await expect(page.locator("#tennis").getByRole("button", { name: /motion/i })).toHaveCount(0);
});

test("trading uses the shared journal and UI Pack exposes all library objects", async ({ page }) => {
 await page.goto("/hobbies#trading");
 await expect(page.locator('#trading canvas')).toHaveAttribute('data-renderer','webgl');
 await page.goto('/uipack');
 const collection=page.getByRole('region',{name:'3D object collection'});
 await expect(collection.getByRole('button',{name:'Trading journal',exact:true})).toBeVisible();
 await collection.getByRole('button',{name:'Trading journal',exact:true}).click();
 await expect(collection.locator('canvas')).toHaveAttribute('data-renderer','webgl');
 await expect(collection.getByText("A fast market replay with red and green candles, order flow and a reversal. Simulation; no live data.", { exact: true })).toBeVisible();
 await expect(collection.getByRole('group',{name:'Choose an object'}).getByRole('button')).toHaveCount(7);
});

test("UI Pack changes the tennis edition without leaving the shared player", async ({ page }) => {
 await page.goto('/uipack');
 const collection = page.getByRole('region', { name: '3D object collection' });
 await collection.getByRole('button', { name: 'Tennis practice', exact: true }).click();
 const object = collection.locator('.uipack-object');
 await expect(object.locator('canvas')).toHaveAttribute('data-source', 'blender');
 const before = Number(await object.getAttribute('data-variant'));
 await collection.getByRole('button', { name: 'Another look', exact: true }).click();
 await expect(object).toHaveAttribute('data-variant', String((before + 1) % 3));
 await expect(object.locator('canvas')).toHaveAttribute('data-renderer', 'webgl');
});
