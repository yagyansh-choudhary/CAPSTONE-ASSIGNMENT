/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RiSearchLine, RiTruckLine, RiCheckboxCircleLine, RiMapPinUserLine, RiTimeLine } from 'react-icons/ri';
import Breadcrumb from '../components/ui/Breadcrumb';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrderStatus({
        id: orderId || 'ORD-98231',
        status: 'In Transit',
        progress: 65,
        estimatedDelivery: 'May 5, 2024',
        steps: [
          { label: 'Order Placed', date: 'April 28, 2024', done: true },
          { label: 'Processing', date: 'April 29, 2024', done: true },
          { label: 'Shipped', date: 'April 30, 2024', done: true },
          { label: 'In Transit', date: 'Current Venue', done: false, active: true },
          { label: 'Delivered', date: 'Estimated May 5', done: false },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Track Order' }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6">Track Your Order</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Enter your order ID below to see the current status of your delivery.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl border dark:border-gray-700 shadow-xl mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input 
                type="text" 
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-12345)"
                className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-lg font-bold"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </div>

        {orderStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 shadow-xl overflow-hidden"
          >
            <div className="bg-indigo-600 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-1">Order ID: {orderStatus.id}</p>
                  <h2 className="text-3xl md:text-5xl font-black">Status: {orderStatus.status}</h2>
                </div>
                <div className="text-right">
                  <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-1">Estimated Delivery</p>
                  <p className="text-2xl font-black">{orderStatus.estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="mt-12 h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${orderStatus.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-white"
                ></motion.div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="space-y-10">
                {orderStatus.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {/* Connector Line */}
                    {i < orderStatus.steps.length - 1 && (
                      <div className={`absolute left-6 top-10 w-0.5 h-16 ${step.done ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${step.done ? 'bg-indigo-600 text-white' : step.active ? 'bg-indigo-100 text-indigo-600 border border-indigo-600 ring-4 ring-indigo-50' : 'bg-gray-100 text-gray-400 dark:bg-gray-900 border dark:border-gray-700'}`}>
                      {step.done ? <RiCheckboxCircleLine size={24} /> : <RiTruckLine size={24} />}
                    </div>
                    
                    <div>
                      <h4 className={`text-xl font-bold ${step.active ? 'text-indigo-600' : 'dark:text-white'}`}>{step.label}</h4>
                      <p className="text-gray-500 text-sm">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <RiMapPinUserLine className="text-2xl text-indigo-600 mt-1" />
                  <div>
                    <h5 className="font-bold dark:text-white mb-2">Detailed Tracking</h5>
                    <p className="text-gray-500 text-sm">Your package is currently leaving our distribution center in Jersey City, NJ.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RiTimeLine className="text-2xl text-indigo-600 mt-1" />
                  <div>
                    <h5 className="font-bold dark:text-white mb-2">Need Assistance?</h5>
                    <p className="text-gray-500 text-sm">Our support team is available 24/7. Use the help widget or call us directly.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
