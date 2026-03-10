import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <div>
            <strong>ShopSphere</strong>
            <span>Curated essentials for modern living</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </nav>

        <Link to="/cart" className="cart-link" aria-label="View cart">
          <span>Cart</span>
          <span className="cart-badge">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
