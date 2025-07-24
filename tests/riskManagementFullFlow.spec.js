const { test  , expect }  = require('@playwright/test')
const { deviceInformationComplete }  = require('../Utils/deviceInformationComplete')
const { loginAndOnboardDevice }  = require('../Utils/deviceOnboard')


test('Risk Management Test Full Flow' , async ({page}) => {
    test.setTimeout(90000);

    await loginAndOnboardDevice(page);
    await deviceInformationComplete(page);

  
    const riskManageBtn = await page.getByRole("link", { name: "Risk Management" });
    await expect(riskManageBtn).toBeVisible({ timeout: 10000 });
    await expect(riskManageBtn).toBeEnabled();

    await riskManageBtn.click();
    await page.pause();
    

})