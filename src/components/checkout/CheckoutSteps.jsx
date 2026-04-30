/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RiCheckLine } from 'react-icons/ri';

export const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, name: 'Shipping' },
    { number: 2, name: 'Payment' },
    { number: 3, name: 'Review' },
  ];

  return (
    <div className="flex items-center justify-center py-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              currentStep === step.number 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/30' 
                : currentStep > step.number 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
            }`}>
              {currentStep > step.number ? <RiCheckLine size={20} /> : step.number}
            </div>
            <span className={`absolute top-full mt-2 text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-colors ${
              currentStep >= step.number ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
            }`}>
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 lg:w-32 h-[2px] mx-4 transition-colors duration-500 ${
              currentStep > step.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
