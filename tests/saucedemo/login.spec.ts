import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';

test.describe('login', () => {
  let loginPage: LoginPage;
  const standardUser = 'standard_user';
  const invalidUser = 'invalid_user';
  const problemUser = 'problem_user';
  const lockedOutUser = 'locked_out_user';
  const glitchUser = 'performance_glitch_user';
  const password = 'secret_sauce';
  const caseSensitivePassword = 'Secret_sauce';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LOGIN-001 – Successful login with standard_user', async () => {
    await loginPage.login(standardUser, password);
    await loginPage.expectInventoryPage();
  });

  test('TC-LOGIN-002 – Locked out user cannot log in', async () => {
    await loginPage.login(lockedOutUser, password);
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-LOGIN-003 – Login with empty username and password', async () => {
    await loginPage.loginButton.click();
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Username is required');
  });

  test('TC-LOGIN-004 – Valid username with blank password', async () => {
    await loginPage.usernameInput.fill(standardUser);
    await loginPage.loginButton.click();
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Password is required');
  });

  test('TC-LOGIN-005 – Blank username with valid password', async () => {
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Username is required');
  });

  test('TC-LOGIN-006 – Login with invalid credentials', async () => {
    await loginPage.login(invalidUser, password);
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-LOGIN-007 – Password is case-sensitive', async () => {
    await loginPage.login(standardUser, caseSensitivePassword);
    await loginPage.expectLoginPage();
    await expect(loginPage.errorText).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-LOGIN-008 – Successful login with problem_user', async () => {
    await loginPage.login(problemUser, password);
    await loginPage.expectInventoryPage();
  });

  test('TC-LOGIN-009 – performance_glitch_user reaches inventory within a maximum of 10 seconds', async ({ page }) => {
    await loginPage.login(glitchUser, password);
    await loginPage.expectInventoryPage(10000);
  });

  test('TC-LOGIN-010 – Submit login form using Enter key', async () => {
    await loginPage.loginWithEnter(standardUser, password);
    await loginPage.expectInventoryPage();
  });
});