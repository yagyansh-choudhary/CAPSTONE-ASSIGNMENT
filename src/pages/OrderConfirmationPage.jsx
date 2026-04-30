/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { RiCheckboxCircleFill, RiTruckLine, RiFileList3Line, RiHome4Line } from 'react-icons/ri';
import { formatCurrency } from '../utils';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-8"
      >
        <RiCheckboxCircleFill size={64} />
      </motion.div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black dark:text-white mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Thank you for your purchase. Your order <span className="font-bold text-indigo-600 dark:text-indigo-400">#{order.id}</span> is being processed.
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b dark:border-gray-700">
            <RiTruckLine className="text-2xl text-indigo-600" />
            <h3 className="text-xl font-bold dark:text-white">Delivery Details</h3>
          </div>
          <div className="space-y-4 dark:text-gray-300">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expected Delivery</p>
              <p className="font-bold text-lg">{deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping Address</p>
              <p>{order.shipping.firstName} {order.shipping.lastName}</p>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.zipCode}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b dark:border-gray-700">
            <RiFileList3Line className="text-2xl text-indigo-600" />
            <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>
          </div>
          <div className="space-y-4 mb-6">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="dark:text-gray-400">
                  {item.name} <span className="text-xs opacity-60">x{item.quantity}</span>
                </span>
                <span className="font-bold dark:text-white">{formatCurrency(item.discountedPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t dark:border-gray-700 flex justify-between items-center">
            <span className="font-black text-xl dark:text-white">Total Paid</span>
            <span className="font-black text-2xl text-indigo-600 dark:text-indigo-400">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-md">
        <Link 
          to="/shop" 
          className="flex-1 py-4 px-8 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
        >
          Continue Shopping
        </Link>
        <Link 
          to="/" 
          className="flex-1 py-4 px-8 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
        >
          <RiHome4Line size={20} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
