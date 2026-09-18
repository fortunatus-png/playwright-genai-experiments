import { test, expect } from '@playwright/test';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-LOGIN-001 – Successful login with standard_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('TC-LOGIN-002 – Locked out user cannot log in', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-LOGIN-003 – Login with empty username and password', async ({ page }) => {
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  });
})