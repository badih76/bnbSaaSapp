'use client'

import { convertToSubcurrency } from '@/lib/paymentGWUtils';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import CheckoutComponent from './CheckoutComponent';
import { IReservationDetails } from '@/lib/interfaces';
import { cn, getDomainName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import DeskTopLogo from "@/../public/Logo3.png";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT-PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentCheckout({ amount, reservationDetails }: {
    amount: number,
    reservationDetails: IReservationDetails
}) {
  const referrer = document ? document.referrer : '';
  
  const referrerSplit = referrer.split('/');
  console.log(referrer, referrerSplit, getDomainName());
  if(referrerSplit[2] != getDomainName().split('/')[2] || referrerSplit[3] != 'home') {
    return (
      <div className="w-full h-full mx-auto p-10 text-white text-center 
        border rounded-md bg-gradient-to-br from-primary to-default
        flex flex-col justify-center items-center gap-3 text-lg">
          <p>You reached this page through non-standard or unrecognized referrer.</p>
          <p className='italic'>This reservation cannot be completed!</p>
          <p>Please, go to the desired home page and use the "Make a Reservation" button to make a reservation or click the button below to go back to Main page.</p>
          <Button 
            variant={"outline"} 
            size={"lg"} 
            className={cn('w-[10vw] h-[15vh] border-none mt-5')}
            type='submit'>
            <Image src={DeskTopLogo} 
                alt="Desktop Logo" 
                className="w-20 h-16 hidden lg:block" />

            <Image src={DeskTopLogo} 
                alt="Mobile Logo" 
                className="block lg:hidden w-12" />
          </Button>
      </div>
    )
  } else {
    return (
      <div className="w-full h-full mx-auto p-10 
        text-white text-center 
        border rounded-md 
        bg-gradient-to-br from-primary to-default">
        
        <div className="mb-10">
          <h2 className="text-2xl">
            <span className="text-xl font-bold">{`Please, confirm and pay ${
              new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(amount)
            } to complete the reservation.`}</span>
          </h2>
        </div>
  
        <Elements stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd"
          }}>
          <CheckoutComponent amount={amount} reservationDetails={reservationDetails} />
        </Elements>
      </div>
    )

  }

}
