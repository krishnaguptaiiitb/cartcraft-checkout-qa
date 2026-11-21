import { BadgeCheck, Gift, ShoppingBag, Tag, Truck, X } from 'lucide-react';
import { products, type Cart } from '../data/products';
import { formatMoney, getPricing, PROMO_CODE } from '../lib/pricing';

interface OrderSummaryProps {
  cart: Cart;
  pricing: ReturnType<typeof getPricing>;
  itemCount: number;
  promoInput: string;
  promoApplied: boolean;
  promoError: string;
  onPromoInput: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
  cartError: string;
}

export function OrderSummary({
  cart,
  pricing,
  itemCount,
  promoInput,
  promoApplied,
  promoError,
  onPromoInput,
  onApplyPromo,
  onRemovePromo,
  cartError,
}: OrderSummaryProps) {
  const selectedProducts = products.filter((product) => cart[product.id] > 0);

  return (
    <section className="summary-card" aria-labelledby="summary-heading">
      <div className="summary-topline">
        <div className="summary-heading-wrap">
          <div className="summary-bag-icon"><ShoppingBag size={18} aria-hidden="true" /></div>
          <div>
            <p className="mini-eyebrow">YOUR SELECTION</p>
            <h2 id="summary-heading">Order summary</h2>
          </div>
        </div>
        <span className="item-pill">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="summary-items" aria-live="polite" aria-atomic="true">
        {selectedProducts.length === 0 ? (
          <div className="empty-cart" data-testid="empty-cart">
            <div className="empty-cart-symbol"><ShoppingBag size={24} aria-hidden="true" /></div>
            <h3>Your cart is empty</h3>
            <p>Add a product from the collection to get started.</p>
          </div>
        ) : selectedProducts.map((product) => (
          <div className="summary-item" key={product.id}>
            <div className={`summary-item-art product-visual--${product.accent}`}>
              <img src={product.image} alt="" />
            </div>
            <div className="summary-item-info">
              <span className="summary-item-name">{product.name}</span>
              <span className="summary-item-count">
                {cart[product.id]} × {formatMoney(product.pricePaise)}
              </span>
            </div>
            <strong className="summary-item-total" data-testid={`line-total-${product.id}`}>
              {formatMoney(product.pricePaise * cart[product.id])}
            </strong>
          </div>
        ))}
      </div>
      {cartError && <p role="alert" className="field-error cart-error">{cartError}</p>}

      <div className="promo-section">
        <div className="promo-label"><Tag size={16} aria-hidden="true" /> Have a promo code?</div>
        {promoApplied ? (
          <div className="applied-promo">
            <span><BadgeCheck size={17} aria-hidden="true" /> {PROMO_CODE} applied · 10% off</span>
            <button type="button" onClick={onRemovePromo} aria-label="Remove promo code">
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="promo-input-row">
            <input
              aria-label="Promo code"
              aria-invalid={Boolean(promoError)}
              aria-describedby={promoError ? 'promo-code-error' : undefined}
              value={promoInput}
              onChange={(event) => onPromoInput(event.target.value)}
              placeholder="Enter code"
              spellCheck={false}
              autoComplete="off"
              maxLength={24}
            />
            <button type="button" onClick={onApplyPromo}>Apply</button>
          </div>
        )}
        {promoError && <p id="promo-code-error" role="alert" className="field-error promo-error">{promoError}</p>}
      </div>

      <div className="price-breakdown">
        <div className="price-row"><span>Subtotal</span><span data-testid="subtotal">{formatMoney(pricing.subtotal)}</span></div>
        {promoApplied && (
          <div className="price-row price-row--discount"><span>Promo discount (10%)</span><span data-testid="discount">−{formatMoney(pricing.discount)}</span></div>
        )}
        <div className="price-row"><span>Shipping</span><span className="shipping-free"><Truck size={15} aria-hidden="true" /> Free</span></div>
      </div>
      <div className="total-section">
        <div><span className="total-caption">TOTAL</span><p>All prices in INR</p></div>
        <output className="grand-total" data-testid="order-total" aria-label={`Order total ${formatMoney(pricing.total)}`}>
          {formatMoney(pricing.total)}
        </output>
      </div>
      <div className="gift-note"><Gift size={17} aria-hidden="true" /><span>Try <strong>{PROMO_CODE}</strong> for 10% off your demo order.</span></div>
    </section>
  );
}
