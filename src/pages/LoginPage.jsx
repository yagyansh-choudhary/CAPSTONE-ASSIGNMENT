/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiInformationLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast('Welcome back!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDemoLogin = (type) => {
    if (type === 'user') {
      setEmail('user@demo.com');
      setPassword('Demo@123');
    } else {
      setEmail('admin@demo.com');
      setPassword('Admin@123');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 shadow-xl p-8 lg:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Email Address</label>
              <div className="relative">
                <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Remember me for 30 days</span>
            </label>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-6">Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create an account</Link></p>
            
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border dark:border-gray-700">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-4 justify-center">
                <RiInformationLine /> Demo Credentials
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleDemoLogin('user')}
                  className="text-xs font-bold bg-white dark:bg-gray-800 dark:text-white py-2 rounded-lg border dark:border-gray-700 hover:bg-indigo-50 transition-colors"
                >
                  Standard User
                </button>
                <button 
                   onClick={() => handleDemoLogin('admin')}
                  className="text-xs font-bold bg-white dark:bg-gray-800 dark:text-white py-2 rounded-lg border dark:border-gray-700 hover:bg-indigo-50 transition-colors"
                >
                  Admin User
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
