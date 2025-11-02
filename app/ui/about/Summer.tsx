'use client'
import { motion } from 'motion/react'
import SummerDetails from './SummerDetails'

const Summer = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='mt-24 pb-20 grid md:grid-cols-2 gap-6 lg:gap-8'>
          
          {/* Summer Sale Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='group relative bg-summer1-bg bg-cover bg-center h-[365px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]'
          >
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500'></div>
            
            <div className='relative h-full flex items-center justify-end pr-8 md:pr-16 lg:pr-24'>
              <SummerDetails />
            </div>
          </motion.div>
          
          {/* Summer Sale Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='group relative bg-summer2-bg bg-cover bg-center h-[365px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]'
          >
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500'></div>
            
            <div className='relative h-full flex items-center justify-start pl-8 md:pl-16 lg:pl-24'>
              <SummerDetails />
            </div>
          </motion.div>
    </motion.section>
  )
}

export default Summer
