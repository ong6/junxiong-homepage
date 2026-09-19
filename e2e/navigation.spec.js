const { expect, test } = require("@playwright/test");

const internalDestinations = [
	["Projects", "/#work"],
	["Hobbies", "/hobbies"],
];

test("desktop navigation exposes the primary destinations and current section", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/groundplane");
	const nav = page.getByRole("navigation", { name: "Site" });

	for (const [name, href] of internalDestinations) {
		await expect(nav.getByRole("link", { name })).toHaveAttribute("href", href);
	}
	await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
	await expect(nav.getByRole("link", { name: "Notes (opens in a new tab)" })).toHaveAttribute(
		"href",
		"https://notes.junxiong.dev",
	);
	await expect(nav.getByRole("link", { name: "Contact me" })).toHaveAttribute(
		"href",
		"mailto:junxiongong2@gmail.com",
	);
	for (const name of ["Archive", "Resume"]) {
		await expect(nav.getByRole("link", { name, exact: true })).toBeHidden();
	}
});

test("mobile menu is touch-sized and keyboard-dismissible", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/uipack");
	const nav = page.getByRole("navigation", { name: "Site" });
	const toggle = nav.getByRole("button", { name: "Open navigation menu" });

	await toggle.focus();
	await page.keyboard.press("Enter");
	await expect(nav.getByRole("link", { name: "Projects" })).toBeFocused();
	for (const name of ["Projects", "Hobbies", "Notes", "Archive", "Resume"]) {
		await expect(nav.getByRole("link", { name: new RegExp(`^${name}`) })).toBeVisible();
	}
	await expect(nav.getByText("Theme", { exact: true })).toBeVisible();
	await expect(nav.getByRole("button", { name: /Use (dark|light) theme/ })).toBeVisible();

	const undersized = await nav.locator("a:visible, button:visible").evaluateAll((controls) =>
		controls
			.map((control) => {
				const box = control.getBoundingClientRect();
				return { name: control.getAttribute("aria-label") || control.textContent.trim(), width: box.width, height: box.height };
			})
			.filter(({ width, height }) => width < 44 || height < 44),
	);
	expect(undersized).toEqual([]);

	await page.keyboard.press("Escape");
	await expect(nav.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
	await expect(nav.locator("#navbar-menu")).toHaveCount(0);
});

test("mobile menu closes after an outside click", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");
	const nav = page.getByRole("navigation", { name: "Site" });

	await nav.getByRole("button", { name: "Open navigation menu" }).click();
	await expect(nav.locator("#navbar-menu")).toBeVisible();
	await page.locator("main").click({ position: { x: 8, y: 120 } });
	await expect(nav.locator("#navbar-menu")).toHaveCount(0);
});

test("mobile route navigation closes the menu and preserves browser history", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");
	const nav = page.getByRole("navigation", { name: "Site" });

	await nav.getByRole("button", { name: "Open navigation menu" }).click();
	await nav.getByRole("link", { name: "Hobbies" }).click();
	await expect(page).toHaveURL(/\/hobbies$/);
	await expect(nav.locator("#navbar-menu")).toHaveCount(0);
	await expect(nav.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");

	await page.goBack();
	await expect(page).toHaveURL(/\/$/);
	await expect(nav.getByRole("link", { name: "Ong Jun Xiong — home" })).toBeVisible();
});

for (const theme of ["light", "dark"]) {
	for (const width of [390, 768, 1440]) {
		test(`navigation fits and shows keyboard focus at ${width}px in ${theme}`, async ({ page }) => {
			await page.addInitScript((mode) => localStorage.setItem("chakra-ui-color-mode", mode), theme);
			await page.setViewportSize({ width, height: 844 });
			await page.goto("/");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

			const nav = page.getByRole("navigation", { name: "Site" });
			if (width === 390) {
				await nav.getByRole("button", { name: "Open navigation menu" }).focus();
				await page.keyboard.press("Enter");
			}
			const projects = nav.getByRole("link", { name: "Projects" });
			await projects.focus();
			const focus = await projects.evaluate((link) => {
				const style = getComputedStyle(link);
				return { visible: link.matches(":focus-visible"), outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
			});
			expect(focus).toMatchObject({ visible: true, outline: "solid", width: 2 });
			if (process.env.NAV_SHOTS && width !== 768) {
				await page.screenshot({ path: `${process.env.NAV_SHOTS}/navigation-${width}-${theme}.png` });
			}
		});
	}
}
