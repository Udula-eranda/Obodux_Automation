const { test } = require('@playwright/test');
const { sepComplete } = require('../Utils/VV/sepComplete');
const { LoginPage } = require('./login.page');
const { URL, validUser } = require('../Utils/testData');

test.describe('Summative Evaluation Plan (SEP) Test Suite', () => {

    test('SEP Document Complete', async ({ page }) => {

        test.setTimeout(3000000);

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.goto(URL.siteLink);
        await loginPage.login(validUser.email, validUser.password);
        await page.waitForTimeout(4000);

        // Navigate to the correct device and complete SEP
        await page.goto('https://web.staging.obodux.boris-software.com/editor/device-documentation/eed3d170-8bdc-4667-a724-9a9f5cd007f5/verification-and-validation/summative-evaluation-plan');
        await page.waitForTimeout(3000);

        await sepComplete(page);

    });

});
