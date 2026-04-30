/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { RiUserLine, RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', color: 'bg-gray-200', width: '0%', textColor: 'text-gray-400' };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: '33%', textColor: 'text-rose-500' };
    if (pwd.length < 10) return { label: 'Medium', color: 'bg-amber-500', width: '66%', textColor: 'text-amber-500' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%', textColor: 'text-green-500' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return showToast('Passwords do not match', 'error');
    }
    if (!formData.agreeToTerms) {
      return showToast('Please agree to terms and conditions', 'warning');
    }

    try {
      await register({
        name: formData.name,
        email: formData.email
      });
      showToast('Account created! Welcome to Lumina.', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 shadow-xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500">Join our community of elite shoppers</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Full Name</label>
              <div className="relative">
                <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Email Address</label>
              <div className="relative">
                <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Password</label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="pt-2">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strength</span>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${strength.textColor}`}>{strength.label}</span>
                 </div>
                 <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
                 </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Confirm Password</label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                    className="sr-only" 
                  />
                  <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${formData.agreeToTerms ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                    {formData.agreeToTerms && <RiCheckboxCircleLine size={18} />}
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="#" className="font-bold text-indigo-600 hover:underline">Terms & Conditions</a> and <a href="#" className="font-bold text-indigo-600 hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
