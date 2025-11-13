const { expect , test } = require("@playwright/test");
const { cerData } = require('../Utils/testData');

class cerDoc{

    constructor(page){
        this.page = page;
    }

    //close cepDoc Menu
    async closeCEPDoc(){

        await this.page.waitForTimeout(3000);
        const cepCollapseBtn = this.page.locator("[id*='radix-']").nth(3);
        await expect(cepCollapseBtn).toBeVisible();
        await expect(cepCollapseBtn).toBeEnabled();
        await cepCollapseBtn.click();

    }
    
    //open CER Section
    async openCERSection(){

        await this.page.waitForTimeout(3000);
        //const cerCollapseBtn = this.page.locator('[id="radix-:r3k:"]');
        const cerCollapseBtn = this.page.locator("[id*='radix-']").nth(5);
        await expect(cerCollapseBtn).toBeVisible();
        await expect(cerCollapseBtn).toBeEnabled();
        await cerCollapseBtn.click();

    }

    //open CER sub menu and navigates into CER page
    async openCERSubMenu(){

        await this.page.waitForTimeout(3000);
        const soaBtn = this.page.locator("[id*='radix-']").nth(7)
        await expect(soaBtn).toBeVisible();
        await expect(soaBtn).toBeEnabled();
        await soaBtn.click();

    }

    //open the sub menu Literature Search Protocol
    async openLSPSubMenu(){

        const lspBtn = this.page.getByText('Literature Search Protocol');
        await lspBtn.click();
        await this.page.waitForTimeout(3000);

        // const lspField = page.locator("[class*='border px-3']").nth(0);
        // await expect(lspField).toBeVisible();
        // await expect(lspField).toBeEnabled();
        // await lspField.click();

        // //Ai feature catching
        // const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        // await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
        // await expect(aiBtn).toBeEnabled();
        // await aiBtn.click();
            
        // //wait to AI to generate
        // await lspField.waitFor({ state: 'visible' });
        // await expect(lspField).not.toHaveText("");
        // await aiBtn.click();

    }

    //-------------State of Art Section-------------------------
    async stateOfArtSection(){

        for (let i = 0; i < 9; i++) {

            console.log(`🧩 Processing field ${i + 1}`);

            // Target each LSP field by index
            const soa = this.page.locator("[class*='border px-3']").nth(i);
            await expect(soa).toBeVisible();
            await expect(soa).toBeEnabled();
            await soa.click();

            // Locate the AI button (first visible)
            const aiBtn = this.page.locator(
                ".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg"
            ).first();

            await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
            await expect(aiBtn).toBeEnabled();
            await aiBtn.click();

            // Wait for AI to populate content
            await soa.waitFor({ state: 'visible' });
            await expect(soa).not.toHaveText("");

            // Optionally click the AI button again if needed
            await aiBtn.click();

            // Small pause before moving to next field
            await this.page.waitForTimeout(2000);
        }

    }

    //-------------Pre Clinical Data-----------------------

    //Safety n Performance
    async safetyNperformance(safetyNperfomData){
        const fields = this.page.locator("[class*='w-full p-2'] textarea");

        for (let i = 0 ; i < 9 ; i++){
            console.log('🧩 Processing Safety n Performance field ' + (i + 1));
            const safetyNPerform = fields.nth(i);
            await expect(safetyNPerform).toBeVisible();
            await expect(safetyNPerform).toBeEnabled();
            await safetyNPerform.fill(safetyNperfomData[i])
        }

    }


    //Usability Testing
    async usabilityTest(usabilityTestData){
        const fields = this.page.locator("[class*='w-full p-2'] textarea");

        for (let i = 9 ; i < 17 ; i++){
            console.log('🧩 Processing of Usability Testing field ' + (i + 1));
            const usabilityTest = fields.nth(i);
            await expect(usabilityTest).toBeVisible();
            await expect(usabilityTest).toBeEnabled();
            await usabilityTest.fill(usabilityTestData[i])
        }

    }


    //Save Draft button
    async saveDraftBtn(){
        
        await this.page.waitForTimeout(6000);
        const saveDraftBtn  = this.page.getByRole("button" , {name : "Save Draft" , exact: true});
        await expect(saveDraftBtn).toBeVisible();
        await expect(saveDraftBtn).toBeEnabled();
        await saveDraftBtn.click();
        await this.page.waitForTimeout(5000);
    }

}

module.exports = { cerDoc }