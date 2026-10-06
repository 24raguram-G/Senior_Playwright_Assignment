import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Page Object Model for SauceDemo
 * Contains all locators and methods related to the checkout pages
 */
export class CheckoutPage extends BasePage {
  // Step One - Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Step Two - Overview
  readonly finishButton: Locator;
  readonly overviewItems: Locator;

  // Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Step One locators
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Step Two locators
    this.finishButton = page.locator('[data-test="finish"]');
    this.overviewItems = page.locator('.cart_item');

    // Complete locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill checkout information (Step One)
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
  }

  /**
   * Get overview item count
   */
  async getOverviewItemCount(): Promise<number> {
    return await this.overviewItems.count();
  }

  /**
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    await this.click(this.finishButton);
  }

  /**
   * Get completion header text
   */
  async getCompleteHeader(): Promise<string> {
    await this.waitForElement(this.completeHeader);
    return await this.getText(this.completeHeader);
  }

  /**
   * Get completion message text
   */
  async getCompleteText(): Promise<string> {
    return await this.getText(this.completeText);
  }

  /**
   * Check if order is complete
   */
  async isOrderComplete(): Promise<boolean> {
    return await this.isVisible(this.completeHeader);
  }

  /**
   * Go back to products/home
   */
  async backToProducts(): Promise<void> {
    await this.click(this.backHomeButton);
  }
}
