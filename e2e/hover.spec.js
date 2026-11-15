const { expect, test } = require("@playwright/test");

// Hover follows a `flow` on the ported Groundplane figure: the hovered node's
// flow lights up, everything else dims. Legend hover filters by kind.
const FIG = "figure.uipack";
const model = (page) => page.locator(`${FIG} svg.uipack--wide [data-uipack="node"][data-flow~="check"]`).first();
const recordNode = (page) => page.locator(`${FIG} svg.uipack--wide [data-uipack="node"][data-flow="record"]`).first();

test.describe("/groundplane hover", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/groundplane");
		await page.locator(FIG).first().scrollIntoViewIfNeeded();
		await model(page).waitFor();
		// Centre the node so the fixed navbar never sits over the hover point.
		await model(page).evaluate((el) => el.scrollIntoView({ block: "center" }));
		// Fonts and the figure's width settle before the pointer moves, so the
		// enter event lands on the node and not where it was a frame earlier.
		await page.evaluate(() => document.fonts.ready);
		await page.waitForTimeout(300);
		await page.mouse.move(4, 4);
	});

	test("hovering a node highlights its flow and dims unrelated nodes", async ({ page }) => {
		await expect
			.poll(async () => {
				await model(page).hover({ force: true });
				return page.locator(FIG).first().getAttribute("data-hover-flow");
			})
			.toMatch(/check/);
		await expect(recordNode(page)).toHaveAttribute("data-state", "dim");
		await page.waitForTimeout(250);
		expect(Number(await recordNode(page).evaluate((el) => getComputedStyle(el).opacity))).toBeCloseTo(0.35, 1);
		const hit = page.locator(`${FIG} svg.uipack--wide [data-uipack="connector"][data-state="hit"]`);
		expect(await hit.count()).toBeGreaterThan(0);
		await page.mouse.move(0, 0);
		await page.waitForTimeout(250);
		expect(Number(await recordNode(page).evaluate((el) => getComputedStyle(el).opacity))).toBe(1);
	});

	test("hovering a legend item filters by kind", async ({ page }) => {
		const figure = page.locator(FIG).first();
		await figure.locator(".uipack__legend li", { hasText: "Facts" }).hover();
		await expect(figure).toHaveAttribute("data-hover-kind", "change");
		const hitPackets = figure.locator('svg.uipack--wide [data-uipack="packet"][data-state="hit"]');
		const dimPackets = figure.locator('svg.uipack--wide [data-uipack="packet"][data-state="dim"]');
		expect(await hitPackets.count()).toBeGreaterThan(0);
		expect(await dimPackets.count()).toBeGreaterThan(0);
	});
});

// ── Card hover: tone edge (STYLE.md, Motion; styles/globals.css) ──────────
// A card draws a 3px rule in its category colour along its top edge from the
// side the pointer came in, its mono label takes that colour and the card
// rises 3px; a ruled row draws a 2px ink rule. Every word keeps 4.5:1 in the
// hovered state. Fine pointers and keyboard focus only; reduced motion keeps
// the state and drops the movement.
const THEME_KEY = "junxiong-theme";
// The first three homepage cards: AI tooling (agents), Compoze (company),
// Trading engine (research); rows draw in ink (styles/globals.css, --tone-*).
const TONES = {
	light: ["rgb(35, 78, 162)", "rgb(163, 69, 43)", "rgb(47, 106, 74)"],
	dark: ["rgb(154, 182, 255)", "rgb(242, 161, 132)", "rgb(143, 211, 168)"],
};
const INK = { light: "rgb(41, 35, 31)", dark: "rgb(242, 236, 227)" };

// Text in `root` whose colour is under 4.5:1 on the ground behind it.
const lowContrast = (root) => {
	const parse = (c) => c.match(/[\d.]+/g).map(Number);
	const lum = (rgb) => {
		const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
		return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
	};
	const ground = (el) => {
		for (let e = el; e; e = e.parentElement) {
			const c = parse(getComputedStyle(e).backgroundColor);
			if (c.length < 4 || c[3] > 0) return c;
		}
		return parse(getComputedStyle(document.documentElement).backgroundColor);
	};
	const low = [];
	for (const el of [root, ...root.querySelectorAll("*")]) {
		if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
		if (!el.getClientRects().length || el.closest("[class*=visually-hidden], .chakra-visually-hidden")) continue;
		const fg = parse(getComputedStyle(el).color);
		const bg = ground(el);
		const a = fg[3] ?? 1;
		const mixed = [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
		const [hi, lo] = [lum(mixed), lum(bg)].sort((x, y) => y - x);
		const ratio = (hi + 0.05) / (lo + 0.05);
		if (ratio < 4.5) low.push(`${el.textContent.trim().slice(0, 32)} ${ratio.toFixed(2)}`);
	}
	return low;
};

const openHome = async (browser, theme, options = {}) => {
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
	await context.addInitScript(([key, t]) => localStorage.setItem(key, t), [THEME_KEY, theme]);
	const page = await context.newPage();
	await page.goto("/");
	await page.evaluate(() => document.fonts.ready);
	return { context, page };
};

const centre = async (page, locator) => {
	await locator.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
	await page.waitForTimeout(300);
};

const cardState = (el) => {
	const style = getComputedStyle(el);
	const edge = getComputedStyle(el, "::after");
	const label = el.querySelector("[data-tone-label]");
	return {
		translate: style.translate,
		shadow: style.boxShadow,
		edge: edge.transform,
		edgeColour: edge.backgroundColor,
		edgeOrigin: parseFloat(edge.transformOrigin),
		width: el.getBoundingClientRect().width,
		label: label ? getComputedStyle(label).color : null,
	};
};
const DRAWN_IN = "matrix(0, 0, 0, 1, 0, 0)";

test.describe("card hover", () => {
	for (const theme of ["light", "dark"]) {
		test(`a project card draws its category rule in ${theme} and every word keeps 4.5:1`, async ({ browser }) => {
			const { context, page } = await openHome(browser, theme);
			for (const index of [0, 1, 2]) {
				const card = page.locator('#work [data-hover="card"]').nth(index);
				await centre(page, card);
				expect(await card.evaluate(cardState)).toMatchObject({ translate: "none", shadow: "none", edge: DRAWN_IN });
				await card.hover({ position: { x: 24, y: 24 } });
				await page.waitForTimeout(450);
				const state = await card.evaluate(cardState);
				expect(state.translate).toBe("0px -3px");
				expect(state.edge).toBe("none");
				expect(state.edgeColour).toBe(TONES[theme][index]);
				expect(state.label, "the label takes the card's tone").toBe(TONES[theme][index]);
				expect(await card.evaluate(lowContrast), `card ${index} in ${theme}`).toEqual([]);
				await page.mouse.move(2, 450);
			}
			await context.close();
		});

		test(`an Around-the-site row draws an ink rule in ${theme} and keeps 4.5:1`, async ({ browser }) => {
			const { context, page } = await openHome(browser, theme);
			const row = page.getByRole("region", { name: "Around the site" }).locator('[data-hover="row"]').nth(1);
			await centre(page, row);
			const rule = () => row.evaluate((el) => ({ transform: getComputedStyle(el, "::after").transform, colour: getComputedStyle(el, "::after").backgroundColor, height: getComputedStyle(el, "::after").height }));
			expect((await rule()).transform).toBe(DRAWN_IN);
			await row.hover();
			await page.waitForTimeout(450);
			expect(await rule()).toEqual({ transform: "none", colour: INK[theme], height: "2px" });
			expect(await row.evaluate(lowContrast)).toEqual([]);
			await context.close();
		});
	}

	test("the rule draws from the side the pointer came in", async ({ browser }) => {
		const { context, page } = await openHome(browser, "light");
		const card = page.locator('#work [data-hover="card"]').first();
		await centre(page, card);
		const box = await card.boundingBox();
		// In from the right edge, then (after leaving) in from the left.
		await page.mouse.move(box.x + box.width + 40, box.y + 40);
		await page.mouse.move(box.x + box.width - 6, box.y + 40, { steps: 4 });
		let state = await card.evaluate(cardState);
		expect(state.edgeOrigin).toBeGreaterThan(state.width * 0.9);
		await page.mouse.move(box.x - 40, box.y + 40, { steps: 4 });
		await page.mouse.move(box.x + 6, box.y + 40, { steps: 4 });
		state = await card.evaluate(cardState);
		expect(state.edgeOrigin).toBeLessThan(state.width * 0.1);
		await context.close();
	});

	test("keyboard focus gives a card the same state as hover", async ({ browser }) => {
		const { context, page } = await openHome(browser, "light");
		const card = page.locator('#work [data-hover="card"]').first();
		await centre(page, card);
		// Tab onto the card's link from the element before it.
		await page.locator("#work-heading").evaluate((el) => {
			el.tabIndex = -1;
			el.focus();
		});
		await page.keyboard.press("Tab");
		expect(await card.evaluate((el) => el.contains(document.activeElement) && document.activeElement.matches(":focus-visible"))).toBe(true);
		await page.waitForTimeout(450);
		expect(await card.evaluate(cardState)).toMatchObject({ translate: "0px -3px", edge: "none" });
		// The 2px brand ring stays on the link.
		expect(await page.evaluate(() => getComputedStyle(document.activeElement).outlineWidth)).toBe("2px");
		await context.close();
	});

	test("under reduced motion a hovered card keeps its state but does not move", async ({ browser }) => {
		const { context, page } = await openHome(browser, "light", { reducedMotion: "reduce" });
		const card = page.locator('#work [data-hover="card"]').first();
		await centre(page, card);
		await card.hover({ position: { x: 24, y: 24 } });
		await page.waitForTimeout(100);
		expect(await card.evaluate(cardState)).toMatchObject({ translate: "none", edge: "none", edgeColour: TONES.light[0] });
		await context.close();
	});

	test("on a touch screen a card never lifts", async ({ browser }) => {
		const { context, page } = await openHome(browser, "light", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
		const card = page.locator('#work [data-hover="card"]').first();
		await centre(page, card);
		await card.hover({ position: { x: 24, y: 24 } });
		await page.waitForTimeout(400);
		expect(await card.evaluate(cardState)).toMatchObject({ translate: "none", shadow: "none", edge: DRAWN_IN });
		await context.close();
	});
});
