'use client'
import Image from 'next/image';
import {motion} from 'motion/react'
import whatcouch from '../../../public/Images/whatcouch.jpg'
import { FaCouch, FaLeaf, FaHeart, FaStar } from 'react-icons/fa'


const WhatAbout = () => {
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6 }} 
    viewport={{ once: true }}
      className='grid lg:grid-cols-2 gap-12 lg:gap-16 justify-center items-center mb-20'>
      
          {/* Text Content */}
          <motion.div 
            className='text-left space-y-6'
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }}
          >
              <h2 className='text-5xl md:text-6xl font-bold text-blac2 leading-tight'>
                What <span className='text-pry'>We Do</span>
              </h2>
              
              <p className='text-lg md:text-xl font-normal text-gray-700 leading-relaxed'>
                We offer a wide selection of unique and beautifully crafted furniture for every room in your home. Our team of designers and craftsmen are dedicated to creating stylish and long-lasting pieces using high-quality materials and ethical sourcing.
              </p>

              {/* Feature highlights */}
              <div className='grid grid-cols-2 gap-4 pt-4'>
                <div className='flex items-start gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <div className='p-2 bg-gradient-to-br from-pry to-orange-600 text-white rounded-lg'>
                    <FaCouch className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-blac2 text-sm'>Unique Designs</h4>
                    <p className='text-xs text-gray-600'>Handcrafted pieces</p>
                  </div>
                </div>

                <div className='flex items-start gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <div className='p-2 bg-gradient-to-br from-pry to-orange-600 text-white rounded-lg'>
                    <FaLeaf className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-blac2 text-sm'>Sustainable</h4>
                    <p className='text-xs text-gray-600'>Eco-friendly materials</p>
                  </div>
                </div>

                <div className='flex items-start gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <div className='p-2 bg-gradient-to-br from-pry to-orange-600 text-white rounded-lg'>
                    <FaHeart className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-blac2 text-sm'>Customer Care</h4>
                    <p className='text-xs text-gray-600'>24/7 support</p>
                  </div>
                </div>

                <div className='flex items-start gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <div className='p-2 bg-gradient-to-br from-pry to-orange-600 text-white rounded-lg'>
                    <FaStar className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-blac2 text-sm'>Quality First</h4>
                    <p className='text-xs text-gray-600'>Premium materials</p>
                  </div>
                </div>
              </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className='relative group'
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            viewport={{ once: true }}
          >
              <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
                <Image 
                  src={whatcouch} 
                  alt="Modern couch showcasing our furniture quality"  
                  className='w-full h-[400px] md:h-[470px] object-cover group-hover:scale-105 transition-transform duration-700'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
              </div>
              
              {/* Decorative element */}
              <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pry to-orange-600 rounded-full opacity-20 blur-2xl'></div>
          </motion.div>
    </motion.section>
  )
}

export default WhatAbout
