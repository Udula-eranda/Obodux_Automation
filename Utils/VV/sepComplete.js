const { SEPPage } = require('../../PomModels/sepPom');
const { sepData } = require('../testData');

async function sepComplete(page) {

    const sep = new SEPPage(page);

    // ── Navigate to SEP ───────────────────────────────────────────────────────
    await sep.navigateToSEP();

    // ── Section 1: Will the evaluation involve a Usability Test? → Yes ────────
    await sep.selectUsabilityTestYes();
    console.log('SEP: Usability Test → Yes ✓');

    // ── Section 2: Medical Devices being Evaluated → select all options ───────
    await sep.selectAllDevices();
    console.log('SEP: Medical Devices selected ✓');

    // ── Section 3: General Methodology Used → AI Generate ────────────────────
    await sep.aiGenerate('general-methodology-used');
    console.log('SEP: General Methodology → AI Generated ✓');

    // ── Section 4: Rationale for Methodology Used → AI Generate ──────────────
    await sep.aiGenerate('rationale-for-methodology-used');
    console.log('SEP: Rationale for Methodology → AI Generated ✓');

    // ── Section 5: Part of the User Interface being Evaluated → first option ──
    await sep.selectFirstUIOption();
    console.log('SEP: UI Option selected ✓');

    // ── Section 6: Adequacy of Information for Safety → N/A ──────────────────
    await sep.selectAdequacyNA();
    console.log('SEP: Adequacy → N/A ✓');

    // ── Section 7: Purpose of Usability Test → AI Generate ───────────────────
    await sep.aiGenerate('purpose-of-usability-test-sep');
    console.log('SEP: Purpose of Usability Test → AI Generated ✓');

    // ── Section 8: Overview of Test Methods → AI Generate ────────────────────
    await sep.aiGenerate('overview-of-test-methods-sep');
    console.log('SEP: Overview of Test Methods → AI Generated ✓');

    // ── Section 9: Will accompanying documents be provided? → Yes + upload ────
    await sep.selectAccompanyingDocsYes();
    await sep.aiGenerate('accompanying-documents-provided-sep');
    await sep.uploadAccompanyingDoc(sepData.uploadFilePath);
    console.log('SEP: Accompanying Documents → Yes, generated, uploaded ✓');

    // ── Section 10: Will training be provided? → No ───────────────────────────
    await sep.selectTrainingNo();
    console.log('SEP: Training → No ✓');

    // ── Sections 11–16: Rich text fields → AI Generate each ──────────────────
    await sep.aiGenerate('planned-test-environment-sep');
    console.log('SEP: Planned Test Environment → AI Generated ✓');

    await sep.aiGenerate('rationale-test-environment-sep');
    console.log('SEP: Rationale for Test Environment → AI Generated ✓');

    await sep.aiGenerate('characteristics-test-participants-sep');
    console.log('SEP: Characteristics of Test Participants → AI Generated ✓');

    await sep.aiGenerate('rationale-selection-test-participants-sep');
    console.log('SEP: Rationale for Selection of Test Participants → AI Generated ✓');

    await sep.fillTestParticipantGroupings(sepData.testParticipantGroupings);
    console.log('SEP: Test Participant Groupings → filled ✓');

    await sep.aiGenerate('rationale-test-participant-groupings-sep');
    console.log('SEP: Rationale for Test Participant Groupings → AI Generated ✓');

    // ── Section 17: Correct Use / List of Tasks → 2 rows ─────────────────────
    await sep.addCorrectUseRow();
    await sep.fillCorrectUseRow(0, sepData.correctUseTasks[0]);
    await sep.addCorrectUseRow();
    await sep.fillCorrectUseRow(1, sepData.correctUseTasks[1]);
    console.log('SEP: Correct Use / List of Tasks → 2 rows filled ✓');

    // ── Section 18: Method of Collecting Data → AI Generate ──────────────────
    await sep.aiGenerate('method-of-collecting-data-sep');
    console.log('SEP: Method of Collecting Data → AI Generated ✓');

    // ── Section 19: Analysis of Data → AI Generate ───────────────────────────
    await sep.aiGenerate('analysis-of-data-sep');
    console.log('SEP: Analysis of Data → AI Generated ✓');

    // ── Save ──────────────────────────────────────────────────────────────────
    await sep.saveSEP();
    console.log('SEP: Saved ✓');

}

module.exports = { sepComplete };
