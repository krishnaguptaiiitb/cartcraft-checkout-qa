import { useRef, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleHelp,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { CheckoutForm } from './components/CheckoutForm';
import { Confirmation, type PlacedOrder } from './components/Confirmation';
import { OrderSummary } from './components/OrderSummary';
import { ProductCard } from './components/ProductCard';
import { emptyCart, initialCart, products, type Cart, type ProductId } from './data/products';
import {
  createOrderReference,
  formatMoney,
  getItemCount,
  getPricing,
  MAX_QUANTITY,
  PROMO_CODE,
} from './lib/pricing';

function App() {
  const [cart, setCart] = useState<Cart>({ ...initialCart });
  const [customerName, setCustomerName] = useState('');
  const [nameError, setNameError] = useState('');
  const [cartError, setCartError] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  // A synchronous guard prevents two rapid submissions before React rerenders.
  const submittedRef = useRef(false);
  const itemCount = getItemCount(cart);
  const pricing = getPricing(cart, promoApplied);

  function changeQuantity(
    productId: ProductId,
    nextQuantity: number | ((currentQuantity: number) => number),
  ) {
    if (submittedRef.current) return;

    // Functional updates protect rapid successive clicks from stale quantities.
    setCart((current) => {
      const proposed = typeof nextQuantity === 'function'
        ? nextQuantity(current[productId])
        : nextQuantity;
      const safeQuantity = Math.max(0, Math.min(MAX_QUANTITY, proposed));
      return { ...current, [productId]: safeQuantity };
    });
    setCartError('');
  }

  function updateCustomerName(value: string) {
    setCustomerName(value);
    if (value.trim()) setNameError('');
  }

  function applyPromo() {
    if (submittedRef.current) return;
    if (!promoInput.trim()) {
      setPromoError('Please enter a promo code.');
      return;
    }
    if (promoInput.trim().toUpperCase() !== PROMO_CODE) {
      setPromoError('That promo code is not valid. Try CRAFT10.');
      return;
    }
    setPromoApplied(true);
    setPromoError('');
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittedRef.current) return;

    const cartValidation = itemCount === 0 ? 'Your cart is empty. Add an item before placing your order.' : '';
    const nameValidation = customerName.trim() ? '' : 'Please enter your full name to continue.';
    setCartError(cartValidation);
    setNameError(nameValidation);
    if (cartValidation || nameValidation) return;

    submittedRef.current = true;
    setOrder({
      reference: createOrderReference(),
      customerName: customerName.trim(),
      itemCount,
      total: pricing.total,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startNewOrder() {
    setCart({ ...emptyCart });
    setCustomerName('');
    setNameError('');
    setCartError('');
    setPromoInput('');
    setPromoApplied(false);
    setPromoError('');
    setOrder(null);
    submittedRef.current = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#top">Skip to checkout content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="CartCraft home">
            <span className="brand-mark"><span className="brand-mark-glyph">c<span>c</span></span></span>
            <span className="brand-name">cartcraft<span className="brand-dot">.</span></span>
          </a>
          <div className="header-center"><span className="header-center-dot" /> THE LITTLE SHOP OF GOOD THINGS</div>
          <div className="header-right">
            <span className="header-secure"><ShieldCheck size={15} aria-hidden="true" /> DEMO CHECKOUT</span>
            <div className="header-bag" aria-label={`${itemCount} items in cart`}>
              <ShoppingBag size={19} aria-hidden="true" />
              <span>{itemCount}</span>
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="page-container" tabIndex={-1}>
        {order ? (
          <Confirmation order={order} onNewOrder={startNewOrder} />
        ) : (
          <>
            <section className="hero" aria-labelledby="page-title">
              <div className="hero-text">
                <div className="hero-overline"><span className="hero-star"><Sparkles size={13} aria-hidden="true" /></span> THE CONSIDERED CHECKOUT EXPERIENCE</div>
                <h1 id="page-title">Good things.<br /><em>Great checkout</em><span className="period">.</span></h1>
                <p>Two thoughtfully picked essentials. One beautifully simple checkout. No guesswork, no surprises.</p>
                <a className="browse-link" href="#collection">Explore the collection <ArrowDownRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="hero-art-circle hero-art-circle--outer" />
                <div className="hero-art-circle hero-art-circle--inner" />
                <div className="hero-orbit hero-orbit--top"><Star size={20} fill="currentColor" /></div>
                <div className="hero-orbit hero-orbit--bottom"><Check size={23} /></div>
                <div className="hero-art-center"><span>CC</span><small>®</small></div>
                <span className="hero-art-caption">THE ART OF LESS, BUT BETTER</span>
              </div>
            </section>

            <div className="usp-strip" aria-label="Shop benefits">
              <div><Truck size={19} aria-hidden="true" /><span>COMPLIMENTARY SHIPPING</span></div>
              <span className="usp-separator" />
              <div><PackageCheck size={19} aria-hidden="true" /><span>INSTANT ORDER CONFIRMATION</span></div>
              <span className="usp-separator" />
              <div><LockKeyhole size={18} aria-hidden="true" /><span>NO PAYMENT REQUIRED</span></div>
            </div>

            <div className="main-grid" id="collection">
              <section className="collection-section" aria-labelledby="collection-title">
                <div className="section-header">
                  <div>
                    <p className="section-eyebrow"><span className="section-eyebrow-line" /> THE COLLECTION / 01—02</p>
                    <h2 id="collection-title">Your next favorites<span className="period">.</span></h2>
                    <p>Made-up products. Real attention to detail.</p>
                  </div>
                  <span className="product-count">02 / 02</span>
                </div>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={cart[product.id]}
                      onChangeQuantity={(quantity) => changeQuantity(product.id, quantity)}
                    />
                  ))}
                </div>
                <div className="thoughtful-note">
                  <div className="thoughtful-symbol"><Sparkles size={23} aria-hidden="true" /></div>
                  <div><h3>A little extra thought.</h3><p>Try changing quantities, using a promo code, or removing everything. Every detail should feel just right.</p></div>
                  <ArrowRight size={20} aria-hidden="true" />
                </div>
              </section>

              <aside className="checkout-column" aria-label="Checkout sidebar">
                <OrderSummary
                  cart={cart}
                  pricing={pricing}
                  itemCount={itemCount}
                  promoInput={promoInput}
                  promoApplied={promoApplied}
                  promoError={promoError}
                  cartError={cartError}
                  onPromoInput={(value) => { setPromoInput(value); if (promoError) setPromoError(''); }}
                  onApplyPromo={applyPromo}
                  onRemovePromo={() => { setPromoApplied(false); setPromoInput(''); }}
                />
                <CheckoutForm
                  name={customerName}
                  onNameChange={updateCustomerName}
                  nameError={nameError}
                  onSubmit={submitOrder}
                  submitting={submittedRef.current}
                />
                <div className="sidebar-trust"><CircleHelp size={16} aria-hidden="true" /> Testing the checkout? Try <strong>CRAFT10</strong> at checkout.</div>
              </aside>
            </div>

            <section className="bottom-banner" aria-label="Checkout philosophy">
              <div className="bottom-banner-icon"><Star size={24} fill="currentColor" aria-hidden="true" /></div>
              <div><p>NOT JUST A CHECKOUT.</p><h2>A better little experience.</h2></div>
              <span>Every click counts. <ArrowRight size={18} aria-hidden="true" /></span>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span>© 2026 CARTCRAFT STUDIO</span>
          <span>BUILT TO BE TESTED. DESIGNED TO BE LOVED.</span>
          <span>DEMO ONLY · {formatMoney(0)} CHARGED</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
