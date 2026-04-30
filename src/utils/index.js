/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// formatCurrency.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// calculateDiscount.js
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// filterProducts.js
export const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.discountedPrice >= filters.minPrice && p.discountedPrice <= filters.maxPrice);
  }

  if (filters.rating) {
    filtered = filtered.filter(p => p.rating >= filters.rating);
  }

  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(p => filters.brand.includes(p.brand));
  }

  if (filters.inStock) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  if (filters.filter) {
    if (filters.filter === 'new') {
      filtered = filtered.filter(p => p.isNew);
    } else if (filters.filter === 'sale') {
      filtered = filtered.filter(p => p.originalPrice > p.discountedPrice);
    } else if (filters.filter === 'best') {
      filtered = filtered.filter(p => p.isBestSeller);
    }
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.brand.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming higher ID means newer or we could add a date field
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }
  }

  return filtered;
};
