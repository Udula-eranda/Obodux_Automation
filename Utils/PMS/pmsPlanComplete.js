const { PMSPlanPage } = require('../../PomModels/pmsPlanPom');
const { pmsPlanData } = require('../testData');

async function pmsPlanComplete(page) {
    const pmsPage = new PMSPlanPage(page);

    await pmsPage.navigateToPMSPlan();
    await page.waitForTimeout(2000);

    await pmsPage.fillDataCollectionTable(pmsPlanData.dataCollection);
    await page.waitForTimeout(1000);

    // Non-Collected Data — to be implemented later per user instructions
    // await pmsPage.fillNonCollectedData(pmsPlanData.nonCollectedData);

    await pmsPage.fillStandaloneSections();
    await page.waitForTimeout(1000);

    await pmsPage.selectPMCFExemptYes();
    await page.waitForTimeout(1000);

    await pmsPage.fillFrequencyPMS(pmsPlanData.frequencyPMS);
    await page.waitForTimeout(1000);

    await pmsPage.saveAndComplete();
}

module.exports = { pmsPlanComplete };
