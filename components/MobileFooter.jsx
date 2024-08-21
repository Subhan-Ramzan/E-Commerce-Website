import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';

const MobileFooter = () => {
    return (

        <div className='md:hidden bg-white sticky bottom-0 p-2'>
            <div className='flex items-center space-x-4 justify-around'>
                <div className='relative flex items-center'>
                    <Link href="/">
                        <IoMdHome className='text-3xl cursor-pointer' />
                    </Link>
                </div>

                <Link href="/cart" className='text-xl md:text-2xl relative'>
                    <FaShoppingCart />
                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>0</p> {/* Assuming you want to show the cart item count */}
                    </div>
                </Link>
                <div className='relative flex items-center'>
                    <Link href="/profile">
                        <FaRegCircleUser className='text-2xl md:text-3xl cursor-pointer' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MobileFooter