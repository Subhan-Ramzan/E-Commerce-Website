//app/products/[product]/page.js
import Product from "./Product";
import { fetchDataFromApi } from "@/utils/api";

// Generate static paths for products
export async function generateStaticParams() {
  const productResponse = await fetchDataFromApi("/api/products?populate=*");

  const params = productResponse?.data?.map((p) => ({
    product: p.slug,
  }));

  return params || [];
}

// Generate metadata for products
export async function generateMetadata({ params }) {
  const { product } = params;

  const productResponse = await fetchDataFromApi(
    `/api/products?filters[slug][$eq]=${product}`
  );

  const productData = productResponse?.data?.[0];

  return {
    title: productData?.name || "Product",
  };
}

// Render the ProductPage
export default async function ProductPage({ params }) {
  const { product } = params;

  // Fetch all product data
  const allProductsResponse = await fetchDataFromApi("/api/products?populate=*");
  const allProducts = allProductsResponse?.data || [];

  // Find the product matching the slug
  const matchedProduct = allProducts.find((p) => p.slug === product);

  if (!matchedProduct) {
    // Handle case when product is not found
    return <div>Product not found</div>;
  }

  return (
    <Product product={matchedProduct} products={allProducts} />
  );
}
