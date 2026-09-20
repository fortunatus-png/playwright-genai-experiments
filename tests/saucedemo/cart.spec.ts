import { test, expect } from '@playwright/test';

test.describe('cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC-CART-001 – Product is displayed in the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('TC-CART-002 – Remove a product from the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeEmpty();
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
  });

  test('TC-CART-003 – Verify product quantity and product name', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  test('TC-CART-004 – Navigate back to shopping', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();

    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')
      .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
  });
});