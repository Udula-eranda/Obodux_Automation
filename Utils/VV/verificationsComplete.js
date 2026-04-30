const { verificationsData: vd } = require('../testData');

const FER  = vd.pdfs.fer;
const CPV  = vd.pdfs.cpv;
const GSPR = vd.pdfs.gspr;

// ── Low-level helpers ─────────────────────────────────────────────────────────

/**
 * Find the question paragraph by a unique text snippet, scroll to it via JS
 * (so the inner scroll container moves, not just the window), then click Yes
 * in the radiogroup that shares the same parent container.
 */
async function scrollToEl(page, locator, targetRatio = 0.4) {
    await locator.evaluate((el, ratio) => {
        const scroller = el.closest('.overflow-y-auto') || document.querySelector('.overflow-y-auto');
        if (!scroller) return;
        const sr = scroller.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        const contentY = er.top - sr.top + scroller.scrollTop;
        scroller.scrollTop = contentY - scroller.clientHeight * ratio;
    }, targetRatio);
}

async function clickYes(page, questionSnippet, sectionId) {
    // Scope by section ID so DOM mutations in other sections never interfere.
    // [data-state="unchecked"] ensures we always pick the next un-answered Yes radio.
    const yesBtn = page
        .locator(`#${sectionId} button[role="radio"][value="yes"][data-state="unchecked"]`)
        .first();
    await yesBtn.waitFor({ state: 'visible', timeout: 30000 });
    await scrollToEl(page, yesBtn, 0.4);
    await page.waitForTimeout(300);
    const box = await yesBtn.boundingBox();
    if (!box) {
        console.log(`  WARN: radio not visible for "${questionSnippet}"`);
        return;
    }
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(800);
    console.log(`  Yes → "${questionSnippet}" ✓`);
}

/**
 * Handle the upload modal that opens when the row's upload button is clicked.
 * Clicks the drag-drop zone, selects the file, clicks Upload,
 * then waits for the modal to close and the success toast to fully disappear
 * before returning.
 */
async function handleUploadModal(page, filePath) {
    const modal = page.getByRole('dialog');
    await modal.waitFor({ state: 'visible', timeout: 300000 });

    // Click the drag-and-drop zone to open the native file chooser
    const fcPromise = page.waitForEvent('filechooser');
    await modal.getByText('Click here or drag & drop your file.').click();
    const fc = await fcPromise;
    await fc.setFiles(filePath);
    await page.waitForTimeout(1000);

    // Click Upload button
    await modal.getByRole('button', { name: /^upload$/i }).click();

    // Wait for the modal to close completely
    await modal.waitFor({ state: 'hidden', timeout: 30000 });

    // Wait for the success toast to appear, then wait until it fully disappears
    const toast = page.locator("li[role='status']").first();
    try {
        await toast.waitFor({ state: 'visible', timeout: 6000 });
        console.log('  Toast visible – waiting for it to disappear...');
        await toast.waitFor({ state: 'hidden', timeout: 20000 });
        console.log('  Toast dismissed ✓');
    } catch {
        await page.waitForTimeout(500);
    }
    await page.waitForTimeout(300);
}

/**
 * Fill one upload-table row: doc number, doc title, then upload PDF via modal.
 */
async function fillRow(page, rowEl, docNumber, title, filePath) {
    await scrollToEl(page, rowEl, 0.4);
    await page.waitForTimeout(200);

    const inputs = rowEl.getByRole('textbox');
    await inputs.nth(0).click({ force: true });
    await inputs.nth(0).fill(docNumber);
    await inputs.nth(1).click({ force: true });
    await inputs.nth(1).fill(title);

    await rowEl.getByRole('button').last().click({ force: true });
    await page.waitForTimeout(800);

    await handleUploadModal(page, filePath);
}

/**
 * Fill all rows of one upload table.
 * Tables start empty (0 records) so Add Row is clicked before every row.
 * tableEl    : page.locator('table').nth(T)
 * addRowBtn  : page.locator('button').filter({ hasText: 'Add Row' }).nth(A)
 */
async function fillTable(page, tableEl, addRowBtn, rows, filePath) {
    for (let i = 0; i < rows.length; i++) {
        await scrollToEl(page, addRowBtn, 0.6);
        await page.waitForTimeout(200);
        await addRowBtn.click({ force: true });
        await page.waitForTimeout(600);
        const row = tableEl.locator('tbody tr').nth(i);
        await fillRow(page, row, rows[i].docNumber, rows[i].title, filePath);
        console.log(`    row ${i + 1}/${rows.length} ✓`);
    }
}

// ── Save and Complete ─────────────────────────────────────────────────────────

async function saveAndComplete(page) {
    const { expect } = require('@playwright/test');

    await page.waitForTimeout(1000);
    // Click outside the document area to flush React state and enable the Save button.
    // Clicking the left nav sidebar heading is safe and reliably outside the form.
    await page.getByText('Verifications', { exact: true }).first().click();
    await page.waitForTimeout(2000);

    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveBtn).toBeVisible({ timeout: 10000 });
    await expect(saveBtn).toBeEnabled({ timeout: 10000 });
    await saveBtn.click();
    console.log('Verifications: Save ✓');
    await page.waitForTimeout(2000);

    try {
        const toast = page.locator("li[role='status']");
        await expect(toast).toBeVisible({ timeout: 5000 });
        await toast.waitFor({ state: 'hidden', timeout: 15000 });
    } catch { /* toast not present */ }

    await page.waitForTimeout(2000);

    const completeBtn = page.getByRole('button', { name: /Mark Section Complete/i });
    await expect(completeBtn).toBeVisible({ timeout: 20000 });
    await expect(completeBtn).toBeEnabled({ timeout: 10000 });
    await completeBtn.click();
    console.log('Verifications: Mark Section Complete ✓');
    await page.waitForTimeout(3000);

    try {
        const toast2 = page.locator("li[role='status']");
        await expect(toast2).toBeVisible({ timeout: 5000 });
        await toast2.waitFor({ state: 'hidden', timeout: 15000 });
    } catch { /* toast not present */ }
}

// ── Main entry point ──────────────────────────────────────────────────────────

async function verificationsComplete(page) {
    // All tables and Add Row buttons are appended to the page in DOM order
    // as sections are answered Yes. T and A track the running offsets so each
    // section targets only its own tables / buttons.
    const tables  = page.locator('table');
    const addBtns = page.locator('button').filter({ hasText: 'Add Row' });
    let T = 0; // table index offset
    let A = 0; // Add Row button index offset

    // ── Section 1: Biological Evaluation ─────────────────────────────────────
    // 3 tables: Plan/Report (2 rows), Test Protocols (1 row), CVs (2 rows)
    console.log('\n── Section 1: Biological Evaluation ──');
    await clickYes(page, 'biological evaluation report conducted', 'biocompatibility');

    console.log('  Table 1: Plan/Report');
    await fillTable(page, tables.nth(T+0), addBtns.nth(A+0), vd.section1.planReport,    FER);
    console.log('  Table 2: Test Protocols');
    await fillTable(page, tables.nth(T+1), addBtns.nth(A+1), vd.section1.testProtocols, FER);
    console.log('  Table 3: CVs');
    await fillTable(page, tables.nth(T+2), addBtns.nth(A+2), vd.section1.cvs,           FER);
    T += 3; A += 3;

    // ── Section 2: EMC ───────────────────────────────────────────────────────
    // Q1 → Q2 → 4 tables (1 row each)
    console.log('\n── Section 2: EMC ──');
    await clickYes(page, 'electrically powered', 'emc');
    await clickYes(page, 'EMC testing conducted', 'emc');

    for (let t = 0; t < 4; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), [vd.section2.tables[t]], CPV);
    }
    T += 4; A += 4;

    // ── Section 3: Software V&V ───────────────────────────────────────────────
    // Q1 → Q2 → 5 tables (1 row each)
    console.log('\n── Section 3: Software V&V ──');
    await clickYes(page, 'contain software', 'software-vnv');
    await clickYes(page, 'software testing performed', 'software-vnv');

    for (let t = 0; t < 5; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), [vd.section3.tables[t]], GSPR);
    }
    T += 5; A += 5;

    // ── Section 4: Stability ──────────────────────────────────────────────────
    // 1 Yes → 2 tables (2 rows each)
    console.log('\n── Section 4: Stability ──');
    await clickYes(page, 'stability (including shelf life)', 'stability');

    for (let t = 0; t < 2; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), vd.section4.tables[t], FER);
    }
    T += 2; A += 2;

    // ── Section 5: Packaging ──────────────────────────────────────────────────
    // 1 Yes → 4 tables (1 row each)
    console.log('\n── Section 5: Packaging ──');
    await clickYes(page, 'packaging and/or transit', 'packaging-transit');

    for (let t = 0; t < 4; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), [vd.section5.tables[t]], CPV);
    }
    T += 4; A += 4;

    // ── Section 6: Sterilisation ──────────────────────────────────────────────
    // Sterilisation Yes → 2 tables (2 rows each)
    console.log('\n── Section 6: Sterilisation ──');
    await clickYes(page, 'Sterilisation testing performed', 'sterilisation');

    for (let t = 0; t < 2; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), vd.section6.sterilisation[t], GSPR);
    }
    T += 2; A += 2;

    // Cleaning Yes → 2 tables (1 row each)
    console.log('\n── Section 6: Cleaning ──');
    await clickYes(page, 'Cleaning, Disinfection testing', 'sterilisation');

    for (let t = 0; t < 2; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), [vd.section6.cleaning[t]], GSPR);
    }
    T += 2; A += 2;

    // ── Section 7: Connected Devices ─────────────────────────────────────────
    // 1 Yes → 2 tables (3 rows each)
    console.log('\n── Section 7: Connected Devices ──');
    await clickYes(page, 'connected to other devices', 'device-connections');

    for (let t = 0; t < 2; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), vd.section7.tables[t], FER);
    }
    T += 2; A += 2;

    // ── Section 8: MRI ────────────────────────────────────────────────────────
    // 1 Yes → 3 tables (1 row each)
    console.log('\n── Section 8: MRI ──');
    await clickYes(page, 'intended to be implanted', 'mri-safety');

    for (let t = 0; t < 3; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tables.nth(T+t), addBtns.nth(A+t), [vd.section8.tables[t]], CPV);
    }
    T += 3; A += 3;

    // ── Section 9: CMR Substances ─────────────────────────────────────────────
    // Main Yes → inline sub-table (Yes/Yes/No) → 4 upload tables (2 rows each)
    console.log('\n── Section 9: CMR Substances ──');
    await clickYes(page, 'CMR or endocrine-disrupting', 'cmr-substances');

    // Sub-table rows have radio buttons: Yes = index 0, No = index 1 within each row
    const cmrSubRows    = page.locator('#cmr-substances tr').filter({ has: page.locator('button[role="radio"]') });
    const cmrSubAnswers = vd.section9.subAnswers; // ["Yes", "Yes", "No"]
    for (let r = 0; r < cmrSubAnswers.length; r++) {
        const row      = cmrSubRows.nth(r);
        await scrollToEl(page, row, 0.4);
        await page.waitForTimeout(300);
        const btnIndex = cmrSubAnswers[r].toLowerCase() === 'yes' ? 0 : 1;
        const radioBtn = row.locator('button[role="radio"]').nth(btnIndex);
        await radioBtn.waitFor({ state: 'visible', timeout: 15000 });
        const box = await radioBtn.boundingBox();
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(600);
    }
    console.log('  CMR sub-table Yes/Yes/No ✓');
    await page.waitForTimeout(1000);

    // Scoped to #cmr-substances to avoid global T/A ambiguity with the sub-table
    const cmrSec         = page.locator('#cmr-substances');
    const cmrUploadTables = cmrSec.locator('table').filter({ hasNot: page.locator('button[role="radio"]') });
    const cmrUploadAddBtns = cmrSec.locator('button').filter({ hasText: 'Add Row' });
    for (let t = 0; t < 4; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, cmrUploadTables.nth(t), cmrUploadAddBtns.nth(t), vd.section9.tables[t], GSPR);
    }

    // ── Section 10: Medicinal Substances ──────────────────────────────────────
    console.log('\n── Section 10: Medicinal Substances ──');
    await clickYes(page, 'Does your device contain medicinal', 'medicinal-substances');
    const medSec = page.locator('#medicinal-substances');
    for (let t = 0; t < 5; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, medSec.locator('table').nth(t), medSec.locator('button').filter({ hasText: 'Add Row' }).nth(t), [vd.section10.tables[t]], FER);
    }

    // ── Section 11: Tissue / Cells ────────────────────────────────────────────
    console.log('\n── Section 11: Tissue / Cells ──');
    await clickYes(page, 'utilise tissue and cells', 'tissue-cells');
    const tcSec = page.locator('#tissue-cells');
    for (let t = 0; t < 7; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, tcSec.locator('table').nth(t), tcSec.locator('button').filter({ hasText: 'Add Row' }).nth(t), [vd.section11.tables[t]], CPV);
    }

    // ── Section 12: Absorbed Substances ───────────────────────────────────────
    console.log('\n── Section 12: Absorbed Substances ──');
    await clickYes(page, 'absorbed by or locally dispersed', 'absorbed-substances');
    const absSec = page.locator('#absorbed-substances');
    for (let t = 0; t < 8; t++) {
        console.log(`  Table ${t + 1}`);
        await fillTable(page, absSec.locator('table').nth(t), absSec.locator('button').filter({ hasText: 'Add Row' }).nth(t), [vd.section12.tables[t]], GSPR);
    }

    // Save Draft after completing sections 1-12 before entering section 13,
    // then wait for the save toast to fully disappear so it cannot be mistaken
    // for section 13's upload toast.
    {
        const saveDraftBtn = page.getByRole('button', { name: 'Save Draft', exact: true });
        try {
            await saveDraftBtn.waitFor({ state: 'visible', timeout: 8000 });
            await saveDraftBtn.click();
            console.log('  Save Draft after section 12 ✓');
            const draftToast = page.locator("li[role='status']").first();
            try {
                await draftToast.waitFor({ state: 'visible', timeout: 6000 });
                await draftToast.waitFor({ state: 'hidden', timeout: 15000 });
            } catch { /* no toast */ }
            await page.waitForTimeout(1000);
        } catch {
            // Save Draft not visible — skip
        }
    }

    // ── Section 13: Performance / Safety / Other ──────────────────────────────
    // Clicking any "Click to edit" cell opens a full row-edit modal with fields:
    // Document number (input), Title of V/V (input), Upload document (file),
    // Aim/Objective (textarea), Summary of Methods Used (textarea), Summary of Results (textarea).
    // Save button submits everything and closes the modal.
    console.log('\n── Section 13: Performance / Safety / Other ──');

    const s13Table = page.locator('#performance-safety-other table').first();
    await s13Table.waitFor({ state: 'visible', timeout: 30000 });

    const s13AddBtn = page.locator('#performance-safety-other button').filter({ hasText: 'Add Row' }).first();
    await s13AddBtn.waitFor({ state: 'visible', timeout: 15000 });

    for (let i = 0; i < vd.section13.rows.length; i++) {
        const rowData = vd.section13.rows[i];

        // 1. Click Add Row
        await scrollToEl(page, s13AddBtn, 0.6);
        await page.waitForTimeout(300);
        await s13AddBtn.click({ force: true });
        await page.waitForTimeout(800);

        // 2. Click the first editable cell of the new row to open the edit modal
        const lastRow = s13Table.locator('tbody tr').last();
        await lastRow.waitFor({ state: 'visible', timeout: 10000 });
        await scrollToEl(page, lastRow, 0.4);
        await page.waitForTimeout(300);
        await lastRow.locator('td').nth(1).click({ force: true });

        // 3. Wait for the row-edit modal to open
        const modal = page.getByRole('dialog');
        await modal.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`  Section 13 row ${i + 1}: modal opened ✓`);

        // Modal fields in order (getByRole('textbox') matches inputs and textareas):
        // nth(0) = Document number, nth(1) = Title of V/V,
        // nth(2) = Aim/Objective, nth(3) = Summary of Methods Used, nth(4) = Summary of Results

        // 4. Fill Document number
        await modal.getByRole('textbox').nth(0).click();
        await modal.getByRole('textbox').nth(0).fill(rowData.docNumber);

        // 5. Fill Title of V/V
        await modal.getByRole('textbox').nth(1).click();
        await modal.getByRole('textbox').nth(1).fill(rowData.title);

        // 6. Upload file via drag-drop zone and wait for upload toast to fully clear.
        // Brief pause after setFiles ensures any stale toast from previous operations
        // has cleared before we look for the upload-specific toast.
        const fcPromise = page.waitForEvent('filechooser');
        await modal.getByText('Click here or drag & drop your file.').click();
        const fc = await fcPromise;
        await fc.setFiles(i === 0 ? FER : CPV);
        await page.waitForTimeout(1000); // let any lingering toast clear before watching for upload toast
        const uploadToast = page.locator("li[role='status']").first();
        try {
            await uploadToast.waitFor({ state: 'visible', timeout: 10000 });
            console.log('  Upload toast visible – waiting...');
            await uploadToast.waitFor({ state: 'hidden', timeout: 20000 });
            console.log('  Upload toast dismissed ✓');
        } catch {
            await page.waitForTimeout(2000);
        }

        // 7. Fill Aim / Objective
        await modal.getByRole('textbox').nth(2).click();
        await modal.getByRole('textbox').nth(2).fill(rowData.aim);

        // 8. Fill Summary of Methods Used
        await modal.getByRole('textbox').nth(3).click();
        await modal.getByRole('textbox').nth(3).fill(rowData.methods);

        // 9. Fill Summary of Results
        await modal.getByRole('textbox').nth(4).click();
        await modal.getByRole('textbox').nth(4).fill(rowData.results);

        // 10. Save — closes the modal and persists the row
        await modal.getByRole('button', { name: /^save$/i }).click();
        await modal.waitFor({ state: 'hidden', timeout: 30000 });

        // 11. Wait for success toast
        const toast = page.locator("li[role='status']").first();
        try {
            await toast.waitFor({ state: 'visible', timeout: 6000 });
            console.log('  Toast visible – waiting for it to disappear...');
            await toast.waitFor({ state: 'hidden', timeout: 20000 });
            console.log('  Toast dismissed ✓');
        } catch {
            await page.waitForTimeout(500);
        }

        console.log(`  Section 13 row ${i + 1} filled ✓`);
    }

    await saveAndComplete(page);
    console.log('\nVerifications: All 13 sections complete ✓');
}

module.exports = { verificationsComplete };
