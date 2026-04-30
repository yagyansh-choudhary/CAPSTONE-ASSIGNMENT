/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiShoppingBagLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Experience Innovation in Every Sound',
    subtitle: 'Limited Edition Nebula X1',
    description: 'Get up to 20% off on your first purchase of the year. Quality you can hear.',
    image: 'https://picsum.photos/seed/hero1/1600/900',
    color: 'from-indigo-600 to-blue-500',
    link: '/product/p1'
  },
  {
    id: 2,
    title: 'Urban Style for Modern Explorers',
    subtitle: 'New Arrival: Summer Collection',
    description: 'Explore our curated range of fashion essentials designed for city life.',
    image: 'https://picsum.photos/seed/hero2/1600/900',
    color: 'from-rose-600 to-amber-500',
    link: '/shop?category=Fashion'
  },
  {
    id: 3,
    title: 'Smart Tech. Brilliant Living.',
    subtitle: 'Wearables & Home Gear',
    description: 'Upgrade your daily routine with our premium selection of smart home devices.',
    image: 'https://picsum.photos/seed/hero3/1600/900',
    color: 'from-emerald-600 to-teal-500',
    link: '/shop?category=Electronics'
  }
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] lg:h-[600px] w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].color} opacity-40 z-10`} />
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white font-bold uppercase tracking-widest mb-4"
                >
                  {slides[current].subtitle}
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl lg:text-7xl font-black text-white mb-6 leading-tight"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-200 mb-8 leading-relaxed"
                >
                  {slides[current].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link 
                    to={slides[current].link}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                  >
                    <RiShoppingBagLine size={20} />
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Static Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        <button onClick={prev} className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"><RiArrowLeftSLine size={24} /></button>
        <button onClick={next} className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"><RiArrowRightSLine size={24} /></button>
      </div>

      <div className="absolute bottom-10 left-10 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds < 0) totalSeconds = 24 * 3600 - 1; // Reset to 24h
        
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl font-black text-indigo-600 dark:text-indigo-400 shadow-sm border dark:border-gray-700">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-[10px] uppercase font-bold text-gray-400 mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <Box value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-black text-gray-400 -mt-6">:</span>
      <Box value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-black text-gray-400 -mt-6">:</span>
      <Box value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
