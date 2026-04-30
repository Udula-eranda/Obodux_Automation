const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

const DEVICE_ID = '8daf712d-f07b-4fd2-aa14-bf3bf44b158c';

test('Inspect Section 13 – snapshot inputs immediately after Add Row', async ({ page }) => {
    test.setTimeout(120000);

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
        else {
            const scroller = document.querySelector('.overflow-y-auto');
            if (scroller) scroller.scrollTop = scroller.scrollHeight;
        }
    });
    await page.waitForTimeout(2000);

    const s13Table = page.locator('#performance-safety-other table').first();
    await s13Table.waitFor({ state: 'visible', timeout: 15000 });

    const s13AddBtn = page.locator('#performance-safety-other button').filter({ hasText: 'Add Row' }).first();
    await s13AddBtn.waitFor({ state: 'visible', timeout: 15000 });

    // --- SNAPSHOT BEFORE Add Row ---
    const beforeInputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input[placeholder="Type..."], textarea[placeholder="Type..."]'))
            .map((el, i) => ({ i, tag: el.tagName, visible: el.getBoundingClientRect().width > 0 }))
    );
    console.log('INPUTS BEFORE Add Row:', JSON.stringify(beforeInputs));

    // Click Add Row
    await s13AddBtn.click({ force: true });
    await page.waitForTimeout(1200);

    // --- SNAPSHOT AFTER Add Row (no cell click) ---
    const afterInputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input[placeholder="Type..."], textarea[placeholder="Type..."]'))
            .map((el, i) => {
                const r = el.getBoundingClientRect();
                // Walk up to find a meaningful ancestor id or class
                let ancestor = '';
                let p = el.parentElement;
                for (let j = 0; j < 8 && p; j++, p = p.parentElement) {
                    const id = p.id ? '#' + p.id : '';
                    const cls = p.className ? '.' + String(p.className).split(' ')[0] : '';
                    ancestor = p.tagName + id + cls + ' > ' + ancestor;
                }
                return {
                    i,
                    tag: el.tagName,
                    placeholder: el.placeholder,
                    value: el.value || el.textContent || '',
                    visible: r.width > 0 && r.height > 0,
                    x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
                    ancestor,
                };
            })
    );
    console.log('\nINPUTS AFTER Add Row (no click):\n', JSON.stringify(afterInputs, null, 2));

    // How many new inputs appeared?
    const newCount = afterInputs.length - beforeInputs.length;
    console.log(`\nNEW inputs after Add Row: ${newCount}`);

    // Show full HTML of the new inputs' common ancestor container
    const containerHTML = await page.evaluate(() => {
        // Find all visible Type... inputs
        const inputs = Array.from(document.querySelectorAll('input[placeholder="Type..."], textarea[placeholder="Type..."]'))
            .filter(el => el.getBoundingClientRect().width > 0);
        if (!inputs.length) return 'NONE';
        // Find a common ancestor that wraps all of them
        let el = inputs[0].parentElement;
        while (el && !inputs.every(inp => el.contains(inp))) {
            el = el.parentElement;
        }
        return el ? el.outerHTML.substring(0, 3000) : 'NO COMMON ANCESTOR';
    });
    console.log('\nCOMMON ANCESTOR HTML:\n', containerHTML);

    // --- Try filling the inputs directly ---
    console.log('\n--- Attempting direct fill ---');
    const visibleInputs = page.locator('input[placeholder="Type..."]').filter({ has: page.locator(':visible') });
    const visibleTextareas = page.locator('textarea[placeholder="Type..."]').filter({ has: page.locator(':visible') });

    const inputCount = await page.locator('input[placeholder="Type..."]').count();
    const taCount = await page.locator('textarea[placeholder="Type..."]').count();
    console.log(`input count: ${inputCount}, textarea count: ${taCount}`);

    // Try filling the LAST two visible inputs (docNumber, title)
    const allInputs = page.locator('input[placeholder="Type..."]');
    const lastInputCount = await allInputs.count();
    if (lastInputCount >= 2) {
        console.log('Filling last 2 inputs...');
        await allInputs.nth(lastInputCount - 2).click();
        await allInputs.nth(lastInputCount - 2).fill('DOC-TEST-001');
        await page.waitForTimeout(300);
        await allInputs.nth(lastInputCount - 1).click();
        await allInputs.nth(lastInputCount - 1).fill('Test Document Title');
        await page.waitForTimeout(300);
        console.log('Inputs filled ✓');
    }

    // Try filling the LAST three visible textareas (aim, methods, results)
    const allTAs = page.locator('textarea[placeholder="Type..."]');
    const lastTACount = await allTAs.count();
    if (lastTACount >= 3) {
        console.log('Filling last 3 textareas...');
        await allTAs.nth(lastTACount - 3).click();
        await allTAs.nth(lastTACount - 3).fill('Test aim text');
        await page.waitForTimeout(300);
        await allTAs.nth(lastTACount - 2).click();
        await allTAs.nth(lastTACount - 2).fill('Test methods text');
        await page.waitForTimeout(300);
        await allTAs.nth(lastTACount - 1).click();
        await allTAs.nth(lastTACount - 1).fill('Test results text');
        await page.waitForTimeout(300);
        console.log('Textareas filled ✓');
    }

    await page.waitForTimeout(1000);

    // Check what the table row looks like now
    const rowHTML = await page.evaluate(() => {
        const table = document.querySelector('#performance-safety-other table');
        if (!table) return 'NO TABLE';
        const rows = table.querySelectorAll('tbody tr');
        const lastRow = rows[rows.length - 1];
        if (!lastRow) return 'NO ROW';
        return lastRow.outerHTML.substring(0, 1000);
    });
    console.log('\nROW HTML AFTER FILL:\n', rowHTML);
});
