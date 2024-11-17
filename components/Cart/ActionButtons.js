// components/ActionButtons.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const ActionButtons = ({setUploadProduct}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-8">
      <motion.button
        className="flex-1 mx-2 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded transition duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add to Cart
      </motion.button>

      <motion.button
        onClick={() => setUploadProduct(true)}
        className="flex-1 mx-2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 hover:from-orange-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded transition duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Buy Now
      </motion.button>
    </div>
  );
};

export default ActionButtons;
