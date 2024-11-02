import React, { useState } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

const FaBar = ({ toggleFaBar, handleFaBar }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${handleFaBar ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Close Icon */}
      <div className="flex justify-end p-4">
        <IoClose
          className="text-3xl text-white cursor-pointer transition-transform duration-300 ease-in-out hover:text-red-500 hover:scale-110"
          onClick={toggleFaBar}
        />
      </div>

      {/* Links */}
      <ul className="flex flex-col space-y-6 px-6 mt-4">
        <li><Link href="/profile" className="transition-colors duration-300 hover:underline hover:text-orange-400">Profile</Link></li>
        <li><Link href="/" className="transition-colors duration-300 hover:underline hover:text-orange-400">Home</Link></li>
        <li><Link href="/about" className="transition-colors duration-300 hover:underline hover:text-orange-400">About</Link></li>
        <li><Link href="/contact" className="transition-colors duration-300 hover:underline hover:text-orange-400">Contact</Link></li>
        <li><Link href="/logout" className="transition-colors duration-300 hover:underline hover:text-orange-400">Logout</Link></li>
        <li><Link href="/all-products" className="transition-colors duration-300 hover:underline hover:text-orange-400">All Products</Link></li>

        {/* Category Dropdown */}
        <li>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleOnChange}
            className="mt-4 p-2 bg-gray-700 border border-gray-500 rounded text-white focus:outline-none focus:ring focus:ring-orange-500 transition-colors duration-300"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

export default FaBar;
