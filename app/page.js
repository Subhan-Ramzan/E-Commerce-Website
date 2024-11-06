import Image from "next/image";
import Main from "@/components/Main";
import Category from "@/components/Category";
import Coverimg from "@/components/CoverImg";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
// import UploadImage from "@/components/UploadImage";

export default function Home() {
  return (
    <>
      <Category />
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <Coverimg />
      <Main />
      {/* <UploadImage /> */}
    </>
  );
}

// import ImageUpload from "@/components/ImageUpload";

// export default function Home() {
//   return (
//     <>
//       <ImageUpload />
//     </>
//   );
// }
