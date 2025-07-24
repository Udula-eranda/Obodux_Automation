const { test , expect }  = require('@playwright/test')
const { loginAndOnboardDevice }  = require('../Utils/deviceOnboard')
const { deviceInfoPage } =  require('../PomModels/deviceInfoPom')
const { rmPage }  = require('../PomModels/riskMangmntPom')




test('RM with Partial Flow' ,async ({page}) => {

    test.setTimeout(90000)
    
    const deviceInfo = new deviceInfoPage(page);
 
    await loginAndOnboardDevice(page);
    await page.waitForTimeout(8000);
    await deviceInfo.clickFirstItem();
    
    await page.waitForTimeout(5000);
    const riskManageBtn = await page.getByRole("link", { name: "Risk Management" });
    await expect(riskManageBtn).toBeVisible({ timeout: 10000 });
    await expect(riskManageBtn).toBeEnabled();
    
    await riskManageBtn.click();

    //Risk Managemnt Policy Section
    const riskMangtPolicy = page.locator("[class*='py-2.5']").nth(0);
    await riskMangtPolicy.click();
    //Ai feature catching
    const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn.click();
    //wait to AI to generate
    await riskMangtPolicy.waitFor({ state: 'visible' });
    await expect(riskMangtPolicy).not.toHaveText("");
    await aiBtn.click();

    //Responsibilities of the Risk Management Team section
    
    const options = [
        "Identifies potential risks", 
        "Evaluates risk levels", 
        "Implements risk control",    
        "Reviews the file", 
        "Identifies potential risks", 
        "Evaluates risk levels", 
        "Implements risk control",  
        "Reviews the file", 
    ];

    for (let i = 0; i < options.length; i++) {
        const baseIndex = i * 3 + 1 

        await page.locator('textarea[placeholder="Type"]').nth(baseIndex).fill('T1');
        await page.locator('textarea[placeholder="Type"]').nth(baseIndex + 1).fill('BA');

        const combo = page.locator("[role='combobox']").nth(i+1);
        await combo.click();
        await page.getByRole('option', { name: options[i] }).click();
    }

    
    //Grading System for the Probability of Harm
   
    const levels = [
        { label: 'Frequent', name: 'Greater than >' ,  text: 'T1', number: '2' },
        { label: 'Probable', name: 'Greater than or equal ≥' , text: 'T2', number: '8' },
        { label: 'Occasional', name: 'Less than <' , text: 'T3', number: '15' },
        { label: 'Remote', name: 'Less than or equal to ≤' , text: 'T4', number: '28' },
        { label: 'Improbable', name: 'Less than <' , text: 'T5', number: '35' },
    ];

    for (let i = 0; i < levels.length; i++) {
        const combo = page.locator("[role='combobox']").nth(9 + i);
        await combo.click();
        await page.getByRole('option', { name: levels[i].name }).click();

        const row = page.locator('#probability-grading')
                  .getByRole('row', { name: levels[i].label, exact: true });

        await row.getByRole('textbox').fill(levels[i].text);
        await page.locator("[type='number']").nth(i).fill(levels[i].number);
    }

    

    //Grading System for the Severity of Harm

    const grades = [
        {definition: 'T1' , severity: '10'},
        {definition: 'T2' , severity: '8'},
        {definition: 'T3' , severity: '5'},
        {definition: 'T4' , severity: '3'},
        {definition: 'T5' , severity: '1'},

    ]

    for(let i = 0 ; i < grades.length ; i++){

        await page.locator('textarea[placeholder="Type"]').nth(i+24).fill(grades[i].definition);
        await page.locator("[type='number']").nth(i+5).fill(grades[i].severity);

    }
    
    //Does the medical device have an Essential Performance?
    const radioBtn =  page.getByRole('radio' , {name: 'No'});
    await radioBtn.click();
    
    //Determine Risk Level values (these will be used in the below Risk Matrix table as values)
    //Low Risk
    const combo = page.locator("[role='combobox']").nth(14);
    await combo.click();
    // Get all dropdown options
    const values = await page.locator('[role="option"]').allTextContents();
    // Convert to numbers and find min and max
    const numericOptions = values.map(Number);
    const minValue = Math.min(...numericOptions);
    const maxValue = Math.max(...numericOptions);
    //Select the minimum
    await page.getByRole('option', { name: String(minValue) , exact: true }).first().click();

    //High Risk
    const combo2 = page.locator("[role='combobox']").nth(16);
    await combo2.click();
    // Get all dropdown options
    const values2 = await page.locator('[role="option"]').allTextContents();
    // Convert to numbers and find min and max
    const numericOptions2 = values2.map(Number);
    const minValue2 = Math.min(...numericOptions2);
    const maxValue2 = Math.max(...numericOptions2);
    // Select the maximum
    await page.getByRole('option', { name: String(maxValue2), exact: true }).first().click();

    //What is the Criteria for Risk Acceptability?
    const riskAcceptability = page.getByRole("radio" , {name: 'The risk level for each identified risk will be either graded as Low, Medium, or High which are defined below:'});
    await riskAcceptability.click();

    //How will the overall residual risk be Evaluated and what is the Risk Acceptability Criteria?
    const overallRisk = page.locator("[class*='py-2.5']").nth(1);
    await overallRisk.click();
    //Ai feature catching
    const aiBtn1 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn1.click();
    //wait to AI to generate
    await overallRisk.waitFor({ state: 'visible' });
    await expect(overallRisk).not.toHaveText("");
    await aiBtn1.click();
    
    //List of procedures that governs how information will be obtained to update the risk management file post device release.
    const listOfProcedures = page.locator("[class*='py-2.5']").nth(2);
    await listOfProcedures.click();
    const editableField1 = listOfProcedures.locator('[contenteditable="true"]');
    await editableField1.click();
    await editableField1.fill("Test List of procedures");
  

    //Enter the Job Title of the person responsible for reviewing and approving the Risk Management File.
    const jobTitle = page.locator("[class*='py-2.5']").nth(3);
    const editableField = jobTitle.locator('[contenteditable="true"]');
    await editableField.click();
    await editableField.fill("QA Manager");

    //Enter how often the Risk Management File will be reviewed in its entirety.
    const monthSelect =  page.getByRole("radio" , {name : "Every 6 months"});
    await monthSelect.click();

    //Which Lifecycle stages are applicable to the medical device
    for(let i = 0 ; i < 5 ; i++){
        await page.locator("[role='switch']").nth(i).click()
    }

    //click Save and Mark Section Complete
    const saveBtn  = page.getByRole("button" , {name : "Save"});
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    //click Mark Section Complete after waiting toast dissapear
    const toast = page.locator("li[role='status']");
    await expect(toast).toHaveText("Risk Management saved successfully", { timeout: 60000 });
    await toast.waitFor({ state: "hidden" });

    const completeBtn = page.getByRole('button' , {name : " Mark Section Complete"});
    await expect(completeBtn).toBeVisible();
    await expect(completeBtn).toBeEnabled();   
    //progress bar validating after section completing
    await completeBtn.click();
    // await this.page.waitForTimeout(6000);
    const progressBar = page.locator('[role="progressbar"]');
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

    await page.pause();

})