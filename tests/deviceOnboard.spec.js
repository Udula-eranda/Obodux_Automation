const {test , expect  } =  require('@playwright/test')
const {LoginPage}  = require('./login.page')
const {validUser , deviceDetails , URL}  = require('../Utils/testData')
const { DevicePage } = require('../PomModels/deviceonboardPom')
const path = require('path');



test('Device onboarding' , async ({page}) => {

    const loginPage = new LoginPage(page);
    loginPage.goto(URL.siteLink);
    loginPage.login(validUser.email , validUser.password);
    const devicePage = new DevicePage(page)

    //Device onboard
    devicePage.openDeviceMenu();

    //catching the button with name & select No as from first radio btn
    devicePage.addDeviceWindowOpen();

    //image uploading
    devicePage.fileUploadMenu(deviceDetails.dFilePath);


    const itemDelete = await page.locator("//button[@class='inline-flex items-center justify-center whitespace-nowrap font-sans text-sm rounded-md bg-transparent px-0 py-0 text-foreground border-0 shadow-none w-9 h-9']").isVisible();
    console.log("Is icon visible" , itemDelete);

    //deviceSet Up
    devicePage.deviceSetUp(deviceDetails.dName , deviceDetails.deiveDes);

    // //handling upload process completion
    // const toast = await page.locator("li[role='status']");
    // await expect(toast).toBeVisible();
    // await expect(toast).toHaveText(/File uploaded successfully!/i);

    //click continue
    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeEnabled();
    await continueButton.click();

    //2nd page validation
    // This will match the current (active) step based on unique background color
    const currentStep = page.locator("div.bg-primary.text-white");

    // Assert it's visible and contains "2"
    await expect(currentStep).toBeVisible();
    await expect(currentStep).toHaveText("2");

    //checkbox selecting
    const checkboxes =await page.locator("[role='checkbox']");
    checkboxes.nth(0).click();
    checkboxes.nth(1).click();

    //click continue
    const continueButton2 = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton2).toBeEnabled();
    await continueButton2.click();

    //page 3 validation
    // This will match the current (active) step based on unique background color
    const currentStep3 = page.locator("div.bg-primary.text-white");

    // Assert it's visible and contains "3"
    await expect(currentStep3).toBeVisible();
    await expect(currentStep3).toHaveText("3");

    //1st section
    const firstSection =await page.locator("div[class*='py-4']").nth(0);
    const checkbox = await firstSection.nth(0);
    await checkbox.click();

    //clicking Next button
    await page.getByRole('button' , {name: "Next"}).click();

    
    //2nd section
    const secondSection =await page.locator("div[class*='py-4']").nth(1);
    await secondSection.waitFor();
    const checkbox2 = secondSection.locator('[role="radio"]').nth(1);
    await checkbox2.click();
    await expect(checkbox2).toHaveAttribute('aria-checked', 'false');
    
    await page.pause();

    
})
