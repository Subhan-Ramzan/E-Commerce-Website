"use client"; // Ensure this component is treated as a client-side component

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import dynamic from "next/dynamic";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Importing React icons

// Dynamically import Carousel with ssr: false to avoid SSR issues
const CarouselWithNoSSR = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

const ProductDetail = () => {
  // Set state to track the current slide index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide change event
  const handleOnChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="relative">
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
          <img
            src="/p1.png"
            alt="Product Name"
            className="rounded-t-lg w-[70vh] md:h-[70vh] h-[50vh] object-cover"
          />
          <img
            src="/p2.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] md:h-[70vh] h-[50vh] object-cover"
          />
          <img
            src="/p3.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] md:h-[70vh] h-[50vh] object-cover"
          />
          <img
            src="/p4.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] md:h-[70vh] h-[50vh] object-cover"
          />
          <img
            src="/p5.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] md:h-[70vh] h-[50vh] object-cover"
          />
          <img
            src="/p6.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] h-[300px] object-cover"
          />
          <img
            src="/p7.png"
            alt="Product Name"
            className="rounded-t-lg w-[300px] md:h-[70vh] h-[50vh] object-cover"
          />
        </CarouselWithNoSSR>
      </div>
    </div>
  );
};

export default ProductDetail;
