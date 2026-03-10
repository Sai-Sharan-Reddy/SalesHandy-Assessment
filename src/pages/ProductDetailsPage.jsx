import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { formatCurrency } from '../utils/currency';

function ProductDetailsPage() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container empty-state page-content">
        <h1>Product not found</h1>
        <p>The item you requested could not be found.</p>
        <Link to="/" className="button button-primary">Back to shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 3);

  return (
    <div className="container page-content">
      <div className="breadcrumbs">
        <Link to="/">Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      <section className="product-details-layout">
        <div className="details-image-card">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-content-card">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="details-meta">
            <span>⭐ {product.rating}</span>
            <span>{product.reviews} verified reviews</span>
            <span>{product.stock} left in stock</span>
          </div>
          <strong className="details-price">{formatCurrency(product.price)}</strong>
          <p className="details-description">{product.description}</p>

          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="details-actions">
            <QuantitySelector
              value={quantity}
              onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrease={() => setQuantity((current) => Math.min(product.stock, current + 1))}
              max={product.stock}
            />
            <button className="button button-primary" onClick={() => addToCart(product, quantity)}>
              Add {quantity} to cart
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>You may also like</h2>
        </div>
        <div className="product-grid compact-grid">
          {relatedProducts.map((item) => (
            <article key={item.id} className="product-card compact-card">
              <Link to={`/product/${item.id}`} className="product-media compact-media">
                <img src={item.image} alt={item.name} loading="lazy" />
              </Link>
              <div className="product-body">
                <p className="product-category">{item.category}</p>
                <Link to={`/product/${item.id}`} className="product-name">
                  {item.name}
                </Link>
                <div className="product-footer">
                  <strong>{formatCurrency(item.price)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsPage;
