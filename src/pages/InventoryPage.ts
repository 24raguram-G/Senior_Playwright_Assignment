import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Inventory (Products) Page Object Model for SauceDemo
 * Contains all locators and methods related to the inventory/products page
 */
export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    super(page);
    // Define locators
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Navigate to inventory page
   */
  async navigateToInventory(): Promise<void> {
    await this.goto('/inventory.html');
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Check if on inventory page
   */
  async isOnInventoryPage(): Promise<boolean> {
    return await this.isVisible(this.pageTitle);
  }

  /**
   * Get count of items in cart
   */
  async getCartItemCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.getText(this.shoppingCartBadge);
      return parseInt(text);
    }
    return 0;
  }

  /**
   * Add specific product to cart by name
   */
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await this.click(addButton);
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart(): Promise<string> {
    const firstItem = this.inventoryItems.first();
    const productName = await firstItem.locator('.inventory_item_name').textContent() || '';
    const addButton = firstItem.locator('button').first();
    await this.click(addButton);
    return productName;
  }

  /**
   * Open shopping cart
   */
  async openCart(): Promise<void> {
    await this.click(this.shoppingCartLink);
  }

  /**
   * Get all product names on the page
   */
  async getAllProductNames(): Promise<string[]> {
    // Wait for at least one product to be visible
    await this.page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });
    const names = await this.page.locator('.inventory_item_name').allTextContents();
    return names;
  }
}
