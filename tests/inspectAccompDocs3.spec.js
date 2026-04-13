const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('deep inspect Accompanying Documents entries', async ({ page }) => {
    test.setTimeout(3000000);

    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);

    const deviceMenu = page.locator('ul li').nth(0);
    await deviceMenu.waitFor({ state: 'visible' });
    await deviceMenu.click();
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    await page.getByText('Surgical Mask All Doc Complete 2').first().click();
    await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    // Navigate directly via URL
    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    await page.goto(`${base}/labelling/accompanying-documents`);
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 20000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    console.log('URL:', page.url());
    await page.screenshot({ path: 'accomp-full-before-expand.png', fullPage: true });

    // ── Scan full page structure ───────────────────────────────────────────────
    const structure = await page.evaluate(() => {
        const res = {};

        // All visible text nodes grouped by sections
        res.allText = Array.from(document.querySelectorAll('h2, h3, h4, p, label, legend, span'))
            .map(el => ({ tag: el.tagName, text: el.textContent?.trim().substring(0, 120) }))
            .filter(x => x.text && x.text.length > 1);

        // All inputs
        res.inputs = Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, [role="combobox"], [contenteditable="true"]'
        )).map((el, i) => ({
            i, tag: el.tagName, type: el.getAttribute('type') || '',
            id: el.id || '', name: el.getAttribute('name') || '',
            placeholder: el.getAttribute('placeholder') || '',
            role: el.getAttribute('role') || '', value: el.value?.substring(0, 50) || ''
        }));

        // All buttons
        res.buttons = Array.from(document.querySelectorAll('button'))
            .map(b => ({
                text: b.textContent?.trim().substring(0, 60),
                role: b.getAttribute('role') || '',
                disabled: b.disabled
            })).filter(b => b.text);

        // File inputs
        res.fileInputs = Array.from(document.querySelectorAll('input[type="file"]'))
            .map((el, i) => ({ i, name: el.getAttribute('name') || '', accept: el.getAttribute('accept') || '' }));

        return res;
    });

    console.log('=== ALL TEXT ===');
    console.log(JSON.stringify(structure.allText, null, 2));
    console.log('=== INPUTS ===');
    console.log(JSON.stringify(structure.inputs, null, 2));
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(structure.buttons, null, 2));
    console.log('=== FILE INPUTS ===');
    console.log(JSON.stringify(structure.fileInputs, null, 2));

    // ── Try expanding / clicking the IFU 1 entry ─────────────────────────────
    const ifuEntry = page.getByText(/IFU\s*1/i).first();
    if (await ifuEntry.isVisible().catch(() => false)) {
        await ifuEntry.click();
        await page.waitForTimeout(1500);
        console.log('Clicked IFU 1 entry');
        await page.screenshot({ path: 'accomp-ifu1-expanded.png', fullPage: true });
    }

    // ── Open the Select combobox to see options ────────────────────────────────
    const selectCombo = page.locator('[role="combobox"]').first();
    if (await selectCombo.isVisible().catch(() => false)) {
        await selectCombo.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'accomp-select-options.png', fullPage: false });

        const options = await page.locator('[data-radix-popper-content-wrapper] [role="option"]').allTextContents();
        console.log('=== SELECT COMBOBOX OPTIONS ===');
        console.log(JSON.stringify(options, null, 2));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }

    // ── Re-scan after IFU entry expanded ─────────────────────────────────────
    const expanded = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, [role="combobox"], input[type="file"]'
        )).map((el, i) => ({
            i, tag: el.tagName, type: el.getAttribute('type') || '',
            id: el.id || '', name: el.getAttribute('name') || '',
            placeholder: el.getAttribute('placeholder') || '',
            role: el.getAttribute('role') || ''
        }));
    });
    console.log('=== INPUTS AFTER EXPAND ===');
    console.log(JSON.stringify(expanded, null, 2));

    // Full page screenshot at end
    await page.screenshot({ path: 'accomp-full-final.png', fullPage: true });
});
