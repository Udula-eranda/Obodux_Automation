const { test,  expect } = require('@playwright/test')
const { rmPage } = require('../PomModels/riskMangmntPom')
const { deviceInformationComplete }  = require('./deviceInformationComplete')
const { loginAndOnboardDevice } = require('./deviceOnboard')
const { rmResponsibilityOptions } = require('./testData')



async function rmPlanComplete(page) {
    
    await deviceInformationComplete(page);

    await page.waitForTimeout(15000);
    const riskMangemnt = new rmPage(page);

    //navigate to RM
    await riskMangemnt.navigatetoRM({ timeout: 80000 });
    
    await page.waitForTimeout(8000);
    //Risk Managemnt Policy Section
    await riskMangemnt.rmPolicy(rmResponsibilityOptions.proceRefNo , { timeout: 80000 });

    //Responsibilities of the Risk Management Team section
    
    await riskMangemnt.rmTeamSection(rmResponsibilityOptions.options);

    //Grading System for the Probability of Harm
   
    await riskMangemnt.probablityofHarm(rmResponsibilityOptions.newProbofHarmValues.fixedValues , rmResponsibilityOptions.newProbofHarmValues.startDecimal , rmResponsibilityOptions.newProbofHarmValues.decimalDecreaseRange);

    //Grading System for the Severity of Harm

    await riskMangemnt.severityOfHarm(rmResponsibilityOptions.grades);
    
    //Does the medical device have an Essential Performance?
    await riskMangemnt.medicalDeviceRadio();
    
    //Determine Risk Level values (these will be used in the below Risk Matrix table as values)
    
    await riskMangemnt.selectLowAndHighRisk();
    
    //What is the Criteria for Risk Acceptability?
    const riskAcceptability = page.getByRole("radio" , {name: 'Each risk is classified as Low, Medium, or High:'});
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

    await page.waitForTimeout(7000);
    //click Save and Mark Section Complete
    await riskMangemnt.clickSaveAndComplete();
    

    
}


module.exports = { rmPlanComplete } ;