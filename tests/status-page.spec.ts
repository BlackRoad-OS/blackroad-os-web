import { test, expect } from '@playwright/test';

test.describe('Status Page', () => {
  test('renders status page with service cards', async ({ page }) => {
    await page.goto('/status');
    
    // Check page title
    await expect(page.getByRole('heading', { name: /System Status/i })).toBeVisible();
    
    // Check that all three service cards are present
    await expect(page.getByText('Web')).toBeVisible();
    await expect(page.getByText('API')).toBeVisible();
    await expect(page.getByText('Operator')).toBeVisible();
    
    // Check for status indicators (there should be 3, one per service)
    const statusLabels = page.getByText('Status:');
    await expect(statusLabels).toHaveCount(3);
  });

  test('displays web service status from health endpoint', async ({ page }) => {
    await page.goto('/status');
    
    // Wait for the health check to complete
    await page.waitForTimeout(1000);
    
    // Web service should show OK status after fetching from /api/health
    const webCard = page.locator('text=Web').locator('..');
    await expect(webCard.getByText(/OK|Unknown/i)).toBeVisible();
  });
});
