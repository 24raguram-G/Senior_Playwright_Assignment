import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestUsers } from '../../src/utils/test-data';

/**
 * Home/Inventory page functionality test suite for SauceDemo
 */
test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Login before each test
    await loginPage.navigateToLogin();
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('should display inventory page after login', async ({ inventoryPage, page }) => {
    // Verify page title
    await expect(inventoryPage.pageTitle).toBeVisible();
    
    // Verify correct URL
    await expect(page).toHaveURL('/inventory.html');
    
    // Verify page title text
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
  });

  test('should display product list', async ({ inventoryPage }) => {
    // Verify products are visible
    const products = await inventoryPage.getAllProductNames();
    
    // Verify we have products
    expect(products.length).toBeGreaterThan(0);
  });

  test('should add product to cart', async ({ inventoryPage }) => {
    // Add a product to cart
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    
    // Verify cart badge shows 1
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should logout successfully', async ({ homePage, loginPage }) => {
    // Perform logout
    await homePage.logout();
    
    // Verify redirected to login page
    await expect(loginPage.loginButton).toBeVisible();
  });
});
