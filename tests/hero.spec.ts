import { test, expect } from '@playwright/test';

test('renders hero copy and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /BlackRoad OS/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore documentation/i })).toBeVisible();
});
