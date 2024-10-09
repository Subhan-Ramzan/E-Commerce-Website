import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from Next.js

const Category = () => {
  const categories = [
    'Abaya',
    'Chaddar',
    'Dupatta',
    'Hijab',
    'Niqab'
  ];

  return (
    <div className='flex m-1 justify-around flex-wrap'>
      {categories.map((category) => (
        <div key={category} className='flex flex-col items-center space-y-[2vh]'>
          <Link href={`/categories/${category.toLowerCase()}`} passHref>
            <div className='rounded-full bg-slate-100 p-2 max-sm:h-12 max-sm:w-12 h-20 w-20 md:h-28 md:w-28 overflow-hidden cursor-pointer hover:bg-slate-200'>
              <Image
                src={`/${category}.png`} // Adjust the path as necessary
                alt={category}
                width={100}               // Set width according to your design
                height={100}              // Set height according to your design
                style={{ objectFit: 'cover' }}  // Use style for object-fit
                className='rounded-full'   // Maintain the rounded shape
              />
            </div>
            <h3 className='text-center text-sm md:text-lg font-medium'>{category}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
