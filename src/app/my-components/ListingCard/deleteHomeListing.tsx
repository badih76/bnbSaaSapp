'use client'

import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogDescription, DialogClose} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { removeFromCompleteHomeListing } from '@/app/actions/actions'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'


function DeleteHomeListing({ userId, homeId }: {
    userId: string,
    homeId: string
}) {

  return (
    <div className='flex flex-col justify-center items-center text-red-500  cursor-pointer'>
        <Dialog>
            <DialogTrigger asChild>
                <Button type='button' variant='outline'>
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure want to delete this Home Listing?
                    </DialogTitle>
                    <DialogDescription>
                        This will tag this Home Listing as deleted to prevent it from appearing. It will not delete it from our system.
                    </DialogDescription>
                </DialogHeader>
                <form action={removeFromCompleteHomeListing}>
                    <input type='hidden' name="homeId" value={homeId} />
                    <input type='hidden' name="userId" value={userId} />
                    <div className='flex flex-row w-full justify-end mx-auto px-3 gap-3 mt-10 lg:px-3'>
                        <DialogClose>
                            <Button variant={"outline"} 
                            size={"lg"} className={cn('w-[10vw]')}
                            // onClick={() => { setDialogOpen(false) }}
                            type='button'>
                            No
                            </Button>
                        </DialogClose>
                        <HomeListingDeleteButton />
                    </div>
                </form>     
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DeleteHomeListing

export function HomeListingDeleteButton () {
    const { pending } = useFormStatus();

    return (
    <>
        {
            pending ? (
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit' disabled>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please, wait...
                </Button>
            )
            : (
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit'>
                <DialogClose>
                    Delete
                </DialogClose>
            </Button>
            )
        }
    </>
    )
}