/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 pb-20 text-gray-600 dark:text-gray-400">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Terms of Service' }]} />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-16 rounded-3xl border dark:border-gray-700 shadow-xl">
        <h1 className="text-4xl font-black dark:text-white mb-10">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using LUMINA, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">2. Account Responsibility</h2>
            <p className="leading-relaxed">
              You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">3. Accuracy of Information</h2>
            <p className="leading-relaxed">
              While we strive for accuracy, we do not warrant that product descriptions, pricing, or other content on our site is always accurate, complete, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">4. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on LUMINA, including text, logos, designs, and images, is the property of LUMINA and is protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold dark:text-white mb-4">5. Limitation of Liability</h2>
            <p className="leading-relaxed">
              LUMINA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
