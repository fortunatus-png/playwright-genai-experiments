import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly title: Locator;
    readonly finishButton: Locator;
    readonly completeText: Locator;
    readonly itemQuantity: Locator;
    readonly itemPrice: Locator;
    readonly paymentLabel: Locator;
    readonly paymentValue: Locator;
    readonly shippingLabel: Locator;
    readonly shippingValue: Locator;
    readonly subtotalLabel: Locator;
    readonly totalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.title = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.itemQuantity = page.locator('[data-test="item-quantity"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.paymentLabel = page.locator('[data-test="payment-info-label"]');
        this.paymentValue = page.locator('[data-test="payment-info-value"]');
        this.shippingLabel = page.locator('[data-test="shipping-info-label"]');
        this.shippingValue = page.locator('[data-test="shipping-info-value"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
    }

    async fillForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async expectCheckoutFirstPage() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
    }

    async expectCheckoutSecondPage() {
        await expect(this.page).toHaveURL('/checkout-step-two.html');
    }

    async expectCheckoutComplete() {
        await expect(this.page).toHaveURL('/checkout-complete.html');
    }

    async expectAText(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }
}