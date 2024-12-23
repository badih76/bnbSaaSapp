"use client"

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom';

export function SubmitButtons({ enabled }: { enabled: boolean }) {
    const { pending } = useFormStatus();

    return (
    <>
        {
            pending ? 
                <Button disabled type='submit' size={"lg"}>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please, wait...
                </Button>
            : <Button type='submit' size={"lg"} disabled={!enabled}>Next</Button>
        }
    </>
  )
}

export default SubmitButtons;

export function ReservationSubmitButton () {
    const { pending } = useFormStatus();
    console.log('ReservationSubmitButton')
    return (
    <>
        {
            pending ? (
                <Button className='w-full' type='submit'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please, wait...
                </Button>
            )
            : (
                <Button className='w-full' type='submit'>
                    Make a Reservation
                </Button>
            )
        }
    </>
    )
}