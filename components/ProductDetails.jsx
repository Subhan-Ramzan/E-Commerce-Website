"use client"; // Ensure this component is treated as a client-side component

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import dynamic from "next/dynamic";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Importing React icons
import Image from "next/image";

// Dynamically import Carousel with ssr: false to avoid SSR issues
const CarouselWithNoSSR = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

const ProductDetail = ({ images, thumbnail }) => {
  // State to track the current slide index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide change event
  const handleOnChange = (index) => {
    setSelectedIndex(index);
  };

  const url = process.env.NEXT_PUBLIC_API_URL;
  // const ThumbnailImage = `${url}${thumbnail}`;
  const ThumbnailImage = `${thumbnail}`;

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
              <Image
                width={800}
                height={800}
                // src={`${url}${image?.url}`}
                src={`${image?.url}`}
                alt={`Product Image ${index + 1}`}
                className="rounded-t-lg w-[70vh] md:h-[70vh] h-[50vh] object-cover"
              />
            </div>
          ))}
        </CarouselWithNoSSR>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center mt-4 gap-2">
        {/* <Image
          width={80}
          height={80}
          src={`${url}${images[3].url}`}
          alt={`Thumbnai`}
          className="rounded-md object-cover w-[60px] h-[60px]"
        /> */}
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)} // Change the slide on thumbnail click
            className={`border-2 ${selectedIndex === index ? "border-white" : "border-transparent"
              } p-1 rounded-md hover:border-white transition`}
          >
            <Image
              width={80}
              height={80}
              // src={`${url}${image?.url}`}
              src={`${image?.url}`}
              alt={`Thumbnail ${index + 1}`}
              className="rounded-md object-cover w-[60px] h-[60px]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
