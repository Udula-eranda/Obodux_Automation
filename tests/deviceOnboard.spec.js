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
    devicePage.clickContinueBtn();

    //2nd page validation
    devicePage.currentPageValidation();

    //checkbox selecting
    await devicePage.firstCheckBoxes();
    
    //click continue
    await devicePage.clickContinueBttn2();
    
    //section 3 validation
    devicePage.sectionThreeValidation();
    
    
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
    
    //checkBox selection
    const checkBoxes3 = page.locator("div[class*='pt-0.5']");
    await checkBoxes3.nth(0).click();
    await checkBoxes3.nth(1).click();
    
    
    //clicking Next button
    await page.getByRole('button' , {name: "Next"}).click();
    
    //thirdSection
    // const thirdSection = page.locator(".text-sm.px-6.border-t.py-4 > .space-y-3");
    // await thirdSection.waitFor({ state: 'visible' });
    
    // await thirdSection.nth(0).click();
    // await thirdSection.nth(1).click();
    //lastoption click
    await devicePage.lastOptionClick();

    // OR, wait until it's not visible (if detachment doesn't occur)
    await expect(page.locator("li[role='status']")).toHaveCount(0); 
    //click continue
    const continueButton3 = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton3).toBeEnabled();
    await continueButton3.click();
    
    
})
