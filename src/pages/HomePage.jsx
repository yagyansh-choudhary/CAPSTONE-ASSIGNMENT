/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  RiTruckLine, 
  RiShieldCheckLine, 
  RiCustomerService2Line, 
  RiExchangeFundsLine,
  RiArrowRightLine,
  RiShoppingBagLine
} from 'react-icons/ri';
import { HeroCarousel, CountdownTimer } from '../components/home/HomeComponents';
import ProductCard from '../components/product/ProductCard';
import { products, categories, testimonials } from '../data/products';
import { RatingStars } from '../components/ui/Badge';

const HomePage = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 6);
  const flashSaleProducts = products.filter(p => p.isOnSale).slice(0, 4);

  const features = [
    { icon: RiTruckLine, title: 'Free Shipping', desc: 'On all orders over $100' },
    { icon: RiExchangeFundsLine, title: '30 Days Return', desc: 'Hassle-free easy returns' },
    { icon: RiShieldCheckLine, title: 'Secure Payment', desc: '100% secure payment gateway' },
    { icon: RiCustomerService2Line, title: '24/7 Support', desc: 'Dedicated support team' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black dark:text-white mb-2">Shop by Category</h2>
            <p className="text-gray-500">Explore our diverse collections</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See All <RiArrowRightLine />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={cat.id} 
              to={`/shop?category=${cat.name}`}
              className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-all dark:text-gray-300">
                {/* Simplified icon rendering, normally mapping lookup */}
                <RiShoppingBagLine />
              </div>
              <span className="font-bold text-center dark:text-white">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black dark:text-white mb-4">Featured Products</h2>
          <p className="text-gray-500">Discover our top picks curated just for you by our experts.</p>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-indigo-600 py-16 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left text-white max-w-xl">
              <span className="inline-block px-4 py-2 bg-rose-500 text-white font-bold uppercase tracking-widest text-xs rounded-full mb-6 animate-pulse">
                Don't Miss Out
              </span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6">Flash Sale Is Live!</h2>
              <p className="text-indigo-100 text-lg mb-10">Get limited-time discounts on our premium electronics and fashion items. Only valid for the next 24 hours.</p>
              <div className="flex justify-center lg:justify-start">
                <CountdownTimer />
              </div>
              <Link 
                to="/shop?filter=sale"
                className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Explore Sale <RiArrowRightLine />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {flashSaleProducts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl p-3 shadow-2xl scale-90 lg:scale-100">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-gray-900 truncate">{p.name}</p>
                  <p className="text-rose-500 font-black">${p.discountedPrice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl shadow-sm">
                <f.icon />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals & Best Sellers Grid */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black dark:text-white">New Arrivals</h2>
            <Link to="/shop?filter=new" className="text-sm font-bold text-indigo-600">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newArrivals.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black dark:text-white">Best Sellers</h2>
            <Link to="/shop?filter=best" className="text-sm font-bold text-indigo-600">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bestSellers.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black dark:text-white mb-2">What Our Customers Say</h2>
            <p className="text-gray-500">Real feedback from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">
                <RatingStars rating={t.rating} />
                <p className="text-gray-600 dark:text-gray-300 my-6 italic">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold dark:text-white">{t.name}</h5>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-[2rem] p-8 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute left-0 top-0 w-64 h-64 bg-indigo-600/20 blur-[100px]"></div>
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-rose-600/20 blur-[100px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Join Our Community</h2>
            <p className="text-gray-400 text-lg mb-10">Get the latest news on products, special offers and events. No spam, we promise.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
