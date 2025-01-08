"use client" 

import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Counter(
    { name, defaultValue=undefined, setOk }: 
    {
        name: string, 
        defaultValue?: number | undefined,
        setOk?: (val: boolean) => void
    }) {
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if(defaultValue) setAmount(defaultValue);
    }, []);
    
    const increase = () => {
        setAmount(amount + 1);
        
        if(setOk) {
            setOk(amount + 1> 0);
        }
    }

    const decrease = () => {
        if(amount > 0) setAmount(amount - 1);
        if(setOk) {

            setOk(amount - 1 > 0);
        }
    }

  return (
    <div className='flex items-center gap-x-4'>
        <input type='hidden' name={name} value={amount} />
        <Button variant={"outline"} size="icon"
            className='rounded-full' 
            type='button' onClick={decrease}>
            <Minus className='h-4 w-4 text-primary' />
        </Button>
        <p className='font-medium text-lg'>{ amount }</p>
        <Button variant={"outline"} size="icon" 
            className='rounded-full' 
            type='button' onClick={increase}>
            <Plus className='h-4 w-4 text-primary' />
        </Button>
    </div>
  )
}

export default Counter