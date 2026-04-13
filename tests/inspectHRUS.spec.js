const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL } = require('../Utils/testData');

test('inspect HRUS table cells', async ({ page }) => {
    test.setTimeout(3000000);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);

    // Navigate to devices
    const deviceMenu = page.locator('ul li').nth(0);
    await deviceMenu.waitFor({ state: 'visible' });
    await deviceMenu.click();
    await page.waitForTimeout(3000);
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Click device
    await page.getByText('Surgical Mask 3').first().click();
    await page.waitForTimeout(3000);

    // Wait for the device URL to be established (must contain device-documentation/[id])
    await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });
    console.log('Device URL:', page.url());

    // Go to V&V
    await page.getByRole('link', { name: 'Verification and Validation' }).click();
    // Wait for URL to contain verification-and-validation
    await page.waitForURL(/verification-and-validation/, { timeout: 15000 });
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2000);
    console.log('V&V URL:', page.url());

    // Navigate to UEP via URL
    const currentUrl = page.url();
    const uepUrl = currentUrl.replace(/\/verification-and-validation(\/.*)?$/, '/verification-and-validation/usability-evaluation-plan');
    console.log('UEP URL:', uepUrl);
    await page.goto(uepUrl);
    await page.waitForTimeout(4000);

    // Screenshot of full UEP page before clicking Yes
    await page.screenshot({ path: 'uep-before-yes.png', fullPage: true });

    // Click Yes for Q1 so the tables appear (skip upload — just need structure)
    try {
        const q1 = page.locator('p').filter({ hasText: 'Is the Usability Process controlled through a QMS Procedure?' }).locator('xpath=..');
        await q1.waitFor({ state: 'visible', timeout: 10000 });
        await q1.getByRole('radio', { name: 'Yes' }).click();
        console.log('Q1 Yes clicked');
        await page.waitForTimeout(2000);
        // Close any modal that might have opened
        const closeBtn = page.getByRole('button', { name: /close|cancel/i });
        if (await closeBtn.count() > 0) {
            await closeBtn.first().click();
            await page.waitForTimeout(500);
        }
    } catch (e) {
        console.log('Q1 already answered or error:', e.message.substring(0, 80));
    }

    // Also click Q3 Yes to ensure all tables appear
    try {
        const q3 = page.locator('p').filter({ hasText: 'Has the Task and Use Error Analysis been completed?' }).locator('xpath=..');
        await q3.waitFor({ state: 'visible', timeout: 8000 });
        await q3.getByRole('radio', { name: 'Yes' }).click();
        console.log('Q3 Yes clicked');
        await page.waitForTimeout(2000);
        const closeBtn2 = page.getByRole('button', { name: /close|cancel/i });
        if (await closeBtn2.count() > 0) {
            await closeBtn2.first().click();
            await page.waitForTimeout(500);
        }
    } catch (e) {
        console.log('Q3 already answered or error:', e.message.substring(0, 80));
    }

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'uep-hrus.png', fullPage: true });

    // Scan HRUS table
    const result = await page.evaluate(() => {
        // Find the HRUS section
        let hrusSection = null;
        document.querySelectorAll('p').forEach(el => {
            if (el.textContent?.includes('Hazard Related User Scenarios for Summative Evaluation')) {
                hrusSection = el.closest('div') || el.parentElement;
            }
        });

        if (!hrusSection) return { error: 'HRUS section not found' };

        // Get all rows in the HRUS table
        const rows = hrusSection.querySelectorAll('table tbody tr');
        const rowData = [];

        rows.forEach((row, rowIdx) => {
            const cells = [];
            row.querySelectorAll('textarea, input, [role="radio"], [role="checkbox"], button').forEach((el, i) => {
                cells.push({
                    i,
                    tag: el.tagName,
                    type: el.getAttribute('type') || el.getAttribute('role') || '',
                    placeholder: el.getAttribute('placeholder') || '',
                    value: el.value || el.textContent?.trim().substring(0, 30) || '',
                    cls: el.className?.substring(0, 80) || '',
                    id: el.id || '',
                    name: el.getAttribute('name') || '',
                    dataAttr: JSON.stringify(Object.fromEntries(
                        Array.from(el.attributes)
                            .filter(a => a.name.startsWith('data-'))
                            .map(a => [a.name, a.value])
                    ))
                });
            });
            rowData.push({ rowIdx, cells });
        });

        // Also get all textareas in HRUS section (page-level scan)
        const allTextareas = [];
        hrusSection.querySelectorAll('textarea').forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            allTextareas.push({
                i,
                placeholder: el.getAttribute('placeholder') || '',
                value: el.value || '',
                cls: el.className?.substring(0, 60) || '',
                visible: rect.width > 0 && rect.height > 0,
                top: Math.round(rect.top),
                left: Math.round(rect.left)
            });
        });

        // Get column headers
        const headers = [];
        hrusSection.querySelectorAll('table thead th, table thead td').forEach(th => {
            headers.push(th.textContent?.trim().substring(0, 50) || '');
        });

        return { headers, rows: rowData, allTextareas };
    });

    console.log('=== HRUS TABLE HEADERS ===');
    console.log(JSON.stringify(result.headers, null, 2));
    console.log('=== HRUS ROW 0 CELLS ===');
    console.log(JSON.stringify(result.rows?.[0]?.cells, null, 2));
    console.log('=== ALL TEXTAREAS IN HRUS SECTION ===');
    console.log(JSON.stringify(result.allTextareas, null, 2));
    if (result.error) console.log('ERROR:', result.error);
});
