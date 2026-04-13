const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect e-IFU section layout', async ({ page }) => {
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

    // ── Try common URL patterns for e-IFU ────────────────────────────────────
    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    const candidates = [
        `${base}/labelling/e-ifu`,
        `${base}/labelling/eifu`,
        `${base}/labelling/electronic-ifu`,
        `${base}/labelling/eIFU`,
        `${base}/labelling/e-IFU`,
    ];

    let workingUrl = null;
    for (const url of candidates) {
        await page.goto(url);
        await page.waitForTimeout(2000);
        const bodyText = await page.locator('body').innerText();
        const is404 = bodyText.includes('404') || bodyText.includes('could not be found') || bodyText.includes('Page not found');
        console.log(`${url} → ${is404 ? '404' : 'OK ✓'}`);
        if (!is404) {
            workingUrl = url;
            break;
        }
    }

    // If URL probing failed, try clicking e-IFU from the sidebar
    if (!workingUrl) {
        console.log('URL probe failed — trying sidebar click');
        await page.goto(`${base}/labelling/labels`);
        await page.waitForTimeout(2000);
        const eifuLink = page.getByText(/e-IFU/i).first();
        if (await eifuLink.isVisible().catch(() => false)) {
            await eifuLink.click();
            await page.waitForTimeout(2000);
            workingUrl = page.url();
            console.log('Clicked e-IFU sidebar → URL:', workingUrl);
        }
    }

    console.log('Working e-IFU URL:', page.url());
    await page.screenshot({ path: 'eifu-initial.png', fullPage: true });

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
            'input:not([type="hidden"]), textarea, [role="combobox"], [role="radio"], [role="switch"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            role: el.getAttribute('role') || '',
            value: el.value?.substring(0, 60) || '',
            checked: el.getAttribute('aria-checked') || el.checked || '',
        }))
    );
    console.log('=== INPUTS ===');
    console.log(JSON.stringify(inputs, null, 2));

    // ── All buttons ───────────────────────────────────────────────────────────
    const buttons = await page.locator('button').allTextContents();
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons.map(t => t.trim()).filter(t => t), null, 2));

    // ── Radios / toggles ──────────────────────────────────────────────────────
    const radios = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="radio"], [role="switch"], input[type="radio"], input[type="checkbox"]'))
            .map((el, i) => ({
                i,
                tag: el.tagName,
                role: el.getAttribute('role') || '',
                value: el.value || el.getAttribute('data-value') || '',
                label: el.closest('label')?.textContent?.trim() || el.getAttribute('aria-label') || '',
                checked: el.getAttribute('aria-checked') || el.checked || '',
                id: el.id || '',
            }))
    );
    console.log('=== RADIOS / TOGGLES ===');
    console.log(JSON.stringify(radios, null, 2));

    // ── Try clicking Yes on first question ───────────────────────────────────
    // Look for Yes radio/button
    const yesBtn = page.locator('button[role="radio"]').filter({ hasText: /^Yes$/i }).first();
    if (await yesBtn.isVisible().catch(() => false)) {
        await yesBtn.scrollIntoViewIfNeeded();
        await yesBtn.click();
        await page.waitForTimeout(1500);
        console.log('Clicked Yes on first question');
        await page.screenshot({ path: 'eifu-after-yes.png', fullPage: true });
    } else {
        console.log('Yes button not found as radio — trying generic button');
        const yesBtnGeneric = page.getByRole('button', { name: /^Yes$/i }).first();
        if (await yesBtnGeneric.isVisible().catch(() => false)) {
            await yesBtnGeneric.scrollIntoViewIfNeeded();
            await yesBtnGeneric.click();
            await page.waitForTimeout(1500);
            console.log('Clicked Yes (generic button)');
            await page.screenshot({ path: 'eifu-after-yes.png', fullPage: true });
        }
    }

    // ── Re-scan after Yes selected ────────────────────────────────────────────
    const allTextAfterYes = await page.evaluate(() =>
        [...new Set(
            Array.from(document.querySelectorAll('h1,h2,h3,h4,p,label,legend,span'))
                .map(el => el.textContent?.trim())
                .filter(t => t && t.length > 2 && t.length < 200)
        )]
    );
    console.log('=== ALL TEXT AFTER YES ===');
    console.log(JSON.stringify(allTextAfterYes, null, 2));

    const inputsAfterYes = await page.evaluate(() =>
        Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, [role="combobox"], [role="radio"], [role="switch"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            id: el.id || '',
            name: el.getAttribute('name') || '',
            role: el.getAttribute('role') || '',
            value: el.value?.substring(0, 60) || '',
        }))
    );
    console.log('=== INPUTS AFTER YES ===');
    console.log(JSON.stringify(inputsAfterYes, null, 2));

    await page.screenshot({ path: 'eifu-final.png', fullPage: true });
});
