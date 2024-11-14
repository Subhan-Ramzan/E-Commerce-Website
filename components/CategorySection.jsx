import Image from 'next/image';

const categories = [
  { id: 1, name: 'Men', img: '/Product/MenCAT.jpeg' },
  { id: 2, name: 'Women', img: '/Product/WomenCategory.jpeg' },
  { id: 3, name: 'Kids', img: '/Product/KidsCategory.jpeg' },
];

export default function CategorySection() {
  return (
    <section className="py-6">
      <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={category.img}
              alt={category.name}
              width={500} // Set appropriate width
              height={256} // Set appropriate height
              priority // Load images with priority
              className='h-32 md:h-80 object-fill w-full'
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
