"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NavData from '../Data/NavData';

import logo from '../../public/Images/logo.png'

import { AiOutlineClose } from 'react-icons/ai';
import { RiShoppingCartLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';

import { useAuthStore } from "../store/authStore";
import { supabase } from "../lib/supabaseClient";

const Header = () => {
  const pathname = usePathname()

  const [activeNav, setActiveNav] = useState("one")
  const [mobileNav, setMobileNav] = useState(false)
  const { user, setUser, logout } = useAuthStore();



  const [itemNumber, setItemNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


   // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       event.target instanceof Node && // ✅ Fix: Ensure event.target is a Node
  //       !dropdownRef.current.contains(event.target)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleNav = (id: string) => {
    setActiveNav(id)
    setMobileNav(false)
  }

  // handle mobile menu
  const handleMenu = () => {
    setMobileNav(!mobileNav)
  }

  // Check for existing session on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    getUser();
  }, []);


   // fetch cart items from supabase
   const fetchUserCart = async () => {
    if(!user){
    console.log("user not logged in");
      return []
    }

    let { data: cart, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user.id)

    if (error) {
      console.error("Error fetching cart items:", error.message);
      return ;
    }

      const safeCart = cart || []
      setItemNumber(safeCart.length)
  }

  useEffect(() => {
    fetchUserCart();
  }, [user]);

  // Use real-time subscription to update cart count when items are added or removed
  // useEffect(() => {
  //   if (!user) return;
  
  //   fetchUserCart(); // ✅ Initial fetch
  
  //   const subscription = supabase
  //     .channel("cart_changes")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "cart" }, // ✅ Remove filter (Supabase does not support it)
  //       (payload) => {
  //         console.log("Cart updated:", payload);
  
  //         // ✅ Manually filter by user_id
  //         const newItem = payload.new as { user_id?: string };
  //       const oldItem = payload.old as { user_id?: string };

  //         if (newItem?.user_id === user.id || oldItem?.user_id === user.id) {
  //           fetchUserCart(); // ✅ Re-fetch the cart when this user's data is updated
  //         }
  //       }
  //     )
  //     .subscribe();
  
  //   return () => {
  //     supabase.removeChannel(subscription); // ✅ Cleanup subscription on unmount
  //   };
  // }, [user]); // ✅ Re-run when `user` changes
  

  return (
    <header className=''>
      <div className='bg-[#F5F5F5]  w-full   px-8 lg:px-14 py-4  flex items-center justify-between'>

          <div className="logo">
            <Image src={logo} alt="logo" width={173} height={65} />
          </div>
          
          <nav className='flex items-end'>
            <div className="hidden md:flex items-center md:space-x-6 lg:space-x-8  ">
              {NavData.map((data) => 
                 <Link 
                 href={data.path as string} 
                 key={data.id} 
                 className={` text-lg font-semibold cursor-pointer transform transition duration-300 hover:scale-110 hover:text-gray-800 ${pathname === data.path ? 
                  'bg-pry text-white px-3  py-2 rounded-b-lg  ' 
                   : 
                   'bg-[#F5F5F5] text-blac '}`} 
                   onClick={() => handleNav(data.id)}>
                    {data.title}
                  </Link>
                
              )}
              
            </div>
          </nav>


          <div >
            {
            !user ? (
              <div className='hidden md:flex items-center space-x-4 text-blac'>
              <Link href="../login" className='border border-[#D0D0D0] px-4 py-2 rounded-lg'>Login</Link>
              <Link href="../signup" className='border border-pry px-4 py-2 rounded-lg text-pry'>Sign Up</Link>
            </div>
            ) : (
              <div className='hidden md:flex items-center space-x-6 text-blac'>

               

              <Link href="../cart" className="relative">
                <RiShoppingCartLine className="h-7 w-7 " />
                {
                itemNumber > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pry text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemNumber}
                  </span>
                )
                }
              </Link>
              

              {/* <button onClick={logout}>Logout</button> */}

              {/* User Icon (Click to Toggle) */}
              <div className="relative" ref={dropdownRef} 
                // onMouseEnter={() => setIsOpen(true)} 
                // onMouseLeave={() => setIsOpen(false)}
                >
                  <button 
                  onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* <BiUser className="w-[32px] h-[32px] cursor-pointer" />
                     */}
                     <p className='text-lg border-2 bg-[#D0D0D0] w-10 h-10 rounded-full flex items-center justify-center'>{user?.email?.charAt(0).toUpperCase()}</p>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                  //   onMouseEnter={() => setIsOpen(true)} 
                  // onMouseLeave={() => setIsOpen(false)}
                     className="absolute right-0 mt-2  bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50">
                      <p className="px-4 py-2 text-gray-700">{user.email}</p>
                      <button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
            </div>
              )
            }

            <div className='flex items-center space-x-4 '>
            <Link href="../cart" className="md:hidden relative">
              <RiShoppingCartLine className="h-7 w-7 " />
              {
                itemNumber > 0 && user && (
                  <span className="absolute -top-1 -right-1 bg-pry text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemNumber}
                  </span>
                )
              }
            </Link>


                <RxHamburgerMenu className='md:hidden h-7 w-6 text-pry ' onClick={handleMenu}/> 
            </div>
              
          </div>
          
      </div>





      <div className={` md:hidden items-end md:space-x-8 pt-12  text-left  ${mobileNav ? 'block fixed top-0 h-screen w-screen  bg-[#F5F5F5] z-50 ease-in duration-500 ' : 'fixed top-[-100%] ease-out duration-100 '}`}>
        <div className='flex justify-end px-12 text-pry text-4xl ' onClick={() => setMobileNav(false)}>
          <AiOutlineClose  />
        </div>
            <div className='flex flex-col space-y-6 divide-y divide-pry '>
              {NavData.map((data) => 
                <Link href={data.path as string}
                  key={data.id}
                  className={` text-lg font-semibold cursor-pointer pl-8 pt-6 ${data.id === activeNav ? 'bg-[#F5F5F5] text-pry  pt-8  rounded-b-lg' : 'bg-[#F5F5F5] text-blac '}`
                    
                  } onClick={() => handleNav(data.id)}>{data.title}</Link>
              )}

              <div>
                {!user ? (
                  <div className='pt-4 grid gap-4 mx-4'>
                  <Link 
                  href="../login" 
                  className='border border-[#D0D0D0] px-4 py-2 rounded-lg text-center'
                  onClick={() => setMobileNav(false)}>Login</Link>
  
                  <Link 
                  href="../signup" 
                  className='border bg-pry px-4 py-2 rounded-lg text-white text-center'
                  onClick={() => setMobileNav(false)}>Sign Up</Link>
                </div>
                )  : (
                  
                  <button className='border ml-8 mt-4 bg-pry px-4 py-2 rounded-lg text-white text-center' onClick={logout}>Log out</button>

                )}
              </div>


            </div>
          </div>
          
    </header>
  )
}

export default Header
