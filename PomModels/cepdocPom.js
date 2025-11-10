const { expect } = require('@playwright/test');


class cepDoc {

    constructor(page) {
        this.page = page;
    }


    //navigate to CEP
    async navigateToCEP(){
        const cepMenu =  this.page.getByRole('link' , {name: 'Clinical Evaluation'});
        await expect(cepMenu).toBeVisible();
        await expect(cepMenu).toBeEnabled();
        await cepMenu.click();
    }

    //clinial Claims field
    async clinicalClaimsField(){

         const clinicalClaimsField = this.page.locator("[class*='border px-3']").nth(0);
            await expect(clinicalClaimsField).toBeVisible();
            await expect(clinicalClaimsField).toBeEnabled();
            await this.page.waitForTimeout(2000);
            await clinicalClaimsField.click();
        
            //=====================AI=========================================
            const aiBtn =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
            await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
            await expect(aiBtn).toBeEnabled();
            await aiBtn.click();
                
            //wait to AI to generate
            await clinicalClaimsField.waitFor({ state: 'visible' });
            await expect(clinicalClaimsField).not.toHaveText("");
            await aiBtn.click();
        
            //==============================end of ClincalField============================

    }

    //Anticipated Benefits
    async anticipatedBenefitsField(){

         const anticipatedBenefits = this.page.locator("[class*='border px-3']").nth(1);
            await expect(anticipatedBenefits).toBeVisible();
            await expect(anticipatedBenefits).toBeEnabled();
            await this.page.waitForTimeout(2000);
            await anticipatedBenefits.click();
        
            //=====================AI=========================================
            const aiBtn1 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
            await aiBtn1.waitFor({ state: 'visible', timeout: 10000 });
            await expect(aiBtn1).toBeEnabled();
            await aiBtn1.click();
                
            //wait to AI to generate
            await anticipatedBenefits.waitFor({ state: 'visible' });
            await expect(anticipatedBenefits).not.toHaveText("");
            await aiBtn1.click();

    }


    async saveNcomplete(){

        
        const saveBtn  = this.page.getByRole("button" , {name : "Save" , exact: true});
        await expect(saveBtn).toBeVisible();
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();

        //click Mark Section Complete after waiting toast dissapear
        const toast = this.page.locator("li[role='status']");
        await expect(toast).toHaveText("Clinical Evaluation saved successfully");
        await toast.waitFor({ state: "hidden" });

      await this.page.waitForTimeout(7000);
      const completeBtn = this.page.getByRole('button' , {name : " Mark Section Complete"});
      await expect(completeBtn).toBeVisible();
      await expect(completeBtn).toBeEnabled();   
      //progress bar validating after section completing
      await completeBtn.click();


      await this.page.waitForTimeout(6000);
      //click Mark Section Complete after waiting toast dissapear
      const toast2 = this.page.locator("li[role='status']");
      await expect(toast2).toBeVisible();
      await expect(toast2).toHaveText("Updated successfully");
      await toast2.waitFor({ state: "hidden" });

      // await this.page.waitForTimeout(6000);
      const progressBar = this.page.locator('[role="progressbar"]');
      const initialStyle = await progressBar.evaluate(el =>
      window.getComputedStyle(el).transform);
      console.log("Before:", initialStyle);
              
          await expect.poll(async () => {
              return await progressBar.evaluate(el =>
                  window.getComputedStyle(el).transform);}, 
              {
                  timeout: 10000, 
                  interval: 500,
              }).toMatch(/matrix\(1, 0, 0, 1, 0, 0\)|none/);

    }




}

module.exports = { cepDoc };