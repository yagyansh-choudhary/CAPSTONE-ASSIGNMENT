/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';

const ShippingPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 pb-20 text-gray-600 dark:text-gray-400">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Shipping Policy' }]} />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-16 rounded-3xl border dark:border-gray-700 shadow-xl">
        <h1 className="text-4xl font-black dark:text-white mb-10">Shipping Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">1. Shipping Times</h2>
            <p className="leading-relaxed">
              We process orders within 1-2 business days. Shipping times vary by location:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>Domestic (US):</strong> 3-5 business days</li>
              <li><strong>Express (US):</strong> 1-2 business days</li>
              <li><strong>International:</strong> 7-21 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">2. Shipping Costs</h2>
            <p className="leading-relaxed">
              Shipping costs are calculated at checkout based on weight and destination. We offer FREE standard shipping on all domestic orders over $150.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">3. Tracking Your Order</h2>
            <p className="leading-relaxed">
              Once your order has been shipped, you will receive an email confirmation with a tracking number and a link to track your package. Please allow 24-48 hours for the tracking information to update.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">4. Customs & Taxes</h2>
            <p className="leading-relaxed">
              LUMINA is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">5. Lost or Damaged Items</h2>
            <p className="leading-relaxed">
              LUMINA is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
