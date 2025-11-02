'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from "motion/react";
import Line from '../../../public/Images/Line.png'
import { FaShippingFast, FaComments, FaDollarSign, FaHandHoldingHeart } from 'react-icons/fa';

interface Benefit {
  id: number
  created_at: string
  summary: string
  expression: string
  
}

const iconMap: { [key: string]: React.ReactElement } = {
  'Convenience': <FaHandHoldingHeart className="w-12 h-12" />,
  'Price comparison': <FaDollarSign className="w-12 h-12" />,
  'Swift Delivery': <FaShippingFast className="w-12 h-12" />,
  'Reviews': <FaComments className="w-12 h-12" />
}

const Benefits = ({benefits}: {benefits: Benefit[]}) => {
  
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5,  }} viewport={{ once: true }}
      className='mt-32 px-[52px] md:px-[60px] font-semibold bg-gradient-to-b from-[#F5F5F5] via-orange-50/30 to-[#F5F5F5] py-20'>
          <div className='flex items-center space-x-3 text-2xl md:text-3xl text-pry'>
              <Image src={Line} alt="line" width={100} height={100} />
              <p>Why choose us?</p>
          </div>
          
          <h3 className='mt-2 text-3xl md:text-5xl text-left text-blac font-bold'>Benefit Of Choosing Us</h3>

          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 justify-items-center'>
              {benefits.map((data, index) => 
            <motion.div 
              key={data.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group w-72 min-h-[280px] px-6 py-8 bg-white border border-gray-200 flex flex-col items-center text-center rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:border-pry relative overflow-hidden"
            >
              {/* Decorative gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pry/5 via-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6 p-4 bg-gradient-to-br from-pry to-orange-600 text-white rounded-2xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                {iconMap[data.summary] || <FaHandHoldingHeart className="w-12 h-12" />}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h4 className='text-xl text-blac font-bold mb-3 group-hover:text-pry transition-colors duration-300'>{data.summary}</h4>
                <p className='text-base font-normal text-gray-600 leading-relaxed'>{data.expression}</p>
              </div>
            </motion.div>
              )}
          </div>
          
    </motion.section>
  )
}

export default Benefits
