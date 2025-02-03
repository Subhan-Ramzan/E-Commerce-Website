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
  // Fetching products data
  const products = await fetchDataFromApi("/api/products?populate=*");
  const CoverImg = await fetchDataFromApi("/api/cover-images?populate=*");

  return (
    <>
      {/* SEO Metadata */}
      {/* <Head>
        <title>My E-commerce Store</title>
        <meta
          name="description"
          content="Explore our wide range of products at My E-commerce Store. High-quality products at the best prices."
        />
        <meta name="keywords" content="ecommerce, products, shopping, deals" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/" />
      </Head> */}

      {/* Page Content */}
      <div className="md:w-[90vw] w-[95vw] mx-auto">
        <Category />
        {/* Pass the CoverImg data to HeroSection */}
        <HeroSection CoverImages={CoverImg?.data[0]?.CoverImage || []} />
        <HomeHeading />
        <ProductCard products={products} />
        {/* <FeaturedProducts products={products} /> */}
      </div>
    </>
  );
}
