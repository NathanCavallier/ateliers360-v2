import { test, expect, devices } from '@playwright/test';

const TEST_LOCALE = 'fr';

test.describe('Mobile PWA shell', () => {
  test.use({ ...devices['iPhone 14'] });

  test('renders mobile tab bar and exposes manifest', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/${TEST_LOCALE}`);

    const mobileNav = page.locator('nav[aria-label="Navigation mobile"]');
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.locator('a')).toHaveCount(5);

    const manifest = await page.request.get('/manifest.json');
    expect(manifest.ok()).toBeTruthy();
    const manifestJson = await manifest.json();
    expect(manifestJson.display).toBe('standalone');
    expect(manifestJson.icons).toHaveLength(2);

    await page.waitForFunction(() => {
      return Boolean((navigator as any).serviceWorker?.controller);
    }, null, { timeout: 10000 });
  });
});
