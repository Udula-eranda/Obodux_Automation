const { test } = require("@playwright/test");
const { loginAndOnboardDevice } = require("../Utils/deviceOnboard");
const { deviceInfoPage } = require("../PomModels/deviceInfoPom");
const { cerDoc } = require("../PomModels/cerdocPom");

test('CER Document – Onboard device then complete CER only', async ({ page }) => {

    test.setTimeout(1500000);

    // ── Step 1: Login + onboard a fresh device ────────────────────────────────
    await loginAndOnboardDevice(page);
    await page.waitForTimeout(15000);

    // ── Step 2: Click into the newly onboarded device ─────────────────────────
    const deviceInfo = new deviceInfoPage(page);
    await deviceInfo.clickFirstItem();
    await page.waitForTimeout(3000);

    // ── Step 3: Open CER accordion ────────────────────────────────────────────
    const ceReportDoc = new cerDoc(page);
    await ceReportDoc.openCERSection();
    await page.waitForTimeout(3000);

    // ── Step 4: Fill all CER sections in order ────────────────────────────────

    // 1. State of the Art — 9 AI-filled richtext fields
    await ceReportDoc.stateOfArtSection();

    // 2. Pre-Clinical Data — 3 tables (textbox inputs) + 2 richtext fields (AI)
    await ceReportDoc.preClinicalData();

    // 3. Clinical Evaluation Overview — checkbox + justification richtext
    await ceReportDoc.clinicalEvalOverview();

    // 4. Clinical Data Generated and Held by the Manufacturer — radio + richtext
    await ceReportDoc.clinicalDataManufacturer();

    // 5. Clinical Data from Literature — 2 richtext fields (AI)
    await ceReportDoc.clinicalDataLiterature();

    // 6. Other Sources of Clinical Data — 1 richtext field (AI)
    await ceReportDoc.otherSourcesClinicalData();

    // 7. Summary and Appraisal of Clinical Data — 9-column table (textbox inputs)
    await ceReportDoc.summaryAppraisalClinicalData();

    // 8. Analysis of the Clinical Data in Relation to GSPRs — 4 × Yes/No + justification
    await ceReportDoc.analysisGSPRs();

    // 9. Acceptability to the Objectives — 3 richtext fields (AI)
    await ceReportDoc.acceptabilityObjectives();

    // 10. Conclusion — richtext (AI) + review frequency radio + date picker
    await ceReportDoc.conclusion();

    // 11. Qualifications of the Responsible Evaluators — 2 rows: name, job title, responsibility, qualifications + CV
    await ceReportDoc.qualificationsEvaluators();

    // 12. Changes — 2 rows: index number + applied change
    await ceReportDoc.changesSection();

    // 13. Equivalence Table — 5 characteristic rows + 4 justification rows
    await ceReportDoc.equivalenceTable();

    // ── Step 5: Save + Mark Section Complete ──────────────────────────────────
    await ceReportDoc.cerSaveAndComplete();

});
