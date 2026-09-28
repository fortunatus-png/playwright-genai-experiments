import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorText: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorText = page.locator('[data-test="error"]');
    this.title = page.locator('[data-test="title"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL('/');
  }

  async expectInventoryPage(timeout?: number) {
    await expect(this.page).toHaveURL('/inventory.html', { timeout });
    await expect(this.title).toHaveText('Products');
  }

  async login(user: string, password: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithEnter(user: string, password: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }
}