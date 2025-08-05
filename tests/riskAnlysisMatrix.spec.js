const { test, expect } = require('@playwright/test')
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard')
const { deviceInfoPage }  = require('../PomModels/deviceInfoPom')
const { rmPage }  = require('../PomModels/riskMangmntPom')
const { riskAnalysisMatrixForm }  = require('../PomModels/riskAnalysisMatrixPom')


test("Risk Analysis Matrix Form" , async ({page}) => {


    test.setTimeout(90000);

    const deviceInfo = new deviceInfoPage(page);
    const riskMangemnt = new rmPage(page); 
    const raMatrixForm =  new riskAnalysisMatrixForm(page);   

    await loginAndOnboardDevice(page);
    await page.waitForTimeout(8000);
    await deviceInfo.clickFirstItem();
    
    await page.waitForTimeout(5000);
    //navigate to RM
    await riskMangemnt.navigatetoRM();

    
    //toggle up RM menu
    const rmCollapseBtn  =  page.getByRole('button').filter({ hasText: /^$/ }).nth(2)
    await rmCollapseBtn.click();

    // //close IH Form
    // const ihFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
    // await ihFormBtn.click();

    //open riskAnalysisMatrixForm
    const raMatixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatixFormBtn.click();

    //Navigate to Question Group 1
    await page.getByText("Risk Analysis Matrix Table").click();

    
    //deleting the 4th and 5th rows
    await raMatrixForm.deleteRow();
    
    //--------------first row data entry-------------
    await raMatrixForm.ramtrixFirstRow();

    //deleting the 4th and 5th rows
    await raMatrixForm.deleteRow();

    //-----------second row data entry------
    await raMatrixForm.ramtrixSecondRow();

    //-----------third row data entry------
    await raMatrixForm.ramtrixThirdRow();

    await page.pause();

})