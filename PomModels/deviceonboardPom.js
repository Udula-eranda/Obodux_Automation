const { expect } = require('@playwright/test');
const {manufacturerData , authoriserData}  = require('../Utils/testData')

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
        //manufactureName
        this.mName = page.locator("[name='name']");
        //SRN No
        this.srnNo = page.locator("[name='srnNumber']");
        //phnNo
        this.phNo  =  page.locator("[name*='phone']");


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

    async imageUploadToastMsg(){
        //handling upload process completion
        const toast = await this.page.locator("li[role='status']");
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText(/File uploaded successfully!/i);
        await toast.waitFor({ state: "hidden" });
    }

    async deviceSetUp(name ,description ){
        await this.deviceName.fill(name);
        await this.deviceDecsription.fill(description)
    }

    async clickContinueBtn(){
        await expect(this.continueBtn).toBeVisible();
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

    async navigateToPage4(){
        // OR, wait until it's not visible (if detachment doesn't occur)
        const toast = this.page.locator("li[role='status']");
        await expect(toast).toHaveCount(0);

        const continueButton3 = this.page.getByRole('button', { name: 'Continue' });
        await continueButton3.waitFor({state : 'visible'});
        await expect(continueButton3).toBeEnabled();
        await continueButton3.click();
        await this.page.waitForLoadState();
    }

    async section4Validation(){
        const currentSection4 = this.page.locator("div.bg-primary.text-white");
        await currentSection4.waitFor({state : "visible"});
        await expect(currentSection4).toBeVisible();
        await expect(currentSection4).toHaveText("4")
    }

    async manufactureForm(name,srnNo ,phnNo,street,state,city,postal){
        const streetName = this.page.locator("[name='street']");
        const stateName  = this.page.locator("[name='state']");
        const cityName = this.page.locator("[name='city']");
        const combo = this.page.locator("[role='combobox']");
        const postalCode = this.page.locator("[name*='postal']");

        await this.mName.fill(name);
        await this.srnNo.fill(srnNo);
        await this.phNo.fill(phnNo);
        await streetName.fill(street);
        await stateName.fill(state);
        await cityName.fill(city);
        //ComboBox
        // 1. Click the combobox to open the dropdown
        await combo.click();

        // 2. Select the desired country
        await this.page.getByRole('option', { name: manufacturerData.country }).click();
        await postalCode.fill(postal);
    }

    async section5Validation(){
        const currentSection4 = this.page.locator("div.bg-primary.text-white");
        await currentSection4.waitFor({state : "visible"});
        await expect(currentSection4).toBeVisible();
        await expect(currentSection4).toHaveText("5")
    }

    async authoriserForm(name,srnNo ,phnNo,street,state,city,postal){
        const aName = this.page.locator("[name='name']");
        const streetName = this.page.locator("[name='street']");
        const stateName  = this.page.locator("[name='state']");
        const cityName = this.page.locator("[name='city']");
        const combo = this.page.locator("[role='combobox']");
        const postalCode = this.page.locator("[name*='postal']");
        const srnNum = this.page.locator("[name='srnNumber']");
        const phNo  =  this.page.locator("[name*='phone']");

        await aName.fill(name);
        await srnNum.fill(srnNo);
        await phNo.fill(phnNo);
        await streetName.fill(street);
        await stateName.fill(state);
        await cityName.fill(city);
        //ComboBox
        // 1. Click the combobox to open the dropdown
        await combo.click();

        // 2. Select the desired country
        await this.page.getByRole('option', { name: authoriserData.country }).click();
        await postalCode.fill(postal);
    }

    async section6Validation(){
        const currentSection4 = this.page.locator("div.bg-primary.text-white");
        await currentSection4.waitFor({state : "visible"});
        await expect(currentSection4).toBeVisible();
        await expect(currentSection4).toHaveText("6")

    }

    async devicceOverviewValidation(Dname){
        const nameLocator = this.page.getByText("About", { exact: true });;
        await expect(nameLocator).toBeVisible();


        const aboutSectionName = await this.page.locator("[class*='text-lg']").textContent();
        expect(aboutSectionName).toContain(Dname);
        console.log("Entered Device name is: " +Dname + " Final outcome: " +aboutSectionName )

    }

    async completingDeviceOnboard(){
        const FinishBtn =  this.page.getByRole('button' , { name : "Finish" });
        await expect(FinishBtn).toBeVisible();
        await FinishBtn.click();
    }

    async lastPageToastMsg(){
        // Wait for the success toast to appear
        const toast = this.page.locator("li[role='status']");
        
        await toast.waitFor({ state: "attached" });

        // Optionally validate toast text
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText(/successfully|completed|uploaded/i);

        // 3. Wait for toast to disappear
        await toast.waitFor({ state: "detached" });
    }

    async devicepageLoad(){
        await expect(this.page).toHaveURL(/.*\/devices/); 
    }


}

module.exports = { DevicePage };