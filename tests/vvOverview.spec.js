const { test } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { deviceInfoPage } = require('../PomModels/deviceInfoPom');
const { vvOverviewComplete } = require('../Utils/VV/vvOverviewComplete');

test('V&V Overview – Onboard device then fill V&V Overview', async ({ page }) => {

    test.setTimeout(600000);

    // ── Step 1: Login and onboard a fresh device ──────────────────────────────
    await loginAndOnboardDevice(page);
    await page.waitForTimeout(5000);

    // ── Step 2: Click into the newly onboarded device ─────────────────────────
    const deviceInfo = new deviceInfoPage(page);
    await deviceInfo.clickFirstItem();
    await page.waitForTimeout(3000);

    // ── Step 3: Fill V&V Overview (5 rows) ───────────────────────────────────
    await vvOverviewComplete(page);

});
