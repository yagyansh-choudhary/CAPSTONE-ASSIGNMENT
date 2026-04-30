/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap py-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.path ? (
            <Link to={item.path} className="hover:text-indigo-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-bold">{item.label}</span>
          )}
          {index < items.length - 1 && <RiArrowRightSLine className="flex-shrink-0" />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
