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
    <motion.div className='mt-32 px-[60px] font-semibold'
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }}  
    transition={{ duration: 0.5,  delay: 0}}  viewport={{ once: true }}
    >
     
     <div className='  flex justify-between items-center'>
            <div>
                <div className='flex items-center space-x-3 text-2xl md:text-3xl  text-pry'>
                <Image src={Line} alt="" />
                <p>Clients Review</p>
                </div>
            
                <h3 className='mt-2 text-3xl md:text-5xl text-left'>What Our Clients Say</h3>   
            </div>
            
            <div className='hidden md:flex items-center space-x-4' >
              <button 
            ref={prevRef} aria-label="Previous review"
            disabled={isBeginning}
            className={`p-2 rounded-full ${isBeginning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <FaArrowLeftLong size={40}/>
          </button>
                
          <button 
            ref={nextRef} aria-label="Next review"
            disabled={isEnd}
            className={`p-2 rounded-full    ${isEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <FaArrowRightLong size={40}/>
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
                <div className='mt-16 lg:ml-[256px] md:ml-12 grid lg:grid-cols-3 '>
              <div className='w-[202px] h-[510px] bg-pry flex items-center justify-center justify-self-center lg:justify-self-start rounded-[32px]'>
                  <Image src={data.image} className="absolute w-[352px] h-[400px] md:w-[427px] md:h-[440px] shrink-0" alt="alternative" width={427} height={440}/>

                
              </div>
              

              <div className='lg:col-span-2 lg:pl-16 pt-4 md:pt-0 lg:px-16 flex flex-col justify-center items-center'>
                  <div>
                      <Image src={up} className="flex align-left" alt="" />
                      <p className='mt-8 mb-6 text-left text-xl text-blac2 opacity-60 font-normal'>{data.review}</p>
                      <div className=' flex  justify-end'>
                        <Image src={down} alt="" className='' />
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
