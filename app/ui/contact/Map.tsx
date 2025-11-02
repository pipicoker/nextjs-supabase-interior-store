'use client'
import {motion} from 'motion/react'
import { FaMapMarkedAlt } from 'react-icons/fa'


const Map = () => {
 
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6 }} 
    viewport={{ once: true }}
      className='pt-24 pb-16'>
      
      <div className='text-center mb-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-3 mb-4'
        >
          <div className='p-3 bg-gradient-to-br from-pry to-orange-600 text-white rounded-xl'>
            <FaMapMarkedAlt className='w-6 h-6' />
          </div>
          <h3 className='text-3xl md:text-4xl font-bold text-blac2'>Find Us</h3>
        </motion.div>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          Visit our showroom to experience our furniture collection in person
        </p>
      </div>

      {/* Map Container */}
      <div className='relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6437749536!2d3.5457!3d6.4396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnMjIuNiJOIDPCsDMyJzQ0LjUiRQ!5e0!3m2!1sen!2sng!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MeekDeco Location - Sangotedo, Lagos"
          className='grayscale-[30%] hover:grayscale-0 transition-all duration-500'
        />
        
        {/* Decorative gradient overlay on corners */}
        <div className='absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pry/20 to-transparent pointer-events-none'></div>
        <div className='absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pry/20 to-transparent pointer-events-none'></div>
      </div>

      {/* Quick Info Cards */}
      <div className='grid md:grid-cols-3 gap-6 mt-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300'
        >
          <h4 className='font-bold text-lg text-blac2 mb-2'>Opening Hours</h4>
          <p className='text-gray-600'>Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p className='text-gray-600'>Sat: 10:00 AM - 4:00 PM</p>
          <p className='text-gray-600'>Sun: Closed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-gradient-to-br from-pry to-orange-600 p-6 rounded-2xl shadow-lg text-center text-white hover:shadow-xl transition-all duration-300 hover:scale-105'
        >
          <h4 className='font-bold text-lg mb-2'>Get Directions</h4>
          <p className='mb-3'>Plot 6, Sangotedo Market</p>
          <a 
            href='https://maps.google.com/?q=Sangotedo+Market+Ajah+Lagos'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-white text-pry px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
          >
            Open in Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300'
        >
          <h4 className='font-bold text-lg text-blac2 mb-2'>Need Help?</h4>
          <p className='text-gray-600 mb-3'>Our team is ready to assist you</p>
          <a 
            href='tel:+2348122334455'
            className='inline-block bg-pry text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors'
          >
            Call Us Now
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Map
