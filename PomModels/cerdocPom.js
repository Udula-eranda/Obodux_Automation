const { expect , test } = require("@playwright/test");


class cerDoc{

    constructor(page){
        this.page = page;
    }

    //close cepDoc Menu
    async closrCEPDoc(){

        const cepCollapseBtn = this.page.locator("[id='radix-\\:r3e\\:']");
        await cepCollapseBtn.click();

    }
    
    //open CER Section
    async openCERSection(){

        const cerCollapseBtn = page.locator('[id="radix-:r3k:"]');
        await cerCollapseBtn.click();

    }

    //open CER sub menu and navigates into CER page
    async openCERSubMenu(){

        const soaBtn = page.locator('[id="radix-:r44:"]');
        await soaBtn.click();

    }

    //open the sub menu Literature Search Protocol
    async openLSPSubMenu(){

        const lspBtn = page.getByText('Literature Search Protocol');
        await lspBtn.click();
        await page.waitForTimeout(3000);

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

    //State of Art Section
    async stateOfArtSection(){

        for (let i = 0; i < 8; i++) {

            console.log(`🧩 Processing field ${i + 1}`);

            // Target each LSP field by index
            const soa = page.locator("[class*='border px-3']").nth(i);
            await expect(soa).toBeVisible();
            await expect(soa).toBeEnabled();
            await soa.click();

            // Locate the AI button (first visible)
            const aiBtn = page.locator(
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
            await page.waitForTimeout(2000);
        }

    }

    //Save Draft button
    async saveDraftBtn(){
        
        await page.waitForTimeout(6000);
        const saveDraftBtn  = this.page.getByRole("button" , {name : "Save Draft" , exact: true});
        await expect(saveDraftBtn).toBeVisible();
        await expect(saveDraftBtn).toBeEnabled();
        await saveBtn.click();

    }

}

module.exports = { cerDoc }