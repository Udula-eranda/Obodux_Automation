const { expect } = require('@playwright/test')
const { deviceInfoPageData }  = require('../Utils/testData')

class deviceInfoPage{

    constructor(page){

        this.page = page;
        //deviceInfo Button
        this.deviceInfo = this.page.getByRole("link" , {name : "Device Information"});
        //add New button
        this.addNew =  this.page.getByRole("button" , {name : "Add New"});
    }

    async clickFirstItem(){

        this.firstItem = this.page.locator("div.grid div.cursor-pointer").first();
        await this.firstItem.waitFor({state : 'visible'});
        await expect(this.firstItem).toBeEnabled();
        await this.page.waitForTimeout(6000);
        await this.firstItem.click();
    }

    async navigateToDeviceInfoPage(){
        await this.deviceInfo.click();
    }

    async addNewDeviceInfo(){
        await expect(this.addNew).toBeVisible();
        await expect(this.addNew).toBeEnabled();
        await this.addNew.click();
    }

    async renamingtheDevice(name){
        const deviceNameField = this.page.locator("[value='Device Accessory 1']");
        await expect(deviceNameField).toBeVisible();
        await expect(deviceNameField).toBeEnabled();
        await deviceNameField.fill(name);
    }

    async accessoryDescription(){
        //Accessor Description
        const accessDesc = this.page.locator("[class*='min-h-16']").nth(0);
        await accessDesc.click();
        //Ai feature catching
        const aiBtn =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn.click();
        await this.page.waitForTimeout(10000);
        //wait to AI to generate
        await accessDesc.waitFor({ state: 'visible' });
        await expect(accessDesc).not.toHaveText("");
        await aiBtn.click();
    }

    async principleOperations(){

        const principleOperation = this.page.locator("[class*='min-h-16']").nth(1);
        await principleOperation.click();
        //Ai feature catching
        const aiBtn2 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn2.click();
        await this.page.waitForTimeout(10000);
        //wait to AI to generate
        await principleOperation.waitFor({ state: 'visible' });
        await expect(principleOperation).not.toHaveText("");
        await aiBtn2.click();
    }

    async intendedPurpose(){

        const intendPurpose = this.page.locator("[class*='min-h-16']").nth(2);
        const editableField = intendPurpose.locator('[contenteditable="true"]');
        await editableField.click();
        // await editableField.fill(intendPurposeData);
        //Ai feature catching
        const aiBtn3 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn3.click();
        //wait to AI to generate
        await intendPurpose.waitFor({ state: 'visible' });
        await expect(intendPurpose).not.toHaveText("");
        await this.page.waitForTimeout(10000);
        await aiBtn3.click();

    }

    async clinicalBenefits(){

        const cliniBenefit  = this.page.locator("[class*='min-h-16']").nth(3);
        const editableField1 = cliniBenefit.locator('[contenteditable="true"]');
        await editableField1.click();
        // await editableField1.fill(clinicalBenefitsData);
        //Ai feature catching
        const aiBtn2 =  this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn2.click();
        await this.page.waitForTimeout(10000);
        //wait to AI to generate
        await cliniBenefit.waitFor({ state: 'visible' });
        await expect(cliniBenefit).not.toHaveText("");
        await aiBtn2.click();

    }

    // async knownSideEffects(knownSideEffectsData){

    //     const knownSide = this.page.locator("[class*='min-h-16']").nth(4);
    //     const editableField2 = knownSide.locator('[contenteditable="true"]');
    //     await editableField2.click();
    //     await editableField2.fill(knownSideEffectsData);

    // }

    // async contadictionsSection(contradictionsData){

    //     const contradic = this.page.locator("[class*='min-h-16']").nth(5);
    //     const editableField3 = contradic.locator('[contenteditable="true"]');
    //     await editableField3.click();
    //     await editableField3.fill(contradictionsData);

    // }

    //     async intendedUsers(intendedUsersData){

    //     const intendUsers = this.page.locator("[class*='min-h-16']").nth(7);
    //     const editableField5 = intendUsers.locator('[contenteditable="true"]');
    //     await editableField5.click();
    //     await editableField5.fill(intendedUsersData);

    // }

        async intendedPatientCount(patienteCountData){

        const PatientCount = this.page.locator("input[class*='flex-1']").nth(1) ;
        await PatientCount.click();
        await PatientCount.fill(patienteCountData);

    }


    // async clinicalUse(clinicalUseData){

    //     //Clinical Use Settings
    //     const clinUseSetting = this.page.locator("[class*='min-h-16']").nth(6);
    //     const editableField4 = clinUseSetting.locator('[contenteditable="true"]');
    //     await editableField4.click();
    //     await editableField4.fill(clinicalUseData);

    // }


    async radioBtnandSave(){

           //Radio option
            const radioBtn = this.page.getByRole('radio' , {name : "No"});
            await radioBtn.check();
        
    }

    //Basic UDI-DI
    async completeBasicUdi(){

        const basicUdiField = this.page.getByRole('textbox').nth(2);
        await basicUdiField.click();
        await basicUdiField.fill(deviceInfoPageData.basicUdiDi);

    }

    //GMDN Code
    async completeGmdnCode(){

        const gmdnCodeField = this.page.getByRole('textbox').nth(3);
        await gmdnCodeField.click();
        await gmdnCodeField.fill(deviceInfoPageData.gmdnCode);
    }

    //EMDN Code
    async completeEmdnCode(){   

        const emdnCodeField = this.page.getByRole('textbox').nth(4);
        await emdnCodeField.click();
        await emdnCodeField.fill(deviceInfoPageData.emdnCode);

        //click Save option
        const saveBtn  = this.page.getByRole("button" , {name : "Save"});
        await expect(saveBtn).toBeVisible();
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
    }

    async markSectionCompleteAndProgreeBarValidate(){

        //click Mark Section Complete after waiting toast dissapear
        const toast = this.page.locator("li[role='status']");
        await expect(toast).toHaveText(/Device accessory successfully updated./i , { timeout: 6000});
        
        const closeToastBtn = toast.locator('button'); // or any close button inside toast
        if (await closeToastBtn.isVisible()) {
            await closeToastBtn.click();
        }

        await this.page.waitForTimeout(7000);

        const completeBtn = this.page.getByRole('button' , {name : " Mark Section Complete"});
        await expect(completeBtn).toBeVisible();
        await expect(completeBtn).toBeEnabled();   
        //progress bar validating after section completing
        
        await completeBtn.click();
        await this.page.waitForTimeout(4000);
        
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


module.exports = { deviceInfoPage }