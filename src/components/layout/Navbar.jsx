/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RiSearchLine, 
  RiShoppingCartLine, 
  RiHeartLine, 
  RiUserLine, 
  RiMenu3Line, 
  RiCloseLine, 
  RiMoonLine, 
  RiSunLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { categories } from '../../data/products';

const Navbar = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Sales', path: '/shop?filter=sale' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white dark:bg-gray-900 py-5'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
            LUMINA
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                className="flex items-center gap-1 font-medium hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
              >
                Categories <RiArrowDownSLine className={`transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCategoryMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setIsCategoryMenuOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden"
                  >
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/shop?category=${cat.name}`}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 lg:gap-5">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
            </button>

            {/* Search */}
            <Link 
              to="/shop" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl dark:text-gray-200"
            >
              <RiSearchLine />
            </Link>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl dark:text-gray-200"
            >
              <RiHeartLine />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl dark:text-gray-200"
            >
              <RiShoppingCartLine />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative group">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl dark:text-gray-200"
              >
                <RiUserLine />
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b dark:border-gray-700">
                          <p className="text-xs text-gray-500">Signed in as</p>
                          <p className="font-semibold truncate dark:text-gray-200">{user.name}</p>
                        </div>
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Profile</Link>
                        <Link to="/orders" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Orders</Link>
                        <button 
                          onClick={logout}
                          className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 dark:hover:bg-rose-900/20"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Login</Link>
                        <Link to="/register" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 border-t dark:border-gray-700">Register</Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-2xl dark:text-gray-200"
            >
              {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className="text-lg font-medium dark:text-gray-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t dark:border-gray-800 pt-4">
                  <p className="text-xs uppercase text-gray-400 mb-2 font-bold tracking-widest">Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/shop?category=${cat.name}`}
                        className="py-2 dark:text-gray-400"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to prevent content jump */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Navbar;
