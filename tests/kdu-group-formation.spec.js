// @ts-check
import { test, expect } from '@playwright/test';

test.describe('KDU AI Group Formation System E2E Suite', () => {
  test('should load the dashboard and verify header and telemetry', async ({ page }) => {
    // Navigate to production or local deployment
    const targetUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://ai-group-formation.vercel.app/';
    await page.goto(targetUrl);

    // Verify system title
    await expect(page).toHaveTitle(/KDU|Group Formation/i);

    // Verify hero title
    const heroHeading = page.locator('h1.hero-title');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toHaveText(/AI Group Formation System/i);

    // Verify database and AI status pills
    await expect(page.getByText(/Supabase DB/i)).toBeVisible();

    // Verify 4-model comparison cards or Decision-Support Hub cards
    await expect(page.getByRole('heading', { name: 'Algorithmic Benchmarking Arena', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CSP Constraint Rules', exact: true })).toBeVisible();
  });
});
