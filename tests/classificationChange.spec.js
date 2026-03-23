const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, deviceDetails, URL, manufacturerData } = require('../Utils/testData');
const { DevicePage } = require('../PomModels/deviceonboardPom');

/**
 * Classification Change test
 *
 * Mirrors the standard onboarding flow but selects the FIRST radio option
 * in classification section 2 (instead of the second), producing a different
 * device classification outcome.  Run standalone first; merge into
 * deviceOnboard.spec.js once confirmed passing.
 */
test('Device onboarding - classification change', async ({ page }) => {
    test.setTimeout(120000);

    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);

    // ── Login ─────────────────────────────────────────────────────────────────
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);

    // ── Page 1: open menu, add device, upload image, fill details ─────────────
    await devicePage.openDeviceMenu();
    await devicePage.addDeviceWindowOpen();
    await devicePage.fileUploadMenu(deviceDetails.dFilePath);
    await devicePage.imageUploadToastMsg();
    await devicePage.deviceSetUp(deviceDetails.dName, deviceDetails.deiveDes);
    await devicePage.clickContinueBtn();
    await page.waitForTimeout(3000);

    // ── Page 2: first classification checkboxes ───────────────────────────────
    await devicePage.currentPageValidation();
    await devicePage.firstCheckBoxes();
    await devicePage.clickContinueBttn2();

    // ── Classification page: answer all 11 accordion questions ───────────────
    // Wait for the Classification page (Step 3) to fully load before interacting.
    // "Tick all that's applicable" is unique to this page and confirms it's loaded.
    await page.getByText("Tick all that's applicable for your device.").waitFor({ state: 'visible' });
    await devicePage.classificationAllQuestions();
    await devicePage.navigateToPage4();

    // ── Page 4: manufacturer form ─────────────────────────────────────────────
    await page.getByText('Manufacturer', { exact: true }).waitFor();
    await devicePage.section4Validation();
    await devicePage.manufactureForm(
        manufacturerData.name,
        manufacturerData.srnNo,
        manufacturerData.phoneNo,
        manufacturerData.street,
        manufacturerData.state,
        manufacturerData.city,
        manufacturerData.postal
    );
    await page.getByRole('button', { name: 'Continue' }).click();

    // ── Page 6: overview ──────────────────────────────────────────────────────
    await devicePage.section6Validation();
    await devicePage.devicceOverviewValidation(deviceDetails.dName);

    // Verify a classification label is visible after the changed path
    await devicePage.verifyDeviceClassification();

    // ── Finish ────────────────────────────────────────────────────────────────
    await devicePage.completingDeviceOnboard();
    await devicePage.lastPageToastMsg();
    await devicePage.devicepageLoad();
});
