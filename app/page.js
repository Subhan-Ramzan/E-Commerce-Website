//app/page.js
import Main from "@/components/Main";
import Category from "@/components/Category";
import Coverimg from "@/components/CoverImg";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import HomeProducts from "@/components/HomeProducts";
import CoverImg from "@/components/CoverImg";
import ProductCard2 from "@/components/ProductCard2";
import HomeHeading from "@/components/HomeHeading";
export default function Home() {
  return (
    <>
      {/* <CategorySection /> */}
      <div className="md:w-[90vw] w-[95vw] mx-auto">
        <Category />
        <HeroSection />
        <HomeHeading />
        <ProductCard2 />
        <FeaturedProducts />
      </div>
      {/* <HomeProducts /> */}
      {/* <Main /> */}
    </>
  );
}
