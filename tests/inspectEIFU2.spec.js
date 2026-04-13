const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect e-IFU section layout — full wait', async ({ page }) => {
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

    // Navigate to e-IFU via URL
    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    await page.goto(`${base}/labelling/e-ifu`);

    // Wait for skeleton loaders to fully disappear (multiple selector patterns)
    await page.waitForFunction(() => {
        const skeletons = document.querySelectorAll(
            '.animate-pulse, [class*="skeleton"], [class*="loading"], [data-loading]'
        );
        return skeletons.length === 0;
    }, { timeout: 30000 }).catch(() => {});

    // Extra wait for React state to settle
    await page.waitForTimeout(4000);

    console.log('URL:', page.url());
    await page.screenshot({ path: 'eifu2-loaded.png', fullPage: true });

    // ── Full page text ────────────────────────────────────────────────────────
    const allText = await page.evaluate(() =>
        [...new Set(
            Array.from(document.querySelectorAll('h1,h2,h3,h4,p,label,legend,span'))
                .map(el => el.textContent?.trim())
                .filter(t => t && t.length > 2 && t.length < 200)
        )]
    );
    console.log('=== ALL TEXT ===');
    console.log(JSON.stringify(allText, null, 2));

    // ── All inputs including radios, switches, comboboxes ────────────────────
    const inputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, button[role="combobox"], button[role="radio"], button[role="switch"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            role: el.getAttribute('role') || '',
            value: el.value?.substring(0, 60) || el.textContent?.trim().substring(0, 60) || '',
            ariaChecked: el.getAttribute('aria-checked') || '',
            dataState: el.getAttribute('data-state') || '',
        }))
    );
    console.log('=== INPUTS ===');
    console.log(JSON.stringify(inputs, null, 2));

    // ── All buttons ───────────────────────────────────────────────────────────
    const buttons = await page.evaluate(() =>
        Array.from(document.querySelectorAll('button'))
            .map(b => ({
                text: b.textContent?.trim().substring(0, 80),
                role: b.getAttribute('role') || '',
                dataState: b.getAttribute('data-state') || '',
                disabled: b.disabled,
            })).filter(b => b.text)
    );
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons, null, 2));

    // ── Entire main content area inner HTML structure (short) ─────────────────
    const mainContent = await page.evaluate(() => {
        const main = document.querySelector('main') ||
                     document.querySelector('[class*="content"]') ||
                     document.querySelector('.flex-1.overflow-y-auto');
        return main ? main.innerHTML.substring(0, 3000) : 'no main found';
    });
    console.log('=== MAIN CONTENT HTML (first 3000 chars) ===');
    console.log(mainContent);
});
