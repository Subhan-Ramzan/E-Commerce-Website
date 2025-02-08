// app/products/[product]/page.js
import Product from "./Product";
import { fetchDataFromApi } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Generate static paths for products
export async function generateStaticParams() {
  const productResponse = await fetchDataFromApi("/api/products?populate=*");

  const params = productResponse?.data?.map((p) => ({
    product: p.slug,
  }));

  return params || [];
}

// ✅ Generate metadata for products (FIXED)
export async function generateMetadata({ params }) {
  if (!params) return { title: "Product" }; // Prevent undefined error

  const { product } = await params; // ✅ Ensure params is awaited

  const productResponse = await fetchDataFromApi(
    `/api/products?filters[slug][$eq]=${product}`
  );

  const productData = productResponse?.data?.[0];

  return {
    title: productData?.name || "Product",
  };
}

// ✅ Fix `params` inside ProductPage
export default async function ProductPage({ params }) {
  if (!params)
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
    ); // ✅ Prevent undefined params

  const { product } = await params; // ✅ Await params properly

  // Fetch all product data
  const allProductsResponse = await fetchDataFromApi(
    "/api/products?populate=*"
  );
  const allProducts = allProductsResponse?.data || [];

  // Find the product matching the slug
  const matchedProduct = allProducts.find((p) => p.slug === product);

  if (!matchedProduct) {
    return <div>Product not found</div>;
  }

  return <Product product={matchedProduct} products={allProducts} />;
}
