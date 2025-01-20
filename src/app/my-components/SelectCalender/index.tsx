'use client'

import React, { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';
import { Reservations } from '@/drizzle/schema';
import { Button } from '@/components/ui/button';
// import Link from 'next/link';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import Counter from '../Counter';


function SelectCalender({ reservation, userId, homeId }: {
    reservation: typeof Reservations.$inferInsert[] | undefined | null,
    userId: string | null | undefined,
    homeId: string
}) {
    const defaultPostRedirectURL = process.env.NEXT_PUBLIC_KINDE_POST_LOGIN_REDIRECT_URL;

    const [ state, setState ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }]);

    const [ guestsSet, setGuestsSet ] = useState(false);

    let disabledDates: Date[] = [];

    if(reservation && reservation !== null) {
        reservation.forEach((reservationItem) => {
            if(reservationItem !== null) {
                const dateRange = eachDayOfInterval({
                    start: new Date(reservationItem.startDate!), 
                    end: new Date(reservationItem.endDate!)
                });

                disabledDates = [...disabledDates, ...dateRange];
            }

        })
    }

    
    useEffect(()=>{
        console.log( state[0].startDate.getTime() >= state[0].endDate.getTime(), !guestsSet,
            state[0].startDate.getTime() >= state[0].endDate.getTime()
            && !guestsSet);

    }, [state[0].startDate, guestsSet])

  return (
    <>
        <input type='hidden' name="startDate" value={state[0].startDate.toISOString()} />
        <input type='hidden' name="endDate" value={state[0].endDate.toISOString()} />
        
        <div className='bg-white rounded-md '>
            <DateRange 
                className='border border-gray-300 rounded-tl-lg rounded-tr-lg'
                date={ new Date()}
                showDateDisplay={false}
                rangeColors={["#FF5A5F"]}
                ranges={state}
                onChange={(item) => setState([item.selection as any])}
                minDate={new Date()}
                direction="vertical"
                disabledDates={disabledDates}

            />
            <div className='w-full border border-gray-300 
                rounded-bl-lg rounded-br-lg p-4
                flex flex-row justify-between items-center'>
                <span className='font-medium text-lg'>Guests:</span>
                <Counter name={'guests'} setOk={setGuestsSet}/>
            </div>

        </div>
        {
            userId ? (
                <Button className='w-full' type='submit' 
                    disabled={ 
                        state[0].startDate.getTime() >= state[0].endDate.getTime()
                        || !guestsSet
                     }>
                    Make a Reservation
                </Button>
            ) : (
                <LoginLink 
                    postLoginRedirectURL={`${defaultPostRedirectURL}?redirect_url=/home/${homeId}`}
                    className='border border-gray-400 rounded-md 
                        p-2 pl-4 pr-4 bg-primary text-white
                        hover:bg-teal-700 text-center w-full'
                >
                    Login to make a reservation
                </LoginLink>
                // <Button className='w-full' asChild>
                //     <Link href="/api/auth/login">
                //         Make a Reservation
                //     </Link>
                // </Button>
            )
        }
    </>
  )
}

export default SelectCalender
