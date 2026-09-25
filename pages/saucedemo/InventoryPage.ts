import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly sortContainer: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemLink: Locator;
  readonly addButton: Locator;
  readonly itemDesc: Locator;
  readonly backpackImg: Locator;
  readonly title: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemLink = page.locator('[data-test="item-4-title-link"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.addButton = page.getByRole('button', { name: 'Add to cart' });
    this.backpackImg = page.locator('[data-test="item-sauce-labs-backpack-img"]');
    this.title = page.locator('[data-test="title"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectItemPage() {
    await expect(this.page).toHaveURL('/inventory-item.html?id=4');
  }

  async expectInventoryPage(timeout?: number) {
    await expect(this.page).toHaveURL('/inventory.html', { timeout });
    await expect(this.title).toHaveText('Products');
  }

  async sortProducts(selection: string) {
    await this.sortContainer.selectOption(selection);
  }

  async addItem(source: string) {
    await this.page.locator(`[data-test="add-to-cart-sauce-labs-${source}"]`).click();
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