import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/utils/urls";

const RelatedProducts = ({ currentProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const url = API_URL; // Your API base URL

    useEffect(() => {
        // Fetch related products from the API, excluding the current product by id
        axios
            .get(`/api/related-products?documentId=${currentProductId}`)
            .then((res) => {
                // Set the fetched related products to the state
                console.log('response is', res.data);

                setRelatedProducts(res.data);
            })
            .catch((error) => {
                console.error("Error fetching related products:", error);
            });
    }, [currentProductId]);

    return (
        <div className="related-products mt-20">
            <h2 className="text-2xl font-semibold mb-5">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((product) => (
                        <div key={product.documentId} className="product-card">
                            <Link href={`/products/${product.slug}`}>
                                <div className="relative">
                                    <Image
                                        src={product.thumbnail && product.thumbnail.length > 0 ? `${url}${product.thumbnail[0]?.url}` : '/default-thumbnail.jpg'} // Default image if no thumbnail is available
                                        alt={product.name}
                                        width={250}
                                        height={250}
                                        className="object-cover rounded-lg"
                                    />

                                    {/* Add any badges or sale tags here */}
                                    {product.discount && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                            {product.discount}% OFF
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-500">{product.subtitle}</p>
                                    <p className="text-lg font-semibold">₹{product.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No related products available.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
