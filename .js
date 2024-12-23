
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







<div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
{/* Carousel that displays the current image */}
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

  {/* Carousel Navigation Controls */}
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



















"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import io from "socket.io-client";

const socket = io("https://boggy-shadowed-plain.glitch.me"); // Backend server URL

export default function LocationComponent() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    locationName: "",
  });

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("receive-location", (data) => {
      console.log("Location received:", data);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.locationName,
      });
    });

    return () => {
      socket.off("receive-location"); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <MdLocationOn className="text-blue-500 text-3xl" />
      </div>
      <div>
        <p className="text-[12px] font-semibold">
          {location.locationName || "Fetching..."}
        </p>
      </div>
      <div>
        <Link
          href={`https://boggy-shadowed-plain.glitch.me`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 text-blue-600 font-semibold rounded-lg text-base">
            Change
          </button>
        </Link>
      </div>
    </div>
  );
}




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
