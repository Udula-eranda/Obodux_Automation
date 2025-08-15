const { test , expect }  = require('@playwright/test')
const { initialHazardComplete }  =  require('../Utils/initialHazardComplete')
const { riskAnalysisMatrixForm }  = require('../PomModels/riskAnalysisMatrixPom')
const { riskAnalysisMatrixFormData }  = require('../Utils/testData')

test('raMatrixCompleteState' ,async ({page})=> {

    test.setTimeout(200000);

    await initialHazardComplete(page);

    const raMatrixForm =  new riskAnalysisMatrixForm(page);

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

    //saveNClose
    await raMatrixForm.clickSaveAndComplete();


})