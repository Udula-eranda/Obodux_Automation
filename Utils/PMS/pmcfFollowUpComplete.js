const { PMCFFollowUpPage } = require('../../PomModels/pmcfFollowUpPom');
const { pmcfData } = require('../testData');

async function pmcfFollowUpComplete(page) {
    const pmcf = new PMCFFollowUpPage(page);

    await pmcf.navigateToPMCF();
    await page.waitForTimeout(2000);

    await pmcf.fillIntroductionSection(pmcfData.introduction);
    await page.waitForTimeout(1000);

    await pmcf.fillPMCFActivitiesSection(pmcfData.activities, pmcfData.evaluationReportDate);
    await page.waitForTimeout(1000);

    await pmcf.fillRefToTechnicalDocumentation(pmcfData.technicalDocumentation);
    await page.waitForTimeout(1000);

    await pmcf.fillEquivalentDeviceSection(pmcfData.equivalentDevices);
    await page.waitForTimeout(1000);

    await pmcf.fillStandardsSection(pmcfData.guidanceOnPMCF);
    await page.waitForTimeout(1000);

    await pmcf.saveAndComplete();
}

module.exports = { pmcfFollowUpComplete };
