const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');
const { verificationsData: vd } = require('../Utils/testData');

const DEVICE_ID = '8daf712d-f07b-4fd2-aa14-bf3bf44b158c';

const FER  = vd.pdfs.fer;
const CPV  = vd.pdfs.cpv;

test('Verifications – Section 13 only (Performance/Safety/Other)', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes

    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(4000);
    await skipTourIfPresent(page);

    const url = `${URL.siteLink}editor/device-documentation/${DEVICE_ID}/verification-and-validation/verifications`;
    await page.goto(url);
    await page.waitForTimeout(4000);

    // Scroll to section 13
    await page.evaluate(() => {
        const el = document.querySelector('#performance-safety-other');
        if (el) el.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(1000);

    // Wait for section 13 table and Add Row button
    const s13Table = page.locator('#performance-safety-other table').first();
    await s13Table.waitFor({ state: 'visible', timeout: 30000 });
    const s13AddBtn = page.locator('#performance-safety-other button').filter({ hasText: 'Add Row' }).first();
    await s13AddBtn.waitFor({ state: 'visible', timeout: 15000 });

    // Helper: scroll within the inner scroll container
    const scrollToEl = async (locator, ratio = 0.4) => {
        await locator.evaluate((el, r) => {
            const s = el.closest('.overflow-y-auto') || document.querySelector('.overflow-y-auto');
            if (!s) return;
            const sr = s.getBoundingClientRect(), er = el.getBoundingClientRect();
            s.scrollTop = er.top - sr.top + s.scrollTop - s.clientHeight * r;
        }, ratio);
    };

    for (let i = 0; i < vd.section13.rows.length; i++) {
        const rowData = vd.section13.rows[i];

        // 1. Click Add Row
        await scrollToEl(s13AddBtn, 0.6);
        await page.waitForTimeout(300);
        await s13AddBtn.click({ force: true });
        await page.waitForTimeout(800);

        // 2. Click the new row's first editable cell to open the edit modal
        const lastRow = s13Table.locator('tbody tr').last();
        await lastRow.waitFor({ state: 'visible', timeout: 10000 });
        await scrollToEl(lastRow, 0.4);
        await page.waitForTimeout(300);
        await lastRow.locator('td').nth(1).click({ force: true });

        // 3. Wait for the row-edit modal
        const modal = page.getByRole('dialog');
        await modal.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`  Section 13 row ${i + 1}: modal opened ✓`);

        // 4-5. Fill text inputs (no explicit type attr — use getByRole)
        await modal.getByRole('textbox').nth(0).click();
        await modal.getByRole('textbox').nth(0).fill(rowData.docNumber);
        await modal.getByRole('textbox').nth(1).click();
        await modal.getByRole('textbox').nth(1).fill(rowData.title);

        // 6. Upload file and wait for upload toast to fully disappear
        const fcPromise = page.waitForEvent('filechooser');
        await modal.getByText('Click here or drag & drop your file.').click();
        const fc = await fcPromise;
        await fc.setFiles(i === 0 ? FER : CPV);
        await page.waitForTimeout(1000);
        const uploadToast = page.locator("li[role='status']").first();
        try {
            await uploadToast.waitFor({ state: 'visible', timeout: 10000 });
            console.log('  Upload toast visible – waiting...');
            await uploadToast.waitFor({ state: 'hidden', timeout: 20000 });
            console.log('  Upload toast dismissed ✓');
        } catch {
            await page.waitForTimeout(2000);
        }

        // 7-9. Fill textareas
        await modal.getByRole('textbox').nth(2).click();
        await modal.getByRole('textbox').nth(2).fill(rowData.aim);
        await modal.getByRole('textbox').nth(3).click();
        await modal.getByRole('textbox').nth(3).fill(rowData.methods);
        await modal.getByRole('textbox').nth(4).click();
        await modal.getByRole('textbox').nth(4).fill(rowData.results);

        // 10. Click Save in the modal
        await modal.getByRole('button', { name: /^save$/i }).click();
        await modal.waitFor({ state: 'hidden', timeout: 30000 });

        // 11. Wait for row-save toast
        const saveToast = page.locator("li[role='status']").first();
        try {
            await saveToast.waitFor({ state: 'visible', timeout: 6000 });
            console.log('  Toast visible – waiting for it to disappear...');
            await saveToast.waitFor({ state: 'hidden', timeout: 20000 });
            console.log('  Toast dismissed ✓');
        } catch {
            await page.waitForTimeout(500);
        }

        console.log(`  Section 13 row ${i + 1} filled ✓`);
    }

    // Click outside the form to release focus and enable the Save button
    await page.waitForTimeout(1000);
    await page.getByText('Verifications', { exact: true }).first().click();
    await page.waitForTimeout(2000);

    // Save
    const { expect } = require('@playwright/test');
    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveBtn).toBeVisible({ timeout: 10000 });
    await expect(saveBtn).toBeEnabled({ timeout: 10000 });
    await saveBtn.click();
    console.log('Verifications: Save ✓');
    await page.waitForTimeout(2000);

    try {
        const toast = page.locator("li[role='status']");
        await expect(toast).toBeVisible({ timeout: 5000 });
        await toast.waitFor({ state: 'hidden', timeout: 15000 });
    } catch { /* no toast */ }

    await page.waitForTimeout(2000);

    // Mark Section Complete
    const completeBtn = page.getByRole('button', { name: /Mark Section Complete/i });
    await expect(completeBtn).toBeVisible({ timeout: 20000 });
    await expect(completeBtn).toBeEnabled({ timeout: 10000 });
    await completeBtn.click();
    console.log('Verifications: Mark Section Complete ✓');
    await page.waitForTimeout(3000);

    try {
        const toast2 = page.locator("li[role='status']");
        await expect(toast2).toBeVisible({ timeout: 5000 });
        await toast2.waitFor({ state: 'hidden', timeout: 15000 });
    } catch { /* no toast */ }

    console.log('\nSection 13 complete ✓');
});
