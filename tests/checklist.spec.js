const { test } = require('@playwright/test')
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard')
const { deviceInfoPage } = require('../PomModels/deviceInfoPom')
const { checklistComplete } = require('../Utils/checklistComplete')


test('Checklist – Onboard device then fill Checklist', async ({ page }) => {

    test.setTimeout(900000);

    // ── Step 1: Login and onboard a fresh device ──────────────────────────────
    await loginAndOnboardDevice(page);

    // ── Step 2: Click the newly onboarded device (first in the list) ─────────
    const deviceInfo = new deviceInfoPage(page);
    await deviceInfo.clickFirstItem();

    // ── Step 3: Fill the Checklist section ───────────────────────────────────
    await checklistComplete(page);

})
