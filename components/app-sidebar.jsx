"use client";

import React, { useEffect, useState } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Link from "next/link";
import Navbar from "./Navbar";
import { FaHome, FaInfoCircle, FaListAlt, FaPhoneAlt } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [publicId, setPublicId] = useState(null);
    const [isClient, setIsClient] = useState(false); // Prevent hydration issues

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
        setIsClient(true);
        if (session) {// Debugging line
            console.log("session:", session);
        }

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
    }, [session, status, userData, router]);

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

    if (!isClient) return null;

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

                        <div className="">
                            {status === "authenticated" || userData !== null ? (
                                <Link href="/profile">
                                    {session?.user?.image ? (
                                        <Image
                                            loading="lazy"
                                            src={session.user.image.url || session.user.image}
                                            alt="User Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover cursor-pointer"
                                        />
                                    ) : publicId ? (
                                        <CldImage
                                            loading="lazy"
                                            src={publicId}
                                            alt="User Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegCircleUser className="text-3xl md:text-3xl cursor-pointer" />
                                    )}
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <FaRegCircleUser className="text-3xl md:text-3xl cursor-pointer" />
                                </Link>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {status === "authenticated" || userData !== null ? (
                                <>
                                    <p className="text-white">
                                        {session?.user?.name ||
                                            userData?.username ||
                                            session?.user?.email?.split(/(?=\d)/)[0]}
                                    </p>
                                    <p className="text-gray-400 text-sm truncate max-w-[120px]">
                                        {session?.user?.email ||
                                            userData?.email ||
                                            session?.user?.email}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-white">
                                        Guest
                                    </p>
                                </>
                            )}
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
                <div className="mt-6 flex flex-col gap-4">
                    {status === "authenticated" || userData !== null ? (
                        <button
                            onClick={async () => {
                                await signOut();
                                await logoutCookies();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col items-start gap-2">
                            <Link
                                href="/login"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-center font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
                            >
                                Sign up
                            </Link>
                        </div>

                    )}
                </div>

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
