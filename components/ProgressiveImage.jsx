"use client";
import React, { useState } from "react";
import Image from "next/image";
import { API_URL } from "@/utils/urls";

const ProgressiveImage = ({
  lowQualitySrc,
  highQualitySrc,
  alt,
  className = "",
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const url = API_URL

  return (
    <div className="relative w-full h-full">
      {/* Low Resolution Image */}
      <Image
        src={`${url}${lowQualitySrc}`}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        objectFit="cover"
        className={`absolute top-0 left-0 transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
      {/* High Resolution Image */}
      <Image
        src={`${url}${highQualitySrc}`}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        objectFit="cover"
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
