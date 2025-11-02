'use client'
import {  motion } from "motion/react";

interface HeroInterface {
  id: string
  created_at: string
  figure: string
  title1: string
  title2: string
}


const Hero = ({hero}: {hero: HeroInterface[]}) => {

  return (
      <motion.main
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5,  }} viewport={{ once: true }}
      >
          <section
            
              className='bg-hero-bg bg-no-repeat bg-cover h-[638px] flex flex-col justify-center items-center relative'>
              <div className='absolute inset-0 bg-black/40'></div>
              <div className='relative z-10 flex flex-col items-center'>
                <h1 className='text-5xl md:text-7xl text-center font-bold text-white drop-shadow-2xl'>
                  Best furniture to <br />
                  your doorstep
                </h1>
                
                <button className='mt-8 w-48 h-14 font-semibold rounded-lg bg-pry text-white hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform'>
                    Explore
                </button>
              </div>
          </section>

          <section className='flex flex-wrap justify-center gap-4 md:gap-6 px-4 -mt-12 relative z-20'>
              {hero.map((data) =>
                  <div key={data.id} className="w-[280px] md:w-[315px] h-[184px] flex flex-col justify-center items-center text-center rounded-2xl bg-white border border-gray-200 font-semibold space-y-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <h2 className='text-4xl md:text-6xl text-pry font-bold'>{data.figure}</h2>
                      <div className='text-xl md:text-2xl text-gray-700'>
                           <p>{data.title1}</p>
                      <p>{data.title2}</p>
                      </div>
                     
              </div>    
              )}
          </section>
          
    </motion.main>
  )
}

export default Hero

