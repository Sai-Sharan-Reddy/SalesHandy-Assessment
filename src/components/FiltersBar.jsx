function FiltersBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
  resultsCount,
}) {
  return (
    <section className="filters-panel">
      <div className="search-box">
        <label htmlFor="search" className="sr-only">Search products</label>
        <input
          id="search"
          type="search"
          placeholder="Search products"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="filter-selects">
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="rating-desc">Rating: High to low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      <p className="results-label">Showing {resultsCount} products</p>
    </section>
  );
}

export default FiltersBar;
