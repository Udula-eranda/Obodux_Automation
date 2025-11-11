const { expect } = require("@playwright/test");
const { riskManagementPartialComplete } = require("./riskManagementReportPartial");
const { cepDoc } = require("../PomModels/cepdocPom");
const { cerDoc } = require("../PomModels/cerdocPom");

async function cepDocumentComplete(page){

    await riskManagementPartialComplete(page);

    const cepDocPage = new cepDoc(page);
    const cerDocPage = new cerDoc(page);

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

    //close cepDoc Menu
    await cerDocPage.closrCEPDoc()

    await page.waitForTimeout(3000);

    //open CER Section
    await cerDocPage.openCERSection();

    await page.waitForTimeout(6000);
    
    //open CER sub menu and navigates into CER page
    await cerDocPage.openCERSubMenu();
    
    
    //Literature Search Protocol
    await cerDocPage.openLSPSubMenu();

   
    //State of Art section
    await cerDocPage.stateOfArtSection();


    //Save Draft button
    await cerDocPage.saveDraftCerDoc();

    
}

module.exports = { cepDocumentComplete }