/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';

const ReturnPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 pb-20 text-gray-600 dark:text-gray-400">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Returns & Refunds' }]} />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-16 rounded-3xl border dark:border-gray-700 shadow-xl">
        <h1 className="text-4xl font-black dark:text-white mb-10">Returns & Refunds</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">30-Day Money-Back Guarantee</h2>
            <p className="leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not happy with your item, you may return it within 30 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">Return Conditions</h2>
            <p className="leading-relaxed mb-4">To be eligible for a return, your item must meet the following criteria:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Item must be in original, unused condition.</li>
              <li>Item must be in original packaging with all tags attached.</li>
              <li>You must have a valid proof of purchase (order number).</li>
              <li>Discounted/Sale items are final sale and cannot be returned.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">How to Start a Return</h2>
            <p className="leading-relaxed">
              Contact our support team at <strong>returns@lumina.com</strong> with your order number. Once your return is authorized, we will send you a pre-paid return label (domestic orders only).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">Refund Process</h2>
            <p className="leading-relaxed">
              Once we receive and inspect your item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
