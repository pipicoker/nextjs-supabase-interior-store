import React from 'react'
import { FaArrowRight, FaTag } from 'react-icons/fa'

const SummerDetails = () => {
  return (
    <div className='text-white space-y-4 max-w-sm'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-pry/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg'>
            <FaTag className='w-4 h-4' />
            <span className='text-sm font-bold uppercase tracking-wider'>Limited Offer</span>
          </div>

          {/* Title */}
          <h5 className='text-4xl md:text-5xl font-bold leading-tight drop-shadow-2xl'>
            Summer Sales
          </h5>
          
          {/* Subtitle */}
          <p className='text-lg md:text-xl font-medium text-white/90 drop-shadow-lg'>
            Get up to 50% discount
          </p>

          {/* Button */}
          <button className='group mt-4 bg-gradient-to-r from-pry to-orange-600 hover:from-orange-600 hover:to-pry text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3'>
            <span>Shop Now</span>
            <FaArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button>
    </div>
  )
}

export default SummerDetails
