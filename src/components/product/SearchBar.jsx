/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

export const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full">
      <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input 
        type="text" 
        value={value}
        onChange={handleChange}
        placeholder="Search for products, brands..."
        className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
      />
      {value && (
        <button 
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <RiCloseLine size={20} />
        </button>
      )}
    </div>
  );
};

export const PriceRangeSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm font-medium dark:text-gray-300">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
        {/* Simplified for demo - usually requires a dual-handle component library */}
        {/* Using a range input for now, but in reality we'd use two handles */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value[1]} 
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-auto accent-indigo-600"
        />
      </div>
    </div>
  );
};
