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

}

module.exports = { DevicePage };