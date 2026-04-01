const { VVPage } = require('../../PomModels/vvPom');
const { uepData } = require('../testData');

async function uepComplete(page) {

    const vv = new VVPage(page);

    // ── Navigate to UEP ───────────────────────────────────────────────────────
    await vv.navigateToUEP();

    // ── Q1: Is the Usability Process controlled through a QMS Procedure? ──────
    await vv.selectYesAndUpload(
        'Is the Usability Process controlled through a QMS Procedure?',
        'Upload the Procedure that governs the Usability Process',
        uepData.q1DocNumber,
        uepData.filePath
    );

    // ── Q2: Action Required — auto-filled from IHR, skip ─────────────────────

    // ── Q3: Has the Task and Use Error Analysis been completed? ───────────────
    await vv.selectYesAndUpload(
        'Has the Task and Use Error Analysis been completed?',
        'Task and Use Error Analysis',
        uepData.q3DocNumber,
        uepData.filePath
    );

    // ── Known and Foreseeable Hazards and Hazardous Situations ────────────────
    await vv.fillHazardsRow(0, uepData.knownHazards[0]);
    console.log('UEP: Known and Foreseeable Hazards row filled ✓');

    // ── Hazard Related User Scenarios for Summative Evaluation ────────────────
    await vv.fillHRUSRow(0, uepData.hazardUserScenarios[0]);
    console.log('UEP: Hazard Related User Scenarios row filled ✓');

    // ── User Interface Specification ──────────────────────────────────────────
    await vv.fillUISpecRow(0, uepData.uiSpecification[0]);
    console.log('UEP: User Interface Specification row filled ✓');

    // ── Save and Mark Section Complete ────────────────────────────────────────
    await vv.saveAndCompleteUEP();

}

module.exports = { uepComplete };
