import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Cart Page Object Model for SauceDemo
 * Contains all locators and methods related to the shopping cart page
 */
export class CartPage extends BasePage {
  // Locators
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    // Define locators
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart(): Promise<void> {
    await this.goto('/cart.html');
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Get count of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get all product names in cart
   */
  async getCartProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Check if specific product is in cart
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const products = await this.getCartProductNames();
    return products.includes(productName);
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }
}
