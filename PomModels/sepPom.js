const { expect } = require('@playwright/test');

class SEPPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateToSEP() {
        const currentUrl = this.page.url();
        const sepUrl = currentUrl.replace(
            /\/verification-and-validation\/.*$/,
            '/verification-and-validation/summative-evaluation-plan'
        );
        await this.page.goto(sepUrl);
        await this.page.waitForTimeout(3000);

        // Wait for skeleton loaders to disappear
        await this.page.waitForFunction(() => {
            const c = document.querySelector('.flex-1.overflow-y-auto.px-4');
            return c && !c.querySelector('.animate-pulse');
        }, { timeout: 20000 });
        await this.page.waitForTimeout(1000);
    }

    // ── Section 1: Will the evaluation involve a Usability Test? ─────────────

    async selectUsabilityTestYes() {
        await this.page.locator('#will-evaluation-involve-usability-test [role=radio][value=yes]').click();
        await this.page.waitForTimeout(2000);
    }

    // ── Section 2: Medical Devices being Evaluated ────────────────────────────

    async selectAllDevices() {
        const dropdown = this.page.locator('#medical-devices-being-evaluated [role=combobox]');
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();
        await this.page.waitForTimeout(1500);

        // Select all available options in the popover
        const options = this.page.locator('[data-radix-popper-content-wrapper] [role=option]');
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            await options.nth(i).click();
            await this.page.waitForTimeout(300);
        }

        // Close dropdown by pressing Escape
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
    }

    // ── AI Generate helper ────────────────────────────────────────────────────
    // Clicks the sparkle (AI Generate) button for a given section ID,
    // then waits for and clicks the Accept (circle-check) button.

    async aiGenerate(sectionId) {
        const section = this.page.locator(`#${sectionId}`);
        await section.scrollIntoViewIfNeeded();

        // Scroll into view inside the custom scrollable container
        const editor = section.locator('[contenteditable]').first();
        await editor.evaluate((el) => {
            const container = document.querySelector('.flex-1.overflow-y-auto');
            if (container) {
                const elRect = el.getBoundingClientRect();
                const cRect = container.getBoundingClientRect();
                if (elRect.top < cRect.top || elRect.bottom > cRect.bottom) {
                    container.scrollTop += elRect.top - cRect.top - 80;
                }
            }
        });
        await this.page.waitForTimeout(300);

        // Focus the editor to reveal the AI button
        await editor.click();
        await this.page.waitForTimeout(600);

        // AI (sparkle) button — same class pattern as CER
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

        // Wait for Accept (circle-check) button and click it
        const acceptBtn = this.page.locator('button:has(svg.lucide-circle-check)').first();
        try {
            await acceptBtn.waitFor({ state: 'visible', timeout: 45000 });
            await acceptBtn.click();
            await this.page.waitForTimeout(500);
        } catch {
            // Accept button may not appear in all cases — continue
        }
    }

    // ── Test Participant Groupings — textarea fill ────────────────────────────
    // This field uses a textarea instead of contenteditable, so aiGenerate won't work on it

    async fillTestParticipantGroupings(text) {
        const section = this.page.locator('#test-participant-groupings-sep');
        await section.scrollIntoViewIfNeeded();
        const textarea = section.locator('textarea');
        if (await textarea.count() > 0) {
            await textarea.first().click();
            await this.page.waitForTimeout(300);
            await this.page.keyboard.insertText(text);
            await this.page.waitForTimeout(300);
        } else {
            // fallback: try contenteditable
            const editor = section.locator('[contenteditable]').first();
            await editor.click();
            await this.page.waitForTimeout(300);
            await this.page.keyboard.insertText(text);
        }
    }

    // ── Section 5: Part of the User Interface being Evaluated ─────────────────

    async selectFirstUIOption() {
        const section = this.page.locator('#part-of-user-interface-being-evaluated');
        await section.scrollIntoViewIfNeeded();

        // Click the first available checkbox/option
        const firstOption = section.locator('input[type=checkbox], [role=checkbox]').first();
        const optionCount = await firstOption.count();
        if (optionCount > 0) {
            await firstOption.click();
        } else {
            // Options may be rendered as clickable labels/divs
            const optionLabel = section.locator('label, [class*="option"]').first();
            await optionLabel.click();
        }
        await this.page.waitForTimeout(500);
    }

    // ── Section 6: Adequacy of Information for Safety → N/A ──────────────────

    async selectAdequacyNA() {
        await this.page.locator('#adequacy-of-information-for-safety [role=radio][value=na]').click();
        await this.page.waitForTimeout(500);
    }

    // ── Section 9: Accompanying Documents → Yes + rich text + upload ─────────

    async selectAccompanyingDocsYes() {
        await this.page.locator('#accompanying-documents-provided-sep [role=radio][value=yes]').click();
        await this.page.waitForTimeout(2000);
    }

    async uploadAccompanyingDoc(filePath) {
        const section = this.page.locator('#accompanying-documents-provided-sep');
        await section.scrollIntoViewIfNeeded();

        // Click the file upload area to trigger the file chooser
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await section.getByText('Click here or drag & drop your file.').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(2000);
        console.log('SEP: Accompanying document uploaded ✓');
    }

    // ── Section 10: Will training be provided? → No ───────────────────────────

    async selectTrainingNo() {
        await this.page.locator('#training-provided-sep [role=radio][value=no]').click();
        await this.page.waitForTimeout(500);
    }

    // ── Section 17: Correct Use / List of Tasks table ────────────────────────
    // Columns: HRUS # | Hazard-Related User Scenario | Correct Use/List of Tasks

    async fillCorrectUseRow(rowIndex, { hrusNo, scenario, correctUse }) {
        const section = this.page.locator('#correct-use-list-of-tasks-sep');
        await section.scrollIntoViewIfNeeded();
        const row = section.locator('table tbody tr').nth(rowIndex);
        const cells = row.locator('textarea');
        await cells.nth(0).fill(hrusNo);
        await cells.nth(1).fill(scenario);
        await cells.nth(2).fill(correctUse);
        await this.page.waitForTimeout(300);
    }

    async addCorrectUseRow() {
        const section = this.page.locator('#correct-use-list-of-tasks-sep');
        await section.scrollIntoViewIfNeeded();
        await section.getByRole('button', { name: 'Add Row' }).click();
        await this.page.waitForTimeout(500);
    }

    // ── Save ──────────────────────────────────────────────────────────────────

    async saveSEP() {
        await this.page.waitForTimeout(1000);

        // Click outside to trigger React state update
        await this.page.locator('h2').filter({ hasText: 'Verification and Validation' }).click();
        await this.page.waitForTimeout(2000);

        // Click Save
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('SEP: Clicked Save');
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
        console.log('SEP: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        // Handle completion toast (soft)
        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }
    }

}

module.exports = { SEPPage };
