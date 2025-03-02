"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { API_URL } from "@/utils/urls";

const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), {
  ssr: false,
});

const url = API_URL;

const HeroSection = ({ CoverImages }) => {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }));
  };

  return (
    <div className="relative text-white w-full max-w-[90vw] mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black/70 rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg text-white" />
          </div>
        )}
        renderArrowNext={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black/70 rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg text-white" />
          </div>
        )}
      >
        {CoverImages?.map((CoverImage, index) => (
          <div key={index} className="relative w-[90vw] h-[32vh] sm:h-[40vh] lg:h-[60vh] mx-auto">
            {/* Thumbnail Image */}
            {!imageLoaded[index] && (
              <Image
                src={
                  CoverImage.formats.thumbnail.url.startsWith("https://")
                    ? CoverImage.formats.thumbnail.url
                    : `${url}${CoverImage.formats.thumbnail.url}`
                }
                alt={`Thumbnail ${index + 1}`}
                width={900}
                height={400}
                className="w-full h-full object-cover blur-md"
                priority
              />
            )}

            {/* Main Image */}
            <Image
              src={
                CoverImage.url.startsWith("https://") ? CoverImage.url : `${url}${CoverImage.url}`
              }
              alt={`Cover Image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
              style={{ objectFit: "cover" }} // ✅ Fixed objectFit issue
              className={`w-full h-full transition-opacity duration-500 ${
                imageLoaded[index] ? "opacity-100" : "opacity-0"
              }`}
              priority
              onLoad={() => handleImageLoad(index)}
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
