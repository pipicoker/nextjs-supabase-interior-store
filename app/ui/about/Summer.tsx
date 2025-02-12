'use client'
import React, { useRef, useEffect } from 'react'
import { useAnimation, motion, useInView } from "framer-motion";import SummerDetails from './SummerDetails'

const Summer = () => {
  const controls = useAnimation();
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    else {
      controls.start("hidden");
    }
    console.log(inView);
    
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0},
      }}
      transition={{duration: 1}}
      className='mt-24 pb-[72px] grid md:grid-cols-2 gap-5'>
          <div className='bg-summer1-bg h-[365px] rounded-2xl flex items-center justify-end pr-24'>
              <SummerDetails />
          </div>
          
          <div className='bg-summer2-bg  h-[365px] rounded-2xl flex items-center justify-start pl-24'>
              <SummerDetails />
          </div>
    </motion.div>
  )
}

export default Summer
