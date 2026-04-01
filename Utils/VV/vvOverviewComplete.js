const { VVPage } = require('../../PomModels/vvPom');
const { vvData } = require('../testData');

async function vvOverviewComplete(page) {

    const vv = new VVPage(page);

    // ── Navigate to V&V → V&V Overview is the default landing page ───────────
    await vv.navigateToVV();

    const rows = vvData.overviewRows.slice(0, 2);

    // ── Fill the first pre-existing row ───────────────────────────────────────
    await vv.fillOverviewRow(
        0,
        rows[0].vvNumber,
        rows[0].title,
        rows[0].aim,
        rows[0].methods,
        rows[0].results
    );

    // ── Add and fill remaining rows ───────────────────────────────────────────
    for (let i = 1; i < rows.length; i++) {
        await vv.addRow();
        await vv.fillOverviewRow(
            i,
            rows[i].vvNumber,
            rows[i].title,
            rows[i].aim,
            rows[i].methods,
            rows[i].results
        );
        console.log(`V&V Overview row ${i + 1}/${rows.length} filled ✓`);
    }

    // ── Save and Mark Section Complete ───────────────────────────────────────
    await vv.saveAndComplete();

}

module.exports = { vvOverviewComplete };
