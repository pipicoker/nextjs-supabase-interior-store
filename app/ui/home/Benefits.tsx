'use client'

import Image from 'next/image';
import { motion } from "motion/react";
import Line from '../../../public/Images/Line.png'

interface Benefit {
  id: number
  created_at: string
  summary: string
  expression: string
  
}

const Benefits = ({benefits}: {benefits: Benefit[]}) => {
  
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5,  }} viewport={{ once: true }}
      className='mt-32 px-[52px] md:px-[60px] font-semibold'>
          <div className='flex items-center space-x-3 text-2xl md:text-3xl  text-pry'>
              <Image src={Line} alt="line" width={100} height={100} />
              <p>Why choose us?</p>
          </div>
          
          <h3 className='mt-2 text-3xl md:text-5xl text-left text-blac'>Benefit Of Choosing Us</h3>

          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 '>
              {benefits.map((data) => 
            <div key={data.id} className="w-72 h-[250px] px-8  border border-graay flex flex-col justify-center items-center text-center rounded-2xl transform transition duration-500 hover:scale-110">
                      <p className='text-2xl text-blac'>{data.summary}</p>
                      <p className='text-lg font-normal mt-4 text-blac opacity-60'>{data.expression}</p>
            </div>
              )}
          </div>
          
    </motion.section>
  )
}

export default Benefits
