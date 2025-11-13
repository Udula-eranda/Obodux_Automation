const { expect }  = require('@playwright/test')

class rmPage{


    constructor(page){
        this.page =  page;

    }


    //navigate to RM Section
    async navigatetoRM(){

        const riskManageBtn = await this.page.getByRole("link", { name: "Risk Management" });
        await expect(riskManageBtn).toBeVisible();
        await expect(riskManageBtn).toBeEnabled();
        await riskManageBtn.click();


    }

    //Risk Mangmnt Policy
    async rmPolicy(proRefNo){

        const riskMangtPolicy = this.page.locator("input[class*='flex-1']");
        await expect(riskMangtPolicy).toBeVisible();
        await expect(riskMangtPolicy).toBeEnabled();
        await this.page.waitForTimeout(2000);
        await riskMangtPolicy.click();
        await riskMangtPolicy.fill(proRefNo)
        
        // //Ai feature catching
        // const aiBtn =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        // await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
        // await expect(aiBtn).toBeEnabled();
        // await aiBtn.click();
        
        // //wait to AI to generate
        // await riskMangtPolicy.waitFor({ state: 'visible' });
        // await expect(riskMangtPolicy).not.toHaveText("");
        // await aiBtn.click();
        
    }

    //Responsibilities of RM section
    async rmTeamSection(options){

      for (let i = 0; i < options.length; i++) {
          const baseIndex = i * 3 + 1 

          await this.page.locator('textarea[placeholder="Type"]').nth(baseIndex).fill('T1');
          await this.page.locator('textarea[placeholder="Type"]').nth(baseIndex + 1).fill('BA');

          const combo = this.page.locator("[role='combobox']").nth(i+1);
          await combo.click();
          await this.page.getByRole('option', { name: options[i] }).click();
        }

    }

    //Grading System for the Probability of Harm
    async probablityofHarm(fixedValuesNo, startDecimal, decimalDecreaseRange){
      
    //========older logic=======================
    // for (let i = 0; i < levels.length; i++) {
    //     const combo = this.page.locator("[role='combobox']").nth(9 + i);
    //     await combo.click();
    //     await this.page.getByRole('option', { name: levels[i].name }).click();

    //     const row = this.page.locator('#probability-grading')
    //               .getByRole('row', { name: levels[i].label, exact: true });

    //     await row.getByRole('textbox').fill(levels[i].text);
    //     await this.page.locator("[type='number']").nth(i).fill(levels[i].number);
    //   }
      //===========================================

      const inputs = await this.page.locator('input[min="0"]').all();
      // Take only the first 10
      const firstTen = inputs.slice(0, 10);

      const fixedValues = fixedValuesNo;
      const [minDec, maxDec] = decimalDecreaseRange;
      let fixedIndex = 0;
      let currentDecimal = startDecimal;

        for (let i = 1; i < firstTen.length; i++) {
            let value;

            if ((i + 1) % 2 === 0) {
              // Even-numbered field → fixed value
              value = fixedValues[fixedIndex++];
            } else {
              // Odd-numbered field → decreasing decimal
              value = currentDecimal.toFixed(2);
              const decrease = Math.random() * (maxDec - minDec) + minDec;
              currentDecimal = Math.max(0, currentDecimal - decrease);
            }

            await firstTen[i].fill(value.toString());
            console.log(`Field ${i + 1}: ${value}`);
        }

    }

    //Grading System for the Severity of Harm
    async severityOfHarm(grades){

      for(let i = 0 ; i < grades.length ; i++){

        await this.page.locator('textarea[placeholder="Type"]').nth(i+24).fill(grades[i].definition);
        await this.page.locator('input[min="0"]').nth(i+10).fill(grades[i].severity);

        }

    }

    //Does the medical device have an Essential Performance?
    async medicalDeviceRadio(){

      // const radioBtn =  this.page.getByRole('radio' , {name: 'No'});
      // await radioBtn.click();
      const essentialPerfSection = this.page.getByText('Does the medical device have an Essential Performance?').locator('..'); 
      const radioBtn = essentialPerfSection.getByRole('radio', { name: /^No$/ });
      await radioBtn.click();

    }

    //Determine Risk Level values (these will be used in the below Risk Matrix table as values)
    async selectLowAndHighRisk(){

      //Low Risk
      // const combo = this.page.locator("[role='combobox']").nth(14);
      const combo = this.page.locator('div').filter({ hasText: /^Low Risk<Select$/ }).getByRole('combobox')
      await combo.click();
      // Get all dropdown options
      const values = await this.page.locator('[role="option"]').allTextContents();
      // Convert to numbers and find min and max
      const numericOptions = values.map(Number);
      const minValue = Math.min(...numericOptions);
      const maxValue = Math.max(...numericOptions);
      //Select the minimum
      await this.page.getByRole('option', { name: String(minValue) , exact: true }).first().click();

      //High Risk
      // const combo2 = this.page.locator("[role='combobox']").nth(16);
      const combo2 = this.page.locator('div').filter({ hasText: /^High Risk<Select$/ }).getByRole('combobox')
      await combo2.click();
      // Get all dropdown options
      const values2 = await this.page.locator('[role="option"]').allTextContents();
      // Convert to numbers and find min and max
      const numericOptions2 = values2.map(Number);
      const minValue2 = Math.min(...numericOptions2);
      const maxValue2 = Math.max(...numericOptions2);
      // Select the maximum
      await this.page.getByRole('option', { name: String(maxValue2), exact: true }).first().click();

    }

    //How will the overall residual risk be Evaluated and what is the Risk Acceptability Criteria?
    async overallResidualRisk(){

        const radioBtn = this.page.getByRole('radio', { name: /^Other$/ }).nth(1);
        await radioBtn.click();
        await this.page.waitForTimeout(2000);
        const overallRisk = this.page.locator("[class*='py-2.5']").nth(1);
        await overallRisk.click();
        //Ai feature catching
        const aiBtn1 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn1.click();
        await this.page.waitForTimeout(8000);
        //wait to AI to generate
        await overallRisk.waitFor({ state: 'visible' });
        await expect(overallRisk).not.toHaveText("");
        await aiBtn1.click();

    }

    //List of procedures that governs how information will be obtained to update the risk management file post device release.
    async listOfProcedures(){

      const listOfProcedures = this.page.locator("[class*='py-2.5']").nth(2);
      await listOfProcedures.click();
      // const editableField1 = listOfProcedures.locator('[contenteditable="true"]');
      // await editableField1.click();
      // await editableField1.fill("Test List of procedures");
      //==================AI===========================
      //Ai feature catching
        const aiBtn1 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn1.click();
        await this.page.waitForTimeout(8000);
        //wait to AI to generate
        await listOfProcedures.waitFor({ state: 'visible' });
        await expect(listOfProcedures).not.toHaveText("");
        await aiBtn1.click();

    }

    //Enter the Job Title of the person responsible for reviewing and approving the Risk Management File.
    async jobTitle(){

      const jobTitle = this.page.locator("[class*='py-2.5']").nth(3);
      const editableField = jobTitle.locator('[contenteditable="true"]');
      await editableField.click();
      //await editableField.fill("QA Manager");
      //==================AI===========================
      //Ai feature catching
        const aiBtn1 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn1.click();
        await this.page.waitForTimeout(8000);
        //wait to AI to generate
        await jobTitle.waitFor({ state: 'visible' });
        await expect(jobTitle).not.toHaveText("");
        await aiBtn1.click();

    }

    //clickSaveAndComplete
    async clickSaveAndComplete(){

      const saveBtn  = this.page.getByRole("button" , {name : "Save" , exact: true});
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();

      //click Mark Section Complete after waiting toast dissapear
      const toast = this.page.locator("li[role='status']");
      await expect(toast).toHaveText("Risk Management saved successfully");
      await toast.waitFor({ state: "hidden" });

      // const closeToastBtn = toast.locator('button'); // or any close button inside toast
      //   if (await closeToastBtn.isVisible()) {
      //       await closeToastBtn.click();
      //   }

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
    
    



module.exports = { rmPage }