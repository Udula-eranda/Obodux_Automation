/**
 * selectRandomDate — picks tomorrow's date from a React Day Picker popup.
 *
 * Opens the calendar for a DD/MM/YYYY button, navigates to the next month
 * if tomorrow falls there, then clicks tomorrow's day via page.mouse.click()
 * (fires the full pointer-event chain that React Day Picker requires).
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} [position='first']  'first' or 'last' — which DD/MM/YYYY button to target
 */
async function selectRandomDate(page, position = 'first') {
    const allBtns = page.locator('button').filter({ hasText: /DD\/MM\/YYYY/ });
    const dateBtn = position === 'last' ? allBtns.last() : allBtns.first();

    // Scroll button into the scrollable container
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

    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const targetDay   = tomorrow.getDate();
    const targetMonth = tomorrow.getMonth(); // 0-indexed
    const targetYear  = tomorrow.getFullYear();

    // Helper: find tomorrow's day button in the currently displayed month view
    async function findTomorrowCoords() {
        return page.evaluate(({ day }) => {
            const cal = document.querySelector('.rdp-root');
            if (!cal) return null;
            const buttons = Array.from(cal.querySelectorAll('td[role="gridcell"] button'));
            for (const btn of buttons) {
                const tdCls  = btn.closest('td')?.className || '';
                const btnCls = btn.className || '';
                if (tdCls.includes('outside') || btnCls.includes('outside')) continue;
                if (tdCls.includes('disabled') || btnCls.includes('disabled')) continue;
                if (btn.textContent?.trim() === String(day)) {
                    const rect = btn.getBoundingClientRect();
                    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
                }
            }
            return null;
        }, { day: targetDay });
    }

    let coords = await findTomorrowCoords();

    // If tomorrow not visible (end-of-month edge case), click "next month" arrow and retry
    if (!coords) {
        const nextCoords = await page.evaluate(() => {
            const cal = document.querySelector('.rdp-root');
            if (!cal) return null;
            const btns = Array.from(cal.querySelectorAll('button'));
            const next = btns.find(b => {
                const label = (b.getAttribute('aria-label') || '').toLowerCase();
                return label.includes('next') || b.textContent?.trim() === '›' || b.textContent?.trim() === '>';
            });
            if (!next) return null;
            const rect = next.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        });
        if (nextCoords) {
            await page.mouse.click(nextCoords.x, nextCoords.y);
            await page.waitForTimeout(500);
        }
        coords = await findTomorrowCoords();
    }

    // Final fallback: click the first available (non-outside, non-disabled) day
    if (!coords) {
        coords = await page.evaluate(() => {
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
            return null;
        });
    }

    if (coords) {
        await page.mouse.click(coords.x, coords.y);
    }
    await page.waitForTimeout(600);
    console.log(`Date picker: tomorrow (${targetDay}/${targetMonth + 1}/${targetYear}) selected ✓`);
}

module.exports = { selectRandomDate };
