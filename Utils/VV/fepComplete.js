const { FEPPage } = require('../../PomModels/fepPom');

async function fepComplete(page) {

    const fep = new FEPPage(page);

    // ── Navigate to FEP form (via Add New FEP in V&V sidebar) ─────────────────
    await fep.navigateToFEP();

    // ── 1. Name of Plan — keep as auto-assigned ───────────────────────────────
    //    (no action needed — system names it "01 Formative Evaluation Plan (FEP)")

    // ── 2. Select all available Medical Devices (checkboxes) ──────────────────
    await fep.selectAllDevices();

    // ── 3. Select all available User Interface Elements (checkboxes) ──────────
    await fep.selectAllUIElements();

    // ── 4. Write objective(s) of the Formative evaluations → AI Generate ──────
    await fep.aiGenerateObjectives();

    // ── 5. Is Usability testing being conducted? → Yes ────────────────────────
    await fep.selectUsabilityTestingYes();
    console.log('FEP: Usability testing → Yes ✓');

    // ── 6–10. AI Generate all 5 post-Yes fields ───────────────────────────────
    await fep.aiGeneratePostYesFields();

    // ── 11. Save → wait for toast → Mark Section Complete ─────────────────────
    await fep.saveFEP();
    console.log('FEP: Complete ✓');

}

module.exports = { fepComplete };
