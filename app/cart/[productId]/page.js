"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion"; // Use framer-motion for advanced animations
import { CldImage} from "next-cloudinary";

// Icons for increment/decrement buttons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const router = useRouter();
  const params = useParams();

  const productId = params?.productId;

  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`/api/uploadProduct/${productId}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Professional Loader with Animation
  if (!product) {
      return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="relative">
            {/* Animated Circle */}
            <div className="absolute w-32 h-32 rounded-full border-8 border-t-4 border-white border-solid animate-spin-slow"></div>
  
            {/* Inner animated circle */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-ping"></div>
  
            {/* Text and message */}
            <div className="flex flex-col items-center mt-8">
              <div className="text-4xl font-bold text-white mb-6 animate-bounce">
                <span className="text-yellow-300">We&apos;re</span> Getting Things
                Ready!
              </div>
              <div className="text-lg text-white font-semibold animate-pulse">
                Please hold on, this won&apos;t take long...
              </div>
            </div>
  
            {/* Sparkles / Particles */}
            <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse-sparkle">
              <div className="absolute w-3 h-3 rounded-full bg-white opacity-50 animate-sparkle1"></div>
              <div className="absolute w-4 h-4 rounded-full bg-white opacity-40 animate-sparkle2"></div>
              <div className="absolute w-5 h-5 rounded-full bg-white opacity-30 animate-sparkle3"></div>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen p-5 bg-gray-50">
      {/* Main Container with unified layout and 3D animation */}
      <motion.div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl p-6 md:p-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Product Image with 3D hover effect */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            className="transition-transform transform hover:rotate-6 hover:scale-105 duration-500 ease-in-out"
            whileHover={{ rotateY: 15 }}
            whileTap={{ scale: 0.95 }}
          >
          {product.productImage && product.productImage[0] ? (
              <CldImage
                src={product.productImage[0].public_id}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src="/placeholder.png"  // Fallback image path
                alt="Placeholder Image"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center p-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold mb-2 antialiased text-gray-800">
              {product.name}
            </h1>
            <p className="text-yellow-400 mb-4 antialiased">⭐⭐⭐⭐⭐ (5.0)</p>
            <h3 className="text-3xl text-green-600 font-bold antialiased">Rs. {product.price}</h3>
            <p className="text-lg text-gray-600 mt-4">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mt-8 space-x-4 justify-center md:justify-start">
            <motion.button
              className="flex items-center justify-center bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none transition-all duration-300 shadow-md"
              onClick={handleDecrement}
              whileTap={{ scale: 0.9 }}
            >
              <MinusIcon />
            </motion.button>

            <p className="text-2xl font-medium text-gray-700 antialiased">{quantity}</p>

            <motion.button
              className="flex items-center justify-center bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none transition-all duration-300 shadow-md"
              onClick={handleIncrement}
              whileTap={{ scale: 0.9 }}
            >
              <PlusIcon />
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-8 transition duration-300 ease-in-out shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
