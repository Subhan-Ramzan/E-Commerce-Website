// components/QuantitySelector.js
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, MinusIcon } from './Icons';

const QuantitySelector = ({ quantity, handleIncrement, handleDecrement }) => {
  return (
    <div className="flex items-center space-x-4 mt-6">
      <motion.button
        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none transition-all duration-300 shadow"
        onClick={handleDecrement}
        whileTap={{ scale: 0.9 }}
      >
        <MinusIcon />
      </motion.button>

      <p className="text-lg font-medium text-gray-700">{quantity}</p>

      <motion.button
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none transition-all duration-300 shadow"
        onClick={handleIncrement}
        whileTap={{ scale: 0.9 }}
      >
        <PlusIcon />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
