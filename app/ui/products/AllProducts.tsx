'use client'
import { useRouter } from "next/navigation";

import {  useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {useProductStore} from "../../store/productStore";
import {useAuthStore} from "../../store/authStore";
import { useToastStore } from "../../store/toastStore";
import { supabase } from "@/app/lib/supabaseClient";
import { cartEvents } from "../../lib/cartEvents";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaEye, FaTag } from "react-icons/fa";

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
  }, [products, setProducts]);

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
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        {productsToShow.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          >
            <AnimatePresence>
              {productsToShow.map((data, index) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className='group'
                >
                  <div className='h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100'>
                    
                    {/* Image Container */}
                    <div className='relative overflow-hidden bg-gray-100 aspect-square'>
                      <Image 
                        src={data.pix} 
                        alt={`${data.category} ${data.designer}`}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        height={300} 
                        width={300} 
                      />
                      
                      {/* Category Badge */}
                      <div className='absolute top-3 left-3'>
                        <span className='inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-md'>
                          <FaTag className='w-3 h-3 text-pry' />
                          {data.category}
                        </span>
                      </div>

                      {/* Hover Overlay Actions */}
                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
                        <button 
                          className='p-3 bg-white rounded-full hover:bg-pry hover:text-white transition-all transform hover:scale-110 shadow-lg'
                          title='Quick View'
                        >
                          <FaEye className='w-4 h-4' />
                        </button>
                        <button 
                          className='p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-lg'
                          title='Add to Wishlist'
                        >
                          <FaHeart className='w-4 h-4' />
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 p-5 flex flex-col'>
                      {/* Product Name */}
                      <h3 className='text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-pry transition-colors'>
                        {data.designer}
                      </h3>
                      
                      {/* Description */}
                      <p className='text-sm text-gray-600 mb-4 line-clamp-2 flex-1'>
                        {data.information || 'Premium quality furniture designed for modern living spaces'}
                      </p>

                      {/* Price and Add to Cart */}
                      <div className='mt-auto'>
                        <div className='flex items-center justify-between mb-3'>
                          <div>
                            <p className='text-xs text-gray-500 mb-1'>Price</p>
                            <p className='text-2xl font-bold text-pry'>${data.price}</p>
                          </div>
                          <div className='text-right'>
                            <div className='flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className='w-4 h-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                                  <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                                </svg>
                              ))}
                            </div>
                            <p className='text-xs text-gray-500 mt-1'>4.8 (120)</p>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          className='w-full bg-pry text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn'
                          onClick={() => handleAddToCart(data)}
                          disabled={addingToCart === data.id}
                        >
                          {addingToCart === data.id ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adding...
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className='w-4 h-4 group-hover/btn:scale-110 transition-transform' />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col items-center justify-center py-20'
          >
            <div className='w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
              <FaShoppingCart className='w-16 h-16 text-gray-400' />
            </div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-2'>No products found</h3>
            <p className='text-gray-600'>Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AllProducts

