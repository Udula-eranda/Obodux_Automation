const { expect } = require('@playwright/test');
const { selectRandomDate } = require('../Utils/datePickerHelper');

class PMCFFollowUpPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateToPMCF() {
        await this.page.getByRole('link', { name: 'Post Market Surveillance' }).click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await this.page.waitForTimeout(1000);

        const url = this.page.url();
        const match = url.match(/device-documentation\/([\w-]+)\//);
        const deviceId = match ? match[1] : '';
        const base = url.split('/editor/')[0];
        await this.page.goto(`${base}/editor/device-documentation/${deviceId}/post-market-surveillance/follow-up`);

        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await this.page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 30000 }
        ).catch(() => {});
        await this.page.waitForTimeout(3000);
        console.log('PMCF Follow-up: Navigated ✓');
    }

    // ── Section 1: Introduction ───────────────────────────────────────────────

    async fillIntroductionSection(data) {

        // Q1: Is the device subject to this PMCF considered Novel?
        const q1 = this.page.locator('#novel-product').getByRole('radio', { name: data.novelDevice });
        await q1.scrollIntoViewIfNeeded();
        await q1.click();
        await this.page.waitForTimeout(500);

        // Q2: Does the device subject to this PMCF introduce novel clinical procedures?
        const q2 = this.page.locator('#novel-related-clinical-procedure').getByRole('radio', { name: data.novelClinicalProcedures });
        await q2.scrollIntoViewIfNeeded();
        await q2.click();
        await this.page.waitForTimeout(1000);

        // Fill "Explain any novel features" textarea (revealed by Q2 = Yes)
        if (data.novelClinicalProcedures === 'Yes' && data.explainNovelFeatures) {
            const explainTA = this.page.locator('textarea[placeholder="Type"]').first();
            await explainTA.scrollIntoViewIfNeeded();
            await explainTA.click();
            await explainTA.fill(data.explainNovelFeatures);
            await this.page.waitForTimeout(500);
        }

        // Q3: Will a post-market clinical follow-up be conducted?
        // Scroll Q3 fully into view away from the fixed bottom bar, then use evaluate()
        // to directly trigger the DOM click — bypasses any overlay/intercept issues
        await this.page.evaluate(() => {
            const group = document.querySelector('#will-pmcf-be-conducted');
            group?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(500);

        await this.page.evaluate((answer) => {
            const group = document.querySelector('#will-pmcf-be-conducted');
            const buttons = group?.querySelectorAll('button[role="radio"]');
            for (const btn of buttons || []) {
                if (btn.textContent?.trim() === answer) { btn.click(); break; }
            }
        }, data.conductFollowUp);
        await this.page.waitForTimeout(500);

        // Verify and retry once if not checked
        const q3Checked = await this.page.locator('#will-pmcf-be-conducted button[role="radio"][data-state="checked"]').count();
        if (q3Checked === 0) {
            await this.page.locator('#will-pmcf-be-conducted').getByRole('radio', { name: data.conductFollowUp }).click({ force: true });
            await this.page.waitForTimeout(500);
        }

        await this.page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await this.page.waitForTimeout(2000);

        // Wait for PMCF Activities section to render after Q3=Yes triggers page expansion
        await this.page.waitForFunction(
            () => Array.from(document.querySelectorAll('span, div'))
                .some(el => el.children.length === 0 && el.textContent?.trim() === 'PMCF Activities'),
            { timeout: 15000 }
        ).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('PMCF Follow-up: Introduction section filled ✓');
    }

    // ── Section 2: PMCF Activities ────────────────────────────────────────────
    // Flow: Add Row (inline row) → click View → full edit dialog opens → fill → Save
    //
    // Dialog textarea order: [0] Activity type, [1] Source, [2] Description,
    //   [3] Aim/Other, [4] Procedures/Other, [5] Rationale/Other, [6] Timelines
    //
    // Dialog checkboxes (0-indexed within dialog):
    //   Aim (0–7): select first 1 → index 0
    //   Procedures (8–14): select first 2 → indices 8, 9
    //   Rationale (15–19): select first 4 → indices 15–18

    async _addActivityRow(data) {
        // Click the first Add Row (PMCF Activities table)
        const addRowBtns = this.page.getByRole('button', { name: 'Add Row' });
        await addRowBtns.first().scrollIntoViewIfNeeded();
        await addRowBtns.first().click();
        await this.page.waitForTimeout(1000);

        // Click the last View button (belongs to the newly added row)
        await this.page.getByRole('button', { name: 'View' }).last().click();
        await this.page.waitForTimeout(1000);

        const dialog = this.page.locator('[role="dialog"]').first();
        await dialog.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(500);

        // Fill Ref No. of activity (input field, not textarea)
        const refInput = dialog.locator('input:not([type="file"]):not([type="hidden"])').first();
        await refInput.click();
        await refInput.fill(data.activityRef);
        await this.page.waitForTimeout(200);

        // Fill textareas: [0]=Activity type, [1]=Source, [2]=Description
        const dTAs = dialog.locator('textarea[placeholder="Type"]');
        await dTAs.nth(0).click(); await dTAs.nth(0).fill(data.activityType);
        await this.page.waitForTimeout(200);
        await dTAs.nth(1).click(); await dTAs.nth(1).fill(data.source);
        await this.page.waitForTimeout(200);
        await dTAs.nth(2).click(); await dTAs.nth(2).fill(data.description);
        await this.page.waitForTimeout(200);

        // Procedure / method type radio (value="general" or value="specific")
        const procedureRadio = dialog.locator('[role="radiogroup"]').first()
            .locator(`button[role="radio"][value="${data.procedureType}"]`);
        if (await procedureRadio.count() > 0) {
            await procedureRadio.scrollIntoViewIfNeeded();
            await procedureRadio.click();
            await this.page.waitForTimeout(400);
        }

        // Checkboxes scoped to dialog
        const cbs = dialog.locator('[role="checkbox"]');

        // Aim of this activity — first 1 checkbox (index 0)
        const aim0 = cbs.nth(0);
        if ((await aim0.getAttribute('data-state')) !== 'checked') {
            await aim0.scrollIntoViewIfNeeded();
            await aim0.click();
            await this.page.waitForTimeout(150);
        }

        // Procedures which will be used as part of PMCF — first 2 (indices 8, 9)
        for (const idx of [8, 9]) {
            const cb = cbs.nth(idx);
            if ((await cb.getAttribute('data-state')) !== 'checked') {
                await cb.scrollIntoViewIfNeeded();
                await cb.click();
                await this.page.waitForTimeout(150);
            }
        }

        // Rationale for the appropriateness — first 4 (indices 15–18)
        for (const idx of [15, 16, 17, 18]) {
            const cb = cbs.nth(idx);
            if ((await cb.getAttribute('data-state')) !== 'checked') {
                await cb.scrollIntoViewIfNeeded();
                await cb.click();
                await this.page.waitForTimeout(150);
            }
        }

        // Timelines — last textarea in dialog (index 6)
        const dTACount = await dTAs.count();
        const timelinesTA = dTAs.nth(dTACount - 1);
        await timelinesTA.scrollIntoViewIfNeeded();
        await timelinesTA.click();
        await timelinesTA.fill(data.timelines);
        await this.page.waitForTimeout(200);

        // Save dialog
        await dialog.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForTimeout(1500);
        console.log(`PMCF Follow-up: Activity row "${data.activityRef}" added ✓`);
    }

    async _selectEvaluationReportDate() {
        await selectRandomDate(this.page, 'first');
    }

    async fillPMCFActivitiesSection(activities, evaluationDate) {
        // Wait for the Add Row button to be present (only appears after Q3=Yes is saved)
        await this.page.getByRole('button', { name: 'Add Row' }).first()
            .waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});

        // Scroll to PMCF Activities section
        await this.page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span, div')).find(
                el => el.children.length === 0 && el.textContent?.trim() === 'PMCF Activities'
            );
            spans?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(1000);

        for (const activity of activities) {
            await this._addActivityRow(activity);
        }

        await this._selectEvaluationReportDate();

        await this.page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await this.page.waitForTimeout(2000);
        console.log('PMCF Follow-up: PMCF Activities section filled ✓');
    }

    // ── Section 3: Ref to Technical Documentation ─────────────────────────────

    async fillRefToTechnicalDocumentation(data) {
        // Scroll to the Ref to Technical Documentation section
        await this.page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span, div')).find(
                el => el.children.length === 0 && el.textContent?.trim() === 'Ref to Technical Documentation'
            );
            spans?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(1000);

        const radioGroups = this.page.locator('[role="radiogroup"]');

        // Q4: Any relevant information from the CER?
        const cerYes = radioGroups.nth(3).locator('button[role="radio"]').filter({
            hasText: new RegExp(`^${data.cerRelevant}$`)
        });
        await cerYes.scrollIntoViewIfNeeded();
        await cerYes.click();
        await this.page.waitForTimeout(1000);

        if (data.cerRelevant === 'Yes' && data.cerInfo) {
            const cerTA = this.page.getByText('Add the relevant information to be further analysed and monitored from CE report')
                .locator('xpath=following::textarea').first();
            await cerTA.scrollIntoViewIfNeeded();
            await cerTA.click();
            await cerTA.fill(data.cerInfo);
            await this.page.waitForTimeout(300);
        }

        // Q5: Any relevant information from the RMF?
        const rmfYes = radioGroups.nth(4).locator('button[role="radio"]').filter({
            hasText: new RegExp(`^${data.rmfRelevant}$`)
        });
        await rmfYes.scrollIntoViewIfNeeded();
        await rmfYes.click();
        await this.page.waitForTimeout(1000);

        if (data.rmfRelevant === 'Yes' && data.rmfInfo) {
            const rmfTA = this.page.getByText('Add the relevant information to be further analysed and monitored from Risk Management File')
                .locator('xpath=following::textarea').first();
            await rmfTA.scrollIntoViewIfNeeded();
            await rmfTA.click();
            await rmfTA.fill(data.rmfInfo);
            await this.page.waitForTimeout(300);
        }

        await this.page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await this.page.waitForTimeout(2000);
        console.log('PMCF Follow-up: Ref to Technical Documentation filled ✓');
    }

    // ── Section 4: Equivalent / similar device (inline table) ────────────────

    async _addEquivalentDeviceRow(rowData) {
        // Find the first "Add Row" button that appears AFTER the
        // "Equivalent / similar device" heading in DOM order, then
        // click it via real mouse coordinates (avoids stale-element +
        // pointer-event issues after React re-renders)
        const coords = await this.page.evaluate(() => {
            const heading = Array.from(document.querySelectorAll('span, div'))
                .find(el => el.children.length === 0 && el.textContent?.trim() === 'Equivalent / similar device');
            if (!heading) return null;

            const allAddRow = Array.from(document.querySelectorAll('button'))
                .filter(b => b.textContent?.trim() === 'Add Row');

            for (const btn of allAddRow) {
                // Node.DOCUMENT_POSITION_FOLLOWING (4) — btn is after heading
                if (heading.compareDocumentPosition(btn) & 4) {
                    btn.scrollIntoView({ behavior: 'instant', block: 'center' });
                    const rect = btn.getBoundingClientRect();
                    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
                }
            }
            return null;
        });

        if (coords) {
            await this.page.mouse.click(coords.x, coords.y);
        }
        await this.page.waitForTimeout(1000);

        // New row textareas appear inline — get the last 7 empty textareas
        const textareas = this.page.locator('textarea[placeholder="Type"]');
        const total = await textareas.count();
        const rowValues = [
            rowData.productName,
            rowData.intendedPurpose,
            rowData.intendedUsers,
            rowData.patientPopulation,
            rowData.medicalCondition,
            rowData.indication,
            rowData.cerReference,
        ];

        const rowStart = total - rowValues.length;
        for (let i = 0; i < rowValues.length; i++) {
            const ta = textareas.nth(rowStart + i);
            await ta.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
            await this.page.waitForTimeout(200);
            await ta.click({ force: true });
            await ta.fill(rowValues[i]);
            await this.page.waitForTimeout(200);
        }

        // Click outside the table to commit the row
        await this.page.locator('h2').first().click({ force: true }).catch(() => {});
        await this.page.waitForTimeout(300);
    }

    async fillEquivalentDeviceSection(devices) {
        // Scroll to the Equivalent / similar device section
        await this.page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span')).find(
                el => el.textContent?.trim() === 'Equivalent / similar device'
            );
            spans?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(1000);

        for (const device of devices.slice(0, 2)) {
            await this._addEquivalentDeviceRow(device);
        }

        await this.page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await this.page.waitForTimeout(2000);
        console.log('PMCF Follow-up: Equivalent/similar device section filled ✓');
    }

    // ── Section 5: Standards & Guidance on PMCF ──────────────────────────────

    async fillStandardsSection(guidanceEntries) {
        // Standards checkboxes are pre-populated from Checklist — leave as-is

        // Scroll to the Standards section
        await this.page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span, div')).find(
                el => el.children.length === 0 && el.textContent?.trim() === 'Standards, common specifications and guidance documents'
            );
            spans?.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await this.page.waitForTimeout(1000);

        // Fill Guidance on PMCF entries
        // The first entry field is a pre-existing text input under "Guidance on PMCF"
        const guidanceInputs = this.page.locator('input[placeholder="Type"]');

        // Fill first entry
        const firstInput = guidanceInputs.last();
        await firstInput.scrollIntoViewIfNeeded();
        await firstInput.click();
        await firstInput.fill(guidanceEntries[0]);
        await this.page.waitForTimeout(300);

        // Add and fill additional entries
        for (let i = 1; i < guidanceEntries.length; i++) {
            await this.page.getByRole('button', { name: 'Add Another' }).last().click();
            await this.page.waitForTimeout(500);

            const inputs = this.page.locator('input[placeholder="Type"]');
            const newInput = inputs.last();
            await newInput.scrollIntoViewIfNeeded();
            await newInput.click();
            await newInput.fill(guidanceEntries[i]);
            await this.page.waitForTimeout(300);
        }

        await this.page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await this.page.waitForTimeout(2000);
        console.log('PMCF Follow-up: Standards & Guidance section filled ✓');
    }

    // ── Save + Mark Section Complete ──────────────────────────────────────────

    async saveAndComplete() {
        const saveBtn      = this.page.getByRole('button', { name: 'Save', exact: true });
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft', exact: true });

        const saveEnabled = await saveBtn.isEnabled().catch(() => false);
        if (saveEnabled) {
            await saveBtn.click();
            console.log('PMCF Follow-up: Save clicked ✓');
        } else {
            await saveDraftBtn.click();
            console.log('PMCF Follow-up: Save Draft clicked (Save still disabled) ✓');
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
            console.log('PMCF Follow-up: Mark Section Complete clicked ✓');

            const toast2 = this.page.locator("li[role='status']");
            try {
                await toast2.waitFor({ state: 'visible', timeout: 15000 });
                await toast2.waitFor({ state: 'hidden', timeout: 15000 });
            } catch {}
            await this.page.waitForTimeout(2000);
        }
    }
}

module.exports = { PMCFFollowUpPage };
