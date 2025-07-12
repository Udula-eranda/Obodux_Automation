const {test , expect } = require('@playwright/test')
const {LoginPage}  = require('./login.page')
const {invalidUser, expected , URL}  = require('../Utils/testData')


test('Incorrect Password Validation' , async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(URL.siteLink);
  await loginPage.login(invalidUser.email , invalidUser.password);

  const errorLocator = page.locator("[role='alert']"); 
  await errorLocator.waitFor();

  const errorMessage = await errorLocator.textContent();
  console.log("Error message:", errorMessage);

  expect(errorMessage).toContain(expected.loginError); 

})

