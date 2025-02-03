"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm); // Call onSearch passed from parent
    }
  };

  // Handle search term changes and filter suggestions
  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      const productList = [
        "Abaya", "Hijab", "Shawl", "Stole", "Burqa", "Chaddar", "Kaftan",
        "Kimono", "Jilbab", "Poncho", "Chador", "Kurta", "Shalwar",
        "Kameez", "Pashmina", "Rida", "Dupatta", "Chunni", "Lungi",
        "Sarong", "Caftan", "Niqab", "Manteau", "Gilets", "Bisht",
        "Blouse", "Cardigan", "Sweater", "Vest", "Wrap", "Robe",
        "Kufi", "Ghutra", "Izaar", "Taqiyah", "Thobe", "Jubbah", "Shalwar Kameez",
        "Kurta", "Pants", "Trousers", "Jacket", "Bisht", "Kaftan", "Lungi", "T-shirt",
        "Hoodie", "Jeans", "Shorts", "Sweatpants", "Blazer", "Overcoat", "Chinos",
        "Kids Abaya", "Kids Hijab", "Kids Kurta", "Kids Kameez", "Kids T-shirt",
        "Kids Dress", "Kids Shorts", "Kids Pants", "Kids Hoodie", "Kids Sweater",
        "Kids Jacket", "Kids Pajamas", "Kids Skirt", "Kids Romper", "Kids Tracksuit", "Kids Cap",
        "Sandals", "Flats", "Heels", "Loafers", "Sneakers", "Boots", "Ballet Flats",
        "Slippers", "Wedges", "Flip Flops", "Formal Shoes", "Bags", "Belts", "Sunglasses",
        "Watches", "Jewelry", "Scarves", "Hair Accessories", "Wallets", "Backpacks", "Tote Bags"
      ];

      const filteredSuggestions = productList.filter((product) =>
        product.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm]);

  // Control scroll behavior similar to the navbar logic
  const controlSearchBar = useCallback(() => {
    if (window.scrollY > 0) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]"); // Hide on scroll down
      } else {
        setShow("shadow-sm"); // Show with shadow on scroll up
      }
    } else {
      setShow("translate-y-0"); // Reset position when scrolled to top
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]); // Memoize based on `lastScrollY`

  useEffect(() => {
    window.addEventListener("scroll", controlSearchBar);
    return () => {
      window.removeEventListener("scroll", controlSearchBar);
    };
  }, [controlSearchBar]); // Only depend on controlSearchBar


  return (
    <div
      className={`fixed top-[70px] left-0 w-full z-20 shadow-sm transition-transform duration-300 ${show} lg:hidden`}
    >
      <form
        onSubmit={handleSearch}
        className="flex items-center rounded-full overflow-hidden mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 outline-none text-black bg-slate-100 placeholder-gray-500 transition-all duration-300 ease-in-out text-sm md:text-base"
        />
        <button
          type="submit"
          className="bg-blue-600 p-3 rounded-r-full text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-[38px] h-[34px] md:w-[40px] md:h-[40px]"
        >
          <FaSearch className="text-xs sm:text-sm md:text-base" />
        </button>
      </form>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 bg-white mt-2 w-full border border-gray-300 rounded-lg shadow-lg transition-opacity duration-300 opacity-100 z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setSearchTerm(suggestion);
                onSearch(suggestion); // Pass the selected suggestion back to parent
              }}
              className="p-3 z-50 cursor-pointer text-black hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
