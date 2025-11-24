import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test('health endpoint returns ok status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.service).toBe('blackroad-os-web');
    expect(data.timestamp).toBeDefined();
  });

  test('version endpoint returns service info', async ({ request }) => {
    const response = await request.get('/api/version');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.service).toBe('blackroad-os-web');
    expect(data.version).toBeDefined();
    expect(data.commit).toBeDefined();
    expect(data.env).toBeDefined();
  });

  test('ready endpoint returns ready status', async ({ request }) => {
    const response = await request.get('/api/ready');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.ready).toBe(true);
    expect(data.timestamp).toBeDefined();
  });
});
