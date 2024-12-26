"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";
import Image from "next/image";

const maxResult = 8;

const Category = ({ initialCategory, initialProducts, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);

  // Check if initialCategory or slug is empty and adjust the API URL accordingly
  const apiUrl = slug && initialCategory ?
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}` :
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`;

  // Use SWR to fetch data from the correct API URL
  const { data, error, isLoading } = useSWR(apiUrl, fetchDataFromApi, {
    fallbackData: initialProducts, // Use fallback data for when loading
  });

  const categoryName = initialCategory?.data?.[0]?.name || "All Products";

  return (
    <div className="xl:w-[80vw] lg:[85vw] md:[90vw] w-[95vw] min-h-[90vh] mx-auto md:py-16 bg-gray-50">
      {/* Category Title Section */}
      <div className="text-center max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          {categoryName}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Explore our wide range of {categoryName} products, specially curated
          for you.
        </p>
      </div>

      <ProductCard products={data} />

      {/* Pagination Section */}
      {data?.meta?.pagination?.total > maxResult && (
        <div className="flex justify-center items-center gap-4 my-8">
          <button
            className="py-2 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500"
            disabled={pageIndex === 1}
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous
          </button>
          <span className="text-gray-600 font-semibold">
            {`Page ${pageIndex} of ${data?.meta?.pagination?.pageCount}`}
          </span>
          <button
            className="py-2 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500"
            disabled={pageIndex === data?.meta?.pagination?.pageCount}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
          <Image height={80} width={80} src="/spinner.svg" alt="Loading" />
          <p className="text-gray-500 mt-4">Loading products...</p>
        </div>
      )}
    </div>
  );
};

export default Category;
