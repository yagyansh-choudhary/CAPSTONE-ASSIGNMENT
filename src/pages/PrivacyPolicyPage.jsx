/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 pb-20 text-gray-600 dark:text-gray-400">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-16 rounded-3xl border dark:border-gray-700 shadow-xl">
        <h1 className="text-4xl font-black dark:text-white mb-10">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us when you create an account, place an order, or contact us. This includes your name, email, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the collected data to process your orders, communicate with you about your account, and send you marketing communications (if you've opted in). We also use data to improve our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures, including SSL encryption, to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">4. Sharing Your Data</h2>
            <p className="leading-relaxed">
              We do not sell your personal data. We share your information only with trusted third parties necessary for our operations (e.g., payment processors and shipping carriers).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">5. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, correct, or delete your personal data. You can manage your information through your account settings or by contacting us directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
