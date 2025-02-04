"use client"; // This marks this component as a Client Component

import React from "react";
import dynamic from "next/dynamic";  // Dynamic import for the Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { API_URL } from "@/utils/urls";

// Dynamically import Carousel component with SSR disabled
const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), {
  ssr: false,
});

const url = API_URL;

const HeroSection = ({ CoverImages }) => {
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
        {/* Dynamically render the images */}
        {CoverImages?.map((CoverImage, index) => (
          <div key={index} className="relative">
            <Image
              src={`${CoverImage.url}`}
              // src={`${url}${CoverImage.url}`} // Assuming each image object has a `url` field
              alt={`Cover Image ${index + 1}`}
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
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
