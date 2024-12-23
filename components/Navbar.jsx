// components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import FaBar from "./FaBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldImage } from "next-cloudinary";
const Navbar = ({ isOpen, onToggle }) => {
  const { data: session, status } = useSession();
  const [handleFaBar, setHandleFaBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [publicId, setPublicId] = useState(null);


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
  const logoutCookies = async () => {
    try {
      await axios.post("/api/logout");
      setUserData(null);
      toast.success("Logout successful!"); // Notify successful logout
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("Logout failed. Please try again."); // Notify error on logout
    }
  };
  useEffect(() => {
    console.log("status:", status); // Debugging line
    console.log("userData:", userData); // Debugging line

    const fetchCookieData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });
        setUserData(response.data.user);
        const user = response.data.user;
        const id = user.id;

        if (id) {
          const imageResponse = await axios.get(`/api/profileimage/${id}`);
          setPublicId(imageResponse.data.public_id);
        } else {
          console.log("No user ID found; skipping profile image fetch");
        }
      } catch (error) {
        console.log("Failed to fetch protected data:", error);
        setUserData(null);
        console.log("User data set to null due to fetch error");
      }
    };

    if (status === "unauthenticated" && userData === null) {
      fetchCookieData();
    }
  }, [status, userData, router]);


  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]); // Clear suggestions if input is empty
    } else {
      // List of products for suggestions
      const productList = [
        // Women's Clothing
        "Abaya", "Hijab", "Shawl", "Stole", "Burqa", "Chaddar", "Kaftan",
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
    <div className="fixed top-0 left-0 w-full z-10 bg-slate-900 items-center">
      <div className="relative flex h-16 w-full items-center px-6 py-2 text-white justify-between">

        <Link href="/">
          <div>
            <span className="relative group text-white text-lg md:text-2xl font-semibold hover:animate-spin transition-colors duration-300 transform hover:scale-110">
              <span className="text-blue-500">&lt;</span>
              <span className="text-white group-hover:rotate-45 transition-transform duration-500">
                New
              </span>
              <span className="text-blue-500 group-hover:text-blue-900 group-hover:rotate-45 transition-all duration-1000">
                Fashion/&gt;
              </span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex">
          <ul className="list-none flex px-2 lg:px-4 space-x-3 lg:space-x-8">
            <li className="hover:text-blue-500">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link href="/about" onClick={(e) => {
                e.preventDefault(); // Prevent default behavior
                window.open('https://subhanportfolio.vercel.app', '_blank'); // Open the URL in a new tab
              }}>
                About
              </Link>
            </li>

            <li className="hover:text-blue-500">
              <Link href="https://wa.me/+923250826305" target="_blank" rel="noopener noreferrer">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-full overflow-hidden shadow-lg transition-transform duration-300 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          >
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[30vw] md:w-full px-3 py-2 outline-none text-black placeholder-gray-500 transition-all duration-300 ease-in-out text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 p-1.5 sm:p-2.5 md:p-3 rounded-r-full text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-[38px] h-[34px] md-w-[40px] md:h-[40px] "// Fixed icon button size
            >
              <FaSearch className="text-xs sm:text-sm md:text-base" /> {/* Adjusting icon size */}
            </button>
          </form>

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300 opacity-100 z-50">
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
        <div className="flex items-center space-x-4 justify-between">
          <div className="max-md:hidden ">
            {status === "authenticated" || userData !== null ? (
              <Link href="/profile">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image.url || session.user.image}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover cursor-pointer"
                  />
                ) : publicId ? (
                  <CldImage
                    src={publicId}
                    alt="User Profile"
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
          </div>

          {/* Cart icon - Always visible */}
          <Link href="/cart" className="max-md:hidden ">
            <div className="text-xl md:text-2xl relative cursor-pointer">
              <FaShoppingCart />
              {status === "authenticated" || userData !== null ? (
                <>
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">0</p>
                  </div>
                </>
              ) : (
                <>
                </>
              )}
              {/* Assuming you want to show the cart item count */}
            </div>
          </Link>

          {/* Conditional rendering for login/signup or logout - Hidden on max-md */}
          <div className="max-md:hidden flex items-center space-x-4">
            {status === "authenticated" || userData !== null ? (
              <>
                <p className="text-white">
                  Welcome,{" "}
                  {session?.user?.name ||
                    userData.username ||
                    session?.user?.email?.split(/(?=\d)/)[0]}
                </p>
                <button
                  onClick={async () => {
                    await signOut();
                    await logoutCookies();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-blue-500 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>

          <div>
            {isOpen ? (
              ""
            ) : (
              <button
                onClick={onToggle}
                className="flex items-center text-white rounded-full shadow-lg transition-all duration-300" >
                {isOpen ? (
                  className = "flex items-center rounded-full shadow-lg ransition-all duration-300"
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar 
        {/* {handleFaBar && (
          <div
            className={`flex justify-between fixed top-3 bottom-3 w-64 min-h-[96vh] px-6 py-4 right-2 bg-gray-900 text-white transition-all duration-300 ease-out rounded-2xl shadow-xl z-50 ${handleFaBar ? "translate-x-0" : "translate-x-full"
              }`}
            style={{
              transitionProperty: "transform, opacity",
              opacity: handleFaBar ? 1 : 0,
            }}
          >
            {/* Sidebar Content
            <FaBar toggleFaBar={toggleFaBar} handleFaBar={handleFaBar} />
          </div>
        )} */}

      </div >
      <ToastContainer />
    </div >
  );
};

export default Navbar;
