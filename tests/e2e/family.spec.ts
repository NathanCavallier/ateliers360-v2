import { test, expect } from '@playwright/test';

const TEST_LOCALE = 'fr';
const TEST_EMAIL = process.env.TEST_USER_EMAIL || '';
const TEST_PASS = process.env.TEST_USER_PASSWORD || '';

if (!TEST_EMAIL || !TEST_PASS) {
  console.warn(
    'Playwright E2E: TEST_USER_EMAIL / TEST_USER_PASSWORD not set — tests assume an existing account.'
  );
}

test.describe('Family flow', () => {
  test('login, add child, edit health info', async ({ page, baseURL }) => {
    if (!TEST_EMAIL || !TEST_PASS) test.skip();

    await page.goto(`${baseURL}/${TEST_LOCALE}/login`);

    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASS);
    await page.click('button:has-text("Connexion")');

    await page.waitForURL(`**/${TEST_LOCALE}/dashboard**`, { timeout: 10000 });

    // Go to family dashboard
    await page.goto(`${baseURL}/${TEST_LOCALE}/famille`);

    // Click add child
    await page.click('a:has-text("Ajouter un enfant")');
    await page.waitForURL(`**/${TEST_LOCALE}/famille/enfants/nouveau`);

    const random = Date.now().toString().slice(-4);
    const firstName = `Test${random}`;

    await page.fill('input#first_name', firstName);
    await page.fill('input#last_name', 'E2E');
    await page.fill('input#birthdate', '2015-03-12');

    await page.fill('input#emergency_contact_name', 'Parent Test');
    await page.fill('input#emergency_contact_phone', '0123456789');
    await page.fill('input#doctor_name', 'Dr. Test');
    await page.fill('input#other_allergies', 'gluten');
    await page.fill('input#meds_authorized', 'None');
    await page.fill('textarea#notes', 'Notes E2E');
    await page.check('input#pai_required');

    await page.click('button:has-text("Ajouter l’enfant")');

    // Back to family dashboard
    await page.waitForURL(`**/${TEST_LOCALE}/famille`);

    // Verify child card present
    await expect(page.locator(`text=${firstName}`)).toBeVisible();

    // Navigate to edit page
    const childLink = page.locator(`a:has-text("Autorisations")`).first();
    // click sibling Edit link instead
    const editLink = page.locator('a:has-text("Éditer")').first();
    await editLink.click();
    await page.waitForURL(`**/${TEST_LOCALE}/famille/enfants/*/edit`);

    // Edit health: uncheck PAI
    const paiCheckbox = page.locator('input#pai_required');
    await paiCheckbox.uncheck();

    await page.click('button:has-text("Sauvegarder identité")');

    // Should redirect back to family
    await page.waitForURL(`**/${TEST_LOCALE}/famille`);

    // Ensure changes reflected on card
    await expect(page.locator('text=PAI non requis').first()).toBeVisible();
  });
});
