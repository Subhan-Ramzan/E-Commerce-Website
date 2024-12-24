import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {[...Array(12)].map((_, index) => (
        <Link
          key={index}
          href={`/productdetail`}
          className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-lg rounded-lg flex flex-col"
        >
          {/* Product Image */}
          <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px]">
            <Image
              src={"/slide-2.png"}
              alt="Product Name"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>

          {/* Product Details */}
          <div className="p-4 text-black/[0.9]">
            {/* Product Name */}
            <h2 className="md:text-lg text-sm sm:text-base font-normal md:font-medium truncate line-clamp-2">
              Nameafsddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffafafafa
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start text-black/[0.5]">
              {/* Price Section */}
              <div className="flex flex-col">
                {/* Mobile View: Price and Discount in One Line */}
                <div className="flex justify-between md:hidden text-sm">
                  <p className="font-semibold text-black">Rs.price</p>
                  <p className="font-medium text-green-500">20% off</p>
                </div>
                {/* Desktop View: Price and Original Price */}
                <p className="text-lg font-semibold text-black hidden md:block">
                  Rs.price
                </p>
                <p className="text-base font-medium line-through text-red-500">
                  Rs.original_price
                </p>
              </div>
              {/* Desktop View: Discount */}
              <div className="mt-2 sm:mt-0 hidden md:block">
                <p className="text-base font-medium text-green-500">20% off</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
