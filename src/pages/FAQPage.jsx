/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import Breadcrumb from '../components/ui/Breadcrumb';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b dark:border-gray-800 last:border-0 overflow-hidden">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left hover:text-indigo-600 transition-colors dark:text-white"
      >
        <span className="text-xl font-bold">{question}</span>
        {isOpen ? <RiSubtractLine size={24} /> : <RiAddLine size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-7 business days depending on your location. We provide tracking information as soon as your order is dispatched."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange."
    },
    {
      question: "Are your products sustainable?",
      answer: "Yes! We are committed to sustainability. Over 80% of our products are made from eco-friendly or recycled materials, and we use zero-plastic packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship to over 30 countries including USA, Canada, UK, and most of Europe. Shipping costs and delivery times may vary for international orders."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive an email with a tracking link. You can also view your order status in the 'My Orders' section of your profile."
    },
    {
      question: "Can I change my order after it's placed?",
      answer: "We process orders quickly, but if you contact us within 2 hours of placing your order, we can usually make changes to the shipping address or items."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'FAQs' }]} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6">Common Questions</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Everything you need to know about Lumina.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl border dark:border-gray-700 shadow-xl">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} 
              {...faq} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
