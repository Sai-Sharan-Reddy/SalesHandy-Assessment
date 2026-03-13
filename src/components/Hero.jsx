function Hero() {
  return (
    <section className="hero-card">
      <div>
        <p className="eyebrow">Shopping experience like never before.</p>
        <h1>Discover products that feel thoughtfully chosen.</h1>
        <p className="hero-copy">
          Browse for products and add them to your cart to buy with secure payment methods, now or later.
        </p>
      </div>
      <div className="hero-metrics">
        <div>
          <strong>12</strong>
          <span>Curated products</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Categories</span>
        </div>
        <div>
          <strong>Free</strong>
          <span>Shipping over $150</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
