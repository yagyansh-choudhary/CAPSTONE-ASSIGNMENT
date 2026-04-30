/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RiCloseLine, RiDeleteBinLine, RiShoppingBagLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                Shopping Cart <span className="text-sm font-normal text-gray-500">({cartCount} items)</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors dark:text-gray-400"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <RiShoppingBagLine size={48} />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">Your cart is empty</h3>
                  <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                  <Link 
                    to="/shop" 
                    onClick={onClose}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 dark:shadow-none"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between gap-2">
                          <h4 className="font-bold dark:text-white line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                        </p>
                        <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                          {formatCurrency(item.discountedPrice)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border dark:border-gray-700 rounded-lg overflow-hidden h-8">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="px-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-medium dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="px-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
                  <span className="text-xl font-bold dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/cart" 
                    onClick={onClose}
                    className="flex items-center justify-center py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    View Cart
                  </Link>
                  <button 
                    onClick={handleCheckout}
                    className="flex items-center justify-center py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
                  >
                    Checkout
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
