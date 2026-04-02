import React from 'react'
import { createReservation, getHomeDetailsSSF, updateReservationOrder, validResToken } from '../actions/actions';
import PaymentCheckout from '../my-components/PaymentCheckout';
import { IReservationDetails } from '@/lib/interfaces';
import { CircleCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { db } from "@/drizzle";
import { unstable_noStore as noStore } from 'next/cache'
import { Orders } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from "next/image";
import DeskTopLogo from "@/../public/Logo3.png";

async function ReservePage(
    { searchParams }: { searchParams?: IReservationDetails }) 
{
    noStore();

    if(!searchParams || !searchParams?.homeId || !searchParams.resToken) redirect("/");

    const homeData = searchParams ? await getHomeDetailsSSF(searchParams.homeId!) : [];

    if(searchParams.success) {
        // successful payment. 

        // 1. Check if this order has been processed before. if so, show a message, else, process it
        const ordData = await db.select({ ordId: Orders.id, ordNumber: Orders.ordNumber, successfulPayment: Orders.ordSuccessfulPayment })
            .from(Orders).where(eq(Orders.ordNumber, searchParams.ordNumber ? searchParams.ordNumber : ''));
        
        if(ordData.length == 0) {
            // no records found. This order number is not valid. Throw a message on screen...
            return <InvalidReservation message='You reached this page through non-standard or unrecognized referrer.' />

        } else if(!ordData[0].successfulPayment) {
            // the payment was not successful for this order. Throw a message on screen...
            return <InvalidReservation message='The payment fot this reservation was not successful.' />
            
        } else {            
            const resToken = searchParams.resToken;
    
            if(await validResToken(resToken)) {     // Check if this token has been used to create a reservation before...
                // if this is a new reservation toke, create a new reservation...
                const newResID = await createReservation(searchParams);

                // 3. Update Order row in DB
                updateReservationOrder(searchParams.ordNumber!, true, newResID ? newResID : '')

                // display the order and reservation result as successful reservation...
                return <NewReservation 
                    guests={ searchParams.guests ? searchParams.guests : 0 } 
                    homeTitle={ homeData[0] ? homeData[0].title : '' } 
                    rate={ searchParams.rate ? searchParams.rate : '0' } 
                    startDate={ searchParams.startDate } 
                    endDate={ searchParams.endDate } 
                    success={ searchParams.success ? searchParams.success == 1 ? true : false : false } 
                    homeId={ searchParams.homeId ? searchParams.homeId : '/' } 
                    searchParams={ searchParams } />
                
            } else {
                // this reservation token has been used before to create a reservation. inform the user...
                return <OldReservation 
                    guests={ searchParams.guests ? searchParams.guests : 0 } 
                    homeTitle={ homeData[0] ? homeData[0].title : '' } 
                    rate={ searchParams.rate ? searchParams.rate : '0' } 
                    startDate={ searchParams.startDate } 
                    endDate={ searchParams.endDate } 
                    />
            }
        }
    } else {
        return (
            <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
                <h2 className='text-3xl font-semibold tracking-tight text-primary'>Confirmation & Payment</h2>
        
                <div className='w-full flex flex-row mt-5 gap-2' >
                    <div className='flex flex-col gap-2 w-2/5 border border-gray-300 rounded-md p-2'>
                        <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                            Reservation Details
                        </h2>
                        <div className='font-medium ml-3'>
                            {homeData[0].title}
                        </div>
                        <div className='ml-3'>
                            {`Number of guests: ${searchParams.guests ? searchParams.guests : 0}`}
                        </div>
                        <div className='ml-3'>
                            {`Rate per night: ${
                                // String(searchParams?.rate).padStart(2, '0')
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                    .format(parseFloat(searchParams.rate!))
                            }`}
                        </div>
                        <div className='ml-3'>
                            {`From Date: ${new Date(searchParams.startDate!).toLocaleDateString()}`}
                        </div>
                        <div className='ml-3'>
                            {`To Date: ${new Date(searchParams.endDate!).toLocaleDateString()}`}
                        </div>
                        <div className='font-medium mt-4 ml-3'>
                            {`Total Charge: ${
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(
                                    Math.round((new Date(searchParams.endDate!).getTime() 
                                    - new Date(searchParams.startDate!).getTime()) 
                                    / (1000 * 3600 * 24)) * parseFloat(searchParams.rate!)
                                    ,
                                  )
                            }`}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-3/5 border border-gray-300 rounded-md p-2 min-h-[70vh]'>
                        <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                            Checkout
                        </h2>
        
                        {
                            searchParams?.success ? (
                                <div
                                    className="w-full h-full mx-auto p-10 text-white text-center 
                                    border rounded-md bg-gradient-to-br from-primary to-default
                                    flex flex-col justify-center items-center"
                                >
                                    <div className='mb-10'>
                                        <CircleCheckIcon className='text-white h-32 w-32' />
                                    </div>
                                    <div className='text-2xl'>
                                        {`Thank you for your payment of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                            .format(Math.round((new Date(searchParams.endDate!).getTime() 
                                            - new Date(searchParams.startDate!).getTime()) 
                                            / (1000 * 3600 * 24)) * parseFloat(searchParams.rate!))}`}
                                    </div>
                                    <div className='text-2xl mt-2'>
                                        <p>{`To to back to the booked home page click on the link below.`}</p>
                                        <p className='mt-2 font-medium underline'>
                                            <Link href={`/home/${searchParams.homeId}`}>
                                                {homeData[0].title}
                                            </Link>
                                        </p>
                                    </div>
                                    
                                </div>
                            ) : (
                                <PaymentCheckout 
                                    amount={
                                        Math.round((new Date(searchParams.endDate!).getTime() 
                                            - new Date(searchParams.startDate!).getTime()) 
                                            / (1000 * 3600 * 24)) * parseFloat(searchParams.rate!)
                                    } 
                                    reservationDetails={searchParams!} />
        
                            )
                        }
                    </div>
                </div>
            </section>
        )
    }


}

export default ReservePage


const InvalidReservation = ({message } : { message: string }) => {
    return (
        <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary'>Confirmation & Payment</h2>
    
            <div className='w-full flex flex-row mt-5 gap-2' >
                <div className="w-full h-full mx-auto p-10 text-white text-center 
                    border rounded-md bg-gradient-to-br from-primary to-default
                    flex flex-col justify-center items-center gap-3 text-lg">
                    <p>{message}</p>
                    <p className='italic'>This reservation cannot be completed!</p>
                    <p>Please, go to the desired home page and use the &ldquo;Make a Reservation&rdquo; button to make a reservation or click the button below to go back to Main page.</p>
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
            </div>
        </section>
    ) 
}

const NewReservation = ({ guests, homeTitle, rate, startDate, endDate, success, homeId, searchParams } : {
    guests: number,
    homeTitle: string,
    rate: string,
    startDate: string,
    endDate: string,
    success: boolean,
    homeId: string,
    searchParams: any
}) => {
    return (
        <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary'>Confirmation & Payment</h2>
    
            <div className='w-full flex flex-row mt-5 gap-2' >
                <div className='flex flex-col gap-2 w-2/5 border border-gray-300 rounded-md p-2'>
                    <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                        Reservation Details
                    </h2>
                    <div className='font-medium ml-3'>
                        {/* {homeData[0].title} */}
                        { homeTitle }
                    </div>
                    <div className='ml-3'>
                        {`Number of guests: ${guests ? guests : 0}`}
                    </div>
                    <div className='ml-3'>
                        {`Rate per night: ${
                            // String(searchParams?.rate).padStart(2, '0')
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                .format(parseFloat(rate))   // searchParams ? searchParams.rate! : "0"
                        }`}
                    </div>
                    <div className='ml-3'>
                        {`From Date: ${new Date(startDate ? startDate : (new Date()).toString()).toLocaleDateString()}`}   
                        {/* searchParams ? searchParams.startDate! : new Date() */}
                    </div>
                    <div className='ml-3'>
                        {`To Date: ${new Date(endDate ? endDate : (new Date()).toString()).toLocaleDateString()}`}
                        {/* searchParams ? searchParams.endDate! : new Date() */}
                    </div>
                    <div className='font-medium mt-4 ml-3'>
                        {`Total Charge: ${
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(
                                Math.round((new Date(endDate!).getTime() 
                                - new Date(startDate!).getTime()) 
                                / (1000 * 3600 * 24)) * parseFloat(rate!)
                                ,
                              )
                        }`}
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-3/5 border border-gray-300 rounded-md p-2 min-h-[70vh]'>
                    <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                        Checkout
                    </h2>
    
                    {
                        success ? (
                            <div
                                className="w-full h-full mx-auto p-10 text-white text-center 
                                border rounded-md bg-gradient-to-br from-primary to-default
                                flex flex-col justify-center items-center"
                            >
                                <div className='mb-10'>
                                    <CircleCheckIcon className='text-white h-32 w-32' />
                                </div>
                                <div className='text-2xl'>
                                    {`Thank you for your payment of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                        .format(Math.round((new Date(endDate!).getTime() 
                                        - new Date(startDate!).getTime()) 
                                        / (1000 * 3600 * 24)) * parseFloat(rate!))}`}
                                </div>
                                <div className='text-2xl mt-2'>
                                    <p>{`To to back to the booked home page click on the link below.`}</p>
                                    <p className='mt-2 font-medium underline'>
                                        <Link href={`/home/${homeId}`}>
                                            {homeTitle}
                                        </Link>
                                    </p>
                                </div>
                                
                            </div>
                        ) : (
                            <PaymentCheckout 
                                amount={
                                    Math.round((new Date(endDate!).getTime() 
                                        - new Date(startDate!).getTime()) 
                                        / (1000 * 3600 * 24)) * parseFloat(rate!)
                                } 
                                reservationDetails={searchParams!} />
    
                        )
                    }
                </div>
            </div>
        </section>
    )
}

const OldReservation = ({ guests, homeTitle, rate, startDate, endDate } : {
    guests: number,
    homeTitle: string,
    rate: string,
    startDate: string,
    endDate: string    
}) => {
    return (
        <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary'>Confirmation & Payment</h2>
    
            <div className='w-full flex flex-row mt-5 gap-2' >
            <div className='flex flex-col gap-2 w-2/5 border border-gray-300 rounded-md p-2'>
                    <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                        Reservation Details
                    </h2>
                    <div className='font-medium ml-3'>
                        {/* {homeData[0].title} */}
                        { homeTitle }
                    </div>
                    <div className='ml-3'>
                        {`Number of guests: ${guests ? guests : 0}`}
                    </div>
                    <div className='ml-3'>
                        {`Rate per night: ${
                            // String(searchParams?.rate).padStart(2, '0')
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                .format(parseFloat(rate))   // searchParams ? searchParams.rate! : "0"
                        }`}
                    </div>
                    <div className='ml-3'>
                        {`From Date: ${new Date(startDate ? startDate : (new Date()).toString()).toLocaleDateString()}`}   
                        {/* searchParams ? searchParams.startDate! : new Date() */}
                    </div>
                    <div className='ml-3'>
                        {`To Date: ${new Date(endDate ? endDate : (new Date()).toString()).toLocaleDateString()}`}
                        {/* searchParams ? searchParams.endDate! : new Date() */}
                    </div>
                    <div className='font-medium mt-4 ml-3'>
                        {`Total Charge: ${
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(
                                Math.round((new Date(endDate!).getTime() 
                                - new Date(startDate!).getTime()) 
                                / (1000 * 3600 * 24)) * parseFloat(rate!)
                                ,
                              )
                        }`}
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-3/5 border border-gray-300 rounded-md p-2 min-h-[70vh]'>
                    
                </div>
            </div>
        </section>
    ) 
}