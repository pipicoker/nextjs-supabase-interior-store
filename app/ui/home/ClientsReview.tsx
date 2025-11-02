'use client'

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar, A11y } from 'swiper/modules'
import type SwiperType from 'swiper'

import Line from '../../../public/Images/Line.png'
import up from '../../../public/Images/up.png'
import down from '../../../public/Images/down.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface ReviewInterface {
  id: string
  created_at: string
  image: string
  review: string
}

const ClientsReview = ({review}: {review: ReviewInterface[]}) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.on('slideChange', (swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
      })
    }
  }, [swiperInstance])

  return (
    <motion.div className='mt-32 px-[60px] font-semibold bg-gradient-to-b from-[#F5F5F5] via-orange-50/20 to-[#F5F5F5] py-20'
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }}  
    transition={{ duration: 0.5,  delay: 0}}  viewport={{ once: true }}
    >
     
     <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
                <div className='flex items-center space-x-3 text-2xl md:text-3xl text-pry'>
                <Image src={Line} alt="" />
                <p>Clients Review</p>
                </div>
            
                <h3 className='mt-2 text-3xl md:text-5xl text-left font-bold'>What Our Clients Say</h3>   
            </div>
            
            <div className='hidden md:flex items-center space-x-4'>
              <button 
            ref={prevRef} aria-label="Previous review"
            disabled={isBeginning}
            className={`p-3 rounded-full bg-white border-2 border-gray-200 shadow-md transition-all duration-300 ${isBeginning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pry hover:text-white hover:border-pry hover:shadow-lg'}`}
          >
            <FaArrowLeftLong size={24}/>
          </button>
                
          <button 
            ref={nextRef} aria-label="Next review"
            disabled={isEnd}
            className={`p-3 rounded-full bg-white border-2 border-gray-200 shadow-md transition-all duration-300 ${isEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pry hover:text-white hover:border-pry hover:shadow-lg'}`}
          >
            <FaArrowRightLong size={24}/>
          </button>

                
            </div>
        
          </div>
          
          <Swiper 
          modules={[Navigation,  Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
         //  breakpoints={{
         //      640: {  spaceBetween: 20 }, // Tablet
         //      1024: { spaceBetween: 32 }, // laptop
         //      1536: { spaceBetween: 32 }, // desktop
         //    }}
          
         navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }} 
          
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setTimeout(() => {
            if (swiper.navigation) {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 0);
        }}
        onInit={(swiper) => {
          if (swiper.navigation) {
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        

          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}>
            {
            review.map((data) => (
              <SwiperSlide key={data.id}>
                <div className='mt-16 max-w-6xl mx-auto px-4'>
                  <div className='grid lg:grid-cols-5 gap-8 lg:gap-12 items-center'>
                    {/* Orange Card - Made Wider */}
                    <div className='lg:col-span-2 flex justify-center lg:justify-start'>
                      <div className='w-[320px] md:w-[380px] h-[480px] md:h-[520px] bg-gradient-to-br from-pry via-orange-500 to-orange-600 flex items-center justify-center rounded-[32px] shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform duration-500'>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10'></div>
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]'></div>
                        <Image src={data.image} className="relative w-[380px] h-[420px] md:w-[440px] md:h-[460px] object-cover rounded-[24px] shadow-xl" alt="Client testimonial" width={440} height={460}/>
                      </div>
                    </div>
              
                    {/* Review Card */}
                    <div className='lg:col-span-3 flex flex-col justify-center'>
                      <div className='bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300'>
                        <div className='flex items-start'>
                          <Image src={up} className="w-10 h-10 md:w-14 md:h-14 opacity-40" alt="Quote start" />
                        </div>
                        <p className='mt-6 mb-8 text-left text-lg md:text-xl text-gray-700 font-normal leading-relaxed'>&quot;{data.review}&quot;</p>
                        <div className='flex justify-end'>
                          <Image src={down} alt="Quote end" className='w-10 h-10 md:w-14 md:h-14 opacity-40' />
                        </div>
                        <div className='mt-6 pt-6 border-t border-gray-200'>
                          <div className='flex items-center gap-2'>
                            <div className='flex gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className='w-5 h-5 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                                  <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                                </svg>
                              ))}
                            </div>
                            <span className='text-sm text-gray-500 ml-2'>5.0 Rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }

          </Swiper>

          
              </motion.div>
  )
}

export default ClientsReview
