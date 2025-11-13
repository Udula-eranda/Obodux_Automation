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

    //close IH Form
    const ihFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
    await ihFormBtn.click();

    //open riskAnalysisMatrixForm
    const raMatixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatixFormBtn.click();

    //Navigate to Question Group 1
    await page.getByText("Risk Analysis Matrix Table").click();

    
    //deleting the 4th and 5th rows
    await raMatrixForm.deleteRow();
    
    //--------------first row data entry-------------
    await raMatrixForm.ramtrixFirstRow(riskAnalysisMatrixFormData.firstRowAnswers);

    //deleting the 4th and 5th rows
    await raMatrixForm.deleteRow();

    //-----------second row data entry------
    await raMatrixForm.ramtrixSecondRow(riskAnalysisMatrixFormData.secondRowAnswers);

    //-----------third row data entry------
    await raMatrixForm.ramtrixThirdRow(riskAnalysisMatrixFormData.thirdRowAnswers);

    await page.waitForTimeout(7000);
    //saveNClose
    await raMatrixForm.clickSaveAndComplete();

    
}


module.exports = { riskAnalysisMatrixFormComplete } ;