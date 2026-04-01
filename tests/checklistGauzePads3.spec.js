const { test } = require('@playwright/test')
const { LoginPage } = require('./login.page')
const { DevicePage } = require('../PomModels/deviceonboardPom')
const { ChecklistPage } = require('../PomModels/checklistPom')
const { checklistComplete } = require('../Utils/checklistComplete')
const { validUser, URL } = require('../Utils/testData')

test('Checklist – Complete checklist for Gauze Pads 3', async ({ page }) => {

    test.setTimeout(900000);

    // ── Step 1: Login ─────────────────────────────────────────────────────────
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);

    // Wait for auth redirect to fully settle on the app before interacting
    await page.waitForURL(`${URL.siteLink}/**`, { timeout: 30000 });
    await page.waitForTimeout(3000);

    // ── Step 2: Click the Devices menu item to reach the devices list ─────────
    const devicePage = new DevicePage(page);
    await devicePage.openDeviceMenu();
    await page.waitForURL('**/devices', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // ── Step 3: Select the existing device "Gauze Pads 3" ────────────────────
    const checklist = new ChecklistPage(page);
    await checklist.selectDeviceByName('Gauze Pads 3');

    // ── Step 4: Fill the Checklist section ───────────────────────────────────
    await checklistComplete(page);

})
