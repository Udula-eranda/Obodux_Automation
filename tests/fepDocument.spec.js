const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { URL, validUser } = require('../Utils/testData');
const { fepComplete } = require('../Utils/VV/fepComplete');

test.describe('Formative Evaluation Plan (FEP) Test Suite', () => {

    test('FEP Document Complete', async ({ page }) => {

        test.setTimeout(3000000);

        // ── Login ─────────────────────────────────────────────────────────────
        const loginPage = new LoginPage(page);
        await loginPage.goto(URL.siteLink);
        await loginPage.login(validUser.email, validUser.password);
        await page.waitForTimeout(5000);

        // ── Navigate to Devices menu ──────────────────────────────────────────
        const deviceMenu = page.locator('ul li').nth(0);
        await deviceMenu.waitFor({ state: 'visible' });
        await deviceMenu.click();
        await page.waitForTimeout(3000);

        // Wait for skeleton loaders to disappear
        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse'),
            { timeout: 15000 }
        ).catch(() => {});
        await page.waitForTimeout(2000);

        // ── Click the "Surgical Mask All Doc Complete" device card ────────────
        await page.getByText('Surgical Mask All Doc Complete').first().click();
        await page.waitForTimeout(3000);

        // ── Navigate to Verification and Validation ───────────────────────────
        await page.getByRole('link', { name: 'Verification and Validation' }).click();
        await page.waitForTimeout(3000);

        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 20000 }
        ).catch(() => {});
        await page.waitForTimeout(2000);

        // ── Fill FEP form ─────────────────────────────────────────────────────
        await fepComplete(page);

    });

});
