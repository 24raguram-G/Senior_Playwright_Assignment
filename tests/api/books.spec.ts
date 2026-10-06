import { test, expect } from '../../src/fixtures/api-fixtures';

/**
 * Simple Books API - Books endpoint tests
 */
test.describe('Books API Tests', () => {
  test('should get status', async ({ apiContext }) => {
    // Send GET request to status endpoint
    const response = await apiContext.get('/status');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Verify response body
    const body = await response.json();
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('OK');
  });

  test('should get list of books', async ({ apiContext }) => {
    // Send GET request to books endpoint
    const response = await apiContext.get('/books');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Verify response body is an array
    const books = await response.json();
    expect(Array.isArray(books)).toBeTruthy();
    expect(books.length).toBeGreaterThan(0);
    
    // Verify book structure
    const firstBook = books[0];
    expect(firstBook).toHaveProperty('id');
    expect(firstBook).toHaveProperty('name');
    expect(firstBook).toHaveProperty('type');
    expect(firstBook).toHaveProperty('available');
  });

  test('should get list of fiction books', async ({ apiContext }) => {
    // Send GET request with type filter
    const response = await apiContext.get('/books?type=fiction');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Verify all books are fiction
    const books = await response.json();
    expect(Array.isArray(books)).toBeTruthy();
    
    books.forEach((book: any) => {
      expect(book.type).toBe('fiction');
    });
  });

  test('should get list of non-fiction books', async ({ apiContext }) => {
    // Send GET request with type filter
    const response = await apiContext.get('/books?type=non-fiction');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Verify all books are non-fiction
    const books = await response.json();
    expect(Array.isArray(books)).toBeTruthy();
    
    books.forEach((book: any) => {
      expect(book.type).toBe('non-fiction');
    });
  });

  test('should get a single book by id', async ({ apiContext }) => {
    // First get list of books to get a valid ID
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books[0].id;
    
    // Get single book
    const response = await apiContext.get(`/books/${bookId}`);
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Verify response body
    const book = await response.json();
    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('name');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('type');
    expect(book).toHaveProperty('price');
    expect(book).toHaveProperty('available');
    expect(book.id).toBe(bookId);
  });

  test('should return 404 for non-existent book', async ({ apiContext }) => {
    const nonExistentId = 99999;
    
    // Send GET request
    const response = await apiContext.get(`/books/${nonExistentId}`);
    
    // Verify response status
    expect(response.status()).toBe(404);
    
    // Verify error message
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });
});
