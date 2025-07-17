const {test , expect } = require('@playwright/test')
const { loginAndOnboardDevice } =  require('../Utils/deviceOnboard')


test('Device Information Automation' , async ({page}) => {
    test.setTimeout(90000);
    await loginAndOnboardDevice(page);
    await page.waitForTimeout(6000);
    //deviceInfo Page
    const firstItem =  page.locator("div.grid div.cursor-pointer").first();
    await firstItem.waitFor({state : 'visible'});
    await expect(firstItem).toBeEnabled();
    await firstItem.click();
    
    //Navigate to Device Information Page
    await page.getByRole("link" , {name : "Device Information"}).click();
    //click Add new device bttn
    const AddNewBtn =  page.getByRole("button" , {name : "Add New"});
    await expect(AddNewBtn).toBeVisible();
    await expect(AddNewBtn).toBeEnabled();
    await AddNewBtn.click();

    
    //renaming the device
    const deviceNameField = page.locator("input[value*='Device']");
    await deviceNameField.fill("Steathoscope Device Automate");

    //Accessor Description
    const accessDesc = page.locator("[class*='min-h-16']").nth(0);
    await accessDesc.click();
    //Ai feature catching
    const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn.click();
    await page.waitForTimeout(8000);
    //wait to AI to generate
    await accessDesc.waitFor({ state: 'visible' });
    await expect(accessDesc).not.toHaveText("");
    await aiBtn.click();

    //Principles of Operation
    const principleOperation = page.locator("[class*='min-h-16']").nth(1);
    await principleOperation.click();
    //Ai feature catching
    const aiBtn2 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn2.click();
    await page.waitForTimeout(8000);
    //wait to AI to generate
    await principleOperation.waitFor({ state: 'visible' });
    await expect(principleOperation).not.toHaveText("");
    await aiBtn2.click();

    //Intended Purpose
    const intendPurpose = page.locator("[class*='min-h-16']").nth(2);
    const editableField = intendPurpose.locator('[contenteditable="true"]');
    await editableField.click();
    await editableField.fill("Test Syringe");
    // //Ai feature catching
    // const aiBtn3 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    // await aiBtn3.click();
    // //wait to AI to generate
    // await intendPurpose.waitFor({ state: 'visible' });
    // await expect(intendPurpose).not.toHaveText("");
    // await page.waitForTimeout(8000);
    // await aiBtn3.click();

    //Clinical Benefits
    const cliniBenefit  = page.locator("[class*='min-h-16']").nth(3);
    const editableField1 = cliniBenefit.locator('[contenteditable="true"]');
    await editableField1.click();
    await editableField1.fill("Test Automate");
    // //Ai feature catching
    // const aiBtn4 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    // await aiBtn4.click();
    // //wait to AI to generate
    // await cliniBenefit.waitFor({ state: 'visible' });
    // await expect(cliniBenefit).not.toHaveText("");
    // await page.waitForTimeout(8000);
    // await aiBtn4.click();

    //Known Side Effects
    const knownSide = page.locator("[class*='min-h-16']").nth(4);
    const editableField2 = knownSide.locator('[contenteditable="true"]');
    await editableField2.click();
    await editableField2.fill("Test Automate");
    // //Ai feature catching
    // const aiBtn5 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    // await aiBtn5.click();
    // //wait to AI to generate
    // await knownSide.waitFor({ state: 'visible' });
    // await expect(knownSide).not.toHaveText("");
    // await page.waitForTimeout(8000);
    // await aiBtn5.click();

    //Contradictions
    const contradic = page.locator("[class*='min-h-16']").nth(5);
    const editableField3 = contradic.locator('[contenteditable="true"]');
    await editableField3.click();
    await editableField3.fill("Test Automate");
    // //Ai feature catching
    // const aiBtn6 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    // await aiBtn6.click();
    // //wait to AI to generate
    // await contradic.waitFor({ state: 'visible' });
    // await expect(contradic).not.toHaveText("");
    // await page.waitForTimeout(8000);
    // await aiBtn6.click();

    //Clinical Use Settings
    const clinUseSetting = page.locator("[class*='min-h-16']").nth(6);
    const editableField4 = clinUseSetting.locator('[contenteditable="true"]');
    await editableField4.click();
    await editableField4.fill("Test Automate");
    // //Ai feature catching
    // const aiBtn7 =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    // await aiBtn7.click();
    // //wait to AI to generate
    // await clinUseSetting.waitFor({ state: 'visible' });
    // await expect(clinUseSetting).not.toHaveText("");
    // await page.waitForTimeout(8000);
    // await aiBtn7.click();

    //Intended Users
    const intendUsers = page.locator("[class*='min-h-16']").nth(7);
    const editableField5 = intendUsers.locator('[contenteditable="true"]');
    await editableField5.click();
    await editableField5.fill("Eye Patients");

    //Intended Patient Population
    const PatientCount = page.locator("[class*='cursor-text']").last();
    await PatientCount.click();
    await PatientCount.fill("10000");

    //Radio option
    const radioBtn = page.getByRole('radio' , {name : "No"});
    await radioBtn.check();

    //click Save option
    const saveBtn  = page.getByRole("button" , {name : "Save"});
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    await page.pause();

})