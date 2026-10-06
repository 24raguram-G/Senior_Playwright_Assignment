# Playwright Automation Framework with TypeScript

A professional, scalable Playwright automation framework using TypeScript and Page Object Model (POM) pattern.

## Features

- ✅ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Page Object Model (POM)** - Maintainable and reusable page objects
- ✅ **Multi-Browser Support** - Chromium and Firefox configured
- ✅ **Parallel Execution** - Tests run in parallel for faster execution
- ✅ **HTML Reporting** - Detailed HTML reports with screenshots and videos
- ✅ **Screenshots & Videos** - Captured automatically on test failure
- ✅ **Trace on Failure** - Debug with Playwright trace viewer
- ✅ **Separate UI & API Tests** - Clear separation of concerns
- ✅ **Custom Fixtures** - Reusable test setup and teardown
- ✅ **Utility Functions** - Common helpers for test operations

## Project Structure

```
Senior-Playwright-Assignment/
├── src/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.ts       # Base class for all pages
│   │   ├── LoginPage.ts      # Login page object
│   │   ├── HomePage.ts       # Home page object
│   │   └── index.ts          # Page exports
│   ├── fixtures/              # Test fixtures
│   │   ├── test-fixtures.ts  # UI test fixtures
│   │   └── api-fixtures.ts   # API test fixtures
│   └── utils/                 # Utility functions
│       ├── test-helpers.ts   # Helper functions
│       └── test-data.ts      # Test data constants
├── tests/
│   ├── ui/                    # UI tests
│   │   ├── login.spec.ts
│   │   └── home.spec.ts
│   └── api/                   # API tests
│       ├── users.spec.ts
│       └── auth.spec.ts
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Senior-Playwright-Assignment
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium firefox
```

4. Create environment file:
```bash
cp .env.example .env
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run UI tests only
```bash
npx playwright test tests/ui
```

### Run API tests only
```bash
npx playwright test tests/api
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run specific test file
```bash
npx playwright test tests/ui/login.spec.ts
```

## Viewing Reports

### View HTML report
```bash
npx playwright show-report
```

### View trace (after failure)
```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: Parallel execution enabled
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Trace**: Retained on failure
- **Browsers**: Chromium and Firefox

### Environment Variables (`.env`)
- `BASE_URL`: Base URL for UI tests
- `API_BASE_URL`: Base URL for API tests
- `CI`: CI/CD environment flag

## Writing Tests

### UI Test Example
```typescript
import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ loginPage, homePage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('user@example.com', 'password');
    await expect(homePage.welcomeMessage).toBeVisible();
  });
});
```

### API Test Example
```typescript
import { test, expect } from '../../src/fixtures/api-fixtures';

test.describe('User API Tests', () => {
  test('should get users', async ({ apiContext }) => {
    const response = await apiContext.get('/users');
    expect(response.status()).toBe(200);
  });
});
```

### Creating New Page Objects
1. Extend `BasePage` class
2. Define locators in constructor
3. Create methods for page interactions
4. Export from `src/pages/index.ts`

## Best Practices

1. **Use Page Object Model** - Keep locators and actions in page classes
2. **Use Custom Fixtures** - Simplify test setup with fixtures
3. **Keep Tests Independent** - Each test should run independently
4. **Use Descriptive Names** - Test names should describe what they test
5. **Don't Hard-code Data** - Use test data from `utils/test-data.ts`
6. **Wait for Elements** - Use Playwright's auto-waiting features
7. **Use TypeScript** - Leverage type safety
8. **Keep Tests Simple** - One assertion per test when possible

## Continuous Integration

The framework is CI-ready with:
- Automatic retries on CI
- JSON results output
- HTML report generation
- Screenshot and video capture on failure

## Troubleshooting

### Tests failing locally
- Ensure browsers are installed: `npx playwright install`
- Check environment variables in `.env`
- Verify base URLs are correct

### Slow test execution
- Reduce timeout values if appropriate
- Increase workers for parallel execution
- Run specific test suites instead of all tests

## Contributing

1. Create a new branch for your feature
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## License

ISC
