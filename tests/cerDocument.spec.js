const { test , expect } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { deviceInfoPage } =  require('../PomModels/deviceInfoPom');
const {cepDoc} = require('../PomModels/cepdocPom')
const { cerDoc } = require('../PomModels/cerdocPom');
const {LoginPage}  = require('./login.page')
const {validUser ,  URL , manufacturerData , authoriserData}  = require('../Utils/testData')
const { DevicePage } = require('../PomModels/deviceonboardPom')

test ('CE Report Document' , async ({page}) => {

    test.setTimeout(200000);
    ///////////////////////////////////////////////

    const loginPage = new LoginPage(page);
    loginPage.goto(URL.siteLink);
    loginPage.login(validUser.email , validUser.password);
    const devicePage = new DevicePage(page)

    await page.waitForTimeout(3000);
    //Device onboard
    devicePage.openDeviceMenu();



    ///////////////////////////////////////////////

    const deviceInfo = new deviceInfoPage(page);
    const cePlanDoc  = new cepDoc(page);
    const ceReportDoc = new cerDoc(page);
    
    // await loginAndOnboardDevice(page);

    await page.waitForTimeout(6000);
    await deviceInfo.clickFirstItem();

    await page.waitForTimeout(5000);
    
    //navigate to CEP Document Page
    await cePlanDoc.navigateToCEP();

    
    await page.waitForTimeout(6000);
    
    //close cepDoc Menu
    await ceReportDoc.closrCEPDoc()

    await page.waitForTimeout(3000);

    //open CER Section
    await ceReportDoc.openCERSection();

    await page.waitForTimeout(6000);
    
    //open CER sub menu and navigates into CER page
    await ceReportDoc.openCERSubMenu();
    
    
    //Literature Search Protocol
    await ceReportDoc.openLSPSubMenu();

   
    //State of Art section
    await ceReportDoc.stateOfArtSection();


    //Save Draft button
    await ceReportDoc.saveDraftCerDoc();

    await page.pause();
    
});