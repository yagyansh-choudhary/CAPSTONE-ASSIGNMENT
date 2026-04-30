/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils';
import { RiCoupon2Line, RiCloseLine } from 'react-icons/ri';
import { useToast } from '../../context/ToastContext';

const OrderSummary = ({ hideCoupon = false }) => {
  const { subtotal, discount, shipping, tax, finalTotal, couponCode, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const { showToast } = useToast();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (result.success) {
      showToast(result.message, 'success');
      setCouponInput('');
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-bold dark:text-white mb-6">Order Summary</h3>
      
      {!hideCoupon && (
        <div className="mb-6">
          {couponCode ? (
            <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <RiCoupon2Line />
                <span className="font-bold tracking-widest">{couponCode}</span>
              </div>
              <button 
                onClick={removeCoupon}
                className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <RiCloseLine />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input 
                type="text" 
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter SAVE10"
                className="flex-1 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold hover:opacity-80 transition-opacity"
              >
                Apply
              </button>
            </form>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium dark:text-white">{formatCurrency(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-rose-500">
            <span>Discount ({couponCode})</span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span className="font-medium dark:text-white">
            {shipping === 0 ? <span className="text-green-500 font-bold uppercase text-[10px]">Free</span> : formatCurrency(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Tax (8%)</span>
          <span className="font-medium dark:text-white">{formatCurrency(tax)}</span>
        </div>
        
        <div className="pt-4 border-t dark:border-gray-700 flex justify-between items-center mt-2">
          <span className="text-lg font-bold dark:text-white">Total</span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(finalTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
