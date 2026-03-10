import { useMemo, useState } from 'react';
import Hero from '../components/Hero';
import FiltersBar from '../components/FiltersBar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="container page-content">
      <Hero />
      <FiltersBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultsCount={filteredProducts.length}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default HomePage;
