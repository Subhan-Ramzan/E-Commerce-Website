"use client";

import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaCog, FaShoppingCart, FaHeart, FaBox, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSections, setOpenSections] = useState({
        categories: true,
        filters: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className=" relative z-50">
            {/* Sidebar Toggle Button */}
            <Navbar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white w-80 z-50 p-4 pt-8 fixed top-0 left-0 h-full min-h-screen overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
                <div className="max-h-[80vh] overflow-auto">
                    {/* Profile Section */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="User Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold">John Doe</h2>
                                <p className="text-gray-400 text-sm truncate max-w-[120px]" title="johndoe@example.com">
                                    johndoe@example.com
                                </p>
                            </div>
                        </div>
                        {/* Close Icon */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-red-600 hover:text-red-700 hover:scale-105 transition-colors mt-1"
                        >
                            <FaTimes className="text-3xl" />
                        </button>
                    </div>

                    {/* Categories */}
                    <div>
                        <button
                            onClick={() => toggleSection("categories")}
                            className="w-full text-left py-3 px-4 bg-gray-800 rounded-md mb-2 hover:bg-gray-700 flex justify-between items-center transition-colors duration-300 mt-10"
                        >
                            <span>Categories</span>
                            {openSections.categories ? (
                                <FaAngleUp className="text-gray-300" />
                            ) : (
                                <FaAngleDown className="text-gray-300" />
                            )}
                        </button>
                        {openSections.categories && (
                            <div className="pl-4 space-y-2">
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    Electronics
                                </button>
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    Clothing
                                </button>
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    Home & Kitchen
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="mt-4">
                        <button
                            onClick={() => toggleSection("filters")}
                            className="w-full text-left py-3 px-4 bg-gray-800 rounded-md mb-2 hover:bg-gray-700 flex justify-between items-center transition-colors duration-300"
                        >
                            <span>Filters</span>
                            {openSections.filters ? (
                                <FaAngleUp className="text-gray-300" />
                            ) : (
                                <FaAngleDown className="text-gray-300" />
                            )}
                        </button>
                        {openSections.filters && (
                            <div className="pl-4 space-y-2">
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    Under $50
                                </button>
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    $50 - $100
                                </button>
                                <button className="w-full py-2 text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    Over $100
                                </button>
                            </div>
                        )}
                    </div>

                    {/* E-commerce Options */}
                    <div className="mt-6 space-y-2">
                        <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaShoppingCart className="mr-3" />
                            Orders
                        </button>
                        <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaHeart className="mr-3" />
                            Wishlist
                        </button>
                        <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaBox className="mr-3" />
                            Products
                        </button>
                        <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaSignOutAlt className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
                {/* Settings */}
                <div className="">
                    <div className="absolute bottom-4 left-6 w-full pr-6">
                        <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaCog className="mr-3" />
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
