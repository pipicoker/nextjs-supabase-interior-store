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
            
              className='bg-hero-bg bg-no-repeat bg-cover h-[638px]  flex flex-col justify-center items-center'>
              <h1 className='text-5xl md:text-7xl text-center  font-semibold text-white'>Best furniture to <br />
                  your doorstep</h1>
              
              <button className='mt-8 w-48 h-12 font-semibold rounded-lg bg-pry text-white'>
                  Explore
              </button>
          </section>

          <section className='flex justify-center space-x-4 -mt-8'>
              {hero.map((data) =>
                  <div  key={data.id} className="w-[280px] md:w-[315px] h-[184px] flex flex-col justify-center items-center text-center rounded-2xl  bg-white border border-graay font-semibold space-y-3">
                      <h2 className='text-4xl md:text-6xl  text-pry'>{data.figure}</h2>
                      <div className='text-xl md:text-2xl '>
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

