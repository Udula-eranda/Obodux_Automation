const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./login.page');
const {validUser , expected  }  = require('../Utils/testData')
const { URL } = require('../Utils/testData')

test('obodux login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(URL.siteLink);
  await loginPage.login(validUser.email , validUser.password);
  
  // Wait for successful login (based on URL or a dashboard element)
  await expect(page).toHaveURL(/.*\/admin/); 
  // await expect(page.locator("text=Users")).toBeVisible();
  const title = await page.title();
  console.log('Page title:', title);
// Only assert after ensuring you're on the right page
  expect(title).toBe(expected.dashboardTitle);
});

