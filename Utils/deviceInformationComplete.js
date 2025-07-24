const { deviceInfoPage } =  require('../PomModels/deviceInfoPom');
const { deviceInfoPageData }  = require('../Utils/testData')
const { LoginPage } = require('../tests/login.page')
const { DevicePage } = require('../PomModels/deviceonboardPom')
const {  }  = require('../Utils/testData')

async function deviceInformationComplete(page){

    
    const deviceInfo =  new deviceInfoPage(page);

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
 
    //Known Side Effects
    await deviceInfo.knownSideEffects(deviceInfoPageData.knownSideEffects);
  
    //Contradictions
    await deviceInfo.contadictionsSection(deviceInfoPageData.contradictions);

    //Clinical Use Settings
    await deviceInfo.clinicalUse(deviceInfoPageData.clinicalUsage);
   
    //Intended Users
    await deviceInfo.intendedUsers(deviceInfoPageData.intendedUsers);

    //Intended Patient Population
    await deviceInfo.intendedPatientCount(deviceInfoPageData.intendedCount);

    await deviceInfo.radioBtnandSave();

    //click Mark Section Complete after waiting toast dissapear
    await deviceInfo.markSectionCompleteAndProgreeBarValidate();

}

module.exports = { deviceInformationComplete };