import { test as base, APIRequestContext } from '@playwright/test';

/**
 * Extended test fixtures for API testing
 * Provides pre-configured API request context
 */
type APIFixtures = {
  apiContext: APIRequestContext;
};

/**
 * Custom test with API fixtures
 * Usage: import { test } from './fixtures/api-fixtures'
 */
export const test = base.extend<APIFixtures>({
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://simple-books-api.click',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    await use(apiContext);
    await apiContext.dispose();
  },
});

export { expect } from '@playwright/test';
