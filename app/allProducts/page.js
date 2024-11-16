// app/allProduct/page.js
"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const AllProducts = ({ setLoading }) => {
  const { products, setProducts } = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start the loader
        const response = await fetch("/api/uploadProduct");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setLoading]);

  // Navigate to Product Detail Page
  const handleProductClick = (productId) => {
    router.push(`/cart/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pb-8 pt-2 px-1 md:gap-4 md:p-4">
      {products.map((product) => (
        <div
          key={product._id} // Using product._id as a unique key
          onClick={() => handleProductClick(product._id)}
          className="max-w-sm rounded overflow-hidden shadow-lg m-3 bg-white cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <div className="w-full h-36 md:h-60">
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
                src="/placeholder.png" // Fallback image path
                alt="Placeholder Image"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="px-2 md:px-6 py-2 md:py-4">
            <div className="font-bold text-xl mb-2 truncate">
              fasdfasfasfadfsadasafasfasfafafafasfasfasfasfafafa
            </div>
            <p className="text-gray-700 text-base overflow-clip h-12">
              {product.description}
            </p>
            <p className="text-red-700 font-bold text-lg mt-2">
              Rs. {product.price}
            </p>
            <button
              className="bg-gradient-to-bl from-orange-500 to-pink-500 hover:from-orange-700 hover:to-pink-700 text-white font-bold w-full p-1 md:py-2 md:px-4 rounded mt-4"
              aria-label={`Add ${product.name} to cart`}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
