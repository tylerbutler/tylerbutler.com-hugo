import { test, expect } from '@playwright/test';

test.describe('Homepage Layout', () => {
  test('homepage full page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-full.png', { 
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('homepage header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('header#primary')).toHaveScreenshot('header.png');
  });

  test('homepage sidebar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const sidebar = page.locator('#sidebar');
    if (await sidebar.isVisible()) {
      await expect(sidebar).toHaveScreenshot('sidebar.png');
    }
  });

  test('homepage main content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('section#main')).toHaveScreenshot('main-content.png');
  });
});

test.describe('Article Layout', () => {
  test('single article page', async ({ page }) => {
    // Navigate to the first article available
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find and click on the first article link
    const firstArticleLink = page.locator('article h1 a').first();
    if (await firstArticleLink.isVisible()) {
      await firstArticleLink.click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('article-full.png', { 
        fullPage: true,
        animations: 'disabled'
      });
    }
  });

  test('article content area', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const firstArticleLink = page.locator('article h1 a').first();
    if (await firstArticleLink.isVisible()) {
      await firstArticleLink.click();
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('article.post-content')).toHaveScreenshot('article-content.png');
    }
  });
});

test.describe('Code Blocks', () => {
  test('code syntax highlighting', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for a page with code blocks
    const codeBlock = page.locator('pre, .codehilite, .highlight').first();
    if (await codeBlock.isVisible()) {
      await expect(codeBlock).toHaveScreenshot('code-block.png');
    }
  });
});

test.describe('Footer', () => {
  test('footer layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('footer')).toHaveScreenshot('footer.png');
  });
});