import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard2 = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {[...Array(12)].map((_, index) => (
                <Link
                    key={index}
                    href={`/product`}
                    className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-md rounded-lg md:h-[400px] h-[300px] flex flex-col"
                >
                    <div className="flex-grow">
                        <Image
                            width={500}
                            height={500}
                            src={'/slide-2.png'}
                            alt='Product Name'
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-4 text-black/[0.9]">
                        <h2 className="text-lg font-medium">Product Name</h2>
                        <div className="flex items-center text-black/[0.5]">
                            <p className="mr-2 text-lg font-semibold">
                                &#8377;price
                            </p>
                            <p className="text-base font-medium line-through">
                                &#8377;original_price
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                Number% off
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductCard2;
