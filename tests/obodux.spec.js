const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./login.page');

test('obodux login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('primary-admin@yopmail.com', 'abcd@TEST123');
  
  // Wait for successful login (based on URL or a dashboard element)
  await expect(page).toHaveURL(/.*\/admin/); 
  // await expect(page.locator("text=Users")).toBeVisible();
  const title = await page.title();
  console.log('Page title:', title);
// Only assert after ensuring you're on the right page
  expect(title).toBe('Obodux');
});

test('Incorrect Password Validation' , async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('primary-admin@yopmail.com', 'abcd@TES');

  const errorLocator = page.locator("[role='alert']"); 
  await errorLocator.waitFor();

  const errorMessage = await errorLocator.textContent();
  console.log("Error message:", errorMessage);

  expect(errorMessage).toContain("Incorrect account or password. Please check your input."); 

})