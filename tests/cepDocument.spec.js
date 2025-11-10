const { test , expect } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { deviceInfoPage } =  require('../PomModels/deviceInfoPom')
const {cepDoc} = require('../PomModels/cepdocPom')

test('CEP Document Test' , async ({page}) => {
    
    test.setTimeout(180000)

    const deviceInfo = new deviceInfoPage(page);
    const cePlanDoc  = new cepDoc(page);
    
    await loginAndOnboardDevice(page);
    await page.waitForTimeout(8000);
    await deviceInfo.clickFirstItem();

    await page.waitForTimeout(5000);

    //navigate to CEP Document Page
    await cePlanDoc.navigateToCEP();

    //========Clinical Claims field=========================================
    
    await cePlanDoc.clinicalClaimsField();


    //===============================Anticipated Benefits==========================
    
    await cePlanDoc.anticipatedBenefitsField();

    //selecting the logic method
    const logicBtn = page.getByRole('radio' , {name: /Each individual/i});
    await expect(logicBtn).toBeVisible();
    await expect(logicBtn).toBeEnabled();
    await logicBtn.click();

    await page.waitForTimeout(2000);

    //Clinical Data section
    const clinicalDataSection = page.getByRole('radio' , {name: 'No'});
    await expect(clinicalDataSection).toBeVisible();
    await expect(clinicalDataSection).toBeEnabled();
    await clinicalDataSection.click();

    await page.waitForTimeout(3000);
    //SavenComplete
    await cePlanDoc.saveNcomplete();
    
});


