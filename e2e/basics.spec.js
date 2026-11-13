const { expect, test } = require("@playwright/test");

// The basics every page type holds (STYLE.md: Layout, Type, Theme, Motion),
// measured in the browser so none of them can drift again. From the 2026-11-13
// consistency pass against UiPack's layout floors.

// One of each page type, plus the pages with their own hero or shell.
const PAGES = [
	"/",
	"/contact",
	"/hobbies",
	"/ai-tooling",
	"/compoze",
	"/trading-engine",
	"/trading-engine/v2",
	"/trading-engine/v1/1.8",
	"/trading-engine/docs",
	"/trading-engine/docs/data",
	"/uipack",
	"/works",
	"/works/codeparty",
	"/resume",
	"/no-such-page",
];
const THEME_KEY = "junxiong-theme";
const GROUND = { light: "rgb(243, 239, 231)", dark: "rgb(21, 19, 17)" };
const ACCENT = { light: "rgb(35, 78, 162)", dark: "rgb(154, 182, 255)" };

const settle = (page) => page.evaluate(() => document.fonts.ready);

// ── 1. One header, on the content's edges ────────────────────────────────
// Floor 8: the logo starts on the content column's start edge and the last
// control ends on its end edge, at every width; the footer too. One site
// width, so the header never moves between pages.
const edges = () => {
	const shown = (el) => {
		const box = el.getBoundingClientRect();
		return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== "hidden";
	};
	const inner = (el) => {
		const box = el.getBoundingClientRect();
		const style = getComputedStyle(el);
		return [box.left + parseFloat(style.paddingLeft), box.right - parseFloat(style.paddingRight)];
	};
	const nav = document.querySelector('nav[aria-label="Site"]');
	const controls = [...nav.querySelectorAll("a, button")].filter(shown).map((el) => el.getBoundingClientRect());
	const [mainStart, mainEnd] = inner(document.querySelector("main"));
	const [footStart, footEnd] = inner(document.querySelector("footer"));
	return {
		logo: Math.min(...controls.map((box) => box.left)),
		last: Math.max(...controls.map((box) => box.right)),
		mainStart,
		mainEnd,
		footStart,
		footEnd,
		overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
	};
};

for (const width of [2560, 1920, 1440, 1280, 1024, 768, 390]) {
	test(`one header at ${width}: the logo and the last control sit on the content's edges on every page`, async ({ page }) => {
		test.setTimeout(90_000);
		await page.setViewportSize({ width, height: 900 });
		// The site column: the window less a 16px gutter each side, 1088px at most.
		const column = Math.min(1120, width) - 32;
		const start = (width - column) / 2;
		for (const path of PAGES) {
			await page.goto(path);
			const e = await page.evaluate(edges);
			const where = `${path} at ${width}`;
			expect(Math.abs(e.logo - start), `${where}: logo x`).toBeLessThan(1);
			expect(Math.abs(e.last - (start + column)), `${where}: last control's right edge`).toBeLessThan(1);
			expect(Math.abs(e.mainStart - e.logo), `${where}: content start`).toBeLessThan(1);
			expect(Math.abs(e.mainEnd - e.last), `${where}: content end`).toBeLessThan(1);
			expect(Math.abs(e.footStart - e.logo), `${where}: footer start`).toBeLessThan(1);
			expect(Math.abs(e.footEnd - e.last), `${where}: footer end`).toBeLessThan(1);
			expect(e.overflow, `${where}: sideways scroll`).toBeLessThanOrEqual(0);
		}
	});
}

// ── 2. One spec per type role ────────────────────────────────────────────
const spec = (el) => {
	const style = getComputedStyle(el);
	const size = parseFloat(style.fontSize);
	return {
		size,
		weight: style.fontWeight,
		leading: +(parseFloat(style.lineHeight) / size).toFixed(2),
		tracking: +(parseFloat(style.letterSpacing) / size).toFixed(3),
	};
};

const LANDING = ["/", "/contact", "/hobbies"];
for (const [width, landing, article] of [
	[1440, 74, 52],
	[390, 46, 40],
]) {
	test(`page title is one spec per page type at ${width}`, async ({ page }) => {
		test.setTimeout(60_000);
		await page.setViewportSize({ width, height: 900 });
		for (const path of PAGES) {
			await page.goto(path);
			const h1 = page.locator("main h1");
			await expect(h1, `${path}: one h1`).toHaveCount(1);
			const want = LANDING.includes(path)
				? { size: landing, weight: "720", leading: 0.98, tracking: -0.06 }
				: { size: article, weight: "720", leading: 1, tracking: -0.045 };
			expect(await h1.evaluate(spec), `${path} h1`).toEqual(want);
		}
	});
}

test("section heading is one spec in case studies, era pages and docs", async ({ page }) => {
	for (const [width, size] of [
		[1440, 24],
		[390, 22],
	]) {
		await page.setViewportSize({ width, height: 900 });
		for (const [path, selector] of [
			["/compoze", "article h2[id]"],
			["/trading-engine/v2", "article h2[id]"],
			["/trading-engine/docs/data", ".uipack-docs__prose h2"],
		]) {
			await page.goto(path);
			const all = await page.locator(selector).evaluateAll((els, fn) => els.map(new Function(`return ${fn}`)()), spec.toString());
			expect(all.length, `${path}: has section headings`).toBeGreaterThan(1);
			for (const one of all) expect(one, `${path} h2 at ${width}`).toEqual({ size, weight: "720", leading: 1.2, tracking: -0.035 });
		}
	}
});

// Everything the site sets itself (UiPack's parts keep their own type).
const OWN = ".uipack, .uipack-docs, .uipack-object, .uipack-object-frame, .uipack-animation-workspace, .uipack-slide-starter, .uipack-speaker-guide, [class*='uipack-web'], svg";

test("text uses the site's six leadings and one label tracking", async ({ page }) => {
	test.setTimeout(60_000);
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const path of PAGES) {
		await page.goto(path);
		await settle(page);
		const found = await page.evaluate((own) => {
			const leadings = {};
			const labels = {};
			for (const el of document.querySelectorAll("main *, footer *, nav *")) {
				if (el.closest(own)) continue;
				if (![...el.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim())) continue;
				const box = el.getBoundingClientRect();
				if (!box.width || !box.height) continue;
				const style = getComputedStyle(el);
				const size = parseFloat(style.fontSize);
				const name = `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 24)}"`;
				if (style.lineHeight !== "normal") {
					const leading = (parseFloat(style.lineHeight) / size).toFixed(2);
					leadings[leading] = leadings[leading] || name;
				} else leadings.normal = name;
				// A mono caps label: the eyebrow, a meta line, a kicker.
				if (style.textTransform === "uppercase" && /mono/i.test(style.fontFamily)) {
					const tracking = (parseFloat(style.letterSpacing) / size || 0).toFixed(2);
					labels[tracking] = labels[tracking] || name;
				}
			}
			return { leadings, labels };
		}, OWN);
		// display 0.98 / 1, heading 1.2, label 1.3, lede 1.6, text 1.65, prose 1.8.
		// 0.91 is the logo's fixed 20px line and 0 a figure toolbar's icon row.
		const allowed = ["0.00", "0.91", "0.98", "1.00", "1.20", "1.30", "1.60", "1.65", "1.80"];
		const stray = Object.entries(found.leadings).filter(([leading]) => !allowed.includes(leading));
		expect(stray, `${path}: leadings outside the set`).toEqual([]);
		expect(Object.keys(found.labels).filter((tracking) => tracking !== "0.08"), `${path}: label tracking ${JSON.stringify(found.labels)}`).toEqual([]);
	}
});

test("one corner rule: 6px containers, 4px controls, pills and circles", async ({ page }) => {
	test.setTimeout(60_000);
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const path of PAGES) {
		await page.goto(path);
		const stray = await page.evaluate((own) => {
			const out = {};
			for (const el of document.querySelectorAll("body *")) {
				if (el.closest(own)) continue;
				const style = getComputedStyle(el);
				const radius = style.borderTopLeftRadius;
				if (radius === "0px") continue;
				const drawn = style.borderTopWidth !== "0px" || style.backgroundColor !== "rgba(0, 0, 0, 0)";
				if (!drawn || !el.getBoundingClientRect().width) continue;
				// 2px is the focus ring's own corner on a text link.
				if (!["6px", "4px", "2px", "999px", "9999px", "50%"].includes(radius)) out[radius] = el.tagName + "." + el.className;
			}
			return out;
		}, OWN);
		expect(stray, `${path}: corners off the rule`).toEqual({});
	}
});

// ── 3. One name per page ─────────────────────────────────────────────────
test("a page's nav label, title and h1 are one name", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	for (const [path, name] of [
		["/contact", "Contact"],
		["/hobbies", "Hobbies"],
		["/uipack", "UiPack"],
		["/ai-tooling", "AI tooling"],
		["/compoze", "Compoze"],
		["/trading-engine", "Trading engine"],
		["/no-such-page", "Page not found"],
	]) {
		await page.goto(path);
		await expect(page.locator("main h1"), `${path} h1`).toHaveText(name);
		await expect(page, `${path} title`).toHaveTitle(`${name} — Ong Jun Xiong`);
	}
	// The links to a page say its name.
	await page.goto("/compoze");
	const nav = page.getByRole("navigation", { name: "Site" });
	await expect(nav.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("href", "/contact");
	await expect(nav.getByRole("link", { name: "Hobbies", exact: true })).toHaveAttribute("href", "/hobbies");
	await expect(page.locator("footer").getByRole("link", { name: "UiPack", exact: true })).toHaveAttribute("href", "/uipack");
});

test('the product is spelled "UiPack" on every page', async ({ page, request }) => {
	test.setTimeout(60_000);
	for (const path of PAGES) {
		await page.goto(path);
		const text = await page.evaluate(() => `${document.title}\n${document.body.innerText}\n${[...document.querySelectorAll("[aria-label], meta[content]")].map((el) => el.getAttribute("aria-label") || el.content).join("\n")}`);
		expect(text.match(/\bU[Ii] ?[Pp]ack\b/g)?.filter((word) => word !== "UiPack") || [], path).toEqual([]);
	}
	expect(await (await request.get("/llms.txt")).text()).not.toMatch(/UI Pack/);
});

// ── 4. No flash ──────────────────────────────────────────────────────────
// The ground from the first byte: only the document is allowed to load, so
// what is measured is what the HTML alone paints.
for (const [system, stored, want] of [
	["dark", null, "dark"],
	["light", null, "light"],
	["light", "dark", "dark"],
	["dark", "light", "light"],
]) {
	test(`first byte: ${want} ground with system ${system} and ${stored ? `"${stored}" stored` : "nothing stored"}`, async ({ browser }) => {
		const context = await browser.newContext({ colorScheme: system });
		const page = await context.newPage();
		if (stored) await page.addInitScript(([key, mode]) => localStorage.setItem(key, mode), [THEME_KEY, stored]);
		await page.route("**/*", (route) => (route.request().resourceType() === "document" ? route.continue() : route.abort()));
		for (const path of ["/", "/compoze", "/trading-engine/docs", "/no-such-page"]) {
			await page.goto(path, { waitUntil: "domcontentloaded" });
			const first = await page.evaluate(() => ({
				theme: document.documentElement.dataset.theme,
				ground: getComputedStyle(document.documentElement).backgroundColor,
				scheme: getComputedStyle(document.documentElement).colorScheme,
				// The theme script and the ground come before any stylesheet or other script
				// (JSON-LD is data, not a script that runs).
				order: [...document.head.querySelectorAll('script:not([type="application/ld+json"]), #theme-ground, link[rel=stylesheet]')].slice(0, 2).map((el) => el.id),
				fonts: getComputedStyle(document.documentElement).getPropertyValue("--font-sans"),
			}));
			expect(first, path).toMatchObject({ theme: want, ground: GROUND[want], scheme: want, order: ["theme-script", "theme-ground"] });
			// The faces are named in the document, not added after hydration.
			expect(first.fonts, `${path}: --font-sans on :root`).toMatch(/IBM Plex Sans/);
		}
		await context.close();
	});
}

// Before hydration: the stylesheets load and the scripts do not, so this is
// the frame a reader sees first. Nothing in it is drawn for the other theme.
for (const theme of ["dark", "light"]) {
	test(`first paint is whole in ${theme}: links, logo, toggle and button are the theme's before any script runs`, async ({ browser }) => {
		const context = await browser.newContext({ colorScheme: theme, viewport: { width: 1440, height: 900 } });
		const page = await context.newPage();
		await page.route("**/*", (route) => (route.request().resourceType() === "script" ? route.abort() : route.continue()));
		await page.goto("/compoze", { waitUntil: "load" });
		const first = await page.evaluate(() => {
			const shown = (el) => getComputedStyle(el).display !== "none";
			const nav = document.querySelector('nav[aria-label="Site"]');
			return {
				backLink: getComputedStyle(document.querySelector("main a")).color,
				marks: [...nav.querySelectorAll('a[aria-label*="home"] img')].filter(shown).map((img) => (/Brackets-dark/.test(img.src + img.srcset) ? "dark" : "light")),
				icons: [...nav.querySelectorAll("button[aria-label*=theme] svg")].filter(shown).length,
				icon: [...nav.querySelectorAll("button[aria-label*=theme] svg")].filter(shown).map((svg) => getComputedStyle(svg).color)[0],
				article: getComputedStyle(document.querySelector("main article")).opacity,
				body: getComputedStyle(document.body).fontFamily,
			};
		});
		expect(first).toMatchObject({ backLink: ACCENT[theme], marks: [theme], icons: 1, icon: ACCENT[theme], article: "1" });
		expect(first.body).toMatch(/IBM Plex Sans/);

		// A UiPack part that still carries the server's light guess as its theme
		// reads the page's colours, and the plain variables match the tokens.
		const roles = await page.evaluate(() => {
			// Resolved through a probe, so the build's colour notation never matters.
			const probe = document.body.appendChild(document.createElement("i"));
			const resolve = (name) => {
				probe.style.color = `var(${name})`;
				return getComputedStyle(probe).color;
			};
			const differ = ["page-bg", "page-text", "text-muted", "surface-raised", "border-subtle", "brand-solid", "preview-shadow"].filter(
				(name) => resolve(`--site-${name}`) !== resolve(`--chakra-colors-${name}`),
			);
			probe.remove();
			return differ;
		});
		expect(roles, "site variables that differ from the theme's tokens").toEqual([]);
		await page.goto("/contact", { waitUntil: "load" });
		expect(await page.locator(".uipack-object__illustration").first().evaluate((svg) => getComputedStyle(svg).color)).toBe(ACCENT[theme]);
		await page.setViewportSize({ width: 390, height: 844 });
		const ink = theme === "dark" ? "rgb(242, 236, 227)" : "rgb(41, 35, 31)";
		expect(await page.getByRole("button", { name: "Open navigation menu" }).evaluate((el) => getComputedStyle(el).color)).toBe(ink);
		await page.setViewportSize({ width: 1440, height: 900 });

		// The filled button and a code panel, on the pages that have them.
		await page.goto("/resume", { waitUntil: "load" });
		expect(await page.getByRole("link", { name: "Download PDF" }).evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(ACCENT[theme]);
		await page.goto("/groundplane", { waitUntil: "load" });
		const panel = await page.locator("main pre").first().evaluate((pre) => getComputedStyle(pre.parentElement.parentElement).backgroundColor);
		expect(panel).toBe(theme === "dark" ? "rgb(25, 23, 22)" : "rgb(246, 242, 234)");
		await context.close();
	});
}

test("a page change never blanks: the new page is whole on its first frame", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/");
	await page.locator('main a[href="/compoze"]').first().waitFor();
	// Sample every frame across the change: the ground, and the page's opacity.
	await page.evaluate(() => {
		window.__frames = [];
		const tick = () => {
			const article = document.querySelector("main article");
			const title = document.querySelector("main h1");
			window.__frames.push({
				title: title ? title.textContent.trim() : null,
				opacity: article ? getComputedStyle(article).opacity : null,
				ground: getComputedStyle(document.documentElement).backgroundColor,
				nav: !!document.querySelector('nav[aria-label="Site"] a[aria-label*="home"]'),
			});
			window.__raf = requestAnimationFrame(tick);
		};
		tick();
	});
	await page.locator('main a[href="/compoze"]').first().click();
	await expect(page.locator("main h1")).toHaveText("Compoze");
	await page.waitForTimeout(700);
	const frames = await page.evaluate(() => {
		cancelAnimationFrame(window.__raf);
		return window.__frames;
	});
	expect(frames.length).toBeGreaterThan(10);
	expect(frames.filter((frame) => frame.title === "Compoze").length).toBeGreaterThan(5);
	// Every frame has a title (the old page's or the new one's), the header and
	// the ground, and the page is never transparent.
	expect(frames.filter((frame) => !frame.title || !frame.nav || frame.ground !== GROUND.dark || frame.opacity !== "1")).toEqual([]);
});

// ── 5. The theme is the reader's last choice, then the system's ──────────
const themeOf = (page) =>
	page.evaluate((key) => ({ theme: document.documentElement.dataset.theme, stored: localStorage.getItem(key), ground: getComputedStyle(document.documentElement).backgroundColor }), THEME_KEY);

test("with no choice the theme is the system's, live, and nothing is stored", async ({ browser }) => {
	const context = await browser.newContext({ colorScheme: "dark" });
	const page = await context.newPage();
	await page.goto("/compoze");
	await page.getByRole("button", { name: "Use light theme" }).waitFor();
	expect(await themeOf(page)).toEqual({ theme: "dark", stored: null, ground: GROUND.dark });

	// The system changes while the page is open, then on a later visit.
	await page.emulateMedia({ colorScheme: "light" });
	await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
	expect(await themeOf(page)).toEqual({ theme: "light", stored: null, ground: GROUND.light });
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	expect(await themeOf(page)).toEqual({ theme: "dark", stored: null, ground: GROUND.dark });
	await context.close();
});

test("the toggle's choice is kept across pages, reloads and system changes", async ({ browser }) => {
	const context = await browser.newContext({ colorScheme: "dark", reducedMotion: "reduce" });
	const page = await context.newPage();
	await page.goto("/compoze");
	await page.getByRole("button", { name: "Use light theme" }).click();
	await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
	expect(await themeOf(page)).toEqual({ theme: "light", stored: "light", ground: GROUND.light });

	await page.goto("/hobbies");
	expect((await themeOf(page)).theme).toBe("light");
	// A system change does not override the reader's choice, open or reloaded.
	await page.emulateMedia({ colorScheme: "light" });
	await page.emulateMedia({ colorScheme: "dark" });
	await page.getByRole("button", { name: "Use dark theme" }).waitFor();
	expect(await themeOf(page)).toEqual({ theme: "light", stored: "light", ground: GROUND.light });
	await page.reload();
	await page.getByRole("button", { name: "Use dark theme" }).waitFor();
	expect(await themeOf(page)).toEqual({ theme: "light", stored: "light", ground: GROUND.light });
	// The browser's own chrome follows the theme on screen.
	expect(await page.locator('meta[name="theme-color"]').evaluateAll((metas) => metas.map((meta) => meta.content))).toEqual(["#F3EFE7", "#F3EFE7"]);
	await context.close();
});

// ── 6. A phone: 44px targets, no sideways scroll ─────────────────────────
test("every control is a 44px target at 390 and no page scrolls sideways", async ({ browser }) => {
	test.setTimeout(90_000);
	const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
	const page = await context.newPage();
	for (const path of PAGES) {
		await page.goto(path);
		await settle(page);
		const found = await page.evaluate(() => {
			const small = [];
			for (const el of document.querySelectorAll("a, button, summary, select, input, [role=button], [role=tab]")) {
				const style = getComputedStyle(el);
				if (style.display === "none" || style.visibility === "hidden" || !el.getClientRects().length) continue;
				// A link in a sentence is text; a skip link is off screen until focused.
				if (style.display === "inline" && el.closest("p, li, dd, td, figcaption, h1, h2, h3, span")) continue;
				const box = el.getBoundingClientRect();
				if (box.width <= 1 || box.right < 0 || box.bottom < 0 || style.position === "fixed") continue;
				// Layout size, so an entrance's transform never shrinks the answer.
				if (el.offsetWidth < 44 || el.offsetHeight < 44) small.push(`${(el.getAttribute("aria-label") || el.textContent).trim().slice(0, 32)} ${el.offsetWidth}x${el.offsetHeight}`);
			}
			return { small, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
		});
		expect(found.small, `${path}: targets under 44px`).toEqual([]);
		expect(found.overflow, `${path}: sideways scroll`).toBeLessThanOrEqual(0);
	}
	await context.close();
});

// ── 7. Dark is neutral ───────────────────────────────────────────────────
// STYLE.md: warm paper and ink neutrals with one cobalt accent. A ground the
// site paints in dark is never blue or green: only the accent's own fill is.
test("dark mode paints no blue or green ground", async ({ browser }) => {
	test.setTimeout(90_000);
	const context = await browser.newContext({ colorScheme: "dark", viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
	const page = await context.newPage();
	for (const path of [...PAGES, "/groundplane", "/skills"]) {
		await page.goto(path);
		const stray = await page.evaluate((own) => {
			const out = [];
			for (const el of document.querySelectorAll("body *")) {
				// UiPack's parts carry their own looks; images are the work shown.
				if (el.closest(own) || el.closest("img, picture, iframe, video")) continue;
				const style = getComputedStyle(el);
				const match = style.backgroundColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
				if (!match) continue;
				const [red, green, blue] = match.slice(1, 4).map(Number);
				const alpha = match[4] === undefined ? 1 : Number(match[4]);
				const box = el.getBoundingClientRect();
				if (alpha < 0.2 || box.width * box.height < 1600) continue;
				// The accent's own fill (a filled button) and its tints are the one colour.
				if (blue > 200 && red > 120) continue;
				// Warm neutrals run red ≥ green ≥ blue; a cool ground breaks that.
				if (blue > red + 2 || green > red + 2) out.push(`${style.backgroundColor} ${el.tagName}.${String(el.className).slice(0, 40)}`);
			}
			return [...new Set(out)];
		}, OWN);
		expect(stray, `${path}: cool grounds in dark`).toEqual([]);
	}
	await context.close();
});
