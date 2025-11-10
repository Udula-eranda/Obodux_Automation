const { test , expect } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { deviceInfoPage } =  require('../PomModels/deviceInfoPom');
const {cepDoc} = require('../PomModels/cepdocPom')

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
    
    // await loginAndOnboardDevice(page);

    await page.waitForTimeout(6000);
    await deviceInfo.clickFirstItem();

    await page.waitForTimeout(5000);
    
    //navigate to CEP Document Page
    await cePlanDoc.navigateToCEP();

    
    await page.waitForTimeout(6000);
    
    //close cepDoc Menu
    const cepCollapseBtn = page.locator("[id='radix-\\:r3e\\:']");
    await cepCollapseBtn.click();

    await page.waitForTimeout(3000);
    //open CER Section
    const cerCollapseBtn = page.locator('[id="radix-:r3k:"]');
    await cerCollapseBtn.click();

    await page.waitForTimeout(6000);
    
    //open CER sub menu and navigates into CER page
    const soaBtn = page.locator('[id="radix-:r44:"]');
    await soaBtn.click();
    
    
    //Literature Search Protocol
    const lspBtn = page.getByText('Literature Search Protocol');
    await lspBtn.click();
    await page.waitForTimeout(3000);

    const lspField = page.locator("[class*='border px-3']").nth(0);
    await expect(lspField).toBeVisible();
    await expect(lspField).toBeEnabled();
    await lspField.click();

    //Ai feature catching
    const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
    await expect(aiBtn).toBeEnabled();
    await aiBtn.click();
        
    //wait to AI to generate
    await lspField.waitFor({ state: 'visible' });
    await expect(lspField).not.toHaveText("");
    await aiBtn.click();

    await page.pause();
    
});