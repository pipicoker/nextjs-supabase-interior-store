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
import { cartEvents } from "../lib/cartEvents";

const Header = () => {
  const pathname = usePathname()

  const [activeNav, setActiveNav] = useState("one")
  const [mobileNav, setMobileNav] = useState(false)
  const { user, logout } = useAuthStore();



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

  // Note: User state is managed by authStore, no need to fetch here


   // fetch cart items from supabase
   const fetchUserCart = async () => {
    if(!user){
    console.log("user not logged in");
      return []
    }

    const { data: cart, error } = await supabase
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
    if (user) {
      fetchUserCart();
    }
  }, [user]);

  // Listen to manual cart update events
  useEffect(() => {
    const unsubscribe = cartEvents.subscribe(() => {
      if (user) {
        fetchUserCart();
      }
    });

    return unsubscribe;
  }, [user]);

  // Use real-time subscription to update cart count when items are added or removed
  useEffect(() => {
    if (!user) {
      setItemNumber(0);
      return;
    }
  
    // Initial fetch
    const loadCart = async () => {
      await fetchUserCart();
    };
    loadCart();
  
    // Set up real-time subscription
    const channel = supabase
      .channel(`cart_changes_${user.id}`)
      .on(
        "postgres_changes",
        { 
          event: "*", 
          schema: "public", 
          table: "cart"
        },
        async (payload) => {
          console.log("Cart change detected:", payload.eventType, payload);
  
          // Check if this change is for the current user
          const newItem = payload.new as { user_id?: string };
          const oldItem = payload.old as { user_id?: string };

          const isCurrentUser = newItem?.user_id === user.id || oldItem?.user_id === user.id;
          
          if (isCurrentUser) {
            console.log("Updating cart count for current user...");
            // Add a small delay to ensure DB is fully updated
            setTimeout(async () => {
              await fetchUserCart();
            }, 100);
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });
  
    return () => {
      console.log("Cleaning up cart subscription");
      supabase.removeChannel(channel);
    };
  }, [user?.id]);
  

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

              <Link href="../products" className="text-gray-700 hover:text-pry transition-colors font-medium">
                Shop
              </Link>

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
              

              {/* User Icon (Click to Toggle) */}
              <div className="relative" ref={dropdownRef}>
                  <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:opacity-80 transition-opacity"
                  >
                     <p className='text-lg border-2 bg-[#D0D0D0] w-10 h-10 rounded-full flex items-center justify-center hover:bg-pry hover:text-white hover:border-pry transition-colors'>{user?.email?.charAt(0).toUpperCase()}</p>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50 min-w-[200px]">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-gray-700 font-medium truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/account"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        My Account
                      </Link>
                      
                      <Link
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        My Cart
                      </Link>
                      
                      <div className="border-t border-gray-200 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout()
                            setIsOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
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
                  <div className='pt-4 grid gap-4 mx-4'>
                    <Link 
                      href="../account" 
                      className='border border-pry px-4 py-2 rounded-lg text-pry text-center font-medium'
                      onClick={() => setMobileNav(false)}
                    >
                      My Account
                    </Link>
                    
                    <button 
                      className='border bg-red-500 px-4 py-2 rounded-lg text-white text-center' 
                      onClick={() => {
                        logout();
                        setMobileNav(false);
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>


            </div>
          </div>
          
    </header>
  )
}

export default Header
