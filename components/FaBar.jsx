"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FaBar = ({ toggleFaBar, handleFaBar }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userData, setUserData] = useState(null);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
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
    const fetchCookieData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.log("Failed to fetch protected data:", error);
      }
    };

    if (status === "unauthenticated" && !userData) {
      fetchCookieData();
    }
  }, [status, userData, router]);

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
        <li><Link href="/all-products" className="transition-colors duration-300 hover:underline hover:text-orange-400">All Products</Link></li>

        {/* Conditional rendering for login/signup/logout */}
        {status === "authenticated" || userData ? (
          <>
            <li className="text-white">
              Welcome,{" "}
              {session?.user?.name || userData.username || session?.user?.email?.split(/(?=\d)/)[0]}
            </li>
            <li>
              <button
                onClick={async () => {
                  await signOut();
                  await logoutCookies();
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link href="/login" className="transition-colors duration-300 hover:underline hover:text-orange-400">Login</Link></li>
            <li>
              <Link href="/signup">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  Sign up
                </button>
              </Link>
            </li>
          </>
        )}

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
      <ToastContainer />
    </div>
  );
};

export default FaBar;
