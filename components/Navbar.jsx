// components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import FaBar from "./FaBar";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [handleFaBar, setHandleFaBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const toggleFaBar = () => {
    setHandleFaBar(!handleFaBar);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]); // Clear suggestions if input is empty
    } else {
      // List of products for suggestions
      const productList = [
        // Women's Clothing
        "Abaya", "Hijab", "Shawl", "Stole", "Burqa", "Cheddar", "Kaftan",
        "Kimono", "Jilbab", "Poncho", "Chador", "Kurta", "Shalwar",
        "Kameez", "Pashmina", "Rida", "Dupatta", "Chunni", "Lungi",
        "Sarong", "Caftan", "Niqab", "Manteau", "Gilets", "Bisht",
        "Blouse", "Cardigan", "Sweater", "Vest", "Wrap", "Robe",
        // Men's Clothing
        "Kufi", "Ghutra", "Izaar", "Taqiyah", "Thobe", "Jubbah",
        "Shalwar Kameez", "Kurta", "Pants", "Trousers", "Jacket",
        "Bisht", "Kaftan", "Lungi", "T-shirt", "Hoodie", "Jeans",
        "Shorts", "Sweatpants", "Blazer", "Overcoat", "Chinos",
        // Kids' Clothing
        "Kids Abaya", "Kids Hijab", "Kids Kurta", "Kids Kameez",
        "Kids T-shirt", "Kids Dress", "Kids Shorts", "Kids Pants",
        "Kids Hoodie", "Kids Sweater", "Kids Jacket", "Kids Pajamas",
        "Kids Skirt", "Kids Romper", "Kids Tracksuit", "Kids Cap",
        // Footwear
        "Sandals", "Flats", "Heels", "Loafers", "Sneakers", "Boots",
        "Ballet Flats", "Slippers", "Wedges", "Flip Flops", "Formal Shoes",
        // Accessories
        "Bags", "Belts", "Sunglasses", "Watches", "Jewelry", "Scarves",
        "Hair Accessories", "Wallets", "Backpacks", "Tote Bags"
      ];

      const filteredSuggestions = productList.filter((product) =>
        product.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm]);

  return (
    <div className="relative flex h-20 md:h-16 w-full bg-slate-900 items-center px-6 py-2 text-white justify-between">
      <Link href="/">
        <Image
          src="/favicon.png" // Replace with your actual logo image source
          alt="logo"
          width={50} // Adjusted width
          height={10} // Adjusted height
          className="cursor-pointer object-cover rounded-full min-sm:w-16 min-sm:h-16 min-md:w-20 min-md:h-20"
        />
      </Link>

      <div className="hidden md:flex">
        <ul className="list-none flex px-2 lg:px-4 space-x-3 lg:space-x-8">
          <li className="hover:text-gray-400">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/about" onClick={(e) => {
              e.preventDefault(); // Prevent default behavior
              window.open('https://websubhan.vercel.app', '_blank'); // Open the URL in a new tab
            }}>
              About
            </Link>
          </li>

          <li className="hover:text-gray-400">
            <Link href="https://wa.me/+923250826305" target="_blank" rel="noopener noreferrer">
              Contact
            </Link>
          </li>

        </ul>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearch} className="flex items-center rounded-full overflow-hidden shadow-md transition-transform duration-300">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 outline-none text-black placeholder-gray-500 transition-all duration-300 ease-in-out"
          />
          <button type="submit" className="bg-blue-600 p-3 rounded-r-full text-white hover:bg-blue-700 transition-colors duration-300">
            <FaSearch />
          </button>
        </form>

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300 opacity-100 transform scale-100 animate-fadeIn">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(suggestion);
                  window.location.href = `/search?query=${encodeURIComponent(suggestion)}`;
                }}
                className="p-3 cursor-pointer text-black hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="max-md:hidden flex items-center space-x-4 justify-between">
        <div className="relative flex items-center">
          <Link href="/profile">
            <FaRegCircleUser className="text-2xl md:text-3xl cursor-pointer" />
          </Link>
        </div>
        {/* <div className="relative flex items-center">
          {status === "authenticated" ? (
            <Link href="/profile">
              {session.user.image ? (
                <Image
                  src={session.user.image.url || session.user.image}
                  alt="User Profile"
                  layout="responsive"
                  width={40}
                  height={40}
                  className="rounded-full object-cover cursor-pointer"
                />
              ) : (
                <FaRegCircleUser className="text-2xl md:text-3xl cursor-pointer" />
              )}
            </Link>
          ) : (
            <Link href="/login">
              <FaRegCircleUser className="text-2xl md:text-3xl cursor-pointer" />
            </Link>
          )}
        </div> */}

        <Link href="/cart">
          <div className="text-xl md:text-2xl relative cursor-pointer">
            <FaShoppingCart />
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p> {/* Assuming you want to show the cart item count */}
            </div>
          </div>
        </Link>

        {status === "authenticated" ? (
          <>
            <p>Welcome, {session.user.name || session.user.email.split(/(?=\d)/)[0]}</p>
            <button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className="hover:text-blue-700 transition duration-300 max-md:bg-gradient-to-r from-purple-500 to-blue-500 max-md:hover:from-purple-700 max-md:hover:to-blue-700 max-md:text-white max-md:font-bold max-md:py-2 max-md:px-3 rounded-lg max-sm:font-medium">
                Login
              </span>
            </Link>
            <Link href="/signup">
              <button className="max-md:hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-2 py-1 lg:py-2 lg:px-4 rounded-lg">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>

      <div onClick={toggleFaBar} className="md:hidden">
        <FaBars className="text-2xl" />
      </div>
      {handleFaBar && (
        <div
          className={`flex justify-between fixed w-64 top-3 bottom-3 min-h-[96vh] px-6 py-4 right-2 ${handleFaBar ? "translate-x-0" : "translate-x-full"
            } bg-gray-900 text-white transform transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}
        >
          <FaBar toggleFaBar={toggleFaBar} handleFaBar={handleFaBar} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
