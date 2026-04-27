const { expect } = require('@playwright/test');

class PMSPlanPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateToPMSPlan() {
        await this.page.getByRole('link', { name: 'Post Market Surveillance' }).click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await this.page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 30000 }
        ).catch(() => {});
        await this.page.waitForTimeout(3000);
        console.log('PMS Plan: Navigated ✓');
    }

    // ── Data Collection Table ─────────────────────────────────────────────────
    // 13 rows × 4 textareas per row (col 0 = pre-filled source, cols 1-3 = editable).
    // All textareas on the page use placeholder="Type"; rows 0-51 belong to this table.

    async fillDataCollectionTable(rows) {
        const textareas = this.page.locator('textarea[placeholder="Type"]');

        for (let i = 0; i < 13; i++) {
            const base = i * 4;

            const respTA    = textareas.nth(base + 1);
            const howOftenTA = textareas.nth(base + 2);
            const procRefTA  = textareas.nth(base + 3);

            await respTA.scrollIntoViewIfNeeded();
            await respTA.click();
            await respTA.fill(rows[i].responsibility);
            await this.page.waitForTimeout(200);

            await howOftenTA.click();
            await howOftenTA.fill(rows[i].howOften);
            await this.page.waitForTimeout(200);

            await procRefTA.click();
            await procRefTA.fill(rows[i].procedureRef);
            await this.page.waitForTimeout(200);
        }
        console.log('PMS Plan: Data Collection Table filled ✓');
    }

    // ── Non-Collected Data Table ──────────────────────────────────────────────
    // The Non-Collected Data section follows the Data Collection Table in the page.
    // Click the sidebar entry first to scroll the container to that section,
    // then fill using positional nth() with native DOM scrollIntoView.

    async fillNonCollectedData(data) {
        // Click the sidebar link to bring the Non-Collected Data section into view
        await this.page.getByText('Non-Collected Data', { exact: true }).first().click();
        await this.page.waitForTimeout(2000);

        // Wait until all Non-Collected Data textareas are in the DOM (total > 52)
        await this.page.waitForFunction(
            () => document.querySelectorAll('textarea[placeholder="Type"]').length > 52,
            { timeout: 15000 }
        ).catch(() => {});

        const textareas = this.page.locator('textarea[placeholder="Type"]');
        const total = await textareas.count();
        console.log(`PMS Plan: textarea count = ${total}`);

        for (let i = 0; i < 13; i++) {
            const idx = 52 + i * 2 + 1; // 53, 55, 57 ... (odd indices = empty cells)
            if (idx >= total) {
                console.log(`PMS Plan: index ${idx} out of range, skipping`);
                continue;
            }
            const ta = textareas.nth(idx);

            // Use native DOM scrollIntoView (scrolls the nearest scrollable ancestor)
            await ta.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
            await this.page.waitForTimeout(300);
            await ta.click({ force: true });
            await ta.fill(data[i]);
            await this.page.waitForTimeout(200);
        }
        console.log('PMS Plan: Non-Collected Data filled ✓');
    }

    // ── AI Generate helper ────────────────────────────────────────────────────

    async _aiGenerateEditor(editor, label) {
        await editor.scrollIntoViewIfNeeded();
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

        const acceptBtn = this.page.locator('button:has(svg.lucide-circle-check)').first();
        try {
            await acceptBtn.waitFor({ state: 'visible', timeout: 45000 });
            await acceptBtn.click();
            await this.page.waitForTimeout(500);
        } catch {}

        if (label) console.log(`PMS Plan: "${label}" → AI Generated ✓`);
    }

    // ── Standalone Sections (richtext / contenteditable) ─────────────────────
    // Order: Data Review Method (×2), Statistical Analysis (×2),
    //        Trend Analysis, Data Presentation, CAPA Procedure, Device Registration Procedure

    async fillStandaloneSections() {
        const sectionNames = [
            'Data Review Method',
            'Data Review Method',
            'Statistical Analysis',
            'Statistical Analysis',
            'Trend Analysis',
            'Data Presentation',
            'CAPA Procedure',
            'Device Registration Procedure',
        ];

        const labels = [
            'Data Review Method — describe method',
            'Data Review Method — procedure reference',
            'Statistical Analysis — describe analysis',
            'Statistical Analysis — procedure reference',
            'Trend Analysis',
            'Data Presentation',
            'CAPA Procedure',
            'Device Registration Procedure',
        ];

        for (let i = 0; i < sectionNames.length; i++) {
            // Scroll to this section by its heading text to force rendering
            await this.page.evaluate((name) => {
                const el = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,span,div,p'))
                    .find(e => e.children.length === 0 && e.textContent?.trim() === name);
                el?.scrollIntoView({ behavior: 'instant', block: 'center' });
            }, sectionNames[i]);
            await this.page.waitForTimeout(800);

            // Re-query all contenteditable editors after scrolling
            const editors = this.page.locator('[contenteditable="true"]');
            await this.page.waitForFunction(
                (idx) => document.querySelectorAll('[contenteditable="true"]').length > idx,
                i,
                { timeout: 10000 }
            ).catch(() => {});

            const count = await editors.count();
            if (i < count) {
                await this._aiGenerateEditor(editors.nth(i), labels[i]);
                await this.page.waitForTimeout(1000);
            }
        }
        console.log('PMS Plan: Standalone sections AI generated ✓');
    }

    // ── PMCF Exempt — Yes + first 2 checkboxes ───────────────────────────────

    async selectPMCFExemptYes() {
        // Scroll to the PMCF exempt question first
        await this.page.evaluate(() => {
            const el = Array.from(document.querySelectorAll('span, div, p, label'))
                .find(e => e.children.length === 0 && e.textContent?.trim().includes('Post-Market Clinical Follow-up (PMCF) exempt'));
            el?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(500);

        // Click Yes within the PMCF exempt radio group (use evaluate to target the exact group)
        await this.page.evaluate(() => {
            const label = Array.from(document.querySelectorAll('*'))
                .find(el => el.children.length === 0 && el.textContent?.trim().includes('Post-Market Clinical Follow-up (PMCF) exempt'));
            const group = label?.closest('[role="radiogroup"]') ||
                          label?.parentElement?.querySelector('[role="radiogroup"]') ||
                          label?.parentElement?.parentElement?.querySelector('[role="radiogroup"]');
            const yesBtn = group?.querySelector('button[role="radio"]');
            yesBtn?.click();
        });
        await this.page.waitForTimeout(2000);
        console.log('PMS Plan: PMCF exempt → Yes ✓');

        const checkboxes = this.page.locator('button[role="checkbox"]');
        await this.page.waitForTimeout(500);
        const cbCount = await checkboxes.count();
        const toCheck = Math.min(2, cbCount);
        for (let i = 0; i < toCheck; i++) {
            await checkboxes.nth(i).scrollIntoViewIfNeeded();
            await checkboxes.nth(i).click();
            await this.page.waitForTimeout(400);
        }
        console.log(`PMS Plan: Selected first ${toCheck} PMCF checkbox(es) ✓`);
    }

    // ── Frequency PMS ─────────────────────────────────────────────────────────

    async fillFrequencyPMS(value) {
        const freqInput = this.page.locator('input:not([type="file"]):not([type="hidden"])').last();
        await freqInput.scrollIntoViewIfNeeded();
        await freqInput.click();
        await freqInput.fill(value);
        await this.page.waitForTimeout(300);
        console.log(`PMS Plan: Frequency → "${value}" ✓`);
    }

    // ── Save + Mark Section Complete ──────────────────────────────────────────

    async saveAndComplete() {
        const saveBtn      = this.page.getByRole('button', { name: 'Save', exact: true });
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft', exact: true });

        const saveEnabled = await saveBtn.isEnabled().catch(() => false);
        if (saveEnabled) {
            await saveBtn.click();
            console.log('PMS Plan: Save clicked ✓');
        } else {
            await saveDraftBtn.click();
            console.log('PMS Plan: Save Draft clicked ✓');
        }

        const toast = this.page.locator("li[role='status']");
        try {
            await toast.waitFor({ state: 'visible', timeout: 15000 });
            await toast.waitFor({ state: 'hidden', timeout: 15000 });
        } catch {}
        await this.page.waitForTimeout(3000);

        const completeBtn = this.page.getByRole('button', { name: /Mark Section Complete/i });
        if (await completeBtn.count() > 0) {
            await completeBtn.scrollIntoViewIfNeeded();
            await expect(completeBtn).toBeVisible({ timeout: 10000 });
            await completeBtn.click();
            console.log('PMS Plan: Mark Section Complete clicked ✓');

            const toast2 = this.page.locator("li[role='status']");
            try {
                await toast2.waitFor({ state: 'visible', timeout: 15000 });
                await toast2.waitFor({ state: 'hidden', timeout: 15000 });
            } catch {}
            await this.page.waitForTimeout(2000);
        }
    }
}

module.exports = { PMSPlanPage };
