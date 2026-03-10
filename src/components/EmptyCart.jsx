import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <section className="empty-state cart-empty">
      <h1>Your cart is empty</h1>
      <p>Add a few products to see them here and continue to checkout.</p>
      <Link to="/" className="button button-primary">Browse products</Link>
    </section>
  );
}

export default EmptyCart;
