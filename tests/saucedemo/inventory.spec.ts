import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';

test.describe('inventory', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  const standardUser = 'standard_user';
  const password = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
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
    await inventoryPage.cartLink.click();
    await expect(inventoryPage.cartList).toHaveCount(1);
    await expect(inventoryPage.itemName).toHaveText('Sauce Labs Backpack');
  });

  test('TC-INVENTORY-006 – Add multiple products to the cart', async () => {
    await inventoryPage.addItem('backpack');
    await inventoryPage.addItem('bike-light');
    await inventoryPage.addItem('bolt-t-shirt');

    await inventoryPage.expectRemoveButton('backpack');
    await inventoryPage.expectRemoveButton('bike-light');
    await inventoryPage.expectRemoveButton('bolt-t-shirt');

    await inventoryPage.gotoCartPage();
    await inventoryPage.expectCountOfItems('3');
    await inventoryPage.expectProductVisible('Sauce Labs Backpack');
    await inventoryPage.expectProductVisible('Sauce Labs Bike Light');
    await inventoryPage.expectProductVisible('Sauce Labs Bolt T-Shirt');
  });

  test('TC-INVENTORY-007 – Remove a product from the cart', async () => {
    await inventoryPage.addItem('backpack');
    await inventoryPage.addItem('bike-light');

    await inventoryPage.gotoCartPage();
    await inventoryPage.expectCountOfItems('2');
    await inventoryPage.expectProductVisible('Sauce Labs Backpack');
    await inventoryPage.expectProductVisible('Sauce Labs Bike Light');

    await inventoryPage.removeButton('backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.expectProductNotVisible('Sauce Labs Backpack');
    await inventoryPage.expectProductVisible('Sauce Labs Bike Light');
  });
});