const {test  } = require('@playwright/test')
const { loginAndOnboardDevice } =  require('../Utils/deviceOnboard')
const{ deviceInfoPage }  = require('../PomModels/deviceInfoPom')
const { deviceInfoPageData }  = require('../Utils/testData')

test('Device Information Automation' , async ({page}) => {
    test.setTimeout(200000);
    await loginAndOnboardDevice(page);
    const deviceInfo =  new deviceInfoPage(page);
    await page.waitForTimeout(6000);
    
    //deviceInfo Page
    await deviceInfo.clickFirstItem();
    
    //Navigate to Device Information Page
    await deviceInfo.navigateToDeviceInfoPage();

    //click Add new device bttn
    await deviceInfo.addNewDeviceInfo();

    
    //renaming the device
    await deviceInfo.renamingtheDevice(deviceInfoPageData.dName);

    //Accessor Description
    await deviceInfo.accessoryDescription();

    //Principles of Operation
    await deviceInfo.principleOperations();

    //Intended Purpose
    await deviceInfo.intendedPurpose(deviceInfoPageData.intendedPurpose);

    //Clinical Benefits
    await deviceInfo.clinicalBenefits(deviceInfoPageData.clinicalBenefits);
 
    // //Known Side Effects
    // await deviceInfo.knownSideEffects(deviceInfoPageData.knownSideEffects);
  
    // //Contradictions
    // await deviceInfo.contadictionsSection(deviceInfoPageData.contradictions);

    // //Clinical Use Settings
    // await deviceInfo.clinicalUse(deviceInfoPageData.clinicalUsage);
   
    // //Intended Users
    // await deviceInfo.intendedUsers(deviceInfoPageData.intendedUsers);

    //Intended Patient Population
    await deviceInfo.intendedPatientCount(deviceInfoPageData.intendedCount);

    await deviceInfo.radioBtnandSave();

    //Basic UDI-DI
    await deviceInfo.completeBasicUdi();

    //GMDN Code
    await deviceInfo.completeGmdnCode();

    //EMDN Code
    await deviceInfo.completeEmdnCode();


    //click Mark Section Complete after waiting toast dissapear
    await deviceInfo.markSectionCompleteAndProgreeBarValidate();

    
})