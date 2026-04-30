/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RiGhostLine, RiArrowLeftLine } from 'react-icons/ri';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
      <div className="relative mb-12">
        <div className="text-9xl font-black text-gray-100 dark:text-gray-800 animate-pulse select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <RiGhostLine size={100} className="text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <h1 className="text-4xl font-black dark:text-white mb-6">Lost in Space?</h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md">
        The page you are looking for might have been moved, deleted, or never existed in the first place.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
      >
        <RiArrowLeftLine /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
