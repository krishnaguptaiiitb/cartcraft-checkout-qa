import { ArrowRight, BadgeCheck, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { formatMoney } from '../lib/pricing';

export interface PlacedOrder {
  reference: string;
  customerName: string;
  itemCount: number;
  total: number;
}

interface ConfirmationProps {
  order: PlacedOrder;
  onNewOrder: () => void;
}

export function Confirmation({ order, onNewOrder }: ConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Tell keyboard and screen-reader users where the page changed after submit.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="confirmation-layout" aria-labelledby="confirmation-heading">
      <div className="confirmation-card">
        <div className="success-icon"><Check size={38} strokeWidth={2.8} aria-hidden="true" /></div>
        <p className="success-eyebrow"><BadgeCheck size={15} aria-hidden="true" /> CHECKOUT COMPLETE</p>
        <h1 id="confirmation-heading" tabIndex={-1} ref={headingRef}>Order confirmed<span className="period">.</span></h1>
        <p className="confirmation-subtitle">Nicely done, <strong>{order.customerName}</strong>. Your demo order has been placed successfully.</p>
        <div className="reference-box">
          <span>ORDER REFERENCE</span>
          <strong data-testid="order-reference">{order.reference}</strong>
          <p>Save this reference for your test evidence.</p>
        </div>
        <div className="confirmation-metrics">
          <div><span>Items ordered</span><strong>{order.itemCount}</strong></div>
          <div><span>Final total</span><strong>{formatMoney(order.total)}</strong></div>
        </div>
        <div className="confirmation-actions">
          <button className="place-order-button" type="button" onClick={onNewOrder}>
            <span>Start a new order</span><span className="place-order-arrow"><ArrowRight size={19} aria-hidden="true" /></span>
          </button>
          <p><RotateCcw size={14} aria-hidden="true" /> Your cart will reset to empty</p>
        </div>
      </div>
      <div className="success-aside">
        <div className="success-aside-mark">CC<span>®</span></div>
        <p className="success-aside-label">A BETTER WAY TO CHECK OUT</p>
        <h2>Thoughtful from<br />start to finish<span>.</span></h2>
        <p>A tiny checkout, designed with attention to every interaction.</p>
        <div className="success-aside-bottom"><ShieldCheck size={18} /> Simulated order · No real payment</div>
      </div>
    </section>
  );
}
