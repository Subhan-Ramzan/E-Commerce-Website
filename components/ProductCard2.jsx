"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const ProductCard2 = ({ product }) => {
  const router = useRouter();

  // Calculate discount and percentage off
  const discount = product.originalPrice - product.price;
  const percentageOff = ((discount / product.originalPrice) * 100).toFixed(0);

  return (
    <div
      className="product-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:scale-105 border border-gray-200"
      onClick={() => router.push(`/cart/${product._id}`)}
    >
      <div className="relative w-full h-56 md:h-64 bg-gray-100">
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
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3">
          <p className="flex items-center text-lg font-bold text-blue-600">
            ₨. {product.price.toLocaleString("en-IN")}
          </p>
          {product.originalPrice > product.price && (
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm line-through text-gray-500">₨. {product.originalPrice.toLocaleString("en-IN")}</p>
              <p className="text-sm font-medium text-red-500">{percentageOff}% Off</p>
            </div>
          )}
        </div>
        <button className="w-full mt-4 py-2 bg-gradient-to-bl from-orange-500 to-pink-500 hover:from-orange-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;
