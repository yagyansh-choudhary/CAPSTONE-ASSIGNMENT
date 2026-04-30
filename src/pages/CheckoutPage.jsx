/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RiTruckLine, 
  RiBankCardLine, 
  RiShieldCheckLine, 
  RiArrowRightLine, 
  RiArrowLeftLine,
  RiLock2Fill
} from 'react-icons/ri';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import OrderSummary from '../components/checkout/OrderSummary';
import { formatCurrency } from '../utils';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { cartItems, finalTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: user?.address || '',
    city: 'New York',
    zipCode: '10001',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '**** **** **** 1234',
    cardHolder: user?.name || '',
    expiry: '12/26',
    cvv: '***'
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePlaceOrder = () => {
    showToast('Processing your order...', 'info');
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      const finalOrder = {
        id: orderId,
        items: cartItems,
        total: finalTotal,
        date: new Date().toLocaleDateString(),
        shipping: shippingData
      };
      clearCart();
      navigate('/order-confirmation', { state: { order: finalOrder } });
      showToast('Order placed successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black dark:text-white mb-2 text-center lg:text-left">Checkout</h1>
        <CheckoutSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2">
                      <RiTruckLine className="text-indigo-600" /> Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">First Name</label>
                        <input 
                          type="text" 
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Last Name</label>
                        <input 
                          type="text" 
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Street Address</label>
                        <input 
                          type="text" 
                          value={shippingData.address}
                          onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">City</label>
                        <input 
                          type="text" 
                          value={shippingData.city}
                          onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">ZIP Code</label>
                        <input 
                          type="text" 
                          value={shippingData.zipCode}
                          onChange={(e) => setShippingData({...shippingData, zipCode: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={nextStep}
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    Continue to Payment <RiArrowRightLine />
                  </button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-bold dark:text-white mb-8 flex items-center gap-2">
                      <RiBankCardLine className="text-indigo-600" /> Payment Method
                    </h3>
                    
                    {/* Live Card Preview */}
                    <div className="mb-10 perspective-1000">
                      <div className="w-full h-56 bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-10 bg-amber-400/80 rounded-md"></div>
                          <span className="font-italic text-2xl font-bold opacity-80 italic">VISA</span>
                        </div>
                        <div className="text-2xl tracking-[0.2em] font-mono">{paymentData.cardNumber}</div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] uppercase opacity-60 mb-1">Card Holder</p>
                            <p className="font-bold tracking-widest uppercase">{paymentData.cardHolder || 'Your Name'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase opacity-60 mb-1">Expires</p>
                            <p className="font-bold">{paymentData.expiry}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Card Number</label>
                        <input 
                          type="text" 
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-mono" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">CVV</label>
                        <input 
                          type="text" 
                          placeholder="***"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={prevStep}
                      className="px-8 py-5 border-2 border-gray-200 dark:border-gray-700 text-gray-500 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <RiArrowLeftLine /> Back
                    </button>
                    <button 
                      onClick={nextStep}
                      className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      Review Order <RiArrowRightLine />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 111 /* Reserved forReview logic */}
              {currentStep === 3 && (
                 <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border dark:border-gray-700 shadow-sm space-y-8">
                    <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                      <RiShieldCheckLine className="text-indigo-600" /> Review Your Order
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Shipping To</h4>
                        <div className="dark:text-white">
                          <p className="font-bold">{shippingData.firstName} {shippingData.lastName}</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{shippingData.address}</p>
                          <p className="text-gray-600 dark:text-gray-400">{shippingData.city}, {shippingData.zipCode}</p>
                          <p className="text-gray-600 dark:text-gray-400">{shippingData.country}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Payment Method</h4>
                        <div className="dark:text-white">
                          <p className="font-bold">Visa Card</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1 font-mono">{paymentData.cardNumber}</p>
                          <p className="text-gray-600 dark:text-gray-400">Expires: {paymentData.expiry}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t dark:border-gray-700 pt-8">
                      <h4 className="text-xs font-black uppercase text-gray-400 mb-6 tracking-widest">Cart Items ({cartItems.length})</h4>
                      <div className="space-y-4">
                        {cartItems.map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gray-50 p-1">
                                <img src={item.images[0]} alt="" className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <p className="font-bold dark:text-white text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-bold dark:text-white">{formatCurrency(item.discountedPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl flex gap-4 border border-indigo-100 dark:border-indigo-800">
                    <RiLock2Fill className="text-2xl text-indigo-600" />
                    <p className="text-sm text-indigo-800 dark:text-indigo-300">
                      You are about to place a secure order. Your payment details are encrypted and will never be stored on our servers.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={prevStep}
                      className="px-8 py-5 border-2 border-gray-200 dark:border-gray-700 text-gray-500 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <RiArrowLeftLine /> Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder}
                      className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      Place Order {formatCurrency(finalTotal)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <OrderSummary hideCoupon={currentStep === 3} />
            {currentStep < 3 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border dark:border-gray-700 border-dashed">
                <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest text-center">Step {currentStep} of 3</h4>
                <div className="flex justify-between items-center px-4">
                   <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                   <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                   <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                   <div className={`flex-1 h-0.5 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                   <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
