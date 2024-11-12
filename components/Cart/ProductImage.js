// components/ProductImage.js
"use client"
import React, { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
const ProductImage = ({ product, currentImageIndex, setCurrentImageIndex, shouldRunEffect }) => {
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.productImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.productImage.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
      <Carousel>
        <CarouselContent>
          {product.productImage?.length > 0 ? (
            product.productImage.map((image, index) => (
              <CarouselItem key={index}>
                {index === currentImageIndex && shouldRunEffect ? (
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
                ) : (
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
                )}
              </CarouselItem>
            ))
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
        {product.productImage.map((image, index) => (
          <div
            key={index}
            className={`w-12 h-12 cursor-pointer ${index === currentImageIndex ? "border-2 border-gray-500" : ""}`}
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
  );
};

export default ProductImage;
