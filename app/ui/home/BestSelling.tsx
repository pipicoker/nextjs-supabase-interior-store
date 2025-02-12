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
         className='mt-32 px-[60px] font-semibold text-blac'
        
        >
            <div className='  flex justify-between items-center'>
                <div>
                <div className='flex items-center space-x-3 text-2xl md:text-3xl  text-pry'>
                <Image src={Line} alt="line" width={100} height={100} />
                <p>Best Selling</p>
                </div>
            
                <h3 className='mt-2 text-3xl md:text-5xl text-left'>Our Best Selling Products</h3>   
            </div>
            
            <Link href="./productpage" className='hidden md:flex items-center space-x-4' >
                <p>Explore All</p>
                <Image src={Arrow} alt="arrow" width={20} height={20} />
            </Link>
        
            </div> 
            
            <div className='mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4  '>
                {bestselling?.map((data) => 
                    <div key={data.id} className=" h-[415px] border border-graay rounded-3xl transform transition duration-500 hover:scale-110 ">
                        <Image src={data.image} alt="pix" className='w-full h-[275px]' width={281} height={275}/>
                        <div className='mt-2 space-y-3 grid justify-center text-center'>
                            <p className='text-sm'>{data.design}</p>
                            <p className='text-lg'>{data.type}</p>
                            <p className='text-2xl text-pry'>${data.price}</p>
                        </div>
                        
                    </div>
                )}
            </div>
      </motion.div>
      
  )
}

export default BestSelling
