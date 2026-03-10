import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  if (!items.length) {
    return (
      <div className="container page-content">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container page-content cart-layout">
      <section className="cart-items-card">
        <div className="section-heading">
          <h1>Your cart</h1>
          <p>Review items, adjust quantities, and continue to checkout.</p>
        </div>

        <div className="cart-list">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="product-category">{item.category}</p>
                <h2>{item.name}</h2>
                <strong>{formatCurrency(item.price)}</strong>
              </div>

              <QuantitySelector
                value={item.quantity}
                onDecrease={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                onIncrease={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                max={item.stock}
                stock={item.stock}
                disabled={item.stock === 0}
              />

              <div className="cart-item-actions">
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
                <button className="button button-text" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CartSummary />
    </div>
  );
}

export default CartPage;
