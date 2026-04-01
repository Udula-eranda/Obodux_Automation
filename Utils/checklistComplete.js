const { ChecklistPage } = require('../PomModels/checklistPom')
const { checklistData } = require('./testData')

async function checklistComplete(page) {

    const checklist = new ChecklistPage(page);

    // ── Navigate to Checklist section ─────────────────────────────────────────
    await checklist.navigateToChecklist();

    // ── Applicable Standards – fill the 2 pre-existing rows ──────────────────
    const { applicableStandards } = checklistData;

    await checklist.fillApplicableStandardRow(
        0,
        applicableStandards[0].standard,
        applicableStandards[0].year,
        applicableStandards[0].clauses,
        applicableStandards[0].justification
    );

    await checklist.fillApplicableStandardRow(
        1,
        applicableStandards[1].standard,
        applicableStandards[1].year,
        applicableStandards[1].clauses,
        applicableStandards[1].justification
    );

    // Save Applicable Standards
    await checklist.saveApplicableStandards();
    await checklist.validateApplicableStandardsSaved();

    // ── GSPR – General Safety & Performance Requirements ──────────────────────
    await checklist.navigateToGSPRSection();

    // Process all GSPR rows one by one: Yes (Applicable) → Methods → Docs → Yes (Met Requirement)
    await checklist.processAllGSPRRows();

    // Save GSPR section
    await checklist.saveGSPR();
    await checklist.validateGSPRSaved();

    // Mark the Checklist section as complete
    await checklist.markSectionComplete();

    // Log any sidebar sections that still lack the completion icon
    await checklist.logIncompleteSections();

}

module.exports = { checklistComplete }
