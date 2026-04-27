const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Post Market Surveillance Plan layout', async ({ page }) => {
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
    await skipTourIfPresent(page);

    await page.getByText('Surgical Mask All Doc Complete 2').first().click();
    await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 30000 });
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    // Navigate to PMS Plan via URL
    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    await page.goto(`${base}/post-market-surveillance/plan`);
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    console.log('URL:', page.url());
    await page.screenshot({ path: 'pms-plan-initial.png', fullPage: true });

    // ── Full page text ────────────────────────────────────────────────────────
    const allText = await page.evaluate(() =>
        [...new Set(
            Array.from(document.querySelectorAll('h1,h2,h3,h4,p,label,legend,span'))
                .map(el => el.textContent?.trim())
                .filter(t => t && t.length > 2 && t.length < 250)
        )]
    );
    console.log('=== ALL TEXT ===');
    console.log(JSON.stringify(allText, null, 2));

    // ── All inputs ────────────────────────────────────────────────────────────
    const inputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, button[role="combobox"], button[role="radio"], button[role="checkbox"], button[role="switch"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            role: el.getAttribute('role') || '',
            placeholder: el.getAttribute('placeholder') || '',
            text: el.textContent?.trim().substring(0, 80) || '',
            value: el.value?.substring(0, 60) || '',
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
                id: b.id || '',
                disabled: b.disabled,
            })).filter(b => b.text)
    );
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons, null, 2));

    // ── Form HTML ─────────────────────────────────────────────────────────────
    const formHtml = await page.evaluate(() => {
        const form = document.querySelector('form');
        return form ? form.innerHTML.substring(0, 8000) : 'no form found';
    });
    console.log('=== FORM HTML (first 8000 chars) ===');
    console.log(formHtml);

    // ── Sub-sidebar links for PMS ─────────────────────────────────────────────
    const sidebarLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href*="post-market"]'))
            .map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }))
    );
    console.log('=== PMS SIDEBAR LINKS ===');
    console.log(JSON.stringify(sidebarLinks, null, 2));
});
