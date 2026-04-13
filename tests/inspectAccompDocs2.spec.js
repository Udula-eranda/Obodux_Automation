const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Accompanying Documents navigation', async ({ page }) => {
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

    // Navigate to Labelling
    await page.getByRole('link', { name: /^labelling$/i }).first().click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForTimeout(2000);

    // ── Inspect the sub-sidebar DOM ───────────────────────────────────────────
    const sidebarItems = await page.evaluate(() => {
        const items = [];
        // Look for the labelling sub-sidebar container
        document.querySelectorAll('a, button, [role="link"], li, div').forEach(el => {
            const t = el.textContent?.trim();
            if (t && (
                t.includes('Accompanying') || t.includes('e-IFU') ||
                t.includes('Device Label') || t.includes('Packaging Label') ||
                t.includes('Implant')
            ) && t.length < 60) {
                const rect = el.getBoundingClientRect();
                items.push({
                    tag: el.tagName,
                    text: t.substring(0, 60),
                    href: el.getAttribute('href') || '',
                    role: el.getAttribute('role') || '',
                    cls: el.className?.substring(0, 80) || '',
                    visible: rect.width > 0 && rect.height > 0,
                    left: Math.round(rect.left)
                });
            }
        });
        return items;
    });
    console.log('=== SUB-SIDEBAR ITEMS ===');
    console.log(JSON.stringify(sidebarItems, null, 2));

    // ── Try common URL patterns for Accompanying Documents ────────────────────
    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    const candidates = [
        `${base}/labelling/accompanying-documents`,
        `${base}/labelling/accompanying-document`,
        `${base}/labelling/ifu`,
        `${base}/labelling/ifu-documents`,
        `${base}/labelling/documents`,
    ];

    for (const url of candidates) {
        await page.goto(url);
        await page.waitForTimeout(2000);
        const bodyText = await page.locator('body').innerText();
        const is404 = bodyText.includes('404') || bodyText.includes('could not be found');
        console.log(`${url} → ${is404 ? '404' : 'OK ✓'}`);
        if (!is404) {
            console.log('Found working URL:', url);
            await page.screenshot({ path: 'accompanying-docs-found.png', fullPage: true });

            // Inspect this page
            const allText = await page.locator('p, h1, h2, h3, h4, label, span').allTextContents();
            const clean = [...new Set(allText.map(t => t.trim()).filter(t => t.length > 2 && t.length < 150))];
            console.log('=== PAGE TEXT ===');
            console.log(JSON.stringify(clean, null, 2));

            const inputs = await page.evaluate(() =>
                Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea, [role="combobox"]'))
                    .map((el, i) => ({
                        i, tag: el.tagName,
                        type: el.getAttribute('type') || '',
                        id: el.id || '', name: el.getAttribute('name') || '',
                        placeholder: el.getAttribute('placeholder') || '',
                        role: el.getAttribute('role') || ''
                    }))
            );
            console.log('=== INPUTS ===');
            console.log(JSON.stringify(inputs, null, 2));

            const btns = await page.locator('button').allTextContents();
            console.log('=== BUTTONS ===');
            console.log(JSON.stringify(btns.filter(t => t.trim()), null, 2));
            break;
        }
    }

    // ── Also try clicking the Accompanying Documents link directly ────────────
    await page.goto(`${base}/labelling/labels`);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'labelling-sidebar-inspect.png', fullPage: false });

    // Find all anchor tags in the sidebar
    const allAnchors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => ({
            text: a.textContent?.trim().substring(0, 60),
            href: a.getAttribute('href') || ''
        })).filter(a => a.text && a.href);
    });
    console.log('=== ALL ANCHOR HREFS ===');
    console.log(JSON.stringify(allAnchors, null, 2));
});
