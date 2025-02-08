"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getDiscountedPricePercentage } from "@/utils/percentage";
import { API_URL } from "@/utils/urls";

// New component for each product item
const ProductItem = ({ product }) => {
  const url = API_URL;
  const mainThumbnail = product?.thumbnail?.[0]?.url || "";
  const placeholderThumbnail =
    product?.thumbnail?.[0]?.formats?.thumbnail?.url ||
    "/default-thumbnail.jpg";
  const discountPercentage = getDiscountedPricePercentage(
    product?.original_price,
    product?.price
  );

  // Hook is now at the top level of ProductItem
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      key={product?.id}
      href={`/products/${product?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-lg rounded-lg flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px]">
        {/* Placeholder Thumbnail */}
        {!imageLoaded && (
          <Image
            src={`${placeholderThumbnail}`}
            alt={product?.name || "Product Image"}
            width={300} // ✅ Specify width
            height={200} // ✅ Specify height
            style={{ objectFit: "cover" }} // ✅ Instead of objectFit prop, use style
            className="rounded-t-lg blur-md"
          />
        )}

        {/* Main Thumbnail (Loaded Image) */}
        {mainThumbnail && (
          <Image
            src={`${mainThumbnail}`}
            alt={product?.name || "Product Image"}
            width={300}
            height={200}
            style={{ objectFit: "cover" }}
            className={`rounded-t-lg transition-opacity ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 text-black/[0.9]">
        <h2 className="md:text-lg text-sm sm:text-base font-normal md:font-medium truncate line-clamp-2">
          {product?.name}
        </h2>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start text-black/[0.5]">
          <div className="flex flex-col max-md:w-full">
            <div className="flex justify-between w-full mx-auto md:hidden text-sm">
              <p className="font-semibold text-black">Rs. {product?.price}</p>
              <p className="font-medium text-green-500">
                {discountPercentage
                  ? `${discountPercentage}% off`
                  : "No Discount"}
              </p>
            </div>
            <p className="text-lg font-semibold text-black hidden md:block">
              Rs. {product?.price}
            </p>
            {product?.original_price && (
              <p className="text-base font-medium line-through text-red-500">
                Rs. {product?.original_price}
              </p>
            )}
          </div>
          <div className="mt-2 sm:mt-0 hidden md:block">
            {discountPercentage > 0 && (
              <p className="text-base font-medium text-green-500">
                {discountPercentage}% off
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main component that renders a grid of products
const ProductCard = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products?.data?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCard;
