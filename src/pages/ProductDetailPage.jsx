/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiShoppingCartLine, 
  RiTruckLine, 
  RiShieldCheckLine, 
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiStarFill
} from 'react-icons/ri';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils';
import { RatingStars, Badge } from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';

import Breadcrumb from '../components/ui/Breadcrumb';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useMemo(() => products.find(p => p.id === id), [id]);
  
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      setSelectedImg(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold dark:text-white mb-6">Product not found</h2>
        <Link to="/shop" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">Back to Shop</Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const toggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist', 'success');
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: product.category, path: `/shop?category=${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            layoutId={`img-${product.id}`}
            className="aspect-square rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 p-8 flex items-center justify-center relative group"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImg}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                src={product.images[selectedImg]} 
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
              />
            </AnimatePresence>
            
            {/* Quickview indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${selectedImg === i ? 'w-6 bg-indigo-600' : 'w-1.5 bg-gray-300'}`} 
                />
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white dark:bg-gray-800 ${selectedImg === i ? 'border-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-900/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge type="info" className="!bg-indigo-50 !text-indigo-600 dark:!bg-indigo-900/20 dark:!text-indigo-400">
                {product.brand}
              </Badge>
              {product.isOnSale && <Badge type="sale">Save {product.discountPercent}%</Badge>}
            </div>
            <h1 className="text-3xl lg:text-5xl font-black dark:text-white mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <RatingStars rating={product.rating} count={product.reviewCount} size="lg" />
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
              <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-500' : 'text-rose-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
              {formatCurrency(product.discountedPrice)}
            </span>
            {product.isOnSale && (
              <span className="text-xl text-gray-400 line-through font-bold">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-8 mb-10">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Select Color</h4>
                <div className="flex items-center gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedColor === color ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' : 'border-gray-100 dark:border-gray-700 dark:text-gray-300'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Select Size</h4>
                <div className="flex items-center gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center ${selectedSize === size ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' : 'border-gray-100 dark:border-gray-700 dark:text-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-auto">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Quantity</h4>
                <div className="flex items-center border-2 dark:border-gray-700 rounded-xl overflow-hidden h-14 w-full sm:w-36">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex-1 h-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl font-bold dark:text-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-black dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="flex-1 h-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl font-bold dark:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 flex gap-3 w-full">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-bold px-8 transition-all shadow-xl ${product.stock === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none'}`}
                >
                  <RiShoppingCartLine size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={toggleWishlist}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${isFavorite ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-900/20 dark:border-rose-800' : 'border-gray-100 dark:border-gray-700 text-gray-400'}`}
                >
                  {isFavorite ? <RiHeartFill size={24} /> : <RiHeartLine size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 border-t dark:border-gray-800 pt-8">
            <div className="flex items-center gap-3">
              <RiTruckLine className="text-3xl text-indigo-600" />
              <div className="text-xs">
                <p className="font-bold dark:text-white">Free Fast Shipping</p>
                <p className="text-gray-500">Order over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RiShieldCheckLine className="text-3xl text-indigo-600" />
              <div className="text-xs">
                <p className="font-bold dark:text-white">Secure Checkout</p>
                <p className="text-gray-500">Encrypted payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex border-b dark:border-gray-800 overflow-x-auto gap-10">
          {['description', 'features', 'tags'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />}
            </button>
          ))}
        </div>
        <div className="py-10">
          {activeTab === 'description' && (
            <div className="max-w-4xl text-gray-600 dark:text-gray-400 leading-loose text-lg">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
          )}
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl dark:text-white font-medium">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  {f}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'tags' && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full text-sm font-bold lowercase">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-black dark:text-white mb-10">Similar Items You'll Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
