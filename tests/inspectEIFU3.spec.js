const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect e-IFU via sidebar click + network idle', async ({ page }) => {
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

    // Click Labelling in the main sidebar first
    const labellingLink = page.getByRole('link', { name: /^Labelling$/i }).first();
    await labellingLink.click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Now click e-IFU in the sub-sidebar
    const eifuLink = page.getByText(/^e-IFU$/i).first();
    await eifuLink.waitFor({ state: 'visible', timeout: 10000 });
    await eifuLink.click();
    await page.waitForURL(/labelling\/e-ifu/, { timeout: 10000 }).catch(() => {});

    // Wait for networkidle — ensures API calls complete
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);

    console.log('URL:', page.url());
    await page.screenshot({ path: 'eifu3-loaded.png', fullPage: true });

    // Check if skeleton loaders are gone
    const skeletonCount = await page.locator('.animate-pulse').count();
    console.log('Skeleton loaders remaining:', skeletonCount);

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

    // ── All inputs ────────────────────────────────────────────────────────────
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
            text: el.textContent?.trim().substring(0, 80) || '',
            ariaChecked: el.getAttribute('aria-checked') || '',
            dataState: el.getAttribute('data-state') || '',
        }))
    );
    console.log('=== INPUTS ===');
    console.log(JSON.stringify(inputs, null, 2));

    // ── All buttons with roles ────────────────────────────────────────────────
    const buttons = await page.evaluate(() =>
        Array.from(document.querySelectorAll('button'))
            .map(b => ({
                text: b.textContent?.trim().substring(0, 80),
                role: b.getAttribute('role') || '',
                dataState: b.getAttribute('data-state') || '',
                id: b.id || '',
                disabled: b.disabled,
            })).filter(b => b.text)
    );
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons, null, 2));

    // ── Full main content HTML ────────────────────────────────────────────────
    const mainHtml = await page.evaluate(() => {
        const form = document.querySelector('form');
        return form ? form.innerHTML.substring(0, 5000) : 'no form found';
    });
    console.log('=== FORM HTML (first 5000 chars) ===');
    console.log(mainHtml);

    // ── Network requests to/from the page ────────────────────────────────────
    const networkInfo = await page.evaluate(() => {
        return window.__networkLog || 'no network log';
    });
    console.log('network log:', networkInfo);
});
