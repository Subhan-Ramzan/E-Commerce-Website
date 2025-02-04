"use client"; // Ensure this component is treated as a client-side component

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import dynamic from "next/dynamic";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Image from "next/image";
import { API_URL } from "@/utils/urls";

// Dynamically import Carousel with ssr: false to avoid SSR issues
const CarouselWithNoSSR = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);
const url = API_URL

/**
 * ProgressiveCarouselImage:
 * Pehle low-res thumbnail (formats.thumbnail.url) show karta hai,
 * phir high-res image (url) load hote hi uski jagah le leta hai.
 *
 * containerClass aur imageClass se styling same rakhi gayi hai.
 */
const ProgressiveCarouselImage = ({ image, alt, containerClass, imageClass }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Agar placeholder available na ho to default thumbnail use karo.
  const placeholderImage =
    image?.formats?.thumbnail?.url || "/default-thumbnail.jpg";
  const mainImage = image?.url;
  return (
    <div className={`relative ${containerClass}`}>
      {/* Placeholder Thumbnail */}
      {!imageLoaded && (
        <Image
          // src={`${url}${placeholderImage}`}
          src={placeholderImage}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={`${imageClass} blur-md`}
        />
      )}
      {/* Main Thumbnail */}
      {mainImage && (
        <Image
          // src={`${url}${mainImage}`}
          src={mainImage}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={`${imageClass} transition-opacity ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
};

/**
 * ProgressiveThumbnailImage:
 * Isi tarah thumbnail ke liye bhi placeholder pehle dikhata hai,
 * phir main image load hone par use show karta hai.
 */
const ProgressiveThumbnailImage = ({ image, alt, containerClass, imageClass }) => {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const placeholderImage =
    image?.formats?.thumbnail?.url || "/default-thumbnail.jpg";
  const mainImage = image?.url;

  return (
    <div className={`relative ${containerClass}`}>
      {!thumbLoaded && (
        <Image
          // src={`${url}${placeholderImage}`}
          src={placeholderImage}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={`${imageClass} blur-md`}
        />
      )}
      {mainImage && (
        <Image
          // src={`${url}${mainImage}`}
          src={mainImage}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={`${imageClass} transition-opacity ${thumbLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setThumbLoaded(true)}
        />
      )}
    </div>
  );
};

const ProductDetail = ({ images, thumbnail }) => {
  // State to track the current slide index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide change event
  const handleOnChange = (index) => {
    setSelectedIndex(index);
  };

  // Agar aap API URL use karna chahte hain, to yahaan add kar sakte hain
  // const url = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="relative">
        {/* Main Carousel */}
        <CarouselWithNoSSR
          selectedItem={selectedIndex}
          onChange={handleOnChange}
          infiniteLoop={true}
          showIndicators={false}
          thumbWidth={60}
          className="productCarousel"
          renderArrowPrev={(clickHandler, hasPrev, label) => (
            <button
              onClick={clickHandler}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full opacity-70 hover:opacity-100 transition duration-300 z-10"
              aria-label={label}
              disabled={!hasPrev}
            >
              <RiArrowLeftSLine size={24} />
            </button>
          )}
          renderArrowNext={(clickHandler, hasNext, label) => (
            <button
              onClick={clickHandler}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full opacity-70 hover:opacity-100 transition duration-300 z-10"
              aria-label={label}
              disabled={!hasNext}
            >
              <RiArrowRightSLine size={24} />
            </button>
          )}
        >
          {/* Main Images */}
          {images?.map((image, index) => (
            <div key={index} className="flex justify-center">
              <ProgressiveCarouselImage
                image={image}
                alt={`Product Image ${index + 1}`}
                containerClass="w-[70vh] md:h-[70vh] h-[50vh]"
                imageClass="rounded-t-lg object-cover"
              />
            </div>
          ))}
        </CarouselWithNoSSR>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center mt-4 gap-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)} // Change the slide on thumbnail click
            className={`border-2 ${selectedIndex === index ? "border-white" : "border-transparent"
              } p-1 rounded-md hover:border-white transition`}
          >
            <div className="relative w-[60px] h-[60px]">
              <ProgressiveThumbnailImage
                image={image}
                alt={`Thumbnail ${index + 1}`}
                containerClass="w-[60px] h-[60px]"
                imageClass="rounded-md object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
