'use client'
import { useRouter } from "next/navigation";

import {  useEffect, useState } from 'react'
import {motion} from 'motion/react'
import {useProductStore} from "../../store/productStore";
import {useAuthStore} from "../../store/authStore";
import { useToastStore } from "../../store/toastStore";
import { supabase } from "@/app/lib/supabaseClient";
import { cartEvents } from "../../lib/cartEvents";
import Image from "next/image";

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
  const { addToast } = useToastStore();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    setProducts(products);
    

  }, [products]);

  // add items to cart
  const handleAddToCart = async (product: productsInterface) => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Set loading state for this specific product
    setAddingToCart(product.id);
  
    try {
      // Check if the product already exists in the user's cart
      const { data: existingItem, error: fetchError } = await supabase
        .from("cart")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle(); // Ensure we get a single row
    
      if (fetchError) {
        console.error("Error checking cart:", fetchError.message);
        addToast("Error checking cart", "error");
        setAddingToCart(null);
        return;
      }
    
      if (existingItem) {
        addToast("This product is already in your cart", "warning");
        setAddingToCart(null);
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
        addToast("Failed to add to cart", "error");
      } else {
        addToast("Product added to cart!", "success");
        // Notify header to update cart count
        cartEvents.emit();
      }
    } finally {
      // Clear loading state
      setAddingToCart(null);
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
                            <Image src={data.pix} alt="pix" className='w-full h-[230px]' height={230} width={230} />
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
                        <button
                          className='bg-pry text-gray-100 mb-4 px-6 py-2 rounded-lg text-sm hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                          onClick={() => handleAddToCart(data)}
                          disabled={addingToCart === data.id}
                        >
                          {addingToCart === data.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adding...
                            </>
                          ) : (
                            'ADD TO CART'
                          )}
                        </button>
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

