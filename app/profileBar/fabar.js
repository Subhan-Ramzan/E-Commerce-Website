import React, { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const FaBar = ({ toggleFaBar, setProductTroll }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };
  const handleLoader = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
    }, 1500);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out">
      <div className="flex justify-end p-4">
        <IoClose
          className="text-3xl cursor-pointer transition-transform duration-300 ease-in-out hover:text-red-500 hover:scale-110"
          onClick={toggleFaBar}
        />
      </div>
      <ul className="flex flex-col space-y-4 px-6 mt-4">
        <li>
          <Link
            href="/"
            className="transition-colors duration-300 hover:underline hover:text-orange-400"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors duration-300 hover:underline hover:text-orange-400"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="transition-colors duration-300 hover:underline hover:text-orange-400"
          >
            Contact
          </Link>
        </li>
        <li>
          {loading ? (
            <div className="flex flex-col justify-center items-center mt-4">
              {/* Loader Circle */}
              <div className="loader-circle h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              {/* Optional Message */}
              <p className="text-gray-600 font-medium mt-4">
                Loading products, please wait...
              </p>
            </div>
          ) : (
            <h3
              onClick={() => {
                setProductTroll(true);
                handleLoader();
              }}
              className="font-medium text-xl hover:text-blue-400 py-2 cursor-pointer transition-colors duration-300"
            >
              Show All Products
            </h3>
          )}
        </li>
        <li>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleOnChange}
            className="mt-2 p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring focus:ring-orange-500 transition-colors duration-300"
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
