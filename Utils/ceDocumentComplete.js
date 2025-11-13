const { expect } = require("@playwright/test");
const { riskManagementPartialComplete } = require("./riskManagementReportPartial");
const { cepDoc } = require("../PomModels/cepdocPom");
const { cerDoc } = require("../PomModels/cerdocPom");

async function cepDocumentComplete(page){

    await riskManagementPartialComplete(page);

    const cepDocPage = new cepDoc(page);
    const ceReportDoc = new cerDoc(page);

    await page.waitForTimeout(8000);

    //navigate to CEP Document Page
    await cepDocPage.navigateToCEP();

    //========Clinical Claims field=========================================
    
    await cepDocPage.clinicalClaimsField();

    //===============================Anticipated Benefits==========================
    
    await cepDocPage.anticipatedBenefitsField();

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
    await cepDocPage.saveNcomplete();
    
    //=================CER Document Section ==================

    await page.waitForTimeout(6000);
    //close cepDoc Menu
    await ceReportDoc.closeCEPDoc();

    await page.waitForTimeout(3000);

    //open CER Section
    await ceReportDoc.openCERSection();

    await page.waitForTimeout(3000);
    
    //open CER sub menu and navigates into CER page
    await ceReportDoc.openCERSubMenu();
    
    
    //Literature Search Protocol
    await ceReportDoc.openLSPSubMenu();

   
    //State of Art section
    await ceReportDoc.stateOfArtSection();


    //Save Draft button
    await ceReportDoc.saveDraftBtn();

    
}

module.exports = { cepDocumentComplete }