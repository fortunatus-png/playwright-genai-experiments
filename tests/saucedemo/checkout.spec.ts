import { test, expect } from '@playwright/test';

test.describe('checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('TC-CHECKOUT-001 – Checkout with valid data', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Max');
    await page.locator('[data-test="lastName"]').fill('Mustermann');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  });

  test('TC-CHECKOUT-002 – First name is required', async ({ page }) => {
    await page.locator('[data-test="lastName"]').fill('Mustermann');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });

  test('TC-CHECKOUT-003 – Verify checkout order overview', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Max');
    await page.locator('[data-test="lastName"]').fill('Mustermann');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();

    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
  });

  test('TC-CHECKOUT-004 – Complete the order and verify confirmation', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Max');
    await page.locator('[data-test="lastName"]').fill('Mustermann');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('/checkout-step-two.html');

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
  });

  test('TC-CHECKOUT-005 – Last name is required', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Max');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Error: Last Name is required')).toBeVisible();
  });
});