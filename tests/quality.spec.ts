import { expect, test } from '@playwright/test';

// Playwright isolates each test in a separate browser context.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('order-total')).toHaveText('₹5,398');
});

test('A09: rapid quantity events are cumulative and capped at 99', async ({ page }) => {
  const increase = page.getByRole('button', { name: 'Increase Studio Headphones quantity' });
  await increase.evaluate((button) => {
    // Three browser click events within one JS task reproduce a batched-update race.
    for (let i = 0; i < 3; i += 1) (button as HTMLButtonElement).click();
  });
  await expect(page.getByRole('status', { name: 'Studio Headphones quantity' })).toHaveText('4');
  await expect(page.getByTestId('line-total-headphones')).toHaveText('₹13,996');
  await expect(page.getByTestId('order-total')).toHaveText('₹15,895');

  await increase.evaluate((button) => {
    for (let i = 0; i < 110; i += 1) (button as HTMLButtonElement).click();
  });
  await expect(page.getByRole('status', { name: 'Studio Headphones quantity' })).toHaveText('99');
  await expect(increase).toBeDisabled();
  await expect(page.getByTestId('order-total')).toHaveText('₹3,48,300');
});

test('A10: whitespace-only name cannot submit and typed value is preserved', async ({ page }) => {
  const name = page.getByRole('textbox', { name: 'Full name' });
  await name.fill('   ');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(name).toHaveValue('   ');
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('alert')).toHaveText('Please enter your full name to continue.');
  await expect(page.getByTestId('order-reference')).toHaveCount(0);
  await expect(page.getByTestId('order-total')).toHaveText('₹5,398');
});

test('A11: promo recalculates correctly when cart quantities change', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Promo code' }).fill('craft10');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByTestId('order-total')).toHaveText('₹4,858');

  await page.getByRole('button', { name: 'Increase Studio Headphones quantity' }).click();
  await expect(page.getByTestId('subtotal')).toHaveText('₹8,897');
  await expect(page.getByTestId('discount')).toHaveText('−₹890');
  await expect(page.getByTestId('order-total')).toHaveText('₹8,007');
});

test('A12: phone layout keeps checkout usable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.getByRole('heading', { name: /Your next favorites/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Place order' })).toBeVisible();
  await expect(page.getByTestId('order-total')).toHaveText('₹5,398');

  const horizontalOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(horizontalOverflow, 'Page should not require horizontal scrolling at 375px').toBe(false);

  await page.getByRole('textbox', { name: 'Full name' }).fill('Mobile Tester');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toBeVisible();
});

test('A13: keyboard skip link works and Enter submits the checkout', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to checkout content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#top')).toBeFocused();

  const name = page.getByRole('textbox', { name: 'Full name' });
  await name.fill('Keyboard Tester');
  await name.press('Enter');
  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toBeFocused();
  await expect(page.getByTestId('order-reference')).toHaveCount(1);
});

test('A14: both validation errors clear after their inputs are fixed', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove Studio Headphones from cart' }).click();
  await page.getByRole('button', { name: 'Remove Arc Desk Lamp from cart' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByRole('alert')).toHaveCount(2);

  const name = page.getByRole('textbox', { name: 'Full name' });
  await name.fill('Fix Tester');
  await expect(name).toHaveAttribute('aria-invalid', 'false');
  await expect(page.getByRole('alert')).toHaveCount(1);

  await page.getByRole('article').filter({ hasText: 'Studio Headphones' })
    .getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toBeVisible();
});

test('A15: promo error is connected to the input for assistive technology', async ({ page }) => {
  const promo = page.getByRole('textbox', { name: 'Promo code' });
  await promo.fill('WRONG');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(promo).toHaveAttribute('aria-invalid', 'true');
  await expect(promo).toHaveAttribute('aria-describedby', 'promo-code-error');
  await expect(page.locator('#promo-code-error')).toContainText('That promo code is not valid');

  await promo.fill('CRAFT10');
  await expect(promo).toHaveAttribute('aria-invalid', 'false');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByTestId('order-total')).toHaveText('₹4,858');
});

test('A16: fresh navigation creates an independent seed cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove Studio Headphones from cart' }).click();
  await expect(page.getByTestId('order-total')).toHaveText('₹1,899');
  await page.reload();
  await expect(page.getByTestId('order-total')).toHaveText('₹5,398');
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveValue('');
  await expect(page.getByTestId('order-reference')).toHaveCount(0);
});
