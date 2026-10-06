import { test, expect } from '../../src/fixtures/api-fixtures';
import { generateRandomString } from '../../src/utils/test-helpers';

/**
 * Helper function to register a client and get access token
 */
async function registerAndGetToken(apiContext: any): Promise<string> {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000000);
  const clientName = `TestClient_${timestamp}_${random}`;
  const clientEmail = `test_${timestamp}_${random}@example.com`;
  
  const registerResponse = await apiContext.post('/api-clients/', {
    data: { clientName, clientEmail },
  });
  
  if (registerResponse.status() !== 201) {
    const errorBody = await registerResponse.text();
    throw new Error(`Registration failed with status ${registerResponse.status()}: ${errorBody}`);
  }
  
  const { accessToken } = await registerResponse.json();
  return accessToken;
}

/**
 * Simple Books API - Orders endpoint tests
 * Tests client registration, order creation, update (PATCH), and deletion
 */
test.describe('Orders API Tests', () => {
  test('should register a new API client and get token', async ({ apiContext }) => {
    // Generate unique client details
    const clientName = `Test Client ${generateRandomString(8)}`;
    const clientEmail = `testclient${generateRandomString(8)}@example.com`;

    // Send POST request to register
    const response = await apiContext.post('/api-clients/', {
      data: {
        clientName: clientName,
        clientEmail: clientEmail,
      },
    });

    // Verify response status
    expect(response.status()).toBe(201);

    // Verify token is returned
    const body = await response.json();
    expect(body).toHaveProperty('accessToken');
    expect(typeof body.accessToken).toBe('string');
    expect(body.accessToken.length).toBeGreaterThan(0);
  });

  test('should create a new order with valid token (POST)', async ({ apiContext }) => {
    // Get available book
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books.find((book: any) => book.available === true).id;

    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // Create order with token
    const response = await apiContext.post('/orders', {
      data: {
        bookId: bookId,
        customerName: 'John Doe',
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status
    expect(response.status()).toBe(201);

    // Verify order created
    const body = await response.json();
    expect(body).toHaveProperty('created');
    expect(body.created).toBe(true);
    expect(body).toHaveProperty('orderId');
  });

  test('should get all orders', async ({ apiContext }) => {
    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // Get all orders
    const response = await apiContext.get('/orders', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify response is array
    const orders = await response.json();
    expect(Array.isArray(orders)).toBeTruthy();
  });

  test('should get a single order by id', async ({ apiContext }) => {
    // Get available book
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books.find((book: any) => book.available === true).id;

    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // First create an order
    const createResponse = await apiContext.post('/orders', {
      data: {
        bookId: bookId,
        customerName: 'Jane Smith',
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const createBody = await createResponse.json();
    const newOrderId = createBody.orderId;

    // Get the specific order
    const response = await apiContext.get(`/orders/${newOrderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify order details
    const order = await response.json();
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('bookId');
    expect(order).toHaveProperty('customerName');
    expect(order.id).toBe(newOrderId);
  });

  test('should update an order using PATCH', async ({ apiContext }) => {
    // Get available book
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books.find((book: any) => book.available === true).id;

    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // First create an order
    const createResponse = await apiContext.post('/orders', {
      data: {
        bookId: bookId,
        customerName: 'Original Name',
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const createBody = await createResponse.json();
    const newOrderId = createBody.orderId;

    // Update the order with PATCH
    const updateData = {
      customerName: 'Updated Name via PATCH',
    };

    const response = await apiContext.patch(`/orders/${newOrderId}`, {
      data: updateData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status
    expect(response.status()).toBe(204);

    // Verify the update by getting the order
    const getResponse = await apiContext.get(`/orders/${newOrderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const updatedOrder = await getResponse.json();
    expect(updatedOrder.customerName).toBe('Updated Name via PATCH');
  });

  test('should delete an order', async ({ apiContext }) => {
    // Get available book
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books.find((book: any) => book.available === true).id;

    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // First create an order
    const createResponse = await apiContext.post('/orders', {
      data: {
        bookId: bookId,
        customerName: 'To Be Deleted',
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const createBody = await createResponse.json();
    const deleteOrderId = createBody.orderId;

    // Delete the order
    const response = await apiContext.delete(`/orders/${deleteOrderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status
    expect(response.status()).toBe(204);

    // Verify order is deleted by trying to get it
    const getResponse = await apiContext.get(`/orders/${deleteOrderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Should return 404
    expect(getResponse.status()).toBe(404);
  });

  test('should fail to create order without authentication', async ({ apiContext }) => {
    // Get available book
    const booksResponse = await apiContext.get('/books');
    const books = await booksResponse.json();
    const bookId = books.find((book: any) => book.available === true).id;

    // Try to create order without token
    const response = await apiContext.post('/orders', {
      data: {
        bookId: bookId,
        customerName: 'No Auth User',
      },
    });

    // Verify response status is 401 Unauthorized
    expect(response.status()).toBe(401);
  });

  test('should fail to create order with invalid book id', async ({ apiContext }) => {
    // Register to get token
    const accessToken = await registerAndGetToken(apiContext);

    // Try to create order with non-existent book
    const response = await apiContext.post('/orders', {
      data: {
        bookId: 99999,
        customerName: 'John Doe',
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Verify response status is 400 Bad Request or 404
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });
});
