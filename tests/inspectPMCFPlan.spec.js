const { test } = require('@playwright/test');
const { LoginPage, skipTourIfPresent } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Post Market Clinical Follow-up Plan layout', async ({ page }) => {
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
    await page.waitForURL(/device-documentation\/([\w-]+)\//, { timeout: 30000 });
    await page.waitForTimeout(2000);

    // ── Extract device ID and navigate directly to PMS Plan page ─────────────
    const deviceIdMatch = page.url().match(/device-documentation\/([\w-]+)\//);
    const deviceId = deviceIdMatch ? deviceIdMatch[1] : '0e2e4685-b800-4145-90dc-c81b050598d3';
    await page.goto(`${URL.siteLink}/editor/device-documentation/${deviceId}/post-market-surveillance/plan`);
    await page.waitForURL(/post-market-surveillance\/plan/, { timeout: 30000 });
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);
    console.log('Step 1: PMS Plan loaded. URL:', page.url());
    await page.screenshot({ path: 'pmcf-01-pms-plan.png', fullPage: false });

    // ── Step 2: Collapse PMS Plan ─────────────────────────────────────────────
    const pmsPlanChevron = page.locator('button[data-state="open"]:has(svg.lucide-chevron-down)').first();
    if (await pmsPlanChevron.count() > 0) {
        await pmsPlanChevron.scrollIntoViewIfNeeded().catch(() => {});
        await pmsPlanChevron.click();
        await page.waitForTimeout(2000);
        console.log('Step 2: PMS Plan collapsed');
    }
    await page.screenshot({ path: 'pmcf-02-pms-collapsed.png', fullPage: false });

    // ── Step 3: Expand PMCF section ───────────────────────────────────────────
    const pmcfChevronBtn = page.locator('[data-state="closed"]')
        .filter({ hasText: /Post Market Clinical Follow-up/ })
        .locator('button:has(svg.lucide-chevron-down)')
        .first();
    if (await pmcfChevronBtn.count() > 0) {
        await pmcfChevronBtn.scrollIntoViewIfNeeded().catch(() => {});
        await pmcfChevronBtn.click();
        await page.waitForTimeout(4000);
        console.log('Step 3: PMCF section expanded');
    }
    await page.screenshot({ path: 'pmcf-03-pmcf-expanded.png', fullPage: false });

    // ── Step 4: Click "Introduction" sub-section ──────────────────────────────
    // Use force:true to bypass visibility checks (Radix animation may still be running)
    const introLocator = page.getByText('Introduction', { exact: true }).first();
    let introClicked = false;
    try {
        await introLocator.scrollIntoViewIfNeeded().catch(() => {});
        await introLocator.click({ force: true, timeout: 5000 });
        introClicked = true;
        console.log('Step 4: Introduction clicked via Playwright');
    } catch (e) {
        console.log('Step 4: Playwright click failed, trying evaluate:', e.message.substring(0, 80));
        // Fallback: find any element with EXACTLY "Introduction" text and click
        introClicked = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll('span, div, p, button, a'));
            for (const el of all) {
                if (el.textContent?.trim() === 'Introduction') {
                    el.click();
                    return true;
                }
            }
            return false;
        });
        console.log('Step 4: evaluate click result:', introClicked);
    }
    await page.waitForTimeout(3000);
    console.log('Step 4: URL after Introduction click:', page.url());
    await page.screenshot({ path: 'pmcf-04-intro-expanded.png', fullPage: false });

    // ── Step 5: Dump what appeared after Introduction click ───────────────────
    const afterIntro = await page.evaluate(() => {
        const pmcfArea = Array.from(document.querySelectorAll('*')).find(el =>
            el.textContent?.includes('Introduction') &&
            el.textContent?.includes('PMCF') &&
            el.textContent?.trim().length < 1000
        );
        if (!pmcfArea) return { found: false };
        // Find all clickable items in the area
        const items = Array.from(pmcfArea.querySelectorAll('*'))
            .filter(el => el.children.length === 0 && el.textContent?.trim().length > 1 && el.textContent?.trim().length < 80)
            .map(el => ({
                tag: el.tagName,
                text: el.textContent?.trim(),
                cursor: window.getComputedStyle(el).cursor,
                href: el.getAttribute('href') || el.closest('a')?.getAttribute('href') || '',
            }));
        return { found: true, items: items.slice(0, 30) };
    });
    console.log('=== PMCF AREA ITEMS ===');
    console.log(JSON.stringify(afterIntro, null, 2));

    // ── Step 6: Click first sub-item under Introduction ───────────────────────
    const firstSubItem = afterIntro.items?.find(el =>
        el.href && el.href.length > 5 && !el.href.includes('post-market-surveillance/plan')
    );
    if (firstSubItem && firstSubItem.href) {
        console.log('Step 6: Navigating to:', firstSubItem.href);
        await page.goto(`${URL.siteLink}${firstSubItem.href}`);
        await page.waitForTimeout(3000);
    } else {
        // Try clicking first visible item with cursor:pointer under Introduction
        const subClicked = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll('*'));
            // Find items below Introduction in the PMCF section
            let foundIntro = false;
            for (const el of all) {
                if (el.textContent?.trim() === 'Introduction') foundIntro = true;
                if (foundIntro && el.textContent?.trim().length > 1 && el.textContent?.trim().length < 60 &&
                    el.children.length === 0 &&
                    window.getComputedStyle(el).cursor === 'pointer' &&
                    el.textContent?.trim() !== 'Introduction') {
                    el.click();
                    return { clicked: true, text: el.textContent?.trim() };
                }
            }
            return { clicked: false };
        });
        console.log('Step 6: sub-item click result:', JSON.stringify(subClicked));
        await page.waitForTimeout(3000);
    }

    // ── Step 7: Wait for PMCF form to load ────────────────────────────────────
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse'),
        { timeout: 20000 }
    ).catch(() => {});
    await page.waitForTimeout(2000);
    console.log('Step 7: PMCF form URL:', page.url());
    await page.screenshot({ path: 'pmcf-05-form.png', fullPage: true });

    // ── Step 8: Click Yes on first 3 radio questions ──────────────────────────
    const yesButtons = page.locator('button[role="radio"]').filter({ hasText: /^Yes$/ });
    const yesCount = await yesButtons.count();
    console.log(`Step 8: Found ${yesCount} Yes radio buttons`);
    let clicked3 = 0;
    for (let i = 0; i < yesCount && clicked3 < 3; i++) {
        const btn = yesButtons.nth(i);
        const isDisabled = await btn.evaluate(el => el.disabled || el.hasAttribute('data-disabled'));
        if (!isDisabled) {
            await btn.scrollIntoViewIfNeeded().catch(() => {});
            await btn.click();
            await page.waitForTimeout(1500);
            console.log(`Step 8: Clicked Yes ${clicked3 + 1}`);
            clicked3++;
        }
    }
    await page.waitForTimeout(3000);
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'pmcf-06-after-yes.png', fullPage: true });

    // ── Step 9: Full layout dump ──────────────────────────────────────────────
    const allText = await page.evaluate(() =>
        [...new Set(
            Array.from(document.querySelectorAll('h1,h2,h3,h4,p,label,legend,span'))
                .map(el => el.textContent?.trim())
                .filter(t => t && t.length > 2 && t.length < 300)
        )]
    );
    console.log('=== ALL TEXT ===');
    console.log(JSON.stringify(allText, null, 2));

    const inputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll(
            'input:not([type="hidden"]), textarea, button[role="combobox"], button[role="radio"], button[role="checkbox"], button[role="switch"]'
        )).map((el, i) => ({
            i,
            tag: el.tagName,
            type: el.getAttribute('type') || '',
            role: el.getAttribute('role') || '',
            placeholder: el.getAttribute('placeholder') || '',
            text: el.textContent?.trim().substring(0, 80) || '',
            value: el.value?.substring(0, 80) || '',
            ariaChecked: el.getAttribute('aria-checked') || '',
            dataState: el.getAttribute('data-state') || '',
            disabled: el.disabled || el.hasAttribute('data-disabled'),
        }))
    );
    console.log('=== INPUTS ===');
    console.log(JSON.stringify(inputs, null, 2));

    const editors = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[contenteditable="true"]'))
            .map((el, i) => ({
                i,
                tag: el.tagName,
                text: el.textContent?.trim().substring(0, 100) || '',
                dataPlaceholder: el.getAttribute('data-placeholder') || '',
                parentText: el.parentElement?.textContent?.trim().substring(0, 120) || '',
            }))
    );
    console.log('=== CONTENTEDITABLE EDITORS ===');
    console.log(JSON.stringify(editors, null, 2));

    const buttons = await page.evaluate(() =>
        Array.from(document.querySelectorAll('button'))
            .map(b => ({
                text: b.textContent?.trim().substring(0, 80),
                role: b.getAttribute('role') || '',
                disabled: b.disabled,
                ariaChecked: b.getAttribute('aria-checked') || '',
                dataState: b.getAttribute('data-state') || '',
            })).filter(b => b.text)
    );
    console.log('=== BUTTONS ===');
    console.log(JSON.stringify(buttons, null, 2));
});
