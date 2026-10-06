import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model (Inventory Page for SauceDemo)
 * Contains all locators and methods related to the main logged-in page
 */
export class HomePage extends BasePage {
  // Locators
  readonly pageTitle: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    // Define locators
    this.pageTitle = page.locator('.title');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/inventory.html');
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    await this.waitForElement(this.pageTitle);
    return await this.getText(this.pageTitle);
  }

  /**
   * Perform logout
   */
  async logout(): Promise<void> {
    await this.click(this.hamburgerMenu);
    await this.waitForElement(this.logoutLink);
    await this.click(this.logoutLink);
  }

  /**
   * Check if user is logged in (on inventory page)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.pageTitle);
  }
}
