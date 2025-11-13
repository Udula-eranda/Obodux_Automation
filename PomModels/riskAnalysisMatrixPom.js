const { expect }  =  require("@playwright/test")


class riskAnalysisMatrixForm {

    constructor(page){

        this.page =  page;
    }

async ramtrixFirstRow(firstRowAnswers){

    
    for( let i = 0 ; i < firstRowAnswers.length ; i++){

        const textField  =  this.page.locator("[data-placeholder*='Type']").nth(i)        
        await textField.fill(firstRowAnswers[i]);
    }

}


async ramtrixSecondRow(secondRowAnswers){


    for (let j = 0; j < secondRowAnswers.length ; j++) {
        const i = 17 + j; 
        const textField = this.page.locator("[data-placeholder*='Type']").nth(i);
        await textField.fill(secondRowAnswers[j]);
    }

}

async ramtrixThirdRow(thirdRowAnswers){

    for (let j = 0; j < thirdRowAnswers.length ; j++) {
        const i = 34 + j; 
        const textField = this.page.locator("[data-placeholder*='Type']").nth(i);
        await textField.fill(thirdRowAnswers[j]);
    }


}

async deleteRow(){

    //4th row & 5th row
    const option4Btn =  this.page.getByRole('row', { name: '004 Type... Type... Type...' }).getByRole('img');

    await expect(option4Btn).toBeVisible();
    await expect(option4Btn).toBeEnabled();
    await option4Btn.click();
    
    // Dynamically locate the Delete Row button after DOM has updated
    const delteBtn = this.page.getByRole('button', { name: 'Delete Row' });
    await delteBtn.waitFor({ state: 'visible' }); // ensure it's attached & visible
    await delteBtn.click();

    // 3. Wait for the confirmation dialog to appear
    const confirmDialog = this.page.getByRole('dialog'); // or use a specific locator if needed
    await expect(confirmDialog).toBeVisible();

    // 4. Click the Confirm Delete button inside the dialog
    const confirmDeleteBtn = confirmDialog.getByRole('button', { name: 'Yes, Delete' }); // or the actual button label
    await confirmDeleteBtn.waitFor({ state: 'visible' });
    await confirmDeleteBtn.click();


}
    
//clickSaveAndComplete
    async clickSaveAndComplete(){

    const saveBtn  = this.page.getByRole("button" , {name : "Save" , exact: true});
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    //click Mark Section Complete after waiting toast dissapear
    const toast = this.page.locator("li[role='status']");
    await expect(toast).toHaveText("Risk Analysis Matrix saved successfully");
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


module.exports = { riskAnalysisMatrixForm } ; 