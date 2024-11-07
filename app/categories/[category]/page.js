"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

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
          const response = await fetch(`/api/products?category=${capitalizedCategory}`);
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          {/* Animated Circle */}
          <div className="absolute w-32 h-32 rounded-full border-8 border-t-4 border-white border-solid animate-spin-slow"></div>
          
          {/* Inner animated circle */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-ping"></div>
          
          {/* Text and message */}
          <div className="flex flex-col items-center mt-8">
            <div className="text-4xl font-bold text-white mb-6 animate-bounce">
              <span className="text-yellow-300">We're</span> Getting Things Ready!
            </div>
            <div className="text-lg text-white font-semibold animate-pulse">Please hold on, this won't take long...</div>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        {capitalizeCategory(category)} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="product-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="relative w-full h-64 bg-gray-200">
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
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Description:</strong> {product.description}
                </p>
                <p className="text-lg font-semibold text-blue-500 mt-4">{`$${product.price}`}</p>
                <button
                  onClick={() => router.push(`/product/${product._id}`)}
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
