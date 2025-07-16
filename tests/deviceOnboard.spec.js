const {test , expect  } =  require('@playwright/test')
const {LoginPage}  = require('./login.page')
const {validUser , deviceDetails , URL , manufacturerData , authoriserData}  = require('../Utils/testData')
const { DevicePage } = require('../PomModels/deviceonboardPom')
const path = require('path');



test('Device onboarding' , async ({page}) => {
    test.setTimeout(90000);
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

    //toastMessage Handling
    await devicePage.imageUploadToastMsg();
     
    //deviceSet Up
    await devicePage.deviceSetUp(deviceDetails.dName , deviceDetails.deiveDes);

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
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();
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
    await expect(checkBoxes3.nth(0)).toBeVisible();
    await expect(checkBoxes3.nth(0)).toBeEnabled();
    await checkBoxes3.nth(0).click();
    await expect(checkBoxes3.nth(1)).toBeVisible();
    await expect(checkBoxes3.nth(1)).toBeEnabled();
    await checkBoxes3.nth(1).click();
    
    
    //clicking Next button
    await page.getByRole('button' , {name: "Next"}).click();
    
    //thirdSection
    //lastoption click
    await devicePage.lastOptionClick(); 
    
    //click continue
    await devicePage.navigateToPage4();
    
    //wait for page to load
    await page.getByText("Manufacturer", { exact: true }).waitFor();


    //4th page procedure
    await devicePage.section4Validation();

    //Manufacturer Form Filling
    await devicePage.manufactureForm(manufacturerData.name , manufacturerData.srnNo , manufacturerData.phoneNo, manufacturerData.street , manufacturerData.state , manufacturerData.city , manufacturerData.postal);
    
    //continue to 5th
    await page.getByRole("button" , {name : "Continue"}).click();

    //5th page validation
    await devicePage.section5Validation();

    //Authorizer Form Fill
    await devicePage.authoriserForm(authoriserData.name , authoriserData.srnNo , authoriserData.phoneNo , authoriserData.street , authoriserData.state , authoriserData.city ,  authoriserData.postal);

    //continue to 6th
    await page.getByRole("button" , {name : "Continue"}).click();

    //6th page validation
    await devicePage.section6Validation();

    //device Validation on OverviewPage
    await devicePage.devicceOverviewValidation(deviceDetails.dName)

    //finishing
    await devicePage.completingDeviceOnboard();

    //waitForToastMsg
    await devicePage.lastPageToastMsg();

    //device menu validate
    await devicePage.devicepageLoad();
})