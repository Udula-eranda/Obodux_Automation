const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');
const { labelsComplete } = require('../Utils/Labels/labelsComplete');

test.describe('Labelling — Labels Test Suite', () => {

    test('Labels Document Complete', async ({ page }) => {

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
        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse'),
            { timeout: 15000 }
        ).catch(() => {});
        await page.waitForTimeout(2000);

        // ── Click the "Surgical Mask All Doc Complete 2" device ───────────────
        await page.getByText('Surgical Mask All Doc Complete 2').first().click();
        await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });
        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 30000 }
        ).catch(() => {});
        await page.waitForTimeout(3000);

        // ── Fill Labels form ──────────────────────────────────────────────────
        await labelsComplete(page);

    });

});
