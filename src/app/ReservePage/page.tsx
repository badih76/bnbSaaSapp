import React from 'react'
import { createReservation, getHomeDetailsSSF, validResToken } from '../actions/actions';
import PaymentCheckout from '../my-components/PaymentCheckout';
import { IReservationDetails } from '@/lib/interfaces';
import { CircleCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function ReservePage(
    { searchParams }: { searchParams?: IReservationDetails }) 
{
    if(!searchParams || !searchParams?.homeId || !searchParams.resToken) redirect("/");

    const homeData = searchParams ? await getHomeDetailsSSF(searchParams.homeId!) : [];

    if(searchParams.success) {
        // successful payment. create the reservation...
        const resToken = searchParams.resToken;

        if(await validResToken(resToken)) {
            createReservation(searchParams);

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
                              {`Number of guests: ${searchParams?.guests ? searchParams?.guests : 0}`}
                          </div>
                          <div className='ml-3'>
                              {`Rate per night: ${
                                  // String(searchParams?.rate).padStart(2, '0')
                                  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' })
                                      .format(parseFloat(searchParams ? searchParams.rate! : "0"))
                              }`}
                          </div>
                          <div className='ml-3'>
                              {`From Date: ${new Date(searchParams ? searchParams.startDate! : new Date()).toLocaleDateString()}`}
                          </div>
                          <div className='ml-3'>
                              {`To Date: ${new Date(searchParams ? searchParams.endDate! : new Date()).toLocaleDateString()}`}
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
                              searchParams.success ? (
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
        } else {
            return (
                <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
                    <h2 className='text-3xl font-semibold tracking-tight text-primary'>Confirmation & Payment</h2>
            
                    <div className='w-full flex flex-row mt-5 gap-2' >
                        <div className='flex flex-col gap-2 w-full border border-gray-300 rounded-md p-2'>
                            <h2 className='text-xl font-semibold tracking-tight text-primary mb-3'>
                                Reservation Details
                            </h2>
                            <div className='font-medium mt-4 mb-4 ml-3 text-xl'>
                                This reservation has already been created.
                            </div>
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
                            
                        </div>
                    </div>
                </section>
            ) 
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