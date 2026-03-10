import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h2>No products matched your search.</h2>
        <p>Try a different keyword, category, or sort option.</p>
      </div>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
