/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { categories } from '../../data/products';

export const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div className="space-y-2">
      <button 
        onClick={() => onSelect('All')}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors truncate ${
          selected === 'All' 
            ? 'bg-indigo-600 text-white font-bold' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
        }`}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button 
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors truncate ${
          selected === cat.name 
            ? 'bg-indigo-600 text-white font-bold' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
        }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export const SortDropdown = ({ selected, onSelect }) => {
  const options = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Customer Rating', value: 'rating' },
  ];

  return (
    <div className="relative">
      <select 
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium dark:text-white cursor-pointer"
      >
        <option value="" disabled>Sort By</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};
