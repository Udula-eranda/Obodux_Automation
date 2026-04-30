const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');
const { verificationsComplete } = require('../Utils/VV/verificationsComplete');

// Pre-existing device used for this test – do NOT onboard a fresh device
const DEVICE_ID = '8daf712d-f07b-4fd2-aa14-bf3bf44b158c';

test('Verifications – Fill all 13 sections on Mammography Machine All Document Complete Demo', async ({ page }) => {

    test.setTimeout(1800000);

    // ── Step 1: Login ─────────────────────────────────────────────────────────
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);
    await skipTourIfPresent(page);

    // ── Step 2: Navigate directly to the Verifications page ──────────────────
    const verificationsUrl =
        `${URL.siteLink}editor/device-documentation/${DEVICE_ID}/verification-and-validation/verifications`;
    await page.goto(verificationsUrl);
    await page.waitForTimeout(4000);

    // Confirm the page loaded by waiting for a known section heading
    await page.getByText('Biological Evaluation', { exact: false })
        .waitFor({ state: 'visible', timeout: 15000 });

    // ── Step 3: Fill all 13 sections ─────────────────────────────────────────
    await verificationsComplete(page);

});
