"use client";

// import React, { useEffect, useState, useCallback } from 'react'; // Import React and hooks
// import Image from 'next/image'; // Import the Image component from Next.js
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"; // Import icons

// const CoverImg = () => {
//   const Covers = [
//     'AbayaCover',
//     'ChadarCover',
//     'HijabCover',
//   ];

//   const [currentImage, setCurrentImage] = useState(0); // Initialize to 0 for the first image

//   const nextImage = useCallback(() => { 
//     setCurrentImage((prev) => (prev + 1) % Covers.length); // Loop back to the first image
//   }, [Covers.length]);

//   const prevImage = useCallback(() => { 
//     setCurrentImage((prev) => (prev - 1 + Covers.length) % Covers.length); // Loop back to the last image
//   }, [Covers.length]);

//   useEffect(() => {
//     const interval = setInterval(nextImage, 5000); // Call nextImage every 5 seconds

//     return () => clearInterval(interval); // Clear the interval on component unmount
//   }, [nextImage]); // Include nextImage in the dependency array

//   return (
//     <div className='container mx-auto px-4 rounded'>
//       <div className='h-60 md:h-[99vh] w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] relative'>
//         <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
//           <div className='flex justify-between w-full text-2xl'>
//             <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'>
//               <FaAngleLeft />
//             </button>
//             <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
//               <FaAngleRight />
//             </button>
//           </div>
//         </div>

//         {/* Desktop and tablet version */}
//         <div className='hidden md:flex h-full w-full overflow-hidden'>
//           {Covers.map((Cover, index) => (
//             <div
//               key={Cover}
//               className='w-full h-full min-w-full min-h-full transition-all'
//               style={{ transform: `translateX(-${currentImage * 100}%)` }} // Translate to the current image
//             >
//               <Image
//                 className='h-full w-full object-cover'
//                 src={`/${Cover}.png`} // Adjust path as necessary
//                 alt={Cover}
//                 fill // Replaces the layout="fill" prop
//                 style={{ objectFit: 'cover', animationDelay: `${index * 100}ms` }} // Set object-fit via style
//               />
//             </div>
//           ))}
//         </div>

//         {/* Mobile version */}
//         <div className='flex h-full w-full overflow-hidden md:hidden'>
//           {Covers.map((Cover, index) => (
//             <div
//               key={Cover}
//               className='w-full h-full min-w-full min-h-full transition-all'
//               style={{ transform: `translateX(-${currentImage * 100}%)` }} // Translate to the current image
//             >
//               <Image
//                 src={`/${Cover}.png`} // Adjust path as necessary
//                 className='w-full h-full object-cover'
//                 alt={Cover}
//                 fill // Replaces the layout="fill" prop
//                 style={{ objectFit: 'cover' }} // Set object-fit via style
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoverImg;

"use client";
import Image from "next/image";
import React, { useState, useEffect, lazy } from "react";

const images = [
  "/AbayaCover.png",
  "/Chaddar.png",
  "/Dupatta.png",
  "/GirlChadar.png",
];

const CoverImg = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      {images.map((image, index) => (
        <Image
          loading="lazy"
          width={300}
          height={300}
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
    </div>
  );
};

export default CoverImg;
