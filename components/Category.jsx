import React from "react";
import Link from "next/link";
import Image from "next/image";

const Category = () => {
  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab", "Stoler"];

  return (
    <div className="flex flex-wrap justify-around px-2 py-4">
      {categories.map((category) => (
        <div
          key={category}
          className="group flex flex-col items-center space-y-1 sm:space-y-2 transition-all duration-300 ease-out"
        >
          <Link href={`/categories/${category.toLowerCase()}`} passHref>
            <div
              aria-label={`Navigate to ${category}`}
              className="relative rounded-full bg-slate-100 p-1 h-6 w-6 sm:h-8 sm:w-8 overflow-hidden cursor-pointer shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-purple-700"
            >
              <Image
                loading="lazy"
                src={`/${category}.png`}
                alt={category}
                fill
                sizes="(max-width: 640px) 24px, (max-width: 768px) 32px, 48px" // ✅ Added sizes prop
                style={{ objectFit: "cover" }}
                className="rounded-full group-hover:scale-110 group-hover:opacity-90 transition-transform duration-300"
              />
            </div>
          </Link>
          <h3 className="text-center text-[9px] sm:text-xs md:text-xs font-medium text-slate-900 transition-all duration-300 group-hover:text-indigo-700">
            {category}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
