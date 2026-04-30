/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingBagLine, RiDeleteBinLine, RiArrowRightLine, RiInformationLine } from 'react-icons/ri';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';
import OrderSummary from '../components/checkout/OrderSummary';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <RiShoppingBagLine size={64} />
        </div>
        <h1 className="text-3xl font-black dark:text-white mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-10 max-w-md">Looks like you haven't added anything to your cart yet. Go ahead and explore our collections!</p>
        <Link 
          to="/shop" 
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black dark:text-white">Your Shopping Cart <span className="text-sm font-normal text-gray-500">({cartCount} items)</span></h1>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to clear your cart?')) clearCart();
          }}
          className="flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors"
        >
          <RiDeleteBinLine /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 hover:shadow-lg transition-all group">
              <Link to={`/product/${item.id}`} className="w-full sm:w-40 h-40 rounded-xl bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center p-4">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-110" />
              </Link>
              
              <div className="flex-1 flex flex-col sm:flex-row gap-6 justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 tracking-widest uppercase">{item.brand}</p>
                      <Link to={`/product/${item.id}`} className="text-xl font-bold dark:text-white hover:text-indigo-600 transition-colors">
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm mt-3">
                    {item.selectedColor && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium dark:text-gray-300">
                        Color: {item.selectedColor}
                      </div>
                    )}
                    {item.selectedSize && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium dark:text-gray-300">
                        Size: {item.selectedSize}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-medium">
                      In Stock
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex items-center border-2 dark:border-gray-700 rounded-xl overflow-hidden h-10 w-32 bg-white dark:bg-gray-900">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-black dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                      className="text-gray-400 hover:text-rose-500 transition-colors flex items-center gap-2 font-bold text-sm"
                    >
                      <RiDeleteBinLine size={18} /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between items-end sm:w-32">
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      {formatCurrency(item.discountedPrice * item.quantity)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatCurrency(item.discountedPrice)} / item
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl flex gap-4 border border-blue-100 dark:border-blue-800/50">
            <RiInformationLine className="text-2xl text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Orders over <span className="font-bold underline">$100.00</span> qualify for <span className="font-bold">FREE SHIPPING</span>. Add items worth more than {formatCurrency(Math.max(0, 100 - itemsSubtotal()))} to save on shipping costs.
            </p>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <OrderSummary />
          <Link 
            to="/checkout"
            className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none translate-y-0 active:scale-95"
          >
            Go to Checkout <RiArrowRightLine />
          </Link>
          <p className="text-center text-xs text-gray-500">
            Secure processing by Stripe/Stripe alternative. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );

  function itemsSubtotal() {
    return cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
  }
};

export default CartPage;
