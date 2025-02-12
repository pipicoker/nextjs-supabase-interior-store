'use client'
import Image from 'next/image';
import {motion} from 'motion/react'
import map from '../../../public/Images/map.jpg'


const Map = () => {
 
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5,  }} viewport={{ once: true }}
      className='py-32'>
      <Image src={map} alt="" className='w-full' />
    </motion.div>
  )
}

export default Map
