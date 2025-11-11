const { riskMangmentReport }  = require('../PomModels/riskManagemntReport')
const { riskAnalysisMatrixFormComplete } = require('../Utils/riskAnalysisMatrixComplete')
const { expect }  = require('@playwright/test')

async function riskManagementPartialComplete(page) {


    await riskAnalysisMatrixFormComplete(page);

    const riskMangForm = new riskMangmentReport(page);
    
    //toggle up RiskAnlaysisMatrixForm
    const raMatixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatixFormBtn.click();
    
    //Open riskMangmntReport dropdown
    const riskMangmntForm = page.getByRole('button').filter({ hasText: /^$/ }).nth(5);
    await riskMangmntForm.click();
    
    //navigate to rmReport
    await page.getByText('List of high residual risks').click();
    
    
    //checkBox select
    const checkBox = page.getByRole('checkbox');
    await expect(checkBox).toBeVisible(); 
    await expect(checkBox).toBeEnabled();
    await checkBox.click();
    
    //Clinical benefits field
    const clinicalBenefits = page.locator("div[class*='border px-3']").nth(0);
    await clinicalBenefits.click();
    //Ai feature catching
    const aiBtn1 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn1.click();
    await page.waitForTimeout(8000);
    //wait to AI to generate
    await clinicalBenefits.waitFor({ state: 'visible' });
    await expect(clinicalBenefits).not.toHaveText("");
    await aiBtn1.click();
    
    
    //Overall Residual Risk field
    const overallRisk = page.locator("div[class*='border px-3']").nth(1);
    await overallRisk.click();
    //Ai feature catching
    const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn.click();
    await page.waitForTimeout(8000);
    //wait to AI to generate
    await overallRisk.waitFor({ state: 'visible' });
    await expect(overallRisk).not.toHaveText("");
    await aiBtn.click();
    
    //select YES radio
    await page.getByRole('radio' , {name: "No"}).check();
    
    //Risk Analysis Report saved successfully
    
    //Save and Complete
    await riskMangForm.clickSaveNComplete();

    
}


module.exports = { riskManagementPartialComplete }