//app/page.js
import Main from "@/components/Main";
import Category from "@/components/Category";
import Coverimg from "@/components/CoverImg";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import HomeProducts from "@/components/HomeProducts";
import Sidebar from "@/components/app-sidebar";
import CoverImg from "@/components/CoverImg";
export default function Home() {
  return (
    <>
      <Category />
      <HeroSection />
      {/* <section className="py-8">
        <CoverImg />
      </section> */}
      <Sidebar />
      {/* <CategorySection /> */}
      <FeaturedProducts />
      <HomeProducts />
      {/* <Main /> */}
    </>
  );
}
