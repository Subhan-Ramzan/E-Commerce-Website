import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getDiscountedPricePercentage } from "@/utils/percentage";

const ProductCard = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products?.data?.map((product, index) => {
        // Safely extract thumbnail URL
        const thumbnailUrl =
          product?.thumbnail[0]?.url ||
          product?.thumbnail[0]?.formats?.small?.url;

        // Ensure thumbnailUrl is defined and starts with '/'
        const fullImageUrl =
          thumbnailUrl && thumbnailUrl.startsWith("/")
            ? `${process.env.NEXT_PUBLIC_API_URL}${thumbnailUrl}` ||
              `${thumbnailUrl}`
            : thumbnailUrl;

        // Calculate the discount percentage using the provided function
        const discountPercentage = getDiscountedPricePercentage(
          product?.original_price,
          product?.price
        );

        return (
          <Link
            key={product?.id}
            href={`/products/${product?.slug}`} // Assuming product detail route uses ID
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-lg rounded-lg flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px]">
              {fullImageUrl ? (
                <Image
                  src={fullImageUrl}
                  alt={product?.name || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 text-black/[0.9]">
              {/* Product Name */}
              <h2 className="md:text-lg text-sm sm:text-base font-normal md:font-medium truncate line-clamp-2">
                {product?.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start text-black/[0.5]">
                {/* Price Section */}
                <div className="flex flex-col max-md:w-full">
                  {/* Mobile View: Price and Discount in One Line */}
                  <div className="flex justify-between w-full mx-auto md:hidden text-sm">
                    <p className="font-semibold text-black">
                      Rs. {product?.price}
                    </p>
                    <p className="font-medium text-green-500">
                      {discountPercentage
                        ? `${discountPercentage}% off`
                        : "No Discount"}
                    </p>
                  </div>
                  {/* Desktop View: Price and Original Price */}
                  <p className="text-lg font-semibold text-black hidden md:block">
                    Rs. {product?.price}
                  </p>
                  {product?.original_price && (
                    <p className="text-base font-medium line-through text-red-500">
                      Rs. {product?.original_price}
                    </p>
                  )}
                </div>
                {/* Desktop View: Discount */}
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
      })}
    </div>
  );
};

export default ProductCard;
