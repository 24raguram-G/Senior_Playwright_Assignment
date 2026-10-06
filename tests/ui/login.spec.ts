import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestUsers, ErrorMessages } from '../../src/utils/test-data';

/**
 * SauceDemo Login functionality test suite
 */
test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page before each test
    await loginPage.navigateToLogin();
  });

  test('should login successfully with valid credentials', async ({ loginPage, inventoryPage }) => {
    // Perform login with standard user
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    
    // Verify successful login - redirected to inventory page
    await expect(inventoryPage.pageTitle).toBeVisible();
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
  });

  test('should show error with invalid username', async ({ loginPage }) => {
    // Attempt login with invalid username
    await loginPage.login(TestUsers.invalidUser.username, TestUsers.standard.password);
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message text
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.invalidCredentials);
  });

  test('should show error with invalid password', async ({ loginPage }) => {
    // Attempt login with valid username but invalid password
    await loginPage.login(TestUsers.standard.username, 'wrong_password');
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message contains invalid credentials text
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.invalidCredentials);
  });

  test('should show error with empty username', async ({ loginPage }) => {
    // Attempt login with empty username
    await loginPage.login('', TestUsers.standard.password);
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.usernameRequired);
  });

  test('should show error with empty password', async ({ loginPage }) => {
    // Attempt login with empty password
    await loginPage.login(TestUsers.standard.username, '');
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.passwordRequired);
  });

  test('should show error with empty username and password', async ({ loginPage }) => {
    // Attempt login with both fields empty
    await loginPage.login('', '');
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message mentions username (first required field)
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.usernameRequired);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    // Attempt login with locked out user
    await loginPage.login(TestUsers.lockedOut.username, TestUsers.lockedOut.password);
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify locked out error message
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ErrorMessages.lockedOut);
  });

  test('should display login form elements correctly', async ({ loginPage, page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Swag Labs/i);
    
    // Verify login form elements are visible
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
