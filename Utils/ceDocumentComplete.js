const { cerDoc } = require("../PomModels/cerdocPom");
const { cepDoc } = require("../PomModels/cepdocPom");
const { riskManagementPartialComplete } = require("../Utils/riskManagementReportPartial");
const { checklistComplete } = require("../Utils/checklistComplete");
const { vvOverviewComplete } = require("../Utils/VV/vvOverviewComplete");
const { uepComplete } = require("../Utils/VV/uepComplete");

async function cepDocumentComplete(page){

    // ── Step 1: Onboard + Device Info + RM Plan + IH + RAM + RM Report ────────
    await riskManagementPartialComplete(page);
    await page.waitForTimeout(5000);

    // ── Step 2: Fill the Checklist section ───────────────────────────────────
    await checklistComplete(page);
    await page.waitForTimeout(5000);

    // ── Step 3: Navigate to Clinical Evaluation section (CEP) ─────────────────
    const cePlanDoc = new cepDoc(page);
    await cePlanDoc.navigateToCEP();
    await page.waitForTimeout(6000);

    // ── Step 3: Fill CEP fields ───────────────────────────────────────────────
    await cePlanDoc.clinicalClaimsField();
    await cePlanDoc.anticipatedBenefitsField();
    await cePlanDoc.clinicalDataAppraisalPlan();
    await cePlanDoc.saveNcomplete();
    await page.waitForTimeout(5000);

    const ceReportDoc = new cerDoc(page);

    // ── Step 4: Open the CER accordion (text-based, robust) ──────────────────
    await ceReportDoc.openCERSection();
    await page.waitForTimeout(3000);

    // ── Step 5: CER Report sections ──────────────────────────────────────────

    //0. State of the Art — 9 richtext fields with AI
    await ceReportDoc.stateOfArtSection();
    await page.waitForTimeout(2000);

    //0b. Pre-Clinical Data — 3 tables + 2 richtext (AI)
    await ceReportDoc.preClinicalData();
    await page.waitForTimeout(2000);

    //1. Clinical Evaluation Overview — check first checkbox + fill equivalence justification
    await ceReportDoc.clinicalEvalOverview();

    //2. Clinical Data Generated and Held by the Manufacturer — select Yes + fill PMS summary
    await ceReportDoc.clinicalDataManufacturer();

    //3. Clinical Data from Literature — 2 fields with AI
    await ceReportDoc.clinicalDataLiterature();

    //4. Other Sources of Clinical Data — 2 fields with AI
    await ceReportDoc.otherSourcesClinicalData();

    //5. Summary and Appraisal of Clinical Data — table rows
    await ceReportDoc.summaryAppraisalClinicalData();

    //6. Analysis of the Clinical Data in Relation to GSPRs — random Yes/No + justification
    await ceReportDoc.analysisGSPRs();

    //7. Acceptability to the Objectives — AI filled (max 3 fields)
    await ceReportDoc.acceptabilityObjectives();

    //8. Conclusion — AI + Yearly + date picker
    await ceReportDoc.conclusion();

    //9. Qualifications of the Responsible Evaluators — 2 rows + CV upload
    await ceReportDoc.qualificationsEvaluators();

    //10. Changes — 2 rows
    await ceReportDoc.changesSection();

    //11. Equivalence Table — fill all fields
    await ceReportDoc.equivalenceTable();

    //Final Save and Mark Section Complete
    await ceReportDoc.cerSaveAndComplete();

    // ── Step 12: V&V Overview ─────────────────────────────────────────────────
    await vvOverviewComplete(page);
    await page.waitForTimeout(5000);

    // ── Step 13: UEP ─────────────────────────────────────────────────────────
    await uepComplete(page);
    await page.waitForTimeout(5000);

}

module.exports = { cepDocumentComplete }
