'use client'
import { supabase } from "../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { useAuthStore } from "../store/authStore";

const CheckoutPage = ({totalCartPrice}: {totalCartPrice: number}) => {
      const {user} = useAuthStore()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (totalCartPrice > 0) {
          fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalCartPrice: convertToSubcurrency(totalCartPrice) }),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        }
      }, [totalCartPrice]);
      

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if(!user){
          return []
        }

        if (!stripe || !elements) {
            return
        }

        const {error: submitError} = await elements.submit()

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return
        }

        const {error} = await stripe.confirmPayment({
            elements, 
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success`,
            }
        })

        if (error) {
            setErrorMessage(error.message)
        }
        setLoading(false);

        await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)

      }

      if (!clientSecret || !stripe || !elements) {
        return (
            <div>Loading..</div>
        )
      }

      return (
       <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement />}
        {errorMessage && <p>{errorMessage}</p>}
            <button
             disabled={!stripe || loading}
            className="text-white w-full p-5 bg-[#DC6601] mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
                {!loading ? `Pay $${totalCartPrice}` : "Processing..."}
                </button>
       </form>
      )
}

export default CheckoutPage