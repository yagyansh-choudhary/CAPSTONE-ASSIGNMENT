/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RiDoubleQuotesL, RiTeamLine, RiRocketLine, RiHeartLine } from 'react-icons/ri';
import Breadcrumb from '../components/ui/Breadcrumb';

const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '50k+', icon: RiHeartLine },
    { label: 'Products Sold', value: '120k+', icon: RiRocketLine },
    { label: 'Countries Reached', value: '30+', icon: RiTeamLine },
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6">Our Story</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            Founded in 2024, LUMINA was born out of a simple idea: to provide high-quality, 
            stylish, and sustainable products to the modern individual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl border dark:border-gray-700 text-center shadow-sm"
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} />
              </div>
              <h3 className="text-3xl font-black dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          <section className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                We believe that excellence shouldn't be a luxury. Our mission is to bridge the gap between 
                world-class craftsmanship and accessible pricing. Every item in our collection is 
                rigorously tested and curated to ensure it meets our "Lumina Standard" of quality.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Sustainability is at the core of everything we do. From eco-friendly packaging to 
                partnering with ethical manufacturers, we strive to make a positive impact on the planet.
              </p>
            </div>
            <div className="flex-1 aspect-square rounded-3xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Our team" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </section>

          <section className="bg-indigo-600 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <RiDoubleQuotesL size={80} className="mx-auto mb-6 opacity-20" />
            <h3 className="text-2xl md:text-4xl font-black mb-8 leading-tight">
              "Lumina isn't just a store; it's a reflection of our collective desire for something better."
            </h3>
            <p className="font-bold text-indigo-100">JANE DOE — FOUNDER</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
