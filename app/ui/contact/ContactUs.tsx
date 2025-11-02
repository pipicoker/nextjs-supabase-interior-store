'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import {motion} from 'motion/react'
import ContactData from '../../Data/ContactData'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa'

import contactfurniture from '../../../public/Images/contactfurniture.jpg'
import Line from '../../../public/Images/Line.png'

const iconMap: { [key: string]: React.ReactElement } = {
  'one': <FaMapMarkerAlt className="w-8 h-8" />,
  'two': <FaPhone className="w-8 h-8" />,
  'three': <FaEnvelope className="w-8 h-8" />
}

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
    
  return (
    <div className='space-y-16'>
      {/* Contact Info Section */}
      <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }} 
      viewport={{ once: true }}
          className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center font-semibold'>
          
          {/* Contact Information */}
          <motion.div 
            className='order-2 lg:order-1 space-y-8'
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }}
          >
              <div className='flex items-center space-x-3'>
                  <Image src={Line} alt="" width={100} height={100} />
                  <h5 className='text-2xl md:text-3xl text-pry'>Contact Us</h5>
              </div>
              <h3 className='text-4xl md:text-5xl font-bold text-blac2 text-left leading-tight'>Get In Touch With Us</h3>

              <div className='space-y-6 mt-12'>
                  {ContactData.map((data, index) => 
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className='group'
                      >
                          <div className='flex gap-5 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-pry/30'>
                            <div className='shrink-0 w-16 h-16 bg-gradient-to-br from-pry to-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
                                {iconMap[data.id]}
                              </div>
                              
                              <div className='text-left space-y-1'>
                                  <h5 className='text-xl md:text-2xl font-bold text-blac2 group-hover:text-pry transition-colors'>{data.title}</h5>
                                  <p className='font-normal text-base md:text-lg text-gray-600'>{data.text}</p>
                                  {data.location && <p className='font-normal text-base md:text-lg text-gray-600'>{data.location}</p>}
                              </div>
                          </div>
                      </motion.div>
                  )}
              </div>
          </motion.div>
          
          {/* Contact Image */}
          <motion.div 
            className='order-1 lg:order-2 relative group'
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            viewport={{ once: true }}
          >
              <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
                <Image 
                  src={contactfurniture} 
                  alt="Contact us - Modern office furniture setup"
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
              </div>
              
              {/* Decorative element */}
              <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pry to-orange-600 rounded-full opacity-20 blur-2xl'></div>
          </motion.div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
        className='max-w-4xl mx-auto'
      >
        <div className='bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100'>
          <div className='text-center mb-8'>
            <h3 className='text-3xl md:text-4xl font-bold text-blac2 mb-3'>Send Us a Message</h3>
            <p className='text-gray-600 text-lg'>Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-semibold text-blac2 mb-2'>Your Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pry focus:ring-2 focus:ring-pry/20 outline-none transition-all'
                  placeholder='John Doe'
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-semibold text-blac2 mb-2'>Email Address</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pry focus:ring-2 focus:ring-pry/20 outline-none transition-all'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='subject' className='block text-sm font-semibold text-blac2 mb-2'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pry focus:ring-2 focus:ring-pry/20 outline-none transition-all'
                placeholder='How can we help?'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-semibold text-blac2 mb-2'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pry focus:ring-2 focus:ring-pry/20 outline-none transition-all resize-none'
                placeholder='Tell us more about your inquiry...'
              />
            </div>

            <button
              type='submit'
              className='group w-full md:w-auto bg-gradient-to-r from-pry to-orange-600 hover:from-orange-600 hover:to-pry text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mx-auto'
            >
              <span>Send Message</span>
              <FaPaperPlane className='w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactUs
