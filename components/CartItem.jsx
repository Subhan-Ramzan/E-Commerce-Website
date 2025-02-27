import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API_URL, STRAPI_API_TOKEN } from "@/utils/urls";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

const CartItem = ({ data, onTotalPrice, onItemRemoved  }) => {
    const safeData = data || {};
    const { documentId, quantity } = safeData;
    const [productData, setProductData] = useState(null);
    const { data: session } = useSession();
    const Token = STRAPI_API_TOKEN;

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);
    const [cart, setCart] = useState([]);
    const [isItemRemoved, setIsItemRemoved] = useState(false);
    const prevQuantity = useRef(quantity);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setSelectedQuantity(newQuantity);
    };

    const fetchGuestId = () => {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = `guest_${new Date().getTime()}`; // Unique guest ID
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    };

    const userEmail = session?.user?.email || fetchGuestId(); // Use session email or guest ID

    // Function to remove the item from the cart
    const HandleRemoveCart = useCallback(async () => {
        try {
            const response = await axios.delete(`/api/cart`, {
                data: {
                    email: userEmail,
                    productId: documentId,
                },
                headers: {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                },
            });
            onItemRemoved();

            setCart(response.data.items || []);
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    }, [userEmail, documentId, onItemRemoved]);

    useEffect(() => {
        if (isItemRemoved) {
            HandleRemoveCart();
            setIsItemRemoved(false);
        }
    }, [HandleRemoveCart, isItemRemoved]);

    useEffect(() => {
        if (selectedQuantity !== prevQuantity.current) {
            const updateCart = async () => {
                try {
                    const response = await axios.put(`/api/cart`, {
                        email: userEmail,
                        productId: documentId,
                        quantity: selectedQuantity,
                    });

                    setCart(response.data.items || []);
                    prevQuantity.current = selectedQuantity;
                } catch (error) {
                    console.error("Error updating cart:", error);
                }
            };

            updateCart();
        }
    }, [selectedQuantity, userEmail, documentId]);

    const fetchUrl = `${API_URL}/api/products/${documentId}?populate=*`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(fetchUrl, {
                    headers: { Authorization: `Bearer ${Token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }

                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [fetchUrl, Token]);

    if (!productData) return <div>Loading...</div>;

    const { name, price, subtitle, thumbnail } = productData.data;
    const thumbnailUrl = thumbnail[0]?.url || "";

    return (
        <div className="flex py-5 gap-3 my-5 md:gap-5 border-b p-3 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all ease-in-out">
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Link href={`/products/${documentId}`}>
                    {thumbnailUrl && (
                        <Image
                            loading="lazy"
                            src={thumbnailUrl}
                            alt={name}
                            width={120}
                            height={120}
                            className="object-cover rounded-lg"
                        />
                    )}
                </Link>
            </div>

            <div className="w-full flex flex-col">
                <Link href={`/products/${documentId}`}>
                    <div className="flex flex-col md:flex-row justify-between mb-3 sm:mb-0">
                        <div className="text-lg md:text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                            {name}
                        </div>
                        <div className="text-sm md:text-md max-md:hidden font-bold text-gray-600 mt-2 sm:mt-0">
                            MRP : ₹{price}
                        </div>
                        <div className="flex justify-between md:hidden w-full">
                            <div className="text-sm md:text-md font-bold text-gray-600 mt-2 sm:mt-0">
                                MRP : ₹{price}
                            </div>
                            <div className="font-semibold text-lg text-gray-800">
                                Total: ₹{price * selectedQuantity}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="text-sm md:text-md font-medium text-gray-500 hidden md:block mb-2">
                    {subtitle}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex justify-between md:hidden items-center w-full">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div> 55x32
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select
                                className="text-gray-800 border-2 border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                            >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                                    <option key={q} value={q}>
                                        {q}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <RiDeleteBin6Line
                            onClick={() => setIsItemRemoved(true)}
                            className="md:hidden cursor-pointer text-red-500 text-[20px] transition-colors duration-300"
                        />
                    </div>
                    <div className="flex items-center max-md:hidden gap-2 sm:gap-10 text-gray-600 text-sm sm:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div> 55x32
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select
                                className="text-gray-800 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                            >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                                    <option key={q} value={q}>
                                        {q}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="font-semibold max-md:hidden text-lg text-gray-800">
                            Total: ₹{price * selectedQuantity}
                        </div>
                    </div>

                    <RiDeleteBin6Line
                        onClick={() => setIsItemRemoved(true)}
                        className="max-md:hidden cursor-pointer text-red-500 hover:text-red-700 text-[20px] transition-colors duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
