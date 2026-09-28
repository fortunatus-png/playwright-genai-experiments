import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartList: Locator;
    readonly cartBadge: Locator;
    readonly continueButton: Locator;
    readonly checkoutButton: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartList = page.locator('[data-test="cart-list"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.continueButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    }

    async gotoCartPage() {
        await this.cartLink.click();
    }

    async expectCountOfItems(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }

    async removeButton(source: string) {
        await this.page.locator(`[data-test="remove-sauce-labs-${source}"]`).click();
    }

    async expectRemoveButton(source: string) {
        await expect(this.page.locator(`[data-test="remove-sauce-labs-${source}"]`)).toBeVisible();
    }

    async expectProductVisible(item: string) {
        await expect(
            this.page.locator('[data-test="inventory-item-name"]')
                .filter({ hasText: item })
        ).toBeVisible();
    }

    async expectProductNotVisible(item: string) {
        await expect(this.page.getByText(item)).not.toBeVisible();
    }
}