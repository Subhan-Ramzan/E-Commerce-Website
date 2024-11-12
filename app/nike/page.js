// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion"; // Use framer-motion for advanced animations
// import { CldImage } from "next-cloudinary";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";

// export default function MyPage() {
//   const [product, setProduct] = useState(null);
//   const router = useRouter();
//   const params = useParams();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [shouldRunEffect, setShouldRunEffect] = useState(false);
//   const productId = params?.productId;

//   useEffect(() => {
//     if (productId) {
//       const fetchProductDetails = async () => {
//         try {
//           const response = await fetch(`/api/uploadProduct/${productId}`);
//           const data = await response.json();
//           setProduct(data);
//         } catch (error) {
//           console.error("Error fetching product details:", error);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [productId]);

//   const handleThumbnailClick = (index) => {
//     console.log("Thumbnail clicked:", index); // To debug if the correct index is being passed
//     setCurrentImageIndex(index);
//   };

//   // Navigate to the next image
//   const handleNext = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product.productImage.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Navigate to the previous image
//   const handlePrevious = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.productImage.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     // This useEffect will run only when currentImageIndex changes
//     setShouldRunEffect(true); // Set the flag to true when index changes
//     console.log("Current Image Index changed:", currentImageIndex);
//   }, [currentImageIndex]);

//   return (
//     <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
//       {/* Carousel that displays the current image */}
//       <Carousel>
//         <CarouselContent>
//           {product.productImage?.length > 0 ? (
//             product.productImage.map((image, index) => (
//               <CarouselItem key={index}>
//                 {index === currentImageIndex && shouldRunEffect ? (
//                   <motion.div
//                     className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
//                     whileHover={{ rotateY: 15 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <CldImage
//                       src={image.public_id}
//                       alt={product.name}
//                       width={400}
//                       height={300}
//                       className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
//                     />
//                   </motion.div>
//                 ) : (
//                   /* Show this item if index does not match currentImageIndex or shouldRunEffect is false */
//                   <motion.div
//                     className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
//                     whileHover={{ rotateY: 15 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <CldImage
//                       src={image.public_id}
//                       alt={product.name}
//                       width={400}
//                       height={300}
//                       className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
//                     />
//                   </motion.div>
//                 )}
//               </CarouselItem>
//             ))
//           ) : (
//             <CarouselItem>
//               <Image
//                 src="/placeholder.png"
//                 alt="Placeholder Image"
//                 width={300}
//                 height={300}
//                 className="object-cover w-full h-full rounded-lg"
//               />
//             </CarouselItem>
//           )}
//         </CarouselContent>
//         {/* Carousel Navigation Controls */}
//         <CarouselPrevious onClick={handlePrevious} />
//         <CarouselNext onClick={handleNext} />
//       </Carousel>

//       {/* Thumbnail Navigation */}
//       <div className="flex mt-3 p-1 space-x-2">
//         {product.productImage.map((image, index) => (
//           <div
//             key={index}
//             className={`w-12 h-12 cursor-pointer ${
//               index === currentImageIndex ? "border-2 border-gray-500" : ""
//             }`}
//             onClick={() => handleThumbnailClick(index)}
//             onMouseEnter={() => handleThumbnailClick(index)}
//           >
//             <CldImage
//               src={image.public_id}
//               alt={`Thumbnail ${index}`}
//               width={48}
//               height={48}
//               className="object-fill h-12 w-12 rounded-md"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// //     <div className="flex h-[80vh] justify-center items-center p-4">
// //       <Carousel>
// //         <CarouselContent>
// //           <CarouselItem>1</CarouselItem>
// //           <CarouselItem>2</CarouselItem>
// //           <CarouselItem>3</CarouselItem>
// //         </CarouselContent>
// //         <CarouselPrevious />
// //         <CarouselNext />
// //         <div className="flex mt-3 p-1 space-x-2">
// //             {product.productImage.map((image, index) => (
// //               <div
// //                 key={index}
// //                 className={`w-12 h-12 cursor-pointer ${
// //                   index === currentImageIndex ? "border-2 border-gray-500" : ""
// //                 }`}
// //                 onClick={() => handleThumbnailClick(index)}
// //                 onMouseEnter={() => handleThumbnailClick(index)}
// //               >
// //                 <CldImage
// //                   src={image.public_id}
// //                   alt={`Thumbnail ${index}`}
// //                   width={48}
// //                   height={48}
// //                   className="object-fill h-12 w-12 rounded-md"
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //       </Carousel>
// //     </div>

<div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
  {/* Carousel that displays the current image */}
  <Carousel>
    <CarouselContent>
      {product?.productImage?.length > 0 ? (
        <CarouselItem>
          <motion.div
            className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
            whileHover={{ rotateY: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <CldImage
              src={product.productImage[currentImageIndex].public_id}
              alt={product.name}
              width={400}
              height={300}
              className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
            />
          </motion.div>
        </CarouselItem>
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
    {product?.productImage?.map((image, index) => (
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
          className="object-fill h-12 w-12 rounded-md"
        />
      </div>
    ))}
  </div>
</div>;
