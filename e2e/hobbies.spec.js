const { expect, test } = require("@playwright/test");
const { collectErrors } = require("./helpers");

const labels = ["Travel", "Coding & AI", "Tennis", "Reading", "Home lab", "Trading"];

async function settleLayout(page) {
	await page.evaluate(() => document.fonts.ready);
	await page.locator("article").evaluate((article) =>
		Promise.all(article.getAnimations().map((animation) => animation.finished)),
	);
}

// One scene plays, the one nearest the centre of the screen. The chapters
// before and after it hold theirs built and still (preload), so a scene is
// ready when its chapter arrives; no other chapter holds one.
async function expectOnlyVisibleArtwork(page) {
  await expect.poll(async () => page.locator('[data-hobby-visual]').evaluateAll(nodes => {
    const playing = nodes.findIndex(node => node.querySelector('.uipack-object[data-active="true"]'));
    const held = nodes.map((node, index) => node.querySelector('canvas') ? index : -1).filter(index => index >= 0);
    const onScreen = node => {
      const rect = node.getBoundingClientRect();
      return rect.top < innerHeight && rect.bottom > 0;
    };
    if (nodes.filter(node => node.querySelector('.uipack-object[data-active="true"]')).length > 1) return false;
    if (playing < 0) return held.length === 0;
    return onScreen(nodes[playing]) && held.length <= 3 && held.every(index => Math.abs(index - playing) <= 1);
  })).toBe(true);
}

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`hobbies chapters at ${width} in ${theme} preserve reading order and native scroll`, async ({ page }) => {
			// Up to three scene builds under software WebGL, beside three other workers.
			test.setTimeout(60_000);
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("junxiong-theme", t), theme);
			await page.goto("/hobbies");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			await expect(page.locator("h1")).toHaveText("Hobbies");
			await expect(page.locator("main h2")).toHaveText(labels);
			await settleLayout(page);
			await expectOnlyVisibleArtwork(page);
			// No placeholder picture: the 2D drawing stays hidden where a scene has not been built
			// (a far chapter) and where one has (the first chapter).
			await expect(page.locator("#trading .uipack-object__fallback")).toHaveCSS("opacity", "0");
			await expect(page.locator("#travel .uipack-object__fallback")).toHaveCSS("opacity", "0");
			expect(await page.locator("[data-chapter]").count()).toBe(6);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
			expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType)).toBe("none");
			const targets = await page.locator('main nav a, main button').evaluateAll((nodes) => nodes.map((node) => ({ w: node.getBoundingClientRect().width, h: node.getBoundingClientRect().height })));
			expect(targets.every(({ w, h }) => w >= 44 && h >= 44)).toBe(true);
			await page.locator("#tennis").scrollIntoViewIfNeeded();
			// Scenes build one at a time, so under software WebGL this one can wait for a neighbour's build.
			await expect(page.locator('#tennis canvas[data-renderer="webgl"]')).toBeVisible({ timeout: 15_000 });
			await expect(page.locator('main .uipack-object[data-active="true"]')).toHaveCount(1);
			await expect(page.getByRole("button", { name: "Pause motion" })).toHaveCount(1, { timeout: 15_000 });
			await expect(page.locator("#tennis").getByRole("button", { name: "Pause motion" })).toBeVisible({ timeout: 15_000 });
			await expect(page.locator("#tennis").getByRole("button", { name: "Open canvas" })).toHaveCount(0);
			await expect(page.locator("#tennis").getByRole("button", { name: "Another look" })).toHaveCount(0);
			await expect(page.locator('#tennis [role="img"]')).toHaveAttribute("aria-label", "Tennis illustration");
			await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
			await expectOnlyVisibleArtwork(page);
			expect(errors).toEqual([]);
		});
	}
}

test("hobbies pauses motion explicitly and while a chapter is offscreen", async ({ page }) => {
	await page.goto("/hobbies#coding-ai");
	await settleLayout(page);
	// Activation follows the visual closest to the viewport centre, so centre
	// that element rather than the taller chapter that also contains its copy.
	await page.locator("#coding-ai [data-hobby-visual]").evaluate((visual) =>
		visual.scrollIntoView({ behavior: "instant", block: "center" }),
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
	// A held scene does not play: coding-ai's neighbour is built and still.
	const neighbour = page.locator('#tennis canvas[data-renderer="webgl"]');
	await neighbour.waitFor();
	await expect(page.locator("#tennis .uipack-object")).toHaveAttribute("data-active", "false");
	await page.waitForTimeout(250);
	expect(await neighbour.getAttribute("data-frames")).toBeNull();
	// Four chapters away, coding-ai's scene is released.
	await page.locator("#trading").scrollIntoViewIfNeeded();
	await expect(scene).toHaveCount(0);
	await expectOnlyVisibleArtwork(page);
});

test("hobby artwork starts when its visual enters the viewport", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 900 });
	await page.goto("/hobbies");
	await settleLayout(page);
	await expectOnlyVisibleArtwork(page);
	await page.locator("#coding-ai [data-hobby-visual]").scrollIntoViewIfNeeded();
	const canvas = page.locator('#coding-ai canvas[data-renderer="webgl"]');
	await canvas.waitFor();
	await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe("0");
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
	// Only now is the drawing shown: WebGL cannot draw the scene.
	await expect(page.locator("#tennis .uipack-object__fallback")).toHaveCSS("opacity", "1");
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

test("trading uses the shared journal", async ({ page }) => {
 await page.goto("/hobbies#trading");
 await expect(page.locator('#trading canvas')).toHaveAttribute('data-renderer','webgl',{timeout:15_000});
 await expect(page.locator('#trading .uipack-object')).toHaveAttribute('data-kind','trading');
});

for (const width of [390, 1440]) for (const theme of ['light', 'dark']) {
  test(`fixed hobby artwork blends with the page at ${width} in ${theme}`, async ({page}, info) => {
    // Six scene builds in one page: software WebGL under a parallel run can pass 30 s.
    test.setTimeout(90_000);
    await page.setViewportSize({width, height:900});
    await page.addInitScript(mode => localStorage.setItem('junxiong-theme', mode), theme);
    // An old preview URL: the page has one 3D style and ignores it.
    await page.goto('/hobbies?style=abstract');
    await expect(page.getByRole('button',{name:'My picks',exact:true})).toHaveCount(0);
    await expect(page.getByRole('group',{name:'3D art direction'})).toHaveCount(0);
    for (const [kind,direction] of ['travel','ai','tennis','reading','server','trading'].map(kind => [kind,'ink'])) {
      const chapter=page.locator(`[data-chapter="${kind}"]`);
      const object=chapter.locator('.uipack-object');
      await chapter.locator('[data-hobby-visual]').evaluate(node => node.scrollIntoView({block:'center',behavior:'instant'}));
      await expect(object).toHaveAttribute('data-art-direction',direction);
      await expect(object).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
      await expect(object).toHaveCSS('background-image','none');
      await expect(object).toHaveCSS('border-top-color','rgba(0, 0, 0, 0)');
      await expect(object.locator('canvas')).toHaveAttribute('data-renderer','webgl');
      await expect(object.locator('canvas')).toHaveCSS('opacity','1');
      await expect(page.locator('main .uipack-object[data-active="true"]')).toHaveCount(1);
      await page.screenshot({path:info.outputPath(`${kind}.png`)});
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  });
}

test('contact draws the one ink style even with an old preview URL',async({page})=>{
  await page.goto('/contact?style=kinetic');
  await expect(page.locator('.uipack-object canvas')).toHaveAttribute('data-renderer','webgl');
  await expect(page.locator('.uipack-object')).toHaveAttribute('data-art-direction','ink');
  await expect(page.getByRole('link',{name:'Email me',exact:true})).toHaveAttribute('href','mailto:junxiongong2@gmail.com');
});
