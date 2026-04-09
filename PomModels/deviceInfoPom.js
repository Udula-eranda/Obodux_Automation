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
        const deviceNameField = this.page.locator("[value*='Accessory']");
        await expect(deviceNameField).toBeVisible();
        await expect(deviceNameField).toBeEnabled();
        await deviceNameField.fill(name);
    }

    async accessoryDescription(){
        const accessDesc = this.page.locator("[class*='min-h-16']").nth(0);
        await accessDesc.click();
        const aiBtn = this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn.click();
        await this.page.waitForTimeout(10000);
        await accessDesc.waitFor({ state: 'visible' });
        await expect(accessDesc).not.toHaveText("");
        await aiBtn.click();
    }

    async principleOperations(){
        const principleOperation = this.page.locator("[class*='min-h-16']").nth(1);
        await principleOperation.click();
        const aiBtn2 = this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn2.click();
        await this.page.waitForTimeout(10000);
        await principleOperation.waitFor({ state: 'visible' });
        await expect(principleOperation).not.toHaveText("");
        await aiBtn2.click();
    }

    async intendedPurpose(){
        const intendPurpose = this.page.locator("[class*='min-h-16']").nth(2);
        const editableField = intendPurpose.locator('[contenteditable="true"]');
        await editableField.click();
        const aiBtn3 = this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn3.click();
        await intendPurpose.waitFor({ state: 'visible' });
        await expect(intendPurpose).not.toHaveText("");
        await this.page.waitForTimeout(10000);
        await aiBtn3.click();
    }

    async indicationsForUse(){
        const field = this.page.locator("[class*='min-h-16']").nth(3);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Clinical Indications: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.indicationsForUseText);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Control+i');
        await this.page.keyboard.insertText('Note: For use by qualified healthcare professionals only.');
        await this.page.keyboard.press('Control+i');
    }

    async clinicalBenefits(){
        const cliniBenefit = this.page.locator("[class*='min-h-16']").nth(4);
        const editableField1 = cliniBenefit.locator('[contenteditable="true"]');
        await editableField1.click();
        const aiBtn2 = this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn2.click();
        await this.page.waitForTimeout(10000);
        await cliniBenefit.waitFor({ state: 'visible' });
        await expect(cliniBenefit).not.toHaveText("");
        await aiBtn2.click();
    }

    async knownSideEffects(){
        const field = this.page.locator("[class*='min-h-16']").nth(5);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Known Side Effects: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.knownSideEffectsText);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Control+i');
        await this.page.keyboard.insertText('Healthcare professionals should report any adverse events in accordance with MDR 2017/745.');
        await this.page.keyboard.press('Control+i');
    }

    async contraindications(){
        const field = this.page.locator("[class*='min-h-16']").nth(6);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Contraindications: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.contraindicationsText);
    }

    async clinicalUseSetting(){
        const field = this.page.locator("[class*='min-h-16']").nth(7);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Clinical Use Setting: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.clinicalUseSettingText);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Control+i');
        await this.page.keyboard.insertText('Refer to the Instructions for Use for full setup and safety requirements.');
        await this.page.keyboard.press('Control+i');
    }

    async intendedUsers(){
        const field = this.page.locator("[class*='min-h-16']").nth(8);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Intended Users: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.intendedUsersText);
    }

    async intendedPatientCount(patienteCountData){
        const PatientCount = this.page.locator("input[class*='flex-1']").nth(1);
        await PatientCount.click();
        await PatientCount.fill(patienteCountData);
    }

    async intendedBodyPartDescription(){
        const field = this.page.locator("[class*='min-h-16']").nth(9);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Target Anatomy: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.intendedBodyPartText);
    }

    async intendedUserEnvironment(){
        const field = this.page.locator("[class*='min-h-16']").nth(10);
        const editableField = field.locator('[contenteditable="true"]');
        await editableField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Use Environment: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.insertText(deviceInfoPageData.intendedUserEnvironmentText);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Control+i');
        await this.page.keyboard.insertText('Must comply with EN ISO 14644 cleanroom and sterile field standards.');
        await this.page.keyboard.press('Control+i');
    }


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
        await expect(toast).toHaveText(/Device accessory successfully updated./i , { timeout: 8000});
        
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