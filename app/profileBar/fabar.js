//app/profileBar/fabar.js
import React, { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const FaBar = ({ toggleFaBar, setProductTroll }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };

  return (
    <>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <h3
            onClick={() => setProductTroll(true)}
            className="font-medium text-2xl hover:text-blue-700 py-2 cursor-pointer"
          >
            All Product
          </h3>
        </li>
        <li>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black"
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
      <div>
        <IoClose
          className={`text-2xl text-white cursor-pointer transition-transform duration-300 ease-in-out hover:text-red-500 hover:scale-110`}
          onClick={toggleFaBar}
        />
      </div>
    </>
  );
};

export default FaBar;
