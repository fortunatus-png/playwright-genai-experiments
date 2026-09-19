import { test, expect } from '@playwright/test';

test.describe('inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC-INVENTORY-001 – Products are displayed', async ({ page }) => {
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(6);
    for (const item of await items.all()) {
      await expect(item.locator('img.inventory_item_img')).toBeVisible();
      await expect(item.locator('.inventory_item_label')).toBeVisible();
      await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
  });

  test('TC-INVENTORY-002 – Sort products by name', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Sauce Labs Backpack');
  });

  test('TC-INVENTORY-003 – Sort products by price', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText('$7.99');
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText('$49.99');
  });

  test('TC-INVENTORY-004 – Open product details', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL('/inventory-item.html?id=4');

    await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });

  test('TC-INVENTORY-005 – Add a product to the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="cart-list"]')).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });

  test('TC-INVENTORY-006 – Add multiple products to the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bolt T-ShirtGet')).toBeVisible();
  });

  test('TC-INVENTORY-007 – Remove a product from the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });
});