const { expect } = require('@playwright/test');

class LabellingPage {

    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateToLabels() {
        const link = this.page.getByRole('link', { name: /^labelling$/i }).first();
        await link.waitFor({ state: 'visible', timeout: 10000 });
        await link.click();
        await this.page.waitForURL(/labelling\/labels/, { timeout: 15000 });
        await this.page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 20000 }
        ).catch(() => {});
        await this.page.waitForTimeout(2000);
    }

    // ── UDI combobox helper — opens combobox and clicks "(Select All)" ────────

    async _selectAllUDIs(comboboxLocator) {
        await comboboxLocator.scrollIntoViewIfNeeded();
        await comboboxLocator.click();
        await this.page.waitForTimeout(1500);

        // Click "(Select All)" if available, otherwise click every option
        const selectAll = this.page.locator('[data-radix-popper-content-wrapper] [role="option"]')
            .filter({ hasText: /\(Select All\)/i });

        if (await selectAll.isVisible().catch(() => false)) {
            await selectAll.click();
            await this.page.waitForTimeout(500);
        } else {
            const options = this.page.locator('[data-radix-popper-content-wrapper] [role="option"]');
            const count = await options.count();
            for (let i = 0; i < count; i++) {
                await options.nth(i).click();
                await this.page.waitForTimeout(300);
            }
        }

        // Close the dropdown
        const closeOpt = this.page.locator('[data-radix-popper-content-wrapper] [role="option"]')
            .filter({ hasText: /^close$/i });
        if (await closeOpt.isVisible().catch(() => false)) {
            await closeOpt.click();
        } else {
            await this.page.keyboard.press('Escape');
        }
        await this.page.waitForTimeout(500);
    }

    // ── Fill Device Label row ─────────────────────────────────────────────────
    // Fields: Label Number | Rev Number | UDIs combobox | Label Description
    //         | Label Specification | Image Of Label

    async fillDeviceLabel({ labelNumber, revNumber, labelDescription, labelSpecification, imagePath }) {
        // Label Number
        const labelNumInput = this.page.locator('input[id="deviceLabels[0].labelNumber"]');
        await labelNumInput.scrollIntoViewIfNeeded();
        await labelNumInput.fill(labelNumber);

        // Rev Number
        await this.page.locator('input[id="deviceLabels[0].revNumber"]').fill(revNumber);

        // Select All Attributed Basic UDIs
        const deviceUDICombo = this.page.locator('[role="combobox"]').filter({ hasText: /select options/i }).first();
        await this._selectAllUDIs(deviceUDICombo);

        // Label Description
        await this.page.locator('textarea[id="deviceLabels[0].labelDescription"]').fill(labelDescription);

        // Label Specification
        await this.page.locator('textarea[id="deviceLabels[0].labelSpecification"]').fill(labelSpecification);

        // Image Of Label — file upload via click on drag-and-drop zone
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator('p').filter({ hasText: 'Click here or drag & drop your file.' }).first().click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imagePath);

        // Wait for upload success toast to appear then disappear before proceeding
        try {
            const uploadToast = this.page.locator("li[role='status']");
            await expect(uploadToast).toBeVisible({ timeout: 10000 });
            await uploadToast.waitFor({ state: 'hidden', timeout: 15000 });
            console.log('Labels: Device Label image upload toast dismissed ✓');
        } catch { /* toast already dismissed or did not appear */ }
        await this.page.waitForTimeout(1000);

        console.log('Labels: Device Label filled ✓');
    }

    // ── Fill Packaging Label row ──────────────────────────────────────────────

    async fillPackagingLabel({ labelNumber, revNumber, labelDescription, labelSpecification, imagePath }) {
        // Label Number
        const labelNumInput = this.page.locator('input[id="packagingLabels[0].labelNumber"]');
        await labelNumInput.scrollIntoViewIfNeeded();
        await labelNumInput.fill(labelNumber);

        // Rev Number
        await this.page.locator('input[id="packagingLabels[0].revNumber"]').fill(revNumber);

        // Select All Attributed Basic UDIs — second combobox
        const packagingUDICombo = this.page.locator('[role="combobox"]').filter({ hasText: /select options/i }).first();
        await this._selectAllUDIs(packagingUDICombo);

        // Label Description
        await this.page.locator('textarea[id="packagingLabels[0].labelDescription"]').fill(labelDescription);

        // Label Specification
        const pkgSpecArea = this.page.locator('textarea[id="packagingLabels[0].labelSpecification"]');
        await pkgSpecArea.fill(labelSpecification);

        // Force blur via JavaScript — moves focus away from the textarea
        await pkgSpecArea.evaluate(el => el.blur());
        await this.page.waitForTimeout(300);

        // Image Of Label — after device label image uploads, its zone is replaced by a preview,
        // so only ONE "Click here" zone remains on the page (the packaging one). Use .first().
        const pkgUploadZone = this.page.locator('p').filter({ hasText: 'Click here or drag & drop your file.' }).first();
        await pkgUploadZone.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await this.page.waitForTimeout(800);
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await pkgUploadZone.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imagePath);

        // Wait for upload success toast to appear then disappear before proceeding
        try {
            const uploadToast = this.page.locator("li[role='status']");
            await expect(uploadToast).toBeVisible({ timeout: 10000 });
            await uploadToast.waitFor({ state: 'hidden', timeout: 15000 });
            console.log('Labels: Packaging Label image upload toast dismissed ✓');
        } catch { /* toast already dismissed or did not appear */ }
        await this.page.waitForTimeout(1000);

        console.log('Labels: Packaging Label filled ✓');
    }

    // ── Is this device an implantable device? (Yes / No) ─────────────────────

    async selectImplantableDevice(answer) {
        // Radix UI radio buttons render as <button> elements — locate by button text
        const radioBtn = this.page.locator('button').filter({ hasText: new RegExp(`^${answer}$`, 'i') }).last();
        await radioBtn.scrollIntoViewIfNeeded();
        await radioBtn.click();
        await this.page.waitForTimeout(500);
        console.log(`Labels: Implantable device → ${answer} ✓`);
    }

    // ── Save + Mark Section Complete ──────────────────────────────────────────

    async saveLabels() {
        await this.page.waitForTimeout(1000);

        // Click Save
        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('Labels: Clicked Save');
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
        console.log('Labels: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        // Handle completion toast (soft)
        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed or did not appear */ }
    }


    // ── Navigate to e-IFU ────────────────────────────────────────────────────

    async navigateToEIFU() {
        // Click Labelling then e-IFU sub-link to ensure session context is established
        const labellingLink = this.page.getByRole('link', { name: /^Labelling$/i }).first();
        await labellingLink.waitFor({ state: 'visible', timeout: 10000 });
        await labellingLink.click();
        await this.page.waitForURL(/labelling\/labels/, { timeout: 15000 });
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(2000);

        const eifuLink = this.page.getByText(/^e-IFU$/i).first();
        await eifuLink.waitFor({ state: 'visible', timeout: 10000 });
        await eifuLink.click();
        await this.page.waitForURL(/labelling\/e-ifu/, { timeout: 10000 }).catch(() => {});
        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

        // Wait for the e-IFU section skeleton to fully clear
        await this.page.waitForFunction(() => {
            const anchor = document.querySelector('a[id="eifu"]');
            if (!anchor) return false;
            const container = anchor.closest('.section') || anchor.parentElement;
            if (!container) return false;
            return container.querySelectorAll('.animate-pulse').length === 0;
        }, { timeout: 60000 }).catch(() => {});

        await this.page.waitForTimeout(2000);
        console.log('eIFU: Navigated to e-IFU ✓');
    }

    // ── Fill e-IFU form ───────────────────────────────────────────────────────

    async fillEIFU({ eifuPresent, eifuWithHardCopy, selectFirstRisk, eifuURL }) {
        // Q1: Is there an E-IFU present?
        const presentYes = this.page.locator('button[role="radio"][value="yes"]').nth(0);
        const presentNo  = this.page.locator('button[role="radio"][value="no"]').nth(0);
        const q1Btn = eifuPresent === 'yes' ? presentYes : presentNo;
        await q1Btn.scrollIntoViewIfNeeded();
        await q1Btn.click();
        await this.page.waitForTimeout(1500);

        // Wait for new fields to appear after Yes
        await this.page.waitForFunction(() => {
            const anchor = document.querySelector('a[id="eifu"]');
            if (!anchor) return false;
            const container = anchor.closest('.section') || anchor.parentElement;
            if (!container) return false;
            return container.querySelectorAll('.animate-pulse').length === 0 &&
                   !!document.querySelector('#efiuURL');
        }, { timeout: 30000 }).catch(() => {});
        await this.page.waitForTimeout(500);
        console.log(`eIFU: Q1 (E-IFU present) → ${eifuPresent} ✓`);

        // Q2: Is the E-IFU provided alongside a physical hard copy?
        // This is the second radio group — use nth(1) for yes/no buttons
        const hardCopyYes = this.page.locator('button[role="radio"][value="yes"]').nth(1);
        const hardCopyNo  = this.page.locator('button[role="radio"][value="no"]').nth(1);
        const q2Btn = eifuWithHardCopy === 'yes' ? hardCopyYes : hardCopyNo;
        await q2Btn.scrollIntoViewIfNeeded();
        await q2Btn.click();
        await this.page.waitForTimeout(500);
        console.log(`eIFU: Q2 (with hard copy) → ${eifuWithHardCopy} ✓`);

        // Q3: Select risks — check the first checkbox (risksWitheifu-001)
        if (selectFirstRisk) {
            const firstRisk = this.page.locator('#risksWitheifu-001');
            await firstRisk.scrollIntoViewIfNeeded();
            await firstRisk.click();
            await this.page.waitForTimeout(400);
            console.log('eIFU: First risk checkbox checked ✓');
        }

        // Q4: Location of the e-IFU URL
        const urlInput = this.page.locator('input[id="efiuURL"]');
        await urlInput.scrollIntoViewIfNeeded();
        await urlInput.fill(eifuURL);
        await this.page.waitForTimeout(300);
        console.log('eIFU: URL filled ✓');
    }

    // ── Save e-IFU ────────────────────────────────────────────────────────────

    async saveEIFU() {
        await this.page.waitForTimeout(1000);

        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('eIFU: Clicked Save');
        await this.page.waitForTimeout(2000);

        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 5000 });
            await toast.waitFor({ state: 'hidden', timeout: 15000 });
        } catch { /* toast already dismissed */ }

        await this.page.waitForTimeout(3000);

        const completeBtn = this.page.getByRole('button', { name: /Mark Section Complete/i });
        await expect(completeBtn).toBeVisible({ timeout: 10000 });
        await expect(completeBtn).toBeEnabled();
        await completeBtn.click();
        console.log('eIFU: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed */ }
    }

    // ── Navigate to Accompanying Documents ────────────────────────────────────

    async navigateToAccompanyingDocs() {
        const base = this.page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
        if (!base) throw new Error('Cannot extract device base URL from: ' + this.page.url());
        await this.page.goto(`${base}/labelling/accompanying-documents`);
        await this.page.waitForFunction(
            () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
            { timeout: 20000 }
        ).catch(() => {});
        await this.page.waitForTimeout(2000);
        console.log('AccompDocs: Navigated to accompanying-documents ✓');
    }

    // ── Dropdown helper — opens a combobox and selects a matching option ──────

    async _selectDropdownOption(comboboxLocator, optionText) {
        await comboboxLocator.scrollIntoViewIfNeeded();
        await comboboxLocator.click();
        await this.page.waitForTimeout(800);
        const option = this.page.locator('[data-radix-popper-content-wrapper] [role="option"]')
            .filter({ hasText: new RegExp(optionText, 'i') }).first();
        await option.waitFor({ state: 'visible', timeout: 8000 });
        await option.click();
        await this.page.waitForTimeout(400);
    }

    // ── Fill IFU (Section 1) ──────────────────────────────────────────────────
    // Fields: Document Number | Rev Number | Language | Countries | Upload IFU

    async fillIFU({ documentNumber, revNumber, language, countries, pdfPath }) {
        // Expand "IFU 1" accordion entry
        const ifuEntry = this.page.getByText(/IFU\s*1/i).first();
        if (await ifuEntry.isVisible().catch(() => false)) {
            await ifuEntry.scrollIntoViewIfNeeded();
            await ifuEntry.click();
            await this.page.waitForTimeout(1200);
        }

        // Document Number
        const docNumInput = this.page.locator('input[id="ifu[0].documentNumber"]');
        await docNumInput.waitFor({ state: 'visible', timeout: 15000 });
        await docNumInput.fill(documentNumber);

        // Rev Number
        await this.page.locator('input[id="ifu[0].revNumber"]').fill(revNumber);

        // Language — first unnamed combobox after the rev number input (XPath sibling)
        const ifuLangCombo = this.page.locator('input[id="ifu[0].revNumber"]')
            .locator('xpath=following::button[@role="combobox"][1]');
        await this._selectDropdownOption(ifuLangCombo, language);

        // Countries — combobox with id="ifu[0].countries"
        const ifuCountriesCombo = this.page.locator('[id="ifu[0].countries"]');
        await this._selectDropdownOption(ifuCountriesCombo, countries);

        // Upload IFU — file input appears after the countries combobox (nth 1 after uploader at 0)
        const ifuFileInput = this.page.locator('input[type="file"]').nth(1);
        await ifuFileInput.setInputFiles(pdfPath);

        // Wait for upload toast to appear then disappear
        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 10000 });
            await toast.waitFor({ state: 'hidden', timeout: 30000 });
        } catch { /* toast already dismissed */ }
        await this.page.waitForTimeout(1000);
        console.log('AccompDocs: IFU section filled ✓');
    }

    // ── Fill Accompanying Document (Section 2) ────────────────────────────────
    // Fields: Doc Number | Rev Number | Doc Name | Language | Countries | Description | Upload

    async fillAccompanyingDocument({ documentNumber, revNumber, documentName, language, countries, description, pdfPath }) {
        // Check if AccompDoc entry is already expanded; if not, expand it
        const docNumInput = this.page.locator('input[id="accompanyingDocuments[0].documentNumber"]');

        if (!(await docNumInput.isVisible().catch(() => false))) {
            // Scroll to bottom of page to reveal Accompanying Documents section
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.page.waitForTimeout(600);

            // Find the first closed accordion item that's not in the IFU section
            const closedItems = this.page.locator('[data-state="closed"]');
            const count = await closedItems.count();
            if (count > 0) {
                await closedItems.last().scrollIntoViewIfNeeded();
                await closedItems.last().click();
                await this.page.waitForTimeout(1200);
            }
        }

        // Document Number
        await docNumInput.waitFor({ state: 'visible', timeout: 8000 });
        await docNumInput.scrollIntoViewIfNeeded();
        await docNumInput.fill(documentNumber);

        // Rev Number
        await this.page.locator('input[id="accompanyingDocuments[0].revNumber"]').fill(revNumber);

        // Document Name
        await this.page.locator('input[id="accompanyingDocuments[0].documentName"]').fill(documentName);

        // Language — first unnamed combobox after the documentName input
        const accompLangCombo = this.page.locator('input[id="accompanyingDocuments[0].documentName"]')
            .locator('xpath=following::button[@role="combobox"][1]');
        await this._selectDropdownOption(accompLangCombo, language);

        // Countries — combobox with id="accompanyingDocuments[0].countries"
        const accompCountriesCombo = this.page.locator('[id="accompanyingDocuments[0].countries"]');
        await this._selectDropdownOption(accompCountriesCombo, countries);

        // Description
        const descArea = this.page.locator('textarea[id="accompanyingDocuments[0].description"]');
        await descArea.scrollIntoViewIfNeeded();
        await descArea.fill(description);
        await descArea.evaluate(el => el.blur());
        await this.page.waitForTimeout(300);

        // Upload file — find the file input that follows the description textarea in DOM order.
        // Using XPath following:: is position-independent: avoids nth() issues caused by the IFU
        // upload zone being replaced by a preview (removing its file input from the DOM).
        const accompFileInput = this.page
            .locator('textarea[id="accompanyingDocuments[0].description"]')
            .locator('xpath=following::input[@type="file"][1]');
        await accompFileInput.waitFor({ state: 'attached', timeout: 30000 });
        await accompFileInput.setInputFiles(pdfPath);

        // Wait for upload toast to appear then disappear
        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 10000 });
            await toast.waitFor({ state: 'hidden', timeout: 30000 });
        } catch { /* toast already dismissed */ }
        await this.page.waitForTimeout(1000);
        console.log('AccompDocs: Accompanying Document section filled ✓');
    }

    // ── Save Accompanying Docs ─────────────────────────────────────────────────

    async saveAccompanyingDocs() {
        await this.page.waitForTimeout(1000);

        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        console.log('AccompDocs: Clicked Save');
        await this.page.waitForTimeout(2000);

        try {
            const toast = this.page.locator("li[role='status']");
            await expect(toast).toBeVisible({ timeout: 5000 });
            await toast.waitFor({ state: 'hidden', timeout: 15000 });
        } catch { /* toast already dismissed */ }

        await this.page.waitForTimeout(3000);

        const completeBtn = this.page.getByRole('button', { name: /Mark Section Complete/i });
        await expect(completeBtn).toBeVisible({ timeout: 10000 });
        await expect(completeBtn).toBeEnabled();
        await completeBtn.click();
        console.log('AccompDocs: Clicked Mark Section Complete');
        await this.page.waitForTimeout(3000);

        try {
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible({ timeout: 5000 });
            await toast2.waitFor({ state: 'hidden', timeout: 10000 });
        } catch { /* toast already dismissed */ }
    }

}

module.exports = { LabellingPage };
