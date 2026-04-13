const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect e-IFU section — wait for form content', async ({ page }) => {
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

    // Click Labelling in the main sidebar
    const labellingLink = page.getByRole('link', { name: /^Labelling$/i }).first();
    await labellingLink.click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Click e-IFU in the sub-sidebar
    const eifuLink = page.getByText(/^e-IFU$/i).first();
    await eifuLink.waitFor({ state: 'visible', timeout: 10000 });
    await eifuLink.click();
    await page.waitForURL(/labelling\/e-ifu/, { timeout: 10000 }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

    // Wait specifically for the e-IFU section skeleton to disappear —
    // poll until the #eifu anchor's parent container has NO .animate-pulse children
    await page.waitForFunction(() => {
        const eifuSection = document.querySelector('a[id="eifu"]');
        if (!eifuSection) return false;
        const container = eifuSection.closest('.section') || eifuSection.parentElement;
        if (!container) return false;
        const skeletons = container.querySelectorAll('.animate-pulse');
        return skeletons.length === 0;
    }, { timeout: 60000 }).catch(() => {});

    await page.waitForTimeout(2000);
    console.log('URL:', page.url());
    await page.screenshot({ path: 'eifu4-loaded.png', fullPage: true });

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

    // ── All inputs / radios / comboboxes ──────────────────────────────────────
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

    // ── All buttons ───────────────────────────────────────────────────────────
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

    // ── Form HTML after full load ─────────────────────────────────────────────
    const formHtml = await page.evaluate(() => {
        const anchor = document.querySelector('a[id="eifu"]');
        const section = anchor?.closest('.section') || anchor?.parentElement;
        return section ? section.innerHTML.substring(0, 6000) : 'eifu section not found';
    });
    console.log('=== EIFU SECTION HTML ===');
    console.log(formHtml);
});
