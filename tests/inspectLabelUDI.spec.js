const { test } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const { validUser, URL, deviceDetails } = require('../Utils/testData');

test('inspect Labels UDI combobox options', async ({ page }) => {
    test.setTimeout(3000000);

    const loginPage = new LoginPage(page);
    await loginPage.goto(URL.siteLink);
    await loginPage.login(validUser.email, validUser.password);
    await page.waitForTimeout(5000);

    const deviceMenu = page.locator('ul li').nth(0);
    await deviceMenu.waitFor({ state: 'visible' });
    await deviceMenu.click();
    await page.waitForTimeout(3000);
    await page.waitForFunction(() => !document.querySelector('.animate-pulse'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    await page.getByText('Surgical Mask All Doc Complete 2').first().click();
    await page.waitForURL(/device-documentation\/[\w-]+\//, { timeout: 15000 });
    await page.waitForFunction(
        () => !document.querySelector('.animate-pulse') && !document.body.innerText.includes('Loading device data'),
        { timeout: 30000 }
    ).catch(() => {});
    await page.waitForTimeout(3000);

    // Navigate to Labels via sidebar click
    const labellingLink = page.getByRole('link', { name: /^labelling$/i }).first();
    await labellingLink.waitFor({ state: 'visible', timeout: 10000 });
    await labellingLink.click();
    await page.waitForURL(/labelling\/labels/, { timeout: 15000 });
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'labels-page-full.png', fullPage: true });

    // Open the first UDI combobox (Device Labels section)
    const comboboxes = page.locator('[role="combobox"]');
    const comboCount = await comboboxes.count();
    console.log('Total comboboxes on page:', comboCount);

    // Click the first "Select options" combobox (Device Labels UDI)
    const deviceUDICombo = comboboxes.nth(1); // nth(0) is device selector
    await deviceUDICombo.scrollIntoViewIfNeeded();
    await deviceUDICombo.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'labels-udi-dropdown.png', fullPage: false });

    // Get all options
    const options = page.locator('[data-radix-popper-content-wrapper] [role="option"]');
    const optCount = await options.count();
    console.log('UDI options count:', optCount);

    const optTexts = await options.allTextContents();
    console.log('UDI options:', JSON.stringify(optTexts, null, 2));

    // Close dropdown
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Check if there's a Mark Section Complete button
    const markCompleteBtn = page.getByRole('button', { name: /mark section complete/i });
    const markCompleteVisible = await markCompleteBtn.isVisible().catch(() => false);
    console.log('Mark Section Complete visible:', markCompleteVisible);

    // Check all buttons
    const allBtns = await page.locator('button').allTextContents();
    console.log('All buttons:', JSON.stringify(allBtns.filter(t => t.trim()), null, 2));
});
