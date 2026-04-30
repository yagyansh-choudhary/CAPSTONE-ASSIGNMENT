/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

export const RatingStars = ({ rating, count, size = 'sm' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<RiStarFill key={i} className="text-amber-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<RiStarHalfFill key={i} className="text-amber-400" />);
    } else {
      stars.push(<RiStarLine key={i} className="text-gray-300 dark:text-gray-600" />);
    }
  }

  return (
    <div className={`flex items-center gap-1 ${size === 'lg' ? 'text-xl' : 'text-sm'}`}>
      <div className="flex items-center">{stars}</div>
      {count !== undefined && (
        <span className="text-gray-400 font-medium ml-1">({count})</span>
      )}
    </div>
  );
};

export const Badge = ({ children, type = 'info', className = '' }) => {
  const styles = {
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    sale: 'bg-rose-500 text-white',
    new: 'bg-indigo-600 text-white',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};
