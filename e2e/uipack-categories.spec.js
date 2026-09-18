const { test, expect } = require("@playwright/test");
const { collectErrors } = require("./helpers");

for (const width of [390, 1440]) {
	for (const theme of ["light", "dark"]) {
		test(`UI Pack categories work by keyboard at ${width} in ${theme}`, async ({ page }) => {
			const errors = collectErrors(page);
			await page.setViewportSize({ width, height: 900 });
			await page.addInitScript((t) => localStorage.setItem("chakra-ui-color-mode", t), theme);
			await page.goto("/uipack");
			await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
			const web = page.getByRole("tab", { name: "Web design" });
			const slides = page.getByRole("tab", { name: "Slide creation" });
			await expect(web).toHaveAttribute("aria-selected", "true");
			await expect(page.locator("figure.uipack")).toHaveCount(6);
			await web.focus();
			await page.keyboard.press("ArrowRight");
			await expect(slides).toBeFocused();
			await expect(slides).toHaveAttribute("aria-selected", "true");
			await expect(page).toHaveURL(/category=slides/);
			await expect(page.locator("figure.uipack")).toHaveCount(0);
			await expect(page.getByRole("link", { name: "Download opening SVG" })).toHaveAttribute(
				"href",
				`/uipack-slides/opening-${theme}.svg`,
			);
			for (const name of ["Opening", "Explanation", "System"]) {
				const button = page.getByRole("button", { name, exact: true });
				await button.click();
				await expect(button).toHaveAttribute("aria-pressed", "true");
				await expect(
					page.getByRole("img", { name: `UI Pack ${name.toLowerCase()} slide starter` }),
				).toBeVisible();
			}
			const controls = await page
				.getByRole("tabpanel")
				.locator("button, a")
				.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
			expect(controls.every((height) => height >= 44)).toBe(true);
			expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
				false,
			);
			await slides.focus();
			await page.keyboard.press("ArrowLeft");
			await expect(web).toHaveAttribute("aria-selected", "true");
			await expect(page.locator("figure.uipack")).toHaveCount(6);
			expect(errors).toEqual([]);
		});
	}
}

test("UI Pack links restore the category through reload and browser history", async ({ page }) => {
	await page.goto("/uipack?category=slides");
	await expect(page.getByRole("tab", { name: "Slide creation" })).toHaveAttribute(
		"aria-selected",
		"true",
	);
	await page.getByRole("tab", { name: "Web design" }).click();
	await expect(page).toHaveURL(/category=web/);
	await page.goBack();
	await expect(page.getByRole("tab", { name: "Slide creation" })).toHaveAttribute(
		"aria-selected",
		"true",
	);
	await page.reload();
	await expect(page.getByRole("tab", { name: "Slide creation" })).toHaveAttribute(
		"aria-selected",
		"true",
	);
});

test("slide starters download as SVG in both themes", async ({ page, request }) => {
	for (const theme of ["light", "dark"]) {
		for (const id of ["opening", "explanation", "system"]) {
			const response = await request.get(`/uipack-slides/${id}-${theme}.svg`);
			expect(response.status()).toBe(200);
			expect(response.headers()["content-type"]).toContain("image/svg+xml");
			expect(await response.text()).toContain('viewBox="0 0 1200 675"');
		}
	}
	await page.goto("/uipack?category=slides");
	const downloadEvent = page.waitForEvent("download");
	await page.getByRole("link", { name: "Download opening SVG" }).click();
	const download = await downloadEvent;
	expect(download.suggestedFilename()).toMatch(/^opening-(light|dark)\.svg$/);
	expect(await download.failure()).toBeNull();
});

test("hobbies leads with coding and playing with AI", async ({ page }) => {
	await page.goto("/hobbies");
	const copy = await page.locator("main").innerText();
	expect(copy.indexOf("Coding & playing with AI")).toBeLessThan(copy.indexOf("Tennis"));
	expect(copy).toContain("This is my main hobby.");
});
