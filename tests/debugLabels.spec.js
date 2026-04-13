const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL, labelsData } = require('../Utils/testData');

test('debug Labels packaging upload and radio', async ({ page }) => {
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

    // Navigate to Labels
    await page.getByRole('link', { name: /^labelling$/i }).first().click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForTimeout(3000);

    // ── Fill Device Labels text fields ────────────────────────────────────────
    await page.locator('input[id="deviceLabels[0].labelNumber"]').fill('LBL-DEV-001');
    await page.locator('input[id="deviceLabels[0].revNumber"]').fill('Rev A');
    await page.locator('textarea[id="deviceLabels[0].labelDescription"]').fill('Device label description');
    await page.locator('textarea[id="deviceLabels[0].labelSpecification"]').fill('Device label specification');

    // ── Device Label image upload (zone click + file chooser) ─────────────────
    const fileChooserPromise1 = page.waitForEvent('filechooser');
    await page.locator('p').filter({ hasText: 'Click here or drag & drop your file.' }).first().click();
    const fc1 = await fileChooserPromise1;
    await fc1.setFiles(labelsData.imagePath);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'debug-after-device-upload.png', fullPage: true });

    // ── Scan file inputs AFTER device label upload ────────────────────────────
    const fileInputInfo = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input[type="file"]')).map((el, i) => ({
            i,
            name: el.getAttribute('name') || '',
            id: el.id || '',
            visible: el.offsetParent !== null,
            disabled: el.disabled,
            cls: el.className?.substring(0, 60)
        }));
    });
    console.log('File inputs after device upload:', JSON.stringify(fileInputInfo, null, 2));

    // ── Scan "Click here" paragraphs ──────────────────────────────────────────
    const clickHereEls = await page.evaluate(() => {
        const result = [];
        document.querySelectorAll('p').forEach((p, i) => {
            if (p.textContent?.includes('Click here or drag & drop')) {
                const rect = p.getBoundingClientRect();
                result.push({
                    i,
                    text: p.textContent.trim().substring(0, 50),
                    visible: rect.width > 0 && rect.height > 0,
                    top: Math.round(rect.top),
                    parentClass: p.parentElement?.className?.substring(0, 80)
                });
            }
        });
        return result;
    });
    console.log('"Click here" paragraphs:', JSON.stringify(clickHereEls, null, 2));

    // ── Fill Packaging Labels text fields ─────────────────────────────────────
    await page.locator('input[id="packagingLabels[0].labelNumber"]').fill('LBL-PKG-001');
    await page.locator('input[id="packagingLabels[0].revNumber"]').fill('Rev A');
    await page.locator('textarea[id="packagingLabels[0].labelDescription"]').fill('Packaging label description');
    await page.locator('textarea[id="packagingLabels[0].labelSpecification"]').fill('Packaging label specification');

    await page.screenshot({ path: 'debug-before-pkg-upload.png', fullPage: true });

    // ── Try each file input for packaging upload ──────────────────────────────
    const totalFileInputs = await page.locator('input[type="file"]').count();
    console.log('Total file inputs:', totalFileInputs);

    // Try nth(1) — likely Device Label image input
    console.log('Trying setInputFiles on nth(1)...');
    try {
        await page.locator('input[type="file"]').nth(1).setInputFiles(labelsData.imagePath);
        console.log('nth(1) setInputFiles succeeded');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-after-pkg-upload-nth1.png', fullPage: true });
    } catch (e) {
        console.log('nth(1) failed:', e.message.substring(0, 100));
    }

    // Try nth(2) — likely Packaging Label image input
    console.log('Trying setInputFiles on nth(2)...');
    try {
        await page.locator('input[type="file"]').nth(2).setInputFiles(labelsData.imagePath);
        console.log('nth(2) setInputFiles succeeded');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-after-pkg-upload-nth2.png', fullPage: true });
    } catch (e) {
        console.log('nth(2) failed:', e.message.substring(0, 100));
    }

    // ── Scan all buttons for radio options ────────────────────────────────────
    await page.screenshot({ path: 'debug-before-radio.png', fullPage: true });

    const allBtns = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button')).map((b, i) => ({
            i,
            text: b.textContent?.trim().substring(0, 50),
            role: b.getAttribute('role') || '',
            ariaChecked: b.getAttribute('aria-checked') || '',
            disabled: b.disabled,
            visible: b.offsetParent !== null
        })).filter(b => b.text);
    });
    console.log('All buttons:', JSON.stringify(allBtns, null, 2));

    // Also scan native radio inputs
    const radios = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input[type="radio"]')).map((r, i) => ({
            i,
            value: r.value,
            name: r.name,
            checked: r.checked,
            id: r.id,
            visible: r.offsetParent !== null,
            parentText: r.parentElement?.textContent?.trim().substring(0, 60)
        }));
    });
    console.log('Native radio inputs:', JSON.stringify(radios, null, 2));
});
