const { LoginPage, skipTourIfPresent } = require('../tests/login.page')
const { DevicePage } = require('../PomModels/deviceonboardPom')
const {validUser , deviceDetails , URL , manufacturerData , authoriserData} = require('./testData')


async function  loginAndOnboardDevice(page) {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);


    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email , validUser.password);
    await page.waitForTimeout(5000);
    await skipTourIfPresent(page);

    //Device onboard
    await devicePage.openDeviceMenu();

    //catching the button with name & select No as from first radio btn
    await devicePage.addDeviceWindowOpen();

    //image uploading
    await devicePage.fileUploadMenu(deviceDetails.dFilePath);

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

    // Classification page: answer all 11 accordion questions (select "No")
    await page.getByText("Tick all that's applicable for your device.").waitFor({ state: 'visible' });
    await devicePage.classificationAllQuestions();

    //click continue
    await devicePage.navigateToPage4();
    
    //wait for page to load
    await page.getByText("Manufacturer", { exact: true }).waitFor();


    //4th page procedure
    await devicePage.section4Validation();

    //Manufacturer Form Filling
    await devicePage.manufactureForm(manufacturerData.name , manufacturerData.srnNo , manufacturerData.phoneNo, manufacturerData.street , manufacturerData.state , manufacturerData.city , manufacturerData.postal);
    
    //continue to 6th (classification with all "No" goes directly to overview page)
    await page.getByRole("button" , {name : "Continue"}).click();
    await page.waitForTimeout(3000);

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
    
}

module.exports = { loginAndOnboardDevice }