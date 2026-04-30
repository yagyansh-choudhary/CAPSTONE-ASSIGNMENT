/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RiHeartFill, RiHeartLine, RiShoppingCart2Line, RiEyeLine } from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils';
import { RatingStars, Badge } from '../ui/Badge';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorite = isInWishlist(product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist', 'success');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock > 0) {
      // Default to first color/size if they exist
      const color = product.colors && product.colors.length > 0 ? product.colors[0] : null;
      const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
      
      addToCart(product, color, size, 1);
      showToast('Added to cart!', 'success');
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div 
        layout
        className="flex flex-col sm:flex-row gap-6 p-4 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
      >
        <Link to={`/product/${product.id}`} className="block relative w-full sm:w-64 h-64 sm:h-auto overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 border dark:border-gray-700">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isOnSale && <Badge type="sale">Sale</Badge>}
            {product.isNewArrival && <Badge type="new">New</Badge>}
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">{product.brand}</p>
                <Link to={`/product/${product.id}`} className="text-xl font-bold dark:text-white hover:text-indigo-600 transition-colors">
                  {product.name}
                </Link>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black dark:text-white">{formatCurrency(product.discountedPrice)}</p>
                {product.isOnSale && (
                  <p className="text-sm text-gray-400 line-through">{formatCurrency(product.price)}</p>
                )}
              </div>
            </div>
            
            <RatingStars rating={product.rating} count={product.reviewCount} />
            
            <p className="text-gray-600 dark:text-gray-400 mt-4 line-clamp-2 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                product.stock === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none'
              }`}
            >
              <RiShoppingCart2Line size={20} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              onClick={handleToggleWishlist}
              className={`p-3 rounded-xl border-2 transition-all ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-900/20 dark:border-rose-800' 
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 text-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {isFavorite ? <RiHeartFill size={20} /> : <RiHeartLine size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      whileHover={{ y: -5 }}
      className="relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isOnSale && <Badge type="sale">Sale</Badge>}
        {product.isNewArrival && <Badge type="new">New</Badge>}
        {product.stock <= 5 && product.stock > 0 && <Badge type="warning">Low Stock</Badge>}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
          isFavorite 
            ? 'bg-rose-500 text-white' 
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:scale-110'
        }`}
      >
        {isFavorite ? <RiHeartFill /> : <RiHeartLine />}
      </button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <div className="p-3 bg-white text-gray-900 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
            <RiEyeLine size={20} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            {product.brand}
          </p>
          <Link to={`/product/${product.id}`} className="font-bold dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </Link>
        </div>

        <div className="mt-auto">
          <RatingStars rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-lg font-black dark:text-white">{formatCurrency(product.discountedPrice)}</span>
              {product.isOnSale && (
                <span className="text-[10px] text-gray-400 line-through">{formatCurrency(product.price)}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-3 rounded-xl transition-all ${
                product.stock === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none'
              }`}
            >
              <RiShoppingCart2Line size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
