
// <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
//   <motion.div
//     className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
//     whileHover={{ rotateY: 15 }}
//     whileTap={{ scale: 0.95 }}
//     onTouchStart={handleTouchStart}
//     onTouchMove={handleTouchMove}
//     onTouchEnd={handleTouchEnd}
//   >
//     {product.productImage?.length > 0 ? (
//       <CldImage
//         src={product.productImage[currentImageIndex].public_id}
//         alt={product.name}
//         width={400}
//         height={300}
//         className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
//       />
//     ) : (
//       <Image
//         src="/placeholder.png"
//         alt="Placeholder Image"
//         width={300}
//         height={300}
//         className="object-cover w-full h-full rounded-lg"
//       />
//     )}
//   </motion.div>

//   {/* Thumbnail Images */}
//   <div className="flex mt-3 space-x-2 overflow-x-auto">
//     {product.productImage.map((image, index) => (
//       <div
//         key={index}
//         className="w-12 h-12 cursor-pointer"
//         onClick={() => handleThumbnailClick(index)}
//         onMouseEnter={() => handleThumbnailClick(index)}
//       >
//         <CldImage
//           src={image.public_id}
//           alt={`Thumbnail ${index}`}
//           width={48}
//           height={48}
//           className="object-cover rounded-md border border-gray-300"
//         />
//       </div>
//     ))}
//   </div>

//   {/* Image Navigation Arrows */}
//   <div
//     className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
//     onClick={goToPreviousImage}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//     </svg>
//   </div>
//   <div
//     className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
//     onClick={goToNextImage}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//     </svg>
//   </div>
// </div>;







{/* <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
{/* Carousel that displays the current image 
<Carousel>
  <CarouselContent>
    {product.productImage?.length > 0 ? (
      product.productImage.map((image, index) =>
        index === currentImageIndex ? (
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
        ) : null
      )
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

  {/* Carousel Navigation Controls 
  <CarouselPrevious onClick={handlePrevious} />
  <CarouselNext onClick={handleNext} />
</Carousel>

{/* Thumbnail Navigation 
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
</div> */}



















// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { MdLocationOn } from "react-icons/md";
// import io from "socket.io-client";

// const socket = io("https://boggy-shadowed-plain.glitch.me"); // Backend server URL

// export default function LocationComponent() {
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//     locationName: "",
//   });

//   useEffect(() => {
//     // Listen for location updates from the server
//     socket.on("receive-location", (data) => {
//       console.log("Location received:", data);
//       setLocation({
//         latitude: data.latitude,
//         longitude: data.longitude,
//         locationName: data.locationName,
//       });
//     });

//     return () => {
//       socket.off("receive-location"); // Cleanup on component unmount
//     };
//   }, []);

//   return (
//     <div className="flex justify-between items-center gap-2">
//       <div>
//         <MdLocationOn className="text-blue-500 text-3xl" />
//       </div>
//       <div>
//         <p className="text-[12px] font-semibold">
//           {location.locationName || "Fetching..."}
//         </p>
//       </div>
//       <div>
//         <Link
//           href={`https://boggy-shadowed-plain.glitch.me`}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <button className="px-4 py-2 text-blue-600 font-semibold rounded-lg text-base">
//             Change
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }




// hero section
// "use client";

// export default function HeroSection() {
//   const handleScrollToBottom = () => {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: "smooth", // Smooth scrolling effect
//     });
//   };

//   return (
//     <div className="relative h-[35vh] md:h-[50vh] overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-800 to-blue-900 text-white">
//       <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-center"></div>

//       {/* Content */}
//       <div className="z-10 text-center px-4">
//         <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
//           Elevate Your Style
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Discover the latest trends and shop exclusive collections.
//         </p>
//         <button
//           onClick={handleScrollToBottom}
//           className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300"
//         >
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// }


//ProductCard

// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { CldImage } from "next-cloudinary";

// const ProductCard = ({ product }) => {
//   const router = useRouter();

//   // Calculate discount and percentage off
//   const discount = product.originalPrice - product.price;
//   const percentageOff = ((discount / product.originalPrice) * 100).toFixed(0);

//   return (
//     <div
//       className="product-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
//       onClick={() => router.push(`/cart/${product._id}`)}
//       style={{
//         border: "1px solid #e5e7eb",
//         padding: "16px",
//         margin: "8px",
//       }}
//     >
//       <div className="relative w-full h-56 md:h-64 bg-gray-100">
//         {product.productImage && product.productImage[0] ? (
//           <CldImage
//             src={product.productImage[0].public_id}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="object-cover w-full h-full"
//           />
//         ) : (
//           <Image
//             src="/placeholder.png" // Fallback image path
//             alt="Placeholder Image"
//             width={500}
//             height={500}
//             className="object-cover w-full h-full"
//           />
//         )}
//       </div>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold text-gray-800 truncate">
//           {product.name}
//         </h2>
//         <p className="text-sm text-gray-600 mt-2">
//           <strong>Brand:</strong> {product.brand}
//         </p>
//         <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//           {product.description}
//         </p>
//         <div className="mt-2">
//           <p className="flex items-center text-lg font-medium text-blue-600">
//             <span className="text-xl font-bold mr-1 transition-transform duration-300 hover:scale-125">
//               ₨.
//             </span>
//             {product.price.toLocaleString("en-IN")}
//           </p>
//           {product.originalPrice > product.price && (
//             <div className="text-sm text-gray-500">
//               <p className="line-through">
//                 ₨. {product.originalPrice.toLocaleString("en-IN")}
//               </p>
//               <p className="text-red-500 font-semibold">percentageOff% Off</p>
//             </div>
//           )}
//         </div>
//         <button className="w-full mt-4 py-2 bg-gradient-to-bl from-orange-500 to-pink-500 hover:from-orange-700 hover:to-pink-700 text-white rounded-lg transition-colors duration-200">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;