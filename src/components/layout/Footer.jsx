/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RiFacebookFill, RiTwitterFill, RiInstagramLine, RiLinkedinFill, RiMailLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 pt-16 pb-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
              LUMINA
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Elevating your lifestyle with curated collections and premium products. Quality you can trust, style you'll love.
            </p>
            <div className="flex items-center gap-4">
              {[RiFacebookFill, RiTwitterFill, RiInstagramLine, RiLinkedinFill].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 dark:text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 dark:text-white">Customer Support</h4>
            <ul className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <li><Link to="/profile" className="hover:text-indigo-600 transition-colors">Account</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-indigo-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-indigo-600 transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/track-order" className="hover:text-indigo-600 transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 dark:text-white">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Subscribe to get special offers and new arrivals.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 h-9 w-9 bg-indigo-600 text-white rounded flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md"
              >
                <RiMailLine />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 Lumina Shop. Created for excellence.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-800 dark:hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-800 dark:hover:text-gray-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-800 dark:hover:text-gray-300">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
