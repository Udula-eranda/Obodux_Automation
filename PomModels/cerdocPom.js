const { expect , test } = require("@playwright/test");
const { cerData, cerSectionData } = require('../Utils/testData');

class cerDoc{

    constructor(page){
        this.page = page;
    }

    //close cepDoc Menu
    async closeCEPDoc(){

        await this.page.waitForTimeout(3000);
        const cepCollapseBtn = this.page.locator("[id*='radix-']").nth(3);
        await expect(cepCollapseBtn).toBeVisible();
        await cepCollapseBtn.click({ force: true });

    }
    
    //open CER Section
    async openCERSection(){

        await this.page.waitForTimeout(2000);
        // Re-navigate to Clinical Evaluation to guarantee a clean accordion state
        const ceLink = this.page.getByRole('link', { name: 'Clinical Evaluation' });
        await ceLink.click();
        await this.page.waitForTimeout(3000);

        // The CE page has two h3 accordion buttons: CEP (index 0) and CER (index 1)
        const h3Buttons = this.page.locator('h3 button');
        await h3Buttons.nth(1).scrollIntoViewIfNeeded();
        await h3Buttons.nth(1).click();
        await this.page.waitForTimeout(3000);

    }

    //open CER sub menu and navigates into CER page
    async openCERSubMenu(){

        await this.page.waitForTimeout(3000);
        const soaBtn = this.page.locator("[id*='radix-']").nth(7)
        await expect(soaBtn).toBeVisible();
        await expect(soaBtn).toBeEnabled();
        await soaBtn.click();

    }

    //open the sub menu Literature Search Protocol
    async openLSPSubMenu(){

        const lspBtn = this.page.getByText('Literature Search Protocol');
        await lspBtn.click();
        await this.page.waitForTimeout(3000);

        // const lspField = page.locator("[class*='border px-3']").nth(0);
        // await expect(lspField).toBeVisible();
        // await expect(lspField).toBeEnabled();
        // await lspField.click();

        // //Ai feature catching
        // const aiBtn =  page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        // await aiBtn.waitFor({ state: 'visible', timeout: 10000 });
        // await expect(aiBtn).toBeEnabled();
        // await aiBtn.click();
            
        // //wait to AI to generate
        // await lspField.waitFor({ state: 'visible' });
        // await expect(lspField).not.toHaveText("");
        // await aiBtn.click();

    }

    //-------------State of Art Section-------------------------
    async stateOfArtSection(){

        for (let i = 0; i < 11; i++) {

            console.log(`🧩 Processing field ${i + 1}`);

            // Target each LSP field by index
            const soa = this.page.locator("[class*='border px-3']").nth(i);
            await expect(soa).toBeVisible();
            await expect(soa).toBeEnabled();
            await soa.click();

            // Locate the AI button (first visible)
            const aiBtn = this.page.locator(
                ".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg"
            ).first();

            await aiBtn.waitFor({ state: 'visible', timeout: 15000 });
            await expect(aiBtn).toBeEnabled();
            await aiBtn.click();

            // Wait for AI to populate content
            await soa.waitFor({ state: 'visible' });
            await expect(soa).not.toHaveText("");

            // Optionally click the AI button again if needed
            await aiBtn.click();

            // Small pause before moving to next field
            await this.page.waitForTimeout(2000);
        }

    }

    //-------------Pre Clinical Data-----------------------

    //Safety n Performance
    async safetyNperformance(safetyNperfomData){
        const fields = this.page.locator("[class*='w-full p-2'] textarea");

        
        for (let i = 0 ; i < 9 ; i++){
            console.log('🧩 Processing Safety n Performance field ' + (i + 1));
            const safetyNPerform = fields.nth(i);
            await expect(safetyNPerform).toBeVisible();
            await expect(safetyNPerform).toBeEnabled();
            await safetyNPerform.fill(safetyNperfomData[i])
        }

    }


    //Usability Testing
    async usabilityTest(usabilityTestData){
        const fields = this.page.locator("[class*='w-full p-2'] textarea");

        // starting field index
        let fieldIndex = 9;

        for (let i = 0 ; i < usabilityTestData.length ; i++){
            console.log('🧩 Processing of Usability Testing field ' + (i ));

            const usabilityTest = fields.nth(fieldIndex);
            await expect(usabilityTest).toBeVisible();
            await expect(usabilityTest).toBeEnabled();

            await usabilityTest.fill(usabilityTestData[i]);
            fieldIndex++;
        }

    }

    //Biocompatibility Report
    async bioCompatability(bioCompatabilityData){

        const fields = this.page.locator("[class*='w-full p-2'] textarea");

        // starting field index
        let fieldIndex = 18;

        for (let i = 0 ; i < bioCompatabilityData.length ; i++){
            console.log('🧩 Processing of Usability Testing field ' + (i ));

            const bioCompatabilityTest = fields.nth(fieldIndex);
            await expect(bioCompatabilityTest).toBeVisible();
            await expect(bioCompatabilityTest).toBeEnabled();

            await bioCompatabilityTest.fill(bioCompatabilityData[i]);
            fieldIndex++;
        }

    }




    // ─── helper ───────────────────────────────────────────────────────────────
    async navigateToSection(sectionText){
        const link = this.page.getByText(sectionText, { exact: true }).first();
        await link.waitFor({ state: 'visible' });
        await link.click();
        await this.page.waitForTimeout(3000);
    }

    async fillWithAI(field){
        await field.click();
        const aiBtn = this.page.locator(".inline-flex.items-center.justify-center.whitespace-nowrap.font-sans.bg-transparent.border-0.shadow-none.text-sm.gap-2.p-2.h-fit.rounded-lg").first();
        await aiBtn.waitFor({ state: 'visible', timeout: 15000 });
        await aiBtn.click();
        await this.page.waitForTimeout(8000);
        await field.waitFor({ state: 'visible' });
        await expect(field).not.toHaveText('');
        // Close the AI panel — wrap in try/catch to handle transient browser state
        try {
            if (await aiBtn.isVisible()) await aiBtn.click();
        } catch (e) {
            // AI panel already closed or page navigated — safe to continue
        }
        await this.page.waitForTimeout(1000);
    }

    // ─── 1. Clinical Evaluation Overview ──────────────────────────────────────
    async clinicalEvalOverview(){
        await this.navigateToSection('Clinical Evaluation Overview');

        // check first checkbox
        const checkbox = this.page.getByRole('checkbox').first();
        await expect(checkbox).toBeVisible();
        await checkbox.check();
        await this.page.waitForTimeout(1000);

        // fill Demonstration of Equivalence Justification
        const equivField = this.page.locator('[contenteditable="true"]').first();
        await equivField.click();
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type('Equivalence Justification: ');
        await this.page.keyboard.press('Control+b');
        await this.page.keyboard.type(cerSectionData.equivalenceJustification);
    }

    // ─── 2. Clinical Data Generated and Held by the Manufacturer ─────────────
    async clinicalDataManufacturer(){
        await this.navigateToSection('Clinical Data Generated and Held by the Manufacturer');

        // select Yes
        const yesRadio = this.page.getByRole('radio', { name: 'Yes' }).first();
        await expect(yesRadio).toBeVisible();
        await yesRadio.click();
        await this.page.waitForTimeout(1500);

        // fill PMS summary textarea
        const pmsField = this.page.locator('textarea').first();
        await expect(pmsField).toBeVisible();
        await pmsField.fill(cerSectionData.pmsDataSummary);
    }

    // ─── 3. Clinical Data from Literature ────────────────────────────────────
    async clinicalDataLiterature(){
        await this.navigateToSection('Clinical Data from Literature');

        // 2 text boxes per user instruction
        const fields = this.page.locator("[class*='border px-3']");
        for (let i = 0; i < 2; i++){
            await this.fillWithAI(fields.nth(i));
        }
    }

    // ─── 4. Other Sources of Clinical Data ───────────────────────────────────
    async otherSourcesClinicalData(){
        await this.navigateToSection('Other Sources of Clinical Data');

        // 2 text boxes per user instruction
        const fields = this.page.locator("[class*='border px-3']");
        for (let i = 0; i < 2; i++){
            await this.fillWithAI(fields.nth(i));
        }
    }

    // ─── 5. Summary and Appraisal of Clinical Data ───────────────────────────
    async summaryAppraisalClinicalData(){
        await this.navigateToSection('Summary and Appraisal of Clinical Data');
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await this.page.waitForTimeout(3000);

        const rows = cerSectionData.summaryAppraisalRows;
        const flat = rows.flat();

        // Table cells use Lexical rich-text editors (contenteditable divs)
        const cells = this.page.locator('[contenteditable="true"]');
        for (let i = 0; i < flat.length; i++){
            const cell = cells.nth(i);
            if (await cell.isVisible()){
                await cell.click();
                await this.page.keyboard.press('Control+a');
                await this.page.keyboard.type(flat[i]);
                await this.page.waitForTimeout(200);
            }
        }
    }

    // ─── 6. Analysis of the Clinical Data in Relation to GSPRs ───────────────
    async analysisGSPRs(){
        await this.navigateToSection('Analysis of the Clinical Data in Relation to GSPRs');

        // All CER sections live on one scrollable page.
        // Index 0 of "Yes/No" radios belongs to section 2 (Clinical Data Manufacturer) —
        // skip it here so we don't accidentally override that required field.
        const yesRadios = this.page.getByRole('radio', { name: 'Yes' });
        const noRadios  = this.page.getByRole('radio', { name: 'No' });
        const radioCount = await yesRadios.count();

        for (let i = 1; i < radioCount; i++){
            const radio = Math.random() > 0.5 ? yesRadios.nth(i) : noRadios.nth(i);
            await radio.scrollIntoViewIfNeeded();
            await radio.click();
            await this.page.waitForTimeout(300);
        }

        // Fill each justification field with static text (faster than AI)
        const fields = this.page.locator("[class*='border px-3']");
        const fieldCount = await fields.count();
        for (let i = 0; i < fieldCount; i++){
            const editableField = fields.nth(i).locator('[contenteditable="true"]');
            if (await editableField.count() > 0){
                await editableField.click();
                await this.page.keyboard.type(cerSectionData.gsprJustification);
            }
            await this.page.waitForTimeout(200);
        }
    }

    // ─── 7. Acceptability to the Objectives ──────────────────────────────────
    async acceptabilityObjectives(){
        await this.navigateToSection('Acceptability to the objectives');

        // fill each visible field with AI (limit to 3 max)
        const fields = this.page.locator("[class*='border px-3']");
        const count = Math.min(await fields.count(), 3);
        for (let i = 0; i < count; i++){
            await this.fillWithAI(fields.nth(i));
        }
    }

    // ─── 8. Conclusion ────────────────────────────────────────────────────────
    async conclusion(){
        await this.navigateToSection('Conclusion');

        // fill conclusion field with AI
        const conclusionField = this.page.locator("[class*='border px-3']").first();
        await this.fillWithAI(conclusionField);

        // select Yearly review option
        const yearlyRadio = this.page.getByRole('radio', { name: /yearly/i });
        await expect(yearlyRadio).toBeVisible();
        await yearlyRadio.click();
        await this.page.waitForTimeout(1000);

        // Date of Next Review — Radix/Shadcn custom date picker (no native input[type=date])
        const datePickerBtn = this.page.locator('button[aria-haspopup="dialog"]').first();
        if (await datePickerBtn.isVisible()){
            await datePickerBtn.click();
            await this.page.waitForTimeout(1500);
            // pick first enabled day in the calendar
            const dayBtn = this.page.locator('[role="gridcell"] button:not([disabled])').first();
            if (await dayBtn.isVisible()) await dayBtn.click();
        }
    }

    // ─── 9. Qualifications of the Responsible Evaluators ─────────────────────
    async qualificationsEvaluators(){
        await this.navigateToSection('Qualifications of the Responsible Evaluators');

        const quals = cerSectionData.qualifications;

        for (let r = 0; r < quals.length; r++){
            // Target the r-th table row to scope inputs to that row only
            const row = this.page.locator('table tbody tr').nth(r);
            const inputs = row.locator('input[type="text"], textarea');

            const count = await inputs.count();
            if (count >= 1) await inputs.nth(0).fill(quals[r].name);
            if (count >= 2) await inputs.nth(1).fill(quals[r].qualification);
            if (count >= 3) await inputs.nth(2).fill(quals[r].experience);
            if (count >= 4) await inputs.nth(3).fill(quals[r].role);

            // upload CV file for this row
            const fileInput = row.locator('input[type="file"]');
            if (await fileInput.count() > 0){
                await fileInput.setInputFiles(cerSectionData.qualificationPdfPath);
                await this.page.waitForTimeout(2000);
            }
        }
    }

    // ─── 10. Changes ─────────────────────────────────────────────────────────
    async changesSection(){
        await this.navigateToSection('Changes');

        const changes = cerSectionData.changes;
        for (let r = 0; r < changes.length; r++){
            // Scope to the r-th table row to avoid index collisions
            const row = this.page.locator('table tbody tr').nth(r);
            const inputs = row.locator('textarea, input[type="text"], [contenteditable="true"]');
            const count = await inputs.count();
            if (count >= 1){
                const desc = inputs.nth(0);
                if (await desc.getAttribute('contenteditable')){
                    await desc.click();
                    await this.page.keyboard.type(changes[r].description);
                } else {
                    await desc.fill(changes[r].description);
                }
            }
            if (count >= 2){
                await inputs.nth(1).fill(changes[r].version).catch(async () => {
                    await inputs.nth(1).click();
                    await this.page.keyboard.type(changes[r].version);
                });
            }
        }
    }

    // ─── 11. Equivalence Table ────────────────────────────────────────────────
    async equivalenceTable(){
        await this.navigateToSection('Equivalence Table');

        const eq = cerSectionData.equivalenceTable;
        const fields = Object.values(eq);

        // Try inputs first; fall back to contenteditable cells
        const inputs = this.page.locator('input[type="text"], textarea');
        const editables = this.page.locator('[contenteditable="true"]');

        const inputCount = await inputs.count();
        const src = inputCount >= fields.length ? inputs : editables;

        for (let i = 0; i < fields.length; i++){
            const el = src.nth(i);
            await el.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
            if (await el.isVisible()){
                const isEditable = await el.getAttribute('contenteditable');
                if (isEditable){
                    await el.click();
                    await this.page.keyboard.press('Control+a');
                    await this.page.keyboard.type(fields[i]);
                } else {
                    await el.fill(fields[i]);
                }
            }
        }
    }

    // ─── Final save & complete ────────────────────────────────────────────────
    async cerSaveAndComplete(){
        await this.page.waitForTimeout(3000);

        const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        await expect(saveBtn).toBeVisible();
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();

        const toast = this.page.locator("li[role='status']");
        await expect(toast).toBeVisible();
        await toast.waitFor({ state: 'hidden' });

        await this.page.waitForTimeout(5000);

        const completeBtn = this.page.getByRole('button', { name: ' Mark Section Complete' });
        if (await completeBtn.isVisible()){
            await expect(completeBtn).toBeEnabled();
            await completeBtn.click();
            await this.page.waitForTimeout(4000);
            const toast2 = this.page.locator("li[role='status']");
            await expect(toast2).toBeVisible();
            await toast2.waitFor({ state: 'hidden' });
        }
    }

    //Save Draft button
    async saveDraftBtn(){
        
        await this.page.waitForTimeout(6000);
        const saveDraftBtn  = this.page.getByRole("button" , {name : "Save Draft" , exact: true});
        await expect(saveDraftBtn).toBeVisible();
        await expect(saveDraftBtn).toBeEnabled();
        await saveDraftBtn.click();
        const toast2 = this.page.locator("li[role='status']");
        await expect(toast2).toBeVisible();
        await expect(toast2).toHaveText("Draft saved successfully");
        await toast2.waitFor({ state: "hidden" });
        
    }

}

module.exports = { cerDoc }