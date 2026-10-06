import { test as base } from '@playwright/test';
import { LoginPage, HomePage, InventoryPage, CartPage, CheckoutPage } from '../pages';

/**
 * Extended test fixtures with page objects
 * Automatically initializes page objects for each test
 */
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * Custom test with page object fixtures
 * Usage: import { test } from './fixtures/test-fixtures'
 */
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
