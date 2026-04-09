const { test } = require('@playwright/test');
const { loginAndOnboardDevice } = require('../Utils/deviceOnboard');
const { deviceInfoPage } = require('../PomModels/deviceInfoPom');
const { rmPage } = require('../PomModels/riskMangmntPom');

test('Inspect RAM Row Popup Fields', async ({ page }) => {

    test.setTimeout(300000);

    await loginAndOnboardDevice(page);
    await page.waitForTimeout(5000);

    const deviceInfo = new deviceInfoPage(page);
    await deviceInfo.clickFirstItem();
    await page.waitForTimeout(5000);

    const riskMangemnt = new rmPage(page);
    await riskMangemnt.navigatetoRM();
    await page.waitForTimeout(3000);

    // expand RM menu
    const rmCollapseBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
    await rmCollapseBtn.click();
    await page.waitForTimeout(2000);

    // open Risk Analysis Matrix form
    const raMatrixFormBtn = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    await raMatrixFormBtn.click();
    await page.waitForTimeout(2000);

    // navigate to RAM table section
    await page.getByText('Risk Analysis Matrix Table').click();
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'ram-table-view.png' });
    console.log('RAM table view captured');

    // click the action button on the first row
    const actionBtns = page.locator('table tbody tr').first().locator('button, [role="button"], img[role="button"], svg').last();
    await actionBtns.scrollIntoViewIfNeeded();
    await actionBtns.click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: 'ram-row-action-menu.png' });
    console.log('Action menu captured');

    // look for an "Edit" or "Open" type option in the menu
    const editOption = page.getByRole('menuitem').filter({ hasText: /edit|open|view/i }).first();
    if (await editOption.isVisible()) {
        await editOption.click();
        await page.waitForTimeout(2000);
    }

    await page.screenshot({ path: 'ram-popup-open.png' });
    console.log('Popup captured');

    // log all input labels / field names inside the popup/dialog
    const dialog = page.locator('[role="dialog"], [data-radix-dialog-content], .modal, [class*="dialog"], [class*="modal"], [class*="sheet"]').first();

    const labels = await dialog.locator('label, [class*="label"], p, h3, h4').allInnerTexts();
    console.log('\n=== POPUP FIELD LABELS ===');
    labels.forEach((l, i) => { if (l.trim()) console.log(`[${i}] ${l.trim()}`); });

    const inputs = await dialog.locator('input, textarea, [contenteditable="true"], [data-placeholder]').count();
    console.log(`\nTotal input fields: ${inputs}`);

    const radios = await dialog.locator('[role="radio"], [role="radiogroup"]').count();
    console.log(`Radio buttons/groups: ${radios}`);

    // log all select/combobox/trigger elements (dropdowns)
    const dropdowns = await dialog.locator('[role="combobox"], [role="listbox"], button[aria-haspopup], [data-radix-select-trigger], [class*="select"], [class*="trigger"]').all();
    console.log(`\nDropdown elements found: ${dropdowns.length}`);
    for (let i = 0; i < dropdowns.length; i++) {
        const text = await dropdowns[i].innerText().catch(() => '');
        const ariaLabel = await dropdowns[i].getAttribute('aria-label').catch(() => '');
        console.log(`  Dropdown [${i}]: text="${text.trim()}" aria-label="${ariaLabel}"`);
    }

    // click each dropdown and log its options
    const allDropdowns = await dialog.locator('[role="combobox"], button[aria-haspopup], [data-radix-select-trigger]').all();
    console.log(`\n=== DROPDOWN OPTIONS ===`);
    for (let i = 0; i < allDropdowns.length; i++) {
        const label = await allDropdowns[i].innerText().catch(() => '');
        console.log(`\nDropdown [${i}] "${label.trim()}":`);
        await allDropdowns[i].click();
        await page.waitForTimeout(800);
        const options = await page.locator('[role="option"], [role="listitem"], [data-radix-select-item]').allInnerTexts();
        options.forEach(o => { if (o.trim()) console.log(`  - ${o.trim()}`); });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
    }

    // scroll down inside dialog and take another screenshot
    await dialog.evaluate(el => el.scrollTop += 400);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'ram-popup-scrolled.png' });
    console.log('\nScrolled popup captured');

    await page.screenshot({ path: 'ram-popup-full.png', fullPage: false });

});
