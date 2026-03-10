function QuantitySelector({ value, onDecrease, onIncrease, min = 1, max = 99 }) {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={onDecrease} disabled={value <= min}>
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={onIncrease} disabled={value >= max}>
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
