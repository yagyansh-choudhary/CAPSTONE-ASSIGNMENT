/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { RiGridFill, RiListUnordered, RiFilter3Line, RiCloseLine } from 'react-icons/ri';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';
import { filterProducts } from '../utils';
import { SearchBar, PriceRangeSlider } from '../components/product/SearchBar';
import { CategoryFilter, SortDropdown } from '../components/product/Filters';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter States
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState(searchParams.get('filter') || '');
  const [sortBy, setSortBy] = useState('');
  const [inStock, setInStock] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = {};
    if (category !== 'All') params.category = category;
    if (search) params.q = search;
    if (filter) params.filter = filter;
    setSearchParams(params);
  }, [category, search, filter]);

  const filters = {
    category,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    search,
    filter,
    sortBy,
    inStock
  };

  const filteredProducts = useMemo(() => filterProducts(products, filters), [filters]);

  const clearFilters = () => {
    setCategory('All');
    setPriceRange([0, 1500]);
    setSearch('');
    setFilter('');
    setSortBy('');
    setInStock(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 font-bold dark:text-white"
          >
            <RiFilter3Line /> Filters
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
            >
              <RiGridFill />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
            >
              <RiListUnordered />
            </button>
          </div>
        </div>

        {/* Sidebar Sidebar */}
        <aside className={`fixed inset-0 z-50 lg:relative lg:block lg:z-auto bg-black/50 lg:bg-transparent transition-opacity overflow-y-auto ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
          <div className={`w-80 lg:w-64 bg-white dark:bg-gray-900 h-full lg:h-auto min-h-screen lg:min-h-0 ml-auto lg:ml-0 p-6 lg:p-0 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h3 className="text-xl font-bold dark:text-white">Filters</h3>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 dark:text-white"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            <div className="space-y-10 sticky top-32">
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Search</h4>
                <SearchBar onSearch={setSearch} initialValue={search} />
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Categories</h4>
                <CategoryFilter selected={category} onSelect={setCategory} />
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Price Range</h4>
                <PriceRangeSlider min={0} max={1500} value={priceRange} onChange={setPriceRange} />
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={inStock}
                      onChange={() => setInStock(!inStock)}
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors ${inStock ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${inStock ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                  <span className="font-medium dark:text-gray-300 select-none">In Stock Only</span>
                </label>
              </div>

              <button 
                onClick={clearFilters}
                className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 font-bold rounded-xl hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Products Area */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="hidden lg:flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-medium">
                  Showing <span className="text-gray-900 dark:text-white font-bold">{filteredProducts.length}</span> results
                </span>
                <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <RiGridFill size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <RiListUnordered size={20} />
                  </button>
                </div>
              </div>

              <SortDropdown selected={sortBy} onSelect={setSortBy} />
            </div>

            {filter && (
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  {filter} Arrivals
                  <button onClick={() => setFilter('')}><RiCloseLine size={14} /></button>
                </div>
              </div>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-20 text-center bg-gray-50 dark:bg-gray-800 rounded-3xl border dark:border-gray-700 border-dashed">
              <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <RiSearchLine size={48} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search terms.</p>
              <button 
                onClick={clearFilters}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
