'use client'
import React from 'react';
import {motion} from 'motion/react'
import Image from 'next/image';
import BenefitsData from '../../Data/BenefitsData'
import whyfurniture from '../../../public/Images/whyfurniture.jpg'
import { FaShoppingCart, FaDollarSign, FaShippingFast, FaComments } from 'react-icons/fa'


const iconMap: { [key: string]: React.ReactElement } = {
  "1": <FaShoppingCart className="w-6 h-6" />,
  "2": <FaDollarSign className="w-6 h-6" />,
  "3": <FaShippingFast className="w-6 h-6" />,
  "4": <FaComments className="w-6 h-6" />
}

const WhyAbout = () => {
  
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6 }} 
    viewport={{ once: true }}
      className='pt-24 mb-20 grid lg:grid-cols-2 items-center gap-12 lg:gap-16'>
      
      {/* Image */}
      <motion.div 
        className='hidden lg:block relative group'
        initial={{ opacity: 0, x: -30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        viewport={{ once: true }}
      >
        <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
          <Image 
            src={whyfurniture} 
            alt="Quality furniture showcasing why we do what we do" 
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
        </div>
        
        {/* Decorative element */}
        <div className='absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-pry to-orange-600 rounded-full opacity-20 blur-2xl'></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className='text-left space-y-6'
        initial={{ opacity: 0, x: 30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }} 
        viewport={{ once: true }}
      >
        <h2 className='text-5xl md:text-6xl font-bold text-blac2 leading-tight'>
          Why <span className='text-pry'>We Do</span>
        </h2>
        <p className='text-lg md:text-xl font-normal text-gray-700 leading-relaxed'>
          We offer customers a convenient and cost-effective way to find and purchase the furniture they need
        </p>

        <div className='grid md:grid-cols-2 gap-6 pt-6'>
          {BenefitsData.map((data, index) => 
            <motion.div 
              key={data.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-pry/30"
            >
              <div className='shrink-0 w-12 h-12 bg-gradient-to-br from-pry to-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
                {iconMap[data.id] || data.id}
              </div>
              <div className='space-y-1'>
                <h6 className='font-bold text-xl text-blac2 group-hover:text-pry transition-colors'>{data.summary}</h6>
                <p className='font-normal text-sm text-gray-600 leading-relaxed'>{data.expression}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default WhyAbout
