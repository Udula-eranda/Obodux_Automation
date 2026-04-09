const { test  , expect }  = require('@playwright/test')
const { riskAnalysisMatrixFormComplete }  = require('../Utils/riskAnalysisMatrixComplete')
const { riskMangmentReport } = require('../PomModels/riskManagemntReport')


test('riskMangmentReport' , async ({page}) => {


    test.setTimeout(3000000);

    
    await riskAnalysisMatrixFormComplete(page);

    const riskMangForm = new riskMangmentReport(page);

    //toggle up RiskAnlaysisMatrixForm
    const raMatixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatixFormBtn.click();

    //Open riskMangmntReport dropdown
    const riskMangmntForm = page.getByRole('button').filter({ hasText: /^$/ }).nth(5);
    await riskMangmntForm.click();

    //navigate to rmReport
    await page.getByText('List of high residual risks').click();


    //checkBox select
    const checkBox = page.getByRole('checkbox');
    await expect(checkBox).toBeVisible();
    await expect(checkBox).toBeEnabled();
    await checkBox.click();

    // Wait until RAM data is visible in the tables
    await page.waitForSelector('text=Incorrect size selection by user', { state: 'visible', timeout: 30000 });
    await page.waitForTimeout(2000);

    //Clinical benefits field
    const clinicalBenefits = page.locator("div[class*='border px-3']").nth(0);
    await clinicalBenefits.click();
    const aiBtn1 = page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn1.click();
    await page.waitForTimeout(8000);
    await clinicalBenefits.waitFor({ state: 'visible' });
    await expect(clinicalBenefits).not.toHaveText("");
    await aiBtn1.click();

    //Overall Residual Risk field
    const overallRisk = page.locator("div[class*='border px-3']").nth(1);
    await overallRisk.click();
    const aiBtn = page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
    await aiBtn.click();
    await page.waitForTimeout(8000);
    await overallRisk.waitFor({ state: 'visible' });
    await expect(overallRisk).not.toHaveText("");
    await aiBtn.click();

    //select radio
    await page.getByRole('radio', { name: "No" }).check();

    // ── Scroll to top then fill Individual B/R Analysis columns ─────────────
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    const brAnalysisTexts = [
        'The clinical benefits of the device outweigh this identified high residual risk. Post-market surveillance activities will continue to monitor the risk and implement further controls if required.',
        'The clinical benefit of the device is considered to outweigh this medium residual risk based on available clinical and pre-clinical evidence.',
        'The clinical benefit of the device is considered to outweigh this medium residual risk based on available clinical and pre-clinical evidence.',
    ];

    const brCells = page.locator('span.text-muted-foreground').filter({ hasText: 'Type...' });

    for (let i = 0; i < brAnalysisTexts.length; i++) {
        const cell = page.locator('span.text-muted-foreground').filter({ hasText: 'Type...' }).first();
        await cell.waitFor({ state: 'visible', timeout: 10000 });
        await cell.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await cell.click();
        await page.waitForTimeout(500);
        await page.keyboard.insertText(brAnalysisTexts[i]);
        await page.waitForTimeout(800);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
        console.log(`B/R Analysis row ${i + 1} filled ✓`);
    }

    //Save and Complete
    await riskMangForm.clickSaveNComplete();

    //getByRole('link', { name: 'Report Generation' })

    //navigate to Report Generation
    const reportGeneration =  page.getByRole('link', { name: 'Report Generation' });
    await expect(reportGeneration).toBeVisible();
    await expect(reportGeneration).toBeEnabled();
    await reportGeneration.click();

    //waiting the page to be load
    const pageTitle = page.getByText("CE Marking");
    await expect(pageTitle).toBeVisible();

    //Sending the report for authoriser
    await riskMangForm.sendForAuthorize1();

    await page.waitForTimeout(10000);

    await riskMangForm.sendForAuthorize2();

    await page.waitForTimeout(10000);

    await riskMangForm.sendForAuthorize3();

    await page.waitForTimeout(10000);

    await riskMangForm.sendForAuthorize4();

})