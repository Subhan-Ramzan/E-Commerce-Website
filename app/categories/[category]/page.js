"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard2";

const CategoryPage = () => {
  const { category } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const capitalizeCategory = (category) => {
    if (category && typeof category === "string") {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return category;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const capitalizedCategory = capitalizeCategory(category);
        try {
          const response = await fetch(`/api/products?category=${capitalizedCategory}`);
          if (!response.ok) {
            setError(`Failed to fetch products: ${response.status}`);
            return;
          }
          const products = await response.json();
          setProducts(products);
          setLoading(false);
        } catch (error) {
          setError("Error fetching products");
          console.error(error);
        }
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-600">
        <div className="relative animate-pulse">
          <div className="w-20 h-20 border-8 border-t-4 border-white rounded-full animate-spin"></div>
          <p className="mt-8 text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        {capitalizeCategory(category)} Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
