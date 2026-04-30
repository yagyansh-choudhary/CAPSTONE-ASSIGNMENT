/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Loader = () => (
  <div className="flex items-center justify-center p-12">
    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

export const EmptyState = ({ icon: Icon, title, message, actionLink, actionLabel }) => (
  <div className="flex flex-col items-center justify-center text-center py-20 px-4">
    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
      <Icon size={48} />
    </div>
    <h3 className="text-2xl font-bold dark:text-white mb-2">{title}</h3>
    <p className="text-gray-500 mb-8 max-w-sm">{message}</p>
    {actionLink && (
      <a href={actionLink} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl">
        {actionLabel}
      </a>
    )}
  </div>
);
