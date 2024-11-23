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

  const handleOnChange = (e) => setSelectedCategory(e.target.value);

  const logoutHandler = async () => {
    try {
      await axios.post("/api/logout");
      setUserData(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.log("Logout Error:", err);
      toast.error("Logout failed, please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/protected", { withCredentials: true });
        setUserData(response.data.user);
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    };

    if (status === "unauthenticated" && !userData) {
      fetchUserData();
    }
  }, [status, userData, router]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg z-50 transform transition-transform duration-500 ${handleFaBar ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header with Close Icon */}
      <div className="flex justify-end p-4">
        <IoClose
          className="text-3xl cursor-pointer transition-transform duration-300 hover:text-red-500 hover:scale-110"
          aria-label="Close Sidebar"
          onClick={toggleFaBar}
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-6 px-6 mt-4">
        <li><Link href="/profile" className="hover:text-orange-400">Profile</Link></li>
        <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
        <li>
          <Link href="/about" onClick={(e) => { e.preventDefault(); window.open('https://subhanportfolio.vercel.app', '_blank'); }} className="hover:text-orange-400">
            About
          </Link>
        </li>
        <li><Link href="https://wa.me/+923250826305" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">Contact</Link></li>
        <li><Link href="/all-products" className="hover:text-orange-400">All Products</Link></li>

        {/* Authentication Actions */}
        {status === "authenticated" || userData ? (
          <>
            <li className="text-white">Hello, {session?.user?.name || userData.username || session?.user?.email?.split(/(?=\d)/)[0]}</li>
            <li>
              <button
                onClick={async () => { await signOut(); await logoutHandler(); }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}

        {/* Category Selection Dropdown */}
        {/* <li>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleOnChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring focus:ring-orange-500 w-full transition duration-300"
            aria-label="Select Category"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </li> */}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default FaBar;
