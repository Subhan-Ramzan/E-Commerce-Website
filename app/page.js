import Image from "next/image";
import Main from "@/components/Main";
import Category from "@/components/Category";
import Coverimg from "@/components/CoverImg";

export default function Home() {
  return (
    <>
      <Category />
      <Coverimg />
      <Main />
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
