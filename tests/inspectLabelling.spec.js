const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Labelling section structure', async ({ page }) => {
    test.setTimeout(3000000);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);

    // Navigate to devices
    const deviceMenu = page.locator('ul li').nth(0);
    await deviceMenu.waitFor({ state: 'visible' });
    await deviceMenu.click();
    await page.waitForTimeout(3000);
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Click device
    await page.getByText('Surgical Mask All Doc Complete').first().click();
    await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });

    // ── Wait for full device load ─────────────────────────────────────────────
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);
    console.log('Device loaded at URL:', page.url());

    // ── Click the Labelling sidebar link and capture the resulting URL ─────────
    const labellingLink = page.getByRole('link', { name: /^labelling$/i }).first();
    await labellingLink.waitFor({ state: 'visible', timeout: 10000 });
    await labellingLink.click();

    // Wait for URL to change away from the current page
    const urlBefore = page.url();
    await page.waitForFunction(
        (before) => window.location.href !== before,
        urlBefore,
        { timeout: 10000 }
    ).catch(() => {});
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 20000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    console.log('Labelling URL:', page.url());
    await page.screenshot({ path: 'labelling-main.png', fullPage: true });

    // ── Scan all visible text and links on labelling landing ──────────────────
    const allText = await page.locator('p, h1, h2, h3, h4, span, a, button, label').allTextContents();
    const cleanText = [...new Set(allText.map(t => t.trim()).filter(t => t.length > 2 && t.length < 120))];
    console.log('=== ALL TEXT ON LABELLING LANDING ===');
    console.log(JSON.stringify(cleanText, null, 2));

    // ── Look for sub-section cards / navigation items ─────────────────────────
    const cards = await page.evaluate(() => {
        const items = [];
        // Cards or list items that link to sub-sections
        document.querySelectorAll('a, [role="link"], button').forEach(el => {
            const t = el.textContent?.trim();
            if (t && t.length > 2 && t.length < 100) {
                items.push({ tag: el.tagName, role: el.getAttribute('role') || '', text: t, href: el.getAttribute('href') || '' });
            }
        });
        return items;
    });
    console.log('=== CLICKABLE ITEMS ON LABELLING PAGE ===');
    console.log(JSON.stringify(cards, null, 2));

    // ── Try clicking "Labels" sub-section (most common first sub-item) ────────
    const labelsSubLink = page.getByText(/^labels$/i).first();
    if (await labelsSubLink.isVisible().catch(() => false)) {
        await labelsSubLink.click();
        await page.waitForTimeout(3000);
        console.log('Clicked Labels sub-section, URL:', page.url());
        await page.screenshot({ path: 'labelling-labels-sub.png', fullPage: true });
    }

    // ── Deep scan: all inputs, textareas, radios, selects, contenteditables ───
    const deepStructure = await page.evaluate(() => {
        const result = {};

        result.allText = Array.from(document.querySelectorAll('p, label, legend, h1, h2, h3, h4'))
            .map(el => ({ tag: el.tagName, text: el.textContent?.trim().substring(0, 150) }))
            .filter(x => x.text && x.text.length > 2);

        result.inputs = Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, select, [contenteditable="true"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            placeholder: el.getAttribute('placeholder') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            ce: el.getAttribute('contenteditable') || ''
        }));

        result.radios = Array.from(document.querySelectorAll('[role="radio"], input[type="radio"]')).map(r => ({
            label: r.getAttribute('aria-label') || r.getAttribute('value') || '',
            checked: r.getAttribute('aria-checked') || String(r.checked)
        }));

        result.selects = Array.from(document.querySelectorAll('[role="combobox"], [role="listbox"]')).map(s => ({
            text: s.textContent?.trim().substring(0, 60),
            role: s.getAttribute('role')
        }));

        result.buttons = Array.from(document.querySelectorAll('button')).map(b => ({
            text: b.textContent?.trim().substring(0, 80)
        })).filter(b => b.text);

        result.fileInputs = Array.from(document.querySelectorAll('input[type="file"]')).length;

        return result;
    });

    console.log('=== DEEP SCAN: TEXT ELEMENTS ===');
    console.log(JSON.stringify(deepStructure.allText, null, 2));
    console.log('=== DEEP SCAN: INPUTS ===');
    console.log(JSON.stringify(deepStructure.inputs, null, 2));
    console.log('=== DEEP SCAN: RADIOS ===');
    console.log(JSON.stringify(deepStructure.radios, null, 2));
    console.log('=== DEEP SCAN: SELECTS / COMBOBOXES ===');
    console.log(JSON.stringify(deepStructure.selects, null, 2));
    console.log('=== DEEP SCAN: BUTTONS ===');
    console.log(JSON.stringify(deepStructure.buttons, null, 2));
    console.log('File inputs count:', deepStructure.fileInputs);
});
