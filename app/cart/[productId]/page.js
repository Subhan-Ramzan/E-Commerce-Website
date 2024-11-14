// app/cart/[productId]/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductImage from "@/components/Cart/ProductImage"; // Image carousel component
import QuantitySelector from "@/components/Cart/QuantitySelector"; // Quantity select component
import ActionButtons from "@/components/Cart/ActionButtons"; // Add to cart and buy now buttons component
import MapPage from "@/components/Cart/MapComponent";
import { FaStar } from "react-icons/fa";
import BottomProducts from "@/components/Cart/BottomProducts";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const router = useRouter();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const productId = params?.productId; // Get product ID from params
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`/api/uploadProduct/${productId}`);
          const data = await response.json();
          setProduct(data);

          // Fetch initial related products
          fetchRelatedProducts(data.category, data.name, 0);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  const fetchRelatedProducts = async (category, name, skipCount) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products/related?category=${category}&name=${name}&skip=${skipCount}&limit=1`
      );
      const data = await response.json();

      // Deduplicate by `_id`
      setRelatedProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newProducts = data.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newProducts];
      });

      setSkip(skipCount + 1);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        if (product) {
          fetchRelatedProducts(product.category, product.name, skip);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check scroll logic every 3 seconds
    const interval = setInterval(() => {
      handleScroll();
    }, 3000);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval); // Clear the interval on unmount
    };
  }, [skip, product, router, fetchRelatedProducts]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1); // Increase quantity
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1); // Decrease quantity if greater than 1
  };

  if (!product) {
    return (
      <div className="flex h-screen justify-center items-center bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-600">
        <div className="relative flex justify-center items-center">
          {/* Spinning Circle Animation */}
          <div className="absolute w-16 h-16 rounded-full border-8 border-t-4 border-white border-solid animate-spin-slow shadow-lg"></div>

          {/* Glowing Animated Circle */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 animate-ping opacity-80 shadow-2xl"></div>

          {/* Text Content */}
          <div className="flex flex-col items-center mt-8 text-center">
            <div className="text-4xl font-extrabold text-white mb-6 animate-bounce">
              <span className="text-yellow-300">We&apos;re</span> Ready for Your
              Products
            </div>
            <div className="text-lg text-white font-light animate-pulse">
              Please hold on, this won&apos;t take long...
            </div>
          </div>

          {/* Sparkle Animations with 3D effect */}
          <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse-sparkle">
            <div className="absolute w-4 h-4 rounded-full bg-white opacity-60 animate-sparkle1 shadow-md"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white opacity-50 animate-sparkle2 shadow-lg"></div>
            <div className="absolute w-6 h-6 rounded-full bg-white opacity-40 animate-sparkle3 shadow-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen md:p-4 p-0 bg-gray-50">
      <motion.div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-[100vw] md:max-w-[100vw] w-full p-0 md:p-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ProductImage
          product={product}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          shouldRunEffect={shouldRunEffect}
        />
        <motion.div
          className="flex flex-col justify-between md:w-[30vw] p-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="text-start md:text-left mb-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2 w-[90vw] md:w-[27vw] break-words">
              {product.name}
            </h1>
            <span className="flex items-center gap-2">
              <FaStar size={20} color="#FFD700" />
              <p className="text-lg">4.5</p>
            </span>
            <h3 className="text-xl text-green-600 font-bold">
              Rs. {product.price}
            </h3>
            <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          </div>

          {/* <QuantitySelector
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          /> */}
          <ActionButtons />
        </motion.div>
        <div>
          <MapPage />
        </div>
      </motion.div>
      <BottomProducts relatedProducts={relatedProducts} />

      {loading && (
        <div className="text-center mt-4">Loading more products...</div>
      )}
    </div>
  );
};

export default ProductDetail;
