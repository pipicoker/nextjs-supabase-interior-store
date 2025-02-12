'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

import { AiOutlineDelete } from 'react-icons/ai';
import { FaLongArrowAltRight } from 'react-icons/fa';





const UserCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const {user} = useAuthStore()

  const { setTotalCartPrice} = useCartStore()


  // fetch cart items from supabase
  const fetchUserCart = async () => {
    if(!user){
      return []
    }

    let { data: cart, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user.id)
    // .order('id', { ascending: true })

    if (error) {
      console.error("Error fetching cart items:", error.message);
      return ;
    }
      setCartItems(cart || [])
     
  }

  useEffect(() => {
    fetchUserCart();
  }, []);

  // delete a particular product from cart
  const deleteProductFromCart = async(product_id: number) => {
    
    const item = cartItems.find((item) => item.product_id === product_id);
    if (!item) return;

    
    const { error } = await supabase
    .from('cart')
    .delete()
    .eq('product_id', product_id)
    .eq('user_id', user.id)

    if (error) {
      console.error("Error deleting product from cart:", error.message);
    }  else {      
      alert("Product deleted from cart successfully");
      setCartItems(cartItems.filter((item) => item.product_id !== product_id));
    }
  }

  // increase the quantity of a product in cart
  const increaseProductQuantity = async(product_id: number) => {
    const item = cartItems.find((item) => item.product_id === product_id);
    if (!item) return;

    const newQuantity = item.quantity + 1;
    
    const { error } = await supabase
    .from('cart')
    .update({ quantity:  newQuantity })
    .eq('product_id', product_id)
    .eq('user_id', user.id)

    if (error) {
      console.error("Error updating quantity:", error.message);
    } else {      
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.product_id === product_id ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      );
    }
  }

  // reduce the quantity of a product in cart
  const reduceProductQuantity = async(product_id: number) => {
    const item = cartItems.find((item) => item.product_id === product_id);
    if (!item) return;

    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;

      console.log("Updating quantity in Supabase:", { product_id: product_id, user_id: user.id, newQuantity });

    
      const { error } = await supabase
      .from('cart')
      .update({ quantity:  newQuantity })
      .eq('product_id', product_id)
      .eq('user_id', user.id)
  
      if (error) {
        console.error("Error updating quantity:", error.message);
      } else {      
        console.log("Quantity successfully updated in Supabase.")
        setCartItems((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.product_id === product_id ? { ...cartItem, quantity: newQuantity } : cartItem
          )
        );
      }
    }
   
  }


  //  to update the total price of all the items in the cart
  const totalCartPrice = useMemo(() => {

    return cartItems.reduce((total, item) => {
      const price = item.product_price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  }, [cartItems]);
  
  // Update Zustand store whenever totalCartPrice changes
  useEffect(() => {
    setTotalCartPrice(totalCartPrice);
  }, [totalCartPrice, setTotalCartPrice]);
  

  return (
    <div className='px-8 md:px-24 py-12 bg-gray-50'>
      {cartItems.length === 0 ? (
        <div className='flex flex-col  space-y-4 text-gray-700'>
          <p className='text-2xl'>Cart is empty</p>
          <Link href="../products" className='flex items-center justify-center space-x-2 text-xl underline decoration-pry'>
            <p>Go to Products</p>
            <FaLongArrowAltRight />
          </Link>
        </div>
              
          ) : (
          <div className=' space-y-4 '>
            {cartItems.map((item) => (
              <div key={item.id} className='flex justify-center'>
                <div  className=" flex justify-between items-center shadow-sm bg-white rounded-md pr-2 md:pr-6 w-full  ">

                  <div className='flex items-center space-y-2 space-x-2 md:space-x-6 lg:space-x-12'>
                    <img src={item.product_pix} alt="the item" className='w-24 h-24  md:w-48 md:h-24 rounded-md'/>
                    <div className=''>
                      <p className='text-lg font-semibold'>{item.product_category} {item.product_designer}</p>
                      <p className='text-lg'> <span className='hidden lg:block text-2xl  text-pry'>Price: ${item.product_price}</span></p>
                      <div className='text-gray-600 flex items-center cursor-pointer' 
                      onClick={() => deleteProductFromCart(item.product_id)}
                      >
                        <AiOutlineDelete />
                        Remove
                      </div>
                      
                    </div>
              
                  </div>

                    

                  <div className='space-y-1'>
                    <div className='flex items-center space-x-2   rounded-xl '>
                          <p className='text-pry bg-gray-300 px-3 py-1 rounded-lg cursor-pointer' 
                          onClick={() => reduceProductQuantity(item.product_id)}
                            >-</p>
                          <p className='bg-white px-1'>{item.quantity}</p>
                          <p className='text-pry 
                          // bg-gray-300 px-3 py-1 rounded-lg cursor-pointer' 
                          onClick={() => increaseProductQuantity(item.product_id)}
                            >+</p>
                    </div>

                    <p className='text-lg text-gray-600 '>Total: <span className='text-xl font-semibold text-pry'>${item.product_price * item.quantity}</span></p>
                  </div>
                    
                
                    
                </div>
              </div>
          
            ))}

            <div className=' grid justify-items-center   pt-8'>
              <div className='w-5/6 lg:w-2/6 '>
                <div>
                  <div className='flex justify-between items-center'>
                    <p className='text-gray-600 '>Subtotal</p>
                    <p className='font-semibold text-lg text-gray-900'>${totalCartPrice}</p>
                  </div>
              
                  <div className='flex justify-between items-center'>
                    <p className='text-gray-600 '>Delivery</p>
                    <p className='font-semibold text-lg text-gray-900'>$0</p>
                  </div>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-gray-600 '>Total</p>
                  <p className='font-bold text-lg text-pry'>${totalCartPrice}</p>
              </div>
              

              <Link href="/CartCheckout">
                <button className='mt-8 py-3 w-full bg-pry text-white rounded-lg text-lg'>Check out</button>
              </Link>
              

             
              </div>
              
            </div>
    
    
          </div>
          
          )}


    </div>
  )
}

export default UserCart
