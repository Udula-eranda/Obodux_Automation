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
    await skipTourIfPresent(this.page);
  }

}

// Standalone helper — call this after any navigation that might trigger the tour overlay
async function skipTourIfPresent(page) {
  try {
    const skipBtn = page.locator('button').filter({ hasText: /^Skip tour$/i }).first();
    await skipBtn.waitFor({ state: 'visible', timeout: 6000 });
    await skipBtn.click();
    await page.waitForTimeout(800);
    // Wait for the SVG overlay to fully disappear before proceeding
    await page.waitForFunction(
      () => !document.querySelector('svg rect[fill="rgba(0,0,0,0.6)"]'),
      { timeout: 5000 }
    ).catch(() => {});
    console.log('Onboarding tour dismissed ✓');
  } catch { /* popup not present */ }
}

module.exports = { LoginPage, skipTourIfPresent };