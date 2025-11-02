'use client'
import Link from 'next/link'
import Image from 'next/image'

import Line from '../../../public/Images/Line.png'
import Arrow from '../../../public/Images/Arrow.png'

import {motion} from "motion/react";

 interface Product {
    id: number
    created_at: string
    image: string
    design: string
    type: string
    price: number
  }

const BestSelling = ({bestselling}: {bestselling: Product[]}) => {
 


  
    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5,  }} viewport={{ once: true }}
         className='mt-32 px-[60px] font-semibold text-blac py-16'
        
        >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                <div className='flex items-center space-x-3 text-2xl md:text-3xl text-pry'>
                <Image src={Line} alt="line" width={100} height={100} />
                <p>Best Selling</p>
                </div>
            
                <h3 className='mt-2 text-3xl md:text-5xl text-left font-bold'>Our Best Selling Products</h3>   
            </div>
            
            <Link href="./productpage" className='flex items-center space-x-2 text-pry hover:text-orange-600 transition-colors group' >
                <p className='text-lg'>Explore All</p>
                <Image src={Arrow} alt="arrow" width={20} height={20} className='group-hover:translate-x-1 transition-transform' />
            </Link>
        
            </div> 
            
            <div className='mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 justify-items-center'>
                {bestselling?.map((data) => 
                    <div key={data.id} className="h-[415px] bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden group">
                        <div className='overflow-hidden h-[275px]'>
                          <Image src={data.image} alt="pix" className='w-full h-[275px] object-cover group-hover:scale-110 transition-transform duration-500' width={281} height={275}/>
                        </div>
                        <div className='mt-4 space-y-3 grid justify-center text-center px-4 pb-8'>
                            <p className='text-sm text-gray-500 uppercase tracking-wide'>{data.design}</p>
                            <p className='text-lg font-bold text-gray-800'>{data.type}</p>
                            <p className='text-2xl text-pry font-bold'>${data.price.toLocaleString()}</p>
                        </div>
                        
                    </div>
                )}
            </div>
      </motion.div>
      
  )
}

export default BestSelling
