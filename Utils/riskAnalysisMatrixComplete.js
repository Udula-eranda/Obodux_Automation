const { initialHazardComplete }  = require('../Utils/initialHazardComplete')
// const { loginAndOnboardDevice } = require('../Utils/deviceOnboard')
const { riskAnalysisMatrixForm }  = require('../PomModels/riskAnalysisMatrixPom')
const { deviceInfoPage }  = require('../PomModels/deviceInfoPom')
const { rmPage }  = require('../PomModels/riskMangmntPom')
const { riskAnalysisMatrixFormData } = require('../Utils/testData')

async function riskAnalysisMatrixFormComplete(page) {

    // const deviceInfo = new deviceInfoPage(page);
    // const riskMangemnt = new rmPage(page); 
    const raMatrixForm =  new riskAnalysisMatrixForm(page);   

    // await loginAndOnboardDevice(page);
    // await page.waitForTimeout(8000);
    // await deviceInfo.clickFirstItem();
    
    // await page.waitForTimeout(5000);
    // //navigate to RM
    // await riskMangemnt.navigatetoRM();

    
    // //toggle up RM menu
    // const rmCollapseBtn  =  page.getByRole('button').filter({ hasText: /^$/ }).nth(2)
    // await rmCollapseBtn.click();


    await initialHazardComplete(page);
    await page.waitForTimeout(15000);

    // close IH Form
    const ihFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
    await ihFormBtn.click();

    // open Risk Analysis Matrix form
    const raMatixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatixFormBtn.click();

    // navigate to RAM table section
    await page.getByText('Risk Analysis Matrix Table').click();
    await page.waitForTimeout(2000);

    // fill each row via popup
    for (let i = 0; i < riskAnalysisMatrixFormData.rows.length; i++) {
        await raMatrixForm.fillRowViaPopup(i, riskAnalysisMatrixFormData.rows[i]);
        await page.waitForTimeout(500);
    }

    await page.waitForTimeout(3000);
    // save and mark complete
    await raMatrixForm.clickSaveAndComplete();

    
}


module.exports = { riskAnalysisMatrixFormComplete } ;