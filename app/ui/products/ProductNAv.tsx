'use client'
import React from 'react'
import {useProductStore } from "../../store/productStore";

import DropdownFilter from './DropdownFilter'


const ProductNAv = () => {


  const {setProductBtn, productBtn, searchQuery, setSearchQuery} = useProductStore();
  


  return (
    <div className='py-2 px-4 md:px-8 lg:px-14 md:flex justify-between items-center bg-gray-300 '>
      
          <nav>
              <ul className='  flex justify-start items-center space-x-3 md:space-x-5 lg:space-x-12 text-gray-100'>
                  
          
              {["all", "living room", "bedroom", "office", "kitchen"].map((category) => (
      <li 
        key={category}
        onClick={() => setProductBtn(category)}
        className={`cursor-pointer ${
          productBtn === category ? "text-pry" : "text-gray-700"
        }`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </li>
    ))}
              </ul>
          </nav>

      <div className='flex justify-between pt-2 pb-4 md:pb-0 md:pt-0 md:space-x-24'>
                  <form className="flex items-center">   
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-6 h-7 text-blac" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              
              
                    </div>

                    <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="search" 
                    className=" text-sm rounded-xl block w-48 lg:w-72  h-6 pl-10 p-2.5 py-4 bg-[#F5F5F5]  " placeholder="Search..." required />
                </div>
                
      </form>
      
      
      <DropdownFilter />
      </div>
      
    </div>
  )
}

export default ProductNAv
