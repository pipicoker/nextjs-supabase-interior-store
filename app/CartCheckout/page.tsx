'use client'
import Image from 'next/image';
import logo from '../../public/Images/logo.png'
import CheckoutPage from '../ui/CheckoutPage';
import convertToSubcurrency from '../lib/convertToSubcurrency';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '../store/cartStore';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  )

export default function Contactpage() {
    const { totalCartPrice } = useCartStore()

  
    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-[#F5F5F5]  ">
        <div className="mb-10 grid justify-center gap-4">
          
          <h2 className="text-2xl text-[#1E1E1E]">
            You have requested to make a total payment of
            <span className="font-bold"> ${totalCartPrice}</span> to complete your order.
          </h2>
        </div>
  
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(totalCartPrice),
            currency: "usd",
          }}
        >
          <CheckoutPage totalCartPrice={totalCartPrice} />
        </Elements>
      </main>
  )}