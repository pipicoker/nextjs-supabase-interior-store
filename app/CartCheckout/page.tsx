'use client'
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
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${totalCartPrice}</span>
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