class LoginPage {
  
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("[inputmode='email']");
    this.passwordInput = page.locator("[type='password']");
    this.submitButton = page.locator("[name='submit']");
    
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login(email, password) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();

  // // // Wait for error message when login fails instead of navigation
  // // await this.page.locator("text=Incorrect account or password").waitFor();
  // }

  }

}

module.exports = { LoginPage }; 