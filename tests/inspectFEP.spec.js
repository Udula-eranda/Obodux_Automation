const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect FEP form', async ({ page }) => {
    test.setTimeout(3000000);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(6000);

    // Click Devices menu
    const deviceMenu = page.locator('ul li').nth(0);
    await deviceMenu.waitFor({ state: 'visible' });
    await deviceMenu.click();
    await page.waitForTimeout(3000);

    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Click device card
    await page.getByText('Surgical Mask 3').first().click();
    await page.waitForTimeout(3000);

    // Navigate to V&V
    await page.getByRole('link', { name: 'Verification and Validation' }).click();
    await page.waitForTimeout(2000);
    await page.waitForFunction(() => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'), { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Open FEP form
    await page.getByText(/Add New FEP/i).first().click();
    await page.waitForTimeout(3000);

    // ── Confirm base form loaded ──────────────────────────────────────────────
    await page.locator('input[placeholder="Enter plan name"]').waitFor({ state: 'visible', timeout: 15000 });
    await page.screenshot({ path: 'fep-before-yes.png', fullPage: true });
    console.log('=== FEP BASE FIELDS (before Yes) ===');
    await scanFields(page);

    // ── Click Yes for "Is Usability testing being conducted?" ─────────────────
    const yesSection = page.locator('div').filter({ hasText: /Is Usability testing being conducted/i }).last();
    await yesSection.scrollIntoViewIfNeeded();
    await yesSection.locator('button').filter({ hasText: /^Yes$/i }).first().click();
    console.log('Clicked Yes for usability testing');
    await page.waitForTimeout(3000);

    // Screenshot after Yes
    await page.screenshot({ path: 'fep-after-yes.png', fullPage: true });
    console.log('=== FEP FIELDS AFTER YES ===');
    await scanFields(page);

    // ── Scroll down to capture any fields below the fold ──────────────────────
    await page.evaluate(() => {
        const container = document.querySelector('.flex-1.overflow-y-auto');
        if (container) container.scrollTop = container.scrollHeight;
        else window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'fep-after-yes-scrolled.png', fullPage: true });
    console.log('=== FEP FIELDS AFTER YES (scrolled to bottom) ===');
    await scanFields(page);
});

async function scanFields(page) {
    const result = await page.evaluate(() => {
        const fields = [];
        document.querySelectorAll(
            'input, textarea, select, [contenteditable="true"], [role="combobox"], [role="radio"], [role="checkbox"]'
        ).forEach((el, i) => {
            fields.push({
                i,
                tag: el.tagName,
                type: el.getAttribute('type') || el.getAttribute('role') || '',
                placeholder: el.getAttribute('placeholder') || '',
                id: el.id || '',
                name: el.getAttribute('name') || '',
                cls: el.className?.substring(0, 70) || '',
                text: el.textContent?.trim().substring(0, 60) || ''
            });
        });

        const labels = [];
        document.querySelectorAll('h1,h2,h3,h4,h5,label,p').forEach(el => {
            const t = el.textContent?.trim();
            if (t && t.length > 3 && t.length < 150 && !t.includes('\n')) {
                const inForm = el.closest('main, [class*="form"], [class*="content"], [class*="panel"]');
                if (inForm) labels.push({ tag: el.tagName, text: t.substring(0, 120) });
            }
        });

        return {
            fields: fields.slice(0, 100),
            labels: [...new Map(labels.map(l => [l.text, l])).values()].slice(0, 60)
        };
    });

    console.log('FIELDS:', JSON.stringify(result.fields, null, 2));
    console.log('LABELS:', JSON.stringify(result.labels, null, 2));
}
