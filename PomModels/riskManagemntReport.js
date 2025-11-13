const{ expect } = require('@playwright/test')


class riskMangmentReport{

    constructor(page){

        this.page = page;

    }


async clickSaveNComplete(){

    const saveBtn  = this.page.getByRole("button" , {name : "Save" , exact: true});
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    //click Mark Section Complete after waiting toast dissapear
    const toast = this.page.locator("li[role='status']");
    await expect(toast).toHaveText("Risk Analysis Report saved successfully");
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


async sendForAuthorize1(){

    //Sending the report for authoriser
    const openRmForm =  this.page.getByRole('button' , {name : "Send for Authorization"}).nth(0);
    await expect(openRmForm).toBeVisible();
    await expect(openRmForm).toBeEnabled();
    await openRmForm.click();
        
    //filling the authoriser form
    const docNo =  this.page.locator("input[placeholder='XXXXXXXXX']");
    await docNo.fill("DI-016");
        
    await this.page.waitForTimeout(5000);
        
    //select a authorizer
    const combo = this.page.locator("[role='combobox']").last();
    await combo.click();
    await this.page.getByRole('option', { name: "Dale Doe" }).click();
        
    //send for authorizer
    const authorizeBtn =  this.page.getByRole('button' , {name: "Send for Authorization"});
    await expect(authorizeBtn).toBeVisible();
    await expect(authorizeBtn).toBeEnabled();
    await authorizeBtn.click();
        
    // //toast
    // const toast = page.locator("li[role='status']");
    // await expect(toast).toHaveText("The report has been successfully sent.");
    // await toast.waitFor({ state: "hidden" });


}

async sendForAuthorize2(){

    //Sending the report for authoriser
    const openRmForm =  this.page.getByRole('button' , {name : "Send for Authorization"}).nth(1);
    await expect(openRmForm).toBeVisible();
    await expect(openRmForm).toBeEnabled();
    await openRmForm.click();
        
    //filling the authoriser form
    const docNo =  this.page.locator("input[placeholder='XXXXXXXXX']");
    await docNo.fill("DI-017");
        
    await this.page.waitForTimeout(5000);
        
    //select a authorizer
    const combo = this.page.locator("[role='combobox']").last();
    await combo.click();
    await this.page.getByRole('option', { name: "Dale Doe" }).click();
        
    //send for authorizer
    const authorizeBtn =  this.page.getByRole('button' , {name: "Send for Authorization"});
    await expect(authorizeBtn).toBeVisible();
    await expect(authorizeBtn).toBeEnabled();
    await authorizeBtn.click();
        
    // //toast
    // const toast = page.locator("li[role='status']");
    // await expect(toast).toHaveText("The report has been successfully sent.");
    // await toast.waitFor({ state: "hidden" });


}

async sendForAuthorize3(){

    //Sending the report for authoriser
    const openRmForm =  this.page.getByRole('button' , {name : "Send for Authorization"}).nth(2);
    await expect(openRmForm).toBeVisible();
    await expect(openRmForm).toBeEnabled();
    await openRmForm.click();
        
    //filling the authoriser form
    const docNo =  this.page.locator("input[placeholder='XXXXXXXXX']");
    await docNo.fill("DI-018");
        
    await this.page.waitForTimeout(5000);
        
    //select a authorizer
    const combo = this.page.locator("[role='combobox']").last();
    await combo.click();
    await this.page.getByRole('option', { name: "Dale Doe" }).click();
        
    //send for authorizer
    const authorizeBtn =  this.page.getByRole('button' , {name: "Send for Authorization"});
    await expect(authorizeBtn).toBeVisible();
    await expect(authorizeBtn).toBeEnabled();
    await authorizeBtn.click();
        
    // //toast
    // const toast = page.locator("li[role='status']");
    // await expect(toast).toHaveText("The report has been successfully sent.");
    // await toast.waitFor({ state: "hidden" });


}

async sendForAuthorize4(){

    //Sending the report for authoriser
    const openRmForm =  this.page.getByRole('button' , {name : "Send for Authorization"}).nth(3);
    await expect(openRmForm).toBeVisible();
    await expect(openRmForm).toBeEnabled();
    await openRmForm.click();
        
    //filling the authoriser form
    const docNo =  this.page.locator("input[placeholder='XXXXXXXXX']");
    await docNo.fill("DI-019");
        
    await this.page.waitForTimeout(5000);
        
    //select a authorizer
    const combo = this.page.locator("[role='combobox']").last();
    await combo.click();
    await this.page.getByRole('option', { name: "Dale Doe" }).click();
        
    //send for authorizer
    const authorizeBtn =  this.page.getByRole('button' , {name: "Send for Authorization"});
    await expect(authorizeBtn).toBeVisible();
    await expect(authorizeBtn).toBeEnabled();
    await authorizeBtn.click();
        
    // //toast
    // const toast = page.locator("li[role='status']");
    // await expect(toast).toHaveText("The report has been successfully sent.");
    // await toast.waitFor({ state: "hidden" });


}


}

module.exports = { riskMangmentReport  }