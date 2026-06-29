import { test, expect } from '@playwright/test';

test('Playwright Built-in Locators and Functions Demo', async ({ page }) => {

  // =====================================================
  // 1. Navigate to website
  // =====================================================

  //await page.goto('https://demo.playwright.dev/todomvc'); change url here
  await page.goto('http://127.0.0.1:3000');

  // Assertion for URL
  //await expect(page).toHaveURL(/todomvc/); //old

  // Assertion for title
  await expect(page).toHaveTitle(/TodoMVC Clone/);

  console.log('Website launched successfully');

  // =====================================================
  // 2. getByPlaceholder()
  // =====================================================

  // Locate input using placeholder text
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Learn Playwright');
  await todoInput.press('Enter');

  console.log('Added first TODO');

  // =====================================================
  // 3. getByText()
  // =====================================================

  // Verify added text
  await expect(page.getByText('Learn Playwright')).toBeVisible();

  // =====================================================
  // 4. Add another TODO
  // =====================================================

  await todoInput.fill('Learn TypeScript');
  await todoInput.press('Enter');

  console.log('Added second TODO');

  // =====================================================
  // 5. locator()
  // =====================================================

  // Generic CSS locator
  const todoItems = page.locator('.todo-list li');

  // Verify count
  await expect(todoItems).toHaveCount(2);

  // =====================================================
  // 6. first(), last(), nth()
  // =====================================================

  await expect(todoItems.first()).toContainText('Learn Playwright');

  await expect(todoItems.last()).toContainText('Learn TypeScript');

  await expect(todoItems.nth(1)).toContainText('Learn TypeScript');

  // =====================================================
  // 7. getByRole()
  // =====================================================

  // Locate checkbox by role
  const firstCheckbox = todoItems.first().getByRole('checkbox');

  await firstCheckbox.check();

  await expect(firstCheckbox).toBeChecked();

  console.log('Checkbox selected');

  // =====================================================
  // 8. filter()
  // =====================================================

  const typescriptTodo = todoItems.filter({
    hasText: 'Learn TypeScript'
  });

  await expect(typescriptTodo).toBeVisible();

  // =====================================================
  // 9. Hover action
  // =====================================================

  await typescriptTodo.hover();

  console.log('Hover action completed');

  // =====================================================
  // 10. Double click example
  // =====================================================

  await typescriptTodo.dblclick();

  console.log('Double click completed');

  // =====================================================
  // 11. Keyboard actions
  // =====================================================

  await page.keyboard.press('End');

  await page.keyboard.press('Home');

  console.log('Keyboard actions completed');

  // =====================================================
  // 12. Mouse actions
  // =====================================================

  await page.mouse.move(300, 300);

  console.log('Mouse moved');

  // =====================================================
  // 13. waitForTimeout()
  // =====================================================

  await page.waitForTimeout(1000);

  // =====================================================
  // 14. waitFor()
  // =====================================================

  await typescriptTodo.waitFor();


  await page.screenshot({
    path: 'playwright-demo.png',
    fullPage: true
  });

  console.log('Screenshot captured');

 

  const pageTitle = await page.evaluate(() => document.title);

  console.log('Page title from browser:', pageTitle);

  // =====================================================
  // 17. Locator chaining
  // =====================================================

  const chainedLocator = page
    .locator('.todo-list')
    .locator('li')
    .first();

  await expect(chainedLocator).toContainText('Learn Playwright');

  console.log('Locator chaining successful');


  await expect.soft(todoItems).toHaveCount(2);

  console.log('Soft assertion executed');


  await page.close();

  console.log('Demo completed successfully');
});

