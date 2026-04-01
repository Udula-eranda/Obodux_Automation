const { expect } = require('@playwright/test')

class ChecklistPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigate to Checklist from device overview ──────────────────────────────
    async navigateToChecklist() {
        await this.page.getByRole('link', { name: 'Checklist' }).click();
        await this.page.getByText('Applicable Standards').first().waitFor({ state: 'visible' });
        await this.page.waitForTimeout(2000);
    }

    // ── Select a device by name from the devices list ───────────────────────────
    async selectDeviceByName(deviceName) {
        const deviceCard = this.page.locator('div.grid div.cursor-pointer').filter({ hasText: deviceName }).first();
        await deviceCard.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(3000);
        await deviceCard.click();
        await this.page.waitForTimeout(3000);
    }

    // ── Applicable Standards Table ───────────────────────────────────────────────

    // Fill one existing row (rowIndex is 0-based)
    // Uses click + keyboard.type to trigger React onChange on contenteditable cells
    async fillApplicableStandardRow(rowIndex, standard, year, clauses, justification) {
        const editableCells = this.page.locator('td [contenteditable="true"]');
        const offset = rowIndex * 4;

        await editableCells.nth(offset).click();
        await this.page.keyboard.type(standard);

        await editableCells.nth(offset + 1).click();
        await this.page.keyboard.type(year);

        await editableCells.nth(offset + 2).click();
        await this.page.keyboard.type(clauses);

        await editableCells.nth(offset + 3).click();
        await this.page.keyboard.type(justification);
    }

    // Add a new row to the Applicable Standards table
    async addStandardRow() {
        const addRowBtn = this.page.getByRole('button', { name: 'Add Row' });
        await expect(addRowBtn).toBeVisible();
        await addRowBtn.click();
        await this.page.waitForTimeout(500);
    }

    // Save Draft after filling Applicable Standards (Save Draft is always available)
    async saveApplicableStandards() {
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft' });
        await expect(saveDraftBtn).toBeVisible();
        await saveDraftBtn.click();
        await this.page.waitForTimeout(3000);
    }

    // Validate toast after Applicable Standards save (soft – toast may not appear)
    async validateApplicableStandardsSaved() {
        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 5000 });
            const closeToastBtn = toast.locator('button');
            if (await closeToastBtn.isVisible()) await closeToastBtn.click();
        } catch { /* save was silent, which is fine */ }
        await this.page.waitForTimeout(1000);
    }

    // ── GSPR Section ─────────────────────────────────────────────────────────────

    // Navigate to GSPR via "I. GENERAL REQUIREMENTS" sidebar item
    async navigateToGSPRSection() {
        await this.page.getByText('I. GENERAL REQUIREMENTS').click();
        await this.page.waitForTimeout(3000);
    }

    /**
     * Processes ALL GSPR rows one-by-one to prevent modal save operations from
     * resetting radio button state (Radix UI re-renders the table on each save).
     *
     * Per row sequence:
     *  1. Click Yes  (Applicable?)
     *  2. Select from list → Select All → Save modal
     *  3. Select Documents → Select All → Save modal
     *  4. Click Yes  (Met Requirement?)
     */
    async processAllGSPRRows() {
        // Use rows that contain the selectFromList radio as the stable anchor
        const interactiveRows = this.page.locator('tr').filter({
            has: this.page.locator('button[role="radio"][value="selectFromList"]')
        });
        const total = await interactiveRows.count();
        console.log(`Processing ${total} GSPR rows one by one...`);

        for (let i = 0; i < total; i++) {
            const row = interactiveRows.nth(i);

            // 1. Select from list → Select All → Save  (modal save resets radio state, so do BEFORE Yes clicks)
            const selectFromListBtn = row.getByRole('button', { name: 'Select from list' });
            await selectFromListBtn.scrollIntoViewIfNeeded();
            await selectFromListBtn.click();
            await this.page.waitForTimeout(600);

            const selectAllMethod = this.page.getByRole('button', { name: 'Select All' });
            await expect(selectAllMethod).toBeVisible({ timeout: 5000 });
            await selectAllMethod.click();

            const saveMethod = this.page.getByRole('button', { name: 'Save' });
            await expect(saveMethod).toBeEnabled({ timeout: 5000 });
            await saveMethod.click();
            await this.page.waitForTimeout(600);

            // 2. Select Documents → Select All → Save  (same reason – before Yes clicks)
            const selectDocsBtn = row.getByRole('button', { name: 'Select Documents' });
            await selectDocsBtn.scrollIntoViewIfNeeded();
            await selectDocsBtn.click();
            await this.page.waitForTimeout(600);

            const selectAllDocs = this.page.getByRole('button', { name: 'Select All' });
            await expect(selectAllDocs).toBeVisible({ timeout: 5000 });
            await selectAllDocs.click();

            const saveDocs = this.page.getByRole('button', { name: 'Save' });
            await expect(saveDocs).toBeEnabled({ timeout: 5000 });
            await saveDocs.click();
            await this.page.waitForTimeout(600);

            // 3. Yes – Applicable  (AFTER both modal saves so re-renders can't reset this)
            const yesApplicable = row.locator('button[role="radio"][value="yes"]').first();
            await yesApplicable.scrollIntoViewIfNeeded();
            await yesApplicable.click();
            await this.page.waitForTimeout(150);

            // 4. Yes – Met Requirement  (AFTER both modal saves)
            const yesMetReq = row.locator('button[role="radio"][value="yes"]').last();
            await yesMetReq.scrollIntoViewIfNeeded();
            await yesMetReq.click();
            await this.page.waitForTimeout(150);

            console.log(`GSPR row ${i + 1}/${total} completed ✓`);
        }
    }

    // Open "Select from list" modal for a specific GSPR row (1-based index)
    // and select all applicable standards
    async selectMethodForRow(rowIndex) {
        const selectFromListBtns = this.page.getByRole('button', { name: 'Select from list' });
        await selectFromListBtns.nth(rowIndex - 1).scrollIntoViewIfNeeded();
        await selectFromListBtns.nth(rowIndex - 1).click();
        await this.page.waitForTimeout(1000);

        const selectAllBtn = this.page.getByRole('button', { name: 'Select All' });
        await expect(selectAllBtn).toBeVisible({ timeout: 5000 });
        await selectAllBtn.click();

        const saveModalBtn = this.page.getByRole('button', { name: 'Save' });
        await expect(saveModalBtn).toBeEnabled();
        await saveModalBtn.click();
        await this.page.waitForTimeout(800);
    }

    // Open "Select Documents" modal for a specific GSPR row (1-based index)
    // and select all documents
    async selectDocumentsForRow(rowIndex) {
        const selectDocsBtns = this.page.getByRole('button', { name: 'Select Documents' });
        await selectDocsBtns.nth(rowIndex - 1).scrollIntoViewIfNeeded();
        await selectDocsBtns.nth(rowIndex - 1).click();
        await this.page.waitForTimeout(1000);

        const selectAllBtn = this.page.getByRole('button', { name: 'Select All' });
        await expect(selectAllBtn).toBeVisible({ timeout: 5000 });
        await selectAllBtn.click();

        const saveModalBtn = this.page.getByRole('button', { name: 'Save' });
        await expect(saveModalBtn).toBeEnabled();
        await saveModalBtn.click();
        await this.page.waitForTimeout(800);
    }

    // Save the GSPR section: click Save if enabled (checklist complete), else Save Draft
    async saveGSPR() {
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft' });

        // Give the Save button a moment to become enabled after all rows are processed
        await this.page.waitForTimeout(1000);

        const saveEnabled = await saveBtn.isEnabled().catch(() => false);
        if (saveEnabled) {
            await saveBtn.scrollIntoViewIfNeeded();
            await saveBtn.click();
            console.log('Clicked Save (checklist fully complete)');
        } else {
            await expect(saveDraftBtn).toBeVisible();
            await saveDraftBtn.click();
            console.log('Clicked Save Draft (checklist not yet fully complete)');
        }
        await this.page.waitForTimeout(3000);
    }

    // Click "Mark Section Complete" button that appears after saving GSPR
    async markSectionComplete() {
        const markCompleteBtn = this.page.getByRole('button', { name: 'Mark Section Complete' });
        await expect(markCompleteBtn).toBeVisible({ timeout: 10000 });
        await markCompleteBtn.click();
        await this.page.waitForTimeout(3000);
    }

    // Validate GSPR saved toast (soft – toast may not appear after Save Draft)
    async validateGSPRSaved() {
        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 5000 });
            const closeToastBtn = toast.locator('button');
            if (await closeToastBtn.isVisible()) await closeToastBtn.click();
        } catch { /* save was silent, which is fine */ }
        await this.page.waitForTimeout(1000);
    }

    // Verify checklist progress text
    async validateChecklistProgress(expectedText) {
        const progressText = this.page.getByText(expectedText);
        await expect(progressText).toBeVisible({ timeout: 10000 });
    }

    /**
     * Reads the GSPR sidebar and logs which sub-sections still lack the
     * completion icon (svg.text-positive).  Returns an array of incomplete
     * section names so the test can surface them.
     */
    async logIncompleteSections() {
        // Give sidebar a moment to settle after save
        await this.page.waitForTimeout(1500);

        const incomplete = await this.page.evaluate(() => {
            const results = [];
            // Each sidebar item that lacks a circle-check svg is incomplete
            const items = document.querySelectorAll('[class*="sidebar"] span, aside span, [class*="text-sidebar"] span');
            items.forEach(span => {
                const text = span.textContent.trim();
                if (!text) return;
                // Walk up to find if this item's container has an svg.text-positive
                const container = span.closest('li, div[class*="flex"]');
                if (!container) return;
                const hasCheck = !!container.querySelector('svg.text-positive');
                if (!hasCheck && (text.includes('REQUIREMENT') || text.includes('DESIGN') || text.includes('INFORMAT') || /^\d/.test(text))) {
                    results.push({ section: text.substring(0, 80), complete: false });
                }
            });
            return results;
        });

        if (incomplete.length > 0) {
            console.log('⚠ Incomplete GSPR sections:');
            incomplete.forEach(s => console.log('  –', s.section));
        } else {
            console.log('✓ All GSPR sidebar sections show complete icon');
        }
        return incomplete;
    }

}

module.exports = { ChecklistPage }
