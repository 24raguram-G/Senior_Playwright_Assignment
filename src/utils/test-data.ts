/**
 * Test data constants and configurations
 */

export const TestUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const TestURLs = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkout: '/checkout-step-one.html',
  checkoutOverview: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
};

export const ErrorMessages = {
  invalidCredentials: 'Username and password do not match any user in this service',
  lockedOut: 'Sorry, this user has been locked out',
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
};

export const Timeouts = {
  short: 5000,
  medium: 10000,
  long: 30000,
};
