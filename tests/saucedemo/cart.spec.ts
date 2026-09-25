import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';

test.describe('cart', () => {
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

  test('TC-CART-001 – Product is displayed in the cart', async () => {
    await inventoryPage.addItem('backpack');
    await cartPage.cartLink.click();
    await expect(cartPage.cartBadge).toHaveText('1');
    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await expect(cartPage.itemDesc).toBeVisible();
    await expect(cartPage.itemPrice).toBeVisible();
    await cartPage.expectRemoveButton('backpack');
  });

  test('TC-CART-002 – Remove a product from the cart', async () => {
    await inventoryPage.addItem('backpack');
    await cartPage.cartLink.click();
    await expect(cartPage.cartBadge).toHaveText('1');
    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await cartPage.expectRemoveButton('backpack');
    await cartPage.removeButton('backpack');
    await expect(cartPage.cartLink).toBeEmpty();
    await cartPage.expectProductNotVisible('Sauce Labs Backpack');
  });

  test('TC-CART-003 – Verify product quantity and product name', async () => {
    await inventoryPage.addItem('backpack');
    await inventoryPage.addItem('bike-light');
    await cartPage.gotoCartPage();
    await cartPage.expectCountOfItems('2');
    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await cartPage.expectProductVisible('Sauce Labs Bike Light');
  });

  test('TC-CART-004 – Navigate back to shopping', async () => {
    await inventoryPage.addItem('backpack');
    await cartPage.cartLink.click();
    await cartPage.continueButton.click();
    await inventoryPage.expectInventoryPage();
    await inventoryPage.expectProductVisible('Sauce Labs Backpack');
    await inventoryPage.expectProductVisible('Sauce Labs Bike Light');
    await inventoryPage.expectProductVisible('Sauce Labs Bolt T-Shirt');
    await inventoryPage.expectProductVisible('Sauce Labs Fleece Jacket');
    await inventoryPage.expectProductVisible('Sauce Labs Onesie');
    await inventoryPage.expectProductVisible('Test.allTheThings() T-Shirt (Red)');
    await expect(inventoryPage.shoppingCart).toHaveText('1');
  });
});