const { expect } = require('@playwright/test');

class riskAnalysisMatrixForm {

    constructor(page) {
        this.page = page;
    }

    // Open the popup for a row, fill all fields, then save
    async fillRowViaPopup(rowIndex, data) {

        // Click the 3-dot action img button on the row to open dropdown
        const row = this.page.locator('table tbody tr').nth(rowIndex);
        const actionBtn = row.getByRole('img');
        await actionBtn.scrollIntoViewIfNeeded();
        await actionBtn.click();
        await this.page.waitForTimeout(500);

        // Click the first menu item (Edit / Update row option)
        const firstMenuItem = this.page.getByRole('menuitem').first();
        await firstMenuItem.waitFor({ state: 'visible', timeout: 5000 });
        await firstMenuItem.click();
        await this.page.waitForTimeout(1000);

        const dialog = this.page.locator('[role="dialog"], [data-radix-dialog-content], [class*="sheet"]').first();
        await dialog.waitFor({ state: 'visible', timeout: 10000 });

        // ── Text fields ────────────────────────────────────────────────────────
        // Risk Ref Number is a regular input (auto-filled) — not contenteditable, so nth(0)
        // below starts at the Hazard field directly.
        const editables = dialog.locator('[contenteditable="true"]');
        const textValues = [
            data.hazard,
            data.sequenceOfEvents,
            data.hazardousSituation,
            data.harm,
            data.riskControlMeasures,
            data.riskControlAnalysis,
            data.riskControlVerification,
            data.gsprReference,
        ];

        for (let i = 0; i < textValues.length; i++) {
            const field = editables.nth(i);
            await field.scrollIntoViewIfNeeded();
            await field.click();
            await field.fill(textValues[i]);
            await this.page.waitForTimeout(150);
        }

        // ── Dropdowns ─────────────────────────────────────────────────────────
        // [0] Prior Severity  [1] Prior Occurrence  [2] Risk Control Option
        // [3] Post Severity   [4] Post Occurrence
        // (Risk Level and other fields are auto-fetched — not interacted with)
        const dropdowns = dialog.locator('[role="combobox"], button[aria-haspopup="listbox"], [data-radix-select-trigger]');

        // Prior Severity
        await dropdowns.nth(0).click();
        await this.page.waitForTimeout(500);
        await this.page.locator('[role="option"]').filter({ hasText: data.priorSeverity }).first().click();
        await this.page.waitForTimeout(300);

        // Prior Occurrence
        await dropdowns.nth(1).click();
        await this.page.waitForTimeout(500);
        await this.page.locator('[role="option"]').filter({ hasText: data.priorOccurrence }).first().click();
        await this.page.waitForTimeout(300);

        // Risk Control Option
        await dropdowns.nth(2).click();
        await this.page.waitForTimeout(500);
        await this.page.locator('[role="option"]').filter({ hasText: data.riskControlOption }).first().click();
        await this.page.waitForTimeout(300);

        // Post Severity
        await dropdowns.nth(3).click();
        await this.page.waitForTimeout(500);
        await this.page.locator('[role="option"]').filter({ hasText: data.postSeverity }).first().click();
        await this.page.waitForTimeout(300);

        // Post Occurrence
        await dropdowns.nth(4).click();
        await this.page.waitForTimeout(500);
        await this.page.locator('[role="option"]').filter({ hasText: data.postOccurrence }).first().click();
        await this.page.waitForTimeout(300);

        // ── Save popup ─────────────────────────────────────────────────────────
        const saveBtn = dialog.getByRole('button', { name: /save/i }).first();
        await saveBtn.scrollIntoViewIfNeeded();
        await saveBtn.click();
        await this.page.waitForTimeout(1000);

        console.log(`RAM row ${rowIndex + 1} popup filled ✓`);
    }

    // ── Delete Row ─────────────────────────────────────────────────────────────
    async deleteRow() {

        const option4Btn = this.page.getByRole('row', { name: '004 Type... Type... Type...' }).getByRole('img');
        await expect(option4Btn).toBeVisible();
        await expect(option4Btn).toBeEnabled();
        await option4Btn.click();

        const delteBtn = this.page.getByRole('button', { name: 'Delete Row' });
        await delteBtn.waitFor({ state: 'visible' });
        await delteBtn.click();

        const confirmDialog = this.page.getByRole('dialog');
        await expect(confirmDialog).toBeVisible();

        const confirmDeleteBtn = confirmDialog.getByRole('button', { name: 'Yes, Delete' });
        await confirmDeleteBtn.waitFor({ state: 'visible' });
        await confirmDeleteBtn.click();
    }

    // ── Save & Mark Section Complete ───────────────────────────────────────────
    async clickSaveAndComplete() {

        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible();
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();

        const toast = this.page.locator("li[role='status']");
        await expect(toast).toHaveText('Risk Analysis Matrix saved successfully');
        await toast.waitFor({ state: 'hidden' });

        await this.page.waitForTimeout(7000);
        const completeBtn = this.page.getByRole('button', { name: ' Mark Section Complete' });
        await expect(completeBtn).toBeVisible();
        await expect(completeBtn).toBeEnabled();
        await completeBtn.click();

        await this.page.waitForTimeout(6000);
        const toast2 = this.page.locator("li[role='status']");
        await expect(toast2).toBeVisible();
        await expect(toast2).toHaveText('Updated successfully');
        await toast2.waitFor({ state: 'hidden' });

        const progressBar = this.page.locator('[role="progressbar"]');
        const initialStyle = await progressBar.evaluate(el => window.getComputedStyle(el).transform);
        console.log('Before:', initialStyle);

        await expect.poll(async () => {
            return await progressBar.evaluate(el => window.getComputedStyle(el).transform);
        }, {
            timeout: 10000,
            interval: 500,
        }).toMatch(/matrix\(1, 0, 0, 1, 0, 0\)|none/);
    }
}

module.exports = { riskAnalysisMatrixForm };
