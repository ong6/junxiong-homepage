const { expect, test } = require("@playwright/test");
const { collectErrors } = require("./helpers");
const NOTES = require("../lib/notes.snapshot.json");

// The ⌘K menu (components/SearchButton.js, components/CommandMenu.js): the
// shortcut and both header triggers open it, typing filters, the keyboard
// moves and opens, Esc and an outside click close it and hand focus back.

const trigger = (page) => page.getByRole("navigation", { name: "Site" }).getByRole("button", { name: /^Search/ });
// While the dialog is open the rest of the page is hidden from assistive tech.
const triggerNode = (page) => page.locator('nav[aria-label="Site"] button[aria-haspopup="dialog"]');
const dialog = (page) => page.getByRole("dialog", { name: "Search the site and notes" });
const option = (page, name) => dialog(page).getByRole("option", { name, exact: true });

test("the menu is not in the first load: its code arrives on first intent", async ({ page }) => {
	const errors = collectErrors(page);
	const scripts = [];
	page.on("response", async (response) => {
		if (!response.url().endsWith(".js")) return;
		scripts.push({ at: Date.now(), body: await response.text().catch(() => "") });
	});
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane", { waitUntil: "networkidle" });
	expect(scripts.some(({ body }) => body.includes("cmdk-item")), "cmdk in the first load").toBe(false);
	await trigger(page).hover();
	await expect.poll(() => scripts.some(({ body }) => body.includes("cmdk-item"))).toBe(true);
	expect(errors).toEqual([]);
});

test("⌘K opens with focus in the field; typing filters and announces the count", async ({ page }) => {
	const errors = collectErrors(page);
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane");
	await page.keyboard.press("ControlOrMeta+k");
	await expect(dialog(page)).toBeVisible();
	const input = dialog(page).getByRole("combobox");
	await expect(input).toBeFocused();
	// Empty query: every group is listed.
	const headings = dialog(page).locator("[cmdk-group-heading]");
	await expect(headings).toHaveText(["Pages", "Projects", "Trading engine updates", "Trading engine docs", "Notes", "Archive"]);
	await input.fill("skill");
	await expect(option(page, "Skillsmith")).toBeVisible();
	await expect(option(page, "Groundplane")).toHaveCount(0);
	// Tags count: "skill" finds notes tagged skills.
	await expect(headings).toContainText(["Projects", "Notes"]);
	await expect(dialog(page).locator("[aria-live]")).toHaveText(/^\d+ results?$/);
	await input.fill("zzqx");
	await expect(dialog(page).getByText("No results for “zzqx”.")).toBeVisible();
	await expect(dialog(page).locator("[aria-live]")).toHaveText("No results");
	// Locked page: the body cannot scroll behind the dialog.
	expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
	await page.keyboard.press("ControlOrMeta+k");
	await expect(dialog(page)).toHaveCount(0);
	expect(errors).toEqual([]);
});

test("arrows, Home and End move; Enter opens an internal page", async ({ page }) => {
	const errors = collectErrors(page);
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane");
	await trigger(page).click();
	await dialog(page).getByRole("combobox").fill("skill");
	const options = dialog(page).getByRole("option");
	await expect(options.first()).toHaveAttribute("aria-selected", "true");
	await page.keyboard.press("End");
	await expect(options.last()).toHaveAttribute("aria-selected", "true");
	await page.keyboard.press("Home");
	await expect(options.first()).toHaveAttribute("aria-selected", "true");
	await expect(options.first()).toHaveAccessibleName("Skillsmith");
	await page.keyboard.press("ArrowDown");
	await expect(option(page, "Agent skills")).toHaveAttribute("aria-selected", "true");
	await page.keyboard.press("Enter");
	await expect(page).toHaveURL(/\/skills$/);
	await expect(dialog(page)).toHaveCount(0);
	await expect(page.locator("main h1")).toHaveText("Agent skills");
	// The page is unlocked again.
	expect(await page.evaluate(() => document.body.hasAttribute("data-scroll-locked"))).toBe(false);
	expect(errors).toEqual([]);
});

test("a note opens its notes.junxiong.dev page in a new tab", async ({ page, context }) => {
	const errors = collectErrors(page);
	await context.route("https://notes.junxiong.dev/**", (route) => route.fulfill({ contentType: "text/html", body: "<title>note</title>" }));
	const note = NOTES[0];
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/");
	await page.keyboard.press("ControlOrMeta+k");
	await dialog(page).getByRole("combobox").fill(note.title);
	await expect(option(page, `${note.title} (opens in a new tab)`)).toHaveAttribute("aria-selected", "true");
	const [tab] = await Promise.all([context.waitForEvent("page"), page.keyboard.press("Enter")]);
	await expect.poll(() => tab.url()).toBe(note.url);
	await expect(page).toHaveURL(/\/$/);
	await expect(dialog(page)).toHaveCount(0);
	expect(errors).toEqual([]);
});

test("Esc and an outside click close it and focus goes back", async ({ page }) => {
	const errors = collectErrors(page);
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane");
	const button = trigger(page);
	const logo = page.locator('nav[aria-label="Site"] a[href="/"]').first();
	const logoBox = await logo.boundingBox();

	await button.click();
	await expect(dialog(page)).toBeVisible();
	await expect(triggerNode(page)).toHaveAttribute("aria-expanded", "true");
	// Nothing in the header moves while the page is locked.
	expect(await logo.boundingBox()).toEqual(logoBox);
	await page.keyboard.press("Escape");
	await expect(dialog(page)).toHaveCount(0);
	await expect(button).toBeFocused();
	await expect(button).toHaveAttribute("aria-expanded", "false");

	await button.click();
	await expect(dialog(page)).toBeVisible();
	await page.mouse.click(40, 860);
	await expect(dialog(page)).toHaveCount(0);
	await expect(button).toBeFocused();

	// From the shortcut, focus returns to what had it.
	const resume = page.getByRole("navigation", { name: "Site" }).getByRole("link", { name: "Resume" });
	await resume.focus();
	await page.keyboard.press("ControlOrMeta+k");
	await expect(dialog(page).getByRole("combobox")).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(resume).toBeFocused();
	expect(errors).toEqual([]);
});

test("on a phone the header button opens a full-width menu whose list scrolls inside it", async ({ browser }) => {
	const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
	const page = await context.newPage();
	const errors = collectErrors(page);
	await page.goto("/groundplane");
	const button = trigger(page);
	const box = await button.boundingBox();
	expect(box.width).toBeGreaterThanOrEqual(44);
	expect(box.height).toBeGreaterThanOrEqual(44);
	await button.tap();
	await expect(dialog(page)).toBeVisible();
	const frame = await dialog(page).boundingBox();
	expect(Math.round(frame.width)).toBe(390 - 16);
	expect(frame.y + frame.height).toBeLessThanOrEqual(844);
	const list = dialog(page).getByRole("listbox");
	expect(await list.evaluate((el) => el.scrollHeight > el.clientHeight && getComputedStyle(el).overflowY === "auto")).toBe(true);
	// A visible close control for a screen without an Esc key.
	await dialog(page).getByRole("button", { name: "Close (Esc)" }).tap();
	await expect(dialog(page)).toHaveCount(0);
	expect(errors).toEqual([]);
	await context.close();
});

test("typing home lab finds the Home lab page and opens it", async ({ page }) => {
	const errors = collectErrors(page);
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane");
	await page.keyboard.press("ControlOrMeta+k");
	await dialog(page).getByRole("combobox").fill("home lab");
	await expect(dialog(page).getByRole("option").first()).toHaveAccessibleName("Home lab");
	await page.keyboard.press("Enter");
	await expect(page).toHaveURL(/\/home-lab$/);
	await expect(page.locator("main h1")).toHaveText("Home lab");
	expect(errors).toEqual([]);
});
