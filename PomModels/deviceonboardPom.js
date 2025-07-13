const { expect } = require('@playwright/test');

class DevicePage {

    constructor(page){

        this.page = page;
        //devicemenu bttn
        this.devicemenu = page.locator("ul li").nth(1);
        //add new device bttn
        this.addNewDevice = page.getByRole('button' , {name : "Add Device"});
        //firstPage radiobtn
        this.firstpageradio = page.getByRole('radio' , {name: 'No'});
        //filePathSection
        this.filepathMenu = page.locator("div[class*='border-2']").nth(2);
        //deviceName
        this.deviceName = page.locator("[placeholder*='Device Name']");
        //deviceDescription
        this.deviceDecsription = page.locator("[placeholder$='Brief description']");
        //1st continue button
        this.continueBtn  = page.getByRole('button', { name: 'Continue' })
        //currentPage selection
        this.currentPage = page.locator("div.bg-primary.text-white");
        //1st section checkboxes
        this.checkboxes = page.locator("[role='checkbox']");
        

    }

    async openDeviceMenu(){

        await this.devicemenu.click();
    }

    async addDeviceWindowOpen(){
        await this.addNewDevice.click();
        await this.firstpageradio.check();
    }

    async fileUploadMenu(filePath){

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.filepathMenu.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }

    async deviceSetUp(name ,description ){
        await this.deviceName.fill(name);
        await this.deviceDecsription.fill(description)
    }

    async clickContinueBtn(){
        await expect(this.continueBtn).toBeEnabled();
        await this.continueBtn.click();
        // waits until no network activity
    }

    async currentPageValidation(){
         // Assert it's visible and contains "2"
         await expect(this.currentPage).toBeVisible();
         await expect(this.currentPage).toHaveText("2");
        
    }

    async firstCheckBoxes(){
        await this.checkboxes.nth(0).click();
        await this.checkboxes.nth(1).click();
    }

    async clickContinueBttn2(){
        const continueBtn = this.page.getByRole('button', { name: 'Continue' });
        await continueBtn.waitFor({ state: 'visible' });
        await expect(continueBtn).toBeEnabled();
        await continueBtn.click();
        await this.page.waitForLoadState(); 

    }

    async sectionThreeValidation(){
        //3rd section validation
        this.currentSection3 = this.page.locator("div.bg-primary.text-white");
        await this.currentSection3.waitFor({ state :'visible' })
        await expect(this.currentSection3).toBeVisible();
        await expect(this.currentSection3).toHaveText("3");
    }

    async lastOptionClick(){
        const lastoption = this.page.locator("div:nth-child(9) > .pt-0\\.5 > .peer");
        await lastoption.waitFor({state: 'visible'});
        await lastoption.click();
    }

}

module.exports = { DevicePage };