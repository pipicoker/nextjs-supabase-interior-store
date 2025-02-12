'use client'
import Image from 'next/image';
import {motion} from 'motion/react'
import whatcouch from '../../../public/Images/whatcouch.jpg'


const WhatAbout = () => {


 
  return (
    <motion.div
    initial={{ opacity: 0, x: -50 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.5,  }} viewport={{ once: true }}
      className=' grid lg:grid-cols-2 gap-12 lg:gap-36 justify-center items-center'>
      
          <div className='text-left'>
              <h2 className='text-6xl font-semibold text-blac2'>What <span className='text-pry'>We Do</span></h2>
              <p className='mt-3 text-lg font-normal text-blac2'>We offer a wide selection of unique and beautifully crafted furniture for every room in your home. Our team of designers and craftsmen are dedicated to creating stylish and long-lasting pieces using high-quality materials and ethical sourcing. We pride ourselves on our commitment to customer service and sustainability.</p>
          </div>

          <div>
              <Image src={whatcouch} alt="couch"  className='md:w-full lg:w-[648px]  lg:h-[470px]'/>
          </div>
    </motion.div>
  )
}

export default WhatAbout
