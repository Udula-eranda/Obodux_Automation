const { expect } = require('@playwright/test');

class VVPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    // Navigate to the Verification and Validation section and open V&V Overview form
    async navigateToVV() {
        await this.page.getByRole('link', { name: 'Verification and Validation' }).click();
        await this.page.waitForTimeout(3000);

        // Explicitly click "V&V Overview" in the left sub-sidebar to load the form/table
        await this.page.getByText('V&V Overview').first().click();
        await this.page.waitForTimeout(2000);

        // Wait for the table to be visible before proceeding
        await this.page.locator('table').first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(1000);
    }

    // ── V&V Overview Table ────────────────────────────────────────────────────

    // Fill one row (rowIndex is 0-based)
    // Columns: V/V Number | Title of V/V | Aim/Objective | Summary of Methods Used | Summary of Results
    // Uses click + keyboard.type to trigger React onChange on controlled inputs
    async fillOverviewRow(rowIndex, vvNumber, title, aim, methods, results) {
        const rows = this.page.locator('table tbody tr');
        const row = rows.nth(rowIndex);
        const inputs = row.getByRole('textbox');

        const values = [vvNumber, title, aim, methods, results];
        for (let i = 0; i < values.length; i++) {
            const input = inputs.nth(i);
            await input.scrollIntoViewIfNeeded();
            await input.click();
            await input.fill(values[i]);
        }
    }

    // Add a new row to the overview table
    async addRow() {
        const addRowBtn = this.page.getByRole('button', { name: 'Add Row' });
        await expect(addRowBtn).toBeVisible();
        await addRowBtn.click();
        await this.page.waitForTimeout(500);
    }

    // ── Save / Complete ───────────────────────────────────────────────────────

    async saveAndComplete() {
        await this.page.waitForTimeout(1000);

        // Click outside the table to trigger React state update and enable Save
        await this.page.getByText('Validation and Verification Overview').first().click();
        await this.page.waitForTimeout(2000);

        // Click Save
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('V&V: Clicked Save');
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
        console.log('V&V: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        // Handle completion toast (soft)
        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }
    }

    // ── UEP Navigation ────────────────────────────────────────────────────────

    async navigateToUEP() {
        // Build the UEP URL from the current page URL by replacing the section path
        const currentUrl = this.page.url();
        const uepUrl = currentUrl.replace(
            /\/verification-and-validation\/.*$/,
            '/verification-and-validation/usability-evaluation-plan'
        );
        await this.page.goto(uepUrl);
        await this.page.waitForTimeout(3000);

        // Wait for the UEP page question to be visible
        await this.page.locator('p').filter({ hasText: 'Is the Usability Process controlled through a QMS Procedure?' })
            .waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
    }

    // ── UEP Q1 / Q3 — Yes + Upload ───────────────────────────────────────────

    // Select Yes for a question, then handle the upload modal that appears
    async selectYesAndUpload(questionText, uploadSectionText, docNumber, filePath) {
        // Select Yes
        const qSection = this.page.locator('p').filter({ hasText: questionText }).locator('xpath=..');
        await qSection.getByRole('radio', { name: 'Yes' }).click();
        await this.page.waitForTimeout(1000);

        // Wait for upload table to appear and click the Upload drawing button to open the modal
        const uploadSection = this.page.locator('p').filter({ hasText: uploadSectionText }).locator('xpath=..');
        await uploadSection.getByRole('button', { name: 'Upload drawing' }).click();
        await this.page.waitForTimeout(1000);

        // Modal opens — fill document number
        const modal = this.page.getByRole('dialog');
        await modal.getByRole('textbox').fill(docNumber);

        // Click the drag & drop zone to trigger the native file chooser
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await modal.getByText('Click here or drag & drop your file.').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(1000);

        // Save the modal
        await modal.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(2000);
        console.log(`UEP: Uploaded document for "${uploadSectionText}" ✓`);
    }

    // ── UEP Tables ────────────────────────────────────────────────────────────

    // Known and Foreseeable Hazards and Hazardous Situations
    // Columns: Risk Ref. # | Hazard | Sequence of Events | Hazardous Situation | Harm | UI Risk Control Measure
    async fillHazardsRow(rowIndex, { riskRef, hazard, sequenceOfEvents, hazardousSituation, harm, riskControlMeasure }) {
        const section = this.page.locator('p').filter({ hasText: 'Known and Foreseeable Hazards and Hazardous Situations' }).locator('xpath=..');
        const row = section.locator('table tbody tr').nth(rowIndex);
        const values = [riskRef, hazard, sequenceOfEvents, hazardousSituation, harm, riskControlMeasure];
        for (let i = 0; i < values.length; i++) {
            const cell = row.getByRole('textbox').nth(i);
            await cell.scrollIntoViewIfNeeded();
            await cell.click();
            await cell.fill(values[i]);
        }
    }

    // Hazard Related User Scenarios for Summative Evaluation
    // Columns: HRUS # | Hazardous Situation | Hazard-Related User Scenario | Associated Risk # | Include in Summative (radio) | Rationale
    async fillHRUSRow(rowIndex, { hrusNo, scenario, hazardRelatedUserScenario, associatedRisk, includeInSummative, rationale }) {
        const section = this.page.locator('p').filter({ hasText: 'Hazard Related User Scenarios for Summative Evaluation' }).locator('xpath=..');
        const row = section.locator('table tbody tr').nth(rowIndex);
        const textboxes = row.getByRole('textbox');
        await textboxes.nth(0).fill(hrusNo);
        await textboxes.nth(1).fill(scenario);
        await textboxes.nth(2).fill(hazardRelatedUserScenario);
        await textboxes.nth(3).fill(associatedRisk);
        await row.getByRole('radio', { name: includeInSummative }).click();
        await textboxes.nth(4).fill(rationale);
    }

    // User Interface Specification
    // Columns: UIE# | UI Element | Expressed User Need | UI Requirements | When to Evaluate | UI of Unknown Provenance
    async fillUISpecRow(rowIndex, { uieNo, uiElement, expressedUserNeed, uiRequirements, whenToEvaluate, uiUnknownProvenance }) {
        const section = this.page.locator('p').filter({ hasText: 'User Interface Specification' }).locator('xpath=..');
        const row = section.locator('table tbody tr').nth(rowIndex);
        const values = [uieNo, uiElement, expressedUserNeed, uiRequirements, whenToEvaluate, uiUnknownProvenance];
        for (let i = 0; i < values.length; i++) {
            const cell = row.getByRole('textbox').nth(i);
            await cell.scrollIntoViewIfNeeded();
            await cell.click();
            await cell.fill(values[i]);
        }
    }

    // ── UEP Save / Complete ───────────────────────────────────────────────────

    async saveAndCompleteUEP() {
        await this.page.waitForTimeout(1000);

        // Click outside tables to trigger React state update and enable Save
        await this.page.getByText('Usability Evaluation Plan (UEP)').first().click();
        await this.page.waitForTimeout(2000);

        // Click Save
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('UEP: Clicked Save');
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
        console.log('UEP: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        // Handle completion toast (soft)
        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }
    }

}

module.exports = { VVPage };
