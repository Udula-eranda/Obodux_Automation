const { test , expect }  = require('@playwright/test')
const { loginAndOnboardDevice }  = require('../Utils/deviceOnboard')
const { deviceInfoPage } =  require('../PomModels/deviceInfoPom')
const { rmPage }  = require('../PomModels/riskMangmntPom')
const { rmResponsibilityOptions }  = require('../Utils/testData')





test('RM with Partial Flow' ,async ({page}) => {

    test.setTimeout(90000)
    
    const deviceInfo = new deviceInfoPage(page);
    const riskMangemnt = new rmPage(page);    

    await loginAndOnboardDevice(page);
    await page.waitForTimeout(8000);
    await deviceInfo.clickFirstItem();
    
    await page.waitForTimeout(5000);
    
    //navigate to RM
    await riskMangemnt.navigatetoRM();

    //Risk Managemnt Policy Section
    await riskMangemnt.rmPolicy();

    //Responsibilities of the Risk Management Team section
    
    await riskMangemnt.rmTeamSection(rmResponsibilityOptions.options);

    
    //Grading System for the Probability of Harm
   
    await riskMangemnt.probablityofHarm(rmResponsibilityOptions.levels);


    //Grading System for the Severity of Harm

    await riskMangemnt.severityOfHarm(rmResponsibilityOptions.grades);
    
    //Does the medical device have an Essential Performance?
    await riskMangemnt.medicalDeviceRadio();
    
    //Determine Risk Level values (these will be used in the below Risk Matrix table as values)
    
    await riskMangemnt.selectLowAndHighRisk();

    //What is the Criteria for Risk Acceptability?
    const riskAcceptability = page.getByRole("radio" , {name: 'The risk level for each identified risk will be either graded as Low, Medium, or High which are defined below:'});
    await riskAcceptability.click();

    //How will the overall residual risk be Evaluated and what is the Risk Acceptability Criteria?
    await riskMangemnt.overallResidualRisk();
    
    //List of procedures that governs how information will be obtained to update the risk management file post device release.
    await riskMangemnt.listOfProcedures();
  

    //Enter the Job Title of the person responsible for reviewing and approving the Risk Management File.
    await riskMangemnt.jobTitle();

    //Enter how often the Risk Management File will be reviewed in its entirety.
    const monthSelect =  page.getByRole("radio" , {name : "Every 6 months"});
    await monthSelect.click();

    //Which Lifecycle stages are applicable to the medical device
    for(let i = 0 ; i < 5 ; i++){
        await page.locator("[role='switch']").nth(i).click()
    }

    //click Save and Mark Section Complete
    await riskMangemnt.clcikSaveAndComplete();

    await page.pause();

})