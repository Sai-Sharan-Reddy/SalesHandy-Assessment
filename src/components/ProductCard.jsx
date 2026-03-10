import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-badge">{product.badge}</span>
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-meta">
          <span>⭐ {product.rating}</span>
          <span>{product.reviews} reviews</span>
        </div>
        <div className="product-footer">
          <strong>{formatCurrency(product.price)}</strong>
          <button onClick={() => addToCart(product, 1)} className="button button-primary">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
