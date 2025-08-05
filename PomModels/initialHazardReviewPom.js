const { expect }  = require('@playwright/test')

class initialHazardForm{

   constructor(page){

        this.page = page;

   }

   async closeRmPlanPage(){

        //toggle up RM menu
        const rmCollapseBtn  =  this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2)
        await rmCollapseBtn.click();

   }

   async openIHFormandOpenForm(){

        //Initial Hazard Form Btn
        const ihFormBtn = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
        await ihFormBtn.click();

        //Navigate to Question Group 1
        await this.page.getByText("Questions Group 01").click();

   }

   async fillingForm1andForm2(answers){

        //-------------- Questions Group 1 -------------------------------
            
        
            for(let i = 0 ; i < answers.length ; i++){  
        
                const answerField = this.page.locator('textarea').nth(i)
                await answerField.fill(answers[i]);
                
                const row = answerField.locator("xpath=ancestor::tr[contains(@class, 'border-b')]");
                // Check if a radio button exists before interacting
                const radioBtn = row.getByRole('radio', { name: "Yes" });
        
                if (await radioBtn.count() > 0) {
                    await expect(radioBtn).toBeVisible();
                    await expect(radioBtn).toBeEnabled();
                    await radioBtn.check();
                } else {
                    console.log(`No radio button in row ${i}`);
                }
            
            }
            //access the 16th radio btn
            const radioBtn = this.page.getByRole("radio" , {  name: "Yes" }).nth(13);
            await expect(radioBtn).toBeVisible();
            await expect(radioBtn).toBeEnabled();
            await radioBtn.check();
        
            //----------------Questions Group 2 --------------------------
          
            //access the 26th radio btn
            const radioBtn2 = this.page.getByRole("radio" , {  name: "Yes" }).nth(26);
            await expect(radioBtn2).toBeVisible();
            await expect(radioBtn2).toBeEnabled();
            await radioBtn2.check();
        

   }

   async fillingForm3(answers3){

            //----------------Questions Group 3 --------------------------
        
            let answerIndex = 0; // tracks the index in your answers3 array
        
            for (let i = 31; i <= 49; i++) {
                const allTextareas = await this.page.locator('textarea').count();
        
                    if (i >= allTextareas) {
                        console.log(`No textarea at index ${i}, skipping.`);
                        continue;
                    }
        
                    const answerField = this.page.locator('textarea').nth(i);
                    await answerField.fill(answers3[answerIndex]);
        
                    const row = answerField.locator("xpath=ancestor::tr[contains(@class, 'border-b')]");
                    const radioBtn = row.getByRole('radio', { name: "No" });
        
                    if (await radioBtn.count() > 0) {
                        await expect(radioBtn).toBeVisible();
                        await expect(radioBtn).toBeEnabled();
                        await radioBtn.check();
                    } else {
                        console.log(`No radio button found in row ${i}`);
                    }
        
                    answerIndex++;
        
                    if (answerIndex >= answers3.length) break;
            }
            
            
                    //access the 39th radio btn
                    const radioBtn3 = this.page.getByRole('row', { name: 'Does the medical device produce an output that is used as an input in' }).getByRole('radio').nth(1);
                    await expect(radioBtn3).toBeVisible();
                    await expect(radioBtn3).toBeEnabled();
                    await radioBtn3.check();

   }


   //clickSaveAndComplete
    async clickSaveAndComplete(){

      const saveBtn  = this.page.getByRole("button" , {name : "Save"});
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();

      //click Mark Section Complete after waiting toast dissapear
      const toast = this.page.locator("li[role='status']");
      await expect(toast).toHaveText("Risk Management saved successfully", { timeout: 60000 });
      
      const closeToastBtn = toast.locator('button'); // or any close button inside toast
        if (await closeToastBtn.isVisible()) {
            await closeToastBtn.click();
        }

      
      const completeBtn = this.page.getByRole('button' , {name : " Mark Section Complete"});
      await expect(completeBtn).toBeVisible();
      await expect(completeBtn).toBeEnabled();   
      //progress bar validating after section completing
      await completeBtn.click();

      await this.page.waitForTimeout(6000);
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


module.exports = { initialHazardForm }