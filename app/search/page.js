// app/search/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${query}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          {/* Animated Circle */}
          <div className="absolute w-32 h-32 rounded-full border-8 border-t-4 border-white border-solid animate-spin-slow"></div>

          {/* Inner animated circle */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-ping"></div>

          {/* Text and message */}
          <div className="flex flex-col items-center mt-8">
            <div className="text-4xl font-bold text-white mb-6 animate-bounce">
              <span className="text-yellow-300">We&apos;re</span> Getting Things
              Ready!
            </div>
            <div className="text-lg text-white font-semibold animate-pulse">
              Please hold on, this won&apos;t take long...
            </div>
          </div>

          {/* Sparkles / Particles */}
          <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse-sparkle">
            <div className="absolute w-3 h-3 rounded-full bg-white opacity-50 animate-sparkle1"></div>
            <div className="absolute w-4 h-4 rounded-full bg-white opacity-40 animate-sparkle2"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white opacity-30 animate-sparkle3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1>Search Results for &quot;{query}&quot;</h1>
      {products.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
