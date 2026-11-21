import { ArrowRight, Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react';
import type { FormEvent } from 'react';

interface CheckoutFormProps {
  name: string;
  onNameChange: (name: string) => void;
  nameError: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}

export function CheckoutForm({
  name,
  onNameChange,
  nameError,
  onSubmit,
  submitting,
}: CheckoutFormProps) {
  return (
    <section className="checkout-panel" aria-labelledby="details-heading">
      <div className="checkout-panel-heading">
        <div className="checkout-icon"><Fingerprint size={19} aria-hidden="true" /></div>
        <div>
          <p className="mini-eyebrow">ALMOST THERE</p>
          <h2 id="details-heading">Your details</h2>
        </div>
        <span className="required-hint">* Required</span>
      </div>
      <form onSubmit={onSubmit} noValidate aria-label="Checkout details">
        <div className="form-field">
          <label htmlFor="customer-name">Full name <span aria-hidden="true">*</span></label>
          <input
            id="customer-name"
            name="customerName"
            type="text"
            placeholder="e.g. Alex Morgan"
            autoComplete="name"
            value={name}
            maxLength={100}
            aria-required="true"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'customer-name-error' : undefined}
            onChange={(event) => onNameChange(event.target.value)}
          />
          {nameError && <p id="customer-name-error" role="alert" className="field-error">{nameError}</p>}
        </div>
        <div className="demo-disclaimer">
          <ShieldCheck size={17} aria-hidden="true" />
          <p>This is a demo checkout. No payments or personal data are transmitted.</p>
        </div>
        <button className="place-order-button" type="submit" disabled={submitting}>
          <span>{submitting ? 'Order placed' : 'Place order'}</span>
          <span className="place-order-arrow"><ArrowRight size={19} aria-hidden="true" /></span>
        </button>
        <p className="under-button-note"><LockKeyhole size={13} aria-hidden="true" /> No payment required · Instant confirmation</p>
      </form>
    </section>
  );
}
