import Image from "next/image";

const products = [
    { id: 1, name: 'Product 1', price: '$50', img: '/Product/AbayaProduct.png' },
    { id: 2, name: 'Product 2', price: '$75', img: '/Product/MenProduct.png' },
    { id: 3, name: 'Product 3', price: '$100', img: '/Product/KidsProduct.png' },
    { id: 4, name: 'Product 4', price: '$120', img: '/Product/M-Shoes.jpg' },
];

export default function FeaturedProducts() {
    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                        <Image
                            loading="lazy"
                            width={100} // Adjust these values according to your image
                            height={100}
                            src={product.img}
                            alt={product.name}
                            className="w-full h-48 md:h-80 object-fill"
                            quality={100} // Set quality for better clarity
                        />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
