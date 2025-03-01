'use client'
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom'

function AddToFavoriteButton() {
    const { pending } = useFormStatus();
  return (
    <>
        { pending ? (
                <Button variant="outline" 
                    size="icon" className='bg-primary-foreground' 
                    disabled 
                >
                    <Loader2 className='h-2 w-2 animate-spin text-primary' />
                </Button>
            ) : (
                <Button variant="outline" 
                    size="icon" className='bg-primary-foreground' 
                    type='submit'>
                    <Heart className='w-4 h-4' />
                </Button>
            )
        }
    </>
  )
}

export default AddToFavoriteButton;

export function RemoveFromFavoriteButton () {    
    const { pending } = useFormStatus();
  return (
    <>
        { pending ? (
                <Button variant="outline" 
                    size="icon" className='bg-primary-foreground' 
                    disabled 
                >
                    <Loader2 className='h-2 w-2 animate-spin text-primary' />
                </Button>
            ) : (
                <Button variant="outline" 
                    size="icon" className='bg-primary-foreground' 
                    type='submit'>
                    <Heart className='w-4 h-4 text-primary-foreground' fill='#E21C49' />
                </Button>
            )
        }
    </>
  )

}