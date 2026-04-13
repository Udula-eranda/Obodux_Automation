const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Accompanying Documents section', async ({ page }) => {
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

    // Navigate to Labelling first
    await page.getByRole('link', { name: /^labelling$/i }).first().click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Click "Accompanying Documents" in the sub-sidebar
    const accompanyingLink = page.getByText(/^Accompanying Documents$/i).first();
    await accompanyingLink.waitFor({ state: 'visible', timeout: 10000 });
    await accompanyingLink.click();
    await page.waitForTimeout(3000);

    console.log('Accompanying Documents URL:', page.url());
    await page.screenshot({ path: 'accompanying-docs-full.png', fullPage: true });

    // ── All visible text ──────────────────────────────────────────────────────
    const allText = await page.locator('p, h1, h2, h3, h4, label, legend, span').allTextContents();
    const cleanText = [...new Set(allText.map(t => t.trim()).filter(t => t.length > 2 && t.length < 150))];
    console.log('=== ALL TEXT ON PAGE ===');
    console.log(JSON.stringify(cleanText, null, 2));

    // ── Clickable items ───────────────────────────────────────────────────────
    const clickable = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a, button')).map(el => ({
            tag: el.tagName,
            role: el.getAttribute('role') || '',
            text: el.textContent?.trim().substring(0, 80),
            href: el.getAttribute('href') || ''
        })).filter(x => x.text && x.text.length > 1);
    });
    console.log('=== CLICKABLE ITEMS ===');
    console.log(JSON.stringify(clickable, null, 2));

    // ── All form inputs ───────────────────────────────────────────────────────
    const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, select, [contenteditable="true"], [role="combobox"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            placeholder: el.getAttribute('placeholder') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            role: el.getAttribute('role') || '',
            value: el.value?.substring(0, 40) || ''
        }));
    });
    console.log('=== FORM INPUTS ===');
    console.log(JSON.stringify(inputs, null, 2));

    // ── Radios & checkboxes ───────────────────────────────────────────────────
    const radios = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('[role="radio"], input[type="radio"], [role="checkbox"], input[type="checkbox"]')).map((el, i) => ({
            i,
            tag: el.tagName,
            role: el.getAttribute('role') || el.type,
            value: el.value || el.getAttribute('aria-label') || '',
            checked: el.getAttribute('aria-checked') || String(el.checked)
        }));
    });
    console.log('=== RADIOS / CHECKBOXES ===');
    console.log(JSON.stringify(radios, null, 2));

    // ── File inputs ───────────────────────────────────────────────────────────
    const fileInputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input[type="file"]')).map((el, i) => ({
            i,
            name: el.getAttribute('name') || '',
            accept: el.getAttribute('accept') || '',
            visible: el.offsetParent !== null
        }));
    });
    console.log('=== FILE INPUTS ===');
    console.log(JSON.stringify(fileInputs, null, 2));

    // ── Buttons ───────────────────────────────────────────────────────────────
    const buttons = await page.locator('button').allTextContents();
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons.filter(t => t.trim()), null, 2));
});
