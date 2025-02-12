'use client'
import { useRouter } from "next/navigation";

import {  useEffect } from 'react'
import {motion} from 'motion/react'
import {useProductStore} from "../../store/productStore";
import {useAuthStore} from "../../store/authStore";
import { supabase } from "@/app/lib/supabaseClient";

interface productsInterface {
  id: number
  created_at: string
  place: string
  category: string
  designer: string
  information: string
  pix: string
  price: number
  
}




const AllProducts = ({products}: {products: productsInterface[]}) => {
  const router = useRouter();

  const {user} = useAuthStore();
  const {setProducts, productsToShow} = useProductStore();

  useEffect(() => {
    setProducts(products);
    // console.log(productsToShow)
    // console.log(productBtn);
    
  }, [products]);

  // add items to cart
  const handleAddToCart = async (product: productsInterface) => {
    if (!user) {
      router.push("/login");
      return;
    }
  
    // Check if the product already exists in the user's cart
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle(); // Ensure we get a single row
  
    if (fetchError) {
      console.error("Error checking cart:", fetchError.message);
      return;
    }
  
    if (existingItem) {
      alert("This product is already in your cart.");
      return;
    }
  
    // If the product is not in the cart, insert it
    const { error: insertError } = await supabase
      .from("cart")
      .insert([
        {
          user_id: user.id,
          product_id: product.id,
          product_category: product.category,
          product_price: product.price,
          product_designer: product.designer,
          product_information: product.information,
          product_pix: product.pix,
          quantity: 1,
        },
      ]);
  
    if (insertError) {
      console.error("Error adding to cart:", insertError.message);
    } else {
      alert("Product added to cart successfully!");
    }
  };
  

    
  
  return (
    <div className='px-[60px] py-12 bg-[#F5F5F5]'>

      <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5,  }} viewport={{ once: true }}
       
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
        
        {
          productsToShow.length > 0 ? (
            productsToShow
            // .slice()
            // .sort(() => Math.random() - 0.5)
            .map((data) => (
              <div key={data.id}
                >
                  <div  className=" h-full border bg-gray-50 overflow-hidden rounded-3xl transform transition duration-500 hover:scale-110">
                            <img src={data.pix} alt="pix" className='w-full h-[230px]' />
                    <div className='mt-2 space-y-3 px-4 text-left'>
    
                      <div className=''>
                        <div className=' flex justify-between items-center'>
                          <p className='text-lg'>Category: {data.category} </p>
                          <p className='text-2xl text-pry'>${data.price}</p>
                         
                        </div>
                         <p className='text-sm'>The Cosy sofa comes in a choice of two sizes to suit your living spaceDesigned with traditional hardwood legs and deep sprung cushions.</p>
                        
                      </div>
                                
                                 
                    </div>
                    
                    <div className='flex justify-between items-center px-4 mt-4 '>
                        
    
                        <div>
                        {/* <button
                          className='bg-pry text-gray-100 mb-4   px-6 py-2 rounded-lg text-sm hover:opacity-75'
                          onClick={() => handleAddToCart({ ...data, count: 1 , total: parseInt(data.price)})}
                        >ADD TO CART</button> */}
                        <button
                          className='bg-pry text-gray-100 mb-4   px-6 py-2 rounded-lg text-sm hover:opacity-75'
                          onClick={() => handleAddToCart(data)}
                        >ADD TO CART</button>
                        </div>
                      </div>
                    
                            
                  </div>
                  
                </div>
            ))
          ) : (
            <div className='flex justify-center items-center'>
              <p className='text-xl'>No products found</p>
            </div>
          )
       
        }
      </motion.div>
    </div>
  )
}

export default AllProducts

