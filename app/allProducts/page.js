//app/allProduct/page.js
"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation'; 
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";

const AllProducts = () => {
  const { products, setProducts } = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/uploadProduct");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Navigate to Product Detail Page
  const handleProductClick = (productId) => {
    router.push(`/cart/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 py-8 px-1 md:gap-4 md:p-4">
      {products.map((product, index) => (
        <div
          key={index}
          onClick={() => handleProductClick(product._id)}
          className="max-w-sm rounded overflow-hidden shadow-lg m-3 bg-white cursor-pointer">
          <div className="w-full h-36 md:h-60">
            <Image
              src={product.images.length > 0 ? product.images[0].url : "/default-image.jpg"}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="px-2 md:px-6 py-2 md:py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base overflow-clip h-12">
              {product.description}
            </p>
            <p className="text-red-700 font-bold text-lg mt-2">
              Rs. {product.price}
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-1 md:py-2 md:px-4 rounded mt-4">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
