export const products = [
  {
    id: 'headphones',
    name: 'Studio Headphones',
    category: 'AUDIO / 01',
    description: 'Every note, in its element.',
    detail: 'Wireless · Noise cancelling',
    pricePaise: 349900,
    image: '/studio-headphones.svg',
    imageAlt: 'Illustration of graphite over-ear headphones',
    accent: 'violet',
    badge: 'BESTSELLER',
  },
  {
    id: 'lamp',
    name: 'Arc Desk Lamp',
    category: 'DESK / 02',
    description: 'Find your perfect glow.',
    detail: 'Adjustable · Warm LED',
    pricePaise: 189900,
    image: '/arc-desk-lamp.svg',
    imageAlt: 'Illustration of an adjustable warm-white desk lamp',
    accent: 'peach',
    badge: 'NEW ARRIVAL',
  },
] as const;

export type Product = (typeof products)[number];
export type ProductId = Product['id'];
export type Cart = Record<ProductId, number>;

export const initialCart: Cart = { headphones: 1, lamp: 1 };
export const emptyCart: Cart = { headphones: 0, lamp: 0 };
