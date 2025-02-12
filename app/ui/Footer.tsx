import React from 'react'
import Image from 'next/image'

import footerlogo from '../../public/Images/footerlogo.png'


const Footer = () => {
    return (
      <footer className='  pt-8  bg-pry font-semibold divide-y divide-white'>
           <div className='pl-14 pr-44'>
          <div className='flex justify-between items-start space-x-4
          '>
              <Image src={footerlogo} alt="" />

              <div className='md:flex justify-between md:space-x-16 text-white'>
                  <div className='text-left '>
                      <p className='text-xl'>Company</p>
                      <ul className='pt-2 md:pt-5 space-y-2'>
                          <li>About Us</li>
                          <li>Product</li>
                          <li>Services</li>
                          <li>Terms of Services</li>
                          <li>Privacy Policy</li>
                      </ul>
                  </div>
                  <div className='pt-4 md:pt-0 text-left '>
                      <p className='text-xl'>Contact</p>
                      <ul className='pt-2 md:pt-5  md:space-y-2'>
                          <li>Contact Us</li>
                          <li>Help center</li>
                          
                      </ul>
                  </div>
              </div>
          </div>
          
          <form className='hidden relative md:flex flex-col  items-start md:pt-8 lg:pt-0'>
              <label htmlFor='intouch' className='text-white text-base mb-1'>Get in touch with us ,Subscribe to our Newsletter!</label>
              
                  <input id='intouch' type="email" className='w-[650px] h-[73px] rounded'/>
                    <button className='absolute bg-[#F67A24] ml-[445px] mt-10 w-44 h-12 px-6 py-3 rounded text-lg text-[#FBFCFE]'>Subscribe</button>
            
              
          </form>
            </div> 
            
            <div className='mt-4 pt-5 pb-8'>
                <p className='text-sm text-white'> 2022 MeekDeco. All rights Reserved</p>
            </div>
      </footer>
    
  )
}

export default Footer
