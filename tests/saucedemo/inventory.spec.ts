import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';

test.describe('inventory', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  const standardUser = 'standard_user';
  const password = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser, password);
    await loginPage.expectInventoryPage();
  });

  test('TC-INVENTORY-001 – Products are displayed', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
    for (const item of await inventoryPage.items.all()) {
      await expect(item.locator('img.inventory_item_img')).toBeVisible();
      await expect(item.locator('.inventory_item_label')).toBeVisible();
      await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
  });

  test('TC-INVENTORY-002 – Sort products by name', async () => {
    await inventoryPage.sortProducts('za');
    await expect(inventoryPage.itemName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await inventoryPage.sortProducts('az');
    await expect(inventoryPage.itemName.first()).toHaveText('Sauce Labs Backpack');
  });

  test('TC-INVENTORY-003 – Sort products by price', async () => {
    await inventoryPage.sortProducts('lohi');
    await expect(inventoryPage.itemPrice.first()).toHaveText('$7.99');
    await inventoryPage.sortProducts('hilo');
    await expect(inventoryPage.itemPrice.first()).toHaveText('$49.99');
  });

  test('TC-INVENTORY-004 – Open product details', async () => {
    await inventoryPage.itemLink.click();
    await inventoryPage.expectItemPage();

    await expect(inventoryPage.backpackImg).toBeVisible();
    await expect(inventoryPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(inventoryPage.itemDesc).toBeVisible();
    await expect(inventoryPage.itemPrice).toBeVisible();
    await expect(inventoryPage.addButton).toBeVisible();
  });

  test('TC-INVENTORY-005 – Add a product to the cart', async () => {
    await inventoryPage.addItem('backpack');
    await inventoryPage.expectRemoveButton('backpack');
    await cartPage.cartLink.click();
    await expect(cartPage.cartList).toHaveCount(1);
    await cartPage.expectProductVisible('Sauce Labs Backpack');
  });
});