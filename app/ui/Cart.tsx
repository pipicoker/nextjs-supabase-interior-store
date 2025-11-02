'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { cartEvents } from '../lib/cartEvents';

import { AiOutlineDelete, AiOutlineShopping } from 'react-icons/ai';
import { FaLongArrowAltRight, FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

const UserCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const {user} = useAuthStore()

  const { setTotalCartPrice} = useCartStore()
  const { addToast } = useToastStore()


  // fetch cart items from supabase
  const fetchUserCart = async () => {
    if(!user){
      return []
    }

    const { data: cart, error } = await supabase
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
    if(!user){
      return []
    }

    
    const item = cartItems.find((item) => item.product_id === product_id);
    if (!item) return;

    
    const { error } = await supabase
    .from('cart')
    .delete()
    .eq('product_id', product_id)
    .eq('user_id', user.id)

    if (error) {
      console.error("Error deleting product from cart:", error.message);
      addToast("Failed to remove item from cart", "error");
    }  else {      
      addToast("Product removed from cart", "success");
      setCartItems(cartItems.filter((item) => item.product_id !== product_id));
      // Notify header to update cart count
      cartEvents.emit();
    }
  }

  // increase the quantity of a product in cart
  const increaseProductQuantity = async(product_id: number) => {
    if (!user) return;
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
      // Notify header to update cart count (if needed)
      cartEvents.emit();
    }
  }

  // reduce the quantity of a product in cart
  const reduceProductQuantity = async(product_id: number) => {
    if (!user) return;
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
        // Notify header to update cart count (if needed)
        cartEvents.emit();
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
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3'>
            <FaShoppingBag className='text-pry' />
            Shopping Cart
          </h1>
          <p className='text-gray-600 mt-2'>
            {cartItems.length === 0 ? 'Your cart is empty' : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col items-center justify-center py-16 space-y-6'
          >
            <div className='w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center'>
              <AiOutlineShopping className='w-16 h-16 text-gray-400' />
            </div>
            <div className='text-center space-y-2'>
              <h2 className='text-2xl font-semibold text-gray-900'>Your cart is empty</h2>
              <p className='text-gray-600'>Looks like you haven't added any items yet</p>
            </div>
            <Link href="/products" className='group'>
              <button className='flex items-center gap-2 bg-pry text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg'>
                <FaShoppingBag />
                Start Shopping
                <FaLongArrowAltRight className='group-hover:translate-x-1 transition-transform' />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            
            {/* Cart Items Section */}
            <div className='lg:col-span-2 space-y-4'>
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className='group'
                  >
                    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-gray-100'>
                      <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                        
                        {/* Product Image */}
                        <div className='flex-shrink-0'>
                          <div className='w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden'>
                            <img 
                              src={item.product_pix} 
                              alt={item.product_category} 
                              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className='flex-1 flex flex-col justify-between'>
                          <div>
                            <h3 className='text-lg md:text-xl font-semibold text-gray-900 mb-1'>
                              {item.product_category} {item.product_designer}
                            </h3>
                            <p className='text-2xl font-bold text-pry mb-3'>
                              ${item.product_price}
                            </p>
                          </div>

                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            {/* Quantity Selector */}
                            <div className='flex items-center gap-3'>
                              <span className='text-sm text-gray-600 font-medium'>Quantity:</span>
                              <div className='flex items-center border-2 border-gray-200 rounded-lg overflow-hidden'>
                                <button
                                  onClick={() => reduceProductQuantity(item.product_id)}
                                  className='px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors'
                                >
                                  <FaMinus className='w-3 h-3' />
                                </button>
                                <span className='px-6 py-2 font-semibold text-gray-900 bg-white'>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => increaseProductQuantity(item.product_id)}
                                  className='px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors'
                                >
                                  <FaPlus className='w-3 h-3' />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className='text-right'>
                              <p className='text-sm text-gray-600'>Item Total</p>
                              <p className='text-2xl font-bold text-pry'>
                                ${item.product_price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className='flex md:flex-col justify-end items-start'>
                          <button
                            onClick={() => deleteProductFromCart(item.product_id)}
                            className='text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-lg transition-all flex items-center gap-2 group'
                          >
                            <AiOutlineDelete className='w-5 h-5' />
                            <span className='md:hidden text-sm font-medium'>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Section */}
            <div className='lg:col-span-1'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24'
              >
                <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100'>
                  Order Summary
                </h2>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Subtotal ({cartItems.length} items)</span>
                    <span className='font-semibold text-gray-900'>${totalCartPrice}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-semibold text-green-600'>FREE</span>
                  </div>

                  <div className='flex justify-between items-center pt-4 border-t-2 border-gray-100'>
                    <span className='text-lg font-semibold text-gray-900'>Total</span>
                    <span className='text-2xl font-bold text-pry'>${totalCartPrice}</span>
                  </div>
                </div>

                <Link href="/CartCheckout">
                  <button className='w-full bg-pry text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group'>
                    Proceed to Checkout
                    <FaLongArrowAltRight className='group-hover:translate-x-1 transition-transform' />
                  </button>
                </Link>

                <Link href="/products" className='block mt-4'>
                  <button className='w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all'>
                    Continue Shopping
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='space-y-3 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span>Secure checkout</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span>Free shipping on all orders</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCart