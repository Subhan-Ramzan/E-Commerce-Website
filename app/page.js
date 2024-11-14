import Main from "@/components/Main";
import Category from "@/components/Category";
import Coverimg from "@/components/CoverImg";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import HomeProducts from "@/components/HomeProducts";
export default function Home() {
  return (
    <>
      <Category />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <HomeProducts />
      {/* <Coverimg /> */}
      {/* <Main /> */}
    </>
  );
}
