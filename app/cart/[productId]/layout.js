import ClientLayout from "./ClientLayout";
import { getProductCategory } from "@/utils/fetchProductData"; // Utility function to fetch product data

export const viewport = {
  width: "device-width",
  initialScale: 1,
}; // Define viewport here

export async function generateMetadata({ params }) {
  const { productId } = await params; // Await params before accessing properties
  const category = await getProductCategory(productId);

  return {
    title: category
      ? `${category} - New Fashion`
      : "Your Cart - New Fashion",
    description: "View and manage the items in your cart.",
  };
}

export default async function Layout({ children, params }) {
  const { productId } = await params; // Safely destructure params here
  return <ClientLayout productId={productId}>{children}</ClientLayout>;
}
