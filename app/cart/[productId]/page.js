"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion"; // Use framer-motion for advanced animations
import { CldImage } from "next-cloudinary";

// Icons for increment/decrement buttons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
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

  // Handle next and previous image navigation
  const goToNextImage = () => {
    if (product && currentImageIndex < product.productImage.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Swipe detection for mobile (touch events)
  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    e.target.setAttribute("data-touch-start", touchStart);
  };

  const handleTouchMove = (e) => {
    const touchStart = e.target.getAttribute("data-touch-start");
    const touchEnd = e.touches[0].clientX;

    if (touchStart - touchEnd > 50) {
      goToNextImage(); // Swipe left
    } else if (touchEnd - touchStart > 50) {
      goToPreviousImage(); // Swipe right
    }
  };

  // Professional Loader with Animation
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          <div className="absolute w-12 h-32 rounded-full border-8 border-t-4 border-white border-solid animate-spin-slow"></div>
          <div className="absolute w-10 h-20 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-ping"></div>
          <div className="flex flex-col items-start mt-8">
            <div className="text-xl font-bold text-white mb-6 animate-bounce">
              <span className="text-yellow-300">We&apos;re</span> Getting Things
              Ready!
            </div>
            <div className="text-xs text-white font-light animate-pulse">
              Please hold on, this won&apos;t take long...
            </div>
          </div>
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
    <div className="flex flex-col items-start justify-start h-full min-h-screen p-5 bg-gray-50">
      <motion.div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-[80vh] w-full p-4 md:p-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Product Image with navigation */}
        <div className="md:w-1/2 flex flex-col justify-start px-10 relative mb-6 md:mb-4">
          <motion.div
            className="transition-transform transform hover:rotate-6 hover:scale-105 duration-500 ease-in-out"
            whileHover={{ rotateY: 15 }}
            whileTap={{ scale: 0.95 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {product.productImage && product.productImage.length > 0 ? (
              <CldImage
                src={product.productImage[currentImageIndex].public_id}
                alt={product.name}
                width={300}  // Set fixed width
                height={300} // Set fixed height
                className="object-cover w-full h-full" // Ensure full coverage of the fixed area
              />
            ) : (
              <Image
                src="/placeholder.png" // Fallback image path
                alt="Placeholder Image"
                width={300}  // Fixed width
                height={300} // Fixed height
                className="object-cover w-full h-full"
              />
            )}
          </motion.div>
  
          {/* Thumbnail Images */}
          <div className="flex mt-2 space-x-2 overflow-x-auto justify-start md:justify-start">
            {product.productImage.map((image, index) => (
              <div
                key={index}
                className="w-12 h-12 cursor-pointer"  // Increase the thumbnail size for better visibility
                onClick={() => handleThumbnailClick(index)}
              >
                <CldImage
                  src={image.public_id}
                  alt={`Thumbnail ${index}`}
                  width={48} // Fixed size for thumbnails
                  height={48} // Fixed size for thumbnails
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
  
          {/* Image Navigation Arrows */}
          <div
            className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
            onClick={goToPreviousImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={goToNextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
  
        {/* Product Info */}
        <motion.div
          className="flex flex-col justify-start p-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-lg font-medium mb-2 text-gray-800">{product.name}</h1>
            <p className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐ (5.0)</p>
            <h3 className="text-lg text-green-600 font-bold">Rs. {product.price}</h3>
            <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          </div>
  
          {/* Quantity Selector */}
          <div className="flex items-start mt-6 space-x-4 justify-start md:justify-start">
            <motion.button
              className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none transition-all duration-300 shadow-md"
              onClick={handleDecrement}
              whileTap={{ scale: 0.9 }}
            >
              <MinusIcon />
            </motion.button>
  
            <p className="text-sm font-medium text-gray-700">{quantity}</p>
  
            <motion.button
              className="flex items-center justify-center bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none transition-all duration-300 shadow-md"
              onClick={handleIncrement}
              whileTap={{ scale: 0.9 }}
            >
              <PlusIcon />
            </motion.button>
          </div>
  
          {/* Add to Cart Button */}
          <div className="flex justify-center space-x-4 mt-6">
            <motion.button
              className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded transition duration-300 ease-in-out shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              className="bg-orange-500 hover:bg-orange-700 text-white font-light py-2 px-4 rounded transition duration-300 ease-in-out shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
  

};

export default ProductDetail;
