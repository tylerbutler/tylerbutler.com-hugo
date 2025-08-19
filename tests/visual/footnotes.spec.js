import { test, expect } from '@playwright/test';

test.describe('Footnote Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page that has footnotes
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('footnote buttons are present and styled correctly', async ({ page }) => {
    // Look for footnote buttons (could be Bigfoot or Littlefoot)
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      await expect(firstButton).toBeVisible();
      
      // Take screenshot of footnote button styling
      await expect(firstButton).toHaveScreenshot('footnote-button.png');
    }
  });

  test('footnote popover appears on click', async ({ page }) => {
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      
      // Click the footnote button
      await firstButton.click();
      await page.waitForTimeout(500); // Wait for popover animation
      
      // Check if popover appeared
      const popover = page.locator('.footnote-popover, .littlefoot__footnote, .bigfoot-footnote');
      await expect(popover).toBeVisible();
      
      // Take screenshot of the popover
      await expect(popover).toHaveScreenshot('footnote-popover.png');
    }
  });

  test('footnote popover closes correctly', async ({ page }) => {
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      
      // Open popover
      await firstButton.click();
      await page.waitForTimeout(300);
      
      const popover = page.locator('.footnote-popover, .littlefoot__footnote, .bigfoot-footnote');
      await expect(popover).toBeVisible();
      
      // Close by clicking outside
      await page.click('body', { position: { x: 50, y: 50 } });
      await page.waitForTimeout(300);
      
      // Popover should be hidden
      await expect(popover).toBeHidden();
    }
  });

  test('footnote popover closes with Escape key', async ({ page }) => {
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      
      // Open popover
      await firstButton.click();
      await page.waitForTimeout(300);
      
      const popover = page.locator('.footnote-popover, .littlefoot__footnote, .bigfoot-footnote');
      await expect(popover).toBeVisible();
      
      // Close with Escape key
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      
      // Popover should be hidden
      await expect(popover).toBeHidden();
    }
  });

  test('footnote accessibility attributes are correct', async ({ page }) => {
    const footnoteButtons = page.locator('.littlefoot__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      
      // Check for proper ARIA attributes
      await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      await expect(firstButton).toHaveAttribute('aria-label');
      await expect(firstButton).toHaveAttribute('type', 'button');
      
      // Click to open popover
      await firstButton.click();
      await page.waitForTimeout(300);
      
      // Check that aria-expanded changes
      await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      // Check popover accessibility
      const popover = page.locator('.littlefoot__footnote');
      if (await popover.isVisible()) {
        await expect(popover).toHaveAttribute('role', 'dialog');
        await expect(popover).toHaveAttribute('aria-label');
      }
    }
  });

  test('multiple footnotes work correctly', async ({ page }) => {
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    const buttonCount = await footnoteButtons.count();
    
    if (buttonCount >= 2) {
      // Click first footnote
      await footnoteButtons.nth(0).click();
      await page.waitForTimeout(300);
      
      let popovers = page.locator('.footnote-popover, .littlefoot__footnote, .bigfoot-footnote');
      await expect(popovers).toHaveCount(1);
      
      // Click second footnote (should replace first if allowMultiple is false)
      await footnoteButtons.nth(1).click();
      await page.waitForTimeout(300);
      
      // Should still have only 1 popover (or 2 if multiple allowed)
      const finalCount = await popovers.count();
      expect(finalCount).toBeGreaterThanOrEqual(1);
      expect(finalCount).toBeLessThanOrEqual(2);
    }
  });

  test('footnote content is properly displayed', async ({ page }) => {
    const footnoteButtons = page.locator('.footnote-button, .littlefoot__button, .bigfoot-footnote__button');
    
    if (await footnoteButtons.count() > 0) {
      const firstButton = footnoteButtons.first();
      
      // Click to open popover
      await firstButton.click();
      await page.waitForTimeout(300);
      
      // Check that popover contains content
      const popover = page.locator('.footnote-popover, .littlefoot__footnote, .bigfoot-footnote');
      const content = popover.locator('.footnote-popover__content, .littlefoot__content, .bigfoot-footnote__content');
      
      if (await popover.isVisible()) {
        await expect(content).toBeVisible();
        await expect(content).not.toBeEmpty();
      }
    }
  });
});

test.describe('Modern vs Classic Footnote Comparison', () => {
  test('modern layout footnotes - littlefoot', async ({ page }) => {
    await page.goto('/?layout=modern');
    await page.waitForLoadState('networkidle');
    
    // Enable modern layout
    await page.evaluate(() => {
      document.body.classList.add('modern-layout');
    });
    
    // Wait for Littlefoot to initialize
    await page.waitForTimeout(1000);
    
    const littlefootButtons = page.locator('.littlefoot__button');
    
    if (await littlefootButtons.count() > 0) {
      const firstButton = littlefootButtons.first();
      await expect(firstButton).toBeVisible();
      
      // Click to open popover
      await firstButton.click();
      await page.waitForTimeout(500);
      
      const popover = page.locator('.littlefoot__footnote');
      await expect(popover).toBeVisible();
      
      // Take screenshot of modern footnote
      await expect(popover).toHaveScreenshot('footnote-modern-popover.png');
    }
  });

  test('classic layout footnotes - bigfoot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for Bigfoot to initialize
    await page.waitForTimeout(1000);
    
    const bigfootButtons = page.locator('.bigfoot-footnote__button');
    
    if (await bigfootButtons.count() > 0) {
      const firstButton = bigfootButtons.first();
      await expect(firstButton).toBeVisible();
      
      // Click to open popover
      await firstButton.click();
      await page.waitForTimeout(500);
      
      const popover = page.locator('.bigfoot-footnote');
      await expect(popover).toBeVisible();
      
      // Take screenshot of classic footnote
      await expect(popover).toHaveScreenshot('footnote-classic-popover.png');
    }
  });
});