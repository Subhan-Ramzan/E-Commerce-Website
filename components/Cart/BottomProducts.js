import React from 'react';
import { CldImage } from 'next-cloudinary';

export default function BottomProducts({ relatedProducts }) {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6'>
            {relatedProducts.length === 0 ? (
                <div className="text-center col-span-full">No related products found.</div>
            ) : (
                relatedProducts.map((product) => (
                    <div key={product._id} className='flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                        <CldImage src={product.productImage[0].public_id} alt={product.name} width={200} height={200} className='rounded-lg w-40 h-40 object-fill' />
                        <h1 className='text-xl font-semibold mt-3 text-gray-800'>{product.name}</h1>
                        <p className='text-sm text-gray-600 mt-1'>RS. {product.price}</p>
                    </div>
                ))
            )}
        </div>
    );
}
