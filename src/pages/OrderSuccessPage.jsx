import { Link, useLocation } from 'react-router-dom';

function OrderSuccessPage() {
  const location = useLocation();
  const customerName = location.state?.customerName || 'Customer';

  return (
    <div className="container page-content">
      <section className="success-card">
        <div className="success-icon">✓</div>
        <h1>Thanks, {customerName}!</h1>
        <p>Your order has been placed successfully.</p>
        <div className="success-actions">
          <Link to="/" className="button button-primary">Continue shopping</Link>
          <Link to="/cart" className="button button-secondary">View cart</Link>
        </div>
      </section>
    </div>
  );
}

export default OrderSuccessPage;
