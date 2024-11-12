"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import ProductCard from "@/components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams(); // Access dynamic route parameter
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to capitalize first letter of the category
  const capitalizeCategory = (category) => {
    if (category && typeof category === "string") {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return category;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const capitalizedCategory = capitalizeCategory(category); // Capitalize the category
        console.log("Category:", capitalizedCategory);
        try {
          const response = await fetch(
            `/api/products?category=${capitalizedCategory}`
          );
          if (!response.ok) {
            console.error(`API response status: ${response.status}`);
            return;
          }
          const products = await response.json();
          setProducts(products);
          setLoading(false); // Stop loading once the data is fetched
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [category]); // Dependency array ensures the effect runs when category changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-600">
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

  if (error) {
    return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        {capitalizeCategory(category)} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
