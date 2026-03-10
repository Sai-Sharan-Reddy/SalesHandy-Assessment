import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

const initialForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'Credit Card',
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!items.length) {
    navigate('/');
    return null;
  }

  function validate() {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Valid email is required';
    if (!formData.address.trim()) nextErrors.address = 'Address is required';
    if (!formData.city.trim()) nextErrors.city = 'City is required';
    if (!formData.postalCode.trim()) nextErrors.postalCode = 'Postal code is required';
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    navigate('/success', {
      state: {
        customerName: formData.fullName,
      },
    });
    clearCart();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  return (
    <div className="container page-content checkout-layout">
      <section className="form-card">
        <div className="section-heading">
          <h1>Checkout</h1>
          <p>Complete the mock checkout flow by entering your shipping details.</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={formData.city} onChange={handleChange} />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="postalCode">Postal code</label>
              <input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              {errors.postalCode && <span className="field-error">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="paymentMethod">Payment method</label>
            <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>PayPal</option>
            </select>
          </div>

          <button type="submit" className="button button-primary">Place order</button>
        </form>
      </section>

      <CartSummary />
    </div>
  );
}

export default CheckoutPage;
