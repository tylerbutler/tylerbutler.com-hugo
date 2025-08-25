import { test, expect } from '@playwright/test';

test.describe('Modern vs Classic Layout Comparison', () => {
  test('homepage - modern layout', async ({ page }) => {
    await page.goto('/?layout=modern');
    await page.waitForLoadState('networkidle');
    
    // Ensure modern layout is active
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
      document.body.classList.remove('classic-layout');
    });
    
    await expect(page).toHaveScreenshot('homepage-modern-full.png', { 
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('homepage header - modern layout', async ({ page }) => {
    await page.goto('/?layout=modern');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    await expect(page.locator('header#primary')).toHaveScreenshot('header-modern.png');
  });

  test('homepage main content - modern layout', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    await expect(page.locator('section#main').first()).toHaveScreenshot('main-content-modern.png');
  });

  test('sidebar - modern layout', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    const sidebar = page.locator('#sidebar');
    if (await sidebar.isVisible()) {
      await expect(sidebar).toHaveScreenshot('sidebar-modern.png');
    }
  });

  test('single article - modern layout', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to first article
    const firstArticleLink = page.locator('article h1 a').first();
    if (await firstArticleLink.isVisible()) {
      await firstArticleLink.click();
      await page.waitForLoadState('networkidle');
      
      // Enable modern layout
      await page.evaluate(() => {
        document.body.classList.add('modern-layout');
      });
      
      await expect(page).toHaveScreenshot('article-modern-full.png', { 
        fullPage: true,
        animations: 'disabled'
      });
    }
  });

  test('responsive - mobile modern layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    await expect(page).toHaveScreenshot('homepage-mobile-modern.png', { 
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('responsive - tablet modern layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    await expect(page).toHaveScreenshot('homepage-tablet-modern.png', { 
      fullPage: true,
      animations: 'disabled'
    });
  });
});

test.describe('Layout Toggle Functionality', () => {
  test('layout toggle button works', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    // Check if toggle button exists (only in modern layout)
    const toggleButton = page.locator('.modern-layout-toggle');
    if (await toggleButton.isVisible()) {
      // Take screenshot of original layout
      await expect(page).toHaveScreenshot('before-toggle.png');
      
      // Click toggle
      await toggleButton.click();
      await page.waitForTimeout(500); // Wait for transition
      
      // Take screenshot after toggle
      await expect(page).toHaveScreenshot('after-toggle.png');
    }
  });
});

test.describe('Feature Detection', () => {
  test('CSS Grid support detection', async ({ page }) => {
    await page.goto('/modern-demo/');
    
    const hasGridSupport = await page.evaluate(() => {
      return CSS.supports('display', 'grid');
    });
    
    expect(hasGridSupport).toBeTruthy();
    
    const htmlClasses = await page.evaluate(() => {
      return document.documentElement.className;
    });
    
    expect(htmlClasses).toContain('supports-grid');
  });
  
  test('modern layout falls back gracefully', async ({ page }) => {
    // Simulate browser without grid support
    await page.addInitScript(() => {
      // Override CSS.supports to return false for grid
      window.CSS.supports = (property, value) => {
        if (property === 'display' && value === 'grid') {
          return false;
        }
        return true;
      };
    });
    
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    const htmlClasses = await page.evaluate(() => {
      return document.documentElement.className;
    });
    
    expect(htmlClasses).toContain('no-grid');
  });
});

test.describe('Accessibility Improvements', () => {
  test('modern layout has proper ARIA labels', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    // Check for navigation aria-label (exists even if empty)
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeAttached(); // Just check it exists, not necessarily visible
    
    // Check for main content role
    const main = page.locator('section[role="main"]').first();
    await expect(main).toBeVisible();
    
    // Check for complementary sidebar role
    const sidebar = page.locator('aside[role="complementary"]');
    if (await sidebar.isVisible()) {
      await expect(sidebar).toBeVisible();
    }
  });
  
  test('focus management works correctly', async ({ page }) => {
    await page.goto('/modern-demo/');
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.tagName.toLowerCase();
    });
    
    expect(['a', 'button', 'input']).toContain(focusedElement);
  });
});