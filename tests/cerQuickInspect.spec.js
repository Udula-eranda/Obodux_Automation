const { test } = require('@playwright/test');

test('CER Quick Inspect', async ({ page }) => {
    test.setTimeout(180000);

    // ── Login ─────────────────────────────────────────────────────────────────
    await page.goto('https://web.staging.obodux.boris-software.com');
    await page.waitForTimeout(4000);
    const emailField = page.locator("[inputmode='email']");
    if (await emailField.isVisible({ timeout: 6000 }).catch(() => false)) {
        await emailField.fill('editor-stag.1@yopmail.com');
        await page.locator("[type='password']").fill('abcd@TEST123');
        await page.locator("[name='submit']").click();
        await page.waitForTimeout(5000);
    }

    // ── Most recent Trocar device ─────────────────────────────────────────────
    await page.getByText('Trocar').first().click();
    await page.waitForTimeout(4000);

    // ── Navigate directly to CER report URL ──────────────────────────────────
    const url = page.url();
    const reportUrl = url.replace(/\/overview$/, '/clinical-evaluation/report')
                         .replace(/\/[^/]+$/, '/clinical-evaluation/report');
    // More robust: grab device ID from URL
    const match = url.match(/device-documentation\/([^/]+)/);
    let cerUrl = url;
    if (match) {
        cerUrl = `https://web.staging.obodux.boris-software.com/editor/device-documentation/${match[1]}/clinical-evaluation/report`;
    }
    console.log(`Navigating to: ${cerUrl}`);
    await page.goto(cerUrl);
    await page.waitForTimeout(5000);
    console.log(`Final URL: ${page.url()}`);

    // ── GLOBAL ELEMENT MAP ────────────────────────────────────────────────────
    const data = await page.evaluate(() => {
        const container = document.querySelector('.flex-1.overflow-y-auto');
        if (!container) return { error: 'No scrollable container found' };

        const borderFields = [...container.querySelectorAll('[class*="border"][class*="px-3"]')];
        const editables    = [...container.querySelectorAll('[contenteditable="true"]')];
        const radioGroups  = [...container.querySelectorAll('[role="radiogroup"]')];
        const radios       = [...container.querySelectorAll('input[type="radio"]')];
        const checkboxes   = [...container.querySelectorAll('input[type="checkbox"]')];
        const tables       = [...container.querySelectorAll('table')];
        const scrollH      = container.scrollHeight;

        const fieldMap = borderFields.map((el, i) => {
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            const relY = Math.round(rect.top - cRect.top + container.scrollTop);
            const txt = (el.innerText || '').substring(0, 60).replace(/\n/g,' ').trim();
            return { i, relY, txt };
        });

        const rgMap = radioGroups.map((el, i) => {
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            const relY = Math.round(rect.top - cRect.top + container.scrollTop);
            const txt = (el.innerText || '').substring(0, 80).replace(/\n/g,' ').trim();
            return { i, relY, txt };
        });

        const tableMap = tables.map((el, i) => {
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            const relY = Math.round(rect.top - cRect.top + container.scrollTop);
            const headers = [...el.querySelectorAll('th')].map(th => th.innerText.trim());
            return { i, relY, headers };
        });

        return {
            scrollH,
            counts: {
                borderFields: borderFields.length,
                editables: editables.length,
                radioGroups: radioGroups.length,
                radios: radios.length,
                checkboxes: checkboxes.length,
                tables: tables.length,
            },
            fieldMap,
            rgMap,
            tableMap,
        };
    });

    if (data.error) {
        console.log('ERROR:', data.error);
        await page.screenshot({ path: 'cerQuickInspect-error.png', fullPage: true });
        return;
    }

    console.log('\n════════════════════════════════════════════');
    console.log('CER FORM INSPECTION REPORT');
    console.log(`Container scrollHeight: ${data.scrollH}`);
    console.log('════════════════════════════════════════════');

    console.log(`\nGLOBAL COUNTS:`);
    console.log(`  border-px-3 fields : ${data.counts.borderFields}`);
    console.log(`  contenteditable    : ${data.counts.editables}`);
    console.log(`  radiogroups        : ${data.counts.radioGroups}`);
    console.log(`  radio buttons      : ${data.counts.radios}`);
    console.log(`  checkboxes         : ${data.counts.checkboxes}`);
    console.log(`  tables             : ${data.counts.tables}`);

    console.log(`\nBORDER-PX-3 FIELD INDEX → SCROLL-Y POSITION → TEXT PREVIEW:`);
    for (const f of data.fieldMap) {
        console.log(`  [${String(f.i).padStart(2)}]  y=${String(f.relY).padStart(5)}  "${f.txt}"`);
    }

    console.log(`\nRADIOGROUP INDEX → SCROLL-Y → TEXT PREVIEW:`);
    for (const r of data.rgMap) {
        console.log(`  [${String(r.i).padStart(2)}]  y=${String(r.relY).padStart(5)}  "${r.txt}"`);
    }

    console.log(`\nTABLE INDEX → SCROLL-Y → HEADERS:`);
    for (const t of data.tableMap) {
        console.log(`  [${String(t.i).padStart(2)}]  y=${String(t.relY).padStart(5)}  ${JSON.stringify(t.headers)}`);
    }

    // ── Section screenshots ───────────────────────────────────────────────────
    const scrollPoints = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500];
    for (const sp of scrollPoints) {
        await page.evaluate((p) => {
            const c = document.querySelector('.flex-1.overflow-y-auto');
            if (c) c.scrollTop = p;
        }, sp);
        await page.waitForTimeout(400);
        await page.screenshot({ path: `cer-scroll-${sp}.png` });
    }

    console.log('\nScreenshots saved: cer-scroll-0.png through cer-scroll-8500.png');
});
