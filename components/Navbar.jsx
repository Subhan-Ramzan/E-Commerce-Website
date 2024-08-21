// Corrected Navbar.jsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaBars, FaShoppingCart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSession, signOut } from 'next-auth/react';
import FaBar from './FaBar';

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(status);
  console.log('Session Data:', session);

  const [handleFaBar, setHandleFaBar] = useState(false);

  const toggleFaBar = () => {
    setHandleFaBar(!handleFaBar);
  };

  return (
    <div className='relative flex h-20 md:h-16 w-full bg-slate-900 items-center px-6 py-2 text-white justify-between'>
      <Link href="/">
        <img src="/" alt="logo" className='w-auto h-8 cursor-pointer' />
      </Link>
      <div className='hidden md:flex'>
        <ul className='list-none flex px-2 lg:px-4 space-x-3 lg:space-x-8'>
          <li className='hover:text-gray-400'>
            <Link href="/">Home</Link>
          </li>
          <li className='hover:text-gray-400'>
            <Link href="/about">About</Link>
          </li>
          <li className='hover:text-gray-400'>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className='flex items-center focus-within:shadow pl-2'>
        <input type="search" placeholder="Search" className=' max-sm:w-[45vw] px-3 py-1 rounded-l-full outline-none text-black' />
        <span className='bg-blue-700 p-2 rounded-r-full'>
          <FaSearch className='' />
        </span>
      </div>

      <div className='max-md:hidden flex items-center space-x-4 justify-between'>
        <div className='relative flex items-center'>
          <Link href="/profile">
            <FaRegCircleUser className='text-2xl md:text-3xl cursor-pointer' />
          </Link>
        </div>

        <Link href="/cart">
          <div className='text-xl md:text-2xl relative cursor-pointer'>
            <FaShoppingCart />
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p> {/* Assuming you want to show the cart item count */}
            </div>
          </div>
        </Link>

        {status === "authenticated" ? (
          <>
            <p>Welcome, {session.user.name ? session.user.name : session.user.email.split(/(?=\d)/)[0]}</p>
            <button onClick={() => signOut()} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className="hover:text-blue-700 transition duration-300 max-md:bg-gradient-to-r from-purple-500 to-blue-500 max-md:hover:from-purple-700 max-md:hover:to-blue-700 max-md:text-white max-md:font-bold max-md:py-2 max-md:px-3 rounded-lg max-sm:font-medium">Login</span>
            </Link>
            <Link href="/signup">
              <button className="max-md:hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-2 py-1 lg:py-2 lg:px-4 rounded-lg">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>

      <div onClick={toggleFaBar} className='md:hidden'>
        <FaBars className='text-2xl' />
      </div>
      {handleFaBar &&
        <div className={`flex justify-between fixed w-64 top-3 bottom-3 min-h-[96vh] px-6 py-4 right-2 ${handleFaBar ? 'translate-x-0' : 'translate-x-full'} bg-gray-900 text-white transform transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}>
          <FaBar toggleFaBar={toggleFaBar} handleFaBar={handleFaBar} />
        </div>
      }
    </div>
  );
};

export default Navbar;
