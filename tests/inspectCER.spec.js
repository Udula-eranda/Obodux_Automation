const { test, expect } = require('@playwright/test');

test('Inspect CER document on existing Trocar device', async ({ page }) => {

    test.setTimeout(300000);

    // ── Login ─────────────────────────────────────────────────────────────────
    await page.goto('https://web.staging.obodux.boris-software.com');
    await page.waitForTimeout(3000);

    await page.getByLabel('Email').fill('editor-stag.1@yopmail.com');
    await page.getByLabel('Password').fill('abcd@TEST123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForTimeout(5000);

    // ── Click the first Trocar device in the list ─────────────────────────────
    await page.getByText('Trocar').first().click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: '.playwright-mcp/cer-inspect-01-device-home.png', fullPage: true });

    // ── Navigate to Clinical Evaluation ──────────────────────────────────────
    await page.getByRole('link', { name: 'Clinical Evaluation' }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '.playwright-mcp/cer-inspect-02-ce-page.png', fullPage: true });

    // ── Expand CER accordion (index 1) ────────────────────────────────────────
    const h3Buttons = page.locator('h3 button');
    const btnCount = await h3Buttons.count();
    console.log(`h3 buttons found: ${btnCount}`);
    for (let i = 0; i < btnCount; i++) {
        const txt = await h3Buttons.nth(i).innerText();
        console.log(`  h3[${i}]: "${txt}"`);
    }

    await h3Buttons.nth(1).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '.playwright-mcp/cer-inspect-03-cer-expanded.png', fullPage: true });

    // ── Log all sidebar sub-section links visible under CER ──────────────────
    const sidebarLinks = page.locator('nav a, aside a, [role="navigation"] a');
    const linkCount = await sidebarLinks.count();
    console.log(`\nSidebar links (${linkCount}):`);
    for (let i = 0; i < linkCount; i++) {
        const txt = await sidebarLinks.nth(i).innerText();
        if (txt.trim()) console.log(`  [${i}] "${txt.trim()}"`);
    }

    // ── Walk through each sub-section ────────────────────────────────────────
    const sections = [
        'Clinical Evaluation Overview',
        'Clinical Data Generated and Held by the Manufacturer',
        'Clinical Data from Literature',
        'Other Sources of Clinical Data',
        'Summary and Appraisal of Clinical Data',
        'Analysis of the Clinical Data in Relation to GSPRs',
        'Acceptability to the objectives',
        'Conclusion',
        'Qualifications of the Responsible Evaluators',
        'Changes',
        'Equivalence Table',
    ];

    for (let s = 0; s < sections.length; s++) {
        const section = sections[s];
        try {
            const link = page.getByText(section, { exact: true }).first();
            await link.waitFor({ state: 'visible', timeout: 8000 });
            await link.click();
            await page.waitForTimeout(3000);

            // Log Save button state
            const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
            const saveBtnCount = await saveBtn.count();
            let saveBtnEnabled = 'not found';
            if (saveBtnCount > 0) {
                saveBtnEnabled = await saveBtn.isEnabled() ? 'ENABLED' : 'DISABLED';
            }
            console.log(`\n[Section ${s + 1}] "${section}"`);
            console.log(`  Save button: ${saveBtnEnabled}`);

            // Log all input/textarea/contenteditable counts
            const inputs = page.locator('input[type="text"], input:not([type])');
            const textareas = page.locator('textarea');
            const richtext = page.locator('[contenteditable="true"]');
            const radios = page.locator('input[type="radio"]');
            const checkboxes = page.locator('input[type="checkbox"]');
            const tables = page.locator('table');
            const richtextBorder = page.locator("[class*='border px-3']");

            console.log(`  text inputs: ${await inputs.count()}`);
            console.log(`  textareas: ${await textareas.count()}`);
            console.log(`  contenteditable: ${await richtext.count()}`);
            console.log(`  border-richtext: ${await richtextBorder.count()}`);
            console.log(`  radios: ${await radios.count()}`);
            console.log(`  checkboxes: ${await checkboxes.count()}`);
            console.log(`  tables: ${await tables.count()}`);

            const slug = section.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 30);
            await page.screenshot({
                path: `.playwright-mcp/cer-inspect-${String(s + 4).padStart(2, '0')}-${slug}.png`,
                fullPage: true
            });

        } catch (err) {
            console.log(`\n[Section ${s + 1}] "${section}" — ERROR: ${err.message}`);
        }
    }

    // ── Final: check Save button state on Equivalence Table (last section) ───
    console.log('\n── Final Save button check (Equivalence Table) ──');
    const finalSave = page.getByRole('button', { name: 'Save', exact: true });
    const finalCount = await finalSave.count();
    console.log(`Save buttons on page: ${finalCount}`);
    if (finalCount > 0) {
        for (let i = 0; i < finalCount; i++) {
            const enabled = await finalSave.nth(i).isEnabled();
            const visible = await finalSave.nth(i).isVisible();
            console.log(`  Save[${i}]: visible=${visible}, enabled=${enabled}`);
        }
    }

    await page.screenshot({ path: '.playwright-mcp/cer-inspect-final.png', fullPage: true });
    console.log('\nInspection complete — screenshots saved to .playwright-mcp/');
});
