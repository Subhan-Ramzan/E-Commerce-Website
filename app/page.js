import Main from "@/components/Main";
import Category from "@/components/Category";
import CoverImg from "@/components/CoverImg";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import HomeProducts from "@/components/HomeProducts";
import ProductCard from "@/components/ProductCard";
import HomeHeading from "@/components/HomeHeading";
import { fetchDataFromApi } from "@/utils/api";
import Head from "next/head";

// Revalidate every 60 seconds for ISR
export const revalidate = 3600;

export default async function Home() {
  try {
    // Fetching products data
    const products = await fetchDataFromApi("/api/products?populate=*");
    const CoverImg = await fetchDataFromApi("/api/cover-images?populate=*");

    return (
      <>
        <div className="md:min-w-[90vw] w-[95vw] mx-auto">
          <Category />
          {/* Pass the CoverImg data to HeroSection */}
          <HeroSection CoverImages={CoverImg?.data[0]?.CoverImage || []} />
          <HomeHeading />
          <ProductCard products={products} />
          {/* <FeaturedProducts products={products} /> */}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading the page. Please try again later.</div>;
  }
}
