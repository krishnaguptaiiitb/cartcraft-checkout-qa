import { expect, test, type Page, type TestInfo } from '@playwright/test';

const seed = {
  headphones: '₹3,499',
  lamp: '₹1,899',
  total: '₹5,398',
  increasedHeadphones: '₹6,998',
  increasedTotal: '₹8,897',
  discountedTotal: '₹4,858',
};

async function saveEvidence(page: Page, testInfo: TestInfo, name: string) {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true, animations: 'disabled' }),
    contentType: 'image/png',
  });
}

// Playwright creates a fresh browser context/page for each test; navigation
// also returns the application to its deterministic seed cart.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Your next favorites/ })).toBeVisible();
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);
});

test('A01: a valid order displays one confirmation and a reference', async ({ page }, testInfo) => {
  await expect(page.getByTestId('line-total-headphones')).toHaveText(seed.headphones);
  await expect(page.getByTestId('line-total-lamp')).toHaveText(seed.lamp);

  await page.getByRole('textbox', { name: 'Full name' }).fill('Alex Morgan');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toBeVisible();
  await expect(page.getByText(/Nicely done, Alex Morgan/)).toBeVisible();
  await expect(page.getByTestId('order-reference')).toHaveText(/^CC-\d{8}-[0-9A-F]{6}$/);
  await expect(page.locator('.confirmation-metrics')).toContainText(seed.total);
  await expect(page.getByTestId('order-reference')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Place order' })).toHaveCount(0);

  await saveEvidence(page, testInfo, 'A01-confirmed-order');
});

test('A02: missing required name blocks checkout without changing the cart', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('alert')).toHaveText('Please enter your full name to continue.');
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('order-reference')).toHaveCount(0);
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);
  await expect(page.getByTestId('line-total-headphones')).toHaveText(seed.headphones);
  await expect(page.getByTestId('line-total-lamp')).toHaveText(seed.lamp);

  await saveEvidence(page, testInfo, 'A02-required-name-validation');
});

test('A03: increasing quantity changes the exact line and order totals', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Increase Studio Headphones quantity' }).click();

  await expect(page.getByRole('status', { name: 'Studio Headphones quantity' })).toHaveText('2');
  await expect(page.getByTestId('line-total-headphones')).toHaveText(seed.increasedHeadphones);
  await expect(page.getByTestId('line-total-lamp')).toHaveText(seed.lamp);
  await expect(page.getByTestId('subtotal')).toHaveText(seed.increasedTotal);
  await expect(page.getByTestId('order-total')).toHaveText(seed.increasedTotal);
  await expect(page.getByText('3 items', { exact: true })).toBeVisible();

  await saveEvidence(page, testInfo, 'A03-quantity-price-recalculation');

  await page.getByRole('button', { name: 'Decrease Studio Headphones quantity' }).click();
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);
});

test('A04: an empty cart is blocked and an entered name is preserved', async ({ page }, testInfo) => {
  await page.getByRole('textbox', { name: 'Full name' }).fill('Jordan Lee');
  await page.getByRole('button', { name: 'Remove Studio Headphones from cart' }).click();
  await page.getByRole('button', { name: 'Remove Arc Desk Lamp from cart' }).click();

  await expect(page.getByTestId('empty-cart')).toContainText('Your cart is empty');
  await expect(page.getByTestId('order-total')).toHaveText('₹0');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('alert')).toHaveText('Your cart is empty. Add an item before placing your order.');
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveValue('Jordan Lee');
  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toHaveCount(0);

  await saveEvidence(page, testInfo, 'A04-empty-cart-blocked');
});

test('A05: repeated synchronous submits still produce only one confirmation', async ({ page }, testInfo) => {
  await page.getByRole('textbox', { name: 'Full name' }).fill('Taylor Chen');

  // Two submit events in the SAME JavaScript task simulate the critical race
  // that a simple React state guard might not prevent before rerender.
  await page.locator('form[aria-label="Checkout details"]').evaluate((form) => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  await expect(page.getByRole('heading', { name: /Order confirmed/ })).toHaveCount(1);
  await expect(page.getByTestId('order-reference')).toHaveCount(1);
  await expect(page.getByTestId('order-reference')).toHaveText(/^CC-\d{8}-[0-9A-F]{6}$/);
  await expect(page.getByRole('button', { name: 'Place order' })).toHaveCount(0);

  await saveEvidence(page, testInfo, 'A05-single-confirmation');
});

test('A06: invalid promo does not change totals; a valid promo applies 10%', async ({ page }, testInfo) => {
  await page.getByRole('textbox', { name: 'Promo code' }).fill('NOTREAL');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();

  await expect(page.getByRole('alert')).toContainText('That promo code is not valid');
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);

  await page.getByRole('textbox', { name: 'Promo code' }).fill('craft10');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByText(/CRAFT10 applied/)).toBeVisible();
  await expect(page.getByTestId('discount')).toHaveText('−₹540');
  await expect(page.getByTestId('order-total')).toHaveText(seed.discountedTotal);

  await saveEvidence(page, testInfo, 'A06-discount');
  await page.getByRole('button', { name: 'Remove promo code' }).click();
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);
});

test('A07: a removed item can be added back and totals recover', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove Studio Headphones from cart' }).click();
  await expect(page.getByTestId('line-total-headphones')).toHaveCount(0);
  await expect(page.getByTestId('order-total')).toHaveText(seed.lamp);

  const headphonesCard = page.getByRole('article').filter({ hasText: 'Studio Headphones' });
  await headphonesCard.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.getByTestId('line-total-headphones')).toHaveText(seed.headphones);
  await expect(page.getByTestId('order-total')).toHaveText(seed.total);
});

test('A08: starting another order resets the cart, name, and discount', async ({ page }, testInfo) => {
  await page.getByRole('textbox', { name: 'Promo code' }).fill('CRAFT10');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Sam Rivera');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByTestId('order-reference')).toBeVisible();

  await page.getByRole('button', { name: 'Start a new order' }).click();

  await expect(page.getByTestId('empty-cart')).toBeVisible();
  await expect(page.getByTestId('order-total')).toHaveText('₹0');
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Promo code' })).toHaveValue('');
  await expect(page.getByTestId('order-reference')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Place order' })).toBeEnabled();

  await saveEvidence(page, testInfo, 'A08-fresh-order');
});
