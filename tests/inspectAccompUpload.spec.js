const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect Accompanying Documents file upload zone', async ({ page }) => {
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

    const base = page.url().match(/(.*\/device-documentation\/[^/]+)/)?.[1];
    await page.goto(`${base}/labelling/accompanying-documents`);
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 20000 }
    ).catch(() => {});
    await page.waitForTimeout(2000);

    // ── Step 1: Expand IFU 1 ──────────────────────────────────────────────────
    const ifuEntry = page.getByText(/IFU\s*1/i).first();
    if (await ifuEntry.isVisible().catch(() => false)) {
        await ifuEntry.click();
        await page.waitForTimeout(1200);
        console.log('Expanded IFU 1');
    }

    // ── Step 2: Scan file inputs AFTER IFU expanded ───────────────────────────
    const fileInputsAfterIFU = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input[type="file"]')).map((el, i) => ({
            i,
            name: el.getAttribute('name') || '',
            id: el.id || '',
            accept: el.getAttribute('accept') || '',
            visible: el.offsetParent !== null,
        }))
    );
    console.log('=== FILE INPUTS after IFU expanded ===');
    console.log(JSON.stringify(fileInputsAfterIFU, null, 2));

    // ── Step 3: Fill IFU fields minimally and upload ──────────────────────────
    const docNum = page.locator('input[id="ifu[0].documentNumber"]');
    if (await docNum.isVisible().catch(() => false)) {
        await docNum.fill('IFU-001');
        await page.locator('input[id="ifu[0].revNumber"]').fill('Rev A');

        // Select Language (English)
        const langCombo = page.locator('input[id="ifu[0].revNumber"]')
            .locator('xpath=following::button[@role="combobox"][1]');
        await langCombo.click();
        await page.waitForTimeout(800);
        const englishOpt = page.locator('[data-radix-popper-content-wrapper] [role="option"]')
            .filter({ hasText: /English/i }).first();
        if (await englishOpt.isVisible().catch(() => false)) {
            await englishOpt.click();
        } else {
            await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(400);

        // Select Countries (UK)
        const countryCombo = page.locator('[id="ifu[0].countries"]');
        await countryCombo.click();
        await page.waitForTimeout(800);
        const ukOpt = page.locator('[data-radix-popper-content-wrapper] [role="option"]')
            .filter({ hasText: /United Kingdom/i }).first();
        if (await ukOpt.isVisible().catch(() => false)) {
            await ukOpt.click();
        } else {
            await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(400);

        // Upload IFU via setInputFiles nth(1)
        const ifuFile = page.locator('input[type="file"]').nth(1);
        await ifuFile.setInputFiles('C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf');
        await page.waitForTimeout(3000);
        console.log('IFU file uploaded ✓');
    }

    // ── Step 4: Scan file inputs AFTER IFU upload ─────────────────────────────
    const fileInputsAfterIFUUpload = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input[type="file"]')).map((el, i) => ({
            i,
            name: el.getAttribute('name') || '',
            id: el.id || '',
            accept: el.getAttribute('accept') || '',
            visible: el.offsetParent !== null,
        }))
    );
    console.log('=== FILE INPUTS after IFU upload ===');
    console.log(JSON.stringify(fileInputsAfterIFUUpload, null, 2));

    // ── Step 5: Check if AccompDoc fields are visible ─────────────────────────
    const accompDocNumInput = page.locator('input[id="accompanyingDocuments[0].documentNumber"]');
    const accompVisible = await accompDocNumInput.isVisible().catch(() => false);
    console.log('AccompDoc fields visible after IFU upload:', accompVisible);

    // Screenshot to see page state
    await page.screenshot({ path: 'accomp-after-ifu-upload.png', fullPage: true });

    // ── Step 6: If not visible, try to expand AccompDoc accordion ─────────────
    if (!accompVisible) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        const closedItems = page.locator('[data-state="closed"]');
        const count = await closedItems.count();
        console.log('Closed accordion items found:', count);
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const txt = await closedItems.nth(i).textContent().catch(() => '');
                console.log(`  Closed item ${i}: "${txt.trim().substring(0, 60)}"`);
            }
            await closedItems.last().scrollIntoViewIfNeeded();
            await closedItems.last().click();
            await page.waitForTimeout(1200);
        }
    }

    await page.screenshot({ path: 'accomp-doc-section.png', fullPage: true });

    // ── Step 7: Scan ALL file inputs now ─────────────────────────────────────
    const fileInputsFinal = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input[type="file"]')).map((el, i) => ({
            i,
            name: el.getAttribute('name') || '',
            id: el.id || '',
            accept: el.getAttribute('accept') || '',
            visible: el.offsetParent !== null,
        }))
    );
    console.log('=== FILE INPUTS final state ===');
    console.log(JSON.stringify(fileInputsFinal, null, 2));

    // ── Step 8: Scan for upload zone text in AccompDoc section ───────────────
    const uploadZones = await page.evaluate(() =>
        Array.from(document.querySelectorAll('p, div, span, label, button'))
            .filter(el => {
                const t = el.textContent?.trim() || '';
                return t.includes('Click here') || t.includes('drag') || t.includes('Upload') || t.includes('drop');
            })
            .map(el => ({
                tag: el.tagName,
                text: el.textContent?.trim().substring(0, 80),
                cls: el.className?.substring(0, 60),
                visible: el.offsetParent !== null,
            }))
    );
    console.log('=== UPLOAD ZONES ===');
    console.log(JSON.stringify(uploadZones, null, 2));
});
