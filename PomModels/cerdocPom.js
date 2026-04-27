const { expect } = require("@playwright/test");
const { cerSectionData } = require('../Utils/testData');
const { selectRandomDate } = require('../Utils/datePickerHelper');

class cerDoc {

    constructor(page) {
        this.page = page;
    }

    // ─── Navigation helpers ───────────────────────────────────────────────────

    async closeCEPDoc() {
        await this.page.waitForTimeout(3000);
        const cepCollapseBtn = this.page.locator("[id*='radix-']").nth(3);
        await expect(cepCollapseBtn).toBeVisible();
        await cepCollapseBtn.click({ force: true });
    }

    async openCERSection() {
        await this.page.waitForTimeout(2000);

        // Step 1: Navigate to Clinical Evaluation page (lands on /plan)
        const ceLink = this.page.getByRole('link', { name: 'Clinical Evaluation' });
        await ceLink.click();
        await this.page.waitForTimeout(3000);

        // Step 2: Expand the "Clinical Evaluation Report" accordion in the sidebar
        const h3Buttons = this.page.locator('h3 button');
        await h3Buttons.nth(1).scrollIntoViewIfNeeded();
        await h3Buttons.nth(1).click();
        await this.page.waitForTimeout(1500);

        // Step 3: Click the icon next to "State of the Art" sub-section
        await h3Buttons.nth(2).scrollIntoViewIfNeeded();
        await h3Buttons.nth(2).click();
        await this.page.waitForTimeout(1500);

        // Step 4: If still not on the report page, navigate there directly via URL
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/clinical-evaluation/report')) {
            const reportUrl = currentUrl.replace('/clinical-evaluation/plan', '/clinical-evaluation/report');
            await this.page.goto(reportUrl);
            await this.page.waitForTimeout(4000);
        }

        // Ensure we are on the report page
        await this.page.waitForURL(/clinical-evaluation\/report/, { timeout: 15000 });
        await this.page.waitForTimeout(2000);
    }

    // ─── Section container helper ────────────────────────────────────────────
    // Targets the rounded-2xl section card that wraps each CER section.
    // Using rounded-2xl avoids the .last() sub-div ambiguity — inner divs
    // never carry rounded-2xl, so this always resolves to the section card.
    sectionContainer(headingText) {
        return this.page.locator('[class*="rounded-2xl"]')
            .filter({ hasText: headingText })
            .last();
    }

    // ─── Shared scroll helper ─────────────────────────────────────────────────

    async scrollTo(pos) {
        await this.page.evaluate((p) => {
            document.querySelector('.flex-1.overflow-y-auto').scrollTop = p;
        }, pos);
        await this.page.waitForTimeout(1000);
    }

    // ─── AI fill helper ───────────────────────────────────────────────────────

    async fillWithAI(field) {
        // Scroll the field into view inside the custom scrollable container
        await field.evaluate((el) => {
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
        await field.click();
        await this.page.waitForTimeout(600);

        const aiBtn = this.page.locator(
            '.inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg'
        ).first();

        // If AI button doesn't appear, try clicking field again
        try {
            await aiBtn.waitFor({ state: 'visible', timeout: 8000 });
        } catch {
            await field.click();
            await this.page.waitForTimeout(800);
            await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
        }

        await aiBtn.click();

        // Wait dynamically for the Accept button rather than a fixed delay —
        // resolves as soon as AI finishes (fast or slow), up to 45s
        const acceptBtn = this.page.locator('button[class*="h-fit"]').filter({
            has: this.page.locator('svg.lucide-circle-check')
        }).first();
        try {
            await acceptBtn.waitFor({ state: 'visible', timeout: 45000 });
            await acceptBtn.click();
            await this.page.waitForTimeout(500);
        } catch {
            // Accept button may not appear in all cases — continue
        }
    }

    // ─── 0. State of the Art ──────────────────────────────────────────────────
    // 9 richtext fields: Literature Search Protocol, Relevant Pathologies,
    // Alternative Treatments, Complications, Device Design and Materials,
    // Similar Devices, Benchmarks, Clinical Safety Objectives,
    // Clinical Performance Objectives
    async stateOfArtSection() {
        await this.scrollTo(115);
        const fields = this.page.locator('[class*="border px-3"]');
        const total = Math.min(await fields.count(), 9);
        for (let i = 0; i < total; i++) {
            await this.fillWithAI(fields.nth(i));
            console.log(`  State of Art field ${i + 1}/${total}`);
        }
    }

    // ─── Pre-Clinical Data ────────────────────────────────────────────────────
    // 3 tables (Safety & Performance, Usability Testing, Biocompatibility Report)
    // each with: Report Number | Report Name | Description columns
    // + Biocompatibility Summary richtext + Device Lifetime richtext
    async preClinicalData() {
        await this.scrollTo(1526);

        const allTables = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Report Number' })
        });
        const { preClinicalData: pcd } = cerSectionData;

        for (const [tIdx, rows] of [
            [0, pcd.safetyPerformance],
            [1, pcd.usabilityTesting],
            [2, pcd.biocompatibilityReport],
        ]) {
            const table = allTables.nth(tIdx);
            for (let r = 0; r < rows.length; r++) {
                const row = table.locator('tbody tr').nth(r);
                const cells = row.locator('textarea');
                const count = await cells.count();
                for (let c = 0; c < rows[r].length && c < count; c++) {
                    await cells.nth(c).scrollIntoViewIfNeeded();
                    await cells.nth(c).fill(rows[r][c]);
                    await this.page.waitForTimeout(80);
                }
            }
        }

        await this.scrollTo(2200);

        // Biocompatibility Summary richtext — scoped to its own section container
        const bioSumField = this.sectionContainer('Biocompatibility Summary')
            .locator('[class*="border px-3"]').first();
        if (await bioSumField.count() > 0) await this.fillWithAI(bioSumField);

        // Biological Evaluation Summary richtext — AI generated
        const bioEvalField = this.sectionContainer('Biological Evaluation Summary')
            .locator('[class*="border px-3"]').first();
        if (await bioEvalField.count() > 0) await this.fillWithAI(bioEvalField);

        // Device Lifetime richtext — last border-px-3 in the same card as Biocompatibility Summary
        const deviceLifeField = this.sectionContainer('Device Lifetime')
            .locator('[class*="border px-3"]').last();
        if (await deviceLifeField.count() > 0) await this.fillWithAI(deviceLifeField);
    }

    // ─── 1. Clinical Evaluation Overview ──────────────────────────────────────
    // 3 checkboxes (select first) + Demonstration of Equivalence Justification richtext
    async clinicalEvalOverview() {
        await this.scrollTo(2959);

        // Check the second checkbox only (triggers Equivalence Table)
        const checkboxes = this.page.getByRole('checkbox');
        const checkbox = checkboxes.nth(1);
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.check();
        await this.page.waitForTimeout(500);

        // Fill Equivalence Justification — scoped to the Equivalence section
        const equivSection = this.page.locator('div')
            .filter({ hasText: 'Demonstration of Equivalence' })
            .filter({ has: this.page.locator('[contenteditable="true"]') })
            .last();
        const equivField = equivSection.locator('[contenteditable="true"]').first();
        await equivField.scrollIntoViewIfNeeded();
        await equivField.click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(cerSectionData.equivalenceJustification);
        await this.page.waitForTimeout(500);
    }

    // ─── 2. Clinical Data Generated and Held by the Manufacturer ─────────────
    // Yes/No radio (pre-market study?) + PMS Summary richtext (AI)
    async clinicalDataManufacturer() {
        await this.scrollTo(3580);

        const manufSection = this.sectionContainer('Clinical Data Generated and Held by the Manufacturer');

        // Scroll the radio into view inside the custom container before clicking
        const yesRadio = manufSection.locator('[role="radio"][value="yes"]').first();
        await yesRadio.evaluate((el) => {
            const container = document.querySelector('.flex-1.overflow-y-auto');
            if (container) {
                const elRect = el.getBoundingClientRect();
                const cRect = container.getBoundingClientRect();
                container.scrollTop += elRect.top - cRect.top - 100;
            }
        });
        await this.page.waitForTimeout(500);
        await yesRadio.click();
        await this.page.waitForTimeout(1000);

        const pmsField = manufSection.locator('[class*="border px-3"]').first();
        await this.fillWithAI(pmsField);
    }

    // ─── 3. Clinical Data from Literature ────────────────────────────────────
    // 2 richtext fields (AI): Literature Search Protocol + Results
    async clinicalDataLiterature() {
        await this.scrollTo(3940);
        const litSection = this.sectionContainer('Clinical Data from Literature');
        const fields = litSection.locator('[class*="border px-3"]');
        for (let i = 0; i < 2; i++) {
            await this.fillWithAI(fields.nth(i));
        }
    }

    // ─── 4. Other Sources of Clinical Data ───────────────────────────────────
    async otherSourcesClinicalData() {
        await this.scrollTo(4318);
        const field = this.sectionContainer('Other Sources of Clinical Data')
            .locator('[class*="border px-3"]').first();
        await this.fillWithAI(field);
    }

    // ─── 5. Summary and Appraisal of Clinical Data ───────────────────────────
    // Table: Citation | Study Objectives | Study Design | Description & Subjects
    //        | Main Findings | Authors Conclusions | Relevance Score
    //        | Scientific Validity Score | Contribution Weighting
    // Fill 3 rows; delete any extra rows using the 3-dot menu
    async summaryAppraisalClinicalData() {
        await this.scrollTo(4565);
        await this.page.waitForTimeout(1000);

        const table = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Citation' })
        }).first();
        const tbodyRows = table.locator('tbody tr');
        const rowCount = await tbodyRows.count();

        // Delete extra rows (beyond 3) from bottom up using the 3-dot SVG trigger
        for (let r = rowCount - 1; r >= 3; r--) {
            const menuSvg = tbodyRows.nth(r).locator('svg[aria-haspopup="menu"]');
            if (await menuSvg.count() > 0) {
                await menuSvg.scrollIntoViewIfNeeded();
                await menuSvg.click();
                await this.page.waitForTimeout(400);
                const menuItems = this.page.locator('[role="menuitem"]');
                if (await menuItems.count() > 0) {
                    await menuItems.last().click();
                    await this.page.waitForTimeout(400);
                }
            }
        }

        // Fill 3 rows — cells are <textarea> not <input>
        const rows = cerSectionData.summaryAppraisalRows;
        for (let r = 0; r < Math.min(3, rows.length); r++) {
            const row = table.locator('tbody tr').nth(r);
            const cells = row.locator('textarea');
            const count = await cells.count();
            for (let c = 0; c < rows[r].length && c < count; c++) {
                await cells.nth(c).scrollIntoViewIfNeeded();
                await cells.nth(c).fill(rows[r][c]);
                await this.page.waitForTimeout(80);
            }
        }
    }

    // ─── 6. Analysis of the Clinical Data in Relation to GSPRs ───────────────
    // 4 questions, each with Yes/No radio + Justification richtext (AI)
    // Pattern: Yes / Yes / No / No
    async analysisGSPRs() {
        await this.scrollTo(5109);
        await this.page.waitForTimeout(1000);

        const gsprSection = this.sectionContainer('Analysis of the Clinical Data in Relation to GSPRs');
        const answers = ['Yes', 'Yes', 'No', 'No'];
        const radioGroups = gsprSection.locator('[role="radiogroup"]');
        const fields = gsprSection.locator('[class*="border px-3"]');

        for (let i = 0; i < 4; i++) {
            const group = radioGroups.nth(i);
            await group.scrollIntoViewIfNeeded();
            await group.locator(`[role="radio"][value="${answers[i].toLowerCase()}"]`).click();
            await this.page.waitForTimeout(400);
            await this.fillWithAI(fields.nth(i));
            console.log(`  GSPR ${i + 1}: ${answers[i]}`);
        }
    }

    // ─── 7. Acceptability to the Objectives ──────────────────────────────────
    // 3 richtext fields (AI): Safety, Performance, Amount/Quality of data
    async acceptabilityObjectives() {
        await this.scrollTo(6263);
        await this.page.waitForTimeout(1000);
        const acceptSection = this.sectionContainer('Acceptability to the objectives');
        const fields = acceptSection.locator('[class*="border px-3"]');
        for (let i = 0; i < 3; i++) {
            await this.fillWithAI(fields.nth(i));
            console.log(`  Acceptability field ${i + 1}`);
        }
    }

    // ─── 8. Conclusion ────────────────────────────────────────────────────────
    async conclusion() {
        await this.scrollTo(15000);

        // Filter by unique text "How often" which only appears in the Conclusion section
        // (avoids false match on "Authors Conclusions" in Summary & Appraisal)
        const conclusionSection = this.page.locator('[class*="rounded-2xl"]')
            .filter({ hasText: 'How often' })
            .last();

        // Conclusions richtext — AI fill, scoped to Conclusion section
        const conclusionField = conclusionSection.locator('[class*="border px-3"]').first();
        await this.fillWithAI(conclusionField);

        // Select Yearly review — value="yearly" on button[role="radio"]
        const yearlyRadio = conclusionSection.locator('[role="radio"][value="yearly"]');
        await yearlyRadio.evaluate((el) => {
            const container = document.querySelector('.flex-1.overflow-y-auto');
            if (container) {
                const elRect = el.getBoundingClientRect();
                const cRect = container.getBoundingClientRect();
                container.scrollTop += elRect.top - cRect.top - 100;
            }
        });
        await this.page.waitForTimeout(500);
        await yearlyRadio.click();
        await this.page.waitForTimeout(1500);

        // Date picker — shared helper (handles scroll + DOM click to bypass overlays)
        await selectRandomDate(this.page, 'last');
    }

    // ─── 9. Qualifications of the Responsible Evaluators ─────────────────────
    // Table: Person's Name | Job Title | Responsibility | Qualifications and Experience | CV
    async qualificationsEvaluators() {
        await this.scrollTo(7583);
        await this.page.waitForTimeout(1000);

        const quals = cerSectionData.qualifications;
        const table = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: "Person's Name" })
        }).first();

        for (let r = 0; r < quals.length; r++) {
            const row = table.locator('tbody tr').nth(r);
            const cells = row.locator('textarea');
            const count = await cells.count();
            if (count >= 1) await cells.nth(0).fill(quals[r].name);
            if (count >= 2) await cells.nth(1).fill(quals[r].jobTitle);
            if (count >= 3) await cells.nth(2).fill(quals[r].responsibility);
            if (count >= 4) await cells.nth(3).fill(quals[r].qualifications);
            await this.page.waitForTimeout(200);

            // CV upload: clicking the upload icon opens a modal dialog with a hidden file input
            const uploadIconBtn = row.locator('button').filter({ has: this.page.locator('svg.lucide-upload') });
            if (await uploadIconBtn.count() > 0) {
                await uploadIconBtn.evaluate((el) => {
                    const container = document.querySelector('.flex-1.overflow-y-auto');
                    if (container) {
                        const elRect = el.getBoundingClientRect();
                        const cRect = container.getBoundingClientRect();
                        container.scrollTop += elRect.top - cRect.top - 100;
                    }
                });
                await this.page.waitForTimeout(500);

                // Open the CV upload modal
                await uploadIconBtn.click();
                await this.page.waitForTimeout(1000);

                // The modal contains a hidden <input type="file" accept=".pdf">
                // Set the file directly on the hidden input inside the dialog
                const fileInput = this.page.locator('[role="dialog"] input[type="file"]');
                await fileInput.setInputFiles(cerSectionData.qualificationPdfPath);
                await this.page.waitForTimeout(1000);

                // Click the Upload button (becomes enabled after file selection)
                const uploadSubmitBtn = this.page.locator('[role="dialog"] button').filter({ hasText: /^Upload$/ });
                await uploadSubmitBtn.waitFor({ state: 'visible', timeout: 8000 });
                await uploadSubmitBtn.click();

                // Wait for the success toast to appear and disappear
                try {
                    const toast = this.page.locator("li[role='status']");
                    await toast.waitFor({ state: 'visible', timeout: 10000 });
                    await toast.waitFor({ state: 'hidden', timeout: 15000 });
                } catch { /* toast may not appear or already gone */ }

                await this.page.waitForTimeout(1000);
            }
        }
    }

    // ─── 10. Changes ──────────────────────────────────────────────────────────
    // Table: Index Number | Applied Change
    async changesSection() {
        await this.scrollTo(8010);
        await this.page.waitForTimeout(800);

        const changes = cerSectionData.changes;
        const table = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Index Number' })
        }).first();

        for (let r = 0; r < changes.length; r++) {
            const row = table.locator('tbody tr').nth(r);
            const cells = row.locator('textarea');
            if (await cells.count() >= 1) await cells.nth(0).fill(changes[r].indexNumber);
            if (await cells.count() >= 2) await cells.nth(1).fill(changes[r].appliedChange);
            await this.page.waitForTimeout(150);
        }
    }

    // ─── 11. Equivalence Table ────────────────────────────────────────────────
    // Three tables: Technical / Biological / Clinical characteristics + justification rows
    async equivalenceTable() {
        await this.scrollTo(8411);
        await this.page.waitForTimeout(1000);

        const { equivalenceTable: eq } = cerSectionData;

        // Helper: fill characteristic rows (device1, device2, differences) for a given table
        const fillCharRows = async (table, dataRows) => {
            const rows = table.locator('tbody tr').filter({ has: this.page.locator('textarea') });
            const count = await rows.count();
            for (let r = 0; r < Math.min(count, dataRows.length); r++) {
                const row = rows.nth(r);
                const cells = row.locator('textarea');
                await cells.nth(0).evaluate((el) => {
                    const c = document.querySelector('.flex-1.overflow-y-auto');
                    if (c) c.scrollTop += el.getBoundingClientRect().top - c.getBoundingClientRect().top - 80;
                });
                await this.page.waitForTimeout(200);
                await cells.nth(0).fill(dataRows[r].device1);
                await cells.nth(1).fill(dataRows[r].device2);
                await cells.nth(2).fill(dataRows[r].differences);
                await this.page.waitForTimeout(100);
            }
        };

        // Helper: fill justification rows (textarea + radio) for a given table
        const fillJustRows = async (table, justData) => {
            const rows = table.locator('tbody tr').filter({
                has: this.page.locator('textarea')
            }).filter({
                has: this.page.locator('[role="radiogroup"]')
            });
            const count = await rows.count();
            for (let r = 0; r < Math.min(count, justData.length); r++) {
                const row = rows.nth(r);
                await row.locator('textarea').evaluate((el) => {
                    const c = document.querySelector('.flex-1.overflow-y-auto');
                    if (c) c.scrollTop += el.getBoundingClientRect().top - c.getBoundingClientRect().top - 80;
                });
                await this.page.waitForTimeout(200);
                await row.locator('textarea').fill(justData[r].text);
                await row.locator(`[role="radio"][value="${justData[r].clinicallySig}"]`).click();
                await this.page.waitForTimeout(200);
            }
        };

        // 1. Technical Characteristics table
        const techTable = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Technical Characteristics' })
        }).first();
        await fillCharRows(techTable, eq.characteristics);
        await fillJustRows(techTable, eq.justifications);

        // 2. Biological Characteristics table
        await this.page.evaluate(() => {
            document.querySelector('.flex-1.overflow-y-auto').scrollTop += 1200;
        });
        await this.page.waitForTimeout(800);

        const bioTable = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Biological characteristics' })
        }).first();
        await fillCharRows(bioTable, eq.biologicalCharacteristics);
        await fillJustRows(bioTable, eq.biologicalJustifications);

        // 3. Clinical Characteristics table
        await this.page.evaluate(() => {
            document.querySelector('.flex-1.overflow-y-auto').scrollTop += 1200;
        });
        await this.page.waitForTimeout(800);

        const clinTable = this.page.locator('table').filter({
            has: this.page.locator('th').filter({ hasText: 'Clinical Characteristics' })
        }).first();
        await fillCharRows(clinTable, eq.clinicalCharacteristics);
        await fillJustRows(clinTable, eq.clinicalJustifications);

        // Fill the Summary textarea in Clinical table (last row)
        const summaryRow = clinTable.locator('tbody tr').last();
        const summaryCell = summaryRow.locator('textarea');
        if (await summaryCell.count() > 0 && eq.clinicalSummary) {
            await summaryCell.evaluate((el) => {
                const c = document.querySelector('.flex-1.overflow-y-auto');
                if (c) c.scrollTop += el.getBoundingClientRect().top - c.getBoundingClientRect().top - 80;
            });
            await this.page.waitForTimeout(200);
            await summaryCell.fill(eq.clinicalSummary);
        }
    }

    // ─── Final save and complete ──────────────────────────────────────────────
    async cerSaveAndComplete() {
        await this.page.waitForTimeout(2000);

        // Click outside to trigger React state update
        await this.page.getByText('Equivalence Table').first().click();
        await this.page.waitForTimeout(1500);

        // Helper: click a save button then wait for toast to appear and fully disappear
        const clickAndWaitForToast = async (btn) => {
            await btn.scrollIntoViewIfNeeded();
            await btn.click();
            const toast = this.page.locator("li[role='status']");
            try {
                await toast.waitFor({ state: 'visible', timeout: 8000 });
                await toast.waitFor({ state: 'hidden', timeout: 15000 });
            } catch { /* toast may not appear or already gone */ }
        };

        // Save Draft
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft', exact: true });
        await expect(saveDraftBtn).toBeVisible();
        await clickAndWaitForToast(saveDraftBtn);

        // Save — fall back to Save Draft if Save button is disabled
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        if (await saveBtn.count() > 0 && await saveBtn.isEnabled()) {
            await clickAndWaitForToast(saveBtn);
        } else {
            const saveDraftAgain = this.page.getByRole('button', { name: 'Save Draft', exact: true });
            if (await saveDraftAgain.count() > 0 && await saveDraftAgain.isEnabled()) {
                await clickAndWaitForToast(saveDraftAgain);
            }
        }

        // Mark Section Complete — immediately after toast disappears
        const completeBtn = this.page.getByRole('button', { name: /Mark Section Complete/i });
        if (await completeBtn.count() > 0) {
            await completeBtn.scrollIntoViewIfNeeded();
            await expect(completeBtn).toBeVisible({ timeout: 10000 });
            await clickAndWaitForToast(completeBtn);
        }
    }

    // ─── Legacy helpers (kept for backward compatibility) ─────────────────────

    async saveDraftBtn() {
        await this.page.waitForTimeout(6000);
        const saveDraftBtn = this.page.getByRole('button', { name: 'Save Draft', exact: true });
        await expect(saveDraftBtn).toBeVisible();
        await expect(saveDraftBtn).toBeEnabled();
        await saveDraftBtn.click();
        const toast = this.page.locator("li[role='status']");
        await expect(toast).toBeVisible();
        await toast.waitFor({ state: 'hidden' });
    }

}

module.exports = { cerDoc };
