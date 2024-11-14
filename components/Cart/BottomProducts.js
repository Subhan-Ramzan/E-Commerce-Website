import React from 'react';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

export default function BottomProducts({ relatedProducts }) {
  const router = useRouter();

  return (
    <div className="bg-gray-50 py-8 my-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-950 text-center mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {relatedProducts.length === 0 ? (
            <div className="text-center col-span-full text-gray-600 text-lg font-medium">
              No related products found.
            </div>
          ) : (
            relatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/cart/${product._id}`)}
                className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <CldImage
                  src={product.productImage[0].public_id}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-3 truncate w-full text-center">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Rs. {product.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
