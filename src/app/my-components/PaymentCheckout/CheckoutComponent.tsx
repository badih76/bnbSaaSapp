'use client'

import React, { useEffect, useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js"
import { convertToSubcurrency } from '@/lib/paymentGWUtils';
import { IReservationDetails } from '@/lib/interfaces';
import { getDomainName } from '@/lib/utils';
import { createReservation } from '@/app/actions/actions';


function CheckoutComponent({ amount, reservationDetails }: {
    amount: number,
    reservationDetails: IReservationDetails
}) {
    const stripe = useStripe();
    const elements = useElements();
    
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const [ clientSecret, setClientSecret ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const { homeId, userId, rate, startDate, endDate, guests, resToken } = reservationDetails;

    useEffect(() => {
        fetch("/api/create-payment-intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: convertToSubcurrency(amount) })
            }
        )
        .then( res => res.json())
        .then( data => { 
            // console.log("Data: ", data);

            setClientSecret(data.clientSecret)
        });

    }, [ amount ]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if(!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if(submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${getDomainName()}/ReservePage?amount=${amount}&success=1&homeId=${homeId}&userId=${userId}&rate=${rate}&startDate=${startDate}&endDate=${endDate}&guests=${guests}&resToken=${resToken}`
            }
        })

        if(error) {
            setErrorMessage(error.message);

        } else {
            // The payment UI automatically closes with success animation.
            // add the reservation to db
            // Your customer is redirected to your `return_url`.
        }
        
        if(!error) alert('Payment was successful');
        // createReservation(reservationDetails);
        
        setLoading(false);
    }
    

    if(!clientSecret || !stripe || !elements) {
        return(
            <div className='flex items-center justify-center'>
                <div
                    className='inline-block h-8 w-8 animate-spin
                    rounded-full border-4 border-solid
                    border-current border-e-transparent 
                    align-[-0.125em] text-surface
                    motion-reduce:animate-[spin_1.5_linear_infinite] 
                    dark:text-white'
                    role="status"
                >
                    <span className='!absolute !-m-px !w-px
                    !overflow-hidden !whitespace-nowrap !border-0
                    !p-0 ![clip:rect(0,0,0,0)]'>
                        Loading...
                    </span>
                </div>

            </div>
        )
    } else {
            
        return (
            <form onSubmit={handleSubmit} 
                className='bg-white p-2 rounded-md'>
                { clientSecret && <PaymentElement />}
                
                { errorMessage && <div>{ errorMessage }</div>}
                <button
                    disabled={ !stripe || loading }
                    className='text-white w-full p-5 
                    bg-black mt-2 rounded-md font-bold
                    disabled:opacity-50 disabled:animate-pulse'
                >
                    { !loading ? `Pay ${
                        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(amount)
                    }` : "Processing..."}
                </button>
            </form>
        )
    }
}


export default CheckoutComponent