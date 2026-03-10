function QuantitySelector({ value, onDecrease, onIncrease, min = 1, max = 99, disabled = false, stock = null }) {
  // If stock is explicitly 0, disable the entire selector
  const isOutOfStock = stock === 0 || disabled;

  return (
    <div className={`quantity-selector ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <button 
        type="button" 
        onClick={onDecrease} 
        disabled={isOutOfStock || value <= min}
        title={isOutOfStock ? 'Item out of stock' : 'Decrease quantity'}
      >
        −
      </button>
      <span>{value}</span>
      <button 
        type="button" 
        onClick={onIncrease} 
        disabled={isOutOfStock || value >= max || (stock !== null && value >= stock)}
        title={isOutOfStock ? 'Item out of stock' : stock !== null && value >= stock ? 'Max available quantity' : 'Increase quantity'}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
