"use client";

import React, { useState } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Link from "next/link";
import Navbar from "./Navbar";
import { FaHome, FaInfoCircle, FaListAlt, FaPhoneAlt } from "react-icons/fa";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const data = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "About", url: "/about" },
        { id: 3, name: "Categories", subMenu: true },
        { id: 4, name: "Contact", url: "/contact" },
    ];

    const subMenuData = [
        { id: 1, name: "Jordan", doc_count: 11 },
        { id: 2, name: "Sneakers", doc_count: 8 },
        { id: 3, name: "Running shoes", doc_count: 64 },
        { id: 4, name: "Football shoes", doc_count: 107 },
    ];

    return (
        <div className="relative z-50">
            {/* Sidebar Toggle Button */}
            <Navbar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Sidebar */}
            <div
                className={`bg-gray-900 z-50 text-white w-80 fixed top-0 right-0 h-full min-h-screen p-4 shadow-lg transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* User Profile Section */}
                <div className="flex items-center z-50 justify-between gap-4 mb-6 ">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="User Profile"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">John Doe</h2>
                            <p
                                className="text-gray-400 text-sm truncate max-w-[120px]"
                                title="johndoe@example.com"
                            >
                                johndoe@example.com
                            </p>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-red-600 hover:text-red-700 hover:scale-105 transition-colors mt-1"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Menu List */}
                <ul className="mt-6">
                    {data.map((item) => (
                        <React.Fragment key={item.id}>
                            {item.subMenu ? (
                                <li
                                    className="group cursor-pointer py-4 px-5 border-b flex flex-col relative hover:bg-gray-800 transition-colors"
                                    onClick={() => setShowSubMenu(!showSubMenu)}
                                >
                                    <div className="flex justify-between items-center text-gray-300 group-hover:text-white">
                                        <div className="flex items-center gap-2">
                                            <FaListAlt size={18} />
                                            <span>{item.name}</span>
                                        </div>
                                        <div>
                                            {showSubMenu ? (
                                                <BsChevronUp size={16} />
                                            ) : (
                                                <BsChevronDown size={16} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Submenu with Smooth Transition */}
                                    <ul
                                        className={`bg-gray-700/[0.5] -mx-5 mt-4 -mb-4 rounded-md overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${showSubMenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {subMenuData.map((subItem) => (
                                            <li
                                                key={subItem.id}
                                                className="py-3 px-6 border-t border-gray-600 flex justify-between items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                            >
                                                <span>{subItem.name}</span>
                                                <span className="opacity-75 text-sm">
                                                    ({subItem.doc_count})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li className="group py-4 px-5 border-b hover:bg-gray-800 transition-colors">
                                    <Link href={item.url} className="flex items-center gap-2 text-gray-300 group-hover:text-white">
                                        {item.name === "Home" && <FaHome size={18} />}
                                        {item.name === "About" && <FaInfoCircle size={18} />}
                                        {item.name === "Contact" && <FaPhoneAlt size={18} />}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>

                {/* Footer Buttons */}
                <div className="absolute bottom-4 left-6 w-full pr-6">
                    <button className="w-full py-3 px-4 flex items-center text-left text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                        <FaCog className="mr-3" />
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
