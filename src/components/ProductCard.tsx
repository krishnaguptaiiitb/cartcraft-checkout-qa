import { ArrowUpRight, Minus, Plus, Trash2 } from 'lucide-react';
import type { Product } from '../data/products';
import { formatMoney, MAX_QUANTITY } from '../lib/pricing';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onChangeQuantity: (nextQuantity: number | ((currentQuantity: number) => number)) => void;
  disabled?: boolean;
}

export function ProductCard({
  product,
  quantity,
  onChangeQuantity,
  disabled = false,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className={`product-visual product-visual--${product.accent}`}>
        <span className="product-tag">{product.badge}</span>
        <img src={product.image} alt={product.imageAlt} className="product-image" />
        <span className="product-visual-index">{product.category}</span>
      </div>
      <div className="product-details">
        <div className="product-details-top">
          <div>
            <p className="product-eyebrow">{product.category}</p>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
          </div>
          <ArrowUpRight className="subtle-arrow" size={19} aria-hidden="true" />
        </div>
        <p className="product-subline">{product.detail}</p>
        <div className="product-bottom">
          <span className="product-price">{formatMoney(product.pricePaise)}</span>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-button"
              onClick={() => onChangeQuantity(1)}
              disabled={disabled}
            >
              <Plus size={16} aria-hidden="true" /> Add to cart
            </button>
          ) : (
            <div className="quantity-group">
              <button
                type="button"
                className="quantity-button"
                aria-label={`Decrease ${product.name} quantity`}
                onClick={() => onChangeQuantity((current) => current - 1)}
                disabled={disabled}
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <output className="quantity-value" aria-label={`${product.name} quantity`}>
                {quantity}
              </output>
              <button
                type="button"
                className="quantity-button"
                aria-label={`Increase ${product.name} quantity`}
                onClick={() => onChangeQuantity((current) => current + 1)}
                disabled={disabled || quantity >= MAX_QUANTITY}
              >
                <Plus size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="remove-button"
                aria-label={`Remove ${product.name} from cart`}
                title={`Remove ${product.name}`}
                onClick={() => onChangeQuantity(0)}
                disabled={disabled}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
