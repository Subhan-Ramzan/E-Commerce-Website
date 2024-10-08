// pages/categories/[category].js 
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      console.log("Category:", category);

      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/products?category=${category}`);
          console.log("API response status:", response.status);

          const data = await response.json();
          console.log("API response data:", data);

          if (response.ok) {
            console.log("Products:", data);
            setProducts(data);
          } else {
            console.error("Error fetching products:", data.error);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [category]);

  return (
    <div>
      <h1>{category} Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 py-8 px-1 md:gap-4 md:p-4">
        {products.map((product, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-3 bg-white">
            <div className="relative w-full h-36 md:h-60">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <div className="px-2 md:px-6 py-2 md:py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base overflow-clip h-12">{product.description}</p>
              <p className="text-red-700 font-bold text-lg mt-2">Rs. {product.price}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-1 md:py-2 md:px-4 rounded mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
