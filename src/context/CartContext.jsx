/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useShared';

const CartContext = createContext();

const COUPONS = {
  'SAVE10': { type: 'percent', value: 10 },
  'SAVE20': { type: 'percent', value: 20 },
  'FREESHIP': { type: 'shipping', value: 0 },
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart_items', []);
  const [couponCode, setCouponCode] = useLocalStorage('applied_coupon', '');

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev];
        const newQty = newItems[existingItemIndex].quantity + quantity;
        // Clamp to stock
        newItems[existingItemIndex].quantity = Math.min(newQty, product.stock);
        return newItems;
      }

      return [...prev, { 
        ...product, 
        selectedColor, 
        selectedSize, 
        quantity: Math.min(quantity, product.stock) 
      }];
    });
  };

  const removeFromCart = (itemId, color, size) => {
    setCartItems(prev => prev.filter(
      item => !(item.id === itemId && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  const updateQuantity = (itemId, color, size, quantity) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId && item.selectedColor === color && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    const cleanCode = code.toUpperCase();
    if (COUPONS[cleanCode]) {
      setCouponCode(cleanCode);
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
    
    let discount = 0;
    let shipping = subtotal >= 100 || couponCode === 'FREESHIP' ? 0 : 9.99;
    
    if (couponCode && COUPONS[couponCode]) {
      const coupon = COUPONS[couponCode];
      if (coupon.type === 'percent') {
        discount = subtotal * (coupon.value / 100);
      }
    }

    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * 0.08;
    const finalTotal = discountedSubtotal + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      finalTotal,
      cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
    };
  }, [cartItems, couponCode]);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        couponCode, 
        ...totals, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        applyCoupon, 
        removeCoupon 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
