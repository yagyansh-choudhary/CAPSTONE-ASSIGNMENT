/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RiHeartLine, RiShoppingBagLine } from 'react-icons/ri';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <RiHeartLine size={64} />
        </div>
        <h1 className="text-3xl font-black dark:text-white mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-10 max-w-md">Keep track of items you love! Once you add something to your wishlist, it will appear here.</p>
        <Link 
          to="/shop" 
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black dark:text-white">My Wishlist <span className="text-sm font-normal text-gray-500">({wishlistItems.length} items)</span></h1>
        <Link to="/shop" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
