import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestUsers } from '../../src/utils/test-data';

/**
 * Complete Product Order Flow Test for SauceDemo
 * This test covers the entire user journey from login to order completion
 */
test.describe('Complete Product Order Flow', () => {
  test('should complete full product order flow from login to checkout', async ({ 
    page, 
    loginPage, 
    inventoryPage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Step 1: Open https://www.saucedemo.com/
    await loginPage.navigateToLogin();
    await expect(page).toHaveURL('/');

    // Step 2: Login with a valid user
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);

    // Step 3: Verify Products page
    await expect(inventoryPage.pageTitle).toBeVisible();
    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');
    await expect(page).toHaveURL('/inventory.html');

    // Step 4: Select exactly one product
    // Step 5: Add the product to cart
    const productName = await inventoryPage.addFirstProductToCart();
    expect(productName).toBeTruthy();

    // Verify product was added (cart badge should show 1)
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Step 6: Open cart
    await inventoryPage.openCart();

    // Step 7: Verify the selected product
    await expect(cartPage.pageTitle).toBeVisible();
    const cartTitle = await cartPage.getPageTitle();
    expect(cartTitle).toBe('Your Cart');
    
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);
    
    const isProductInCart = await cartPage.isProductInCart(productName);
    expect(isProductInCart).toBeTruthy();

    // Step 8: Click Checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');

    // Step 9: Enter first name
    // Step 10: Enter last name
    // Step 11: Enter postal code
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

    // Step 12: Continue
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // Verify overview page shows the product
    const overviewItemCount = await checkoutPage.getOverviewItemCount();
    expect(overviewItemCount).toBe(1);

    // Step 13: Finish
    await checkoutPage.clickFinish();
    await expect(page).toHaveURL('/checkout-complete.html');

    // Step 14: Verify successful order completion
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBeTruthy();

    const completeHeader = await checkoutPage.getCompleteHeader();
    expect(completeHeader).toBe('Thank you for your order!');

    const completeText = await checkoutPage.getCompleteText();
    expect(completeText).toContain('Your order has been dispatched');
  });
});
