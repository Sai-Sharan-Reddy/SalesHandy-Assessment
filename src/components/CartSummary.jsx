import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function CartSummary() {
  const { subtotal, shipping, tax, total, items } = useCart();

  return (
    <aside className="summary-card">
      <h2>Order summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
      </div>
      <div className="summary-row">
        <span>Estimated tax</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <div className="summary-row total-row">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <p className="summary-note">Free standard shipping is automatically applied on orders over $150.</p>
      <Link to={items.length ? '/checkout' : '/'} className="button button-primary button-block">
        {items.length ? 'Proceed to checkout' : 'Continue shopping'}
      </Link>
    </aside>
  );
}

export default CartSummary;
