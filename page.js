{/* <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
  <Carousel>
    <CarouselContent>
      {product.productImage?.length > 0 ? (
        product.productImage.map((image, index) => (
          <CarouselItem key={index}>
            <motion.div
              className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
              whileHover={{ rotateY: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <CldImage
                src={image.public_id}
                alt={product.name}
                width={400}
                height={300}
                className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
              />
            </motion.div>
          </CarouselItem>
        ))
      ) : (
        <CarouselItem>
          <Image
            src="/placeholder.png"
            alt="Placeholder Image"
            width={300}
            height={300}
            className="object-cover w-full h-full rounded-lg"
          />
        </CarouselItem>
      )}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>

  {/* Thumbnail Navigation 
  <div className="flex mt-3 space-x-2 overflow-x-auto">
    {product.productImage.map((image, index) => (
      <div
        key={index}
        className={`w-12 h-12 cursor-pointer ${
          index === currentImageIndex ? "border-2 border-gray-500" : ""
        }`}
        onClick={() => handleThumbnailClick(index)}
      >
        <CldImage
          src={image.public_id}
          alt={`Thumbnail ${index}`}
          width={48}
          height={48}
          className="object-cover rounded-md border border-gray-300"
        />
      </div>
    ))}
  </div>
</div>; */}











<div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
          <Carousel>
            <CarouselContent>
              {product.productImage?.length > 0 ? (
                product.productImage.map((image, index) => (
                  <CarouselItem
                    key={index}
                    active={index === currentImageIndex}
                  >
                    <motion.div
                      className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
                      whileHover={{ rotateY: 15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CldImage
                        src={image.public_id}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
                      />
                    </motion.div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <Image
                    src="/placeholder.png"
                    alt="Placeholder Image"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious onClick={handlePrevious} />
            <CarouselNext onClick={handleNext} />
          </Carousel>

          {/* Thumbnail Navigation */}
          <div className="flex mt-3 p-1 space-x-2">
            {product.productImage.map((image, index) => (
              <div
                key={index}
                className={`w-12 h-12 cursor-pointer ${
                  index === currentImageIndex ? "border-2 border-gray-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
                onMouseEnter={() => handleThumbnailClick(index)}
              >
                <CldImage
                  src={image.public_id}
                  alt={`Thumbnail ${index}`}
                  width={48}
                  height={48}
                  className="object-fill h-12 w-12 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>











export default function WarrantyIcon() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="blue"
          width="40px"
          height="40px"
        >
          <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm0 18c-3.74-1.17-6-5.22-6-10V6.26L12 4.34l6 1.92V10c0 4.78-2.26 8.83-6 10z" />
        </svg>
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "0.7rem",
          }}
        >
          7
        </span>
      </div>
      <span style={{ color: "#4A4A4A", fontSize: "0.9rem" }}>
        7-Day Warranty
      </span>
    </div>
  );
}



HeroSection

"use client"

import React from "react";
import dynamic from "next/dynamic";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";

// Dynamically import Carousel component with SSR disabled
const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), {
  ssr: false,
});

const HeroSection = ({ slides }) => {
  return (
    <div className="relative text-white w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black/70 rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg text-white" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black/70 rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg text-white" />
          </div>
        )}
      >
        {/* Dynamically render slides */}
        {slides?.map((slide, index) => {
          console.log("Slide image path:", slide.image); // Log the image path to the console
          return (
            <div key={index} className="relative">
              <Image
                src={slide.image}
                alt={slide.alt}
                layout="responsive"
                width={1360}
                height={700}
                className="object-cover"
                priority={true}
              />
              <div className="absolute bottom-[15px] md:bottom-[30px] left-5 md:left-10 bg-white/90 text-black font-oswald text-[13px] md:text-[20px] px-4 py-2 md:px-6 md:py-3 uppercase font-medium cursor-pointer hover:opacity-80">
                Shop now
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default HeroSection;

export async function getStaticProps() {
  // Return static data (image paths) that don't change frequently
  const slides = [
    { image: "/slide-1.png", alt: "Slide 1" },
    { image: "/slide-2.png", alt: "Slide 2" },
    { image: "/slide-3.png", alt: "Slide 3" },
  ];

  return {
    props: {
      slides, // These will be passed as props to the HeroSection component
    },
  };
}


//Category page
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import ProductCard from "@/components/ProductCard2";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const capitalizeCategory = (category) => {
//     if (category && typeof category === "string") {
//       return category.charAt(0).toUpperCase() + category.slice(1);
//     }
//     return category;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (category) {
//         const capitalizedCategory = capitalizeCategory(category);
//         try {
//           const response = await fetch(`/api/products?category=${capitalizedCategory}`);
//           if (!response.ok) {
//             setError(`Failed to fetch products: ${response.status}`);
//             return;
//           }
//           const products = await response.json();
//           setProducts(products);
//           setLoading(false);
//         } catch (error) {
//           setError("Error fetching products");
//           console.error(error);
//         }
//       }
//     };

//     fetchProducts();
//   }, [category]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-600">
//         <div className="relative animate-pulse">
//           <div className="w-20 h-20 border-8 border-t-4 border-white rounded-full animate-spin"></div>
//           <p className="mt-8 text-white text-xl font-semibold">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
//         {capitalizeCategory(category)} Products
//       </h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.length === 0 ? (
//           <p className="col-span-full text-center text-lg text-gray-600">
//             No products found
//           </p>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;