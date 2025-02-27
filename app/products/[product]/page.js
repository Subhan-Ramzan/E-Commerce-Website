// app/products/[product]/page.js
import Product from "./Product";
import { fetchDataFromApi } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Generate static paths for products
export async function generateStaticParams() {
  try {
    const productResponse = await fetchDataFromApi("/api/products?populate=*");

    if (!productResponse || !productResponse.data) {
      console.warn("⚠️ No product data found.");
      return [];
    }

    return productResponse.data.map((p) => ({ product: p.slug }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// ✅ Generate metadata for products
export async function generateMetadata({ params }) {
  if (!params || !params.product) return { title: "Product" };

  try {
    const productResponse = await fetchDataFromApi(
      `/api/products?filters[slug][$eq]=${params.product}`
    );

    const productData = productResponse?.data?.[0];

    return {
      title: productData?.name || "Product",
    };
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return { title: "Product" };
  }
}

// ✅ Product Page Component
export default async function ProductPage({ params }) {
  if (!params || !params.product) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        </motion.div>
      </div>
    );
  }

  try {
    // ✅ Fetch all products data
    const allProductsResponse = await fetchDataFromApi("/api/products?populate=*");
    
    if (!allProductsResponse || !allProductsResponse.data) {
      console.warn("⚠️ No product data found.");
      return <div className="text-center mt-10 text-red-500">No products available.</div>;
    }

    const allProducts = allProductsResponse.data;
    const matchedProduct = allProducts.find((p) => p.slug === params.product);

    if (!matchedProduct) {
      return <div className="text-center mt-10 text-red-500">Product not found</div>;
    }

    return <Product product={matchedProduct} products={allProducts} />;
  } catch (error) {
    console.error("Error loading product page:", error);
    return <div className="text-center mt-10 text-red-500">Error loading product</div>;
  }
}
