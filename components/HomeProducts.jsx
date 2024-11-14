"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
export default function HomeProducts() {
    const [products, setProducts] = useState([]); // Initialize products
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [callCount, setCallCount] = useState(0); // Track function calls

    const fetchRelatedProducts = useCallback(async (skipCount) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/products/homeProduct?skip=${skipCount}&limit=4`);
            const data = await response.json();

            // Deduplicate by `_id`
            setProducts((prev) => {
                const existingIds = new Set(prev.map((p) => p._id));
                const newProducts = data.filter((p) => !existingIds.has(p._id));
                return [...prev, ...newProducts];
            });

            setSkip(skipCount + 4);
        } catch (error) {
            console.error("Error fetching related products:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            // Get the current scroll position and the total scrollable height
            const scrollPosition = window.innerHeight + window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
    
            // Trigger fetch when we are at the bottom
            if (scrollPosition >= scrollHeight - 10) { // You can adjust the 10px threshold
                if (callCount < 25) {
                    fetchRelatedProducts(skip);
                    setCallCount((prev) => prev + 1); // Increment the counter
                }
            }
        };
    
        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [skip, callCount, fetchRelatedProducts]);
    

    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold text-center mb-12">Available Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <CldImage
                            src={product.productImage[0].public_id}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-full h-48 md:h-80 object-fill"
                        />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <div className="text-center mt-4">Loading more products...</div>
            )}
        </section>
    );
}
