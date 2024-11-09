"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="product-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
      onClick={() => router.push(`/cart/${product._id}`)}
      style={{
        border: "1px solid #e5e7eb",
        padding: "16px",
        margin: "8px",
      }}
    >
      <div
        className="relative w-full h-56 md:h-64 bg-gray-100"
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
            src="/placeholder.png" // Fallback image path
            alt="Placeholder Image"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-semibold text-blue-600 mt-4">{`$${product.price}`}</p>
        <button className="w-full mt-4 py-2 bg-gradient-to-bl from-orange-500 to-pink-500 hover:from-orange-700 hover:to-pink-700 text-white rounded-lg transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
