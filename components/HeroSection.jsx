"use client";  // This marks this component as a Client Component

import React from "react";
import dynamic from "next/dynamic";  // Dynamic import for the Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";

// Dynamically import Carousel component with SSR disabled
const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), {
  ssr: false,
});

const HeroSection = () => {
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
        {/* Slide 1 */}
        <div className="relative">
          <Image
            src="/slide-1.png"
            alt="Slide 1"
            layout="responsive"
            width={1360}
            height={700} // Reduced height for large screens
            className="object-cover"
            priority={true}
          />
          <div className="absolute bottom-[15px] md:bottom-[30px] left-5 md:left-10 bg-white/90 text-black font-oswald text-[13px] md:text-[20px] px-4 py-2 md:px-6 md:py-3 uppercase font-medium cursor-pointer hover:opacity-80">
            Shop now
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <Image
            src="/slide-2.png"
            alt="Slide 2"
            layout="responsive"
            width={1360}
            height={700} // Reduced height for large screens
            className="object-cover"
            priority={true}
          />
          <div className="absolute bottom-[15px] md:bottom-[30px] left-5 md:left-10 bg-white/90 text-black font-oswald text-[13px] md:text-[20px] px-4 py-2 md:px-6 md:py-3 uppercase font-medium cursor-pointer hover:opacity-80">
            Shop now
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <Image
            src="/slide-3.png"
            alt="Slide 3"
            layout="responsive"
            width={1360}
            height={700} // Reduced height for large screens
            className="object-cover"
            priority={true}
          />
          <div className="absolute bottom-[15px] md:bottom-[30px] left-5 md:left-10 bg-white/90 text-black font-oswald text-[13px] md:text-[20px] px-4 py-2 md:px-6 md:py-3 uppercase font-medium cursor-pointer hover:opacity-80">
            Shop now
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;
