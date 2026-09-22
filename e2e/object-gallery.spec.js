import { test, expect } from '@playwright/test';
for (const theme of ['light', 'dark']) for (const width of [390, 1440]) {
  test(`object gallery layout ${theme} ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/uipack?category=web&object=travel&look=1#objects');
    if (theme === 'dark') {
      if (width < 700) await page.getByRole('button', { name: 'Open navigation menu' }).click();
      await page.getByRole('button', { name: 'Use dark theme' }).click();
      if (width < 700) await page.keyboard.press('Escape');
    }
    const gallery = page.getByRole('region', { name: '3D object collection' });
    await gallery.scrollIntoViewIfNeeded();
    await expect(gallery.locator('canvas')).toHaveAttribute('data-renderer', 'webgl');
    await expect(gallery.locator('canvas')).toHaveCSS('opacity', '1');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await gallery.screenshot({ path: info.outputPath('website-gallery.png') });
    await gallery.getByRole('button', { name: 'Studio objects', exact: true }).click();
    await gallery.getByRole('combobox', { name: /Studio edition/ }).selectOption('2');
    await page.reload();
    await expect(gallery.locator('.uipack-object')).toHaveAttribute('data-edition', '2');
    await expect(gallery.locator('canvas')).toHaveAttribute('data-renderer', 'webgl');
  });
}
test('all original editions remain usable after switching', async ({ page }) => {
  // This checks 21 renderer replacements; each readiness assertion keeps its own short timeout.
  test.setTimeout(120000);
  await page.goto('/uipack?category=web&object=ai&look=0');
  const gallery = page.getByRole('region', { name: '3D object collection' });
  for (const title of ['Agent session','Tennis practice','Trading journal','Inference study','Local map','Open book','Contact inbox']) {
    await gallery.getByRole('button', { name: title, exact: true }).click();
    for (const value of ['0', '1', '2']) {
      await gallery.getByRole('combobox', { name: /edition/ }).selectOption(value);
      await expect(gallery.locator('canvas')).toHaveAttribute('data-renderer', 'webgl');
      await expect(gallery.locator('canvas')).toHaveCSS('opacity', '1');
      await expect(gallery.locator('canvas')).toHaveCount(1);
    }
  }
});

for (const [name,id,variant] of [['Cartoon worlds','cartoon',3],['Realistic close-ups','realistic',4],['Abstract forms','abstract',5]]) {
  test(`new direction ${id} persists in the gallery`, async ({page}) => {
    await page.setViewportSize({width:390,height:1000});
    await page.goto(`/uipack?category=web&object=travel&look=${variant}#objects`);
    const gallery=page.getByRole('region',{name:'3D object collection'});
    await expect(gallery.locator('.uipack-object')).toHaveAttribute('data-art-direction',id);
    await expect(gallery.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
    await gallery.getByRole('button',{name:'Contact inbox',exact:true}).click();
    await expect(gallery.locator('canvas')).toHaveAttribute('data-renderer','webgl');
    if (variant === 3) await expect(gallery.locator('.uipack-object')).toHaveAttribute('data-art-direction','cartoon');
    else await expect(gallery.getByRole('combobox',{name:/Inbox edition/})).toBeVisible();
    await page.reload();
    await expect(gallery.locator('.uipack-object')).toHaveAttribute('data-art-direction',variant === 3 ? 'cartoon' : 'studio');
    await expect(gallery.locator('.uipack-object')).toHaveAttribute('data-surface','styled');

  });
}
