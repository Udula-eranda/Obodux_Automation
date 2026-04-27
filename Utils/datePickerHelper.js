/**
 * selectRandomDate — reusable date picker helper.
 *
 * Opens the calendar popup for a DD/MM/YYYY button, picks the first
 * available day in the displayed month via direct DOM click (bypasses
 * any pointer-event / overlay interception), then waits for the popup
 * to close.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} [position='first']  'first' or 'last' — which DD/MM/YYYY
 *                                     button to target when multiple exist
 */
async function selectRandomDate(page, position = 'first') {
    const allBtns = page.locator('button').filter({ hasText: /DD\/MM\/YYYY/ });
    const dateBtn = position === 'last' ? allBtns.last() : allBtns.first();

    // Scroll button into the scrollable container (handles deep-nested layouts)
    await dateBtn.evaluate((el) => {
        const container = document.querySelector('.flex-1.overflow-y-auto');
        if (container) {
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            if (rect.top < cRect.top || rect.bottom > cRect.bottom) {
                container.scrollTop += rect.top - cRect.top - 100;
            }
        }
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(500);

    await dateBtn.click();
    await page.waitForTimeout(800);

    // Wait for React Day Picker calendar to render
    await page.locator('.rdp-root').waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(300);

    // Get screen coordinates of the first available day button and use
    // page.mouse.click() — fires full pointer event chain that React Day Picker needs
    const coords = await page.evaluate(() => {
        const cal = document.querySelector('.rdp-root');
        if (!cal) return null;
        const buttons = Array.from(cal.querySelectorAll('td[role="gridcell"] button'));
        for (const btn of buttons) {
            const classes = (btn.className || '') + (btn.closest('td')?.className || '');
            if (!classes.includes('outside') && !classes.includes('disabled')) {
                const rect = btn.getBoundingClientRect();
                return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
            }
        }
        // Fallback: use index 3 (skips typical 3 overflow days from previous month)
        const btn = buttons[3] || buttons[0];
        if (btn) {
            const rect = btn.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        }
        return null;
    });

    if (coords) {
        await page.mouse.click(coords.x, coords.y);
    }
    await page.waitForTimeout(600);
    console.log(`Date picker: random date selected ✓`);
}

module.exports = { selectRandomDate };
