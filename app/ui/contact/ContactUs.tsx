'use client'
import Image from 'next/image';
import {motion} from 'motion/react'
import ContactData from '../../Data/ContactData'

import contactfurniture from '../../../public/Images/contactfurniture.jpg'
import Line from '../../../public/Images/Line.png'


const ContactUs = () => {
    
  return (
      <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5,  }} viewport={{ once: true }}
          className='grid lg:grid-cols-2 items-center font-semibold'>
          <div className='order-2 lg:order-1 pt-6 lg:pt-0'>
              <div className='flex items-center space-x-2'>
                  <Image src={Line} alt="" />
                  <h5 className='text-3xl text-pry'>Contact Us</h5>
              </div>
              <h3 className='mt-2 text-5xl text-blac text-left'>Get In Touch With Us</h3>

              <div className='space-y-10 mt-16'>
                  {ContactData.map((data, index) => 
                      <div key={index} className={data.id}>
                          <div className='flex space-x-4'>
                            <div className='h-[92px] w-[84px] bg-pry px-[22px] py-[26px] flex items-center justify-center'>
                                <Image src={data.pix} alt="" />
                              </div>
                              
                              <div className='text-left'>
                                  <h5 className='text-3xl text-blac2'>{data.title}</h5>
                                  <p className='font-normal text-xl text-blac'>{data.text}</p>
                                  <p className='font-normal text-xl text-blac'>{data.location}</p>
                              </div>
                          </div>
                          
                      </div>
                  )}
              </div>
          </div>
          
          <div className='order-1 lg:order-2'>
              <Image src={contactfurniture} alt="an image "  />
          </div>
    </motion.div>
  )
}

export default ContactUs
