const { test, expect , rows }  = require('@playwright/test')
const { DevicePage }  = require('../PomModels/deviceonboardPom')
const { deviceInfoPage }  =  require('../PomModels/deviceInfoPom')
const { rmPage } = require('../PomModels/riskMangmntPom')
const { LoginPage }  = require('./login.page')
const{ initialHazardFormData }  = require('../Utils/testData')
const { initialHazardForm }  =  require('../PomModels/initialHazardReviewPom')
const { rmPlanComplete }  = require('../Utils/rmPlanComplete')

test('Initial Hazard Review ' , async({page}) => {

    test.setTimeout(200000);
    
    // const loginPage  =  new LoginPage(page);
    // const deviceInfo = new deviceInfoPage(page);
    // const riskMangemnt = new rmPage(page);
    // const devicePage   =  new DevicePage(page);
    
    await rmPlanComplete(page);
    
    await page.waitForTimeout(5000);
    const ihForm = new initialHazardForm(page);

    //click Mark Section Complete after waiting toast dissapear
    const toast = page.locator("li[role='status']");
    await expect(toast).toHaveText("Updated successfully", { timeout: 60000 });
      
    const closeToastBtn = toast.locator('button'); // or any close button inside toast
    if (await closeToastBtn.isVisible()) {
            await closeToastBtn.click();
        }
    
    await page.waitForTimeout(3000);

    //toggle up RM menu
    await ihForm.closeRmPlanPage();

    //Initial Hazard Form open and open questions form
    await ihForm.openIHFormandOpenForm();
   
    
    
    //-------------- Questions Group 1 & 2 filling-------------------------------
    
    await ihForm.fillingForm1andForm2(initialHazardFormData.answers);


    //----------------Questions Group 3 --------------------------
       
    await ihForm.fillingForm3(initialHazardFormData.answers3);
    

    //clickSavenComplete
    await ihForm.clickSaveAndComplete();
    

    //click Mark Section Complete after waiting toast dissapear
    const toast2 = page.locator("li[role='status']");
    await expect(toast2).toHaveText("Updated successfully", { timeout: 60000 });
      
    const closeToastBtn1 = toast2.locator('button'); // or any close button inside toast
    if (await closeToastBtn1.isVisible()) {
            await closeToastBtn1.click();
        }


})