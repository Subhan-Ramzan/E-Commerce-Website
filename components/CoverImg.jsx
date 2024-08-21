"use client";

import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const CoverImg = () => {
  const Covers = [
    'AbayaCover',
    'ChadarCover',
    'HijabCover',
  ];
  const [currentImage, setCurrentImage] = useState(1);

  const nextImage = () => {
    if (Covers.length - 1 > currentImage) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Covers.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-[99vh] w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
            <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {Covers.map((Cover, index) => (
            <div
              key={Cover}
              className='w-full h-full min-w-full min-h-full transition-all'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                className='h-full w-full object-cover object-scale-down'
                src={`${Cover}.png`}
                alt={Cover}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            </div>
          ))}
        </div>

        {/**mobile version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
          {Covers.map((Cover, index) => (
            <div
              key={Cover}
              className='w-full h-full min-w-full min-h-full transition-all'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={`${Cover}.png`}
                className='w-full h-full object-cover'
                alt={Cover}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoverImg;
