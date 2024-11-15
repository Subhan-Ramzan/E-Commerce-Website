"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function HomeProducts() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [callCount, setCallCount] = useState(0);
    const router = useRouter();

    const fetchRelatedProducts = useCallback(async (skipCount) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/products/homeProduct?skip=${skipCount}&limit=4`);
            const data = await response.json();

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
            const scrollPosition = window.innerHeight + window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= scrollHeight - 10) {
                if (callCount < 25) {
                    fetchRelatedProducts(skip);
                    setCallCount((prev) => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [skip, callCount, fetchRelatedProducts]);

    return (
        <section className="py-10 bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                Available Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => router.push(`/cart/${product._id}`)}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                        <CldImage
                            src={product.productImage[0].public_id}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-full h-48 md:h-60 object-cover"
                        />
                        <div className="p-4 ">
                            <h3 className="text-lg  font-semibold text-gray-950 truncate mb-2">
                                {product.name}
                            </h3>
                            <p className="flex items-center text-lg font-medium bg-gradient-to-r from-red-500 via-orange-700 to-green-500 bg-clip-text text-transparent">
                                <span className="text-xl font-bold mr-1 transition-transform duration-300 hover:scale-125">₨.</span>
                                {product.price.toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <div className="flex justify-center items-center mt-5">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            )}
        </section>
    );
}
