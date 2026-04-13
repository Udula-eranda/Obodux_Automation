const { expect } = require('@playwright/test');

class FEPPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateToFEP() {
        // "Add New FEP" lives in the V&V sidebar and is visible from any V&V sub-page.
        // If not already visible (e.g. first load), click the V&V sidebar link first.
        const addFepLocator = this.page.getByText(/Add New FEP/i).first();
        const alreadyVisible = await addFepLocator.isVisible().catch(() => false);

        if (!alreadyVisible) {
            await this.page.getByRole('link', { name: 'Verification and Validation' }).click();
            await this.page.waitForTimeout(3000);
            await this.page.waitForFunction(
                () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
                { timeout: 20000 }
            ).catch(() => {});
            await this.page.waitForTimeout(2000);
        }

        // Click "Add New FEP"
        await this.page.getByText(/Add New FEP/i).first().click();
        await this.page.waitForTimeout(3000);

        // Wait for the plan name input to confirm form loaded
        await this.page.locator('input[placeholder="Enter plan name"]')
            .waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
    }

    // ── Select Medical Devices being Evaluated ────────────────────────────────
    // Radix UI checkbox buttons (peer h-4 w-4 class pattern)

    async selectAllDevices() {
        const section = this.page.locator('div').filter({
            hasText: /Select the medical Devices being Evaluated/i
        }).last();
        await section.scrollIntoViewIfNeeded();

        const checkboxes = section.locator('[role="checkbox"]');
        const count = await checkboxes.count();
        for (let i = 0; i < count; i++) {
            await checkboxes.nth(i).click();
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(500);
        console.log(`FEP: Selected ${count} device(s) ✓`);
    }

    // ── Select User Interface Elements ────────────────────────────────────────

    async selectAllUIElements() {
        const section = this.page.locator('div').filter({
            hasText: /Select the User Interface element/i
        }).last();
        await section.scrollIntoViewIfNeeded();

        const checkboxes = section.locator('[role="checkbox"]');
        const count = await checkboxes.count();
        for (let i = 0; i < count; i++) {
            await checkboxes.nth(i).click();
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(500);
        console.log(`FEP: Selected ${count} UI element(s) ✓`);
    }

    // ── AI Generate helper ────────────────────────────────────────────────────
    // Clicks the sparkle button on a focused contenteditable, then accepts.

    async _aiGenerateEditor(editor, label) {
        await editor.scrollIntoViewIfNeeded();

        // Scroll into the custom scrollable container
        await editor.evaluate((el) => {
            const container = document.querySelector('.flex-1.overflow-y-auto');
            if (container) {
                const rect = el.getBoundingClientRect();
                const cRect = container.getBoundingClientRect();
                if (rect.top < cRect.top || rect.bottom > cRect.bottom) {
                    container.scrollTop += rect.top - cRect.top - 80;
                }
            }
        });
        await this.page.waitForTimeout(300);

        await editor.click();
        await this.page.waitForTimeout(600);

        // AI (sparkle) button
        const aiBtn = this.page.locator(
            '.inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg'
        ).first();

        try {
            await aiBtn.waitFor({ state: 'visible', timeout: 8000 });
        } catch {
            await editor.click();
            await this.page.waitForTimeout(800);
            await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
        }

        await aiBtn.click();

        // Wait for Accept (circle-check) button
        const acceptBtn = this.page.locator('button:has(svg.lucide-circle-check)').first();
        try {
            await acceptBtn.waitFor({ state: 'visible', timeout: 45000 });
            await acceptBtn.click();
            await this.page.waitForTimeout(500);
        } catch {
            // Accept button may not appear in all cases — continue
        }

        if (label) console.log(`FEP: "${label}" → AI Generated ✓`);
    }

    // ── Objectives — AI Generate (field 4) ───────────────────────────────────

    async aiGenerateObjectives() {
        const editor = this.page.locator('[contenteditable="true"]').first();
        await this._aiGenerateEditor(editor, 'Write the objective(s) of the Formative evaluations');
    }

    // ── Is Usability Testing → Yes (field 5) ─────────────────────────────────

    async selectUsabilityTestingYes() {
        const section = this.page.locator('div').filter({
            hasText: /Is Usability testing being conducted/i
        }).last();
        await section.scrollIntoViewIfNeeded();

        await section.locator('button').filter({ hasText: /^Yes$/i }).first().click();
        await this.page.waitForTimeout(2000); // wait for 5 new fields to render
    }

    // ── AI Generate all 5 post-Yes fields (fields 6–10) ──────────────────────
    // After clicking Yes, 5 new Tiptap contenteditable editors appear (indices 1–5).
    // Index 0 is the objectives field already filled above.

    async aiGeneratePostYesFields() {
        const fieldLabels = [
            'Tell the General Methodology used for the Formative Evaluation',
            'Write about the user groups involved in this Formative Evaluation',
            'Write about the test environment involved in this Formative Evaluation',
            'What accompanying documents will be provided during the Formative Evaluation',
            'What training will be provided during the Formative Evaluation',
        ];

        // Wait for all 5 new editors to be in the DOM (total should be 6)
        await this.page.waitForFunction(
            () => document.querySelectorAll('[contenteditable="true"]').length >= 6,
            { timeout: 15000 }
        ).catch(() => {});
        await this.page.waitForTimeout(500);

        const editors = this.page.locator('[contenteditable="true"]');
        const count = await editors.count();

        // Start from index 1 — index 0 is the objectives field already filled
        for (let i = 1; i < count; i++) {
            const label = fieldLabels[i - 1] || `Post-Yes field ${i}`;
            await this._aiGenerateEditor(editors.nth(i), label);
        }
    }

    // ── Save + Mark Section Complete ──────────────────────────────────────────

    async saveFEP() {
        await this.page.waitForTimeout(1000);

        // Click a neutral heading to trigger React state update
        await this.page.locator('h2, h3').first().click();
        await this.page.waitForTimeout(2000);

        // Click Save
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('FEP: Clicked Save');
        await this.page.waitForTimeout(2000);

        // Handle save toast (soft)
        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 5000 });
            await toast.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }

        await this.page.waitForTimeout(3000);

        // Mark Section Complete
        const completeBtn = this.page.getByRole('button', { name: /Mark Section Complete/i });
        await expect(completeBtn).toBeVisible({ timeout: 10000 });
        await expect(completeBtn).toBeEnabled();
        await completeBtn.click();
        console.log('FEP: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        // Handle completion toast (soft)
        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }
    }

}

module.exports = { FEPPage };
