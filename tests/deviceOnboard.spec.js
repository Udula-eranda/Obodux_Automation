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
    await devicePage.clickContinueBtn();
    await page.waitForTimeout(3000);

    //2nd page validation
    await devicePage.currentPageValidation();

    //checkbox selecting
    await devicePage.firstCheckBoxes();
    
    //click continue
    await devicePage.clickContinueBttn2();
    
    //section 3 validation
    devicePage.sectionThreeValidation();
    
    
    //1st section
    devicePage.firstSectionCheckBoxHandling();

    //clicking Next button
    await page.getByRole('button' , {name: "Next"}).click();

    
    //2nd section
    await devicePage.secondSectionCheckBoxHandling();
    
    //checkBox selection
    await devicePage.thirdSectionCheckBoxHandling();
    
    
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

    // //5th page validation
    // await devicePage.section5Validation();

    // //Authorizer Form Fill
    // await devicePage.authoriserForm(authoriserData.name , authoriserData.srnNo , authoriserData.phoneNo , authoriserData.street , authoriserData.state , authoriserData.city ,  authoriserData.postal);

    // //continue to 6th
    // await page.getByRole("button" , {name : "Continue"}).click();

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

    // ── Page 2: target countries checkboxes ───────────────────────────────────
    await devicePage.currentPageValidation();
    await devicePage.firstCheckBoxes();
    await devicePage.clickContinueBttn2();

    // ── Classification page: answer all 11 accordion questions (select "No") ──
    // Wait for the Classification page to fully load before interacting.
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

    // Verify the device classification is visible in the overview
    await devicePage.verifyDeviceClassification();

    // ── Finish ────────────────────────────────────────────────────────────────
    await devicePage.completingDeviceOnboard();
    await devicePage.lastPageToastMsg();
    await devicePage.devicepageLoad();
})