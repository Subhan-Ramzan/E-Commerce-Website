"use client"; // Ensure this component is treated as a client-side component

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import dynamic from "next/dynamic";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Image from "next/image";

// Dynamically import Carousel with ssr: false to avoid SSR issues
const CarouselWithNoSSR = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

/**
 * Cloudinary Image Optimizer
 * Ye function Cloudinary ke URLs ko optimize karta hai
 */
const getCloudinaryURL = (imageUrl, width = 800, height = 600) => {
  if (!imageUrl) return "/default-thumbnail.jpg"; // Default image
  return imageUrl.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill/`
  );
};

/**
 * ProgressiveCarouselImage:
 * Placeholder thumbnail dikhata hai pehle, phir high-res image load hone par replace hoti hai.
 */
const ProgressiveCarouselImage = ({ image, alt, containerClass, imageClass }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const mainImage = getCloudinaryURL(image?.url);
  const placeholderImage = getCloudinaryURL(image?.formats?.thumbnail?.url, 100, 100);

  return (
    <div className={`relative ${containerClass}`}>
      {/* Placeholder Thumbnail */}
      {!imageLoaded && (
        <Image
          src={placeholderImage}
          alt={alt}
          fill
          className={`${imageClass} blur-md object-cover`}
        />
      )}
      {/* Main Image */}
      <Image
        src={mainImage}
        alt={alt}
        fill
        className={`${imageClass} transition-opacity ${imageLoaded ? "opacity-100" : "opacity-0"} object-cover`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

/**
 * ProgressiveThumbnailImage:
 * Thumbnail ke liye bhi pehle low-res image dikhata hai, phir high-res load hoti hai.
 */
const ProgressiveThumbnailImage = ({ image, alt, containerClass, imageClass, isFirstImage }) => {
  const [thumbLoaded, setThumbLoaded] = useState(false);

  const mainImage = getCloudinaryURL(image?.url, 100, 100);
  const placeholderImage = getCloudinaryURL(image?.formats?.thumbnail?.url, 50, 50);

  return (
    <div className={`relative ${containerClass}`}>
      {!thumbLoaded && (
        <Image
          src={placeholderImage}
          alt={alt}
          fill
          className={`${imageClass} blur-md object-cover`}
        />
      )}
      <Image
        src={mainImage}
        alt={alt}
        fill
        priority={isFirstImage}
        className={`${imageClass} transition-opacity ${thumbLoaded ? "opacity-100" : "opacity-0"} object-cover`}
        onLoad={() => setThumbLoaded(true)}
      />
    </div>
  );
};

const ProductDetail = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="relative">
        {/* Main Carousel */}
        <CarouselWithNoSSR
          selectedItem={selectedIndex}
          onChange={handleOnChange}
          showThumbs={false}
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
          {images?.map((image, index) => (
            <div key={index} className="flex justify-center">
              <ProgressiveCarouselImage
                image={image}
                alt={`Product Image ${index + 1}`}
                containerClass="w-[70vh] md:h-[70vh] h-[50vh]"
                imageClass="rounded-t-lg object-cover"
                isFirstImage={index === 0}
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
            onClick={() => setSelectedIndex(index)}
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
