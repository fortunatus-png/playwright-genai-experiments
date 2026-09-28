import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';

test.describe('checkout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  const standardUser = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'Max';
  const lastName = 'Mustermann';
  const postalCode = '12345';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser, password);
    await loginPage.expectInventoryPage();
    await inventoryPage.addItem('backpack');
    await inventoryPage.shoppingCart.click();
    await cartPage.checkoutButton.click();
  });

  test('TC-CHECKOUT-001 – Checkout with valid data', async () => {
    await checkoutPage.fillForm(firstName, lastName, postalCode);
    await checkoutPage.expectCheckoutSecondPage();
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  });

  test('TC-CHECKOUT-002 – First name is required', async () => {
    await checkoutPage.fillForm('', lastName, postalCode);
    await checkoutPage.expectCheckoutFirstPage();
    await checkoutPage.expectAText('Error: First Name is required');
  });

  test('TC-CHECKOUT-003 – Verify checkout order overview', async () => {
    await checkoutPage.fillForm(firstName, lastName, postalCode);
    await checkoutPage.expectCheckoutSecondPage();
    await checkoutPage.expectAText('Sauce Labs Backpack');
    await expect(checkoutPage.itemQuantity).toHaveText('1');
    await expect(checkoutPage.itemPrice).toHaveText('$29.99');
    await expect(checkoutPage.paymentLabel).toHaveText('Payment Information:');
    await expect(checkoutPage.shippingLabel).toHaveText('Shipping Information:');
    await expect(checkoutPage.paymentValue).toBeVisible();
    await expect(checkoutPage.shippingValue).toBeVisible();
    await expect(checkoutPage.subtotalLabel).toHaveText('Item total: $29.99');
    await expect(checkoutPage.totalLabel).toHaveText('Total: $32.39');
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test('TC-CHECKOUT-004 – Complete the order and verify confirmation', async () => {
    await checkoutPage.fillForm(firstName, lastName, postalCode);
    await checkoutPage.expectCheckoutSecondPage();
    await checkoutPage.finishButton.click();
    await checkoutPage.expectCheckoutComplete();
    await checkoutPage.expectAText('Thank you for your order!');
    await expect(checkoutPage.completeText).toBeVisible();
  });

  test('TC-CHECKOUT-005 – Last name is required', async () => {
    await checkoutPage.fillForm(firstName, '', postalCode);
    await checkoutPage.expectCheckoutFirstPage();
    await checkoutPage.expectAText('Error: Last Name is required');
  });
});