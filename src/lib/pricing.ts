import { products, type Cart } from '../data/products';

export const PROMO_CODE = 'CRAFT10';
export const MAX_QUANTITY = 99;

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatMoney(paise: number): string {
  return currencyFormatter.format(paise / 100);
}

export function getPricing(cart: Cart, hasDiscount: boolean) {
  const subtotal = products.reduce(
    (sum, product) => sum + product.pricePaise * cart[product.id],
    0,
  );
  const discount = hasDiscount ? Math.round(subtotal * 0.1) : 0;
  const shipping = 0;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}

export function getItemCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

export function createOrderReference(): string {
  const date = new Date();
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  const randomBytes = new Uint8Array(3);
  crypto.getRandomValues(randomBytes);
  const suffix = Array.from(randomBytes, (n) => n.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
  return `CC-${day}-${suffix}`;
}
