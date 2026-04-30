/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiSendPlaneLine } from 'react-icons/ri';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent! We will get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: RiMailLine, label: 'Email Us', value: 'hello@lumina.com', sub: 'We reply within 24 hours' },
    { icon: RiPhoneLine, label: 'Call Us', value: '+1 (555) 123-4567', sub: 'Mon-Fri, 9am-6pm EST' },
    { icon: RiMapPinLine, label: 'Visit Us', value: '79 Madison Ave, NY', sub: 'New York, 10016' },
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Have a question? We're here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl border dark:border-gray-700 shadow-sm flex items-start gap-6"
              >
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <info.icon size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">{info.label}</h4>
                  <p className="text-xl font-bold dark:text-white mb-1">{info.value}</p>
                  <p className="text-sm text-gray-500">{info.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl border dark:border-gray-700 shadow-xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help?"
                    className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Message</label>
                  <textarea 
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Your message here..."
                    className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
                  >
                    Send Message <RiSendPlaneLine />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
