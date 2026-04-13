const { test } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { uepComplete } = require('../Utils/VV/uepComplete');
const { deviceDetails } = require('../Utils/testData');

test.describe('Usability Evaluation Plan (UEP) Test Suite', () => {

    test('UEP Document Complete', async ({ page }) => {

        test.setTimeout(3000000);

        // ── Step 1: Login + Onboard new device ───────────────────────────────
        await loginAndOnboardDevice(page);
        await page.waitForTimeout(3000);

        // ── Step 2: Wait for device list and click into the new device ────────
        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse'),
            { timeout: 15000 }
        ).catch(() => {});
        await page.waitForTimeout(2000);

        await page.getByText(deviceDetails.dName).first().click();
        await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });
        await page.waitForTimeout(3000);

        // ── Step 3: Navigate to Verification and Validation ───────────────────
        await page.getByRole('link', { name: 'Verification and Validation' }).click();
        await page.waitForURL(/verification-and-validation/, { timeout: 15000 });
        await page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 20000 }
        ).catch(() => {});
        await page.waitForTimeout(3000);

        // ── Step 4: Fill UEP ──────────────────────────────────────────────────
        await uepComplete(page);

    });

});
