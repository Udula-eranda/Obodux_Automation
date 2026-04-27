const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { deviceInfoPage } = require('../PomModels/deviceInfoPom');
const { pmcfFollowUpComplete } = require('../Utils/PMS/pmcfFollowUpComplete');
const { validUser, URL } = require('../Utils/testData');

test.describe('PMCF Follow-up Only', () => {

    test('Fill PMCF Follow-up on most recent device', async ({ page }) => {
        test.setTimeout(600000);

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.goto(URL.siteLink);
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await loginPage.login(validUser.email, validUser.password);
        await page.waitForTimeout(5000);
        await skipTourIfPresent(page);

        // Navigate into the most recently onboarded device
        const deviceInfo = new deviceInfoPage(page);
        await deviceInfo.clickFirstItem();
        await page.waitForTimeout(3000);
        await skipTourIfPresent(page);

        // Run the full PMCF Follow-up flow
        await pmcfFollowUpComplete(page);
    });

});
